// Fictional example data (EX-101 and a shared BX-212) for the dev server, design checks and browser tests.
// Everything is created through the store, as people and assistants would, so it exercises the real rules.
import {randomUUID} from 'node:crypto'
import {PDFDocument,StandardFonts} from 'pdf-lib'

const doc=(title,...sections)=>({title,sections:sections.map(([id,heading,...blocks])=>({id,heading,blocks:blocks.map(b=>typeof b==='string'?{type:'paragraph',text:b}:b)}))})

export const people={
  alex:{id:'demo:alex',email:'alex.morgan@example.com',firstName:'Alex',lastName:'Morgan'},
  sofia:{id:'demo:sofia',email:'sofia.ruiz@example.com',firstName:'Sofia',lastName:'Ruiz'},
  maria:{id:'demo:maria',email:'maria.keller@example.com',firstName:'Maria',lastName:'Keller'}
}

export async function seedExamples(run,{db}){
  const {alex,sofia,maria}=people
  const w=async(user,op,project,input,extra={},source='Claude')=>run(user,{op,project,input,requestId:randomUUID(),...extra},source)
  // EX-101: owned by Alex, partly run.
  const {project}=await w(alex,'project.create',null,{code:'EX-101',name:'CTIS initial application EX-101',sponsor:'Example Bio GmbH',phase:'Phase II',submission_type:'Initial application',countries:['DE','ES']})
  const p=project.id
  const protocol=await w(alex,'resource.record',p,{category:'source',name:'EX-101 study protocol',type:'Protocol',version:'3.0',doc_date:'2026-09-14'})
  await w(alex,'resource.record',p,{category:'source',name:'Investigator’s brochure EX-101',type:'Investigator’s brochure',version:'7.0',doc_date:'2026-06-01'})
  await w(alex,'resource.record',p,{category:'template',name:'Sponsor consent outline',type:'Writing template',version:'2.1',notes:'Sections: purpose, visits, expenses, local contact.'})
  await w(alex,'plan.save',p,{documents:[
    {id:'D02',name:'Protocol',part:'I',country:'EU',language:'en',code:'D1_protocol',filename:'EX101_D1_protocol_EU_en',supplied:true},
    {id:'D01',name:'Protocol synopsis',part:'I',country:'EU',language:'en',code:'D1_protocol-synopsis',filename:'EX101_D1_protocol-synopsis_EU_en'},
    {id:'D03',name:'Investigator’s brochure',part:'I',country:'EU',language:'en',code:'E1_IB',filename:'EX101_E1_IB_EU_en',supplied:true},
    {id:'D06',name:'IMPD – quality',part:'I',country:'EU',language:'en',code:'G1_IMPD-Q',filename:'EX101_G1_IMPD-Q_EU_en',supplied:true},
    {id:'D04',name:'Subject information sheet and informed consent form – adults',part:'II',country:'DE',language:'de',code:'L1_SIS-ICF',variant:'adults',filename:'EX101_L1_SIS-ICF_adults_DE_de'},
    {id:'D05',name:'Recruitment arrangements',part:'II',country:'DE',language:'en',code:'K1_recruitment-arrangements',filename:'EX101_K1_recruitment-arrangements_DE_en'},
    {id:'D07',name:'Subject information sheet and informed consent form – adults',part:'II',country:'ES',language:'es',code:'L1_SIS-ICF',variant:'adults',filename:'EX101_L1_SIS-ICF_adults_ES_es'}],
    steps:[{type:'draft'},{type:'qc'},{type:'checklist'},{type:'style'}],not_applicable:[{document:'D01',step:'ST'},{document:'D01',step:'CL'},
      ...['D02','D03','D06'].flatMap(d=>[{document:d,step:'QC'},{document:d,step:'ST'}]),...['D04','D05','D07'].map(d=>({document:d,step:'CL'}))]},{revision:0})
  // Part I documents supplied by the sponsor: the protocol as a PDF (checked, approved and redacted), the IB held outside, the IMPD awaiting its file.
  const pdf=await PDFDocument.create(),font=await pdf.embedFont(StandardFonts.Helvetica),page=pdf.addPage([595,842])
  page.drawText('Clinical Study Protocol EX-101, version 3.0',{x:60,y:780,size:16,font})
  page.drawText('Sponsor signatory: Dr. Lena Brandt, Head of Clinical Development',{x:60,y:740,size:10,font})
  pdf.addPage([595,842]).drawText('4.1 Study population: male or female adults aged 18 years or older.',{x:60,y:780,size:11,font})
  await w(alex,'document.supply',p,{document:'D02',file:{name:'EX-101 protocol v3.0.pdf',mime:'application/pdf',content_base64:Buffer.from(await pdf.save()).toString('base64')},sponsor_version:'3.0'})
  await w(alex,'version.save',p,{deliverable:'D02-CL',base:0,note:'S01–S07 passed.'})
  await w(alex,'approval.create',p,{deliverable:'D02-CL',n:1},{},'web')
  await w(alex,'redaction.save',p,{document:'D02',terms:[{text:'Lena Brandt',category:'name'}],pdf_method:'pages_as_images'})
  await w(alex,'document.supply',p,{document:'D03',held_outside:true,sponsor_version:'7.0'})
  await w(alex,'version.save',p,{deliverable:'D03-CL',base:0,findings:[{category:'conflict',text:'IB edition 7.0 covers EX-101 tablets only; the protocol also uses the oral solution.',key:'ib-formulation'}]})
  const synopsis=doc('Protocol synopsis',['S01','Population','The study enrols adults aged 18 years or older with condition Y.'],['S02','Visit schedule',{type:'timeline',items:[{label:'Week 0',detail:'Baseline'},{label:'Week 6',detail:'Telephone call'},{label:'Week 12',detail:'Follow-up visit'}]}])
  await w(alex,'version.save',p,{deliverable:'D01-DR',base:0,content:synopsis})
  await w(alex,'version.save',p,{deliverable:'D01-QC',base:0,content:synopsis,claims:[
    {section:'S01',text:'adults aged 18 years or older',kind:'source',source:{resource:protocol.resource,name:'EX-101 study protocol',version:'3.0',locator:'§4.1',quote:'Male or female adults aged 18 years or older.'}},
    {section:'S02',text:'follow-up at week 12',kind:'source',source:{resource:protocol.resource,name:'EX-101 study protocol',version:'3.0',locator:'Schedule of activities',quote:'The follow-up visit takes place at week 12.'}}]})
  await w(alex,'approval.create',p,{deliverable:'D01-QC',n:1},{},'web')
  const pis=doc('Patienteninformation und Einwilligungserklärung',
    ['S00','',{type:'table',style:'info',header:false,rows:[['Titel der Studie','Eine Studie zu EX-101 bei Erwachsenen mit Erkrankung Y'],['Prüfplannummer','EX-101-03, Version 3.0'],['Sponsor','Example Bio GmbH'],['Prüfarzt/Prüfärztin','[[Name nicht angegeben]]']]}],
    ['S01','Warum wird diese Studie durchgeführt?','Wir laden Sie ein, an einer Studie teilzunehmen. Die Teilnahme ist **freiwillig**.'],
    ['S02','Ihr Nachuntersuchungstermin','Der Nachuntersuchungstermin findet in Woche 12 statt.'],
    ['S03','Erstattung von Reisekosten','Sie erhalten 50 € pro Besuch.'])
  await w(alex,'version.save',p,{deliverable:'D04-DR',base:0,content:pis})
  await w(alex,'version.save',p,{deliverable:'D04-QC',base:0,content:pis,claims:[
    {section:'S02',text:'Woche 12',kind:'source',source:{resource:protocol.resource,name:'EX-101 study protocol',version:'3.0',locator:'Schedule of activities',quote:'The follow-up visit takes place at week 12.'}},
    {section:'S01',text:'Die Teilnahme ist freiwillig.',kind:'standard',source:{catalog:'L1_SIS-ICF',name:'Standard wording'}}],
    findings:[{category:'conflict',text:'The draft promises €50 per visit. The country operations manual caps reimbursement at €50 for documented expenses.',section:'S03',quote:'Sie erhalten 50 € pro Besuch.',key:'reimbursement'},
      {category:'missing',text:'Name of the principal investigator is not in the sources.',section:'S00',key:'pi-name'}]})
  await w(alex,'version.save',p,{deliverable:'D07-DR',base:0,content:doc('Hoja de información al paciente y consentimiento informado',['S01','Introducción','Nos dirigimos a usted para informarle sobre un estudio en el que se le invita a participar.'])})
  // Team plan, so Alex can share; Maria owns BX-212 and shares one document with Alex.
  await db.transaction(q=>q("UPDATE ctis.account SET plan='team' WHERE user_id=ANY($1)",[[alex.id,maria.id]]))
  await w(alex,'share.create',p,{email:sofia.email,scope:'document',document:'D04',role:'commenter'},{},'web')
  const n=(await run(alex,{op:'deliverable.read',project:p,input:{deliverable:'D04-QC'}})).version.n
  await w(sofia,'comment.create',p,{deliverable:'D04-QC',version:n,text:'Please keep the cap and the condition about documented expenses.',anchor:{section:'S03',quote:'50 € pro Besuch'}},{},'web')
  const bx=(await w(maria,'project.create',null,{code:'BX-212',name:'CTIS initial application BX-212',sponsor:'Nordic Biotech AB',countries:['SE']})).project.id
  await w(maria,'plan.save',bx,{documents:[{id:'D02',name:'Subject information sheet and informed consent form – adults',part:'II',country:'SE',language:'sv',code:'L1_SIS-ICF',variant:'adults',filename:'BX212_L1_SIS-ICF_adults_SE_sv'}],steps:[{type:'draft'},{type:'qc'},{type:'style'}]},{revision:0})
  await w(maria,'version.save',bx,{deliverable:'D02-DR',base:0,content:doc('Information till forskningspersoner',['S01','Inledning','Vi vill fråga dig om du vill delta i en studie.'])})
  await db.transaction(q=>q("UPDATE ctis.account SET plan='team' WHERE user_id=$1",[maria.id]))
  await w(maria,'share.create',bx,{email:alex.email,scope:'document',document:'D02',role:'commenter'},{},'web')
  // An empty project, to show the "no plan yet" state.
  await w(alex,'project.create',null,{code:'NX-220',name:'NX-220 first-in-human study',sponsor:'Example Bio GmbH',phase:'Phase I',countries:['NL','BE']})
  return {ex101:p,bx212:bx}
}
