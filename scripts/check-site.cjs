const fs=require('fs'),{spawnSync}=require('node:child_process');
const files=fs.readdirSync('dist').filter(x=>x.endsWith('.js'));
for(const file of files){const result=spawnSync(process.execPath,['--check','--input-type=module'],{input:fs.readFileSync('dist/'+file,'utf8'),encoding:'utf8'});if(result.status!==0)throw Error(file+': '+result.stderr);}
const workflow=JSON.parse(fs.readFileSync('dist/data/workflow.json'));
const categories=JSON.parse(fs.readFileSync('dist/data/research-categories.json'));
const tools=new Set(workflow.tools.map(x=>x.id)),inputs=new Set(categories.dataRequirements.map(x=>x.id));
for(const tool of workflow.tools)for(const key of [...tool.applicability.requiredData,...tool.applicability.optionalData])if(!inputs.has(key))throw Error(tool.id+': missing input '+key);
for(const category of categories.categories)for(const id of category.toolIds)if(!tools.has(id))throw Error(category.id+': missing tool '+id);
const papers=JSON.parse(fs.readFileSync('dist/data/literature.json')).papers;
for(const paper of papers)for(const key of ['authors','topics','limitations','sourceUrls'])if(!Array.isArray(paper[key]))throw Error(paper.id+': missing paper array '+key);
const markerData=JSON.parse(fs.readFileSync('dist/data/markers.json')),sourceIds=new Set(markerData.sources.map(s=>s.id));
if(markerData.format==='yv-marker-shards-v1'){
  markerData.markers=markerData.shards.flatMap(file=>JSON.parse(fs.readFileSync('dist/data/'+file)));
  if(markerData.markers.length!==markerData.markerCount)throw Error('Incomplete marker shards');
}
if(new Set(markerData.markers.map(m=>m.id)).size!==markerData.markers.length)throw Error('Duplicate marker identities');
for(const marker of markerData.markers){
  for(const evidence of marker.evidence)if(!sourceIds.has(evidence.sourceId))throw Error(marker.id+': missing evidence source '+evidence.sourceId);
  for(const row of marker.referenceMeasurements||[])if(!sourceIds.has(row.sourceId))throw Error(marker.id+': missing quantitative source '+row.sourceId);
}
console.log('Syntax OK:',files.length,'scripts. Catalogue references OK:',tools.size,'tools,',inputs.size,'input types.');
