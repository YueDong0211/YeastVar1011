# Yeast single-cell RNA literature coverage audit · v25

检索窗口：2010-01-01–2026-10-18；2010 年以前的经典研究单独分层。最近生成：2026-10-18T05:13:44+00:00。

本清单用于下一轮文献精读和基因级导入排程，不改变网站的 marker 库。检索命中、论文已收录、补充表已提取、状态 marker 已验证是不同状态；GO 功能、bulk RNA、蛋白定位和单分子 RNA 证据分别保留。

## 可复现入口

```powershell
python research/v25-literature-discovery.py
python research/v25-literature-discovery.py --refresh
```

默认复用本文件对应语料中的检索结果并重新计算当前本地索引。`--refresh` 重新请求公开元数据。脚本只写本语料 JSON 与本说明；不下载付费全文、不改生产文件。

## 检索覆盖

| 查询 | 来源 | 返回 / 服务报告总数 | 状态 |
|---|---|---:|---|
| `epmc-core-phrases` | Europe PMC | 84 / 84 | complete |
| `epmc-core-broad` | Europe PMC | 153 / 153 | complete |
| `epmc-technical-aliases` | Europe PMC | 198 / 198 | complete |
| `epmc-rna-noise` | Europe PMC | 295 / 295 | complete |
| `epmc-state-axes` | Europe PMC | 68 / 68 | complete |
| `epmc-genetics` | Europe PMC | 22 / 22 | complete |
| `epmc-rna-imaging` | Europe PMC | 35 / 35 | complete |
| `epmc-classical-pre2010` | Europe PMC | 60 / 60 | complete |
| `crossref-title-scrna` | Crossref | 100 / 2425313 | ranked_sample |
| `crossref-bibliographic-noise` | Crossref | 100 / 2778712 | ranked_sample |
| `crossref-title-protocol` | Crossref | 100 / 2633684 | ranked_sample |
| `official-haploteam-papers` | Official author/laboratory publication page | 136 / 不适用 | complete |
| `epmc-priority-identifier-10.1038/nsmb.1514` | Europe PMC exact-identifier follow-up | 1 / 1 | complete |
| `epmc-priority-identifier-10.1126/science.1202142` | Europe PMC exact-identifier follow-up | 1 / 1 | complete |

Europe PMC 每条题名/摘要查询按游标读取全部返回页；详细查询、日期字段、每页返回标识、请求 URL、失败重试都保存在 JSON。Crossref 是补充发现：每个查询只取相关性排序前 100 项，其 reportedHitCount 不能解释为相关酵母论文数量。HaploTeam 为官方作者页交叉发现，不代表领域全集。

## 本地覆盖与去重

本地输入快照：224 条论文，48 个 marker 来源条目，5136 个基因条目，20 个分片。来源条目可能是同一论文的多个补充表，不能直接计为独立论文。

优先按标准化 DOI 去重，其次 PMID/PMCID 与 Europe PMC 来源＋记录 ID；没有可靠共享标识时保留不同记录。预印本和正式论文不自动合并，标题相似项另列版本关系候选。DOI 版本后缀不删除。每条记录列出匹配到的现有论文 ID、marker 来源 ID 和真实基因证据/测量行数。

| 状态 | 条目数 |
|---|---:|
| `indexed_without_gene_level_import` | 206 |
| `excluded_after_screening` | 355 |
| `new_candidate_not_imported` | 285 |
| `manual_review_needed` | 248 |
| `indexed_with_gene_level_reference` | 25 |

上述状态包含本地原有一般方法和群体组学文献；研究主题归属以 `screening.scope` 为准，不能把表中总数称为酵母 scRNA 论文数。

## 优先精读与下一轮导入

| 论文 | 年份 | 现有状态 | 推荐用途 / 下一步 |
|---|---:|---|---|
| [The genetics of transcriptional responses to stress in yeast](https://doi.org/10.64898/2026.05.29.728873) | 2026 | `new_candidate_not_imported`；基因 0 | 优先精读新的环境响应 eQTL / 状态占比分析；预印本，须检查补充表中的状态定义、基因表与重复结构，不能直接改称噪音 QTL。 |
| [Multiplex RNA single molecule FISH of inducible mRNAs in single yeast cells.](https://doi.org/10.1038/s41597-019-0106-6) | 2019 | `new_candidate_not_imported`；基因 0 | 提取 STL1/CTT1 的条件、时间和原始 RNA 计数作为噪音模型校准参考；gene-level import 需链接数据文件并保留 smFISH 标签。 |
| [EASI-ORC: A pipeline for the efficient analysis and segmentation of smFISH images for organelle-RNA colocalization measurements in yeast.](https://doi.org/10.1038/s42003-025-07682-z) | 2025 | `new_candidate_not_imported`；基因 0 | 加入独立 RNA 图像验证工具/可选数据层；当前只有 FASTQ 时作为方法准备，不作为可直接计算的胞器定位功能。 |
| [Identifying strengths and weaknesses of methods for computational network inference from single-cell RNA-seq data.](https://doi.org/10.1093/g3journal/jkad004) | 2023 | `new_candidate_not_imported`；基因 0 | 补充 GRN 方法选择和先验信息评估；追踪原始酵母数据集，不把 benchmark 输出当新的 marker 表。 |
| [High Throughput Yeast Strain Phenotyping with Droplet-Based RNA Sequencing.](https://doi.org/10.3791/61014) | 2020 | `new_candidate_not_imported`；基因 0 | 记录测量单位为克隆微菌落；可借鉴菌株 RNA 筛选，但不得并入单细胞表达噪音分布或单细胞 marker 统计。 |
| [Yeast Single-cell RNA-seq, Cell by Cell and Step by Step.](https://doi.org/10.21769/bioprotoc.3359) | 2019 | `new_candidate_not_imported`；基因 0 | 完善 raw FASTQ、UMI 结构、链特异性和定量分支的协议来源；不从协议名称推断用户样本的 read layout。 |
| [Real-time observation of transcription initiation and elongation on an endogenous yeast gene.](https://doi.org/10.1126/science.1202142) | 2011 | `new_candidate_not_imported`；基因 0 | 补充转录起始、延伸、终止与细胞周期混杂的机制参考；动态参数来自活细胞 RNA 成像，不能由普通快照直接照搬。 |
| [Single-RNA counting reveals alternative modes of gene expression in yeast.](https://doi.org/10.1038/nsmb.1514) | 2008 | `new_candidate_not_imported`；基因 0 | 保留为 2010 年以前噪音机制基准：RNA 分布、非爆发与爆发模式需由模型及测量证据区分。 |

## 2010 年以前经典层

早期研究保留其原始 assay。双荧光报告蛋白的内在/外在噪音分解不能直接等同于普通单通道 scRNA-seq 的可辨识量；群体同步周期微阵列是状态参考，不是单细胞差异表达实验。

| 论文 | 年份 | assay 线索 |
|---|---:|---|
| [Single-RNA counting reveals alternative modes of gene expression in yeast.](https://doi.org/10.1038/nsmb.1514) | 2008 | single-molecule RNA in situ hybridization |

## 状态定义与使用边界

- `indexed_with_gene_level_reference`：本地至少一个基因携带该论文来源的证据或参考测量；不表示整篇补充数据完整导入，也不表示每个基因均为直接状态 marker。
- `indexed_without_gene_level_import`：论文或来源已索引，但没有匹配到实际基因证据/测量行；可据此安排精读及补充表提取。
- `new_candidate_not_imported`：检索发现的候选，尚未进入正式目录。自动题名/摘要筛选必须进一步核对物种、assay、条件、对照与原始表。
- `manual_review_needed`：摘要不足或 assay/物种/研究层次不能确定。
- `excluded_after_screening`：保留排除理由，例如 single-cell protein 食品生产，或没有目标酵母 RNA 证据。
- `crossrefVerification`：仅核对优先缺口；未核的条目保留 `not_checked`，不能借检索命中宣称完成书目验证。

## 检索局限与失败

公开索引收录有时滞；题名摘要不一定提到酵母，只有补充材料包含酵母数据的跨物种方法可能漏检。Crossref 相关性取样不是全库系统综述。其余真菌/裂殖酵母需要独立物种标签；泛酵母不能自动升级为 S. cerevisiae。参考文献追踪尚未对所有入选文章逐条穷尽。没有宣称覆盖所有近十年论文或完成所有 marker 的基因级导入。

首次全文检索试探返回核心 5,141、噪音 12,926、状态 7,067 条；默认全文范围混入大量正文引文提及，因此未下载这些全文命中全集，改用本清单保存的题名/摘要查询。试探查询与返回数另存 `exploratoryQueries`。

- `epmc-state-axes`：complete；见 JSON 的逐次请求信息。

## 数据字段

语料包括 `searchLog`、`exploratoryQueries`、`inputInventory`、`records`、`possibleVersionPairs` 与 `counts`。`records` 不分发完整摘要，仅保留可重取的元数据链接、摘要是否存在、SHA-256 和筛选信号。`manual_review` 级判定与人工核对决定分别标注。生成时间与检索时间分开记录，复用结果不冒充重新联网验证。
