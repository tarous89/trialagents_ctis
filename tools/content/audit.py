"""Audit a country's content: python3 tools/content/audit.py DE"""
import json,os,glob,re,sys,zipfile
cc=sys.argv[1] if len(sys.argv)>1 else 'DE'
os.chdir(os.path.join(os.path.dirname(__file__),'..','..','content'))
base=f'countries/{cc}'; errs=[]
def exists(rel):
    if not any(os.path.exists(os.path.join(b,rel)) for b in (base,'.')): errs.append('missing file: '+rel)
for f in glob.glob('**/*.json',recursive=True):
    try: json.load(open(f))
    except Exception as e: errs.append(f'invalid json {f}: {e}')
d=json.load(open(f'{base}/requirements.json'))
ids={x['id'] for x in d['documents']}
for doc in d['documents']:
    for k in ('kind','reader','filled_by','default_steps','ctis_title','requirement','language'):
        if k not in doc: errs.append(f"{doc['id']} lacks {k}")
    t=doc.get('template')
    if t: exists(t['file']); exists(t['fields'])
    elif doc['kind'] in ('form','third_party_template'): errs.append(doc['id']+' has no template')
for ps in d['population_sets']:
    for x in ps['documents']: exists(x['template'])
tids={c['id'] for c in d['participant_templates']}
for c in d['participant_templates']: exists(c['file'])
pr=d['population_rules']
for key,v in pr.items():
    if isinstance(v,dict):
        for u in v.get('always',[])+[b['template'] for b in v.get('age_bands',[])]:
            if u not in tids: errs.append('unknown template id '+u)
for u in pr.get('shareable_templates',[]):
    if u not in tids: errs.append('unknown template id '+u)
for group in ('styling','checklists'):
    for v in d[group].values(): exists(v)
for v in d['playbook']: exists(v)
chk=json.load(open(d['checklists']['check']))
for k in chk['by_document']:
    if k not in ids: errs.append('Check items for unknown document '+k)
for doc in d['documents']:
    if doc['kind']!='participant_document' and doc['id'] not in chk['by_document']: errs.append('no Check items for '+doc['id'])
for f in glob.glob(f'{base}/templates/**/*.json',recursive=True):
    if '{{' in open(f).read(): errs.append('old variable in '+f)
for f in glob.glob(f'{base}/templates/part-ii/*.docx'):
    x=zipfile.ZipFile(f).read('word/document.xml').decode()
    if re.search(r'\{\{|\{#',''.join(re.findall(r'<w:t[^>]*>([^<]*)',x))): errs.append('old variable in '+f)
print(f'{cc}: {len(ids)} documents, {len(tids)} participant templates;','errors:',errs or 'none')
sys.exit(1 if errs else 0)
