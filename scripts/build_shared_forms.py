"""Build the shared EU Part II forms for the catalog from the original coded Word files.
python3 scripts/build_shared_forms.py <source dir with *_DE_de.docx> <variables.json> <our fields dir> <catalog dir> <effective>"""
import sys,os,re,json,zipfile,copy,yaml,shutil
from lxml import etree
SRC,VARS,FIELDS,OUT,EFF=sys.argv[1:6]
W='http://schemas.openxmlformats.org/wordprocessingml/2006/main'; w='{%s}'%W
W14='http://schemas.microsoft.com/office/word/2010/wordml'
V=json.load(open(VARS))
def neutral(t):
    t=t.replace('Germanyl','Germany')
    t=re.sub(r'\b(in|into) (precise & technical )?German( language| Language)?\b',r'\1 \2the language of this form version',t)
    t=re.sub(r'\bGerman\b','the language of this form version',t); t=re.sub(r'\bGermany\b','the Member State concerned',t)
    return t
KV={'kv101':('text','Full title of the clinical trial, exactly as in the protocol.'),
    'kv102':('text','EU trial number (EU CT number). Use a [[missing information]] mark if CTIS has not assigned it yet.'),
    'kv103':('text','Sponsor (legal entity) with full address, as in the CTIS application.'),
    'date':('text','Date of this sponsor version of the form, in the form\'s language.'),
    'kv104':('choice','Does the trial collect new samples from participants? true or false.'),
    'kv105':('choice','Does the trial use existing archived samples (diagnostic or biobank material)? true or false.'),
    'kv106':('choice','Are samples stored for future use beyond the protocol? true or false.'),
    'kv107':('choice','Are minors included in this Member State? true or false.'),
    'kv108':('choice','Are incapacitated adults included in this Member State? true or false.'),
    'kv109':('choice','May participants need consent witnessed by an impartial witness? true or false.'),
    'kv110':('choice','Are participants included in an emergency situation? true or false.')}
FORMS={'K1':('K1_recruitment-arrangements','K1 Recruitment arrangements and informed consent procedure (EU template v2.0)','K1_Recruitment arrangements'),
 'N1':('N1_site-suitability','N1 Site suitability (EU/CTAG template)','N1_Site suitability'),
 'S1':('S1_biological-samples','S1 Biological samples (EU template)','S1_Biological samples'),
 'P1':('P1_compensation','P1 Compensation for trial participants (EU/CTAG template)','P1_Participant compensation'),
 'R1':('R1_data-protection','R1 Statement of compliance with the GDPR (EU template)','R1_Data protection'),
 'M1':('M1_CV','M1 Curriculum vitae of the principal investigator (EU template)','M1_CV Principal investigator'),
 'M2':('M2_DoI','M2 Declaration of interest of the principal investigator (EU template)','M2_DoI Principal investigator')}
def ptext(e): return ''.join(t.text or '' for t in e.iter(w+'t'))
def sdt_tag(sdt,tag):
    pr=sdt.find(w+'sdtPr')
    if pr is None: pr=etree.SubElement(sdt,w+'sdtPr'); sdt.insert(0,pr)
    t=pr.find(w+'tag')
    if t is None: t=etree.SubElement(pr,w+'tag')
    t.set(w+'val',tag)
    for r in sdt.iter(w+'rStyle'):
        if r.get(w+'val') in ('Platzhaltertext','PlaceholderText'): r.getparent().remove(r)
def new_sdt(tag,ref_rpr=None):
    sdt=etree.Element(w+'sdt'); pr=etree.SubElement(sdt,w+'sdtPr'); etree.SubElement(pr,w+'tag').set(w+'val',tag)
    c=etree.SubElement(sdt,w+'sdtContent'); r=etree.SubElement(c,w+'r')
    if ref_rpr is not None: r.append(copy.deepcopy(ref_rpr))
    t=etree.SubElement(r,w+'t'); t.text=' '; t.set('{http://www.w3.org/XML/1998/namespace}space','preserve'); return sdt
def tag_controls(root,key):
    """P1/M1-style forms: tag Word checkbox and text content controls so the server can fill them."""
    n=f=0; out=[]
    for sdt in root.iter(w+'sdt'):
        pr=sdt.find(w+'sdtPr'); txt=ptext(sdt).strip()
        if pr is not None and pr.find(w+'tag') is not None and pr.find(w+'tag').get(w+'val'): continue
        if pr is not None and pr.find('{%s}checkbox'%W14) is not None:
            n+=1; sdt_tag(sdt,f'cb{n:02d}'); out.append(('checkbox',f'cb{n:02d}',sdt))
        elif 'Click or tap' in txt:
            f+=1; sdt_tag(sdt,f'f{f:02d}'); out.append(('text',f'f{f:02d}',sdt))
    return out
def build(key):
    code,name,stem=FORMS[key]
    src=os.path.join(SRC,[x for x in os.listdir(SRC) if x.startswith(key+'_') and x.endswith('.docx')][0])
    z=zipfile.ZipFile(src); root=etree.fromstring(z.read('word/document.xml')); added=[]
    ours={x['id']:x for x in json.load(open(os.path.join(FIELDS,stem+'.fields.json')))}
    if key in ('P1',): added=tag_controls(root,key)
    # existing tags in the original (M1 has "Phase " and "Ongoing"): normalise to valid ids and declare them
    pre=[]
    for sdt in root.iter(w+'sdt'):
        pr=sdt.find(w+'sdtPr'); tg=pr.find(w+'tag') if pr is not None else None
        if tg is None or not tg.get(w+'val'): continue
        v=tg.get(w+'val')
        if any(v==a[1] for a in added): continue
        nv=re.sub(r'[^A-Za-z0-9_.-]','',v.strip().lower().replace(' ','_'))[:40]
        tg.set(w+'val',nv)
        box=pr.find('{%s}checkbox'%W14) is not None
        if nv not in [x[1] for x in pre]: pre.append(('checkbox' if box else 'text',nv,'investigator'))
    if key=='R1':
        for p in list(root.iter(w+'p')):
            t=ptext(p).strip()
            for anchor,tag in (('Date:','r1_date'),('Name and surname','r1_name'),('Role in the sponsor','r1_role')):
                if t.startswith(anchor):
                    r=p.find('.//'+w+'r'); p.append(new_sdt(tag,r.find(w+'rPr') if r is not None else None)); added.append(('text',tag,None))
            if t.startswith('The sponsor declares that data'):
                np_=etree.Element(w+'p'); ppr=p.find(w+'pPr')
                if ppr is not None: np_.append(copy.deepcopy(ppr))
                np_.append(new_sdt('r1_national')); p.addnext(np_); added.append(('text','r1_national',None))
    fn=f'{code}.docx'
    with zipfile.ZipFile(os.path.join(OUT,'styling',fn),'w',zipfile.ZIP_DEFLATED) as zo:
        for it in z.infolist():
            data=z.read(it.filename)
            if it.filename=='word/document.xml': data=etree.tostring(root,xml_declaration=True,encoding='UTF-8',standalone=True)
            zo.writestr(it,data)
    # slots: every {{code}} and condition in the file, plus tagged controls
    text=''.join(t.text or '' for t in root.iter(w+'t'))
    codes=list(dict.fromkeys(re.findall(r'\{\{([A-Za-z][A-Za-z0-9_]*)\}\}',text)+re.findall(r'\{?\{#\s*([A-Za-z][A-Za-z0-9_]*)\s*===',text)))
    slots=[]
    for c in codes:
        if c in KV:
            acc,d=KV[c]; s={'id':c,'accepts':acc,'required':acc=='text' and c!='kv103' or acc=='choice','description':d}
            if acc=='choice': s['values']=['true','false']
        elif re.fullmatch(r'v\d{5}',c):
            q=ours.get('v'+c[-3:],{}).get('question','')
            d=(q+' — ' if q else '')+'Instruction: '+neutral(V[c]['description'])
            s={'id':c,'accepts':'text','required':True,'description':d.strip()}
        else: s={'id':c,'accepts':'text','description':'Field '+c}
        slots.append(s)
    for kind,tag,_ in pre:
        slots.append({'id':tag,'accepts':kind,'description':'Completed by the investigator ('+tag+' column of the trial experience table); leave empty.'})
    for kind,tag,_ in added:
        if kind=='checkbox': slots.append({'id':tag,'accepts':'checkbox','description':ours.get(tag,{}).get('question','Tick if it applies.')})
        else:
            d={'r1_date':'Date of the declaration.','r1_name':'Name and surname of the responsible person at the sponsor.','r1_role':'Role of that person in the sponsor organisation.',
               'r1_national':'Only if the country requires it (see the planning checklist national notes): the national data-protection statement, in the form version\'s language. Otherwise leave empty.'}.get(tag) or ours.get(tag,{}).get('question','Answer this field.')
            slots.append({'id':tag,'accepts':'text','description':d})
    third=key in ('M1','M2')
    note=('Completed and signed by the investigator. Fill only the trial fields (title, EU trial number); leave every other field empty for the investigator.' if third else
          'Shared EU form used by every country unless the country has its own form. Answer each field in the language of this form version (see the planning checklist row for the country; the form text itself stays as provided). Follow each field\'s instruction; give the template\'s "not applicable" answer where a condition is false. Fields for the site or investigator are left for them.')
    h={'id':code,'name':name,'code':code,'kind':'form','file':fn,'countries':['all'],'languages':['all'],'version':'1.0','effective':EFF,
       'use_when':f'{name}. Shared form for all countries unless a country-specific form is listed for that country.','slots':slots}
    open(os.path.join(OUT,'styling',code+'.md'),'w').write('---\n'+yaml.safe_dump(h,allow_unicode=True,sort_keys=False,width=100000).strip()+'\n---\n'+note+'\n')
    print(key,code,len(slots),'slots')
for k in FORMS: build(k)
