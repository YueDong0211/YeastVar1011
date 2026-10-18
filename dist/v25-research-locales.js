'use strict';
// v25 verified methods; source text in the data catalogue.
(()=>{const text={
  "官方调用与诊断": {
    "en": "Official API and diagnostics",
    "fr": "API officielle et diagnostics",
    "es": "API oficial y diagnósticos",
    "eu": "API ofiziala eta diagnostikoak"
  },
  "原始方法论文": {
    "en": "Original methods paper",
    "fr": "Article méthodologique original",
    "es": "Artículo metodológico original",
    "eu": "Jatorrizko metodo-artikulua"
  },
  "需适配": {
    "en": "Adaptation required",
    "fr": "Adaptation requise",
    "es": "Requiere adaptación",
    "eu": "Egokitzapena behar da"
  },
  "通用方法": {
    "en": "General method",
    "fr": "Méthode générale",
    "es": "Método general",
    "eu": "Metodo orokorra"
  },
  "方法与诊断": {
    "en": "Methods and diagnostics",
    "fr": "Méthodes et diagnostics",
    "es": "Métodos y diagnósticos",
    "eu": "Metodoak eta diagnostikoak"
  },
  "调用模板；执行后记录版本、参数与诊断。": {
    "en": "Invocation template; record versions, parameters and diagnostics after execution.",
    "fr": "Modèle d’appel ; consigner versions, paramètres et diagnostics après exécution.",
    "es": "Plantilla de llamada; registrar versiones, parámetros y diagnósticos tras la ejecución.",
    "eu": "Dei-txantiloia; exekutatu ondoren, erregistratu bertsioak, parametroak eta diagnostikoak."
  },
  "派生诊断需实现项目导出；保留原始工具输出及失败状态。": {
    "en": "Derived diagnostics need a project exporter; retain native outputs and failure states.",
    "fr": "Les diagnostics dérivés nécessitent un exporteur de projet ; conserver résultats natifs et états d’échec.",
    "es": "Los diagnósticos derivados requieren un exportador del proyecto; conservar resultados nativos y fallos.",
    "eu": "Diagnostiko eratorriek proiektuko esportatzailea behar dute; gorde jatorrizko emaitzak eta hutsegiteak."
  },
  "按菌株、独立培养、状态及分析版本分层": {
    "en": "Stratified by strain, independent culture, state and analysis version",
    "fr": "Stratifié par souche, culture indépendante, état et version d’analyse",
    "es": "Estratificado por cepa, cultivo independiente, estado y versión de análisis",
    "eu": "Anduiaren, kultibo independentearen, egoeraren eta analisi-bertsioaren arabera estratifikatua"
  },
  "按下列输出字段分别记录": {
    "en": "Recorded separately for the output fields below",
    "fr": "Consigné séparément pour les champs ci-dessous",
    "es": "Registrado por separado para los campos siguientes",
    "eu": "Beheko irteera-eremuetarako bereizita erregistratua"
  },
  "保留实际纳入的基因、细胞及样本集合": {
    "en": "Retain the actual gene, cell and sample sets assessed",
    "fr": "Conserver les ensembles de gènes, cellules et échantillons évalués",
    "es": "Conservar los conjuntos de genes, células y muestras evaluados",
    "eu": "Gorde ebaluatutako gene, zelula eta lagin multzoak"
  },
  "方法证据；不将文中基因自动导入酵母marker库。": {
    "en": "Methods evidence; genes in the paper are not automatically imported as yeast markers.",
    "fr": "Preuve méthodologique ; les gènes cités ne deviennent pas automatiquement des marqueurs de levure.",
    "es": "Evidencia metodológica; los genes del artículo no se importan automáticamente como marcadores de levadura.",
    "eu": "Metodo-ebidentzia; artikuluko geneak ez dira automatikoki legamia-markatzaile gisa inportatzen."
  },
  "方法迁移至酿酒酵母；尚未在1011群体中验证": {
    "en": "Method transfer to S. cerevisiae; not yet validated in the 1011 population",
    "fr": "Transfert à S. cerevisiae ; non validé dans la population 1011",
    "es": "Transferencia a S. cerevisiae; aún no validada en la población 1011",
    "eu": "S. cerevisiae-ra egokitzeko metodoa; 1011 populazioan balioztatu gabe"
  },
  "方法": {
    "en": "Method",
    "fr": "Méthode",
    "es": "Método",
    "eu": "Metodoa"
  },
  "可迁移方法": {
    "en": "Transferable method",
    "fr": "Méthode transférable",
    "es": "Método transferible",
    "eu": "Metodo transferigarria"
  },
  "固定版本与调用接口": {
    "en": "Pinned version and API",
    "fr": "Version et API fixées",
    "es": "Versión y API fijadas",
    "eu": "Finkatutako bertsioa eta APIa"
  },
  "执行状态": {
    "en": "Execution status",
    "fr": "État d’exécution",
    "es": "Estado de ejecución",
    "eu": "Exekuzio-egoera"
  },
  "培养重复不能由同一培养中的细胞、分装或测序lane代替。": {
    "en": "Cells, aliquots and sequencing lanes from one culture do not replace independent cultures.",
    "fr": "Les cellules, aliquotes et lanes d’une même culture ne remplacent pas des cultures indépendantes.",
    "es": "Las células, alícuotas y carriles de un mismo cultivo no sustituyen cultivos independientes.",
    "eu": "Kultibo bereko zelulek, alikuotek eta sekuentziazio-lerroek ez dituzte kultibo independenteak ordezkatzen."
  },
  "表达噪音仍在原始分子计数层估计。": {
    "en": "Estimate expression noise in the original molecule-count layer.",
    "fr": "Estimer le bruit d’expression dans la couche originale de comptages moléculaires.",
    "es": "Estimar el ruido de expresión en la capa original de recuentos moleculares.",
    "eu": "Estimatu adierazpen-zarata jatorrizko molekula-kontaketen geruzan."
  },
  "依据酵母试点数据与预先声明的敏感性分析选择。": {
    "en": "Choose using yeast pilot data and prespecified sensitivity analyses.",
    "fr": "Choisir selon les données pilotes de levure et les analyses de sensibilité prédéfinies.",
    "es": "Elegir según datos piloto de levadura y análisis de sensibilidad predefinidos.",
    "eu": "Aukeratu legamiaren datu pilotuen eta aurrez zehaztutako sentikortasun-analisien arabera."
  },
  "论文与软件来源已核对；运行环境与酵母适用性待验证。": {
    "en": "Paper and software sources checked; runtime compatibility and yeast applicability remain to be validated.",
    "fr": "Sources scientifiques et logicielles vérifiées ; compatibilité d’exécution et applicabilité à la levure à valider.",
    "es": "Fuentes científicas y de software verificadas; quedan por validar la ejecución y la aplicabilidad a levadura.",
    "eu": "Artikuluaren eta softwarearen iturriak egiaztatuta; exekuzioa eta legamiarako egokitasuna balioztatu behar dira."
  },
  "审查比较设计、混杂与真实重复": {
    "en": "Audit design estimability, confounding and replication",
    "fr": "Auditer estimabilité, confusion et réplication",
    "es": "Auditar estimabilidad, confusión y replicación",
    "eu": "Ikuskatu diseinuaren estimagarritasuna, nahastea eta erreplikazioa"
  },
  "样本清单、模型公式与预设对比；逐行区分菌株、培养、文库及批次。": {
    "en": "Sample manifest, model formula and planned contrasts, with separate strain, culture, library and batch identifiers.",
    "fr": "Manifeste, formule et contrastes prévus, avec identifiants distincts de souche, culture, bibliothèque et lot.",
    "es": "Manifiesto, fórmula y contrastes previstos, con identificadores separados de cepa, cultivo, biblioteca y lote.",
    "eu": "Laginen manifestua, eredu-formula eta aurreikusitako kontrasteak; andui, kultibo, liburutegi eta lotearen identifikatzaile bereiziak."
  },
  "设计矩阵秩、别名系数与真实重复覆盖表": {
    "en": "Design rank, aliased coefficients and replication coverage",
    "fr": "Rang du plan, coefficients aliasés et couverture des répétitions",
    "es": "Rango del diseño, coeficientes no identificables y cobertura de réplicas",
    "eu": "Diseinuaren heina, koefiziente aliasatuak eta errepliken estaldura"
  },
  "结合设计矩阵秩、编码方式与目标 contrast 审查混杂和可估计性；分别建模菌株关联与菌株内培养变异。": {
    "en": "Assess confounding and estimability jointly from design-matrix rank, coding and the target contrast; model strain associations and within-strain culture variation separately.",
    "fr": "Évaluer confusion et estimabilité selon le rang, le codage et le contraste ciblé ; modéliser séparément les associations entre souches et la variation entre cultures d’une même souche.",
    "es": "Evaluar confusión y estimabilidad según el rango, la codificación y el contraste objetivo; modelar por separado las asociaciones entre cepas y la variación entre cultivos de una cepa.",
    "eu": "Ebaluatu nahastea eta estimagarritasuna matrizearen mailarekin, kodetzearekin eta xede-kontrastearekin; modelatu bereizita anduien asoziazioak eta andui barruko kulturen aldakortasuna."
  },
  "在每个实际拟合的样本与状态子集中重新构建设计矩阵。": {
    "en": "Rebuild the design matrix for every fitted sample and state subset.",
    "fr": "Reconstruire le plan pour chaque sous-ensemble ajusté d’échantillons et d’états.",
    "es": "Reconstruir el diseño para cada subconjunto ajustado de muestras y estados.",
    "eu": "Berreraiki diseinu-matrizea doitutako lagin eta egoeren azpimultzo bakoitzerako."
  },
  "保形注释集合与参考外状态识别": {
    "en": "Conformal label sets and out-of-reference detection",
    "fr": "Ensembles d’annotations conformes et détection hors référence",
    "es": "Conjuntos de etiquetas conformes y detección fuera de referencia",
    "eu": "Etiketa multzo konformalak eta erreferentziaz kanpoko detekzioa"
  },
  "带独立验证标签的酵母参考与查询计数；按菌株或培养分开训练、校准和测试。": {
    "en": "Yeast reference and query counts with independent validation labels; separate training, calibration and test groups by strain or culture.",
    "fr": "Référence de levure et comptages requêtes avec labels indépendants ; séparer entraînement, calibration et test par souche ou culture.",
    "es": "Referencia de levadura y recuentos de consulta con etiquetas independientes; separar entrenamiento, calibración y prueba por cepa o cultivo.",
    "eu": "Legamiaren erreferentzia eta kontsulta-kontaketak, balioztapen-etiketa independenteekin; banatu entrenamendua, kalibrazioa eta testa anduika edo kultiboka."
  },
  "候选标签集合、集合大小、验证覆盖率与参考外分数": {
    "en": "Label sets, set sizes, validation coverage and out-of-reference scores",
    "fr": "Ensembles de labels, tailles, couverture validée et scores hors référence",
    "es": "Conjuntos de etiquetas, tamaños, cobertura validada y puntuaciones fuera de referencia",
    "eu": "Etiketa multzoak, tamainak, balioztapen-estaldura eta erreferentziaz kanpoko puntuazioak"
  },
  "现有实现按细胞随机划分；菌株分组需适配器。跨菌株分布变化时不继承覆盖保证。CellTypist分支内部归一化，使用独立计数副本；不用人类预训练标签解释酵母。": {
    "en": "The implementation splits cells randomly; strain-level splitting needs an adapter. Coverage guarantees do not automatically transfer across strain shifts. The CellTypist branch normalizes internally: use a count copy and a yeast reference.",
    "fr": "L’implémentation répartit les cellules aléatoirement ; une partition par souche nécessite un adaptateur. La garantie de couverture ne se transfère pas automatiquement. La branche CellTypist normalise en interne : utiliser une copie des comptages et une référence de levure.",
    "es": "La implementación divide células al azar; separar por cepa requiere adaptación. La garantía de cobertura no se transfiere automáticamente entre cepas. CellTypist normaliza internamente: usar una copia de recuentos y referencia de levadura.",
    "eu": "Inplementazioak zelulak ausaz banatzen ditu; anduikako banaketak egokitzailea behar du. Estaldura-bermea ez da automatikoki anduien artean transferitzen. CellTypist adarrak barruan normalizatzen du: erabili kontaketen kopia eta legamia-erreferentzia."
  },
  "指定酵母参考和单一注释轴；周期、应激等轴分别校准。": {
    "en": "Specify the yeast reference and one annotation axis; calibrate cycle and stress axes separately.",
    "fr": "Spécifier la référence de levure et un axe ; calibrer séparément cycle et stress.",
    "es": "Especificar referencia de levadura y un eje; calibrar ciclo y estrés por separado.",
    "eu": "Zehaztu legamia-erreferentzia eta anotazio-ardatz bat; kalibratu zikloa eta estresa bereizita."
  },
  "预先声明误差目标与拆分种子，并用独立菌株检验覆盖率。": {
    "en": "Prespecify error targets and split seed, then assess coverage on independent strains.",
    "fr": "Prédéfinir les cibles d’erreur et la graine, puis évaluer la couverture sur des souches indépendantes.",
    "es": "Predefinir errores objetivo y semilla, y evaluar cobertura en cepas independientes.",
    "eu": "Aurrez zehaztu errore-helburuak eta hazia, eta ebaluatu estaldura andui independenteetan."
  },
  "聚类分辨率与培养间稳定性评估": {
    "en": "Cluster resolution and between-culture stability",
    "fr": "Résolution des groupes et stabilité entre cultures",
    "es": "Resolución de grupos y estabilidad entre cultivos",
    "eu": "Klusterren bereizmena eta kultiboen arteko egonkortasuna"
  },
  "表达对象、候选分辨率及真实培养分组；另保留每次抽样的细胞清单。": {
    "en": "Expression object, candidate resolutions and independent culture groups, retaining the cell list for each resample.",
    "fr": "Objet d’expression, résolutions candidates et cultures indépendantes ; conserver les cellules de chaque rééchantillonnage.",
    "es": "Objeto de expresión, resoluciones candidatas y cultivos independientes; conservar las células de cada remuestreo.",
    "eu": "Adierazpen-objektua, bereizmen hautagaiak eta kultibo independenteak; gorde birlaginketa bakoitzeko zelulak."
  },
  "共聚类概率、轮廓稳定性及留出培养复现": {
    "en": "Co-clustering probabilities, silhouette stability and held-out culture replication",
    "fr": "Probabilités de co-classement, stabilité de silhouette et réplication sur cultures réservées",
    "es": "Probabilidades de coagrupación, estabilidad de silueta y replicación en cultivos reservados",
    "eu": "Baterako klusterizazio-probabilitateak, silueta-egonkortasuna eta kultibo erreserbatuetako erreplikazioa"
  },
  "原生chooseR随机抽细胞；培养分块与留出验证需项目适配，不能混作原生输出。稳定群不等于离散细胞类型。先检查旧版Seurat接口与成对矩阵内存。": {
    "en": "Native chooseR resamples cells; culture blocks and holdout validation need a project adapter. Stable clusters do not establish discrete cell types. Check legacy Seurat compatibility and pairwise-matrix memory.",
    "fr": "chooseR rééchantillonne les cellules ; blocs de cultures et validation réservée nécessitent un adaptateur. Un groupe stable ne prouve pas un type cellulaire discret. Vérifier l’ancienne API Seurat et la mémoire des matrices par paires.",
    "es": "chooseR remuestrea células; los bloques de cultivo y validación reservada requieren adaptación. Un grupo estable no demuestra un tipo celular discreto. Revisar la API antigua de Seurat y la memoria de matrices por pares.",
    "eu": "chooseR-ek zelulak birlagintzen ditu; kultibo-blokeek eta erreserbatutako balioztapenak egokitzailea behar dute. Kluster egonkorrek ez dute zelula-mota diskreturik frogatzen. Egiaztatu Seurat API zaharra eta binakako matrizeen memoria."
  },
  "联合比较抽样次数、抽样比例、分辨率与保留维度；在固定源码仓库目录调用pipeline.R。": {
    "en": "Compare resampling runs, fractions, resolutions and retained dimensions; call pipeline.R from the pinned repository directory.",
    "fr": "Comparer répétitions, fractions, résolutions et dimensions ; appeler pipeline.R depuis le dépôt fixé.",
    "es": "Comparar repeticiones, fracciones, resoluciones y dimensiones; llamar pipeline.R desde el repositorio fijado.",
    "eu": "Alderatu birlaginketa kopurua, proportzioak, bereizmenak eta dimentsioak; deitu pipeline.R finkatutako biltegiaren direktoriotik."
  },
  "测量方差建模与谱秩诊断": {
    "en": "Measurement-variance modeling and spectral-rank diagnostics",
    "fr": "Modélisation de variance de mesure et diagnostic du rang spectral",
    "es": "Modelado de varianza de medición y diagnóstico del rango espectral",
    "eu": "Neurketa-bariantzaren modelizazioa eta espektro-heinaren diagnostikoa"
  },
  "非负原始计数与样本分组；独立保留用于噪音分析的原始层。": {
    "en": "Non-negative raw counts and sample groups, with the raw noise-analysis layer retained separately.",
    "fr": "Comptages bruts non négatifs et groupes d’échantillons ; conserver séparément la couche d’analyse du bruit.",
    "es": "Recuentos brutos no negativos y grupos de muestras; conservar aparte la capa original para ruido.",
    "eu": "Jatorrizko kontaketa ez-negatiboak eta lagin-taldeak; gorde zarata-analisiko jatorrizko geruza bereizita."
  },
  "估计谱秩、方差拟合诊断与表示敏感性": {
    "en": "Estimated spectral rank, variance-fit diagnostics and representation sensitivity",
    "fr": "Rang spectral estimé, diagnostic de variance et sensibilité de représentation",
    "es": "Rango espectral estimado, diagnóstico de varianza y sensibilidad de representación",
    "eu": "Estimatutako espektro-heina, bariantza-doikuntzaren diagnostikoak eta errepresentazio-sentikortasuna"
  },
  "核对来源仍为2025预印本。矩阵双尺度化用于表示比较；不得用去噪矩阵替代噪音或QTL表型。先评估稀疏性、SVD与内存。": {
    "en": "The checked source remains a 2025 preprint. Biwhitening supports representation comparisons; denoised matrices must not replace noise or QTL phenotypes. Assess sparsity, SVD and memory first.",
    "fr": "La source vérifiée reste une prépublication de 2025. Le bi-blanchiment compare les représentations ; les matrices débruitées ne remplacent pas les phénotypes de bruit ou de QTL. Évaluer parcimonie, SVD et mémoire.",
    "es": "La fuente verificada sigue siendo una prepublicación de 2025. El blanqueamiento bilateral compara representaciones; matrices depuradas no sustituyen fenotipos de ruido o QTL. Evaluar dispersión, SVD y memoria.",
    "eu": "Egiaztatutako iturria 2025eko aurreargitalpena da oraindik. Zuriketa bikoitzak errepresentazioak alderatzeko balio du; zarata kendutako matrizeek ez dituzte zarata- edo QTL-fenotipoak ordezkatzen. Ebaluatu sakabanaketa, SVD eta memoria."
  },
  "依据计数生成模型及资源试运行配置；不默认将全矩阵转为稠密。": {
    "en": "Configure from the count-generating model and a resource pilot; do not densify the full matrix by default.",
    "fr": "Configurer selon le modèle de comptage et un test de ressources ; ne pas densifier toute la matrice par défaut.",
    "es": "Configurar según el modelo de recuentos y una prueba de recursos; no densificar toda la matriz por defecto.",
    "eu": "Konfiguratu kontaketa-ereduaren eta baliabide-probaren arabera; ez bihurtu matrize osoa trinko lehenespenez."
  },
  "采样校正的特征选择与相关网络": {
    "en": "Sampling-corrected feature selection and correlation networks",
    "fr": "Sélection de variables et réseaux de corrélation corrigés de l’échantillonnage",
    "es": "Selección de variables y redes de correlación corregidas por muestreo",
    "eu": "Laginketaren arabera zuzendutako ezaugarri-hautaketa eta korrelazio-sareak"
  },
  "整数UMI计数、样本与细胞集合；核查Poisson–lognormal零模型。": {
    "en": "Integer UMI counts, sample and cell sets; check the Poisson–lognormal null model.",
    "fr": "Comptages UMI entiers et ensembles de cellules et échantillons ; vérifier le modèle nul Poisson–lognormal.",
    "es": "Recuentos UMI enteros y conjuntos de células y muestras; comprobar el modelo nulo Poisson–lognormal.",
    "eu": "UMI kontaketa osoak eta lagin- zein zelula-multzoak; egiaztatu Poisson–lognormal eredu nulua."
  },
  "校正Fano、特征p值与校正相关边": {
    "en": "Corrected Fano statistics, feature p-values and corrected correlation edges",
    "fr": "Fano corrigé, valeurs p des variables et corrélations corrigées",
    "es": "Fano corregido, valores p de variables y correlaciones corregidas",
    "eu": "Fano zuzenduak, ezaugarrien p-balioak eta korrelazio-ertz zuzenduak"
  },
  "高变基因不自动成为状态marker或噪音QTL。校正相关仍非因果；用培养留出检验边。相关模块与特征模块的可用接口分别核验。": {
    "en": "Variable genes are not automatically state markers or noise QTLs. Corrected correlations remain non-causal; validate edges in held-out cultures. Verify correlation and feature APIs separately.",
    "fr": "Les gènes variables ne sont pas automatiquement des marqueurs d’état ou des QTL de bruit. Les corrélations corrigées restent non causales ; valider les arêtes sur cultures réservées. Vérifier séparément les API.",
    "es": "Los genes variables no son automáticamente marcadores ni QTL de ruido. Las correlaciones corregidas no son causales; validar aristas en cultivos reservados. Verificar por separado las API de correlación y selección.",
    "eu": "Gene aldakorrak ez dira automatikoki egoera-markatzaile edo zarata-QTL. Korrelazio zuzenduak ez dira kausalak; balioztatu ertzak kultibo erreserbatuetan. Egiaztatu korrelazioaren eta hautaketaren APIak bereizita."
  },
  "明确原始counts层；共同CV与显著性设置用酵母数据校准，保留全部检验结果。": {
    "en": "Specify the raw counts layer; calibrate shared CV and significance settings on yeast data and retain all tests.",
    "fr": "Spécifier la couche brute ; calibrer CV commun et significativité sur la levure et conserver tous les tests.",
    "es": "Especificar la capa bruta; calibrar CV común y significación en levadura y conservar todas las pruebas.",
    "eu": "Zehaztu jatorrizko counts geruza; kalibratu CV komuna eta esangura legamian, eta gorde proba guztiak."
  },
  "传播拟时序排序不确定性至趋势检验": {
    "en": "Propagate ordering uncertainty into pseudotime trend tests",
    "fr": "Propager l’incertitude d’ordre aux tests de tendance",
    "es": "Propagar incertidumbre de orden a pruebas de tendencia",
    "eu": "Propagatu ordenaren ziurgabetasuna joera-probetara"
  },
  "原始计数、全体排序及每次重采样后重新计算的排序。": {
    "en": "Raw counts, full-data ordering and a newly inferred ordering for every resample.",
    "fr": "Comptages bruts, ordre complet et ordre réestimé pour chaque rééchantillonnage.",
    "es": "Recuentos brutos, orden completo y orden recalculado para cada remuestreo.",
    "eu": "Jatorrizko kontaketak, datu guztien ordena eta birlaginketa bakoitzerako berriz inferitutako ordena."
  },
  "排序稳定性与考虑拟时序不确定性的基因趋势检验": {
    "en": "Ordering stability and uncertainty-aware gene-trend tests",
    "fr": "Stabilité d’ordre et tests de tendance tenant compte de l’incertitude",
    "es": "Estabilidad de orden y pruebas de tendencia con incertidumbre",
    "eu": "Ordenaren egonkortasuna eta ziurgabetasuna kontuan hartzen duten gene-joeren probak"
  },
  "这是均值趋势检验，不是差异噪音检验。重采样不能解决培养伪重复；无真实轨迹时须用空模型检查循环选基因造成的假信号。": {
    "en": "This tests mean trends, not differential noise. Resampling does not solve culture pseudoreplication; use null models to check circular gene selection when a trajectory is uncertain.",
    "fr": "Le test porte sur les tendances moyennes, pas sur le bruit différentiel. Le rééchantillonnage ne corrige pas la pseudoréplication ; tester les effets de sélection circulaire avec des modèles nuls.",
    "es": "Prueba tendencias medias, no ruido diferencial. El remuestreo no resuelve pseudorreplicación; usar modelos nulos para revisar selección circular cuando la trayectoria sea incierta.",
    "eu": "Batezbesteko joerak probatzen ditu, ez zarata diferentziala. Birlaginketak ez du kultibo-pseudoerreplikazioa konpontzen; erabili eredu nuluak hautaketa zirkularra egiaztatzeko."
  },
  "保持细胞ID一致；每个子样本重建排序，不只截取原排序。": {
    "en": "Keep cell IDs aligned; re-infer each subset ordering rather than slicing the original.",
    "fr": "Aligner les identifiants et réestimer chaque ordre, sans simplement découper l’ordre initial.",
    "es": "Alinear identificadores y reinferir cada orden; no recortar simplemente el original.",
    "eu": "Lerrokatu zelula-IDak eta berrinferitu azpimultzo bakoitzaren ordena; ez moztu jatorrizkoa besterik gabe."
  },
  "多培养轨迹趋势与分支不确定性": {
    "en": "Multi-culture trajectory trends and branch uncertainty",
    "fr": "Tendances multi-cultures et incertitude des branches",
    "es": "Tendencias entre cultivos e incertidumbre de ramas",
    "eu": "Kultibo anitzeko ibilbide-joerak eta adarren ziurgabetasuna"
  },
  "独立培养设计、细胞到样本映射、拟时序与log归一化表达副本。": {
    "en": "Independent-culture design, cell-to-sample mapping, pseudotime and a log-normalized expression copy.",
    "fr": "Plan de cultures indépendantes, correspondance cellule-échantillon, pseudotemps et copie log-normalisée.",
    "es": "Diseño de cultivos independientes, mapa célula-muestra, pseudotiempo y copia log-normalizada.",
    "eu": "Kultibo independenteen diseinua, zelula-lagin mapa, pseudodenbora eta log-normalizatutako adierazpen-kopia."
  },
  "整体、均值及趋势差异；分支支持与细胞组成不确定性": {
    "en": "Overall, mean and trend differences; branch support and composition uncertainty",
    "fr": "Différences globales, moyennes et de tendance ; support des branches et incertitude de composition",
    "es": "Diferencias globales, medias y de tendencia; soporte de ramas e incertidumbre de composición",
    "eu": "Alde orokorrak, batezbestekoak eta joerak; adarren euskarria eta konposizio-ziurgabetasuna"
  },
  "使用log归一化副本。0.99.3默认fix.all.zero会为零方差样本添加随机噪声；本配方关闭它并记录退化基因。分支支持另调用evaluate_uncertainty，不能从趋势p值推算。": {
    "en": "Use a log-normalized copy. In 0.99.3, default fix.all.zero adds random noise to zero-variance samples; disable it and record degenerate genes. Branch support requires evaluate_uncertainty, not trend p-values.",
    "fr": "Utiliser une copie log-normalisée. En 0.99.3, fix.all.zero ajoute par défaut du bruit aux échantillons sans variance ; le désactiver et consigner les gènes dégénérés. Le support des branches nécessite evaluate_uncertainty.",
    "es": "Usar una copia log-normalizada. En 0.99.3, fix.all.zero añade ruido a muestras de varianza cero; desactivarlo y registrar genes degenerados. El soporte de ramas requiere evaluate_uncertainty, no valores p de tendencias.",
    "eu": "Erabili kopia log-normalizatua. 0.99.3 bertsioan, fix.all.zero lehenespenak ausazko zarata gehitzen du bariantzarik gabeko laginetan; desgaitu eta erregistratu gene endekatuak. Adarren euskarriak evaluate_uncertainty behar du."
  },
  "以独立培养为设计矩阵行，明确目标变量、细胞归属与交换性约束。": {
    "en": "Use independent cultures as design rows and define the target, cell assignments and exchangeability constraints.",
    "fr": "Utiliser les cultures indépendantes comme lignes ; définir variable, attribution cellulaire et échangeabilité.",
    "es": "Usar cultivos independientes como filas y definir variable, asignación celular e intercambiabilidad.",
    "eu": "Erabili kultibo independenteak diseinu-lerro gisa, eta zehaztu aldagaia, zelulen esleipena eta trukagarritasuna."
  },
  "关闭随机补噪，记录拟合失败；按设计校准置换与并行资源。": {
    "en": "Disable random noise injection, record fit failures and calibrate permutations and compute resources to the design.",
    "fr": "Désactiver l’ajout aléatoire, consigner les échecs et adapter permutations et ressources au plan.",
    "es": "Desactivar ruido aleatorio, registrar fallos y ajustar permutaciones y recursos al diseño.",
    "eu": "Desgaitu ausazko zarata, erregistratu hutsegiteak eta egokitu permutazioak eta baliabideak diseinura."
  },
  "周期结构重建与周期信号敏感性": {
    "en": "Cyclic structure reconstruction and signal sensitivity",
    "fr": "Reconstruction cyclique et sensibilité du signal",
    "es": "Reconstrucción cíclica y sensibilidad de señal",
    "eu": "Egitura ziklikoaren berreraikuntza eta seinale-sentikortasuna"
  },
  "归一化表达副本与独立酵母周期证据；原始计数另存。": {
    "en": "Normalized expression copy and independent yeast-cycle evidence, with raw counts stored separately.",
    "fr": "Copie normalisée et preuves indépendantes du cycle de levure ; garder les comptages bruts.",
    "es": "Copia normalizada y evidencia independiente del ciclo de levadura; conservar recuentos brutos.",
    "eu": "Adierazpen normalizatuaren kopia eta legamia-zikloaren ebidentzia independentea; gorde jatorrizko kontaketak."
  },
  "循环排序、独立周期一致性与增强前后敏感性": {
    "en": "Cyclic ordering, independent cycle agreement and enhancement sensitivity",
    "fr": "Ordre cyclique, concordance indépendante et sensibilité à l’amplification",
    "es": "Orden cíclico, concordancia independiente y sensibilidad al realce",
    "eu": "Ordena ziklikoa, ziklo-adostasun independentea eta indartze-sentikortasuna"
  },
  "循环模板会引入闭环结构，不能单凭结果证明周期存在；相位不是物理时间。增强或过滤矩阵只作对照，噪音结论回到原始计数。": {
    "en": "A cyclic template imposes closed structure and cannot alone establish a biological cycle; phase is not physical time. Enhanced or filtered matrices are comparisons; noise conclusions use raw counts.",
    "fr": "Le modèle cyclique impose une boucle et ne prouve pas seul un cycle biologique ; la phase n’est pas un temps physique. Matrices amplifiées ou filtrées servent de comparaison ; le bruit utilise les comptages bruts.",
    "es": "La plantilla impone un ciclo y no demuestra por sí sola un ciclo biológico; la fase no es tiempo físico. Matrices realzadas o filtradas son comparadores; el ruido usa recuentos brutos.",
    "eu": "Txantiloi ziklikoak begizta ezartzen du eta ez du berez ziklo biologikoa frogatzen; fasea ez da denbora fisikoa. Matrize indartuak edo iragaziak konparazioetarako dira; zaratak jatorrizko kontaketak erabiltzen ditu."
  },
  "记录归一化与模板；周期方向和起点由独立marker锚定并检验不同锚点。": {
    "en": "Record normalization and template; anchor direction and origin using independent markers and test alternative anchors.",
    "fr": "Consigner normalisation et modèle ; ancrer direction et origine avec des marqueurs indépendants puis tester les alternatives.",
    "es": "Registrar normalización y plantilla; anclar dirección y origen con marcadores independientes y probar alternativas.",
    "eu": "Erregistratu normalizazioa eta txantiloia; ainguratu norabidea eta jatorria markatzaile independenteekin, eta probatu alternatibak."
  },
  "真实采样时间间的最优传输与留出预测": {
    "en": "Optimal transport across sampling times and held-out prediction",
    "fr": "Transport optimal entre temps réels et prédiction réservée",
    "es": "Transporte óptimo entre tiempos reales y predicción reservada",
    "eu": "Laginketa-denboren arteko garraio optimoa eta iragarpen erreserbatua"
  },
  "具有真实采样时间的细胞表达、同一实验轨迹与可比条件；留出时间点验证。": {
    "en": "Expression with real sampling times on a comparable experimental trajectory; hold out time points for validation.",
    "fr": "Expression avec temps réels dans une trajectoire comparable ; réserver des temps pour validation.",
    "es": "Expresión con tiempos reales en una trayectoria experimental comparable; reservar tiempos para validación.",
    "eu": "Benetako laginketa-denborak dituen adierazpena, ibilbide esperimental konparagarrian; erreserbatu denbora-puntuak balioztatzeko."
  },
  "时间间耦合、收敛诊断、传输不确定性与留出分布误差": {
    "en": "Temporal couplings, convergence, transport uncertainty and held-out distribution error",
    "fr": "Couplages temporels, convergence, incertitude et erreur de distribution réservée",
    "es": "Acoplamientos temporales, convergencia, incertidumbre y error de distribución reservada",
    "eu": "Denborazko akoplamenduak, konbergentzia, ziurgabetasuna eta banaketa erreserbatuaren errorea"
  },
  "使用真实采样时间建立传输模型，并以酵母证据设定增殖与死亡权重；传输边表示状态间的模型联系，谱系与祖先关系另需追踪或遗传证据。": {
    "en": "Build transport models from observed sampling times and yeast-supported growth and death weights; transport edges link states in a model, while lineage and ancestry require tracing or genetic evidence.",
    "fr": "Construire les modèles de transport à partir des temps observés et de pondérations de croissance et mortalité étayées chez la levure ; les arêtes relient des états modélisés, la lignée et l’ascendance exigeant un traçage ou des preuves génétiques.",
    "es": "Construir modelos de transporte con tiempos observados y pesos de crecimiento y muerte respaldados en levadura; las aristas conectan estados del modelo, mientras linaje y ascendencia requieren trazado o evidencia genética.",
    "eu": "Eraiki garraio-ereduak behatutako laginketa-denborekin eta legamiaren hazkunde- eta heriotza-ebidentziarekin; ertzek ereduko egoerak lotzen dituzte, eta leinuak eta arbasoek jarraipen- edo genetika-ebidentzia behar dute."
  },
  "使用实验时间列与预先验证的共同表示；对成本、正则化和质量变化做敏感性分析。": {
    "en": "Use experimental time and a validated shared representation; assess cost, regularization and mass-change sensitivity.",
    "fr": "Utiliser temps expérimental et représentation commune validée ; évaluer coût, régularisation et variation de masse.",
    "es": "Usar tiempo experimental y representación compartida validada; evaluar costes, regularización y cambios de masa.",
    "eu": "Erabili denbora esperimentala eta errepresentazio komun balioztatua; ebaluatu kostua, erregularizazioa eta masa-aldaketak."
  },
  "以酵母试点校准均值检验功效与检测概率": {
    "en": "Calibrate mean-test power and detection probability from yeast pilots",
    "fr": "Calibrer puissance des tests de moyenne et détection sur données pilotes de levure",
    "es": "Calibrar potencia de medias y probabilidad de detección con pilotos de levadura",
    "eu": "Kalibratu batezbestekoen potentzia eta detekzio-probabilitatea legamia-pilotuekin"
  },
  "独立培养的计数试点、检测率与深度参数；遗传分支另需基因型、倍性、亲缘关系与等位频率。": {
    "en": "Count pilots from independent cultures with detection and depth parameters; the genetic branch additionally requires genotypes, ploidy, relatedness and allele frequencies.",
    "fr": "Comptages pilotes de cultures indépendantes, détection et profondeur ; la branche génétique exige aussi génotypes, ploïdie, parenté et fréquences alléliques.",
    "es": "Pilotos de cultivos independientes, detección y profundidad; la rama genética requiere además genotipos, ploidía, parentesco y frecuencias alélicas.",
    "eu": "Kultibo independenteen kontaketa-pilotuak, detekzioa eta sakonera; adar genetikoak genotipoak, ploidia, ahaidetasuna eta alelo-maiztasunak ere behar ditu."
  },
  "表达可检测概率、条件检验功效及酵母先验敏感性": {
    "en": "Expression detectability, conditional test power and yeast-prior sensitivity",
    "fr": "Détectabilité, puissance conditionnelle et sensibilité aux a priori de levure",
    "es": "Detectabilidad, potencia condicional y sensibilidad a supuestos de levadura",
    "eu": "Detektagarritasuna, baldintzazko potentzia eta legamia-aurrekoekiko sentikortasuna"
  },
  "估计均值 DE/eQTL 功效；噪音 QTL 另设功效模型。以酵母试点替换人类默认参数，适配原生二倍体 HWE 模拟与酵母倍性、群体结构的差异，遗传样本量按菌株计。": {
    "en": "Estimate mean DE/eQTL power; use a separate power model for noise QTLs. Replace human defaults with yeast pilots, adapt native diploid-HWE simulation to yeast ploidy and population structure, and count strains as genetic samples.",
    "fr": "Estimer la puissance des DE/eQTL de moyenne ; prévoir un modèle distinct pour les QTL de bruit. Remplacer les paramètres humains par des données pilotes de levure, adapter la simulation diploïde HWE à la ploïdie et à la structure de population, et compter les souches comme échantillons génétiques.",
    "es": "Estimar potencia para DE/eQTL de media; utilizar otro modelo para QTL de ruido. Sustituir parámetros humanos por pilotos de levadura, adaptar la simulación diploide HWE a ploidía y estructura poblacional, y contar cepas como muestras genéticas.",
    "eu": "Estimatu batezbesteko DE/eQTL potentzia; erabili eredu bereizia zarata QTLetarako. Ordeztu giza parametroak legamia-pilotuekin, egokitu HWE diploidearen simulazioa ploidia eta populazio-egiturara, eta zenbatu anduiak lagin genetiko gisa."
  },
  "显式提供nSamples、nCells、深度、基因数、双细胞模型、效应先验与检测规则；不继承人类默认值。": {
    "en": "Explicitly supply nSamples, nCells, depth, gene count, multiplet model, effect priors and detection rules; do not inherit human defaults.",
    "fr": "Fournir explicitement nSamples, nCells, profondeur, nombre de gènes, multiplets, effets et détection ; ne pas reprendre les défauts humains.",
    "es": "Aportar nSamples, nCells, profundidad, número de genes, multipletes, efectos y detección; no heredar valores humanos.",
    "eu": "Eman esplizituki nSamples, nCells, sakonera, gene kopurua, multiplete-eredua, efektuak eta detekzio-arauak; ez hartu giza lehenespenak."
  },
  "设计矩阵秩与列数": {
    "en": "Design rank and columns",
    "fr": "Rang et colonnes du plan",
    "es": "Rango y columnas del diseño",
    "eu": "Diseinuaren heina eta zutabeak"
  },
  "记录rank(X)与ncol(X)，并按实际拟合子集重算。": {
    "en": "Record rank(X) and ncol(X) for every fitted subset.",
    "fr": "Consigner rank(X) et ncol(X) pour chaque sous-ensemble ajusté.",
    "es": "Registrar rank(X) y ncol(X) en cada subconjunto ajustado.",
    "eu": "Erregistratu rank(X) eta ncol(X) doitutako azpimultzo bakoitzean."
  },
  "不可估计的设计系数": {
    "en": "Non-estimable design coefficients",
    "fr": "Coefficients non estimables",
    "es": "Coeficientes no estimables",
    "eu": "Diseinuko koefiziente estimaezinak"
  },
  "保存nonEstimable返回的列名与编码顺序；具体contrast另行检查。": {
    "en": "Retain nonEstimable column names and coding order; check individual contrasts separately.",
    "fr": "Conserver colonnes nonEstimable et ordre de codage ; vérifier chaque contraste séparément.",
    "es": "Conservar columnas nonEstimable y orden de codificación; revisar cada contraste aparte.",
    "eu": "Gorde nonEstimable zutabeak eta kodetze-ordena; egiaztatu kontraste bakoitza bereizita."
  },
  "有效培养与菌株覆盖": {
    "en": "Culture and strain coverage",
    "fr": "Couverture des cultures et souches",
    "es": "Cobertura de cultivos y cepas",
    "eu": "Kultiboen eta anduien estaldura"
  },
  "按条件与状态分别记录菌株、独立培养、文库和细胞数。": {
    "en": "Count strains, independent cultures, libraries and cells separately by condition and state.",
    "fr": "Compter séparément souches, cultures, bibliothèques et cellules par condition et état.",
    "es": "Contar cepas, cultivos, bibliotecas y células por separado, según condición y estado.",
    "eu": "Zenbatu anduiak, kultiboak, liburutegiak eta zelulak bereizita, baldintza eta egoeraren arabera."
  },
  "独立标签集合覆盖率": {
    "en": "Independent label-set coverage",
    "fr": "Couverture indépendante des labels",
    "es": "Cobertura independiente de etiquetas",
    "eu": "Etiketa multzoen estaldura independentea"
  },
  "真值标签落入预测集合的比例；分母为独立验证且标签可评估的细胞，分菌株报告。": {
    "en": "Fraction of evaluable independently labeled cells whose true label is in the prediction set; report by strain.",
    "fr": "Part des cellules indépendamment annotées dont le vrai label appartient à l’ensemble prédit ; par souche.",
    "es": "Proporción de células con etiqueta independiente evaluable incluida en el conjunto predicho; informar por cepa.",
    "eu": "Egiazko etiketa iragarpen-multzoan duten zelula independente ebaluagarrien proportzioa; anduika eman."
  },
  "注释集合大小与未决比例": {
    "en": "Label-set size and ambiguity",
    "fr": "Taille des ensembles et ambiguïté",
    "es": "Tamaño de conjuntos y ambigüedad",
    "eu": "Etiketa multzoen tamaina eta anbiguotasuna"
  },
  "分别保留空集合、单标签与多标签比例，不强制选唯一标签。": {
    "en": "Retain empty, singleton and multi-label fractions without forcing a unique label.",
    "fr": "Conserver fractions vides, uniques et multiples sans imposer un label unique.",
    "es": "Conservar proporciones vacías, únicas y múltiples sin forzar una etiqueta.",
    "eu": "Gorde multzo hutsen, bakunen eta anizkoitzen proportzioak, etiketa bakarra behartu gabe."
  },
  "参考外检测与错误类型": {
    "en": "Out-of-reference detection and errors",
    "fr": "Détection hors référence et erreurs",
    "es": "Detección fuera de referencia y errores",
    "eu": "Erreferentziaz kanpoko detekzioa eta erroreak"
  },
  "分别记录参考内假阳性率、参考外召回率及阳性发现中的错误比例；三者分母不同。": {
    "en": "Record in-reference false-positive rate, out-of-reference recall and false-discovery proportion separately; their denominators differ.",
    "fr": "Séparer taux de faux positifs internes, rappel externe et proportion de fausses découvertes ; dénominateurs distincts.",
    "es": "Separar falsos positivos internos, sensibilidad externa y proporción de falsos descubrimientos; sus denominadores difieren.",
    "eu": "Bereizi barneko positibo faltsuen tasa, kanpoko berreskuratzea eta aurkikuntza faltsuen proportzioa; izendatzaileak desberdinak dira."
  },
  "重采样共聚类概率": {
    "en": "Resampled co-clustering probability",
    "fr": "Probabilité de co-classement rééchantillonnée",
    "es": "Probabilidad de coagrupación remuestreada",
    "eu": "Birlagindutako baterako klusterizazio-probabilitatea"
  },
  "每对细胞同群次数除以二者同时入选次数；培养分块与随机细胞抽样分别报告。": {
    "en": "For each cell pair, divide joint-cluster counts by joint-inclusion counts; distinguish culture blocks from random cell subsampling.",
    "fr": "Pour chaque paire, diviser co-classements par inclusions communes ; distinguer blocs de cultures et cellules aléatoires.",
    "es": "Para cada par, dividir coagrupaciones por inclusiones conjuntas; distinguir bloques de cultivo y muestreo celular.",
    "eu": "Zelula bikote bakoitzean, zatitu kluster bereko agerpenak baterako inklusioez; bereizi kultibo-blokeak eta zelulen laginketa."
  },
  "聚类稳定性与培养复现": {
    "en": "Cluster stability and culture replication",
    "fr": "Stabilité et réplication entre cultures",
    "es": "Estabilidad y replicación entre cultivos",
    "eu": "Klusterren egonkortasuna eta kultibo-erreplikazioa"
  },
  "结合共聚类轮廓、分辨率敏感性及独立培养的标签复现，不只比较UMAP形状。": {
    "en": "Combine co-clustering silhouettes, resolution sensitivity and independent-culture label replication, beyond UMAP appearance.",
    "fr": "Combiner silhouettes, sensibilité à la résolution et réplication indépendante, au-delà de l’aspect UMAP.",
    "es": "Combinar siluetas, sensibilidad de resolución y replicación independiente, además del aspecto UMAP.",
    "eu": "Konbinatu siluetak, bereizmen-sentikortasuna eta kultibo independenteetako erreplikazioa, UMAP itxuratik harago."
  },
  "BiPCA谱秩与方差拟合": {
    "en": "BiPCA rank and variance fit",
    "fr": "Rang et ajustement de variance BiPCA",
    "es": "Rango y ajuste de varianza BiPCA",
    "eu": "BiPCA heina eta bariantza-doikuntza"
  },
  "保存mp_rank、经验谱、方差模型与拟合诊断；记录资源和收敛状态。": {
    "en": "Retain mp_rank, empirical spectrum, variance model and fit diagnostics, including resource and convergence states.",
    "fr": "Conserver mp_rank, spectre, modèle de variance et diagnostics, avec ressources et convergence.",
    "es": "Conservar mp_rank, espectro, modelo de varianza y diagnósticos, incluidos recursos y convergencia.",
    "eu": "Gorde mp_rank, espektroa, bariantza-eredua eta diagnostikoak, baliabideak eta konbergentzia barne."
  },
  "表示变化与噪音结论分离": {
    "en": "Separate representation and noise conclusions",
    "fr": "Séparer représentation et conclusions sur le bruit",
    "es": "Separar representación y conclusiones de ruido",
    "eu": "Bereizi errepresentazioa eta zarata-ondorioak"
  },
  "比较不同表示下的状态标签，并在同一原始计数集合重估噪音，量化标签变化的影响。": {
    "en": "Compare state labels across representations, then re-estimate noise on identical raw counts to quantify label sensitivity.",
    "fr": "Comparer les états entre représentations puis réestimer le bruit sur les mêmes comptages bruts.",
    "es": "Comparar estados entre representaciones y reestimar ruido en los mismos recuentos brutos.",
    "eu": "Alderatu egoerak errepresentazioen artean eta berriz estimatu zarata jatorrizko kontaketa beretan."
  },
  "采样校正Fano与特征证据": {
    "en": "Sampling-corrected Fano and feature evidence",
    "fr": "Fano corrigé et preuve des variables",
    "es": "Fano corregido y evidencia de variables",
    "eu": "Fano zuzendua eta ezaugarrien ebidentzia"
  },
  "保存mc_Fano、FDR_adj_pvalue及拟合CV；分别报告每个样本和分析集合。": {
    "en": "Retain mc_Fano, FDR_adj_pvalue and fitted CV for each sample and analysis set.",
    "fr": "Conserver mc_Fano, FDR_adj_pvalue et CV ajusté par échantillon et ensemble.",
    "es": "Conservar mc_Fano, FDR_adj_pvalue y CV ajustado por muestra y conjunto.",
    "eu": "Gorde mc_Fano, FDR_adj_pvalue eta doitutako CV lagin eta multzo bakoitzerako."
  },
  "校正相关与独立样本边支持": {
    "en": "Corrected correlations and independent edge support",
    "fr": "Corrélations corrigées et support indépendant",
    "es": "Correlaciones corregidas y soporte independiente",
    "eu": "Korrelazio zuzenduak eta ertz-euskarri independentea"
  },
  "相关模块输出mcPCC与多重校正结果；项目另检验独立培养中的符号、效应与边复现。": {
    "en": "Use mcPCC and adjusted tests from the correlation module; separately assess sign, effect and edge replication in independent cultures.",
    "fr": "Utiliser mcPCC et tests corrigés ; évaluer séparément signe, effet et réplication dans des cultures indépendantes.",
    "es": "Usar mcPCC y pruebas ajustadas; evaluar aparte signo, efecto y replicación en cultivos independientes.",
    "eu": "Erabili mcPCC eta proba zuzenduak; ebaluatu bereizita zeinua, efektua eta erreplikazioa kultibo independenteetan."
  },
  "拟时序排序稳定性": {
    "en": "Pseudotime ordering stability",
    "fr": "Stabilité de l’ordre pseudotemporel",
    "es": "Estabilidad del orden pseudotemporal",
    "eu": "Pseudodenboraren ordena-egonkortasuna"
  },
  "在共同入选细胞上比较重建排序；周期需先对齐方向和起点，分支需对应后比较。": {
    "en": "Compare re-inferred order on jointly retained cells; align cyclic orientation and origin and match branches first.",
    "fr": "Comparer les ordres sur cellules communes ; aligner direction, origine cyclique et branches.",
    "es": "Comparar órdenes en células comunes; alinear orientación, origen cíclico y ramas.",
    "eu": "Alderatu ordenak zelula komunetan; lerrokatu norabidea, jatorri ziklikoa eta adarrak lehenik."
  },
  "考虑排序不确定性的趋势检验": {
    "en": "Ordering-aware trend tests",
    "fr": "Tests de tendance avec incertitude d’ordre",
    "es": "Pruebas de tendencia con incertidumbre de orden",
    "eu": "Ordena-ziurgabetasuna duten joera-probak"
  },
  "保留固定排序与重采样排序的基因检验结果、零模型校准和失败状态；检验对象是趋势。": {
    "en": "Retain fixed-order and resampled-order gene tests, null calibration and failures; the estimand is a trend.",
    "fr": "Conserver tests à ordre fixe et réestimé, calibration nulle et échecs ; l’objet est une tendance.",
    "es": "Conservar pruebas de orden fijo y remuestreado, calibración nula y fallos; se estima una tendencia.",
    "eu": "Gorde ordena finkoko eta birlagindutako probak, kalibrazio nulua eta hutsegiteak; joera da estimagaia."
  },
  "多培养轨迹曲线差异": {
    "en": "Multi-culture trajectory-curve differences",
    "fr": "Différences de courbes multi-cultures",
    "es": "Diferencias de curvas entre cultivos",
    "eu": "Kultibo anitzeko ibilbide-kurben aldeak"
  },
  "分别保存overall、meanDiff和trendDiff检验、样本设计及拟合状态。": {
    "en": "Retain overall, meanDiff and trendDiff tests separately, with sample design and fit status.",
    "fr": "Conserver séparément overall, meanDiff et trendDiff, avec plan et état d’ajustement.",
    "es": "Conservar overall, meanDiff y trendDiff por separado, con diseño y estado del ajuste.",
    "eu": "Gorde overall, meanDiff eta trendDiff bereizita, diseinuarekin eta doikuntza-egoerarekin."
  },
  "多样本分支支持与组成不确定性": {
    "en": "Multi-sample branch support and composition uncertainty",
    "fr": "Support des branches et incertitude de composition",
    "es": "Soporte de ramas e incertidumbre de composición",
    "eu": "Lagin anitzeko adarren euskarria eta konposizio-ziurgabetasuna"
  },
  "通过evaluate_uncertainty单独评估分支重现及样本组成；记录重采样层级。": {
    "en": "Use evaluate_uncertainty separately for branch recurrence and sample composition; record the resampling level.",
    "fr": "Utiliser evaluate_uncertainty pour branches et composition ; consigner le niveau de rééchantillonnage.",
    "es": "Usar evaluate_uncertainty para ramas y composición; registrar el nivel de remuestreo.",
    "eu": "Erabili evaluate_uncertainty adarrentzat eta konposizioarentzat; erregistratu birlaginketa-maila."
  },
  "谱周期与独立周期证据一致性": {
    "en": "Spectral-cycle agreement with independent evidence",
    "fr": "Concordance du cycle spectral avec preuves indépendantes",
    "es": "Concordancia del ciclo espectral con evidencia independiente",
    "eu": "Ziklo espektralaren adostasuna ebidentzia independentearekin"
  },
  "用未参与重建的酵母周期基因或独立标签评价循环顺序，保留冲突细胞。": {
    "en": "Evaluate cyclic order with held-out yeast-cycle genes or independent labels and retain conflicting cells.",
    "fr": "Évaluer l’ordre avec gènes cycliques réservés ou labels indépendants et conserver les conflits.",
    "es": "Evaluar el orden con genes reservados o etiquetas independientes y conservar conflictos.",
    "eu": "Ebaluatu ordena erreserbatutako ziklo-geneekin edo etiketa independenteekin, eta gorde gatazkak."
  },
  "周期增强或过滤的敏感性": {
    "en": "Cycle enhancement or filtering sensitivity",
    "fr": "Sensibilité à l’amplification ou au filtrage du cycle",
    "es": "Sensibilidad al realce o filtrado del ciclo",
    "eu": "Zikloaren indartze- edo iragazte-sentikortasuna"
  },
  "比较增强前后标签与排序；噪音效应始终用未修改原始计数重新计算。": {
    "en": "Compare labels and orders before and after enhancement; recompute noise effects using unchanged raw counts.",
    "fr": "Comparer labels et ordres avant/après amplification ; recalculer le bruit sur les comptages bruts inchangés.",
    "es": "Comparar etiquetas y órdenes antes/después del realce; recalcular ruido con recuentos brutos intactos.",
    "eu": "Alderatu etiketak eta ordenak indartu aurretik eta ondoren; berriz kalkulatu zarata jatorrizko kontaketa aldatu gabeekin."
  },
  "时间传输的收敛与不确定性": {
    "en": "Temporal transport convergence and uncertainty",
    "fr": "Convergence et incertitude du transport temporel",
    "es": "Convergencia e incertidumbre del transporte temporal",
    "eu": "Denborazko garraioaren konbergentzia eta ziurgabetasuna"
  },
  "记录耦合、目标函数、收敛与熵，并对正则化和质量假设做敏感性比较。": {
    "en": "Record couplings, objective, convergence and entropy, with regularization and mass-assumption sensitivity.",
    "fr": "Consigner couplages, objectif, convergence et entropie ; tester régularisation et hypothèses de masse.",
    "es": "Registrar acoplamientos, objetivo, convergencia y entropía; probar regularización y supuestos de masa.",
    "eu": "Erregistratu akoplamenduak, helburua, konbergentzia eta entropia; probatu erregularizazioa eta masa-hipotesiak."
  },
  "留出时间点的分布预测": {
    "en": "Held-out time-point distribution prediction",
    "fr": "Prédiction de distribution à temps réservé",
    "es": "Predicción de distribución en tiempos reservados",
    "eu": "Denbora-puntu erreserbatuen banaketa-iragarpena"
  },
  "比较留出真实时间点的分布误差与无变化、最近时间点及随机传输基线。": {
    "en": "Compare held-out distribution errors with no-change, nearest-time and random-transport baselines.",
    "fr": "Comparer l’erreur réservée aux références sans changement, temps voisin et transport aléatoire.",
    "es": "Comparar errores reservados con referencias sin cambio, tiempo cercano y transporte aleatorio.",
    "eu": "Alderatu erroreak aldaketarik gabeko, denbora hurbileneko eta ausazko garraio-erreferentziekin."
  },
  "检测概率与条件功效分解": {
    "en": "Detection probability and conditional power",
    "fr": "Détection et puissance conditionnelle",
    "es": "Detección y potencia condicional",
    "eu": "Detekzio-probabilitatea eta baldintzazko potentzia"
  },
  "分别报告表达可检测概率和可检测条件下的均值检验功效；注明独立样本数与细胞数。": {
    "en": "Report detectability and mean-test power conditional on detection separately, with independent-sample and cell counts.",
    "fr": "Séparer détectabilité et puissance moyenne conditionnelle, avec effectifs d’échantillons indépendants et cellules.",
    "es": "Separar detectabilidad y potencia media condicional, con números de muestras independientes y células.",
    "eu": "Bereizi detektagarritasuna eta baldintzazko batezbesteko-potentzia, lagin independenteen eta zelulen kopuruekin."
  },
  "酵母先验迁移与功效敏感性": {
    "en": "Yeast-prior transfer and power sensitivity",
    "fr": "Transfert des a priori de levure et sensibilité",
    "es": "Transferencia de supuestos y sensibilidad de potencia",
    "eu": "Legamia-aurrekoen transferentzia eta potentzia-sentikortasuna"
  },
  "替换基因数、检测率、深度、双细胞与效应先验，比较试点拟合及功效变化；遗传模拟另核验倍性和HWE。": {
    "en": "Replace gene count, detection, depth, multiplet and effect priors; compare pilot fit and power. Separately verify ploidy and HWE for genetic simulation.",
    "fr": "Remplacer nombre de gènes, détection, profondeur, multiplets et effets ; comparer ajustement et puissance. Vérifier séparément ploïdie et HWE.",
    "es": "Sustituir número de genes, detección, profundidad, multipletes y efectos; comparar ajuste y potencia. Verificar ploidía y HWE aparte.",
    "eu": "Ordezkatu gene kopurua, detekzioa, sakonera, multipleteak eta efektuak; alderatu doikuntza eta potentzia. Egiaztatu ploidia eta HWE bereizita."
  },
  "计数（逐项注明统计单位）": {
    "en": "Counts with explicit units",
    "fr": "Comptages avec unités explicites",
    "es": "Recuentos con unidades explícitas",
    "eu": "Kontaketak, unitate esplizituekin"
  },
  "系数名集合": {
    "en": "Set of coefficient names",
    "fr": "Ensemble de noms de coefficients",
    "es": "Conjunto de nombres de coeficientes",
    "eu": "Koefiziente-izenen multzoa"
  },
  "比例": {
    "en": "Proportion",
    "fr": "Proportion",
    "es": "Proporción",
    "eu": "Proportzioa"
  },
  "标签数与集合类别比例": {
    "en": "Label counts and set-category proportions",
    "fr": "Nombre de labels et proportions par catégorie",
    "es": "Número de etiquetas y proporciones por categoría",
    "eu": "Etiketa kopuruak eta multzo-kategorien proportzioak"
  },
  "无量纲分数与效应": {
    "en": "Dimensionless scores and effects",
    "fr": "Scores et effets sans dimension",
    "es": "Puntuaciones y efectos adimensionales",
    "eu": "Dimentsiorik gabeko puntuazioak eta efektuak"
  },
  "秩、谱与拟合诊断": {
    "en": "Rank, spectrum and fit diagnostics",
    "fr": "Rang, spectre et diagnostics",
    "es": "Rango, espectro y diagnósticos",
    "eu": "Heina, espektroa eta diagnostikoak"
  },
  "统计量、p值与校正p值": {
    "en": "Statistics, p-values and adjusted p-values",
    "fr": "Statistiques, valeurs p et valeurs p ajustées",
    "es": "Estadísticos, valores p y valores p ajustados",
    "eu": "Estatistikoak, p-balioak eta p-balio zuzenduak"
  },
  "耦合质量、成本及熵（记录尺度）": {
    "en": "Coupling mass, cost and entropy with declared scale",
    "fr": "Masse couplée, coût et entropie avec échelle déclarée",
    "es": "Masa acoplada, coste y entropía con escala declarada",
    "eu": "Akoplamendu-masa, kostua eta entropia, eskala adierazita"
  },
  "预先声明的分布距离": {
    "en": "Prespecified distribution distance",
    "fr": "Distance de distribution prédéfinie",
    "es": "Distancia de distribución predefinida",
    "eu": "Aurrez zehaztutako banaketa-distantzia"
  },
  "p_val_cutoff须为声明的浮点目标才生成p值；设为False时将其记录为未检验。CV字段位于uns[\"CV_for_mc_Fano_fit\"]。": {
    "en": "p_val_cutoff must be a declared floating-point target to compute p-values; False means not tested. CV is stored in uns[\"CV_for_mc_Fano_fit\"].",
    "fr": "p_val_cutoff doit être une cible flottante déclarée pour calculer les valeurs p ; False signifie non testé. Le CV est dans uns[\"CV_for_mc_Fano_fit\"].",
    "es": "p_val_cutoff debe ser un objetivo decimal declarado para calcular valores p; False significa no probado. CV se guarda en uns[\"CV_for_mc_Fano_fit\"].",
    "eu": "p_val_cutoff adierazitako koma mugikorreko helburua izan behar da p-balioak kalkulatzeko; False probatu gabe da. CV uns[\"CV_for_mc_Fano_fit\"] eremuan dago."
  },
  "meanDiff与trendDiff受源码中的整体检验门控；保留未触发与拟合失败状态，不填充为零或不显著。": {
    "en": "meanDiff and trendDiff depend on the source implementation’s overall-test gate; retain not-triggered and failed states rather than filling zeros or nonsignificance.",
    "fr": "meanDiff et trendDiff dépendent du filtre global du code ; conserver états non déclenchés et échecs, sans les remplacer par zéro ou non-significatif.",
    "es": "meanDiff y trendDiff dependen del filtro global del código; conservar estados no activados y fallos, sin sustituirlos por cero o no significativo.",
    "eu": "meanDiff eta trendDiff kodeko proba orokorraren iragazkiaren araberakoak dira; gorde aktibatu gabeko eta hutsegindako egoerak, zeroz edo ez-esanguratsuz ordezkatu gabe."
  },
  "来源论文的方法用于计划比较；项目结果尚未计算。": {
    "en": "Source methods support planned comparisons; project results have not been computed.",
    "fr": "Les méthodes sources soutiennent des comparaisons prévues ; aucun résultat de projet calculé.",
    "es": "Los métodos fuente apoyan comparaciones planificadas; no se han calculado resultados del proyecto.",
    "eu": "Iturrietako metodoek aurreikusitako konparazioak laguntzen dituzte; proiektuaren emaitzak kalkulatu gabe daude."
  },
  "定向补充与核验；覆盖设计、注释置信度、聚类复现、测量方差、周期和多样本动态。不是穷尽性文献全集。": {
    "en": "Targeted additions covering design, annotation confidence, cluster replication, measurement variance, cycles and multi-sample dynamics; not an exhaustive bibliography.",
    "fr": "Ajouts ciblés : plan, confiance d’annotation, réplication, variance de mesure, cycles et dynamique multi-échantillons ; bibliographie non exhaustive.",
    "es": "Adiciones dirigidas: diseño, confianza de anotación, replicación, varianza de medición, ciclos y dinámica multimuestra; no es una bibliografía exhaustiva.",
    "eu": "Gehikuntza bideratuak: diseinua, anotazio-konfiantza, erreplikazioa, neurketa-bariantza, zikloak eta lagin anitzeko dinamika; ez da bibliografia osoa."
  }
};window.YV_TEXT=window.YV_TEXT||{};Object.assign(window.YV_TEXT,text);const content={
  "tools": {
    "limma": {
      "en": {
        "task": "Audit design estimability, confounding and replication"
      },
      "fr": {
        "task": "Auditer estimabilité, confusion et réplication"
      },
      "es": {
        "task": "Auditar estimabilidad, confusión y replicación"
      },
      "eu": {
        "task": "Ikuskatu diseinuaren estimagarritasuna, nahastea eta erreplikazioa"
      }
    },
    "conformalsc": {
      "en": {
        "task": "Conformal label sets and out-of-reference detection"
      },
      "fr": {
        "task": "Ensembles d’annotations conformes et détection hors référence"
      },
      "es": {
        "task": "Conjuntos de etiquetas conformes y detección fuera de referencia"
      },
      "eu": {
        "task": "Etiketa multzo konformalak eta erreferentziaz kanpoko detekzioa"
      }
    },
    "chooser": {
      "en": {
        "task": "Cluster resolution and cell-resampling stability"
      },
      "fr": {
        "task": "Résolution des groupes et stabilité au rééchantillonnage cellulaire"
      },
      "es": {
        "task": "Resolución de grupos y estabilidad del remuestreo celular"
      },
      "eu": {
        "task": "Multzoen bereizmena eta zelula birlaginketaren egonkortasuna"
      }
    },
    "bipca": {
      "en": {
        "task": "Measurement-variance modeling and spectral-rank diagnostics"
      },
      "fr": {
        "task": "Modélisation de variance de mesure et diagnostic du rang spectral"
      },
      "es": {
        "task": "Modelado de varianza de medición y diagnóstico del rango espectral"
      },
      "eu": {
        "task": "Neurketa-bariantzaren modelizazioa eta espektro-heinaren diagnostikoa"
      }
    },
    "bigsur": {
      "en": {
        "task": "Sampling-corrected feature selection and correlation networks"
      },
      "fr": {
        "task": "Sélection de variables et réseaux de corrélation corrigés de l’échantillonnage"
      },
      "es": {
        "task": "Selección de variables y redes de correlación corregidas por muestreo"
      },
      "eu": {
        "task": "Laginketaren arabera zuzendutako ezaugarri-hautaketa eta korrelazio-sareak"
      }
    },
    "pseudotimede": {
      "en": {
        "task": "Propagate ordering uncertainty into pseudotime trend tests"
      },
      "fr": {
        "task": "Propager l’incertitude d’ordre aux tests de tendance"
      },
      "es": {
        "task": "Propagar incertidumbre de orden a pruebas de tendencia"
      },
      "eu": {
        "task": "Propagatu ordenaren ziurgabetasuna joera-probetara"
      }
    },
    "lamian": {
      "en": {
        "task": "Multi-culture trajectory trends and branch uncertainty"
      },
      "fr": {
        "task": "Tendances multi-cultures et incertitude des branches"
      },
      "es": {
        "task": "Tendencias entre cultivos e incertidumbre de ramas"
      },
      "eu": {
        "task": "Kultibo anitzeko ibilbide-joerak eta adarren ziurgabetasuna"
      }
    },
    "scprisma": {
      "en": {
        "task": "Cyclic structure reconstruction and signal sensitivity"
      },
      "fr": {
        "task": "Reconstruction cyclique et sensibilité du signal"
      },
      "es": {
        "task": "Reconstrucción cíclica y sensibilidad de señal"
      },
      "eu": {
        "task": "Egitura ziklikoaren berreraikuntza eta seinale-sentikortasuna"
      }
    },
    "moscot": {
      "en": {
        "task": "Optimal transport across sampling times and held-out prediction"
      },
      "fr": {
        "task": "Transport optimal entre temps réels et prédiction réservée"
      },
      "es": {
        "task": "Transporte óptimo entre tiempos reales y predicción reservada"
      },
      "eu": {
        "task": "Laginketa-denboren arteko garraio optimoa eta iragarpen erreserbatua"
      }
    },
    "scpower": {
      "en": {
        "task": "Calibrate mean-test power and detection probability from yeast pilots"
      },
      "fr": {
        "task": "Calibrer puissance des tests de moyenne et détection sur données pilotes de levure"
      },
      "es": {
        "task": "Calibrar potencia de medias y probabilidad de detección con pilotos de levadura"
      },
      "eu": {
        "task": "Kalibratu batezbestekoen potentzia eta detekzio-probabilitatea legamia-pilotuekin"
      }
    }
  },
  "metrics": {
    "v25_design_rank": {
      "en": {
        "name": "Design rank and columns",
        "definition": "Record rank(X) and ncol(X) for every fitted subset.",
        "purpose": "Audit design estimability, confounding and replication"
      },
      "fr": {
        "name": "Rang et colonnes du plan",
        "definition": "Consigner rank(X) et ncol(X) pour chaque sous-ensemble ajusté.",
        "purpose": "Auditer estimabilité, confusion et réplication"
      },
      "es": {
        "name": "Rango y columnas del diseño",
        "definition": "Registrar rank(X) y ncol(X) en cada subconjunto ajustado.",
        "purpose": "Auditar estimabilidad, confusión y replicación"
      },
      "eu": {
        "name": "Diseinuaren heina eta zutabeak",
        "definition": "Erregistratu rank(X) eta ncol(X) doitutako azpimultzo bakoitzean.",
        "purpose": "Ikuskatu diseinuaren estimagarritasuna, nahastea eta erreplikazioa"
      }
    },
    "v25_nonestimable": {
      "en": {
        "name": "Non-estimable design coefficients",
        "definition": "Retain nonEstimable column names and coding order; check individual contrasts separately.",
        "purpose": "Audit design estimability, confounding and replication"
      },
      "fr": {
        "name": "Coefficients non estimables",
        "definition": "Conserver colonnes nonEstimable et ordre de codage ; vérifier chaque contraste séparément.",
        "purpose": "Auditer estimabilité, confusion et réplication"
      },
      "es": {
        "name": "Coeficientes no estimables",
        "definition": "Conservar columnas nonEstimable y orden de codificación; revisar cada contraste aparte.",
        "purpose": "Auditar estimabilidad, confusión y replicación"
      },
      "eu": {
        "name": "Diseinuko koefiziente estimaezinak",
        "definition": "Gorde nonEstimable zutabeak eta kodetze-ordena; egiaztatu kontraste bakoitza bereizita.",
        "purpose": "Ikuskatu diseinuaren estimagarritasuna, nahastea eta erreplikazioa"
      }
    },
    "v25_replication_map": {
      "en": {
        "name": "Culture and strain coverage",
        "definition": "Count strains, independent cultures, libraries and cells separately by condition and state.",
        "purpose": "Audit design estimability, confounding and replication"
      },
      "fr": {
        "name": "Couverture des cultures et souches",
        "definition": "Compter séparément souches, cultures, bibliothèques et cellules par condition et état.",
        "purpose": "Auditer estimabilité, confusion et réplication"
      },
      "es": {
        "name": "Cobertura de cultivos y cepas",
        "definition": "Contar cepas, cultivos, bibliotecas y células por separado, según condición y estado.",
        "purpose": "Auditar estimabilidad, confusión y replicación"
      },
      "eu": {
        "name": "Kultiboen eta anduien estaldura",
        "definition": "Zenbatu anduiak, kultiboak, liburutegiak eta zelulak bereizita, baldintza eta egoeraren arabera.",
        "purpose": "Ikuskatu diseinuaren estimagarritasuna, nahastea eta erreplikazioa"
      }
    },
    "v25_annotation_set_coverage": {
      "en": {
        "name": "Independent label-set coverage",
        "definition": "Fraction of evaluable independently labeled cells whose true label is in the prediction set; report by strain.",
        "purpose": "Conformal label sets and out-of-reference detection"
      },
      "fr": {
        "name": "Couverture indépendante des labels",
        "definition": "Part des cellules indépendamment annotées dont le vrai label appartient à l’ensemble prédit ; par souche.",
        "purpose": "Ensembles d’annotations conformes et détection hors référence"
      },
      "es": {
        "name": "Cobertura independiente de etiquetas",
        "definition": "Proporción de células con etiqueta independiente evaluable incluida en el conjunto predicho; informar por cepa.",
        "purpose": "Conjuntos de etiquetas conformes y detección fuera de referencia"
      },
      "eu": {
        "name": "Etiketa multzoen estaldura independentea",
        "definition": "Egiazko etiketa iragarpen-multzoan duten zelula independente ebaluagarrien proportzioa; anduika eman.",
        "purpose": "Etiketa multzo konformalak eta erreferentziaz kanpoko detekzioa"
      }
    },
    "v25_annotation_set_size": {
      "en": {
        "name": "Label-set size and ambiguity",
        "definition": "Retain empty, singleton and multi-label fractions without forcing a unique label.",
        "purpose": "Conformal label sets and out-of-reference detection"
      },
      "fr": {
        "name": "Taille des ensembles et ambiguïté",
        "definition": "Conserver fractions vides, uniques et multiples sans imposer un label unique.",
        "purpose": "Ensembles d’annotations conformes et détection hors référence"
      },
      "es": {
        "name": "Tamaño de conjuntos y ambigüedad",
        "definition": "Conservar proporciones vacías, únicas y múltiples sin forzar una etiqueta.",
        "purpose": "Conjuntos de etiquetas conformes y detección fuera de referencia"
      },
      "eu": {
        "name": "Etiketa multzoen tamaina eta anbiguotasuna",
        "definition": "Gorde multzo hutsen, bakunen eta anizkoitzen proportzioak, etiketa bakarra behartu gabe.",
        "purpose": "Etiketa multzo konformalak eta erreferentziaz kanpoko detekzioa"
      }
    },
    "v25_annotation_ood": {
      "en": {
        "name": "Out-of-reference detection and errors",
        "definition": "Record in-reference false-positive rate, out-of-reference recall and false-discovery proportion separately; their denominators differ.",
        "purpose": "Conformal label sets and out-of-reference detection"
      },
      "fr": {
        "name": "Détection hors référence et erreurs",
        "definition": "Séparer taux de faux positifs internes, rappel externe et proportion de fausses découvertes ; dénominateurs distincts.",
        "purpose": "Ensembles d’annotations conformes et détection hors référence"
      },
      "es": {
        "name": "Detección fuera de referencia y errores",
        "definition": "Separar falsos positivos internos, sensibilidad externa y proporción de falsos descubrimientos; sus denominadores difieren.",
        "purpose": "Conjuntos de etiquetas conformes y detección fuera de referencia"
      },
      "eu": {
        "name": "Erreferentziaz kanpoko detekzioa eta erroreak",
        "definition": "Bereizi barneko positibo faltsuen tasa, kanpoko berreskuratzea eta aurkikuntza faltsuen proportzioa; izendatzaileak desberdinak dira.",
        "purpose": "Etiketa multzo konformalak eta erreferentziaz kanpoko detekzioa"
      }
    },
    "v25_cluster_coassignment": {
      "en": {
        "name": "Resampled co-clustering probability",
        "definition": "For each cell pair, divide joint-cluster counts by joint-inclusion counts; distinguish culture blocks from random cell subsampling.",
        "purpose": "Cluster resolution and between-culture stability"
      },
      "fr": {
        "name": "Probabilité de co-classement rééchantillonnée",
        "definition": "Pour chaque paire, diviser co-classements par inclusions communes ; distinguer blocs de cultures et cellules aléatoires.",
        "purpose": "Résolution des groupes et stabilité entre cultures"
      },
      "es": {
        "name": "Probabilidad de coagrupación remuestreada",
        "definition": "Para cada par, dividir coagrupaciones por inclusiones conjuntas; distinguir bloques de cultivo y muestreo celular.",
        "purpose": "Resolución de grupos y estabilidad entre cultivos"
      },
      "eu": {
        "name": "Birlagindutako baterako klusterizazio-probabilitatea",
        "definition": "Zelula bikote bakoitzean, zatitu kluster bereko agerpenak baterako inklusioez; bereizi kultibo-blokeak eta zelulen laginketa.",
        "purpose": "Klusterren bereizmena eta kultiboen arteko egonkortasuna"
      }
    },
    "v25_cluster_stability": {
      "en": {
        "name": "Cluster stability and culture replication",
        "definition": "Combine co-clustering silhouettes, resolution sensitivity and independent-culture label replication, beyond UMAP appearance.",
        "purpose": "Cluster resolution and between-culture stability"
      },
      "fr": {
        "name": "Stabilité et réplication entre cultures",
        "definition": "Combiner silhouettes, sensibilité à la résolution et réplication indépendante, au-delà de l’aspect UMAP.",
        "purpose": "Résolution des groupes et stabilité entre cultures"
      },
      "es": {
        "name": "Estabilidad y replicación entre cultivos",
        "definition": "Combinar siluetas, sensibilidad de resolución y replicación independiente, además del aspecto UMAP.",
        "purpose": "Resolución de grupos y estabilidad entre cultivos"
      },
      "eu": {
        "name": "Klusterren egonkortasuna eta kultibo-erreplikazioa",
        "definition": "Konbinatu siluetak, bereizmen-sentikortasuna eta kultibo independenteetako erreplikazioa, UMAP itxuratik harago.",
        "purpose": "Klusterren bereizmena eta kultiboen arteko egonkortasuna"
      }
    },
    "v25_bipca_rank_fit": {
      "en": {
        "name": "BiPCA rank and variance fit",
        "definition": "Retain mp_rank, empirical spectrum, variance model and fit diagnostics, including resource and convergence states.",
        "purpose": "Measurement-variance modeling and spectral-rank diagnostics"
      },
      "fr": {
        "name": "Rang et ajustement de variance BiPCA",
        "definition": "Conserver mp_rank, spectre, modèle de variance et diagnostics, avec ressources et convergence.",
        "purpose": "Modélisation de variance de mesure et diagnostic du rang spectral"
      },
      "es": {
        "name": "Rango y ajuste de varianza BiPCA",
        "definition": "Conservar mp_rank, espectro, modelo de varianza y diagnósticos, incluidos recursos y convergencia.",
        "purpose": "Modelado de varianza de medición y diagnóstico del rango espectral"
      },
      "eu": {
        "name": "BiPCA heina eta bariantza-doikuntza",
        "definition": "Gorde mp_rank, espektroa, bariantza-eredua eta diagnostikoak, baliabideak eta konbergentzia barne.",
        "purpose": "Neurketa-bariantzaren modelizazioa eta espektro-heinaren diagnostikoa"
      }
    },
    "v25_representation_noise_separation": {
      "en": {
        "name": "Separate representation and noise conclusions",
        "definition": "Compare state labels across representations, then re-estimate noise on identical raw counts to quantify label sensitivity.",
        "purpose": "Measurement-variance modeling and spectral-rank diagnostics"
      },
      "fr": {
        "name": "Séparer représentation et conclusions sur le bruit",
        "definition": "Comparer les états entre représentations puis réestimer le bruit sur les mêmes comptages bruts.",
        "purpose": "Modélisation de variance de mesure et diagnostic du rang spectral"
      },
      "es": {
        "name": "Separar representación y conclusiones de ruido",
        "definition": "Comparar estados entre representaciones y reestimar ruido en los mismos recuentos brutos.",
        "purpose": "Modelado de varianza de medición y diagnóstico del rango espectral"
      },
      "eu": {
        "name": "Bereizi errepresentazioa eta zarata-ondorioak",
        "definition": "Alderatu egoerak errepresentazioen artean eta berriz estimatu zarata jatorrizko kontaketa beretan.",
        "purpose": "Neurketa-bariantzaren modelizazioa eta espektro-heinaren diagnostikoa"
      }
    },
    "v25_bigsur_mcfano": {
      "en": {
        "name": "Sampling-corrected Fano and feature evidence",
        "definition": "Retain mc_Fano, FDR_adj_pvalue and fitted CV for each sample and analysis set.",
        "purpose": "Sampling-corrected feature selection and correlation networks"
      },
      "fr": {
        "name": "Fano corrigé et preuve des variables",
        "definition": "Conserver mc_Fano, FDR_adj_pvalue et CV ajusté par échantillon et ensemble.",
        "purpose": "Sélection de variables et réseaux de corrélation corrigés de l’échantillonnage"
      },
      "es": {
        "name": "Fano corregido y evidencia de variables",
        "definition": "Conservar mc_Fano, FDR_adj_pvalue y CV ajustado por muestra y conjunto.",
        "purpose": "Selección de variables y redes de correlación corregidas por muestreo"
      },
      "eu": {
        "name": "Fano zuzendua eta ezaugarrien ebidentzia",
        "definition": "Gorde mc_Fano, FDR_adj_pvalue eta doitutako CV lagin eta multzo bakoitzerako.",
        "purpose": "Laginketaren arabera zuzendutako ezaugarri-hautaketa eta korrelazio-sareak"
      }
    },
    "v25_bigsur_correlation": {
      "en": {
        "name": "Corrected correlations and independent edge support",
        "definition": "Use mcPCC and adjusted tests from the correlation module; separately assess sign, effect and edge replication in independent cultures.",
        "purpose": "Sampling-corrected feature selection and correlation networks"
      },
      "fr": {
        "name": "Corrélations corrigées et support indépendant",
        "definition": "Utiliser mcPCC et tests corrigés ; évaluer séparément signe, effet et réplication dans des cultures indépendantes.",
        "purpose": "Sélection de variables et réseaux de corrélation corrigés de l’échantillonnage"
      },
      "es": {
        "name": "Correlaciones corregidas y soporte independiente",
        "definition": "Usar mcPCC y pruebas ajustadas; evaluar aparte signo, efecto y replicación en cultivos independientes.",
        "purpose": "Selección de variables y redes de correlación corregidas por muestreo"
      },
      "eu": {
        "name": "Korrelazio zuzenduak eta ertz-euskarri independentea",
        "definition": "Erabili mcPCC eta proba zuzenduak; ebaluatu bereizita zeinua, efektua eta erreplikazioa kultibo independenteetan.",
        "purpose": "Laginketaren arabera zuzendutako ezaugarri-hautaketa eta korrelazio-sareak"
      }
    },
    "v25_pseudotime_rank_stability": {
      "en": {
        "name": "Pseudotime ordering stability",
        "definition": "Compare re-inferred order on jointly retained cells; align cyclic orientation and origin and match branches first.",
        "purpose": "Propagate ordering uncertainty into pseudotime trend tests"
      },
      "fr": {
        "name": "Stabilité de l’ordre pseudotemporel",
        "definition": "Comparer les ordres sur cellules communes ; aligner direction, origine cyclique et branches.",
        "purpose": "Propager l’incertitude d’ordre aux tests de tendance"
      },
      "es": {
        "name": "Estabilidad del orden pseudotemporal",
        "definition": "Comparar órdenes en células comunes; alinear orientación, origen cíclico y ramas.",
        "purpose": "Propagar incertidumbre de orden a pruebas de tendencia"
      },
      "eu": {
        "name": "Pseudodenboraren ordena-egonkortasuna",
        "definition": "Alderatu ordenak zelula komunetan; lerrokatu norabidea, jatorri ziklikoa eta adarrak lehenik.",
        "purpose": "Propagatu ordenaren ziurgabetasuna joera-probetara"
      }
    },
    "v25_pseudotimede_tests": {
      "en": {
        "name": "Ordering-aware trend tests",
        "definition": "Retain fixed-order and resampled-order gene tests, null calibration and failures; the estimand is a trend.",
        "purpose": "Propagate ordering uncertainty into pseudotime trend tests"
      },
      "fr": {
        "name": "Tests de tendance avec incertitude d’ordre",
        "definition": "Conserver tests à ordre fixe et réestimé, calibration nulle et échecs ; l’objet est une tendance.",
        "purpose": "Propager l’incertitude d’ordre aux tests de tendance"
      },
      "es": {
        "name": "Pruebas de tendencia con incertidumbre de orden",
        "definition": "Conservar pruebas de orden fijo y remuestreado, calibración nula y fallos; se estima una tendencia.",
        "purpose": "Propagar incertidumbre de orden a pruebas de tendencia"
      },
      "eu": {
        "name": "Ordena-ziurgabetasuna duten joera-probak",
        "definition": "Gorde ordena finkoko eta birlagindutako probak, kalibrazio nulua eta hutsegiteak; joera da estimagaia.",
        "purpose": "Propagatu ordenaren ziurgabetasuna joera-probetara"
      }
    },
    "v25_lamian_curve_effect": {
      "en": {
        "name": "Multi-culture trajectory-curve differences",
        "definition": "Retain overall, meanDiff and trendDiff tests separately, with sample design and fit status.",
        "purpose": "Multi-culture trajectory trends and branch uncertainty"
      },
      "fr": {
        "name": "Différences de courbes multi-cultures",
        "definition": "Conserver séparément overall, meanDiff et trendDiff, avec plan et état d’ajustement.",
        "purpose": "Tendances multi-cultures et incertitude des branches"
      },
      "es": {
        "name": "Diferencias de curvas entre cultivos",
        "definition": "Conservar overall, meanDiff y trendDiff por separado, con diseño y estado del ajuste.",
        "purpose": "Tendencias entre cultivos e incertidumbre de ramas"
      },
      "eu": {
        "name": "Kultibo anitzeko ibilbide-kurben aldeak",
        "definition": "Gorde overall, meanDiff eta trendDiff bereizita, diseinuarekin eta doikuntza-egoerarekin.",
        "purpose": "Kultibo anitzeko ibilbide-joerak eta adarren ziurgabetasuna"
      }
    },
    "v25_lamian_branch_support": {
      "en": {
        "name": "Multi-sample branch support and composition uncertainty",
        "definition": "Use evaluate_uncertainty separately for branch recurrence and sample composition; record the resampling level.",
        "purpose": "Multi-culture trajectory trends and branch uncertainty"
      },
      "fr": {
        "name": "Support des branches et incertitude de composition",
        "definition": "Utiliser evaluate_uncertainty pour branches et composition ; consigner le niveau de rééchantillonnage.",
        "purpose": "Tendances multi-cultures et incertitude des branches"
      },
      "es": {
        "name": "Soporte de ramas e incertidumbre de composición",
        "definition": "Usar evaluate_uncertainty para ramas y composición; registrar el nivel de remuestreo.",
        "purpose": "Tendencias entre cultivos e incertidumbre de ramas"
      },
      "eu": {
        "name": "Lagin anitzeko adarren euskarria eta konposizio-ziurgabetasuna",
        "definition": "Erabili evaluate_uncertainty adarrentzat eta konposizioarentzat; erregistratu birlaginketa-maila.",
        "purpose": "Kultibo anitzeko ibilbide-joerak eta adarren ziurgabetasuna"
      }
    },
    "v25_cycle_spectral_agreement": {
      "en": {
        "name": "Spectral-cycle agreement with independent evidence",
        "definition": "Evaluate cyclic order with held-out yeast-cycle genes or independent labels and retain conflicting cells.",
        "purpose": "Cyclic structure reconstruction and signal sensitivity"
      },
      "fr": {
        "name": "Concordance du cycle spectral avec preuves indépendantes",
        "definition": "Évaluer l’ordre avec gènes cycliques réservés ou labels indépendants et conserver les conflits.",
        "purpose": "Reconstruction cyclique et sensibilité du signal"
      },
      "es": {
        "name": "Concordancia del ciclo espectral con evidencia independiente",
        "definition": "Evaluar el orden con genes reservados o etiquetas independientes y conservar conflictos.",
        "purpose": "Reconstrucción cíclica y sensibilidad de señal"
      },
      "eu": {
        "name": "Ziklo espektralaren adostasuna ebidentzia independentearekin",
        "definition": "Ebaluatu ordena erreserbatutako ziklo-geneekin edo etiketa independenteekin, eta gorde gatazkak.",
        "purpose": "Egitura ziklikoaren berreraikuntza eta seinale-sentikortasuna"
      }
    },
    "v25_cycle_enhancement_sensitivity": {
      "en": {
        "name": "Cycle enhancement or filtering sensitivity",
        "definition": "Compare labels and orders before and after enhancement; recompute noise effects using unchanged raw counts.",
        "purpose": "Cyclic structure reconstruction and signal sensitivity"
      },
      "fr": {
        "name": "Sensibilité à l’amplification ou au filtrage du cycle",
        "definition": "Comparer labels et ordres avant/après amplification ; recalculer le bruit sur les comptages bruts inchangés.",
        "purpose": "Reconstruction cyclique et sensibilité du signal"
      },
      "es": {
        "name": "Sensibilidad al realce o filtrado del ciclo",
        "definition": "Comparar etiquetas y órdenes antes/después del realce; recalcular ruido con recuentos brutos intactos.",
        "purpose": "Reconstrucción cíclica y sensibilidad de señal"
      },
      "eu": {
        "name": "Zikloaren indartze- edo iragazte-sentikortasuna",
        "definition": "Alderatu etiketak eta ordenak indartu aurretik eta ondoren; berriz kalkulatu zarata jatorrizko kontaketa aldatu gabeekin.",
        "purpose": "Egitura ziklikoaren berreraikuntza eta seinale-sentikortasuna"
      }
    },
    "v25_temporal_transport": {
      "en": {
        "name": "Temporal transport convergence and uncertainty",
        "definition": "Record couplings, objective, convergence and entropy, with regularization and mass-assumption sensitivity.",
        "purpose": "Optimal transport across sampling times and held-out prediction"
      },
      "fr": {
        "name": "Convergence et incertitude du transport temporel",
        "definition": "Consigner couplages, objectif, convergence et entropie ; tester régularisation et hypothèses de masse.",
        "purpose": "Transport optimal entre temps réels et prédiction réservée"
      },
      "es": {
        "name": "Convergencia e incertidumbre del transporte temporal",
        "definition": "Registrar acoplamientos, objetivo, convergencia y entropía; probar regularización y supuestos de masa.",
        "purpose": "Transporte óptimo entre tiempos reales y predicción reservada"
      },
      "eu": {
        "name": "Denborazko garraioaren konbergentzia eta ziurgabetasuna",
        "definition": "Erregistratu akoplamenduak, helburua, konbergentzia eta entropia; probatu erregularizazioa eta masa-hipotesiak.",
        "purpose": "Laginketa-denboren arteko garraio optimoa eta iragarpen erreserbatua"
      }
    },
    "v25_temporal_holdout": {
      "en": {
        "name": "Held-out time-point distribution prediction",
        "definition": "Compare held-out distribution errors with no-change, nearest-time and random-transport baselines.",
        "purpose": "Optimal transport across sampling times and held-out prediction"
      },
      "fr": {
        "name": "Prédiction de distribution à temps réservé",
        "definition": "Comparer l’erreur réservée aux références sans changement, temps voisin et transport aléatoire.",
        "purpose": "Transport optimal entre temps réels et prédiction réservée"
      },
      "es": {
        "name": "Predicción de distribución en tiempos reservados",
        "definition": "Comparar errores reservados con referencias sin cambio, tiempo cercano y transporte aleatorio.",
        "purpose": "Transporte óptimo entre tiempos reales y predicción reservada"
      },
      "eu": {
        "name": "Denbora-puntu erreserbatuen banaketa-iragarpena",
        "definition": "Alderatu erroreak aldaketarik gabeko, denbora hurbileneko eta ausazko garraio-erreferentziekin.",
        "purpose": "Laginketa-denboren arteko garraio optimoa eta iragarpen erreserbatua"
      }
    },
    "v25_power_detection": {
      "en": {
        "name": "Detection probability and conditional power",
        "definition": "Report detectability and mean-test power conditional on detection separately, with independent-sample and cell counts.",
        "purpose": "Calibrate mean-test power and detection probability from yeast pilots"
      },
      "fr": {
        "name": "Détection et puissance conditionnelle",
        "definition": "Séparer détectabilité et puissance moyenne conditionnelle, avec effectifs d’échantillons indépendants et cellules.",
        "purpose": "Calibrer puissance des tests de moyenne et détection sur données pilotes de levure"
      },
      "es": {
        "name": "Detección y potencia condicional",
        "definition": "Separar detectabilidad y potencia media condicional, con números de muestras independientes y células.",
        "purpose": "Calibrar potencia de medias y probabilidad de detección con pilotos de levadura"
      },
      "eu": {
        "name": "Detekzio-probabilitatea eta baldintzazko potentzia",
        "definition": "Bereizi detektagarritasuna eta baldintzazko batezbesteko-potentzia, lagin independenteen eta zelulen kopuruekin.",
        "purpose": "Kalibratu batezbestekoen potentzia eta detekzio-probabilitatea legamia-pilotuekin"
      }
    },
    "v25_power_prior_transfer": {
      "en": {
        "name": "Yeast-prior transfer and power sensitivity",
        "definition": "Replace gene count, detection, depth, multiplet and effect priors; compare pilot fit and power. Separately verify ploidy and HWE for genetic simulation.",
        "purpose": "Calibrate mean-test power and detection probability from yeast pilots"
      },
      "fr": {
        "name": "Transfert des a priori de levure et sensibilité",
        "definition": "Remplacer nombre de gènes, détection, profondeur, multiplets et effets ; comparer ajustement et puissance. Vérifier séparément ploïdie et HWE.",
        "purpose": "Calibrer puissance des tests de moyenne et détection sur données pilotes de levure"
      },
      "es": {
        "name": "Transferencia de supuestos y sensibilidad de potencia",
        "definition": "Sustituir número de genes, detección, profundidad, multipletes y efectos; comparar ajuste y potencia. Verificar ploidía y HWE aparte.",
        "purpose": "Calibrar potencia de medias y probabilidad de detección con pilotos de levadura"
      },
      "eu": {
        "name": "Legamia-aurrekoen transferentzia eta potentzia-sentikortasuna",
        "definition": "Ordezkatu gene kopurua, detekzioa, sakonera, multipleteak eta efektuak; alderatu doikuntza eta potentzia. Egiaztatu ploidia eta HWE bereizita.",
        "purpose": "Kalibratu batezbestekoen potentzia eta detekzio-probabilitatea legamia-pilotuekin"
      }
    }
  }
};window.YV_CONTENT=window.YV_CONTENT||{};for(const [type,rows] of Object.entries(content)){window.YV_CONTENT[type]=window.YV_CONTENT[type]||{};for(const [id,langs] of Object.entries(rows)){const target=window.YV_CONTENT[type][id]=window.YV_CONTENT[type][id]||{};for(const [lang,fields] of Object.entries(langs))target[lang]=Object.assign(target[lang]||{},fields);}}})();

// v25c: documented BASiCS branches and perturbation estimands.
(()=>{const text={
  "贝叶斯均值、残差变异与采样诊断": {
    "en": "Bayesian means, residual variability and sampler diagnostics",
    "fr": "Moyennes bayésiennes, variabilité résiduelle et diagnostic des chaînes",
    "es": "Medias bayesianas, variabilidad residual y diagnóstico del muestreo",
    "eu": "Batezbesteko bayestarrak, hondar-aldakortasuna eta laginketa-diagnostikoak"
  },
  "未归一化整数计数；细胞对应菌株、状态、培养和技术批次。": {
    "en": "Unnormalized integer counts; map each cell to strain, state, culture and technical batch.",
    "fr": "Comptages entiers non normalisés ; relier chaque cellule à sa souche, son état, sa culture et son lot technique.",
    "es": "Recuentos enteros sin normalizar; vincular cada célula con cepa, estado, cultivo y lote técnico.",
    "eu": "Normalizatu gabeko zenbaki osoko kontaketak; lotu zelula bakoitza anduiarekin, egoerarekin, kultiboarekin eta sorta teknikoarekin."
  },
  "WithSpikes=TRUE：提供真实spike-in身份和每反应输入分子数，并核对稀释与体积。": {
    "en": "WithSpikes=TRUE: provide actual spike-in identities and input molecules per reaction; verify dilution and volume.",
    "fr": "WithSpikes=TRUE : fournir les identités réelles des spike-ins et les molécules par réaction ; vérifier dilution et volume.",
    "es": "WithSpikes=TRUE: aportar las identidades reales de los spike-ins y las moléculas por reacción; verificar dilución y volumen.",
    "eu": "WithSpikes=TRUE: eman benetako spike-in identitateak eta erreakzioko sarrera-molekulak; egiaztatu diluzioa eta bolumena."
  },
  "WithSpikes=FALSE：同一建模生物群体需有多个真实技术重复，并在BatchInfo中记录；单一batch不满足要求。": {
    "en": "WithSpikes=FALSE: multiple genuine technical replicates of the same modelled biological population are required in BatchInfo; one batch is insufficient.",
    "fr": "WithSpikes=FALSE : plusieurs répétitions techniques réelles de la même population biologique modélisée doivent figurer dans BatchInfo ; un seul lot ne suffit pas.",
    "es": "WithSpikes=FALSE: se requieren varias réplicas técnicas reales de la misma población biológica modelada en BatchInfo; un solo lote no basta.",
    "eu": "WithSpikes=FALSE: modelatutako populazio biologiko beraren benetako erreplika tekniko anitz behar dira BatchInfo eremuan; sorta bakarra ez da nahikoa."
  },
  "菌株、处理或随机拆分的细胞不能冒充技术重复；独立培养重复另用于生物学推断。": {
    "en": "Strains, treatments or random cell splits are not technical replicates; independent cultures separately support biological inference.",
    "fr": "Les souches, traitements ou partitions aléatoires de cellules ne sont pas des répétitions techniques ; les cultures indépendantes servent à l’inférence biologique.",
    "es": "Las cepas, tratamientos o divisiones aleatorias de células no son réplicas técnicas; los cultivos independientes sustentan por separado la inferencia biológica.",
    "eu": "Anduiak, tratamenduak edo ausaz banatutako zelulak ez dira erreplika teknikoak; kultibo independenteek inferentzia biologikoa bermatzen dute bereizita."
  },
  "均值、过度离散与残差变异后验": {
    "en": "Posterior means, overdispersion and residual variability",
    "fr": "Moyennes, surdispersion et variabilité résiduelle a posteriori",
    "es": "Medias, sobredispersión y variabilidad residual posteriores",
    "eu": "Batezbestekoen, gainbarreiaduraren eta hondar-aldakortasunaren ondorengo banaketak"
  },
  "差异均值与变异概率、效应区间及EFDR": {
    "en": "Differential mean/variability probabilities, effect intervals and EFDR",
    "fr": "Probabilités de différences de moyenne et de variabilité, intervalles d’effet et EFDR",
    "es": "Probabilidades de diferencias de media y variabilidad, intervalos de efecto y EFDR",
    "eu": "Batezbesteko eta aldakortasun desberdinen probabilitateak, efektu-tarteak eta EFDR"
  },
  "链混合、有效样本量与拟合诊断": {
    "en": "Chain mixing, effective sample size and fit diagnostics",
    "fr": "Mélange des chaînes, taille effective et diagnostics d’ajustement",
    "es": "Mezcla de cadenas, tamaño efectivo y diagnóstico del ajuste",
    "eu": "Kateen nahasketa, lagin-tamaina eraginkorra eta doikuntza-diagnostikoak"
  },
  "选择技术信息分支": {
    "en": "Choose the technical-information branch",
    "fr": "Choisir la branche d’information technique",
    "es": "Elegir la rama de información técnica",
    "eu": "Aukeratu informazio teknikoaren adarra"
  },
  "按真实建库记录选择spike或no-spike；分别核对下列条件。": {
    "en": "Choose spike or no-spike from the actual library records; verify the conditions below separately.",
    "fr": "Choisir spike ou no-spike selon les données réelles de préparation ; vérifier séparément les conditions ci-dessous.",
    "es": "Elegir spike o no-spike según los registros reales de biblioteca; verificar por separado las condiciones siguientes.",
    "eu": "Aukeratu spike edo no-spike liburutegiaren benetako erregistroen arabera; egiaztatu beheko baldintzak bereizita."
  },
  "真实技术重复身份": {
    "en": "Genuine technical-replicate identity",
    "fr": "Identité des répétitions techniques réelles",
    "es": "Identidad de las réplicas técnicas reales",
    "eu": "Benetako erreplika teknikoen identitatea"
  },
  "spike-in输入量与来源": {
    "en": "Spike-in amounts and provenance",
    "fr": "Quantités de spike-ins et provenance",
    "es": "Cantidades de spike-ins y procedencia",
    "eu": "Spike-in kantitateak eta jatorria"
  },
  "均值—过度离散趋势": {
    "en": "Mean–overdispersion trend",
    "fr": "Tendance moyenne–surdispersion",
    "es": "Tendencia media–sobredispersión",
    "eu": "Batezbestekoaren eta gainbarreiaduraren joera"
  },
  "Regression=TRUE估计相对均值趋势的残差变异；残差并不等同于内在噪音。": {
    "en": "Regression=TRUE estimates variability relative to the mean trend; the residual is not equivalent to intrinsic noise.",
    "fr": "Regression=TRUE estime la variabilité relative à la tendance moyenne ; le résidu n’est pas le bruit intrinsèque.",
    "es": "Regression=TRUE estima la variabilidad respecto a la tendencia de la media; el residuo no equivale al ruido intrínseco.",
    "eu": "Regression=TRUE aukerak batezbestekoaren joerarekiko aldakortasuna estimatzen du; hondarra ez da berezko zarataren baliokidea."
  },
  "采样长度与保留规则": {
    "en": "Sampling length and retention",
    "fr": "Longueur des chaînes et conservation",
    "es": "Longitud del muestreo y conservación",
    "eu": "Laginketaren luzera eta gordetze-arauak"
  },
  "依据链诊断设置N、Burn和Thin；记录独立链的种子、初始化与先验，不套用教程迭代数。": {
    "en": "Set N, Burn and Thin from chain diagnostics; record independent-chain seeds, initialization and priors rather than copying tutorial iteration counts.",
    "fr": "Définir N, Burn et Thin selon les diagnostics ; consigner graines, initialisations et a priori des chaînes indépendantes, sans recopier le nombre d’itérations du tutoriel.",
    "es": "Fijar N, Burn y Thin según el diagnóstico; registrar semillas, inicialización y priors de cadenas independientes, sin copiar iteraciones del tutorial.",
    "eu": "Ezarri N, Burn eta Thin kateen diagnostikoen arabera; erregistratu kate independenteen haziak, hasierak eta aurreko banaketak, tutorialeko iterazioak kopiatu gabe."
  },
  "多链与预测诊断": {
    "en": "Multiple-chain and predictive diagnostics",
    "fr": "Diagnostics multichaînes et prédictifs",
    "es": "Diagnósticos de múltiples cadenas y predictivos",
    "eu": "Kate anitzeko eta iragarpen-diagnostikoak"
  },
  "审查trace、rank-normalized R-hat、bulk/tail ESS、MCSE及先验/后验预测；额外多链汇总需保留真实chain维度并实现提取。": {
    "en": "Review traces, rank-normalized R-hat, bulk/tail ESS, MCSE and prior/posterior predictions; additional multi-chain summaries require an extraction adapter preserving actual chain identity.",
    "fr": "Examiner traces, R-hat normalisé par rangs, ESS central/de queue, MCSE et prédictions a priori/a posteriori ; les résumés multichaînes nécessitent une extraction préservant l’identité des chaînes.",
    "es": "Revisar trazas, R-hat normalizado por rangos, ESS central/de colas, MCSE y predicciones previas/posteriores; los resúmenes multicadena requieren una extracción que preserve su identidad.",
    "eu": "Aztertu trazak, mailaz normalizatutako R-hat, erdiko eta isatsetako ESS, MCSE eta aurreko/ondorengo iragarpenak; kate anitzeko laburpenek benetako kate-identitatea gordetzen duen erauzketa behar dute."
  },
  "效应尺度与多重检验": {
    "en": "Effect scales and multiple testing",
    "fr": "Échelles d’effet et tests multiples",
    "es": "Escalas de efecto y pruebas múltiples",
    "eu": "Efektu-eskalak eta proba anitzak"
  },
  "EpsilonM/EpsilonD使用log2差异；EpsilonR使用残差差异尺度。预先声明效应容忍区间、EFDR和MinESS。": {
    "en": "EpsilonM/EpsilonD use log2 differences; EpsilonR uses the residual-difference scale. Prespecify effect tolerances, EFDR and MinESS.",
    "fr": "EpsilonM/EpsilonD utilisent les différences log2 ; EpsilonR utilise l’échelle des différences résiduelles. Prédéfinir tolérances d’effet, EFDR et MinESS.",
    "es": "EpsilonM/EpsilonD usan diferencias log2; EpsilonR usa la escala de diferencia residual. Predefinir tolerancias, EFDR y MinESS.",
    "eu": "EpsilonM/EpsilonD parametroek log2 aldeak erabiltzen dituzte; EpsilonR parametroak hondar-aldeen eskala. Aurrez zehaztu efektu-tolerantziak, EFDR eta MinESS."
  },
  "全局RNA水平与偏移校正": {
    "en": "Global RNA level and offset correction",
    "fr": "Niveau global d’ARN et correction du décalage",
    "es": "Nivel global de ARN y corrección del desplazamiento",
    "eu": "RNA-maila globala eta desplazamenduaren zuzenketa"
  },
  "正式参数为Offset；按是否保留全局RNA含量差异选择，记录该选择对估计目标的影响。": {
    "en": "The formal argument is Offset; decide whether global RNA-content differences belong to the estimand and record the consequence.",
    "fr": "L’argument officiel est Offset ; déterminer si les différences globales de contenu en ARN appartiennent à la cible d’estimation et documenter ce choix.",
    "es": "El argumento formal es Offset; decidir si las diferencias globales de ARN forman parte del estimando y documentar su efecto.",
    "eu": "Parametro ofiziala Offset da; erabaki RNA-eduki globalaren aldeak estimazio-helburuan sartzen diren eta dokumentatu ondorioa."
  },
  "此处列明两条技术分支；自动输入检查目前只核对计数与样本信息，技术重复或spike证据需人工确认。": {
    "en": "Both technical branches are documented here; automatic input checks currently cover counts and metadata only. Technical-replicate or spike evidence requires manual review.",
    "fr": "Les deux branches techniques sont décrites ici ; le contrôle automatique couvre actuellement les comptages et métadonnées. Les preuves de répétitions techniques ou de spike-ins nécessitent une vérification manuelle.",
    "es": "Aquí se documentan ambas ramas; la comprobación automática cubre por ahora recuentos y metadatos. La evidencia de réplicas técnicas o spike-ins requiere revisión manual.",
    "eu": "Bi adar teknikoak hemen dokumentatuta daude; sarreren egiaztapen automatikoak kontaketak eta metadatuak baino ez ditu aztertzen. Erreplika teknikoen edo spike-in ebidentzia eskuz berrikusi behar da."
  },
  "未测spike-in不能补出绝对技术校准；良好链混合也不能解决模型不可辨识。": {
    "en": "Unmeasured spike-ins cannot provide absolute technical calibration; good chain mixing does not resolve model non-identifiability.",
    "fr": "Des spike-ins non mesurés ne fournissent pas de calibration technique absolue ; un bon mélange des chaînes ne résout pas la non-identifiabilité du modèle.",
    "es": "Los spike-ins no medidos no aportan calibración técnica absoluta; una buena mezcla de cadenas no resuelve la no identificabilidad del modelo.",
    "eu": "Neurtu gabeko spike-inek ez dute kalibrazio tekniko absoluturik ematen; kateen nahasketa onak ez du ereduaren identifikagarritasun-eza konpontzen."
  },
  "并列保留模型失配、先验敏感性与拟合失败记录；培养层推断不以细胞数替代独立重复。": {
    "en": "Retain model-misfit, prior-sensitivity and failed-fit records; culture-level inference cannot replace independent replication with cell count.",
    "fr": "Conserver les écarts au modèle, sensibilités aux a priori et échecs d’ajustement ; le nombre de cellules ne remplace pas les répétitions indépendantes.",
    "es": "Conservar desajustes del modelo, sensibilidad a priors y fallos de ajuste; el número de células no sustituye réplicas independientes.",
    "eu": "Gorde eredu-desegokitasunak, aurrekoen sentikortasuna eta doikuntza-hutsegiteak; zelula kopuruak ez ditu erreplika independenteak ordezkatzen."
  },
  "分别估计处理后的均值、边际方差与状态比例变化；将模型配对的个体效应作为假设依赖结果，在留出菌株或扰动组合上比较完整分布与简单基线。": {
    "en": "Estimate treatment-associated changes in mean, marginal variance and state proportions separately. Treat model-paired individual effects as assumption-dependent and compare full distributions with simple baselines on held-out strains or perturbation combinations.",
    "fr": "Estimer séparément les changements de moyenne, variance marginale et proportions d’états. Les effets individuels issus de l’appariement dépendent d’hypothèses ; comparer les distributions complètes aux références simples sur des souches ou combinaisons réservées.",
    "es": "Estimar por separado cambios de media, varianza marginal y proporciones de estados. Los efectos individuales emparejados dependen de supuestos; comparar distribuciones completas con referencias simples en cepas o combinaciones reservadas.",
    "eu": "Estimatu bereizita batezbestekoaren, bariantza marjinalaren eta egoera-proportzioen aldaketak. Ereduz parekatutako banako-efektuak hipotesien mendekoak dira; alderatu banaketa osoak erreferentzia sinpleekin erreserbatutako andui edo perturbazio-konbinazioetan."
  },
  "均值效应：比较处理与对照的平均表达，明确计数或丰度尺度。": {
    "en": "Mean effect: compare average expression between treatment and control on a declared count or abundance scale.",
    "fr": "Effet moyen : comparer l’expression moyenne entre traitement et témoin sur une échelle déclarée de comptage ou d’abondance.",
    "es": "Efecto medio: comparar la expresión promedio entre tratamiento y control en una escala declarada de recuento o abundancia.",
    "eu": "Batezbesteko-efektua: alderatu tratamenduaren eta kontrolaren batezbesteko adierazpena, zehaztutako kontaketa- edo ugaritasun-eskalan."
  },
  "边际方差效应：比较两组表达分布宽度，并区分测量贡献与状态混合；它不等于个体处理效应的方差。": {
    "en": "Marginal-variance effect: compare distribution widths while separating measurement contributions and state mixtures; this is not the variance of individual treatment effects.",
    "fr": "Effet sur la variance marginale : comparer la dispersion en distinguant mesure et mélange d’états ; ce n’est pas la variance des effets individuels.",
    "es": "Efecto sobre la varianza marginal: comparar la amplitud de las distribuciones separando medición y mezcla de estados; no equivale a la varianza de efectos individuales.",
    "eu": "Bariantza marjinalaren efektua: alderatu banaketen zabalera, neurketa-ekarpenak eta egoera-nahasketak bereizita; ez da banako tratamendu-efektuen bariantza."
  },
  "状态比例效应：量化处理后状态组成变化，与状态内表达效应并列报告。": {
    "en": "State-proportion effect: quantify changes in state composition and report them alongside within-state expression effects.",
    "fr": "Effet sur les proportions d’états : quantifier les changements de composition et les rapporter avec les effets d’expression intra-état.",
    "es": "Efecto sobre proporciones de estados: cuantificar cambios de composición y comunicarlos junto con los efectos de expresión dentro de cada estado.",
    "eu": "Egoera-proportzioen efektua: kuantifikatu osaeraren aldaketak eta aurkeztu egoera barruko adierazpen-efektuekin batera."
  },
  "个体效应异质性：同一细胞的处理与对照潜在结果未同时观测；OT匹配依赖模型，不能据此直接识别其联合分布。": {
    "en": "Individual-effect heterogeneity: both potential outcomes of one cell are not observed together. OT matching is model-dependent and does not directly identify their joint distribution.",
    "fr": "Hétérogénéité des effets individuels : les deux résultats potentiels d’une cellule ne sont pas observés ensemble. L’appariement OT dépend du modèle et n’identifie pas directement leur distribution jointe.",
    "es": "Heterogeneidad de efectos individuales: no se observan conjuntamente ambos resultados potenciales de una célula. El emparejamiento OT depende del modelo y no identifica directamente su distribución conjunta.",
    "eu": "Banako-efektuen heterogeneotasuna: zelula beraren bi emaitza potentzialak ez dira batera behatzen. OT parekatzea ereduaren mendekoa da eta ez du zuzenean haien baterako banaketa identifikatzen."
  },
  "记录处理分配方式、对照、剂量、时间及独立培养；按菌株、培养和扰动组合划分训练与留出集。": {
    "en": "Record assignment, control, dose, time and independent cultures; split training and held-out data by strain, culture and perturbation combination.",
    "fr": "Consigner attribution, témoin, dose, temps et cultures indépendantes ; séparer entraînement et validation par souche, culture et combinaison de perturbations.",
    "es": "Registrar asignación, control, dosis, tiempo y cultivos independientes; separar entrenamiento y validación por cepa, cultivo y combinación de perturbaciones.",
    "eu": "Erregistratu esleipena, kontrola, dosia, denbora eta kultibo independenteak; banatu entrenamendu- eta balioztatze-datuak andui, kultibo eta perturbazio-konbinazioaren arabera."
  },
  "先声明计数或潜在丰度尺度、状态定义及总体或状态条件化目标；训练集确定特征和调参。": {
    "en": "Declare the count or latent-abundance scale, state definition and overall or state-conditioned target; use training data for feature selection and tuning.",
    "fr": "Déclarer l’échelle de comptage ou d’abondance latente, la définition des états et la cible globale ou conditionnelle ; sélectionner les variables et régler le modèle sur l’entraînement.",
    "es": "Declarar escala de recuento o abundancia latente, definición de estados y objetivo global o condicionado; seleccionar variables y ajustar con el entrenamiento.",
    "eu": "Zehaztu kontaketa- edo ezkutuko ugaritasun-eskala, egoeren definizioa eta helburu orokorra edo egoeraren araberakoa; hautatu ezaugarriak eta doitu entrenamendu-datuekin."
  },
  "处理后的状态可能是中介或选择变量；条件化分析须说明目标变化，不能默认已去除混杂。": {
    "en": "Post-treatment states may be mediators or selection variables; conditioning changes the target and does not automatically remove confounding.",
    "fr": "Les états après traitement peuvent être des médiateurs ou variables de sélection ; le conditionnement change la cible et n’élimine pas automatiquement la confusion.",
    "es": "Los estados posteriores al tratamiento pueden ser mediadores o variables de selección; condicionar cambia el objetivo y no elimina automáticamente la confusión.",
    "eu": "Tratamenduaren ondorengo egoerak bitartekariak edo hautapen-aldagaiak izan daitezke; baldintzatzeak helburua aldatzen du eta ez du nahastea automatikoki ezabatzen."
  },
  "审查共同支持、匹配质量与运输参数敏感性；生成细胞和随机拆分不增加独立生物学重复。": {
    "en": "Assess common support, matching quality and transport-parameter sensitivity; generated cells and random splits do not add independent biological replicates.",
    "fr": "Évaluer support commun, qualité d’appariement et sensibilité au transport ; les cellules générées et partitions aléatoires n’ajoutent pas de répétitions biologiques indépendantes.",
    "es": "Evaluar soporte común, calidad del emparejamiento y sensibilidad al transporte; las células generadas y divisiones aleatorias no añaden réplicas biológicas independientes.",
    "eu": "Ebaluatu euskarri komuna, parekatzearen kalitatea eta garraio-parametroen sentikortasuna; sortutako zelulek eta ausazko banaketek ez dute erreplika biologiko independenterik gehitzen."
  },
  "天然菌株差异属于观察性比较；预测或模型配对结果不等于已验证的随机干预效应。": {
    "en": "Natural-strain differences are observational contrasts; predictions or model-paired results are not validated randomized-intervention effects.",
    "fr": "Les différences entre souches naturelles sont observationnelles ; les prédictions ou appariements du modèle ne sont pas des effets d’intervention randomisée validés.",
    "es": "Las diferencias entre cepas naturales son contrastes observacionales; las predicciones o resultados emparejados no son efectos validados de intervención aleatorizada.",
    "eu": "Andui naturalen arteko aldeak behaketazko konparazioak dira; iragarpenak edo ereduaren parekatzeak ez dira ausazko esku-hartzeen efektu balioztatuak."
  },
  "处理均值效应及表达尺度": {
    "en": "Treatment mean effect and expression scale",
    "fr": "Effet moyen du traitement et échelle d’expression",
    "es": "Efecto medio del tratamiento y escala de expresión",
    "eu": "Tratamenduaren batezbesteko-efektua eta adierazpen-eskala"
  },
  "边际方差、分位数与尾部变化": {
    "en": "Marginal variance, quantile and tail changes",
    "fr": "Changements de variance marginale, quantiles et queues",
    "es": "Cambios de varianza marginal, cuantiles y colas",
    "eu": "Bariantza marjinalaren, kuantilen eta isatsen aldaketak"
  },
  "状态比例变化与状态内效应": {
    "en": "State-proportion changes and within-state effects",
    "fr": "Changements des proportions d’états et effets intra-état",
    "es": "Cambios en proporciones de estados y efectos intraestado",
    "eu": "Egoera-proportzioen aldaketak eta egoera barruko efektuak"
  },
  "假设依赖的匹配效应及敏感性": {
    "en": "Assumption-dependent matched effects and sensitivity",
    "fr": "Effets appariés dépendant d’hypothèses et sensibilité",
    "es": "Efectos emparejados dependientes de supuestos y sensibilidad",
    "eu": "Hipotesien mendeko parekatutako efektuak eta sentikortasuna"
  },
  "固定处理/对照设计与估计目标，分别分析均值、边际方差、状态比例及匹配效应。": {
    "en": "Fix the treatment/control design and estimand; analyze mean, marginal variance, state proportions and matched effects separately.",
    "fr": "Fixer le plan traitement/témoin et la cible ; analyser séparément moyenne, variance marginale, proportions d’états et effets appariés.",
    "es": "Fijar diseño tratamiento/control y estimando; analizar por separado media, varianza marginal, proporciones y efectos emparejados.",
    "eu": "Finkatu tratamendu/kontrol diseinua eta estimazio-helburua; aztertu bereizita batezbestekoa, bariantza marjinala, egoera-proportzioak eta parekatutako efektuak."
  },
  "效应目标、对照定义、匹配支持与分层结果": {
    "en": "Estimands, control definition, matching support and stratified results",
    "fr": "Cibles d’estimation, définition du témoin, support d’appariement et résultats stratifiés",
    "es": "Estimandos, definición del control, soporte de emparejamiento y resultados estratificados",
    "eu": "Estimazio-helburuak, kontrolaren definizioa, parekatzearen euskarria eta emaitza estratifikatuak"
  },
  "在独立培养或菌株留出中比较完整分布、匹配均值与简单基线，并检验状态组成和测量变化。": {
    "en": "Compare full distributions, matched means and simple baselines in held-out cultures or strains; test state-composition and measurement changes.",
    "fr": "Comparer distributions complètes, moyennes appariées et références simples sur cultures ou souches réservées ; examiner composition et mesure.",
    "es": "Comparar distribuciones completas, medias emparejadas y referencias simples en cultivos o cepas reservados; examinar composición y medición.",
    "eu": "Alderatu banaketa osoak, parekatutako batezbestekoak eta erreferentzia sinpleak erreserbatutako kultibo edo anduietan; aztertu osaeraren eta neurketaren aldaketak."
  },
  "留出误差、基线差值、效应区间与敏感性报告": {
    "en": "Held-out errors, baseline differences, effect intervals and sensitivity report",
    "fr": "Erreurs de validation, écarts aux références, intervalles d’effet et sensibilité",
    "es": "Errores de validación, diferencias frente a referencias, intervalos y sensibilidad",
    "eu": "Balioztatze-erroreak, erreferentziekiko aldeak, efektu-tarteak eta sentikortasun-txostena"
  },
  "在留出菌株或处理组合上，分别检验均值、边际分布和状态组成预测是否优于简单基线。": {
    "en": "On held-out strains or treatments, test whether mean, marginal-distribution and state-composition predictions separately outperform simple baselines.",
    "fr": "Sur des souches ou traitements réservés, tester séparément si les prédictions de moyenne, distribution marginale et composition dépassent les références simples.",
    "es": "En cepas o tratamientos reservados, comprobar por separado si las predicciones de media, distribución marginal y composición superan referencias simples.",
    "eu": "Erreserbatutako andui edo tratamenduetan, probatu bereizita batezbestekoaren, banaketa marjinalaren eta osaeraren iragarpenek erreferentzia sinpleak gainditzen dituzten."
  },
  "边际分布变化不识别个体效应方差；天然菌株保留观察性解释，真正干预的因果解释取决于设计与可辨识假设。": {
    "en": "Marginal-distribution changes do not identify individual-effect variance. Natural strains retain an observational interpretation; causal interpretation of interventions depends on design and identification assumptions.",
    "fr": "Les changements de distribution marginale n’identifient pas la variance des effets individuels. Les souches naturelles restent observationnelles ; l’interprétation causale dépend du plan et des hypothèses d’identification.",
    "es": "Los cambios marginales no identifican la varianza de efectos individuales. Las cepas naturales mantienen interpretación observacional; la causalidad depende del diseño y de supuestos de identificación.",
    "eu": "Banaketa marjinalaren aldaketek ez dute banako-efektuen bariantza identifikatzen. Andui naturalak behaketazkoak dira; kausalitatea diseinuaren eta identifikazio-hipotesien mendekoa da."
  },
  "方法更正": {
    "en": "Method correction",
    "fr": "Correction méthodologique",
    "es": "Corrección del método",
    "eu": "Metodoaren zuzenketa"
  }
};
window.YV_TEXT=window.YV_TEXT||{};Object.assign(window.YV_TEXT,text);
const content={
  "tools": {
    "basics": {
      "en": {
        "task": "Bayesian means, residual variability and sampler diagnostics"
      },
      "fr": {
        "task": "Moyennes bayésiennes, variabilité résiduelle et diagnostic des chaînes"
      },
      "es": {
        "task": "Medias bayesianas, variabilidad residual y diagnóstico del muestreo"
      },
      "eu": {
        "task": "Batezbesteko bayestarrak, hondar-aldakortasuna eta laginketa-diagnostikoak"
      }
    }
  }
};
window.YV_CONTENT=window.YV_CONTENT||{};for(const [type,rows] of Object.entries(content)){window.YV_CONTENT[type]=window.YV_CONTENT[type]||{};for(const [id,langs] of Object.entries(rows)){const target=window.YV_CONTENT[type][id]=window.YV_CONTENT[type][id]||{};for(const [lang,fields] of Object.entries(langs))target[lang]=Object.assign(target[lang]||{},fields);}}})();

// v25c population: observability, trait uncertainty and source-specific evolutionary evidence.
(()=>{
const text={"同一菌株与状态划分下，细胞层面的均值eQTL是否与现有计数模型及状态交互结果一致？": {"en": "Within the same strain and state design, do cell-level mean-eQTL agree with count models and genotype-by-state results?", "fr": "Dans un même plan de souches et d’états, les eQTL de moyenne à l’échelle cellulaire concordent-ils avec les modèles de comptage et les interactions génotype–état ?", "es": "Con el mismo diseño de cepas y estados, ¿concuerdan los eQTL de la media celular con los modelos de conteo y las interacciones genotipo–estado?", "eu": "Andui eta egoera diseinu berean, bat al datoz zelula mailako batezbesteko eQTLak zenbaketa ereduekin eta genotipoaren eta egoeraren arteko emaitzekin?"}, "比较匹配SNP–基因效应、校准、亲缘模型与状态交互；Airqtl残差方差参数不作为噪音QTL检验。": {"en": "Compare matched SNP–gene effects, calibration, relatedness models and state interactions; do not interpret Airqtl residual variance parameters as noise-QTL tests.", "fr": "Comparer les effets SNP–gène appariés, la calibration, la parenté et les interactions d’état ; les paramètres de variance résiduelle d’Airqtl ne sont pas des tests de QTL du bruit.", "es": "Comparar efectos SNP–gen emparejados, calibración, parentesco e interacciones de estado; los parámetros de varianza residual de Airqtl no son pruebas de QTL del ruido.", "eu": "Konparatu SNP–gene efektu parekatuak, kalibrazioa, ahaidetasun ereduak eta egoera interakzioak; Airqtl-en hondar bariantza ez da zarata QTLaren proba."}, "原始计数、细胞→培养/样本→菌株映射、匹配DNA基因型与倍性、参考坐标、状态和协变量；cGRN另需有效cis遗传工具及独立证据。": {"en": "Raw counts, cell-to-culture/sample-to-strain mapping, matched DNA genotypes and ploidy, coordinates, states and covariates; cGRN additionally needs valid cis instruments and independent evidence.", "fr": "Comptages bruts, correspondance cellule→culture/échantillon→souche, génotypes ADN et ploïdie appariés, coordonnées, états et covariables ; le cGRN exige aussi des instruments cis valides et des preuves indépendantes.", "es": "Conteos brutos, correspondencia célula→cultivo/muestra→cepa, genotipos de ADN y ploidía emparejados, coordenadas, estados y covariables; cGRN requiere además instrumentos cis válidos y evidencia independiente.", "eu": "Zenbaketa gordinak, zelula→kultura/lagina→anduia lotura, parekatutako DNA genotipoak eta ploidia, koordenatuak, egoerak eta kobariableak; cGRNak cis tresna baliodunak eta ebidentzia independentea ere behar ditu."}, "噪音关联是否在原始计数测量模型与人类enQTL的均值趋势残差定义间保持一致？": {"en": "Do noise associations agree between raw-count measurement models and the mean-trend residual definition used in human enQTL analysis?", "fr": "Les associations du bruit concordent-elles entre les modèles de mesure sur comptages bruts et les résidus de tendance moyenne utilisés pour les enQTL humains ?", "es": "¿Concuerdan las asociaciones del ruido entre los modelos de medición de conteos brutos y la definición residual de tendencia media de los enQTL humanos?", "eu": "Bat al datoz zarata elkarteak zenbaketa gordinen neurketa ereduen eta giza enQTLetan erabilitako batezbesteko joeraren hondarren artean?"}, "并列保存观察与拟合CV²、比值、对数底数、矩阵来源、有效细胞数和缺失原因，比较归一化与性状定义的敏感性。": {"en": "Retain observed and fitted CV², their ratio and log base, matrix provenance, effective cell counts and missingness reasons to compare normalization and trait definitions.", "fr": "Conserver les CV² observés et ajustés, leur rapport, la base logarithmique, la provenance matricielle, les effectifs cellulaires et les raisons des valeurs manquantes pour comparer les normalisations et les traits.", "es": "Conservar CV² observado y ajustado, su cociente y base logarítmica, procedencia de la matriz, células efectivas y motivos de ausencia para comparar normalización y definición del rasgo.", "eu": "Gorde behatutako eta doitutako CV², haien zatidura eta logaritmo oinarria, matrizearen jatorria, zelula kopuru eraginkorra eta falta diren balioen arrazoiak, normalizazioa eta ezaugarri definizioak konparatzeko."}, "可追溯计数与SCT比较层、菌株/培养/状态标签；关联另需匹配基因型、亲缘和真实样本量，结构缺失不得当作普通缺失值插补。": {"en": "Traceable counts and an SCT comparison layer, strain/culture/state labels; associations also need matched genotypes, relatedness and true sample sizes. Structural absence must not be imputed as ordinary missingness.", "fr": "Comptages traçables, couche SCT comparative et étiquettes souche/culture/état ; les associations exigent génotypes, parenté et tailles réelles d’échantillon. Une absence structurale ne doit pas être imputée comme une donnée manquante ordinaire.", "es": "Conteos trazables, capa SCT comparativa y etiquetas de cepa/cultivo/estado; las asociaciones requieren genotipos, parentesco y tamaños muestrales reales. La ausencia estructural no se imputa como un valor faltante ordinario.", "eu": "Zenbaketa trazagarriak, SCT konparazio geruza eta andui/kultura/egoera etiketak; elkarteek genotipo parekatuak, ahaidetasuna eta benetako lagin tamainak behar dituzte. Egiturazko absentzia ezin da ohiko falta gisa inputatu."}, "基因零计数来自未捕获、无法唯一归属，还是已有DNA证实的结构缺失？": {"en": "Does a gene zero reflect failed capture, ambiguous assignment or structural absence supported by matched DNA?", "fr": "Un comptage nul traduit-il une capture manquée, une attribution ambiguë ou une absence structurale étayée par l’ADN apparié ?", "es": "¿Un cero génico refleja falta de captura, asignación ambigua o ausencia estructural respaldada por ADN emparejado?", "eu": "Gene baten zeroak harrapaketa falta, esleipen anbiguoa edo DNA parekatuak egiaztatutako egiturazko absentzia adierazten du?"}, "按基因×菌株保存独立UMI、唯一归属、参考覆盖、DNA存在/拷贝证据和噪音性状缺失原因；比较只在所需可观测范围内进行。": {"en": "For each gene–strain pair, retain UMI support, unique assignment, reference coverage, DNA presence/copy evidence and reasons for missing noise traits; compare within the required measurable domain.", "fr": "Pour chaque paire gène–souche, conserver le soutien UMI, l’attribution unique, la couverture de référence, les preuves ADN de présence/copie et les motifs d’absence du trait de bruit ; comparer dans le domaine mesurable requis.", "es": "Por cada par gen–cepa, conservar apoyo UMI, asignación única, cobertura de referencia, evidencia de presencia/copia en ADN y motivos de ausencia del rasgo de ruido; comparar dentro del dominio medible requerido.", "eu": "Gene–andui bikote bakoitzean gorde UMI euskarria, esleipen bakarra, erreferentzia estaldura, DNA presentzia/kopia ebidentzia eta zarata ezaugarriaren falta arrazoiak; konparatu behar den eremu neurgarrian."}, "计数、参考和细胞→菌株映射；归属审核需带tag BAM。结构缺失和拷贝判定需匹配DNA或核验泛基因组，无DNA时保留未知。": {"en": "Counts, reference and cell-to-strain mapping; assignment audit needs tagged BAM. Structural absence/copy calls require matched DNA or verified pangenome evidence; without DNA, retain unknown status.", "fr": "Comptages, référence et correspondance cellule–souche ; l’audit d’attribution exige un BAM étiqueté. Les appels d’absence structurale ou de copie exigent de l’ADN apparié ou un pangénome vérifié ; sans ADN, conserver le statut inconnu.", "es": "Conteos, referencia y correspondencia célula–cepa; la auditoría de asignación requiere BAM con etiquetas. La ausencia estructural o las copias requieren ADN emparejado o un pangenoma verificado; sin ADN, conservar el estado desconocido.", "eu": "Zenbaketak, erreferentzia eta zelula–andui lotura; esleipen auditoretzak etiketatutako BAMa behar du. Egiturazko absentzia/kopia deiak DNA parekatua edo egiaztatutako pangenoma behar dute; DNArik gabe, egoera ezezaguna mantendu."}, "菌株噪音差异中，哪些由亲缘解释，哪些来自培养或性状估计不精确？": {"en": "Which strain differences in noise are explained by relatedness, culture variation or imprecise trait estimates?", "fr": "Quelles différences de bruit entre souches s’expliquent par la parenté, la variation des cultures ou l’imprécision des estimations ?", "es": "¿Qué diferencias de ruido entre cepas explican el parentesco, la variación entre cultivos o la imprecisión de las estimaciones?", "eu": "Anduien arteko zein zarata desberdintasun azaltzen dituzte ahaidetasunak, kulturen aldakortasunak edo estimazio zehaztugabeek?"}, "保存噪音估计、标准误/抽样协方差或后验样本、细胞与培养支持、性状尺度和亲缘版本；比较纳入与忽略性状误差时的遗传方差。": {"en": "Store noise estimates, standard errors/sampling covariance or posterior draws, cell/culture support, scale and kinship version; compare genetic variance with and without trait uncertainty.", "fr": "Conserver les estimations du bruit, erreurs-types/covariance d’échantillonnage ou tirages postérieurs, effectifs cellulaires et de cultures, échelle et version de parenté ; comparer la variance génétique avec et sans incertitude du trait.", "es": "Guardar estimaciones de ruido, errores estándar/covarianza de muestreo o muestras posteriores, apoyo celular/de cultivos, escala y versión de parentesco; comparar la varianza genética con y sin incertidumbre del rasgo.", "eu": "Gorde zarata estimazioak, errore estandarrak/laginketa kobariantza edo posterior laginak, zelula/kultura euskarria, eskala eta ahaidetasun bertsioa; konparatu bariantza genetikoa ezaugarriaren ziurgabetasunarekin eta gabe."}, "菌株×培养×状态噪音性状及其误差、基因型亲缘、真实培养结构和协变量；均值、状态组成与噪音是不同性状。": {"en": "Strain-by-culture-by-state noise traits and uncertainty, genotype-based relatedness, true culture structure and covariates; mean, state composition and noise are distinct traits.", "fr": "Traits de bruit souche×culture×état et incertitudes, parenté génotypique, structure réelle des cultures et covariables ; moyenne, composition d’états et bruit sont des traits distincts.", "es": "Rasgos de ruido cepa×cultivo×estado e incertidumbre, parentesco genotípico, estructura real de cultivos y covariables; media, composición de estados y ruido son rasgos diferentes.", "eu": "Andui×kultura×egoera zarata ezaugarriak eta ziurgabetasuna, genotipoen ahaidetasuna, benetako kultura egitura eta kobariableak; batezbestekoa, egoera osaera eta zarata ezaugarri desberdinak dira."}, "重复基因合计表达是否在可比均值、状态和分子归属条件下更稳定，并保持环境响应？": {"en": "Is summed paralog expression more stable at comparable mean, state and molecular assignment while retaining environmental responsiveness?", "fr": "L’expression cumulée des paralogues est-elle plus stable à moyenne, état et attribution moléculaire comparables, tout en conservant sa réponse à l’environnement ?", "es": "¿Es más estable la expresión sumada de parálogos con media, estado y asignación molecular comparables, manteniendo la respuesta ambiental?", "eu": "Paralogoen adierazpen batura egonkorragoa al da batezbesteko, egoera eta esleipen molekular konparagarriekin, ingurunearekiko erantzuna mantenduz?"}, "在已有合计方差分解中补重复来源、归属不确定性、条件内协方差和跨环境均值/噪音响应；协方差置零仅为代数基线。": {"en": "Extend summed-variance decomposition with duplication provenance, assignment uncertainty, within-condition covariance and cross-environment mean/noise responses; zero covariance is only an algebraic baseline.", "fr": "Compléter la décomposition de variance cumulée par l’origine des duplications, l’incertitude d’attribution, la covariance au sein des conditions et les réponses moyenne/bruit entre environnements ; la covariance nulle n’est qu’une référence algébrique.", "es": "Ampliar la descomposición de varianza sumada con el origen de duplicaciones, incertidumbre de asignación, covarianza dentro de condición y respuestas de media/ruido entre ambientes; la covarianza cero es solo una referencia algebraica.", "eu": "Zabaldu bariantza baturaren deskonposizioa bikoizketaren jatorriarekin, esleipen ziurgabetasunarekin, baldintza barruko kobariantzarekin eta ingurune arteko batezbesteko/zarata erantzunekin; zero kobariantza oinarri aljebraikoa besterik ez da."}, "未经平滑计数与测量模型、菌株/培养/状态和重复基因集合；BAM核验同源归属，匹配环境估计可塑性，DNA解释拷贝。": {"en": "Unsmoothed counts and measurement model, strain/culture/state and paralog sets; BAM for assignment, matched environments for plasticity, DNA for copy-number interpretation.", "fr": "Comptages non lissés et modèle de mesure, souche/culture/état et ensembles de paralogues ; BAM pour l’attribution, environnements appariés pour la plasticité et ADN pour interpréter le nombre de copies.", "es": "Conteos sin suavizar y modelo de medición, cepa/cultivo/estado y conjuntos de parálogos; BAM para asignación, ambientes emparejados para plasticidad y ADN para interpretar copias.", "eu": "Leundu gabeko zenbaketak eta neurketa eredua, andui/kultura/egoera eta paralogo multzoak; BAMa esleipenerako, ingurune parekatuak plastikotasunerako eta DNA kopia kopurua interpretatzeko."}, "同一菌株的环境均值响应与噪音响应是否耦合，这种耦合是否随遗传背景改变？": {"en": "Are environmental mean and noise responses coupled within a strain, and does coupling vary across genetic backgrounds?", "fr": "Les réponses environnementales de la moyenne et du bruit sont-elles couplées au sein d’une souche, et ce couplage varie-t-il selon le fond génétique ?", "es": "¿Están acopladas las respuestas ambientales de media y ruido dentro de una cepa, y cambia el acoplamiento según el fondo genético?", "eu": "Andui berean lotuta al daude ingurunearen batezbesteko eta zarata erantzunak, eta aldatzen al da lotura hondo genetikoarekin?"}, "估计配对环境均值/噪音对比、菌株反应斜率、排序保持与不确定性；分开跨基因相关和同一基因跨菌株关系。": {"en": "Estimate paired environmental mean/noise contrasts, strain slopes, rank stability and uncertainty; distinguish across-gene correlations from within-gene relationships across strains.", "fr": "Estimer les contrastes environnementaux appariés de moyenne/bruit, les pentes par souche, la stabilité des rangs et l’incertitude ; distinguer les corrélations entre gènes des relations entre souches pour un même gène.", "es": "Estimar contrastes ambientales emparejados de media/ruido, pendientes por cepa, estabilidad de rangos e incertidumbre; distinguir correlaciones entre genes de relaciones entre cepas para un mismo gen.", "eu": "Estimatu inguruneen batezbesteko/zarata kontraste parekatuak, andui maldak, ordenaren egonkortasuna eta ziurgabetasuna; bereizi gene arteko korrelazioak eta gene bereko andui arteko erlazioak."}, "明确重复环境/处理、同菌株可比状态、培养重复及均值/噪音估计；遗传解释需亲缘，启动子解释需外部注释。": {"en": "Explicit repeated environments/treatments, comparable states in the same strains, culture replicates and mean/noise estimates; genetics needs relatedness, promoter interpretation needs external annotation.", "fr": "Environnements/traitements répétés explicites, états comparables dans les mêmes souches, répétitions de culture et estimations moyenne/bruit ; la génétique exige la parenté, l’interprétation des promoteurs une annotation externe.", "es": "Ambientes/tratamientos repetidos explícitos, estados comparables en las mismas cepas, réplicas de cultivo y estimaciones de media/ruido; genética requiere parentesco e interpretación de promotores requiere anotación externa.", "eu": "Ingurune/tratamendu errepikatu esplizituak, andui beretan egoera konparagarriak, kultura erreplikak eta batezbesteko/zarata estimazioak; genetikak ahaidetasuna behar du, eta sustatzaileen interpretazioak kanpoko anotazioa."}, "哪些独立证据能将观察到的噪音与状态比例连接到状态切换、遗传变化或适应度？": {"en": "Which independent evidence connects observed noise and state proportions to switching, genetic change or fitness?", "fr": "Quelles preuves indépendantes relient le bruit et les proportions d’états observés à la commutation, au changement génétique ou à la valeur sélective ?", "es": "¿Qué evidencia independiente conecta el ruido y las proporciones de estados observados con cambios de estado, cambios genéticos o aptitud?", "eu": "Zein ebidentzia independentek lotzen ditu behatutako zarata eta egoera proportzioak egoera aldaketekin, aldaketa genetikoarekin edo egokitasun biologikoarekin?"}, "记录RNA快照、培养重现、时间/谱系、基因型关联、干预重构和适应度测量证据；展示来源，不生成未经校准的适应性分数。": {"en": "Record evidence from RNA snapshots, culture replication, time/lineage observations, genotype association, intervention reconstruction and fitness measurement; show sources without an uncalibrated adaptation score.", "fr": "Consigner les instantanés ARN, répétitions de culture, observations temporelles/de lignage, associations génotypiques, reconstructions expérimentales et mesures de valeur sélective ; afficher les sources sans score adaptatif non calibré.", "es": "Registrar instantáneas de ARN, replicación de cultivos, observaciones temporales/de linaje, asociación genotípica, reconstrucciones experimentales y medición de aptitud; mostrar fuentes sin una puntuación adaptativa sin calibrar.", "eu": "Erregistratu RNA une bakarreko datuak, kultura erreplikazioa, denbora/leinu behaketak, genotipo elkarteak, esku-hartze berreraikuntzak eta egokitasun neurketak; erakutsi iturriak kalibratu gabeko egokitzapen puntuaziorik gabe."}, "计数、状态和培养可支持分布/比例；切换速率需时间/谱系与生长死亡约束，选择/适应度需已有基因组历史、干预或匹配适应度资料。": {"en": "Counts, states and cultures support distributions/proportions; switching rates need time/lineage and growth/death constraints, while selection/fitness needs genomic history, intervention or matched fitness data.", "fr": "Comptages, états et cultures étayent distributions/proportions ; les taux de commutation exigent temps/lignage et contraintes de croissance/mortalité, tandis que sélection/valeur sélective exigent histoire génomique, intervention ou mesures appariées.", "es": "Conteos, estados y cultivos sustentan distribuciones/proporciones; las tasas de cambio requieren tiempo/linaje y restricciones de crecimiento/muerte; selección/aptitud requiere historia genómica, intervención o datos de aptitud emparejados.", "eu": "Zenbaketak, egoerak eta kulturak banaketak/proportzioak aztertzeko dira; aldaketa tasek denbora/leinu datuak eta hazkunde/heriotza mugak behar dituzte; hautespenak/egokitasunak historia genomikoa, esku-hartzea edo egokitasun datu parekatuak behar ditu."}, "方法比较资料，用于评估模型假设、输入要求与迁移条件。": {"en": "Comparative methods reading for assessing model assumptions, inputs and transfer requirements.", "fr": "Lecture comparative pour évaluer les hypothèses des modèles, les données requises et les conditions de transfert.", "es": "Lectura comparativa para evaluar supuestos, datos necesarios y condiciones de transferencia.", "eu": "Metodoen irakurketa konparatiboa, eredu-suposizioak, datuak eta transferentzia-baldintzak ebaluatzeko."}, "Airqtl需核对版本、亲缘随机效应与倍性；人类enQTL脚本需核对对数底数、归一化层及样本量。": {"en": "Airqtl requires version, relatedness-random-effect and ploidy review; human enQTL scripts require checks of log base, normalization layer and sample size.", "fr": "Airqtl exige la vérification de version, effet aléatoire de parenté et ploïdie ; les scripts enQTL humains exigent la vérification de base logarithmique, couche de normalisation et effectif.", "es": "Airqtl exige revisar versión, efecto aleatorio de parentesco y ploidía; los scripts enQTL humanos exigen verificar base logarítmica, capa de normalización y tamaño muestral.", "eu": "Airqtl-en bertsioa, ahaidetasunaren ausazko efektua eta ploidia berrikusi behar dira; giza enQTL scriptetan logaritmo oinarria, normalizazio geruza eta lagin tamaina egiaztatu behar dira."}, "分别报告细胞间噪音、菌株均值差异与噪音性状遗传方差，并列出菌株数、独立培养数和各培养细胞数。": {"en": "Report cell-to-cell noise, strain-mean differences and genetic variance of noise traits separately, alongside strain counts, independent-culture counts and cells per culture.", "fr": "Rapporter séparément bruit intercellulaire, différences moyennes entre souches et variance génétique des traits de bruit, avec les nombres de souches, de cultures indépendantes et de cellules par culture.", "es": "Informar por separado del ruido entre células, las diferencias medias entre cepas y la varianza genética del ruido, junto con los números de cepas, cultivos independientes y células por cultivo.", "eu": "Adierazi bereizita zelulen arteko zarata, anduien batezbestekoen aldeak eta zarata-ezaugarrien bariantza genetikoa, andui, kultura independente eta kultura bakoitzeko zelula kopuruekin."}, "用 DNA 证据区分结构缺失与 RNA 未检出；证据不足记为未知，结构缺失基因的噪音性状记为缺失值。": {"en": "Use DNA evidence to distinguish structural absence from RNA non-detection; record insufficient evidence as unknown and noise traits of absent genes as missing.", "fr": "Distinguer absence structurelle et non-détection d’ARN à l’aide de l’ADN ; coder l’incertitude comme inconnue et les traits de bruit des gènes absents comme manquants.", "es": "Distinguir ausencia estructural y no detección de ARN mediante ADN; registrar evidencia insuficiente como desconocida y los rasgos de ruido de genes ausentes como valores faltantes.", "eu": "Bereizi egiturazko absentzia eta RNA ez-detekzioa DNA-ebidentziarekin; ebidentzia urria ezezagun gisa eta falta diren geneen zarata-ezaugarriak balio falta gisa kodetu."}, "用同一菌株在明确环境间的可比测量估计反应规范；单条件应激分数和拟时序描述条件内状态。": {"en": "Estimate reaction norms from comparable measurements of the same strains across defined environments; single-condition stress scores and pseudotime describe within-condition states.", "fr": "Estimer les normes de réaction à partir de mesures comparables des mêmes souches dans des environnements définis ; scores de stress et pseudotemps décrivent les états au sein d’une condition.", "es": "Estimar normas de reacción con mediciones comparables de las mismas cepas en ambientes definidos; las puntuaciones de estrés y el pseudotiempo describen estados dentro de una condición.", "eu": "Estimatu erreakzio-arauak andui beren neurketa konparagarriekin ingurune definituetan; estres-puntuazioek eta pseudodenborak baldintza barruko egoerak deskribatzen dituzte."}, "负协方差也可能来自同源分子归属或相对RNA分配；协方差置零仅是代数基线，不代表已验证的缓冲干预。": {"en": "Negative covariance can also arise from homologous-molecule assignment or relative RNA allocation; zero covariance is an algebraic baseline, not a validated buffering intervention.", "fr": "Une covariance négative peut aussi venir de l’attribution de molécules homologues ou de l’allocation relative d’ARN ; la covariance nulle est une référence algébrique, pas une intervention de tamponnement validée.", "es": "La covarianza negativa también puede surgir de asignación de moléculas homólogas o reparto relativo de ARN; covarianza cero es una referencia algebraica, no una intervención amortiguadora validada.", "eu": "Kobariantza negatiboa molekula homologoen esleipenetik edo RNA banaketa erlatibotik ere sor daiteke; zero kobariantza oinarri aljebraikoa da, ez balioztatutako moteltze esku-hartzea."}, "RNA快照的双峰或状态比例不能确定切换速率；群体关联不能单独证明历史选择，蛋白、bulk与成像证据另列。": {"en": "Bimodality or state proportions in RNA snapshots do not determine switching rates; population association alone does not establish historical selection. Protein, bulk and imaging evidence remain separate.", "fr": "La bimodalité ou les proportions d’états d’instantanés ARN ne déterminent pas les taux de commutation ; une association populationnelle seule ne prouve pas la sélection passée. Séparer preuves protéiques, bulk et d’imagerie.", "es": "La bimodalidad o las proporciones de estados en instantáneas de ARN no determinan tasas de cambio; una asociación poblacional no demuestra por sí sola selección histórica. Separar evidencia proteica, bulk y de imagen.", "eu": "RNA une bakarreko bimodalitateak edo egoera proportzioek ez dituzte aldaketa tasak zehazten; populazio elkarteak bakarrik ez du hautespen historikoa frogatzen. Bereizi proteina, bulk eta irudi ebidentziak."}, "这些字段定义分析与导出内容；模型拟合和数据诊断由所选工具完成。": {"en": "These fields define the analysis and export content; selected tools perform model fitting and data diagnostics.", "fr": "Ces champs définissent l’analyse et l’export ; les outils sélectionnés assurent l’ajustement des modèles et les diagnostics.", "es": "Estos campos definen el análisis y la exportación; las herramientas seleccionadas realizan el ajuste y los diagnósticos.", "eu": "Eremu hauek analisia eta esportazioa definitzen dituzte; hautatutako tresnek doikuntza eta diagnostikoak egiten dituzte."}, "群体与进化噪音": {"en": "Population and evolutionary noise", "fr": "Bruit populationnel et évolutif", "es": "Ruido poblacional y evolutivo", "eu": "Populazio eta eboluzio zarata"}, "来源特异的研究证据": {"en": "Source-specific research evidence", "fr": "Preuves de recherche propres à chaque source", "es": "Evidencia de investigación específica de cada fuente", "eu": "Iturri bakoitzaren ikerketa ebidentzia"}, "研究方法或机制证据；不自动生成单细胞注释marker。": {"en": "Method or mechanism evidence; no automatic single-cell annotation markers.", "fr": "Preuves de méthode ou de mécanisme ; aucun marqueur automatique d’annotation unicellulaire.", "es": "Evidencia de método o mecanismo; sin generación automática de marcadores de anotación unicelular.", "eu": "Metodo edo mekanismo ebidentzia; ez du zelula bakarreko anotazio markatzailerik automatikoki sortzen."}, "物种、测量层级与研究设计随来源保留；项目数据尚未执行这些分析。": {"en": "Retain each source’s species, measurement level and study design; these analyses have not been run on project data.", "fr": "Conserver pour chaque source l’espèce, le niveau de mesure et le plan d’étude ; ces analyses n’ont pas été exécutées sur les données du projet.", "es": "Conservar especie, nivel de medición y diseño de cada fuente; estos análisis no se han ejecutado con datos del proyecto.", "eu": "Mantendu iturri bakoitzaren espeziea, neurketa maila eta ikerketa diseinua; analisi hauek ez dira proiektuko datuetan exekutatu."}, "基因可观测性与结构缺失证据": {"en": "Gene observability and structural-absence evidence", "fr": "Observabilité des gènes et preuves d’absence structurale", "es": "Observabilidad génica y evidencia de ausencia estructural", "eu": "Geneen behagarritasuna eta egiturazko absentziaren ebidentzia"}, "类别、分子支持与证据状态": {"en": "Categories, molecule support and evidence status", "fr": "Catégories, soutien moléculaire et état des preuves", "es": "Categorías, apoyo molecular y estado de evidencia", "eu": "Kategoriak, molekula euskarria eta ebidentzia egoera"}, "声明参考中的基因×菌株配对": {"en": "Gene–strain pairs in the declared reference", "fr": "Paires gène–souche dans la référence déclarée", "es": "Pares gen–cepa de la referencia declarada", "eu": "Adierazitako erreferentziako gene–andui bikoteak"}, "基因×菌株×参考版本": {"en": "Gene × strain × reference version", "fr": "Gène × souche × version de référence", "es": "Gen × cepa × versión de referencia", "eu": "Gene × andui × erreferentzia bertsioa"}, "稳定基因、菌株、参考和证据来源标识": {"en": "Stable gene, strain, reference and evidence-source identifiers", "fr": "Identifiants stables du gène, de la souche, de la référence et de la source de preuve", "es": "Identificadores estables de gen, cepa, referencia y fuente de evidencia", "eu": "Gene, andui, erreferentzia eta ebidentzia iturrien identifikatzaile egonkorrak"}, "DNA存在、拷贝数及倍性；无独立证据则未知": {"en": "DNA presence, copy number and ploidy; unknown without independent evidence", "fr": "Présence ADN, nombre de copies et ploïdie ; inconnus sans preuve indépendante", "es": "Presencia en ADN, copias y ploidía; desconocidos sin evidencia independiente", "eu": "DNA presentzia, kopia kopurua eta ploidia; ezezagunak ebidentzia independenterik gabe"}, "RNA检出、独立UMI支持及归属歧义": {"en": "RNA detection, independent UMI support and assignment ambiguity", "fr": "Détection ARN, soutien UMI indépendant et ambiguïté d’attribution", "es": "Detección de ARN, apoyo UMI independiente y ambigüedad de asignación", "eu": "RNA detekzioa, UMI euskarri independentea eta esleipen anbiguotasuna"}, "噪音性状可估计状态及排除原因": {"en": "Noise-trait estimability status and exclusion reason", "fr": "Statut d’estimabilité du bruit et motif d’exclusion", "es": "Estado de estimabilidad del ruido y motivo de exclusión", "eu": "Zarata ezaugarriaren estimagarritasun egoera eta baztertzeko arrazoia"}, "酵母DNA与bulk RNA剂量比较；补偿比例依菌株和染色体变化，数值采用2016年勘误。": {"en": "Yeast DNA–bulk RNA dosage comparison; compensation depends on strain and chromosome, with numerical claims read alongside the 2016 correction.", "fr": "Comparaison de dosage ADN–ARN bulk chez la levure ; la compensation dépend de la souche et du chromosome, avec chiffres corrigés en 2016.", "es": "Comparación de dosis ADN–ARN bulk en levadura; la compensación depende de cepa y cromosoma, con cifras según la corrección de 2016.", "eu": "Legamiaren DNA–bulk RNA dosi konparazioa; konpentsazioa anduiaren eta kromosomaren araberakoa da, 2016ko zuzenketako zenbakiekin."}, "原文勘误：剂量补偿比例修正为10–30%，取决于菌株与染色体。": {"en": "Correction: the dosage-compensation fraction was revised to 10–30%, depending on strain and chromosome.", "fr": "Correction : la fraction de compensation du dosage est révisée à 10–30 %, selon souche et chromosome.", "es": "Corrección: la fracción de compensación de dosis se revisó a 10–30 %, según cepa y cromosoma.", "eu": "Zuzenketa: dosi konpentsazioaren proportzioa %10–30era zuzendu zen, anduiaren eta kromosomaren arabera."}, "大肠杆菌启动子进化与理论研究，提供噪音—可塑性假说；不作为酵母验证。": {"en": "E. coli promoter evolution and theory motivate noise–plasticity hypotheses; this is not yeast validation.", "fr": "Évolution de promoteurs d’E. coli et théorie pour des hypothèses bruit–plasticité ; pas une validation chez la levure.", "es": "Evolución de promotores de E. coli y teoría para hipótesis ruido–plasticidad; no constituye validación en levadura.", "eu": "E. coli sustatzaileen eboluzioak eta teoriak zarata–plastikotasun hipotesiak motibatzen dituzte; ez da legamian balioztatzea."}, "人类PBMC中按供者与细胞类型计算均值趋势校正CV²并做enQTL；保留为定义敏感性比较，未完整核读最终PDF。": {"en": "Human PBMC enQTL use mean-trend-adjusted CV² by donor and cell type; retained for definition-sensitivity comparison. The final PDF was not fully reviewed.", "fr": "Les enQTL de PBMC humains utilisent un CV² corrigé de tendance moyenne par donneur et type cellulaire ; comparaison de sensibilité des définitions. Le PDF final n’a pas été intégralement lu.", "es": "Los enQTL de PBMC humanos usan CV² ajustado a la tendencia media por donante y tipo celular; comparación de sensibilidad de definiciones. No se revisó íntegramente el PDF final.", "eu": "Giza PBMC enQTLetan batezbesteko joeraz doitutako CV² erabiltzen da emaile eta zelula motaren arabera; definizioen sentikortasuna konparatzeko gordeta. Azken PDFa ez da osorik berrikusi."}, "蛋白报告、实验进化和遗传重构支持Hmt1噪音缓冲机制；不将该证据自动转为scRNA注释marker。": {"en": "Protein reporters, experimental evolution and genetic reconstruction support Hmt1 noise buffering; this does not automatically create an scRNA annotation marker.", "fr": "Rapporteurs protéiques, évolution expérimentale et reconstruction génétique étayent le tamponnement du bruit par Hmt1 ; sans marqueur automatique scRNA.", "es": "Reporteros proteicos, evolución experimental y reconstrucción genética respaldan amortiguación de ruido por Hmt1; no generan automáticamente un marcador scRNA.", "eu": "Proteina erreportariek, eboluzio esperimentalak eta berreraikuntza genetikoak Hmt1en zarata moteltzea babesten dute; ez dute automatikoki scRNA anotazio markatzailerik sortzen."}, "酵母蛋白噪音DM与bulk环境表达变化的比较，支持区分跨基因耦合和同基因跨菌株反应。": {"en": "Yeast protein-noise DM versus bulk environmental expression motivates separating across-gene coupling from within-gene responses across strains.", "fr": "Comparaison du bruit protéique DM et de l’expression bulk environnementale chez la levure ; distinguer couplage entre gènes et réponses d’un même gène entre souches.", "es": "Comparación de ruido proteico DM y expresión bulk ambiental en levadura; distinguir acoplamiento entre genes de respuestas del mismo gen entre cepas.", "eu": "Legamiaren proteina zarata DM eta inguruneko bulk adierazpenaren konparazioak gene arteko loturak eta gene bereko andui arteko erantzunak bereiztea motibatzen du."}, "酵母报告系统中剂量补偿与噪音降低的机制证据；需区分蛋白层和scRNA测量层。": {"en": "Yeast reporter evidence links dosage compensation to noise reduction; keep protein and scRNA measurement levels distinct.", "fr": "Les rapporteurs de levure relient compensation du dosage et réduction du bruit ; distinguer niveaux protéique et scRNA.", "es": "Reporteros de levadura vinculan compensación de dosis y reducción del ruido; distinguir medición proteica y scRNA.", "eu": "Legamia erreportariek dosi konpentsazioa eta zarata murriztea lotzen dituzte; bereizi proteina eta scRNA neurketa mailak."}, "人类细胞均值eQTL与状态交互方法；当前官方版本的亲缘随机效应组合和倍性分支需先核验。": {"en": "Human cell-level mean-eQTL and state-interaction method; first verify combined relatedness random effects and ploidy branches in the current official version.", "fr": "Méthode humaine d’eQTL de moyenne cellulaire et d’interaction d’état ; vérifier d’abord effets aléatoires de parenté combinés et branches de ploïdie de la version officielle.", "es": "Método humano de eQTL de media celular e interacción de estado; verificar primero efectos aleatorios combinados de parentesco y ramas de ploidía en la versión oficial.", "eu": "Giza zelula mailako batezbesteko eQTL eta egoera interakzio metodoa; lehenik egiaztatu egungo bertsio ofizialeko ahaidetasun ausazko efektu konbinatuak eta ploidia adarrak."}, "酵母启动子蛋白均值/噪音与竞争生长构成适应度景观；RNA群体关联不能直接重建同样的适应度因果关系。": {"en": "Yeast promoter protein mean/noise and competitive growth define fitness landscapes; RNA population associations alone do not reconstruct the same causal fitness relationship.", "fr": "Moyenne/bruit protéiques de promoteurs et croissance compétitive définissent des paysages de valeur sélective chez la levure ; les seules associations ARN ne reconstruisent pas cette causalité.", "es": "Media/ruido proteico de promotores y crecimiento competitivo definen paisajes de aptitud en levadura; asociaciones poblacionales de ARN solas no reconstruyen esa causalidad.", "eu": "Legamia sustatzaileen proteina batezbestekoak/zaratak eta hazkunde lehiakorrak egokitasun paisaiak definitzen dituzte; RNA populazio elkarteek bakarrik ez dute kausa erlazio bera berreraikitzen."}, "酵母ACE2实验进化、成像和bulk RNA研究状态切换；在线2025年，卷期2026年，不是scRNA marker来源。": {"en": "Yeast ACE2 experimental evolution, imaging and bulk RNA study state switching; online in 2025, issue year 2026. This is not an scRNA marker source.", "fr": "Évolution expérimentale ACE2, imagerie et ARN bulk chez la levure étudient la commutation ; publication en ligne 2025, volume 2026. Ce n’est pas une source de marqueurs scRNA.", "es": "Evolución experimental ACE2, imagen y ARN bulk en levadura estudian cambios de estado; en línea en 2025, volumen de 2026. No es fuente de marcadores scRNA.", "eu": "Legamiaren ACE2 eboluzio esperimentalak, irudiek eta bulk RNAk egoera aldaketak aztertzen dituzte; sarean 2025ean, bolumena 2026koa. Ez da scRNA markatzaileen iturria."}, "比较方法中显式传播种内变异和测量误差；为噪音性状不确定性提供统计依据。": {"en": "Comparative methods propagate within-species variation and measurement error, motivating explicit uncertainty for noise traits.", "fr": "Les méthodes comparatives propagent variation intraspécifique et erreur de mesure, justifiant l’incertitude explicite des traits de bruit.", "es": "Los métodos comparativos propagan variación intraespecífica y error de medición, justificando incertidumbre explícita en rasgos de ruido.", "eu": "Metodo konparatiboek espezie barruko aldakortasuna eta neurketa errorea hedatzen dituzte, zarata ezaugarrien ziurgabetasun esplizitua justifikatuz."}, "贝叶斯多层建模框架，可表达亲缘、培养和性状误差；酵母噪音模型需单独设计并检验可辨识性。": {"en": "Bayesian multilevel framework can express relatedness, culture and trait error; yeast noise models require separate design and identifiability checks.", "fr": "Le cadre bayésien multiniveau peut représenter parenté, culture et erreur du trait ; les modèles de bruit de levure exigent conception et vérification d’identifiabilité propres.", "es": "El marco bayesiano multinivel permite representar parentesco, cultivo y error del rasgo; los modelos de ruido de levadura requieren diseño y comprobación de identificabilidad propios.", "eu": "Maila anitzeko esparru bayestarrak ahaidetasuna, kultura eta ezaugarri errorea adieraz ditzake; legamiaren zarata ereduek diseinu bereizia eta identifikagarritasun egiaztapena behar dituzte."}};
window.YV_TEXT=window.YV_TEXT||{};Object.assign(window.YV_TEXT,text);
const metrics={"v25c_gene_observability": {"en": {"definition": "For each gene–strain pair, retain UMI support, unique assignment, reference coverage, DNA presence/copy evidence and reasons for missing noise traits; compare within the required measurable domain.", "name": "Gene observability and structural-absence evidence"}, "fr": {"definition": "Pour chaque paire gène–souche, conserver le soutien UMI, l’attribution unique, la couverture de référence, les preuves ADN de présence/copie et les motifs d’absence du trait de bruit ; comparer dans le domaine mesurable requis.", "name": "Observabilité des gènes et preuves d’absence structurale"}, "es": {"definition": "Por cada par gen–cepa, conservar apoyo UMI, asignación única, cobertura de referencia, evidencia de presencia/copia en ADN y motivos de ausencia del rasgo de ruido; comparar dentro del dominio medible requerido.", "name": "Observabilidad génica y evidencia de ausencia estructural"}, "eu": {"definition": "Gene–andui bikote bakoitzean gorde UMI euskarria, esleipen bakarra, erreferentzia estaldura, DNA presentzia/kopia ebidentzia eta zarata ezaugarriaren falta arrazoiak; konparatu behar den eremu neurgarrian.", "name": "Geneen behagarritasuna eta egiturazko absentziaren ebidentzia"}}, "qtl_effect_uncertainty": {"en": {"definition": "Store noise estimates, standard errors/sampling covariance or posterior draws, cell/culture support, scale and kinship version; compare genetic variance with and without trait uncertainty."}, "fr": {"definition": "Conserver les estimations du bruit, erreurs-types/covariance d’échantillonnage ou tirages postérieurs, effectifs cellulaires et de cultures, échelle et version de parenté ; comparer la variance génétique avec et sans incertitude du trait."}, "es": {"definition": "Guardar estimaciones de ruido, errores estándar/covarianza de muestreo o muestras posteriores, apoyo celular/de cultivos, escala y versión de parentesco; comparar la varianza genética con y sin incertidumbre del rasgo."}, "eu": {"definition": "Gorde zarata estimazioak, errore estandarrak/laginketa kobariantza edo posterior laginak, zelula/kultura euskarria, eskala eta ahaidetasun bertsioa; konparatu bariantza genetikoa ezaugarriaren ziurgabetasunarekin eta gabe."}}, "noise_genetic_partition": {"en": {"definition": "Store noise estimates, standard errors/sampling covariance or posterior draws, cell/culture support, scale and kinship version; compare genetic variance with and without trait uncertainty."}, "fr": {"definition": "Conserver les estimations du bruit, erreurs-types/covariance d’échantillonnage ou tirages postérieurs, effectifs cellulaires et de cultures, échelle et version de parenté ; comparer la variance génétique avec et sans incertitude du trait."}, "es": {"definition": "Guardar estimaciones de ruido, errores estándar/covarianza de muestreo o muestras posteriores, apoyo celular/de cultivos, escala y versión de parentesco; comparar la varianza genética con y sin incertidumbre del rasgo."}, "eu": {"definition": "Gorde zarata estimazioak, errore estandarrak/laginketa kobariantza edo posterior laginak, zelula/kultura euskarria, eskala eta ahaidetasun bertsioa; konparatu bariantza genetikoa ezaugarriaren ziurgabetasunarekin eta gabe."}}, "paralog_covariance_contribution": {"en": {"definition": "Extend summed-variance decomposition with duplication provenance, assignment uncertainty, within-condition covariance and cross-environment mean/noise responses; zero covariance is only an algebraic baseline."}, "fr": {"definition": "Compléter la décomposition de variance cumulée par l’origine des duplications, l’incertitude d’attribution, la covariance au sein des conditions et les réponses moyenne/bruit entre environnements ; la covariance nulle n’est qu’une référence algébrique."}, "es": {"definition": "Ampliar la descomposición de varianza sumada con el origen de duplicaciones, incertidumbre de asignación, covarianza dentro de condición y respuestas de media/ruido entre ambientes; la covarianza cero es solo una referencia algebraica."}, "eu": {"definition": "Zabaldu bariantza baturaren deskonposizioa bikoizketaren jatorriarekin, esleipen ziurgabetasunarekin, baldintza barruko kobariantzarekin eta ingurune arteko batezbesteko/zarata erantzunekin; zero kobariantza oinarri aljebraikoa besterik ez da."}}, "noise_reaction_norm": {"en": {"definition": "Estimate paired environmental mean/noise contrasts, strain slopes, rank stability and uncertainty; distinguish across-gene correlations from within-gene relationships across strains."}, "fr": {"definition": "Estimer les contrastes environnementaux appariés de moyenne/bruit, les pentes par souche, la stabilité des rangs et l’incertitude ; distinguer les corrélations entre gènes des relations entre souches pour un même gène."}, "es": {"definition": "Estimar contrastes ambientales emparejados de media/ruido, pendientes por cepa, estabilidad de rangos e incertidumbre; distinguir correlaciones entre genes de relaciones entre cepas para un mismo gen."}, "eu": {"definition": "Estimatu inguruneen batezbesteko/zarata kontraste parekatuak, andui maldak, ordenaren egonkortasuna eta ziurgabetasuna; bereizi gene arteko korrelazioak eta gene bereko andui arteko erlazioak."}}};
window.YV_CONTENT=window.YV_CONTENT||{};window.YV_CONTENT.metrics=window.YV_CONTENT.metrics||{};for(const [id,langs] of Object.entries(metrics)){const target=window.YV_CONTENT.metrics[id]||(window.YV_CONTENT.metrics[id]={});for(const [lang,fields] of Object.entries(langs))Object.assign(target[lang]||(target[lang]={}),fields);}
})();

Object.assign(window.YV_TEXT,{"方法与机制证据": {"en": "Method and mechanism evidence", "fr": "Preuves de méthode et de mécanisme", "es": "Evidencia de método y mecanismo", "eu": "Metodo eta mekanismo ebidentzia"}, "跨物种统计方法": {"en": "Cross-species statistical methodology", "fr": "Méthodologie statistique interspécifique", "es": "Metodología estadística entre especies", "eu": "Espezie arteko estatistika metodologia"}});

Object.assign(window.YV_TEXT,{"关联效应量与其标准误、噪音性状本身的估计误差分别保存，再传播至QTL与遗传力模型。": {"en": "Retain association effect estimates and their standard errors separately from uncertainty in the noise trait, then propagate trait uncertainty to QTL and heritability models.", "fr": "Conserver séparément effets d’association et erreurs-types, et incertitude du trait de bruit ; propager ensuite cette incertitude aux modèles QTL et d’héritabilité.", "es": "Conservar efectos de asociación y errores estándar separados de la incertidumbre del rasgo de ruido, y propagar esta a los modelos de QTL y heredabilidad.", "eu": "Gorde elkarte efektuak eta haien errore estandarrak zarata ezaugarriaren ziurgabetasunetik bereizita; ondoren hedatu ezaugarriaren ziurgabetasuna QTL eta heredagarritasun ereduetara."}, "分别估计标记捕获的加性遗传方差、稳定菌株差异和培养方差；模型须可辨识，并报告噪音性状误差。": {"en": "Estimate marker-captured additive genetic variance, stable strain differences and culture variance separately; require model identifiability and report noise-trait error.", "fr": "Estimer séparément variance génétique additive captée par les marqueurs, différences stables de souche et variance de culture ; vérifier l’identifiabilité et rapporter l’erreur du trait.", "es": "Estimar por separado varianza genética aditiva capturada por marcadores, diferencias estables entre cepas y varianza de cultivo; exigir identificabilidad e informar el error del rasgo.", "eu": "Estimatu bereizita markatzaileek jasotako bariantza genetiko gehigarria, andui desberdintasun egonkorrak eta kultura bariantza; egiaztatu identifikagarritasuna eta eman zarata ezaugarriaren errorea."}});

// v25d: method branch declaration contracts.
Object.assign(window.YV_TEXT || (window.YV_TEXT = {}), {
  "按所选分支检查输入与来源字段是否完整；技术设计仍需人工核对，记录完整不代表模型已验证或执行。": {
    "en": "Check input and source fields for the selected branch. The technical design still needs review; complete records do not establish model validity or execution.",
    "fr": "Vérifier les champs d’entrée et de source de la branche choisie. Le plan technique reste à examiner ; des champs complets ne prouvent ni la validité ni l’exécution du modèle.",
    "es": "Comprobar los campos de entrada y fuente de la rama elegida. El diseño técnico requiere revisión; un registro completo no demuestra validez ni ejecución del modelo.",
    "eu": "Egiaztatu hautatutako adarraren sarrera eta iturburu eremuak osatuta daudela. Diseinu teknikoa berrikusi behar da; erregistro osoak ez du ereduaren baliozkotasuna edo exekuzioa frogatzen."
  },
  "聚类分辨率与细胞重采样稳定性": {
    "en": "Cluster resolution and cell-resampling stability",
    "fr": "Résolution des groupes et stabilité au rééchantillonnage cellulaire",
    "es": "Resolución de grupos y estabilidad del remuestreo celular",
    "eu": "Multzoen bereizmena eta zelula birlaginketaren egonkortasuna"
  },
  "表达对象、细胞身份及候选分辨率；记录每次细胞重采样清单。培养留出扩展另需真实培养分组。": {
    "en": "Expression object, cell identities and candidate resolutions; record each cell-resampling manifest. Culture holdouts additionally require genuine culture groups.",
    "fr": "Objet d’expression, identités cellulaires et résolutions candidates ; consigner les cellules de chaque rééchantillonnage. Les validations par culture exigent des groupes de cultures réels.",
    "es": "Objeto de expresión, identidades celulares y resoluciones candidatas; registrar las células de cada remuestreo. La validación por cultivos requiere grupos de cultivo reales.",
    "eu": "Adierazpen objektua, zelulen identitateak eta bereizmen hautagaiak; gorde birlaginketa bakoitzeko zelulen zerrenda. Kultura bidezko balidazioak benetako kultura taldeak behar ditu."
  },
  "原生输出为细胞共聚类与稳定性；培养留出复现需单独实现。": {
    "en": "Native outputs cover cell co-clustering and stability; culture-holdout replication requires a separate implementation.",
    "fr": "Les sorties natives décrivent le co-regroupement cellulaire et sa stabilité ; la validation par culture requiert une implémentation distincte.",
    "es": "Las salidas nativas describen el agrupamiento conjunto y su estabilidad; la validación con cultivos excluidos requiere una implementación adicional.",
    "eu": "Jatorrizko irteerek zelulen baterako taldekatzea eta egonkortasuna jasotzen dituzte; kulturak kanpoan utzita balidatzeko inplementazio bereizia behar da."
  },
  "均值差异功效使用酵母试点与真实独立样本设计；细胞数不能代替培养或菌株数。": {
    "en": "Mean-DE power uses yeast pilot data and the genuine independent-sample design; cell counts do not replace culture or strain counts.",
    "fr": "La puissance DE de la moyenne utilise des données pilotes de levure et le plan réel d’échantillons indépendants ; le nombre de cellules ne remplace ni cultures ni souches.",
    "es": "La potencia para diferencias de medias usa datos piloto de levadura y muestras independientes reales; el número de células no sustituye a cultivos o cepas.",
    "eu": "Batezbesteko DE potentziak legamiaren datu pilotuak eta benetako lagin independenteen diseinua erabiltzen ditu; zelula kopuruak ez du kultura edo andui kopurua ordezten."
  },
  "均值检验分支参数": {
    "en": "Mean-test branch parameter",
    "fr": "Paramètre de branche du test de moyenne",
    "es": "Parámetro de rama de prueba de medias",
    "eu": "Batezbesteko probaren adarreko parametroa"
  },
  "将所选分支的 type 写入 yeast_pilot_parameters$type：均值差异用 de，均值 eQTL 用 eqtl。": {
    "en": "Copy branch type into yeast_pilot_parameters$type: de for mean DE, eqtl for mean eQTL.",
    "fr": "Reporter le type de branche dans yeast_pilot_parameters$type : de pour la DE moyenne, eqtl pour l’eQTL moyen.",
    "es": "Copiar el tipo de rama a yeast_pilot_parameters$type: de para DE de la media, eqtl para eQTL de la media.",
    "eu": "Kopiatu adarraren type yeast_pilot_parameters$type eremura: de batezbesteko DErako, eqtl batezbesteko eQTLrako."
  }
});

// Scientific method copy: inputs, actions and interpretation.
Object.assign(window.YV_TEXT ||= {}, {
  "调用模板；执行后记录版本、参数与诊断。": {
    "en": "Invocation template; record versions, parameters and diagnostics after execution.",
    "fr": "Modèle d’appel ; consigner versions, paramètres et diagnostics après exécution.",
    "es": "Plantilla de llamada; registrar versiones, parámetros y diagnósticos tras la ejecución.",
    "eu": "Dei-txantiloia; exekutatu ondoren, erregistratu bertsioak, parametroak eta diagnostikoak."
  },
  "按实际建库结构和软件版本补全调用模板。": {
    "en": "Complete the invocation template for the library structure and software version.",
    "fr": "Compléter le modèle d’appel selon la structure de la bibliothèque et la version du logiciel.",
    "es": "Completar la plantilla de llamada según la estructura de la biblioteca y la versión del programa.",
    "eu": "Osatu dei-txantiloia liburutegiaren egituraren eta software-bertsioaren arabera."
  },
  "按输入数据、酵母特征与样本设计评估适用性。": {
    "en": "Assess applicability from the inputs, yeast biology and study design.",
    "fr": "Évaluer l’applicabilité selon les données, la biologie de la levure et le plan d’étude.",
    "es": "Evaluar la aplicabilidad según los datos, la biología de la levadura y el diseño del estudio.",
    "eu": "Ebaluatu egokitasuna sarrerako datuen, legamiaren biologiaren eta ikerketa-diseinuaren arabera."
  },
  "记录计数对象、排除规则、分层单位与过滤依据。": {
    "en": "Record the counting unit, exclusion rules, strata and filtering rationale.",
    "fr": "Consigner l’unité de comptage, les règles d’exclusion, les strates et les motifs de filtrage.",
    "es": "Registrar la unidad de conteo, las reglas de exclusión, los estratos y los criterios de filtrado.",
    "eu": "Erregistratu zenbaketa-unitatea, baztertzeko arauak, geruzak eta iragazteko oinarriak."
  },
  "这些字段定义分析与导出内容；模型拟合和数据诊断由所选工具完成。": {
    "en": "These fields define the analysis and export content; selected tools perform model fitting and data diagnostics.",
    "fr": "Ces champs définissent l’analyse et l’export ; les outils sélectionnés assurent l’ajustement des modèles et les diagnostics.",
    "es": "Estos campos definen el análisis y la exportación; las herramientas seleccionadas realizan el ajuste y los diagnósticos.",
    "eu": "Eremu hauek analisia eta esportazioa definitzen dituzte; hautatutako tresnek doikuntza eta diagnostikoak egiten dituzte."
  },
  "由所列工具的原始输出汇总计算，并记录汇总规则。": {
    "en": "Calculate the summary from the listed tools’ original outputs and record the aggregation rules.",
    "fr": "Calculer la synthèse à partir des sorties originales des outils et consigner les règles d’agrégation.",
    "es": "Calcular el resumen a partir de las salidas originales de las herramientas y registrar las reglas de agregación.",
    "eu": "Kalkulatu laburpena tresnen jatorrizko irteeretatik, eta erregistratu agregazio-arauak."
  },
  "项目定义的汇总指标：从所列函数的原始结果计算，并保留字段与输出的对应关系。": {
    "en": "Project-defined summary metric: calculate it from the listed functions’ original outputs and retain the field-to-output mapping.",
    "fr": "Indicateur de synthèse défini par le projet : le calculer à partir des sorties des fonctions et conserver leur correspondance avec les champs.",
    "es": "Métrica de resumen definida por el proyecto: calcularla desde las salidas de las funciones y conservar la correspondencia con los campos.",
    "eu": "Proiektuak definitutako laburpen-metrika: kalkulatu funtzioen irteeretatik, eta gorde eremuen eta irteeren arteko lotura."
  },
  "使用原始 UMI 计数推断表达分布；插补、平滑和整合结果另存为辅助表示。": {
    "en": "Infer expression distributions from raw UMI counts; store imputed, smoothed and integrated results as auxiliary representations.",
    "fr": "Inférer les distributions d’expression à partir des UMI bruts ; conserver séparément les représentations imputées, lissées et intégrées.",
    "es": "Inferir distribuciones de expresión desde los UMI brutos; guardar los resultados imputados, suavizados e integrados como representaciones auxiliares.",
    "eu": "Inferitu adierazpen-banaketak UMI zenbaketa gordinetatik; gorde egoztutako, leundutako eta integratutako emaitzak laguntza-adierazpen gisa."
  },
  "描述观测分布；技术贡献需通过测量模型另行估计。": {
    "en": "Describe the observed distribution; estimate technical contributions separately with a measurement model.",
    "fr": "Décrire la distribution observée ; estimer séparément les contributions techniques à l’aide d’un modèle de mesure.",
    "es": "Describir la distribución observada; estimar por separado la contribución técnica mediante un modelo de medición.",
    "eu": "Deskribatu behatutako banaketa; estimatu ekarpen teknikoak bereizita neurketa-eredu baten bidez."
  },
  "条件化剩余变异仍可包含隐藏状态和测量误差；内在噪音解释需要机制证据。": {
    "en": "Conditional residual variability can include hidden states and measurement error; intrinsic-noise interpretation requires mechanistic evidence.",
    "fr": "La variabilité résiduelle conditionnelle peut inclure des états cachés et des erreurs de mesure ; son interprétation comme bruit intrinsèque exige des preuves mécanistiques.",
    "es": "La variabilidad residual condicional puede incluir estados ocultos y error de medición; interpretarla como ruido intrínseco requiere evidencia mecanística.",
    "eu": "Baldintzapeko hondar-aldakortasunak ezkutuko egoerak eta neurketa-errorea izan ditzake; berezko zarata gisa interpretatzeko mekanismoaren ebidentzia behar da."
  },
  "内含子 UMI 需按分子归属规则独立计数；不同矩阵层可能包含重叠分子。": {
    "en": "Count intronic UMIs using explicit molecule-assignment rules; matrix layers may contain overlapping molecules.",
    "fr": "Compter les UMI introniques selon des règles explicites d’attribution ; les couches matricielles peuvent partager des molécules.",
    "es": "Contar los UMI intrónicos con reglas explícitas de asignación; las capas de matrices pueden compartir moléculas.",
    "eu": "Zenbatu UMI intronikoak molekulak esleitzeko arau esplizituekin; matrize-geruzek molekulak parteka ditzakete."
  },
  "研究方案目录：关联方法、输入要求、诊断指标与官方来源。": {
    "en": "Research-plan catalogue linking methods, input requirements, diagnostics and official sources.",
    "fr": "Catalogue de plans de recherche reliant méthodes, données requises, diagnostics et sources officielles.",
    "es": "Catálogo de planes de investigación que vincula métodos, datos necesarios, diagnósticos y fuentes oficiales.",
    "eu": "Metodoak, beharrezko datuak, diagnostikoak eta iturri ofizialak lotzen dituen ikerketa-planen katalogoa."
  },
  "分别记录菌株、独立培养、捕获文库和测序 lane；1011 集合中的对象为酿酒酵母菌株。": {
    "en": "Record strain, independent culture, capture library and sequencing lane separately; the 1011 collection comprises S. cerevisiae strains.",
    "fr": "Consigner séparément souche, culture indépendante, bibliothèque de capture et lane de séquençage ; la collection 1011 comprend des souches de S. cerevisiae.",
    "es": "Registrar por separado cepa, cultivo independiente, biblioteca de captura y carril de secuenciación; la colección 1011 comprende cepas de S. cerevisiae.",
    "eu": "Erregistratu bereizita anduia, kultura independentea, harrapaketa-liburutegia eta sekuentziazio-erreia; 1011 bilduma S. cerevisiae anduiek osatzen dute."
  },
  "导入实际观测后计算指标，并关联输入文件与分析记录。": {
    "en": "Calculate metrics after importing observations and link them to input files and analysis records.",
    "fr": "Calculer les indicateurs après import des observations et les relier aux fichiers sources et aux relevés d’analyse.",
    "es": "Calcular las métricas tras importar las observaciones y vincularlas a los archivos de entrada y los registros del análisis.",
    "eu": "Kalkulatu metrikak behaketak inportatu ondoren, eta lotu sarrerako fitxategiekin eta analisi-erregistroekin."
  },
  "结合建库结构与碱基分布解释 FastQC 警告，并记录处理依据。": {
    "en": "Interpret FastQC warnings using library structure and base distributions, and record the rationale for action.",
    "fr": "Interpréter les alertes FastQC selon la structure des bibliothèques et les distributions de bases, puis consigner les décisions.",
    "es": "Interpretar las alertas de FastQC según la estructura de las bibliotecas y las distribuciones de bases, y registrar las decisiones.",
    "eu": "Interpretatu FastQC abisuak liburutegi-egituraren eta base-banaketaren arabera, eta erregistratu erabakien oinarria."
  },
  "按细胞、基因归属和 UMI 共同定义分子身份。": {
    "en": "Define molecule identity jointly by cell, gene assignment and UMI.",
    "fr": "Définir l’identité moléculaire conjointement par la cellule, l’attribution au gène et l’UMI.",
    "es": "Definir la identidad molecular mediante la célula, la asignación al gen y el UMI conjuntamente.",
    "eu": "Definitu molekularen identitatea zelula, geneari esleipena eta UMI batera erabiliz."
  },
  "GeneFull 与 Gene 的计数范围可重叠；内含子矩阵需独立的分子归属规则。": {
    "en": "GeneFull and Gene counting scopes can overlap; an intronic matrix requires separate molecule-assignment rules.",
    "fr": "Les périmètres de comptage GeneFull et Gene peuvent se chevaucher ; une matrice intronique exige des règles d’attribution distinctes.",
    "es": "Los ámbitos de conteo de GeneFull y Gene pueden solaparse; una matriz intrónica requiere reglas de asignación independientes.",
    "eu": "GeneFull eta Gene zenbaketa-eremuak gainjar daitezke; matrize intronikoak molekulak esleitzeko arau bereiziak behar ditu."
  },
  "用背景谱、独立标记和计数变化共同评估背景校正。": {
    "en": "Evaluate ambient-RNA correction jointly with background profiles, independent markers and count changes.",
    "fr": "Évaluer la correction de l’ARN ambiant à partir du profil de fond, de marqueurs indépendants et des changements de comptage.",
    "es": "Evaluar la corrección del ARN ambiental mediante perfiles de fondo, marcadores independientes y cambios en los recuentos.",
    "eu": "Ebaluatu inguruko RNAren zuzenketa hondoko profilekin, markatzaile independenteekin eta zenbaketa-aldaketekin."
  },
  "结合线粒体比例、总 UMI、基因检出及状态证据评估细胞质量。": {
    "en": "Assess cell quality jointly from mitochondrial fraction, total UMIs, detected genes and state evidence.",
    "fr": "Évaluer la qualité cellulaire à partir de la fraction mitochondriale, des UMI totaux, des gènes détectés et des indices d’état.",
    "es": "Evaluar la calidad celular combinando fracción mitocondrial, UMI totales, genes detectados y evidencia del estado.",
    "eu": "Ebaluatu zelulen kalitatea mitokondrio-frakzioa, UMI guztira, detektatutako geneak eta egoeraren ebidentzia batera erabiliz."
  },
  "以独立培养作为生物学重复，并报告各培养内的细胞数。": {
    "en": "Use independent cultures as biological replicates and report cell counts within each culture.",
    "fr": "Utiliser les cultures indépendantes comme répétitions biologiques et rapporter le nombre de cellules par culture.",
    "es": "Utilizar cultivos independientes como réplicas biológicas e informar del número de células por cultivo.",
    "eu": "Erabili kultura independenteak erreplika biologiko gisa, eta adierazi kultura bakoitzeko zelula kopurua."
  },
  "分别报告 TF 转录本丰度与基于靶基因推断的活性。": {
    "en": "Report TF transcript abundance separately from activity inferred from target genes.",
    "fr": "Rapporter séparément l’abondance des transcrits des TF et l’activité inférée à partir de leurs gènes cibles.",
    "es": "Informar por separado de la abundancia de transcritos de TF y de la actividad inferida a partir de sus genes diana.",
    "eu": "Adierazi bereizita TF transkriptoen ugaritasuna eta itu-geneetatik inferitutako jarduera."
  },
  "MAT 表达用于描述交配相关状态；倍性依据基因组或独立测量。": {
    "en": "Use MAT expression to describe mating-related states; determine ploidy from genomic or independent measurements.",
    "fr": "Utiliser l’expression de MAT pour décrire l’état lié à l’accouplement ; déterminer la ploïdie à partir de mesures génomiques ou indépendantes.",
    "es": "Utilizar la expresión de MAT para describir estados de apareamiento; determinar la ploidía mediante datos genómicos o mediciones independientes.",
    "eu": "Erabili MAT adierazpena estalketarekin lotutako egoerak deskribatzeko; zehaztu ploidia neurketa genomiko edo independenteekin."
  },
  "Fano 因子描述离散程度，残差描述相对模型的变异；爆发与内在噪音解释需额外机制证据。": {
    "en": "The Fano factor describes dispersion and residuals describe model-relative variability; bursting and intrinsic-noise interpretations require additional mechanistic evidence.",
    "fr": "Le facteur de Fano décrit la dispersion et les résidus la variabilité relative au modèle ; les interprétations en termes de bouffées transcriptionnelles ou de bruit intrinsèque exigent des preuves mécanistiques.",
    "es": "El factor de Fano describe la dispersión y los residuos la variabilidad respecto al modelo; las interpretaciones de ráfagas o ruido intrínseco requieren evidencia mecanística adicional.",
    "eu": "Fano faktoreak dispertsioa deskribatzen du eta hondarrek ereduarekiko aldakortasuna; eztanden eta berezko zarataren interpretazioek mekanismoaren ebidentzia gehigarria behar dute."
  },
  "共表达边表示统计关联；直接调控解释需独立的结合或扰动证据。": {
    "en": "Coexpression edges represent statistical associations; direct-regulation claims require independent binding or perturbation evidence.",
    "fr": "Les arêtes de coexpression représentent des associations statistiques ; une régulation directe exige des preuves indépendantes de liaison ou de perturbation.",
    "es": "Las aristas de coexpresión representan asociaciones estadísticas; la regulación directa requiere evidencia independiente de unión o perturbación.",
    "eu": "Koadierazpen-ertzek asoziazio estatistikoak adierazten dituzte; erregulazio zuzenerako lotura- edo perturbazio-ebidentzia independentea behar da."
  },
  "拟时序描述状态顺序，RNA velocity 描述表达动力学；实验时间与群体进化分别需要采样记录和遗传证据。": {
    "en": "Pseudotime describes state ordering and RNA velocity describes expression dynamics; experimental time and population evolution require sampling records and genetic evidence, respectively.",
    "fr": "Le pseudotemps décrit l’ordre des états et la vélocité ARN la dynamique d’expression ; le temps expérimental et l’évolution des populations nécessitent respectivement des relevés de prélèvement et des preuves génétiques.",
    "es": "El pseudotiempo describe el orden de estados y la velocidad de ARN la dinámica de expresión; el tiempo experimental y la evolución poblacional requieren registros de muestreo y evidencia genética, respectivamente.",
    "eu": "Pseudodenborak egoeren ordena deskribatzen du eta RNA abiadurak adierazpen-dinamika; denbora esperimentalak eta populazio-eboluzioak laginketa-erregistroak eta ebidentzia genetikoa behar dituzte, hurrenez hurren."
  },
  "按建库协议解释 poly-A 相关读段；尾长和转录起始位点测量需要相应的专用实验。": {
    "en": "Interpret poly-A-associated reads according to the library protocol; tail-length and transcription-start measurements require dedicated assays.",
    "fr": "Interpréter les lectures associées à poly-A selon le protocole ; la mesure de la longueur de queue et des sites d’initiation exige des expériences dédiées.",
    "es": "Interpretar las lecturas asociadas a poly-A según el protocolo; medir longitud de cola y sitios de inicio requiere ensayos específicos.",
    "eu": "Interpretatu poly-Arekin lotutako irakurketak protokoloaren arabera; isats-luzera eta transkripzio-hasierak neurtzeko saio espezifikoak behar dira."
  },
  "将计算支持与实验测量分别记录，并追踪各自来源。": {
    "en": "Record computational support and experimental measurements separately, with their respective sources.",
    "fr": "Consigner séparément le soutien computationnel et les mesures expérimentales, avec leurs sources respectives.",
    "es": "Registrar por separado el apoyo computacional y las mediciones experimentales, con sus respectivas fuentes.",
    "eu": "Erregistratu bereizita euskarri konputazionala eta neurketa esperimentalak, bakoitzaren iturriarekin."
  },
  "群体遗传分析需要与表达样本对应的可靠基因型。": {
    "en": "Population-genetic analysis requires reliable genotypes matched to expression samples.",
    "fr": "L’analyse de génétique des populations exige des génotypes fiables appariés aux échantillons d’expression.",
    "es": "El análisis de genética de poblaciones requiere genotipos fiables vinculados a las muestras de expresión.",
    "eu": "Populazio-genetikako analisiak adierazpen-laginekin lotutako genotipo fidagarriak behar ditu."
  },
  "分别检验均值 eQTL 与噪音 QTL；选择和因果解释需额外设计与证据。": {
    "en": "Test mean eQTLs and noise QTLs separately; selection and causal interpretations require additional designs and evidence.",
    "fr": "Tester séparément les eQTL de moyenne et les QTL de bruit ; les interprétations sélectives et causales exigent des plans et des preuves supplémentaires.",
    "es": "Evaluar por separado los eQTL de media y los QTL de ruido; las interpretaciones de selección y causalidad requieren diseños y evidencia adicionales.",
    "eu": "Aztertu bereizita batezbesteko eQTLak eta zarata QTLak; hautespen- eta kausa-interpretazioek diseinu eta ebidentzia gehigarriak behar dituzte."
  },
  "in silico 扰动生成模型预测，并以独立干预数据评估。": {
    "en": "In silico perturbations generate model predictions evaluated against independent intervention data.",
    "fr": "Les perturbations in silico produisent des prédictions évaluées sur des données d’intervention indépendantes.",
    "es": "Las perturbaciones in silico generan predicciones evaluadas con datos de intervención independientes.",
    "eu": "In silico perturbazioek eredu-iragarpenak sortzen dituzte, esku-hartze datu independenteekin ebaluatzeko."
  },
  "分染色体 RNA 比例描述转录分配；DNA 拷贝数需独立基因组证据。": {
    "en": "Chromosome-specific RNA fractions describe transcript allocation; DNA copy number requires independent genomic evidence.",
    "fr": "Les fractions d’ARN par chromosome décrivent l’allocation des transcrits ; le nombre de copies d’ADN exige des preuves génomiques indépendantes.",
    "es": "Las fracciones de ARN por cromosoma describen la asignación de transcritos; el número de copias de ADN requiere evidencia genómica independiente.",
    "eu": "Kromosoma bakoitzeko RNA frakzioek transkriptoen banaketa deskribatzen dute; DNA kopia-kopuruak ebidentzia genomiko independentea behar du."
  },
  "按参考 contig 和注释定义线粒体基因；分别统计 RPL/RPS 转录本与 rRNA。": {
    "en": "Define mitochondrial genes from reference contigs and annotations; count RPL/RPS transcripts and rRNA separately.",
    "fr": "Définir les gènes mitochondriaux à partir des contigs et annotations ; compter séparément les transcrits RPL/RPS et les ARNr.",
    "es": "Definir los genes mitocondriales desde contigs y anotaciones; contar por separado los transcritos RPL/RPS y el ARNr.",
    "eu": "Definitu gene mitokondrialak erreferentziako contig eta anotazioekin; zenbatu bereizita RPL/RPS transkriptoak eta rRNA."
  },
  "已有原始 FASTQ；核对文件清单、校验值与测序信息。": {
    "en": "Raw FASTQ files are available; check the manifest, checksums and sequencing metadata.",
    "fr": "Les FASTQ bruts sont disponibles ; vérifier le manifeste, les sommes de contrôle et les métadonnées de séquençage.",
    "es": "Se dispone de FASTQ brutos; comprobar el inventario, las sumas de verificación y los metadatos de secuenciación.",
    "eu": "FASTQ gordinak eskuragarri daude; egiaztatu inbentarioa, kontrol-baturak eta sekuentziazio-metadatuak."
  },
  "聚合各检查工具实际生成的报告，并记录工具版本与输入文件。": {
    "en": "Aggregate reports generated by the individual checks and record tool versions and input files.",
    "fr": "Agréger les rapports produits par chaque contrôle et consigner les versions des outils et les fichiers d’entrée.",
    "es": "Agregar los informes generados por cada control y registrar las versiones de las herramientas y los archivos de entrada.",
    "eu": "Agregatu egiaztapen bakoitzak sortutako txostenak, eta erregistratu tresnen bertsioak eta sarrerako fitxategiak."
  },
  "样本×样本亲缘矩阵需匹配样本顺序、倍性和基因型编码；变异×变异 LD 矩阵另行提供。": {
    "en": "Match the sample-by-sample kinship matrix to sample order, ploidy and genotype encoding; supply variant-by-variant LD separately.",
    "fr": "Aligner la matrice d’apparentement sur l’ordre des échantillons, la ploïdie et le codage des génotypes ; fournir séparément le LD entre variants.",
    "es": "Alinear la matriz de parentesco con el orden de muestras, la ploidía y la codificación genotípica; aportar por separado el LD entre variantes.",
    "eu": "Lerrokatu laginen ahaidetasun-matrizea lagin-ordenarekin, ploidiarekin eta genotipo-kodetzearekin; eman aldaeren LD bereizita."
  },
  "使用原始采样记录中的时间值、单位与样本对应关系。": {
    "en": "Use time values, units and sample mappings from the original sampling records.",
    "fr": "Utiliser les temps, unités et correspondances d’échantillons des relevés de prélèvement originaux.",
    "es": "Utilizar los tiempos, unidades y correspondencias de muestras de los registros originales de muestreo.",
    "eu": "Erabili jatorrizko laginketa-erregistroetako denbora-balioak, unitateak eta laginen loturak."
  },
  "结合设计矩阵秩、编码方式与目标 contrast 审查混杂和可估计性；分别建模菌株关联与菌株内培养变异。": {
    "en": "Assess confounding and estimability jointly from design-matrix rank, coding and the target contrast; model strain associations and within-strain culture variation separately.",
    "fr": "Évaluer confusion et estimabilité selon le rang, le codage et le contraste ciblé ; modéliser séparément les associations entre souches et la variation entre cultures d’une même souche.",
    "es": "Evaluar confusión y estimabilidad según el rango, la codificación y el contraste objetivo; modelar por separado las asociaciones entre cepas y la variación entre cultivos de una cepa.",
    "eu": "Ebaluatu nahastea eta estimagarritasuna matrizearen mailarekin, kodetzearekin eta xede-kontrastearekin; modelatu bereizita anduien asoziazioak eta andui barruko kulturen aldakortasuna."
  },
  "以独立培养记录定义生物学重复；同基因型培养混池后需保留独立标签以追踪来源，SNP 仅区分可辨别的基因型。": {
    "en": "Define biological replicates from independent-culture records; pooled cultures with the same genotype require separate labels to retain provenance, while SNPs distinguish separable genotypes.",
    "fr": "Définir les répétitions biologiques à partir des cultures indépendantes ; les cultures mélangées de même génotype exigent des étiquettes distinctes pour conserver leur origine, les SNP distinguant les génotypes séparables.",
    "es": "Definir las réplicas biológicas a partir de cultivos independientes; los cultivos mezclados del mismo genotipo requieren etiquetas distintas para conservar su origen, mientras los SNP distinguen genotipos separables.",
    "eu": "Definitu erreplika biologikoak kultura independenteen erregistroekin; genotipo bereko kultura nahasiek etiketa bereiziak behar dituzte jatorria gordetzeko, eta SNPek genotipo bereizgarriak bereizten dituzte."
  },
  "用同一菌株在明确环境间的可比测量估计反应规范；单条件应激分数和拟时序描述条件内状态。": {
    "en": "Estimate reaction norms from comparable measurements of the same strains across defined environments; single-condition stress scores and pseudotime describe within-condition states.",
    "fr": "Estimer les normes de réaction à partir de mesures comparables des mêmes souches dans des environnements définis ; scores de stress et pseudotemps décrivent les états au sein d’une condition.",
    "es": "Estimar normas de reacción con mediciones comparables de las mismas cepas en ambientes definidos; las puntuaciones de estrés y el pseudotiempo describen estados dentro de una condición.",
    "eu": "Estimatu erreakzio-arauak andui beren neurketa konparagarriekin ingurune definituetan; estres-puntuazioek eta pseudodenborak baldintza barruko egoerak deskribatzen dituzte."
  },
  "用 DNA 证据区分结构缺失与 RNA 未检出；证据不足记为未知，结构缺失基因的噪音性状记为缺失值。": {
    "en": "Use DNA evidence to distinguish structural absence from RNA non-detection; record insufficient evidence as unknown and noise traits of absent genes as missing.",
    "fr": "Distinguer absence structurelle et non-détection d’ARN à l’aide de l’ADN ; coder l’incertitude comme inconnue et les traits de bruit des gènes absents comme manquants.",
    "es": "Distinguir ausencia estructural y no detección de ARN mediante ADN; registrar evidencia insuficiente como desconocida y los rasgos de ruido de genes ausentes como valores faltantes.",
    "eu": "Bereizi egiturazko absentzia eta RNA ez-detekzioa DNA-ebidentziarekin; ebidentzia urria ezezagun gisa eta falta diren geneen zarata-ezaugarriak balio falta gisa kodetu."
  },
  "分别报告细胞间噪音、菌株均值差异与噪音性状遗传方差，并列出菌株数、独立培养数和各培养细胞数。": {
    "en": "Report cell-to-cell noise, strain-mean differences and genetic variance of noise traits separately, alongside strain counts, independent-culture counts and cells per culture.",
    "fr": "Rapporter séparément bruit intercellulaire, différences moyennes entre souches et variance génétique des traits de bruit, avec les nombres de souches, de cultures indépendantes et de cellules par culture.",
    "es": "Informar por separado del ruido entre células, las diferencias medias entre cepas y la varianza genética del ruido, junto con los números de cepas, cultivos independientes y células por cultivo.",
    "eu": "Adierazi bereizita zelulen arteko zarata, anduien batezbestekoen aldeak eta zarata-ezaugarrien bariantza genetikoa, andui, kultura independente eta kultura bakoitzeko zelula kopuruekin."
  },
  "方法比较资料，用于评估模型假设、输入要求与迁移条件。": {
    "en": "Comparative methods reading for assessing model assumptions, inputs and transfer requirements.",
    "fr": "Lecture comparative pour évaluer les hypothèses des modèles, les données requises et les conditions de transfert.",
    "es": "Lectura comparativa para evaluar supuestos, datos necesarios y condiciones de transferencia.",
    "eu": "Metodoen irakurketa konparatiboa, eredu-suposizioak, datuak eta transferentzia-baldintzak ebaluatzeko."
  },
  "从短读 scRNA FASTQ 出发，按研究问题组合分析、指标与工具，并核对各分支所需数据，形成可导出的研究方案。": {
    "en": "Build an exportable research plan from short-read scRNA FASTQ by selecting analyses, metrics and tools and checking the data required by each branch.",
    "fr": "Construire un plan de recherche exportable à partir de FASTQ scRNA à lectures courtes en choisissant analyses, indicateurs et outils, puis en vérifiant les données requises par branche.",
    "es": "Crear un plan de investigación exportable desde FASTQ scRNA de lecturas cortas seleccionando análisis, métricas y herramientas y comprobando los datos de cada rama.",
    "eu": "Sortu esporta daitekeen ikerketa-plana irakurketa laburreko scRNA FASTQ datuetatik, analisiak, metrikak eta tresnak hautatuz eta adar bakoitzaren datuak egiaztatuz."
  },
  "主噪音分析使用原始分子计数；插补、聚合和整合结果用于辅助比较。": {
    "en": "Use raw molecule counts for the primary noise analysis and imputed, aggregated or integrated outputs for supporting comparisons.",
    "fr": "Utiliser les comptages moléculaires bruts pour l’analyse principale du bruit et les sorties imputées, agrégées ou intégrées pour les comparaisons complémentaires.",
    "es": "Utilizar recuentos moleculares brutos para el análisis principal del ruido y salidas imputadas, agregadas o integradas para comparaciones auxiliares.",
    "eu": "Erabili molekula-zenbaketa gordinak zarataren analisi nagusian, eta egoztutako, agregatutako edo integratutako irteerak laguntza-konparazioetarako."
  }
});

Object.assign(window.YV_TEXT ||= {}, {
  "从官方输出计算项目汇总指标，并保存计算规则与原始结果。": {
    "en": "Calculate project summary metrics from official outputs and retain the calculation rules and original results.",
    "fr": "Calculer les indicateurs de synthèse à partir des sorties officielles et conserver les règles de calcul et les résultats originaux.",
    "es": "Calcular métricas de resumen desde las salidas oficiales y conservar las reglas de cálculo y los resultados originales.",
    "eu": "Kalkulatu proiektuaren laburpen-metrikak irteera ofizialetatik, eta gorde kalkulu-arauak eta jatorrizko emaitzak."
  },
  "固定软件版本，按实际设计补全方法调用与参数模板，并保留运行诊断。": {
    "en": "Pin the software version, complete method calls and parameter templates for the actual design, and retain run diagnostics.",
    "fr": "Fixer la version du logiciel, compléter les appels et paramètres selon le plan réel, et conserver les diagnostics d’exécution.",
    "es": "Fijar la versión del programa, completar las llamadas y los parámetros según el diseño real y conservar los diagnósticos de ejecución.",
    "eu": "Finkatu software-bertsioa, osatu metodo-deiak eta parametroak benetako diseinuaren arabera, eta gorde exekuzio-diagnostikoak."
  },
  "记录 metacell 的共享细胞并保留独立培养层级；群体关联另建包含菌株亲缘的模型。": {
    "en": "Record shared cells among metacells and retain independent-culture units; fit a separate kinship-aware model for population associations.",
    "fr": "Consigner les cellules partagées entre métacellules et conserver les unités de culture indépendante ; ajuster un modèle tenant compte de l’apparentement pour les associations populationnelles.",
    "es": "Registrar las células compartidas entre metacélulas y conservar los cultivos independientes; ajustar un modelo con parentesco para las asociaciones poblacionales.",
    "eu": "Erregistratu metazelulen artean partekatutako zelulak eta mantendu kultura independenteen unitateak; doitu ahaidetasuna kontuan hartzen duen eredua populazio-asoziazioetarako."
  },
  "共表达边和 hub 排序用于筛选关联候选；调控机制需独立证据，模块功能按成员富集解释。": {
    "en": "Use coexpression edges and hub rankings to prioritize association candidates; regulatory mechanisms require independent evidence, and module functions are interpreted from member enrichment.",
    "fr": "Utiliser coexpression et classement des hubs pour prioriser les associations ; les mécanismes de régulation exigent des preuves indépendantes, et les fonctions des modules s’interprètent par enrichissement.",
    "es": "Utilizar aristas de coexpresión y rankings de hubs para priorizar asociaciones; los mecanismos reguladores requieren evidencia independiente y las funciones de módulos se interpretan por enriquecimiento.",
    "eu": "Erabili koadierazpen-ertzak eta hub sailkapenak asoziazio-hautagaiak lehenesteko; mekanismoek ebidentzia independentea behar dute, eta moduluen funtzioak aberaste bidez interpretatzen dira."
  },
  "固定酵母标识符、可测基因背景与比较方向；GO 富集表示功能集合的过度代表，通路活性另行评估。": {
    "en": "Fix yeast identifiers, the measurable-gene background and comparison direction; GO enrichment indicates over-representation of functional sets, while pathway activity is assessed separately.",
    "fr": "Fixer les identifiants de levure, le fond de gènes mesurables et le sens de comparaison ; l’enrichissement GO indique une surreprésentation fonctionnelle, l’activité étant évaluée séparément.",
    "es": "Fijar identificadores de levadura, el fondo de genes medibles y la dirección de comparación; GO indica sobrerrepresentación funcional y la actividad se evalúa por separado.",
    "eu": "Finkatu legamiaren identifikatzaileak, gene neurgarrien hondoa eta konparazio-norabidea; GO aberasteak funtzio-multzoen gainordezkaritza adierazten du, eta jarduera bereizita ebaluatzen da."
  },
  "以实际 RNA 覆盖的可判别位点评估菌株身份；缺少区分位点时保留等价身份组，跨 SNP 汇总 UMI 时核对重复分子。": {
    "en": "Assess strain identity using discriminating sites covered by RNA; retain equivalent identity groups when sites are uninformative and check duplicate molecules when aggregating UMIs across SNPs.",
    "fr": "Évaluer l’identité des souches avec les sites discriminants couverts par l’ARN ; conserver des groupes d’identités équivalentes si nécessaire et vérifier les molécules dupliquées lors de l’agrégation des UMI entre SNP.",
    "es": "Evaluar la identidad de cepas con sitios discriminantes cubiertos por ARN; conservar grupos de identidades equivalentes cuando falte información y comprobar moléculas duplicadas al agregar UMI entre SNP.",
    "eu": "Ebaluatu anduien identitatea RNAk estalitako gune bereizgarriekin; gune informatiborik ez badago mantendu identitate baliokideen taldeak, eta egiaztatu molekula bikoiztuak SNPen arteko UMIak batzean."
  },
  "分别报告描述性离群带与经零模型校准的 p 值，再进行多重校正；共享度以可评估菌株为分母，富集结果用于提出功能假设。": {
    "en": "Report descriptive outlier bands separately from null-calibrated p values before multiplicity correction; use evaluable strains as the sharing denominator and enrichment results to propose functional hypotheses.",
    "fr": "Distinguer bandes descriptives d’écart et valeurs p calibrées sous le modèle nul avant correction multiple ; calculer le partage sur les souches évaluables et utiliser l’enrichissement pour formuler des hypothèses fonctionnelles.",
    "es": "Separar bandas descriptivas de valores atípicos y valores p calibrados bajo el nulo antes de corregir multiplicidad; usar cepas evaluables como denominador e interpretar el enriquecimiento como hipótesis funcional.",
    "eu": "Bereizi banda deskriptiboak eta eredu nuluarekin kalibratutako p balioak zuzenketa anizkoitzaren aurretik; erabili andui ebaluagarriak izendatzaile gisa eta aberaste-emaitzak hipotesi funtzionaletarako."
  },
  "同一面板的标签一致率衡量内部一致性；准确率使用独立参考，Poisson 分拆的独立性按模型检查，培养重复依据采样记录。": {
    "en": "Agreement from the same panel measures internal consistency; assess accuracy with an independent reference, check Poisson-splitting independence under its model, and define culture replicates from sampling records.",
    "fr": "L’accord d’un même panel mesure la cohérence interne ; évaluer l’exactitude sur une référence indépendante, vérifier l’indépendance du découpage de Poisson sous son modèle et définir les répétitions par les relevés de culture.",
    "es": "La concordancia del mismo panel mide consistencia interna; evaluar exactitud con una referencia independiente, verificar la independencia de la división de Poisson bajo su modelo y definir réplicas con los registros de cultivo.",
    "eu": "Panel bereko adostasunak barne-koherentzia neurtzen du; ebaluatu zehaztasuna erreferentzia independentearekin, egiaztatu Poisson banaketaren independentzia bere ereduaren arabera, eta definitu erreplikak kultura-erregistroekin."
  },
  "使用真实采样时间建立传输模型，并以酵母证据设定增殖与死亡权重；传输边表示状态间的模型联系，谱系与祖先关系另需追踪或遗传证据。": {
    "en": "Build transport models from observed sampling times and yeast-supported growth and death weights; transport edges link states in a model, while lineage and ancestry require tracing or genetic evidence.",
    "fr": "Construire les modèles de transport à partir des temps observés et de pondérations de croissance et mortalité étayées chez la levure ; les arêtes relient des états modélisés, la lignée et l’ascendance exigeant un traçage ou des preuves génétiques.",
    "es": "Construir modelos de transporte con tiempos observados y pesos de crecimiento y muerte respaldados en levadura; las aristas conectan estados del modelo, mientras linaje y ascendencia requieren trazado o evidencia genética.",
    "eu": "Eraiki garraio-ereduak behatutako laginketa-denborekin eta legamiaren hazkunde- eta heriotza-ebidentziarekin; ertzek ereduko egoerak lotzen dituzte, eta leinuak eta arbasoek jarraipen- edo genetika-ebidentzia behar dute."
  },
  "scDist 估计条件间的多变量均值距离；方差与完整分布变化分别选择相应检验。": {
    "en": "scDist estimates multivariate mean distances between conditions; choose separate tests for variance and full-distribution changes.",
    "fr": "scDist estime les distances entre moyennes multivariées des conditions ; choisir des tests distincts pour les variations de variance et de distribution complète.",
    "es": "scDist estima distancias entre medias multivariantes de condiciones; seleccionar pruebas separadas para varianza y distribución completa.",
    "eu": "scDist-ek baldintzen batezbesteko aldagai-aniztunen distantziak estimatzen ditu; hautatu proba bereiziak bariantzarako eta banaketa osorako."
  },
  "用独立参考评估注释准确率；缺少参考时报告方法一致性。分类分数需概率校准，并检查拒绝标签对低 RNA 状态的偏倚。": {
    "en": "Assess annotation accuracy with an independent reference; report method agreement when none is available. Calibrate classification scores and check rejection bias in low-RNA states.",
    "fr": "Évaluer l’exactitude sur une référence indépendante ; sinon, rapporter l’accord entre méthodes. Calibrer les scores et vérifier le biais de rejet des états à faible ARN.",
    "es": "Evaluar exactitud con una referencia independiente; si falta, informar de concordancia entre métodos. Calibrar las puntuaciones y comprobar sesgo de rechazo en estados de bajo ARN.",
    "eu": "Ebaluatu anotazioaren zehaztasuna erreferentzia independentearekin; halakorik gabe, adierazi metodoen adostasuna. Kalibratu puntuazioak eta aztertu RNA gutxiko egoeren baztertze-alborapena."
  },
  "估计均值 DE/eQTL 功效；噪音 QTL 另设功效模型。以酵母试点替换人类默认参数，适配原生二倍体 HWE 模拟与酵母倍性、群体结构的差异，遗传样本量按菌株计。": {
    "en": "Estimate mean DE/eQTL power; use a separate power model for noise QTLs. Replace human defaults with yeast pilots, adapt native diploid-HWE simulation to yeast ploidy and population structure, and count strains as genetic samples.",
    "fr": "Estimer la puissance des DE/eQTL de moyenne ; prévoir un modèle distinct pour les QTL de bruit. Remplacer les paramètres humains par des données pilotes de levure, adapter la simulation diploïde HWE à la ploïdie et à la structure de population, et compter les souches comme échantillons génétiques.",
    "es": "Estimar potencia para DE/eQTL de media; utilizar otro modelo para QTL de ruido. Sustituir parámetros humanos por pilotos de levadura, adaptar la simulación diploide HWE a ploidía y estructura poblacional, y contar cepas como muestras genéticas.",
    "eu": "Estimatu batezbesteko DE/eQTL potentzia; erabili eredu bereizia zarata QTLetarako. Ordeztu giza parametroak legamia-pilotuekin, egokitu HWE diploidearen simulazioa ploidia eta populazio-egiturara, eta zenbatu anduiak lagin genetiko gisa."
  },
  "将噪音性状与 SE/抽样协方差传入显式测量误差模型，并与亲缘模型衔接；并列报告均值、离散与状态效应，明确可辨识方差组分和遗传力分母。使用标准 GEMMA/limix 时另实现第一阶段 SE 传播。": {
    "en": "Pass noise traits and their SEs or sampling covariance to an explicit measurement-error model linked to kinship; report mean, dispersion and state effects together, with identifiable variance components and the heritability denominator. Implement first-stage SE propagation separately when using standard GEMMA/limix.",
    "fr": "Relier les traits de bruit et leurs erreurs types ou covariances à un modèle explicite d’erreur de mesure avec apparentement ; rapporter effets de moyenne, dispersion et état, composantes identifiables et dénominateur d’héritabilité. Avec GEMMA/limix standard, implémenter séparément la propagation des erreurs du premier stade.",
    "es": "Conectar rasgos de ruido y sus errores estándar o covarianzas con un modelo explícito de error de medición y parentesco; informar efectos de media, dispersión y estado, componentes identificables y denominador de heredabilidad. Con GEMMA/limix estándar, implementar por separado la propagación del error de la primera etapa.",
    "eu": "Lotu zarata-ezaugarriak eta haien SEak edo laginketa-kobariantza neurketa-errorearen eredu esplizitu eta ahaidetasunarekin; adierazi batezbesteko, dispertsio eta egoera-efektuak, osagai identifikagarriak eta heredagarritasunaren izendatzailea. GEMMA/limix estandarrean, ezarri bereizita lehen etapako SEen hedapena."
  }
});

// Retain legacy lookup keys used by source-backed catalogue records.
Object.assign(window.YV_TEXT ||= {}, {
  "调用配方；尚未在项目数据上执行。": {
    "en": "Invocation template; record versions, parameters and diagnostics after execution.",
    "fr": "Modèle d’appel ; consigner versions, paramètres et diagnostics après exécution.",
    "es": "Plantilla de llamada; registrar versiones, parámetros y diagnósticos tras la ejecución.",
    "eu": "Dei-txantiloia; exekutatu ondoren, erregistratu bertsioak, parametroak eta diagnostikoak."
  },
  "调用入口是版本化方法入口或占位模板，不是可直接用于未确认建库结构的数据执行脚本。": {
    "en": "Complete the invocation template for the library structure and software version.",
    "fr": "Compléter le modèle d’appel selon la structure de la bibliothèque et la version du logiciel.",
    "es": "Completar la plantilla de llamada según la estructura de la biblioteca y la versión del programa.",
    "eu": "Osatu dei-txantiloia liburutegiaren egituraren eta software-bertsioaren arabera."
  },
  "按已列输入、酵母限制和实际样本设计判断；不是数据已齐全或流程已运行的声明。": {
    "en": "Assess applicability from the inputs, yeast biology and study design.",
    "fr": "Évaluer l’applicabilité selon les données, la biologie de la levure et le plan d’étude.",
    "es": "Evaluar la aplicabilidad según los datos, la biología de la levadura y el diseño del estudio.",
    "eu": "Ebaluatu egokitasuna sarrerako datuen, legamiaren biologiaren eta ikerketa-diseinuaren arabera."
  },
  "先固定计数对象、排除规则与分层单位；这是待计算指标，不是自动删样阈值。": {
    "en": "Record the counting unit, exclusion rules, strata and filtering rationale.",
    "fr": "Consigner l’unité de comptage, les règles d’exclusion, les strates et les motifs de filtrage.",
    "es": "Registrar la unidad de conteo, las reglas de exclusión, los estratos y los criterios de filtrado.",
    "eu": "Erregistratu zenbaketa-unitatea, baztertzeko arauak, geruzak eta iragazteko oinarriak."
  },
  "这些字段为分析与导出约定；尚未自动拟合或实施条件分支校验。": {
    "en": "These fields define the analysis and export content; selected tools perform model fitting and data diagnostics.",
    "fr": "Ces champs définissent l’analyse et l’export ; les outils sélectionnés assurent l’ajustement des modèles et les diagnostics.",
    "es": "Estos campos definen el análisis y la exportación; las herramientas seleccionadas realizan el ajuste y los diagnósticos.",
    "eu": "Eremu hauek analisia eta esportazioa definitzen dituzte; hautatutako tresnek doikuntza eta diagnostikoak egiten dituzte."
  },
  "项目汇总指标；需汇总官方输出，工作站不执行计算。": {
    "en": "Calculate the summary from the listed tools’ original outputs and record the aggregation rules.",
    "fr": "Calculer la synthèse à partir des sorties originales des outils et consigner les règles d’agrégation.",
    "es": "Calcular el resumen a partir de las salidas originales de las herramientas y registrar las reglas de agregación.",
    "eu": "Kalkulatu laburpena tresnen jatorrizko irteeretatik, eta erregistratu agregazio-arauak."
  },
  "项目审计定义；所列函数提供原始结果，导出字段由项目汇总，不是工具原生同名指标。": {
    "en": "Project-defined summary metric: calculate it from the listed functions’ original outputs and retain the field-to-output mapping.",
    "fr": "Indicateur de synthèse défini par le projet : le calculer à partir des sorties des fonctions et conserver leur correspondance avec les champs.",
    "es": "Métrica de resumen definida por el proyecto: calcularla desde las salidas de las funciones y conservar la correspondencia con los campos.",
    "eu": "Proiektuak definitutako laburpen-metrika: kalkulatu funtzioen irteeretatik, eta gorde eremuen eta irteeren arteko lotura."
  },
  "保留原始UMI计数用于分布推断；插补、平滑及整合表达不能替代原始分布。": {
    "en": "Infer expression distributions from raw UMI counts; store imputed, smoothed and integrated results as auxiliary representations.",
    "fr": "Inférer les distributions d’expression à partir des UMI bruts ; conserver séparément les représentations imputées, lissées et intégrées.",
    "es": "Inferir distribuciones de expresión desde los UMI brutos; guardar los resultados imputados, suavizados e integrados como representaciones auxiliares.",
    "eu": "Inferitu adierazpen-banaketak UMI zenbaketa gordinetatik; gorde egoztutako, leundutako eta integratutako emaitzak laguntza-adierazpen gisa."
  },
  "描述性指标不是自动扣除技术噪音的估计。": {
    "en": "Describe the observed distribution; estimate technical contributions separately with a measurement model.",
    "fr": "Décrire la distribution observée ; estimer séparément les contributions techniques à l’aide d’un modèle de mesure.",
    "es": "Describir la distribución observada; estimar por separado la contribución técnica mediante un modelo de medición.",
    "eu": "Deskribatu behatutako banaketa; estimatu ekarpen teknikoak bereizita neurketa-eredu baten bidez."
  },
  "条件化剩余变异不自动等于内在噪音。": {
    "en": "Conditional residual variability can include hidden states and measurement error; intrinsic-noise interpretation requires mechanistic evidence.",
    "fr": "La variabilité résiduelle conditionnelle peut inclure des états cachés et des erreurs de mesure ; son interprétation comme bruit intrinsèque exige des preuves mécanistiques.",
    "es": "La variabilidad residual condicional puede incluir estados ocultos y error de medición; interpretarla como ruido intrínseco requiere evidencia mecanística.",
    "eu": "Baldintzapeko hondar-aldakortasunak ezkutuko egoerak eta neurketa-errorea izan ditzake; berezko zarata gisa interpretatzeko mekanismoaren ebidentzia behar da."
  },
  "不同层的相减不能自动产生intronic UMI。": {
    "en": "Count intronic UMIs using explicit molecule-assignment rules; matrix layers may contain overlapping molecules.",
    "fr": "Compter les UMI introniques selon des règles explicites d’attribution ; les couches matricielles peuvent partager des molécules.",
    "es": "Contar los UMI intrónicos con reglas explícitas de asignación; las capas de matrices pueden compartir moléculas.",
    "eu": "Zenbatu UMI intronikoak molekulak esleitzeko arau esplizituekin; matrize-geruzek molekulak parteka ditzakete."
  },
  "方法与官方来源已关联；尚未在本项目运行或验证。": {
    "en": "Research-plan catalogue linking methods, input requirements, diagnostics and official sources.",
    "fr": "Catalogue de plans de recherche reliant méthodes, données requises, diagnostics et sources officielles.",
    "es": "Catálogo de planes de investigación que vincula métodos, datos necesarios, diagnósticos y fuentes oficiales.",
    "eu": "Metodoak, beharrezko datuak, diagnostikoak eta iturri ofizialak lotzen dituen ikerketa-planen katalogoa."
  },
  "将菌株、独立培养、捕获文库和测序lane分开；1011是酿酒酵母菌株集合，不是1011个物种。": {
    "en": "Record strain, independent culture, capture library and sequencing lane separately; the 1011 collection comprises S. cerevisiae strains.",
    "fr": "Consigner séparément souche, culture indépendante, bibliothèque de capture et lane de séquençage ; la collection 1011 comprend des souches de S. cerevisiae.",
    "es": "Registrar por separado cepa, cultivo independiente, biblioteca de captura y carril de secuenciación; la colección 1011 comprende cepas de S. cerevisiae.",
    "eu": "Erregistratu bereizita anduia, kultura independentea, harrapaketa-liburutegia eta sekuentziazio-erreia; 1011 bilduma S. cerevisiae anduiek osatzen dute."
  },
  "本项目尚未导入真实数据；所有数值指标待计算。": {
    "en": "Calculate metrics after importing observations and link them to input files and analysis records.",
    "fr": "Calculer les indicateurs après import des observations et les relier aux fichiers sources et aux relevés d’analyse.",
    "es": "Calcular las métricas tras importar las observaciones y vincularlas a los archivos de entrada y los registros del análisis.",
    "eu": "Kalkulatu metrikak behaketak inportatu ondoren, eta lotu sarrerako fitxategiekin eta analisi-erregistroekin."
  },
  "FastQC警告不是自动删除规则。": {
    "en": "Interpret FastQC warnings using library structure and base distributions, and record the rationale for action.",
    "fr": "Interpréter les alertes FastQC selon la structure des bibliothèques et les distributions de bases, puis consigner les décisions.",
    "es": "Interpretar las alertas de FastQC según la estructura de las bibliotecas y las distribuciones de bases, y registrar las decisiones.",
    "eu": "Interpretatu FastQC abisuak liburutegi-egituraren eta base-banaketaren arabera, eta erregistratu erabakien oinarria."
  },
  "同UMI跨基因、跨细胞不是同一分子。": {
    "en": "Define molecule identity jointly by cell, gene assignment and UMI.",
    "fr": "Définir l’identité moléculaire conjointement par la cellule, l’attribution au gène et l’UMI.",
    "es": "Definir la identidad molecular mediante la célula, la asignación al gen y el UMI conjuntamente.",
    "eu": "Definitu molekularen identitatea zelula, geneari esleipena eta UMI batera erabiliz."
  },
  "GeneFull−Gene不是严格的intronic UMI矩阵。": {
    "en": "GeneFull and Gene counting scopes can overlap; an intronic matrix requires separate molecule-assignment rules.",
    "fr": "Les périmètres de comptage GeneFull et Gene peuvent se chevaucher ; une matrice intronique exige des règles d’attribution distinctes.",
    "es": "Los ámbitos de conteo de GeneFull y Gene pueden solaparse; una matriz intrónica requiere reglas de asignación independientes.",
    "eu": "GeneFull eta Gene zenbaketa-eremuak gainjar daitezke; matrize intronikoak molekulak esleitzeko arau bereiziak behar ditu."
  },
  "去背景后marker更漂亮不是校正正确的充分证据。": {
    "en": "Evaluate ambient-RNA correction jointly with background profiles, independent markers and count changes.",
    "fr": "Évaluer la correction de l’ARN ambiant à partir du profil de fond, de marqueurs indépendants et des changements de comptage.",
    "es": "Evaluar la corrección del ARN ambiental mediante perfiles de fondo, marcadores independientes y cambios en los recuentos.",
    "eu": "Ebaluatu inguruko RNAren zuzenketa hondoko profilekin, markatzaile independenteekin eta zenbaketa-aldaketekin."
  },
  "高线粒体比例不自动等于死亡。": {
    "en": "Assess cell quality jointly from mitochondrial fraction, total UMIs, detected genes and state evidence.",
    "fr": "Évaluer la qualité cellulaire à partir de la fraction mitochondriale, des UMI totaux, des gènes détectés et des indices d’état.",
    "es": "Evaluar la calidad celular combinando fracción mitocondrial, UMI totales, genes detectados y evidencia del estado.",
    "eu": "Ebaluatu zelulen kalitatea mitokondrio-frakzioa, UMI guztira, detektatutako geneak eta egoeraren ebidentzia batera erabiliz."
  },
  "大量细胞不能替代独立培养重复。": {
    "en": "Use independent cultures as biological replicates and report cell counts within each culture.",
    "fr": "Utiliser les cultures indépendantes comme répétitions biologiques et rapporter le nombre de cellules par culture.",
    "es": "Utilizar cultivos independientes como réplicas biológicas e informar del número de células por cultivo.",
    "eu": "Erabili kultura independenteak erreplika biologiko gisa, eta adierazi kultura bakoitzeko zelula kopurua."
  },
  "TF的mRNA量不等于TF活性。": {
    "en": "Report TF transcript abundance separately from activity inferred from target genes.",
    "fr": "Rapporter séparément l’abondance des transcrits des TF et l’activité inférée à partir de leurs gènes cibles.",
    "es": "Informar por separado de la abundancia de transcritos de TF y de la actividad inferida a partir de sus genes diana.",
    "eu": "Adierazi bereizita TF transkriptoen ugaritasuna eta itu-geneetatik inferitutako jarduera."
  },
  "MAT表达状态不等于已证实倍性。": {
    "en": "Use MAT expression to describe mating-related states; determine ploidy from genomic or independent measurements.",
    "fr": "Utiliser l’expression de MAT pour décrire l’état lié à l’accouplement ; déterminer la ploïdie à partir de mesures génomiques ou indépendantes.",
    "es": "Utilizar la expresión de MAT para describir estados de apareamiento; determinar la ploidía mediante datos genómicos o mediciones independientes.",
    "eu": "Erabili MAT adierazpena estalketarekin lotutako egoerak deskribatzeko; zehaztu ploidia neurketa genomiko edo independenteekin."
  },
  "Fano>1不是转录爆发证明；残差不是内在噪音。": {
    "en": "The Fano factor describes dispersion and residuals describe model-relative variability; bursting and intrinsic-noise interpretations require additional mechanistic evidence.",
    "fr": "Le facteur de Fano décrit la dispersion et les résidus la variabilité relative au modèle ; les interprétations en termes de bouffées transcriptionnelles ou de bruit intrinsèque exigent des preuves mécanistiques.",
    "es": "El factor de Fano describe la dispersión y los residuos la variabilidad respecto al modelo; las interpretaciones de ráfagas o ruido intrínseco requieren evidencia mecanística adicional.",
    "eu": "Fano faktoreak dispertsioa deskribatzen du eta hondarrek ereduarekiko aldakortasuna; eztanden eta berezko zarataren interpretazioek mekanismoaren ebidentzia gehigarria behar dute."
  },
  "共表达边不是因果调控。": {
    "en": "Coexpression edges represent statistical associations; direct-regulation claims require independent binding or perturbation evidence.",
    "fr": "Les arêtes de coexpression représentent des associations statistiques ; une régulation directe exige des preuves indépendantes de liaison ou de perturbation.",
    "es": "Las aristas de coexpresión representan asociaciones estadísticas; la regulación directa requiere evidencia independiente de unión o perturbación.",
    "eu": "Koadierazpen-ertzek asoziazio estatistikoak adierazten dituzte; erregulazio zuzenerako lotura- edo perturbazio-ebidentzia independentea behar da."
  },
  "拟时序不等于真实时间；velocity不等于群体进化方向。": {
    "en": "Pseudotime describes state ordering and RNA velocity describes expression dynamics; experimental time and population evolution require sampling records and genetic evidence, respectively.",
    "fr": "Le pseudotemps décrit l’ordre des états et la vélocité ARN la dynamique d’expression ; le temps expérimental et l’évolution des populations nécessitent respectivement des relevés de prélèvement et des preuves génétiques.",
    "es": "El pseudotiempo describe el orden de estados y la velocidad de ARN la dinámica de expresión; el tiempo experimental y la evolución poblacional requieren registros de muestreo y evidencia genética, respectivamente.",
    "eu": "Pseudodenborak egoeren ordena deskribatzen du eta RNA abiadurak adierazpen-dinamika; denbora esperimentalak eta populazio-eboluzioak laginketa-erregistroak eta ebidentzia genetikoa behar dituzte, hurrenez hurren."
  },
  "poly-A相关读段不等于poly-A尾长；普通scRNA不是CAGE。": {
    "en": "Interpret poly-A-associated reads according to the library protocol; tail-length and transcription-start measurements require dedicated assays.",
    "fr": "Interpréter les lectures associées à poly-A selon le protocole ; la mesure de la longueur de queue et des sites d’initiation exige des expériences dédiées.",
    "es": "Interpretar las lecturas asociadas a poly-A según el protocolo; medir longitud de cola y sitios de inicio requiere ensayos específicos.",
    "eu": "Interpretatu poly-Arekin lotutako irakurketak protokoloaren arabera; isats-luzera eta transkripzio-hasierak neurtzeko saio espezifikoak behar dira."
  },
  "干实验支持不是新增实验测量。": {
    "en": "Record computational support and experimental measurements separately, with their respective sources.",
    "fr": "Consigner séparément le soutien computationnel et les mesures expérimentales, avec leurs sources respectives.",
    "es": "Registrar por separado el apoyo computacional y las mediciones experimentales, con sus respectivas fuentes.",
    "eu": "Erregistratu bereizita euskarri konputazionala eta neurketa esperimentalak, bakoitzaren iturriarekin."
  },
  "scRNA本身不能替代可靠全基因组基因型。": {
    "en": "Population-genetic analysis requires reliable genotypes matched to expression samples.",
    "fr": "L’analyse de génétique des populations exige des génotypes fiables appariés aux échantillons d’expression.",
    "es": "El análisis de genética de poblaciones requiere genotipos fiables vinculados a las muestras de expresión.",
    "eu": "Populazio-genetikako analisiak adierazpen-laginekin lotutako genotipo fidagarriak behar ditu."
  },
  "均值eQTL不等于噪音QTL；显著关联不自动等于选择或因果。": {
    "en": "Test mean eQTLs and noise QTLs separately; selection and causal interpretations require additional designs and evidence.",
    "fr": "Tester séparément les eQTL de moyenne et les QTL de bruit ; les interprétations sélectives et causales exigent des plans et des preuves supplémentaires.",
    "es": "Evaluar por separado los eQTL de media y los QTL de ruido; las interpretaciones de selección y causalidad requieren diseños y evidencia adicionales.",
    "eu": "Aztertu bereizita batezbesteko eQTLak eta zarata QTLak; hautespen- eta kausa-interpretazioek diseinu eta ebidentzia gehigarriak behar dituzte."
  },
  "in silico扰动是模型预测，不是实际干预结果。": {
    "en": "In silico perturbations generate model predictions evaluated against independent intervention data.",
    "fr": "Les perturbations in silico produisent des prédictions évaluées sur des données d’intervention indépendantes.",
    "es": "Las perturbaciones in silico generan predicciones evaluadas con datos de intervención independientes.",
    "eu": "In silico perturbazioek eredu-iragarpenak sortzen dituzte, esku-hartze datu independenteekin ebaluatzeko."
  },
  "分染色体RNA比例不是DNA拷贝数。": {
    "en": "Chromosome-specific RNA fractions describe transcript allocation; DNA copy number requires independent genomic evidence.",
    "fr": "Les fractions d’ARN par chromosome décrivent l’allocation des transcrits ; le nombre de copies d’ADN exige des preuves génomiques indépendantes.",
    "es": "Las fracciones de ARN por cromosoma describen la asignación de transcritos; el número de copias de ADN requiere evidencia genómica independiente.",
    "eu": "Kromosoma bakoitzeko RNA frakzioek transkriptoen banaketa deskribatzen dute; DNA kopia-kopuruak ebidentzia genomiko independentea behar du."
  },
  "线粒体基因用真实contig/注释，不能照搬^MT-；RPL/RPS不是rRNA。": {
    "en": "Define mitochondrial genes from reference contigs and annotations; count RPL/RPS transcripts and rRNA separately.",
    "fr": "Définir les gènes mitochondriaux à partir des contigs et annotations ; compter séparément les transcrits RPL/RPS et les ARNr.",
    "es": "Definir los genes mitocondriales desde contigs y anotaciones; contar por separado los transcritos RPL/RPS y el ARNr.",
    "eu": "Definitu gene mitokondrialak erreferentziako contig eta anotazioekin; zenbatu bereizita RPL/RPS transkriptoak eta rRNA."
  },
  "当前已知具备；尚未实际读取项目FASTQ。": {
    "en": "Raw FASTQ files are available; check the manifest, checksums and sequencing metadata.",
    "fr": "Les FASTQ bruts sont disponibles ; vérifier le manifeste, les sommes de contrôle et les métadonnées de séquençage.",
    "es": "Se dispone de FASTQ brutos; comprobar el inventario, las sumas de verificación y los metadatos de secuenciación.",
    "eu": "FASTQ gordinak eskuragarri daude; egiaztatu inbentarioa, kontrol-baturak eta sekuentziazio-metadatuak."
  },
  "聚合工具读取实际产生的报告；不是直接读取FASTQ代替各项检查。": {
    "en": "Aggregate reports generated by the individual checks and record tool versions and input files.",
    "fr": "Agréger les rapports produits par chaque contrôle et consigner les versions des outils et les fichiers d’entrée.",
    "es": "Agregar los informes generados por cada control y registrar las versiones de las herramientas y los archivos de entrada.",
    "eu": "Agregatu egiaztapen bakoitzak sortutako txostenak, eta erregistratu tresnen bertsioak eta sarrerako fitxategiak."
  },
  "样本×样本矩阵；与样本顺序、倍性和基因型编码匹配，不能替代变异×变异LD。": {
    "en": "Match the sample-by-sample kinship matrix to sample order, ploidy and genotype encoding; supply variant-by-variant LD separately.",
    "fr": "Aligner la matrice d’apparentement sur l’ordre des échantillons, la ploïdie et le codage des génotypes ; fournir séparément le LD entre variants.",
    "es": "Alinear la matriz de parentesco con el orden de muestras, la ploidía y la codificación genotípica; aportar por separado el LD entre variantes.",
    "eu": "Lerrokatu laginen ahaidetasun-matrizea lagin-ordenarekin, ploidiarekin eta genotipo-kodetzearekin; eman aldaeren LD bereizita."
  },
  "必须来自原采样记录；拟时序不是替代品。": {
    "en": "Use time values, units and sample mappings from the original sampling records.",
    "fr": "Utiliser les temps, unités et correspondances d’échantillons des relevés de prélèvement originaux.",
    "es": "Utilizar los tiempos, unidades y correspondencias de muestras de los registros originales de muestreo.",
    "eu": "Erabili jatorrizko laginketa-erregistroetako denbora-balioak, unitateak eta laginen loturak."
  },
  "满秩不代表无混杂；不可估计系数依赖编码顺序，不能替代具体contrast审查。菌株关联与菌株内培养重复是不同层级。": {
    "en": "Assess confounding and estimability jointly from design-matrix rank, coding and the target contrast; model strain associations and within-strain culture variation separately.",
    "fr": "Évaluer confusion et estimabilité selon le rang, le codage et le contraste ciblé ; modéliser séparément les associations entre souches et la variation entre cultures d’une même souche.",
    "es": "Evaluar confusión y estimabilidad según el rango, la codificación y el contraste objetivo; modelar por separado las asociaciones entre cepas y la variación entre cultivos de una cepa.",
    "eu": "Ebaluatu nahastea eta estimagarritasuna matrizearen mailarekin, kodetzearekin eta xede-kontrastearekin; modelatu bereizita anduien asoziazioak eta andui barruko kulturen aldakortasuna."
  },
  "细胞和lane不等于独立培养；同基因型培养物混合且无额外标签后，其来源不能靠SNP恢复。": {
    "en": "Define biological replicates from independent-culture records; pooled cultures with the same genotype require separate labels to retain provenance, while SNPs distinguish separable genotypes.",
    "fr": "Définir les répétitions biologiques à partir des cultures indépendantes ; les cultures mélangées de même génotype exigent des étiquettes distinctes pour conserver leur origine, les SNP distinguant les génotypes séparables.",
    "es": "Definir las réplicas biológicas a partir de cultivos independientes; los cultivos mezclados del mismo genotipo requieren etiquetas distintas para conservar su origen, mientras los SNP distinguen genotipos separables.",
    "eu": "Definitu erreplika biologikoak kultura independenteen erregistroekin; genotipo bereko kultura nahasiek etiketa bereiziak behar dituzte jatorria gordetzeko, eta SNPek genotipo bereizgarriak bereizten dituzte."
  },
  "单条件中的应激分数或拟时序不等于环境可塑性；反应规范需要同一菌株在明确环境间的可比测量。": {
    "en": "Estimate reaction norms from comparable measurements of the same strains across defined environments; single-condition stress scores and pseudotime describe within-condition states.",
    "fr": "Estimer les normes de réaction à partir de mesures comparables des mêmes souches dans des environnements définis ; scores de stress et pseudotemps décrivent les états au sein d’une condition.",
    "es": "Estimar normas de reacción con mediciones comparables de las mismas cepas en ambientes definidos; las puntuaciones de estrés y el pseudotiempo describen estados dentro de una condición.",
    "eu": "Estimatu erreakzio-arauak andui beren neurketa konparagarriekin ingurune definituetan; estres-puntuazioek eta pseudodenborak baldintza barruko egoerak deskribatzen dituzte."
  },
  "未检出不等于结构缺失；没有DNA证据时保留未知，缺失基因的噪音性状不填零或邻近值。": {
    "en": "Use DNA evidence to distinguish structural absence from RNA non-detection; record insufficient evidence as unknown and noise traits of absent genes as missing.",
    "fr": "Distinguer absence structurelle et non-détection d’ARN à l’aide de l’ADN ; coder l’incertitude comme inconnue et les traits de bruit des gènes absents comme manquants.",
    "es": "Distinguir ausencia estructural y no detección de ARN mediante ADN; registrar evidencia insuficiente como desconocida y los rasgos de ruido de genes ausentes como valores faltantes.",
    "eu": "Bereizi egiturazko absentzia eta RNA ez-detekzioa DNA-ebidentziarekin; ebidentzia urria ezezagun gisa eta falta diren geneen zarata-ezaugarriak balio falta gisa kodetu."
  },
  "细胞间噪音、菌株均值差异与噪音性状遗传方差分别报告；增加细胞不能替代独立菌株或培养重复。": {
    "en": "Report cell-to-cell noise, strain-mean differences and genetic variance of noise traits separately, alongside strain counts, independent-culture counts and cells per culture.",
    "fr": "Rapporter séparément bruit intercellulaire, différences moyennes entre souches et variance génétique des traits de bruit, avec les nombres de souches, de cultures indépendantes et de cellules par culture.",
    "es": "Informar por separado del ruido entre células, las diferencias medias entre cepas y la varianza genética del ruido, junto con los números de cepas, cultivos independientes y células por cultivo.",
    "eu": "Adierazi bereizita zelulen arteko zarata, anduien batezbestekoen aldeak eta zarata-ezaugarrien bariantza genetikoa, andui, kultura independente eta kultura bakoitzeko zelula kopuruekin."
  },
  "研究比较阅读；未接入默认工具或可执行配方。": {
    "en": "Comparative methods reading for assessing model assumptions, inputs and transfer requirements.",
    "fr": "Lecture comparative pour évaluer les hypothèses des modèles, les données requises et les conditions de transfert.",
    "es": "Lectura comparativa para evaluar supuestos, datos necesarios y condiciones de transferencia.",
    "eu": "Metodoen irakurketa konparatiboa, eredu-suposizioak, datuak eta transferentzia-baldintzak ebaluatzeko."
  },
  "从已有短读scRNA FASTQ出发，按研究问题选择分析、指标、工具与依赖；网站不执行测序分析，也不承诺所有分支当前可运行。": {
    "en": "Build an exportable research plan from short-read scRNA FASTQ by selecting analyses, metrics and tools and checking the data required by each branch.",
    "fr": "Construire un plan de recherche exportable à partir de FASTQ scRNA à lectures courtes en choisissant analyses, indicateurs et outils, puis en vérifiant les données requises par branche.",
    "es": "Crear un plan de investigación exportable desde FASTQ scRNA de lecturas cortas seleccionando análisis, métricas y herramientas y comprobando los datos de cada rama.",
    "eu": "Sortu esporta daitekeen ikerketa-plana irakurketa laburreko scRNA FASTQ datuetatik, analisiak, metrikak eta tresnak hautatuz eta adar bakoitzaren datuak egiaztatuz."
  },
  "主噪音分析保留原始分子计数；插补、聚合和整合输出可作辅助但不能替代。": {
    "en": "Use raw molecule counts for the primary noise analysis and imputed, aggregated or integrated outputs for supporting comparisons.",
    "fr": "Utiliser les comptages moléculaires bruts pour l’analyse principale du bruit et les sorties imputées, agrégées ou intégrées pour les comparaisons complémentaires.",
    "es": "Utilizar recuentos moleculares brutos para el análisis principal del ruido y salidas imputadas, agregadas o integradas para comparaciones auxiliares.",
    "eu": "Erabili molekula-zenbaketa gordinak zarataren analisi nagusian, eta egoztutako, agregatutako edo integratutako irteerak laguntza-konparazioetarako."
  },
  "需要基于官方输出编写项目汇总；软件不会自动输出此项目自定义指标。": {
    "en": "Calculate project summary metrics from official outputs and retain the calculation rules and original results.",
    "fr": "Calculer les indicateurs de synthèse à partir des sorties officielles et conserver les règles de calcul et les résultats originaux.",
    "es": "Calcular métricas de resumen desde las salidas oficiales y conservar las reglas de cálculo y los resultados originales.",
    "eu": "Kalkulatu proiektuaren laburpen-metrikak irteera ofizialetatik, eta gorde kalkulu-arauak eta jatorrizko emaitzak."
  },
  "入口为经来源核对的方法入口或参数模板；固定版本后按真实设计填写，未在本项目数据上执行。": {
    "en": "Pin the software version, complete method calls and parameter templates for the actual design, and retain run diagnostics.",
    "fr": "Fixer la version du logiciel, compléter les appels et paramètres selon le plan réel, et conserver les diagnostics d’exécution.",
    "es": "Fijar la versión del programa, completar las llamadas y los parámetros según el diseño real y conservar los diagnósticos de ejecución.",
    "eu": "Finkatu software-bertsioa, osatu metodo-deiak eta parametroak benetako diseinuaren arabera, eta gorde exekuzio-diagnostikoak."
  },
  "重叠metacell不是独立培养重复；群体关联需另外控制菌株亲缘，WGCNA不会自动完成。": {
    "en": "Record shared cells among metacells and retain independent-culture units; fit a separate kinship-aware model for population associations.",
    "fr": "Consigner les cellules partagées entre métacellules et conserver les unités de culture indépendante ; ajuster un modèle tenant compte de l’apparentement pour les associations populationnelles.",
    "es": "Registrar las células compartidas entre metacélulas y conservar los cultivos independientes; ajustar un modelo con parentesco para las asociaciones poblacionales.",
    "eu": "Erregistratu metazelulen artean partekatutako zelulak eta mantendu kultura independenteen unitateak; doitu ahaidetasuna kontuan hartzen duen eredua populazio-asoziazioetarako."
  },
  "共表达边与hub排序不证明直接调控或因果；模块标签不是每个基因的特异功能。": {
    "en": "Use coexpression edges and hub rankings to prioritize association candidates; regulatory mechanisms require independent evidence, and module functions are interpreted from member enrichment.",
    "fr": "Utiliser coexpression et classement des hubs pour prioriser les associations ; les mécanismes de régulation exigent des preuves indépendantes, et les fonctions des modules s’interprètent par enrichissement.",
    "es": "Utilizar aristas de coexpresión y rankings de hubs para priorizar asociaciones; los mecanismos reguladores requieren evidencia independiente y las funciones de módulos se interpretan por enriquecimiento.",
    "eu": "Erabili koadierazpen-ertzak eta hub sailkapenak asoziazio-hautagaiak lehenesteko; mekanismoek ebidentzia independentea behar dute, eta moduluen funtzioak aberaste bidez interpretatzen dira."
  },
  "GO富集不等于通路激活；先固定酵母标识符、可测背景与比较方向。": {
    "en": "Fix yeast identifiers, the measurable-gene background and comparison direction; GO enrichment indicates over-representation of functional sets, while pathway activity is assessed separately.",
    "fr": "Fixer les identifiants de levure, le fond de gènes mesurables et le sens de comparaison ; l’enrichissement GO indique une surreprésentation fonctionnelle, l’activité étant évaluée séparément.",
    "es": "Fijar identificadores de levadura, el fondo de genes medibles y la dirección de comparación; GO indica sobrerrepresentación funcional y la actividad se evalúa por separado.",
    "eu": "Finkatu legamiaren identifikatzaileak, gene neurgarrien hondoa eta konparazio-norabidea; GO aberasteak funtzio-multzoen gainordezkaritza adierazten du, eta jarduera bereizita ebaluatzen da."
  },
  "全VCF距离不能替代实际RNA可判别信息；无可判别位点的候选保留等价身份组。跨SNP累计UMI需声明分子是否重复。": {
    "en": "Assess strain identity using discriminating sites covered by RNA; retain equivalent identity groups when sites are uninformative and check duplicate molecules when aggregating UMIs across SNPs.",
    "fr": "Évaluer l’identité des souches avec les sites discriminants couverts par l’ARN ; conserver des groupes d’identités équivalentes si nécessaire et vérifier les molécules dupliquées lors de l’agrégation des UMI entre SNP.",
    "es": "Evaluar la identidad de cepas con sitios discriminantes cubiertos por ARN; conservar grupos de identidades equivalentes cuando falte información y comprobar moléculas duplicadas al agregar UMI entre SNP.",
    "eu": "Ebaluatu anduien identitatea RNAk estalitako gune bereizgarriekin; gune informatiborik ez badago mantendu identitate baliokideen taldeak, eta egiaztatu molekula bikoiztuak SNPen arteko UMIak batzean."
  },
  "离群带不是已校准显著性；多重校正不能修复无效p值。跨菌株共享度以可评估菌株为分母，富集并不证明因果机制。": {
    "en": "Report descriptive outlier bands separately from null-calibrated p values before multiplicity correction; use evaluable strains as the sharing denominator and enrichment results to propose functional hypotheses.",
    "fr": "Distinguer bandes descriptives d’écart et valeurs p calibrées sous le modèle nul avant correction multiple ; calculer le partage sur les souches évaluables et utiliser l’enrichissement pour formuler des hypothèses fonctionnelles.",
    "es": "Separar bandas descriptivas de valores atípicos y valores p calibrados bajo el nulo antes de corregir multiplicidad; usar cepas evaluables como denominador e interpretar el enriquecimiento como hipótesis funcional.",
    "eu": "Bereizi banda deskriptiboak eta eredu nuluarekin kalibratutako p balioak zuzenketa anizkoitzaren aurretik; erabili andui ebaluagarriak izendatzaile gisa eta aberaste-emaitzak hipotesi funtzionaletarako."
  },
  "同一面板产生的标签一致率不是真值准确率；Poisson分拆仅在相应模型下独立，不能替代真实培养重复。": {
    "en": "Agreement from the same panel measures internal consistency; assess accuracy with an independent reference, check Poisson-splitting independence under its model, and define culture replicates from sampling records.",
    "fr": "L’accord d’un même panel mesure la cohérence interne ; évaluer l’exactitude sur une référence indépendante, vérifier l’indépendance du découpage de Poisson sous son modèle et définir les répétitions par les relevés de culture.",
    "es": "La concordancia del mismo panel mide consistencia interna; evaluar exactitud con una referencia independiente, verificar la independencia de la división de Poisson bajo su modelo y definir réplicas con los registros de cultivo.",
    "eu": "Panel bereko adostasunak barne-koherentzia neurtzen du; ebaluatu zehaztasuna erreferentzia independentearekin, egiaztatu Poisson banaketaren independentzia bere ereduaren arabera, eta definitu erreplikak kultura-erregistroekin."
  },
  "菌株编号、拟时序和系统发育次序不能替代实验时间。传输边不是谱系追踪或进化祖先；不用人类增殖或凋亡默认基因给酵母加权。": {
    "en": "Build transport models from observed sampling times and yeast-supported growth and death weights; transport edges link states in a model, while lineage and ancestry require tracing or genetic evidence.",
    "fr": "Construire les modèles de transport à partir des temps observés et de pondérations de croissance et mortalité étayées chez la levure ; les arêtes relient des états modélisés, la lignée et l’ascendance exigeant un traçage ou des preuves génétiques.",
    "es": "Construir modelos de transporte con tiempos observados y pesos de crecimiento y muerte respaldados en levadura; las aristas conectan estados del modelo, mientras linaje y ascendencia requieren trazado o evidencia genética.",
    "eu": "Eraiki garraio-ereduak behatutako laginketa-denborekin eta legamiaren hazkunde- eta heriotza-ebidentziarekin; ertzek ereduko egoerak lotzen dituzte, eta leinuak eta arbasoek jarraipen- edo genetika-ebidentzia behar dute."
  },
  "scDist 估计条件间多变量均值距离；不能替代方差或完整分布检验。": {
    "en": "scDist estimates multivariate mean distances between conditions; choose separate tests for variance and full-distribution changes.",
    "fr": "scDist estime les distances entre moyennes multivariées des conditions ; choisir des tests distincts pour les variations de variance et de distribution complète.",
    "es": "scDist estima distancias entre medias multivariantes de condiciones; seleccionar pruebas separadas para varianza y distribución completa.",
    "eu": "scDist-ek baldintzen batezbesteko aldagai-aniztunen distantziak estimatzen ditu; hautatu proba bereiziak bariantzarako eta banaketa osorako."
  },
  "没有独立参考时只能报告方法一致性；分类分数不是自动校准的概率，拒绝标签可能偏向低RNA状态。": {
    "en": "Assess annotation accuracy with an independent reference; report method agreement when none is available. Calibrate classification scores and check rejection bias in low-RNA states.",
    "fr": "Évaluer l’exactitude sur une référence indépendante ; sinon, rapporter l’accord entre méthodes. Calibrer les scores et vérifier le biais de rejet des états à faible ARN.",
    "es": "Evaluar exactitud con una referencia independiente; si falta, informar de concordancia entre métodos. Calibrar las puntuaciones y comprobar sesgo de rechazo en estados de bajo ARN.",
    "eu": "Ebaluatu anotazioaren zehaztasuna erreferentzia independentearekin; halakorik gabe, adierazi metodoen adostasuna. Kalibratu puntuazioak eta aztertu RNA gutxiko egoeren baztertze-alborapena."
  },
  "这是均值DE/eQTL功效，不是噪音QTL功效。替换人类默认参数；原生eQTL模拟的二倍体HWE假设须适配酵母倍性与群体结构。遗传样本量按菌株而非细胞计。": {
    "en": "Estimate mean DE/eQTL power; use a separate power model for noise QTLs. Replace human defaults with yeast pilots, adapt native diploid-HWE simulation to yeast ploidy and population structure, and count strains as genetic samples.",
    "fr": "Estimer la puissance des DE/eQTL de moyenne ; prévoir un modèle distinct pour les QTL de bruit. Remplacer les paramètres humains par des données pilotes de levure, adapter la simulation diploïde HWE à la ploïdie et à la structure de population, et compter les souches comme échantillons génétiques.",
    "es": "Estimar potencia para DE/eQTL de media; utilizar otro modelo para QTL de ruido. Sustituir parámetros humanos por pilotos de levadura, adaptar la simulación diploide HWE a ploidía y estructura poblacional, y contar cepas como muestras genéticas.",
    "eu": "Estimatu batezbesteko DE/eQTL potentzia; erabili eredu bereizia zarata QTLetarako. Ordeztu giza parametroak legamia-pilotuekin, egokitu HWE diploidearen simulazioa ploidia eta populazio-egiturara, eta zenbatu anduiak lagin genetiko gisa."
  },
  "将噪音性状及SE/抽样协方差连接到亲缘模型；并列均值、离散与状态效应，声明可辨识方差组分和遗传力分母。标准GEMMA/limix不自动传播第一阶段SE。": {
    "en": "Pass noise traits and their SEs or sampling covariance to an explicit measurement-error model linked to kinship; report mean, dispersion and state effects together, with identifiable variance components and the heritability denominator. Implement first-stage SE propagation separately when using standard GEMMA/limix.",
    "fr": "Relier les traits de bruit et leurs erreurs types ou covariances à un modèle explicite d’erreur de mesure avec apparentement ; rapporter effets de moyenne, dispersion et état, composantes identifiables et dénominateur d’héritabilité. Avec GEMMA/limix standard, implémenter séparément la propagation des erreurs du premier stade.",
    "es": "Conectar rasgos de ruido y sus errores estándar o covarianzas con un modelo explícito de error de medición y parentesco; informar efectos de media, dispersión y estado, componentes identificables y denominador de heredabilidad. Con GEMMA/limix estándar, implementar por separado la propagación del error de la primera etapa.",
    "eu": "Lotu zarata-ezaugarriak eta haien SEak edo laginketa-kobariantza neurketa-errorearen eredu esplizitu eta ahaidetasunarekin; adierazi batezbesteko, dispertsio eta egoera-efektuak, osagai identifikagarriak eta heredagarritasunaren izendatzailea. GEMMA/limix estandarrean, ezarri bereizita lehen etapako SEen hedapena."
  }
});
