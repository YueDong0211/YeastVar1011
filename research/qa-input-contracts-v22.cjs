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

const simplePlan = overrides => ({
  projects: [], stages: [], tools: [], metrics: [], resultSpecificationIds: [],
  availableData: [], inputRoute: 'raw_fastq', edges: [], ...overrides
});
const plain = value => JSON.parse(JSON.stringify(value));

check('Matrix-only ambient auditing retains DecontX and removes tools requiring empty droplets', () => {
  const plan = simplePlan({inputRoute: 'count_matrix', availableData: ['count_matrix', 'sample_metadata'],
    stages: ['ambient', 'cellcalling', 'cellqc'], tools: ['decontx', 'soupx', 'cellbender', 'scanpy']});
  review.applyRoute(plan, 'count_matrix', catalog);
  assert.ok(plan.stages.includes('ambient'), 'Matrix-only ambient auditing disappeared');
  assert.ok(plan.tools.includes('decontx'), 'DecontX optional background was treated as mandatory');
  assert.ok(!plan.tools.includes('soupx'), 'SoupX retained without required raw droplets');
  assert.ok(!plan.tools.includes('cellbender'), 'CellBender retained without required raw droplets');
  assert.ok(!plan.stages.includes('cellcalling'), 'Cell calling retained without raw droplets');
  assert.deepEqual(plain(review.stageDependencies(plan, catalog, 'ambient')), []);
  assert.ok(!review(plan, catalog).inputs.some(row => row.id === 'raw_droplet_matrix'));
});

check('Matrix routes with raw droplets retain background methods and cell calling', () => {
  const plan = simplePlan({inputRoute: 'count_matrix', availableData: ['count_matrix', 'raw_droplet_matrix'],
    stages: ['ambient', 'cellcalling'], tools: ['decontx', 'soupx', 'cellbender']});
  review.applyRoute(plan, 'count_matrix', catalog);
  for (const id of ['decontx', 'soupx', 'cellbender']) assert.ok(plan.tools.includes(id), `${id} removed`);
  assert.ok(plan.stages.includes('cellcalling'));
});

check('Alternative matrix producers preserve STARsolo when alevin-fry RAD input is missing', () => {
  const plan = simplePlan({availableData: ['raw_fastq', 'library_structure', 'reference', 'sample_metadata'],
    stages: ['bam', 'matrix', 'cellqc'], tools: ['starsolo', 'alevinfry', 'scanpy']});
  const row = review(plan, catalog).inputs.find(row => row.id === 'count_matrix');
  assert.deepEqual(plain(row.producerTools), ['starsolo']);
  assert.deepEqual(plain(row.dependencies), ['raw_fastq', 'library_structure', 'reference']);
  assert.deepEqual(plain(row.blockedBy), []);
  assert.equal(row.producerAlternatives.length, 2);
  const alternate = row.producerAlternatives.find(branch => branch.producerTools.includes('alevinfry'));
  assert.deepEqual(plain(alternate.blockedBy), ['mapping_rad']);
  assert.equal(alternate.readiness, 'awaiting-inputs');
  assert.ok(!row.dependencies.includes('mapping_rad'), 'Alternative dependencies were incorrectly ANDed');
});

check('Alternative producers choose declared RAD input over unavailable FASTQ inputs', () => {
  const plan = simplePlan({availableData: ['mapping_rad', 'reference', 'sample_metadata'],
    stages: ['bam', 'matrix', 'cellqc'], tools: ['starsolo', 'alevinfry', 'scanpy']});
  const row = review(plan, catalog).inputs.find(row => row.id === 'count_matrix');
  assert.deepEqual(plain(row.producerTools), ['alevinfry']);
  assert.deepEqual(plain(row.dependencies), ['mapping_rad', 'reference']);
  assert.deepEqual(plain(row.blockedBy), []);
  assert.equal(row.producerAlternatives.length, 2);
  const alternate = row.producerAlternatives.find(branch => branch.producerTools.includes('starsolo'));
  assert.ok(alternate.blockedBy.includes('raw_fastq'));
  assert.ok(alternate.blockedBy.includes('library_structure'));
});

check('Conditional splicing alternatives prefer a usable BAM without merging FASTQ requirements', () => {
  const plan = simplePlan({availableData: ['tagged_bam', 'reference', 'sample_metadata'],
    stages: ['bam', 'matrix', 'dynamics'], tools: ['starsolo', 'velocyto', 'scvelo']});
  const row = review(plan, catalog).inputs.find(row => row.id === 'splicing_layers');
  assert.deepEqual(plain(row.producerTools), ['velocyto']);
  assert.deepEqual(plain(row.dependencies), ['tagged_bam', 'reference']);
  assert.deepEqual(plain(row.blockedBy), []);
  assert.equal(row.status, 'conditional-output');
  assert.equal(row.readiness, 'conditional');
  assert.equal(row.producerAlternatives.length, 2);
});

check('Transitive readiness follows a feasible upstream producer rather than registration order', () => {
  const plan = simplePlan({availableData: ['raw_fastq', 'library_structure', 'reference', 'sample_metadata'],
    stages: ['bam', 'matrix', 'annotation'], tools: ['starsolo', 'alevinfry', 'singler']});
  const fixture = structuredClone(catalog);
  fixture.workflow.tools.push({id: 'requires_state', steps: ['annotation'],
    applicability: {requiredData: ['cell_states']}});
  plan.tools.push('requires_state');
  const state = review(plan, fixture).inputs.find(row => row.id === 'cell_states');
  assert.deepEqual(plain(state.blockedBy), []);
  assert.equal(state.readiness, 'conditional');
  assert.ok(!state.blockedBy.includes('mapping_rad'));
});

check('Stage-wise post-processing consumes p-value statistics without requesting new molecular assays', () => {
  const project = getProject('noise_multiplicity_control');
  const plan = planFor(project, {availableData: ['gene_statistics', 'sample_metadata'], inputRoute: 'count_matrix'});
  const result = review(plan, catalog);
  assert.equal(result.inputs.find(row => row.id === 'gene_statistics')?.status, 'declared');
  for (const id of ['raw_fastq', 'tagged_bam', 'count_matrix', 'genotypes', 'kinship']) {
    assert.ok(!result.inputs.some(row => row.id === id), `Statistics post-processing added an unrelated assay: ${id}`);
  }
  assert.equal(result.inputs.find(row => row.id === 'truth_or_simulation')?.status, 'prepare-resource', 'Selected calibration metric lost its truth input');
  plan.metrics = ['noise_testing_family_registry'];
  assert.ok(!review(plan, catalog).inputs.some(row => row.id === 'truth_or_simulation'), 'Optional calibration became mandatory for bookkeeping alone');
});

check('Monod route inputs cover the default matrix tools and state-conditioned metrics', () => {
  for (const id of ['mechanistic_joint_rna_noise', 'rna_measurement_length_audit']) {
    const project = getProject(id);
    for (const input of ['count_matrix', 'splicing_layers', 'reference', 'sample_metadata', 'cell_states']) {
      assert.ok(project.inputs.includes(input), `${id}: default methods need ${input}`);
      assert.ok(!project.optionalInputs.includes(input), `${id}: required ${input} also marked optional`);
      assert.ok(project.requiredInputContracts.some(row => row.id === input), `${id}: missing ${input} contract`);
    }
    const result = review(planFor(project, {availableData: [...project.inputs], inputRoute: 'count_matrix'}), catalog);
    assert.ok(result.inputs.every(row => row.status === 'declared'), `${id}: declaring every required input still leaves a hidden method requirement`);
    const contract = project.requiredInputContracts.find(row => row.id === 'count_matrix').contract;
    assert.match(contract, /mature\/spliced S layer/);
    assert.match(contract, /Do not mechanically add S and U/);
  }
});

console.log(JSON.stringify({status: 'passed', checks, productionFilesModified: false}));
