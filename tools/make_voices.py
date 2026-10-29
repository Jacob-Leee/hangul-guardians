"""Make the dubbing MP3s from dubbing_b1.csv (or docs/dubbing_cases.csv) with the OpenAI Speech API.

Usage (from the project root):
  pip install openai
  export OPENAI_API_KEY=sk-...                (Windows: set OPENAI_API_KEY=sk-...)
  PRIORITY=1 python tools/make_voices.py       (priority 1 only; PRIORITY=3 makes everything)
  python tools/make_voice_manifest.py          (links the new files into the game)

Files are written to audio/ with the exact names from the CSV. Files that already
exist are skipped, so you can delete one file and re-run to remake just that line.
"""
import csv
import os
import sys

from openai import OpenAI

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV_PATH = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "docs", "dubbing_b1.csv")
OUT_DIR = os.path.join(ROOT, "audio")
MAX_PRIORITY = int(os.environ.get("PRIORITY", "3"))
MODEL = os.environ.get("TTS_MODEL", "gpt-4o-mini-tts")

# Suggested voices: listen to the test lines first and change these freely.
VOICE = {
    "narrator": "marin", "mentor": "cedar", "sb_rabbit": "nova", "sb_turtle": "sage",
    "v_gray": "verse", "rabbit": "shimmer", "rat": "coral", "ox": "onyx", "tiger": "ash",
    "dragon": "echo", "snake": "ballad", "horse": "alloy", "sheep": "fable", "monkey": "nova",
    "rooster": "coral", "dog": "alloy", "pig": "onyx",
    # Case Squad (docs/dubbing_cases.csv)
    "squirrel": "coral", "beaver": "ash", "spider": "shimmer", "mole": "sage", "gull": "nova",
    "v_black": "verse", "v_white": "shimmer", "v_tiger": "ash", "v_fat": "onyx", "v_purple": "ballad",
}

BASE = ("This is a Korean children's storybook game for a 5-year-old. "
        "Speak natural standard Korean. Read the text exactly as written; do not add or drop words. ")

STYLE = {
    "narrator": "Warm, gentle female storyteller. Calm, clear and slightly slow, with soft sentence endings.",
    "mentor": "Kind old grandfather turtle. Low, slow and relaxed, warm with a little smile; stretch the endings.",
    "sb_rabbit": "Cheeky little rabbit. Fast, bright, high-energy and a bit boastful.",
    "sb_turtle": "Gentle young turtle. Slow, calm and kind, half a beat behind.",
    "v_gray": "Playful cartoon villain cat. Smug and teasing, a little nasal. Never scary.",
    "rabbit": "Bright, brave young girl hero. Cheerful and bouncy.",
    "rat": "Curious young girl. High, quick and lively.",
    "ox": "Steady young boy. Low, slow and solid.",
    "tiger": "Confident young boy leader. Strong and upbeat.",
    "dragon": "Calm, wise older brother. Soft and deep.",
    "snake": "Calm, mysterious older sister. Low and quiet.",
    "horse": "Energetic young boy. Excited and quick.",
    "sheep": "Cosy young girl. Very soft and slow.",
    "monkey": "Mischievous young girl. High and playful.",
    "rooster": "Bright, crisp young girl. Clear and precise.",
    "dog": "Friendly young boy, delighted to see you. Lively and warm.",
    "pig": "Easy-going young boy. Relaxed, with a chuckle.",
}


def main():
    client = OpenAI()
    os.makedirs(OUT_DIR, exist_ok=True)
    with open(CSV_PATH, encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))
    done = 0
    for row in rows:
        if int(row["우선순위"]) > MAX_PRIORITY:
            continue
        path = os.path.join(OUT_DIR, row["파일명"])
        if os.path.exists(path):
            continue
        speaker = row["화자ID"]
        with client.audio.speech.with_streaming_response.create(
            model=MODEL,
            voice=VOICE.get(speaker, "marin"),
            input=row["대사"],
            instructions=BASE + STYLE.get(speaker, ""),
            response_format="mp3",
        ) as response:
            response.stream_to_file(path)
        done += 1
        print("made", path)
    print(f"finished: {done} new file(s) in audio/ — now run: python tools/make_voice_manifest.py")


if __name__ == "__main__":
    main()
