#!/usr/bin/env python3
"""Traceable public-metadata literature discovery; does not alter the live catalogue.

Only outputs research/v25-literature-corpus.json and docs/LITERATURE_SEARCH_V25.md.
Default: reuse a successful saved retrieval, then recompute local catalogue matches.
--refresh performs the documented public API searches again. No API keys required.
"""
from __future__ import annotations

import argparse
import collections
import datetime as dt
import hashlib
import html
import http.client
import json
import pathlib
import re
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
CORPUS = ROOT / "research/v25-literature-corpus.json"
REPORT = ROOT / "docs/LITERATURE_SEARCH_V25.md"
START = "2010-01-01"
END = "2026-10-18"
UA = "YeastVar1011-literature-discovery/25 (public scholarly metadata; no full text redistribution)"
EPMC = "https://www.ebi.ac.uk/europepmc/webservices/rest/search"
CR = "https://api.crossref.org/works"

YEAST = '(TITLE_ABS:yeast OR TITLE_ABS:"Saccharomyces cerevisiae" OR TITLE_ABS:"budding yeast")'
SC = '(TITLE_ABS:"single-cell" OR TITLE_ABS:"single cell" OR TITLE_ABS:scRNA-seq)'
RNA = '(TITLE_ABS:RNA OR TITLE_ABS:transcriptom* OR TITLE_ABS:transcription*)'
TARGET = '(TITLE_ABS:"Saccharomyces cerevisiae" OR TITLE_ABS:"budding yeast" OR TITLE:yeast)'
QUERIES = [
    ("epmc-core-phrases", YEAST + ' AND (TITLE_ABS:"single-cell RNA" OR TITLE_ABS:"single cell RNA" OR TITLE_ABS:"single-cell transcriptom*" OR TITLE_ABS:"single cell transcriptom*" OR TITLE_ABS:scRNA-seq)', START, END),
    ("epmc-core-broad", YEAST + ' AND ' + SC + ' AND (TITLE_ABS:transcriptom* OR TITLE_ABS:"RNA-seq" OR TITLE_ABS:"RNA sequencing")', START, END),
    ("epmc-technical-aliases", '(TITLE_ABS:yscRNA OR TITLE_ABS:"mDrop-seq" OR (TITLE_ABS:yeast AND (TITLE_ABS:"SPLiT-seq" OR TITLE_ABS:"Drop-seq" OR TITLE_ABS:"single-cell sequencing" OR TITLE_ABS:"Chromium")))', START, END),
    ("epmc-rna-noise", TARGET + ' AND (TITLE_ABS:"single cell" OR TITLE_ABS:"single-cell" OR TITLE_ABS:smFISH OR TITLE_ABS:"single-molecule" OR TITLE_ABS:stochastic OR TITLE_ABS:bursting) AND (TITLE_ABS:transcription* OR TITLE_ABS:"gene expression noise" OR TITLE_ABS:"mRNA noise")', START, END),
    ("epmc-state-axes", '(TITLE_ABS:"Saccharomyces cerevisiae" OR TITLE_ABS:"budding yeast") AND ' + SC + ' AND (TITLE_ABS:"cell cycle" OR TITLE_ABS:quiescen* OR TITLE_ABS:aging OR TITLE_ABS:ageing OR TITLE_ABS:stress) AND ' + RNA, START, END),
    ("epmc-genetics", YEAST + ' AND ' + SC + ' AND (TITLE_ABS:eQTL OR TITLE_ABS:genotyp* OR TITLE_ABS:heritab* OR TITLE_ABS:"genetic variation" OR TITLE_ABS:"genetic control") AND ' + RNA, START, END),
    ("epmc-rna-imaging", TARGET + ' AND (TITLE_ABS:smFISH OR TITLE_ABS:"single-molecule RNA" OR TITLE_ABS:"single molecule RNA" OR TITLE_ABS:"RNA imaging" OR TITLE_ABS:"live-cell transcription" OR (TITLE_ABS:"MS2" AND TITLE_ABS:transcription*))', START, END),
    ("epmc-classical-pre2010", TARGET + ' AND (TITLE_ABS:"single-cell" OR TITLE_ABS:"single cell" OR TITLE_ABS:"single-molecule" OR TITLE_ABS:stochastic OR TITLE_ABS:bursting) AND (TITLE_ABS:transcription* OR TITLE_ABS:"gene expression noise" OR TITLE_ABS:"mRNA")', "1900-01-01", "2009-12-31"),
]
CROSSREF_QUERIES = [
    ("crossref-title-scrna", "query.title", "yeast single-cell RNA sequencing transcriptomics"),
    ("crossref-bibliographic-noise", "query.bibliographic", "Saccharomyces cerevisiae single cell transcription noise bursting"),
    ("crossref-title-protocol", "query.title", "yeast single cell RNA sequencing protocol"),
]

# Human-reviewed additions are metadata/abstract-level decisions, never gene-level imports.
# Populated after inspecting source records; each decision carries a concrete rationale.
MANUAL = {
    "10.64898/2026.05.29.728873": {"scope": "candidate_yeast_scrna", "priority": 1, "reason": "Europe PMC abstract describes one-pot yeast scRNA-seq before/after salt and nutrient shifts, context-specific eQTL and physiological state occupancy; preprint.", "nextStep": "优先精读新的环境响应 eQTL / 状态占比分析；预印本，须检查补充表中的状态定义、基因表与重复结构，不能直接改称噪音 QTL。", "assayConfirmed": "yeast scRNA-seq; genotype-by-environment; preprint"},
    "10.1093/g3journal/jkad004": {"scope": "method_benchmark_with_yeast", "priority": 2, "reason": "Abstract confirms regulatory network benchmarking on human, mouse and yeast scRNA-seq; reanalysis/method evaluation rather than a new state-marker experiment.", "nextStep": "补充 GRN 方法选择和先验信息评估；追踪原始酵母数据集，不把 benchmark 输出当新的 marker 表。", "assayConfirmed": "scRNA-seq reanalysis and GRN benchmark"},
    "10.21769/bioprotoc.3359": {"scope": "protocol_yeast_scrna", "priority": 2, "reason": "Primary protocol explicitly describes yeast index sorting, UMI counting and experimental/computational steps; related to Nadal-Ribelles 2019, not independent population replication.", "nextStep": "完善 raw FASTQ、UMI 结构、链特异性和定量分支的协议来源；不从协议名称推断用户样本的 read layout。", "assayConfirmed": "yscRNA-seq protocol with index sorting and UMIs"},
    "10.3791/61014": {"scope": "colony_rna_method_not_individual_cell", "priority": 2, "reason": "Primary abstract states isogenic picoliter colonies cultured in hydrogels; RNA-seq screening unit is a clonal microcolony, not a single original yeast cell.", "nextStep": "记录测量单位为克隆微菌落；可借鉴菌株 RNA 筛选，但不得并入单细胞表达噪音分布或单细胞 marker 统计。", "assayConfirmed": "droplet RNA-seq of isogenic microcolonies"},
    "10.1038/s41597-019-0106-6": {"scope": "candidate_single_molecule_rna", "priority": 1, "reason": "Primary data descriptor reports single-cell STL1 and CTT1 mRNA counts and images during osmotic stress in S. cerevisiae; an RNA imaging dataset, not scRNA-seq.", "nextStep": "提取 STL1/CTT1 的条件、时间和原始 RNA 计数作为噪音模型校准参考；gene-level import 需链接数据文件并保留 smFISH 标签。", "assayConfirmed": "multiplex smFISH, S. cerevisiae, osmotic stress"},
    "10.1038/s42003-025-07682-z": {"scope": "candidate_single_molecule_rna", "priority": 2, "reason": "Primary abstract describes yeast smFISH image segmentation and RNA-organelle colocalization with ImageJ-based tools; cannot infer RNA localization from ordinary scRNA reads.", "nextStep": "加入独立 RNA 图像验证工具/可选数据层；当前只有 FASTQ 时作为方法准备，不作为可直接计算的胞器定位功能。", "assayConfirmed": "smFISH image analysis and RNA-organelle localization"},
    "10.1038/nsmb.1514": {"scope": "candidate_single_molecule_rna", "priority": 3, "reason": "Primary abstract measures individual S. cerevisiae mRNAs by in situ hybridization and compares constitutive and PDR5 expression modes.", "nextStep": "保留为 2010 年以前噪音机制基准：RNA 分布、非爆发与爆发模式需由模型及测量证据区分。", "assayConfirmed": "single-molecule RNA in situ hybridization"},
    "10.1126/science.1202142": {"scope": "candidate_single_molecule_rna", "priority": 3, "reason": "Primary abstract describes live fluorescent nascent RNA dynamics at an endogenous yeast locus and cell-cycle-dependent elongation.", "nextStep": "补充转录起始、延伸、终止与细胞周期混杂的机制参考；动态参数来自活细胞 RNA 成像，不能由普通快照直接照搬。", "assayConfirmed": "live nascent RNA fluctuation imaging"},
    "10.1038/s41564-018-0330-4": {"scope": "other_yeast_scrna_reference", "reason": "Title explicitly specifies fission yeast, not S. cerevisiae; retain for method comparison with a separate organism label.", "assayConfirmed": "S. pombe single-cell RNA-seq and imaging"},
    "10.1038/s41467-020-15060-y": {"scope": "other_yeast_scrna_reference", "reason": "Title explicitly specifies fission yeast and dormancy breaking; no direct transfer of phase or marker labels to S. cerevisiae.", "assayConfirmed": "S. pombe time-lapse single-cell transcriptomics"},
    "10.1007/978-1-0716-3279-6_11": {"scope": "exclude_nonyeast_rna_cells", "reason": "The sequenced single cells are B cells; yeast surface display is an antibody-library step, not yeast scRNA-seq."},
    "10.21203/rs.3.pex-2071/v1": {"scope": "exclude_nonyeast_rna_cells", "reason": "Protocol title concerns B-cell sequencing for antibody yeast display, not yeast single-cell RNA."},
}


def now():
    return dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()


def clean(value):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", html.unescape(value or "")))).strip()


def doi_norm(value):
    value = urllib.parse.unquote(html.unescape(str(value or ""))).strip()
    value = re.sub(r"^https?://(?:dx\.)?doi\.org/", "", value, flags=re.I)
    value = re.sub(r"^doi:\s*", "", value, flags=re.I).lower()
    return value.rstrip(".,; ") if value.startswith("10.") else ""


def doi_from_source(source):
    if source.get("doi"):
        return doi_norm(source["doi"])
    text = urllib.parse.unquote(" ".join(str(source.get(k, "")) for k in ("url", "paperUrl", "title")))
    match = re.search(r"10\.\d{4,9}/[^\s\"<>?&#]+", text, re.I)
    if match:
        value = match[0].rstrip("/)")
        value = re.split(r"/MediaObjects/", value, flags=re.I)[0]
        value = re.sub(r"\.s\d{3}$", "", value, flags=re.I)
        return doi_norm(value)
    match = re.search(r"(?:elifesciences\.org/articles/|elifesciences\.org/reviewed-preprints/|elife-)(\d+)", text)
    if match:
        return "10.7554/elife." + match[1]
    match = re.search(r"nature\.com/articles/(s[\w-]+)", text)
    return "10.1038/" + match[1] if match else ""


def signal_record(title, abstract, pubtypes=None):
    title_l = clean(title).lower()
    body = (title_l + " " + clean(abstract).lower())
    terms = {
        "target_explicit": r"saccharomyces cerevisiae|s\.\s*cerevisiae|budding yeast",
        "yeast_title": r"yeast|saccharomyces",
        "yeast_any": r"yeast|saccharomyces",
        "other_yeast": r"schizosaccharomyces|s\.\s*pombe|candida|cryptococcus|komagataella|pichia|yarrowia",
        "single_cell": r"single[ -]cell|scrna[ -]?seq|smfish",
        "scrna": r"single[ -]cell.{0,35}(?:rna|transcriptom)|(?:rna|transcriptom).{0,35}single[ -]cell|scrna[ -]?seq|yscrna|mdrop[ -]?seq|split[ -]?seq",
        "rna": r"\brna\b|mrna|transcript",
        "smfish": r"smfish|single[ -]molecule.{0,30}(?:fish|rna|fluorescence in situ)|single molecule rna",
        "live_rna": r"(?:ms2|pp7).{0,80}(?:rna|transcript)|(?:rna|transcript).{0,80}(?:ms2|pp7)|live[ -]cell.{0,40}(?:rna|transcription)|real[ -]time observation of transcription",
        "noise": r"noise|bursting|stochastic|cell[ -]to[ -]cell|heterogeneity|variability",
        "genetics": r"eqtl|heritab|genetic variation|genetic control|genotype|polymorphism",
        "protein_reporter": r"gfp|fluorescent protein|protein expression noise|protein abundance|fluorescent reporter|proteasom|proteom",
        "bulk": r"bulk rna|bulk transcript|microarray|population.\s*rna|4tu[ -]seq",
        "protocol_title": r"protocol|step by step|method for|using the.*chromium",
        "review_title": r"review|the rise of|perspective|overview|empowering fungal",
        "food_protein": r"single[ -]cell protein|single cell oil|single[ -]cell oil",
    }
    signals = {key: bool(re.search(pattern, title_l if key.endswith("_title") or key == "yeast_title" else body, re.I)) for key, pattern in terms.items()}
    signals["review_type"] = any("review" in str(p).lower() for p in (pubtypes or []))
    return signals


def epmc_record(item):
    journal = item.get("journalInfo", {}).get("journal", {})
    pubtypes = item.get("pubTypeList", {}).get("pubType", [])
    authors = [x.get("fullName") or " ".join(filter(None, [x.get("firstName"), x.get("lastName")])) for x in item.get("authorList", {}).get("author", [])]
    abstract = item.get("abstractText", "")
    return {
        "doi": doi_norm(item.get("doi")), "pmid": str(item.get("pmid") or (item.get("id") if item.get("source") == "MED" else "") or ""),
        "pmcid": item.get("pmcid", ""), "epmcId": item.get("id", ""), "epmcSource": item.get("source", ""),
        "title": clean(item.get("title")), "authors": authors, "journal": journal.get("title", ""),
        "year": int(item["pubYear"]) if str(item.get("pubYear", "")).isdigit() else None,
        "firstPublicationDate": item.get("firstPublicationDate", ""), "publicationTypes": pubtypes,
        "abstractAvailable": bool(abstract), "abstractSha256": hashlib.sha256(abstract.encode()).hexdigest() if abstract else None,
        "screeningSignals": signal_record(item.get("title", ""), abstract, pubtypes),
        "metadataSources": ["Europe PMC"],
        "metadataUrls": ["https://europepmc.org/article/" + item.get("source", "MED") + "/" + item.get("id", "")],
        "isOpenAccess": item.get("isOpenAccess") == "Y",
    }


def crossref_record(item):
    title = clean(" ".join(item.get("title", [])))
    abstract = item.get("abstract", "")
    date = item.get("published", {}).get("date-parts", [[]])[0]
    pubtypes = [item.get("type", "")]
    return {
        "doi": doi_norm(item.get("DOI")), "pmid": "", "pmcid": "", "title": title,
        "authors": [" ".join(filter(None, [a.get("given"), a.get("family")])) or a.get("name", "") for a in item.get("author", [])],
        "journal": "; ".join(item.get("container-title", [])), "year": date[0] if date else None,
        "firstPublicationDate": "-".join(str(v).zfill(4 if n == 0 else 2) for n, v in enumerate(date)),
        "publicationTypes": pubtypes, "abstractAvailable": bool(abstract),
        "abstractSha256": hashlib.sha256(abstract.encode()).hexdigest() if abstract else None,
        "screeningSignals": signal_record(title, abstract, pubtypes), "metadataSources": ["Crossref"],
        "metadataUrls": ["https://api.crossref.org/works/" + urllib.parse.quote(doi_norm(item.get("DOI")), safe="")],
        "crossrefRelations": item.get("relation", {}),
    }


def request(url, kind="json"):
    attempts = []
    for attempt in range(1, 3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json" if kind == "json" else "text/html"}), timeout=45) as response:
                raw = response.read()
                attempts.append({"attempt": attempt, "status": response.status, "retrievedAt": now()})
                return (json.loads(raw) if kind == "json" else raw.decode("utf-8", errors="replace")), attempts
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, OSError, http.client.HTTPException) as exc:
            attempts.append({"attempt": attempt, "error": str(exc), "retrievedAt": now()})
            if attempt < 2:
                time.sleep(0.5)
    return None, attempts


def key_for(rec):
    if rec.get("doi"):
        return "doi:" + rec["doi"]
    if rec.get("pmid"):
        return "pmid:" + rec["pmid"]
    if rec.get("pmcid"):
        return "pmcid:" + rec["pmcid"]
    if rec.get("epmcSource") and rec.get("epmcId"):
        return "epmc:" + rec["epmcSource"] + ":" + rec["epmcId"]
    return "title:" + hashlib.sha256(re.sub(r"\W+", "", rec.get("title", "").lower()).encode()).hexdigest()[:20]


def merge(records, incoming, discovery_id):
    doi, pmid, pmcid = (incoming.get(k) for k in ("doi", "pmid", "pmcid"))
    found = next((r for r in records if (doi and r.get("doi") == doi) or (pmid and r.get("pmid") == pmid) or (pmcid and r.get("pmcid") == pmcid) or (incoming.get("epmcId") and incoming.get("epmcSource") and r.get("epmcId") == incoming["epmcId"] and r.get("epmcSource") == incoming["epmcSource"])), None)
    if found is None:
        found = dict(incoming)
        found["recordId"] = key_for(incoming)
        found["discoveredBy"] = []
        found["metadataVariants"] = list(incoming.get("metadataVariants", []))
        records.append(found)
    else:
        if incoming.get("title") and any(found.get(k) and incoming.get(k) and found[k] != incoming[k] for k in ("title", "year", "firstPublicationDate")):
            variant = {k: incoming.get(k) for k in ("title", "year", "firstPublicationDate", "journal", "metadataSources")}
            if variant not in found["metadataVariants"]:
                found["metadataVariants"].append(variant)
        for k, v in incoming.items():
            if k == "screeningSignals":
                found[k] = {s: found.get(k, {}).get(s, False) or flag for s, flag in v.items()}
            elif k in ("metadataSources", "metadataUrls", "publicationTypes"):
                found[k] = list(dict.fromkeys(found.get(k, []) + v))
            elif not found.get(k) and v:
                found[k] = v
        found["recordId"] = key_for(found)
    if discovery_id not in found["discoveredBy"]:
        found["discoveredBy"].append(discovery_id)
    return found


def consolidate(records, logs):
    result, redirect = [], {}
    for rec in records:
        discoveries = list(rec.get("discoveredBy") or ["unrecorded_origin"])
        for discovery in discoveries:
            merged = merge(result, rec, discovery)
        redirect[rec["recordId"]] = merged["recordId"]
    for log in logs:
        if "recordIds" in log:
            log["recordIds"] = [redirect.get(rid, rid) for rid in log["recordIds"]]
        for page in log.get("pages", []):
            page["recordIds"] = [redirect.get(rid, rid) for rid in page.get("recordIds", [])]
    return result


def checkpoint(records, logs):
    CORPUS.write_text(json.dumps({"retrievalPending": True, "records": records, "searchLog": logs}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def retrieve(records=None, logs=None):
    records, logs = records or [], logs or []
    for qid, base, start, end in QUERIES:
        if any(x["id"] == qid and x.get("status") == "complete" for x in logs):
            continue
        query = base + f" AND FIRST_PDATE:[{start} TO {end}]"
        log = {"id": qid, "source": "Europe PMC", "query": query, "dateField": "FIRST_PDATE", "dateFrom": start, "dateTo": end, "fieldScope": "title/abstract", "pageSize": 100, "pages": [], "retrievedAt": now(), "status": "running"}
        cursor, total = "*", 0
        while True:
            url = EPMC + "?" + urllib.parse.urlencode({"query": query, "format": "json", "resultType": "core", "pageSize": 100, "cursorMark": cursor})
            payload, attempts = request(url)
            page = {"pageNumber": len(log["pages"]) + 1, "requestUrl": url, "cursorMark": cursor, "attempts": attempts}
            log["pages"].append(page)
            if payload is None:
                log["status"] = "failed" if not total else "partial"
                break
            items = payload.get("resultList", {}).get("result", [])
            log["reportedHitCount"] = payload.get("hitCount", 0)
            page["returnedCount"] = len(items)
            page["recordIds"] = [merge(records, epmc_record(item), qid)["recordId"] for item in items]
            total += len(items)
            next_cursor = payload.get("nextCursorMark")
            if not items or total >= payload.get("hitCount", 0):
                log["status"] = "complete"
                break
            if not next_cursor or next_cursor == cursor:
                log["status"] = "partial"
                log["stopReason"] = "API did not return a new pagination cursor"
                break
            cursor = next_cursor
        log["returnedCount"] = total
        logs.append(log)
        checkpoint(records, logs)
        print(f"{qid}: {total}/{log.get('reportedHitCount', '?')} {log['status']}", flush=True)
    for qid, parameter, query in CROSSREF_QUERIES:
        if any(x["id"] == qid and x.get("status") == "ranked_sample" for x in logs):
            continue
        url = CR + "?" + urllib.parse.urlencode({parameter: query, "filter": f"from-pub-date:{START},until-pub-date:{END}", "rows": 100})
        payload, attempts = request(url)
        message = (payload or {}).get("message", {})
        items = message.get("items", [])
        logs.append({"id": qid, "source": "Crossref", "queryParameter": parameter, "query": query, "dateField": "pub-date", "dateFrom": START, "dateTo": END, "pageSize": 100, "reportedHitCount": message.get("total-results"), "returnedCount": len(items), "status": "ranked_sample" if payload else "failed", "retrievedAt": now(), "coverageNote": "First 100 relevance-ranked hits. Crossref total-results is a broad matching universe, not an in-scope paper count; remaining ranks were not downloaded.", "pages": [{"pageNumber": 1, "requestUrl": url, "attempts": attempts, "returnedCount": len(items), "recordIds": [merge(records, crossref_record(item), qid)["recordId"] for item in items]}]})
        checkpoint(records, logs)
        print(f"{qid}: {len(items)} ranked hits", flush=True)
    url = "https://www.haploteam.org/papers/"
    page, attempts = request(url, "html")
    dois = sorted({doi_norm(d.rstrip("/).")) for d in re.findall(r"10\.\d{4,9}/[^\s\"<>?#&]+", html.unescape(page or ""), re.I)})
    logs.append({"id": "official-haploteam-papers", "source": "Official author/laboratory publication page", "requestUrl": url, "retrievedAt": now(), "status": "complete" if page else "failed", "attempts": attempts, "doiLinks": dois, "returnedCount": len(dois), "coverageNote": "DOI links extracted from a team publication page; not a search over all yeast publications. Extracted links require article metadata and scope screening."})
    checkpoint(records, logs)
    print(f"official author page: {len(dois)} DOI links", flush=True)
    return records, logs


def input_inventory():
    lit = json.loads((ROOT / "dist/data/literature.json").read_text(encoding="utf-8"))
    marker = json.loads((ROOT / "dist/data/markers.json").read_text(encoding="utf-8"))
    counts = collections.defaultdict(lambda: {"genes": set(), "evidenceRows": 0, "measurementRows": 0, "explicitDirectMarkerGenes": set(), "relations": collections.Counter(), "assays": collections.Counter()})
    gene_count = 0
    for shard in marker.get("shards", []):
        name = shard if isinstance(shard, str) else shard.get("file")
        rows = json.loads((ROOT / "dist/data" / name).read_text(encoding="utf-8"))
        rows = rows if isinstance(rows, list) else rows.get("markers", [])
        gene_count += len(rows)
        for gene in rows:
            geneid = gene.get("systematic") or gene.get("id") or gene.get("symbol")
            for evidence in gene.get("evidence", []):
                for sid in set(filter(None, [evidence.get("sourceId"), evidence.get("extractionSourceId")])):
                    c = counts[sid]
                    c["genes"].add(geneid)
                    c["evidenceRows"] += 1
                    c["relations"][evidence.get("relation", "unspecified")] += 1
                    if evidence.get("assay"):
                        c["assays"][evidence["assay"]] += 1
                    if evidence.get("directStateMarker") is True:
                        c["explicitDirectMarkerGenes"].add(geneid)
            for measurement in gene.get("referenceMeasurements", []):
                for sid in set(filter(None, [measurement.get("sourceId"), measurement.get("extractionSourceId")])):
                    counts[sid]["genes"].add(geneid)
                    counts[sid]["measurementRows"] += 1
    sources = []
    for source in marker.get("sources", []):
        c = counts[source["id"]]
        source_text = " ".join(str(source.get(k, "")) for k in ("url", "paperUrl"))
        pmid = re.search(r"pubmed\.ncbi\.nlm\.nih\.gov/(\d+)", source_text)
        pmcid = re.search(r"PMC\d+", source_text, re.I)
        sources.append({"sourceId": source["id"], "title": source.get("title"), "paperTitle": source.get("paperTitle"), "doi": doi_from_source(source), "pmid": pmid.group(1) if pmid else "", "pmcid": pmcid.group(0).upper() if pmcid else "", "url": source.get("paperUrl") or source.get("url"), "type": source.get("type"), "genesWithEvidenceOrMeasurements": len(c["genes"]), "geneIds": sorted(c["genes"]), "evidenceRows": c["evidenceRows"], "measurementRows": c["measurementRows"], "explicitDirectMarkerGenes": len(c["explicitDirectMarkerGenes"]), "relations": dict(c["relations"]), "assays": dict(c["assays"]), "importAudit": source.get("importAudit")})
        if source["id"] == "ace2nuclear2010":
            sources[-1].update({"doi": "10.1091/mbc.e10-02-0174", "pmid": "20573982", "identifierResolution": {"source": "https://pubmed.ncbi.nlm.nih.gov/20573982/", "checkedDate": END, "method": "Primary PubMed bibliographic record independently resolved after the PMC-only query returned zero hits"}})
    inventory = {"readAt": now(), "paperFile": "dist/data/literature.json", "paperFileSha256": hashlib.sha256((ROOT / "dist/data/literature.json").read_bytes()).hexdigest(), "markerManifestFile": "dist/data/markers.json", "markerManifestSha256": hashlib.sha256((ROOT / "dist/data/markers.json").read_bytes()).hexdigest(), "paperCount": len(lit["papers"]), "markerSourceCount": len(sources), "geneCount": gene_count, "shardCount": len(marker.get("shards", [])), "sourceEvidenceCounts": sources}
    return lit["papers"], inventory


def identifiers_match(a, b):
    return any(a.get(k) and b.get(k) and str(a[k]).lower() == str(b[k]).lower() for k in ("doi", "pmid", "pmcid"))


def catalogue_record(paper):
    return {"doi": doi_norm(paper.get("doi")), "pmid": str(paper.get("pmid") or ""), "pmcid": paper.get("pmcid") or "", "title": paper.get("title", ""), "authors": paper.get("authors", []), "year": paper.get("year"), "journal": paper.get("journal", ""), "firstPublicationDate": paper.get("date", ""), "publicationTypes": [paper.get("studyType", "")], "metadataSources": ["Existing YeastVar1011 catalogue; not fresh external verification"], "metadataUrls": list(dict.fromkeys(filter(None, [paper.get("url")] + paper.get("sourceUrls", [])))), "screeningSignals": signal_record(paper.get("title", ""), " ".join(str(paper.get(k, "")) for k in ("summary", "contribution", "species"))), "abstractAvailable": False}


def add_inventory(records, logs, papers, inventory, refresh):
    for paper in papers:
        merge(records, catalogue_record(paper), "existing-literature-catalogue")
    # Resolve source-only PMC/PMID identifiers instead of guessing their parent DOI.
    for source in inventory["sourceEvidenceCounts"]:
        match = next((r for r in records if identifiers_match(r, source)), None)
        if not match and (source.get("doi") or source.get("pmid") or source.get("pmcid")):
            query = 'DOI:"' + source["doi"] + '"' if source.get("doi") else ('EXT_ID:' + source["pmid"] + ' AND SRC:MED' if source.get("pmid") else source["pmcid"])
            qid = "resolve-marker-source-" + source["sourceId"]
            prior = next((x for x in reversed(logs) if x["id"] == qid), None)
            if not prior or refresh or prior.get("query") != query:
                url = EPMC + "?" + urllib.parse.urlencode({"query": query, "format": "json", "resultType": "core", "pageSize": 5})
                payload, attempts = request(url)
                items = (payload or {}).get("resultList", {}).get("result", [])
                ids = [merge(records, epmc_record(x), qid)["recordId"] for x in items]
                logs.append({"id": qid, "source": "Europe PMC identifier resolution", "query": query, "requestUrl": url, "attempts": attempts, "retrievedAt": now(), "status": "complete" if payload else "failed", "reportedHitCount": (payload or {}).get("hitCount"), "returnedCount": len(items), "recordIds": ids})
            match = next((r for r in records if identifiers_match(r, source)), None)
        if match:
            for key in ("doi", "pmid", "pmcid"):
                if not source.get(key) and match.get(key):
                    source[key] = match[key]
            source["matchedRecordId"] = match["recordId"]
        else:
            source["matchStatus"] = "database_resource_not_a_paper" if not any(source.get(k) for k in ("doi", "pmid", "pmcid")) else "identifier_unresolved"
    for record in records:
        record["existingPaperIds"] = [p.get("id") for p in papers if identifiers_match(record, {**p, "doi": doi_norm(p.get("doi")), "pmid": str(p.get("pmid") or "")})]
        sources = [s for s in inventory["sourceEvidenceCounts"] if identifiers_match(record, s)]
        record["markerSourceIds"] = [s["sourceId"] for s in sources]
        record["geneImport"] = {"distinctGenes": len(set(g for s in sources for g in s["geneIds"])), "sourceEntries": len(sources), "evidenceRows": sum(s["evidenceRows"] for s in sources), "measurementRows": sum(s["measurementRows"] for s in sources), "interpretation": "Observed local per-gene evidence or reference-measurement presence. Includes bulk, function and protein reference layers; this is not a count of validated single-cell state markers."}
        if record["geneImport"]["distinctGenes"]:
            record["catalogueStatus"] = "indexed_with_gene_level_reference"
        elif record["existingPaperIds"] or sources:
            record["catalogueStatus"] = "indexed_without_gene_level_import"
        else:
            record["catalogueStatus"] = "not_indexed"
    return records


def classify(record):
    s = record["screeningSignals"]
    year = record.get("year")
    first_date = record.get("firstPublicationDate", "")
    period_year = int(first_date[:4]) if re.match(r"^\d{4}", first_date) else year
    record["periodReferenceDate"] = first_date or str(year or "")
    record["period"] = "pre2010_classical" if isinstance(period_year, int) and period_year < 2010 else "2010_2026" if isinstance(period_year, int) and 2010 <= period_year <= 2026 else "date_uncertain_or_outside"
    assay = []
    if s.get("scrna"):
        assay.append("scRNA-seq mentioned; confirm experimental use")
    if s.get("smfish"):
        assay.append("single-molecule RNA/FISH")
    if s.get("live_rna"):
        assay.append("live RNA/transcription imaging")
    if s.get("protein_reporter"):
        assay.append("protein/reporter assay mentioned")
    if s.get("bulk"):
        assay.append("bulk/reference transcriptomics mentioned")
    record["assayScreen"] = assay or ["not determined from available metadata"]
    record["speciesScreen"] = "S_cerevisiae_explicit" if s.get("target_explicit") else "yeast_unspecified_or_multispecies" if s.get("yeast_any") else "target_not_found_in_metadata"
    title = clean(record.get("title")).lower()
    if "peer-review" in record.get("publicationTypes", []) or title.startswith(("reviewer #", "review for ", "decision letter", "elife assessment:", "faculty opinions")):
        scope, reason = "exclude_review_report_or_recommendation", "Review report, assessment or recommendation is a separate bibliographic object, not an independent primary experiment."
    elif title.startswith(("author correction:", "correction:", "erratum:")):
        scope, reason = "correction_to_link_to_parent", "Correction notice: link to its parent paper, do not count as another single-cell dataset."
    elif s.get("food_protein") and not (s.get("scrna") or s.get("smfish") or s.get("live_rna")):
        scope, reason = "exclude_food_production", "Single-cell protein/oil production term; no single-cell RNA assay indication."
    elif (s.get("review_type") or s.get("review_title")) and s.get("yeast_any"):
        scope, reason = "review_or_reference_chasing", "Yeast review/overview: use references to discover primary experiments, not as a gene-level source import."
    elif s.get("scrna") and s.get("yeast_any"):
        scope, reason = "candidate_yeast_scrna", "Yeast and single-cell RNA/transcriptomics terms occur in title/abstract; confirm organism, original experiment versus reanalysis, and supplementary gene tables."
    elif s.get("yeast_any") and (s.get("smfish") or s.get("live_rna")):
        scope, reason = "candidate_single_molecule_rna", "Yeast with RNA/FISH or live transcription imaging: useful for noise/kinetic validation, not a transcriptome-wide scRNA marker set by default."
    elif s.get("yeast_any") and s.get("noise") and (s.get("rna") or s.get("protein_reporter")):
        scope, reason = "candidate_noise_mechanism", "Expression noise/heterogeneity in yeast; distinguish RNA, protein reporter and theory before reuse."
    elif s.get("yeast_any") and (s.get("single_cell") or s.get("rna")):
        scope, reason = "manual_scope_review", "Yeast and cellular/RNA terms present but single-cell RNA assay is not established."
    elif record.get("existingPaperIds"):
        scope, reason = "existing_context_outside_search_core", "Already indexed general method, population reference, or context paper; not a newly discovered yeast RNA experiment."
    else:
        scope, reason = "exclude_no_target_rna_evidence", "Available title/abstract does not establish the target yeast single-cell RNA/noise scope."
    record["screening"] = {"scope": scope, "reason": reason, "level": "automated_title_abstract_screen", "notGeneValidated": True}
    if record.get("doi") in MANUAL:
        record["screening"].update(MANUAL[record["doi"]])
        record["screening"]["level"] = "human_reviewed_metadata_abstract_or_primary_page"
        record["screening"]["reviewDate"] = END
        record["screening"]["reviewSources"] = ["https://europepmc.org/search?query=" + urllib.parse.quote('DOI:"' + record["doi"] + '"')]
    if record["catalogueStatus"] != "not_indexed":
        record["status"] = record["catalogueStatus"]
    elif record["screening"]["scope"].startswith("exclude"):
        record["status"] = "excluded_after_screening"
    elif record["screening"]["scope"] in ("manual_scope_review", "existing_context_outside_search_core"):
        record["status"] = "manual_review_needed"
    else:
        record["status"] = "new_candidate_not_imported"


def verify_core(records, logs, refresh):
    # Only verify high-priority human-reviewed gaps, not every existing catalogue item.
    for record in records:
        if record.get("doi") not in MANUAL or not MANUAL[record["doi"]].get("priority"):
            continue
        qid = "crossref-verify-" + record["doi"]
        old = next((x for x in logs if x["id"] == qid), None)
        if old and not refresh:
            record["crossrefVerification"] = old.get("verification", {"status": "not_checked"})
            continue
        url = CR + "/" + urllib.parse.quote(record["doi"], safe="")
        payload, attempts = request(url)
        message = (payload or {}).get("message", {})
        if payload:
            other = crossref_record(message)
            t1 = set(re.findall(r"[a-z0-9]+", clean(record["title"]).lower()))
            t2 = set(re.findall(r"[a-z0-9]+", clean(other["title"]).lower()))
            score = len(t1 & t2) / len(t1 | t2) if t1 | t2 else 0
            verification = {"status": "verified_doi_title" if other["doi"] == record["doi"] and score >= 0.8 else "metadata_mismatch_review", "titleTokenJaccard": round(score, 4), "title": other["title"], "year": other["year"], "date": other["firstPublicationDate"], "authors": other["authors"], "journal": other["journal"], "dateNote": "Online versus issue dates can differ; original metadata variants are retained."}
            merge(records, other, qid)
        else:
            verification = {"status": "lookup_failed", "reason": attempts[-1].get("error")}
        record["crossrefVerification"] = verification
        logs.append({"id": qid, "source": "Crossref DOI verification", "requestUrl": url, "retrievedAt": now(), "attempts": attempts, "status": "complete" if payload else "failed", "verification": verification})
        print(f"verify {record['doi']}: {verification['status']}", flush=True)


def fill_priority_metadata(records, logs):
    for doi, decision in MANUAL.items():
        if not decision.get("priority") or any(r.get("doi") == doi for r in records):
            continue
        qid = "epmc-priority-identifier-" + doi
        if any(x["id"] == qid for x in logs):
            continue
        query = 'DOI:"' + doi + '"'
        url = EPMC + "?" + urllib.parse.urlencode({"query": query, "format": "json", "resultType": "core", "pageSize": 5})
        payload, attempts = request(url)
        items = (payload or {}).get("resultList", {}).get("result", [])
        logs.append({"id": qid, "source": "Europe PMC exact-identifier follow-up", "query": query, "requestUrl": url, "retrievedAt": now(), "attempts": attempts, "status": "complete" if payload else "failed", "reportedHitCount": (payload or {}).get("hitCount"), "returnedCount": len(items), "recordIds": [merge(records, epmc_record(x), qid)["recordId"] for x in items], "discoveryReason": "Known primary noise/dynamics reference checked independently of keyword recall"})


def report(data):
    records, logs = data["records"], data["searchLog"]
    lines = ["# Yeast single-cell RNA literature coverage audit · v25", "", f"检索窗口：{START}–{END}；2010 年以前的经典研究单独分层。最近生成：{data['generatedAt']}。", "", "本清单用于下一轮文献精读和基因级导入排程，不改变网站的 marker 库。检索命中、论文已收录、补充表已提取、状态 marker 已验证是不同状态；GO 功能、bulk RNA、蛋白定位和单分子 RNA 证据分别保留。", "", "## 可复现入口", "", "```powershell", "python research/v25-literature-discovery.py", "python research/v25-literature-discovery.py --refresh", "```", "", "默认复用本文件对应语料中的检索结果并重新计算当前本地索引。`--refresh` 重新请求公开元数据。脚本只写本语料 JSON 与本说明；不下载付费全文、不改生产文件。", "", "## 检索覆盖", "", "| 查询 | 来源 | 返回 / 服务报告总数 | 状态 |", "|---|---|---:|---|"]
    for log in logs:
        if log["id"].startswith(("epmc-", "crossref-title", "crossref-bibliographic", "official-")):
            lines.append(f"| `{log['id']}` | {log['source']} | {log.get('returnedCount', 0)} / {log.get('reportedHitCount', '不适用')} | {log['status']} |")
    lines += ["", "Europe PMC 每条题名/摘要查询按游标读取全部返回页；详细查询、日期字段、每页返回标识、请求 URL、失败重试都保存在 JSON。Crossref 是补充发现：每个查询只取相关性排序前 100 项，其 reportedHitCount 不能解释为相关酵母论文数量。HaploTeam 为官方作者页交叉发现，不代表领域全集。", "", "## 本地覆盖与去重", "", f"本地输入快照：{data['inputInventory']['paperCount']} 条论文，{data['inputInventory']['markerSourceCount']} 个 marker 来源条目，{data['inputInventory']['geneCount']} 个基因条目，{data['inputInventory']['shardCount']} 个分片。来源条目可能是同一论文的多个补充表，不能直接计为独立论文。", "", "优先按标准化 DOI 去重，其次 PMID/PMCID 与 Europe PMC 来源＋记录 ID；没有可靠共享标识时保留不同记录。预印本和正式论文不自动合并，标题相似项另列版本关系候选。DOI 版本后缀不删除。每条记录列出匹配到的现有论文 ID、marker 来源 ID 和真实基因证据/测量行数。", "", "| 状态 | 条目数 |", "|---|---:|"]
    for status, count in data["counts"]["status"].items():
        lines.append(f"| `{status}` | {count} |")
    lines += ["", "上述状态包含本地原有一般方法和群体组学文献；研究主题归属以 `screening.scope` 为准，不能把表中总数称为酵母 scRNA 论文数。", "", "## 优先精读与下一轮导入", "", "| 论文 | 年份 | 现有状态 | 推荐用途 / 下一步 |", "|---|---:|---|---|"]
    priorities = sorted([r for r in records if r.get("screening", {}).get("priority")], key=lambda r: (r["screening"].get("priority", 9), -(r.get("year") or 0), r["title"]))
    for r in priorities:
        lines.append(f"| [{r['title'].replace('|','/')}](https://doi.org/{r['doi']}) | {r.get('year', '')} | `{r['status']}`；基因 {r['geneImport']['distinctGenes']} | {r['screening'].get('nextStep', r['screening']['reason']).replace('|','/')} |")
    lines += ["", "## 2010 年以前经典层", "", "早期研究保留其原始 assay。双荧光报告蛋白的内在/外在噪音分解不能直接等同于普通单通道 scRNA-seq 的可辨识量；群体同步周期微阵列是状态参考，不是单细胞差异表达实验。", "", "| 论文 | 年份 | assay 线索 |", "|---|---:|---|"]
    for r in sorted((x for x in records if x["period"] == "pre2010_classical" and x.get("screening", {}).get("priority")), key=lambda x: x.get("year", 0)):
        lines.append(f"| [{r['title']}](https://doi.org/{r['doi']}) | {r['year']} | {r['screening'].get('assayConfirmed') or '; '.join(r['assayScreen'])} |")
    lines += ["", "## 状态定义与使用边界", "", "- `indexed_with_gene_level_reference`：本地至少一个基因携带该论文来源的证据或参考测量；不表示整篇补充数据完整导入，也不表示每个基因均为直接状态 marker。", "- `indexed_without_gene_level_import`：论文或来源已索引，但没有匹配到实际基因证据/测量行；可据此安排精读及补充表提取。", "- `new_candidate_not_imported`：检索发现的候选，尚未进入正式目录。自动题名/摘要筛选必须进一步核对物种、assay、条件、对照与原始表。", "- `manual_review_needed`：摘要不足或 assay/物种/研究层次不能确定。", "- `excluded_after_screening`：保留排除理由，例如 single-cell protein 食品生产，或没有目标酵母 RNA 证据。", "- `crossrefVerification`：仅核对优先缺口；未核的条目保留 `not_checked`，不能借检索命中宣称完成书目验证。", "", "## 检索局限与失败", "", "公开索引收录有时滞；题名摘要不一定提到酵母，只有补充材料包含酵母数据的跨物种方法可能漏检。Crossref 相关性取样不是全库系统综述。其余真菌/裂殖酵母需要独立物种标签；泛酵母不能自动升级为 S. cerevisiae。参考文献追踪尚未对所有入选文章逐条穷尽。没有宣称覆盖所有近十年论文或完成所有 marker 的基因级导入。", "", "首次全文检索试探返回核心 5,141、噪音 12,926、状态 7,067 条；默认全文范围混入大量正文引文提及，因此未下载这些全文命中全集，改用本清单保存的题名/摘要查询。试探查询与返回数另存 `exploratoryQueries`。", ""]
    failures = [l for l in logs if l.get("status") in ("failed", "partial") or any(a.get("error") for a in l.get("attempts", [])) or any(a.get("error") for p in l.get("pages", []) for a in p.get("attempts", []))]
    if failures:
        for fail in failures:
            lines.append(f"- `{fail['id']}`：{fail.get('status')}；见 JSON 的逐次请求信息。")
    else:
        lines.append("本轮保存的请求无未恢复失败；独立浏览器检索不计为 API 全量覆盖。")
    lines += ["", "## 数据字段", "", "语料包括 `searchLog`、`exploratoryQueries`、`inputInventory`、`records`、`possibleVersionPairs` 与 `counts`。`records` 不分发完整摘要，仅保留可重取的元数据链接、摘要是否存在、SHA-256 和筛选信号。`manual_review` 级判定与人工核对决定分别标注。生成时间与检索时间分开记录，复用结果不冒充重新联网验证。", ""]
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--refresh", action="store_true", help="Repeat public API discovery and DOI checks")
    args = parser.parse_args()
    if CORPUS.exists() and not args.refresh:
        old = json.loads(CORPUS.read_text(encoding="utf-8"))
        records, logs = old["records"], old["searchLog"]
        print("Reusing stored retrieval dates; rematching current local catalogue.", flush=True)
        if old.get("retrievalPending"):
            records, logs = retrieve(records, logs)
    else:
        records, logs = retrieve()
    records = consolidate(records, logs)
    fill_priority_metadata(records, logs)
    papers, inventory = input_inventory()
    add_inventory(records, logs, papers, inventory, args.refresh)
    for record in records:
        record["title"] = clean(record["title"])
        classify(record)
        record.setdefault("crossrefVerification", {"status": "not_checked", "reason": "Targeted verification is restricted to priority gaps; metadata retrieval alone is not independent verification."})
    verify_core(records, logs, args.refresh)
    for record in records:
        record["officialAuthorPageMatches"] = [log["requestUrl"] for log in logs if log["id"] == "official-haploteam-papers" and record.get("doi") and record["doi"] in log.get("doiLinks", [])]
    # Exact normalized title matches indicate possible preprint/journal versions, not dedup authority.
    by_title = collections.defaultdict(list)
    for r in records:
        by_title[re.sub(r"[^a-z0-9]", "", r["title"].lower())].append(r)
    version_pairs = [{"recordIds": [r["recordId"] for r in group], "title": group[0]["title"], "status": "possible_version_or_duplicate_requires_review"} for title, group in by_title.items() if title and len(group) > 1]
    records.sort(key=lambda r: (-(r.get("year") or 0), r["title"].lower()))
    data = {"schemaVersion": "1.0", "auditVersion": "v25", "generatedAt": now(), "scope": {"species": "Saccharomyces cerevisiae primary; other yeasts/methods explicitly separated during screening", "startDate": START, "endDate": END, "classicalBefore": START, "purpose": "Traceable discovery and import-gap inventory, not a validated marker database"}, "searchLog": logs,
        "exploratoryQueries": [{"source": "Europe PMC", "fieldScope": "default full-text", "status": "count_probe_only_not_fully_retrieved", "dateFrom": START, "dateTo": END, "retrievedDate": END, "reason": "Excess full-text citation mentions; replaced by title/abstract queries", "query": q, "reportedHitCount": count, "returnedCount": 1} for q, count in [
            ('(yeast OR "Saccharomyces cerevisiae" OR "budding yeast") AND ("single-cell RNA" OR "single cell RNA" OR "single-cell transcriptom*" OR "single cell transcriptom*" OR scRNA-seq) AND FIRST_PDATE:[2010-01-01 TO 2026-10-18]', 5141),
            ('("Saccharomyces cerevisiae" OR "budding yeast" OR TITLE:yeast) AND ("single cell" OR "single-cell" OR smFISH OR "single-molecule" OR stochastic OR bursting) AND (transcription* OR "gene expression noise" OR "mRNA noise") AND FIRST_PDATE:[2010-01-01 TO 2026-10-18]', 12926),
            ('("Saccharomyces cerevisiae" OR "budding yeast") AND ("single-cell" OR "single cell") AND ("cell cycle" OR quiescen* OR aging OR ageing OR stress) AND (RNA OR transcriptom* OR transcription*) AND FIRST_PDATE:[2010-01-01 TO 2026-10-18]', 7067)]],
        "executionNotes": [{"date": END, "event": "Initial discovery process stopped during epmc-technical-aliases because of http.client.IncompleteRead. HTTPException retry handling and per-query checkpointing were added; the complete discovery was rerun. The interrupted attempt is not counted as a completed search."}],
        "inputInventory": inventory, "records": records, "possibleVersionPairs": version_pairs,
        "counts": {"records": len(records), "status": dict(collections.Counter(r["status"] for r in records)), "screeningScope": dict(collections.Counter(r["screening"]["scope"] for r in records)), "period": dict(collections.Counter(r["period"] for r in records)), "crossrefVerification": dict(collections.Counter(r["crossrefVerification"]["status"] for r in records))}}
    CORPUS.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    REPORT.write_text(report(data), encoding="utf-8")
    print(json.dumps(data["counts"], ensure_ascii=False, indent=2), flush=True)


if __name__ == "__main__":
    main()
