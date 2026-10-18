'use strict';
// Public release regression: shipped catalogue + shipped UI functions only.
// No unpublished source sheets, candidate JSON, browser, network or user storage.
// Provenance checks below validate persisted metadata; independent raw-row audit is separate.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,'dist',file),'utf8');
const header=JSON.parse(read('data/markers.json'));
const markers=header.shards.flatMap(file=>{const data=JSON.parse(read('data/'+file));return Array.isArray(data)?data:data.markers;});
const assertions=markers.flatMap(m=>m.evidence.map(e=>({m,e}))),rna=assertions.filter(({e})=>e.addedIn==='v25c');
const continuous=rna.filter(({e})=>e.relation==='source_continuous_RNA_association'),heterogeneity=rna.filter(({e})=>e.relation==='scRNA_heterogeneity_example');
const functional=assertions.filter(({e})=>e.addedIn==='v25c-function'),newGenes=markers.filter(m=>m.addedIn==='v25c');
const idsOf=rows=>[...new Set(rows.map(row=>row.m.id))].sort(),plain=value=>JSON.parse(JSON.stringify(value));
const sourceId='wang2022_s5_correlation',roots=new Set(['GO:0003674','GO:0008150','GO:0005575']);
assert.equal(markers.length,5275);assert.equal(header.markerCount,markers.length);assert.equal(assertions.length,30056);
assert.equal(new Set(assertions.map(({e})=>e.evidenceId)).size,30051);assert.equal(new Set(markers.map(m=>m.id)).size,markers.length);assert.equal(header.sources.length,50);
assert.equal(rna.length,901);assert.equal(continuous.length,895);assert.equal(idsOf(continuous).length,850);assert.equal(heterogeneity.length,6);
assert.equal(functional.length,808);assert.equal(newGenes.length,125);
console.log('PASS published v25c counts, stable assertion identity and separate RNA/function additions');

let language='en';const handlers={},plan={markers:[]},catalogue={...header,markers},maps={marker:new Map(markers.map(m=>[m.id,m])),source:new Map(header.sources.map(s=>[s.id,s]))};
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const app={prefs:()=>({language}),esc,tx:value=>context.window.YV_TEXT?.[value]?.[language]??String(value??''),t:key=>key,data:()=>({markers:catalogue}),maps:()=>maps};
const context={URL,URLSearchParams,setTimeout,clearTimeout,sessionStorage:{getItem:()=>null,setItem(){}},location:{hash:'#markers'},document:{addEventListener(type,fn){(handlers[type]||=[]).push(fn);},querySelector:()=>null},window:{addEventListener(){},YV_APP:app,YV_BUILDER:{getPlan:()=>plan},YV_RESEARCH_ATLAS:{text:key=>key}}};
const load=(file,transform=s=>s)=>vm.runInNewContext(transform(read(file)),context,{filename:file});
load('marker-selection-v25c.js');load('marker-workspace-locales.js');load('v25-marker-locales.js');
load('marker-workspace.js',s=>s.replace('window.YV_MARKERS={','window.__releaseTest={resetFilters,evidencePurpose,libraryCounts,metadataPanel,card,familyMatches};window.YV_MARKERS={'));
load('marker-preview-v13.js',s=>s.replace('window.YV_MARKER_PREVIEW={','window.__sourceStatistics=sourceStatistics;window.YV_MARKER_PREVIEW={'));
const workspace=context.window.YV_MARKERS,test=context.window.__releaseTest,preview=context.window.YV_MARKER_PREVIEW;
const filter=patch=>{test.resetFilters();workspace.setFilters({browseScope:'annotation',evidencePurpose:'continuousAssociations',sources:[sourceId],...patch});return Array.from(workspace.filterResults()).sort();};
assert.deepEqual(filter({}),idsOf(continuous));assert.equal(test.libraryCounts().continuousAssociations,850);
assert.deepEqual(filter({evidenceKind:'rna',evidenceBranch:'singlecellRNA'}),idsOf(continuous));
assert.deepEqual(filter({evidencePurpose:'authorPanel'}),[]);assert.deepEqual(filter({evidencePurpose:'differentialCandidates'}),[]);
for(const direction of ['positive_correlation','negative_correlation'])assert.deepEqual(filter({direction}),idsOf(continuous.filter(({e})=>e.sourceDirection===direction)));
for(const direction of ['higher','lower'])assert.deepEqual(filter({direction}),[],'Correlation sign must not become a DE direction');
const ageDirectionCounts={};
for(const age of [16,36])for(const direction of ['positive_correlation','negative_correlation']){
 const expected=continuous.filter(({e})=>e.sourceAgeHours===age&&e.sourceDirection===direction);
 const got=filter({condition:age+' hours',direction,dataset:'GSE210032'});assert.deepEqual(got,idsOf(expected));ageDirectionCounts[age+'h/'+direction]=got.length;
}
const aro5=markers.find(m=>m.symbol==='ARO5');assert(aro5);
assert(!filter({condition:'16 hours',direction:'negative_correlation'}).includes(aro5.id));
assert(filter({condition:'36 hours',direction:'negative_correlation'}).includes(aro5.id),'The opposite sign in another age group cannot satisfy the same-record filter');
const highlights=continuous.filter(({e})=>e.authorHighlighted);assert.equal(highlights.length,7);
assert.deepEqual([...new Set(highlights.map(({m})=>m.symbol))].sort(),['FET3','FIT2','FIT3','HAC1']);
for(const {e} of highlights){assert.equal(test.evidencePurpose(e),'continuousAssociations');assert.equal(e.directStateMarker,false);assert(e.authorHighlightLocator);}
for(const {e} of heterogeneity){assert.equal(test.evidencePurpose(e),'heterogeneity');assert.equal(e.directStateMarker,false);assert.equal(e.sourceDirection,null);assert.equal(e.sourceFigure,'S4a');}
assert.deepEqual(heterogeneity.map(({m})=>m.symbol).sort(),['ADH5','ARO10','CHS1','GLC3','HIS4','THI3']);
const associationTags=[...new Set(continuous.map(({e})=>e.tag))];assert.equal(associationTags.length,4);
const family=(tag,key)=>{workspace.setFilters({tagFamily:key});return test.familyMatches(tag);};
for(const tag of associationTags){assert.deepEqual(header.tagFamilies[tag],['familyDaughter']);assert(family(tag,'familyDaughter'));assert(!family(tag,'familyStress'));assert(!family(tag,'familyMetabolism'));}
assert.deepEqual(header.tagFamilies['代谢异质性'],['familyMetabolism']);assert(family('代谢异质性','familyMetabolism'));
console.log('PASS continuous/heterogeneity facets, correlation versus DE direction, same-record 16h/36h filters and author-highlight boundaries',JSON.stringify(ageDirectionCounts));

for(const {m,e} of rna){
 assert(maps.source.has(e.sourceId));assert(/^https:\/\//.test(e.sourceUrl));assert(/^[a-f0-9]{64}$/.test(e.sourceSha256));assert(e.sourceLocator);
 assert([m.systematic,m.symbol,...(m.aliases||[])].some(v=>v.toUpperCase()===e.sourceGene.toUpperCase()),m.symbol+' identity correspondence');
 assert.equal(e.statisticsScope,'source-study-only; not 1011 measurements');
 assert.equal(e.directStateMarker,false);
 if(e.relation==='source_continuous_RNA_association'){
  assert.equal(e.sourceId,sourceId);assert.equal(e.annotationUse,'contextual_continuous_association');assert([16,36].includes(e.sourceAgeHours));
  assert(e.sourceCondition.includes(e.sourceAgeHours+' hours'));assert(Number.isInteger(e.sourceRow)&&e.sourceRow>0);assert(e.sourceSheet);assert.equal(e.datasetAccession,'GSE210032');
  assert.equal(typeof e.referenceStatistics.R,'string');assert.equal(typeof e.referenceStatistics.pvalue,'string');
  const r=Number(e.referenceStatistics.R),p=Number(e.referenceStatistics.pvalue);assert(Number.isFinite(r)&&r>=-1&&r<=1);assert(Number.isFinite(p)&&p>=0&&p<=1);
  assert.equal(e.sourceDirection,r<0?'negative_correlation':'positive_correlation');assert.equal(e.referenceAssociation.direction,e.sourceDirection);
  assert(!Object.hasOwn(e.referenceStatistics,'padj'));assert(!Object.hasOwn(e.referenceStatistics,'FDR'));assert(/not reported/i.test(e.referenceAssociation.multipleTesting));
 }else assert(Number.isInteger(e.sourcePage)&&e.sourcePage>0);
}
for(const m of newGenes){
 assert(/^S\d{9}$/.test(m.id));assert.equal(m.links.sgd,'https://www.yeastgenome.org/locus/'+m.id);assert(m.systematic&&m.symbol&&m.featureType);
 assert.equal(m.identityProvenance.database,'Saccharomyces Genome Database');assert.equal(new URL(m.identityProvenance.url).hostname,'downloads.yeastgenome.org');assert(/^[a-f0-9]{64}$/.test(m.identityProvenance.sha256));
 for(const key of ['mean','detection','rank','specificity'])assert.equal(m.expression[key],null,m.symbol+' project '+key);
 assert.equal(m.completeness.expression,'requires_project_counts');assert.equal(m.go.length,0,'GO-slim is not full GAF evidence');
 assert(m.evidence.some(e=>e.addedIn==='v25c'));assert(m.evidence.every(e=>['v25c','v25c-function'].includes(e.addedIn)));
}
console.log('PASS SGD identity/provenance correspondence, original source-statistic fields and unmeasured project expression for all 125 new genes');

const rootMappings=newGenes.flatMap(m=>(m.goSlim||[]).filter(g=>g.ontologyRoot).map(g=>({m,g})));assert.equal(rootMappings.length,118);
for(const {m,g} of rootMappings){assert(roots.has(g.id));assert(!m.evidence.some(e=>e.goId===g.id));assert(!m.tags.includes(g.labelZh));assert(g.sourceRows.every(n=>Number.isInteger(n)&&n>0));}
for(const {m,e} of functional){
 assert(newGenes.includes(m));assert.equal(e.relation,'GO_slim_function');assert.equal(e.annotationUse,'auxiliary_functional_context');assert.equal(e.grade,'C');assert.equal(e.directStateMarker,false);assert.equal(e.sourceDirection,null);
 assert(!roots.has(e.goId));assert.equal(test.evidencePurpose(e),'');assert.equal(e.sourceGene,m.systematic);if(e.sourceSymbol)assert.equal(e.sourceSymbol,m.symbol);else assert.equal(m.symbol,m.systematic,'An absent source symbol remains an ORF name');assert(e.sourceRows.includes(e.sourceRow));
 const slim=m.goSlim.find(g=>g.id===e.goId);assert(slim&&!slim.ontologyRoot);assert.equal(slim.term,e.goTerm);assert.equal(slim.aspect,e.goAspect);assert.deepEqual(e.sourceRows,slim.sourceRows);
 assert(m.tags.includes(e.tag));
}
for(const m of newGenes){assert.equal(m.functionalCoverage.specificAssertions,m.evidence.filter(e=>e.addedIn==='v25c-function').length);assert.equal(m.functionalCoverage.rootMappings,m.goSlim.filter(g=>g.ontologyRoot).length);}
const functionIds=filter({browseScope:'function',evidencePurpose:'all',sources:['sgd_slim']});
for(const m of newGenes){const expected=m.evidence.some(e=>e.addedIn==='v25c-function');assert.equal(functionIds.includes(m.id),expected,m.symbol+' root mappings cannot create functional evidence');}
console.log('PASS 808 independent GO-slim assertions and 118 ontology-root mappings without functional or RNA-marker promotion');

const positive=continuous.find(({e})=>e.sourceDirection==='positive_correlation').e,negative=continuous.find(({e})=>e.sourceDirection==='negative_correlation').e;
for(const lang of ['zh','en','fr','es','eu']){
 language=lang;filter({direction:'negative_correlation'});const panel=test.metadataPanel();
 for(const key of ['positive_correlation','negative_correlation']){assert(panel.includes('value="'+key+'"'));const label=preview.text(key,lang);assert.notEqual(label,key);if(lang!=='zh')assert(!/[\u3400-\u9fff]/.test(label));}
 for(const key of ['purpose_continuousAssociations','purpose_continuousAssociationsHelp','purpose_heterogeneity']){assert.notEqual(workspace.text(key),key);if(lang!=='zh')assert(!/[\u3400-\u9fff]/.test(workspace.text(key)));}
 for(const tag of associationTags){const label=context.window.YV_TEXT[tag]?.[lang];assert(typeof label==='string'&&label.length,tag+' '+lang+' label');if(lang!=='zh')assert(!/[\u3400-\u9fff]/.test(label));}
 for(const e of [positive,negative,highlights[0].e]){
  const values=preview.sourceMetadataValues(e,lang),html=preview.sourceMetadata(e,lang),statistics=context.window.__sourceStatistics(e);
  assert.equal(values.condition,e.sourceCondition);assert.equal(values.sourceAgeHours,e.sourceAgeHours);assert.equal(values.associationPredictor,e.referenceAssociation.predictor);assert.equal(values.associationResponse,e.referenceAssociation.response);
  assert.equal(values.associationMethod,e.referenceAssociation.correlationMethod);assert.equal(values.associationMultiplicity,e.referenceAssociation.multipleTesting);assert.equal(values.direction,preview.text(e.sourceDirection,lang));
  for(const key of ['associationPredictor','associationResponse','associationMethod','associationMultiplicity','sourceAgeHours']){assert.notEqual(preview.text(key,lang),key);assert(html.includes(esc(preview.text(key,lang))));}
  assert(statistics.includes(esc(e.referenceStatistics.R)));assert(statistics.includes(esc(e.referenceStatistics.pvalue)));assert(statistics.includes(esc(preview.text('sourceCorrelationHelp',lang))));assert(!statistics.includes('undefined'));
 }
 const card=test.card(continuous.find(({e})=>e.evidenceId===negative.evidenceId).m);assert(card.includes('data-purpose="continuousAssociations"'));assert(card.includes(workspace.text('purpose_continuousAssociations')));
}
assert.deepEqual(plain(context.window.YV_MARKER_SELECTION.resolve(continuous[0].m,{evidenceIds:[continuous[0].e.evidenceId]}).contexts[0].sourceCondition),continuous[0].e.sourceCondition);
console.log('PASS five-language association controls, source metadata/R/P preview and contextual evidence selection');
console.log(JSON.stringify({genes:markers.length,occurrences:assertions.length,uniqueAssertions:new Set(assertions.map(({e})=>e.evidenceId)).size,registeredSources:header.sources.length,newRNA:rna.length,newFunctional:functional.length,newGenes:newGenes.length,continuousGenes:idsOf(continuous).length,rootMappings:rootMappings.length}));
