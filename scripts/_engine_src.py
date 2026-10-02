# Shared helpers: map engine-family JSON slugs to the client's source .txt files.
import glob, os, re
SRC = '_src_content/Garage Site - Engine Pages Land Rover'
def slugify(name):
    return re.sub(r'[^a-z0-9]', '', name.lower())
def source_map():
    m = {}
    for f in glob.glob(os.path.join(SRC, '*.txt')):
        base = os.path.basename(f)[:-4].replace('Land Rover ', '', 1)
        m[slugify(base)] = f
    return m
def slugs():
    return sorted(os.path.basename(f)[9:-9] for f in glob.glob('src/data/engine-family/landrover*Sec1.json'))
def source_for(slug):
    m = source_map()
    if slug in m: return m[slug]
    if slug.endswith('bmwsourced') and slug[:-10] in m: return m[slug[:-10]]
    return None
def lines(path):
    return [l.rstrip() for l in open(path, encoding='utf-8').read().replace('\r', '').split('\n')]
