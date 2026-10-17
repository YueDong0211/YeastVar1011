'use strict';
// Research catalogue additions: Chinese in data; English, French, Spanish and Basque below.
(()=>{
const text={
  "Ty/重复元件的UMI定量与多重比对审计": {
    "en": "Ty/repeat UMI quantification and multimapping audit",
    "fr": "Quantification UMI des Ty/répétitions et audit des alignements multiples",
    "es": "Cuantificación UMI de Ty/repeticiones y auditoría de alineamientos múltiples",
    "eu": "Ty/errepikapenen UMI kuantifikazioa eta lerrokatze anitzen auditoria"
  },
  "TE家族/位点矩阵": {
    "en": "TE family/locus matrix",
    "fr": "Matrice des familles/locus TE",
    "es": "Matriz de familias/loci TE",
    "eu": "TE familia/locus matrizea"
  },
  "分子等价类与纠错日志": {
    "en": "Molecular equivalence classes and correction logs",
    "fr": "Classes d’équivalence moléculaire et journaux de correction",
    "es": "Clases de equivalencia molecular y registros de corrección",
    "eu": "Baliokidetasun molekularreko klaseak eta zuzenketa-erregistroak"
  },
  "酵母重复元件注释": {
    "en": "Yeast repeat annotation",
    "fr": "Annotation des répétitions de levure",
    "es": "Anotación de repeticiones de levadura",
    "eu": "Legamiaren errepikapenen anotazioa"
  },
  "BED第四列声明Ty家族或位点；与BAM contig和菌株参考一致。": {
    "en": "BED column four defines Ty families or loci; coordinates must match the BAM and strain reference.",
    "fr": "La quatrième colonne BED définit les familles ou locus Ty ; les coordonnées doivent correspondre au BAM et à la référence de souche.",
    "es": "La cuarta columna BED define familias o loci Ty; las coordenadas deben coincidir con el BAM y la referencia de cepa.",
    "eu": "BEDen laugarren zutabeak Ty familiak edo locusak definitzen ditu; koordenatuek BAMarekin eta anduiaren erreferentziarekin bat etorri behar dute."
  },
  "细胞与分子标签": {
    "en": "Cell and molecule tags",
    "fr": "Étiquettes de cellule et de molécule",
    "es": "Etiquetas de célula y molécula",
    "eu": "Zelula- eta molekula-etiketak"
  },
  "按建库语义明确CB和UR；保留原始UMI供IRescue纠错，审计与UB的差异。": {
    "en": "Specify CB and UR according to the library design; retain raw UMIs for IRescue correction and compare with UB.",
    "fr": "Définir CB et UR selon la bibliothèque ; conserver les UMI bruts pour IRescue et comparer avec UB.",
    "es": "Definir CB y UR según la biblioteca; conservar UMI originales para IRescue y comparar con UB.",
    "eu": "Definitu CB eta UR liburutegiaren diseinuaren arabera; gorde jatorrizko UMIak IRescuerako eta alderatu UBrekin."
  },
  "保留重复序列的候选比对": {
    "en": "Preserve candidate repeat alignments",
    "fr": "Conserver les alignements candidats des répétitions",
    "es": "Conservar alineamientos candidatos de repeticiones",
    "eu": "Gorde errepikapenen lerrokatze hautagaiak"
  },
  "记录outFilterMultimapNmax、winAnchorMultimapNmax及次要比对输出；按参考重复数与敏感性设定。": {
    "en": "Record outFilterMultimapNmax, winAnchorMultimapNmax and secondary-alignment output; choose settings using reference repeat content and sensitivity analyses.",
    "fr": "Consigner outFilterMultimapNmax, winAnchorMultimapNmax et les alignements secondaires ; choisir selon les répétitions de référence et les analyses de sensibilité.",
    "es": "Registrar outFilterMultimapNmax, winAnchorMultimapNmax y alineamientos secundarios; elegir según las repeticiones de referencia y análisis de sensibilidad.",
    "eu": "Erregistratu outFilterMultimapNmax, winAnchorMultimapNmax eta bigarren mailako lerrokatzeak; hautatu erreferentziako errepikapenen eta sentikortasun-analisien arabera."
  },
  "家族或位点": {
    "en": "Family or locus",
    "fr": "Famille ou locus",
    "es": "Familia o locus",
    "eu": "Familia edo locusa"
  },
  "先比较可辨识的家族层；位点层单独报告歧义支持与版本。": {
    "en": "Compare identifiable families first; report locus-level ambiguity and version separately.",
    "fr": "Comparer d’abord les familles identifiables ; documenter séparément ambiguïté et version au niveau du locus.",
    "es": "Comparar primero familias identificables; informar por separado ambigüedad y versión a nivel de locus.",
    "eu": "Alderatu lehenik familia identifikagarriak; eman bereiz locus-mailako anbiguotasuna eta bertsioa."
  },
  "需要匹配酵母的重复注释及保留多重比对的BAM；已有只含唯一比对的BAM可能需要从FASTQ重建。": {
    "en": "Requires yeast-matched repeat annotation and multimapping-preserving BAM; a unique-only BAM may need reconstruction from FASTQ.",
    "fr": "Nécessite une annotation adaptée à la levure et un BAM conservant les alignements multiples ; un BAM limité aux alignements uniques peut nécessiter une reconstruction depuis les FASTQ.",
    "es": "Requiere anotación de levadura y BAM con alineamientos múltiples; un BAM de alineamientos únicos puede necesitar reconstrucción desde FASTQ.",
    "eu": "Legamiaren anotazioa eta lerrokatze anitzak gordetzen dituen BAMa behar dira; lerrokatze bakarrak dituen BAMa FASTQetatik berreraiki behar izan daiteke."
  },
  "EM分配量作为独立计数层保存；不能直接当整数UMI投入噪音计数模型。": {
    "en": "Keep EM assignments in a separate count layer; do not treat them directly as integer UMIs in noise-count models.",
    "fr": "Conserver les affectations EM dans une couche séparée ; ne pas les traiter directement comme des UMI entiers dans les modèles de bruit.",
    "es": "Guardar asignaciones EM en una capa separada; no tratarlas directamente como UMI enteros en modelos de ruido.",
    "eu": "Gorde EM esleipenak geruza bereizi batean; ez tratatu zuzenean UMI oso gisa zarata-ereduetan."
  },
  "Ty RNA丰度不是转座插入事件或DNA拷贝数。": {
    "en": "Ty RNA abundance does not identify transposition events or DNA copy number.",
    "fr": "L’abondance d’ARN Ty n’identifie ni les événements de transposition ni le nombre de copies ADN.",
    "es": "La abundancia de ARN Ty no identifica eventos de transposición ni número de copias de ADN.",
    "eu": "Ty RNAren ugaritasunak ez ditu transposizio-gertaerak edo DNA kopia kopurua identifikatzen."
  },
  "官方工具与调用入口": {
    "en": "Official tool and execution entry",
    "fr": "Outil officiel et point d’entrée",
    "es": "Herramienta oficial y punto de entrada",
    "eu": "Tresna ofiziala eta exekuzio-sarrera"
  },
  "跨状态共享与特异的菌株间表达方差": {
    "en": "Shared and state-specific between-strain expression variance",
    "fr": "Variance d’expression entre souches, partagée et spécifique aux états",
    "es": "Varianza de expresión entre cepas compartida y específica de estados",
    "eu": "Anduien arteko adierazpen-bariantza partekatua eta egoera-espezifikoa"
  },
  "跨状态共享方差hom2": {
    "en": "Shared cross-state variance hom2",
    "fr": "Variance partagée entre états hom2",
    "es": "Varianza compartida entre estados hom2",
    "eu": "Egoeren arteko bariantza partekatua hom2"
  },
  "状态特异协方差V": {
    "en": "State-specific covariance V",
    "fr": "Covariance spécifique aux états V",
    "es": "Covarianza específica de estados V",
    "eu": "Egoera-espezifikoko kobariantza V"
  },
  "Jackknife检验与模型拟合诊断": {
    "en": "Jackknife tests and model-fit diagnostics",
    "fr": "Tests jackknife et diagnostics d’ajustement",
    "es": "Pruebas jackknife y diagnóstico del ajuste",
    "eu": "Jackknife probak eta doikuntzaren diagnostikoa"
  },
  "伪bulk均值和其抽样方差": {
    "en": "Pseudobulk means and sampling variance",
    "fr": "Moyennes pseudobulk et variance d’échantillonnage",
    "es": "Medias pseudobulk y varianza de muestreo",
    "eu": "Pseudobulk batezbestekoak eta laginketa-bariantza"
  },
  "同一标度下计算状态内均值、细胞方差和细胞数，保留缺失状态。": {
    "en": "Compute within-state means, cell variances and cell numbers on a common scale; retain missing states.",
    "fr": "Calculer moyennes, variances cellulaires et effectifs par état sur une même échelle ; conserver les états manquants.",
    "es": "Calcular medias, varianzas celulares y tamaños por estado en una escala común; conservar estados ausentes.",
    "eu": "Kalkulatu egoerako batezbestekoak, zelula-bariantzak eta kopuruak eskala berean; mantendu falta diren egoerak."
  },
  "批次及设计协变量": {
    "en": "Batch and design covariates",
    "fr": "Covariables de lot et de plan expérimental",
    "es": "Covariables de lote y diseño",
    "eu": "Lote- eta diseinu-kobariableak"
  },
  "菌株、独立培养与批次按实验单位编码；不把技术lane当独立菌株。": {
    "en": "Encode strains, independent cultures and batches as experimental units; sequencing lanes are not independent strains.",
    "fr": "Coder souches, cultures indépendantes et lots selon les unités expérimentales ; les lanes ne sont pas des souches indépendantes.",
    "es": "Codificar cepas, cultivos independientes y lotes según las unidades experimentales; los carriles no son cepas independientes.",
    "eu": "Kodetu anduiak, kultura independenteak eta loteak unitate esperimentalen arabera; sekuentziazio-erreiak ez dira andui independenteak."
  },
  "方差结构": {
    "en": "Variance structure",
    "fr": "Structure de variance",
    "es": "Estructura de varianza",
    "eu": "Bariantzaren egitura"
  },
  "比较共享、状态特异及跨状态协方差模型，并用留出与模拟评价。": {
    "en": "Compare shared, state-specific and cross-state covariance models using held-out data and simulations.",
    "fr": "Comparer les modèles de covariance partagée, spécifique et interétats par validation réservée et simulation.",
    "es": "Comparar modelos de covarianza compartida, específica y entre estados con validación y simulaciones.",
    "eu": "Alderatu kobariantza partekatuko, espezifikoko eta egoeren arteko ereduak gordetako datuekin eta simulazioekin."
  },
  "估计的是菌株/样本间均值变异，需与同菌株细胞间表达噪音分别展示。": {
    "en": "This estimates variation of means between strains/samples; display it separately from cell-to-cell noise within a strain.",
    "fr": "Estime la variation des moyennes entre souches/échantillons ; l’afficher séparément du bruit entre cellules d’une souche.",
    "es": "Estima variación de medias entre cepas/muestras; mostrarla separada del ruido entre células de una cepa.",
    "eu": "Andui/laginen batezbestekoen arteko aldakortasuna estimatzen du; erakutsi andui bereko zelulen zaratatik bereiz."
  },
  "现有独立样本假设不自动处理1011群体亲缘；亲缘分层、独立子集或模型扩展须单独验证。": {
    "en": "Independent-sample assumptions do not automatically handle relatedness in the 1011 population; validate stratification, independent subsets or model extensions.",
    "fr": "L’indépendance des échantillons ne traite pas automatiquement la parenté des 1011 souches ; valider stratification, sous-ensembles indépendants ou extensions.",
    "es": "La independencia de muestras no resuelve automáticamente el parentesco de las 1011 cepas; validar estratificación, subconjuntos independientes o extensiones.",
    "eu": "Lagin independenteen suposizioak ez du 1011 anduien ahaidetasuna automatikoki tratatzen; balioztatu estratifikazioa, azpimultzo independenteak edo luzapenak."
  },
  "同一培养内跨状态协调表达程序": {
    "en": "Coordinated expression programs across states within cultures",
    "fr": "Programmes coordonnés entre états d’une culture",
    "es": "Programas coordinados entre estados de un cultivo",
    "eu": "Kultura bereko egoeren arteko programa koordinatuak"
  },
  "状态特异程序基因": {
    "en": "State-specific program genes",
    "fr": "Gènes de programmes spécifiques aux états",
    "es": "Genes de programas específicos de estados",
    "eu": "Egoera-espezifikoko programen geneak"
  },
  "单细胞程序分数": {
    "en": "Single-cell program scores",
    "fr": "Scores de programmes par cellule",
    "es": "Puntuaciones de programas por célula",
    "eu": "Zelulako programa-puntuazioak"
  },
  "跨状态程序相关与混合模型结果": {
    "en": "Cross-state program correlations and mixed-model results",
    "fr": "Corrélations de programmes entre états et modèles mixtes",
    "es": "Correlaciones de programas entre estados y modelos mixtos",
    "eu": "Egoeren arteko programa-korrelazioak eta eredu mistoen emaitzak"
  },
  "状态与共享培养索引": {
    "en": "State and shared-culture indices",
    "fr": "Indices d’état et de culture partagée",
    "es": "Índices de estado y cultivo compartido",
    "eu": "Egoera- eta kultura partekatuaren indizeak"
  },
  "每个状态对象使用相同的独立培养ID体系；只有同一培养中共同采样的状态才可配对。": {
    "en": "Use the same independent-culture IDs across state objects; pair only states sampled in the same culture.",
    "fr": "Employer les mêmes identifiants de cultures indépendantes ; apparier uniquement les états échantillonnés dans la même culture.",
    "es": "Usar los mismos ID de cultivos independientes; emparejar solo estados muestreados en el mismo cultivo.",
    "eu": "Erabili kultura independenteen ID berak egoera-objektuetan; parekatu kultura berean lagindutako egoerak soilik."
  },
  "程序数、协变量和状态覆盖": {
    "en": "Program number, covariates and state coverage",
    "fr": "Nombre de programmes, covariables et couverture des états",
    "es": "Número de programas, covariables y cobertura de estados",
    "eu": "Programa kopurua, kobariableak eta egoera-estaldura"
  },
  "通过按菌株/培养留出比较程序稳定性，记录可用样本与被排除状态。": {
    "en": "Assess stability by holding out strains/cultures; record available samples and excluded states.",
    "fr": "Évaluer la stabilité en réservant souches/cultures ; consigner échantillons disponibles et états exclus.",
    "es": "Evaluar estabilidad reservando cepas/cultivos; registrar muestras disponibles y estados excluidos.",
    "eu": "Ebaluatu egonkortasuna anduiak/kulturak gordez; erregistratu lagin erabilgarriak eta baztertutako egoerak."
  },
  "原方法用于多细胞类型；酵母应用将类别改为可比较状态并验证样本共同覆盖。": {
    "en": "The original method models cell types; the yeast adaptation uses comparable states and checks shared sample coverage.",
    "fr": "La méthode originale traite des types cellulaires ; l’adaptation à la levure utilise des états comparables et vérifie leur couverture commune.",
    "es": "El método original modela tipos celulares; la adaptación a levadura usa estados comparables y verifica cobertura común.",
    "eu": "Jatorrizko metodoak zelula motak modelatzen ditu; legamiaren egokitzapenak egoera konparagarriak erabiltzen ditu eta estaldura komuna egiaztatzen du."
  },
  "跨状态共变支持协调程序，不单独证明细胞间通讯或配体—受体作用。": {
    "en": "Cross-state covariance supports coordinated programs, but does not alone establish communication or ligand–receptor interactions.",
    "fr": "La covariance entre états soutient des programmes coordonnés, sans démontrer seule communication ou interactions ligand–récepteur.",
    "es": "La covarianza entre estados apoya programas coordinados, pero no demuestra por sí sola comunicación ni interacciones ligando–receptor.",
    "eu": "Egoeren arteko kobariantzak programa koordinatuak babesten ditu, baina ez du berez komunikazioa edo ligando-hartzaile elkarrekintza frogatzen."
  },
  "模块化RNA动力学与后验速度": {
    "en": "Modular RNA dynamics and posterior velocities",
    "fr": "Dynamique modulaire de l’ARN et vitesses postérieures",
    "es": "Dinámica modular del ARN y velocidades posteriores",
    "eu": "RNA dinamika modularra eta abiaduren atzeko banaketak"
  },
  "RNA速度模块": {
    "en": "RNA-velocity modules",
    "fr": "Modules de vélocité ARN",
    "es": "Módulos de velocidad del ARN",
    "eu": "RNA abiaduraren moduluak"
  },
  "速度均值及不确定性": {
    "en": "Velocity means and uncertainty",
    "fr": "Moyennes des vitesses et incertitude",
    "es": "Medias de velocidad e incertidumbre",
    "eu": "Abiaduraren batezbestekoak eta ziurgabetasuna"
  },
  "基因动力学参数及模块激活时间": {
    "en": "Gene kinetic parameters and module activation times",
    "fr": "Paramètres cinétiques et temps d’activation des modules",
    "es": "Parámetros cinéticos y tiempos de activación de módulos",
    "eu": "Geneen parametro zinetikoak eta moduluen aktibazio-denborak"
  },
  "可辨识剪接分子层": {
    "en": "Identifiable splicing-molecule layers",
    "fr": "Couches moléculaires d’épissage identifiables",
    "es": "Capas moleculares de empalme identificables",
    "eu": "Splicing molekulen geruza identifikagarriak"
  },
  "仅纳入剪接证据足够的酵母基因，记录被保留基因的功能偏倚。": {
    "en": "Include only yeast genes with sufficient splice evidence; report functional selection bias in retained genes.",
    "fr": "Inclure seulement les gènes suffisamment étayés par l’épissage ; documenter les biais fonctionnels des gènes retenus.",
    "es": "Incluir solo genes con evidencia suficiente de empalme; registrar sesgos funcionales de los genes retenidos.",
    "eu": "Sartu splicing-ebidentzia nahikoa duten legamia-geneak soilik; eman gordetako geneen hautapen-alborapen funtzionala."
  },
  "动力学模块与先验": {
    "en": "Kinetic modules and priors",
    "fr": "Modules cinétiques et a priori",
    "es": "Módulos cinéticos y distribuciones previas",
    "eu": "Modulu zinetikoak eta aurretikoak"
  },
  "比较模块数和先验对方向、模块成员与拟合的影响。": {
    "en": "Compare module counts and priors for effects on direction, membership and fit.",
    "fr": "Comparer l’effet du nombre de modules et des a priori sur direction, composition et ajustement.",
    "es": "Comparar cómo el número de módulos y los priors afectan dirección, miembros y ajuste.",
    "eu": "Alderatu modulu kopuruak eta aurretikoek norabidean, kidetzan eta doikuntzan duten eragina."
  },
  "技术批次与生物状态": {
    "en": "Technical batches and biological states",
    "fr": "Lots techniques et états biologiques",
    "es": "Lotes técnicos y estados biológicos",
    "eu": "Lote teknikoak eta egoera biologikoak"
  },
  "技术批次与菌株效应分开，不默认回归掉目标菌株差异。": {
    "en": "Separate technical batches from strain effects; do not remove target strain differences by default.",
    "fr": "Séparer lots techniques et effets de souche ; ne pas retirer par défaut les différences étudiées.",
    "es": "Separar lotes técnicos y efectos de cepa; no eliminar por defecto las diferencias de interés.",
    "eu": "Bereizi lote teknikoak eta andui-efektuak; ez kendu lehenespenez helburuko andui-aldeak."
  },
  "酵母含内含子基因较少；是否启用取决于实测剪接支持与模型拟合。": {
    "en": "Yeast has few intron-containing genes; enable this model only when measured splice support and fit justify it.",
    "fr": "La levure possède peu de gènes à introns ; activer ce modèle selon le support d’épissage mesuré et l’ajustement.",
    "es": "La levadura tiene pocos genes con intrones; activar según evidencia medida de empalme y ajuste.",
    "eu": "Legamiak introndun gene gutxi ditu; aktibatu eredua neurtutako splicing-euskarriaren eta doikuntzaren arabera."
  },
  "模型中模块的启闭并非默认周期振荡模型；循环系统须与VeloCycle及已知周期顺序对照。": {
    "en": "Module switching is not a periodic-oscillation model; compare cyclic systems with VeloCycle and known phase order.",
    "fr": "L’activation des modules n’est pas un modèle oscillatoire ; comparer les cycles à VeloCycle et à l’ordre connu des phases.",
    "es": "La activación de módulos no es un modelo oscilatorio; comparar ciclos con VeloCycle y el orden conocido de fases.",
    "eu": "Moduluen pizte/itzaltzea ez da oszilazio periodikoaren eredua; alderatu zikloak VeloCyclerekin eta faseen ordena ezagunarekin."
  },
  "潜在时间和速度不等于菌株进化时间。": {
    "en": "Latent time and velocity are not strain evolutionary time.",
    "fr": "Temps latent et vélocité ne représentent pas le temps évolutif des souches.",
    "es": "El tiempo latente y la velocidad no son tiempo evolutivo de cepas.",
    "eu": "Denbora latentea eta abiadura ez dira anduien eboluzio-denbora."
  },
  "计数型均值eQTL与模型校准": {
    "en": "Count-based mean eQTLs and model calibration",
    "fr": "eQTL de moyenne fondés sur les comptages et calibration",
    "es": "eQTL de media basados en conteos y calibración",
    "eu": "Zenbaketetan oinarritutako batezbesteko-eQTLak eta kalibrazioa"
  },
  "均值eQTL效应与标准误": {
    "en": "Mean-eQTL effects and standard errors",
    "fr": "Effets eQTL de moyenne et erreurs standard",
    "es": "Efectos eQTL de media y errores estándar",
    "eu": "Batezbesteko-eQTL efektuak eta errore estandarrak"
  },
  "基因级校准p值": {
    "en": "Calibrated gene-level p-values",
    "fr": "Valeurs p calibrées par gène",
    "es": "Valores p calibrados por gen",
    "eu": "Gene-mailako p balio kalibratuak"
  },
  "拟合有效性与失败原因": {
    "en": "Fit validity and failure reasons",
    "fr": "Validité de l’ajustement et motifs d’échec",
    "es": "Validez del ajuste y causas de fallo",
    "eu": "Doikuntzaren baliozkotasuna eta hutsegite-arrazoiak"
  },
  "状态分层的求和计数与offset": {
    "en": "State-stratified sum counts and offsets",
    "fr": "Comptages sommés par état et offsets",
    "es": "Conteos sumados por estado y offsets",
    "eu": "Egoeraka batutako zenbaketak eta offsetak"
  },
  "使用样本ID对齐；offset来自筛基因前的总量，禁止用已筛候选基因之和重算。": {
    "en": "Align by sample ID; derive offsets from totals before gene filtering, not from selected candidate genes.",
    "fr": "Aligner par identifiant ; calculer les offsets avant filtrage des gènes, non sur les seuls candidats.",
    "es": "Alinear por ID; calcular offsets con totales previos al filtrado, no solo con genes candidatos.",
    "eu": "Lerrokatu lagin-IDz; kalkulatu offsetak gene-iragazketaren aurreko totaletatik, ez hautagaien baturatik."
  },
  "酵母cis区间": {
    "en": "Yeast cis interval",
    "fr": "Intervalle cis de levure",
    "es": "Intervalo cis de levadura",
    "eu": "Legamiaren cis tartea"
  },
  "按酵母基因组与LD定义窗口，不直接使用人类默认窗口。": {
    "en": "Define windows from the yeast genome and LD; do not directly use human defaults.",
    "fr": "Définir les fenêtres selon le génome de levure et le LD ; ne pas appliquer les valeurs humaines par défaut.",
    "es": "Definir ventanas según genoma de levadura y LD; no usar directamente valores humanos predeterminados.",
    "eu": "Definitu leihoak legamiaren genomaren eta LDren arabera; ez erabili zuzenean giza lehenespenak."
  },
  "分布与校准": {
    "en": "Distribution and calibration",
    "fr": "Distribution et calibration",
    "es": "Distribución y calibración",
    "eu": "Banaketa eta kalibrazioa"
  },
  "比较NB、Poisson及已存在的亲缘混合模型；保留失败记录和跨基因FDR。": {
    "en": "Compare NB, Poisson and kinship mixed models; retain failures and across-gene FDR.",
    "fr": "Comparer NB, Poisson et modèles mixtes de parenté ; conserver échecs et FDR intergènes.",
    "es": "Comparar NB, Poisson y modelos mixtos de parentesco; conservar fallos y FDR entre genes.",
    "eu": "Alderatu NB, Poisson eta ahaidetasun-eredu mistoak; gorde hutsegiteak eta geneen arteko FDRa."
  },
  "需要匹配基因型；该GLM不自动替代亲缘混合模型，1011群体须检验群体结构残留。": {
    "en": "Requires matched genotypes; this GLM does not replace kinship mixed models, so test residual population structure.",
    "fr": "Nécessite des génotypes appariés ; ce GLM ne remplace pas les modèles de parenté, donc vérifier la structure résiduelle.",
    "es": "Requiere genotipos emparejados; este GLM no sustituye modelos de parentesco, por lo que debe evaluarse la estructura residual.",
    "eu": "Genotipo parekatuak behar dira; GLMak ez ditu ahaidetasun-ereduak ordezkatzen, eta hondar populazio-egitura aztertu behar da."
  },
  "模型的NB离散参数不构成噪音QTL检验：本条目估计均值遗传效应。": {
    "en": "NB dispersion does not constitute a noise-QTL test; this model estimates genetic effects on the mean.",
    "fr": "La dispersion NB n’est pas un test de QTL de bruit ; le modèle estime les effets génétiques sur la moyenne.",
    "es": "La dispersión NB no constituye una prueba QTL de ruido; el modelo estima efectos genéticos sobre la media.",
    "eu": "NB dispertsioa ez da zarata-QTL proba; ereduak batezbestekoaren efektu genetikoak estimatzen ditu."
  },
  "原论文当前核对为预印本。": {
    "en": "The source is currently verified as a preprint.",
    "fr": "La source est actuellement vérifiée comme prépublication.",
    "es": "La fuente está verificada actualmente como prepublicación.",
    "eu": "Iturria aurreinprimaketa gisa egiaztatuta dago."
  },
  "具有真实网络与爆发参数的机制模拟": {
    "en": "Mechanistic simulation with known networks and burst parameters",
    "fr": "Simulation mécaniste avec réseaux et paramètres de bouffées connus",
    "es": "Simulación mecanística con redes y parámetros de ráfagas conocidos",
    "eu": "Sare eta transkripzio-boladen parametro ezaguneko mekanismo-simulazioa"
  },
  "已知GRN与参数的模拟RNA": {
    "en": "Simulated RNA with known GRNs and parameters",
    "fr": "ARN simulé avec GRN et paramètres connus",
    "es": "ARN simulado con GRN y parámetros conocidos",
    "eu": "GRN eta parametro ezaguneko RNA simulatua"
  },
  "时间序列与模拟干预": {
    "en": "Time series and simulated interventions",
    "fr": "Séries temporelles et interventions simulées",
    "es": "Series temporales e intervenciones simuladas",
    "eu": "Denbora-serieak eta esku-hartze simulatuak"
  },
  "模型恢复和噪音偏差评价": {
    "en": "Model recovery and noise-bias evaluation",
    "fr": "Récupération du modèle et biais du bruit",
    "es": "Recuperación del modelo y sesgo del ruido",
    "eu": "Ereduaren berreskurapena eta zarata-alborapenaren ebaluazioa"
  },
  "机制真值": {
    "en": "Mechanistic ground truth",
    "fr": "Vérité mécanistique de référence",
    "es": "Verdad mecanística de referencia",
    "eu": "Mekanismoaren erreferentziazko egia"
  },
  "独立改变网络边、爆发和降解参数；每个情景保存生成真值和随机种子。": {
    "en": "Vary network edges, bursting and degradation separately; save generating truth and random seeds for each scenario.",
    "fr": "Modifier séparément arêtes, bouffées et dégradation ; conserver la vérité génératrice et les graines pour chaque scénario.",
    "es": "Variar por separado aristas, ráfagas y degradación; guardar verdad generadora y semillas por escenario.",
    "eu": "Aldatu bereiz sare-ertzak, boladak eta degradazioa; gorde egia sortzailea eta ausazko haziak egoera bakoitzean."
  },
  "测量层": {
    "en": "Measurement layer",
    "fr": "Couche de mesure",
    "es": "Capa de medición",
    "eu": "Neurketa-geruza"
  },
  "在生物过程模拟外，显式添加捕获、深度、背景及barcode损失情景。": {
    "en": "Add explicit capture, depth, background and barcode-loss scenarios outside the biological-process simulation.",
    "fr": "Ajouter explicitement capture, profondeur, fond et perte de barcodes en dehors de la simulation biologique.",
    "es": "Añadir explícitamente captura, profundidad, fondo y pérdida de barcodes fuera de la simulación biológica.",
    "eu": "Gehitu esplizituki harrapaketa, sakonera, hondoa eta barcode-galera prozesu biologikoaren simulaziotik kanpo."
  },
  "已知网络模拟可独立开展；真实数据反推网络另需时间标记及可辨识性检查。": {
    "en": "Known-network simulations can run independently; inference from real data additionally needs time labels and identifiability checks.",
    "fr": "Les simulations de réseaux connus sont autonomes ; l’inférence réelle nécessite des temps et des contrôles d’identifiabilité.",
    "es": "La simulación de redes conocidas es independiente; la inferencia real necesita tiempos y comprobaciones de identificabilidad.",
    "eu": "Sare ezagunen simulazioak bereiz egin daitezke; datu errealen inferentziak denbora-etiketak eta identifikagarritasun-egiaztapenak behar ditu."
  },
  "模拟得到的蛋白变量是潜在模型状态，不是单细胞RNA测得的蛋白量。": {
    "en": "Simulated protein variables are latent model states, not protein measurements from scRNA-seq.",
    "fr": "Les variables protéiques simulées sont latentes, pas des protéines mesurées par scRNA-seq.",
    "es": "Las variables proteicas simuladas son latentes, no mediciones de proteínas mediante scRNA-seq.",
    "eu": "Proteina-aldagai simulatuak egoera latenteak dira, ez scRNA-seq bidez neurtutako proteinak."
  },
  "模拟适用": {
    "en": "Suitable for simulation",
    "fr": "Adapté à la simulation",
    "es": "Adecuado para simulación",
    "eu": "Simulaziorako egokia"
  },
  "时间标记快照的GRN与轨迹联合推断": {
    "en": "Joint GRN and trajectory inference from time-stamped snapshots",
    "fr": "Inférence conjointe de GRN et trajectoires à partir d’instantanés datés",
    "es": "Inferencia conjunta de GRN y trayectorias a partir de instantáneas temporales",
    "eu": "Denbora etiketadun argazkietatik GRN eta ibilbideen inferentzia bateratua"
  },
  "机制GRN": {
    "en": "Mechanistic GRN",
    "fr": "GRN mécaniste",
    "es": "GRN mecanística",
    "eu": "Mekanismo-GRNa"
  },
  "重建轨迹与模拟RNA分布": {
    "en": "Reconstructed trajectories and simulated RNA distributions",
    "fr": "Trajectoires reconstruites et distributions d’ARN simulées",
    "es": "Trayectorias reconstruidas y distribuciones de ARN simuladas",
    "eu": "Berreraikitako ibilbideak eta RNA banaketa simulatuak"
  },
  "留出时间/干预预测": {
    "en": "Held-out time/intervention predictions",
    "fr": "Prédictions de temps/interventions réservés",
    "es": "Predicciones de tiempos/intervenciones reservados",
    "eu": "Gordetako denboren/esku-hartzeen iragarpenak"
  },
  "计数与真实采样时间": {
    "en": "Counts and actual sampling times",
    "fr": "Comptages et temps réels d’échantillonnage",
    "es": "Conteos y tiempos reales de muestreo",
    "eu": "Zenbaketak eta benetako laginketa-denborak"
  },
  "保存AnnData细胞×基因矩阵及obs时间；按独立培养建立留出，不用随机细胞划分替代。": {
    "en": "Store cell-by-gene AnnData and obs times; hold out independent cultures rather than random cells.",
    "fr": "Conserver AnnData cellules×gènes et les temps obs ; réserver des cultures indépendantes plutôt que des cellules aléatoires.",
    "es": "Guardar AnnData células×genes y tiempos obs; reservar cultivos independientes en vez de células aleatorias.",
    "eu": "Gorde zelula×gene AnnData eta obs denborak; gorde kultura independenteak balidaziorako, ausazko zelulen ordez."
  },
  "动力学速率及物种先验": {
    "en": "Kinetic rates and species priors",
    "fr": "Vitesses cinétiques et a priori d’espèce",
    "es": "Tasas cinéticas y priors de especie",
    "eu": "Tasa zinetikoak eta espezie-aurretikoak"
  },
  "准备酵母来源的降解/动力学先验及其不确定性；禁用默认人鼠先验。": {
    "en": "Prepare yeast-derived kinetic/degradation priors and uncertainty; disable default human/mouse priors.",
    "fr": "Préparer des a priori cinétiques/de dégradation de levure avec incertitude ; désactiver les a priori humains/murins.",
    "es": "Preparar priors cinéticos/de degradación de levadura con incertidumbre; desactivar los humanos/murinos.",
    "eu": "Prestatu legamiaren zinetika/degradazio aurretikoak eta ziurgabetasuna; desgaitu gizaki/sagu lehenespenak."
  },
  "代码版本及模型设置": {
    "en": "Code version and model settings",
    "fr": "Version du code et paramètres du modèle",
    "es": "Versión del código y configuración del modelo",
    "eu": "Kode-bertsioa eta eredu-ezarpenak"
  },
  "论文复现固定plos-cb-2026标签；新版运行另记录commit与CardamomOT_inputs.xlsx。": {
    "en": "Use tag plos-cb-2026 for paper reproduction; record the commit and CardamomOT_inputs.xlsx for newer runs.",
    "fr": "Utiliser plos-cb-2026 pour reproduire l’article ; consigner commit et CardamomOT_inputs.xlsx pour les versions ultérieures.",
    "es": "Usar plos-cb-2026 para reproducir el artículo; registrar commit y CardamomOT_inputs.xlsx en versiones posteriores.",
    "eu": "Erabili plos-cb-2026 artikulua erreproduzitzeko; bertsio berrietan erregistratu commita eta CardamomOT_inputs.xlsx."
  },
  "需要时间序列和动力学先验；单时间点群体横断面不进入时间网络推断。": {
    "en": "Requires time series and kinetic priors; single-time-point population snapshots do not enter temporal-network inference.",
    "fr": "Nécessite séries temporelles et a priori cinétiques ; une coupe à un seul temps n’entre pas dans l’inférence temporelle.",
    "es": "Requiere series temporales y priors cinéticos; una instantánea de un solo tiempo no permite esta inferencia temporal.",
    "eu": "Denbora-serieak eta aurretiko zinetikoak behar ditu; denbora-puntu bakarreko laginak ez dira denbora-sarearen inferentzian sartzen."
  },
  "默认物种资源偏向人鼠；酵母先验和基因ID必须适配。": {
    "en": "Default species resources focus on human/mouse; adapt yeast priors and gene IDs.",
    "fr": "Les ressources par défaut ciblent humain/souris ; adapter a priori et identifiants de levure.",
    "es": "Los recursos predeterminados se centran en humano/ratón; adaptar priors e ID de levadura.",
    "eu": "Lehenetsitako baliabideak gizaki/saguetarako dira; egokitu legamiaren aurretikoak eta gene-IDak."
  },
  "模拟干预用于候选排序；以已有真实扰动数据评估外推。": {
    "en": "Use simulated interventions to rank candidates; evaluate extrapolation with existing real perturbation data.",
    "fr": "Classer les candidats par interventions simulées ; évaluer l’extrapolation avec des perturbations réelles existantes.",
    "es": "Ordenar candidatos mediante intervenciones simuladas; evaluar extrapolación con perturbaciones reales existentes.",
    "eu": "Sailkatu hautagaiak esku-hartze simulatuekin; ebaluatu estrapolazioa benetako perturbazio-datuekin."
  },
  "重复元件比对候选保留率": {
    "en": "Recoverability of repeat-alignment candidates",
    "fr": "Récupérabilité des alignements candidats de répétitions",
    "es": "Recuperabilidad de alineamientos candidatos de repeticiones",
    "eu": "Errepikapen-lerrokatze hautagaien berreskuragarritasuna"
  },
  "核对Ty候选read的NH、次要比对、CB及原始UMI标签，比较多重比对截断和参考版本导致的损失。": {
    "en": "Audit NH, secondary alignments, CB and raw UMI tags for Ty candidates; compare losses from alignment caps and reference versions.",
    "fr": "Auditer NH, alignements secondaires, CB et UMI bruts des candidats Ty ; comparer les pertes dues aux plafonds et références.",
    "es": "Auditar NH, alineamientos secundarios, CB y UMI originales de candidatos Ty; comparar pérdidas por límites y referencias.",
    "eu": "Auditatu Ty hautagaien NH, bigarren mailako lerrokatzeak, CB eta jatorrizko UMIak; alderatu mugen eta erreferentzien ondoriozko galerak."
  },
  "项目定义的分层指标": {
    "en": "Project-defined stratified metrics",
    "fr": "Indicateurs stratifiés définis pour le projet",
    "es": "Indicadores estratificados definidos por el proyecto",
    "eu": "Proiektuan definitutako adierazle estratifikatuak"
  },
  "有重复元件重叠证据的read与分子候选": {
    "en": "Reads and molecular candidates overlapping repeats",
    "fr": "Reads et molécules candidats chevauchant des répétitions",
    "es": "Lecturas y moléculas candidatas solapadas con repeticiones",
    "eu": "Errepikapenekin gainjartzen diren irakurketak eta molekula hautagaiak"
  },
  "文库×参考×比对策略": {
    "en": "Library × reference × alignment strategy",
    "fr": "Bibliothèque × référence × stratégie d’alignement",
    "es": "Biblioteca × referencia × estrategia de alineamiento",
    "eu": "Liburutegia × erreferentzia × lerrokatze-estrategia"
  },
  "候选read数": {
    "en": "Candidate-read count",
    "fr": "Nombre de reads candidats",
    "es": "Número de lecturas candidatas",
    "eu": "Irakurketa hautagaien kopurua"
  },
  "次要比对记录数": {
    "en": "Secondary-alignment record count",
    "fr": "Nombre d’alignements secondaires",
    "es": "Número de alineamientos secundarios",
    "eu": "Bigarren mailako lerrokatze kopurua"
  },
  "缺失标签数": {
    "en": "Missing-tag count",
    "fr": "Nombre d’étiquettes manquantes",
    "es": "Número de etiquetas ausentes",
    "eu": "Falta diren etiketen kopurua"
  },
  "本次比对上限": {
    "en": "Alignment cap used in this run",
    "fr": "Plafond d’alignements de cette exécution",
    "es": "Límite de alineamientos de esta ejecución",
    "eu": "Exekuzio honetako lerrokatze-muga"
  },
  "Ty家族分子归属与歧义": {
    "en": "Ty-family assignment and ambiguity",
    "fr": "Affectation aux familles Ty et ambiguïté",
    "es": "Asignación a familias Ty y ambigüedad",
    "eu": "Ty familien esleipena eta anbiguotasuna"
  },
  "分开保存家族层表达、跨家族等价类、EM分配量和唯一证据；核对条码轴与基因矩阵。": {
    "en": "Store family expression, cross-family equivalence classes, EM assignments and unique evidence separately; reconcile barcodes with the gene matrix.",
    "fr": "Séparer expression des familles, classes inter-familles, affectations EM et preuves uniques ; réconcilier les barcodes avec la matrice génique.",
    "es": "Separar expresión de familias, clases entre familias, asignaciones EM y evidencia única; conciliar barcodes con la matriz génica.",
    "eu": "Gorde bereiz familien adierazpena, familien arteko klaseak, EM esleipenak eta ebidentzia bakarra; bateratu barcodeak gene-matrizearekin."
  },
  "通过相同细胞白名单的重复元件候选分子": {
    "en": "Repeat-molecule candidates passing the same cell whitelist",
    "fr": "Molécules candidates de répétitions retenues par la même liste de cellules",
    "es": "Moléculas candidatas de repeticiones en la misma lista de células",
    "eu": "Zelulen zerrenda baimendu bera gainditzen duten errepikapen-molekulak"
  },
  "家族×细胞×文库": {
    "en": "Family × cell × library",
    "fr": "Famille × cellule × bibliothèque",
    "es": "Familia × célula × biblioteca",
    "eu": "Familia × zelula × liburutegia"
  },
  "记录原生输出为整数还是分数；不将期望分配量冒充原始整数UMI。": {
    "en": "Record whether native output is integer or fractional; expected assignments are not raw integer UMIs.",
    "fr": "Préciser si la sortie est entière ou fractionnaire ; les affectations attendues ne sont pas des UMI bruts entiers.",
    "es": "Indicar si la salida es entera o fraccionaria; las asignaciones esperadas no son UMI originales enteros.",
    "eu": "Adierazi irteera osoa edo zatikizkoa den; esleipen itxaropenak ez dira jatorrizko UMI osoak."
  },
  "家族或位点ID": {
    "en": "Family or locus ID",
    "fr": "Identifiant de famille ou locus",
    "es": "ID de familia o locus",
    "eu": "Familia- edo locus-IDa"
  },
  "家族/位点": {
    "en": "Family/locus",
    "fr": "Famille/locus",
    "es": "Familia/locus",
    "eu": "Familia/locusa"
  },
  "分配丰度": {
    "en": "Assigned abundance",
    "fr": "Abondance affectée",
    "es": "Abundancia asignada",
    "eu": "Esleitutako ugaritasuna"
  },
  "歧义等价类摘要": {
    "en": "Ambiguous-equivalence-class summary",
    "fr": "Résumé des classes d’équivalence ambiguës",
    "es": "Resumen de clases de equivalencia ambiguas",
    "eu": "Baliokidetasun-klase anbiguoen laburpena"
  },
  "与主矩阵条码一致性": {
    "en": "Barcode agreement with the main matrix",
    "fr": "Concordance des barcodes avec la matrice principale",
    "es": "Concordancia de barcodes con la matriz principal",
    "eu": "Barcodeen eta matrize nagusiaren arteko adostasuna"
  },
  "Ty变异与分配策略敏感性": {
    "en": "Ty variability sensitivity to assignment strategy",
    "fr": "Sensibilité de la variabilité Ty à l’affectation",
    "es": "Sensibilidad de variabilidad Ty a la asignación",
    "eu": "Ty aldakortasunaren esleipenarekiko sentikortasuna"
  },
  "在可比较状态和培养内评估Ty家族RNA分布，并检查唯一证据、EM分配、参考和背景处理对候选排序的影响。": {
    "en": "Compare Ty-family RNA distributions within matched states and cultures; examine effects of unique evidence, EM, reference and background handling on candidate rankings.",
    "fr": "Comparer les distributions d’ARN Ty dans des états/cultures comparables ; examiner l’effet des preuves uniques, EM, références et corrections de fond sur le classement.",
    "es": "Comparar distribuciones de ARN Ty en estados/cultivos comparables; examinar efectos de evidencia única, EM, referencia y fondo sobre el orden de candidatos.",
    "eu": "Alderatu Ty RNA banaketak egoera eta kultura konparagarrietan; aztertu ebidentzia bakarrak, EMk, erreferentziak eta hondoak sailkapenean duten eragina."
  },
  "同一参考可定义且各比较组有证据支持的家族": {
    "en": "Families defined on one reference and supported in all comparison groups",
    "fr": "Familles définies sur une référence et étayées dans tous les groupes comparés",
    "es": "Familias definidas en una referencia y respaldadas en todos los grupos",
    "eu": "Erreferentzia berean definitutako eta alderatutako talde guztietan sostengatutako familiak"
  },
  "家族×状态×培养": {
    "en": "Family × state × culture",
    "fr": "Famille × état × culture",
    "es": "Familia × estado × cultivo",
    "eu": "Familia × egoera × kultura"
  },
  "与整数计数模型比较时采用可解释的整数证据层或明确的误差模型。": {
    "en": "Use interpretable integer evidence or an explicit error model when comparing with integer-count models.",
    "fr": "Utiliser une preuve entière interprétable ou un modèle d’erreur explicite pour les modèles de comptages entiers.",
    "es": "Usar evidencia entera interpretable o un modelo explícito de error al comparar con modelos de conteos enteros.",
    "eu": "Erabili ebidentzia oso interpretagarria edo errore-eredu esplizitua zenbaketa osoen ereduekin alderatzean."
  },
  "分配策略": {
    "en": "Assignment strategy",
    "fr": "Stratégie d’affectation",
    "es": "Estrategia de asignación",
    "eu": "Esleipen-estrategia"
  },
  "分布效应": {
    "en": "Distributional effect",
    "fr": "Effet sur la distribution",
    "es": "Efecto sobre la distribución",
    "eu": "Banaketaren efektua"
  },
  "重抽样区间": {
    "en": "Resampling interval",
    "fr": "Intervalle de rééchantillonnage",
    "es": "Intervalo de remuestreo",
    "eu": "Birlaginketa-tartea"
  },
  "候选排序稳定性": {
    "en": "Candidate-ranking stability",
    "fr": "Stabilité du classement des candidats",
    "es": "Estabilidad del orden de candidatos",
    "eu": "Hautagai-sailkapenaren egonkortasuna"
  },
  "状态特异的菌株间方差": {
    "en": "State-specific between-strain variance",
    "fr": "Variance intersouche spécifique aux états",
    "es": "Varianza entre cepas específica de estados",
    "eu": "Egoera-espezifikoko anduien arteko bariantza"
  },
  "报告CTMM跨状态共享方差和状态特异方差，保留均值及伪bulk抽样方差。": {
    "en": "Report CTMM shared and state-specific variance; retain means and pseudobulk sampling variances.",
    "fr": "Rapporter les variances CTMM partagées et spécifiques ; conserver moyennes et variances d’échantillonnage pseudobulk.",
    "es": "Informar varianzas CTMM compartidas y específicas; conservar medias y varianzas de muestreo pseudobulk.",
    "eu": "Eman CTMMren bariantza partekatua eta espezifikoa; gorde batezbestekoak eta pseudobulk laginketa-bariantzak."
  },
  "可在相同状态集合比较的菌株/独立培养": {
    "en": "Strains/independent cultures comparable across the same states",
    "fr": "Souches/cultures indépendantes comparables sur les mêmes états",
    "es": "Cepas/cultivos independientes comparables en los mismos estados",
    "eu": "Egoera beretan konparagarriak diren anduiak/kultura independenteak"
  },
  "基因×状态×样本集合": {
    "en": "Gene × state × sample set",
    "fr": "Gène × état × ensemble d’échantillons",
    "es": "Gen × estado × conjunto de muestras",
    "eu": "Genea × egoera × lagin multzoa"
  },
  "该方差属于样本/菌株间，不是同菌株内单细胞噪音或遗传力。": {
    "en": "This is between-sample/strain variance, not within-strain cell noise or heritability.",
    "fr": "Il s’agit de variance entre échantillons/souches, non de bruit cellulaire intrasouche ou d’héritabilité.",
    "es": "Es varianza entre muestras/cepas, no ruido celular dentro de cepa ni heredabilidad.",
    "eu": "Lagin/anduien arteko bariantza da, ez andui barruko zelula-zarata edo heredagarritasuna."
  },
  "跨状态共享样本间方差": {
    "en": "Shared between-sample variance across states",
    "fr": "Variance interéchantillon partagée entre états",
    "es": "Varianza entre muestras compartida entre estados",
    "eu": "Egoeren artean partekatutako laginen arteko bariantza"
  },
  "状态特异协方差矩阵": {
    "en": "State-specific covariance matrix",
    "fr": "Matrice de covariance spécifique aux états",
    "es": "Matriz de covarianza específica de estados",
    "eu": "Egoera-espezifikoko kobariantza-matrizea"
  },
  "状态平均表达": {
    "en": "State mean expression",
    "fr": "Expression moyenne par état",
    "es": "Expresión media por estado",
    "eu": "Egoerako batezbesteko adierazpena"
  },
  "状态均值的抽样方差": {
    "en": "Sampling variance of state means",
    "fr": "Variance d’échantillonnage des moyennes par état",
    "es": "Varianza de muestreo de medias por estado",
    "eu": "Egoerako batezbestekoen laginketa-bariantza"
  },
  "跨状态方差模型校准": {
    "en": "Calibration of cross-state variance models",
    "fr": "Calibration des modèles de variance interétats",
    "es": "Calibración de modelos de varianza entre estados",
    "eu": "Egoeren arteko bariantza-ereduen kalibrazioa"
  },
  "比较Hom/Free/Full、Jackknife、缺失状态处理与亲缘分层后的结论，使用设计匹配模拟检查误报。": {
    "en": "Compare Hom/Free/Full, jackknife, missing-state handling and kinship strata; evaluate false positives with design-matched simulations.",
    "fr": "Comparer Hom/Free/Full, jackknife, états manquants et strates de parenté ; évaluer les faux positifs par simulations adaptées au plan.",
    "es": "Comparar Hom/Free/Full, jackknife, estados ausentes y estratos de parentesco; evaluar falsos positivos con simulaciones del diseño.",
    "eu": "Alderatu Hom/Free/Full, jackknife, falta diren egoerak eta ahaidetasun-geruzak; ebaluatu positibo faltsuak diseinuari egokitutako simulazioekin."
  },
  "每个模型实际纳入的独立样本": {
    "en": "Independent samples actually included in each model",
    "fr": "Échantillons indépendants inclus dans chaque modèle",
    "es": "Muestras independientes incluidas en cada modelo",
    "eu": "Eredu bakoitzean sartutako lagin independenteak"
  },
  "基因×模型×设计情景": {
    "en": "Gene × model × design scenario",
    "fr": "Gène × modèle × scénario expérimental",
    "es": "Gen × modelo × escenario de diseño",
    "eu": "Genea × eredua × diseinu-egoera"
  },
  "模型": {
    "en": "Model",
    "fr": "Modèle",
    "es": "Modelo",
    "eu": "Eredua"
  },
  "抽样方差不确定性": {
    "en": "Sampling-variance uncertainty",
    "fr": "Incertitude de la variance d’échantillonnage",
    "es": "Incertidumbre de la varianza de muestreo",
    "eu": "Laginketa-bariantzaren ziurgabetasuna"
  },
  "模拟误报与区间覆盖": {
    "en": "Simulated false positives and interval coverage",
    "fr": "Faux positifs simulés et couverture des intervalles",
    "es": "Falsos positivos simulados y cobertura de intervalos",
    "eu": "Positibo faltsu simulatuak eta tarteen estaldura"
  },
  "亲缘敏感性": {
    "en": "Relatedness sensitivity",
    "fr": "Sensibilité à la parenté",
    "es": "Sensibilidad al parentesco",
    "eu": "Ahaidetasunarekiko sentikortasuna"
  },
  "同培养跨状态程序耦合": {
    "en": "Cross-state program coupling within cultures",
    "fr": "Couplage des programmes entre états d’une culture",
    "es": "Acoplamiento de programas entre estados del cultivo",
    "eu": "Kultura barruko egoeren arteko programa-akoplamendua"
  },
  "在共享培养ID内估计不同状态的程序关联，保存程序成员、单细胞分数与状态间相关。": {
    "en": "Estimate cross-state associations within shared culture IDs; retain members, cell scores and between-state correlations.",
    "fr": "Estimer les associations entre états dans les mêmes cultures ; conserver membres, scores cellulaires et corrélations.",
    "es": "Estimar asociaciones entre estados en cultivos compartidos; conservar miembros, puntuaciones celulares y correlaciones.",
    "eu": "Estimatu egoeren arteko loturak kultura-ID partekatuetan; gorde kideak, zelula-puntuazioak eta korrelazioak."
  },
  "同时覆盖相应状态的独立培养": {
    "en": "Independent cultures covering the relevant states jointly",
    "fr": "Cultures indépendantes couvrant conjointement les états concernés",
    "es": "Cultivos independientes que cubren conjuntamente los estados",
    "eu": "Dagozkion egoerak batera estaltzen dituzten kultura independenteak"
  },
  "程序×状态对×培养集合": {
    "en": "Program × state pair × culture set",
    "fr": "Programme × paire d’états × ensemble de cultures",
    "es": "Programa × par de estados × conjunto de cultivos",
    "eu": "Programa × egoera-bikotea × kultura multzoa"
  },
  "程序基因": {
    "en": "Program genes",
    "fr": "Gènes du programme",
    "es": "Genes del programa",
    "eu": "Programaren geneak"
  },
  "状态对相关与混合模型结果": {
    "en": "State-pair correlation and mixed-model results",
    "fr": "Corrélations entre états et résultats des modèles mixtes",
    "es": "Correlaciones entre estados y resultados de modelos mixtos",
    "eu": "Egoera-bikoteen korrelazioa eta eredu mistoen emaitzak"
  },
  "共享培养数": {
    "en": "Shared-culture count",
    "fr": "Nombre de cultures communes",
    "es": "Número de cultivos compartidos",
    "eu": "Kultura partekatuen kopurua"
  },
  "跨状态程序留出稳定性": {
    "en": "Held-out stability of cross-state programs",
    "fr": "Stabilité des programmes interétats en validation",
    "es": "Estabilidad de programas entre estados en validación",
    "eu": "Egoeren arteko programen balidazio-egonkortasuna"
  },
  "按菌株与培养留出，比较程序基因、方向和分数预测；同一培养内细胞不跨训练与检验集合。": {
    "en": "Hold out strains and cultures; compare genes, directions and score predictions without splitting a culture across training and testing.",
    "fr": "Réserver souches et cultures ; comparer gènes, directions et scores sans répartir une culture entre entraînement et test.",
    "es": "Reservar cepas y cultivos; comparar genes, direcciones y puntuaciones sin dividir un cultivo entre entrenamiento y prueba.",
    "eu": "Gorde anduiak eta kulturak; alderatu geneak, norabideak eta puntuazioak kultura bera entrenamendu eta test artean banatu gabe."
  },
  "未用于建模的菌株或培养": {
    "en": "Strains or cultures withheld from fitting",
    "fr": "Souches ou cultures exclues de l’ajustement",
    "es": "Cepas o cultivos reservados del ajuste",
    "eu": "Doikuntzatik kanpo gordetako anduiak edo kulturak"
  },
  "程序×留出分区": {
    "en": "Program × held-out fold",
    "fr": "Programme × partition réservée",
    "es": "Programa × partición reservada",
    "eu": "Programa × gordetako partizioa"
  },
  "相关表达程序不等同于细胞间通讯。": {
    "en": "Correlated expression programs do not establish cell–cell communication.",
    "fr": "Des programmes corrélés ne démontrent pas une communication intercellulaire.",
    "es": "Programas correlacionados no demuestran comunicación intercelular.",
    "eu": "Programa korrelazionatuek ez dute zelulen arteko komunikazioa frogatzen."
  },
  "分组留出": {
    "en": "Grouped holdout",
    "fr": "Validation par groupes réservés",
    "es": "Validación con grupos reservados",
    "eu": "Taldeka gordetako balidazioa"
  },
  "程序成员保留": {
    "en": "Program-member retention",
    "fr": "Conservation des membres du programme",
    "es": "Conservación de miembros del programa",
    "eu": "Programako kideen mantentzea"
  },
  "留出分数一致性": {
    "en": "Held-out score agreement",
    "fr": "Concordance des scores en validation",
    "es": "Concordancia de puntuaciones en validación",
    "eu": "Balidazioko puntuazioen adostasuna"
  },
  "共同可比状态": {
    "en": "Shared comparable states",
    "fr": "États comparables communs",
    "es": "Estados comparables compartidos",
    "eu": "Egoera konparagarri partekatuak"
  },
  "速度模块的基因与状态支持": {
    "en": "Gene and state support for velocity modules",
    "fr": "Support génique et d’état des modules de vélocité",
    "es": "Soporte génico y de estado de módulos de velocidad",
    "eu": "Abiadura-moduluen gene- eta egoera-euskarria"
  },
  "记录模块成员的剪接支持、状态覆盖、模块大小以及不同模块数/先验下的稳定性。": {
    "en": "Record splice support, state coverage, module sizes and stability across module counts and priors.",
    "fr": "Consigner support d’épissage, couverture, tailles et stabilité selon le nombre de modules et les a priori.",
    "es": "Registrar soporte de empalme, cobertura, tamaños y estabilidad según número de módulos y priors.",
    "eu": "Erregistratu splicing-euskarria, estaldura, tamainak eta egonkortasuna modulu kopuruen eta aurretikoen arabera."
  },
  "实际通过剪接证据审计的基因与细胞": {
    "en": "Genes and cells passing the splice-evidence audit",
    "fr": "Gènes et cellules validés par l’audit d’épissage",
    "es": "Genes y células que superan la auditoría de empalme",
    "eu": "Splicing-ebidentziaren auditoria gainditzen duten geneak eta zelulak"
  },
  "模块×状态×拟合版本": {
    "en": "Module × state × fit version",
    "fr": "Module × état × version d’ajustement",
    "es": "Módulo × estado × versión de ajuste",
    "eu": "Modulua × egoera × doikuntza-bertsioa"
  },
  "模块ID": {
    "en": "Module ID",
    "fr": "Identifiant du module",
    "es": "ID de módulo",
    "eu": "Modulu-IDa"
  },
  "有剪接证据的基因": {
    "en": "Splice-supported genes",
    "fr": "Gènes étayés par l’épissage",
    "es": "Genes con soporte de empalme",
    "eu": "Splicing-euskarria duten geneak"
  },
  "状态覆盖": {
    "en": "State coverage",
    "fr": "Couverture des états",
    "es": "Cobertura de estados",
    "eu": "Egoera-estaldura"
  },
  "参数情景一致性": {
    "en": "Agreement across parameter scenarios",
    "fr": "Concordance entre scénarios de paramètres",
    "es": "Concordancia entre escenarios de parámetros",
    "eu": "Parametro-egoeren arteko adostasuna"
  },
  "模块化速度的后验不确定性": {
    "en": "Posterior uncertainty of modular velocities",
    "fr": "Incertitude postérieure des vélocités modulaires",
    "es": "Incertidumbre posterior de velocidades modulares",
    "eu": "Abiadura modularren atzeko ziurgabetasuna"
  },
  "保存速度均值、标准差、可用后验样本和方向一致性，比较周期先验及留出培养。": {
    "en": "Retain velocity means, standard deviations, available posterior samples and direction agreement; compare cycle priors and held-out cultures.",
    "fr": "Conserver moyennes, écarts-types, échantillons postérieurs et concordance directionnelle ; comparer a priori cycliques et cultures réservées.",
    "es": "Conservar medias, desviaciones, muestras posteriores y concordancia direccional; comparar priors cíclicos y cultivos reservados.",
    "eu": "Gorde abiadura-batezbestekoak, desbideratzeak, atzeko laginak eta norabide-adostasuna; alderatu ziklo-aurretikoak eta gordetako kulturak."
  },
  "进入动力学模型的细胞与基因": {
    "en": "Cells and genes included in the kinetic model",
    "fr": "Cellules et gènes inclus dans le modèle cinétique",
    "es": "Células y genes incluidos en el modelo cinético",
    "eu": "Eredu zinetikoan sartutako zelulak eta geneak"
  },
  "细胞×基因×模型": {
    "en": "Cell × gene × model",
    "fr": "Cellule × gène × modèle",
    "es": "Célula × gen × modelo",
    "eu": "Zelula × genea × eredua"
  },
  "速度期望": {
    "en": "Expected velocity",
    "fr": "Vélocité attendue",
    "es": "Velocidad esperada",
    "eu": "Espero den abiadura"
  },
  "速度标准差": {
    "en": "Velocity standard deviation",
    "fr": "Écart-type de vélocité",
    "es": "Desviación estándar de velocidad",
    "eu": "Abiaduraren desbideratze estandarra"
  },
  "可选完整后验": {
    "en": "Optional full posterior",
    "fr": "Distribution postérieure complète facultative",
    "es": "Distribución posterior completa opcional",
    "eu": "Aukerako atzeko banaketa osoa"
  },
  "参照方向一致性": {
    "en": "Agreement with reference direction",
    "fr": "Concordance avec la direction de référence",
    "es": "Concordancia con dirección de referencia",
    "eu": "Erreferentziazko norabidearekiko adostasuna"
  },
  "调控边的结合与功能证据分层": {
    "en": "Binding and functional evidence strata for regulatory edges",
    "fr": "Strates de preuves de liaison et de fonction des arêtes",
    "es": "Estratos de evidencia de unión y función de aristas",
    "eu": "Erregulazio-ertzen lotura- eta funtzio-ebidentzia geruzak"
  },
  "为每条TF—靶基因边分别保存结合证据、快速耗竭响应、符号、实验条件及来源；未知与未检测单独编码。": {
    "en": "For each TF–target edge, store binding, rapid-depletion response, sign, condition and source separately; distinguish unknown from unassayed.",
    "fr": "Pour chaque arête TF–cible, séparer liaison, réponse à déplétion rapide, signe, condition et source ; distinguer inconnu et non mesuré.",
    "es": "Para cada arista TF–diana, separar unión, respuesta a agotamiento rápido, signo, condición y fuente; distinguir desconocido de no medido.",
    "eu": "TF-helburu ertz bakoitzean gorde bereiz lotura, agortze azkarraren erantzuna, zeinua, baldintza eta iturria; bereizi ezezaguna eta neurtu gabea."
  },
  "完成ID映射且在该实验可检验的TF—基因对": {
    "en": "Mapped TF–gene pairs assayable in the experiment",
    "fr": "Paires TF–gène mappées et évaluables dans l’expérience",
    "es": "Pares TF–gen mapeados y evaluables en el experimento",
    "eu": "Esperimentuan mapatutako eta ebaluagarriak diren TF-gene bikoteak"
  },
  "TF×靶基因×证据×条件": {
    "en": "TF × target gene × evidence × condition",
    "fr": "TF × gène cible × preuve × condition",
    "es": "TF × gen diana × evidencia × condición",
    "eu": "TF × helburu-genea × ebidentzia × baldintza"
  },
  "结合证据": {
    "en": "Binding evidence",
    "fr": "Preuve de liaison",
    "es": "Evidencia de unión",
    "eu": "Lotura-ebidentzia"
  },
  "耗竭响应": {
    "en": "Depletion response",
    "fr": "Réponse à la déplétion",
    "es": "Respuesta al agotamiento",
    "eu": "Agortzearen erantzuna"
  },
  "条件内方向": {
    "en": "Direction within condition",
    "fr": "Direction dans la condition",
    "es": "Dirección en la condición",
    "eu": "Baldintza barruko norabidea"
  },
  "实验背景": {
    "en": "Experimental context",
    "fr": "Contexte expérimental",
    "es": "Contexto experimental",
    "eu": "Testuinguru esperimentala"
  },
  "来源": {
    "en": "Source",
    "fr": "Source",
    "es": "Fuente",
    "eu": "Iturria"
  },
  "调控先验证据消融": {
    "en": "Ablation of regulatory-prior evidence",
    "fr": "Ablation des preuves a priori de régulation",
    "es": "Ablación de evidencia previa de regulación",
    "eu": "Erregulazio-aurretiko ebidentziaren ablazioa"
  },
  "分别用结合、扰动响应、二者交集和无先验建模，在独立留出边或培养上比较网络及噪音候选。": {
    "en": "Fit with binding, response, intersection and no-prior networks; compare networks and variability candidates on independent edges or cultures.",
    "fr": "Ajuster avec liaison, réponse, intersection et sans a priori ; comparer sur des arêtes ou cultures indépendantes.",
    "es": "Ajustar con unión, respuesta, intersección y sin prior; comparar en aristas o cultivos independientes.",
    "eu": "Doitu lotura, erantzun, ebakidura eta aurretikorik gabeko sareekin; alderatu ertz edo kultura independenteetan."
  },
  "各方案共同可评价的边、基因及独立样本": {
    "en": "Edges, genes and independent samples evaluable in all comparisons",
    "fr": "Arêtes, gènes et échantillons indépendants évaluables dans toutes les comparaisons",
    "es": "Aristas, genes y muestras independientes evaluables en todas las comparaciones",
    "eu": "Alderaketa guztietan ebaluagarriak diren ertzak, geneak eta lagin independenteak"
  },
  "模型×先验层×留出集": {
    "en": "Model × prior layer × holdout set",
    "fr": "Modèle × couche a priori × ensemble réservé",
    "es": "Modelo × capa previa × conjunto reservado",
    "eu": "Eredua × aurretiko geruza × gordetako multzoa"
  },
  "不将参与训练的同一先验再当独立验证真值。": {
    "en": "Do not reuse training priors as independent validation truth.",
    "fr": "Ne pas réutiliser les a priori d’entraînement comme vérité indépendante.",
    "es": "No reutilizar priors de entrenamiento como verdad independiente de validación.",
    "eu": "Ez berrerabili entrenamendu-aurretikoak balidazio-egia independente gisa."
  },
  "先验证据层": {
    "en": "Prior-evidence layer",
    "fr": "Couche de preuve a priori",
    "es": "Capa de evidencia previa",
    "eu": "Aurretiko ebidentzia-geruza"
  },
  "未参与训练的验证边": {
    "en": "Validation edges excluded from training",
    "fr": "Arêtes de validation exclues de l’entraînement",
    "es": "Aristas de validación excluidas del entrenamiento",
    "eu": "Entrenamendutik kanpoko balidazio-ertzak"
  },
  "边恢复指标": {
    "en": "Edge-recovery metrics",
    "fr": "Indicateurs de récupération des arêtes",
    "es": "Indicadores de recuperación de aristas",
    "eu": "Ertzen berreskurapen-adierazleak"
  },
  "噪音候选稳健性": {
    "en": "Variability-candidate robustness",
    "fr": "Robustesse des candidats de variabilité",
    "es": "Robustez de candidatos de variabilidad",
    "eu": "Aldakortasun-hautagaien sendotasuna"
  },
  "计数eQTL的样本及offset一致性": {
    "en": "Sample and offset contract for count eQTLs",
    "fr": "Concordance échantillons–offsets pour les eQTL de comptages",
    "es": "Concordancia de muestras y offsets para eQTL de conteos",
    "eu": "Zenbaketa-eQTLen lagin eta offset kontratua"
  },
  "核对基因型、状态求和矩阵和协变量中的样本ID、倍性编码、计数整数性及筛基因前的offset。": {
    "en": "Reconcile sample IDs, ploidy coding, integer counts and prefilter offsets across genotypes, state pseudobulks and covariates.",
    "fr": "Réconcilier identifiants, ploïdie, comptages entiers et offsets préfiltrage entre génotypes, pseudobulks et covariables.",
    "es": "Conciliar ID, ploidía, conteos enteros y offsets previos al filtrado entre genotipos, pseudobulks y covariables.",
    "eu": "Bateratu lagin-IDak, ploidia-kodeketa, zenbaketa osoak eta aurreiragazki-offsetak genotipo, pseudobulk eta kobariableetan."
  },
  "参与同一状态扫描的菌株/独立样本": {
    "en": "Strains/independent samples included in one state scan",
    "fr": "Souches/échantillons indépendants inclus dans un scan d’état",
    "es": "Cepas/muestras independientes incluidas en un análisis de estado",
    "eu": "Egoera-eskaneatze berean sartutako anduiak/lagin independenteak"
  },
  "状态×输入版本": {
    "en": "State × input version",
    "fr": "État × version des entrées",
    "es": "Estado × versión de entrada",
    "eu": "Egoera × sarrera-bertsioa"
  },
  "ID重叠": {
    "en": "ID overlap",
    "fr": "Recouvrement des identifiants",
    "es": "Solapamiento de ID",
    "eu": "ID gainjartzea"
  },
  "倍性编码": {
    "en": "Ploidy coding",
    "fr": "Codage de la ploïdie",
    "es": "Codificación de ploidía",
    "eu": "Ploidia-kodeketa"
  },
  "offset来源": {
    "en": "Offset source",
    "fr": "Source des offsets",
    "es": "Origen del offset",
    "eu": "Offsetaren jatorria"
  },
  "计数完整性": {
    "en": "Count integrity",
    "fr": "Intégrité des comptages",
    "es": "Integridad de conteos",
    "eu": "Zenbaketen osotasuna"
  },
  "计数均值eQTL校准与亲缘敏感性": {
    "en": "Calibration and kinship sensitivity of count mean eQTLs",
    "fr": "Calibration et sensibilité à la parenté des eQTL de moyenne",
    "es": "Calibración y sensibilidad al parentesco de eQTL de media",
    "eu": "Batezbesteko-eQTLen kalibrazioa eta ahaidetasun-sentikortasuna"
  },
  "保存效应、标准误、基因级p值、跨基因FDR、拟合失败与亲缘混合模型对照。": {
    "en": "Retain effects, standard errors, gene-level p-values, across-gene FDR, failed fits and kinship-model comparisons.",
    "fr": "Conserver effets, erreurs standard, p par gène, FDR intergènes, échecs et comparaisons aux modèles de parenté.",
    "es": "Conservar efectos, errores estándar, p por gen, FDR entre genes, fallos y comparaciones con modelos de parentesco.",
    "eu": "Gorde efektuak, errore estandarrak, gene-mailako p balioak, FDRa, hutsegiteak eta ahaidetasun-ereduen alderaketak."
  },
  "可成功拟合且有变异支持的基因—状态": {
    "en": "Gene–state pairs with valid fits and variant support",
    "fr": "Paires gène–état avec ajustement valide et variants étayés",
    "es": "Pares gen–estado con ajustes válidos y soporte de variantes",
    "eu": "Doikuntza balioduna eta aldaera-euskarria duten gene-egoera bikoteak"
  },
  "基因×状态×模型": {
    "en": "Gene × state × model",
    "fr": "Gène × état × modèle",
    "es": "Gen × estado × modelo",
    "eu": "Genea × egoera × eredua"
  },
  "效应误差": {
    "en": "Effect uncertainty",
    "fr": "Incertitude de l’effet",
    "es": "Incertidumbre del efecto",
    "eu": "Efektuaren ziurgabetasuna"
  },
  "基因级p值": {
    "en": "Gene-level p-value",
    "fr": "Valeur p par gène",
    "es": "Valor p por gen",
    "eu": "Gene-mailako p balioa"
  },
  "跨基因FDR": {
    "en": "Across-gene FDR",
    "fr": "FDR intergènes",
    "es": "FDR entre genes",
    "eu": "Geneen arteko FDRa"
  },
  "失败原因": {
    "en": "Failure reason",
    "fr": "Motif d’échec",
    "es": "Causa del fallo",
    "eu": "Hutsegite-arrazoia"
  },
  "亲缘模型对照": {
    "en": "Kinship-model comparison",
    "fr": "Comparaison au modèle de parenté",
    "es": "Comparación con modelo de parentesco",
    "eu": "Ahaidetasun-ereduaren alderaketa"
  },
  "机制真值下的噪音恢复": {
    "en": "Noise recovery against mechanistic ground truth",
    "fr": "Récupération du bruit face à une vérité mécanistique",
    "es": "Recuperación del ruido frente a verdad mecanística",
    "eu": "Zarataren berreskurapena mekanismo-egiarekiko"
  },
  "在已知爆发、网络和降解参数的模拟中逐项改变捕获、背景、深度与状态组成，记录噪音效应偏差及区间覆盖。": {
    "en": "With known burst, network and degradation parameters, vary capture, background, depth and state mixture separately; record effect bias and interval coverage.",
    "fr": "Avec paramètres connus, varier séparément capture, fond, profondeur et mélange d’états ; consigner biais et couverture.",
    "es": "Con parámetros conocidos, variar captura, fondo, profundidad y mezcla de estados por separado; registrar sesgo y cobertura.",
    "eu": "Parametro ezagunekin, aldatu bereiz harrapaketa, hondoa, sakonera eta egoera-nahasketa; erregistratu alborapena eta estaldura."
  },
  "预先定义且保存真值的模拟情景": {
    "en": "Prespecified simulations with saved ground truth",
    "fr": "Simulations prédéfinies avec vérité conservée",
    "es": "Simulaciones predefinidas con verdad guardada",
    "eu": "Aurrez definitutako eta egia gordeta duten simulazioak"
  },
  "基因×参数情景×测量情景": {
    "en": "Gene × parameter scenario × measurement scenario",
    "fr": "Gène × scénario de paramètres × scénario de mesure",
    "es": "Gen × escenario de parámetros × escenario de medición",
    "eu": "Genea × parametro-egoera × neurketa-egoera"
  },
  "测量情景": {
    "en": "Measurement scenario",
    "fr": "Scénario de mesure",
    "es": "Escenario de medición",
    "eu": "Neurketa-egoera"
  },
  "估计偏差": {
    "en": "Estimation bias",
    "fr": "Biais d’estimation",
    "es": "Sesgo de estimación",
    "eu": "Estimazio-alborapena"
  },
  "区间覆盖": {
    "en": "Interval coverage",
    "fr": "Couverture des intervalles",
    "es": "Cobertura de intervalos",
    "eu": "Tarteen estaldura"
  },
  "机制模拟的网络恢复与伪边": {
    "en": "Network recovery and false edges under mechanistic simulation",
    "fr": "Récupération du réseau et fausses arêtes en simulation mécaniste",
    "es": "Recuperación de redes y aristas falsas en simulación mecanística",
    "eu": "Sareen berreskurapena eta ertz faltsuak mekanismo-simulazioan"
  },
  "以已知正负网络边评价推断，按稀疏度、状态混合、捕获和细胞数分层。": {
    "en": "Evaluate inferred positive/negative edges against truth, stratified by sparsity, state mixture, capture and cell number.",
    "fr": "Évaluer les arêtes positives/négatives selon sparsité, mélange d’états, capture et effectif cellulaire.",
    "es": "Evaluar aristas positivas/negativas según dispersión, mezcla de estados, captura y número de células.",
    "eu": "Ebaluatu ertz positibo/negatiboak egiaren aurka, urritasunaren, egoera-nahasketaren, harrapaketaren eta zelula kopuruaren arabera."
  },
  "模拟真值网络中可评价的有向基因对": {
    "en": "Evaluable directed gene pairs in the true simulated network",
    "fr": "Paires géniques orientées évaluables dans le réseau simulé vrai",
    "es": "Pares génicos dirigidos evaluables en la red simulada real",
    "eu": "Simulazioko benetako sarearen gene-bikote zuzendu ebaluagarriak"
  },
  "网络×模拟情景": {
    "en": "Network × simulation scenario",
    "fr": "Réseau × scénario de simulation",
    "es": "Red × escenario de simulación",
    "eu": "Sarea × simulazio-egoera"
  },
  "边精确率/召回率": {
    "en": "Edge precision/recall",
    "fr": "Précision/rappel des arêtes",
    "es": "Precisión/exhaustividad de aristas",
    "eu": "Ertzen doitasuna/berreskuratzea"
  },
  "符号恢复": {
    "en": "Sign recovery",
    "fr": "Récupération du signe",
    "es": "Recuperación del signo",
    "eu": "Zeinuaren berreskurapena"
  },
  "伪边": {
    "en": "False edges",
    "fr": "Fausses arêtes",
    "es": "Aristas falsas",
    "eu": "Ertz faltsuak"
  },
  "真值网络标识": {
    "en": "Ground-truth network ID",
    "fr": "Identifiant du réseau de référence",
    "es": "ID de red de referencia",
    "eu": "Erreferentziazko sarearen IDa"
  },
  "时间网络的留出分布再生成": {
    "en": "Held-out distribution regeneration by temporal networks",
    "fr": "Régénération des distributions réservées par les réseaux temporels",
    "es": "Regeneración de distribuciones reservadas por redes temporales",
    "eu": "Denbora-sareek gordetako banaketak birsortzea"
  },
  "按独立培养或时间点留出后，比较生成与观测RNA的均值、方差、尾部和多变量分布。": {
    "en": "Hold out independent cultures or times; compare generated and observed RNA means, variances, tails and multivariate distributions.",
    "fr": "Réserver cultures ou temps ; comparer moyennes, variances, queues et distributions multivariées générées et observées.",
    "es": "Reservar cultivos o tiempos; comparar medias, varianzas, colas y distribuciones multivariantes generadas y observadas.",
    "eu": "Gorde kultura edo denbora independenteak; alderatu sortutako eta behatutako RNAren batezbestekoak, bariantzak, isatsak eta banaketa multibarianteak."
  },
  "未参与训练且有真实时间记录的培养与时间点": {
    "en": "Cultures and true time points excluded from training",
    "fr": "Cultures et temps réels exclus de l’entraînement",
    "es": "Cultivos y tiempos reales excluidos del entrenamiento",
    "eu": "Entrenamendutik kanpoko kulturak eta benetako denbora-puntuak"
  },
  "时间点×培养×模型": {
    "en": "Time × culture × model",
    "fr": "Temps × culture × modèle",
    "es": "Tiempo × cultivo × modelo",
    "eu": "Denbora × kultura × eredua"
  },
  "留出时间": {
    "en": "Held-out time",
    "fr": "Temps réservé",
    "es": "Tiempo reservado",
    "eu": "Gordetako denbora"
  },
  "噪音恢复": {
    "en": "Noise recovery",
    "fr": "Récupération du bruit",
    "es": "Recuperación del ruido",
    "eu": "Zarataren berreskurapena"
  },
  "拟合收敛": {
    "en": "Fit convergence",
    "fr": "Convergence de l’ajustement",
    "es": "Convergencia del ajuste",
    "eu": "Doikuntzaren konbergentzia"
  },
  "酵母动力学先验敏感性": {
    "en": "Sensitivity to yeast kinetic priors",
    "fr": "Sensibilité aux a priori cinétiques de levure",
    "es": "Sensibilidad a priors cinéticos de levadura",
    "eu": "Legamiaren aurretiko zinetikoekiko sentikortasuna"
  },
  "逐基因保存RNA/蛋白降解先验的物种、来源、单位和范围，改变可支持的先验后重估网络与模拟干预。": {
    "en": "Record species, source, units and ranges for RNA/protein degradation priors; refit networks and interventions across supported priors.",
    "fr": "Consigner espèce, source, unités et plages des a priori de dégradation ; réajuster réseaux et interventions selon les a priori étayés.",
    "es": "Registrar especie, fuente, unidades y rangos de priors de degradación; reajustar redes e intervenciones con priors respaldados.",
    "eu": "Erregistratu degradazio-aurretikoen espeziea, iturria, unitateak eta tarteak; birdoitu sareak eta esku-hartzeak aurretiko sostengatuekin."
  },
  "有来源匹配的动力学参数与可辨识基因": {
    "en": "Source-matched kinetic parameters and identifiable genes",
    "fr": "Paramètres cinétiques sourcés et gènes identifiables",
    "es": "Parámetros cinéticos con fuente y genes identificables",
    "eu": "Iturri egokiko parametro zinetikoak eta gene identifikagarriak"
  },
  "基因×先验情景×模型": {
    "en": "Gene × prior scenario × model",
    "fr": "Gène × scénario a priori × modèle",
    "es": "Gen × escenario previo × modelo",
    "eu": "Genea × aurretiko egoera × eredua"
  },
  "先验文献": {
    "en": "Prior reference",
    "fr": "Référence de l’a priori",
    "es": "Referencia del prior",
    "eu": "Aurretikoaren erreferentzia"
  },
  "物种": {
    "en": "Species",
    "fr": "Espèce",
    "es": "Especie",
    "eu": "Espeziea"
  },
  "时间及速率单位": {
    "en": "Time and rate units",
    "fr": "Unités de temps et de vitesse",
    "es": "Unidades de tiempo y tasa",
    "eu": "Denboraren eta tasaren unitateak"
  },
  "支持范围": {
    "en": "Supported range",
    "fr": "Plage étayée",
    "es": "Rango respaldado",
    "eu": "Sostengatutako tartea"
  },
  "预测稳定性": {
    "en": "Prediction stability",
    "fr": "Stabilité des prédictions",
    "es": "Estabilidad de predicciones",
    "eu": "Iragarpenen egonkortasuna"
  },
  "跨状态样本间变异分解": {
    "en": "Cross-state between-sample variation",
    "fr": "Variation interéchantillon entre états",
    "es": "Variación entre muestras a través de estados",
    "eu": "Egoeren arteko laginen aldakortasuna"
  },
  "独立样本；菌株/培养层级需按设计明确": {
    "en": "Independent sample; specify strain/culture hierarchy from the design",
    "fr": "Échantillon indépendant ; préciser la hiérarchie souche/culture",
    "es": "Muestra independiente; especificar jerarquía cepa/cultivo",
    "eu": "Lagin independentea; zehaztu andui/kultura hierarkia diseinuaren arabera"
  },
  "状态内表达均值": {
    "en": "Within-state expression mean",
    "fr": "Moyenne d’expression dans l’état",
    "es": "Media de expresión dentro del estado",
    "eu": "Egoera barruko adierazpen-batezbestekoa"
  },
  "状态特异样本间协方差": {
    "en": "State-specific between-sample covariance",
    "fr": "Covariance interéchantillon spécifique aux états",
    "es": "Covarianza entre muestras específica de estados",
    "eu": "Egoera-espezifikoko laginen arteko kobariantza"
  },
  "有限细胞采样导致的均值误差": {
    "en": "Mean error from finite cell sampling",
    "fr": "Erreur de moyenne liée à un échantillonnage cellulaire fini",
    "es": "Error de la media por muestreo celular finito",
    "eu": "Zelula-laginketa finituaren batezbesteko-errorea"
  },
  "使用同一表达标度。": {
    "en": "Use the same expression scale.",
    "fr": "Utiliser la même échelle d’expression.",
    "es": "Usar la misma escala de expresión.",
    "eu": "Erabili adierazpen-eskala bera."
  },
  "状态均值的抽样方差有足够细胞支持。": {
    "en": "Sampling variance of state means requires sufficient cell support.",
    "fr": "La variance d’échantillonnage des moyennes nécessite un support cellulaire suffisant.",
    "es": "La varianza de muestreo de medias requiere suficiente soporte celular.",
    "eu": "Egoerako batezbestekoen laginketa-bariantzak zelula-euskarri nahikoa behar du."
  },
  "样本相关性需由设计或模型处理。": {
    "en": "Handle sample dependence in the design or model.",
    "fr": "Traiter la dépendance des échantillons dans le plan ou le modèle.",
    "es": "Tratar dependencia entre muestras en el diseño o modelo.",
    "eu": "Tratatu laginen mendekotasuna diseinuan edo ereduan."
  },
  "与同菌株内表达噪音分别量化跨菌株差异。": {
    "en": "Quantify between-strain differences separately from within-strain expression noise.",
    "fr": "Quantifier séparément différences intersouches et bruit intrasouche.",
    "es": "Cuantificar por separado diferencias entre cepas y ruido dentro de cepa.",
    "eu": "Kuantifikatu bereiz anduien arteko aldeak eta andui barruko zarata."
  },
  "与BAM参考匹配的Ty家族/位点BED；包括坐标、家族、方向和注释版本。": {
    "en": "Ty family/locus BED matching the BAM reference, with coordinates, family, strand and annotation version.",
    "fr": "BED Ty famille/locus correspondant au BAM, avec coordonnées, famille, brin et version.",
    "es": "BED Ty familia/locus correspondiente al BAM, con coordenadas, familia, hebra y versión.",
    "eu": "BAMarekin bat datorren Ty familia/locus BEDa, koordenatu, familia, kate eta bertsioarekin."
  },
  "酵母动力学速率先验": {
    "en": "Yeast kinetic-rate priors",
    "fr": "A priori de vitesses cinétiques de levure",
    "es": "Priors de tasas cinéticas de levadura",
    "eu": "Legamiaren tasa zinetikoen aurretikoak"
  },
  "带物种、条件、单位与不确定性的RNA/蛋白降解等动力学先验；不由普通快照自动恢复。": {
    "en": "RNA/protein kinetic priors with species, conditions, units and uncertainty; ordinary snapshots do not recover them automatically.",
    "fr": "A priori cinétiques ARN/protéine avec espèce, conditions, unités et incertitude ; non récupérés automatiquement d’un instantané.",
    "es": "Priors cinéticos ARN/proteína con especie, condiciones, unidades e incertidumbre; no se recuperan automáticamente de instantáneas.",
    "eu": "RNA/proteinen aurretiko zinetikoak espezie, baldintza, unitate eta ziurgabetasunarekin; argazki arruntek ez dituzte automatikoki berreskuratzen."
  },
  "重复元件RNA计数": {
    "en": "Repeat-RNA quantification",
    "fr": "Quantification des ARN de répétitions",
    "es": "Cuantificación de ARN de repeticiones",
    "eu": "Errepikapen-RNAren kuantifikazioa"
  },
  "保留比对证据、分子等价类与独立重复元件矩阵。": {
    "en": "Preserve alignment evidence, molecular equivalence classes and a separate repeat matrix.",
    "fr": "Conserver preuves d’alignement, classes moléculaires et matrice séparée de répétitions.",
    "es": "Conservar evidencia de alineamiento, clases moleculares y matriz separada de repeticiones.",
    "eu": "Gorde lerrokatze-ebidentzia, klase molekularrak eta errepikapen-matrize bereizia."
  },
  "机制模拟与时间网络": {
    "en": "Mechanistic simulation and temporal networks",
    "fr": "Simulation mécaniste et réseaux temporels",
    "es": "Simulación mecanística y redes temporales",
    "eu": "Mekanismo-simulazioa eta denbora-sareak"
  },
  "Harissa提供已知机制模拟，CardamomOT接入时间与动力学先验，scDesign3提供经验分布参照。": {
    "en": "Harissa provides known-mechanism simulations, CardamomOT uses time and kinetic priors, and scDesign3 supplies empirical-distribution comparators.",
    "fr": "Harissa simule des mécanismes connus, CardamomOT utilise temps et a priori cinétiques, scDesign3 fournit des comparateurs empiriques.",
    "es": "Harissa simula mecanismos conocidos, CardamomOT usa tiempos y priors cinéticos, y scDesign3 aporta comparadores empíricos.",
    "eu": "Harissak mekanismo ezagunak simulatzen ditu, CardamomOTk denbora eta aurretiko zinetikoak erabiltzen ditu, eta scDesign3k konparatzaile enpirikoak eskaintzen ditu."
  },
  "重复元件矩阵使用独立assay；保留原始BAM、多重比对与UR，记录EM分配是否为分数。": {
    "en": "Keep repeats in a separate assay; preserve original BAM, multimapping and UR, and document fractional EM assignments.",
    "fr": "Séparer l’assay de répétitions ; conserver BAM original, alignements multiples et UR, et préciser les affectations fractionnaires EM.",
    "es": "Separar el ensayo de repeticiones; conservar BAM original, alineamientos múltiples y UR, e indicar asignaciones EM fraccionarias.",
    "eu": "Bereizi errepikapenen assaya; gorde jatorrizko BAMa, lerrokatze anitzak eta UR, eta dokumentatu EM esleipen zatikizkoak."
  },
  "跨样本均值方差、同样本细胞间噪音和遗传方差使用不同名称与统计单位。": {
    "en": "Use distinct names and statistical units for between-sample mean variance, within-sample cell noise and genetic variance.",
    "fr": "Distinguer noms et unités pour variance interéchantillon des moyennes, bruit cellulaire intraéchantillon et variance génétique.",
    "es": "Distinguir nombres y unidades para varianza de medias entre muestras, ruido celular intramuestra y varianza genética.",
    "eu": "Erabili izen eta unitate bereiziak laginen batezbestekoen bariantzarako, lagin barruko zelula-zaratarako eta bariantza genetikorako."
  },
  "时间机制模型需要真实采样时间与酵母动力学先验；固定快照仅启用机制模拟。": {
    "en": "Temporal mechanistic models require real sampling times and yeast kinetic priors; static snapshots enable simulation only.",
    "fr": "Les modèles mécanistes temporels exigent temps réels et a priori de levure ; les instantanés statiques permettent seulement la simulation.",
    "es": "Los modelos mecanísticos temporales requieren tiempos reales y priors de levadura; las instantáneas estáticas solo habilitan simulación.",
    "eu": "Denborazko mekanismo-ereduek benetako denborak eta legamia-aurretikoak behar dituzte; argazki estatikoek simulazioa soilik ahalbidetzen dute."
  },
  "结合、扰动响应和表达共变分别标记；调控符号属于TF—靶基因边及实验情境。": {
    "en": "Label binding, perturbation response and coexpression separately; signs belong to TF–target edges and experimental contexts.",
    "fr": "Étiqueter séparément liaison, réponse et coexpression ; les signes appartiennent aux arêtes TF–cible et aux contextes.",
    "es": "Etiquetar unión, respuesta y coexpresión por separado; los signos pertenecen a aristas TF–diana y contextos.",
    "eu": "Etiketatu bereiz lotura, perturbazio-erantzuna eta koespresioa; zeinuak TF-helburu ertzen eta testuinguruenak dira."
  },
  "Ty重复元件RNA与表达变异": {
    "en": "Ty repeat RNA and expression variability",
    "fr": "ARN des répétitions Ty et variabilité d’expression",
    "es": "ARN de repeticiones Ty y variabilidad de expresión",
    "eu": "Ty errepikapenen RNA eta adierazpen-aldakortasuna"
  },
  "Ty家族RNA的细胞间差异是否随菌株、周期和应激状态变化？": {
    "en": "Does cell-to-cell variation in Ty family RNA change with strain, cell cycle and stress state?",
    "fr": "La variation intercellulaire des ARN de familles Ty dépend-elle de la souche, du cycle et du stress ?",
    "es": "¿La variación celular del ARN de familias Ty cambia con la cepa, el ciclo y el estrés?",
    "eu": "Ty familien RNAren zelulen arteko aldakortasuna anduiaren, zikloaren eta estresaren arabera aldatzen al da?"
  },
  "从保留多重比对的BAM建立独立Ty家族层，再比较可归属分子的状态内分布与分配敏感性。": {
    "en": "Build a separate Ty family assay from BAM retaining multimapping, then compare within-state distributions and assignment sensitivity.",
    "fr": "Construire un assay de familles Ty à partir du BAM conservant les alignements multiples, puis comparer distributions intra-état et sensibilité aux affectations.",
    "es": "Crear un ensayo separado de familias Ty desde BAM que conserve alineamientos múltiples y comparar distribuciones intraestado y sensibilidad a las asignaciones.",
    "eu": "Sortu Ty familien assay bereizia lerrokatze anitzak gordetzen dituen BAMetik; alderatu egoera barruko banaketak eta esleipenen sentikortasuna."
  },
  "核对参考、重复注释和BAM多重比对保留策略。": {
    "en": "Check the reference, repeat annotation and BAM multimapping retention policy.",
    "fr": "Vérifier référence, annotation des répétitions et conservation des alignements multiples.",
    "es": "Revisar referencia, anotación de repeticiones y conservación de alineamientos múltiples.",
    "eu": "Egiaztatu erreferentzia, errepikapenen anotazioa eta BAMeko lerrokatze anitzak gordetzeko politika."
  },
  "将唯一证据、歧义分配与背景影响分开输出。": {
    "en": "Report unique evidence, ambiguous assignments and background effects separately.",
    "fr": "Présenter séparément preuves uniques, affectations ambiguës et effets du fond.",
    "es": "Presentar por separado evidencia única, asignaciones ambiguas y efectos del fondo.",
    "eu": "Eman bereiz ebidentzia bakarra, esleipen anbiguoak eta hondoko eraginak."
  },
  "用培养分组重抽样检查候选稳定性。": {
    "en": "Assess candidate stability by resampling entire cultures.",
    "fr": "Évaluer la stabilité des candidats par rééchantillonnage de cultures entières.",
    "es": "Evaluar estabilidad de candidatos remuestreando cultivos completos.",
    "eu": "Ebaluatu hautagaien egonkortasuna kultura osoak birlaginduz."
  },
  "独立培养用于组间推断；分子等价类用于计数审计。": {
    "en": "Independent cultures support group inference; molecular equivalence classes support count auditing.",
    "fr": "Les cultures indépendantes fondent l’inférence entre groupes ; les classes d’équivalence moléculaire servent à auditer les comptages.",
    "es": "Los cultivos independientes sustentan la inferencia entre grupos; las clases de equivalencia molecular permiten auditar recuentos.",
    "eu": "Kultura independenteek taldeen arteko inferentzia sostengatzen dute; molekula-baliokidetasun klaseek zenbaketen auditoria ahalbidetzen dute."
  },
  "输出Ty RNA表达异质性；转座活动、插入位置和DNA拷贝数另需相应证据。": {
    "en": "Report Ty RNA heterogeneity; transposition, insertion sites and DNA copy number require separate evidence.",
    "fr": "Rapporter l’hétérogénéité des ARN Ty ; transposition, sites d’insertion et nombre de copies d’ADN exigent des preuves distinctes.",
    "es": "Informar heterogeneidad del ARN Ty; transposición, inserciones y copias de ADN requieren evidencia específica.",
    "eu": "Eman Ty RNAren heterogeneotasuna; transposizioak, txertaketa-guneek eta DNA kopia-kopuruak ebidentzia bereizia behar dute."
  },
  "菌株间变异的状态共享与特异部分": {
    "en": "Shared and state-specific components of between-strain variation",
    "fr": "Composantes partagées et spécifiques aux états de la variation entre souches",
    "es": "Componentes compartidos y específicos de estado de la variación entre cepas",
    "eu": "Anduien arteko aldakortasunaren osagai partekatuak eta egoera-espezifikoak"
  },
  "哪些基因的菌株间差异仅在某些细胞状态显现？": {
    "en": "Which genes show between-strain differences only in particular cell states?",
    "fr": "Quels gènes présentent des différences entre souches dans certains états seulement ?",
    "es": "¿Qué genes muestran diferencias entre cepas solo en determinados estados celulares?",
    "eu": "Zein genek erakusten dituzte anduien arteko aldeak zelula-egoera jakinetan soilik?"
  },
  "建立菌株/培养×状态表达均值及抽样方差，分解共享和状态特异的样本间变异。": {
    "en": "Estimate strain/culture-by-state expression means and sampling variances, then separate shared and state-specific between-sample variation.",
    "fr": "Estimer moyennes et variances d’échantillonnage par souche/culture et état, puis séparer les variations interéchantillon partagées et spécifiques.",
    "es": "Estimar medias y varianzas de muestreo por cepa/cultivo y estado; separar variación entre muestras compartida y específica.",
    "eu": "Estimatu andui/kultura eta egoera bakoitzeko batezbestekoak eta laginketa-bariantzak; bereizi laginen arteko osagai partekatuak eta espezifikoak."
  },
  "冻结状态定义并检查每个样本的共同支持。": {
    "en": "Freeze state definitions and assess shared state support across samples.",
    "fr": "Fixer les définitions d’état et évaluer leur support commun entre échantillons.",
    "es": "Fijar definiciones de estado y evaluar su soporte común entre muestras.",
    "eu": "Finkatu egoeren definizioak eta ebaluatu laginen arteko egoera-euskarri komuna."
  },
  "比较缺失状态处理、亲缘分层与方差模型。": {
    "en": "Compare missing-state handling, kinship stratification and variance models.",
    "fr": "Comparer traitement des états manquants, stratification de parenté et modèles de variance.",
    "es": "Comparar tratamiento de estados ausentes, estratificación por parentesco y modelos de varianza.",
    "eu": "Alderatu falta diren egoeren tratamendua, ahaidetasun-estratifikazioa eta bariantza-ereduak."
  },
  "样本/菌株是独立推断单位，细胞用于估计均值及抽样误差。": {
    "en": "Samples or strains are inference units; cells estimate means and sampling error.",
    "fr": "Échantillons ou souches sont les unités d’inférence ; les cellules estiment moyennes et erreur d’échantillonnage.",
    "es": "Muestras o cepas son unidades de inferencia; las células estiman medias y error de muestreo.",
    "eu": "Laginak edo anduiak dira inferentzia-unitateak; zelulek batezbestekoak eta laginketa-errorea estimatzen dituzte."
  },
  "结果属于菌株间均值方差；与同菌株内噪音和基因型解释的遗传力分别报告。": {
    "en": "Report between-strain variance of means separately from within-strain noise and genotype-explained heritability.",
    "fr": "Rapporter séparément variance des moyennes entre souches, bruit intrasouche et héritabilité expliquée par les génotypes.",
    "es": "Separar varianza de medias entre cepas, ruido intracepa y heredabilidad explicada por genotipos.",
    "eu": "Bereiz eman anduien batezbestekoen bariantza, andui barruko zarata eta genotipoek azaldutako heredagarritasuna."
  },
  "同培养中的跨状态协调程序": {
    "en": "Coordinated programs across states within cultures",
    "fr": "Programmes coordonnés entre états d’une même culture",
    "es": "Programas coordinados entre estados del mismo cultivo",
    "eu": "Kultura barruko egoeren arteko programa koordinatuak"
  },
  "同一培养中的G1、复制、分裂或应激状态是否共享菌株相关的表达程序？": {
    "en": "Do G1, replication, division or stress states within a culture share strain-associated expression programs?",
    "fr": "Les états G1, réplication, division ou stress d’une culture partagent-ils des programmes associés à la souche ?",
    "es": "¿Los estados G1, replicación, división o estrés de un cultivo comparten programas asociados a la cepa?",
    "eu": "Kultura bateko G1, erreplikazio, zatiketa edo estres egoerek anduiarekin lotutako programak partekatzen al dituzte?"
  },
  "以独立培养为共同索引，将不同状态的程序耦合起来，检验是否在留出菌株中保留。": {
    "en": "Link programs across states using independent cultures as the shared index, then test transfer to held-out strains.",
    "fr": "Relier les programmes entre états par l’index commun des cultures indépendantes, puis tester sur des souches réservées.",
    "es": "Vincular programas entre estados mediante cultivos independientes como índice común y probar en cepas reservadas.",
    "eu": "Lotu egoeren programak kultura independenteen indize komunaren bidez; probatu erreserbatutako anduietan."
  },
  "仅配对同一培养实际观测到的状态。": {
    "en": "Pair only states actually observed in the same culture.",
    "fr": "Apparier uniquement les états observés dans une même culture.",
    "es": "Emparejar solo estados observados en el mismo cultivo.",
    "eu": "Parekatu kultura berean benetan behatutako egoerak soilik."
  },
  "按菌株/培养留出并比较固定基因集的程序分数。": {
    "en": "Hold out strains or cultures and compare program scores using fixed gene sets.",
    "fr": "Réserver des souches ou cultures et comparer les scores avec des ensembles de gènes fixes.",
    "es": "Reservar cepas o cultivos y comparar puntuaciones con conjuntos de genes fijos.",
    "eu": "Erreserbatu anduiak edo kulturak eta alderatu programen puntuazioak gene-multzo finkoekin."
  },
  "培养级配对，按菌株留出；不将不同状态的细胞一一配对。": {
    "en": "Pair at culture level and hold out by strain; do not pair individual cells across states.",
    "fr": "Apparier au niveau culture, réserver par souche ; ne pas apparier les cellules individuellement entre états.",
    "es": "Emparejar por cultivo y reservar por cepa; no emparejar células individuales entre estados.",
    "eu": "Parekatu kultura mailan eta erreserbatu anduika; ez parekatu banakako zelulak egoeren artean."
  },
  "跨状态协调是观察性表达关联，不能单独证明细胞间通讯。": {
    "en": "Cross-state coordination is an observational association and does not establish cell–cell communication.",
    "fr": "La coordination entre états est une association observationnelle, sans preuve directe de communication cellulaire.",
    "es": "La coordinación entre estados es una asociación observacional y no demuestra comunicación celular.",
    "eu": "Egoeren arteko koordinazioa behaketa-elkartea da, eta ez du zelulen arteko komunikazioa frogatzen."
  },
  "模块化RNA动力学与噪音联系": {
    "en": "RNA kinetic modules and expression noise",
    "fr": "Modules cinétiques d’ARN et bruit d’expression",
    "es": "Módulos cinéticos de ARN y ruido de expresión",
    "eu": "RNAren modulu zinetikoak eta adierazpen-zarata"
  },
  "具有足够剪接证据的基因是否形成稳定动力学模块，模块变化是否伴随表达噪音变化？": {
    "en": "Do genes with sufficient splicing evidence form stable kinetic modules whose changes accompany altered noise?",
    "fr": "Les gènes suffisamment couverts en épissage forment-ils des modules cinétiques stables associés aux variations du bruit ?",
    "es": "¿Los genes con evidencia suficiente de empalme forman módulos cinéticos estables cuyos cambios acompañan cambios de ruido?",
    "eu": "Splicing-ebidentzia nahikoa duten geneek zarata-aldaketekin lotutako modulu zinetiko egonkorrak osatzen al dituzte?"
  },
  "在剪接支持充分的基因子集上建立模块化速度模型，比较后验不确定性和周期方向。": {
    "en": "Fit modular velocity models on splice-supported genes and compare posterior uncertainty and cycle direction.",
    "fr": "Ajuster des modèles modulaires de vitesse aux gènes soutenus par l’épissage et comparer incertitude a posteriori et direction du cycle.",
    "es": "Ajustar modelos modulares de velocidad en genes respaldados por empalme y comparar incertidumbre posterior y dirección del ciclo.",
    "eu": "Doitu abiadura-eredu modularrak splicing-euskarria duten geneetan; alderatu posteriorreko ziurgabetasuna eta zikloaren norabidea."
  },
  "审计内含子基因的覆盖及功能组成。": {
    "en": "Audit coverage and functional composition of intron-containing genes.",
    "fr": "Auditer couverture et composition fonctionnelle des gènes avec introns.",
    "es": "Auditar cobertura y composición funcional de genes con intrones.",
    "eu": "Ikuskatu introiak dituzten geneen estaldura eta osaera funtzionala."
  },
  "比较模块数、先验、周期模型和留出培养。": {
    "en": "Compare module numbers, priors, cyclic models and held-out cultures.",
    "fr": "Comparer nombres de modules, a priori, modèles cycliques et cultures réservées.",
    "es": "Comparar número de módulos, priors, modelos cíclicos y cultivos reservados.",
    "eu": "Alderatu modulu-kopuruak, aurretikoak, ziklo-ereduak eta erreserbatutako kulturak."
  },
  "培养及菌株用于重复验证；细胞提供状态和剪接计数。": {
    "en": "Cultures and strains support replication; cells provide state and splicing counts.",
    "fr": "Cultures et souches assurent la réplication ; les cellules fournissent états et comptages d’épissage.",
    "es": "Cultivos y cepas permiten replicación; las células aportan estados y recuentos de empalme.",
    "eu": "Kulturek eta anduiek erreplikazioa sostengatzen dute; zelulek egoerak eta splicing-zenbaketak ematen dituzte."
  },
  "模块仅代表被测剪接信息支持的动态；潜在时间不作为进化时间。": {
    "en": "Modules describe dynamics supported by measured splicing; latent time is not evolutionary time.",
    "fr": "Les modules décrivent la dynamique soutenue par l’épissage mesuré ; le temps latent n’est pas un temps évolutif.",
    "es": "Los módulos representan dinámica respaldada por empalme medido; el tiempo latente no es tiempo evolutivo.",
    "eu": "Moduluek neurtutako splicing-ak sostengatutako dinamika deskribatzen dute; denbora latentea ez da denbora ebolutiboa."
  },
  "结合、扰动与表达共变的调控证据分层": {
    "en": "Regulatory evidence from binding, perturbation and coexpression",
    "fr": "Preuves de régulation : liaison, perturbation et coexpression",
    "es": "Evidencia reguladora: unión, perturbación y coexpresión",
    "eu": "Erregulazio-ebidentzia: lotura, perturbazioa eta koespresioa"
  },
  "噪音相关网络边由TF结合、耗竭响应还是表达共变支持？": {
    "en": "Are noise-associated network edges supported by TF binding, depletion responses or coexpression?",
    "fr": "Les arêtes associées au bruit sont-elles soutenues par liaison des TF, réponse à leur déplétion ou coexpression ?",
    "es": "¿Las aristas asociadas al ruido se respaldan por unión de TF, respuesta a depleción o coexpresión?",
    "eu": "Zaratarekin lotutako ertzak TF loturak, deplezio-erantzunak edo koespresioak sostengatzen al dituzte?"
  },
  "接入酵母TF结合与快速耗竭数据，分别构建带条件和方向的先验层，比较网络及噪音候选。": {
    "en": "Use yeast TF binding and rapid-depletion data to build condition-specific signed prior layers, then compare networks and noise candidates.",
    "fr": "Utiliser liaison des TF et déplétion rapide chez la levure pour construire des a priori signés par condition, puis comparer réseaux et candidats du bruit.",
    "es": "Usar unión de TF y depleción rápida en levadura para construir priors con signo por condición y comparar redes y candidatos de ruido.",
    "eu": "Erabili legamiaren TF lotura eta deplezio azkarreko datuak baldintzako zeinudun aurretikoak eraikitzeko; alderatu sareak eta zarata-hautagaiak."
  },
  "映射到当前酵母系统基因ID并记录未测基因。": {
    "en": "Map to current yeast systematic gene IDs and record unmeasured genes.",
    "fr": "Mapper vers les identifiants systématiques actuels de levure et noter les gènes non mesurés.",
    "es": "Mapear a identificadores sistemáticos actuales de levadura y registrar genes no medidos.",
    "eu": "Mapatu egungo legamia-geneen ID sistematikoetara eta erregistratu neurtu gabeko geneak."
  },
  "比较结合、响应、交集及无先验模型。": {
    "en": "Compare binding, response, intersection and no-prior models.",
    "fr": "Comparer modèles avec liaison, réponse, intersection et sans a priori.",
    "es": "Comparar modelos con unión, respuesta, intersección y sin prior.",
    "eu": "Alderatu lotura, erantzun, ebakidura eta aurretikorik gabeko ereduak."
  },
  "验证边与训练先验分开。": {
    "en": "Keep validation edges separate from training priors.",
    "fr": "Séparer les arêtes de validation des a priori d’entraînement.",
    "es": "Separar aristas de validación y priors de entrenamiento.",
    "eu": "Bereizi baliozkotze-ertzak eta entrenamenduko aurretikoak."
  },
  "TF—靶基因边保留实验条件；泛化按培养/菌株或独立证据留出。": {
    "en": "Retain conditions on TF–target edges; assess transfer using held-out cultures, strains or independent evidence.",
    "fr": "Conserver les conditions des arêtes TF–cible ; tester le transfert avec cultures, souches ou preuves indépendantes réservées.",
    "es": "Conservar condiciones de aristas TF–diana; probar transferencia con cultivos, cepas o evidencia independiente reservados.",
    "eu": "Gorde TF-helburu ertzen baldintzak; ebaluatu transferentzia erreserbatutako kultura, andui edo ebidentzia independenteekin."
  },
  "TF的激活/抑制方向标注在具体边和情境上；单一结合位点不等于功能调控。": {
    "en": "Assign activation or repression to specific edges and contexts; a binding site alone does not establish functional regulation.",
    "fr": "Attribuer activation ou répression aux arêtes et contextes précis ; un site de liaison seul ne prouve pas une régulation fonctionnelle.",
    "es": "Asignar activación o represión a aristas y contextos concretos; un sitio de unión no demuestra regulación funcional.",
    "eu": "Esleitu aktibazioa edo errepresioa ertz eta testuinguru jakinei; lotura-gune batek bakarrik ez du erregulazio funtzionala frogatzen."
  },
  "附录：计数均值eQTL与噪音QTL对照": {
    "en": "Appendix: count mean-eQTL versus noise-QTL",
    "fr": "Annexe : eQTL de moyenne des comptages et QTL du bruit",
    "es": "Apéndice: eQTL de medias de recuentos frente a QTL de ruido",
    "eu": "Eranskina: zenbaketen batezbesteko eQTLak eta zarata-QTLak"
  },
  "噪音候选是否可以由均值遗传效应及计数抽样解释？": {
    "en": "Can genetic effects on the mean and count sampling explain candidate noise effects?",
    "fr": "Les effets génétiques sur la moyenne et l’échantillonnage expliquent-ils les effets candidats sur le bruit ?",
    "es": "¿Los efectos genéticos sobre la media y el muestreo explican los efectos candidatos de ruido?",
    "eu": "Batezbestekoaren efektu genetikoek eta zenbaketen laginketak azaltzen al dituzte zarata-hautagaien efektuak?"
  },
  "接入匹配基因型后，以状态内求和计数估计均值eQTL，并与亲缘模型和噪音性状分析并列比较。": {
    "en": "With matched genotypes, estimate mean-eQTL from within-state sum counts and compare kinship models and noise traits.",
    "fr": "Avec génotypes appariés, estimer les eQTL de moyenne à partir des sommes intra-état, puis comparer modèles de parenté et caractères de bruit.",
    "es": "Con genotipos emparejados, estimar eQTL de medias mediante sumas intraestado y comparar modelos de parentesco y rasgos de ruido.",
    "eu": "Genotipo parekatuekin, estimatu batezbesteko eQTLak egoera barruko zenbaketa-baturetatik; alderatu ahaidetasun-ereduak eta zarata-ezaugarriak."
  },
  "核对倍性、样本ID、offset及酵母cis窗口。": {
    "en": "Check ploidy, sample IDs, offsets and yeast cis windows.",
    "fr": "Vérifier ploïdie, identifiants, offsets et fenêtres cis de levure.",
    "es": "Revisar ploidía, identificadores, offsets y ventanas cis de levadura.",
    "eu": "Egiaztatu ploidia, lagin-IDak, offsetak eta legamiaren cis leihoak."
  },
  "检验群体结构残留与亲缘混合模型一致性。": {
    "en": "Assess residual population structure and agreement with kinship mixed models.",
    "fr": "Évaluer structure de population résiduelle et concordance avec les modèles mixtes de parenté.",
    "es": "Evaluar estructura poblacional residual y concordancia con modelos mixtos de parentesco.",
    "eu": "Ebaluatu hondar-populazio egitura eta ahaidetasun-eredu mistoekiko adostasuna."
  },
  "基因型对应的菌株/样本；同一菌株细胞不作为独立基因型重复。": {
    "en": "Genotyped strains or samples are units; cells within a strain are not independent genotype replicates.",
    "fr": "Les unités sont les souches ou échantillons génotypés ; leurs cellules ne sont pas des répétitions génotypiques indépendantes.",
    "es": "Las unidades son cepas o muestras genotipadas; sus células no son réplicas genotípicas independientes.",
    "eu": "Genotipatutako anduiak edo laginak dira unitateak; andui barruko zelulak ez dira genotipo-erreplika independenteak."
  },
  "jaxQTL的均值关联与NB离散参数不能替代差异噪音或噪音QTL检验。": {
    "en": "jaxQTL mean associations and NB dispersion cannot replace differential-noise or noise-QTL tests.",
    "fr": "Les associations de moyenne et la dispersion NB de jaxQTL ne remplacent pas les tests de bruit différentiel ou de QTL du bruit.",
    "es": "Las asociaciones de media y dispersión NB de jaxQTL no sustituyen pruebas de ruido diferencial ni QTL de ruido.",
    "eu": "jaxQTLren batezbesteko-elkarteek eta NB dispertsioak ez dituzte zarata diferentzialaren edo zarata-QTLen probak ordezkatzen."
  },
  "爆发与网络机制的合成真值实验": {
    "en": "Synthetic ground truth for bursts and network mechanisms",
    "fr": "Vérité simulée pour les bouffées et mécanismes de réseau",
    "es": "Verdad sintética para ráfagas y mecanismos de red",
    "eu": "Leherketen eta sare-mekanismoen egia sintetikoa"
  },
  "现有噪音和网络方法能否恢复已知机制产生的变化？": {
    "en": "Can current noise and network methods recover changes generated by known mechanisms?",
    "fr": "Les méthodes de bruit et de réseau retrouvent-elles les changements produits par des mécanismes connus ?",
    "es": "¿Los métodos de ruido y redes recuperan cambios generados por mecanismos conocidos?",
    "eu": "Egungo zarata- eta sare-metodoek mekanismo ezagunek sortutako aldaketak berreskuratzen al dituzte?"
  },
  "构造已知调控网络与爆发参数的模拟真值，再加入捕获与背景层，比较噪音效应、区间和伪边。": {
    "en": "Simulate known networks and burst parameters, add capture and background, then compare noise effects, intervals and false edges.",
    "fr": "Simuler réseaux et paramètres de bouffées connus, ajouter capture et fond, puis comparer effets de bruit, intervalles et fausses arêtes.",
    "es": "Simular redes y ráfagas conocidas, añadir captura y fondo, y comparar efectos de ruido, intervalos y aristas falsas.",
    "eu": "Simulatu sare eta leherketa-parametro ezagunak, gehitu harrapaketa eta hondoa, eta alderatu zarata-efektuak, tarteak eta ertz faltsuak."
  },
  "分别控制均值改变、爆发改变、状态混合与技术捕获。": {
    "en": "Control changes in mean, bursting, state mixture and technical capture separately.",
    "fr": "Contrôler séparément moyenne, bouffées, mélange d’états et capture technique.",
    "es": "Controlar por separado media, ráfagas, mezcla de estados y captura técnica.",
    "eu": "Kontrolatu bereiz batezbestekoaren, leherketen, egoera-nahasketaren eta harrapaketa teknikoaren aldaketak."
  },
  "使用未参与调参的网络及观测情景评价。": {
    "en": "Evaluate on networks and observation scenarios excluded from tuning.",
    "fr": "Évaluer sur des réseaux et scénarios d’observation exclus du réglage.",
    "es": "Evaluar con redes y escenarios de observación excluidos del ajuste.",
    "eu": "Ebaluatu doikuntzan erabili gabeko sareetan eta behaketa-eszenatokietan."
  },
  "独立模拟情景和随机种子；机制真值及测量真值分别保存。": {
    "en": "Use independent simulation scenarios and seeds; store mechanistic and measurement truth separately.",
    "fr": "Utiliser scénarios et graines indépendants ; conserver séparément vérités mécaniste et de mesure.",
    "es": "Usar escenarios y semillas independientes; guardar por separado verdades mecanística y de medición.",
    "eu": "Erabili simulazio-eszenatoki eta hazi independenteak; gorde bereiz mekanismoaren eta neurketaren egiak."
  },
  "该分支校准分析方法，不将模拟网络或潜在蛋白量当作实验发现。": {
    "en": "This branch calibrates methods; simulated networks and latent proteins are not experimental findings.",
    "fr": "Cette branche calibre les méthodes ; réseaux simulés et protéines latentes ne sont pas des résultats expérimentaux.",
    "es": "Esta rama calibra métodos; redes simuladas y proteínas latentes no son hallazgos experimentales.",
    "eu": "Adar honek metodoak kalibratzen ditu; sare simulatuak eta proteina latenteak ez dira aurkikuntza esperimentalak."
  },
  "附录：时间快照的可执行网络与虚拟干预": {
    "en": "Appendix: executable networks and virtual interventions from timed snapshots",
    "fr": "Annexe : réseaux exécutables et interventions virtuelles à partir d’instantanés temporels",
    "es": "Apéndice: redes ejecutables e intervenciones virtuales desde instantáneas temporales",
    "eu": "Eranskina: denborazko argazkien sare exekutagarriak eta esku-hartze birtualak"
  },
  "有真实时间与速率先验时，何种机制网络能再生成RNA分布并预测留出条件？": {
    "en": "With real times and rate priors, which mechanistic networks regenerate RNA distributions and predict held-out conditions?",
    "fr": "Avec temps réels et a priori de vitesse, quels réseaux régénèrent les distributions d’ARN et prédisent les conditions réservées ?",
    "es": "Con tiempos reales y priors de tasas, ¿qué redes regeneran distribuciones de ARN y predicen condiciones reservadas?",
    "eu": "Benetako denborekin eta tasa-aurretikoekin, zein sarek birsortzen dituzte RNA-banaketak eta aurresaten erreserbatutako baldintzak?"
  },
  "通过CardamomOT联合网络与时间轨迹拟合，先检验数据再生成，再开展虚拟扰动及动力学先验敏感性。": {
    "en": "Fit networks and time trajectories with CardamomOT, evaluate regeneration first, then virtual perturbations and kinetic-prior sensitivity.",
    "fr": "Ajuster réseaux et trajectoires avec CardamomOT, vérifier d’abord la régénération, puis perturbations virtuelles et sensibilité aux a priori cinétiques.",
    "es": "Ajustar redes y trayectorias con CardamomOT, evaluar primero regeneración y después perturbaciones virtuales y sensibilidad a priors cinéticos.",
    "eu": "Doitu sareak eta denborazko ibilbideak CardamomOTrekin; ebaluatu lehenik birsorkuntza, gero perturbazio birtualak eta aurretiko zinetikoen sentikortasuna."
  },
  "固定代码标签，替换人鼠资源为酵母资源。": {
    "en": "Pin the code tag and replace human or mouse resources with yeast resources.",
    "fr": "Fixer le tag du code et remplacer les ressources humaines ou murines par celles de levure.",
    "es": "Fijar la etiqueta de código y sustituir recursos humanos o murinos por recursos de levadura.",
    "eu": "Finkatu kode-etiketa eta ordezkatu giza edo sagu baliabideak legamiaren baliabideekin."
  },
  "将真实时间和拟时序分开记录。": {
    "en": "Record real time and pseudotime separately.",
    "fr": "Consigner séparément temps réel et pseudotemps.",
    "es": "Registrar por separado tiempo real y pseudotiempo.",
    "eu": "Erregistratu bereiz benetako denbora eta pseudodenbora."
  },
  "以留出分布及真实扰动评价生成预测。": {
    "en": "Evaluate generative predictions against held-out distributions and real perturbations.",
    "fr": "Évaluer les prédictions génératives avec distributions réservées et perturbations réelles.",
    "es": "Evaluar predicciones generativas con distribuciones reservadas y perturbaciones reales.",
    "eu": "Ebaluatu iragarpen sortzaileak erreserbatutako banaketekin eta benetako perturbazioekin."
  },
  "独立培养和实际采样时间；整培养/时间点留出。": {
    "en": "Use independent cultures and actual sampling times; hold out whole cultures or time points.",
    "fr": "Utiliser cultures indépendantes et temps réels ; réserver cultures ou points temporels entiers.",
    "es": "Usar cultivos independientes y tiempos reales; reservar cultivos o puntos temporales completos.",
    "eu": "Erabili kultura independenteak eta benetako laginketa-denborak; erreserbatu kultura edo denbora-puntu osoak."
  },
  "若只有单时间点群体数据则保留为计划；时间点和动力学先验接入后开展，真实扰动用于外推验证。": {
    "en": "If only one time point is available, keep this as a plan until time series and kinetic priors are supplied; real perturbations validate extrapolation.",
    "fr": "Si un seul temps est disponible, conserver ce plan jusqu’à l’ajout de séries temporelles et d’a priori cinétiques ; les perturbations réelles valident l’extrapolation.",
    "es": "Si solo hay un tiempo, mantenerlo como plan hasta disponer de series temporales y priors cinéticos; perturbaciones reales validan extrapolación.",
    "eu": "Denbora-puntu bakarra badago, gorde plan gisa denbora-serieak eta aurretiko zinetikoak lortu arte; benetako perturbazioek estrapolazioa baliozkotzen dute."
  },
  "重复元件RNA的多重比对与UMI计数": {
    "en": "Multimapping and UMI counting for repeat RNA",
    "fr": "Alignements multiples et comptage UMI des ARN répétés",
    "es": "Alineamientos múltiples y recuento UMI de ARN repetitivo",
    "eu": "RNA errepikakorraren lerrokatze anitzak eta UMI-zenbaketa"
  },
  "在基因矩阵旁建立Ty家族RNA层，并保留歧义来源。": {
    "en": "Build a Ty family RNA assay beside the gene matrix and preserve ambiguity sources.",
    "fr": "Créer un assay d’ARN des familles Ty à côté de la matrice génique et conserver les sources d’ambiguïté.",
    "es": "Crear un ensayo de ARN de familias Ty junto a la matriz génica y conservar fuentes de ambigüedad.",
    "eu": "Sortu Ty familien RNA-assaya gene-matrizearen ondoan eta gorde anbiguotasun-iturriak."
  },
  "原始方法论文及官方软件入口已核对。": {
    "en": "The original methods paper and official software entry points were checked.",
    "fr": "L’article méthodologique original et les entrées logicielles officielles ont été vérifiés.",
    "es": "Se verificaron el artículo metodológico original y las entradas oficiales del software.",
    "eu": "Jatorrizko metodo-artikulua eta softwarearen sarrera ofizialak egiaztatu dira."
  },
  "方法文献，不直接导入基因为细胞状态marker。": {
    "en": "Methods reference; its genes are not imported directly as cell-state markers.",
    "fr": "Référence méthodologique ; ses gènes ne sont pas importés directement comme marqueurs d’état.",
    "es": "Referencia metodológica; sus genes no se importan directamente como marcadores de estado.",
    "eu": "Metodo-erreferentzia; haren geneak ez dira zuzenean zelula-egoeren markatzaile gisa inportatzen."
  },
  "需按酵母参考、实际设计和留出样本检验适用性。": {
    "en": "Assess applicability using the yeast reference, actual design and held-out samples.",
    "fr": "Évaluer l’applicabilité avec la référence de levure, le plan réel et des échantillons réservés.",
    "es": "Evaluar aplicabilidad con referencia de levadura, diseño real y muestras reservadas.",
    "eu": "Ebaluatu aplikagarritasuna legamia-erreferentziarekin, benetako diseinuarekin eta erreserbatutako laginekin."
  },
  "细胞状态特异的菌株间表达方差": {
    "en": "State-specific between-strain expression variance",
    "fr": "Variance d’expression intersouche spécifique aux états",
    "es": "Varianza de expresión entre cepas específica de estado",
    "eu": "Egoera-espezifikoko anduien arteko adierazpen-bariantza"
  },
  "分开跨状态共享的样本差异与状态特异样本差异。": {
    "en": "Separate sample differences shared across states from state-specific sample differences.",
    "fr": "Séparer différences d’échantillon partagées entre états et différences spécifiques.",
    "es": "Separar diferencias entre muestras compartidas entre estados y diferencias específicas.",
    "eu": "Bereizi egoeren artean partekatutako lagin-aldeak eta egoera-espezifikoak."
  },
  "跨状态协调表达程序": {
    "en": "Coordinated expression programs across states",
    "fr": "Programmes d’expression coordonnés entre états",
    "es": "Programas de expresión coordinados entre estados",
    "eu": "Egoeren arteko adierazpen-programa koordinatuak"
  },
  "将同一独立培养内不同状态的表达程序联系起来。": {
    "en": "Connect expression programs across states within the same independent culture.",
    "fr": "Relier les programmes d’expression de différents états d’une même culture indépendante.",
    "es": "Relacionar programas de distintos estados del mismo cultivo independiente.",
    "eu": "Lotu kultura independente bereko egoeren adierazpen-programak."
  },
  "RNA velocity的动力学模块": {
    "en": "Kinetic modules of RNA velocity",
    "fr": "Modules cinétiques de vitesse de l’ARN",
    "es": "Módulos cinéticos de velocidad del ARN",
    "eu": "RNA-abiaduraren modulu zinetikoak"
  },
  "以模块总结RNA动态，比较后验不确定性和方向稳定性。": {
    "en": "Summarize RNA dynamics with modules and compare posterior uncertainty and directional stability.",
    "fr": "Résumer la dynamique d’ARN par modules et comparer incertitude a posteriori et stabilité directionnelle.",
    "es": "Resumir dinámica de ARN mediante módulos y comparar incertidumbre posterior y estabilidad direccional.",
    "eu": "Laburtu RNA-dinamika moduluekin eta alderatu posteriorreko ziurgabetasuna eta norabide-egonkortasuna."
  },
  "酵母TF结合与表达调控的证据分层": {
    "en": "Evidence layers for yeast TF binding and expression regulation",
    "fr": "Niveaux de preuve de liaison des TF et de régulation chez la levure",
    "es": "Capas de evidencia de unión de TF y regulación en levadura",
    "eu": "Legamiaren TF loturaren eta adierazpen-erregulazioaren ebidentzia-geruzak"
  },
  "将结合、扰动响应及调控方向分开记录在TF—靶基因边上。": {
    "en": "Record binding, perturbation response and regulatory sign separately on TF–target edges.",
    "fr": "Consigner séparément liaison, réponse aux perturbations et signe régulateur sur les arêtes TF–cible.",
    "es": "Registrar por separado unión, respuesta a perturbación y signo regulador en aristas TF–diana.",
    "eu": "Erregistratu bereiz lotura, perturbazio-erantzuna eta erregulazio-zeinua TF-helburu ertzetan."
  },
  "用于调控证据分层；不将蛋白结合直接标为RNA状态marker。": {
    "en": "Supports regulatory evidence layers; protein binding is not directly labeled as an RNA state marker.",
    "fr": "Sert à stratifier les preuves de régulation ; la liaison protéique n’est pas directement un marqueur d’état ARN.",
    "es": "Sirve para estratificar evidencia reguladora; la unión proteica no se etiqueta directamente como marcador de estado de ARN.",
    "eu": "Erregulazio-ebidentzia geruzatzeko da; proteina-lotura ez da zuzenean RNA-egoeraren markatzaile gisa etiketatzen."
  },
  "计数模型的均值eQTL参照": {
    "en": "Count-model reference for mean-eQTL",
    "fr": "Référence de modèle de comptages pour eQTL de moyenne",
    "es": "Referencia de modelos de recuentos para eQTL de medias",
    "eu": "Batezbesteko eQTLentzako zenbaketa-ereduen erreferentzia"
  },
  "以状态分层伪bulk计数估计均值遗传效应，作为噪音QTL的对照。": {
    "en": "Estimate genetic mean effects using state-stratified pseudobulk counts as a noise-QTL comparator.",
    "fr": "Estimer les effets génétiques sur la moyenne avec des pseudo-bulks stratifiés par état, comme comparateur des QTL du bruit.",
    "es": "Estimar efectos genéticos sobre medias con pseudobulk estratificado por estado como comparador de QTL de ruido.",
    "eu": "Estimatu batezbesteko efektu genetikoak egoeraka estratifikatutako pseudobulk zenbaketekin, zarata-QTLen konparatzaile gisa."
  },
  "转录爆发驱动的机制模拟": {
    "en": "Mechanistic simulations driven by transcriptional bursts",
    "fr": "Simulations mécanistes fondées sur les bouffées transcriptionnelles",
    "es": "Simulaciones mecanísticas basadas en ráfagas transcripcionales",
    "eu": "Transkripzio-leherketek gidatutako mekanismo-simulazioak"
  },
  "构造已知GRN和爆发参数的模拟真值，校准噪音与网络恢复。": {
    "en": "Construct known GRNs and burst parameters as simulation truth to calibrate noise and network recovery.",
    "fr": "Construire réseaux et paramètres de bouffées connus comme vérité simulée pour calibrer bruit et reconstruction de réseau.",
    "es": "Construir redes y ráfagas conocidas como verdad simulada para calibrar recuperación de ruido y redes.",
    "eu": "Eraiki GRN eta leherketa-parametro ezagunak egia simulatu gisa, zarata eta sareen berreskurapena kalibratzeko."
  },
  "时间标记快照的网络与轨迹联合推断": {
    "en": "Joint network and trajectory inference from timed snapshots",
    "fr": "Inférence conjointe des réseaux et trajectoires depuis des instantanés datés",
    "es": "Inferencia conjunta de redes y trayectorias desde instantáneas temporales",
    "eu": "Sareen eta ibilbideen baterako inferentzia denborazko argazkietatik"
  },
  "在时间序列及动力学先验齐全时，拟合可再生成数据的机制模型。": {
    "en": "With time series and kinetic priors, fit mechanistic models that regenerate observed data.",
    "fr": "Avec séries temporelles et a priori cinétiques, ajuster des modèles mécanistes régénérant les données.",
    "es": "Con series temporales y priors cinéticos, ajustar modelos mecanísticos que regeneren los datos observados.",
    "eu": "Denbora-serieekin eta aurretiko zinetikoekin, doitu behatutako datuak birsortzen dituzten mekanismo-ereduak."
  },
  "统一机制模型的推断与模拟": {
    "en": "Inference and simulation in a unified mechanistic model",
    "fr": "Inférence et simulation dans un modèle mécaniste unifié",
    "es": "Inferencia y simulación en un modelo mecanístico unificado",
    "eu": "Inferentzia eta simulazioa mekanismo-eredu bateratu batean"
  },
  "为网络恢复及数据再生成提供机制模型参照。": {
    "en": "Provides a mechanistic comparator for network recovery and data regeneration.",
    "fr": "Fournit un comparateur mécaniste pour la reconstruction de réseaux et la régénération de données.",
    "es": "Aporta un comparador mecanístico para recuperación de redes y regeneración de datos.",
    "eu": "Konparatzaile mekanistikoa eskaintzen du sareen berreskurapenerako eta datuen birsorkuntzarako."
  },
  "爆发过程与扩散过程的轨迹敏感性": {
    "en": "Trajectory sensitivity to burst versus diffusion processes",
    "fr": "Sensibilité des trajectoires aux processus de bouffées ou de diffusion",
    "es": "Sensibilidad de trayectorias a procesos de ráfagas o difusión",
    "eu": "Ibilbideen sentikortasuna leherketa- edo difusio-prozesuekiko"
  },
  "比较不同随机过程假设对状态转移推断的影响。": {
    "en": "Compare how stochastic-process assumptions affect inferred state transitions.",
    "fr": "Comparer l’effet des hypothèses de processus stochastiques sur les transitions d’état inférées.",
    "es": "Comparar cómo los supuestos de procesos estocásticos afectan las transiciones de estado inferidas.",
    "eu": "Alderatu prozesu estokastikoen hipotesiek inferitutako egoera-trantsizioetan duten eragina."
  }
};
window.YV_TEXT=window.YV_TEXT||{};
Object.assign(window.YV_TEXT,text);
const content={
  "tools": {
    "irescue": {
      "en": {
        "task": "Ty/repeat UMI quantification and multimapping audit",
        "yeastStatus": "Adaptation required",
        "role": "Extended analysis"
      },
      "fr": {
        "task": "Quantification UMI des Ty/répétitions et audit des alignements multiples",
        "yeastStatus": "Adaptation nécessaire",
        "role": "Analyse complémentaire"
      },
      "es": {
        "task": "Cuantificación UMI de Ty/repeticiones y auditoría de alineamientos múltiples",
        "yeastStatus": "Requiere adaptación",
        "role": "Análisis complementario"
      },
      "eu": {
        "task": "Ty/errepikapenen UMI kuantifikazioa eta lerrokatze anitzen auditoria",
        "yeastStatus": "Egokitzapena behar da",
        "role": "Analisi osagarria"
      }
    },
    "ctmm": {
      "en": {
        "task": "Shared and state-specific between-strain expression variance",
        "yeastStatus": "Adaptation required",
        "role": "Extended analysis"
      },
      "fr": {
        "task": "Variance d’expression entre souches, partagée et spécifique aux états",
        "yeastStatus": "Adaptation nécessaire",
        "role": "Analyse complémentaire"
      },
      "es": {
        "task": "Varianza de expresión entre cepas compartida y específica de estados",
        "yeastStatus": "Requiere adaptación",
        "role": "Análisis complementario"
      },
      "eu": {
        "task": "Anduien arteko adierazpen-bariantza partekatua eta egoera-espezifikoa",
        "yeastStatus": "Egokitzapena behar da",
        "role": "Analisi osagarria"
      }
    },
    "dialogue": {
      "en": {
        "task": "Coordinated expression programs across states within cultures",
        "yeastStatus": "Adaptation required",
        "role": "Extended analysis"
      },
      "fr": {
        "task": "Programmes coordonnés entre états d’une culture",
        "yeastStatus": "Adaptation nécessaire",
        "role": "Analyse complémentaire"
      },
      "es": {
        "task": "Programas coordinados entre estados de un cultivo",
        "yeastStatus": "Requiere adaptación",
        "role": "Análisis complementario"
      },
      "eu": {
        "task": "Kultura bereko egoeren arteko programa koordinatuak",
        "yeastStatus": "Egokitzapena behar da",
        "role": "Analisi osagarria"
      }
    },
    "cell2fate": {
      "en": {
        "task": "Modular RNA dynamics and posterior velocities",
        "yeastStatus": "Conditional",
        "role": "Extended analysis"
      },
      "fr": {
        "task": "Dynamique modulaire de l’ARN et vitesses postérieures",
        "yeastStatus": "Conditionnel",
        "role": "Analyse complémentaire"
      },
      "es": {
        "task": "Dinámica modular del ARN y velocidades posteriores",
        "yeastStatus": "Condicional",
        "role": "Análisis complementario"
      },
      "eu": {
        "task": "RNA dinamika modularra eta abiaduren atzeko banaketak",
        "yeastStatus": "Baldintzatua",
        "role": "Analisi osagarria"
      }
    },
    "jaxqtl": {
      "en": {
        "task": "Count-based mean eQTLs and model calibration",
        "yeastStatus": "Conditional",
        "role": "Extended analysis"
      },
      "fr": {
        "task": "eQTL de moyenne fondés sur les comptages et calibration",
        "yeastStatus": "Conditionnel",
        "role": "Analyse complémentaire"
      },
      "es": {
        "task": "eQTL de media basados en conteos y calibración",
        "yeastStatus": "Condicional",
        "role": "Análisis complementario"
      },
      "eu": {
        "task": "Zenbaketetan oinarritutako batezbesteko-eQTLak eta kalibrazioa",
        "yeastStatus": "Baldintzatua",
        "role": "Analisi osagarria"
      }
    },
    "harissa": {
      "en": {
        "task": "Mechanistic simulation with known networks and burst parameters",
        "yeastStatus": "Suitable for simulation",
        "role": "Extended analysis"
      },
      "fr": {
        "task": "Simulation mécaniste avec réseaux et paramètres de bouffées connus",
        "yeastStatus": "Adapté à la simulation",
        "role": "Analyse complémentaire"
      },
      "es": {
        "task": "Simulación mecanística con redes y parámetros de ráfagas conocidos",
        "yeastStatus": "Adecuado para simulación",
        "role": "Análisis complementario"
      },
      "eu": {
        "task": "Sare eta transkripzio-boladen parametro ezaguneko mekanismo-simulazioa",
        "yeastStatus": "Simulaziorako egokia",
        "role": "Analisi osagarria"
      }
    },
    "cardamomot": {
      "en": {
        "task": "Joint GRN and trajectory inference from time-stamped snapshots",
        "yeastStatus": "Conditional",
        "role": "Extended analysis"
      },
      "fr": {
        "task": "Inférence conjointe de GRN et trajectoires à partir d’instantanés datés",
        "yeastStatus": "Conditionnel",
        "role": "Analyse complémentaire"
      },
      "es": {
        "task": "Inferencia conjunta de GRN y trayectorias a partir de instantáneas temporales",
        "yeastStatus": "Condicional",
        "role": "Análisis complementario"
      },
      "eu": {
        "task": "Denbora etiketadun argazkietatik GRN eta ibilbideen inferentzia bateratua",
        "yeastStatus": "Baldintzatua",
        "role": "Analisi osagarria"
      }
    }
  },
  "metrics": {
    "te_bam_recoverability": {
      "en": {
        "name": "Recoverability of repeat-alignment candidates",
        "definition": "Audit NH, secondary alignments, CB and raw UMI tags for Ty candidates; compare losses from alignment caps and reference versions.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Reads and molecular candidates overlapping repeats",
        "level": "Library × reference × alignment strategy",
        "purpose": "Audit NH, secondary alignments, CB and raw UMI tags for Ty candidates; compare losses from alignment caps and reference versions."
      },
      "fr": {
        "name": "Récupérabilité des alignements candidats de répétitions",
        "definition": "Auditer NH, alignements secondaires, CB et UMI bruts des candidats Ty ; comparer les pertes dues aux plafonds et références.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Reads et molécules candidats chevauchant des répétitions",
        "level": "Bibliothèque × référence × stratégie d’alignement",
        "purpose": "Auditer NH, alignements secondaires, CB et UMI bruts des candidats Ty ; comparer les pertes dues aux plafonds et références."
      },
      "es": {
        "name": "Recuperabilidad de alineamientos candidatos de repeticiones",
        "definition": "Auditar NH, alineamientos secundarios, CB y UMI originales de candidatos Ty; comparar pérdidas por límites y referencias.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Lecturas y moléculas candidatas solapadas con repeticiones",
        "level": "Biblioteca × referencia × estrategia de alineamiento",
        "purpose": "Auditar NH, alineamientos secundarios, CB y UMI originales de candidatos Ty; comparar pérdidas por límites y referencias."
      },
      "eu": {
        "name": "Errepikapen-lerrokatze hautagaien berreskuragarritasuna",
        "definition": "Auditatu Ty hautagaien NH, bigarren mailako lerrokatzeak, CB eta jatorrizko UMIak; alderatu mugen eta erreferentzien ondoriozko galerak.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Errepikapenekin gainjartzen diren irakurketak eta molekula hautagaiak",
        "level": "Liburutegia × erreferentzia × lerrokatze-estrategia",
        "purpose": "Auditatu Ty hautagaien NH, bigarren mailako lerrokatzeak, CB eta jatorrizko UMIak; alderatu mugen eta erreferentzien ondoriozko galerak."
      }
    },
    "te_family_allocation": {
      "en": {
        "name": "Ty-family assignment and ambiguity",
        "definition": "Store family expression, cross-family equivalence classes, EM assignments and unique evidence separately; reconcile barcodes with the gene matrix.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Repeat-molecule candidates passing the same cell whitelist",
        "level": "Family × cell × library",
        "purpose": "Store family expression, cross-family equivalence classes, EM assignments and unique evidence separately; reconcile barcodes with the gene matrix."
      },
      "fr": {
        "name": "Affectation aux familles Ty et ambiguïté",
        "definition": "Séparer expression des familles, classes inter-familles, affectations EM et preuves uniques ; réconcilier les barcodes avec la matrice génique.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Molécules candidates de répétitions retenues par la même liste de cellules",
        "level": "Famille × cellule × bibliothèque",
        "purpose": "Séparer expression des familles, classes inter-familles, affectations EM et preuves uniques ; réconcilier les barcodes avec la matrice génique."
      },
      "es": {
        "name": "Asignación a familias Ty y ambigüedad",
        "definition": "Separar expresión de familias, clases entre familias, asignaciones EM y evidencia única; conciliar barcodes con la matriz génica.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Moléculas candidatas de repeticiones en la misma lista de células",
        "level": "Familia × célula × biblioteca",
        "purpose": "Separar expresión de familias, clases entre familias, asignaciones EM y evidencia única; conciliar barcodes con la matriz génica."
      },
      "eu": {
        "name": "Ty familien esleipena eta anbiguotasuna",
        "definition": "Gorde bereiz familien adierazpena, familien arteko klaseak, EM esleipenak eta ebidentzia bakarra; bateratu barcodeak gene-matrizearekin.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Zelulen zerrenda baimendu bera gainditzen duten errepikapen-molekulak",
        "level": "Familia × zelula × liburutegia",
        "purpose": "Gorde bereiz familien adierazpena, familien arteko klaseak, EM esleipenak eta ebidentzia bakarra; bateratu barcodeak gene-matrizearekin."
      }
    },
    "te_noise_assignment_sensitivity": {
      "en": {
        "name": "Ty variability sensitivity to assignment strategy",
        "definition": "Compare Ty-family RNA distributions within matched states and cultures; examine effects of unique evidence, EM, reference and background handling on candidate rankings.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Families defined on one reference and supported in all comparison groups",
        "level": "Family × state × culture",
        "purpose": "Compare Ty-family RNA distributions within matched states and cultures; examine effects of unique evidence, EM, reference and background handling on candidate rankings."
      },
      "fr": {
        "name": "Sensibilité de la variabilité Ty à l’affectation",
        "definition": "Comparer les distributions d’ARN Ty dans des états/cultures comparables ; examiner l’effet des preuves uniques, EM, références et corrections de fond sur le classement.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Familles définies sur une référence et étayées dans tous les groupes comparés",
        "level": "Famille × état × culture",
        "purpose": "Comparer les distributions d’ARN Ty dans des états/cultures comparables ; examiner l’effet des preuves uniques, EM, références et corrections de fond sur le classement."
      },
      "es": {
        "name": "Sensibilidad de variabilidad Ty a la asignación",
        "definition": "Comparar distribuciones de ARN Ty en estados/cultivos comparables; examinar efectos de evidencia única, EM, referencia y fondo sobre el orden de candidatos.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Familias definidas en una referencia y respaldadas en todos los grupos",
        "level": "Familia × estado × cultivo",
        "purpose": "Comparar distribuciones de ARN Ty en estados/cultivos comparables; examinar efectos de evidencia única, EM, referencia y fondo sobre el orden de candidatos."
      },
      "eu": {
        "name": "Ty aldakortasunaren esleipenarekiko sentikortasuna",
        "definition": "Alderatu Ty RNA banaketak egoera eta kultura konparagarrietan; aztertu ebidentzia bakarrak, EMk, erreferentziak eta hondoak sailkapenean duten eragina.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Erreferentzia berean definitutako eta alderatutako talde guztietan sostengatutako familiak",
        "level": "Familia × egoera × kultura",
        "purpose": "Alderatu Ty RNA banaketak egoera eta kultura konparagarrietan; aztertu ebidentzia bakarrak, EMk, erreferentziak eta hondoak sailkapenean duten eragina."
      }
    },
    "state_between_strain_variance": {
      "en": {
        "name": "State-specific between-strain variance",
        "definition": "Report CTMM shared and state-specific variance; retain means and pseudobulk sampling variances.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Strains/independent cultures comparable across the same states",
        "level": "Gene × state × sample set",
        "purpose": "Report CTMM shared and state-specific variance; retain means and pseudobulk sampling variances."
      },
      "fr": {
        "name": "Variance intersouche spécifique aux états",
        "definition": "Rapporter les variances CTMM partagées et spécifiques ; conserver moyennes et variances d’échantillonnage pseudobulk.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Souches/cultures indépendantes comparables sur les mêmes états",
        "level": "Gène × état × ensemble d’échantillons",
        "purpose": "Rapporter les variances CTMM partagées et spécifiques ; conserver moyennes et variances d’échantillonnage pseudobulk."
      },
      "es": {
        "name": "Varianza entre cepas específica de estados",
        "definition": "Informar varianzas CTMM compartidas y específicas; conservar medias y varianzas de muestreo pseudobulk.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Cepas/cultivos independientes comparables en los mismos estados",
        "level": "Gen × estado × conjunto de muestras",
        "purpose": "Informar varianzas CTMM compartidas y específicas; conservar medias y varianzas de muestreo pseudobulk."
      },
      "eu": {
        "name": "Egoera-espezifikoko anduien arteko bariantza",
        "definition": "Eman CTMMren bariantza partekatua eta espezifikoa; gorde batezbestekoak eta pseudobulk laginketa-bariantzak.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Egoera beretan konparagarriak diren anduiak/kultura independenteak",
        "level": "Genea × egoera × lagin multzoa",
        "purpose": "Eman CTMMren bariantza partekatua eta espezifikoa; gorde batezbestekoak eta pseudobulk laginketa-bariantzak."
      }
    },
    "state_variance_calibration": {
      "en": {
        "name": "Calibration of cross-state variance models",
        "definition": "Compare Hom/Free/Full, jackknife, missing-state handling and kinship strata; evaluate false positives with design-matched simulations.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Independent samples actually included in each model",
        "level": "Gene × model × design scenario",
        "purpose": "Compare Hom/Free/Full, jackknife, missing-state handling and kinship strata; evaluate false positives with design-matched simulations."
      },
      "fr": {
        "name": "Calibration des modèles de variance interétats",
        "definition": "Comparer Hom/Free/Full, jackknife, états manquants et strates de parenté ; évaluer les faux positifs par simulations adaptées au plan.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Échantillons indépendants inclus dans chaque modèle",
        "level": "Gène × modèle × scénario expérimental",
        "purpose": "Comparer Hom/Free/Full, jackknife, états manquants et strates de parenté ; évaluer les faux positifs par simulations adaptées au plan."
      },
      "es": {
        "name": "Calibración de modelos de varianza entre estados",
        "definition": "Comparar Hom/Free/Full, jackknife, estados ausentes y estratos de parentesco; evaluar falsos positivos con simulaciones del diseño.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Muestras independientes incluidas en cada modelo",
        "level": "Gen × modelo × escenario de diseño",
        "purpose": "Comparar Hom/Free/Full, jackknife, estados ausentes y estratos de parentesco; evaluar falsos positivos con simulaciones del diseño."
      },
      "eu": {
        "name": "Egoeren arteko bariantza-ereduen kalibrazioa",
        "definition": "Alderatu Hom/Free/Full, jackknife, falta diren egoerak eta ahaidetasun-geruzak; ebaluatu positibo faltsuak diseinuari egokitutako simulazioekin.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Eredu bakoitzean sartutako lagin independenteak",
        "level": "Genea × eredua × diseinu-egoera",
        "purpose": "Alderatu Hom/Free/Full, jackknife, falta diren egoerak eta ahaidetasun-geruzak; ebaluatu positibo faltsuak diseinuari egokitutako simulazioekin."
      }
    },
    "cross_state_program_coupling": {
      "en": {
        "name": "Cross-state program coupling within cultures",
        "definition": "Estimate cross-state associations within shared culture IDs; retain members, cell scores and between-state correlations.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Independent cultures covering the relevant states jointly",
        "level": "Program × state pair × culture set",
        "purpose": "Estimate cross-state associations within shared culture IDs; retain members, cell scores and between-state correlations."
      },
      "fr": {
        "name": "Couplage des programmes entre états d’une culture",
        "definition": "Estimer les associations entre états dans les mêmes cultures ; conserver membres, scores cellulaires et corrélations.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Cultures indépendantes couvrant conjointement les états concernés",
        "level": "Programme × paire d’états × ensemble de cultures",
        "purpose": "Estimer les associations entre états dans les mêmes cultures ; conserver membres, scores cellulaires et corrélations."
      },
      "es": {
        "name": "Acoplamiento de programas entre estados del cultivo",
        "definition": "Estimar asociaciones entre estados en cultivos compartidos; conservar miembros, puntuaciones celulares y correlaciones.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Cultivos independientes que cubren conjuntamente los estados",
        "level": "Programa × par de estados × conjunto de cultivos",
        "purpose": "Estimar asociaciones entre estados en cultivos compartidos; conservar miembros, puntuaciones celulares y correlaciones."
      },
      "eu": {
        "name": "Kultura barruko egoeren arteko programa-akoplamendua",
        "definition": "Estimatu egoeren arteko loturak kultura-ID partekatuetan; gorde kideak, zelula-puntuazioak eta korrelazioak.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Dagozkion egoerak batera estaltzen dituzten kultura independenteak",
        "level": "Programa × egoera-bikotea × kultura multzoa",
        "purpose": "Estimatu egoeren arteko loturak kultura-ID partekatuetan; gorde kideak, zelula-puntuazioak eta korrelazioak."
      }
    },
    "cross_state_program_holdout": {
      "en": {
        "name": "Held-out stability of cross-state programs",
        "definition": "Hold out strains and cultures; compare genes, directions and score predictions without splitting a culture across training and testing.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Strains or cultures withheld from fitting",
        "level": "Program × held-out fold",
        "purpose": "Hold out strains and cultures; compare genes, directions and score predictions without splitting a culture across training and testing."
      },
      "fr": {
        "name": "Stabilité des programmes interétats en validation",
        "definition": "Réserver souches et cultures ; comparer gènes, directions et scores sans répartir une culture entre entraînement et test.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Souches ou cultures exclues de l’ajustement",
        "level": "Programme × partition réservée",
        "purpose": "Réserver souches et cultures ; comparer gènes, directions et scores sans répartir une culture entre entraînement et test."
      },
      "es": {
        "name": "Estabilidad de programas entre estados en validación",
        "definition": "Reservar cepas y cultivos; comparar genes, direcciones y puntuaciones sin dividir un cultivo entre entrenamiento y prueba.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Cepas o cultivos reservados del ajuste",
        "level": "Programa × partición reservada",
        "purpose": "Reservar cepas y cultivos; comparar genes, direcciones y puntuaciones sin dividir un cultivo entre entrenamiento y prueba."
      },
      "eu": {
        "name": "Egoeren arteko programen balidazio-egonkortasuna",
        "definition": "Gorde anduiak eta kulturak; alderatu geneak, norabideak eta puntuazioak kultura bera entrenamendu eta test artean banatu gabe.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Doikuntzatik kanpo gordetako anduiak edo kulturak",
        "level": "Programa × gordetako partizioa",
        "purpose": "Gorde anduiak eta kulturak; alderatu geneak, norabideak eta puntuazioak kultura bera entrenamendu eta test artean banatu gabe."
      }
    },
    "velocity_module_support": {
      "en": {
        "name": "Gene and state support for velocity modules",
        "definition": "Record splice support, state coverage, module sizes and stability across module counts and priors.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Genes and cells passing the splice-evidence audit",
        "level": "Module × state × fit version",
        "purpose": "Record splice support, state coverage, module sizes and stability across module counts and priors."
      },
      "fr": {
        "name": "Support génique et d’état des modules de vélocité",
        "definition": "Consigner support d’épissage, couverture, tailles et stabilité selon le nombre de modules et les a priori.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Gènes et cellules validés par l’audit d’épissage",
        "level": "Module × état × version d’ajustement",
        "purpose": "Consigner support d’épissage, couverture, tailles et stabilité selon le nombre de modules et les a priori."
      },
      "es": {
        "name": "Soporte génico y de estado de módulos de velocidad",
        "definition": "Registrar soporte de empalme, cobertura, tamaños y estabilidad según número de módulos y priors.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Genes y células que superan la auditoría de empalme",
        "level": "Módulo × estado × versión de ajuste",
        "purpose": "Registrar soporte de empalme, cobertura, tamaños y estabilidad según número de módulos y priors."
      },
      "eu": {
        "name": "Abiadura-moduluen gene- eta egoera-euskarria",
        "definition": "Erregistratu splicing-euskarria, estaldura, tamainak eta egonkortasuna modulu kopuruen eta aurretikoen arabera.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Splicing-ebidentziaren auditoria gainditzen duten geneak eta zelulak",
        "level": "Modulua × egoera × doikuntza-bertsioa",
        "purpose": "Erregistratu splicing-euskarria, estaldura, tamainak eta egonkortasuna modulu kopuruen eta aurretikoen arabera."
      }
    },
    "velocity_module_uncertainty": {
      "en": {
        "name": "Posterior uncertainty of modular velocities",
        "definition": "Retain velocity means, standard deviations, available posterior samples and direction agreement; compare cycle priors and held-out cultures.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Cells and genes included in the kinetic model",
        "level": "Cell × gene × model",
        "purpose": "Retain velocity means, standard deviations, available posterior samples and direction agreement; compare cycle priors and held-out cultures."
      },
      "fr": {
        "name": "Incertitude postérieure des vélocités modulaires",
        "definition": "Conserver moyennes, écarts-types, échantillons postérieurs et concordance directionnelle ; comparer a priori cycliques et cultures réservées.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Cellules et gènes inclus dans le modèle cinétique",
        "level": "Cellule × gène × modèle",
        "purpose": "Conserver moyennes, écarts-types, échantillons postérieurs et concordance directionnelle ; comparer a priori cycliques et cultures réservées."
      },
      "es": {
        "name": "Incertidumbre posterior de velocidades modulares",
        "definition": "Conservar medias, desviaciones, muestras posteriores y concordancia direccional; comparar priors cíclicos y cultivos reservados.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Células y genes incluidos en el modelo cinético",
        "level": "Célula × gen × modelo",
        "purpose": "Conservar medias, desviaciones, muestras posteriores y concordancia direccional; comparar priors cíclicos y cultivos reservados."
      },
      "eu": {
        "name": "Abiadura modularren atzeko ziurgabetasuna",
        "definition": "Gorde abiadura-batezbestekoak, desbideratzeak, atzeko laginak eta norabide-adostasuna; alderatu ziklo-aurretikoak eta gordetako kulturak.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Eredu zinetikoan sartutako zelulak eta geneak",
        "level": "Zelula × genea × eredua",
        "purpose": "Gorde abiadura-batezbestekoak, desbideratzeak, atzeko laginak eta norabide-adostasuna; alderatu ziklo-aurretikoak eta gordetako kulturak."
      }
    },
    "grn_edge_evidence_strata": {
      "en": {
        "name": "Binding and functional evidence strata for regulatory edges",
        "definition": "For each TF–target edge, store binding, rapid-depletion response, sign, condition and source separately; distinguish unknown from unassayed.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Mapped TF–gene pairs assayable in the experiment",
        "level": "TF × target gene × evidence × condition",
        "purpose": "For each TF–target edge, store binding, rapid-depletion response, sign, condition and source separately; distinguish unknown from unassayed."
      },
      "fr": {
        "name": "Strates de preuves de liaison et de fonction des arêtes",
        "definition": "Pour chaque arête TF–cible, séparer liaison, réponse à déplétion rapide, signe, condition et source ; distinguer inconnu et non mesuré.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Paires TF–gène mappées et évaluables dans l’expérience",
        "level": "TF × gène cible × preuve × condition",
        "purpose": "Pour chaque arête TF–cible, séparer liaison, réponse à déplétion rapide, signe, condition et source ; distinguer inconnu et non mesuré."
      },
      "es": {
        "name": "Estratos de evidencia de unión y función de aristas",
        "definition": "Para cada arista TF–diana, separar unión, respuesta a agotamiento rápido, signo, condición y fuente; distinguir desconocido de no medido.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Pares TF–gen mapeados y evaluables en el experimento",
        "level": "TF × gen diana × evidencia × condición",
        "purpose": "Para cada arista TF–diana, separar unión, respuesta a agotamiento rápido, signo, condición y fuente; distinguir desconocido de no medido."
      },
      "eu": {
        "name": "Erregulazio-ertzen lotura- eta funtzio-ebidentzia geruzak",
        "definition": "TF-helburu ertz bakoitzean gorde bereiz lotura, agortze azkarraren erantzuna, zeinua, baldintza eta iturria; bereizi ezezaguna eta neurtu gabea.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Esperimentuan mapatutako eta ebaluagarriak diren TF-gene bikoteak",
        "level": "TF × helburu-genea × ebidentzia × baldintza",
        "purpose": "TF-helburu ertz bakoitzean gorde bereiz lotura, agortze azkarraren erantzuna, zeinua, baldintza eta iturria; bereizi ezezaguna eta neurtu gabea."
      }
    },
    "grn_prior_ablation": {
      "en": {
        "name": "Ablation of regulatory-prior evidence",
        "definition": "Fit with binding, response, intersection and no-prior networks; compare networks and variability candidates on independent edges or cultures.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Edges, genes and independent samples evaluable in all comparisons",
        "level": "Model × prior layer × holdout set",
        "purpose": "Fit with binding, response, intersection and no-prior networks; compare networks and variability candidates on independent edges or cultures."
      },
      "fr": {
        "name": "Ablation des preuves a priori de régulation",
        "definition": "Ajuster avec liaison, réponse, intersection et sans a priori ; comparer sur des arêtes ou cultures indépendantes.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Arêtes, gènes et échantillons indépendants évaluables dans toutes les comparaisons",
        "level": "Modèle × couche a priori × ensemble réservé",
        "purpose": "Ajuster avec liaison, réponse, intersection et sans a priori ; comparer sur des arêtes ou cultures indépendantes."
      },
      "es": {
        "name": "Ablación de evidencia previa de regulación",
        "definition": "Ajustar con unión, respuesta, intersección y sin prior; comparar en aristas o cultivos independientes.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Aristas, genes y muestras independientes evaluables en todas las comparaciones",
        "level": "Modelo × capa previa × conjunto reservado",
        "purpose": "Ajustar con unión, respuesta, intersección y sin prior; comparar en aristas o cultivos independientes."
      },
      "eu": {
        "name": "Erregulazio-aurretiko ebidentziaren ablazioa",
        "definition": "Doitu lotura, erantzun, ebakidura eta aurretikorik gabeko sareekin; alderatu ertz edo kultura independenteetan.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Alderaketa guztietan ebaluagarriak diren ertzak, geneak eta lagin independenteak",
        "level": "Eredua × aurretiko geruza × gordetako multzoa",
        "purpose": "Doitu lotura, erantzun, ebakidura eta aurretikorik gabeko sareekin; alderatu ertz edo kultura independenteetan."
      }
    },
    "count_eqtl_offset_contract": {
      "en": {
        "name": "Sample and offset contract for count eQTLs",
        "definition": "Reconcile sample IDs, ploidy coding, integer counts and prefilter offsets across genotypes, state pseudobulks and covariates.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Strains/independent samples included in one state scan",
        "level": "State × input version",
        "purpose": "Reconcile sample IDs, ploidy coding, integer counts and prefilter offsets across genotypes, state pseudobulks and covariates."
      },
      "fr": {
        "name": "Concordance échantillons–offsets pour les eQTL de comptages",
        "definition": "Réconcilier identifiants, ploïdie, comptages entiers et offsets préfiltrage entre génotypes, pseudobulks et covariables.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Souches/échantillons indépendants inclus dans un scan d’état",
        "level": "État × version des entrées",
        "purpose": "Réconcilier identifiants, ploïdie, comptages entiers et offsets préfiltrage entre génotypes, pseudobulks et covariables."
      },
      "es": {
        "name": "Concordancia de muestras y offsets para eQTL de conteos",
        "definition": "Conciliar ID, ploidía, conteos enteros y offsets previos al filtrado entre genotipos, pseudobulks y covariables.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Cepas/muestras independientes incluidas en un análisis de estado",
        "level": "Estado × versión de entrada",
        "purpose": "Conciliar ID, ploidía, conteos enteros y offsets previos al filtrado entre genotipos, pseudobulks y covariables."
      },
      "eu": {
        "name": "Zenbaketa-eQTLen lagin eta offset kontratua",
        "definition": "Bateratu lagin-IDak, ploidia-kodeketa, zenbaketa osoak eta aurreiragazki-offsetak genotipo, pseudobulk eta kobariableetan.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Egoera-eskaneatze berean sartutako anduiak/lagin independenteak",
        "level": "Egoera × sarrera-bertsioa",
        "purpose": "Bateratu lagin-IDak, ploidia-kodeketa, zenbaketa osoak eta aurreiragazki-offsetak genotipo, pseudobulk eta kobariableetan."
      }
    },
    "count_eqtl_calibration": {
      "en": {
        "name": "Calibration and kinship sensitivity of count mean eQTLs",
        "definition": "Retain effects, standard errors, gene-level p-values, across-gene FDR, failed fits and kinship-model comparisons.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Gene–state pairs with valid fits and variant support",
        "level": "Gene × state × model",
        "purpose": "Retain effects, standard errors, gene-level p-values, across-gene FDR, failed fits and kinship-model comparisons."
      },
      "fr": {
        "name": "Calibration et sensibilité à la parenté des eQTL de moyenne",
        "definition": "Conserver effets, erreurs standard, p par gène, FDR intergènes, échecs et comparaisons aux modèles de parenté.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Paires gène–état avec ajustement valide et variants étayés",
        "level": "Gène × état × modèle",
        "purpose": "Conserver effets, erreurs standard, p par gène, FDR intergènes, échecs et comparaisons aux modèles de parenté."
      },
      "es": {
        "name": "Calibración y sensibilidad al parentesco de eQTL de media",
        "definition": "Conservar efectos, errores estándar, p por gen, FDR entre genes, fallos y comparaciones con modelos de parentesco.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Pares gen–estado con ajustes válidos y soporte de variantes",
        "level": "Gen × estado × modelo",
        "purpose": "Conservar efectos, errores estándar, p por gen, FDR entre genes, fallos y comparaciones con modelos de parentesco."
      },
      "eu": {
        "name": "Batezbesteko-eQTLen kalibrazioa eta ahaidetasun-sentikortasuna",
        "definition": "Gorde efektuak, errore estandarrak, gene-mailako p balioak, FDRa, hutsegiteak eta ahaidetasun-ereduen alderaketak.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Doikuntza balioduna eta aldaera-euskarria duten gene-egoera bikoteak",
        "level": "Genea × egoera × eredua",
        "purpose": "Gorde efektuak, errore estandarrak, gene-mailako p balioak, FDRa, hutsegiteak eta ahaidetasun-ereduen alderaketak."
      }
    },
    "mechanistic_noise_recovery": {
      "en": {
        "name": "Noise recovery against mechanistic ground truth",
        "definition": "With known burst, network and degradation parameters, vary capture, background, depth and state mixture separately; record effect bias and interval coverage.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Prespecified simulations with saved ground truth",
        "level": "Gene × parameter scenario × measurement scenario",
        "purpose": "With known burst, network and degradation parameters, vary capture, background, depth and state mixture separately; record effect bias and interval coverage."
      },
      "fr": {
        "name": "Récupération du bruit face à une vérité mécanistique",
        "definition": "Avec paramètres connus, varier séparément capture, fond, profondeur et mélange d’états ; consigner biais et couverture.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Simulations prédéfinies avec vérité conservée",
        "level": "Gène × scénario de paramètres × scénario de mesure",
        "purpose": "Avec paramètres connus, varier séparément capture, fond, profondeur et mélange d’états ; consigner biais et couverture."
      },
      "es": {
        "name": "Recuperación del ruido frente a verdad mecanística",
        "definition": "Con parámetros conocidos, variar captura, fondo, profundidad y mezcla de estados por separado; registrar sesgo y cobertura.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Simulaciones predefinidas con verdad guardada",
        "level": "Gen × escenario de parámetros × escenario de medición",
        "purpose": "Con parámetros conocidos, variar captura, fondo, profundidad y mezcla de estados por separado; registrar sesgo y cobertura."
      },
      "eu": {
        "name": "Zarataren berreskurapena mekanismo-egiarekiko",
        "definition": "Parametro ezagunekin, aldatu bereiz harrapaketa, hondoa, sakonera eta egoera-nahasketa; erregistratu alborapena eta estaldura.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Aurrez definitutako eta egia gordeta duten simulazioak",
        "level": "Genea × parametro-egoera × neurketa-egoera",
        "purpose": "Parametro ezagunekin, aldatu bereiz harrapaketa, hondoa, sakonera eta egoera-nahasketa; erregistratu alborapena eta estaldura."
      }
    },
    "mechanistic_grn_recovery": {
      "en": {
        "name": "Network recovery and false edges under mechanistic simulation",
        "definition": "Evaluate inferred positive/negative edges against truth, stratified by sparsity, state mixture, capture and cell number.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Evaluable directed gene pairs in the true simulated network",
        "level": "Network × simulation scenario",
        "purpose": "Evaluate inferred positive/negative edges against truth, stratified by sparsity, state mixture, capture and cell number."
      },
      "fr": {
        "name": "Récupération du réseau et fausses arêtes en simulation mécaniste",
        "definition": "Évaluer les arêtes positives/négatives selon sparsité, mélange d’états, capture et effectif cellulaire.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Paires géniques orientées évaluables dans le réseau simulé vrai",
        "level": "Réseau × scénario de simulation",
        "purpose": "Évaluer les arêtes positives/négatives selon sparsité, mélange d’états, capture et effectif cellulaire."
      },
      "es": {
        "name": "Recuperación de redes y aristas falsas en simulación mecanística",
        "definition": "Evaluar aristas positivas/negativas según dispersión, mezcla de estados, captura y número de células.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Pares génicos dirigidos evaluables en la red simulada real",
        "level": "Red × escenario de simulación",
        "purpose": "Evaluar aristas positivas/negativas según dispersión, mezcla de estados, captura y número de células."
      },
      "eu": {
        "name": "Sareen berreskurapena eta ertz faltsuak mekanismo-simulazioan",
        "definition": "Ebaluatu ertz positibo/negatiboak egiaren aurka, urritasunaren, egoera-nahasketaren, harrapaketaren eta zelula kopuruaren arabera.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Simulazioko benetako sarearen gene-bikote zuzendu ebaluagarriak",
        "level": "Sarea × simulazio-egoera",
        "purpose": "Ebaluatu ertz positibo/negatiboak egiaren aurka, urritasunaren, egoera-nahasketaren, harrapaketaren eta zelula kopuruaren arabera."
      }
    },
    "temporal_mechanistic_regeneration": {
      "en": {
        "name": "Held-out distribution regeneration by temporal networks",
        "definition": "Hold out independent cultures or times; compare generated and observed RNA means, variances, tails and multivariate distributions.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Cultures and true time points excluded from training",
        "level": "Time × culture × model",
        "purpose": "Hold out independent cultures or times; compare generated and observed RNA means, variances, tails and multivariate distributions."
      },
      "fr": {
        "name": "Régénération des distributions réservées par les réseaux temporels",
        "definition": "Réserver cultures ou temps ; comparer moyennes, variances, queues et distributions multivariées générées et observées.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Cultures et temps réels exclus de l’entraînement",
        "level": "Temps × culture × modèle",
        "purpose": "Réserver cultures ou temps ; comparer moyennes, variances, queues et distributions multivariées générées et observées."
      },
      "es": {
        "name": "Regeneración de distribuciones reservadas por redes temporales",
        "definition": "Reservar cultivos o tiempos; comparar medias, varianzas, colas y distribuciones multivariantes generadas y observadas.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Cultivos y tiempos reales excluidos del entrenamiento",
        "level": "Tiempo × cultivo × modelo",
        "purpose": "Reservar cultivos o tiempos; comparar medias, varianzas, colas y distribuciones multivariantes generadas y observadas."
      },
      "eu": {
        "name": "Denbora-sareek gordetako banaketak birsortzea",
        "definition": "Gorde kultura edo denbora independenteak; alderatu sortutako eta behatutako RNAren batezbestekoak, bariantzak, isatsak eta banaketa multibarianteak.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Entrenamendutik kanpoko kulturak eta benetako denbora-puntuak",
        "level": "Denbora × kultura × eredua",
        "purpose": "Gorde kultura edo denbora independenteak; alderatu sortutako eta behatutako RNAren batezbestekoak, bariantzak, isatsak eta banaketa multibarianteak."
      }
    },
    "kinetic_prior_sensitivity": {
      "en": {
        "name": "Sensitivity to yeast kinetic priors",
        "definition": "Record species, source, units and ranges for RNA/protein degradation priors; refit networks and interventions across supported priors.",
        "unit": "Project-defined stratified metrics",
        "denominator": "Source-matched kinetic parameters and identifiable genes",
        "level": "Gene × prior scenario × model",
        "purpose": "Record species, source, units and ranges for RNA/protein degradation priors; refit networks and interventions across supported priors."
      },
      "fr": {
        "name": "Sensibilité aux a priori cinétiques de levure",
        "definition": "Consigner espèce, source, unités et plages des a priori de dégradation ; réajuster réseaux et interventions selon les a priori étayés.",
        "unit": "Indicateurs stratifiés définis pour le projet",
        "denominator": "Paramètres cinétiques sourcés et gènes identifiables",
        "level": "Gène × scénario a priori × modèle",
        "purpose": "Consigner espèce, source, unités et plages des a priori de dégradation ; réajuster réseaux et interventions selon les a priori étayés."
      },
      "es": {
        "name": "Sensibilidad a priors cinéticos de levadura",
        "definition": "Registrar especie, fuente, unidades y rangos de priors de degradación; reajustar redes e intervenciones con priors respaldados.",
        "unit": "Indicadores estratificados definidos por el proyecto",
        "denominator": "Parámetros cinéticos con fuente y genes identificables",
        "level": "Gen × escenario previo × modelo",
        "purpose": "Registrar especie, fuente, unidades y rangos de priors de degradación; reajustar redes e intervenciones con priors respaldados."
      },
      "eu": {
        "name": "Legamiaren aurretiko zinetikoekiko sentikortasuna",
        "definition": "Erregistratu degradazio-aurretikoen espeziea, iturria, unitateak eta tarteak; birdoitu sareak eta esku-hartzeak aurretiko sostengatuekin.",
        "unit": "Proiektuan definitutako adierazle estratifikatuak",
        "denominator": "Iturri egokiko parametro zinetikoak eta gene identifikagarriak",
        "level": "Genea × aurretiko egoera × eredua",
        "purpose": "Erregistratu degradazio-aurretikoen espeziea, iturria, unitateak eta tarteak; birdoitu sareak eta esku-hartzeak aurretiko sostengatuekin."
      }
    }
  },
  "formulas": {
    "ctmm_state_covariance": {
      "en": {
        "name": "Cross-state between-sample variation",
        "purpose": "Quantify between-strain differences separately from within-strain expression noise."
      },
      "fr": {
        "name": "Variation interéchantillon entre états",
        "purpose": "Quantifier séparément différences intersouches et bruit intrasouche."
      },
      "es": {
        "name": "Variación entre muestras a través de estados",
        "purpose": "Cuantificar por separado diferencias entre cepas y ruido dentro de cepa."
      },
      "eu": {
        "name": "Egoeren arteko laginen aldakortasuna",
        "purpose": "Kuantifikatu bereiz anduien arteko aldeak eta andui barruko zarata."
      }
    }
  },
  "projects": {
    "ty_repeat_variability": {
      "en": {
        "title": "Ty repeat RNA and expression variability",
        "question": "Does cell-to-cell variation in Ty family RNA change with strain, cell cycle and stress state?",
        "goal": "Does cell-to-cell variation in Ty family RNA change with strain, cell cycle and stress state?",
        "method": "Build a separate Ty family assay from BAM retaining multimapping, then compare within-state distributions and assignment sensitivity.",
        "statisticalUnit": "Independent cultures support group inference; molecular equivalence classes support count auditing.",
        "interpretationBoundary": "Report Ty RNA heterogeneity; transposition, insertion sites and DNA copy number require separate evidence."
      },
      "fr": {
        "title": "ARN des répétitions Ty et variabilité d’expression",
        "question": "La variation intercellulaire des ARN de familles Ty dépend-elle de la souche, du cycle et du stress ?",
        "goal": "La variation intercellulaire des ARN de familles Ty dépend-elle de la souche, du cycle et du stress ?",
        "method": "Construire un assay de familles Ty à partir du BAM conservant les alignements multiples, puis comparer distributions intra-état et sensibilité aux affectations.",
        "statisticalUnit": "Les cultures indépendantes fondent l’inférence entre groupes ; les classes d’équivalence moléculaire servent à auditer les comptages.",
        "interpretationBoundary": "Rapporter l’hétérogénéité des ARN Ty ; transposition, sites d’insertion et nombre de copies d’ADN exigent des preuves distinctes."
      },
      "es": {
        "title": "ARN de repeticiones Ty y variabilidad de expresión",
        "question": "¿La variación celular del ARN de familias Ty cambia con la cepa, el ciclo y el estrés?",
        "goal": "¿La variación celular del ARN de familias Ty cambia con la cepa, el ciclo y el estrés?",
        "method": "Crear un ensayo separado de familias Ty desde BAM que conserve alineamientos múltiples y comparar distribuciones intraestado y sensibilidad a las asignaciones.",
        "statisticalUnit": "Los cultivos independientes sustentan la inferencia entre grupos; las clases de equivalencia molecular permiten auditar recuentos.",
        "interpretationBoundary": "Informar heterogeneidad del ARN Ty; transposición, inserciones y copias de ADN requieren evidencia específica."
      },
      "eu": {
        "title": "Ty errepikapenen RNA eta adierazpen-aldakortasuna",
        "question": "Ty familien RNAren zelulen arteko aldakortasuna anduiaren, zikloaren eta estresaren arabera aldatzen al da?",
        "goal": "Ty familien RNAren zelulen arteko aldakortasuna anduiaren, zikloaren eta estresaren arabera aldatzen al da?",
        "method": "Sortu Ty familien assay bereizia lerrokatze anitzak gordetzen dituen BAMetik; alderatu egoera barruko banaketak eta esleipenen sentikortasuna.",
        "statisticalUnit": "Kultura independenteek taldeen arteko inferentzia sostengatzen dute; molekula-baliokidetasun klaseek zenbaketen auditoria ahalbidetzen dute.",
        "interpretationBoundary": "Eman Ty RNAren heterogeneotasuna; transposizioak, txertaketa-guneek eta DNA kopia-kopuruak ebidentzia bereizia behar dute."
      }
    },
    "between_strain_state_variance": {
      "en": {
        "title": "Shared and state-specific components of between-strain variation",
        "question": "Which genes show between-strain differences only in particular cell states?",
        "goal": "Which genes show between-strain differences only in particular cell states?",
        "method": "Estimate strain/culture-by-state expression means and sampling variances, then separate shared and state-specific between-sample variation.",
        "statisticalUnit": "Samples or strains are inference units; cells estimate means and sampling error.",
        "interpretationBoundary": "Report between-strain variance of means separately from within-strain noise and genotype-explained heritability."
      },
      "fr": {
        "title": "Composantes partagées et spécifiques aux états de la variation entre souches",
        "question": "Quels gènes présentent des différences entre souches dans certains états seulement ?",
        "goal": "Quels gènes présentent des différences entre souches dans certains états seulement ?",
        "method": "Estimer moyennes et variances d’échantillonnage par souche/culture et état, puis séparer les variations interéchantillon partagées et spécifiques.",
        "statisticalUnit": "Échantillons ou souches sont les unités d’inférence ; les cellules estiment moyennes et erreur d’échantillonnage.",
        "interpretationBoundary": "Rapporter séparément variance des moyennes entre souches, bruit intrasouche et héritabilité expliquée par les génotypes."
      },
      "es": {
        "title": "Componentes compartidos y específicos de estado de la variación entre cepas",
        "question": "¿Qué genes muestran diferencias entre cepas solo en determinados estados celulares?",
        "goal": "¿Qué genes muestran diferencias entre cepas solo en determinados estados celulares?",
        "method": "Estimar medias y varianzas de muestreo por cepa/cultivo y estado; separar variación entre muestras compartida y específica.",
        "statisticalUnit": "Muestras o cepas son unidades de inferencia; las células estiman medias y error de muestreo.",
        "interpretationBoundary": "Separar varianza de medias entre cepas, ruido intracepa y heredabilidad explicada por genotipos."
      },
      "eu": {
        "title": "Anduien arteko aldakortasunaren osagai partekatuak eta egoera-espezifikoak",
        "question": "Zein genek erakusten dituzte anduien arteko aldeak zelula-egoera jakinetan soilik?",
        "goal": "Zein genek erakusten dituzte anduien arteko aldeak zelula-egoera jakinetan soilik?",
        "method": "Estimatu andui/kultura eta egoera bakoitzeko batezbestekoak eta laginketa-bariantzak; bereizi laginen arteko osagai partekatuak eta espezifikoak.",
        "statisticalUnit": "Laginak edo anduiak dira inferentzia-unitateak; zelulek batezbestekoak eta laginketa-errorea estimatzen dituzte.",
        "interpretationBoundary": "Bereiz eman anduien batezbestekoen bariantza, andui barruko zarata eta genotipoek azaldutako heredagarritasuna."
      }
    },
    "cross_state_coordination": {
      "en": {
        "title": "Coordinated programs across states within cultures",
        "question": "Do G1, replication, division or stress states within a culture share strain-associated expression programs?",
        "goal": "Do G1, replication, division or stress states within a culture share strain-associated expression programs?",
        "method": "Link programs across states using independent cultures as the shared index, then test transfer to held-out strains.",
        "statisticalUnit": "Pair at culture level and hold out by strain; do not pair individual cells across states.",
        "interpretationBoundary": "Cross-state coordination is an observational association and does not establish cell–cell communication."
      },
      "fr": {
        "title": "Programmes coordonnés entre états d’une même culture",
        "question": "Les états G1, réplication, division ou stress d’une culture partagent-ils des programmes associés à la souche ?",
        "goal": "Les états G1, réplication, division ou stress d’une culture partagent-ils des programmes associés à la souche ?",
        "method": "Relier les programmes entre états par l’index commun des cultures indépendantes, puis tester sur des souches réservées.",
        "statisticalUnit": "Apparier au niveau culture, réserver par souche ; ne pas apparier les cellules individuellement entre états.",
        "interpretationBoundary": "La coordination entre états est une association observationnelle, sans preuve directe de communication cellulaire."
      },
      "es": {
        "title": "Programas coordinados entre estados del mismo cultivo",
        "question": "¿Los estados G1, replicación, división o estrés de un cultivo comparten programas asociados a la cepa?",
        "goal": "¿Los estados G1, replicación, división o estrés de un cultivo comparten programas asociados a la cepa?",
        "method": "Vincular programas entre estados mediante cultivos independientes como índice común y probar en cepas reservadas.",
        "statisticalUnit": "Emparejar por cultivo y reservar por cepa; no emparejar células individuales entre estados.",
        "interpretationBoundary": "La coordinación entre estados es una asociación observacional y no demuestra comunicación celular."
      },
      "eu": {
        "title": "Kultura barruko egoeren arteko programa koordinatuak",
        "question": "Kultura bateko G1, erreplikazio, zatiketa edo estres egoerek anduiarekin lotutako programak partekatzen al dituzte?",
        "goal": "Kultura bateko G1, erreplikazio, zatiketa edo estres egoerek anduiarekin lotutako programak partekatzen al dituzte?",
        "method": "Lotu egoeren programak kultura independenteen indize komunaren bidez; probatu erreserbatutako anduietan.",
        "statisticalUnit": "Parekatu kultura mailan eta erreserbatu anduika; ez parekatu banakako zelulak egoeren artean.",
        "interpretationBoundary": "Egoeren arteko koordinazioa behaketa-elkartea da, eta ez du zelulen arteko komunikazioa frogatzen."
      }
    },
    "velocity_modules": {
      "en": {
        "title": "RNA kinetic modules and expression noise",
        "question": "Do genes with sufficient splicing evidence form stable kinetic modules whose changes accompany altered noise?",
        "goal": "Do genes with sufficient splicing evidence form stable kinetic modules whose changes accompany altered noise?",
        "method": "Fit modular velocity models on splice-supported genes and compare posterior uncertainty and cycle direction.",
        "statisticalUnit": "Cultures and strains support replication; cells provide state and splicing counts.",
        "interpretationBoundary": "Modules describe dynamics supported by measured splicing; latent time is not evolutionary time."
      },
      "fr": {
        "title": "Modules cinétiques d’ARN et bruit d’expression",
        "question": "Les gènes suffisamment couverts en épissage forment-ils des modules cinétiques stables associés aux variations du bruit ?",
        "goal": "Les gènes suffisamment couverts en épissage forment-ils des modules cinétiques stables associés aux variations du bruit ?",
        "method": "Ajuster des modèles modulaires de vitesse aux gènes soutenus par l’épissage et comparer incertitude a posteriori et direction du cycle.",
        "statisticalUnit": "Cultures et souches assurent la réplication ; les cellules fournissent états et comptages d’épissage.",
        "interpretationBoundary": "Les modules décrivent la dynamique soutenue par l’épissage mesuré ; le temps latent n’est pas un temps évolutif."
      },
      "es": {
        "title": "Módulos cinéticos de ARN y ruido de expresión",
        "question": "¿Los genes con evidencia suficiente de empalme forman módulos cinéticos estables cuyos cambios acompañan cambios de ruido?",
        "goal": "¿Los genes con evidencia suficiente de empalme forman módulos cinéticos estables cuyos cambios acompañan cambios de ruido?",
        "method": "Ajustar modelos modulares de velocidad en genes respaldados por empalme y comparar incertidumbre posterior y dirección del ciclo.",
        "statisticalUnit": "Cultivos y cepas permiten replicación; las células aportan estados y recuentos de empalme.",
        "interpretationBoundary": "Los módulos representan dinámica respaldada por empalme medido; el tiempo latente no es tiempo evolutivo."
      },
      "eu": {
        "title": "RNAren modulu zinetikoak eta adierazpen-zarata",
        "question": "Splicing-ebidentzia nahikoa duten geneek zarata-aldaketekin lotutako modulu zinetiko egonkorrak osatzen al dituzte?",
        "goal": "Splicing-ebidentzia nahikoa duten geneek zarata-aldaketekin lotutako modulu zinetiko egonkorrak osatzen al dituzte?",
        "method": "Doitu abiadura-eredu modularrak splicing-euskarria duten geneetan; alderatu posteriorreko ziurgabetasuna eta zikloaren norabidea.",
        "statisticalUnit": "Kulturek eta anduiek erreplikazioa sostengatzen dute; zelulek egoerak eta splicing-zenbaketak ematen dituzte.",
        "interpretationBoundary": "Moduluek neurtutako splicing-ak sostengatutako dinamika deskribatzen dute; denbora latentea ez da denbora ebolutiboa."
      }
    },
    "regulatory_evidence_layers": {
      "en": {
        "title": "Regulatory evidence from binding, perturbation and coexpression",
        "question": "Are noise-associated network edges supported by TF binding, depletion responses or coexpression?",
        "goal": "Are noise-associated network edges supported by TF binding, depletion responses or coexpression?",
        "method": "Use yeast TF binding and rapid-depletion data to build condition-specific signed prior layers, then compare networks and noise candidates.",
        "statisticalUnit": "Retain conditions on TF–target edges; assess transfer using held-out cultures, strains or independent evidence.",
        "interpretationBoundary": "Assign activation or repression to specific edges and contexts; a binding site alone does not establish functional regulation."
      },
      "fr": {
        "title": "Preuves de régulation : liaison, perturbation et coexpression",
        "question": "Les arêtes associées au bruit sont-elles soutenues par liaison des TF, réponse à leur déplétion ou coexpression ?",
        "goal": "Les arêtes associées au bruit sont-elles soutenues par liaison des TF, réponse à leur déplétion ou coexpression ?",
        "method": "Utiliser liaison des TF et déplétion rapide chez la levure pour construire des a priori signés par condition, puis comparer réseaux et candidats du bruit.",
        "statisticalUnit": "Conserver les conditions des arêtes TF–cible ; tester le transfert avec cultures, souches ou preuves indépendantes réservées.",
        "interpretationBoundary": "Attribuer activation ou répression aux arêtes et contextes précis ; un site de liaison seul ne prouve pas une régulation fonctionnelle."
      },
      "es": {
        "title": "Evidencia reguladora: unión, perturbación y coexpresión",
        "question": "¿Las aristas asociadas al ruido se respaldan por unión de TF, respuesta a depleción o coexpresión?",
        "goal": "¿Las aristas asociadas al ruido se respaldan por unión de TF, respuesta a depleción o coexpresión?",
        "method": "Usar unión de TF y depleción rápida en levadura para construir priors con signo por condición y comparar redes y candidatos de ruido.",
        "statisticalUnit": "Conservar condiciones de aristas TF–diana; probar transferencia con cultivos, cepas o evidencia independiente reservados.",
        "interpretationBoundary": "Asignar activación o represión a aristas y contextos concretos; un sitio de unión no demuestra regulación funcional."
      },
      "eu": {
        "title": "Erregulazio-ebidentzia: lotura, perturbazioa eta koespresioa",
        "question": "Zaratarekin lotutako ertzak TF loturak, deplezio-erantzunak edo koespresioak sostengatzen al dituzte?",
        "goal": "Zaratarekin lotutako ertzak TF loturak, deplezio-erantzunak edo koespresioak sostengatzen al dituzte?",
        "method": "Erabili legamiaren TF lotura eta deplezio azkarreko datuak baldintzako zeinudun aurretikoak eraikitzeko; alderatu sareak eta zarata-hautagaiak.",
        "statisticalUnit": "Gorde TF-helburu ertzen baldintzak; ebaluatu transferentzia erreserbatutako kultura, andui edo ebidentzia independenteekin.",
        "interpretationBoundary": "Esleitu aktibazioa edo errepresioa ertz eta testuinguru jakinei; lotura-gune batek bakarrik ez du erregulazio funtzionala frogatzen."
      }
    },
    "count_mean_qtl_comparator": {
      "en": {
        "title": "Appendix: count mean-eQTL versus noise-QTL",
        "question": "Can genetic effects on the mean and count sampling explain candidate noise effects?",
        "goal": "Can genetic effects on the mean and count sampling explain candidate noise effects?",
        "method": "With matched genotypes, estimate mean-eQTL from within-state sum counts and compare kinship models and noise traits.",
        "statisticalUnit": "Genotyped strains or samples are units; cells within a strain are not independent genotype replicates.",
        "interpretationBoundary": "jaxQTL mean associations and NB dispersion cannot replace differential-noise or noise-QTL tests."
      },
      "fr": {
        "title": "Annexe : eQTL de moyenne des comptages et QTL du bruit",
        "question": "Les effets génétiques sur la moyenne et l’échantillonnage expliquent-ils les effets candidats sur le bruit ?",
        "goal": "Les effets génétiques sur la moyenne et l’échantillonnage expliquent-ils les effets candidats sur le bruit ?",
        "method": "Avec génotypes appariés, estimer les eQTL de moyenne à partir des sommes intra-état, puis comparer modèles de parenté et caractères de bruit.",
        "statisticalUnit": "Les unités sont les souches ou échantillons génotypés ; leurs cellules ne sont pas des répétitions génotypiques indépendantes.",
        "interpretationBoundary": "Les associations de moyenne et la dispersion NB de jaxQTL ne remplacent pas les tests de bruit différentiel ou de QTL du bruit."
      },
      "es": {
        "title": "Apéndice: eQTL de medias de recuentos frente a QTL de ruido",
        "question": "¿Los efectos genéticos sobre la media y el muestreo explican los efectos candidatos de ruido?",
        "goal": "¿Los efectos genéticos sobre la media y el muestreo explican los efectos candidatos de ruido?",
        "method": "Con genotipos emparejados, estimar eQTL de medias mediante sumas intraestado y comparar modelos de parentesco y rasgos de ruido.",
        "statisticalUnit": "Las unidades son cepas o muestras genotipadas; sus células no son réplicas genotípicas independientes.",
        "interpretationBoundary": "Las asociaciones de media y dispersión NB de jaxQTL no sustituyen pruebas de ruido diferencial ni QTL de ruido."
      },
      "eu": {
        "title": "Eranskina: zenbaketen batezbesteko eQTLak eta zarata-QTLak",
        "question": "Batezbestekoaren efektu genetikoek eta zenbaketen laginketak azaltzen al dituzte zarata-hautagaien efektuak?",
        "goal": "Batezbestekoaren efektu genetikoek eta zenbaketen laginketak azaltzen al dituzte zarata-hautagaien efektuak?",
        "method": "Genotipo parekatuekin, estimatu batezbesteko eQTLak egoera barruko zenbaketa-baturetatik; alderatu ahaidetasun-ereduak eta zarata-ezaugarriak.",
        "statisticalUnit": "Genotipatutako anduiak edo laginak dira unitateak; andui barruko zelulak ez dira genotipo-erreplika independenteak.",
        "interpretationBoundary": "jaxQTLren batezbesteko-elkarteek eta NB dispertsioak ez dituzte zarata diferentzialaren edo zarata-QTLen probak ordezkatzen."
      }
    },
    "mechanistic_noise_benchmark": {
      "en": {
        "title": "Synthetic ground truth for bursts and network mechanisms",
        "question": "Can current noise and network methods recover changes generated by known mechanisms?",
        "goal": "Can current noise and network methods recover changes generated by known mechanisms?",
        "method": "Simulate known networks and burst parameters, add capture and background, then compare noise effects, intervals and false edges.",
        "statisticalUnit": "Use independent simulation scenarios and seeds; store mechanistic and measurement truth separately.",
        "interpretationBoundary": "This branch calibrates methods; simulated networks and latent proteins are not experimental findings."
      },
      "fr": {
        "title": "Vérité simulée pour les bouffées et mécanismes de réseau",
        "question": "Les méthodes de bruit et de réseau retrouvent-elles les changements produits par des mécanismes connus ?",
        "goal": "Les méthodes de bruit et de réseau retrouvent-elles les changements produits par des mécanismes connus ?",
        "method": "Simuler réseaux et paramètres de bouffées connus, ajouter capture et fond, puis comparer effets de bruit, intervalles et fausses arêtes.",
        "statisticalUnit": "Utiliser scénarios et graines indépendants ; conserver séparément vérités mécaniste et de mesure.",
        "interpretationBoundary": "Cette branche calibre les méthodes ; réseaux simulés et protéines latentes ne sont pas des résultats expérimentaux."
      },
      "es": {
        "title": "Verdad sintética para ráfagas y mecanismos de red",
        "question": "¿Los métodos de ruido y redes recuperan cambios generados por mecanismos conocidos?",
        "goal": "¿Los métodos de ruido y redes recuperan cambios generados por mecanismos conocidos?",
        "method": "Simular redes y ráfagas conocidas, añadir captura y fondo, y comparar efectos de ruido, intervalos y aristas falsas.",
        "statisticalUnit": "Usar escenarios y semillas independientes; guardar por separado verdades mecanística y de medición.",
        "interpretationBoundary": "Esta rama calibra métodos; redes simuladas y proteínas latentes no son hallazgos experimentales."
      },
      "eu": {
        "title": "Leherketen eta sare-mekanismoen egia sintetikoa",
        "question": "Egungo zarata- eta sare-metodoek mekanismo ezagunek sortutako aldaketak berreskuratzen al dituzte?",
        "goal": "Egungo zarata- eta sare-metodoek mekanismo ezagunek sortutako aldaketak berreskuratzen al dituzte?",
        "method": "Simulatu sare eta leherketa-parametro ezagunak, gehitu harrapaketa eta hondoa, eta alderatu zarata-efektuak, tarteak eta ertz faltsuak.",
        "statisticalUnit": "Erabili simulazio-eszenatoki eta hazi independenteak; gorde bereiz mekanismoaren eta neurketaren egiak.",
        "interpretationBoundary": "Adar honek metodoak kalibratzen ditu; sare simulatuak eta proteina latenteak ez dira aurkikuntza esperimentalak."
      }
    },
    "temporal_mechanistic_grn": {
      "en": {
        "title": "Appendix: executable networks and virtual interventions from timed snapshots",
        "question": "With real times and rate priors, which mechanistic networks regenerate RNA distributions and predict held-out conditions?",
        "goal": "With real times and rate priors, which mechanistic networks regenerate RNA distributions and predict held-out conditions?",
        "method": "Fit networks and time trajectories with CardamomOT, evaluate regeneration first, then virtual perturbations and kinetic-prior sensitivity.",
        "statisticalUnit": "Use independent cultures and actual sampling times; hold out whole cultures or time points.",
        "interpretationBoundary": "If only one time point is available, keep this as a plan until time series and kinetic priors are supplied; real perturbations validate extrapolation."
      },
      "fr": {
        "title": "Annexe : réseaux exécutables et interventions virtuelles à partir d’instantanés temporels",
        "question": "Avec temps réels et a priori de vitesse, quels réseaux régénèrent les distributions d’ARN et prédisent les conditions réservées ?",
        "goal": "Avec temps réels et a priori de vitesse, quels réseaux régénèrent les distributions d’ARN et prédisent les conditions réservées ?",
        "method": "Ajuster réseaux et trajectoires avec CardamomOT, vérifier d’abord la régénération, puis perturbations virtuelles et sensibilité aux a priori cinétiques.",
        "statisticalUnit": "Utiliser cultures indépendantes et temps réels ; réserver cultures ou points temporels entiers.",
        "interpretationBoundary": "Si un seul temps est disponible, conserver ce plan jusqu’à l’ajout de séries temporelles et d’a priori cinétiques ; les perturbations réelles valident l’extrapolation."
      },
      "es": {
        "title": "Apéndice: redes ejecutables e intervenciones virtuales desde instantáneas temporales",
        "question": "Con tiempos reales y priors de tasas, ¿qué redes regeneran distribuciones de ARN y predicen condiciones reservadas?",
        "goal": "Con tiempos reales y priors de tasas, ¿qué redes regeneran distribuciones de ARN y predicen condiciones reservadas?",
        "method": "Ajustar redes y trayectorias con CardamomOT, evaluar primero regeneración y después perturbaciones virtuales y sensibilidad a priors cinéticos.",
        "statisticalUnit": "Usar cultivos independientes y tiempos reales; reservar cultivos o puntos temporales completos.",
        "interpretationBoundary": "Si solo hay un tiempo, mantenerlo como plan hasta disponer de series temporales y priors cinéticos; perturbaciones reales validan extrapolación."
      },
      "eu": {
        "title": "Eranskina: denborazko argazkien sare exekutagarriak eta esku-hartze birtualak",
        "question": "Benetako denborekin eta tasa-aurretikoekin, zein sarek birsortzen dituzte RNA-banaketak eta aurresaten erreserbatutako baldintzak?",
        "goal": "Benetako denborekin eta tasa-aurretikoekin, zein sarek birsortzen dituzte RNA-banaketak eta aurresaten erreserbatutako baldintzak?",
        "method": "Doitu sareak eta denborazko ibilbideak CardamomOTrekin; ebaluatu lehenik birsorkuntza, gero perturbazio birtualak eta aurretiko zinetikoen sentikortasuna.",
        "statisticalUnit": "Erabili kultura independenteak eta benetako laginketa-denborak; erreserbatu kultura edo denbora-puntu osoak.",
        "interpretationBoundary": "Denbora-puntu bakarra badago, gorde plan gisa denbora-serieak eta aurretiko zinetikoak lortu arte; benetako perturbazioek estrapolazioa baliozkotzen dute."
      }
    }
  }
};
window.YV_CONTENT=window.YV_CONTENT||{};
for(const [type,rows] of Object.entries(content)){
  window.YV_CONTENT[type]=window.YV_CONTENT[type]||{};
  for(const [id,langs] of Object.entries(rows)){
    const target=window.YV_CONTENT[type][id]=window.YV_CONTENT[type][id]||{};
    for(const [lang,fields] of Object.entries(langs)){
      target[lang]=Object.assign(target[lang]||{},fields);
    }
  }
}
})();
