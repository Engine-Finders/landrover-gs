import json,re,os,glob
D=os.path.join(os.path.dirname(__file__),'..','src','data')
M={'Defender':'Defender','Discovery':'Discovery','DiscoverySport':'Discovery Sport','Freelander':'Freelander','RangeRoverEvoque':'Range Rover Evoque','RangeRoverSport':'Range Rover Sport','RangeRoverVelar':'Range Rover Velar'}
norm=lambda s:re.sub(r'[^a-z0-9]','',s.lower())
def load(p): return json.load(open(p,encoding='utf8'))
def save(p,d): json.dump(d,open(p,'w',encoding='utf8'),ensure_ascii=False,indent=2)
def spec(m,label):
    key=norm(label.split('(')[0]).replace(norm(M[m]),'',1)
    for f in glob.glob(f'{D}/variant/landrover{m}*Sec2.json'):
        if norm(os.path.basename(f)[len('landrover'+m):-9])==key or norm(os.path.basename(f)[len('landrover'+m):-9]).startswith(key) and key:
            s=load(f).get('specs',[])
            g={x['label'] if 'label' in x else x.get('key'):x.get('value') for x in s} if isinstance(s,list) else s
            return g,f
    return None,None
for m,name in M.items():
    p=f'{D}/model/landrover{m}Sec10.json';d=load(p);cards=[]
    for i,v in enumerate(d['variants'][:10]):
        g,f=spec(m,v['label'])
        if g:
            cap=g.get('Capacity','');fuel=g.get('Fuel','');eng=g.get('Engine','')
            bad=lambda x:'MISSING' in x or len(x)>34
            cap,fuel,eng=[('' if bad(x) else x) for x in (cap,fuel,eng)]
            sp=' '.join(x for x in (cap,fuel) if x)+(f' ({eng})' if eng else '')
            sp=sp.strip() or 'Engine rebuild'
        else: sp='Engine rebuild'
        cards.append({'number':f'{i+1:02d}','model':v['label'],'spec':sp})
    d['cards']=cards;save(p,d)
    p=f'{D}/model/landrover{m}Sec12.json';d=load(p);labs=[v['label'] for v in load(f'{D}/model/landrover{m}Sec10.json')['variants']]
    for i,c in enumerate(d['cards']):
        c['model']=labs[i%len(labs)]
        if 'M156' in c['tag']: c['tag']='Engine Rebuild'
    save(p,d);print(m,[c['spec'] for c in cards])

# --- pass 2: source txt specs + Sec8 review codes
SRC=os.path.join(D,'..','..','_src_content','Garage Site - Variants Pages Land Rover')
def fuel(l):
    t=l.split()[-1] if l.split() else l
    if re.search(r'e$|PHEV',t) and re.match(r'P',t): return 'Petrol Hybrid'
    if re.match(r'(D\d|Td|TD|SD|eD|Tdi|\d.*Di)',t) or 'Tdi' in t: return 'Diesel'
    if re.match(r'(P\d|Si|V6|V8|1\.8)',t): return 'Petrol'
    return ''
def srcspec(label):
    f=os.path.join(SRC,'Land Rover '+label.split('(')[0].strip()+'.txt')
    if not os.path.exists(f): return None
    for ln in open(f,encoding='utf8',errors='ignore'):
        m=re.match(r'Capacity\t(.+)',ln)
        if m: return (m.group(1).strip()+' '+fuel(label)).strip()
for m,name in M.items():
    p=f'{D}/model/landrover{m}Sec10.json';d=load(p);ch=False
    for c in d['cards']:
        if c['spec'] in ('Engine rebuild','Petrol','Diesel') or c['spec'].startswith('~'):
            s=srcspec(c['model'])
            if s: c['spec']=s;ch=True
    save(p,d)
    labs=[c['model'].replace(name+' ','') for c in d['cards']]
    p=f'{D}/model/landrover{m}Sec8.json';d=load(p)
    for i,r in enumerate(d['reviews']):
        v=labs[i%len(labs)]
        r['tag']=f'{name} {v} Engine Rebuild'
        r['text']=re.sub(r'\bC\d{2,3}[a-z]?( Land Rover)?\b|\bC63 Land Rover\b',f'{name} {v}',r['text'])
    save(p,d)
