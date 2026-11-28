import {z} from 'zod'

export class CtisError extends Error{constructor(message,status=400,details){super(message);this.status=status;if(details)this.details=details}}
export function check(condition,message,status=400,details){if(!condition)throw new CtisError(message,status,details)}
export function parse(schema,value){
  const r=schema.safeParse(value??{})
  if(!r.success)throw new CtisError('Invalid input: '+r.error.issues.slice(0,3).map(i=>(i.path.join('.')||'input')+' '+i.message).join('; '),400)
  return r.data
}

const text=(max=2000)=>z.string().trim().max(max)
const name=text(200).min(1)
export const uuid=z.uuid()
export const documentId=z.string().regex(/^D[0-9]{2,3}$/,'must look like D04')
export const stepId=z.string().regex(/^[A-Z]{2}[0-9]{0,2}$/,'must look like QC')
export const deliverable=z.string().regex(/^D[0-9]{2,3}-[A-Z]{2}[0-9]{0,2}$/,'must look like D04-QC')
export const country=z.string().regex(/^[A-Z]{2}$/)
export const sectionId=z.string().regex(/^[A-Za-z0-9_.-]{1,40}$/,'must be a short section id such as S03')

export const stepTypes={draft:'DR',checklist:'CL',qc:'QC',style:'ST',team:'TR',guide:'IG',custom:'CS'}
export const stepNames={draft:'Draft',checklist:'Checklist',qc:'Source QC',style:'Style',team:'Team review',guide:'Internal guidelines',custom:'Custom step'}
export const defaultSteps=['draft','qc','style']

// Documents CTIS publishes in a version 'for publication' (EMA/194159/2023 Annex I v2.2, Table II): the protocol, its
// synopsis and patient-facing documents (D1, D4), the SmPC (E2), recruitment arrangements and material (K1, K2) and
// subject information (L1, L2). A plan can say otherwise per document (redact).
export const publishedByDefault=code=>/^(D1|D4|E2|K1|K2|L1|L2)_/i.test(code??'')
export const redactionCategories=['name','signature','email','phone','address','date_of_birth','identifier','company','other']

// Content: ordered sections of typed blocks. Block types follow the old CTIS renderer.
const block=z.discriminatedUnion('type',[
  z.strictObject({type:z.literal('heading'),level:z.int().min(1).max(4).default(2),text:text(500)}),
  z.strictObject({type:z.literal('paragraph'),text:text(20000)}),
  z.strictObject({type:z.literal('list'),style:z.enum(['bullet','number']).default('bullet'),items:z.array(text(4000)).max(200)}),
  z.strictObject({type:z.literal('table'),header:z.boolean().default(true),style:z.enum(['standard','info']).default('standard'),rows:z.array(z.array(text(4000)).max(20)).max(300),caption:text(500).optional()}),
  z.strictObject({type:z.literal('timeline'),items:z.array(z.strictObject({label:text(100).min(1),detail:text(300).default('')})).min(2).max(8),caption:text(500).optional()}),
  z.strictObject({type:z.literal('image'),file:uuid.optional(),caption:text(500).default(''),alt:text(500).default('')}),
  z.strictObject({type:z.literal('note'),tone:z.enum(['info','warning','summary']).default('info'),text:text(4000)}),
  z.strictObject({type:z.literal('placeholder'),text:text(500)}),
  z.strictObject({type:z.literal('page_break')})
])
export const section=z.strictObject({id:sectionId,heading:text(500).default(''),blocks:z.array(block).max(400)})
export const content=z.strictObject({title:text(500).default(''),sections:z.array(section).max(300)})
  .refine(c=>new Set(c.sections.map(s=>s.id)).size===c.sections.length,'section ids must be unique')
export const changes=z.strictObject({
  sections:z.array(section.extend({after:sectionId.nullable().optional()})).max(300).default([]),
  remove:z.array(sectionId).max(300).default([]),
  title:text(500).optional()
})

// Fact-level evidence for Source QC (docs/CATALOG.md fill levels).
export const claim=z.strictObject({
  section:sectionId, text:text(4000).min(1),
  kind:z.enum(['source','standard','user','site','blank']),
  source:z.strictObject({resource:uuid.optional(),catalog:text(200).optional(),name:text(300).default(''),version:text(50).default(''),locator:text(300).default(''),quote:text(4000).default('')}).optional(),
  supplied_by:text(200).optional()
})
export const finding=z.strictObject({
  category:z.enum(['missing','conflict','decision','comment']), text:text(4000).min(1),
  section:sectionId.optional(), quote:text(2000).optional(), key:text(120).optional()
})
export const addressed=z.strictObject({thread:z.int().positive(),reply:text(4000).min(1),resolve:z.boolean().default(true)})

// Planning choices and the study's populations, saved with the plan (docs/TECHNICAL.md §1 and §3).
export const planning=z.strictObject({
  populations:z.array(z.strictObject({id:z.string().regex(/^[a-z0-9][a-z0-9-]{0,59}$/,'use a short lower-case id, for example single-dose-adults'),
    label:text(100).min(1),description:text(1000).default(''),reason:text(1000).default('')})).max(30).default([]),
  part1_scope:z.enum(['in_plan','completed_outside','later']).optional(),
  reference_package:z.strictObject({country,language:z.string().regex(/^[a-z]{2}$/)}).nullable().optional(),
  format_choice:z.enum(['sponsor_format','country_format']).optional(),
  notes:text(4000).default('')
})
export const inputs={
  'project.create':z.strictObject({code:text(40).min(1),name,sponsor:text(200).default(''),phase:text(40).default(''),
    submission_type:text(200).default(''),eu_ct_number:text(40).default(''),countries:z.array(country).max(30).default([])}),
  'project.update':z.strictObject({code:text(40).min(1).optional(),name:name.optional(),sponsor:text(200).optional(),phase:text(40).optional(),
    submission_type:text(200).optional(),eu_ct_number:text(40).optional(),countries:z.array(country).max(30).optional()}),
  'project.duplicate':z.strictObject({code:text(40).min(1).optional(),name:name.optional()}),
  'plan.save':z.strictObject({
    documents:z.array(z.strictObject({id:documentId,name,part:z.enum(['I','II']),country:z.union([country,z.literal('EU')]),language:z.string().regex(/^[a-z]{2}$/),
      variant:text(100).default(''),code:z.string().regex(/^([A-Za-z0-9][A-Za-z0-9_.-]{0,60})?$/,'use the regulatory code, for example L1_SIS-ICF').default(''),filename:text(200).min(1),catalog:z.record(z.string(),z.string()).default({}),
      population:text(60).default(''),based_on:documentId.optional(),supplied:z.boolean().default(false),redact:z.boolean().optional()})).max(300),
    planning:planning.optional(),
    steps:z.array(z.strictObject({id:stepId.optional(),type:z.enum(Object.keys(stepTypes)),name:text(100).optional(),instruction:text(4000).default(''),paused:z.boolean().default(false)})).min(1).max(20),
    not_applicable:z.array(z.strictObject({document:documentId,step:stepId})).max(3000).default([])
  }),
  'version.save':z.strictObject({
    deliverable, base:z.int().min(0),
    content:content.optional(), changes:changes.optional(),
    claims:z.array(claim).max(2000).optional(), findings:z.array(finding).max(200).default([]),
    addressed:z.array(addressed).max(200).default([]),
    fill:z.record(z.string(),z.unknown()).optional(), catalog:z.array(z.strictObject({id:text(200),version:text(50)})).max(50).default([]),
    note:text(1000).default(''), continue_past:z.boolean().default(false)
  }).refine(v=>!(v.content&&v.changes),'send either content or changes, not both'),
  // A supplied document's file: uploaded here, a stored source, or confirmed as held outside TrialAgents CTIS.
  'document.supply':z.strictObject({document:documentId,resource:uuid.optional(),
    file:z.strictObject({name:text(255).min(1),mime:text(200).default(''),content_base64:z.string().min(1).max(36_000_000)}).optional(),
    held_outside:z.boolean().default(false),sponsor_version:text(50).default(''),note:text(1000).default('')})
    .refine(v=>[!!v.resource,!!v.file,v.held_outside].filter(Boolean).length===1,'give one of resource, file or held_outside'),
  'redaction.context':z.strictObject({document:documentId}),
  'redaction.save':z.strictObject({document:documentId,
    terms:z.array(z.strictObject({text:text(500).min(2),category:z.enum(redactionCategories),reason:text(300).default('')})).max(300),
    pdf_method:z.enum(['pages_as_images']).optional(),note:text(1000).default('')}),
  'redaction.file':z.strictObject({document:documentId,n:z.int().positive().optional()}),
  'version.restore':z.strictObject({deliverable,n:z.int().positive(),base:z.int().positive()}),
  'deliverable.read':z.strictObject({deliverable,n:z.int().positive().optional()}),
  'comment.create':z.strictObject({deliverable,text:text(4000).min(1),version:z.int().positive(),
    anchor:z.strictObject({section:sectionId.optional(),quote:text(2000).optional(),parts:z.array(z.unknown()).max(20).optional(),region:z.unknown().optional()}).default({}),
    mentions:z.array(z.email()).max(20).default([])}),
  'thread.reply':z.strictObject({deliverable,number:z.int().positive(),text:text(4000).min(1),mentions:z.array(z.email()).max(20).default([])}),
  'thread.resolve':z.strictObject({deliverable,number:z.int().positive()}),
  'thread.reopen':z.strictObject({deliverable,number:z.int().positive()}),
  'continue.set':z.strictObject({deliverable,n:z.int().positive()}),
  'continue.undo':z.strictObject({deliverable}),
  'approval.create':z.strictObject({deliverable,n:z.int().positive()}),
  'resource.record':z.strictObject({category:z.enum(['source','template']),name,type:text(100).min(1),version:text(50).default(''),doc_date:text(40).default(''),
    notes:text(2000).default(''),link:z.url().refine(u=>/^https?:/.test(u),'must be http or https').optional(),
    scope:z.record(z.string(),z.unknown()).default({}),attach_to_project:z.boolean().default(true)}),
  'resources.set':z.strictObject({resources:z.array(uuid).max(500)}),
  'resource.upload':z.strictObject({resource:uuid,name:text(255).min(1),mime:text(200).default(''),content_base64:z.string().min(1).max(36_000_000)}),
  'source.search':z.strictObject({query:text(500).min(2),resource:uuid.optional(),document:documentId.optional(),limit:z.int().min(1).max(20).default(8)}),
  'source.read':z.strictObject({resource:uuid,from:z.int().positive().default(1),count:z.int().min(1).max(20).default(5)}),
  'version.file':z.strictObject({deliverable,n:z.int().positive().optional()}),
  'resource.list':z.strictObject({category:z.enum(['source','template'])}),
  'resource.update':z.strictObject({id:uuid,name:name.optional(),type:text(100).min(1).optional(),version:text(50).optional(),doc_date:text(40).optional(),notes:text(2000).optional(),
    link:z.url().refine(u=>/^https?:/.test(u),'must be http or https').optional()}),
  'resource.file':z.strictObject({id:uuid}),
  'preferences.save':z.strictObject(Object.fromEntries(['draft','finding','comment','invite','approval','source'].map(k=>[k,z.boolean().optional()]))),
  'step.context':z.strictObject({deliverable:deliverable.optional(),revise:z.boolean().default(false)}),
  'catalog.planning':z.strictObject({countries:z.array(country).max(30).default([]),submission_type:text(200).default('')}),
  'catalog.search':z.strictObject({query:text(200).default(''),category:z.enum(['planning','content','styling','workflow']).optional(),country:country.optional(),language:z.string().regex(/^[a-z]{2}$/).optional(),code:text(80).optional()}),
  'catalog.item':z.strictObject({id:z.string().regex(/^[A-Za-z0-9][A-Za-z0-9_.-]{0,80}$/)}),
  'document.resources.set':z.strictObject({document:documentId,add:z.array(uuid).max(200).default([]),remove:z.array(uuid).max(200).default([])}),
  'share.create':z.strictObject({email:z.email(),scope:z.enum(['project','document','deliverable']),document:documentId.optional(),step:stepId.optional(),role:z.enum(['commenter','editor'])}),
  'share.update':z.strictObject({id:uuid,role:z.enum(['commenter','editor'])}),
  'share.revoke':z.strictObject({id:uuid}),
  'logs':z.strictObject({before:z.int().positive().optional(),limit:z.int().min(1).max(100).default(50)})
}

export const splitDeliverable=code=>{const i=code.indexOf('-');return [code.slice(0,i),code.slice(i+1)]}
