import sys,os,re,json,zipfile
sys.path.insert(0,os.path.dirname(__file__))
import convert_docx as C
from lxml import etree
w=C.w
COMMON='Alle gelb markierten [ … ]-Anweisungen vor der Einreichung ersetzen bzw. entfernen. Version und Datum nur in den CTIS-Metadaten pflegen, nicht im Dokumenttitel.'
CFG={
'K1':dict(top='[HINWEIS: CTIS Teil II, Abschnitt K. CTIS-Titel: „K1_Recruitment arrangements“. Pflichtdokument. Verwaltungsdokument: Deutsch oder Englisch zulässig; Antworten in dieser Vorlage auf Deutsch. Keine Unterschrift bei Einreichung. Grundlage: EudraLex-Vorlage „Recruitment and informed consent procedure“ Version 2.0 (gilt für neue Teil-II-Einreichungen ab 1. September 2026). Für jede Population mit eigenem Einwilligungsweg (Minderjährige, nicht Einwilligungsfähige, Notfall, unparteiischer Zeuge) den jeweiligen Abschnitt ausfüllen; Abschnitte 1.6, 2.3, 3.2, 4.4, 5.3 und 6.4 mit den deutschen Anforderungen nach §§ 40a, 40b AMG füllen (z. B. Aufklärung durch Prüfarzt/Ärztin, Ausdrückliche Einwilligung in die Datenverarbeitung nach § 40b Abs. 6 AMG, qualifizierte Übersetzungen bei nicht deutschsprachigen Teilnehmenden). '+COMMON+']',
  intro=['How to use this document','This template should be used','National language requirements','This template has been developed']),
'N1':dict(top='[HINWEIS: CTIS Teil II, Abschnitt N. CTIS-Titel: „N1_Site suitability form_<Prüfstelle>“. Pflichtdokument, je Prüfstelle ein Dokument. Deutsch oder Englisch zulässig. Für Deutschland wird die aktuelle AKEK-Vorlage zur Eignung der Prüfstelle empfohlen; diese EU-Vorlage ist gleichwertig, wenn sie Anhang I Nr. 67 abdeckt. Leiter/in der Einrichtung oder Bevollmächtigte/r genehmigt intern; die Unterschrift NICHT in die in CTIS hochgeladene Fassung aufnehmen. Prüfstellenangaben vom Prüfzentrum bestätigen lassen. Strahlenschutz: Falls eine Genehmigung nach § 31 StrlSchG nötig ist, die Unterlagen ebenfalls unter N hochladen. '+COMMON+']',
  intro=['This form may be used','To minimise the number','When completing this form','Where information which','A separate document should','By using this template','This template has been endorsed'],
  after={'Issued by:':'[HINWEIS: Unterschriftsfeld in der CTIS-Fassung leer lassen; Unterschrift nur in der intern abgelegten Fassung.]','If applicable, unique identification number of the site':None}),
'S1':dict(top='[HINWEIS: CTIS Teil II, Abschnitt S. CTIS-Titel: „S1_Compliance collection use storage biological samples_DE“. Bedingt: nur einreichen, wenn biologische Proben entnommen, gelagert, verwendet oder übermittelt werden. Deutsch oder Englisch zulässig; keine Unterschrift. Angaben müssen mit Prüfplan, Probenplan, Patienteninformation und ggf. separater Information zur Sekundärnutzung übereinstimmen. Nutzung außerhalb des Prüfplans erfordert in Deutschland eine separate Information und Einwilligung (AKEK). '+COMMON+']',
  intro=['How to use this document','This form may be used','If the information is already','This Part II template has been developed']),
'P1':dict(top='[HINWEIS: CTIS Teil II, Abschnitt P. CTIS-Titel: „P1_Compensation participants and financial arrangements_DE“. Pflichtdokument als Erklärung, auch wenn keine Vergütung erfolgt (dann ausdrücklich angeben). Deutsch oder Englisch zulässig; keine Unterschrift. Bei Minderjährigen, nicht Einwilligungsfähigen und Stillenden nur Aufwandsentschädigung bzw. Verdienstausfall. Beträge und Bedingungen müssen mit der Patienteninformation übereinstimmen. Ein Vertragsentwurf Sponsor–Prüfstelle wird ggf. separat unter P2 eingereicht. '+COMMON+']',
  intro=['This template may be used','Please note that for trials','This template has been endorsed']),
'R1':dict(top='[HINWEIS: CTIS Teil II, Abschnitt R. CTIS-Titel: „R1_Compliance collection and use personal data_DE“. Pflichtdokument. Deutsch oder Englisch zulässig; keine Unterschrift nach der CTR erforderlich. Für Deutschland zusätzlich bestätigen, dass nationale Datenschutzvorschriften beachtet werden, soweit die DSGVO Öffnungsklauseln enthält (siehe Einfügung unten). '+COMMON+']',
  after={'The sponsor declares that data':'[EINFÜGEN: Satz auf Deutsch, dass bei der Verarbeitung zusätzlich die nationalen deutschen Datenschutzvorschriften beachtet werden, soweit die DSGVO Öffnungsklauseln enthält (insbesondere BDSG und die Anforderungen des § 40b Abs. 6 AMG an die ausdrückliche Einwilligung in die Verarbeitung von Gesundheitsdaten).]',
         'Date:':'[EINFÜGEN: Datum]','Name and surname':'[EINFÜGEN: Name der verantwortlichen Person beim Sponsor]','Role in the sponsor':'[EINFÜGEN: Funktion beim Sponsor]'}),
'M1':dict(top='[HINWEIS: CTIS Teil II, Abschnitt M. CTIS-Titel: „M1_CV_<Prüfer/in>_<Prüfstelle>“. Pflichtdokument je Hauptprüfer/in und Prüfstelle. Deutsch oder Englisch zulässig. EU-Lebenslaufvorlage empfohlen, nicht verpflichtend; Lebenslauf nicht älter als ein Jahr; muss Qualifikation, klinische Erfahrung, Prüfungserfahrung und GCP-Kenntnisse zeigen. Persönliche Angaben werden von der Prüferin bzw. dem Prüfer geliefert: der Assistent trägt nur Studienangaben ein und erfindet keine persönlichen Daten. Nachweise der regulatorischen Schulung (CTR, AMG, GCP) separat als „M2_Regulatory training_<Prüfer/in>_<Prüfstelle>“ einreichen. '+COMMON+']',
  intro=['This template may be used','A separate document should','This template has been developed']),
'M2':dict(top='[HINWEIS: CTIS Teil II, Abschnitt M. CTIS-Titel: „M2_DoI_<Prüfer/in>_<Prüfstelle>“. Pflichtdokument je Hauptprüfer/in und Prüfstelle. Deutsch oder Englisch zulässig. EU-Vorlage empfohlen. Keine zusätzliche Unterschrift, sofern nicht von der Ethikkommission verlangt. Die Angaben zu Interessen liefert die Prüferin bzw. der Prüfer selbst; der Assistent trägt nur Studientitel und EU-Prüfungsnummer ein. '+COMMON+']',
  intro=['This template may be used','This template has been developed']),
}
THIRD_PARTY=('M1','M2')
def curate(root,key):
    cfg=CFG[key]; body=root.find(w+'body')
    if key in THIRD_PARTY: return
    ps=list(body.iter(w+'p'))
    # intro paragraphs -> HINWEIS (remove before final)
    for p in ps:
        t=C.ptext(p).strip()
        if any(t.startswith(x) for x in cfg.get('intro',[])):
            C.set_text_runs(p,[('i','[HINWEIS – vor Einreichung entfernen: '+t+']')])
    for anchor,text in (cfg.get('after') or {}).items():
        if not text: continue
        for p in list(body.iter(w+'p')):
            if C.ptext(p).strip().startswith(anchor):
                fid=key.lower()+'_'+re.sub(r'[^a-z]+','_',anchor.lower()).strip('_')[:20]
                if anchor.endswith(':') or anchor in('Name and surname','Role in the sponsor'):
                    p.append(C.field(C.instr_run(' '+text,C.first_rpr(p)),fid))
                else:
                    p.addnext(C.make_p(text,p,None if text.startswith('[HINWEIS') else fid))
                break
    first=next(x for x in body if x.tag in (w+'p',w+'tbl'))
    ref=first if first.tag==w+'p' else next(body.iter(w+'p'))
    pass
    for tr in body.iter(w+'tr'):
        cells=tr.findall(w+'tc')
        if len(cells)==2:
            label=C.ptext(cells[0]).strip()
            for t in cells[1].iter(w+'t'):
                if t.text and t.text.strip()=='[EINFÜGEN: Enter text]': t.getparent().getparent().remove(t.getparent())
            pass
    n=0
    for sdt in body.iter(w+'sdt'):
        pr=sdt.find(w+'sdtPr'); txt=C.ptext(sdt)
        if txt.strip() in ('☐','☒') and pr.find(w+'tag') is None:
            n+=1; etree.SubElement(pr,w+'tag').set(w+'val','cb%02d'%n)
    k=0
    for tc in body.iter(w+'tc'):
        ps=[p for p in tc.findall(w+'p') if C.ptext(p).strip().startswith('☐') and p.find('.//'+w+'sdt') is None]
        if ps and not any('AUSWAHL' in C.ptext(p) for p in tc.findall(w+'p')):
            k+=1; ps[0].addprevious(C.make_p('[AUSWAHL: Zutreffende Option ankreuzen (☒), die anderen leer lassen.]',ps[0],'choice%02d'%k))
    # generic labels left: make them explicit
    for r in body.iter(w+'r'):
        for t in r.iter(w+'t'):
            if t.text=='[EINFÜGEN]': t.text='[EINFÜGEN: vom Prüfzentrum bzw. Sponsor bereitzustellende Angabe; nicht erfinden]'
if __name__=='__main__':
    src,dst,varsf=sys.argv[1:4]; key=os.path.basename(src)[:2]
    C.V.update(json.load(open(varsf))); C.KEEP_WORD_PLACEHOLDERS = key in THIRD_PARTY
    C.run(src,dst,extra=lambda root:curate(root,key)); print(os.path.basename(dst),C.stats)
