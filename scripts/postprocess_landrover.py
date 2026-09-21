import glob,re,json,os
R=os.path.join(os.path.dirname(__file__),'..','src','data')
M={'/landrover-velar-engines':'/range-rover-velar-engines','/landrover-freelander-td4-l359-engines':'/landrover-freelander-td4-engines','/landrover-range-rover-sport-p440e-p460e-engines':'/landrover-range-rover-sport-p440e-engines','/landrover-range-rover-evoque-evoque-td4-engines':'/landrover-evoque-td4-engines','/landrover-range-rover-evoque-td4-engines':'/landrover-evoque-td4-engines'}
for f in glob.glob(R+'/**/*.json',recursive=True):
    s=open(f,encoding='utf8').read();o=s
    s=s.replace('01268 944 234','0203 488 4649').replace('engine engines','engines')
    for a,b in M.items(): s=s.replace(f'"{a}"',f'"{b}"')
    if s!=o: open(f,'w',encoding='utf8').write(s)
for f in glob.glob(R+'/**/*.json',recursive=True):
    s=open(f,encoding='utf8').read();o=s
    for c in ('d180','d200','d240','d250','p250','p340','p400'): s=s.replace(f'"/landrover-velar-{c}-engines"',f'"/landrover-range-rover-velar-{c}-engines"')
    if s!=o: open(f,'w',encoding='utf8').write(s)

# resolve/drop related links that point at non-existent pages
_routes=[x['slug'] for x in json.load(open(R+'/shared/siteRoutes.json',encoding='utf8'))]
_rs={'/'+s for s in _routes}
_var=[s for s in _routes if s.startswith('landrover-') and s.endswith('-engines')]
_n=lambda s:re.sub(r'[^a-z0-9]','',s.lower())
def _resolve(label):
    k=_n(re.sub(r'^Land Rover\s+|\s+Engine$','',label,flags=re.I))
    k2=_n(re.sub(r'^(Range Rover )?(Evoque|Sport|Velar)\s+','',re.sub(r'^Land Rover\s+|\s+Engine$','',label,flags=re.I),flags=re.I))
    for s in _var:
        t=_n(s[len('landrover-'):-len('-engines')])
        if t==k or t.endswith(k) and len(k)>=3 and t==k: return '/'+s
    for s in _var:
        t=_n(s[len('landrover-'):-len('-engines')])
        if t==k or t==k2 or t=='rangerover'+k2 or t=='evoque'+k2 or t=='velar'+k2 or t=='rangerovervelar'+k2 or t=='rangeroversport'+k2: return '/'+s
    return None
VIEWALL={'/velar-engines':'/range-rover-velar-engines','/range-rover-engines':'/models','/evoque-engines':'/range-rover-evoque-engines','/sport-engines':'/range-rover-sport-engines'}
dropped=0
for f in glob.glob(R+'/variant/*Sec12.json'):
    d=json.load(open(f,encoding='utf8'));rel=d.get('related')
    if not rel: continue
    new=[]
    for l in rel['links']:
        if l['href'] in _rs: new.append(l);continue
        h=_resolve(l['label'])
        if h: l['href']=h;new.append(l)
        else: dropped+=1
    rel['links']=new
    rel['viewAllHref']=VIEWALL.get(rel.get('viewAllHref'),rel.get('viewAllHref'))
    json.dump(d,open(f,'w',encoding='utf8'),ensure_ascii=False,indent=2)
print('related links dropped (no page):',dropped)

# leftover Mercedes wording (upper-case forms the migration substitution missed)
for f in glob.glob(R+'/**/*.json',recursive=True):
    s=open(f,encoding='utf8').read();o=s
    s=re.sub(r'MERCEDES-BENZ|MERCEDES','LAND ROVER',s);s=re.sub(r'Mercedes-Benz|Mercedes','Land Rover',s)
    if s!=o: open(f,'w',encoding='utf8').write(s)
