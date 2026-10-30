# Turns the exported project folder into an installable web app (PWA):
# icons, manifest.webmanifest, an offline service worker (sw.js) with every runtime file precached, iOS home-screen tags, .nojekyll.
# Run it again after ANY change to the game files (code, pictures, sounds): it writes a new version into sw.js,
# which is how installed copies notice the update. Code files are also refreshed in the background on each launch.
# usage (from the project root):  python tools/make_app.py          (Pillow is needed only the first time, to draw the icons)
import os, sys, json, hashlib
HERE = os.path.dirname(os.path.abspath(__file__))
ARGS = [a for a in sys.argv[1:] if not a.startswith('--')]
OUT = os.path.abspath(ARGS[0]) if ARGS else os.path.dirname(HERE)
ICON = os.path.join(OUT, 'assets/img/portrait/tiger.webp')
NAME, SHORT = '열두동물 한글 수비대', '한글 수비대'
BG = '#1C6A88'

# ---- icons: the captain tiger, full bleed (iOS rounds the corners itself) ----
os.makedirs(f'{OUT}/icons', exist_ok=True)
NEED = ['icon-512.png', 'icon-192.png', 'apple-touch-icon.png', 'favicon-32.png', 'maskable-512.png']
if '--icons' in sys.argv or not all(os.path.exists(f'{OUT}/icons/{n}') for n in NEED):
    from PIL import Image
    src = Image.open(ICON).convert('RGB')
    w, h = src.size; side = min(w, h); src = src.crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2))
    for n, sz in [('icon-512.png', 512), ('icon-192.png', 192), ('apple-touch-icon.png', 180), ('favicon-32.png', 32)]:
        src.resize((sz, sz), Image.LANCZOS).save(f'{OUT}/icons/{n}', optimize=True)
    # maskable: Android crops to a circle/squircle inside the middle 80%, so zoom out a little onto the portrait's own edge colour
    edge = src.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
    m = Image.new('RGB', (512, 512), edge); inner = src.resize((440, 440), Image.LANCZOS); m.paste(inner, (36, 36)); m.save(f'{OUT}/icons/maskable-512.png', optimize=True)

# ---- manifest ----
man = {"id": "./", "name": NAME, "short_name": SHORT, "lang": "ko", "dir": "ltr",
       "description": "열두 동물 영웅과 함께 망가진 동화책과 사건을 읽으며 한글을 익히는 어린이 게임",
       "start_url": "./", "scope": "./", "display": "standalone", "orientation": "any",
       "background_color": BG, "theme_color": BG, "categories": ["education", "kids", "games"],
       "icons": [{"src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png"},
                 {"src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png"},
                 {"src": "icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]}
json.dump(man, open(f'{OUT}/manifest.webmanifest', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# ---- index.html: manifest, icons, iOS standalone tags ----
p = f'{OUT}/index.html'; html = open(p, encoding='utf-8').read()
tags = (f'<meta name="description" content="{man["description"]}">\n'
        f'<meta name="theme-color" content="{BG}">\n'
        '<link rel="manifest" href="manifest.webmanifest">\n'
        '<link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32.png">\n'
        '<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">\n'
        '<meta name="apple-mobile-web-app-capable" content="yes">\n'
        '<meta name="mobile-web-app-capable" content="yes">\n'
        '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n'
        f'<meta name="apple-mobile-web-app-title" content="{SHORT}">\n')
if 'rel="manifest"' not in html:
    k = html.index('</title>\n') + len('</title>\n'); html = html[:k] + tags + html[k:]
open(p, 'w', encoding='utf-8').write(html)

# ---- service worker: precache every file the game needs at run time ----
SKIP_DIRS = {'docs', 'tests', 'tools', '.git', '.github', 'node_modules', 'incoming'}
files = []
for root, dirs, fs in os.walk(OUT):
    dirs[:] = sorted(d for d in dirs if d not in SKIP_DIRS and not d.startswith('.'))
    for f in sorted(fs):
        rel = os.path.relpath(os.path.join(root, f), OUT).replace(os.sep, '/')
        if rel in ('sw.js', 'README.md', '.nojekyll') or rel.endswith(('.txt', '.md', '.zip')) or f == 'LICENSE' or f.startswith('.'): continue
        files.append(rel)
core = [f for f in ['index.html', 'css/style.css', 'js/app.js', 'audio/voices.js', 'books/b1/book.js', 'books/b2/book.js', 'manifest.webmanifest',
                    'assets/fonts/jua-korean-400-normal.woff2', 'assets/fonts/gowun-dodum-korean-400-normal.woff2'] if f in files]
rest = [f for f in files if f not in core]
hsh = hashlib.sha256()
for f in files: hsh.update(f.encode()); hsh.update(open(os.path.join(OUT, f), 'rb').read())
version = hsh.hexdigest()[:12]
size = sum(os.path.getsize(os.path.join(OUT, f)) for f in files)
sw = open(os.path.join(HERE, 'sw_template.js'), encoding='utf-8').read()
sw = sw.replace('__VERSION__', version).replace('__CORE__', json.dumps(['./'] + core, ensure_ascii=False)).replace('__REST__', json.dumps(rest, ensure_ascii=False))
open(f'{OUT}/sw.js', 'w', encoding='utf-8').write(sw)
open(f'{OUT}/.nojekyll', 'w').write('')
print(f'app ok: version {version}, {len(files)} files precached ({size/1e6:.1f} MB), core {len(core)}')
