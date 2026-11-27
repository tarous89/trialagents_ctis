import sys,re,json
FORM='__________________'
KEYS=('EINFÜGEN','FALLS','AUSWAHL','HINWEIS')
def classify(x):
    x=re.sub(r'\s+',' ',x).strip().strip(':').strip()
    xl=x.lower()
    if re.match(r'(entweder|oder\b|alternativ|alternative|variante)',xl): return 'AUSWAHL',x
    if re.match(r'(falls|sofern|ggf\.|gegebenenfalls|optional|bei |nur bei|wenn |soweit )',xl): return 'FALLS',x
    if re.search(r'(einfügen|ergänzen|angeben|benennen|nennen|anführen|ausfüllen|eintragen)\b',xl) or len(x.split())<=6: return 'EINFÜGEN',x
    return 'HINWEIS',x
def lab(k,x): return '['+k+': '+x+']'
def norm(s):
    for a,b in (('<italic>','<i>'),('</italic>','</i>'),('<bold>','<b>'),('</bold>','</b>'),('<underline>','<u>'),('</underline>','</u>')): s=s.replace(a,b)
    return s
def strip_italic(s):
    """return text without <i> tags and a boolean mask of italic chars"""
    out=[];mask=[];it=0;i=0
    while i<len(s):
        if s.startswith('<i>',i): it+=1;i+=3;continue
        if s.startswith('</i>',i): it=max(0,it-1);i+=4;continue
        out.append(s[i]);mask.append(it>0);i+=1
    return ''.join(out),mask
def plain(x): return re.sub(r'<[^>]+>','',x)
def convert(s,bare_desc,counter):
    s=norm(s)
    s=re.sub(r'●●●\s*(?:<i>)?\s*\[[^\]]*\]\s*(?:</i>)?','\x10',s).replace('●●●','\x10')
    s=re.sub(r'◆◆◆\s*(?:<i>)?\s*\[[^\]]*\]\s*(?:</i>)?','\x11',s).replace('◆◆◆','\x11')
    t,mask=strip_italic(s)
    # blanks: ..... or …… ; if directly followed by [desc] the bracket becomes the description
    res=[];i=0;n=len(t)
    def next_bracket(j):
        k=j
        while k<n and t[k] in ' \t:': k+=1
        if k<n and t[k]=='[':
            d=0
            for e in range(k,n):
                if t[e]=='[': d+=1
                elif t[e]==']':
                    d-=1
                    if d==0: return k,e
        return None
    out=[];maskout=[]
    while i<n:
        m=re.match(r'(\.{5,}|…{2,}|…\.+|\.+…)',t[i:])
        if m:
            j=i+m.end(); nb=next_bracket(j)
            if nb:
                tok='\x12'+plain(t[nb[0]+1:nb[1]])+'\x13'; out.append(tok); maskout+= [False]*len(tok); i=nb[1]+1; continue
            # preceded by a bracket? ([desc] ......)
            d=bare_desc[counter[0]] if counter[0]<len(bare_desc) else '?'; counter[0]+=1
            tok=FORM if d is None else '\x12'+d+'\x13'; out.append(tok); maskout+=[False]*len(tok); i=j; continue
        out.append(t[i]); maskout.append(mask[i]); i+=1
    t=''.join(out); mask=maskout
    # top-level brackets
    out=[];mk=[];i=0;n=len(t)
    while i<n:
        if t[i]=='[':
            d=0;e=None
            for k in range(i,n):
                if t[k]=='[': d+=1
                elif t[k]==']':
                    d-=1
                    if d==0: e=k;break
            if e is not None:
                inner=plain(t[i+1:e]).replace('[','(').replace(']',')')
                k_,x=classify(inner); tok='\x12'+k_+'\x14'+x+'\x13'; out.append(tok); mk+=[False]*len(tok); i=e+1; continue
        out.append(t[i]); mk.append(mask[i]); i+=1
    t=''.join(out); mask=mk
    # italic runs outside brackets -> HINWEIS (merge across whitespace/punctuation)
    out=[];i=0;n=len(t)
    while i<n:
        if mask[i] and t[i] not in '\x12\x13':
            j=i
            while j<n and (mask[j] or (t[j] in ' \t.,;:' and j+1<n and mask[j+1])): j+=1
            seg=t[i:j]; p=plain(seg).strip()
            if not p or re.fullmatch(r'[\W_]+',p): out.append(seg.replace('<u>','').replace('</u>',''))
            elif p.lower().rstrip(':') in ('oder','entweder','alternativ'): out.append(lab('AUSWAHL',p.rstrip(':')))
            elif len(p.split())<=3 and '/' in p: out.append(lab('AUSWAHL',p))
            elif len(p.split())<=3 and not p.endswith('.'): out.append(lab('EINFÜGEN',p))
            else: out.append(' '+lab('HINWEIS',re.sub(r'\s+',' ',p))+' ')
            i=j; continue
        out.append(t[i]); i+=1
    t=''.join(out)
    def fin(m):
        x=m.group(1)
        if '\x14' in x: k,v=x.split('\x14',1); return lab(k,v.strip())
        return lab('EINFÜGEN',x.strip())
    t=re.sub(r'\x12(.*?)\x13',fin,t,flags=re.S)
    t=t.replace('\x10',lab('EINFÜGEN','Bezeichnung des Prüfpräparats')).replace('\x11',lab('EINFÜGEN','Bezeichnung des Vergleichspräparats bzw. der Standardtherapie'))
    t=re.sub(r'(<u>|<b>)\s*(</u>|</b>)','',t)
    t=re.sub(r'[ \t]{2,}',' ',t)
    return t
if __name__=='__main__':
    src,dst,descf=sys.argv[1:4]
    secs=json.load(open(src)); desc=json.load(open(descf))
    c=[0]; out=[convert(s,desc,c) for s in secs]
    print('bare used',c[0],'of',len(desc))
    json.dump(out,open(dst,'w'),ensure_ascii=False,indent=1)
