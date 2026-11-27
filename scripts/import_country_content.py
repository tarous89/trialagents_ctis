"""Convert the country content (trialagents_ctis main: content/) into this catalog's format.
python3 scripts/import_country_content.py <content dir> <catalog dir> <effective YYYY-MM-DD>"""
import sys,os,json,re,glob,yaml
SRC,OUT,EFF=sys.argv[1:4]
def slug(s): return re.sub(r'[^a-z0-9]+','-',str(s).lower()).strip('-')
CODES={'K1':'K1_recruitment-arrangements','K2':'K2_recruitment-material','L1':'L1_SIS-ICF','L2':'L2_other-subject-information',
 'M1':'M1_CV','N1':'N1_site-suitability','N2':'N2_list-of-sites','O1':'O1_insurance-certificate','O2':'O2_proof-of-coverage',
 'P1':'P1_compensation','P2':'P2_financial-arrangements','R1':'R1_data-protection','R2':'R2_patient-facing-translations','S1':'S1_biological-samples','B1':'B1_cover-letter'}
def code_of(doc):
    t=str(doc.get('ctis_title') or doc.get('id') or '')
    pre=t.split('_')[0].strip()
    rest=t.split('_')[1] if '_' in t else (doc.get('name_en') or '')
    low=(t+' '+str(doc.get('name_en',''))+' '+str(doc.get('id',''))).lower()
    if re.fullmatch(r'M2',pre): return 'M2_DoI' if ('doi' in low or 'declaration of interest' in low or 'interest' in low) else 'M2_'+slug(rest or 'investigator-qualification')
    if pre in CODES and pre!='P2' and pre!='R2': return CODES[pre]
    if pre in ('P2','R2'):
        return CODES[pre] if not rest else pre+'_'+slug(rest)
    if re.fullmatch(r'[A-S]\d{1,2}',pre): return pre+'_'+slug(rest or doc.get('name_en','document'))
    return slug(doc.get('id','doc')).upper()[:2]+'_'+slug(doc.get('name_en') or t)[:50]
VARIANT={'main':'adults','healthy':'healthy-volunteers','parents':'parents','legal rep':'legal-representatives','limited capacity':'limited-capacity',
 'emergency':'emergency','witness':'impartial-witness','pregnancy':'pregnant-participants','pregnant partner':'pregnant-partners','secondary':'secondary-use',
 'genetic testing':'genetic-testing','withdrawal notice':'right-to-object'}
def variant_of(key):
    k=key.strip().lower().replace('-',' ')
    k=re.sub(r'\s+(fr|nl|de|sv|fi|en|et|lt|lv|sl|hr|sk|ru|bg)$','',k)
    k={'legal rep':'legal rep','pregnant partner':'pregnant partner'}.get(k,k)
    m=re.match(r'age (\d+)-(\d+)',k)
    if m: return f'minors-{m.group(1)}-{m.group(2)}'
    return VARIANT.get(k,slug(k))
REQ={'mandatory':'always','always':'always','required':'always','conditional':'conditional','optional':'optional','recommended':'optional'}
def langs_of(doc,default):
    l=doc.get('languages_required') or doc.get('language') or default
    if isinstance(l,dict): l=[x for v in l.values() for x in (v if isinstance(v,list) else [v])]
    if isinstance(l,str): l=re.findall(r'\b[a-z]{2}\b',l) or default
    l=[x for x in l if isinstance(x,str) and re.fullmatch(r'[a-z]{2}',x)]
    return sorted(set(l)) or ['all']
def text_of(v,depth=0):
    """Render any JSON value as readable Markdown."""
    pad='  '*depth
    if isinstance(v,dict):
        out=[]
        for k,x in v.items():
            if isinstance(x,(dict,list)): out.append(f"{pad}- **{k.replace('_',' ')}**:\n{text_of(x,depth+1)}")
            else: out.append(f"{pad}- **{k.replace('_',' ')}**: {x}")
        return '\n'.join(out)
    if isinstance(v,list):
        return '\n'.join(f"{pad}- {x}" if not isinstance(x,(dict,list)) else text_of(x,depth) for x in v)
    return pad+str(v)
def notes_of(doc,lang_keys):
    parts=[]
    for k,v in doc.items():
        if k.startswith('drafting_notes') or k in ('note','notes','content','national_fields','unless','provided_by','filled_by','signature_at_submission','per_language','languages_required','national_additions'):
            if v in (None,'',[],{}): continue
            label={'signature_at_submission':'Signed at CTIS submission','filled_by':'Completed by','unless':'Not needed if','national_fields':'National additions to the form'}.get(k,'' if k.startswith('drafting_notes') or k in('note','notes','content') else k.replace('_',' ').capitalize())
            body=v if isinstance(v,str) else (('yes' if v else 'no') if isinstance(v,bool) else text_of(v))
            parts.append((label+': ' if label else '')+body)
    t=doc.get('template')
    if isinstance(t,dict) and t.get('basis'): parts.append('Template basis: '+t['basis'])
    if (isinstance(t,dict) and t.get('file') in (None,'','missing')) or t=='missing': parts.append('No template in the catalog yet: draft from these notes and the sources, or ask the user for the national form.')
    return '\n'.join(parts)
def dump_header(h):
    return '---\n'+yaml.safe_dump(h,allow_unicode=True,sort_keys=False,width=100000).strip()+'\n---\n'
def checklist_items(path):
    if not os.path.exists(path): return []
    d=json.load(open(path)); out=[]
    def walk(x):
        if isinstance(x,dict):
            if 'id' in x and ('check' in x or 'text' in x) and isinstance(x.get('check',x.get('text')),str):
                cid=re.sub(r'[^A-Za-z0-9_.-]','-',str(x['id']))[:40]
                txt=x.get('check',x.get('text'))
                if x.get('applies_when'): txt+=f" (applies when: {x['applies_when'] if isinstance(x['applies_when'],str) else json.dumps(x['applies_when'],ensure_ascii=False)})"
                out.append((cid,re.sub(r'\s+',' ',txt)))
            for v in x.values(): walk(v)
        elif isinstance(x,list):
            for v in x: walk(v)
    walk(d); return out
def section_title(content,style,i):
    t=re.sub(r'<[^>]+>','',content); 
    for line in t.split('\n'):
        s=line.strip().strip('*').strip()
        if s and len(s)<=120: return re.sub(r'\s+',' ',s)
    return (style.split(',')[0] or 'Section').strip()
stats={}
os.makedirs(f'{OUT}/planning',exist_ok=True); os.makedirs(f'{OUT}/content',exist_ok=True); os.makedirs(f'{OUT}/styling',exist_ok=True)
for cdir in sorted(glob.glob(f'{SRC}/countries/*')):
    CC=os.path.basename(cdir); R=json.load(open(f'{cdir}/requirements.json'))
    alang=R.get('answer_languages') or ['all']
    # --- participant templates -> content templates
    variants=[]; tmpl_ids=[]
    for f in sorted(glob.glob(f'{cdir}/templates/participant/*.json')):
        d=json.load(open(f)); ti=d['template_instructions']
        key=ti['file_name'].replace('L1_SIS and ICF_','')
        var=variant_of(key); lang=ti.get('language_code') or alang[0]
        variants.append(var)
        cid=f'L1_SIS-ICF_{var}_{CC}' + (f'_{lang}' if len(alang)>1 else '')
        styl_var=f'L1_SIS-ICF_{var}_{CC}_styling' if (ti.get('styling_instructions') or '').strip() else f'L1_SIS-ICF_{CC}'
        h={'id':cid,'name':f"L1 SIS and ICF – {var} – {R.get('name',CC)} ({ti.get('doc_name_local','')})",'code':'L1_SIS-ICF','variant':var,'part':'II',
           'countries':[CC],'languages':[lang],'version':'1.0','effective':EFF,'use_when':(ti.get('description') or f'{var} participants, {CC}').strip(),'styling':styl_var}
        intro=[f"Template supplied for {R.get('name',CC)}, in {ti.get('target_language','')}: **{ti.get('doc_name_local','')}** ({ti.get('doc_name_en','')}).",
               'Keep the model text and its order. Fill the [bracketed] notes and the ........... gaps from the study; follow the italic and bracketed instructions and remove them from the final document. Fields completed by hand at the consent visit (names, dates, signatures) stay blank.']
        if ti.get('content_instructions'): intro.append('**Content instructions:** '+ti['content_instructions'])
        if ti.get('info_table'): intro.append('**Study information table:** '+'; '.join(ti['info_table']))
        if ti.get('footer'): intro.append('**Footer:** '+' | '.join(ti['footer']))
        body=['\n\n'.join(intro),'']
        for i,s in enumerate(d['template_content']):
            txt=s['section_content'].replace('\r','')
            lines=[l.rstrip() for l in txt.split('\n') if l.strip()]
            body.append(f"## S{i+1:02d} · {section_title(txt,s.get('section_style',''),i)}")
            body.append('Fill: standard')
            if s.get('section_style'): body.append('Layout elements: '+s['section_style'])
            body+= ['Standard wording: '+l for l in lines] or ['Standard wording: (empty)']
            body.append('')
        items=checklist_items(f'{cdir}/checklists/participant-documents.json')
        if items:
            body.append('## Checklist')
            body+= [f'- {a} {b}' for a,b in items]
        open(f'{OUT}/content/{cid}.md','w').write(dump_header(h)+'\n'.join(body)+'\n')
        tmpl_ids.append(cid)
        if (ti.get('styling_instructions') or '').strip() and not os.path.exists(f'{OUT}/styling/{styl_var}.md'):
            sh={'id':styl_var,'name':f'L1 styling – {var} – {R.get("name",CC)}','code':'L1_SIS-ICF','variant':var,'countries':[CC],'version':'1.0','effective':EFF,
                'use_when':f'L1 {var} documents for {R.get("name",CC)}.','base':f'L1_SIS-ICF_{CC}'}
            open(f'{OUT}/styling/{styl_var}.md','w').write(dump_header(sh)+ti['styling_instructions'].strip()+'\n')
    if not variants:
        miss=R.get('participant_templates_missing') or []
        for m in miss:
            mid=m['id'] if isinstance(m,dict) else m
            variants.append(variant_of(re.sub(r'^[A-Z]{2}-PT-','',mid)))
    variants=sorted(set(variants))
    # --- country styling (base for all L1 of the country)
    sty=open(f'{cdir}/styling.md').read() if os.path.exists(f'{cdir}/styling.md') else ''
    natpart=re.split(r'\n## Template-specific rules',sty)[0]
    natpart=re.sub(r'^# .*\n','',natpart).strip()
    sh={'id':f'L1_SIS-ICF_{CC}','name':f'L1 styling – {R.get("name",CC)}','code':'L1_SIS-ICF','countries':[CC],'version':'1.0','effective':EFF,
        'use_when':f'L1 participant documents for {R.get("name",CC)}.','base':'L1_SIS-ICF'}
    open(f'{OUT}/styling/L1_SIS-ICF_{CC}.md','w').write(dump_header(sh)+(natpart or 'National styling rules: none beyond the L1 base.')+'\n')
    # --- planning checklist
    rows=[]; seen=set()
    for doc in R['documents']:
        code=code_of(doc)
        base=code; n=2
        while code in seen: code=f'{base}-{n}'; n+=1
        seen.add(code)
        req=REQ.get(str(doc.get('requirement','')).lower(),'conditional' if doc.get('trigger') else 'always')
        row={'code':code,'name':(doc.get('name_en') or doc.get('ctis_title') or code)}
        if code=='L1_SIS-ICF' and variants: row['variants']=variants
        row['required']=req
        if req=='conditional':
            row['condition']=str(doc.get('trigger_text') or doc.get('trigger') or 'See national notes.')
        row['languages']=langs_of(doc,alang)
        per=doc.get('per','trial'); row['per']=per if per in ('trial','site','population') else ('population' if code=='L1_SIS-ICF' else 'trial')
        nn=notes_of(doc,alang)
        if doc.get('ctis_title'): nn=f"CTIS title: {doc['ctis_title']}. "+nn
        if nn: row['national_notes']=nn
        rows.append(row)
    srcs=R.get('sources') or {}
    ref=srcs.get(f'{CC}-HUB') if isinstance(srcs,dict) else None
    if not ref and isinstance(srcs,dict): ref=next((v for v in srcs.values() if isinstance(v,str) and v.startswith('http')),None)
    h={'id':CC,'name':f"{R.get('name',CC)} – Part II planning checklist",'part':'II','country':'GR' if CC=='GR' else CC,'version':'1.0','effective':EFF,
       'use_when':f"Part II documents for {R.get('name',CC)}.",**({'reference':ref} if ref else {}),'checked':str(R.get('reviewed') or EFF)[:10],
       'naming':'Use the CTCG title for each document (see each row’s CTIS title); filename <study code>_<code>[_<variant>]_'+CC+'_<language>.','documents':rows}
    body=[f"# National rules – {R.get('name',CC)}"]
    for k,label in (('authorities','Authorities and fee'),('language_rules','Language rules'),('answer_languages','Answer languages for forms'),('population_rules','Populations, age bands and representatives'),
                    ('drafting_rules','Drafting rules'),('study_facts_used','Study facts that decide which documents are needed'),('participant_templates_missing','Participant templates not yet supplied'),('sources','Sources')):
        if R.get(k): body+=['',f'## {label}','',text_of(R[k])]
    open(f'{OUT}/planning/{CC}.md','w').write(dump_header(h)+'\n'.join(body)+'\n')
    stats[CC]=(len(rows),len(tmpl_ids),len(variants))
for k,v in stats.items(): print(k,'rows',v[0],'templates',v[1],'variants',v[2])
