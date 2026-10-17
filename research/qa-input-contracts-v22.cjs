'use strict';
// Read-only catalogue regression checks. This script creates no output files.
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
const getProject = id => {
  const project = catalog.projects.projects.find(p => p.id === id);
  assert.ok(project, `Missing project ${id}`);
  return project;
};
const planFor = (project, overrides = {}) => ({
  projects: [project.id], stages: [...project.stepIds], tools: [...project.toolIds],
  metrics: [...project.metricIds], resultSpecificationIds: [],
  availableData: ['raw_fastq'], inputRoute: 'raw_fastq', edges: [], ...overrides
});
let checks = 0;
function check(name, run) {
  run();
  checks += 1;
  console.log(`PASS ${name}`);
}

check('Every v22 project retains required inputs after removing tools and metrics', () => {
  const projects = catalog.projects.projects.filter(p => p.addedIn === 'v22');
  assert.equal(projects.length, 8);
  for (const project of projects) {
    const result = review(planFor(project, {tools: [], metrics: []}), catalog);
    for (const id of project.inputs) {
      const row = result.inputs.find(r => r.id === id);
      assert.ok(row, `${project.id}: missing input ${id}`);
      assert.ok(row.consumers.includes(project.id), `${project.id}: lost input provenance ${id}`);
      assert.notEqual(row.status, 'declared', `${project.id}: undeclared input reported available`);
    }
  }
});

check('Optional project inputs do not become required inputs', () => {
  // Isolated fixture exercises an optional-only known input without changing production data.
  const fixture = structuredClone(catalog);
  const project = fixture.projects.projects.find(p => p.id === 'temporal_mechanistic_grn');
  assert.ok(!project.inputs.includes('genotypes'));
  assert.ok(fixture.categories.dataRequirements.some(r => r.id === 'genotypes'));
  project.optionalInputs = [...new Set([...(project.optionalInputs || []), 'genotypes'])];
  const result = review(planFor(project, {tools: [], metrics: []}), fixture);
  assert.ok(!result.inputs.some(r => r.id === 'genotypes'), 'Optional genotypes became mandatory');
});

check('Ty quantification retains IRescue through the matrix entry route', () => {
  const project = getProject('ty_repeat_variability');
  const plan = planFor(project, {
    availableData: [...new Set(['count_matrix', ...project.inputs])], inputRoute: 'count_matrix'
  });
  review.applyRoute(plan, 'count_matrix', catalog);
  assert.ok(plan.stages.includes('transcripts'), 'Independent repeat assay stage was removed');
  assert.ok(plan.tools.includes('irescue'), 'IRescue was silently removed');
  assert.ok(!plan.stages.includes('matrix'), 'Existing gene matrix was scheduled for reconstruction');
  for (const id of ['tagged_bam', 'repeat_annotation']) {
    assert.equal(review(plan, catalog).inputs.find(r => r.id === id)?.status, 'declared');
  }
});

check('Repeat annotations and kinetic priors have actionable missing-input statuses', () => {
  for (const [projectId, input, status] of [
    ['ty_repeat_variability', 'repeat_annotation', 'prepare-resource'],
    ['temporal_mechanistic_grn', 'kinetic_rate_prior', 'external-input']
  ]) {
    const project = getProject(projectId);
    const plan = planFor(project, {tools: [], metrics: []});
    assert.equal(review(plan, catalog).inputs.find(r => r.id === input)?.status, status);
    plan.availableData.push(input);
    assert.equal(review(plan, catalog).inputs.find(r => r.id === input)?.status, 'declared');
  }
});

console.log(JSON.stringify({status: 'passed', checks, productionFilesModified: false}));
