'use strict';
// Shipped functions and real catalogue in a Node VM. DOM/storage/APA formatter are fixtures.
// No browser, network, user storage or production-data writes.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,'dist',file),'utf8'),plain=x=>JSON.parse(JSON.stringify(x));
const header=JSON.parse(read('data/markers.json'));
const real=fs.readdirSync(path.join(root,'dist/data/markers')).filter(f=>f.endsWith('.json')).flatMap(f=>{const x=JSON.parse(read('data/markers/'+f));return Array.isArray(x)?x:x.markers||[];});
const a={evidenceId:'fixture-a',sourceId:'fixture-source',sourceUrl:'https://example.org/selected',tag:'G1',sourcePhases:['G1'],relation:'used_as_scRNA_marker_for',grade:'A',assay:'scRNA-seq',context:'first source assertion',sourceCondition:'condition A'};
const b={...a,evidenceId:'fixture-b',tag:'S',sourcePhases:['S'],context:'second assertion',sourceCondition:'condition B'};
const hidden={...a,evidenceId:'fixture-hidden',sourceId:'fixture-unselected',sourceUrl:'https://example.org/unselected'};
const fixture={id:'fixture-gene',symbol:'FIXTURE',systematic:'Y_FIXTURE',aliases:[],tags:['G1','S'],phases:['G1','S'],uses:[],go:[],evidence:[a,{...a},b,hidden],referenceMeasurements:[{sourceId:'fixture-unselected'}]};
const continuous={...fixture,id:'fixture-continuous',symbol:'CONTINUOUS',systematic:'Y_CONTINUOUS',tags:['RNA-generation association'],phases:[],evidence:[{...a,evidenceId:'fixture-association',tag:'RNA-generation association',relation:'source_continuous_RNA_association',annotationUse:'contextual_continuous_association',sourcePhases:[],sourceCondition:'16h',sourceDirection:'negative_correlation',evidenceLayer:'single_cell_RNA'}]};
const genes=[...real,fixture,continuous],maps={marker:new Map(genes.map(m=>[m.id,m])),source:new Map([...header.sources,{id:'fixture-source',url:a.sourceUrl},{id:'fixture-unselected',url:hidden.sourceUrl}].map(s=>[s.id,s])),tool:new Map(),step:new Map(),metric:new Map(),formula:new Map()};
const seed={schema:'yeastvar1011-plan-v2',title:'Evidence selection regression',objective:'',projects:[],resultSpecificationIds:[],stages:[],tools:[],metrics:[],markers:[],edges:[],availableData:['raw_fastq'],inputRoute:'auto',parameters:{}};
const storage=new Map([['yv.plan.v2',JSON.stringify(seed)]]),handlers={};let language='en',download,refreshes=0;
const data={markers:{...header,markers:genes},categories:{dataRequirements:[{id:'raw_fastq'}]},projects:{projects:[],resultSpecifications:[]},workflow:{updated:'test',steps:[],tools:[],metrics:[]},literature:{papers:[]}};
const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const app={data:()=>data,maps:()=>maps,prefs:()=>({language}),esc:escape,tx:v=>String(v??''),t:k=>k,syncMarkers(){},render(){},toast(){},download:(name,text)=>download={name,text},route:()=> 'markers'};
const inputs=()=>({inputs:[],rules:[],route:'raw_fastq'});inputs.route=()=> 'raw_fastq';inputs.stageDependencies=()=>[];inputs.toolContext=(p,t)=>t;
class MemoryFormData{constructor(form){this.entries=form.entries;}get(k){return this.getAll(k)[0]??null;}getAll(k){return this.entries.filter(([key])=>key===k).map(([,v])=>v);}}
const context={URL,URLSearchParams,setTimeout,clearTimeout,FormData:MemoryFormData,location:{hash:'#markers'},CustomEvent:class{constructor(type){this.type=type;}},
 localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},sessionStorage:{getItem:()=>null,setItem(){}},
 document:{addEventListener(t,fn){(handlers[t]||=[]).push(fn);},querySelector:()=>null},
 window:{YV_APP:app,YV_BUILD_TEXT:k=>k,YV_INPUTS:inputs,YV_RESEARCH_ATLAS:{text:k=>k},addEventListener(){},dispatchEvent(){}}
};
const load=(file,transform=s=>s)=>vm.runInNewContext(transform(read(file)),context,{filename:file});
load('marker-selection-v25c.js');load('marker-workspace-locales.js');load('builder.js');const builder=context.window.YV_BUILDER;builder.init(app);
load('marker-workspace.js',s=>s.replace('window.YV_MARKERS={','window.__evidenceTest={editor,selectionEditor,readEditor,captureDraft,exportTSV,metadataPanel,MT,setRefresh(fn){refresh=fn;}};window.YV_MARKERS={'));
const helper=context.window.YV_MARKER_SELECTION,markers=context.window.YV_MARKERS,test=context.window.__evidenceTest;test.setRefresh(()=>refreshes++);
const assignment=id=>builder.getPlan().markers.find(m=>m.id===id),selected=(m=fixture)=>helper.resolve(m,assignment(m.id)||{});

builder.setMarkers([fixture.id],true,false);
builder.updateMarker(fixture.id,{evidenceSources:['fixture-source'],groups:['S']},false);
assert(!Object.hasOwn(assignment(fixture.id),'evidenceIds'));assert.equal(selected().mode,'source');assert.equal(selected().records.length,0);
const legacy=plain(assignment(fixture.id));
builder.updateMarker(fixture.id,{evidenceIds:['fixture-a','fixture-a','unresolved-old-id']},false);
assert.deepEqual(plain(assignment(fixture.id).evidenceIds),['fixture-a','unresolved-old-id']);assert.equal(selected().records.length,1);assert.equal(selected().occurrenceCount,2);
assert.equal(selected().available.length,3);assert.deepEqual(plain(selected().unresolvedIds),['unresolved-old-id']);assert.deepEqual(plain(selected().phases),['G1']);
assert.equal(selected().contexts[0].sourceCondition,'condition A');assert(markers.review().unsupportedGroup.includes(fixture.id),'Another assertion from the selected source cannot supply S');
assert.deepEqual(plain(assignment(fixture.id).evidenceSources),legacy.evidenceSources);
builder.undo();assert(!Object.hasOwn(assignment(fixture.id),'evidenceIds'));builder.redo();assert.equal(selected().records.length,1);
builder.updateMarker(fixture.id,{evidenceIds:[]},false);assert.equal(selected().mode,'record');assert.equal(selected().records.length,0);assert.deepEqual(plain(helper.referenceURLs(fixture,assignment(fixture.id),maps.source)),[]);
builder.updateMarker(fixture.id,{evidenceIds:null},false);assert(!Object.hasOwn(assignment(fixture.id),'evidenceIds'));assert.deepEqual(plain(assignment(fixture.id).evidenceSources),legacy.evidenceSources);
console.log('PASS legacy/explicit-empty/source-mode transitions, duplicate assertions, unresolved IDs and one-operation undo/redo');

const beforeInvalid=plain(builder.getPlan());
assert.throws(()=>builder.updateMarker(fixture.id,{evidenceIds:'fixture-a'}),/invalidEvidenceIds/);
assert.throws(()=>builder.importMarkerAssignments([{id:fixture.id,evidenceIds:[3]}]),/invalidEvidenceIds/);
assert.throws(()=>markers.importData(JSON.stringify({schema:'yeastvar-marker-panel-v1',markers:[{id:fixture.id,evidenceIds:{}}]}),{apply:true}),/invalidEvidenceIds/);
assert.deepEqual(plain(builder.getPlan()),beforeInvalid,'Invalid fields are rejected before mutation');
const ash1=real.find(m=>m.symbol==='ASH1'),gasch=ash1.evidence.find(e=>e.sourceId==='gasch2017_s3'&&e.sourcePhases?.includes('M/G1'));
builder.updateMarker(fixture.id,{evidenceIds:[gasch.evidenceId,'fixture-a','unresolved-old-id']},false);
assert(selected().unresolvedIds.includes(gasch.evidenceId),'An existing ID owned by another gene stays unresolved here');
builder.importPlan(builder.exported());assert.deepEqual(plain(assignment(fixture.id).evidenceIds),[gasch.evidenceId,'fixture-a','unresolved-old-id']);
const panel=markers.exportData();builder.setMarkers([fixture.id],false,false);markers.importData(JSON.stringify(panel),{apply:true});
assert.deepEqual(plain(assignment(fixture.id).evidenceIds),plain(panel.markers[0].evidenceIds));
builder.backup();assert.deepEqual(JSON.parse(download.text).markers[0].evidenceIds,plain(assignment(fixture.id).evidenceIds));
assert.deepEqual(JSON.parse(storage.get('yv.plan.v2')).markers[0].evidenceIds,plain(assignment(fixture.id).evidenceIds));
console.log('PASS type validation, cross-gene preservation, plan/panel JSON, persistent state and backup round-trip');

function form(entries,visible=['fixture-a','fixture-b']){return {dataset:{mwEditor:fixture.id},entries,querySelectorAll:()=>visible.map(value=>({value})),querySelector:()=>null};}
const entries=[['mw-role-'+fixture.id,'include'],['groups','G1'],['purposes','annotation'],['rationale','saved through form'],['evidenceSources','fixture-source'],['mw-evidence-mode','record'],['evidenceIds','fixture-b']];
let f=form(entries);let patch=test.readEditor(f);
assert(patch.evidenceIds.includes('fixture-b'));assert(!patch.evidenceIds.includes('fixture-a'));assert(patch.evidenceIds.includes('unresolved-old-id'));
const submit=handlers.submit.at(-1);const count=builder.recoveryState().undoCount;
submit({target:{closest:()=>f},preventDefault(){}});assert.equal(builder.recoveryState().undoCount,count+1);assert.equal(assignment(fixture.id).rationale,'saved through form');assert.equal(selected().records[0].evidenceId,'fixture-b');
builder.undo();builder.redo();assert.equal(selected().records[0].evidenceId,'fixture-b');
for(const lang of ['zh','en','fr','es','eu']){
 language=lang;const html=test.editor(assignment(fixture.id));assert(html.includes(markers.text('recordMode')));assert(html.includes(markers.text('selectionHelp')));
 assert.equal((html.match(/name="evidenceIds" value="fixture-a"/g)||[]).length,1,'A duplicate raw row produces one checkbox');
 assert(html.includes('value="unresolved-old-id" checked'));assert(html.includes(markers.text('unresolvedEvidence')));
 assert(html.includes('class="mw-evidence-choices" tabindex="0" role="region"'),'The evidence list has an accessible bounded scroll region');
 for(const key of ['recordMode','selectedEvidence','selectionHelp','unresolvedEvidence','selectedEvidencePhases','invalidEvidenceIds']){assert.notEqual(markers.text(key),key);if(lang!=='zh')assert(!/[\u3400-\u9fff]/.test(markers.text(key)));}
 assert.deepEqual(plain(assignment(fixture.id).evidenceSources),legacy.evidenceSources);
}
language='en';test.exportTSV();const table=download.text.split('\n').map(s=>s.split('\t')),col=name=>table[0].indexOf(name);
assert(table[1][col('selected_evidence_ids')].includes('fixture-b'));assert.equal(table[1][col('evidence_selection_mode')],'record');assert.equal(table[1][col('selected_evidence_phases')],'S');
assert(table[1][col('unresolved_evidence_ids')].includes('unresolved-old-id'));assert.equal(markers.importData(download.text).rows.length,1,'TSV still imports identity only');
console.log('PASS real editor save/read rules, hidden and unresolved retention, five languages and TSV identity-only import');

assert.equal(markers.previewTags({...continuous,tags:['GO function',...continuous.tags],evidence:[...continuous.evidence,{tag:'GO function',relation:'GO_slim_function'}]})[0],continuous.tags[0],'Continuous RNA associations stay visible with other RNA evidence in card previews');
markers.setFilters({browseScope:'annotation',evidencePurpose:'continuousAssociations'});
assert(markers.filterResults().includes(continuous.id));assert(!markers.filterResults().includes(fixture.id));
markers.setFilters({direction:'negative_correlation'});assert(markers.filterResults().includes(continuous.id));markers.setFilters({direction:'lower'});assert(!markers.filterResults().includes(continuous.id));markers.setFilters({direction:'positive_correlation'});assert(!markers.filterResults().includes(continuous.id));markers.setFilters({direction:''});
markers.setFilters({evidenceKind:'rna',browseScope:'annotation',evidenceBranch:'singlecellRNA'});assert(markers.filterResults().includes(continuous.id));
markers.setFilters({evidencePurpose:'differentialCandidates'});assert(!markers.filterResults().includes(continuous.id));
markers.setFilters({evidencePurpose:'authorPanel'});assert(!markers.filterResults().includes(continuous.id));
for(const lang of ['zh','en','fr','es','eu']){language=lang;for(const key of ['purpose_continuousAssociations','purpose_continuousAssociationsHelp']){assert.notEqual(markers.text(key),key);if(lang!=='zh')assert(!/[\u3400-\u9fff]/.test(markers.text(key)));}}
for(const lang of ['zh','en','fr','es','eu']){language=lang;const panel=test.metadataPanel();for(const key of ['positive_correlation','negative_correlation']){assert(panel.includes('value="'+key+'"'));assert(panel.includes(test.MT(key)));assert.notEqual(test.MT(key),key);if(lang!=='zh')assert(!/[\u3400-\u9fff]/.test(test.MT(key)));}}
language='en';console.log('PASS continuous RNA associations have a distinct five-language category and never become DE or author-panel evidence');

load('marker-preview-v13.js',s=>s.replace('window.YV_MARKER_PREVIEW={','window.__previewReview=reviewStatus;window.YV_MARKER_PREVIEW={'));
const previewReview=context.window.__previewReview;
assert(previewReview(fixture,{evidenceIds:[a.evidenceId]},a).reviewed);
assert(!previewReview(fixture,{evidenceIds:[],evidenceSources:[a.sourceId]},a).reviewed);
assert(!previewReview(fixture,{evidenceIds:['unknown'],evidenceSources:[a.sourceId]},a).reviewed);
assert(previewReview(fixture,{evidenceSources:[a.sourceId]},a).reviewed);
assert(!previewReview(fixture,{evidenceIds:['fixture-b']},a).reviewed);
for(const lang of ['zh','en','fr','es','eu']){language=lang;assert.equal(previewReview(fixture,{evidenceIds:[a.evidenceId]},a).label,markers.text('selectedEvidence'));}
language='en';console.log('PASS source-preview review status respects record mode, explicit empty, unresolved and legacy selections');

// Formatter output is deterministic here; assertions exercise the shipped citation scope/resolver, not typography.
context.window.YV_CITATION_DATA={records:[{id:'selected',urls:[a.sourceUrl]},{id:'unselected',urls:[hidden.sourceUrl]},{id:'method',urls:['https://example.org/method']}],toolReferences:{tool:['method']},urlMethodReferences:{}};
load('citations.js',s=>s.replace("let cachedKey = '', cachedResult = null;",`format=rows=>{const entries=rows.map(r=>({id:r.id,text:r.id,csl:{id:r.id}})),byID=Object.fromEntries(entries.map(e=>[e.id,e]));return {entries,byID,bibliographyHTML:'',bibliographyText:entries.map(e=>e.id).join(' '),csl:entries.map(e=>e.csl),citeIDs:ids=>ids.join(','),error:null};};let cachedKey = '', cachedResult = null;`));
const citations=context.window.YV_CITATIONS;
let exported=builder.exported(),scope=plain(exported.citationSelection);
assert(scope.sourceUrls.includes(a.sourceUrl));assert(!scope.sourceUrls.includes(hidden.sourceUrl));
exported.referenceMeasurements=[{sourceUrl:hidden.sourceUrl}];exported.bibliography={url:hidden.sourceUrl};exported.sources=[{url:hidden.sourceUrl}];
assert.deepEqual(Array.from(citations.build(exported).entries,e=>e.id),['selected']);
assert.deepEqual(Array.from(citations.build({...exported,citationSelection:{version:1,tools:[],sourceUrls:[]}}).entries),[]);
assert(citations.build({...exported,citationSelection:{version:1,tools:[],sourceUrls:'invalid'}}).error);
const strict={citationSelection:{version:1,tools:[],sourceUrls:[a.sourceUrl]}};Object.defineProperty(strict,'markerRecords',{get(){throw Error('Unselected records must not be traversed');}});assert.equal(citations.build(strict).entries.length,1);
assert.deepEqual(Array.from(citations.build({sourceUrls:[hidden.sourceUrl]}).entries,e=>e.id),['unselected'],'Non-plan legacy callers still work');
assert.deepEqual(plain(helper.citationSelection({tools:['tool'],baseURLs:helper.referenceLinks({formulas:[{sourceUrl:'https://example.org/method'}]}),markerRecords:exported.markerRecords,sourceMap:maps.source}).sourceUrls).sort(),[a.sourceUrl,'https://example.org/method'].sort());
console.log('PASS explicit APA whitelist, empty/invalid scopes, unselected snapshot exclusion and legacy citation callers');

context.window.YV_EXPORT_LAYOUT={options:()=>({language}),context:()=>({language,index:1,mk:k=>markers.text(k),tx:v=>String(v??''),t:k=>k,b:k=>k,v3:k=>k,input:k=>k,field:(type,m,k)=>m[k]}),collectionNote:()=>''};
load('export-studio.js');const collect=context.window.YV_EXPORTS.collect;
exported=builder.exported();const workbook=collect(exported,citations.build(exported));
const selectedRow=workbook.evidence.find(row=>row[8]==='fixture-b'),otherSameSource=workbook.evidence.find(row=>row[8]==='fixture-a');
assert.equal(selectedRow[9],markers.text('selectedEvidence'));assert.equal(otherSameSource[9],markers.text('notSelected'));assert.equal(otherSameSource[6],'','Another selected assertion from the same paper must not mark this row as cited evidence');
assert.equal(workbook.evidence.length,fixture.evidence.length,'The workbook retains original occurrences');assert.equal(workbook.markers[0][11],markers.text('recordMode'));
assert.deepEqual(plain(helper.citationSelection({markerRecords:exported.markerRecords,sourceMap:maps.source}).tools),[]);
console.log('PASS workbook row-level selection, same-paper distinction, full occurrence retention and marker-only citation scope');

builder.setMarkers([ash1.id],true,false);builder.updateMarker(ash1.id,{evidenceIds:[gasch.evidenceId],groups:['M/G1']},false);assert.deepEqual(plain(selected(ash1).phases),['M/G1']);
assert(!markers.review().unsupportedGroup.includes(ash1.id));
const dna=real.flatMap(m=>m.evidence.map(e=>({m,e}))).find(({e})=>e.sourceId==='gasch2017_s3'&&e.authorClassification?.includes('DNA replication'));
assert(dna);assert.equal(helper.phases(dna.e).length,0);
const repeated=real.find(m=>m.evidence.some((e,i,es)=>es.findIndex(r=>r.evidenceId===e.evidenceId)!==i));assert(repeated);
const duplicateId=repeated.evidence.find((e,i,es)=>es.findIndex(r=>r.evidenceId===e.evidenceId)!==i).evidenceId;
assert.equal(helper.resolve(repeated,{evidenceIds:[duplicateId]}).records.length,1);assert.equal(helper.resolve(repeated,{evidenceIds:[duplicateId]}).occurrenceCount,2);
const conflicting={...fixture,evidence:[a,{...a,context:'different assertion under same ID'}]};assert.equal(helper.resolve(conflicting,{evidenceIds:['fixture-a']}).records.length,0);
assert.deepEqual(plain(helper.resolve(conflicting,{evidenceIds:['fixture-a']}).unresolvedIds),['fixture-a']);
assert.equal(real.flatMap(m=>m.evidence).filter(e=>!e.evidenceId).length,0);
console.log('PASS actual Gasch phases, no invented DNA-replication phase, migrated duplicate assertions and conflicting-ID quarantine');
console.log(JSON.stringify({genes:real.length,occurrences:real.reduce((n,m)=>n+m.evidence.length,0),assertions:new Set(real.flatMap(m=>m.evidence.map(e=>e.evidenceId))).size,refreshes}));

// Use the bundled ExcelJS runtime and reopen its bytes; no output file is saved.
(async()=>{
 fixture.expression={referenceNote:''};
 builder.importMarkerAssignments([{id:fixture.id,evidenceIds:['fixture-b','unresolved-old-id'],evidenceSources:['fixture-source']}],{merge:false});
 const actualExported=builder.exported,full=actualExported();builder.exported=()=>({...full,tools:['tool'],citationSelection:{version:1,tools:['tool'],sourceUrls:[a.sourceUrl,'https://example.org/method']}});
 const ExcelJS=require(path.join(root,'dist/vendor/exceljs.min.js'));context.window.ExcelJS=ExcelJS;
 context.window.YV_EXPORT_LAYOUT.options=()=>({language,font:'test'});context.window.YV_EXPORT_LAYOUT.fonts={test:{excel:'Arial'}};
 context.window.YV_MARKER_PREVIEW={text:key=>key,sourceMetadata:()=>'',sourceMetadataValues:()=>({}),sourceText:value=>String(value||'')};
 context.DOMParser=class{parseFromString(){return {body:{childNodes:[]}};}};
 const report=await context.window.YV_EXPORTS.workbook('markers');assert(report.sheets.includes('Marker panel'));assert(report.sheets.includes('Marker evidence'));
 const restored=new ExcelJS.Workbook();await restored.xlsx.load(download.text);
 assert.equal(restored.getWorksheet('Marker panel').getRow(6).getCell(13).value,'fixture-b\nunresolved-old-id');
 assert.equal(restored.getWorksheet('Marker panel').getRow(6).getCell(14).value,'unresolved-old-id');
 const evidenceRows=restored.getWorksheet('Marker evidence').getSheetValues().slice(6).filter(Boolean);
 assert.equal(evidenceRows.length,fixture.evidence.length);assert.equal(evidenceRows.find(r=>r[9]==='fixture-b')[10],markers.text('selectedEvidence'));
 assert.equal(evidenceRows.find(r=>r[9]==='fixture-a')[7],'');
 const refRows=restored.getWorksheet('References').getSheetValues().slice(6).filter(Boolean);assert.deepEqual(refRows.map(r=>r[3]),['selected']);
 builder.exported=actualExported;
 console.log('PASS real XLSX bytes reopen with selected/unresolved IDs, untouched raw occurrences and marker-only APA scope');
 const originalContext=context.window.YV_EXPORT_LAYOUT.context;context.window.YV_EXPORT_LAYOUT.context=()=>({...originalContext(),assignment:()=>'',text:k=>k,lab:k=>k});
 context.window.YV_EXPORT_LAYOUT.printPages=()=>[];context.window.YV_EXPORTS.polish=html=>html;builder.svgExport=()=>'<svg></svg>';
 load('experience.js');const html=context.window.YV_V3.exportHTML('string');
 const rows=[...html.matchAll(/<tr>(.*?)<\/tr>/g)].map(m=>m[1]),unselected=rows.find(r=>r.includes('first source assertion')),chosen=rows.find(r=>r.includes('second assertion'));
 assert(unselected.includes(markers.text('notSelected')));assert(unselected.includes('href="'+a.sourceUrl+'"'),'Unselected records keep their raw source link');
 assert(!unselected.includes('<span class="source-citations">selected</span>'),'An unselected assertion does not inherit an adopted citation from the same paper');
 assert(chosen.includes('<span class="source-citations">selected</span>'));assert(chosen.includes(markers.text('selectedEvidence')));
 const embedded=JSON.parse(html.match(/id="research-plan-data">(.*?)<\/script>/s)[1]);assert.deepEqual(embedded.markers[0].evidenceIds,['fixture-b','unresolved-old-id']);
 assert(html.includes(markers.text('selectedEvidencePhases')));assert(html.includes('unresolved-old-id'));
 console.log('PASS HTML plan exports selected phases, per-row citation status and the complete restorable JSON');
})().catch(error=>{console.error(error);process.exitCode=1;});
