# 单细胞研究方法覆盖审查 · v25

核验日期：2026-10-18。审查对象为现有工作站的研究路线、工具、方法论文和官方源码。本报告记录最初的覆盖审查及候选来源；随后已将10个方法、22个指标和11篇净新增文献并入生产目录，复用BigSur 2025既有条目。没有运行生物学分析。

整合后目录为165个工具、309个指标、55条研究路线和224条文献，APA引用表含262个记录。新增129个文本单元提供中文、英文、法文、西班牙文和巴斯克文。现有路线保留，新增方法作为可选分支挂接；实际输入门槛以生产目录中的工具和指标为准。chooseR的培养间稳定性及scPower的试点校准分支已明确要求独立培养。已有数据不足时保留计划，不声称得到分析结果。

验收：`research/v25-methods-test.cjs`检查引用格式、输入门槛、ID关系与五语覆盖；`research/qa-csl-publication-types-v24.cjs`确认既有期刊/预印本类型修正保留。`research/v25-methods-integrate.cjs`仅写指定目录与语言资产，不生成bundle或执行生物学流程。源函数签名存于`research/v25-methods-api-signatures.json`；临时完整源码缓存已移除。

读取时目录含 20 个环节、155 个工具、55 条路线和 213 条文献。差异分布、组成、调控网络、metacell、虚拟扰动、遗传力及进化背景已有主类。本次重点补齐注释/模型校准、重复设计和方法调用，建议并入原有栏目。

检索使用原始论文、Crossref、EuropePMC和工具官方仓库。2010–2026是覆盖审查范围，不是‘已穷尽期间全部论文’的声明。检索得到的最新研究并非都适用当前Illumina scRNA数据。

## 优先级与整合

| 优先级 | 建议 | 并入现有路线 | 用途 |
|---|---|---|---|
| P0 | 比较设计的可估计性与真实重复 | audit_raw, mean_noise, noise_qtl, genotype_state | Design estimability and experimental units |
| P1 | 注释预测集合与未知状态校准 | annotation_transfer, marker_inference_audit | Prediction sets and out-of-reference annotation |
| P1 | 聚类分辨率与重抽样稳定性 | annotation_transfer, trajectory_structure, noise_components | Cluster resolution and resampling stability |
| P2 | 计数谱、表示维数与噪音层隔离 | cross_implementation_robustness, rna_measurement_length_audit, foundation_benchmark | Count spectra, representation rank and noise-layer separation |
| P1 | 有统计基线的特征与相关性选择 | marker_panel, local_covariation_modules, grn_rewiring, cross_implementation_robustness | Model-based features and correlation candidates |
| P1 | 拟时序重估与动态基因检验 | trajectory_structure, noise_cycle, marker_inference_audit | Pseudotime re-estimation in dynamic-gene tests |
| P1 | 跨培养样本的轨迹与表达曲线 | trajectory_structure, noise_cycle, state_composition | Replicate-aware trajectories and expression curves |
| P2 | 环形状态重建与周期信号分离 | noise_cycle, trajectory_structure | Cyclic state reconstruction and signal isolation |
| P2 | 真实采样时间的状态耦合 | trajectory_structure, velocity_feasibility, temporal_mechanistic_grn | State coupling across experimental time |
| P2 | 现有数据覆盖与均值/eQTL功效基线 | noise_power, count_mean_qtl_comparator | Pilot-derived coverage and mean/eQTL power baselines |

P0先补设计可识别性；P1补与注释、状态划分和表达噪音直接相关的校准；P2在确认数据条件与资源后添加。所有工具以源版本、输入层和真实统计目标为单位整合。

## 比较设计的可估计性与真实重复

每个拟合子集重新生成样本级设计矩阵，报告秩、重复层级和无法识别的系数；在原设计内决定可检验contrast。将菌株总体差异与同一菌株培养间重复分开。

**输入与额外数据**：文库、菌株、培养、处理、批次的逐样本映射；待比较的模型公式和contrast；每个状态内实际保留的样本。 只需要真实实验记录；细胞数不能补足缺失的独立培养或解开完全混杂。

**指标**：

- **设计矩阵秩与列数**：在实际拟合样本子集中记录rank(X)、ncol(X)和缺失列；满秩是线性系数可识别的必要诊断，不保证因果识别。（project_defined；rank / columns）
- **不可估计的设计系数**：limma::nonEstimable(X)报告依赖于前序列的列名；此列表依赖编码顺序，不等价于检验任意contrast。（native；coefficient_names）
- **有效培养与菌株覆盖**：按条件×状态列出独立培养、菌株、文库和细胞数；不将同一培养的分装、lane或细胞算作培养重复。（project_defined；counts）

**调用入口**：函数和签名已核对，参数对象由实际项目提供，尚未在生物学数据上执行。

```r
X <- stats::model.matrix(model_formula, data = sample_manifest)
list(rank = qr(X)$rank, columns = ncol(X), aliased = limma::nonEstimable(X))
```

版本：limma 3.68.5 official manual dated 2026-10-16；[官方源码/手册](https://bioconductor.org/packages/release/bioc/manuals/limma/man/limma.pdf)。

- model_formula：从真实比较设计定义，不预置菌株/批次的固定公式。
- sample_manifest：每行实际模型统计单位；逐状态过滤后重算。

**解释范围与前端**：

- 满秩不代表没有未测混杂。
- 单一培养内的细胞不能支撑培养间变异估计。
- 菌株关联可以使用不同菌株，但菌株效应与培养误差的分离取决于实际重复结构。
- 输入样本清单后显示实验单位树与设计交叉表。
- 根据每条研究路线展示可估计项、缺失项与无法区分项；不得用总细胞数生成统一绿色通过。
- 清楚区分计划字段、已导入记录和已计算诊断。

文献：[limma powers differential expression analyses for RNA-sequencing and microarray studies](https://doi.org/10.1093/nar/gkv007)；[Confronting false discoveries in single-cell differential expression](https://doi.org/10.1038/s41467-021-25960-2)。

## 注释预测集合与未知状态校准

给每个细胞保存一个候选标签集合及未知参考状态证据，联合报告覆盖率与集合大小。在完整菌株/研究留出集评估；跨菌株分布变化时测量覆盖，不自动沿用i.i.d.保证。

**输入与额外数据**：有同一标签轴真值的酵母参考和query AnnData；对齐基因；训练、校准、评估来源划分；独立菌株/研究的评估标签。 参考标签及校准样本不可由当前模型自己生成；周期、应激、代谢分别建标签轴。

**指标**：

- **预测集合经验覆盖**：独立有真值评估细胞中真值落入预测集合的比例；分别按菌株、状态及RNA深度分层。（project_defined；fraction）
- **注释集合大小与空集比例**：逐细胞预测集合的标签数，以及无标签、单标签和多标签比例；空集并不自动代表新生物学状态。（project_defined；labels / fraction）
- **参考外分数及误报**：保留OOD检验p值，在有ID/OOD真值的留出评估集计算FPR、召回和FDR；FPR控制不是FDR控制。（native_and_project_defined；p_value / fraction）

**调用入口**：函数和签名已核对，参数对象由实际项目提供，尚未在生物学数据上执行。

```python
from conformalSC_annotator import ConformalSCAnnotator
annotator = ConformalSCAnnotator(query_copy, var_query_gene_column_name='systematic_id', underlying_model='celltypist')
annotator.configure(reference_path=yeast_reference, cell_names_column=label_axis, alpha=error_levels, **validated_configuration)
annotator.annotate()
```

版本：Git commit pinned; no tagged software release verified；[官方源码/手册](https://github.com/digital-medicine-research-group-UNAV/conformalized_single_cell_annotator/blob/526bad858b120137d01267bde7ccb5dda5431308/conformalSC_annotator.py)。

- error_levels：由预先定义的容错水平生成，不把论文示例当固定阈值。
- validated_configuration：OOD、训练/校准方式及内部归一化必须与当前代码核对。
- 当前源代码默认按细胞划分；严格按菌株/培养校准需要额外适配，不能声称上述调用已实现分组共形保证。
- 使用query副本；celltypist分支在内部归一化/对数化，不能将重复变换数据误传成raw。

**解释范围与前端**：

- 人类参考模型不能直接注释酵母。
- 类别预测集合与跨标签轴共现不是同一件事。
- OOD也可由批次或低覆盖导致；需要分子QC和marker证据解释。
- marker或细胞标签同时显示候选标签集合、参考范围和校准来源。
- 按未知/冲突/多候选筛选，而不是强行选择最高分。
- 不要把模型softmax、SingleR差值和共形p值合并成同一‘置信概率’。

文献：[Conformal inference for reliable single cell RNA-seq annotation](https://doi.org/10.1093/bioinformatics/btaf521)。

## 聚类分辨率与重抽样稳定性

重复子抽样并重新建图聚类，比较共聚类频率与簇级稳定性。用于避免把不稳定分割当噪音分析条件，同时保留连续状态路线。

**输入与额外数据**：同一细胞集合、表示空间、完整聚类标签和预先定义的分辨率范围；按菌株/培养分层的抽样记录。 不要求新组学；生物学准确性仍需要独立标签或marker参考。

**指标**：

- **细胞对共聚类频率**：在两个细胞都被抽中的重复中，同簇次数所占比例；记录实际共同入样次数。（native；fraction）
- **簇级重抽样稳定性**：在共聚类频率诱导的不相似度上记录轮廓分数分布与簇级汇总；另按完整菌株留出检查标签变化。（native_and_project_defined；silhouette / fraction）

**调用入口**：函数和签名已核对，参数对象由实际项目提供，尚未在生物学数据上执行。

```r
source('R/pipeline.R')
clusters <- multiple_cluster(obj, n = resampling_runs, size = sampling_fraction, npcs = retained_dimensions, res = resolution, reduction = representation, assay = assay_name)
```

版本：Git commit pinned; repository script interface；[官方源码/手册](https://github.com/rbpatt2019/chooseR/blob/410bdbfaebcbc57df45176491545a1165e3c6fc5/R/pipeline.R)。

- 应在固定chooseR checkout内运行，source路径属于该工具仓库。
- 原脚本针对旧Seurat接口；先运行版本兼容性测试，再接入当前Seurat对象。
- 原生随机细胞子抽样与本项目需要的培养/菌株级重抽样分开报告，后者需要额外包装。
- 共聚类矩阵具有二次内存开销；先规划分层子集或稀疏实现。

**解释范围与前端**：

- 稳定簇不自动是离散生物学细胞类型。
- 最稳定的低分辨率可能把有意义的稀有状态合并。
- 状态标签稳定性不能代替原始分子可信度。
- 提供分辨率轨迹图和不稳定边界标记，显示每次分割对噪音候选的影响。
- 允许保存多个命名聚类版本，禁止覆盖唯一的cell_state列。

文献：[Selecting single cell clustering parameter values using subsampling-based robustness metrics](https://doi.org/10.1186/s12859-021-03957-4)。

## 计数谱、表示维数与噪音层隔离

将BiPCA作为标准归一化/PCA的比较分支，记录二次方差模型与谱拟合，再评价邻域、低RNA状态与marker保留。保持噪音推断使用独立保留的原始分子计数。

**输入与额外数据**：非负原始计数矩阵、稀疏度过滤记录和样本身份；仅将输出用作表示空间对照。 无额外组学；模拟技术噪音和真实状态差异用来校准适用范围。

**指标**：

- **谱估计秩与拟合**：保存mp_rank、拟合谱和方差参数；检查模型拟合偏离及细胞/基因过滤敏感性。（native；rank / fit statistics）
- **表示变化对噪音候选的影响**：比较各表示得到的状态标签后，在同一原始计数层重算噪音；不对去噪重建矩阵的方差解释为真实剩余噪音。（project_defined；effect / rank stability）

**调用入口**：函数和签名已核对，参数对象由实际项目提供，尚未在生物学数据上执行。

```python
import bipca
operator = bipca.BiPCA(**resource_checked_options)
operator.fit(count_matrix)
operator.get_plotting_spectrum()
estimated_rank = operator.mp_rank
```

版本：Git commit pinned; 2025 method remains a preprint in checked metadata；[官方源码/手册](https://github.com/KlugerLab/bipca/blob/8842e4ce6d2d7c8a4bbf686591f4dc9c7c30b051/python/bipca/bipca.py)。

- resource_checked_options：稀疏/稠密SVD、维度、内存、线程和随机种子纳入资源估算。
- 不照抄教程中的全矩阵toarray或全SVD用于群体尺度数据。
- 模型基于低秩信号及方差函数等假设；拟合失败时保留对照结果。

**解释范围与前端**：

- 统计谱中的noise并不等价于项目的生物学表达噪音。
- 去噪重建会主动收缩方差，不能直接作为noise-QTL表型。
- 表示层、可视化层与推断计数层分开显示。
- 预印本标签、源版本和资源需求与运行按钮并列。

文献：[Principled PCA separates signal from noise in omics count data](https://doi.org/10.1101/2025.02.03.636129)。

## 有统计基线的特征与相关性选择

使用BigSur的修正Fano与相关统计作为特征/网络候选对照，再把候选放回原有留出菌株和培养重复验证框架。复用现有2025论文记录，不重复新增同一DOI。

**输入与额外数据**：原始UMI层；菌株/状态分层；拟合共同CV与检验基因集合；原始feature选择结果作为对照。 不需要人类训练模型；需要校准计数模型、状态混合和相关结构。

**指标**：

- **修正Fano及特征检验**：保存var.mc_Fano、var.FDR_adj_pvalue、拟合CV与被选基因；选择显著性针对方法的零模型。（native；corrected_fano / adjusted_p）
- **计数模型相关候选**：保存修正相关与多重检验结果，并记录不同状态组成、UMI深度及培养重抽样下的边稳定性。（native_and_project_defined；correlation / adjusted_p / stability）

**调用入口**：函数和签名已核对，参数对象由实际项目提供，尚未在生物学数据上执行。

```python
from BigSur.feature_selection import mcfano_feature_selection
mcfano_feature_selection(adata_copy, layer='counts', **calibrated_feature_options)
```

版本：0.0.8 (pyproject.toml), source commit pinned；[官方源码/手册](https://github.com/landerlabcode/BigSur/blob/cb6343ac5e45da374ff0d34ffb98766969be3c39/src/BigSur/feature_selection.py)。

- calibrated_feature_options：共同CV、基因数、显著性和计算资源都需记录来源；无统一酵母推荐阈值。
- 相关模块单独核查源码版本：README说明相关代码曾仅在GitHub源码中提供，不能假设所有PyPI版本一致。
- 保留完整原始基因集；不能只对先筛选的高变基因声称全基因组noise发现。

**解释范围与前端**：

- 显著高变特征不是细胞状态marker验证，也不是noise-QTL结果。
- 相关性不能给GRN边提供方向或因果证明。
- 原仓库将2024相关论文写成Silkwood 2023；网站应采用经Crossref/EuropePMC核对的2024正式发表年。
- 区分‘特征选择’‘注释marker’‘噪音候选’三类用途tag。
- 工具卡复用已存在文献lit-780ec4215f2f；链接真实输出字段。

文献：[Statistically principled feature selection for single cell transcriptomics](https://doi.org/10.1186/s12859-025-06240-y)；[Leveraging gene correlations in single cell transcriptomic data](https://doi.org/10.1186/s12859-024-05926-z)。

## 拟时序重估与动态基因检验

对每次细胞子抽样重新推断拟时序，将排序不确定性传入均值趋势检验；与固定排序tradeSeq结果对照。周期分析需明示闭环和跨原点处理。

**输入与额外数据**：基因×细胞原始计数；原始排序表；每次子抽样重新推断的排序表；已声明的轨迹结构。 独立周期证据或已知状态顺序用于判断轨迹是否存在；没有真实时间也可比较状态，但不能计量生长时间。

**指标**：

- **排序重抽样一致性**：在共同细胞上比较排序与方向；环形相位先对齐原点和方向，再评估环形差异。（project_defined；rank/circular agreement）
- **含排序不确定性的动态基因证据**：同时保存固定排序与重抽样检验的p值、校正值及失败拟合；它们检验均值趋势，不是方差趋势。（native_and_project_defined；p_value / adjusted_p）

**调用入口**：函数和签名已核对，参数对象由实际项目提供，尚未在生物学数据上执行。

```r
result <- PseudotimeDE::runPseudotimeDE(gene.vec = test_genes, ori.tbl = full_order, sub.tbl = resampled_orders, mat = raw_counts, model = 'nb', k = spline_basis_size, seed = random_seed)
```

版本：0.99.0; source commit pinned；[官方源码/手册](https://github.com/SONGDONGYUAN1994/PseudotimeDE/blob/c278a487e11159b8c7f046f3943699e7ec232067/R/runPseudotimeDE.R)。

- full_order与resampled_orders按官方要求保存cell及pseudotime列。
- 重抽样需要重算排序，不能仅截取原排序。
- spline_basis_size和random_seed存入运行清单；若sub.tbl为空，不能声称已传播拟时序不确定性。

**解释范围与前端**：

- 原作者明确指出：数据没有潜在轨迹、却用同一数据的PC强造排序时，仍可能发生double dipping和假阳性。
- 该方法未自动处理培养重复或菌株间相关；跨组推断需另行建模。
- 排序来源、重估次数与平均表达/方差目标分开显示。
- 原始顺序、候选根、反向顺序和周期原点允许保存成不同方案，结果可并排比较。

文献：[PseudotimeDE: inference of differential gene expression along cell pseudotime with well-calibrated p-values from single-cell RNA sequencing data](https://doi.org/10.1186/s13059-021-02341-y)。

## 跨培养样本的轨迹与表达曲线

用Lamian比较样本间表达曲线与轨迹结构；与现有condiments和tradeSeq形成‘结构/均值/噪音’分层。不要把其log表达残差解释为原始RNA分子的随机噪音。

**输入与额外数据**：细胞到培养样本映射；样本级协变量设计；统一可比较的拟时序；库大小归一化并log变换的表达副本。 需要独立生物学样本覆盖；只有单个样本不能估计样本间不确定性。

**指标**：

- **跨样本轨迹均值与趋势差异**：保存overall、meanDiff、trendDiff的统计与调整结果及拟合参数；明确测试的是协变量如何改变均值曲线。（native；p_value / adjusted_p / curve）
- **分支支持与样本组成变化**：保存轨迹重抽样支持和分支样本比例检验；核对不确定性来自细胞抽样还是样本差异。（native；support / composition effect）

**调用入口**：函数和签名已核对，参数对象由实际项目提供，尚未在生物学数据上执行。

```r
fit <- Lamian::lamian_test(expr = log_expression_copy, cellanno = cell_sample_map, pseudotime = pseudotime, design = sample_design, testvar = target_column, test.type = 'Variable', test.method = 'permutation', permuiter = permutation_runs, fix.all.zero = FALSE, ncores = allocated_cores)
```

版本：0.99.3；[官方源码/手册](https://github.com/Winnie09/Lamian/blob/bf7d1285393d8e3277235faa2ea4a7569191e350/R/lamian_test.R)。

- 官方输入为log归一化矩阵，不是raw UMI。
- 源码默认fix.all.zero=TRUE会给样本内零方差基因加随机值；噪音项目显式关闭并预先检查不可拟合基因，失败则报告，不把加值后的矩阵回写。
- 小样本置换空间、设计秩、培养层级及同状态覆盖必须先核对。
- 包含org.Hs.eg.db依赖不意味着核心轨迹检验只支持人；任何富集功能需另用酵母注释。

**解释范围与前端**：

- 表达均值曲线变化不是条件化噪音变化。
- 分支或拟时序不是菌株进化树。
- 加随机值修复退化输入可能改变变异结构，需要保留和报告原数据。
- 轨迹页面并列样本覆盖、拟时序区间与拟合失败信息。
- 区分‘表达曲线比较’和‘周期噪音比较’，共享状态坐标但使用不同计数层与模型。

文献：[A statistical framework for differential pseudotime analysis with multiple single-cell RNA-seq samples](https://doi.org/10.1038/s41467-023-42841-y)。

## 环形状态重建与周期信号分离

用scPrisma建立周期顺序对照，比较独立marker相位与原始空间闭环支持。仅把过滤/增强矩阵用于定位周期信号，再回到原始计数估计噪音。

**输入与额外数据**：明确归一化的表达副本；覆盖完整周期的酵母相位证据或部分顺序；每个菌株的状态覆盖。 无需spliced/unspliced，但需要验证闭环假设；最好有独立周期参考。

**指标**：

- **周期排序与独立相位一致性**：比较对齐后的环形相位、重复拟合稳定性以及不同菌株的相位覆盖；不把人为增强后的圆环当独立证据。（project_defined；circular agreement / coverage）
- **周期增强和过滤敏感性**：记录哪些基因及局部表达被变换，以及在未变换原始计数上得到的噪音结论是否保持。（project_defined；matrix change / noise-effect stability）

**调用入口**：函数和签名已核对，参数对象由实际项目提供，尚未在生物学数据上执行。

```python
from scPrisma import algorithms
E, reconstructed = algorithms.reconstruction_cyclic(normalized_copy)
order = algorithms.e_to_range(reconstructed)
```

版本：0.0.5；[官方源码/手册](https://github.com/nitzanlab/scPrisma/blob/b7bc40b7277654b917f0dae45f65935fdd3328d4/scPrisma/algorithms.py)。

- 前处理、随机种子与优化配置固定；部分prior只能来自独立证据。
- 不将文档中G1/S/G2M示例标签直接替换为未经确认的酵母周期阶段。
- 构造细胞排列矩阵前估算二次内存开销。

**解释范围与前端**：

- 周期模板本身可能强化闭环，不能单独证明细胞循环。
- 周期相位无自然分钟尺度或祖先后代含义。
- 增强/过滤后表达矩阵不可直接作为表达噪音真值。
- 周期、线性、分支模型分开选择；展示独立证据和模型假设。
- 增强图与原始计数图并列并清楚命名。

文献：[scPrisma infers, filters and enhances topological signals in single-cell data using spectral template matching](https://doi.org/10.1038/s41587-023-01663-5)。

## 真实采样时间的状态耦合

以moscot TemporalProblem生成相邻时间点的状态耦合，必要时进入CellRank RealTimeKernel；用时间留出、无时间对照和边际敏感性检查。无需RNA velocity，但不是对稀少剪接信息的万能替代。

**输入与额外数据**：同一过程可比较的多个真实采样时间；一致表达表示；培养/菌株/批次记录；明确质量守恒或增长边际设定。 必须有真实采样时间；可选独立增长信息。空间坐标、ATAC、谱系条码属于其他可选分支，不能由scRNA填造。

**指标**：

- **时间点状态转移质量与不确定性**：保留耦合、边际残差、收敛状态和群体转移质量；转移熵与耦合稀疏化敏感性分开报告。（native_and_project_defined；mass / convergence / entropy）
- **时间留出预测误差**：在真实时间留出后比较预测和观测的状态/表达分布，并与无变化、最近时间及随机耦合基线比较。（project_defined；distribution discrepancy）

**调用入口**：函数和签名已核对，参数对象由实际项目提供，尚未在生物学数据上执行。

```python
from moscot.problems.time import TemporalProblem
transport = TemporalProblem(adata_copy).prepare(time_key='sampling_time', joint_attr=representation_key)
transport.solve(**calibrated_transport_options)
```

版本：Source commit pinned; Python >=3.11 declared in pyproject.toml；[官方源码/手册](https://github.com/theislab/moscot/blob/d6e1bb10398cb9ad1e8577552439a6c571a4903a/src/moscot/problems/time/_lineage.py)。

- calibrated_transport_options：epsilon、tau_a/tau_b、成本尺度、rank、收敛/内存参数分别记录。
- 不直接调用人/鼠增殖和凋亡默认基因集；酵母增长边际另验证。
- 同一个时间点的不同菌株并不是时间序列；不可按系统发育顺序伪造采样时间。

**解释范围与前端**：

- OT耦合不是单细胞真实谱系追踪。
- 状态耦合不能重建酵母种群的历史进化轨迹。
- 当前只有raw FQ且尚无时间记录确认时，应显示额外数据待确认。
- 真实时间字段未导入时保留方案卡，明确依赖，不能生成已有动力学结果。
- 分清真实时间、周期相位、拟时序和系统发育位置四种坐标。

文献：[Mapping cells through time and space with moscot](https://doi.org/10.1038/s41586-024-08453-2)。

## 现有数据覆盖与均值/eQTL功效基线

把scPower用于解释基因可检测性与均值/eQTL参考功效；表达噪音功效仍用现有噪音测量模型和分层模拟。已测数据以覆盖和精度分析为主，不凭空填实验预算。

**输入与额外数据**：来自酵母数据的均值/离散度分布、每菌株状态比例、read-to-UMI关系和效应情景；eQTL额外需要合适遗传设计。 均值/覆盖对照可使用现有scRNA；遗传功效需真实等位频率、倍性、相关结构及效应假设。

**指标**：

- **可检测性与统计功效分解**：区分目标基因在样本中可检测的概率与满足所定义均值/eQTL检验功效；输出所用效应、样本数和深度情景。（native；probability）
- **酵母先验与默认先验敏感性**：记录从本数据估计的参数及替换默认参数后的曲线变化；模拟结果只适用于已声明模型。（project_defined；scenario contrast）

**调用入口**：函数和签名已核对，参数对象由实际项目提供，尚未在生物学数据上执行。

```r
power_result <- do.call(scPower::power.general.withDoublets, yeast_pilot_parameters)
```

版本：1.0.4；[官方源码/手册](https://github.com/heiniglab/scPower/blob/82039da57fb53839c7c88bdc6745aced4b7017b9/R/power.R)。

- yeast_pilot_parameters按官方函数签名提供nSamples、nCells、readDepth、ct.freq、type、参考效应、read.umi.fit、gamma.mixed.fits、ct及disp.fun.param等。
- 显式替换nGenes、双细胞率模型、mappingEfficiency、可检出规则和多重检验假设，不能沿用人类示例。
- 函数内部eQTL模拟含二倍体/HWE基因型逻辑；酵母不同倍性、LD和群体亲缘需专用模拟校准。

**解释范围与前端**：

- scPower均值/eQTL功效不等于表达噪音QTL功效。
- 没有真实重复和效应假设时不能给出单一可信的所需细胞数。
- 先验来源和目标检验必须可查看；人类默认值不预填成酵母推荐值。
- 已测数据模式默认展示深度/样本/状态覆盖，实验预算只作为用户有实际成本时的可选页。

文献：[scPower accelerates and optimizes the design of multi-sample single cell transcriptomic studies](https://doi.org/10.1038/s41467-021-26779-7)。

## 需要保持的功能边界

- **Human pretrained cell-state models**：Geneformer/scGPT and mammalian reference signatures are already listed as transfer benchmarks. They cannot substitute for yeast references or be reported as directly usable yeast annotators.
- **Cell–cell communication**：Ligand–receptor catalogues and mammalian complexes cannot be transferred wholesale to yeast. Yeast pheromone/signalling programs can be described; signalling flux and physical communication require matching prior evidence/design.
- **Spatial inference, lineage tracing, metabolic RNA labelling**：Keep as input-gated extensions. Raw short-read scRNA does not itself supply spatial coordinates, lineage barcodes or labelled/new RNA fractions.
- **Evolution from pseudotime/velocity**：Retain separate genotype/phylogeny appendix. Cellular-state order, cycling phase and species/strain evolutionary history are different estimands.
- **Virtual perturbation as established causality**：Existing CellOracle/scTenifoldKnk/CPA/GEARS/CellOT/Systema routes already cover this class. Add split/negative-control requirements there rather than duplicate tools or claim effects from unperturbed snapshots.
- **More embedding names as new discoveries**：PCA/UMAP/t-SNE/PaCMAP-style visualisations support exploration. Neighbourhood and geometry validation matters more than treating every projection as an independent biological result.

## 核验结果

提出10项修订、22个具体指标，所有现有路线/工具/环节ID已解析；Python调用片段已通过语法检查，R函数参数已对照官方源码。12个DOI均有Crossref与EuropePMC记录，其中BigSur特征选择论文复用现有记录，其余11个为目录新增候选。BiPCA仍按已核对的预印本记录显示。

9个GitHub仓库的当前源码提交已固定在v25-methods-source-audit.json；limma手册确认3.68.5。源API与文献核对不等同于本机安装成功、集群兼容性通过或已完成酵母数据验证。

结构化整合入口：research/v25-methods-proposals.json。原目录清单：research/v25-methods-inventory.json。网络核验收据：research/v25-methods-source-audit.json。
