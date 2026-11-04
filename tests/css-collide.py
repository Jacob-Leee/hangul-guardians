# 전역 단일 클래스 CSS 규칙이 서로 다른 컴포넌트에서 재사용되는지(주사위 버그 유형) 탐지
import re,collections
import sys
ARGS=[a for a in sys.argv[1:] if not a.startswith('--')]
H=open(ARGS[0] if ARGS else '/home/claude/hangul-island.html',encoding='utf-8').read()
css=''.join(re.findall(r'<style[^>]*>(.*?)</style>',H,re.S))
js=''.join(re.findall(r'<script[^>]*>(.*?)</script>',H,re.S))
js+= H  # markup too
# flatten @media: remove "@media ...{" wrappers by brace-depth scan
rules=[];depth=0;buf='';sel_stack=[]
i=0
for m in re.finditer(r'([^{}]+)\{([^{}]*)\}',css):
    rules.append((m.group(1).strip(),m.group(2)))
LAYOUT=re.compile(r'(^|;)\s*(position\s*:\s*(absolute|fixed)|inset|left\s*:|top\s*:|right\s*:|bottom\s*:|display\s*:\s*none|width\s*:|height\s*:|transform\s*:|float)')
single=collections.defaultdict(list)
for sel,body in rules:
    for s in sel.split(','):
        s=s.strip()
        s=re.sub(r'^@media[^{]*','',s).strip()
        m=re.fullmatch(r'\.([A-Za-z][\w-]*)(:[\w-]+(\([^)]*\))?)*',s)
        if m and LAYOUT.search(body): single[m.group(1)].append(body[:90])
res=[]
for cls,bodies in single.items():
    pat=re.compile(r'''class(?:Name)?\s*=\s*\\?["'`]([^"'`]*)["'`]''')
    ctx=set()
    for mm in pat.finditer(js):
        toks=mm.group(1).split()
        if cls in toks:
            other=sorted(t for t in toks if t!=cls and not t.startswith('$') and '{' not in t)
            ctx.add(' '.join(other[:2]) or '(alone)')
    adds=len(re.findall(r'''classList\.(?:add|toggle)\(\s*["']%s["']'''%re.escape(cls),js))
    if len(ctx)>=2: res.append((len(ctx),cls,sorted(ctx)[:5],bodies[0],adds))
res.sort(reverse=True)
print('단일 클래스 레이아웃 규칙:',len(single),'개 / 여러 맥락에서 재사용:',len(res),'개')
for n,cls,ctx,b,adds in (res if '--all' in sys.argv else res[:30]):
    print(f'.{cls:12s} 맥락{n:2d}  {ctx}  ⇒ {b[:70]}')

KNOWN=set(['arena', 'bop', 'bpage', 'btn', 'card', 'crscard', 'dfoe', 'dop', 'ent', 'hq3rim', 'hqbox', 'hqcl', 'hqdeco', 'hqfly', 'hqhill', 'hqlamp', 'hqpm', 'hqstar', 'hqtip', 'kzface', 'kzimg', 'kzop', 'kzopts', 'opcard', 'opdeco', 'oprow', 'pad', 'pbtn2', 'pgfish', 'pgsplash', 'portrait', 'ptear', 'rmop', 'rslot', 'spark', 'spk', 'wglow', 'wh', 'xbtn'])
if '--check' in sys.argv:
    new=[c for n,c,ctx,b,a in res if c not in KNOWN]
    print('새 충돌 후보:',new if new else '없음')
    sys.exit(1 if new else 0)
