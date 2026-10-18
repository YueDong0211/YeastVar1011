"""Merge verified bibliographic metadata; preserve prior records and CSL assets."""
import hashlib
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'


def load_json(path):
    return json.loads(path.read_text(encoding='utf-8'))


def main():
    rows = load_json(ROOT / 'research/evolution-references-v30.json')
    literature_path = DIST / 'data/literature.json'
    literature = load_json(literature_path)
    citation_path = DIST / 'citation-data.js'
    citation = json.loads(citation_path.read_text(encoding='utf-8').split('=', 1)[1].strip().rstrip(';'))
    papers = {p.get('doi', '').lower(): p for p in literature['papers'] if p.get('doi')}
    references = {r.get('csl', {}).get('DOI', '').lower(): r for r in citation['records'] if r.get('csl', {}).get('DOI')}
    added = []
    for row in rows:
        doi, csl = row['doi'].lower(), dict(row['csl'])
        fingerprint = hashlib.sha256(doi.encode()).hexdigest()[:12]
        year = csl['issued']['date-parts'][0][0]
        if doi not in papers:
            paper = {
                'id': 'ev30_' + fingerprint, 'title': csl['title'],
                'authors': [' '.join(filter(None, [a.get('given'), a.get('family')])) or a.get('literal', '') for a in csl['author']],
                'cslAuthors': csl['author'], 'year': year,
                'journal': csl.get('container-title', ''), 'volume': csl.get('volume', ''),
                'issue': csl.get('issue', ''), 'pages': csl.get('page', ''),
                'articleNumber': csl.get('article-number', ''), 'doi': doi,
                'url': csl['URL'], 'sourceUrls': [csl['URL'], row['metadataSource']],
                'topics': ['Bayesian inference', 'Evolutionary biology'],
                'species': ['Methodology'], 'studyType': 'Computational method',
                'evidence': 'Published method and official documentation',
                'summary': csl['title'], 'contribution': csl['title'], 'limitations': [],
                'status': 'verified', 'selection': 'curated', 'publicationType': 'peer-reviewed',
                'metadataVerified': True, 'verificationDate': row['verifiedOn'],
                'inWindow': 2010 <= year <= 2026, 'dateEvidence': row['dateEvidence'],
                'addedIn': 'v30_population', 'toolIds': [],
            }
            literature['papers'].append(paper)
            papers[doi] = paper
            added.append(doi)
        if doi not in references:
            rid = 'ref-' + fingerprint
            csl['id'] = rid
            reference = {
                'id': rid, 'csl': csl, 'literatureId': papers[doi]['id'],
                'urls': [csl['URL'], row['metadataSource']],
                'verification': {'source': 'Publisher/official methods pages and registered metadata',
                                 'completeAuthors': True, 'metadataRetrieved': row['verifiedOn'],
                                 'metadataSource': row['metadataSource'], 'dateEvidence': row['dateEvidence']},
            }
            citation['records'].append(reference)
            references[doi] = reference
        if csl.get('page'):
            references[doi]['csl']['page'] = csl['page']
            papers[doi]['pages'] = csl['page']

    mapping = {
        'https://paulbuerkner.com/brms/': '10.18637/jss.v080.i01',
        'https://paulbuerkner.com/brms/articles/brms_phylogenetics.html': '10.18637/jss.v080.i01',
        'https://paulbuerkner.com/brms/articles/brms_distreg.html': '10.18637/jss.v080.i01',
        'https://paulbuerkner.com/brms/reference/brmsformula.html': '10.18637/jss.v080.i01',
        'https://cran.r-project.org/package=phytools': '10.7717/peerj.16505',
        'https://cran.r-project.org/web/packages/phytools/phytools.pdf': '10.7717/peerj.16505',
        'https://revbayes.github.io/': '10.1093/sysbio/syw021',
        'https://revbayes.github.io/tutorials/cont_traits/simple_ou.html': '10.1093/sysbio/syw021',
        'https://revbayes.github.io/tutorials/cont_traits/cont_trait_intro.html': '10.1093/sysbio/syw021',
        'https://iqtree.github.io/': '10.1093/molbev/msag117',
        'https://github.com/iqtree/iqtree3': '10.1093/molbev/msag117',
        'https://www.beast2.org/': '10.1371/journal.pcbi.1006650',
        'https://github.com/amkozlov/raxml-ng/wiki': '10.1093/bioinformatics/btz305',
        'https://etetoolkit.github.io/ete/': '10.1093/molbev/msw046',
        'https://messerlab.org/slim/': '10.1093/molbev/msaf313',
        'https://tskit.dev/msprime/docs/stable/intro.html': '10.1093/genetics/iyab229',
        'https://bioconductor.org/packages/release/bioc/html/ggtree.html': '10.1111/2041-210x.12628',
        'https://mc-stan.org/learn-stan/diagnostics-warnings.html': '10.1214/20-ba1221',
        'https://mc-stan.org/docs/stan-users-guide/posterior-predictive-checks.html': '10.18637/jss.v076.i01',
        'https://hyunjimoon.github.io/SBC/': '10.1214/23-ba1404',
        'https://www.pymc.io/': '10.7717/peerj-cs.1516',
        'https://cran.r-project.org/web/packages/MCMCglmm/MCMCglmm.pdf': '10.18637/jss.v033.i02',
        'https://github.com/Read-Lab-UCI/TelegraphLikelihoodInfer': '10.1093/bioinformatics/btaf581',
    }
    for url, doi in mapping.items():
        rid = references[doi]['id']
        citation['urlMethodReferences'][url] = list(dict.fromkeys(citation['urlMethodReferences'].get(url, []) + [rid]))
        references[doi]['urls'] = list(dict.fromkeys(references[doi]['urls'] + [url]))
    for tool, dois in {'brms': ['10.18637/jss.v080.i01', '10.1214/20-ba1221'], 'phytools2': ['10.7717/peerj.16505']}.items():
        citation['toolReferences'][tool] = list(dict.fromkeys(citation['toolReferences'].get(tool, []) + [references[doi]['id'] for doi in dois]))
        for doi in dois:
            papers[doi]['toolIds'] = list(dict.fromkeys(papers[doi].get('toolIds', []) + [tool]))
    workflow = load_json(DIST / 'data/workflow.json')
    for tool in workflow['tools']:
        if tool.get('addedIn') != 'v30':
            continue
        doi = tool['paperUrl'].removeprefix('https://doi.org/').lower()
        assert doi in references, (tool['id'], doi)
        rid = references[doi]['id']
        citation['toolReferences'][tool['id']] = [rid]
        papers[doi]['toolIds'] = list(dict.fromkeys(papers[doi].get('toolIds', []) + [tool['id']]))
        for url in tool['sourceUrls']:
            citation['urlMethodReferences'][url] = list(dict.fromkeys(citation['urlMethodReferences'].get(url, []) + [rid]))
            references[doi]['urls'] = list(dict.fromkeys(references[doi]['urls'] + [url]))
    citation['generated'] = '2026-10-18'
    workflow = load_json(DIST / 'data/workflow.json')
    unmapped = [t['id'] for t in workflow['tools'] if not citation['toolReferences'].get(t['id'])]
    citation['audit'].update(cataloguePapers=len(literature['papers']), formattedRecords=len(citation['records']),
                             totalTools=len(workflow['tools']), mappedTools=len(workflow['tools'])-len(unmapped),
                             unmappedTools=unmapped)
    citation['audit']['evolutionV30'] = {'addedDOIs': [p['doi'] for p in literature['papers'] if p.get('addedIn') == 'v30_population'], 'verifiedRecords': len(rows),
                                        'dateBasis': 'Print/issue citation year; online date retained separately'}
    for paper in literature['papers']:
        if paper.get('addedIn') == 'v30_population':
            paper['inWindow'] = 2010 <= paper['year'] <= 2026
    all_papers = literature['papers']
    literature['counts'].update(records=len(all_papers), total=len(all_papers),
        curated=sum(p.get('selection') == 'curated' for p in all_papers),
        discovered=sum(p.get('selection') == 'discovered' for p in all_papers),
        inWindow=sum(bool(p.get('inWindow')) for p in all_papers),
        preprints=sum(p.get('publicationType') == 'preprint' for p in all_papers),
        byEvidence=dict(Counter(p.get('evidence','') for p in all_papers)),
        byStudyType=dict(Counter(p.get('studyType','') for p in all_papers)),
        v30AddedOrReviewed=len(rows))
    literature['updated'] = '2026-10-18'
    literature_path.write_text(json.dumps(literature, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    citation_path.write_text('window.YV_CITATION_DATA=' + json.dumps(citation, ensure_ascii=False, separators=(',', ':')) + ';\n', encoding='utf-8')
    print(json.dumps({'newPapers': len(added), 'papers': len(literature['papers']), 'cslRecords': len(citation['records'])}))


if __name__ == '__main__':
    main()
