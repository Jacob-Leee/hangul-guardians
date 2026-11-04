"""아티팩트용 한 장짜리 페이지 만들기 (아티팩트는 파일 511개가 한도 → 새 그림은 페이지 안에 넣는다).

    python3 make_page.py            # /home/claude/hangul-island.html → /home/claude/hangul-page.html

1) 본부 아이템 그림 58개: 코드 안의 "assets/img/hq/item_*.webp" 경로를 data URI로 바꿈 (파일에서 바로 읽음)
2) 데이터 블록: artifact_data_v77.js (지난 v77 페이지에서 떼어 낸 것 — 사건 배경 k12, 책 표지 폴백, 입장 그림 ENTU,
   카드 TCGU, 놀이터 스킨 PGIMG + pgSkin(), 본부 일 포즈 HQART.work, 카드 src 보정)를 붙인다.
   - TCGU 카드 그림이 지금 파일과 다르면(예: 11/4 영웅 카드 4장 세로판) 블록 안의 그 그림을 새 파일로 바꿔 넣는다.
3) 덧붙이는 항목: 카드 뒷면 PGIMG.backTall, 아티팩트에 파일이 없는 책 그림(INLINE_BOOK)을 data URI로 넣고
   그 책의 dir을 ""로 바꿔 모든 그림 이름을 '경로 또는 data URI'로 바꿈 (엔진은 D.dir+이름으로 그림을 부름).
"""
import base64, json, os, re
ISL = '/home/claude/hangul-island.html'
OUT = '/home/claude/hangul-page.html'
DATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'artifact_data_v77.js')
ASSETS = '/home/claude/assets'
BOOKS = '/home/claude/books'
# 아티팩트 파일 목록(511개)에 없는 책 그림 — 페이지에 넣는다
INLINE_BOOK = {'b2': ['country_walk.webp', 'country_happy.webp', 'city_walk.webp', 'city_travel.webp', 'city_proud.webp',
                      'cat_ready.webp', 'cat_pounce.webp', 'cover.webp']}

def b64(path):
    return 'data:image/webp;base64,' + base64.b64encode(open(path, 'rb').read()).decode()

s = open(ISL, encoding='utf-8').read()
n_items = 0
def item(m):
    global n_items
    n_items += 1
    return '"' + b64(os.path.join(ASSETS, 'img/hq/item_' + m.group(1) + '.webp')) + '"'
s = re.sub(r'"assets/img/hq/item_([a-z0-9_]+)\.webp"', item, s)

blk = open(DATA, encoding='utf-8').read()
# 카드 그림: 블록의 TCGU와 지금 파일이 다르면 교체
i = blk.index('window.TCGU=') + len('window.TCGU=')
j = blk.index('};', i) + 1
tcgu = json.loads(blk[i:j])
changed = []
for cid, uri in tcgu.items():
    f = os.path.join(ASSETS, 'img/card/tcg_' + cid + '.webp')
    if os.path.exists(f):
        new = b64(f)
        if new != uri:
            tcgu[cid] = new
            changed.append(cid)
blk = blk[:i] + json.dumps(tcgu) + blk[j:]

extra = 'PGIMG.backTall="' + b64(os.path.join(ASSETS, 'img/pg/pair_back_tall.webp')) + '";'
for bid, files in INLINE_BOOK.items():
    m = {f: b64(os.path.join(BOOKS, bid, f)) for f in files}
    extra += ('(function(){var N=' + json.dumps(m) + ',D=BD["' + bid + '"];if(!D||D.dir==="")return;var dir=D.dir,abs=[];'
              'function v(x){if(typeof x!=="string"||!/^[\\w-]+\\.webp$/.test(x))return x;var u=N[x]||(dir+x);if(abs.indexOf(u)<0)abs.push(u);return u}'
              'function w(o){Object.keys(o).forEach(function(k){var x=o[k];if(typeof x==="string")o[k]=v(x);else if(x&&typeof x==="object")w(x)})}'
              'w(D);D.dir="";D.__abs=abs})();')
extra += ('(function(){var _bF=bFiles;bFiles=function(D){return D&&D.__abs?D.__abs.slice():_bF(D)}})();'
          'try{cardChip()}catch(e){}try{renderExtras()}catch(e){}')
page = s.rstrip() + '\n<script>' + blk + extra + '</script>\n\n'
open(OUT, 'w', encoding='utf-8').write(page)
print('page ok: items inlined', n_items, '| cards replaced', changed, '| inline books', {k: len(v) for k, v in INLINE_BOOK.items()},
      '| bytes', len(page.encode('utf-8')))
