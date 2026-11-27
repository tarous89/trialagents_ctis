"""Convert old variable-based CTIS DOCX templates to labelled-instruction templates.
Every instruction becomes one run in character style 'TAInstruction' (italic, yellow highlight),
text '[KEYWORD: text]'. Keywords: INSERT, IF, OTHERWISE, CHOOSE, NOTE."""
import sys,zipfile,re,json,copy,shutil,os
from lxml import etree
W='http://schemas.openxmlformats.org/wordprocessingml/2006/main'; w='{%s}'%W
V={}
KV={'kv101':'Full title of the clinical trial, as in the protocol','kv102':'EU trial number; leave empty in an initial application until CTIS assigns it','kv103':'Sponsor with full address','date':'Date of this document version'}
COND={'kv104':'the trial collects new samples from participants','kv105':'existing archived samples (e.g. diagnostic or biobank material) are used','kv106':'samples are stored for future use beyond the protocol','kv107':'minors are included in this Member State','kv108':'incapacitated adults are included in this Member State','kv109':'participants may need consent witnessed by an impartial witness','kv110':'participants are included in an emergency situation'}
def fid(code): return 'v'+code[-3:]   # country-neutral id: v01100 -> v100
def neutral(t):
    t=t.replace('Germanyl','Germany')
    t=re.sub(r'\b(in|into) (precise & technical )?German( language| Language)?\b',r'\1 \2the answer language',t)
    t=re.sub(r'\bGerman\b','the answer language',t)
    t=re.sub(r'\bGermany\b','the Member State concerned',t)
    return t
def desc(code):
    return neutral(V[code]['description'].strip())
def instr_run(text,rpr_src=None):
    r=etree.Element(w+'r'); rp=etree.SubElement(r,w+'rPr')
    etree.SubElement(rp,w+'rStyle').set(w+'val','TAInstruction')
    if rpr_src is not None:
        for tag in ('rFonts','sz','szCs'):
            x=rpr_src.find(w+tag)
            if x is not None: rp.append(copy.deepcopy(x))
    etree.SubElement(rp,w+'i'); etree.SubElement(rp,w+'iCs')
    etree.SubElement(rp,w+'highlight').set(w+'val','yellow')
    t=etree.SubElement(r,w+'t'); t.text=text; t.set('{http://www.w3.org/XML/1998/namespace}space','preserve')
    return r
def field(run,fid,alias=''):
    """Wrap an instruction run in a content control tagged with a stable field id."""
    if not fid: return run
    sdt=etree.Element(w+'sdt'); pr=etree.SubElement(sdt,w+'sdtPr')
    if alias: etree.SubElement(pr,w+'alias').set(w+'val',alias[:60])
    etree.SubElement(pr,w+'tag').set(w+'val',fid)
    c=etree.SubElement(sdt,w+'sdtContent'); c.append(run); return sdt
def ptext(p): return ''.join(t.text or '' for t in p.iter(w+'t'))
def first_rpr(p):
    r=p.find('.//'+w+'r'); return r.find(w+'rPr') if r is not None else None
def set_text_runs(p,segments):
    """Replace all runs (also inside sdt) of paragraph p with segments [(kind,text)]."""
    rpr=first_rpr(p)
    for r in list(p.iter(w+'r')):
        par=r.getparent(); par.remove(r)
    # drop empty sdt wrappers inside paragraph
    for sdt in list(p.findall(w+'sdt')):
        p.remove(sdt)
    for seg in segments:
        kind,text=seg[0],seg[1]; fid=seg[2] if len(seg)>2 else None
        if not text: continue
        if kind=='i': p.append(field(instr_run(text,rpr),fid))
        else:
            r=etree.SubElement(p,w+'r')
            if rpr is not None:
                rp=copy.deepcopy(rpr)
                for tag in ('highlight','i','iCs','rStyle'):
                    for x in rp.findall(w+tag): rp.remove(x)
                r.append(rp)
            t=etree.SubElement(r,w+'t'); t.text=text; t.set('{http://www.w3.org/XML/1998/namespace}space','preserve')
COND_RE=r'\{?\{#\s*(kv\d+)\s*===\s*"(true|false)"\s*\}\}'
def inline_segments(s):
    """Transform one paragraph's text with inline markers to segments."""
    segs=[]; pos=0
    pat=re.compile(COND_RE+r'(.*?)\{\{/\}\}|\{\{(v\d{5})\}\}|\{\{(kv10[123]|date)\}\}')
    for m in pat.finditer(s):
        segs.append(('t',s[pos:m.start()])); pos=m.end()
        if m.group(1):
            kv,val,inner=m.group(1),m.group(2),m.group(3).strip()
            vm=re.fullmatch(r'\{\{(v\d{5})\}\}',inner)
            if val=='true':
                segs.append(('i','[IF '+COND[kv]+' – INSERT: '+(desc(vm.group(1)) if vm else inner)+']',fid(vm.group(1)) if vm else None))
            else:
                segs.append(('i','[OTHERWISE: enter "'+(inner or 'N/A')+'"]'))
        elif m.group(4): segs.append(('i','[INSERT: '+desc(m.group(4))+']',fid(m.group(4))))
        else: segs.append(('i','[INSERT: '+KV[m.group(5)]+']',m.group(5)))
    segs.append(('t',s[pos:]))
    return segs
def make_p(text,ref_p,fid=None):
    p=etree.Element(w+'p')
    ppr=ref_p.find(w+'pPr')
    if ppr is not None: p.append(copy.deepcopy(ppr))
    p.append(field(instr_run(text,first_rpr(ref_p)),fid)); return p
KEEP_WORD_PLACEHOLDERS=False
stats={'vars':0,'cond_blocks':0,'inline':0,'cyan':0,'sdt_placeholders':0,'empty_cells':0}
def convert(root):
    body=root.find(w+'body')
    # 1. block conditionals: marker paragraphs alone
    changed=True
    while changed:
        changed=False
        ps=list(body.iter(w+'p'))
        for i,p in enumerate(ps):
            t=ptext(p).strip()
            m=re.fullmatch(COND_RE,t)
            if not m: continue
            kv,val=m.group(1),m.group(2)
            # collect until {{/}}
            j=i+1; inner=[]
            while j<len(ps) and ptext(ps[j]).strip()!='{{/}}': inner.append(ps[j]); j+=1
            end=ps[j] if j<len(ps) else None
            if val=='true':
                p.addprevious(make_p('[CHOOSE: tick "Yes" only if '+COND[kv]+'; otherwise tick "No".]',p,kv))
                for q in inner:
                    for t_ in q.iter(w+'t'):
                        if t_.text: t_.text=t_.text.replace('☒','☐')
            else:
                for q in inner: q.getparent().remove(q)
            p.getparent().remove(p)
            if end is not None: end.getparent().remove(end)
            stats['cond_blocks']+=1; changed=True; break
    # 2. inline markers
    for p in list(body.iter(w+'p')):
        s=ptext(p)
        if '{{' in s or '{#' in s:
            n=len(re.findall(r'\{\{v\d{5}\}\}',s)); stats['vars']+=n; stats['inline']+=1
            set_text_runs(p,inline_segments(s))
    # 3. cyan highlighted runs -> instruction style
    for r in list(body.iter(w+'r')):
        rp=r.find(w+'rPr'); h=rp.find(w+'highlight') if rp is not None else None
        if h is None or h.get(w+'val')!='cyan': continue
        txt=''.join(t.text or '' for t in r.iter(w+'t'))
        if not txt.strip(): rp.remove(h); continue
        if txt.lstrip().startswith('['):
            inner=txt.strip().strip('[]').strip()
            kw='INSERT' if re.match(r'(Enter|Provide|provide)',inner) else 'NOTE'
            stats['auto']=stats.get('auto',0)+1
            new=field(instr_run('['+kw+': '+inner+']',rp),'f%02d'%stats['auto'] if kw=='INSERT' else None)
            r.addprevious(new); r.getparent().remove(r); stats['cyan']+=1
        else:
            rp.remove(h)  # checkbox options etc stay as form text
    # 4. Word placeholder text in content controls (skipped for templates others fill)
    for t in ([] if KEEP_WORD_PLACEHOLDERS else list(body.iter(w+'t'))):
        if t.text and 'Click or tap here to enter text' in t.text:
            r=t.getparent(); label=context_label(r)
            new=instr_run('[INSERT'+(': '+label if label else '')+']',r.find(w+'rPr'))
            r.addprevious(new); r.getparent().remove(r); stats['sdt_placeholders']+=1
            sdt=next((a for a in new.iterancestors(w+'sdt')),None)
            if sdt is not None:
                pr=sdt.find(w+'sdtPr')
                for x in pr.findall(w+'showingPlcHdr'): pr.remove(x)
                tg=pr.find(w+'tag')
                if tg is None: tg=etree.SubElement(pr,w+'tag')
                stats['auto']=stats.get('auto',0)+1; tg.set(w+'val','f%02d'%stats['auto'])
def context_label(r):
    p=next(r.iterancestors(w+'p'))
    before=''
    for x in p.iter(w+'r'):
        if x is r: break
        rs=x.find(w+'rPr'); st=rs.find(w+'rStyle') if rs is not None else None
        if st is not None and st.get(w+'val')=='TAInstruction': continue
        before+=''.join(t.text or '' for t in x.iter(w+'t'))
    before=before.replace('☐','').strip().rstrip(':').strip()
    if before:
        frag=re.split(r'(?<=[.;])\s+|\s{3,}',before)[-1].strip()
        return frag[:160]
    tc=next((a for a in r.iterancestors(w+'tc')),None)
    if tc is None: return ''
    tr=tc.getparent()
    if tr.tag!=w+'tr': return ''
    cells=tr.findall(w+'tc'); idx=cells.index(tc); tbl=tr.getparent()
    for hr in tbl.findall(w+'tr')[:3]:
        hc=hr.findall(w+'tc')
        if hr is not tr and len(hc)==len(cells):
            h=''.join(t.text or '' for t in hc[idx].iter(w+'t')).strip()
            if h and len(h)<=80: return h
    return ''
def add_style(styles):
    root=etree.fromstring(styles)
    if root.find('.//'+w+'style[@'+w+'styleId="TAInstruction"]') is None:
        st=etree.SubElement(root,w+'style'); st.set(w+'type','character'); st.set(w+'styleId','TAInstruction')
        n=etree.SubElement(st,w+'name'); n.set(w+'val','TA Instruction')
        rp=etree.SubElement(st,w+'rPr'); etree.SubElement(rp,w+'i'); etree.SubElement(rp,w+'highlight').set(w+'val','yellow')
    return etree.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True)
def run(src,dst,extra=None):
    zin=zipfile.ZipFile(src); root=etree.fromstring(zin.read('word/document.xml'))
    convert(root)
    if extra: extra(root)
    zout=zipfile.ZipFile(dst,'w',zipfile.ZIP_DEFLATED)
    for it in zin.infolist():
        data=zin.read(it.filename)
        if it.filename=='word/document.xml': data=etree.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True)
        if it.filename=='word/styles.xml': data=add_style(data)
        zout.writestr(it,data)
    zout.close()
if __name__=='__main__':
    src,dst,varsf=sys.argv[1:4]; V.update(json.load(open(varsf)))
    run(src,dst); print(os.path.basename(dst),stats)
