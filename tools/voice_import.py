"""Bring AI voice files (for example hangul_voices.zip from tools/typecast) into the game.

    python tools/voice_import.py hangul_voices.zip        # or a folder with the .mp3 files
    python tools/voice_import.py hangul_voices.zip --dry  # only checks names and sizes

For every file whose name is in a dubbing script (docs/dubbing_*.csv) it trims the silence at both ends, turns it into a
small mono MP3 (40 kbps, enough for speech; the Typecast files are 320 kbps) and saves it as audio/<name>.
Then it rebuilds audio/voices.js. Run python tools/make_app.py afterwards so the app stores the new sounds offline.
Needs ffmpeg on the PATH.
"""
import csv
import glob
import os
import shutil
import subprocess
import sys
import tempfile
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, "audio")
TRIM = ("silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.04,areverse,"
        "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.12,areverse")


def known_names():
    names = set()
    for path in glob.glob(os.path.join(ROOT, "docs", "dubbing_*.csv")):
        with open(path, encoding="utf-8-sig", newline="") as f:
            for row in csv.DictReader(f):
                if row.get("파일명"):
                    names.add(row["파일명"].strip())
    return names


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry = "--dry" in sys.argv
    if not args:
        sys.exit(__doc__)
    src = args[0]
    tmp = None
    if src.lower().endswith(".zip"):
        tmp = tempfile.mkdtemp(prefix="voices_")
        with zipfile.ZipFile(src) as z:
            for n in z.namelist():
                base = os.path.basename(n)
                if base.lower().endswith(".mp3") and not base.startswith("."):
                    with z.open(n) as fi, open(os.path.join(tmp, base), "wb") as fo:
                        shutil.copyfileobj(fi, fo)
        src = tmp
    files = sorted(glob.glob(os.path.join(src, "*.mp3")))
    names = known_names()
    unknown = [os.path.basename(f) for f in files if os.path.basename(f) not in names]
    use = [f for f in files if os.path.basename(f) in names]
    print(f"{len(files)} mp3 file(s): {len(use)} match a script line, {len(unknown)} unknown")
    if unknown:
        print("  unknown (left out):", ", ".join(unknown[:12]) + (" …" if len(unknown) > 12 else ""))
    if dry or not use:
        return
    if not shutil.which("ffmpeg"):
        sys.exit("ffmpeg was not found. Install it, then run this again.")
    os.makedirs(AUDIO, exist_ok=True)
    before = after = 0
    for i, f in enumerate(use, 1):
        out = os.path.join(AUDIO, os.path.basename(f))
        r = subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", f, "-af", TRIM, "-ac", "1", "-ar", "24000",
                            "-codec:a", "libmp3lame", "-b:a", "40k", out], capture_output=True, text=True)
        if r.returncode != 0 or not os.path.exists(out) or os.path.getsize(out) < 300:
            shutil.copy2(f, out)  # keep the original if the conversion failed
            print("  kept original:", os.path.basename(f), r.stderr.strip()[:120])
        before += os.path.getsize(f)
        after += os.path.getsize(out)
        if i % 50 == 0:
            print(f"  {i}/{len(use)}")
    print(f"saved {len(use)} file(s) in audio/ ({before / 1e6:.1f} MB -> {after / 1e6:.1f} MB)")
    subprocess.run([sys.executable, os.path.join(ROOT, "tools", "make_voice_manifest.py")], check=False)
    print("next: python tools/make_app.py, then check the settings credit line for the voice tool")
    if tmp:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
