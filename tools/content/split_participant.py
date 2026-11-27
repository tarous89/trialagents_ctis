"""Split a country's participant-facing template text into one JSON file per template.
Usage: split_participant.py <source.txt> <out_dir> [<expected country code>]
Content is kept as supplied; only the old pipeline variables become plain bracket notes."""
import sys,re,json,os
VARS={'{{population_label}}':'[population label]','{{population_description}}':'[population description from the protocol]','{{doc_name_local}}':'[document name]','{{date}}':'[date]'}
def split(src):
    t=open(src,encoding='utf-8-sig').read(); dec=json.JSONDecoder(); i=0; out=[]
    while True:
        m=re.search(r'\{\s*"template_(instructions|content)"',t[i:])
        if not m: break
        o,e=dec.raw_decode(t,i+m.start()); i=e
        if 'template_instructions' in o:
            out.append({'template_instructions':o['template_instructions']})
            if 'template_content' in o: out[-1]['template_content']=o['template_content']
        elif out and 'template_content' not in out[-1]: out[-1]['template_content']=o['template_content']
    return out
def localise(s,lang):
    # variable notes in the template's language where we know it; English otherwise
    L={'de':{'[population label]':'[Kurzbezeichnung der Population]','[population description from the protocol]':'[Beschreibung der Population laut Prüfplan]','[document name]':'[Dokumentname]','[date]':'[Datum]'}}
    for k,v in L.get(lang,{}).items(): s=s.replace(k,v)
    return s
if __name__=='__main__':
    src,outdir=sys.argv[1:3]; expect=sys.argv[3] if len(sys.argv)>3 else None
    os.makedirs(outdir,exist_ok=True); ts=split(src); names=[]
    for d in ts:
        ti=d['template_instructions']
        if expect and ti.get('country_code') and ti['country_code']!=expect: sys.exit(f"country code {ti['country_code']} != {expect}")
        if 'template_content' not in d: sys.exit('no content for '+ti.get('file_name',''))
        s=json.dumps(d,ensure_ascii=False)
        for k,v in VARS.items(): s=s.replace(k,v)
        s=localise(s,ti.get('language_code',''))
        if '{{' in s: sys.exit('unknown variable in '+ti.get('file_name',''))
        d=json.loads(s); fn=d['template_instructions']['file_name']
        name=f"{fn}_{ti.get('country_code','XX')}_{ti.get('language_code','xx')}.json"
        if name in names: name=name.replace('.json',f"_{len(names)}.json")
        names.append(name); json.dump(d,open(os.path.join(outdir,name),'w'),ensure_ascii=False,indent=1)
    print(len(names),'templates:',', '.join(n.split('_')[3] if n.count('_')>3 else n for n in names))
