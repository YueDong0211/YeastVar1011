'use strict';
// Read-only schema, input-contract and rendered-text checks. No browser or biological execution.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const catalog = {
  workflow: json('dist/data/workflow.json'),
  projects: json('dist/data/projects.json'),
  categories: json('dist/data/research-categories.json'),
  literature: json('dist/data/literature.json')
};
const basics = catalog.workflow.tools.find(x => x.id === 'basics');
const cinemaot = catalog.workflow.tools.find(x => x.id === 'cinemaot');
const perturbation = catalog.projects.projects.find(x => x.id === 'perturbation_transport');
const meanNoise = catalog.projects.projects.find(x => x.id === 'mean_noise');
const languages = ['zh', 'en', 'fr', 'es', 'eu'];
const marker = '// v25c: documented BASiCS branches and perturbation estimands.';
const localeSource = read('dist/v25-research-locales.js');
assert.equal(localeSource.split(marker).length, 2, 'Keep one v25c translation block');
const localeContext = {window: {}};
vm.runInNewContext(localeSource.slice(localeSource.indexOf(marker)), localeContext);
const boundaryText = localeContext.window.YV_TEXT;
let checks = 0;
const check = (name, test) => { test(); checks++; console.log(`PASS ${name}`); };

check('BASiCS records alternative technical designs with declaration-only completeness checks', () => {
  assert.deepEqual(basics.applicability.requiredData, ['count_matrix', 'sample_metadata']);
  assert.equal(basics.conditionalInputRequirements.length, 2);
  const branches = new Map(basics.conditionalInputRequirements.map(x => [x.branch, x]));
  assert.equal(branches.get('with_spikes').condition, 'WithSpikes=TRUE');
  assert.equal(branches.get('without_spikes').condition, 'WithSpikes=FALSE');
  const known = new Set(catalog.categories.dataRequirements.map(x => x.id));
  for (const row of branches.values()) {
    assert.equal(row.enforcement, 'declaration_completeness_only');
    assert.equal(row.id, row.branch);
    assert.equal(row.requiredDataMode, 'extend');
    assert.ok(row.evidenceRequirements.length >= 3);
    assert.ok(row.requiredData.every(id => known.has(id)));
    assert.deepEqual(row.requiredData, ['count_matrix', 'sample_metadata']);
  }
  assert.match(basics.applicability.reason, /字段是否完整/);
  assert.match(basics.applicability.reason, /人工核对/);
  assert.match(basics.applicability.reason, /不代表模型已验证或执行/);
});

check('No-spike replication and spike amount requirements reach visible method fields', () => {
  const noSpikes = basics.conditionalInputRequirements.find(x => x.branch === 'without_spikes').contract;
  assert.match(noSpikes, /多个真实技术重复/);
  assert.match(noSpikes, /单一batch不满足/);
  assert.ok(basics.input.includes(noSpikes));
  assert.ok(basics.parameters.some(x => x.name === 'BatchInfo' && x.selection === noSpikes));
  assert.ok(basics.limitations.some(x => /菌株、处理或随机拆分/.test(x)));
  assert.ok(basics.limitations.some(x => /独立培养重复/.test(x)));
  const spikes = basics.conditionalInputRequirements.find(x => x.branch === 'with_spikes').contract;
  assert.match(spikes, /每反应输入分子数/);
  assert.ok(basics.input.includes(spikes));
  assert.ok(basics.parameters.some(x => x.name === 'SpikeInfo' && x.selection === spikes));
  assert.ok(meanNoise.failureChecks.includes(noSpikes));
});

check('BASiCS recipe uses the verified argument names and preserves distinct effect scales', () => {
  assert.match(basics.entrypoint, /BASiCS::BASiCS_MCMC/);
  assert.match(basics.entrypoint, /BASiCS::BASiCS_TestDE/);
  for (const arg of ['Offset', 'EpsilonM', 'EpsilonD', 'EpsilonR', 'EFDR_M', 'EFDR_D', 'EFDR_R', 'MinESS']) {
    assert.ok(basics.entrypoint.includes(`${arg}=`), `Missing ${arg}`);
  }
  assert.ok(!basics.entrypoint.includes('OffSet'));
  assert.match(basics.parameters.find(x => x.name.startsWith('EpsilonM')).selection, /log2.*EpsilonR.*残差差异尺度/);
  assert.equal(basics.executionStatus, 'recipe_only');
  assert.equal(basics.versionEvidence.biologicalExecution, false);
  assert.equal(basics.versionEvidence.runtimeInstalled, false);
  assert.ok(basics.sourceUrls.includes(basics.versionEvidence.source));
  for (const doi of ['10.1016/j.cels.2018.06.011', '10.1016/j.cels.2019.08.003']) {
    assert.ok(basics.sourceUrls.includes(`https://doi.org/${doi}`));
  }
});

check('Existing source identities and method lists remain intact', () => {
  const paperIds = new Set(catalog.literature.papers.map(x => x.id));
  for (const record of [basics, meanNoise, perturbation]) {
    for (const id of record.paperIds) assert.ok(paperIds.has(id), `Unknown paper ${id}`);
    assert.equal(new Set(record.sourceUrls).size, record.sourceUrls.length);
  }
  for (const tool of [basics, cinemaot]) {
    assert.equal(new Set(tool.sourceLinks.map(x => x.url)).size, tool.sourceLinks.length);
  }
  assert.deepEqual(perturbation.toolIds, ['pertpy', 'cpa', 'gears', 'cellot', 'cinemaot', 'systema']);
  assert.deepEqual(perturbation.inputs, ['count_matrix', 'sample_metadata', 'perturbation_data']);
  assert.deepEqual(perturbation.metricIds, ['perturbation_distribution_distance', 'perturbation_generalization', 'counterfactual_support', 'perturbation_centroid_accuracy']);
});

check('Perturbation text distinguishes all four estimands and post-treatment conditioning', () => {
  assert.equal(perturbation.analysisPrinciples.length, 4);
  for (const label of ['均值效应：', '边际方差效应：', '状态比例效应：', '个体效应异质性：']) {
    assert.ok(perturbation.analysisPrinciples.some(x => x.startsWith(label)), label);
  }
  assert.match(perturbation.interpretationBoundary, /不识别个体效应方差/);
  assert.ok(perturbation.failureChecks.some(x => /中介或选择变量/.test(x)));
  assert.ok(perturbation.failureChecks.some(x => /天然菌株差异属于观察性/.test(x)));
  assert.ok(cinemaot.limitations.some(x => /潜在结果未同时观测/.test(x)));
  assert.ok(perturbation.sourceUrls.includes('https://doi.org/10.1080/01621459.2017.1407322'));
});

check('Every new visible Chinese string has English, French, Spanish and Basque text', () => {
  assert.ok(Object.keys(boundaryText).length > 0);
  for (const [source, translations] of Object.entries(boundaryText)) {
    assert.match(source, /[\u3400-\u9fff]/);
    for (const language of languages.filter(x => x !== 'zh')) {
      assert.equal(typeof translations[language], 'string', `${language}: ${source}`);
      assert.ok(translations[language].trim(), `${language}: ${source}`);
      assert.ok(!/[\u3400-\u9fff]/.test(translations[language]), `${language} retained Chinese: ${source}`);
    }
  }
  for (const value of [basics.task, ...basics.input, ...basics.output,
    ...basics.parameters.filter(x => x.name !== 'version / commit').flatMap(x => [x.meaning, x.selection]),
    ...basics.limitations.filter(x => x !== '调用配方；尚未在项目数据上执行。'),
    perturbation.method, ...perturbation.analysisPrinciples, ...perturbation.failureChecks,
    ...perturbation.workflow.flatMap(x => [x.action, x.deliverable]),
    ...perturbation.hypotheses, perturbation.interpretationBoundary]) {
    assert.ok(boundaryText[value], `Missing translation binding: ${value}`);
  }
});

let language = 'zh';
const selectedPlan = {
  projects: [], tools: ['basics', 'cinemaot'], stages: ['noise', 'causal'],
  metrics: [], parameters: {}, availableData: ['count_matrix', 'sample_metadata'],
  inputRoute: 'count_matrix', resultSpecificationIds: [], edges: []
};
const esc = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const renderContext = {URL, console, window: {addEventListener() {}}, document: {addEventListener() {}}};
vm.createContext(renderContext);
vm.runInContext(localeSource, renderContext);
const tx = value => language === 'zh' ? value : renderContext.window.YV_TEXT[value]?.[language] || value;
const field = (type, object, key) => language === 'zh' ? object[key] || ''
  : renderContext.window.YV_CONTENT[type]?.[object.id]?.[language]?.[key] || tx(object[key] || object[key + 'En'] || '');
const app = {
  data: () => catalog, prefs: () => ({language}), esc, tx, field,
  maps: () => ({tool: new Map(catalog.workflow.tools.map(x => [x.id, x])),
    step: new Map(catalog.workflow.steps.map(x => [x.id, x])),
    metric: new Map(catalog.workflow.metrics.map(x => [x.id, x]))}),
  list: values => `<ul>${values.map(value => `<li>${esc(tx(value))}</li>`).join('')}</ul>`,
  t: key => key, icon: () => '', link: (url, label) => `<a href="${esc(url)}">${esc(label)}</a>`
};
Object.assign(renderContext.window, {
  YV_APP: app, YV_BUILD_TEXT: key => key, YV_V3_T: key => key,
  YV_BUILDER: {getPlan: () => selectedPlan, toolButton: () => ''}
});
for (const file of ['dist/plan-inputs.js', 'dist/methods.js', 'dist/experience.js']) {
  vm.runInContext(read(file), renderContext, {filename: file});
}

check('Resolver requires a branch declaration without claiming biological verification', () => {
  const result = renderContext.window.YV_INPUTS({...selectedPlan, tools: ['basics']}, catalog);
  assert.ok(result.inputs.every(x => x.status === 'declared'));
  assert.equal(result.inputs.length, 2);
  assert.ok(result.contractIssues.some(x => x.kind === 'branch-pending' && x.toolId === 'basics'));
  assert.equal(result.methodDecisions.executionStatus, 'planning_only');
  assert.ok(basics.limitations.includes(basics.applicability.reason));
});

check('Actual method renderer displays both BASiCS branches and manual review in all five languages', () => {
  for (language of languages) {
    const html = renderContext.window.YV_METHODS.detail(basics);
    for (const value of [...basics.input, basics.applicability.reason, basics.parameters.find(x => x.name === 'Offset').selection]) {
      assert.ok(html.includes(esc(tx(value))), `${language} omitted BASiCS text: ${value}`);
    }
    assert.ok(html.includes('Offset=apply_global_offset'));
    assert.ok(!html.includes('OffSet='));
    assert.ok(html.includes(esc(field('tools', basics, 'task'))));
  }
});

check('Actual project and CINEMA-OT renderers display the estimand boundaries in all five languages', () => {
  for (language of languages) {
    const html = renderContext.window.YV_V3.projectDetail(perturbation);
    for (const value of [perturbation.method, ...perturbation.analysisPrinciples,
      ...perturbation.failureChecks, perturbation.interpretationBoundary]) {
      assert.ok(html.includes(esc(tx(value))), `${language} omitted perturbation text: ${value}`);
    }
    const toolHtml = renderContext.window.YV_METHODS.detail(cinemaot);
    for (const value of cinemaot.limitations.filter(x => boundaryText[x])) {
      assert.ok(toolHtml.includes(esc(tx(value))), `${language} omitted CINEMA-OT boundary`);
    }
  }
});

console.log(JSON.stringify({status: 'passed', checks, localizedStrings: Object.keys(boundaryText).length,
  languages, productionFilesModifiedByTest: false, biologicalExecution: false}));
