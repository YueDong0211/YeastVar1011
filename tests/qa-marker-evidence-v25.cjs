'use strict';
// Validate the distributed evidence catalogue without downloading or executing external analysis.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const manifest=read('dist/data/markers.json');
const markers=manifest.shards.flatMap(p=>read('dist/data/'+p));
assert.equal(markers.length,manifest.markerCount);
assert.equal(new Set(markers.map(m=>m.id)).size,markers.length);
const sources=new Map(manifest.sources.map(s=>[s.id,s]));
const added=markers.flatMap(m=>(m.evidence||[]).filter(e=>e.addedIn==='v25').map(e=>({m,e})));
assert.equal(added.length,875);
assert.equal(new Set(added.map(({e})=>e.evidenceId)).size,875);
const counts={};
for(const {m,e} of added){
  counts[e.relation]=(counts[e.relation]||0)+1;
  assert(sources.has(e.sourceId),m.symbol+' missing source');
  assert(m.tags.includes(e.tag));
  assert(e.sourceCondition&&e.sourceStrain&&e.datasetAccession);
  assert(Number.isInteger(e.sourceRow)&&e.sourceRow>1);
  assert.match(e.sourceSha256,/^[a-f0-9]{64}$/);
  assert.equal(e.directStateMarker,false,'Source candidates must not claim universal state specificity');
  assert.equal(e.statisticsScope,'source-study-only; not 1011 measurements');
  if(e.relation==='source_differential_RNA'){
    assert.equal(e.annotationUse,'contextual_differential_candidate');
    assert(['higher','lower'].includes(e.sourceDirection));
    assert.equal(e.referenceStatistics.expression,e.sourceDirection==='higher'?'positive':'negative');
  }
}
assert.deepEqual(counts,{used_as_scRNA_marker_for:61,source_cluster_marker:116,source_differential_RNA:698});
const unresolved=new Set(['YOL058W1','YHR162W1','YMR096W1','YDR158W1','YMR097C1','YDL066W1','YGL009C1']);
assert(!added.some(({e})=>unresolved.has(e.sourceGene)));
assert.equal(markers.filter(m=>m.addedIn==='v25').length,12);
for(const m of markers.filter(m=>m.addedIn==='v25')){
  assert.match(m.identityProvenance.sha256,/^[a-f0-9]{64}$/);
  assert.equal(m.expression.mean,null);assert.equal(m.expression.rank,null);
}
assert(!markers.some(m=>(m.referenceMeasurements||[]).some(r=>r.sourceId==='urbonaite2021_s2')));
assert.equal(sources.get('urbonaite2021_s2').importAudit.importedMeasurements,0);
assert.equal(manifest.sourcePanels.filter(p=>p.addedIn==='v25').length,11);
const metadata=markers.flatMap(m=>m.evidence||[]).filter(e=>e.metadataCompletion?.version==='v25');
assert.equal(metadata.length,5014);
assert.equal(metadata.filter(e=>e.sourceId==='gasch2017_s8'&&e.sourceConditionRole==='assay_context_for_reference_gene_set'&&e.metadataProvenance?.contextRoleLabel).length,859);
assert.equal(metadata.filter(e=>e.sourceId==='shabestary2024_s1'&&e.datasetAccession==='GSE125162').length,4155);
assert.equal(markers.flatMap(m=>m.evidence||[]).filter(e=>e.sourceId==='jariani2020_s1'&&e.annotationUse==='contextual_differential_candidate').length,1000);
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'dist/citation-data.js'),'utf8'),sandbox);
const citations=sandbox.window.YV_CITATION_DATA.records.map(r=>r.csl);
for(const doi of ['10.1371/journal.pbio.2004050','10.1038/s42003-021-02320-w']){
  const c=citations.find(r=>String(r.DOI||'').toLowerCase()===doi);
  assert(c&&c.author?.length&&c.issued&&c['container-title'],'Complete citation missing: '+doi);
}
console.log('PASS: 875 source-row relations, 12 SGD-mapped additions, 7 invalid IDs excluded, 11 author panels; unresolved abundance tables remain outside expression display.');
