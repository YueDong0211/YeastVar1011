/* Export an allowlisted source snapshot, without workstation history or caches. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const releaseRoot=path.join(root,'releases');
const target=path.join(releaseRoot,'public-source-'+new Date().toISOString().replace(/[:.]/g,'-'));
const top=['dist','portable','scripts','.github','docs','README.md','LICENSE','CONTRIBUTING.md','THIRD_PARTY_NOTICES.md','DATA_SOURCES.md','CITATION.cff','START.cmd','STOP.cmd','CREATE-SHORTCUT.cmd','package.json','package-lock.json'];
const checks=['research/check_site.cjs','research/qa-dev-server.cjs','research/package-portable.ps1'];
if(!target.startsWith(releaseRoot+path.sep)||fs.existsSync(target))throw Error('Release directory must be a new child of releases/');
const files=[];
function collect(rel){const source=path.join(root,rel),stat=fs.lstatSync(source);if(stat.isSymbolicLink())throw Error('Refusing symlink: '+rel);if(stat.isDirectory()){for(const n of fs.readdirSync(source).sort())collect(path.join(rel,n));}else if(stat.isFile())files.push(rel);}
for(const rel of [...top,...checks])collect(rel);
const sensitive=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/\b(?:ghp|gho|ghu|ghs|github_pat)_[A-Za-z0-9_]{20,}/,/\bsk-(?:proj-)?[A-Za-z0-9_-]{30,}/,/[A-Z]:[\\/]+Users[\\/]+[^\s"'<>]+/i,/[A-Z]:[\\/]+1 study[\\/]+/i];
const textExtensions=new Set(['.js','.cjs','.mjs','.json','.md','.txt','.html','.css','.ps1','.cmd','.cs','.yml','.yaml','.cff']);
for(const rel of files){if(/(?:^|[\\/])(?:\.git|\.openai|node_modules|cache|maintenance|\.env)(?:[\\/]|$)/i.test(rel))throw Error('Private path in release: '+rel);if(textExtensions.has(path.extname(rel))){const txt=fs.readFileSync(path.join(root,rel),'utf8');if(sensitive.some(re=>re.test(txt)))throw Error('Review a local path or credential pattern in '+rel);}}
fs.mkdirSync(target,{recursive:true});
const manifest=[];
for(const rel of files){const dest=path.join(target,rel);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(path.join(root,rel),dest);}
// The public package advertises only checks included in this snapshot.
const packageFile=path.join(target,'package.json'),pkg=JSON.parse(fs.readFileSync(packageFile,'utf8'));
pkg.scripts={start:'node scripts/dev-server.cjs',check:'node research/check_site.cjs','test:server':'node research/qa-dev-server.cjs','test:public':'node scripts/smoke-public.cjs','release:source':'node scripts/prepare-public.cjs'};
fs.writeFileSync(packageFile,JSON.stringify(pkg,null,2)+'\n');
fs.writeFileSync(path.join(target,'.gitignore'),'node_modules/\nreleases/\nresearch/cache/\nplaywright-report/\ntest-results/\n.env\n.env.*\n!.env.example\n*.local.json\n.DS_Store\n');
for(const rel of [...files,'.gitignore']){const data=fs.readFileSync(path.join(target,rel));manifest.push({path:rel.split(path.sep).join('/'),bytes:data.length,sha256:crypto.createHash('sha256').update(data).digest('hex')});}
fs.writeFileSync(path.join(target,'source-manifest.json'),JSON.stringify({version:pkg.version,files:manifest},null,2)+'\n');
console.log(JSON.stringify({path:target,files:manifest.length,bytes:manifest.reduce((n,f)=>n+f.bytes,0)},null,2));
