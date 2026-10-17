'use strict';
(() => {
  const languages = ['zh', 'en', 'fr', 'es', 'eu'];
  const copy = {
    page: ['本页内容', 'On this page', 'Dans cette page', 'En esta página', 'Orri honetan'],
    phases: ['全部方案阶段', 'All planning phases', 'Toutes les phases du plan', 'Todas las fases del plan', 'Planaren fase guztiak'],
    definition: ['公式定义', 'Formula definition', 'Définition de la formule', 'Definición de la fórmula', 'Formularen definizioa'],
    context: ['变量、单位与假设', 'Variables, units & assumptions', 'Variables, unités et hypothèses', 'Variables, unidades y supuestos', 'Aldagaiak, unitateak eta hipotesiak'],
    binding: ['文献与方案关联', 'Sources & plan links', 'Sources et liens au plan', 'Fuentes y vínculos al plan', 'Iturriak eta planarekiko loturak'],
    edit: ['高级流程编排', 'Advanced workflow editing', 'Édition avancée du flux', 'Edición avanzada del flujo', 'Lan-fluxuaren edizio aurreratua']
  };
  const T = key => copy[key][Math.max(0, languages.indexOf(window.YV_APP?.prefs()?.language))];
  function fieldGroup(nodes, label, number) {
    if (!nodes.length) return;
    const group = document.createElement('fieldset');
    group.className = 'pwl-field-group';
    const legend = document.createElement('legend');
    const index = document.createElement('span');
    index.textContent = number;
    index.setAttribute('aria-hidden', 'true');
    legend.append(index, document.createTextNode(label));
    nodes[0].before(group); group.append(legend, ...nodes);
    return group;
  }
  function plan() {
    const root = document.getElementById('plan-workbench');
    if (!root || root.dataset.pwlReady) return;
    root.dataset.pwlReady = 'true';
    root.dataset.planPhase = new URLSearchParams(location.hash.split('?')[1]).get('stage') || 'scope';
    const summary = root.querySelector('.pw-summary');
    if (!summary) return;
    const headings = [...root.querySelectorAll('.pw-content > .pw-section, .pw-content > .pw-annotation-overview > .pw-section')]
      .map((section, index) => ({section, heading: section.querySelector('h2'), id: 'pwl-section-' + index})).filter(item => item.heading);
    const outline = document.createElement('nav');
    outline.className = 'pwl-outline'; outline.setAttribute('aria-label', T('page'));
    const caption = document.createElement('span'); caption.className = 'pwl-index-caption'; caption.textContent = T('page'); outline.append(caption);
    headings.forEach(({section, heading, id}, i) => {
      section.id ||= id;
      const link = document.createElement('button'); link.type = 'button';
      const number = document.createElement('span'); number.textContent = String(i + 1).padStart(2, '0'); number.setAttribute('aria-hidden', 'true');
      link.append(number, document.createTextNode(heading.textContent.trim()));
      link.addEventListener('click', () => {
        section.scrollIntoView({behavior: window.YV_APP?.prefs()?.reducedMotion ? 'instant' : 'smooth', block: 'start'});
        const target = section.querySelector('h2'); target.setAttribute('tabindex', '-1'); target.focus({preventScroll: true});
      }); outline.append(link);
    });
    const review = summary.querySelector('.pw-review-link');
    if (review) review.before(outline); else summary.append(outline);
  }
  function lab() {
    const root = document.getElementById('lab-page');
    if (!root || root.dataset.pwlReady) return;
    root.dataset.pwlReady = 'true';
    const form = root.querySelector('#lab-formula-form');
    if (form) {
      const nodes = [...form.children];
      fieldGroup(nodes.slice(0, 4), T('definition'), '01');
      fieldGroup(nodes.slice(4, 6), T('context'), '02');
      fieldGroup(nodes.slice(6, 8), T('binding'), '03');
    }
    const controls = root.querySelector('.lab-figure-controls');
    if (controls) {
      const dividers = [...controls.querySelectorAll(':scope > .lab-divider')];
      dividers.forEach((divider, i) => {
        const title = divider.nextElementSibling;
        if (!title || title.tagName !== 'H3') return;
        const nodes = []; let next = title.nextElementSibling;
        while (next && !next.matches('.lab-divider,.lab-details')) { nodes.push(next); next = next.nextElementSibling; }
        if (i === 0) fieldGroup(nodes, title.textContent, '02');
        else {
          const details = document.createElement('details'); details.className = 'pwl-appearance'; details.open = true;
          const label = document.createElement('summary'); label.textContent = title.textContent;
          nodes[0]?.before(details); details.append(label, ...nodes);
        }
        divider.remove(); title.remove();
      });
    }
  }
  function assemble() {
    if (window.YV_APP?.route() !== 'builder') return;
    const heading = document.querySelector('.builder-heading h1');
    if (heading) heading.textContent = T('edit');
  }
  function afterRender() { plan(); lab(); assemble(); }
  window.YV_PLAN_LAYOUT = {afterRender};
})();
