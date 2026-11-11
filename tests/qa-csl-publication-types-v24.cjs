'use strict';
// Pure Node regression: no browser, output artifacts, network or source mutation.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = {window: {}, console};
vm.createContext(context);
for (const file of ['dist/vendor/citations/citeproc.js', 'dist/citation-data.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, {filename: file});
}
const data = context.window.YV_CITATION_DATA;
const records = data.records.filter(record => /^10\.1101\//i.test(record.csl?.DOI || ''));
const journals = {
  '10.1101/gr.209601.116': ['Genome Research', '27', '3', '491-499'],
  '10.1101/gr.271908.120': ['Genome Research', '31', '10', '1742-1752'],
  '10.1101/gr.279874.124': ['Genome Research', '35', '10', '2226-2239'],
  '10.1101/gad.1450606': ['Genes & Development', '20', '16', '2266-2278']
};
const byID = new Map(data.records.map(record => [record.id, record]));
const format = record => {
  const engine = new context.CSL.Engine({retrieveLocale: () => data.locale, retrieveItem: id => byID.get(id).csl}, data.style, 'en-US');
  engine.setOutputFormat('text');
  engine.updateItems([record.id]);
  return engine.makeBibliography()[1].join('').trim();
};
let checks = 0;
for (const [doi, fields] of Object.entries(journals)) {
  const record = records.find(row => row.csl.DOI === doi);
  assert.ok(record, `Missing journal record ${doi}`);
  const csl = record.csl;
  assert.equal(csl.type, 'article-journal', `${doi}: journal classified as non-journal`);
  assert.ok(!/preprint/i.test(csl.genre || ''), `${doi}: preprint genre retained`);
  assert.ok(!/(?:bio|med)rxiv/i.test(csl.publisher || ''), `${doi}: preprint server retained`);
  assert.deepEqual([csl['container-title'], csl.volume, csl.issue, csl.page], fields);
  const rendered = format(record);
  assert.doesNotMatch(rendered, /\[Preprint\]|bioRxiv|medRxiv|\bIn Genome Research\b/);
  assert.ok(rendered.includes('https://doi.org/' + doi), `${doi}: DOI lost`);
  if (doi === '10.1101/gr.209601.116') {
    assert.match(rendered, /^Smith, T\., Heger, A\., & Sudbery, I\. \(2017\)\./);
    assert.match(rendered, /Genome Research, 27\(3\), 491–499\./);
  }
  checks++;
  console.log('PASS journal format', doi);
}
const preprints = records.filter(record => !Object.hasOwn(journals, record.csl.DOI));
assert.ok(preprints.length > 0);
for (const record of preprints) {
  assert.equal(record.csl.type, 'article', `${record.csl.DOI}: retained preprint type changed`);
  assert.equal(record.csl.genre, 'Preprint', `${record.csl.DOI}: preprint genre lost`);
  assert.match(format(record), /\[Preprint\]/, `${record.csl.DOI}: preprint description lost`);
}
checks++;
console.log('PASS retained preprints', preprints.length);
assert.ok(records.find(record => record.csl.DOI === '10.1101/2025.01.18.25320755')?.csl.publisher === 'medRxiv');
checks++;
console.log('PASS medRxiv is preserved');
const library = JSON.parse(fs.readFileSync(path.join(root, 'dist/data/literature.json'), 'utf8'));
for (const paper of library.papers.filter(paper => Object.hasOwn(journals, paper.doi))) {
  assert.ok(!/preprint|预印本/i.test(paper.publicationType || ''), `${paper.id}: library journal became preprint`);
}
checks++;
const additions = library.papers.filter(paper => ['v24_monod_2025', 'v24_premrna_length_2023', 'v24_package_versioning_2026', 'v24_stager_2017'].includes(paper.id));
assert.equal(additions.length, 4);
for (const paper of additions) {
  const record = data.records.find(row => row.csl.DOI === paper.doi);
  assert.ok(record, `${paper.id}: missing offline CSL record`);
  assert.equal(record.csl.type, 'article-journal');
  assert.deepEqual(JSON.parse(JSON.stringify(record.csl.author)), paper.cslAuthors);
  assert.equal(record.csl.issued['date-parts'][0][0], paper.issueYear || paper.year);
  const rendered = format(record);
  assert.doesNotMatch(rendered, /\[Preprint\]|bioRxiv|medRxiv/);
  assert.ok(rendered.includes('https://doi.org/' + paper.doi));
  if (paper.id === 'v24_premrna_length_2023') {
    assert.match(rendered, /\(2023\)/);
    assert.equal(record.verification.onlineYear, 2022);
  }
  checks++;
  console.log('PASS v24 verified citation', paper.doi);
}
assert.equal(data.toolReferences.monod.length, 2);
assert.equal(data.toolReferences.stager.length, 1);
assert.ok(data.toolReferences.stager.every(id => byID.get(id)?.csl.DOI === '10.1186/s13059-017-1277-0'));
checks++;
console.log(JSON.stringify({status: 'passed', checkedPrefixRecords: records.length, correctedJournalRecords: Object.keys(journals).length, retainedPreprints: preprints.length, newVerifiedCitations: additions.length, checks}));
