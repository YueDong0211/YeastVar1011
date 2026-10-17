'use strict';
(() => {
  const A=()=>window.YV_APP, $=s=>document.querySelector(s), languages=['zh','en','fr','es','eu'];
  const labels={
    journey:['沉浸式制定方案','Immersive plan studio','Studio immersif','Estudio inmersivo','Plangune murgiltzailea'],
    overview:['首页','Home','Accueil','Inicio','Hasiera'],
    workbench:['研究方案','Study plan','Plan d’étude','Plan de estudio','Ikerketa-plana'],
    workflow:['分析流程','Workflow','Flux d’analyse','Flujo de análisis','Analisi-fluxua'],
    quality:['QC 指标','QC measures','Mesures QC','Métricas QC','QC neurriak'],
    markers:['标记基因库','Marker library','Marqueurs','Marcadores','Markatzaileak'],
    tools:['方法与工具','Methods & tools','Méthodes et outils','Métodos y herramientas','Metodoak eta tresnak'],
    literature:['参考文献','Literature','Bibliographie','Bibliografía','Bibliografia'],
    formulas:['统计公式','Statistical formulas','Formules statistiques','Fórmulas estadísticas','Formula estatistikoak'],
    projects:['研究方向','Research directions','Axes de recherche','Líneas de investigación','Ikerketa-ildoak'],
    galaxy:['研究图谱','Research map','Carte de recherche','Mapa de investigación','Ikerketa-mapa'],
    lab:['公式与绘图','Formulas & figures','Formules et figures','Fórmulas y figuras','Formulak eta irudiak'],
    ideas:['分析线索','Research ideas','Pistes de recherche','Ideas de investigación','Ikerketa-ideiak'],
    builder:['流程编辑','Workflow editor','Éditeur de flux','Editor de flujos','Fluxu-editorea'],
    saved:['收藏与笔记','Saved & notes','Favoris et notes','Favoritos y notas','Gogokoak eta oharrak'],
    settings:['外观与偏好','Appearance & preferences','Apparence et préférences','Apariencia y preferencias','Itxura eta hobespenak'],
    settingsTitle:['外观与偏好','Appearance & preferences','Apparence et préférences','Apariencia y preferencias','Itxura eta hobespenak'],
    settingsBody:['调整语言、阅读布局、背景和转场。','Adjust language, reading layout, background and transitions.','Réglez la langue, la disposition, le fond et les transitions.','Ajusta el idioma, la disposición, el fondo y las transiciones.','Egokitu hizkuntza, diseinua, atzeko planoa eta trantsizioak.'],
    contribute:['加入与贡献','Join & contribute','Participer','Participar','Parte hartu'],
    searchHint:['搜索页面、基因、方法或文献','Search pages, genes, methods or papers','Rechercher pages, gènes, méthodes ou articles','Buscar páginas, genes, métodos o artículos','Bilatu orriak, geneak, metodoak edo artikuluak'],
    search:['搜索','Search','Rechercher','Buscar','Bilatu']
  };
  const words={
    all:['全部','All','Tout','Todo','Guztiak'],
    pages:['页面与功能','Pages & actions','Pages et fonctions','Páginas y funciones','Orriak eta funtzioak'],
    marker:['标记基因','Marker genes','Gènes marqueurs','Genes marcadores','Gene markatzaileak'],
    metric:['指标','Measures','Mesures','Métricas','Neurriak'],
    tool:['方法与工具','Methods & tools','Méthodes et outils','Métodos y herramientas','Metodoak eta tresnak'],
    paper:['文献','Papers','Articles','Artículos','Artikuluak'],
    formula:['公式','Formulas','Formules','Fórmulas','Formulak'],
    project:['研究方向','Research directions','Axes de recherche','Líneas de investigación','Ikerketa-ildoak'],
    step:['分析环节','Analysis stages','Étapes d’analyse','Etapas de análisis','Analisi-etapak'],
    review:['检查与导出方案','Review & export plan','Vérifier et exporter','Revisar y exportar','Berrikusi eta esportatu'],
    navigate:['切换页面','Switch page','Changer de page','Cambiar de página','Aldatu orria'],
    keyboard:['↑ ↓ 选择 · Enter 打开 · Esc 关闭','↑ ↓ Select · Enter Open · Esc Close','↑ ↓ Choisir · Entrée Ouvrir · Échap Fermer','↑ ↓ Elegir · Intro Abrir · Esc Cerrar','↑ ↓ Hautatu · Sartu Ireki · Esc Itxi'],
    matches:['项匹配','matches','correspondances','coincidencias','emaitza'],
    empty:['没有找到匹配内容','No matches found','Aucun résultat','Sin resultados','Ez dago emaitzarik'],
    emptyHelp:['尝试基因名、工具名、分析环节或 DOI。','Try a gene, tool, analysis stage or DOI.','Essayez un gène, outil, étape ou DOI.','Prueba un gen, herramienta, etapa o DOI.','Probatu gene, tresna, etapa edo DOI bat.'],
    clear:['清除关键词','Clear search','Effacer la recherche','Borrar búsqueda','Garbitu bilaketa']
  };
  const lang=()=>A()?.prefs().language||'zh';
  const L=(table,key,language=lang())=>table[key]?.[Math.max(0,languages.indexOf(language))];
  const T=k=>L(words,k)||k, E=x=>A().esc(x);
  const fold=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  let filter='all',lastQuery='',records=null,indexData=null,lastSettingsAnchor='';
  function label(k,language){return L(labels,k,language)}
  function beginSearch(){filter='all'}
  function pages(){
    const main=['journey','workbench','markers','quality','tools','literature','formulas','projects','lab','galaxy','workflow','builder','saved','settings','contribute','overview','ideas'];
    const aliases={journey:'沉浸式 3D 制定方案 游戏 immersive guided study planning',workbench:'方案 设计 plan study design',quality:'质控 QC quality FASTQ BAM UMI',markers:'marker 基因 周期 stress annotation',lab:'DIY 绘图 plot figure formula 公式',settings:'3D 动画 外观 转场 animation cinematic theme preferences',saved:'收藏 笔记 notes',contribute:'加入 贡献 联系 contact email'};
    return main.map(k=>({title:label(k),hint:T('pages'),route:k==='workbench'?window.YV_PLAN.href(window.YV_PLAN.getState().phase):k==='builder'?'#builder?tab=assemble':'#'+k,icon:k,search:fold([...(labels[k]||[]),aliases[k]||'',k].join(' '))}))
      .concat([{title:T('review'),hint:label('workbench'),route:'#workbench?stage=review',icon:'download',search:fold([...words.review,'export 导出 下载 Excel PDF 文档 预览 preview APA'].join(' '))}])
      .concat([{title:L(labels,'settings')+' · 3D',hint:label('settings'),route:'#settings?section=transitions',icon:'galaxy',search:fold('3D 酵母 转场 动画 cinematic yeast animation transitions')}])
      .concat(A().data().workflow.steps.map(s=>({title:A().field('steps',s,'title'),hint:T('step'),route:window.YV_PLAN.href(window.YV_PLAN.phaseForStep(s.id),s.id),icon:'workflow',search:fold([s.id,s.title,s.titleEn,JSON.stringify(window.YV_CONTENT?.steps?.[s.id]||{})].join(' '))})));
  }
  function getRecords(){
    const d=A().data();if(indexData===d&&records)return records;
    indexData=d;records=[
      ['marker',d.markers.markers,'markers'],['metric',d.workflow.metrics,'chart'],['tool',d.workflow.tools,'tools'],
      ['paper',d.literature.papers,'literature'],['formula',d.workflow.formulas,'formulas'],['project',d.projects.projects,'projects']
    ].map(([kind,items,icon])=>({kind,icon,items:items.map(o=>({o,search:fold(o._search||JSON.stringify(o))}))}));
    return records;
  }
  function title(kind,o){return kind==='marker'?o.symbol:kind==='paper'?o.title:kind==='project'?A().tx(o.title):A().field(kind==='metric'?'metrics':kind==='tool'?'tools':'formulas',o,'name')}
  function hint(kind,o){if(kind==='marker')return o.systematic;if(kind==='paper')return [o.journal,o.year].filter(Boolean).join(' · ');return T(kind)}
  function rank(text,query){const t=fold(text);return t===query?0:t.startsWith(query)?1:2}
  function search(query=''){
    lastQuery=query;const q=fold(query.trim()),tokens=q.split(/\s+/).filter(Boolean),matches=s=>tokens.every(t=>s.includes(t));
    const groups=[];
    if(filter==='all'||filter==='pages'){
      let found=pages().filter(p=>!q||matches(p.search));
      if(q)found.sort((a,b)=>rank(a.title,q)-rank(b.title,q));
      else found=found.filter(p=>['#markers','#quality','#tools','#workbench?stage=review','#settings'].includes(p.route)||p.icon==='workbench');
      groups.push({kind:'pages',total:found.length,items:found.slice(0,q?10:6).map(p=>'<button type="button" class="command-result" data-action="search-route" data-route="'+E(p.route)+'"><span class="result-icon">'+A().icon(p.icon)+'</span><span><strong>'+E(p.title)+'</strong><small>'+E(p.hint)+'</small></span>'+A().icon('arrow')+'</button>')});
    }
    if(q||filter!=='all'&&filter!=='pages')for(const group of getRecords()){
      if(filter!=='all'&&filter!==group.kind)continue;
      let found=group.items.filter(r=>!q||matches(r.search));
      if(q)found.sort((a,b)=>rank(title(group.kind,a.o),q)-rank(title(group.kind,b.o),q));
      groups.push({kind:group.kind,total:found.length,items:found.slice(0,filter==='all'?5:20).map(({o})=>'<button type="button" class="command-result" data-action="search-open" data-kind="'+group.kind+'" data-id="'+E(o.id)+'"><span class="result-icon">'+A().icon(group.icon)+'</span><span><strong>'+E(title(group.kind,o))+'</strong><small>'+E(hint(group.kind,o))+'</small></span>'+A().icon('arrow')+'</button>')});
    }
    $('#command-help').innerHTML='<nav class="i15-search-filters" aria-label="'+E(label('search'))+'">'+['all','pages','marker','metric','tool','paper','formula','project'].map(k=>'<button type="button" data-i15-filter="'+k+'" aria-pressed="'+(filter===k)+'">'+E(T(k))+'</button>').join('')+'</nav>';
    $('#command-results').innerHTML=groups.filter(g=>g.items.length).map(g=>'<section class="i15-search-group"><h3>'+E(T(g.kind))+'<span>'+g.items.length+' / '+g.total+'</span></h3>'+g.items.join('')+'</section>').join('')||'<div class="empty-state"><h3>'+E(T('empty'))+'</h3><p>'+E(T('emptyHelp'))+'</p><button class="btn" data-i15-clear>'+E(T('clear'))+'</button></div>';
    let footer=$('.i15-search-footer');if(!footer){footer=document.createElement('div');footer.className='i15-search-footer';$('.command-palette').append(footer)}
    footer.textContent=T('keyboard');
    $('#command-query').setAttribute('aria-label',label('searchHint'));
    $('#command-query').setAttribute('aria-controls','command-results');
    let status=$('#i15-search-status');if(!status){status=document.createElement('span');status.id='i15-search-status';status.className='i15-sr-only';status.setAttribute('role','status');$('.command-palette').append(status)}status.textContent=groups.reduce((s,g)=>s+g.total,0)+' '+T('matches');
  }
  function afterRender(){
    const crumb=$('#breadcrumb-page');if(crumb){crumb.title=T('navigate');crumb.setAttribute('aria-label',label(A().route())+' · '+T('navigate'))}
    // The research workflow already has its own stage navigation.
    $('.sidebar-workflow')?.setAttribute('hidden','');
    const scene=$('.station-settings');
    if(scene&&window.YV_CINEMATIC&&!$('#i15-transition-settings')){
      const section=document.createElement('section');section.id='i15-transition-settings';section.innerHTML=window.YV_CINEMATIC.settingsMarkup();scene.prepend(section);window.YV_CINEMATIC.bind(section);
    }
    if(A().route()==='settings'&&location.hash.includes('section=transitions')&&lastSettingsAnchor!==location.hash){
      lastSettingsAnchor=location.hash;requestAnimationFrame(()=>$('#i15-transition-settings')?.scrollIntoView({block:'start',behavior:'instant'}));
    }else if(A().route()!=='settings')lastSettingsAnchor='';
  }
  document.addEventListener('click',event=>{
    const crumb=event.target.closest('#breadcrumb-page');
    if(crumb){$('#global-search-button').click();filter='pages';search('');$('#command-query').focus();return}
    const button=event.target.closest('[data-i15-filter]');
    if(button){filter=button.dataset.i15Filter;search(lastQuery);$('[data-i15-filter="'+filter+'"]')?.focus();return}
    if(event.target.closest('[data-i15-clear]')){$('#command-query').value='';search('');$('#command-query').focus()}
  });
  document.addEventListener('keydown',event=>{
    if($('#search-modal')?.hidden||event.altKey||event.ctrlKey||event.metaKey)return;
    const input=$('#command-query'),rows=[...document.querySelectorAll('#command-results .command-result')],at=rows.indexOf(event.target);
    if(event.target===input&&event.key==='Enter'){event.preventDefault();rows[0]?.click()}
    else if((event.target===input||at>=0)&&['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();const index=event.key==='ArrowDown'?Math.min(rows.length-1,at+1):at-1;(index<0?input:rows[index])?.focus()}
    else if(at>=0&&['Home','End'].includes(event.key)){event.preventDefault();(event.key==='Home'?rows[0]:rows.at(-1))?.focus()}
  });
  window.YV_INTERFACE={label,search,beginSearch,afterRender};
})();
