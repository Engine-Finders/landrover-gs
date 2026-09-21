import json,re,os
D=os.path.join(os.path.dirname(__file__),'..','src','data')
routes=json.load(open(f'{D}/shared/siteRoutes.json',encoding='utf8'))
M={'Defender':'defender','Discovery':'discovery','DiscoverySport':'discovery-sport','Freelander':'freelander','RangeRoverEvoque':'range-rover-evoque','RangeRoverSport':'range-rover-sport','RangeRoverVelar':'range-rover-velar'}
n=lambda s:re.sub(r'[^a-z0-9]','',s.lower())
ALIAS={'Range Rover Evoque TD4':'/landrover-evoque-td4-engines','Range Rover Sport P550e':'/landrover-range-rover-p550e-engines','Range Rover Velar D300':'/landrover-velar-d300-engines','Range Rover Velar P300':'/landrover-velar-p300-engines','Range Rover Velar P400e':'/landrover-velar-p400e-engines'}
def find(m,label):
    if label in ALIAS: return ALIAS[label]
    pre=f'landrover-{M[m]}-'
    cands={r['slug'][len(pre):-len('-engines')]:r['slug'] for r in routes if r['type']=='variant' and r['slug'].startswith(pre) and r['slug'].endswith('-engines')}
    base=re.sub(r'\(.*?\)','',label).strip()
    base=re.sub('^'+re.escape(re.sub(r'([a-z])([A-Z])',r'\1 \2',m))+r'\s+','',base,flags=re.I)
    k=n(base)
    for s,slug in cands.items():
        if n(s)==k: return '/'+slug
    hits=[slug for s,slug in cands.items() if k and n(s).startswith(k)]
    return '/'+hits[0] if len(hits)==1 else None
miss=[]
for m in M:
    p=f'{D}/model/landrover{m}Sec17.json'
    if not os.path.exists(p): continue
    d=json.load(open(p,encoding='utf8'))
    for tab in d['tabVariants']:
        for v in tab:
            h=find(m,v['label'])
            if h: v['href']=h
            else: miss.append((m,v['label']))
    json.dump(d,open(p,'w',encoding='utf8'),ensure_ascii=False,indent=2)
print('unmatched',miss)

# Sec10: popular-variant cards + full list
for m in M:
    p=f'{D}/model/landrover{m}Sec10.json'
    d=json.load(open(p,encoding='utf8'))
    for c in d['cards']:
        h=find(m,c['model'])
        if h: c['href']=h
    for v in d.get('variants',[]):
        h=find(m,v['label'])
        if h: v['href']=h
    json.dump(d,open(p,'w',encoding='utf8'),ensure_ascii=False,indent=2)

# Sec4 engine families -> engine pages
KEYS=[('aj133','aj133'),('aj41','aj41'),('aj-v8','aj-v8'),('aj150d','aj150d'),('aj200d','aj200d'),('aj200p','aj200p'),('aj300d','aj300d'),('aj300p','aj300p'),
('i6diesel','aj300d'),('bmwsourcedv8','s68-bmw-sourced'),('m47d20','m47d20-bmw-sourced'),('kseries','rover-k-series'),('duratorq','ford-duratorq'),('ecoboost','ford-ecoboost'),
('tdv8','tdv8-sdv8'),('tdv6','tdv6-sdv6'),('sdv6','tdv6-sdv6'),('200tdi','200tdi'),('300tdi','300tdi'),('td5','td5'),('tdi','tdi')]
def fam(t):
    k=n(t)
    for a,b in KEYS:
        if a in k: return f'/landrover-{b}-engine'
for m in M:
    p=f'{D}/model/landrover{m}Sec4.json'
    d=json.load(open(p,encoding='utf8'))
    for r in d['rows']:
        h=fam(r['family'])
        if h: r['familyHref']=h
    json.dump(d,open(p,'w',encoding='utf8'),ensure_ascii=False,indent=2)

# engine-family Sec3: single-variant rows link to the variant page (Mercedes variantHref)
M2={'Defender':'Defender','Discovery':'Discovery','Discovery Sport':'DiscoverySport','Freelander':'Freelander','Range Rover Evoque':'RangeRoverEvoque','Range Rover Sport':'RangeRoverSport','Range Rover Velar':'RangeRoverVelar'}
cnt=0
for f in glob.glob(f'{D}/engine-family/landrover*Sec3.json') if 'glob' in dir() else []: pass
import glob
for f in glob.glob(f'{D}/engine-family/landrover*Sec3.json'):
    d=json.load(open(f,encoding='utf8'));ch=False
    for r in d.get('rows',[]):
        v=r.get('variant','')
        mk=M2.get(r.get('model',''))
        if mk and v and not re.search(r'[,/&]',v):
            h=find(mk,f"{r['model']} {v}")
            if h: r['variantHref']=h;ch=True;cnt+=1
    if ch: json.dump(d,open(f,'w',encoding='utf8'),ensure_ascii=False,indent=2)
print('variantHref added',cnt)
