'use strict';
(() => {
  const LANGS = ['zh','en','fr','es','eu'];
  const TEXT = {
    title:['研究星图','Research galaxy','Galaxie de recherche','Galaxia de investigación','Ikerketa-galaxia'],
    subtitle:['从研究主题逐层展开：环节 → 指标 → 用途、工具与参数 → 加入方案。','Explore topics → stages → metrics → purposes, tools and parameters → your plan.','Explorez les thèmes → étapes → métriques → usages, outils et paramètres → votre plan.','Explora temas → etapas → métricas → usos, herramientas y parámetros → tu plan.','Arakatu gaiak → urratsak → metrikak → erabilerak, tresnak eta parametroak → zure plana.'],
    themes:['研究主题','Research topics','Thèmes de recherche','Temas de investigación','Ikerketa-gaiak'],
    back:['返回上一层','Back one level','Niveau précédent','Volver un nivel','Aurreko mailara'],
    reset:['全部主题','All topics','Tous les thèmes','Todos los temas','Gai guztiak'],
    zoomIn:['放大星图','Zoom in','Agrandir','Acercar','Handitu'],
    zoomOut:['缩小星图','Zoom out','Réduire','Alejar','Txikitu'],
    fit:['适应视图','Fit view','Ajuster la vue','Ajustar vista','Egokitu ikuspegia'],
    pan:['拖动空白平移 · 滚轮缩放 · 点击节点展开','Drag space to pan · scroll to zoom · select a node','Glisser le fond · défiler pour zoomer · choisir un nœud','Arrastra el fondo · rueda para ampliar · elige un nodo','Arrastatu hondoa · gurpila zoomerako · hautatu nodoa'],
    model:['拖动细胞旋转 · 滚轮缩放细胞','Drag cell to rotate · scroll to zoom cell','Glisser la cellule pour tourner · défiler pour zoomer','Arrastra la célula para girar · rueda para ampliarla','Arrastatu zelula biratzeko · gurpila zoomerako'],
    schematic:['细胞形态为示意，不是实测数据','Schematic morphology, not measured data','Morphologie schématique, non mesurée','Morfología esquemática, no medida','Morfologia eskematikoa, ez neurtua'],
    phase:['形态示意阶段','Illustrated phase','Phase illustrée','Fase ilustrada','Irudikatutako fasea'],
    plan:['打开方案与导出','Open plan & export','Ouvrir et exporter le plan','Abrir y exportar plan','Ireki eta esportatu plana'],
    selected:['方案已选指标','Metrics in your plan','Métriques du plan','Métricas del plan','Planeko metrikak'],
    search:['搜索全部指标、用途或工具','Search metrics, purposes or tools','Chercher métriques, usages ou outils','Buscar métricas, usos o herramientas','Bilatu metrikak, erabilerak edo tresnak'],
    results:['指标搜索结果','Metric search results','Résultats des métriques','Resultados de métricas','Metriken bilaketa-emaitzak'],
    clear:['清除搜索','Clear search','Effacer la recherche','Borrar búsqueda','Garbitu bilaketa'],
    previous:['上一组','Previous group','Groupe précédent','Grupo anterior','Aurreko taldea'],
    next:['下一组','Next group','Groupe suivant','Grupo siguiente','Hurrengo taldea'],
    empty:['没有匹配指标，请尝试基因组、UMI、BAM或RNA动态等关键词。','No matching metric. Try genome, UMI, BAM or RNA dynamics.','Aucune métrique. Essayez génome, UMI, BAM ou dynamique ARN.','Sin coincidencias. Prueba genoma, UMI, BAM o dinámica de ARN.','Ez dago bat datorren metrikarik. Saiatu genoma, UMI, BAM edo RNA dinamika.'],
    start:['点击一个主题，逐层构建你的研究路径。','Select a topic to build your research path.','Choisissez un thème pour construire votre parcours.','Elige un tema para construir tu ruta de investigación.','Hautatu gai bat zure ikerketa-bidea eraikitzeko.'],
    startBody:['中央酵母可以拖动旋转。外围节点固定在各自轨道，点击后展开下一层。你勾选的指标和工具会保存到同一份方案。','Rotate the central yeast. Select a stable orbit node to open the next level. Chosen metrics and tools save to the same plan.','Faites tourner la levure centrale. Choisissez un nœud pour ouvrir le niveau suivant. Métriques et outils sont enregistrés dans le même plan.','Gira la levadura central. Elige un nodo para abrir el siguiente nivel. Las métricas y herramientas se guardan en el mismo plan.','Biratu erdiko legamia. Hautatu orbitako nodo bat hurrengo maila irekitzeko. Metrikak eta tresnak plan berean gordetzen dira.'],
    include:['将此指标加入方案','Include this metric','Inclure cette métrique','Incluir esta métrica','Sartu metrika hau'],
    includeTool:['将工具加入方案','Include this tool','Inclure cet outil','Incluir esta herramienta','Sartu tresna hau'],
    included:['已加入','Included','Inclus','Incluido','Sartuta'],
    exploreStep:['选择指标查看细节','Select a metric for details','Choisir une métrique pour les détails','Elige una métrica para ver detalles','Hautatu metrika xehetasunetarako'],
    openMethod:['工具详情与来源','Method details & sources','Détails et sources','Detalles y fuentes','Xehetasunak eta iturriak'],
    manual:['官方文档','Official documentation','Documentation officielle','Documentación oficial','Dokumentazio ofiziala'],
    parameters:['参数说明与方案决策','Parameters & plan decisions','Paramètres et décisions','Parámetros y decisiones','Parametroak eta planeko erabakiak'],
    parameterHint:['填写本研究选择；未填参数保留为待确认，不自动套用阈值。','Record study-specific choices; blank parameters remain unresolved.','Notez les choix de l’étude ; les paramètres vides restent à confirmer.','Anota decisiones del estudio; los parámetros vacíos quedan pendientes.','Idatzi ikerketako aukerak; hutsik dauden parametroak zehazteke geratzen dira.'],
    decision:['我的参数选择／依据','My value or rationale','Ma valeur ou justification','Mi valor o justificación','Nire balioa edo arrazoia'],
    pending:['待确认','To be decided','À décider','Por decidir','Zehazteke'],
    stageLink:['打开完整环节','Open full stage','Ouvrir l’étape complète','Abrir etapa completa','Ireki urrats osoa'],
    dataScope:['这里展示的是指标库与方法定义，实测结果需要导入真实数据后计算。','This view shows metric definitions and methods. Measured results require real data.','Cette vue présente définitions et méthodes. Les résultats mesurés nécessitent des données réelles.','Aquí se muestran definiciones y métodos. Los resultados medidos requieren datos reales.','Ikuspegi honek definizioak eta metodoak erakusten ditu. Emaitza neurtuek benetako datuak behar dituzte.'],
    count:['条目录记录','catalogue entries','entrées du catalogue','registros del catálogo','katalogoko erregistro'],
    depth:['当前层级','Current level','Niveau actuel','Nivel actual','Uneko maila'],
    toolsPurpose:['用于此指标的方法','Methods for this metric','Méthodes de cette métrique','Métodos para esta métrica','Metrika honetarako metodoak'],
    selectedOnly:['只看方案已选','Only selected','Sélection uniquement','Solo seleccionados','Hautatuak bakarrik'],
    pause:['暂停细胞自转','Pause cell rotation','Arrêter la rotation','Pausar rotación','Gelditu zelularen biraketa'],
    resume:['继续细胞自转','Resume cell rotation','Reprendre la rotation','Reanudar rotación','Berrekin zelularen biraketari'],
    node:['展开节点','Expand node','Développer le nœud','Abrir nodo','Zabaldu nodoa'],
    close:['收起指标详情','Close metric details','Fermer les détails','Cerrar detalles','Itxi xehetasunak']
    ,fileFallback:['2D示意 · 使用START可开启3D','2D view · use START for 3D','Vue 2D · utilisez START pour la 3D','Vista 2D · usa START para 3D','2D ikuspegia · erabili START 3Drako']
  };
  const QC_STEPS = ['design','fastq','tags','bam','matrix','cellcalling','ambient','doublets','cellqc','sampleqc','integration'];
  const PHASES = ['G1','G1/S','S','G2','G2/M','M','M/G1'];
  const THEMES = { raw_qc:'filter', noise:'chart', state_annotation:'markers', differential:'chart', composition:'filter', programs_grn:'workflow', dynamics:'clock', perturbation:'ideas', genetics:'workflow', transcripts:'literature', foundation:'ideas', simulation:'chart', spatial_reference:'markers', evolution:'workflow' };
  const state = { category:null, step:null, metric:null, query:'', onlySelected:false, page:0, phase:'G1', paused:false, zoom:1, panX:0, panY:0 };
  let root, viewport, cell, resizeObserver, abort, searchTimer, dragging, transformRaf = 0, compact = false;
  const A = () => window.YV_APP;
  const E = s => A().esc(s);
  const X = s => A().tx(s || '');
  const T = key => TEXT[key]?.[Math.max(0, LANGS.indexOf(A()?.prefs().language || 'zh'))] || key;
  const F = (kind, item, key) => item ? A().field(kind, item, key) : '';
  const D = () => A().data();
  const P = () => window.YV_BUILDER.getPlan();
  const I = name => A().icon(name);
  const selected = () => new Set(P().metrics);
  const category = () => D().categories.categories.find(c => c.id === state.category);
  const step = () => A().maps().step.get(state.step);
  const metric = () => A().maps().metric.get(state.metric);
  const $ = selector => root?.querySelector(selector);
  function stepsFor(c) { return (c?.id === 'raw_qc' ? QC_STEPS : c?.stepIds || []).map(id => A().maps().step.get(id)).filter(Boolean); }
  function metricsForStep(id) { return D().workflow.metrics.filter(m => m.stepId === id); }
  function metricsForCategory(c) { return [...new Set(stepsFor(c).flatMap(s => metricsForStep(s.id).map(m => m.id)))]; }
  function nodeList() {
    if (state.query.trim() || state.onlySelected) {
      const q = state.query.toLowerCase().trim(), chosen = selected();
      return D().workflow.metrics.filter(m => (!state.onlySelected || chosen.has(m.id)) && (!q || [F('metrics',m,'name'),m.nameEn,F('metrics',m,'definition'),m.definition,X(m.purpose),m.purpose,m.id,...m.tools,...m.tools.map(id=>A().maps().tool.get(id)?.name||id)].join(' ').toLowerCase().includes(q))).map(m => ({kind:'metric', id:m.id, title:F('metrics',m,'name'), subtitle:F('steps',A().maps().step.get(m.stepId),'title'), count:m.tools.length, icon:'chart'}));
    }
    if (state.step) return metricsForStep(state.step).map(m => ({kind:'metric',id:m.id,title:F('metrics',m,'name'),subtitle:X(m.unit),count:m.tools.length,icon:'chart'}));
    if (state.category) return stepsFor(category()).map(s => ({kind:'step',id:s.id,title:F('steps',s,'title'),subtitle:F('steps',s,'subtitle'),count:metricsForStep(s.id).length,icon: s.id==='bam'?'workflow':s.id==='tags'?'markers':'filter'}));
    return D().categories.categories.map(c => ({kind:'category',id:c.id,title:X(c.title),subtitle:X(c.description),count:metricsForCategory(c).length,icon:THEMES[c.id]||'ideas'}));
  }
  function pageSize() { return state.category || state.step || state.query || state.onlySelected ? 12 : 14; }
  function nodePositions(n) {
    const outer = n <= 8 ? n : 8, inner = n - outer;
    return Array.from({length:n}, (_,i) => {
      const second = i >= outer, size = second ? inner : outer, index = second ? i - outer : i;
      const innerSlots={1:[0],2:[0,3],3:[0,2,4],4:[0,1,3,4],5:[0,1,2,3,4],6:[0,1,2,3,4,5]};
      const angle = (-90 + (second ? innerSlots[inner][index]*60 : index*360/Math.max(1,size))) * Math.PI / 180;
      const rx = second ? 218 : 346, ry = second ? 177 : 257;
      return { x:430 + Math.cos(angle)*rx, y:335 + Math.sin(angle)*ry, ring:second?'inner':'outer' };
    });
  }
  function breadcrumbs() {
    const parts = [`<button data-gx="root" ${!state.category&&!state.query?'aria-current="page"':''}>${T('themes')}</button>`];
    const c = category(), s = step(), m = metric();
    if (state.query || state.onlySelected) parts.push(`<span>${T('results')}</span>`);
    else { if(c)parts.push(`<button data-gx="category" data-id="${c.id}">${E(X(c.title))}</button>`); if(s)parts.push(`<button data-gx="step" data-id="${s.id}">${E(F('steps',s,'title'))}</button>`); }
    if(m)parts.push(`<span aria-current="page">${E(F('metrics',m,'name'))}</span>`);
    return parts.join('<i aria-hidden="true">›</i>');
  }
  function nodesHTML() {
    const all=nodeList(), size=pageSize(), pages=Math.max(1,Math.ceil(all.length/size));
    state.page=Math.min(state.page,pages-1);
    const rows=all.slice(state.page*size,(state.page+1)*size), positions=nodePositions(rows.length), chosen=selected();
    return rows.length ? rows.map((n,i) => {
      const p=positions[i], isSelected=n.kind==='metric'&&chosen.has(n.id), active=n.kind==='metric'&&n.id===state.metric;
      return `<button class="gx-node gx-${n.kind} ${active?'is-active':''} ${isSelected?'is-included':''}" data-gx="${n.kind}" data-id="${n.id}" data-node-kind="${n.kind}" style="--node-x:${p.x}px;--node-y:${p.y}px;--node-index:${i}" title="${E(n.title+' · '+n.subtitle)}" aria-label="${E(n.title+' · '+n.count+' '+A().t(n.kind==='metric'?'tools':'metrics'))}" ${active?'aria-pressed="true"':''}><span class="gx-node-icon">${I(n.icon)}</span><strong>${E(n.title)}</strong><span class="gx-node-count">${n.count} ${A().t(n.kind==='metric'?'tools':'metrics')}</span><i class="gx-node-chosen" aria-label="${T('included')}">${I('check')}</i><span class="gx-node-orbit-dot"></span></button>`;
    }).join('') : `<div class="gx-no-results">${I('search')}<p>${T('empty')}</p></div>`;
  }
  function linkSVG() {
    const all=nodeList(), rows=all.slice(state.page*pageSize(),(state.page+1)*pageSize()), positions=nodePositions(rows.length);
    return `<defs><radialGradient id="gx-line-gradient"><stop offset=".18" stop-color="#78d9bb" stop-opacity="0"/><stop offset=".74" stop-color="#78d9bb" stop-opacity=".35"/><stop offset="1" stop-color="#d1ae73" stop-opacity=".48"/></radialGradient></defs><ellipse class="gx-orbit orbit-outer" cx="430" cy="335" rx="346" ry="257"/><ellipse class="gx-orbit orbit-inner" cx="430" cy="335" rx="218" ry="177"/><circle class="gx-orbit orbit-core" cx="430" cy="335" r="110"/>${positions.map((p,i)=>`<path class="gx-connection ${rows[i].id===state.metric?'is-active':''}" d="M430 335 Q${(430+p.x)/2+20} ${(335+p.y)/2-15} ${p.x} ${p.y}"/><circle class="gx-endpoint" cx="${p.x}" cy="${p.y}" r="3"/>`).join('')}`;
  }
  function pagination() {
    const count=nodeList().length, pages=Math.max(1,Math.ceil(count/pageSize()));
    return `<span role="status" aria-live="polite">${count} ${T('count')} <b>· ${state.page+1} / ${pages}</b></span><div><button class="gx-small-button" data-gx="previous" ${state.page===0?'disabled':''} aria-label="${T('previous')}">←</button><button class="gx-small-button" data-gx="next" ${state.page===pages-1?'disabled':''} aria-label="${T('next')}">→</button></div>`;
  }
  function section(title, body, extra='') {return `<section class="gx-detail-section ${extra}"><h3>${E(title)}</h3>${body}</section>`;}
  function pills(tools) {return `<div class="gx-tool-pills">${tools.map(id=>A().maps().tool.get(id)).filter(Boolean).map(t=>`<button data-action="open" data-kind="tool" data-id="${t.id}">${E(t.name)} ↗</button>`).join('')}</div>`;}
  function toolCard(id) {
    const tool=A().maps().tool.get(id); if(!tool)return '';
    const params=tool.parameters||[], values=P().parameters[id]||{};
    return `<article class="gx-method-card"><header><button data-action="open" data-kind="tool" data-id="${id}" title="${T('openMethod')}"><strong>${E(tool.name)}</strong> ↗</button><label class="gx-mini-check"><input type="checkbox" data-plan-tool="${id}" ${P().tools.includes(id)?'checked':''}><span>${T('includeTool')}</span></label></header><p>${E(F('tools',tool,'task'))}</p>${tool.entrypoint?`<pre><code>${E(tool.entrypoint)}</code></pre>`:''}<details class="gx-parameters"><summary>${T('parameters')} <b>${params.length}</b></summary><p>${T('parameterHint')}</p>${params.map(p=>`<label class="gx-parameter"><code>${E(p.name)}</code><span>${E(X(p.meaning))}</span><small>${E(X(p.selection))}</small><input type="text" data-plan-param="${E(p.name)}" data-tool-id="${id}" value="${E(values[p.name]||'')}" placeholder="${T('pending')}" aria-label="${E(p.name+' · '+T('decision'))}" maxlength="2000"></label>`).join('')}</details><a class="gx-doc-link" href="${E(tool.url)}" target="_blank" rel="noopener noreferrer">${T('manual')} ↗</a></article>`;
  }
  function inspector() {
    const m=metric(),s=step(),c=category();
    if(m)return `<div class="gx-inspector-head"><span class="gx-kicker">${A().t('metrics')} / ${E(m.id)}</span><button class="gx-small-button" data-gx="close-metric" aria-label="${T('close')}">×</button><h2>${E(F('metrics',m,'name'))}</h2><p>${E(F('metrics',m,'definition'))}</p></div><label class="gx-include"><input type="checkbox" data-plan-metric="${m.id}" ${selected().has(m.id)?'checked':''}><span>${T('include')}</span>${I('check')}</label><dl class="gx-definition"><dt>${A().t('purpose')}</dt><dd>${E(X(m.purpose))}</dd><dt>${A().t('denominator')}</dt><dd>${E(X(m.denominator))}</dd><dt>${A().t('unit')}</dt><dd>${E(X(m.unit))}</dd><dt>${A().t('level')}</dt><dd>${E(X(m.level))}</dd></dl>${window.YV_V3?.collection(m)||''}${section(T('toolsPurpose'),(m.tools||[]).map(toolCard).join(''))}${m.cautions?.length?section(A().t('limitations'),A().list(m.cautions)):''}${m.sourceUrls?.length?section(A().t('sources'),`<div class="gx-source-links">${m.sourceUrls.map((u,i)=>A().link(u,A().t('source')+' '+(i+1))).join('')}</div>`):''}<p class="gx-data-note">${T('dataScope')}</p>`;
    if(s)return `<div class="gx-inspector-head"><span class="gx-kicker">${A().t('steps')} / ${String(s.number).padStart(2,'0')}</span><h2>${E(F('steps',s,'title'))}</h2><p>${E(F('steps',s,'subtitle'))}</p></div><div class="gx-context-count"><b>${metricsForStep(s.id).length}</b><span>${A().t('metrics')}</span><b>${s.toolIds.length}</b><span>${A().t('tools')}</span></div>${section(A().t('purpose'),`<p>${E(X(s.purpose))}</p>`)}${section(A().t('inputs'),A().list(s.inputs))}${section(A().t('outputs'),A().list(s.outputs))}${section(A().t('tools'),pills(s.toolIds))}<a class="gx-stage-link" href="#workflow?step=${s.id}">${T('stageLink')} →</a><p class="gx-detail-hint">${I('chart')}${T('exploreStep')}</p>`;
    if(c)return `<div class="gx-inspector-head"><span class="gx-kicker">${T('themes')}</span><h2>${E(X(c.title))}</h2><p>${E(X(c.description))}</p></div><div class="gx-context-count"><b>${stepsFor(c).length}</b><span>${A().t('steps')}</span><b>${metricsForCategory(c).length}</b><span>${A().t('metrics')}</span></div>${section(A().t('tools'),pills(c.toolIds))}<p class="gx-detail-hint">${T('start')}</p><p class="gx-data-note">${T('dataScope')}</p>`;
    return `<div class="gx-inspector-welcome"><div class="gx-welcome-art">${I('workflow')}<i></i><i></i></div><span class="gx-kicker">YEASTVAR1011</span><h2>${T('start')}</h2><p>${T('startBody')}</p><div class="gx-welcome-stats"><span><b>${D().categories.categories.length}</b>${T('themes')}</span><span><b>${D().workflow.metrics.length}</b>${A().t('metrics')}</span><span><b>${D().workflow.tools.length}</b>${A().t('tools')}</span></div><button class="gx-qc-shortcut" data-gx="category" data-id="raw_qc">${I('filter')}${E(X(D().categories.categories.find(c=>c.id==='raw_qc')?.title||'QC'))} →</button><a href="#builder?tab=review" class="gx-stage-link">${T('plan')} →</a><p class="gx-data-note">${T('dataScope')}</p></div>`;
  }
  function page() {
    return `<section class="galaxy-page" id="galaxy-page"><header class="galaxy-heading"><div><span class="gx-kicker">YEASTVAR1011 / ${T('title')}</span><h1>${T('title')}</h1><p>${T('subtitle')}</p></div><a class="btn btn-primary" href="#builder?tab=review">${T('plan')} ${I('arrow')}</a></header><nav id="gx-breadcrumb" class="gx-breadcrumb" aria-label="${T('depth')}">${breadcrumbs()}</nav><div class="galaxy-toolbar"><div class="gx-route-controls"><button class="gx-small-button" data-gx="back" aria-label="${T('back')}" title="${T('back')}">←</button><button class="gx-reset" data-gx="root">${T('reset')}</button></div><label class="gx-search">${I('search')}<input id="gx-search" type="search" value="${E(state.query)}" placeholder="${T('search')}" aria-label="${T('search')}"><button data-gx="clear" aria-label="${T('clear')}" ${!state.query?'hidden':''}>×</button></label><label class="gx-only-selected"><input id="gx-only-selected" type="checkbox" ${state.onlySelected?'checked':''}>${T('selectedOnly')}</label><span class="gx-plan-counter"><b class="gx-selected-count">${P().metrics.length}</b>${T('selected')}</span></div><div class="galaxy-layout"><div class="galaxy-map-panel"><div id="galaxy-viewport" class="galaxy-viewport" tabindex="0" role="region" aria-label="${T('pan')}"><div id="galaxy-world" class="galaxy-world"><svg id="gx-connections" viewBox="0 0 860 670" aria-hidden="true">${linkSVG()}</svg><div class="galaxy-core"><div class="gx-core-halo"></div><span class="gx-core-species">S. cerevisiae</span><div id="galaxy-cell" class="galaxy-cell"></div><span class="gx-core-caption">${T('schematic')}</span><div class="gx-phase-controls" aria-label="${T('phase')}">${PHASES.map(p=>`<button data-gx="phase" data-id="${p}" class="${state.phase===p?'active':''}" aria-pressed="${state.phase===p}">${p}</button>`).join('')}</div><button class="gx-rotation" data-gx="pause" aria-label="${T(state.paused?'resume':'pause')}" title="${T(state.paused?'resume':'pause')}">${state.paused?'▶':'Ⅱ'}</button></div><div id="gx-nodes" class="gx-nodes">${nodesHTML()}</div></div><div class="gx-map-controls"><button data-gx="zoom-in" aria-label="${T('zoomIn')}" title="${T('zoomIn')}">+</button><button data-gx="zoom-out" aria-label="${T('zoomOut')}" title="${T('zoomOut')}">−</button><button data-gx="fit" aria-label="${T('fit')}" title="${T('fit')}">⌖</button></div></div><div id="gx-pagination" class="gx-pagination">${pagination()}</div><div class="gx-map-help"><span>${T('pan')}</span><span>${T('model')}</span></div></div><aside id="gx-inspector" class="gx-inspector" aria-live="polite">${inspector()}</aside></div></section>`;
  }
  function update({keepPanel=false,focus=false}={}) {
    if(!root?.isConnected)return;
    $('#gx-nodes').innerHTML=nodesHTML(); $('#gx-connections').innerHTML=linkSVG();
    $('#gx-breadcrumb').innerHTML=breadcrumbs(); $('#gx-pagination').innerHTML=pagination();
    if(!keepPanel){$('#gx-inspector').innerHTML=inspector();$('#gx-inspector').scrollTop=0;}
    const input=$('#gx-search'); if(input.value!==state.query)input.value=state.query;
    $('[data-gx="clear"]').hidden=!state.query;
    $('[data-gx="back"]').disabled=!(state.category||state.step||state.metric||state.query||state.onlySelected);
    syncPlan();
    if(focus)$('#gx-nodes .gx-node')?.focus({preventScroll:true});
  }
  function syncPlan() {
    if(!root?.isConnected)return;
    const p=P(),chosen=new Set(p.metrics),tools=new Set(p.tools);
    if(state.onlySelected){$('#gx-nodes').innerHTML=nodesHTML();$('#gx-connections').innerHTML=linkSVG();$('#gx-pagination').innerHTML=pagination();}
    root.querySelectorAll('[data-plan-metric]').forEach(x=>x.checked=chosen.has(x.dataset.planMetric));
    root.querySelectorAll('[data-plan-tool]').forEach(x=>x.checked=tools.has(x.dataset.planTool));
    root.querySelectorAll('.gx-node[data-node-kind="metric"]').forEach(x=>x.classList.toggle('is-included',chosen.has(x.dataset.id)));
    root.querySelectorAll('.gx-selected-count').forEach(x=>x.textContent=p.metrics.length);
  }
  function resetNavigation() {state.category=null;state.step=null;state.metric=null;state.query='';state.onlySelected=false;state.page=0;if($('#gx-only-selected'))$('#gx-only-selected').checked=false;}
  function navigate(action,id) {
    if(action==='root'){resetNavigation();fit();}
    if(action==='category'){state.category=id;state.step=null;state.metric=null;state.query='';state.onlySelected=false;state.page=0;$('#gx-only-selected').checked=false;fit();}
    if(action==='step'){state.step=id;state.metric=null;state.query='';state.page=0;fit();}
    if(action==='metric'){state.metric=id;}
    if(action==='close-metric')state.metric=null;
    if(action==='back'){
      if(state.metric)state.metric=null;
      else if(state.query||state.onlySelected){state.query='';state.onlySelected=false;$('#gx-only-selected').checked=false;state.page=0;}
      else if(state.step){state.step=null;state.page=0;}
      else if(state.category){state.category=null;state.page=0;}
    }
    update();
    if(action==='metric'&&compact)$('#gx-inspector').scrollIntoView({behavior:A().prefs().reducedMotion?'auto':'smooth',block:'start'});
  }
  function transform() {
    transformRaf=0;const world=$('#galaxy-world');if(!world)return;
    if(compact){world.style.transform='none';return;}
    world.style.transform=`translate(${state.panX}px,${state.panY}px) scale(${state.zoom})`;
  }
  function requestTransform(){if(!transformRaf)transformRaf=requestAnimationFrame(transform);}
  function fit() {
    if(!viewport)return;
    const available=root.getBoundingClientRect().width;
    root.dataset.stacked=String(available<1000);compact=available<620;
    root.dataset.compact=String(compact);
    const rect=viewport.getBoundingClientRect();
    state.zoom=compact?1:Math.min(1.12,Math.max(.54,Math.min((rect.width-22)/860,(rect.height-18)/670)));
    state.panX=0;state.panY=0;transform();
  }
  function zoom(factor) {if(compact)return;state.zoom=Math.max(.42,Math.min(1.6,state.zoom*factor));requestTransform();}
  function handleClick(ev) {
    const el=ev.target.closest('[data-gx]');if(!el||!root.contains(el))return;
    const action=el.dataset.gx,id=el.dataset.id;
    if(['root','category','step','metric','back','close-metric'].includes(action)){
      navigate(action,id);
      if(ev.detail===0){const focused=state.metric?root.querySelector(`#gx-nodes [data-id="${CSS.escape(state.metric)}"]`):null;(focused||$('#gx-nodes .gx-node'))?.focus({preventScroll:true});}
      return;
    }
    if(action==='phase'){state.phase=id;cell?.setPhase(id);root.querySelectorAll('[data-gx="phase"]').forEach(x=>{x.classList.toggle('active',x.dataset.id===id);x.setAttribute('aria-pressed',String(x.dataset.id===id));});return;}
    if(action==='pause'){state.paused=!state.paused;cell?.setPaused(state.paused);el.textContent=state.paused?'▶':'Ⅱ';el.setAttribute('aria-label',T(state.paused?'resume':'pause'));el.title=T(state.paused?'resume':'pause');return;}
    if(action==='zoom-in')zoom(1.15);else if(action==='zoom-out')zoom(1/1.15);else if(action==='fit')fit();
    else if(action==='previous'||action==='next'){state.page+=action==='next'?1:-1;state.metric=null;update({focus:true});}
    else if(action==='clear'){state.query='';state.page=0;update();$('#gx-search').focus();}
  }
  function afterRender() {
    const next=document.getElementById('galaxy-page');if(!next)return;
    if(root===next&&cell){cell.setTheme('dark');cell.setReducedMotion(!!A().prefs().reducedMotion);syncPlan();return;}
    dispose();root=next;viewport=$('#galaxy-viewport');abort=new AbortController();const signal=abort.signal;
    root.addEventListener('click',handleClick,{signal});
    root.addEventListener('input',ev=>{if(ev.target.id!=='gx-search')return;state.query=ev.target.value;state.page=0;state.metric=null;clearTimeout(searchTimer);searchTimer=setTimeout(()=>update(),150);},{signal});
    root.addEventListener('change',ev=>{
      const el=ev.target;
      if(el.id==='gx-only-selected'){state.onlySelected=el.checked;state.page=0;state.metric=null;update();}
      if(el.dataset.planMetric&&window.YV_BUILDER.toggleMetric){ev.stopPropagation();window.YV_BUILDER.toggleMetric(el.dataset.planMetric,el.checked);syncPlan();}
      else if(el.dataset.planTool){ev.stopPropagation();window.YV_BUILDER.toggleTool(el.dataset.planTool,el.checked);syncPlan();}
    },{signal});
    viewport.addEventListener('pointerdown',ev=>{
      if(compact||ev.button!==0||ev.target.closest('button,input,a,.galaxy-core'))return;
      dragging={id:ev.pointerId,x:ev.clientX,y:ev.clientY,panX:state.panX,panY:state.panY};
      viewport.setPointerCapture(ev.pointerId);viewport.classList.add('is-panning');
    },{signal});
    viewport.addEventListener('pointermove',ev=>{if(!dragging||ev.pointerId!==dragging.id)return;state.panX=dragging.panX+ev.clientX-dragging.x;state.panY=dragging.panY+ev.clientY-dragging.y;requestTransform();},{signal});
    const release=()=>{dragging=null;viewport?.classList.remove('is-panning');};
    viewport.addEventListener('pointerup',release,{signal});viewport.addEventListener('pointercancel',release,{signal});viewport.addEventListener('lostpointercapture',release,{signal});
    viewport.addEventListener('wheel',ev=>{if(compact||ev.target.closest('.galaxy-core'))return;ev.preventDefault();zoom(Math.exp(-ev.deltaY*.001));},{passive:false,signal});
    viewport.addEventListener('keydown',ev=>{
      if(ev.target.closest('.galaxy-core,input'))return;
      if(ev.key==='Escape'){navigate('back');return;}
      if(ev.key==='+'||ev.key==='='){ev.preventDefault();zoom(1.15);}
      if(ev.key==='-'){ev.preventDefault();zoom(1/1.15);}
      if(ev.key==='Home'){ev.preventDefault();fit();}
      if(ev.target===viewport&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(ev.key)){ev.preventDefault();state.panX+=ev.key==='ArrowLeft'?-28:ev.key==='ArrowRight'?28:0;state.panY+=ev.key==='ArrowUp'?-28:ev.key==='ArrowDown'?28:0;requestTransform();}
    },{signal});
    window.addEventListener('yv:planchange',syncPlan,{signal});
    const mount=()=>{
      if(!root?.isConnected||!window.YV3D||cell)return;
      cell=window.YV3D.mount($('#galaxy-cell'),{phase:state.phase,theme:'dark',initialZoom:1.3,reduceMotion:!!A().prefs().reducedMotion,autoRotate:!state.paused,labels:{ariaLabel:T('model'),schematic:'',fallback:'2D'}});
      cell.setPaused(state.paused);
    };
    if(window.YV3D)mount();else if(location.protocol==='file:'){
      const host=$('#galaxy-cell');
      const draw=()=>{
        const bud={G1:0,'G1/S':16,S:25,G2:31,'G2/M':36,M:38,'M/G1':40}[state.phase];
        host.innerHTML=`<svg viewBox="0 0 220 220" role="img" aria-label="${E(T('fileFallback'))}" class="gx-file-cell"><defs><radialGradient id="gx-file-cell-fill"><stop stop-color="#82cab0" stop-opacity=".65"/><stop offset="1" stop-color="#4e947e" stop-opacity=".24"/></radialGradient></defs><ellipse cx="87" cy="128" rx="47" ry="58" fill="url(#gx-file-cell-fill)" stroke="#80bd9d" stroke-width="1.2"/>${bud?`<ellipse cx="${state.phase==='M/G1'?163:148}" cy="${state.phase==='M/G1'?60:75}" rx="${bud}" ry="${bud*1.1}" fill="url(#gx-file-cell-fill)" stroke="#80bd9d"/>`:''}<ellipse cx="99" cy="113" rx="16" ry="20" fill="#948fc6" fill-opacity=".65"/><ellipse cx="69" cy="145" rx="16" ry="20" fill="#bfd1aa" fill-opacity=".3"/>${['M','M/G1'].includes(state.phase)?'<ellipse cx="150" cy="76" rx="11" ry="14" fill="#948fc6" fill-opacity=".5"/>':''}</svg>`;
        $('.gx-core-caption').textContent=T('fileFallback');
      };
      cell={setPhase:()=>draw(),setTheme:()=>{},setReducedMotion:()=>{},setPaused:()=>{},destroy:()=>{host.innerHTML=''},getState:()=>({mode:'fallback',phase:state.phase,paused:true})};
      draw();$('[data-gx="pause"]').disabled=true;
    }else window.addEventListener('yv3d:ready',mount,{once:true,signal});
    resizeObserver=new ResizeObserver(()=>fit());resizeObserver.observe(viewport);fit();syncPlan();
  }
  function beforeRender(options={}) {if(options.preserve&&root?.isConnected)return;dispose();}
  function dispose() {
    clearTimeout(searchTimer);if(transformRaf)cancelAnimationFrame(transformRaf);transformRaf=0;
    abort?.abort();abort=null;resizeObserver?.disconnect();resizeObserver=null;
    cell?.destroy();cell=null;root=null;viewport=null;dragging=null;
  }
  window.YV_GALAXY={page,afterRender,beforeRender,dispose,title:()=>T('title'),getState:()=>({...state,compact,scene:cell?.getState()||null}),navigate,refresh:()=>update(),syncPlan};
})();
