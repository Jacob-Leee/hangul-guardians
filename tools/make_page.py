"""아티팩트용 페이지 만들기 (v46, 2026-11-04) — 그림은 파일로, 작은 그림만 묶음 1개로.

    python3 make_page.py      # /home/claude/hangul-island.html → /home/claude/hangul-page.html
                              #   + /home/claude/artpage/pack_small.js   (작은 그림 묶음)
                              #   + /home/claude/artpage/manifest.json   (아티팩트에 있어야 할 파일: 게시 경로 → 이 컴퓨터의 파일)

왜: 아티팩트는 판마다 파일 511개·페이지 16MB가 한도다. v77~v79에는 파일 칸이 모자라 새 그림을 페이지 안에 넣어
    페이지가 13.5MB까지 커졌다. v46부터:
  - 음성은 낱개 파일 없이 묶음 13개(audio/vp_*.js, patch33이 만듦) → 새 녹음이 파일 칸을 쓰지 않는다.
  - 그림은 앱(GitHub)과 같은 경로의 파일로 올린다 → 코드가 앱과 똑같이 돌고, 페이지 안 그림 보정 코드가 필요 없다.
  - 첫 화면에 안 나오는 작은 그림(본부 아이템 58장 + 놀이터 그림)만 묶음 1개(assets/img/pack_small.js)로 실어 칸을 아낀다.
    페이지 맨 끝에서 불러 HQART.item·PGIMG를 data URI로 바꾸고 pgSkin()을 다시 부른다.
    묶음이 오기 전(또는 실패하면) 본부 아이템은 3D 이모지로 보인다(앱의 원래 대체 그림).
  - 연필(따라 쓰기 시범, 시작할 때 불러 둠)과 카드 뒷면 세로판(첫 화면의 새 카드 단추)은 처음부터 쓰므로 파일로 둔다.
"""
import base64, fnmatch, glob, json, os, re, sys
HOME = '/home/claude'
ISL = HOME + '/hangul-island.html'
OUT = HOME + '/hangul-page.html'
ART = HOME + '/artpage'
ASSETS = HOME + '/assets'
PACKFILE = 'assets/img/pack_small.js'
PG_AS_FILE = {'trace_pencil.webp', 'pair_back_tall.webp'}


def uri(path):
    return 'data:image/webp;base64,' + base64.b64encode(open(path, 'rb').read()).decode()


os.makedirs(ART, exist_ok=True)
s = open(ISL, encoding='utf-8').read()

# 1) 본부 그림 목록(HQART): 아이템 경로는 페이지에서 빼고 묶음이 채운다
m = re.search(r'window\.HQART=(\{"room":.*?\});', s)
if not m:
    sys.exit('HQART not found')
hq = json.loads(m.group(1))
items = {}
for k, v in hq.get('item', {}).items():
    f = os.path.join(HOME, v)
    if not os.path.exists(f):
        sys.exit('missing ' + f)
    items[k] = uri(f)
hq['item'] = {}
s = s[:m.start(1)] + json.dumps(hq, ensure_ascii=False, separators=(',', ':')) + s[m.end(1):]

# 2) 놀이터 그림(PGIMG): 경로 → data URI (연필·카드 뒷면 세로판은 파일)
pg = {}
for f in sorted(os.listdir(os.path.join(ASSETS, 'img/pg'))):
    if f.endswith('.webp') and f not in PG_AS_FILE and ('"' + f + '"') in s:
        pg['assets/img/pg/' + f] = uri(os.path.join(ASSETS, 'img/pg', f))

pack = ('/* 작은 그림 묶음 (make_page.py가 만듦): 본부 아이템 %d장 + 놀이터 그림 %d장 */\n' % (len(items), len(pg))
        + '(function(){var I=' + json.dumps(items, separators=(',', ':')) + ',P=' + json.dumps(pg, separators=(',', ':')) + ';\n'
        + 'var H=window.HQART;if(H){H.item=H.item||{};for(var k in I)H.item[k]=I[k]}\n'
        + 'function W(o){if(!o||typeof o!=="object")return;Object.keys(o).forEach(function(k){var v=o[k];if(typeof v==="string"){if(P[v])o[k]=P[v]}else W(v)})}\n'
        + 'if(window.PGIMG){W(PGIMG);try{pgSkin()}catch(e){}}\n'
        + 'window.ARTPACK={items:Object.keys(I).length,pg:Object.keys(P).length};\n})();\n')
open(os.path.join(ART, 'pack_small.js'), 'w').write(pack)

page = ('' if s.lstrip()[:9].lower() == '<!doctype' else '<!DOCTYPE html>\n') + s.rstrip() + '\n<script src="' + PACKFILE + '"></script>\n'   # standards mode, like the app and game_new.html
open(OUT, 'w', encoding='utf-8').write(page)

# 3) 아티팩트에 있어야 할 파일 (게시 경로 → 이 컴퓨터의 파일)
RULES = ['assets/audio/bgm/*.mp3', 'assets/fonts/*.woff2',
         'assets/img/card/*_atk.webp', 'assets/img/card/*_def.webp', 'assets/img/card/tcg_*.webp',
         'assets/img/case/*.webp', 'assets/img/course/*.webp', 'assets/img/emoji/*.webp', 'assets/img/hero/*.webp',
         'assets/img/hq/launch_grid.webp', 'assets/img/hq/room_*.webp', 'assets/img/hq/work_*.webp',
         'assets/img/npc/*.webp', 'assets/img/portrait/*.webp', 'assets/img/scene/*.webp', 'assets/img/villain/*.webp',
         'books/*/*.webp'] + ['assets/img/pg/' + f for f in sorted(PG_AS_FILE)]
want = {'index.html': OUT, PACKFILE: os.path.join(ART, 'pack_small.js')}
for f in sorted(glob.glob(HOME + '/artpacks/vp_*.js')):
    want['audio/' + os.path.basename(f)] = f
for r in RULES:
    for f in sorted(glob.glob(os.path.join(HOME, r))):
        want[os.path.relpath(f, HOME)] = f
# 코드가 부르는 그림이 목록에 다 있는지 (묶음에 든 것은 빼고)
refs = set(re.findall(r'((?:assets|books)/[A-Za-z0-9_/.-]+\.(?:webp|png|jpg|mp3|woff2))', s))
miss = sorted(r for r in refs if r not in want and r not in pg and not r.startswith('assets/img/hq/item_') and os.path.exists(os.path.join(HOME, r)))
json.dump(want, open(os.path.join(ART, 'manifest.json'), 'w'), indent=0, sort_keys=True)
by = {}
for k in want:
    d = '/'.join(k.split('/')[:-1]) or '.'
    by[d] = by.get(d, 0) + 1
print('page ok:', len(page.encode('utf-8')), 'bytes | pack_small:', len(pack), 'bytes (items', len(items), '+ pg', len(pg), ') | files:', len(want))
print('  by folder:', ', '.join('%s %d' % kv for kv in sorted(by.items())))
if miss:
    print('  referenced in code but not in the list:', miss)
