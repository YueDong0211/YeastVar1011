'use strict';
(() => {
  const words = {
    library: ['方法索引', 'Method atlas', 'Atlas des méthodes', 'Atlas de métodos', 'Metodoen atlasa'],
    cards: ['卡片', 'Cards', 'Cartes', 'Tarjetas', 'Txartelak'],
    list: ['列表', 'List', 'Liste', 'Lista', 'Zerrenda'],
    layout: ['目录布局', 'Catalogue layout', 'Disposition du catalogue', 'Diseño del catálogo', 'Katalogoaren diseinua'],
    methods: ['方法', 'Methods', 'Méthodes', 'Métodos', 'Metodoak'],
    stages: ['分析环节', 'Analysis stages', 'Étapes d’analyse', 'Etapas de análisis', 'Analisi-urratsak'],
    metrics: ['参考指标', 'Reference metrics', 'Indicateurs de référence', 'Indicadores de referencia', 'Erreferentzia-adierazleak']
  };
  const A = () => window.YV_APP;
  const t = key => words[key]?.[['zh', 'en', 'fr', 'es', 'eu'].indexOf(A()?.prefs().language || 'zh')] || words[key]?.[1] || key;
  const e = value => A().esc(value);
  const family = tool => Object.entries(window.YV_PLAN_TOOLS?.groups || {}).find(([, ids]) => ids.includes(tool.steps[0]))?.[0] || 'prep';
  const familyIcon = tool => ({prep:'quality',annotation:'markers',noise:'chart',extensions:'ideas'}[family(tool)]);
  // A decorative instrument drawing, with no simulated observations or chart axes.
  function artwork() {
    return `<svg class="v7-orbit-art" viewBox="0 0 440 260" aria-hidden="true" focusable="false"><defs><radialGradient id="v7-orbit-halo"><stop stop-color="#71bfc8" stop-opacity=".2"/><stop offset="1" stop-color="#71bfc8" stop-opacity="0"/></radialGradient><linearGradient id="v7-orbit-stroke"><stop stop-color="#dfc398"/><stop offset=".5" stop-color="#9fcfd2"/><stop offset="1" stop-color="#dfc398" stop-opacity=".2"/></linearGradient></defs><circle cx="232" cy="128" r="125" fill="url(#v7-orbit-halo)"/><g fill="none" stroke="url(#v7-orbit-stroke)"><ellipse cx="232" cy="128" rx="164" ry="73" transform="rotate(-22 232 128)" opacity=".7"/><ellipse cx="232" cy="128" rx="137" ry="101" transform="rotate(28 232 128)" opacity=".32"/><circle cx="232" cy="128" r="90" stroke-dasharray="1 8" opacity=".8"/><circle cx="232" cy="128" r="68" opacity=".32"/><path d="M23 202h53l41-40M325 62l42-27h47M233 24V10m0 236v-14M129 128h-15m235 0h-15" opacity=".5"/></g><g fill="#c6e4dd"><circle cx="111" cy="174" r="4"/><circle cx="369" cy="79" r="3"/><circle cx="301" cy="191" r="3"/></g><g fill="#dfc398"><circle cx="165" cy="63" r="3"/><circle cx="297" cy="66" r="2"/></g><g transform="translate(207 102)" fill="none" stroke="#d7e4df" stroke-width="1.4"><path d="M7 0h36l7 7v43H0V7z" fill="#112534"/><path d="M7 0v12h36V0M10 23h30M10 31h21M10 39h26" opacity=".7"/><circle cx="42" cy="43" r="12" fill="#1d3541" stroke="#dfc398"/><path d="m37 43 3 3 7-8" stroke="#dfc398"/></g></svg>`;
  }
  function libraryHeader() {
    const a=A(), d=a.data(), pt=window.YV_PLAN_TOOLS;
    return `<header class="pt-header v7-library-cover"><div class="v7-library-copy"><span class="eyebrow"><i></i>${e(t('library'))}</span><h1>${e(pt.T('title'))}</h1><p>${e(pt.T('intro'))}</p><div class="v7-library-actions"><a class="btn v7-return" href="#workbench?stage=${pt.getState().group==='all'?'prep':pt.getState().group}">${a.icon('workflow')}${e(pt.T('return'))}${a.icon('arrow')}</a></div></div><div class="v7-library-art" aria-hidden="true">${artwork()}</div><div class="v7-library-index">${[[d.workflow.tools.length,'methods','tools?group=all'],[d.workflow.steps.length,'stages','workflow'],[d.workflow.metrics.length,'metrics','quality']].map(([value,key,route])=>`<a href="#${route}"><strong>${value}</strong><span>${e(t(key))}</span>${a.icon('arrow')}</a>`).join('')}</div></header>`;
  }
  function layoutControl(layout) {
    return `<div class="v7-layout-switch" role="group" aria-label="${e(t('layout'))}">${['cards','list'].map(view=>`<button type="button" data-pt-action="layout" data-value="${view}" aria-pressed="${layout===view}" title="${e(t(view))}">${A().icon(view==='cards'?'overview':'workflow')}<span>${e(t(view))}</span></button>`).join('')}</div>`;
  }
  function afterRender() {
    document.documentElement.dataset.workspaceRoute=A().route();
    const shortcuts=document.querySelector('.c4-assistance-shortcuts');
    const target=document.querySelector(A().route()==='tools'?'.v7-library-actions':A().route()==='workbench'?'.pw-hero-actions':'.v7-no-target');
    if(shortcuts&&target&&shortcuts.parentElement!==target)target.append(shortcuts);
  }
  window.YV_OBSERVATORY={t,artwork,libraryHeader,layoutControl,family,familyIcon,afterRender};
})();
