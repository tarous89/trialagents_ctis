"""List the fillable fields of a converted form template: one entry per tagged content control."""
import sys,zipfile,json,re
from lxml import etree
W='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
def text(e): return ''.join(t.text or '' for t in e.iter(W+'t')).strip()
def own_question(sdt):
    p=next(sdt.iterancestors(W+'p'),None); tc=next(sdt.iterancestors(W+'tc'),None)
    head=''
    if tc is not None:
        ps=tc.findall('.//'+W+'p'); head=text(ps[0]) if ps else ''
    line=text(p) if p is not None else ''
    return (head+(' — '+line if line and line!=head else '')).strip()
def fields(path):
    root=etree.fromstring(zipfile.ZipFile(path).read('word/document.xml'))
    out=[]
    for sdt in root.iter(W+'sdt'):
        tag=sdt.find(W+'sdtPr/'+W+'tag')
        if tag is None or not tag.get(W+'val'): continue
        instr=text(sdt.find(W+'sdtContent'))
        if instr in ('☐','☒'):
            tc=next((a for a in sdt.iterancestors(W+'tc')),None); row=tc.getparent() if tc is not None else None
            label=text(row.findall(W+'tc')[0]) if row is not None else ''
            col=''
            if row is not None:
                idx=row.findall(W+'tc').index(tc); hdr=row.getparent().findall(W+'tr')[0].findall(W+'tc')
                if idx<len(hdr) and hdr[idx] is not tc: col=text(hdr[idx])
            if not label or label in ('☐','☒') or re.fullmatch(r'[\d.]+',label):
                label=own_question(sdt)
            if not label:
                p=next(sdt.iterancestors(W+'p'),None); label=text(p) if p is not None else ''
            out.append({'id':tag.get(W+'val'),'kind':'checkbox','question':re.sub(r'\s+',' ',(label+(' | '+col if col else '')))[:300],'instruction':None,'condition':None}); continue
        if not instr.startswith('['): continue
        tc=next((a for a in sdt.iterancestors(W+'tc')),None); q=''
        if tc is not None:
            row=tc.getparent(); cells=row.findall(W+'tc')
            q=' '.join(text(c) for c in cells if c is not tc and not text(c).startswith('['))
            if not q:
                prev=row.getprevious()
                if prev is not None and prev.tag==W+'tr': q=text(prev)
        if re.fullmatch(r'[\d.]*',q or ''): q=own_question(sdt).replace(instr,'').strip()
        if not q:
            p=next(sdt.iterancestors(W+'p'),None)
            q=text(p).replace(instr,'').strip() if p is not None else ''
        kind='choice' if instr.startswith('[CHOOSE') else 'text'
        cond=re.match(r'\[IF ([^–]+) –',instr)
        out.append({'id':tag.get(W+'val'),'kind':kind,'question':re.sub(r'\s+',' ',q)[:400],'instruction':instr,'condition':cond.group(1).strip() if cond else None})
    return out
if __name__=='__main__':
    f=fields(sys.argv[1]); json.dump(f,open(sys.argv[2],'w'),ensure_ascii=False,indent=1); print(len(f),'fields')
