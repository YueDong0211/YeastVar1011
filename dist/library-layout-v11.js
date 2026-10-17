'use strict';
(() => {
  const A=()=>window.YV_APP;
  const labels={
    prepare:['分子与测量','Molecules & measurement','Molécules et mesure','Moléculas y medición','Molekulak eta neurketa'],
    quality:['细胞与样本质量','Cells & sample quality','Cellules et qualité des échantillons','Células y calidad de muestras','Zelulak eta laginen kalitatea'],
    inference:['状态与表达噪音','States & expression noise','États et bruit d’expression','Estados y ruido de expresión','Egoerak eta adierazpen-zarata'],
    extension:['动力学与遗传机制','Dynamics & genetic mechanisms','Dynamique et mécanismes génétiques','Dinámica y mecanismos genéticos','Dinamika eta mekanismo genetikoak'],
    browse:['按环节浏览','Browse by stage','Parcourir par étape','Explorar por etapa','Arakatu etaparen arabera'],
    related:['适用环节','Relevant stages','Étapes concernées','Etapas relacionadas','Lotutako etapak'],
    documented:['已整理采集方法','Collection methods documented','Méthodes de collecte documentées','Métodos de recopilación documentados','Bilketa-metodo dokumentatuak'],
    years:['按发表年份浏览','Browse by publication year','Parcourir par année de publication','Explorar por año de publicación','Arakatu argitalpen-urtearen arabera']
  };
  const L=k=>labels[k][Math.max(0,['zh','en','fr','es','eu'].indexOf(A().prefs().language))];
  const family=[['prepare',['design','fastq','tags','bam','matrix']],['quality',['cellcalling','ambient','doublets','cellqc','sampleqc']],['inference',['integration','annotation','markers','noise','networks']],['extension',['dynamics','transcripts','validation','genetics','causal']]];
  const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
  function jumpStrip(items,label){
    const nav=el('nav','ll-jump-strip');nav.setAttribute('aria-label',label);
    for(const [target,title,count] of items){const b=el('button','ll-jump',title);b.type='button';b.dataset.llJump=target;if(count!==undefined)b.append(el('b','',String(count)));nav.append(b)}
    return nav;
  }
  function quality(){
    const list=document.querySelector('.qc-accordion-list');if(!list||list.dataset.llReady)return;list.dataset.llReady='true';
    const rows=[...list.querySelectorAll(':scope > .qc-accordion')],groups=new Map();
    for(const row of rows){const metric=A().maps().metric.get(row.dataset.metric);if(!metric)continue;if(!groups.has(metric.stepId))groups.set(metric.stepId,[]);groups.get(metric.stepId).push(row)}
    const items=[];
    for(const step of A().data().workflow.steps){const members=groups.get(step.id);if(!members?.length)continue;
      const title=A().field('steps',step,'title'),section=el('section','ll-qc-stage'),id='ll-qc-'+step.id;section.id=id;
      const heading=el('div','ll-group-heading');heading.append(el('span','ll-section-number',String(step.number).padStart(2,'0')));
      const copy=el('div'),h=el('h2','',title);copy.append(h);const count=members.filter(r=>A().maps().metric.get(r.dataset.metric)?.collection).length;
      copy.append(el('p','',members.length+' '+A().t('metrics')+' · '+count+' '+L('documented')));heading.append(copy);
      const a=el('a','ll-stage-link',A().t('goToStep')+' ↗');a.href='#workflow?step='+step.id;heading.append(a);section.append(heading);
      const body=el('div','ll-qc-stage-body');members.forEach(r=>body.append(r));section.append(body);list.append(section);items.push([id,String(step.number).padStart(2,'0')+' '+title,members.length]);
    }
    if(items.length>1)list.before(jumpStrip(items,L('browse')));
  }
  function workflow(){
    const rail=document.querySelector('.flow-rail');if(!rail||rail.dataset.llReady)return;rail.dataset.llReady='true';
    const links=[...rail.querySelectorAll('.flow-tile')];rail.classList.add('ll-family-rail');
    for(const [key,ids] of family){const group=el('div','ll-flow-family');group.dataset.family=key;group.append(el('h2','',L(key)));const body=el('div','ll-flow-steps');
      links.filter(a=>ids.includes(new URLSearchParams(a.hash.split('?')[1]).get('step'))).forEach(a=>body.append(a));group.append(body);rail.append(group);
    }
  }
  function formulas(){
    for(const card of document.querySelectorAll('.formula-card')){if(card.querySelector('.ll-formula-stages'))continue;
      const steps=A().data().workflow.steps.filter(s=>s.formulaIds.includes(card.dataset.id));if(!steps.length)continue;
      const tags=el('div','ll-formula-stages');tags.setAttribute('aria-label',L('related'));steps.forEach(s=>tags.append(el('span','',A().field('steps',s,'title'))));card.append(tags);
    }
  }
  function literature(){
    const list=document.querySelector('.paper-list');if(!list||list.dataset.llReady)return;list.dataset.llReady='true';
    const rows=[...list.querySelectorAll(':scope > .paper-card')],groups=new Map();
    for(const row of rows){const id=row.querySelector('[data-kind=paper][data-id]')?.dataset.id,paper=A().maps().paper.get(id);if(!paper)continue;const year=String(paper.year);if(!groups.has(year))groups.set(year,[]);groups.get(year).push(row)}
    const items=[];
    for(const [year,members] of [...groups].sort((a,b)=>Number(b[0])-Number(a[0]))){const section=el('section','ll-paper-year');section.id='ll-year-'+year;const heading=el('div','ll-group-heading');heading.append(el('h2','',year),el('span','ll-year-count',members.length+' '+A().t('papers')));section.append(heading);members.forEach(row=>section.append(row));list.append(section);items.push([section.id,year,members.length]);}
    if(items.length>1)list.before(jumpStrip(items,L('years')));
  }
  function markScrolls(){document.querySelectorAll('.mw-tabs,.pt-task-nav,.ra-family-tabs').forEach(e=>{e.classList.remove('ll-scrollable');e.classList.toggle('ll-scrollable',e.scrollWidth>e.clientWidth+3)})}
  function afterRender(){const route=A()?.route();if(route==='quality')quality();if(route==='workflow')workflow();if(route==='formulas'||route==='workflow')formulas();if(route==='literature')literature();requestAnimationFrame(markScrolls);}
  document.addEventListener('click',e=>{const b=e.target.closest('[data-ll-jump]');if(!b)return;const target=document.getElementById(b.dataset.llJump);if(!target)return;target.scrollIntoView({block:'start',behavior:A().prefs().reducedMotion?'auto':'smooth'});const h=target.querySelector('h2');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}});
  let resizeFrame;window.addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(markScrolls)},{passive:true});
  window.YV_LIBRARY_LAYOUT={afterRender};
})();
