import json,glob,re,os
exec(open(os.path.join(os.path.dirname(__file__),'link_landrover_variants.py'),encoding='utf8').read().split('miss=[]')[0])
exec("KEYS="+open(os.path.join(os.path.dirname(__file__),'link_landrover_variants.py'),encoding='utf8').read().split('KEYS=')[1].split('def fam')[0]+"\ndef fam(t):\n    k=n(t)\n    for a,b in KEYS:\n        if a in k: return f'/landrover-{b}-engine'")
ren={'/landrover-defender-engines':'/defender-engines','/landrover-discovery-engines':'/discovery-engines','/landrover-discovery-sport-engines':'/discovery-sport-engines','/landrover-freelander-engines':'/freelander-engines','/landrover-range-rover-evoque-engines':'/range-rover-evoque-engines','/landrover-range-rover-sport-engines':'/range-rover-sport-engines','/landrover-range-rover-velar-engines':'/range-rover-velar-engines','/landrover-range-rover-engines':'/models'}
for f in glob.glob(f'{D}/**/*.json',recursive=True):
    s=open(f,encoding='utf8').read();o=s
    for a,b in ren.items(): s=s.replace(f'"{a}"',f'"{b}"')
    if f.endswith('Sec10.json') and '/variant/' in f.replace(chr(92),'/') and 'landrover-m256-engine' in s:
        d=json.loads(s)
        s2=f.replace('Sec10','Sec2')
        eng=''
        if os.path.exists(s2):
            sp=json.load(open(s2,encoding='utf8')).get('specs',[])
            eng=next((x['value'] for x in sp if x.get('label')=='Engine'),'')
        h=fam(eng) if eng else None
        for c in d['codes']['cards']:
            if c.get('codeHref')=='/landrover-m256-engine':
                if h: c['codeHref']=h; c['codeHighlight']=eng.split(' or ')[0][:24]
                else: c.pop('codeHref')
        s=json.dumps(d,ensure_ascii=False,indent=2)
    if s!=o: open(f,'w',encoding='utf8').write(s)
