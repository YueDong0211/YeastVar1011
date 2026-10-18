/* Verified workspace context for the local assistant. Generated language never executes actions. */
'use strict';
(() => {
  const LANGS=['zh','en','fr','es','eu'];
  const COPY={
    auditTitle:['当前方案核对','Current-plan review','Vérification du projet','Revisión del plan','Uneko planaren berrikuspena'],
    selected:['已选内容','Selected content','Éléments sélectionnés','Contenido seleccionado','Hautatutako edukia'],
    projects:['研究方向','Research questions','Axes de recherche','Líneas de investigación','Ikerketa-ildoak'],
    tools:['工具','Tools','Outils','Herramientas','Tresnak'],
    metrics:['指标','Metrics','Indicateurs','Métricas','Adierazleak'],
    markers:['标记基因','Markers','Marqueurs','Marcadores','Markatzaileak'],
    declared:['已声明拥有','Declared available','Déclaré disponible','Disponible declarado','Eskuragarri dagoela adierazita'],
    planned:['计划由流程生成','Planned workflow outputs','Sorties prévues du flux','Resultados previstos del flujo','Lan-fluxuak sortzeko aurreikusita'],
    missing:['仍需准备或核实','Still to prepare or verify','À préparer ou vérifier','Por preparar o verificar','Prestatu edo egiaztatu beharrekoa'],
    stages:['待补充的处理环节','Processing stages to review','Étapes à examiner','Etapas por revisar','Berrikusi beharreko urratsak'],
    upstream:['上游尚待满足','Upstream inputs pending','Entrées amont manquantes','Entradas previas pendientes','Aurreko sarrerak falta dira'],
    snapshot:['按提问时的方案核对','Reviewed from the plan at the time of asking','Vérifié à partir du projet au moment de la question','Revisado a partir del plan al preguntar','Galdera egin uneko planetik berrikusita'],
    changed:['方案已更改，请重新核对。','The plan changed. Run the review again.','Le projet a changé. Relancez la vérification.','El plan cambió. Revise de nuevo.','Plana aldatu da. Berrikusi berriro.'],
    none:['当前所选内容没有额外输入要求。','The current selection has no additional input requirements.','La sélection actuelle ne demande aucune entrée supplémentaire.','La selección actual no requiere entradas adicionales.','Uneko hautaketak ez du sarrera gehigarririk behar.'],
    noMissing:['当前清单没有未声明且无生成路径的输入。计划产物仍需实际生成并核验。','No input in this list lacks both a declaration and a production path. Planned outputs still require generation and verification.','Aucune entrée de cette liste ne manque à la fois de déclaration et de voie de production. Les sorties prévues restent à produire et vérifier.','Ninguna entrada de esta lista carece a la vez de declaración y ruta de producción. Los resultados previstos aún deben generarse y verificarse.','Zerrenda honetako sarrera guztiek deklarazioa edo ekoizpen-bidea dute. Aurreikusitako irteerak sortu eta egiaztatu behar dira oraindik.'],
    optIn:['先勾选“结合当前方案”，或直接打开方案审阅。','Enable “Use current plan” or open the plan review directly.','Activez « Utiliser le plan actuel » ou ouvrez sa vérification.','Active « Usar el plan actual » o abra la revisión del plan.','Gaitu « Erabili uneko plana » edo ireki planaren berrikuspena.'],
    openReview:['审阅方案与输入','Review plan and inputs','Vérifier projet et entrées','Revisar plan y entradas','Berrikusi plana eta sarrerak'],
    openInputs:['编辑已有数据清单','Edit available-data inventory','Modifier les données disponibles','Editar datos disponibles','Editatu eskuragarri dauden datuak'],
    openMarkers:['筛选标记基因','Filter marker evidence','Filtrer les marqueurs','Filtrar marcadores','Iragazi markatzaileak'],
    openDatabases:['查阅数据库与导入准备','Review databases and import preparation','Consulter les bases et préparer l’import','Consultar bases y preparar importación','Berrikusi datu-baseak eta inportazioa'],
    databasesHelp:['数据库入口按身份、功能、调控、互作、表达和群体资源组织。SGD 与 GO 的已导入证据可直接在标记库筛选；其它资源提供官方查阅和导入准备说明。外部记录需保留版本、物种、菌株、条件、基因身份和原始证据，不直接转成细胞状态标签。','Database resources are grouped by identity, function, regulation, interactions, expression and population. Imported SGD and GO evidence is filterable in the marker library; other resources provide official links and import preparation. Retain version, species, strain, condition, gene identity and source evidence before using external records for annotation.','Les ressources sont classées par identité, fonction, régulation, interactions, expression et population. Les preuves SGD et GO importées sont filtrables ; les autres ressources proposent liens officiels et préparation de l’import. Conservez version, espèce, souche, condition, identité des gènes et preuves sources.','Los recursos se agrupan por identidad, función, regulación, interacciones, expresión y población. La evidencia importada de SGD y GO puede filtrarse; otros recursos ofrecen enlaces oficiales y preparación. Conserve versión, especie, cepa, condición, identidad génica y evidencia original.','Baliabideak identitate, funtzio, erregulazio, interakzio, adierazpen eta populazioaren arabera sailkatzen dira. SGD eta GO ebidentziak iragaz daitezke; beste baliabideek esteka ofizialak eta inportazio-prestaketa eskaintzen dituzte. Gorde bertsioa, espeziea, anduia, baldintza, gene-identitatea eta jatorrizko ebidentzia.'],
    openQC:['浏览 QC 指标','Browse QC measurements','Parcourir les indicateurs QC','Explorar métricas QC','Arakatu QC neurriak'],
    openTools:['查阅方法与参数','Review methods and parameters','Consulter méthodes et paramètres','Consultar métodos y parámetros','Berrikusi metodoak eta parametroak'],
    openStudio:['进入酵母 3D','Open yeast 3D','Ouvrir la levure 3D','Abrir levadura 3D','Ireki legamia 3D'],
    openLab:['打开公式与绘图','Open formulas and figures','Ouvrir formules et figures','Abrir fórmulas y figuras','Ireki formulak eta irudiak'],
    studioHelp:['进入沉浸式设计并点击“开始体验”，再打开模型下方的“酵母工坊”。可以更换配色、材质、结构图层和动作；经典模式与 3D 模式共用研究方案。','Enter immersive design, select Start, then open Yeast studio below the model. Customize color, finish, structural layers and actions. Classic and 3D modes share the research plan.','Ouvrez la conception immersive, choisissez Démarrer, puis l’Atelier sous le modèle. Modifiez couleurs, matière, couches et actions. Les deux modes partagent le projet.','Entre en diseño inmersivo, pulse Iniciar y abra el Taller bajo el modelo. Personalice color, material, capas y acciones. Ambos modos comparten el plan.','Ireki diseinu murgiltzailea, hautatu Hasi eta ireki ereduaren azpiko Tailerra. Pertsonalizatu kolorea, materiala, geruzak eta ekintzak. Bi moduek plana partekatzen dute.'],
    markerHelp:['在标记基因库中组合周期、功能、证据和参考表达标签；可选择交集或并集，也可搜索基因名。打开基因记录查看具体证据，选择后再为方案分配用途、角色与多个标签。','Combine phase, function, evidence and reference-expression filters in the marker library using intersection or union, or search a gene. Open a record for its evidence, then assign selected genes purposes, roles and multiple tags.','Combinez cycle, fonction, preuves et expression de référence dans la bibliothèque, par intersection ou union, ou cherchez un gène. Consultez la fiche puis attribuez usages, rôles et étiquettes multiples.','Combine ciclo, función, evidencia y expresión de referencia mediante intersección o unión, o busque un gen. Consulte la ficha y asigne usos, roles y etiquetas múltiples.','Konbinatu fasea, funtzioa, ebidentzia eta erreferentzia-adierazpena ebakidura edo bilduraz, edo bilatu genea. Ireki fitxa eta esleitu erabilerak, rolak eta etiketa anitzak.'],
    qcHelp:['QC 工作台按数据处理环节组织指标。每个指标可查计数对象、分母、软件字段、所需输入与来源；加入方案后，在审阅页检查它的输入是否已有或计划生成。','QC measurements are organized by processing stage. Each record states the counted object, denominator, software fields, required inputs and sources. After adding it, review whether its inputs exist or are planned outputs.','Les indicateurs QC sont organisés par étape. Chaque fiche précise objet, dénominateur, champs logiciels, entrées et sources. Vérifiez ensuite la disponibilité des entrées dans le projet.','Las métricas QC se agrupan por etapa. Cada ficha indica objeto, denominador, campos del software, entradas y fuentes. Revise después su disponibilidad en el plan.','QC neurriak prozesatze-urratsen arabera daude. Fitxek objektua, izendatzailea, software-eremuak, sarrerak eta iturriak zehazten dituzte. Gero berrikusi sarreren prestasuna planean.'],
    toolsHelp:['方法目录列出用途、输入、参数和官方来源。选择工具只会将方法加入计划；实际可用性取决于文库结构、参考与已有数据。审阅页会列出尚缺的输入。','The methods catalogue lists uses, inputs, parameters and official sources. Selecting a tool adds it to the plan; feasibility depends on library structure, reference and available data. The review lists pending inputs.','Le catalogue décrit usages, entrées, paramètres et sources officielles. La sélection ajoute une méthode au projet ; sa faisabilité dépend de la bibliothèque, de la référence et des données.','El catálogo describe usos, entradas, parámetros y fuentes oficiales. La selección añade el método al plan; su viabilidad depende de la biblioteca, referencia y datos disponibles.','Metodo-katalogoak erabilerak, sarrerak, parametroak eta iturri ofizialak jasotzen ditu. Hautatzeak metodoa planean gehitzen du; bideragarritasuna liburutegiaren, erreferentziaren eta datuen araberakoa da.'],
    labHelp:['在探索实验室中导入汇总数据或添加公式，选择图形和标注，再将启用的设计附到研究方案。图表使用你提供的数据；方案目录本身不包含项目分析结果。','In the exploration lab, import summary data or add a formula, choose a chart and annotations, and attach enabled designs to the plan. Figures use supplied data; the catalogue does not contain project analysis results.','Dans le laboratoire, importez des données résumées ou une formule, choisissez figure et annotations, puis joignez les modèles actifs au projet. Les figures utilisent les données fournies.','En el laboratorio, importe datos resumidos o una fórmula, elija figura y anotaciones y adjunte los diseños activos al plan. Las figuras usan los datos proporcionados.','Laborategian, inportatu laburpen-datuak edo formula, hautatu irudia eta oharrak, eta erantsi diseinu aktiboak planari. Irudiek emandako datuak erabiltzen dituzte.'],
    routeLabel:['数据起点','Starting data','Données de départ','Datos iniciales','Hasierako datuak'],
    raw_fastq:['原始 FASTQ','Raw FASTQ','FASTQ bruts','FASTQ sin procesar','FASTQ gordinak'],
    tagged_bam:['带标签 BAM','Tagged BAM','BAM annoté','BAM etiquetado','BAM etiketatua'],
    count_matrix:['计数矩阵','Count matrix','Matrice de comptages','Matriz de conteos','Zenbaketa-matrizea'],
    more:['其余项目见完整审阅页','See the full review for remaining items','Autres éléments dans la vérification complète','Otros elementos en la revisión completa','Gainerakoak berrikuspen osoan'],
    alternative:['可选生成路径','Alternative production paths','Voies de production alternatives','Rutas de producción alternativas','Ekoizpen-bide alternatiboak'],
    pageLabel:['当前工作区','Current workspace','Espace actuel','Espacio actual','Uneko lan-eremua']
  };
  const A=()=>window.YV_APP,B=()=>window.YV_BUILDER;
  const language=()=>A()?.prefs?.().language||'zh';
  const text=k=>COPY[k]?.[Math.max(0,LANGS.indexOf(language()))]||k;
  const clean=x=>String(x??'').replace(/\s+/g,' ').trim();
  const field=(kind,record,key)=>A()?.field?.(kind,record,key)||A()?.tx?.(record?.[key])||clean(record?.[key]);
  const inputName=id=>A()?.tx?.(A()?.data?.().categories.dataRequirements.find(x=>x.id===id)?.title)||id;
  const signature=()=>{const p=B()?.getPlan?.();if(!p)return'';delete p.updated;return JSON.stringify(p);};

  function retrieve(query){
    const d=A()?.data?.();if(!d)return[];
    const words=(query.match(/[A-Za-z][A-Za-z0-9_-]{1,24}/g)||[]).map(x=>x.toUpperCase());
    const genes=d.markers.markers.filter(r=>[r.id,r.symbol,r.systematic,...(r.aliases||[])].some(a=>words.includes(String(a).toUpperCase()))).slice(0,4);
    const named=genes.map(record=>({kind:'marker',id:record.id,title:record.symbol,record,sources:[...new Set(record.evidence.map(e=>e.sourceUrl).filter(Boolean))]}));
    const hits=window.YV_GUIDE?.search?.(query)?.hits||[];
    // Keep explicitly named methods beside named genes; a gene must not eclipse the rest of a mixed question.
    const namedMethods=(d.workflow.tools||[]).filter(r=>words.some(w=>[r.id,r.name].some(v=>clean(v).toUpperCase()===w))).map(record=>({kind:'tool',id:record.id,title:record.name,record,sources:[record.url,...(record.sourceUrls||[])].filter(Boolean)}));
    const rows=named.length?[...named,...namedMethods.slice(0,2)]:[...namedMethods,...hits];
    return rows.filter((h,i,a)=>a.findIndex(x=>x.kind===h.kind&&x.id===h.id)===i).slice(0,6);
  }
  function planAudit(){
    const p=B()?.getPlan?.(),d=A()?.data?.();if(!p||!d)return null;
    const review=B().inputReview(),inputs=review.inputs||[];
    const groups={declared:[],planned:[],missing:[]};
    for(const row of inputs){const k=row.status==='declared'?'declared':['planned-output','conditional-output'].includes(row.status)?'planned':'missing';groups[k].push(row);}
    const excluded=new Set(window.YV_INPUTS?.excludedStages?.(p)||[]);
    const missingStages=[...new Set(p.stages.flatMap(id=>window.YV_INPUTS?.stageDependencies?.(p,d,id)||[]))].filter(id=>!p.stages.includes(id)&&!excluded.has(id));
    const list=(rows,limit=7)=>rows.slice(0,limit).map(r=>inputName(r.id));
    const lines=[text('auditTitle'),`${text('routeLabel')}: ${text(review.route)}`,`${text('selected')}: ${p.projects.length} ${text('projects')} · ${p.tools.length} ${text('tools')} · ${p.metrics.length} ${text('metrics')} · ${p.markers.length} ${text('markers')}`];
    if(!inputs.length)lines.push(text('none'));
    else for(const key of ['declared','planned','missing']){
      lines.push(`\n${text(key)} (${groups[key].length})`);
      if(groups[key].length)lines.push(...list(groups[key]).map(s=>'• '+s),...(groups[key].length>7?['… '+text('more')]:[]));
      else if(key==='missing')lines.push(text('noMissing'));
    }
    const upstream=[...new Set(groups.planned.flatMap(r=>r.blockedBy||r.unresolved||[]))].filter(id=>!p.availableData.includes(id));
    if(upstream.length)lines.push(`\n${text('upstream')}: ${upstream.slice(0,7).map(inputName).join(' · ')}`);
    if(missingStages.length)lines.push(`\n${text('stages')}: ${missingStages.map(id=>field('steps',d.workflow.steps.find(s=>s.id===id),'title')).join(' · ')}`);
    lines.push('\n'+text('snapshot'));
    return {answer:lines.join('\n'),usesPlan:true,signature:signature(),route:review.route,inputs,groups,missingStages,counts:{declared:groups.declared.length,planned:groups.planned.length,missing:groups.missing.length},actions:[{route:'#workbench?stage=review&tab=review',label:text('openReview')},{route:'#workbench?stage=scope',label:text('openInputs')}]};
  }
  function planSummary(){
    const audit=planAudit();if(!audit)return'';
    return clean(`${text('routeLabel')}: ${text(audit.route)}. ${text('declared')}: ${audit.groups.declared.map(r=>inputName(r.id)).join('; ')}. ${text('missing')}: ${audit.groups.missing.slice(0,5).map(r=>inputName(r.id)).join('; ')}. ${text('planned')}: ${audit.groups.planned.slice(0,4).map(r=>inputName(r.id)).join('; ')}.`).slice(0,650);
  }
  function pageContext(){return {route:A()?.route?.()||'overview',title:clean((document.querySelector('#db24-title')||document.querySelector('#j17-panel-title')||document.querySelector('#main h1'))?.textContent)};}
  function pageHelp({includePlan=true}={}){
    const page=pageContext();
    if(page.route==='markers'&&location.hash.includes('view=databases'))return{kind:'guide',answer:text('databasesHelp'),hits:[],actions:[{route:'#markers?view=databases',label:text('openDatabases')}]};
    const help={markers:['markerHelp','#markers','openMarkers'],quality:['qcHelp','#quality','openQC'],tools:['toolsHelp','#tools','openTools'],lab:['labHelp','#lab','openLab'],journey:['studioHelp','#journey?stage=scope','openStudio']};
    const item=help[page.route];if(item)return{kind:'guide',answer:page.title+'\n\n'+text(item[0]),hits:[],actions:[{route:item[1],label:text(item[2])}]};
    if(['workbench','builder'].includes(page.route))return{kind:'guide',usesPlan:includePlan,signature:includePlan?signature():'',answer:[page.title,includePlan?text('routeLabel')+': '+text(window.YV_INPUTS?.route?.(B()?.getPlan?.())):'',text('openInputs')+' → '+text('openMarkers')+' → '+text('openReview')].filter(Boolean).join('\n\n'),hits:[],actions:[{route:'#workbench?stage=scope',label:text('openInputs')},{route:'#workbench?stage=review&tab=review',label:text('openReview')}]};
    const heading=document.querySelector('#main h1'),paragraph=heading?.parentElement?.querySelector('p');
    return {kind:'guide',answer:[page.title,clean(paragraph?.textContent),text('openReview')+' · '+text('openQC')+' · '+text('openMarkers')].filter(Boolean).join('\n\n'),hits:[],actions:[{route:'#workbench?stage=review&tab=review',label:text('openReview')},{route:'#quality',label:text('openQC')},{route:'#markers',label:text('openMarkers')}]};
  }
  function resolve(question,{includePlan=true}={}){
    if(/^(?:当前页面怎么用[？?]?|How do I use this page[?]?|Comment utiliser cette page\s*[?]?|¿Cómo uso esta página[?]?|Nola erabili orri hau[?]?)$/i.test(clean(question)))return pageHelp({includePlan});
    const q=clean(question),planQuestion=/(?:(?:我的|当前|检查|核对|缺少|还缺).*(?:方案|输入))|(?:方案.*(?:缺|检查|核对))|(?:\b(?:my|current)\b.*\b(?:plan|inputs)\b)|(?:vérifier|vérification|mon projet|revisar mi plan|nire.*plana|review my)/i.test(q);
    if(planQuestion){if(!includePlan)return{kind:'audit',answer:text('optIn'),hits:[],actions:[{route:'#workbench?stage=review&tab=review',label:text('openReview')}]};const audit=planAudit();if(audit)return{kind:'audit',hits:[],...audit};}
    if(/数据库|\bdata(?:base| resources)\b|bases de données|bases de datos|datu.baliabide|datu.base/i.test(q))return{kind:'guide',answer:text('databasesHelp'),hits:[],actions:[{route:'#markers?view=databases',label:text('openDatabases')}]};
    const navigation=/(?:打开|进入|在哪|怎么用|如何用|如何.*(?:筛选|选择)|如何.*(?:页面|界面))|(?:\b(?:open|where|navigate|how to use)\b)|(?:ouvrir|dónde|abrir|nola erabili|ireki)/i.test(q);
    if(navigation){
      const routes=[
        [/数据库|database|bases de données|base de datos|datu.base/i,'databasesHelp','#markers?view=databases','openDatabases'],
        [/3d|diy.*酵母|工坊|沉浸|studio|atelier|taller|tailer/i,'studioHelp','#journey?stage=scope','openStudio'],
        [/marker|标记|注释|markatzaile|marqueur|marcador/i,'markerHelp','#markers','openMarkers'],
        [/\bqc\b|质控|质量|qualité|calidad|kalitate/i,'qcHelp','#quality','openQC'],
        [/绘图|公式|figure|plot|formula|formule|fórmula|irudi|laborat/i,'labHelp','#lab','openLab'],
        [/工具|参数|方法|tool|method|outil|métod|tresna/i,'toolsHelp','#tools','openTools']
      ];
      const found=routes.find(r=>r[0].test(q));if(found)return{kind:'guide',answer:text(found[1]),hits:[],actions:[{route:found[2],label:text(found[3])}]};
    }
    return null;
  }
  window.YV_ASSISTANT_CONTEXT=Object.freeze({text,retrieve,planAudit,planSummary,pageContext,pageHelp,resolve,signature,inputName});
})();
