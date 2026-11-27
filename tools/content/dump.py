import sys,zipfile,re
from lxml import etree
W='{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
def val(e,tag):
    x=e.find('.//'+W+tag); return x.get(W+'val') if x is not None else None
def run_text(r):
    t=''.join(x.text or '' for x in r.iter(W+'t'))
    rp=r.find(W+'rPr'); f=[]
    if rp is not None:
        if rp.find(W+'i') is not None: f.append('i')
        if rp.find(W+'b') is not None: f.append('b')
        h=rp.find(W+'highlight')
        if h is not None: f.append('hl:'+h.get(W+'val'))
        c=rp.find(W+'color')
        if c is not None and c.get(W+'val') not in ('000000','auto'): f.append('c:'+c.get(W+'val'))
    return f'«{",".join(f)}»{t}' if f and t.strip() else t
def walk(e,depth=0,out=[]):
    for ch in e:
        tag=ch.tag.replace(W,'')
        if tag=='p':
            sty=val(ch,'pStyle') or ''
            parts=[]
            for x in ch.iter():
                xt=x.tag.replace(W,'')
                if xt=='r' : parts.append(run_text(x))
                if xt=='sdtPr':
                    parts.append('[SDT tag=%s alias=%s]'%(val(x,'tag'),val(x,'alias')))
            s=''.join(parts).strip()
            if s: out.append('  '*depth+(f'({sty}) ' if sty else '')+s)
        elif tag=='tbl':
            out.append('  '*depth+'<TABLE>')
            for i,tr in enumerate(ch.findall(W+'tr')):
                cells=[]
                for tc in tr.findall(W+'tc'):
                    o=[]; walk(tc,0,o); cells.append(' / '.join(o))
                out.append('  '*depth+'  | '+' | '.join(cells))
            out.append('  '*depth+'</TABLE>')
        elif tag=='sdt':
            pr=ch.find(W+'sdtPr')
            out.append('  '*depth+'[SDT block tag=%s alias=%s]'%(val(pr,'tag'),val(pr,'alias')))
            c=ch.find(W+'sdtContent'); walk(c,depth+1,out)
        elif tag in('body',):
            walk(ch,depth,out)
    return out
xml=zipfile.ZipFile(sys.argv[1]).read('word/document.xml')
root=etree.fromstring(xml)
print('\n'.join(walk(root.find(W+'body'),0,[])))
