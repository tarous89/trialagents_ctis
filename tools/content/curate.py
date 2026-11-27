import sys,os,re,json,zipfile
sys.path.insert(0,os.path.dirname(__file__))
import convert_docx as C
from lxml import etree
w=C.w
CFG={
'K1':dict(intro=['How to use this document','This template should be used','National language requirements','This template has been developed']),
'N1':dict(intro=['This form may be used','To minimise the number','When completing this form','Where information which','A separate document should','By using this template','This template has been endorsed'],
  after={'Issued by:':'[NOTE: leave the signature block empty in the CTIS copy unless the Member State requires a signature.]'}),
'S1':dict(intro=['How to use this document','This form may be used','If the information is already','This Part II template has been developed']),
'P1':dict(intro=['This template may be used','Please note that for trials','This template has been endorsed']),
'R1':dict(after={'The sponsor declares that data':'[IF the Member State requires a statement on national data-protection rules (see the country requirements) – INSERT: that statement, in the answer language.]',
         'Date:':'[INSERT: date]','Name and surname':'[INSERT: name of the responsible person at the sponsor]','Role in the sponsor':'[INSERT: role in the sponsor organisation]'}),
'M1':dict(),'M2':dict(),
}
THIRD_PARTY=('M1','M2')
def curate(root,key):
    cfg=CFG[key]; body=root.find(w+'body')
    if key in THIRD_PARTY: return
    ps=list(body.iter(w+'p'))
    # intro paragraphs -> NOTE (remove before final)
    for p in ps:
        t=C.ptext(p).strip()
        if any(t.startswith(x) for x in cfg.get('intro',[])):
            C.set_text_runs(p,[('i','[NOTE – delete before submission: '+t+']')])
    for anchor,text in (cfg.get('after') or {}).items():
        if not text: continue
        for p in list(body.iter(w+'p')):
            if C.ptext(p).strip().startswith(anchor):
                fid=key.lower()+'_'+re.sub(r'[^a-z]+','_',anchor.lower()).strip('_')[:20]
                if anchor.endswith(':') or anchor in('Name and surname','Role in the sponsor'):
                    p.append(C.field(C.instr_run(' '+text,C.first_rpr(p)),fid))
                else:
                    p.addnext(C.make_p(text,p,None if text.startswith('[NOTE') else fid))
                break
    first=next(x for x in body if x.tag in (w+'p',w+'tbl'))
    ref=first if first.tag==w+'p' else next(body.iter(w+'p'))
    pass
    for tr in body.iter(w+'tr'):
        cells=tr.findall(w+'tc')
        if len(cells)==2:
            label=C.ptext(cells[0]).strip()
            for t in cells[1].iter(w+'t'):
                if t.text and t.text.strip()=='[INSERT: Enter text]': t.getparent().getparent().remove(t.getparent())
            pass
    n=0
    for sdt in body.iter(w+'sdt'):
        pr=sdt.find(w+'sdtPr'); txt=C.ptext(sdt)
        if txt.strip() in ('☐','☒') and pr.find(w+'tag') is None:
            n+=1; etree.SubElement(pr,w+'tag').set(w+'val','cb%02d'%n)
    k=0
    for tc in body.iter(w+'tc'):
        ps=[p for p in tc.findall(w+'p') if C.ptext(p).strip().startswith('☐') and p.find('.//'+w+'sdt') is None]
        if ps and not any('CHOOSE' in C.ptext(p) for p in tc.findall(w+'p')):
            k+=1; ps[0].addprevious(C.make_p('[CHOOSE: tick the option that applies (☒); leave the others empty.]',ps[0],'choice%02d'%k))
    # generic labels left: make them explicit
    for r in body.iter(w+'r'):
        for t in r.iter(w+'t'):
            if t.text=='[INSERT]': t.text='[INSERT: information to be provided by the sponsor; do not invent]'
if __name__=='__main__':
    src,dst,varsf=sys.argv[1:4]; key=os.path.basename(src)[:2]
    C.V.update(json.load(open(varsf))); C.KEEP_WORD_PLACEHOLDERS = key in THIRD_PARTY
    C.run(src,dst,extra=lambda root:curate(root,key)); print(os.path.basename(dst),C.stats)
