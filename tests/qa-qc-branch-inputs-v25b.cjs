'use strict';
// Pure catalogue/input-resolver regression. No browser, network, writes, or user storage.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const catalog = {
  workflow: read('dist/data/workflow.json'),
  categories: read('dist/data/research-categories.json'),
  projects: read('dist/data/projects.json')
};
const context = {window: {}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'dist/plan-inputs.js'), 'utf8'), context);
const review = context.window.YV_INPUTS;
const project = catalog.projects.projects.find(row => row.id === 'qc_multiverse');
assert.ok(project, 'The QC research route must exist');
const plan = overrides => ({
  projects: [project.id], stages: [...project.stepIds], tools: [], metrics: [],
  resultSpecificationIds: [], availableData: ['count_matrix', 'sample_metadata'],
  inputRoute: 'count_matrix', edges: [], ...overrides
});
let checks = 0;
function check(name, run) { run(); checks++; console.log(`PASS ${name}`); }

check('QC route remains feasible with matrix and metadata after droplet tools are deselected', () => {
  const result = review(plan(), catalog);
  assert.deepEqual([...project.inputs], ['count_matrix', 'sample_metadata']);
  assert.ok(project.optionalInputs.includes('raw_droplet_matrix'));
  assert.ok(!result.inputs.some(row => row.id === 'raw_droplet_matrix'));
  assert.ok(result.inputs.length > 0);
  assert.ok(result.inputs.every(row => row.status === 'declared'));
  for (const id of project.inputs) {
    assert.ok(result.inputs.find(row => row.id === id).consumers.includes(project.id));
  }
});

for (const toolId of ['dropletutils', 'soupx']) {
  check(`${toolId} retains its own hard raw-droplet requirement`, () => {
    const tool = catalog.workflow.tools.find(row => row.id === toolId);
    assert.ok(tool.applicability.requiredData.includes('raw_droplet_matrix'));
    const result = review(plan({tools: [toolId]}), catalog);
    const raw = result.inputs.find(row => row.id === 'raw_droplet_matrix');
    assert.ok(raw, 'The tool cannot silently substitute the filtered matrix');
    assert.notEqual(raw.status, 'declared');
    assert.ok(raw.consumers.includes(toolId));
    assert.ok(!raw.consumers.includes(project.id), 'The optional route input became globally mandatory');
  });
}

check('Explicit raw-droplet input satisfies both selected droplet tools without claiming a generated output', () => {
  const result = review(plan({tools: ['dropletutils', 'soupx'],
    availableData: ['count_matrix', 'sample_metadata', 'raw_droplet_matrix']}), catalog);
  const raw = result.inputs.find(row => row.id === 'raw_droplet_matrix');
  assert.equal(raw.status, 'declared');
  assert.deepEqual([...raw.consumers].sort(), ['dropletutils', 'soupx']);
  assert.ok(result.inputs.every(row => row.status === 'declared'));
});

check('Reselecting and deselecting droplet tools updates only the input they consume', () => {
  const selection = plan({tools: ['dropletutils', 'soupx']});
  assert.ok(review(selection, catalog).inputs.some(row => row.id === 'raw_droplet_matrix'));
  selection.tools = [];
  assert.ok(!review(selection, catalog).inputs.some(row => row.id === 'raw_droplet_matrix'));
  assert.deepEqual([...review(selection, catalog).inputs].map(row => row.id).sort(),
    ['count_matrix', 'sample_metadata']);
});

check('Regression fixture reproduces the original route-level requirement', () => {
  const oldCatalogue = structuredClone(catalog);
  oldCatalogue.projects.projects.find(row => row.id === project.id).inputs.push('raw_droplet_matrix');
  const raw = review(plan(), oldCatalogue).inputs.find(row => row.id === 'raw_droplet_matrix');
  assert.ok(raw.consumers.includes(project.id));
  assert.notEqual(raw.status, 'declared');
});

console.log(`PASS ${checks} QC branch-input regression checks`);
