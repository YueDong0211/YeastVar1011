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
  "调用配方；尚未在项目数据上执行。": {
    "en": "API recipe; not executed on project data.",
    "fr": "Recette API ; non exécutée sur les données du projet.",
    "es": "Receta de API; no ejecutada en los datos del proyecto.",
    "eu": "API errezeta; proiektuko datuetan exekutatu gabe."
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
  "满秩不代表无混杂；不可估计系数依赖编码顺序，不能替代具体contrast审查。菌株关联与菌株内培养重复是不同层级。": {
    "en": "Full rank does not remove confounding. Non-estimable coefficients depend on coding order and do not replace contrast-specific checks. Strain associations and within-strain culture replication are different levels.",
    "fr": "Un rang plein ne supprime pas la confusion. Les coefficients non estimables dépendent du codage ; vérifier chaque contraste. Associations entre souches et répétitions de culture intra-souche sont distinctes.",
    "es": "El rango completo no elimina confusión. Los coeficientes no estimables dependen del orden de codificación; revisar cada contraste. La asociación entre cepas y las réplicas de cultivo son niveles distintos.",
    "eu": "Hein osoak ez du nahastea ezabatzen. Koefiziente estimaezinak kodetze-ordenaren araberakoak dira; egiaztatu kontraste bakoitza. Anduien arteko asoziazioa eta andui barruko kultibo-erreplikak maila desberdinak dira."
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
  "菌株编号、拟时序和系统发育次序不能替代实验时间。传输边不是谱系追踪或进化祖先；不用人类增殖或凋亡默认基因给酵母加权。": {
    "en": "Strain IDs, pseudotime and phylogenetic order cannot replace experimental time. Transport edges are not lineage tracing or evolutionary ancestry. Do not weight yeast with default human proliferation or apoptosis genes.",
    "fr": "Identifiants de souche, pseudotemps et phylogénie ne remplacent pas le temps expérimental. Les couplages ne retracent ni lignées ni ancêtres. Ne pas pondérer la levure avec des gènes humains par défaut.",
    "es": "Identificadores de cepa, pseudotiempo y filogenia no sustituyen el tiempo experimental. Los acoplamientos no trazan linajes ni ancestros. No ponderar levadura con genes humanos predeterminados.",
    "eu": "Andui-IDek, pseudodenborak eta filogenia-ordenak ez dute denbora esperimentala ordezkatzen. Akoplamenduek ez dituzte leinuak edo arbasoak trazatzen. Ez haztatu legamia giza gene lehenetsiekin."
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
  "这是均值DE/eQTL功效，不是噪音QTL功效。替换人类默认参数；原生eQTL模拟的二倍体HWE假设须适配酵母倍性与群体结构。遗传样本量按菌株而非细胞计。": {
    "en": "This models mean DE/eQTL power, not noise-QTL power. Replace human defaults and adapt native diploid/HWE eQTL simulation to yeast ploidy and structure. Genetic sample size counts strains, not cells.",
    "fr": "Ce modèle estime la puissance DE/eQTL moyenne, pas celle des QTL de bruit. Remplacer les défauts humains et adapter les hypothèses diploïdes/HWE à la levure. L’effectif génétique compte les souches, pas les cellules.",
    "es": "Modela potencia DE/eQTL de medias, no de QTL de ruido. Sustituir valores humanos y adaptar supuestos diploides/HWE a levadura. El tamaño genético cuenta cepas, no células.",
    "eu": "Batezbestekoen DE/eQTL potentzia modelatzen du, ez zarata-QTLena. Ordezkatu giza lehenespenak eta egokitu diploide/HWE hipotesiak legamiara. Lagin-tamaina genetikoak anduiak zenbatzen ditu, ez zelulak."
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
        "task": "Cluster resolution and between-culture stability"
      },
      "fr": {
        "task": "Résolution des groupes et stabilité entre cultures"
      },
      "es": {
        "task": "Resolución de grupos y estabilidad entre cultivos"
      },
      "eu": {
        "task": "Klusterren bereizmena eta kultiboen arteko egonkortasuna"
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
