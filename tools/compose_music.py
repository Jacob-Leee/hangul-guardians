# Original background music for 열두동물 한글 수비대, rendered with the GeneralUser GS soundfont
# (licence: free for private and commercial music creation). All melodies below are written for this game.
# Setup:  pip install tinysoundfont numpy scipy   (+ ffmpeg on PATH)
#         download GeneralUser-GS.sf2 from https://github.com/mrbumpy409/GeneralUser-GS into tools/
# Run:    python tools/compose_music.py            (all tracks)   python tools/compose_music.py case title
# Output: assets/audio/bgm/<name>.mp3
import re, random, subprocess, os, sys
import numpy as np, tinysoundfont as tsf
from scipy.signal import fftconvolve, butter, sosfilt

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SF = os.environ.get('SOUNDFONT', os.path.join(ROOT, 'tools', 'GeneralUser-GS.sf2'))
SR = 44100
OUT = os.path.join(ROOT, 'assets', 'audio', 'bgm')
os.makedirs(OUT, exist_ok=True)
random.seed(7)

PC = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}
def nn(s):
    m = re.fullmatch(r'([A-G])([#b]?)(-?\d)', s)
    return 12 * (int(m[3]) + 1) + PC[m[1]] + {'#': 1, 'b': -1, '': 0}[m[2]]

def mel(bars, bpb):
    """'E5:1 r:.5 ...' per bar -> [(beat, midi|None, dur)]; checks every bar adds up."""
    out, t = [], 0.0
    for i, bar in enumerate(bars):
        tot = 0.0
        for tok in bar.split():
            p, d = tok.split(':'); d = float(d)
            if p != 'r': out.append((t + tot, nn(p), d))
            tot += d
        assert abs(tot - bpb) < 1e-6, f'bar {i+1}: {tot} beats in "{bar}"'
        t += bpb
    return out

QUAL = {'': [0, 4, 7], 'm': [0, 3, 7], '7': [0, 4, 7, 10], 'm7': [0, 3, 7, 10], 'maj7': [0, 4, 7, 11],
        'dim': [0, 3, 6], 'sus4': [0, 5, 7], 'add9': [0, 4, 7, 14]}
def chord(name):
    m = re.fullmatch(r'([A-G][#b]?)(.*)', name)
    root = (PC[m[1][0]] + {'#': 1, 'b': -1}.get(m[1][1:], 0)) % 12
    return root, [(root + i) % 12 for i in QUAL[m[2]]]
def bars_of(prog, bpb):
    """'C|Am|Dm G' -> [(beat, chord name, length)]"""
    out = []
    for i, bar in enumerate(prog.split('|')):
        names = bar.split(); L = bpb / len(names)
        for j, n in enumerate(names): out.append((i * bpb + j * L, n, L))
    return out
def voice(pcs, low):
    """chord tones stacked upward from the first note >= low"""
    res = []
    for pc in pcs:
        n = low + ((pc - low) % 12)
        while res and n <= res[-1]: n += 12
        res.append(n)
    return res

class Song:
    def __init__(s, name, bpm, bpb, bars, loop=True, tail=3.0):
        s.name, s.bpm, s.bpb, s.bars, s.loop, s.tail = name, bpm, bpb, bars, loop, tail
        s.ev, s.prog = [], {}
    def inst(s, ch, prog, vol=100, pan=64, bank=0):
        s.prog[ch] = (bank, prog, vol, pan)
    def note(s, ch, t, n, v, d):
        s.ev.append((t, ch, n, v, d))
    def line(s, ch, notes, v=90, leg=.92, oct=0):
        for t, n, d in notes: s.note(ch, t, n + 12 * oct, v, d * leg)

def render(song, reps=3):
    syn = tsf.Synth(samplerate=SR, gain=-3)
    sfid = syn.sfload(SF)
    for ch, (bank, prog, vol, pan) in song.prog.items():
        syn.program_select(ch, sfid, 128 if ch == 9 else bank, prog, is_drums=(ch == 9))
        syn.control_change(ch, 7, vol); syn.control_change(ch, 10, pan)
    spb = 60 / song.bpm; L = song.bars * song.bpb
    n_rep = reps if song.loop else 1
    tl = []
    hum = [(0 if ch == 9 else random.uniform(-.006, .006), random.uniform(-6, 6)) for (t, ch, n, v, d) in song.ev]  # same feel in every repeat
    for k in range(n_rep):
        for (t, ch, n, v, d), (jit, dv) in zip(song.ev, hum):
            vv = max(1, min(127, int(v + dv)))
            on = (t + k * L) * spb + jit
            tl.append((max(0, on), 1, ch, n, vv)); tl.append((on + d * spb, 0, ch, n, 0))
    tl.sort(key=lambda x: (x[0], x[1]))
    total = n_rep * L * spb + song.tail
    buf, cur = [], 0
    for t, typ, ch, n, v in tl:
        s = int(round(t * SR))
        if s > cur: buf.append(np.frombuffer(syn.generate(s - cur), dtype=np.float32).copy()); cur = s
        if typ: syn.noteon(ch, n, v)
        else: syn.noteoff(ch, n)
    end = int(total * SR)
    if end > cur: buf.append(np.frombuffer(syn.generate(end - cur), dtype=np.float32).copy())
    x = np.concatenate(buf).reshape(-1, 2)
    x = reverb(x)
    if song.loop:   # the middle repeat already holds the reverb tail of the one before it -> loops without a seam
        a = int(round(L * spb * SR)); x = x[a:2 * a]
    return master(x, song.loop)

def reverb(x, secs=1.9, wet=.2):
    n = int(secs * SR); t = np.arange(n) / SR
    rng = np.random.default_rng(3)
    ir = rng.standard_normal((n, 2)) * np.exp(-t * 6.2)[:, None]
    ir[:int(.012 * SR)] = 0
    ir = sosfilt(butter(2, 5200, 'low', fs=SR, output='sos'), ir, axis=0)
    ir /= np.sqrt((ir ** 2).sum(axis=0))
    w = np.stack([fftconvolve(x[:, c], ir[:, c])[:len(x)] for c in range(2)], 1)
    return x * (1 - wet * .5) + w * wet

def master(x, loop):
    x = x - x.mean(axis=0)
    rms = np.sqrt((x ** 2).mean()) + 1e-9
    x = x * (10 ** (-17 / 20) / rms)            # about -17 dBFS RMS: same loudness for every track
    x = np.tanh(x * 1.1) / np.tanh(1.1)          # soft limit
    pk = np.abs(x).max()
    if pk > .89: x *= .89 / pk
    if not loop:   # cut the silent tail of one-shot stings, then a short fade
        e = np.abs(x).max(1); thr = 10 ** (-52 / 20); last = len(e) - np.argmax(e[::-1] > thr)
        x = x[:min(len(x), last + int(.05 * SR))].copy()
        f = int(.25 * SR); x[-f:] *= np.linspace(1, 0, f)[:, None] ** 2
    return x.astype(np.float32)

def save(song, x):
    raw = os.path.join(OUT, f'{song.name}.f32')
    x.tofile(raw)
    dst = f'{OUT}/{song.name}.mp3'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', raw,
                    '-c:a', 'libmp3lame', '-b:a', '128k', dst], check=True)
    os.remove(raw)
    print(f'{song.name:8s} {len(x)/SR:5.1f}s  {os.path.getsize(dst)//1024} KB')

# ---------- accompaniment helpers ----------
def bass(s, ch, prog, bpb, octave_low=36, v=88, style='root5'):
    for t, name, L in prog:
        r, pcs = chord(name); root = octave_low + ((r - octave_low) % 12); fifth = root + 7
        if style == 'root5' and L >= 2:
            s.note(ch, t, root, v, L / 2 * .9); s.note(ch, t + L / 2, fifth if L >= 4 else root, v - 10, L / 2 * .9)
        elif style == 'pulse':
            k = 0
            while k < L - 1e-6: s.note(ch, t + k, root, v if k == 0 else v - 14, .45); k += .5
        else: s.note(ch, t, root, v, L * .95)
def walk(s, ch, prog, octave_low=38, v=86):
    roots = [chord(n)[0] for _, n, _ in prog]
    for i, (t, name, L) in enumerate(prog):
        r, pcs = chord(name); root = octave_low + ((r - octave_low) % 12)
        nxt = roots[(i + 1) % len(roots)]; nroot = octave_low + ((nxt - octave_low) % 12)
        steps = [root, root + (pcs[1] - r) % 12, root + 7, nroot - 1 if nroot - 1 > root else nroot + 1]
        for k in range(int(L)): s.note(ch, t + k, steps[k % 4], v - (k % 2) * 8, .8)
def offbeat(s, ch, prog, low=55, v=64, every=1.0):
    for t, name, L in prog:
        notes = voice(chord(name)[1][:3], low); k = every / 2
        while k < L - 1e-6:
            for n in notes: s.note(ch, t + k, n, v, .3)
            k += every
def pad(s, ch, prog, low=53, v=46):
    for t, name, L in prog:
        for n in voice(chord(name)[1][:3], low): s.note(ch, t, n, v, L * .98)
def arp(s, ch, prog, low=48, v=62, step=.5, pattern=(0, 1, 2, 3, 2, 1)):
    for t, name, L in prog:
        pcs = chord(name)[1][:3]; notes = voice(pcs, low); notes = notes + [notes[0] + 12]
        k, i = 0.0, 0
        while k < L - 1e-6:
            s.note(ch, t + k, notes[pattern[i % len(pattern)]], v - (6 if i % 2 else 0), step * 1.6); k += step; i += 1
def drums(s, bars, bpb, kick=(), snare=(), hat=None, v=(70, 56, 34), kn=36, sn=38, hn=42, extra=()):
    for b in range(bars):
        t0 = b * bpb
        for k in kick: s.note(9, t0 + k, kn, v[0], .2)
        for k in snare: s.note(9, t0 + k, sn, v[1], .2)
        if hat:
            k = 0.0
            while k < bpb - 1e-6: s.note(9, t0 + k, hn, v[2] + (6 if k == int(k) else 0), .1); k += hat
        for (k, n, vv) in extra: s.note(9, t0 + k, n, vv, .2)

SONGS = []
def song(fn): SONGS.append(fn); return fn

@song
def title():   # hub, library, menus: warm and cheerful
    s = Song('title', 100, 4, 16)
    P = 'C|Am|F|G|C|Am|Dm G|C|F|G|Em|Am|Dm|G|F G|C'
    M = ['G4:.5 C5:.5 E5:1 D5:.5 C5:.5 E5:1', 'A4:1 C5:.5 E5:.5 A5:2', 'F5:1 E5:.5 D5:.5 C5:1 A4:1', 'B4:1 D5:1 G5:2',
         'G4:.5 C5:.5 E5:1 D5:.5 C5:.5 G5:1', 'A5:1 G5:.5 E5:.5 C5:2', 'D5:1 F5:1 B4:1 D5:1', 'C5:3 r:1',
         'A5:1 G5:.5 F5:.5 A5:1 C6:1', 'B5:1 A5:.5 G5:.5 D5:2', 'G5:1 E5:.5 G5:.5 B5:1 G5:1', 'A5:3 E5:1',
         'F5:1 E5:.5 D5:.5 F5:1 A5:1', 'G5:1 F5:.5 E5:.5 D5:2', 'C5:1 E5:1 D5:1 B4:1', 'C5:2 r:2']
    s.inst(0, 12, 112, 58); s.inst(1, 9, 62, 74); s.inst(2, 45, 78, 44); s.inst(3, 32, 96, 64); s.inst(4, 49, 52, 70)
    m = mel(M, 4); pr = bars_of(P, 4)
    s.line(0, m, 92); s.line(1, [x for x in m if x[0] >= 32], 58, oct=1)
    offbeat(s, 2, pr, 55, 62); bass(s, 3, pr, 4, 36, 84); pad(s, 4, pr, 53, 40)
    s.inst(9, 40, 70); drums(s, 16, 4, kick=(0, 2), snare=(1, 3), hat=.5, v=(46, 34, 22))
    return s

@song
def explore():   # island map and stage cards: light adventure
    s = Song('explore', 112, 4, 16)
    P = 'G|D|Em|C|G|D|C D|G|C|D|Bm|Em|C|D|Am D|G'
    M = ['D5:.5 G5:.5 B5:1 A5:.5 G5:.5 D5:1', 'F#5:1 A5:1 D6:1.5 C6:.5', 'B5:1 G5:.5 E5:.5 G5:1 B5:1', 'C6:1.5 B5:.5 A5:1 G5:1',
         'D5:.5 G5:.5 B5:1 D6:.5 B5:.5 G5:1', 'A5:1 F#5:.5 A5:.5 D6:2', 'E6:1 C6:1 D6:.5 C6:.5 A5:1', 'G5:3 r:1',
         'E5:.5 G5:.5 C6:1 B5:.5 A5:.5 G5:1', 'F#5:.5 A5:.5 D6:1 C6:.5 B5:.5 A5:1', 'B5:1 F#5:1 D6:1 B5:1', 'G5:1.5 F#5:.5 E5:2',
         'E5:.5 G5:.5 C6:1 E6:1 C6:1', 'D6:1 A5:1 F#5:1 A5:1', 'C6:1 B5:.5 A5:.5 F#5:1 A5:1', 'G5:2 D5:1 G5:1']
    s.inst(0, 73, 104, 70); s.inst(1, 24, 92, 50); s.inst(3, 32, 96, 64); s.inst(4, 48, 50, 80)
    m = mel(M, 4); pr = bars_of(P, 4)
    s.line(0, m, 88, leg=.86); arp(s, 1, pr, 50, 66); bass(s, 3, pr, 4, 38, 84); pad(s, 4, pr, 55, 36)
    s.inst(9, 0, 80); drums(s, 16, 4, kick=(0, 2.5), snare=(), hat=.5, v=(52, 0, 30), hn=82, extra=((1, 54, 34), (3, 54, 38)))
    return s

@song
def play():   # Hangul playground: bouncy
    s = Song('play', 120, 4, 16)
    P = 'F|Bb|C|F|Dm|Bb|C|C7|Bb|C|Am|Dm|Gm|C|F C|F'
    M = ['C5:.5 F5:.5 A5:.5 F5:.5 C6:1 A5:1', 'D6:.5 C6:.5 Bb5:.5 A5:.5 G5:1 F5:1', 'E5:.5 G5:.5 C6:.5 G5:.5 E5:1 G5:1', 'F5:1 A5:1 C6:2',
         'D5:.5 F5:.5 A5:.5 F5:.5 D6:1 A5:1', 'Bb5:.5 A5:.5 G5:.5 F5:.5 D5:1 F5:1', 'G5:1 E5:.5 G5:.5 C6:1 Bb5:1', 'G5:1 E5:1 C5:1 r:1',
         'F5:1 D5:.5 F5:.5 Bb5:1 F5:1', 'G5:1 E5:.5 G5:.5 C6:1 G5:1', 'A5:.5 G5:.5 E5:.5 G5:.5 A5:1 C6:1', 'D6:2 A5:2',
         'Bb5:.5 A5:.5 G5:.5 F5:.5 D5:1 G5:1', 'C6:.5 Bb5:.5 A5:.5 G5:.5 E5:1 C5:1', 'F5:1 A5:1 G5:1 E5:1', 'F5:2 r:1 C5:1']
    s.inst(0, 13, 100, 60); s.inst(1, 12, 80, 70); s.inst(3, 33, 98, 64); s.inst(4, 45, 70, 50)
    m = mel(M, 4); pr = bars_of(P, 4)
    s.line(0, m, 90, leg=.7); offbeat(s, 1, pr, 57, 60); bass(s, 3, pr, 4, 41, 86, 'root5'); offbeat(s, 4, pr, 53, 50, every=2)
    s.inst(9, 0, 84); drums(s, 16, 4, kick=(0, 2), snare=(1, 3), hat=.5, v=(64, 50, 30), extra=((3, 39, 40),))
    return s

@song
def book():   # storybook: soft music-box waltz under the narration
    s = Song('book', 84, 3, 16)
    P = 'A|E|F#m|D|A|E|D E|A|D|A|Bm|E|A|F#m|D E|A'
    M = ['E5:1 C#5:1 A4:1', 'B4:1.5 C#5:.5 B4:1', 'A4:1 C#5:1 F#5:1', 'E5:2 D5:1',
         'C#5:1 E5:1 A5:1', 'G#5:1.5 F#5:.5 E5:1', 'F#5:1 E5:1 D5:1', 'C#5:3',
         'F#5:1 A5:1 F#5:1', 'E5:1.5 C#5:.5 E5:1', 'D5:1 F#5:1 B5:1', 'A5:1 G#5:1 B4:1',
         'C#5:1 E5:1 A5:1', 'A5:1.5 G#5:.5 F#5:1', 'E5:1 D5:1 B4:1', 'A4:3']
    s.inst(0, 10, 96, 60); s.inst(1, 46, 84, 70); s.inst(4, 49, 48, 64); s.inst(3, 32, 70, 64)
    m = mel(M, 3); pr = bars_of(P, 3)
    s.line(0, m, 80, leg=1.4); arp(s, 1, pr, 45, 52, step=.5, pattern=(0, 1, 2, 3, 2, 1)); pad(s, 4, pr, 52, 34)
    bass(s, 3, pr, 3, 33, 60, 'hold')
    return s

@song
def duel():   # weapon battle: brave, not scary
    s = Song('duel', 132, 4, 16)
    P = 'Dm|Bb|C|Dm|Dm|Bb|Gm A|Dm|F|C|Dm|Bb|F|C|Bb A|Dm'
    M = ['D5:1 A4:.5 D5:.5 F5:1 E5:.5 D5:.5', 'F5:1.5 E5:.5 D5:1 Bb4:1', 'C5:.5 E5:.5 G5:1 F5:.5 E5:.5 C5:1', 'D5:3 r:1',
         'A5:1 F5:.5 A5:.5 D6:1 C6:.5 A5:.5', 'Bb5:1.5 A5:.5 F5:1 D5:1', 'G5:1 Bb5:1 A5:1 C#5:1', 'D5:3 r:1',
         'C5:.5 F5:.5 A5:1 C6:1.5 A5:.5', 'G5:1 E5:.5 G5:.5 C6:2', 'A5:1 F5:.5 A5:.5 D6:1 A5:1', 'Bb5:1 A5:.5 G5:.5 F5:1 D5:1',
         'C5:.5 F5:.5 A5:1 C6:1 A5:1', 'G5:1.5 A5:.5 G5:1 E5:1', 'F5:1 D5:1 E5:1 C#5:1', 'D5:2 A4:1 D5:1']
    s.inst(0, 61, 98, 64); s.inst(1, 56, 70, 60); s.inst(2, 48, 84, 70); s.inst(3, 32, 100, 64); s.inst(5, 47, 92, 64)
    m = mel(M, 4); pr = bars_of(P, 4)
    s.line(0, m, 92, leg=.88); s.line(1, [x for x in m if x[0] >= 32], 66)
    for t, name, L in pr:   # string ostinato in eighths
        r, pcs = chord(name); lo = 50 + ((r - 50) % 12); k = 0.0
        while k < L - 1e-6: s.note(2, t + k, [lo, lo + 7, lo + 12, lo + 7][int(k * 2) % 4], 70, .4); k += .5
    bass(s, 3, pr, 4, 38, 92, 'pulse')
    for b in range(16): s.note(5, b * 4, 50 if b % 2 == 0 else 45, 84, .9); s.note(5, b * 4 + 2, 45, 70, .9)
    s.inst(9, 0, 82); drums(s, 16, 4, kick=(0, 2), snare=(1, 3), hat=.5, v=(60, 56, 30), extra=((3.5, 38, 36),))
    for b in (0, 8): s.note(9, b * 4, 49, 64, .5)
    return s

@song
def course():   # adventure course: running
    s = Song('course', 138, 4, 16)
    P = 'C|G|Am|F|C|G|F G|C|F|G|Em|Am|F|G|Dm G|C'
    M = ['G4:.5 C5:.5 E5:.5 G5:.5 E5:.5 C5:.5 E5:1', 'D5:.5 G5:.5 B5:.5 G5:.5 D5:1 B4:1', 'C5:.5 E5:.5 A5:1 G5:.5 E5:.5 C5:1', 'F5:1.5 E5:.5 D5:1 C5:1',
         'G4:.5 C5:.5 E5:.5 G5:.5 C6:1 G5:1', 'B5:.5 A5:.5 G5:.5 F5:.5 D5:1 G5:1', 'A5:1 F5:1 G5:1 B4:1', 'C5:3 r:1',
         'A5:.5 G5:.5 F5:.5 A5:.5 C6:1 A5:1', 'B5:.5 A5:.5 G5:.5 B5:.5 D6:1 B5:1', 'G5:.5 E5:.5 B4:.5 E5:.5 G5:1 B5:1', 'A5:2 E5:1 C5:1',
         'F5:.5 A5:.5 C6:.5 A5:.5 F5:1 A5:1', 'G5:.5 B5:.5 D6:.5 B5:.5 G5:1 D5:1', 'F5:1 D5:1 G5:1 B4:1', 'C5:2 G4:1 r:1']
    s.inst(0, 13, 96, 56); s.inst(1, 73, 76, 72); s.inst(3, 33, 100, 64); s.inst(4, 45, 76, 60)
    m = mel(M, 4); pr = bars_of(P, 4)
    s.line(0, m, 90, leg=.7); s.line(1, m, 62, leg=.8); bass(s, 3, pr, 4, 36, 90, 'pulse'); offbeat(s, 4, pr, 55, 58)
    s.inst(9, 0, 86); drums(s, 16, 4, kick=(0, 1.5, 2), snare=(1, 3), hat=.5, v=(66, 54, 32), extra=((1, 54, 30), (3, 54, 34)))
    return s

@song
def case():   # Case Squad: curious, sneaky detective
    s = Song('case', 96, 4, 16)
    P = 'Dm7|G7|Dm7|G7|Bbmaj7|Am7|Gm7|A7|Dm7|G7|Dm7|G7|Bbmaj7|C|Am7|Dm'
    M = ['D5:.5 r:.5 F5:.5 r:.5 A5:.5 G5:.5 F5:.5 r:.5', 'E5:.5 r:.5 G5:.5 r:.5 B5:1 r:1', 'D5:.5 r:.5 F5:.5 r:.5 A5:.5 C6:.5 A5:.5 r:.5', 'B5:1.5 A5:.5 G5:1 r:1',
         'F5:.5 r:.5 A5:.5 r:.5 D6:1 C6:1', 'C6:.5 r:.5 A5:.5 r:.5 E5:1 G5:1', 'G5:.5 r:.5 Bb5:.5 r:.5 D6:.5 C6:.5 Bb5:1', 'A5:1 C#6:1 E6:.5 C#6:.5 A5:1',
         'A5:.5 r:.5 F5:.5 r:.5 D5:.5 E5:.5 F5:.5 r:.5', 'G5:.5 r:.5 B5:.5 r:.5 D6:1 r:1', 'C6:.5 r:.5 A5:.5 r:.5 F5:.5 E5:.5 D5:.5 r:.5', 'E5:1.5 F5:.5 G5:1 r:1',
         'D6:1 C6:.5 Bb5:.5 A5:1 F5:1', 'E5:1 G5:.5 E5:.5 C5:1 r:1', 'A4:.5 C5:.5 E5:.5 G5:.5 A5:1 r:1', 'D5:1 r:1 A4:.5 r:.5 D5:.5 r:.5']
    s.inst(0, 71, 100, 70); s.inst(1, 45, 84, 52); s.inst(3, 32, 100, 64); s.inst(4, 11, 54, 80)
    m = mel(M, 4); pr = bars_of(P, 4)
    s.line(0, [x for x in m], 86, leg=.62)
    walk(s, 3, pr, 38, 84)
    for t, name, L in pr:   # pizzicato chord stabs on 2 and 4
        for n in voice(chord(name)[1][:4], 55): s.note(1, t + 1, n, 56, .25); s.note(1, t + 3, n, 52, .25)
    s.line(4, [x for x in m if x[0] >= 48 and x[0] < 64], 40, oct=1, leg=.5)
    s.inst(9, 40, 74); drums(s, 16, 4, kick=(0,), snare=(1, 3), hat=.5, v=(40, 40, 22), sn=37, hn=42)
    return s

@song
def tension():   # light tension while listening to witnesses (never scary)
    s = Song('tension', 90, 4, 16)
    P = 'Am|Am|F|E|Am|Am|Dm|E|F|G|Am|Am|Dm|E|F|E'
    M = ['E6:1 r:1 C6:1 r:1', 'B5:1 r:1 A5:2', 'C6:1 r:1 A5:1 r:1', 'G#5:2 B5:2', 'E6:1 r:1 D6:1 C6:1', 'B5:2 E5:2', 'F5:1 A5:1 D6:2', 'B5:1 G#5:1 E5:2',
         'A5:1 r:1 C6:1 r:1', 'B5:1 r:1 D6:1 r:1', 'E6:2 C6:2', 'A5:4', 'D6:1 C6:1 A5:2', 'G#5:1 B5:1 E6:2', 'C6:2 A5:2', 'B5:2 G#5:2']
    s.inst(0, 8, 92, 72); s.inst(2, 48, 80, 54); s.inst(4, 89, 50, 64); s.inst(5, 47, 70, 64)
    m = mel(M, 4); pr = bars_of(P, 4)
    s.line(0, m, 74, leg=1.2)
    for t, name, L in pr:
        r, pcs = chord(name); lo = 45 + ((r - 45) % 12); third = lo + (pcs[1] - r) % 12; k = 0.0
        while k < L - 1e-6: s.note(2, t + k, [lo, lo, lo + 7, lo, third + 12, lo, lo + 7, lo][int(k * 2) % 8], 62, .42); k += .5
    pad(s, 4, pr, 52, 34)
    for b in range(16): s.note(5, b * 4, 45 if chord(pr[b][1])[0] in (9, 2) else 40, 46, 1)
    return s

@song
def reveal():   # one shot when the culprit is named
    s = Song('reveal', 100, 4, 3, loop=False, tail=2.6)
    s.inst(5, 47, 104, 64); s.inst(0, 61, 108, 64); s.inst(2, 48, 96, 64); s.inst(1, 9, 80, 74); s.inst(9, 48, 90)
    k = 0.0
    while k < 2.5: s.note(5, k, 45, int(40 + k * 30), .2); k += .125
    for n in voice([2, 5, 9], 50) + [62, 69]: s.note(0, 2.5, n, 104, 4); s.note(2, 2.5, n + 12, 90, 4)
    s.note(5, 2.5, 38, 120, 1.5)
    s.note(9, 2.5, 49, 100, 2); s.note(9, 2.5, 36, 100, .5)
    for i, n in enumerate([74, 81, 86, 93]): s.note(1, 2.75 + i * .25, n, 70, 1)
    return s

@song
def solved():   # one shot fanfare when the case is solved
    s = Song('solved', 120, 4, 3, loop=False, tail=2.8)
    s.inst(0, 56, 112, 64); s.inst(1, 61, 96, 64); s.inst(2, 48, 88, 64); s.inst(3, 9, 82, 74); s.inst(5, 47, 96, 64); s.inst(9, 0, 90)
    fan = mel(['G4:.5 C5:.5 E5:.5 G5:1.5 E5:.5 G5:.5', 'C6:4', 'r:4'], 4)
    s.line(0, fan, 104, leg=.9)
    for t, n, L in [(0, 'C', 2), (2, 'F', 1), (3, 'G', 1), (4, 'C', 4)]:
        for x in voice(chord(n)[1], 55): s.note(1, t, x, 92, L * .95); s.note(2, t, x + 12, 76, L * .95)
        s.note(5, t, 36 + chord(n)[0] if chord(n)[0] < 8 else 24 + chord(n)[0], 96, .6)
    for i, x in enumerate([72, 76, 79, 84, 88, 91, 96]): s.note(3, 4 + i * .125, x, 76, 1.2)
    s.note(9, 4, 49, 104, 2); s.note(9, 4, 36, 100, .4); s.note(9, 4, 57, 80, 2)
    return s

if __name__ == '__main__':
    want = sys.argv[1:]
    for fn in SONGS:
        if want and fn.__name__ not in want: continue
        s = fn(); save(s, render(s))
