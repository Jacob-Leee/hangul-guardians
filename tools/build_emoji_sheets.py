"""Rebuild the 3D emoji pictures after new emoji appear in the game text.

Every emoji written in index.html, js/app.js or books/*/book.js is shown as a 3D picture from Microsoft Fluent Emoji
(MIT licence, assets/img/emoji/LICENSE-fluent-emoji.txt). The pictures are packed into 8x8 sheets of 160 px cells
(assets/img/emoji/e0.webp, e1.webp, ...) and js/app.js holds the map from emoji to sheet and cell (var EMJ_MAP=...).
Emoji that already have a cell keep it, new ones are added at the end, emoji without a Fluent picture stay normal text.

    pip install pillow
    python tools/build_emoji_sheets.py      # downloads only the needed pictures (git sparse checkout into .cache/)
    python tools/make_app.py                # so the installed app saves the new sheets

Needs git and network access to github.com.
"""
import json
import os
import re
import shutil
import subprocess
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "img", "emoji")
CACHE = os.path.join(ROOT, ".cache", "fluentui-emoji")
APP = os.path.join(ROOT, "js", "app.js")
REPO_URL = "https://github.com/microsoft/fluentui-emoji"
CELL, N = 160, 8
EMOJI = re.compile("(?:[\U0001F000-\U0001FAFF☀-➿⬀-⯿←-⇿⌀-⏿]"
                   "(?:️|[\U0001F3FB-\U0001F3FF])?(?:‍[\U0001F000-\U0001FAFF☀-➿]️?)*)")


def key(e):
    return " ".join("%x" % ord(c) for c in e if ord(c) != 0xFE0F)


def git(*args, **kw):
    return subprocess.run(["git", "-C", CACHE] + list(args), check=True, capture_output=True, text=True, **kw).stdout


def main():
    texts = [open(os.path.join(ROOT, "index.html"), encoding="utf-8").read()]
    app = open(APP, encoding="utf-8").read()
    texts.append(app)
    books = os.path.join(ROOT, "books")
    for d in sorted(os.listdir(books)) if os.path.isdir(books) else []:
        p = os.path.join(books, d, "book.js")
        if os.path.exists(p):
            texts.append(open(p, encoding="utf-8").read())
    m = re.search(r"var EMJ_MAP=(\{.*?\});", app)
    if not m:
        sys.exit("var EMJ_MAP=...; not found in js/app.js")
    old = json.loads(m.group(1))
    used = {key(e) for t in texts for e in EMOJI.findall(t)}
    if not os.path.isdir(os.path.join(CACHE, ".git")):
        os.makedirs(os.path.dirname(CACHE), exist_ok=True)
        subprocess.run(["git", "clone", "--depth", "1", "--filter=blob:none", "--sparse", REPO_URL, CACHE], check=True)
        git("sparse-checkout", "set", "--no-cone", "/assets/*/metadata.json", "/LICENSE")
    folder = {}
    for d in os.listdir(os.path.join(CACHE, "assets")):
        mp = os.path.join(CACHE, "assets", d, "metadata.json")
        if os.path.exists(mp):
            meta = json.load(open(mp, encoding="utf-8"))
            folder[" ".join(x for x in meta.get("unicode", "").lower().split() if x != "fe0f")] = d
    tree = git("ls-tree", "-r", "--name-only", "HEAD", "assets").splitlines()
    png = {}
    for k in sorted(used | set(old)):
        d = folder.get(k)
        if not d:
            continue
        pre = "assets/" + d + "/"
        c = [p for p in tree if p.startswith(pre) and p.endswith(".png") and "/3D/" in p]
        pick = [p for p in c if p.startswith(pre + "3D/")] or [p for p in c if p.startswith(pre + "Default/3D/")]
        if pick:
            png[k] = pick[0]
    want = sorted(set(git("sparse-checkout", "list").split()) | {"/" + p for p in png.values()})
    git("sparse-checkout", "set", "--no-cone", "--stdin", input="\n".join(want) + "\n")
    # keep every existing cell where it is; new emoji go after the last cell
    slots = {k: v[0] * N * N + v[1] for k, v in old.items() if k in png}
    nxt = max(slots.values(), default=-1) + 1
    for k in sorted(k for k in used if k in png and k not in slots):
        slots[k] = nxt
        nxt += 1
    sheets = max(slots.values()) // (N * N) + 1 if slots else 0
    os.makedirs(OUT, exist_ok=True)
    for f in os.listdir(OUT):
        if re.fullmatch(r"e\d+\.webp", f):
            os.remove(os.path.join(OUT, f))
    for si in range(sheets):
        sheet = Image.new("RGBA", (CELL * N, CELL * N), (0, 0, 0, 0))
        for k, pos in slots.items():
            if pos // (N * N) != si:
                continue
            j = pos % (N * N)
            im = Image.open(os.path.join(CACHE, png[k])).convert("RGBA").resize((CELL, CELL), Image.LANCZOS)
            sheet.paste(im, ((j % N) * CELL, (j // N) * CELL), im)
        sheet.save(os.path.join(OUT, f"e{si}.webp"), "WEBP", quality=82, method=6)
    emap = {k: [pos // (N * N), pos % (N * N)] for k, pos in sorted(slots.items(), key=lambda kv: kv[1])}
    app = app[:m.start(1)] + json.dumps(emap, separators=(",", ":")) + app[m.end(1):]
    open(APP, "w", encoding="utf-8").write(app)
    shutil.copy(os.path.join(CACHE, "LICENSE"), os.path.join(OUT, "LICENSE-fluent-emoji.txt"))
    new = sorted(k for k in slots if k not in old)
    missing = sorted(k for k in used if k not in png)
    print(f"{len(slots)} pictures in {sheets} sheet(s); new: {len(new)}")
    if missing:
        print("no 3D picture (shown as normal emoji): " + " ".join("".join(chr(int(c, 16)) for c in k.split()) for k in missing))
    print("next: python tools/make_app.py")


if __name__ == "__main__":
    main()
