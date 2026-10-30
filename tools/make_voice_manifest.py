"""Write audio/voices.js from the dubbing CSV and the audio files that exist.

Put the recorded files in audio/ with the exact names from docs/dubbing_b1.csv
(e.g. audio/b1_001.mp3, audio/k01_003.mp3, audio/learn_001.mp3), then run from the project root:

    python tools/make_voice_manifest.py

Lines whose file is missing are left out, so the game reads them with the device voice.
By default it reads docs/dubbing_b1.csv, dubbing_b2.csv, dubbing_cases.csv and dubbing_letters.csv.
You can pass CSV files yourself for later books:  python tools/make_voice_manifest.py docs/dubbing_b2.csv
"""
import csv
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
csv_files = sys.argv[1:] or [p for p in (os.path.join(ROOT, "docs", n) for n in tuple(["dubbing_b%d.csv" % i for i in range(1, 13)] + ["dubbing_cases.csv", "dubbing_letters.csv", "dubbing_extra.csv", os.path.join("voice_pack", "dubbing_extra.csv")])) if os.path.exists(p)] or [os.path.join(ROOT, "docs", n) for n in ("dubbing_b1.csv", "dubbing_b2.csv", "dubbing_cases.csv", "dubbing_letters.csv")
                             if os.path.exists(os.path.join(ROOT, "docs", n))]

entries, missing, seen = [], [], set()
for path in csv_files:
    with open(path, encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            name = row["파일명"].strip()
            if name in seen:
                continue
            seen.add(name)
            if os.path.exists(os.path.join(ROOT, "audio", name)):
                entries.append([row["화자ID"].strip(), row["대사"], "audio/" + name])
            else:
                missing.append(name)

lines = ",\n".join("  " + json.dumps(e, ensure_ascii=False) for e in entries)
with open(os.path.join(ROOT, "audio", "voices.js"), "w", encoding="utf-8") as f:
    f.write("/* Recorded voice files. Each entry: [voice id, line text exactly as in the dubbing CSV, file path].\n"
            "   Lines without a file are read by the device voice. Regenerate with: python tools/make_voice_manifest.py */\n"
            "window.VOICEFILES=[\n" + lines + ("\n" if lines else "") + "];\n")
print(f"linked {len(entries)} file(s); {len(missing)} line(s) have no recording yet (text only)")
