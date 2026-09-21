import glob,re,os
R=os.path.join(os.path.dirname(__file__),'..','src')
files={d:{n.lower():n for n in os.listdir(f'{R}/data/{d}')} for d in ('variant','engine-family')}
for p in glob.glob(f'{R}/app/*/page.js'):
    s=open(p,encoding='utf8').read();o=s
    def rep(m):
        d,n=m.group(1),m.group(2)
        return f'@/data/{d}/{files[d][n.lower()]}"' if n.lower() in files[d] else m.group(0)
    s=re.sub(r'@/data/(variant|engine-family)/([^"]+\.json)"',rep,s)
    if s!=o: open(p,'w',encoding='utf8').write(s)
