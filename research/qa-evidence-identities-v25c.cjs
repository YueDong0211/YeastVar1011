'use strict';
// Distributed-data invariants: one evidence ID identifies one source assertion of one gene.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const header=read('dist/data/markers.json'),markers=header.shards.flatMap(p=>read('dist/data/'+p));
const canonical=v=>Array.isArray(v)?v.map(canonical):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])])):v;
const lookup=new Map(),sources=new Set(header.sources.map(s=>s.id));let occurrences=0;
for(const m of markers)for(const e of m.evidence||[]){
  occurrences++;
  assert.equal(typeof e.evidenceId,'string',m.id+' missing evidence identity');
  assert(e.evidenceId.length>10,'Identity must be a persisted source assertion, not a row number');
  assert(sources.has(e.sourceId),m.id+' missing source: '+e.sourceId);
  const signature=JSON.stringify(canonical({gene:m.id,evidence:e})),old=lookup.get(e.evidenceId);
  if(old){assert.equal(old.signature,signature,'An ID was reused for a different gene, condition, or source claim');old.count++;}
  else lookup.set(e.evidenceId,{signature,count:1});
}
assert.equal(header.evidenceIdentity.version,'source-assertion-v1');
assert.equal(header.evidenceIdentity.totalOccurrences,occurrences);
assert.equal(header.evidenceIdentity.uniqueAssertions,lookup.size);
assert.equal(header.evidenceIdentity.duplicateOccurrences,occurrences-lookup.size);
const duplicates=Object.fromEntries([...lookup].filter(([,v])=>v.count>1).map(([id,v])=>[id,v.count]));
assert.deepEqual(header.evidenceIdentity.duplicateAssertions,duplicates);
console.log(`PASS: ${occurrences} evidence occurrences, ${lookup.size} distinct assertions; every repeated ID has identical content and gene ownership.`);
