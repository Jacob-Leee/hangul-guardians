"""아티팩트용 한 장짜리 페이지 만들기 (아티팩트는 파일 512개 제한 → 큰 그림 묶음은 페이지 안에 넣는다).

    python3 make_page.py            # /home/claude/hangul-island.html → /home/claude/hangul-page.html

1) 본부 아이템 그림 58개: 코드 안의 "assets/img/hq/item_*.webp" 경로를 data URI로 바꿈 (파일에서 바로 읽음)
2) 데이터 블록: artifact_data_v77.js (지난 v77 페이지에서 떼어 낸 것 — 사건 배경 k12, 책 표지 폴백, 입장 그림 ENTU,
   카드 TCGU, 놀이터 스킨 PGIMG + pgSkin(), 본부 일 포즈 HQART.work, 카드 src 보정)를 그대로 붙이고,
   그 뒤에 새 항목(카드 뒷면 PGIMG.backTall 등)을 덧붙인다.
"""
import base64, os, re
ISL = '/home/claude/hangul-island.html'
OUT = '/home/claude/hangul-page.html'
DATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'artifact_data_v77.js')
ASSETS = '/home/claude/assets'

def uri(rel):
    return 'data:image/webp;base64,' + base64.b64encode(open(os.path.join(ASSETS, rel), 'rb').read()).decode()

s = open(ISL, encoding='utf-8').read()
n_items = 0
def item(m):
    global n_items
    n_items += 1
    return '"' + uri('img/hq/item_' + m.group(1) + '.webp') + '"'
s = re.sub(r'"assets/img/hq/item_([a-z0-9_]+)\.webp"', item, s)

blk = open(DATA, encoding='utf-8').read()
extra = ('PGIMG.backTall="' + uri('img/pg/pair_back_tall.webp') + '";'
         'try{cardChip()}catch(e){}try{renderExtras()}catch(e){}')
page = s.rstrip() + '\n<script>' + blk + extra + '</script>\n\n'
open(OUT, 'w', encoding='utf-8').write(page)
print('page ok: items inlined', n_items, '| bytes', len(page.encode('utf-8')))
