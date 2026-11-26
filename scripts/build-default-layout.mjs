// Writes catalog/word/default-layout.docx: the TrialAgents default Word layout.
// Styling is ported from the earlier CTIS app (trialagents_ctis_old/server/config/ctis-defaults.json).
// Slots are Word content controls tagged title, body, header and footer (docs/CATALOG.md §4).
// Run: node scripts/build-default-layout.mjs
import JSZip from 'jszip'
import {writeFile} from 'node:fs/promises'

const style={
  font:'Arial',bodyPt:12,line:1.25,afterPt:8,text:'000000',muted:'555555',heading:'064E3B',
  headings:[[16,18,16],[14,16,10],[13,14,8],[12,12,6]], // size, space before, space after (pt)
  tableHeaderBg:'D1FAE5',tableBorder:'000000',summaryBg:'ECFDF5',infoBg:'EFF6FF',warningBg:'FEF2F2',
  marginsMm:{top:20,right:20,bottom:20,left:25},headerFooterPt:9
}
const tw=pt=>Math.round(pt*20),hp=pt=>Math.round(pt*2),mm=v=>Math.round(v*56.6929)
const W='xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"'
const head='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')

// A block-level content control: the filler replaces its content with the slot's blocks.
const slot=(tag,alias,placeholder,pStyle)=>`<w:sdt><w:sdtPr><w:alias w:val="${alias}"/><w:tag w:val="${tag}"/><w:showingPlcHdr/></w:sdtPr><w:sdtContent><w:p><w:pPr><w:pStyle w:val="${pStyle}"/></w:pPr><w:r><w:rPr><w:rStyle w:val="PlaceholderText"/></w:rPr><w:t>${esc(placeholder)}</w:t></w:r></w:p></w:sdtContent></w:sdt>`

const shaded=(id,name,fill)=>`<w:style w:type="paragraph" w:customStyle="1" w:styleId="${id}"><w:name w:val="${name}"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:pBdr><w:top w:val="single" w:sz="4" w:space="6" w:color="${fill}"/><w:left w:val="single" w:sz="4" w:space="6" w:color="${fill}"/><w:bottom w:val="single" w:sz="4" w:space="6" w:color="${fill}"/><w:right w:val="single" w:sz="4" w:space="6" w:color="${fill}"/></w:pBdr><w:shd w:val="clear" w:color="auto" w:fill="${fill}"/><w:spacing w:before="${tw(10)}" w:after="${tw(14)}"/></w:pPr></w:style>`

const styles=head+`<w:styles ${W}>
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="${style.font}" w:hAnsi="${style.font}" w:eastAsia="${style.font}" w:cs="${style.font}"/><w:color w:val="${style.text}"/><w:sz w:val="${hp(style.bodyPt)}"/><w:szCs w:val="${hp(style.bodyPt)}"/><w:lang w:val="en-GB"/></w:rPr></w:rPrDefault>
<w:pPrDefault><w:pPr><w:spacing w:before="0" w:after="${tw(style.afterPt)}" w:line="${Math.round(240*style.line)}" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:before="0" w:after="${tw(18)}"/></w:pPr><w:rPr><w:b/><w:color w:val="${style.heading}"/><w:sz w:val="${hp(20)}"/></w:rPr></w:style>
${style.headings.map(([size,before,after],i)=>`<w:style w:type="paragraph" w:styleId="Heading${i+1}"><w:name w:val="heading ${i+1}"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:uiPriority w:val="9"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="${tw(before)}" w:after="${tw(after)}"/><w:outlineLvl w:val="${i}"/></w:pPr><w:rPr><w:b/><w:color w:val="${style.heading}"/><w:sz w:val="${hp(size)}"/><w:szCs w:val="${hp(size)}"/></w:rPr></w:style>`).join('\n')}
<w:style w:type="paragraph" w:styleId="ListBullet"><w:name w:val="List Bullet"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:numPr><w:numId w:val="1"/></w:numPr><w:spacing w:after="${tw(4)}"/></w:pPr></w:style>
<w:style w:type="paragraph" w:styleId="ListNumber"><w:name w:val="List Number"/><w:basedOn w:val="Normal"/><w:qFormat/><w:pPr><w:numPr><w:numId w:val="2"/></w:numPr><w:spacing w:after="${tw(4)}"/></w:pPr></w:style>
<w:style w:type="paragraph" w:styleId="Caption"><w:name w:val="caption"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:before="${tw(6)}" w:after="${tw(8)}"/></w:pPr><w:rPr><w:i/><w:color w:val="${style.muted}"/><w:sz w:val="${hp(10)}"/></w:rPr></w:style>
${shaded('NoteInfo','Note info',style.infoBg)}
${shaded('NoteWarning','Note warning',style.warningBg)}
${shaded('NoteSummary','Note summary',style.summaryBg)}
<w:style w:type="paragraph" w:styleId="Header"><w:name w:val="header"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="0"/></w:pPr><w:rPr><w:sz w:val="${hp(style.headerFooterPt)}"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Footer"><w:name w:val="footer"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="0"/></w:pPr><w:rPr><w:sz w:val="${hp(style.headerFooterPt)}"/></w:rPr></w:style>
<w:style w:type="character" w:styleId="PlaceholderText"><w:name w:val="Placeholder Text"/><w:rPr><w:color w:val="808080"/></w:rPr></w:style>
<w:style w:type="character" w:customStyle="1" w:styleId="SitePlaceholder"><w:name w:val="Site placeholder"/><w:rPr><w:highlight w:val="yellow"/></w:rPr></w:style>
<w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style>
<w:style w:type="table" w:customStyle="1" w:styleId="CtisTable"><w:name w:val="CTIS table"/><w:basedOn w:val="TableNormal"/><w:pPr><w:spacing w:before="0" w:after="${tw(4)}"/></w:pPr><w:tblPr><w:tblBorders>${['top','left','bottom','right','insideH','insideV'].map(b=>`<w:${b} w:val="single" w:sz="4" w:space="0" w:color="${style.tableBorder}"/>`).join('')}</w:tblBorders><w:tblCellMar><w:top w:w="${mm(2)}" w:type="dxa"/><w:left w:w="${mm(2.5)}" w:type="dxa"/><w:bottom w:w="${mm(2)}" w:type="dxa"/><w:right w:w="${mm(2.5)}" w:type="dxa"/></w:tblCellMar></w:tblPr>
<w:tblStylePr w:type="firstRow"><w:rPr><w:b/></w:rPr><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="${style.tableHeaderBg}"/></w:tcPr></w:tblStylePr></w:style>
</w:styles>`

const level=(fmt,text)=>`<w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="${fmt}"/><w:lvlText w:val="${text}"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr>${fmt==='bullet'?'<w:rPr><w:rFonts w:ascii="Symbol" w:hAnsi="Symbol" w:hint="default"/></w:rPr>':''}</w:lvl>`
const numbering=head+`<w:numbering ${W}><w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="singleLevel"/>${level('bullet','')}</w:abstractNum><w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="singleLevel"/>${level('decimal','%1.')}</w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num><w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num></w:numbering>`

const {top,right,bottom,left}=style.marginsMm
const document=head+`<w:document ${W}><w:body>
${slot('title','Document title','Document title','Title')}
${slot('body','Document content','Document content','Normal')}
<w:sectPr><w:headerReference w:type="default" r:id="rIdHeader"/><w:footerReference w:type="default" r:id="rIdFooter"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="${mm(top)}" w:right="${mm(right)}" w:bottom="${mm(bottom)}" w:left="${mm(left)}" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr>
</w:body></w:document>`
const header=head+`<w:hdr ${W}>${slot('header','Header','Study code · document name · version','Header')}</w:hdr>`
const footer=head+`<w:ftr ${W}>${slot('footer','Footer','Sponsor · date','Footer')}<w:p><w:pPr><w:pStyle w:val="Footer"/><w:jc w:val="right"/></w:pPr><w:r><w:t xml:space="preserve">Page </w:t></w:r><w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t>1</w:t></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r><w:r><w:t xml:space="preserve"> of </w:t></w:r><w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText xml:space="preserve"> NUMPAGES </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t>1</w:t></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>`
const settings=head+`<w:settings ${W}><w:updateFields w:val="true"/><w:defaultTabStop w:val="720"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>`

const zip=new JSZip()
const date=new Date('2026-11-26T00:00:00Z') // fixed, so the file only changes when this script does
const add=(name,data)=>zip.file(name,data,{date})
add('[Content_Types].xml',head+`<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Default Extension="jpeg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/><Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`)
add('_rels/.rels',head+`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`)
add('docProps/core.xml',head+`<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>TrialAgents default layout</dc:title><dc:creator>TrialAgents CTIS</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">2026-11-26T00:00:00Z</dcterms:created></cp:coreProperties>`)
add('word/document.xml',document)
add('word/styles.xml',styles)
add('word/numbering.xml',numbering)
add('word/settings.xml',settings)
add('word/header1.xml',header)
add('word/footer1.xml',footer)
add('word/_rels/document.xml.rels',head+`<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rIdNumbering" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/><Relationship Id="rIdSettings" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/><Relationship Id="rIdHeader" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/><Relationship Id="rIdFooter" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>`)
const out=new URL('../catalog/word/default-layout.docx',import.meta.url)
await writeFile(out,await zip.generateAsync({type:'nodebuffer',compression:'DEFLATE',platform:'UNIX'}))
console.log('Wrote',out.pathname)
