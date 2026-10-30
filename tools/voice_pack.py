"""AI voice pack for the character lines: scripts for an AI voice website, and the cutter for the finished recordings.

    python tools/voice_pack.py make                 # writes docs/voice_pack/ (one script per role + casting sheet)
    python tools/voice_pack.py split <folder>       # cuts the recordings in <folder> into audio/<file name from the CSV>
    python tools/voice_pack.py split <folder> --dry # only checks the recordings, writes nothing
    python tools/voice_pack.py split-one <file> [--order order.txt] [--roles rat,ox,rabbit] [--dry]
                                                    # ONE recording with many roles (one project in the voice website)
    python tools/voice_pack.py split-srt <file.mp3> <file.srt> [--dry]
                                                    # ONE recording + its subtitle file (Typecast: download MP3 + SRT)
    python tools/make_voice_manifest.py             # connects the new files to the game

The recordings: one audio file per role, made from that role's script (docs/voice_pack/scripts/NN_id_name.txt) with
every line as its own paragraph, named like the script (01_rat_번개쥐.mp3; just the id, rat.mp3, also works).
The cuts go into the pauses between paragraphs; among all pauses the tool picks the set that gives every piece a length
that fits its line, so a short pause inside a two-sentence line is not cut. A role can also come as one file per line
(01_rat_번개쥐_1.mp3, _2, ...); those are only trimmed and converted. All lines of one role get the same volume change,
so every role ends up about equally loud. Needs ffmpeg on the PATH and numpy.

split-one: many roles in one recording, every line its own paragraph. The tool needs the lines in the order they were
read: --order with the text copied from the voice website's editor (Ctrl+A, Ctrl+C, paste into a .txt), or --roles with
the role ids in the order of scripts/00_all_characters.txt (default: that whole file). Each role gets its own volume.
"""
import argparse
import csv
import math
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, "docs")
SR = 16000        # analysis rate only; the pieces are cut from the original file
TARGET_DB = -20.0  # loudness of the spoken parts after the volume change (RMS, dBFS)

# Order of the scripts, the group shown on the casting sheet, and what the voice should sound like.
ROLES = [
    # id, group, voice (who it sounds like), priority 1 = make first
    ("rat", "수비대 영웅", "여자아이 6~8세 · 높고 빠름", 1),
    ("ox", "수비대 영웅", "남자아이 8~10세 · 낮고 느림", 1),
    ("tiger", "수비대 영웅", "남자아이 8~10세 · 힘참", 1),
    ("rabbit", "수비대 영웅", "여자아이 7~9세 · 밝음", 1),
    ("dragon", "수비대 영웅", "형 12~15세 · 낮고 부드러움", 1),
    ("snake", "수비대 영웅", "누나 12~15세 · 낮고 조용함", 1),
    ("horse", "수비대 영웅", "남자아이 7~9세 · 신나고 빠름", 1),
    ("sheep", "수비대 영웅", "여자아이 6~8세 · 아주 부드럽고 느림", 1),
    ("monkey", "수비대 영웅", "여자아이 6~8세 · 높고 까불까불", 1),
    ("rooster", "수비대 영웅", "여자아이 8~10세 · 맑고 또박또박", 1),
    ("dog", "수비대 영웅", "남자아이 7~9세 · 활발하고 다정함", 1),
    ("pig", "수비대 영웅", "남자아이 7~9세 · 느긋함", 1),
    ("squirrel", "사건 친구", "여자아이 7세 · 명랑, 걱정하면 떨림", 1),
    ("spider", "사건 친구", "여자아이 7~9세 · 작고 수줍음", 1),
    ("mole", "사건 친구", "남자아이 8~10세 · 또박또박, 수줍음", 1),
    ("beaver", "사건 친구", "남자아이 10~12세 · 조금 굵고 차분함", 1),
    ("gull", "사건 친구", "여자아이 8~10세 · 시원하고 빠름", 1),
    ("v_gray", "고양이 악당", "어른 · 코믹 악당, 콧소리 비웃음", 2),
    ("v_black", "고양이 악당", "어른 · 낮게 속삭이는 능청", 2),
    ("v_white", "고양이 악당", "어른 여자 · 높고 새침함", 2),
    ("v_tiger", "고양이 악당", "어른 · 큰소리 허세, 코믹", 2),
    ("v_fat", "고양이 악당", "어른 · 굵고 느린 먹보", 2),
    ("v_purple", "고양이 악당", "높고 가벼운 목소리 · 킥킥 장난", 2),
    ("sb_rabbit", "동화 속 인물", "남자아이 · 높고 빠르게 뽐냄", 2),
    ("sb_turtle", "동화 속 인물", "남자아이 · 느리고 순함", 2),
    ("sb_country", "동화 속 인물", "남자아이 · 소박하고 순함, 조금 느리게 (2권 시골 쥐)", 2),
    ("sb_city", "동화 속 인물", "남자아이 · 빠르고 자신만만, 뽐냄 (2권 도시 쥐)", 2),
    ("mentor", "선택", "할아버지 · 낮고 느리고 따뜻함", 3),
    ("narrator", "선택", "30대 여자 선생님 · 또박또박", 3),
]
LABEL = {"mentor": "거북이 스승님", "narrator": "글자 소리"}
MENTOR_DIR = "다정한 할아버지 거북이. 낮고 느리고 편안하게, 미소 띤 말투로 말끝을 살짝 늘여요."


def read_csv(name):
    path = os.path.join(DOCS, name)
    if not os.path.exists(path):
        return []
    with open(path, encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def short_name(rid, rows):
    if rid in LABEL:
        return LABEL[rid]
    return re.sub(r"\s*\(.*?\)", "", rows[0]["캐릭터"]).strip()


def load_roles():
    """Every role with its lines in script order: {id: {"name", "group", "voice", "prio", "dir", "rows"}}."""
    chars = read_csv("dubbing_characters.csv")
    story = read_csv("dubbing_b1.csv") + read_csv("dubbing_b2.csv") + read_csv("dubbing_cases.csv")
    letters = read_csv("dubbing_letters.csv") + read_csv("dubbing_extra.csv")
    rows_of = {}
    for r in chars:
        rows_of.setdefault(r["화자ID"].strip(), []).append(r)
    seen = set()
    for r in story:
        if r["화자ID"].strip() == "mentor" and r["파일명"] not in seen:
            seen.add(r["파일명"])
            rows_of.setdefault("mentor", []).append(r)
    rows_of["narrator"] = letters
    roles, n = {}, 0
    for rid, group, voice, prio in ROLES:
        rows = rows_of.get(rid) or []
        if not rows:
            continue
        n += 1
        d = MENTOR_DIR if rid == "mentor" else rows[0].get("연기 지시", "")
        roles[rid] = {"no": n, "name": short_name(rid, rows), "group": group, "voice": voice, "prio": prio, "dir": d, "rows": rows}
    missing = [k for k in rows_of if k not in roles]
    if missing:
        sys.exit("roles without a place in ROLES: " + ", ".join(missing))
    return roles


def script_name(rid, role):
    return f"{role['no']:02d}_{rid}_{role['name'].replace(' ', '')}"


# ---------------------------------------------------------------- make
def make(out):
    roles = load_roles()
    sdir = os.path.join(out, "scripts")
    os.makedirs(sdir, exist_ok=True)
    for fn in os.listdir(sdir):
        if fn.endswith(".txt"):
            os.remove(os.path.join(sdir, fn))
    sheet, every = [], []
    for rid, role in roles.items():
        lines = [r["대사"].strip() for r in role["rows"]]
        if rid == "narrator":
            lines = [t + "." for t in lines]  # a full stop keeps each letter its own sentence in the voice tool
        name = script_name(rid, role)
        with open(os.path.join(sdir, name + ".txt"), "w", encoding="utf-8") as f:
            f.write("\n\n".join(lines) + "\n")
        if role["prio"] < 3:
            every += lines
        sheet.append({
            "순서": role["no"], "우선순위": role["prio"], "묶음": role["group"], "화자ID": rid, "캐릭터": role["name"],
            "대본 파일": f"scripts/{name}.txt", "저장할 파일 이름": name + ".mp3", "줄 수": len(lines),
            "크레딧(글자 수)": sum(len(t) for t in lines), "목소리": role["voice"], "연기 방향": role["dir"],
            "오디션 문장": max(lines, key=len), "고른 목소리": "",
        })
    with open(os.path.join(sdir, "00_all_characters.txt"), "w", encoding="utf-8") as f:
        f.write("\n\n".join(every) + "\n")
    story, seen_t = [], set()   # the story narrator (not in the roles above: the letters are the narrator role there)
    for r in read_csv("dubbing_b1.csv") + read_csv("dubbing_b2.csv") + read_csv("dubbing_cases.csv"):
        t = r["대사"].strip()
        if r["화자ID"].strip() == "narrator" and t not in seen_t:
            seen_t.add(t)
            story.append(t)
    with open(os.path.join(sdir, "00_narrator_story.txt"), "w", encoding="utf-8") as f:
        f.write("\n\n".join(story) + "\n")
    with open(os.path.join(out, "casting.csv"), "w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(sheet[0].keys()))
        w.writeheader()
        w.writerows(sheet)
    total = {p: sum(s["크레딧(글자 수)"] for s in sheet if s["우선순위"] == p) for p in (1, 2, 3)}
    n1 = sum(s["줄 수"] for s in sheet if s["우선순위"] < 3)
    with open(os.path.join(out, "README.md"), "w", encoding="utf-8") as f:
        f.write(f"""# AI 녹음 팩 (캐릭터 대사)

배역마다 대본 1개(`scripts/`, {len(sheet)}개), 목소리 방향은 `casting.csv`(엑셀·넘버스로 열림). 캐릭터 대사 {n1}줄 + 선택 2개(거북이 스승님, 글자 소리).
`python tools/voice_pack.py make`가 `docs/dubbing_*.csv`에서 다시 만듭니다.

## 순서
1. 타입캐스트(typecast.ai/kr)에 가입하고, `casting.csv`의 '목소리'·'연기 방향'을 보며 배역마다 목소리를 고릅니다. '오디션 문장'으로 미리 들어 보세요. 미리듣기는 무료입니다.
2. 고른 목소리 이름을 `casting.csv`의 '고른 목소리' 칸에 적어 둡니다(다음 책도 같은 목소리로 녹음하려고).
3. 배역마다 새 프로젝트를 만들고 `scripts/`의 대본을 통째로 붙여 넣습니다(한 줄 = 한 문단). 줄 사이 쉼은 1초 정도로 둡니다.
4. 전체를 들어 보고 이상한 줄만 다시 만든 뒤 파일 1개(MP3)로 내려받습니다. 파일 이름은 대본 이름과 같게 합니다(예: `01_rat_번개쥐.mp3`, 영어 ID만 있어도 됨: `rat.mp3`).
5. 파일을 Claude 대화에 올리면 자르고 게임에 연결합니다. 직접 하려면: `python tools/voice_pack.py split <폴더>` → `python tools/make_voice_manifest.py` → `python tools/make_app.py`.

**한 프로젝트에 여러 배역을 넣어도 됩니다.** `scripts/00_all_characters.txt`(캐릭터 대사 전부, 배역 순서대로)를 붙여 넣거나 배역 대본을 이어 붙이고, 배역이 바뀌는 문단에서 목소리를 바꿉니다. 한 줄 = 한 문단, '무음 줄이기'는 끄고, 파일 1개로 내려받습니다. Claude에게 올릴 때 편집기 글자 전체(Ctrl+A → Ctrl+C)를 함께 붙여 넣으면 그 순서대로 자릅니다. 직접 하려면: `python tools/voice_pack.py split-one <파일> --order <글자.txt>`.

## 크레딧 (1글자 = 1크레딧, 다운로드할 때만 차감)
- 1순위(영웅·사건 친구) {total[1]:,} · 2순위(고양이 악당·동화 속 인물) {total[2]:,} · 선택 {total[3]:,} · 전부 {sum(total.values()):,}
- 타입캐스트 Basic: 월 30,000크레딧(2026-10 기준 월 9,900원, 미국 $5). 한 달이면 전부 받고 다시 받을 여유도 있습니다.
- 무료 플랜은 평생 3,000크레딧, 체험용 목소리만, 출처 표기가 필요해서 이 작업에는 부족합니다.

## 주의
- 대본 글자를 바꾸지 마세요. 화면 글자와 소리가 같아야 아이가 따라 읽을 수 있습니다. 발음이 이상하면 사이트의 발음 고치기 기능만 씁니다.
- 게임이 공개 웹(GitHub Pages)에 있으므로 유료 플랜(상업 이용 포함)으로 받는 것을 권장합니다.
- 녹음 파일을 넣으면 설정 화면에 'AI 생성 음성'과 쓴 도구 이름을 표기합니다.
""")
    print(f"{len(sheet)} scripts in {sdir}")
    print(f"credits: priority 1 = {total[1]}, priority 2 = {total[2]}, optional = {total[3]}, all = {sum(total.values())}")
    return roles, sheet


# ---------------------------------------------------------------- split
def decode(path, sr=SR):
    import numpy as np
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def analyse(x):
    """Frame loudness (10 ms steps), the quiet threshold, and the quiet stretches as (start, end) seconds."""
    import numpy as np
    hop, win = int(SR * 0.01), int(SR * 0.03)
    n = max(1, (len(x) - win) // hop + 1)
    c = np.concatenate([[0.0], np.cumsum(x.astype(np.float64) ** 2)])
    i = np.arange(n) * hop
    rms = np.sqrt(np.maximum((c[np.minimum(i + win, len(x))] - c[i]) / win, 1e-14))
    db = 20 * np.log10(rms)
    thr = max(float(np.percentile(db, 95)) - 32, -60.0)
    quiet = db < thr
    runs, k = [], 0
    while k < n:
        if quiet[k]:
            j = k
            while j < n and quiet[j]:
                j += 1
            runs.append((k * hop / SR, ((j - 1) * hop + win) / SR))
            k = j
        else:
            k += 1
    return db, thr, runs, hop


def weight(text):
    """Rough speaking length of a line: syllables, plus a pause for each mark inside the line."""
    syl = len(re.findall(r"[가-힣A-Za-z0-9]", text))
    inner = len(re.findall(r"[,.!?~…]+(?=\s*\S)", text.strip()))
    return syl + 2.0 * inner + 1.0


def choose_cuts(cands, a0, b0, weights, beta=1.0):
    """Pick len(weights)-1 pauses so that every piece fits its line's length and long pauses are preferred."""
    import numpy as np
    K, M = len(weights) - 1, len(cands)
    if K == 0:
        return []
    if M == K:
        return list(range(M))
    s = np.array([c[0] for c in cands])
    e = np.array([c[1] for c in cands])
    L = np.maximum(e - s, 1e-3)
    T = max((b0 - a0) - float(np.sort(L)[-K:].sum()), 0.1)
    W = float(sum(weights))
    E = [max(T * w / W, 0.05) for w in weights]
    seg = lambda d, k: np.log(np.maximum(d, 0.03) / E[k]) ** 2
    INF = float("inf")
    f = np.full((K, M), INF)
    back = np.zeros((K, M), dtype=int)
    for j in range(0, M - K + 1):
        f[0, j] = seg(s[j] - a0, 0) - beta * math.log(L[j])
    for k in range(1, K):
        for j in range(k, M - (K - k) + 1):
            prev = f[k - 1, :j] + seg(s[j] - e[:j], k)
            i = int(np.argmin(prev))
            f[k, j] = prev[i] - beta * math.log(L[j])
            back[k, j] = i
    last = f[K - 1] + seg(b0 - e, K)
    j = int(np.argmin(last))
    picks = [j]
    for k in range(K - 1, 0, -1):
        j = back[k, j]
        picks.append(j)
    return picks[::-1]


def gain_for(x, db, thr):
    import numpy as np
    loud = db[db >= thr]
    if not len(loud):
        return 0.0
    speech_db = 10 * math.log10(float(np.mean(10 ** (loud / 10))))
    peak_db = 20 * math.log10(max(float(np.max(np.abs(x))), 1e-6))
    return max(min(TARGET_DB - speech_db, -1.0 - peak_db), -20.0)


def plan_file(path, texts):
    """Where each line of one recording starts and ends: ({"pieces": [(start, end), ...], "gain": dB}, None) or (None, error)."""
    x = decode(path)
    db, thr, runs, hop = analyse(x)
    total = len(x) / SR
    a0 = runs[0][1] if runs and runs[0][0] <= 0.02 else 0.0
    b0 = runs[-1][0] if runs and runs[-1][1] >= total - 0.05 else total
    cands = []
    for min_len in (0.22, 0.15, 0.1):
        cands = [(s, e) for s, e in runs if s > a0 + 0.05 and e < b0 - 0.05 and e - s >= min_len]
        if len(cands) >= len(texts) - 1:
            break
    if len(cands) < len(texts) - 1:
        return None, (f"found {len(cands) + 1} pieces, the script has {len(texts)} lines. "
                      "Make the pause between lines longer (about 1 second) and download it again.")
    picks = choose_cuts(cands, a0, b0, [weight(t) for t in texts])
    cuts = [cands[j] for j in picks]
    starts = [a0] + [c[1] for c in cuts]
    ends = [c[0] for c in cuts] + [b0]
    mids = [0.0] + [(c[0] + c[1]) / 2 for c in cuts] + [total]
    pieces = [(max(mids[k], starts[k] - 0.12), min(mids[k + 1], ends[k] + 0.15)) for k in range(len(texts))]
    # unclear when the pauses that were cut are not clearly longer than the pauses that were kept inside lines
    kept = [e - s for j, (s, e) in enumerate(cands) if j not in set(picks)]
    unclear = bool(cuts) and bool(kept) and min(e - s for s, e in cuts) < 1.15 * max(kept)
    return {"pieces": pieces, "gain": gain_for(x, db, thr), "unclear": unclear}, None


def cut(path, s, e, gain, out):
    d = max(e - s, 0.05)
    fade = min(0.012, d / 4)
    af = f"volume={gain:.2f}dB,afade=t=in:d={fade:.3f},afade=t=out:st={d - fade:.3f}:d={fade:.3f}"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{s:.3f}", "-t", f"{d:.3f}", "-i", path, "-af", af,
                    "-ac", "1", "-ar", "44100", "-codec:a", "libmp3lame", "-b:a", "96k", out], check=True)


def role_of(stem, roles):
    """(role id, rest of the name after the role) for a file name such as 01_rat_번개쥐, rat_3 or 번개쥐."""
    low = stem.lower()
    for rid in sorted(roles, key=len, reverse=True):
        m = re.search(r"(?<![a-z])" + re.escape(rid) + r"(?![a-z])", low)
        if m:
            rest = stem[m.end():]
            name = roles[rid]["name"].replace(" ", "")
            return rid, rest.replace(name, "", 1)
    flat = re.sub(r"[\s()\[\]_\-.]", "", stem)
    for rid in sorted(roles, key=lambda r: -len(roles[r]["name"].replace(" ", ""))):
        name = roles[rid]["name"].replace(" ", "")
        k = flat.find(name)
        if k >= 0:
            return rid, flat[k + len(name):]
    return None, ""


def split(folder, out, dry=False):
    import numpy as np
    roles = load_roles()
    exts = (".mp3", ".wav", ".m4a", ".ogg", ".flac", ".aac", ".webm")
    files = sorted(fn for fn in os.listdir(folder) if os.path.splitext(fn)[1].lower() in exts)
    if not files:
        sys.exit("no audio files in " + folder)
    groups, problems = {}, []
    for fn in files:
        rid, rest = role_of(os.path.splitext(fn)[0], roles)
        if not rid:
            problems.append(f"{fn}: which role is this? Name it like the script (01_rat_번개쥐.mp3) or by the id (rat.mp3).")
            continue
        m = re.search(r"(\d+)\D*$", rest)
        groups.setdefault(rid, []).append((int(m.group(1)) if m else None, fn))
    if not dry:
        os.makedirs(out, exist_ok=True)
    made = 0
    for rid, items in groups.items():
        role, rows = roles[rid], roles[rid]["rows"]
        texts = [r["대사"].strip() for r in rows]
        report = []
        if len(items) == 1:
            fn = items[0][1]
            path = os.path.join(folder, fn)
            plan, err = plan_file(path, texts)
            if err:
                problems.append(f"{fn}: {err}")
                continue
            pieces, g, src = plan["pieces"], plan["gain"], [path] * len(rows)
            if plan["unclear"]:
                problems.append(f"{fn}: the pauses between lines are about as long as pauses inside lines, so some cuts may be "
                                "in the wrong place. Listen to the pieces, or download it again with longer pauses (about 1 second).")
        else:
            nums = sorted(items, key=lambda t: (t[0] is None, t[0]))
            if len(nums) != len(rows) or any(n is None for n, _ in nums) or len({n for n, _ in nums}) != len(nums):
                problems.append(f"{rid}: {len(items)} files ({', '.join(f for _, f in items)}). Send one file for the whole role, "
                                f"or exactly {len(rows)} files numbered 1-{len(rows)}.")
                continue
            pieces, src, g = [], [], None
            for (_, fn), t in zip(nums, texts):
                path = os.path.join(folder, fn)
                plan, err = plan_file(path, [t])
                pieces += plan["pieces"]
                src.append(path)
                g = plan["gain"] if g is None else min(g, plan["gain"])
        durs = [e - s for s, e in pieces]
        rate = [d / weight(t) for d, t in zip(durs, texts)]
        med = float(np.median(rate))
        for k, ((s, e), r, t) in enumerate(zip(pieces, rows, texts)):
            flag = ""
            if rate[k] > med * 1.9 or rate[k] < med / 1.9:
                flag = "long, please listen" if rate[k] > med else "short, please listen"
                problems.append(f"{r['파일명']} ({rid} line {k + 1}): {e - s:.1f}s for \"{t[:30]}\" looks too {flag.split(',')[0]}")
            report.append(f"   {k + 1:>2}. {r['파일명']:<22} {e - s:5.2f}s  {t[:34]}{'  <- ' + flag if flag else ''}")
            if not dry:
                cut(src[k], s, e, g, os.path.join(out, r["파일명"].strip()))
                made += 1
        print(f"{'checked' if dry else 'cut'} {rid} ({role['name']}): {len(rows)} lines, volume {g:+.1f} dB")
        print("\n".join(report))
    left = [f"{script_name(r, roles[r])} ({roles[r]['prio']})" for r in roles if r not in groups]
    print(f"\n{made} file(s) written to {out}" if not dry else "\n(dry run: nothing written)")
    if left:
        print("not recorded yet (priority): " + ", ".join(left))
    if problems:
        print("\nCheck these:")
        for p in problems:
            print(" -", p)
    if made:
        print("Next: python tools/make_voice_manifest.py")
    return problems


# ---------------------------------------------------------------- split-one (many roles in one recording)
def line_key(t):
    t = str(t).replace("\u201c", '"').replace("\u201d", '"').replace("\u2018", "'").replace("\u2019", "'")
    return re.sub(r"[\s.]+$", "", re.sub(r"\s+", " ", t).strip())


def resolve_lines(texts, roles):
    """[(role id, row) or None] for each text; a line that several roles say goes to the role of its neighbours."""
    index = {}
    for rid, role in roles.items():
        for r in role["rows"]:
            index.setdefault(line_key(r["대사"]), []).append((rid, r))
    cand = [index.get(line_key(t)) for t in texts]
    res = []
    for i, c in enumerate(cand):
        if not c:
            res.append(None)
            continue
        if len(c) == 1:
            res.append(c[0])
            continue
        prev = next((res[j][0] for j in range(i - 1, -1, -1) if res[j]), None)
        nxt = next((cand[j][0][0] for j in range(i + 1, len(cand)) if cand[j] and len(cand[j]) == 1), None)
        res.append(next((x for x in c if x[0] == prev), None) or next((x for x in c if x[0] == nxt), None) or c[0])
    return res


def split_one(path, order=None, role_ids=None, out=None, dry=False):
    import numpy as np
    roles = load_roles()
    if order:
        with open(order, encoding="utf-8-sig") as f:
            texts = [t.strip() for t in f.read().splitlines() if t.strip()]
    else:
        ids = [r.strip() for r in (role_ids or "").split(",") if r.strip()] or [r for r in roles if roles[r]["prio"] < 3]
        bad = [r for r in ids if r not in roles]
        if bad:
            sys.exit("unknown role id: " + ", ".join(bad) + "  (ids: " + ", ".join(roles) + ")")
        texts = [r["대사"].strip() for rid in ids for r in roles[rid]["rows"]]
    who = resolve_lines(texts, roles)
    plan, err = plan_file(path, texts)
    if err:
        sys.exit(f"{os.path.basename(path)}: {err}")
    pieces = plan["pieces"]
    x = decode(path)
    gains = {}
    for rid in {w[0] for w in who if w}:
        seg = [x[int(s * SR):int(e * SR)] for (s, e), w in zip(pieces, who) if w and w[0] == rid]
        xr = np.concatenate(seg) if seg else x
        db, thr, _, _ = analyse(xr)
        gains[rid] = gain_for(xr, db, thr)
    if not dry:
        os.makedirs(out, exist_ok=True)
    rate = [(e - s) / weight(t) for (s, e), t in zip(pieces, texts)]
    problems, made, lines = [], 0, []
    for k, ((s, e), t, w) in enumerate(zip(pieces, texts, who)):
        rid = w[0] if w else None
        same = [rate[j] for j in range(len(texts)) if (who[j][0] if who[j] else None) == rid] or rate
        med = float(np.median(same))
        flag = "long" if rate[k] > med * 1.9 else "short" if rate[k] < med / 1.9 else ""
        name = w[1]["파일명"].strip() if w else f"unknown_{k + 1:03d}.mp3"
        if not w:
            problems.append(f"line {k + 1} is not in any script (text changed?): \"{t[:40]}\" -> saved as {name} for checking")
        if flag:
            problems.append(f"{name} (line {k + 1}): {e - s:.1f}s for \"{t[:30]}\" looks too {flag}, please listen")
        lines.append(f"   {k + 1:>3}. {name:<22} {rid or '?':<10} {e - s:5.2f}s  {t[:34]}{'  <- ' + flag if flag else ''}")
        if not dry:
            cut(path, s, e, gains.get(rid, plan["gain"]), os.path.join(out, name))
            made += 1
    print("\n".join(lines))
    print("volume per role: " + ", ".join(f"{r} {g:+.1f} dB" for r, g in sorted(gains.items())))
    if plan["unclear"]:
        problems.append("the pauses between lines are about as long as pauses inside lines; listen to the pieces, "
                        "or download again with longer pauses (about 1 second)")
    print(f"\n{made} file(s) written to {out}" if not dry else "\n(dry run: nothing written)")
    if problems:
        print("\nCheck these:")
        for p in problems:
            print(" -", p)
    if made:
        print("Next: python tools/make_voice_manifest.py")
    return problems


# ---------------------------------------------------------------- split-srt (one recording + its subtitles)
def loose_key(t):
    t = str(t)
    for q in '"\'\u201c\u201d\u2018\u2019':
        t = t.replace(q, "")
    t = t.replace("...", "\u2026")
    return re.sub(r"[\s.]+$", "", re.sub(r"\s+", " ", t).strip())


def parse_srt(path):
    with open(path, encoding="utf-8-sig") as f:
        s = f.read().replace("\r\n", "\n")
    out = []
    for blk in re.split(r"\n\s*\n", s.strip()):
        lines = blk.split("\n")
        m = next((re.match(r"(\d+):(\d+):(\d+)[,.](\d+)\s*-->\s*(\d+):(\d+):(\d+)[,.](\d+)", ln) for ln in lines[:2]
                  if re.match(r"\d+:\d+:\d+", ln)), None)
        if not m:
            continue
        g = [int(v) for v in m.groups()]
        a = g[0] * 3600 + g[1] * 60 + g[2] + g[3] / 1000
        b = g[4] * 3600 + g[5] * 60 + g[6] + g[7] / 1000
        k = next(i for i, ln in enumerate(lines) if "-->" in ln)
        text = " ".join(ln.strip() for ln in lines[k + 1:] if ln.strip())
        if text:
            out.append((a, b, text))
    return out


def split_srt(audio, srt, out=None, dry=False, small=True):
    """Cut one recording at its subtitle times. Every subtitle line is matched to the scripts (who says it, which file name);
    a line that several roles say goes to the role of the lines around it. Silence at both ends is trimmed and every role
    gets its own volume. small=True writes mono 40 kbps files (the app size), otherwise 96 kbps."""
    import numpy as np
    roles = load_roles()
    index = {}
    for rid, role in roles.items():
        for r in role["rows"]:
            index.setdefault(loose_key(r["대사"]), {}).setdefault(rid, []).append(r)
    seen = set()
    for r in read_csv("dubbing_b1.csv") + read_csv("dubbing_b2.csv") + read_csv("dubbing_cases.csv"):
        if r["화자ID"].strip() == "narrator" and r["파일명"] not in seen:   # the story narrator (letters are already in roles)
            seen.add(r["파일명"])
            index.setdefault(loose_key(r["대사"]), {}).setdefault("narrator", []).append(r)
    entries = parse_srt(srt)
    if not entries:
        sys.exit("no subtitle lines found in " + srt)
    cand = [index.get(loose_key(t)) for _, _, t in entries]
    who = []
    for i, c in enumerate(cand):
        if not c:
            who.append(None)
            continue
        if len(c) == 1:
            who.append(next(iter(c)))
            continue
        prev = next((who[j] for j in range(i - 1, -1, -1) if who[j]), None)
        nxt = next((next(iter(cand[j])) for j in range(i + 1, len(cand)) if cand[j] and len(cand[j]) == 1), None)
        who.append(prev if prev in c else nxt if nxt in c else sorted(c)[0])
    x = decode(audio)
    db, thr, runs, hop = analyse(x)
    n, step = len(db), hop / SR
    loud = db >= thr
    spans, problems = [], []
    for k, (a, b, t) in enumerate(entries):
        A, B = max(0, int(a / step)), min(n, int(b / step) + 1)
        idx = np.where(loud[A:B])[0]
        if not len(idx):
            spans.append(None)
            problems.append(f"line {k + 1} is silent between {a:.2f}s and {b:.2f}s: \"{t[:30]}\"")
            continue
        s0, s1 = a + idx[0] * step, a + (idx[-1] + 3) * step
        lo = entries[k - 1][1] - 0.03 if k else 0.0
        hi = entries[k + 1][0] + 0.03 if k + 1 < len(entries) else len(x) / SR
        spans.append((max(lo, s0 - 0.10), min(hi, s1 + 0.18)))
        if loud[max(0, B - 3):B + 1].any() and k + 1 < len(entries):
            problems.append(f"line {k + 1}: speech goes past its end time ({b:.2f}s), listen to it: \"{t[:30]}\"")
    gains = {}
    for rid in {w for w in who if w}:
        seg = [x[int(sp[0] * SR):int(sp[1] * SR)] for sp, w in zip(spans, who) if sp and w == rid]
        if seg:
            xr = np.concatenate(seg)
            d2, t2, _, _ = analyse(xr)
            gains[rid] = gain_for(xr, d2, t2)
    if not dry:
        os.makedirs(out, exist_ok=True)
    queue = {}
    made, report, written = 0, [], {}
    for k, ((a, b, t), w, sp) in enumerate(zip(entries, who, spans)):
        if not w:
            problems.append(f"line {k + 1} is not in the scripts (text changed?): \"{t[:40]}\"")
            continue
        if not sp:
            continue
        key = (w, loose_key(t))
        rows = cand[k][w]
        q = queue.setdefault(key, list(rows))
        row = q.pop(0) if q else rows[-1]
        name = row["파일명"].strip()
        report.append(f"   {k + 1:>3}. {name:<22} {w:<10} {sp[1] - sp[0]:5.2f}s  {t[:34]}")
        if not dry:
            d = sp[1] - sp[0]
            fade = min(0.015, d / 4)
            af = f"volume={gains.get(w, 0):.2f}dB,afade=t=in:d={fade:.3f},afade=t=out:st={d - fade:.3f}:d={fade:.3f}"
            enc = ["-ac", "1", "-ar", "24000", "-b:a", "40k"] if small else ["-ac", "1", "-ar", "44100", "-b:a", "96k"]
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{sp[0]:.3f}", "-t", f"{d:.3f}", "-i", audio, "-af", af]
                           + enc + ["-codec:a", "libmp3lame", os.path.join(out, name)], check=True)
            written[key] = name
            made += 1
    # the same role saying the same line in another place (another file name) gets the same recording
    extra = 0
    for (w, lk), q in queue.items():
        for row in q:
            name = row["파일명"].strip()
            if not dry and (w, lk) in written:
                shutil.copy2(os.path.join(out, written[(w, lk)]), os.path.join(out, name))
            extra += 1
    print("\n".join(report))
    print("volume per role: " + ", ".join(f"{r} {g:+.1f} dB" for r, g in sorted(gains.items())))
    by_role = {}
    for w in who:
        if w:
            by_role[w] = by_role.get(w, 0) + 1
    print("lines per role: " + ", ".join(f"{r} {c}" for r, c in sorted(by_role.items())))
    print(f"\n{made} file(s) written to {out}" + (f", {extra} more copied for the same line in another place" if extra else "")
          if not dry else f"\n(dry run: {len(entries)} subtitle lines, nothing written)")
    if problems:
        print("\nCheck these:")
        for p in problems:
            print(" -", p)
    return problems


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    m = sub.add_parser("make")
    m.add_argument("out", nargs="?", default=os.path.join(DOCS, "voice_pack"))
    s = sub.add_parser("split")
    s.add_argument("folder")
    s.add_argument("--out", default=os.path.join(ROOT, "audio"))
    s.add_argument("--dry", action="store_true")
    o = sub.add_parser("split-one")
    o.add_argument("file")
    o.add_argument("--order", help="text file: the lines in the order they were read (copied from the editor)")
    o.add_argument("--roles", help="role ids in reading order, e.g. rat,ox,rabbit (default: scripts/00_all_characters.txt)")
    o.add_argument("--out", default=os.path.join(ROOT, "audio"))
    o.add_argument("--dry", action="store_true")
    t = sub.add_parser("split-srt")
    t.add_argument("file")
    t.add_argument("srt")
    t.add_argument("--out", default=os.path.join(ROOT, "audio"))
    t.add_argument("--full", action="store_true", help="96 kbps instead of the small 40 kbps app files")
    t.add_argument("--dry", action="store_true")
    a = ap.parse_args()
    if a.cmd == "make":
        make(a.out)
    elif a.cmd == "split-one":
        split_one(a.file, a.order, a.roles, a.out, a.dry)
    elif a.cmd == "split-srt":
        split_srt(a.file, a.srt, a.out, a.dry, not a.full)
    else:
        split(a.folder, a.out, a.dry)


if __name__ == "__main__":
    main()
