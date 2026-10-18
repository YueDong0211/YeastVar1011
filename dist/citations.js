/* APA 7 export adapter. Formatting is performed by citeproc-js + official CSL.
 * Metadata and the engine are bundled locally; exports make no network calls.
 */
(() => {
  'use strict';
  const data = window.YV_CITATION_DATA || { records: [], toolReferences: {}, urlMethodReferences: {} };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const uniq = values => [...new Set(values.filter(Boolean))];
  const doi = value => {
    let s = String(value || '').trim();
    try { s = decodeURIComponent(s); } catch (_) {}
    const match = s.match(/10\.\d{4,9}\/[^\s?#]+/i);
    return match ? match[0].replace(/\/+$/, '').toLowerCase() : '';
  };
  function canonicalURL(value) {
    const s = String(value || '').trim();
    if (/^(?:doi:|10\.\d{4,9}\/|https?:\/\/(?:dx\.)?doi\.org\/)/i.test(s)) {
      const d = doi(s); return d ? 'https://doi.org/' + d : '';
    }
    try {
      const u = new URL(s);
      if (!/^https?:$/.test(u.protocol)) return '';
      u.protocol = 'https:'; u.hostname = u.hostname.toLowerCase().replace(/^www\./, '');
      u.hash = '';
      for (const key of [...u.searchParams.keys()]) if (/^(utm_|fbclid$|gclid$)/i.test(key)) u.searchParams.delete(key);
      u.searchParams.sort();
      u.pathname = u.pathname.replace(/\/+$/, '') || '/';
      return u.href.replace(/\/$/, '');
    } catch (_) { return ''; }
  }
  const records = new Map(data.records.map(r => [r.id, r]));
  const aliases = new Map(), related = new Map();
  const index = (map, url, ids) => {
    const key = canonicalURL(url); if (!key) return;
    map.set(key, uniq([...(map.get(key) || []), ...ids]));
  };
  for (const r of records.values()) for (const u of r.urls || []) index(aliases, u, [r.id]);
  for (const [u, ids] of Object.entries(data.urlMethodReferences || {})) index(related, u, ids);
  function resolve(value) {
    if (records.has(value)) return [value];
    const key = canonicalURL(value);
    return [...(aliases.get(key) || related.get(key) || [])];
  }
  function linksFrom(value, found = []) {
    if (Array.isArray(value)) { for (const item of value) linksFrom(item, found); }
    else if (value && typeof value === 'object') {
      for (const [key, item] of Object.entries(value)) {
        if (['bibliography','citations','provenance','verification','byURL','csl'].includes(key)) continue;
        if (['url','URL','paperUrl','sourceUrl','sourceURL','sourceUrls','sourceURLs','references','sourceLinks','sources','evidenceSources'].includes(key)) linksFrom(item, found);
        else if (Array.isArray(item) || (item && typeof item === 'object')) linksFrom(item, found);
      }
    } else if (typeof value === 'string' && canonicalURL(value)) found.push(value);
    return found;
  }
  function cleanCSL(record) {
    // CSL supports inline markup. Untrusted user-supplied markup is not enabled.
    const copy = JSON.parse(JSON.stringify(record));
    copy.system_id = copy.id;
    const clean = value => {
      if (typeof value === 'string') return value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      if (Array.isArray(value)) return value.map(clean);
      if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,clean(v)]));
      return value;
    };
    return clean(copy);
  }
  function safeHTML(value) {
    const template = document.createElement('template'); template.innerHTML = String(value || '');
    const allowed = new Set(['DIV','SPAN','I','B','EM','STRONG','SUP','SUB','A','BR']);
    for (const el of [...template.content.querySelectorAll('*')]) {
      if (!allowed.has(el.tagName)) { el.replaceWith(document.createTextNode(el.textContent || '')); continue; }
      for (const a of [...el.attributes]) {
        if (a.name === 'class' && /^(?:(?:csl-[\w-]+|apa-inline))(?: (?:csl-[\w-]+|apa-inline))*$/.test(a.value)) continue;
        if (a.name === 'style' && /^(?:(?:font-style: italic|font-weight: bold|vertical-align: (?:sup|sub));?\s*)+$/.test(a.value)) continue;
        if (a.name === 'href' && el.tagName === 'A' && (canonicalURL(a.value) || /^#apa-[\w-]+$/.test(a.value))) continue;
        el.removeAttribute(a.name);
      }
      if (el.tagName === 'A' && !el.getAttribute('href')?.startsWith('#')) { el.setAttribute('target','_blank'); el.setAttribute('rel','noopener noreferrer'); }
    }
    return template.innerHTML;
  }
  const textFrom = html => {
    const el = document.createElement('div'); el.innerHTML = html;
    return (el.textContent || '').replace(/\s+/g, ' ').trim();
  };
  function format(selectedRecords) {
    const valid = selectedRecords.filter(r => r?.csl?.id && r.csl.title && r.csl.author?.length);
    const selected = new Map(valid.map(r => [r.id || r.csl.id, r]));
    const ids = [...selected.keys()];
    const empty = { entries: [], bibliographyHTML: '', bibliographyText: '', csl: [], byID: {}, citeIDs:()=>'', error:null };
    if (!ids.length) return empty;
    if (!window.CSL?.Engine || !data.style || !data.locale) return {...empty,error:'APA citation engine is unavailable.'};
    try {
      const system = { retrieveLocale: () => data.locale, retrieveItem: id => cleanCSL(selected.get(id).csl),
        wrapCitationEntry:(str,id)=>`<a class="apa-inline" href="#apa-${esc(id)}">${str}</a>` };
      const engine = new window.CSL.Engine(system, data.style, 'en-US');
      engine.setOutputFormat('html'); engine.updateItems(ids);
      const bibliography = engine.makeBibliography();
      const entries = (bibliography?.[1] || []).map((raw, i) => {
        const id = bibliography[0].entry_ids[i][0], r = selected.get(id), anchor = 'apa-' + id;
        const body = safeHTML(raw);
        const html = `<div class="apa-reference" id="${esc(anchor)}">${body}</div>`;
        return {id,anchor,html,text:textFrom(body),csl:r.csl,urls:r.urls || [],verification:r.verification || {}};
      });
      const byID = Object.fromEntries(entries.map(e=>[e.id,e]));
      const citeIDs = (wanted, opts={}) => {
        const kept = uniq(wanted).filter(id=>selected.has(id));
        if (!kept.length) return '';
        // The engine controls sorting, disambiguation, year collapse and punctuation;
        // its item wrapper adds a source-specific link without rebuilding citations.
        engine.opt.development_extensions.apply_citation_wrapper = !!opts.html;
        const cluster = safeHTML(engine.makeCitationCluster(kept.map(id=>({id}))));
        return opts.html ? cluster : textFrom(cluster);
      };
      return {entries,bibliographyHTML:`<div class="apa-bibliography" role="list">${entries.map(e=>e.html).join('\n')}</div>`,bibliographyText:entries.map(e=>e.text).join('\n\n'),csl:entries.map(e=>e.csl),byID,citeIDs,error:null};
    } catch (error) { return {...empty,error:'APA citation formatting failed: '+String(error.message || error)}; }
  }
  let cachedKey = '', cachedResult = null;
  function build(plan = {}, literature) {
    const explicit=Object.hasOwn(plan,'citationSelection'), scope=plan.citationSelection;
    const valid=!explicit||scope?.version===1&&Array.isArray(scope.sourceUrls)&&scope.sourceUrls.every(x=>typeof x==='string')&&Array.isArray(scope.tools)&&scope.tools.every(x=>typeof x==='string');
    const urls=explicit?(valid?uniq(scope.sourceUrls.filter(canonicalURL)):[]):uniq(linksFrom(plan));
    const toolIds=explicit?(valid?uniq(scope.tools):[]):uniq([...(plan.tools||[]),...(plan.toolRecords||[]).map(t=>t.id)]);
    const ids = uniq([...urls.flatMap(resolve), ...toolIds.flatMap(id=>data.toolReferences[id] || [])]);
    const key = JSON.stringify([explicit,valid,urls,toolIds,ids]);
    if (key === cachedKey && cachedResult) return cachedResult;
    const formatted = format(ids.map(id=>records.get(id)).filter(Boolean));
    const referencesFor = values => {
      const wanted = uniq((Array.isArray(values) ? values : [values]).flatMap(v=>resolve(v)));
      return wanted.map(id=>formatted.byID[id]).filter(Boolean);
    };
    const cite = (values,opts={}) => formatted.citeIDs(referencesFor(values).map(r=>r.id),opts);
    const byURL = {};
    for (const u of urls) {
      const rs = referencesFor([u]); if (!rs.length) continue;
      byURL[u] = {ids:rs.map(r=>r.id),html:cite([u],{html:true}),text:cite([u]),relation:aliases.has(canonicalURL(u)) ? 'bibliographic-alias' : 'method-reference'};
    }
    const unresolvedURLs = urls.filter(u=>!referencesFor([u]).length);
    cachedKey = key;
    cachedResult = {
      style:'APA 7',engine:'citeproc-js',styleSource:'https://www.zotero.org/styles/apa',
      metadataDate:data.generated,entries:formatted.entries,bibliographyHTML:formatted.bibliographyHTML,
      bibliographyText:formatted.bibliographyText,csl:formatted.csl,byURL,unresolvedURLs,
      stats:{references:formatted.entries.length,sourceURLs:urls.length,mappedURLs:urls.length-unresolvedURLs.length,unresolvedURLs:unresolvedURLs.length},
      cite,referencesFor,error:valid?formatted.error:'Invalid citation selection.',
      forTool:(id,opts={})=>formatted.citeIDs(data.toolReferences[id] || [],opts),
      forToolReferences:id=>(data.toolReferences[id] || []).map(r=>formatted.byID[r]).filter(Boolean)
    };
    return cachedResult;
  }
  window.YV_CITATIONS = {
    build,format,resolve,canonicalURL,normaliseDOI:doi,
    audit:data.audit,ready:!!window.CSL?.Engine,
    toolReferenceIDs:id=>[...(data.toolReferences[id] || [])]
  };
})();
