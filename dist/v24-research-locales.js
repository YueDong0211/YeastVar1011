'use strict';
// Verified v24 methods and project-audit definitions; Chinese source text is in the data catalogue.
(()=>{const text={
  "未剪接层必须具有可评估的独立分子支持；不以GeneFull−Gene代替。": {
    "en": "Unspliced layers need assessable independent molecule support; do not substitute GeneFull minus Gene.",
    "fr": "Les couches non épissées exigent un support moléculaire indépendant évaluable ; ne pas les remplacer par GeneFull moins Gene.",
    "es": "Las capas no empalmadas necesitan respaldo molecular independiente evaluable; no sustituirlas por GeneFull menos Gene.",
    "eu": "Splicing gabeko geruzek molekula independenteen euskarri ebaluagarria behar dute; ez erabili GeneFull ken Gene ordez."
  },
  "无独立时间校准时，速率以模型参照单位解释；拟合参数不自动构成绝对转录速率或纯内在噪音。": {
    "en": "Without independent time calibration, interpret rates in model reference units; fitted parameters do not automatically establish absolute transcription rates or purely intrinsic noise.",
    "fr": "Sans étalonnage temporel indépendant, interpréter les vitesses dans les unités de référence du modèle ; les paramètres ajustés ne démontrent pas automatiquement des vitesses absolues ni un bruit purement intrinsèque.",
    "es": "Sin calibración temporal independiente, interpretar las tasas en unidades de referencia del modelo; los parámetros ajustados no establecen automáticamente tasas absolutas ni ruido puramente intrínseco.",
    "eu": "Denbora-kalibrazio independenterik gabe, interpretatu tasak ereduaren erreferentzia-unitateetan; doitutako parametroek ez dituzte berez transkripzio-tasa absolutuak edo barne-zarata hutsa ezartzen."
  },
  "项目审计定义；所列函数提供原始结果，导出字段由项目汇总，不是工具原生同名指标。": {
    "en": "Project audit definition: listed functions supply native results; export fields are project summaries, not same-named native tool metrics.",
    "fr": "Définition d’audit du projet : les fonctions fournissent les résultats natifs ; les champs exportés sont des synthèses du projet, pas des mesures natives homonymes.",
    "es": "Definición de auditoría del proyecto: las funciones aportan resultados originales; los campos exportados son resúmenes del proyecto, no métricas nativas homónimas.",
    "eu": "Proiektuaren auditoretza-definizioa: funtzioek jatorrizko emaitzak ematen dituzte; esportazio-eremuak proiektuaren laburpenak dira, ez tresnaren izen bereko neurriak."
  },
  "按字段分别报告": {
    "en": "Report units per field",
    "fr": "Indiquer les unités par champ",
    "es": "Indicar unidades por campo",
    "eu": "Adierazi unitateak eremu bakoitzean"
  },
  "菌株×培养×状态×模型": {
    "en": "Strain × culture × state × model",
    "fr": "Souche × culture × état × modèle",
    "es": "Cepa × cultivo × estado × modelo",
    "eu": "Anduia × kultura × egoera × eredua"
  },
  "联合拟合转录随机过程与RNA采样模型": {
    "en": "Jointly fit stochastic transcription and RNA sampling models",
    "fr": "Ajuster conjointement transcription stochastique et échantillonnage de l’ARN",
    "es": "Ajustar conjuntamente transcripción estocástica y muestreo de ARN",
    "eu": "Doitu batera transkripzio estokastikoa eta RNA-laginketaren ereduak"
  },
  "匹配细胞和基因轴的原始整数S/U层": {
    "en": "Raw integer S/U layers with matched cell and gene axes",
    "fr": "Couches S/U entières brutes avec axes cellulaires et géniques concordants",
    "es": "Capas S/U enteras originales con ejes celulares y génicos coincidentes",
    "eu": "Zelula- eta gene-ardatz parekatuak dituzten S/U geruza oso gordinak"
  },
  "版本化基因长度及其计算规则": {
    "en": "Versioned gene lengths and their calculation rule",
    "fr": "Longueurs géniques versionnées et règle de calcul",
    "es": "Longitudes génicas versionadas y regla de cálculo",
    "eu": "Bertsionatutako gene-luzerak eta kalkulu-araua"
  },
  "菌株、独立培养及状态分层": {
    "en": "Strain, independent-culture and state strata",
    "fr": "Strates de souche, culture indépendante et état",
    "es": "Estratos de cepa, cultivo independiente y estado",
    "eu": "Anduiaren, kultura independentearen eta egoeraren geruzak"
  },
  "转录及采样参数、似然和拟合分布": {
    "en": "Transcription and sampling parameters, likelihoods and fitted distributions",
    "fr": "Paramètres de transcription et d’échantillonnage, vraisemblances et distributions ajustées",
    "es": "Parámetros de transcripción y muestreo, verosimilitudes y distribuciones ajustadas",
    "eu": "Transkripzio- eta laginketa-parametroak, egiantzekotasunak eta doitutako banaketak"
  },
  "参数标准误、采样景观及重抽样诊断": {
    "en": "Parameter standard errors, sampling landscapes and resampling diagnostics",
    "fr": "Erreurs standards, surfaces d’échantillonnage et diagnostics de rééchantillonnage",
    "es": "Errores estándar, superficies de muestreo y diagnósticos de remuestreo",
    "eu": "Parametroen errore estandarrak, laginketa-paisaiak eta birlaginketa-diagnostikoak"
  },
  "生物过程与测量过程分别选择": {
    "en": "Choose biological and measurement processes separately",
    "fr": "Choisir séparément processus biologique et mesure",
    "es": "Elegir por separado los procesos biológico y de medición",
    "eu": "Aukeratu bereiz prozesu biologikoa eta neurketa-prozesua"
  },
  "依固定软件版本比较Bursty、Constitutive等生物模型与None、Bernoulli、Poisson采样模型；只使用该版本实际支持的组合。": {
    "en": "In a pinned release, compare supported biological models such as Bursty and Constitutive with None, Bernoulli or Poisson sampling models; use only combinations supported by that release.",
    "fr": "Dans une version figée, comparer les modèles biologiques disponibles, dont Bursty et Constitutive, aux modèles d’échantillonnage None, Bernoulli ou Poisson ; utiliser uniquement les combinaisons prises en charge.",
    "es": "En una versión fijada, comparar modelos biológicos disponibles como Bursty y Constitutive con muestreo None, Bernoulli o Poisson; usar solo combinaciones compatibles.",
    "eu": "Bertsio finko batean, alderatu Bursty eta Constitutive bezalako eredu biologiko bateragarriak None, Bernoulli edo Poisson laginketarekin; erabili bertsio horrek onartzen dituen konbinazioak soilik."
  },
  "未剪接捕获是否依赖基因长度": {
    "en": "Whether unspliced capture depends on gene length",
    "fr": "Dépendance de la capture non épissée à la longueur génique",
    "es": "Dependencia de la captura no empalmada respecto a la longitud génica",
    "eu": "Splicing gabeko harrapaketa gene-luzeraren araberakoa den"
  },
  "从相同参考生成长度表；记录长度定义，并比较启用与关闭use_lengths的结果。": {
    "en": "Generate lengths from the same reference, record the length definition and compare use_lengths enabled versus disabled.",
    "fr": "Calculer les longueurs depuis la même référence, consigner leur définition et comparer use_lengths activé ou désactivé.",
    "es": "Generar longitudes desde la misma referencia, registrar su definición y comparar use_lengths activado y desactivado.",
    "eu": "Sortu luzerak erreferentzia beretik, erregistratu definizioa eta alderatu use_lengths aktibatuta eta desaktibatuta."
  },
  "物理及采样参数搜索范围": {
    "en": "Search bounds for physical and sampling parameters",
    "fr": "Bornes de recherche des paramètres physiques et d’échantillonnage",
    "es": "Límites de búsqueda de parámetros físicos y de muestreo",
    "eu": "Parametro fisikoen eta laginketakoen bilaketa-mugak"
  },
  "按可辨识性与酵母计数范围设定phys_lb/phys_ub、samp_lb/samp_ub及gridsize；保存边界解并扩大合理范围复核。": {
    "en": "Set phys_lb/phys_ub, samp_lb/samp_ub and gridsize using identifiability and yeast count ranges; retain boundary fits and reassess plausible expanded bounds.",
    "fr": "Définir phys_lb/phys_ub, samp_lb/samp_ub et gridsize selon l’identifiabilité et les comptes de levure ; conserver les solutions aux bornes et tester des limites élargies plausibles.",
    "es": "Definir phys_lb/phys_ub, samp_lb/samp_ub y gridsize según identificabilidad y rangos de conteo de levadura; conservar ajustes en los límites y revisar rangos ampliados plausibles.",
    "eu": "Ezarri phys_lb/phys_ub, samp_lb/samp_ub eta gridsize identifikagarritasunaren eta legamiaren kontaketaren arabera; gorde mugako doikuntzak eta berrikusi muga zabaldu sinesgarriak."
  },
  "共同可分析基因与分层方式": {
    "en": "Common analyzable genes and stratification",
    "fr": "Gènes analysables communs et stratification",
    "es": "Genes analizables comunes y estratificación",
    "eu": "Azter daitezkeen gene komunak eta estratifikazioa"
  },
  "比较组使用同一基因集合；报告被剔除基因及内含子基因的功能偏倚，培养重复分别拟合或分层重抽样。": {
    "en": "Use a common gene set across comparisons; report excluded genes and functional bias among intron-bearing genes, with separate culture fits or hierarchical resampling.",
    "fr": "Utiliser des gènes communs aux comparaisons ; documenter exclusions et biais fonctionnel des gènes à introns, avec ajustements par culture ou rééchantillonnage hiérarchique.",
    "es": "Usar genes comunes entre comparaciones; informar exclusiones y sesgo funcional de genes con intrones, con ajustes por cultivo o remuestreo jerárquico.",
    "eu": "Erabili gene multzo bera konparazioetan; adierazi baztertutako geneak eta introndun geneen funtzio-alborapena, kultura bakoitzeko doikuntzekin edo birlaginketa hierarkikoarekin."
  },
  "这是基于一般单细胞RNA数据的机制方法；酵母内含子少，须先通过S/U信息量、测量模型和参数可辨识性检查。": {
    "en": "This mechanistic method uses general single-cell RNA data; sparse yeast introns require prior checks of S/U information, measurement models and parameter identifiability.",
    "fr": "Cette méthode mécaniste utilise des données d’ARN unicellulaire générales ; la rareté des introns de levure exige des contrôles préalables de l’information S/U, de la mesure et de l’identifiabilité.",
    "es": "Este método mecanístico usa datos generales de ARN unicelular; la escasez de intrones en levadura exige revisar información S/U, medición e identificabilidad.",
    "eu": "Metodo mekanistiko honek zelula bakarreko RNA datu orokorrak erabiltzen ditu; legamiaren intron eskasek S/U informazioa, neurketa-ereduak eta identifikagarritasuna aurrez egiaztatzea eskatzen dute."
  },
  "对有效上游检验进行基因级筛选与分阶段多重校正": {
    "en": "Gene-level screening and stage-wise adjustment of valid upstream tests",
    "fr": "Criblage génique et correction par étapes de tests amont valides",
    "es": "Cribado génico y ajuste por etapas de pruebas previas válidas",
    "eu": "Baliozko aurreko testen gene-mailako baheketa eta etapazko doikuntza"
  },
  "stageR是检验结果后处理，不估计表达噪音；迁移到噪音对比须先校准上游p值及筛选—确认的逻辑关系。": {
    "en": "stageR post-processes test results and does not estimate expression noise; applying it to noise contrasts requires calibrated upstream p-values and justified screening/confirmation logic.",
    "fr": "stageR traite les résultats de tests sans estimer le bruit d’expression ; son adaptation aux contrastes de bruit exige des valeurs p calibrées et une logique de criblage/confirmation justifiée.",
    "es": "stageR procesa resultados de pruebas y no estima ruido de expresión; aplicarlo a contrastes de ruido exige valores p calibrados y una lógica de cribado/confirmación justificada.",
    "eu": "stageRk testen emaitzak prozesatzen ditu, ez adierazpen-zarata estimatzen; zarata-kontrasteetan erabiltzeko aurreko p-balio kalibratuak eta baheketa/berrespen logika justifikatua behar dira."
  },
  "具名pScreen向量与同基因顺序的pConfirmation矩阵；列为预设对比，附原假设、统计单位和检验状态。": {
    "en": "Named pScreen vector and pConfirmation matrix in identical gene order; columns are prespecified contrasts with null hypotheses, inference units and test-status records.",
    "fr": "Vecteur pScreen nommé et matrice pConfirmation dans le même ordre génique ; colonnes de contrastes prédéfinis avec hypothèses nulles, unités et états des tests.",
    "es": "Vector pScreen con nombres y matriz pConfirmation con idéntico orden génico; columnas de contrastes predefinidos con hipótesis nulas, unidades y estados de prueba.",
    "eu": "pScreen bektore izendatua eta gene-ordena bereko pConfirmation matrizea; zutabeetan aurrez zehaztutako kontrasteak, hipotesi nuluak, unitateak eta test-egoerak."
  },
  "未评估、拟合失败、筛选未通过和真实不显著分别编码；不把缺失p值填成0或将所有缺失混作不显著。": {
    "en": "Encode not evaluated, fit failed, screening not passed and assessed nonsignificance separately; do not replace missing p-values with zero or collapse all missing states into nonsignificance.",
    "fr": "Distinguer non évalué, échec d’ajustement, criblage non passé et non-significativité évaluée ; ne pas remplacer les valeurs p manquantes par zéro ni les confondre.",
    "es": "Distinguir no evaluado, fallo de ajuste, cribado no superado y no significación evaluada; no reemplazar valores p ausentes por cero ni confundir esos estados.",
    "eu": "Bereizi ebaluatu gabea, doikuntza-hutsegitea, baheketa gainditu gabea eta ebaluatutako ez-esangura; ez ordeztu falta diren p-balioak zeroz eta ez nahasi egoerak."
  },
  "预先定义基因、状态、对比和估计对象组成的检验家族；探索性QC方案不按最小p值合并进入主家族。": {
    "en": "Prespecify the testing family over genes, states, contrasts and estimands; do not merge exploratory QC branches into the primary family by selecting minimum p-values.",
    "fr": "Prédéfinir la famille sur gènes, états, contrastes et objets estimés ; ne pas fusionner les branches QC exploratoires selon la valeur p minimale.",
    "es": "Predefinir la familia por genes, estados, contrastes y estimandos; no combinar ramas QC exploratorias eligiendo el menor valor p.",
    "eu": "Aurrez definitu geneen, egoeren, kontrasteen eta estimandoen test-familia; ez batu QC esplorazioko adarrak p-balio txikiena aukeratuz."
  },
  "基因筛选与对比确认的调整p值及状态": {
    "en": "Adjusted p-values and statuses for gene screening and contrast confirmation",
    "fr": "Valeurs p ajustées et états du criblage génique et de la confirmation",
    "es": "Valores p ajustados y estados de cribado génico y confirmación",
    "eu": "Gene-baheketaren eta kontraste-berrespenaren p-balio doituak eta egoerak"
  },
  "筛选和确认检验的输入及轴顺序": {
    "en": "Screening/confirmation inputs and axis order",
    "fr": "Entrées de criblage/confirmation et ordre des axes",
    "es": "Entradas de cribado/confirmación y orden de ejes",
    "eu": "Baheketa/berrespen sarrerak eta ardatzen ordena"
  },
  "筛选p值是否已经校正": {
    "en": "Whether screening p-values are already adjusted",
    "fr": "Correction préalable des valeurs p de criblage",
    "es": "Si los valores p de cribado ya están ajustados",
    "eu": "Baheketako p-balioak aurrez doituta dauden"
  },
  "按输入事实声明，避免重复校正；模板FALSE只适用于原始筛选p值。": {
    "en": "Declare the actual input status to avoid double adjustment; template FALSE applies only to raw screening p-values.",
    "fr": "Déclarer l’état réel pour éviter une double correction ; FALSE convient uniquement aux valeurs p brutes de criblage.",
    "es": "Declarar el estado real para evitar doble ajuste; FALSE solo corresponde a valores p de cribado originales.",
    "eu": "Adierazi sarreraren benetako egoera doikuntza bikoitza saihesteko; FALSE baheketako p-balio gordinetarako soilik da."
  },
  "确认阶段的FWER校正与假设逻辑": {
    "en": "Confirmation-stage FWER correction and hypothesis logic",
    "fr": "Correction FWER et logique des hypothèses de confirmation",
    "es": "Corrección FWER y lógica de hipótesis en confirmación",
    "eu": "Berrespen-etapako FWER doikuntza eta hipotesien logika"
  },
  "依据实际假设关系选择通用或自定义校正；不把DTU专用规则或method=\"none\"移植到任意噪音对比。": {
    "en": "Choose a general or justified custom adjustment from the actual hypothesis relationships; do not transfer DTU-specific rules or method=\"none\" to arbitrary noise contrasts.",
    "fr": "Choisir une correction générale ou personnalisée justifiée ; ne pas transposer les règles DTU ni method=\"none\" à des contrastes de bruit arbitraires.",
    "es": "Elegir ajuste general o personalizado justificado; no trasladar reglas DTU ni method=\"none\" a contrastes de ruido arbitrarios.",
    "eu": "Aukeratu hipotesien araberako doikuntza orokorra edo justifikatutako pertsonalizatua; ez eraman DTU arauak edo method=\"none\" edozein zarata-kontrastetara."
  },
  "预先选择的目标OFDR": {
    "en": "Prespecified target OFDR",
    "fr": "OFDR cible prédéfini",
    "es": "OFDR objetivo predefinido",
    "eu": "Aurrez zehaztutako helburuko OFDR"
  },
  "按研究方案声明目标；改变目标后重新运行完整分阶段校正，不复用其他alpha的确认结果。": {
    "en": "Declare the target in the plan; rerun the full stage-wise adjustment after changing it, rather than reusing confirmation results from another alpha.",
    "fr": "Déclarer la cible dans le plan ; refaire toute la correction lors d’un changement sans réutiliser les confirmations d’un autre alpha.",
    "es": "Declarar el objetivo en el plan; repetir el ajuste completo si cambia, sin reutilizar confirmaciones de otro alpha.",
    "eu": "Adierazi helburua planean; aldatzean errepikatu etapazko doikuntza osoa, beste alpha bateko berrespenak berrerabili gabe."
  },
  "统计后处理": {
    "en": "Statistical post-processing",
    "fr": "Post-traitement statistique",
    "es": "Posprocesamiento estadístico",
    "eu": "Estatistikaren ondorengo prozesamendua"
  },
  "官方调用与诊断": {
    "en": "Official calls and diagnostics",
    "fr": "Appels et diagnostics officiels",
    "es": "Llamadas y diagnósticos oficiales",
    "eu": "Dei eta diagnostiko ofizialak"
  },
  "官方软件": {
    "en": "Official software",
    "fr": "Logiciel officiel",
    "es": "Software oficial",
    "eu": "Software ofiziala"
  },
  "成熟与未剪接RNA的联合分布拟合": {
    "en": "Joint mature/unspliced RNA fit",
    "fr": "Ajustement conjoint des ARN matures et non épissés",
    "es": "Ajuste conjunto de ARN maduro y no empalmado",
    "eu": "RNA helduaren eta splicing gabekoaren baterako doikuntza"
  },
  "保存联合及边缘计数拟合、似然、有效细胞数、模型版本与失败基因；用相同基因和细胞集合比较生物及采样假设。": {
    "en": "Retain joint and marginal count fits, likelihoods, effective cell counts, model versions and failed genes; compare biological and sampling assumptions on matched genes and cells.",
    "fr": "Conserver ajustements conjoints et marginaux, vraisemblances, effectifs cellulaires, versions et gènes en échec ; comparer les hypothèses sur les mêmes gènes et cellules.",
    "es": "Conservar ajustes conjuntos y marginales, verosimilitudes, células efectivas, versiones y genes fallidos; comparar supuestos en los mismos genes y células.",
    "eu": "Gorde baterako eta bazterreko doikuntzak, egiantzekotasunak, zelula kopuruak, bertsioak eta huts egindako geneak; alderatu hipotesiak gene eta zelula beretan."
  },
  "同一预先声明分析集合中的可评估对象": {
    "en": "Assessable objects in the same prespecified analysis set",
    "fr": "Objets évaluables du même ensemble d’analyse prédéfini",
    "es": "Objetos evaluables del mismo conjunto de análisis predefinido",
    "eu": "Aurrez zehaztutako azterketa multzo bereko objektu ebaluagarriak"
  },
  "机制参数的不确定性与边界支持": {
    "en": "Mechanistic parameter uncertainty and boundary support",
    "fr": "Incertitude des paramètres mécanistes et solutions aux bornes",
    "es": "Incertidumbre de parámetros mecanísticos y soporte en límites",
    "eu": "Parametro mekanistikoen ziurgabetasuna eta mugako euskarria"
  },
  "记录参数标准误、搜索边界、采样最优点和重抽样稳定性；比较组使用同一模型与基因集合，分别报告均值变化和参数变化。": {
    "en": "Record standard errors, search bounds, sampling optima and resampling stability; use common models and genes across groups and report mean changes separately from parameter changes.",
    "fr": "Consigner erreurs standards, bornes, optimums d’échantillonnage et stabilité ; utiliser modèles et gènes communs et séparer changements de moyenne et de paramètres.",
    "es": "Registrar errores estándar, límites, óptimos de muestreo y estabilidad; usar modelos y genes comunes y separar cambios de media y parámetros.",
    "eu": "Erregistratu errore estandarrak, mugak, laginketa-optimoak eta egonkortasuna; erabili eredu eta gene berak eta eman bereiz batezbestekoen eta parametroen aldaketak."
  },
  "未剪接层长度依赖与参数敏感性": {
    "en": "Unspliced length dependence and parameter sensitivity",
    "fr": "Dépendance à la longueur de la couche non épissée",
    "es": "Dependencia de longitud de la capa no empalmada",
    "eu": "Splicing gabeko geruzaren luzeraren mendekotasuna"
  },
  "比较S/U层均值和参数估计对基因长度的关系，记录长度定义、可测基因范围及use_lengths开关后的效应和排序变化。": {
    "en": "Compare S/U means and parameter estimates against gene length; retain the length definition, measurable gene range and effect/rank changes under use_lengths.",
    "fr": "Comparer moyennes S/U et paramètres selon la longueur ; consigner définition, plage mesurable et changements d’effets ou de rangs avec use_lengths.",
    "es": "Comparar medias S/U y parámetros frente a longitud; registrar definición, rango medible y cambios de efectos o rangos con use_lengths.",
    "eu": "Alderatu S/U batezbestekoak eta parametroak gene-luzeraren arabera; gorde definizioa, tarte neurgarria eta use_lengths aldatzean efektu eta sailkapen aldaketak."
  },
  "RNA测量模型的假设敏感性": {
    "en": "Sensitivity to RNA measurement models",
    "fr": "Sensibilité aux modèles de mesure de l’ARN",
    "es": "Sensibilidad a modelos de medición de ARN",
    "eu": "RNAren neurketa-ereduekiko sentikortasuna"
  },
  "在同一计数和基因集合上比较支持的采样模型及搜索范围，保存拟合诊断、参数区间和噪音候选稳定性，不只比较最优似然。": {
    "en": "Compare supported sampling models and search bounds on identical counts and genes; retain fit diagnostics, parameter intervals and noise-candidate stability, beyond optimum likelihood alone.",
    "fr": "Comparer modèles d’échantillonnage et bornes sur les mêmes comptes et gènes ; conserver diagnostics, intervalles et stabilité des candidats, au-delà de la seule vraisemblance optimale.",
    "es": "Comparar modelos de muestreo y límites en los mismos conteos y genes; guardar diagnósticos, intervalos y estabilidad de candidatos, además de la verosimilitud óptima.",
    "eu": "Alderatu laginketa-ereduak eta mugak kontaketa eta gene beretan; gorde diagnostikoak, parametro-tarteak eta zarata-hautagaien egonkortasuna, optimoaz gain."
  },
  "跨软件实现的表征一致性": {
    "en": "Representation agreement across implementations",
    "fr": "Concordance des représentations entre implémentations",
    "es": "Concordancia de representaciones entre implementaciones",
    "eu": "Inplementazioen arteko errepresentazio-adostasuna"
  },
  "固定原始矩阵、细胞与feature顺序，记录Seurat/Scanpy版本及HVG、PCA、近邻和聚类参数，分别比较HVG交集、邻域重叠与聚类一致性。": {
    "en": "Freeze raw counts and cell/feature order, record Seurat/Scanpy versions and HVG/PCA/neighbor/clustering settings, then compare HVG overlap, neighborhoods and clustering agreement.",
    "fr": "Figer comptes et ordre des cellules/gènes, consigner versions et paramètres HVG/PCA/voisinage/clustering, puis comparer recouvrements et concordance des groupes.",
    "es": "Fijar conteos y orden celular/génico, registrar versiones y parámetros HVG/PCA/vecinos/agrupamiento, y comparar solapamientos y concordancia de grupos.",
    "eu": "Finkatu kontaketak eta zelula/gene ordena, gorde bertsioak eta HVG/PCA/auzotasun/kluster parametroak, eta alderatu gainjartzeak eta klusterren adostasuna."
  },
  "跨实现的marker与噪音候选稳健性": {
    "en": "Marker and noise-candidate stability across implementations",
    "fr": "Stabilité des marqueurs et candidats de bruit entre implémentations",
    "es": "Estabilidad de marcadores y candidatos de ruido entre implementaciones",
    "eu": "Markatzaile eta zarata-hautagaien egonkortasuna inplementazioen artean"
  },
  "在固定比较单位和原始计数噪音模型下，区分软件导致的分群/注释差异与检验实现差异，比较marker方向、排序、标签覆盖及噪音效应稳定性。": {
    "en": "With fixed comparison units and an original-count noise model, distinguish grouping/annotation changes from test-implementation changes; compare marker signs/ranks, label coverage and noise-effect stability.",
    "fr": "À unités et modèle de bruit fixes, distinguer changements de groupes/anotations et différences de tests ; comparer signes/rangs, couverture des étiquettes et effets de bruit.",
    "es": "Con unidades y modelo de ruido fijos, distinguir cambios de grupos/anotación de diferencias en pruebas; comparar signos/rangos, cobertura de etiquetas y efectos de ruido.",
    "eu": "Konparazio-unitateak eta zarata-eredua finkatuta, bereizi talde/anotazio aldaketak eta testen arteko aldeak; alderatu zeinuak, sailkapenak, etiketen estaldura eta zarata-efektuak."
  },
  "稳定基因标识符": {
    "en": "Stable gene identifier",
    "fr": "Identifiant génique stable",
    "es": "Identificador génico estable",
    "eu": "Gene-identifikatzaile egonkorra"
  },
  "固定版本的模型名称": {
    "en": "Pinned model name",
    "fr": "Nom du modèle à version figée",
    "es": "Nombre del modelo con versión fijada",
    "eu": "Bertsio finkoko ereduaren izena"
  },
  "固定版本的采样模型": {
    "en": "Pinned sampling model",
    "fr": "Modèle d’échantillonnage à version figée",
    "es": "Modelo de muestreo con versión fijada",
    "eu": "Bertsio finkoko laginketa-eredua"
  },
  "原生拟合似然及其定义约定": {
    "en": "Native fit likelihood with convention recorded",
    "fr": "Vraisemblance native et convention consignée",
    "es": "Verosimilitud nativa y convención registrada",
    "eu": "Jatorrizko egiantzekotasuna eta erregistratutako konbentzioa"
  },
  "观测与拟合的S/U分布": {
    "en": "Observed versus fitted S/U distribution",
    "fr": "Distributions S/U observées et ajustées",
    "es": "Distribuciones S/U observadas y ajustadas",
    "eu": "Behatutako eta doitutako S/U banaketak"
  },
  "成功、边界解、失败或未评估": {
    "en": "Success, boundary, failure or not assessed",
    "fr": "Succès, solution aux bornes, échec ou non évalué",
    "es": "Éxito, solución en límites, fallo o no evaluado",
    "eu": "Arrakasta, mugako soluzioa, hutsegitea edo ebaluatu gabe"
  },
  "物理或采样参数": {
    "en": "Physical or sampling parameter",
    "fr": "Paramètre physique ou d’échantillonnage",
    "es": "Parámetro físico o de muestreo",
    "eu": "Parametro fisikoa edo laginketakoa"
  },
  "声明参照单位下的拟合值": {
    "en": "Fitted value in declared reference units",
    "fr": "Estimation dans les unités de référence déclarées",
    "es": "Estimación en unidades de referencia declaradas",
    "eu": "Adierazitako erreferentzia-unitateetako estimazioa"
  },
  "方法支持时的原生不确定性估计": {
    "en": "Native uncertainty estimate where supported",
    "fr": "Incertitude native lorsque prise en charge",
    "es": "Incertidumbre nativa cuando esté disponible",
    "eu": "Jatorrizko ziurgabetasuna, onartuta dagoenean"
  },
  "记录的推断搜索边界": {
    "en": "Recorded inference bounds",
    "fr": "Bornes d’inférence consignées",
    "es": "Límites de inferencia registrados",
    "eu": "Erregistratutako inferentzia-mugak"
  },
  "项目定义的参数触及搜索边界标记": {
    "en": "Project-defined contact with declared search bounds",
    "fr": "Indicateur de contact avec les bornes défini par le projet",
    "es": "Indicador de contacto con límites definido por el proyecto",
    "eu": "Proiektuak definitutako bilaketa-mugarekiko kontaktu-adierazlea"
  },
  "按培养分层或明示方案的重抽样稳定性": {
    "en": "Culture-aware or declared resampling stability",
    "fr": "Stabilité du rééchantillonnage par culture ou schéma déclaré",
    "es": "Estabilidad del remuestreo por cultivo o esquema declarado",
    "eu": "Kultura edo adierazitako eskemaren araberako birlaginketa-egonkortasuna"
  },
  "匹配参考的长度、定义及单位": {
    "en": "Reference-matched length with definition and unit",
    "fr": "Longueur concordant avec la référence, définition et unité",
    "es": "Longitud coincidente con referencia, definición y unidad",
    "eu": "Erreferentziarekin bat datorren luzera, definizioa eta unitatea"
  },
  "声明群组中的原始spliced均值": {
    "en": "Raw spliced mean within stated group",
    "fr": "Moyenne brute épissée du groupe déclaré",
    "es": "Media original de ARN empalmado del grupo declarado",
    "eu": "Adierazitako taldeko splicing-eko batezbesteko gordina"
  },
  "声明群组中的原始unspliced均值": {
    "en": "Raw unspliced mean within stated group",
    "fr": "Moyenne brute non épissée du groupe déclaré",
    "es": "Media original de ARN no empalmado del grupo declarado",
    "eu": "Adierazitako taldeko splicing gabeko batezbesteko gordina"
  },
  "预先声明的项目关联统计量": {
    "en": "Prespecified project association statistic",
    "fr": "Statistique d’association prédéfinie du projet",
    "es": "Estadístico de asociación predefinido del proyecto",
    "eu": "Proiektuaren aurrez definitutako lotura-estatistikoa"
  },
  "Monod原生设置项": {
    "en": "Native Monod setting",
    "fr": "Réglage natif de Monod",
    "es": "Configuración nativa de Monod",
    "eu": "Monoden jatorrizko ezarpena"
  },
  "匹配拟合之间的项目比较": {
    "en": "Project comparison between matched fits",
    "fr": "Comparaison du projet entre ajustements concordants",
    "es": "Comparación del proyecto entre ajustes coincidentes",
    "eu": "Proiektuaren doikuntza parekatuen arteko konparazioa"
  },
  "版本支持的None/Bernoulli/Poisson原生选项": {
    "en": "Native None/Bernoulli/Poisson choice if supported",
    "fr": "Choix natif None/Bernoulli/Poisson si disponible",
    "es": "Opción nativa None/Bernoulli/Poisson si es compatible",
    "eu": "None/Bernoulli/Poisson jatorrizko aukera, onartuta badago"
  },
  "记录的物理及采样搜索范围": {
    "en": "Recorded physical and sampling search bounds",
    "fr": "Bornes physiques et d’échantillonnage consignées",
    "es": "Límites físicos y de muestreo registrados",
    "eu": "Parametro fisikoen eta laginketakoen muga erregistratuak"
  },
  "原生拟合诊断与项目接受标记": {
    "en": "Native fit diagnostics and project acceptance flags",
    "fr": "Diagnostics natifs et indicateurs d’acceptation du projet",
    "es": "Diagnósticos nativos e indicadores de aceptación del proyecto",
    "eu": "Jatorrizko diagnostikoak eta proiektuaren onarpen-adierazleak"
  },
  "方法支持的不确定性估计与重抽样": {
    "en": "Supported uncertainty estimates and resampling",
    "fr": "Estimations d’incertitude et rééchantillonnages disponibles",
    "es": "Estimaciones de incertidumbre y remuestreo disponibles",
    "eu": "Onartutako ziurgabetasun-estimazioak eta birlaginketa"
  },
  "支持模型之间的项目效应与排序一致性": {
    "en": "Project effect/rank agreement across supported models",
    "fr": "Concordance des effets/rangs entre modèles disponibles",
    "es": "Concordancia de efectos/rangos entre modelos compatibles",
    "eu": "Onartutako ereduen arteko efektu eta sailkapenen adostasuna"
  },
  "相同计数及细胞/feature身份和顺序哈希": {
    "en": "Identical count, cell and feature identity/order hashes",
    "fr": "Empreintes identiques des comptes, identités et ordres cellulaires/géniques",
    "es": "Hashes idénticos de conteos, identidades y orden celular/génico",
    "eu": "Kontaketen, identitateen eta zelula/gene ordenaren hash berdinak"
  },
  "精确软件包及依赖版本": {
    "en": "Exact package and dependency versions",
    "fr": "Versions exactes des paquets et dépendances",
    "es": "Versiones exactas de paquetes y dependencias",
    "eu": "Pakete eta mendekotasunen bertsio zehatzak"
  },
  "项目声明的基因集重叠统计量": {
    "en": "Project-declared gene-set overlap statistic",
    "fr": "Statistique de recouvrement génique déclarée par le projet",
    "es": "Estadístico de solapamiento génico declarado por el proyecto",
    "eu": "Proiektuak adierazitako gene-multzoen gainjartze-estatistikoa"
  },
  "项目声明的逐细胞共享近邻统计量": {
    "en": "Project-declared per-cell shared-neighbor statistic",
    "fr": "Statistique de voisins partagés par cellule déclarée par le projet",
    "es": "Estadístico de vecinos compartidos por célula declarado por el proyecto",
    "eu": "Proiektuak adierazitako zelulako auzokide partekatuen estatistikoa"
  },
  "匹配细胞的调整兰德指数": {
    "en": "Adjusted Rand index for matched cells",
    "fr": "Indice de Rand ajusté des cellules concordantes",
    "es": "Índice de Rand ajustado de células coincidentes",
    "eu": "Parekatutako zelulen Rand indize doitua"
  },
  "算法类型、距离、随机种子及图设置": {
    "en": "Algorithm flavor, metric, seed and graph settings",
    "fr": "Variante algorithmique, distance, graine et paramètres du graphe",
    "es": "Variante algorítmica, distancia, semilla y parámetros del grafo",
    "eu": "Algoritmo-aldaera, distantzia, hazia eta grafo-ezarpenak"
  },
  "菌株、培养、条件及状态定义": {
    "en": "Strain, culture, condition and state definitions",
    "fr": "Définitions de souche, culture, condition et état",
    "es": "Definiciones de cepa, cultivo, condición y estado",
    "eu": "Anduiaren, kulturaren, baldintzaren eta egoeraren definizioak"
  },
  "固定标签下的推断比较": {
    "en": "Inference comparison with labels held fixed",
    "fr": "Comparaison d’inférence à étiquettes fixes",
    "es": "Comparación de inferencia con etiquetas fijas",
    "eu": "Inferentziaren konparazioa etiketa finkoekin"
  },
  "使用各实现独立标签的敏感性分支": {
    "en": "Sensitivity branch with implementation-specific labels",
    "fr": "Branche de sensibilité avec étiquettes propres aux implémentations",
    "es": "Rama de sensibilidad con etiquetas propias de cada implementación",
    "eu": "Inplementazio bakoitzaren etiketak erabiltzen dituen sentikortasun-adarra"
  },
  "项目声明的效应方向与排序一致性": {
    "en": "Project-declared effect-direction and ranking agreement",
    "fr": "Concordance des directions et rangs déclarée par le projet",
    "es": "Concordancia de direcciones y rangos declarada por el proyecto",
    "eu": "Proiektuak adierazitako efektu-norabideen eta sailkapenen adostasuna"
  },
  "接受、冲突及未知标签数量": {
    "en": "Accepted, conflicting and unknown label counts",
    "fr": "Effectifs des étiquettes acceptées, contradictoires et inconnues",
    "es": "Recuentos de etiquetas aceptadas, conflictivas y desconocidas",
    "eu": "Onartutako, gatazkako eta ezezaguneko etiketen kopuruak"
  },
  "不同分支中原始计数的噪音效应及不确定性": {
    "en": "Original-count noise effect and uncertainty across branches",
    "fr": "Effets de bruit et incertitude sur comptes bruts entre branches",
    "es": "Efectos de ruido e incertidumbre en conteos originales entre ramas",
    "eu": "Adarren arteko kontaketa gordinen zarata-efektuak eta ziurgabetasuna"
  },
  "噪音检验家族与未评估状态台账": {
    "en": "Noise-testing families and unassessed-status ledger",
    "fr": "Familles de tests de bruit et registre des états non évalués",
    "es": "Familias de pruebas de ruido y registro de estados no evaluados",
    "eu": "Zarata-testen familiak eta ebaluatu gabeko egoeren erregistroa"
  },
  "逐条登记基因、状态、对比、估计对象、纳入规则、原始p值及失败状态；明确每次校正覆盖的完整家族和报告层级。": {
    "en": "Register genes, states, contrasts, estimands, eligibility rules, raw p-values and failure states; identify the complete family and reporting level for each adjustment.",
    "fr": "Enregistrer gènes, états, contrastes, objets estimés, admissibilité, valeurs p brutes et échecs ; identifier la famille complète et le niveau de chaque correction.",
    "es": "Registrar genes, estados, contrastes, estimandos, elegibilidad, valores p originales y fallos; identificar la familia completa y el nivel de cada ajuste.",
    "eu": "Erregistratu geneak, egoerak, kontrasteak, estimandoak, onargarritasuna, p-balio gordinak eta hutsak; identifikatu doikuntza bakoitzaren familia osoa eta txosten-maila."
  },
  "预设检验家族标识": {
    "en": "Prespecified testing-family ID",
    "fr": "Identifiant de famille de tests prédéfinie",
    "es": "Identificador de familia de pruebas predefinida",
    "eu": "Aurrez definitutako test-familiaren identifikatzailea"
  },
  "基因、状态、对比与原假设标识": {
    "en": "Gene, state, contrast and null-hypothesis identifiers",
    "fr": "Identifiants de gène, état, contraste et hypothèse nulle",
    "es": "Identificadores de gen, estado, contraste e hipótesis nula",
    "eu": "Gene, egoera, kontraste eta hipotesi nuluaren identifikatzaileak"
  },
  "均值、变异、相关性或其他估计对象": {
    "en": "Mean, variability, correlation or other estimand",
    "fr": "Moyenne, variabilité, corrélation ou autre objet estimé",
    "es": "Media, variabilidad, correlación u otro estimando",
    "eu": "Batezbestekoa, aldakortasuna, korrelazioa edo beste estimandoa"
  },
  "已评估、未评估、失败与筛选未通过": {
    "en": "Assessed, not evaluated, failed or screening not passed",
    "fr": "Évalué, non évalué, échec ou criblage non passé",
    "es": "Evaluado, no evaluado, fallo o cribado no superado",
    "eu": "Ebaluatua, ebaluatu gabea, hutsegitea edo baheketa gainditu gabea"
  },
  "有效的上游原始p值与校准来源": {
    "en": "Valid upstream raw p-value and calibration source",
    "fr": "Valeur p brute amont valide et source de calibration",
    "es": "Valor p original válido y fuente de calibración",
    "eu": "Aurreko p-balio gordin balioduna eta kalibrazio-iturria"
  },
  "预定家族及实际可评估家族大小": {
    "en": "Prespecified and actually assessable family sizes",
    "fr": "Tailles de famille prévues et réellement évaluables",
    "es": "Tamaños previstos y realmente evaluables de la familia",
    "eu": "Aurrez zehaztutako eta benetan ebaluagarri diren familia-tamainak"
  },
  "分阶段噪音检验的错误率校准": {
    "en": "Error-rate calibration of stage-wise noise testing",
    "fr": "Calibration des erreurs des tests de bruit par étapes",
    "es": "Calibración de errores de pruebas de ruido por etapas",
    "eu": "Etapazko zarata-testen errore-tasen kalibrazioa"
  },
  "记录基因筛选和对比确认结果、目标OFDR、假设关系及NA原因；用设计匹配的真值模拟分别评估基因层与单项检验的错误和功效。": {
    "en": "Retain gene screening and contrast confirmation, target OFDR, hypothesis relationships and NA reasons; use design-matched truth simulations to assess gene-level and individual-test errors and power separately.",
    "fr": "Conserver criblage, confirmation, OFDR cible, relations d’hypothèses et causes des NA ; évaluer séparément erreurs et puissance par gène et par test dans des simulations adaptées.",
    "es": "Conservar cribado, confirmación, OFDR objetivo, relaciones de hipótesis y motivos de NA; evaluar errores y potencia por gen y prueba en simulaciones acordes al diseño.",
    "eu": "Gorde baheketa, berrespena, OFDR helburua, hipotesien loturak eta NA arrazoiak; ebaluatu bereiz gene- eta test-mailako erroreak eta potentzia diseinuaren araberako simulazioetan."
  },
  "具名基因筛选p值及是否已校正": {
    "en": "Named gene-screening p-values and adjustment status",
    "fr": "Valeurs p de criblage génique nommées et état de correction",
    "es": "Valores p de cribado génico con nombres y estado de ajuste",
    "eu": "Gene-baheketako p-balio izendatuak eta doikuntza-egoera"
  },
  "同基因顺序的对比确认p值矩阵": {
    "en": "Contrast-confirmation p-value matrix in matching gene order",
    "fr": "Matrice de valeurs p de confirmation dans le même ordre génique",
    "es": "Matriz de valores p de confirmación con el mismo orden génico",
    "eu": "Kontraste-berrespeneko p-balioen matrizea gene-ordena berean"
  },
  "当前分阶段校正的目标OFDR": {
    "en": "Target OFDR for this stage-wise adjustment",
    "fr": "OFDR cible de cette correction par étapes",
    "es": "OFDR objetivo de este ajuste por etapas",
    "eu": "Etapazko doikuntza honen helburuko OFDR"
  },
  "FWER方法及所依据的假设逻辑": {
    "en": "FWER method and its hypothesis logic",
    "fr": "Méthode FWER et logique des hypothèses",
    "es": "Método FWER y lógica de hipótesis",
    "eu": "FWER metodoa eta hipotesien logika"
  },
  "未筛中、未评估或拟合失败的NA原因": {
    "en": "NA reason: not screened in, not evaluated or fit failed",
    "fr": "Cause des NA : non sélectionné, non évalué ou échec",
    "es": "Motivo de NA: no seleccionado, no evaluado o fallo",
    "eu": "NAren arrazoia: hautatu gabea, ebaluatu gabea edo hutsegitea"
  },
  "按真值分别计算的基因层和检验层错误与功效": {
    "en": "Truth-based gene-level and test-level errors and power",
    "fr": "Erreurs et puissance par gène et par test selon la vérité simulée",
    "es": "Errores y potencia por gen y prueba según verdad simulada",
    "eu": "Simulatutako egiaren araberako gene- eta test-mailako erroreak eta potentzia"
  },
  "默认矩阵工具与噪音指标需要明确的计数入口；可使用与S/U层基因和细胞身份、顺序一致的原始整数成熟S层，保留计数定义，不将S与U机械相加。": {
    "en": "Default matrix tools and noise metrics require an explicit count input. The raw integer mature S layer can serve as that input after matching gene and cell identities and order to the S/U layers; preserve its counting definition and do not mechanically add S and U.",
    "fr": "Les outils matriciels et mesures de bruit par défaut exigent une entrée de comptes explicite. La couche S mature entière brute peut être utilisée après alignement des identités et de l’ordre des gènes et cellules avec les couches S/U ; conserver la définition du comptage et ne pas additionner mécaniquement S et U.",
    "es": "Las herramientas matriciales y métricas de ruido predeterminadas requieren una entrada de conteos explícita. La capa S madura de enteros originales puede usarse tras alinear identidades y orden de genes y células con las capas S/U; conservar su definición y no sumar mecánicamente S y U.",
    "eu": "Matrize-tresna eta zarata-neurri lehenetsiek kontaketa-sarrera esplizitua behar dute. S geruza helduaren zenbaki oso gordinen kontaketak erabil daitezke S/U geruzetako geneen eta zelulen identitateak eta ordena parekatu ondoren; gorde kontaketa-definizioa eta ez batu mekanikoki S eta U."
  },
  "成熟与未剪接RNA的机制噪音比较": {
    "en": "Mechanistic noise comparison from mature/unspliced RNA",
    "fr": "Comparaison mécaniste du bruit à partir des ARN matures/non épissés",
    "es": "Comparación mecanística de ruido con ARN maduro/no empalmado",
    "eu": "Zarataren konparazio mekanistikoa RNA helduarekin eta splicing gabekoarekin"
  },
  "平均表达相近时，转录机制参数是否仍存在可辨识差异？": {
    "en": "Can transcriptional parameters differ identifiably when mean expression is similar?",
    "fr": "Les paramètres de transcription diffèrent-ils de façon identifiable à expression moyenne comparable ?",
    "es": "¿Pueden diferir de forma identificable los parámetros transcripcionales con expresión media similar?",
    "eu": "Transkripzio-parametroek alde identifikagarriak al dituzte batezbesteko adierazpena antzekoa denean?"
  },
  "在S/U证据充分的酵母基因中，用Monod联合拟合生物过程与采样模型，比较均值、机制参数及其不确定性。": {
    "en": "For yeast genes with sufficient S/U evidence, jointly fit biological and sampling models with Monod and compare means, mechanistic parameters and their uncertainty.",
    "fr": "Pour les gènes de levure soutenus en S/U, ajuster conjointement processus biologique et échantillonnage avec Monod puis comparer moyennes, paramètres et incertitude.",
    "es": "En genes de levadura con evidencia S/U suficiente, ajustar procesos biológicos y muestreo con Monod y comparar medias, parámetros e incertidumbre.",
    "eu": "S/U euskarri nahikoa duten legamia-geneetan, doitu batera Monoden eredu biologikoak eta laginketakoak; alderatu batezbestekoak, parametroak eta ziurgabetasuna."
  },
  "细胞估计群内分布；菌株和独立培养决定比较及验证单位。": {
    "en": "Cells estimate within-group distributions; strains and independent cultures define comparison and validation units.",
    "fr": "Les cellules estiment les distributions internes ; souches et cultures indépendantes définissent comparaison et validation.",
    "es": "Las células estiman distribuciones internas; cepas y cultivos independientes definen comparación y validación.",
    "eu": "Zelulek talde barruko banaketak estimatzen dituzte; anduiek eta kultura independenteek konparazioa eta baliozkotzea definitzen dituzte."
  },
  "RNA长度偏倚与测量模型审计": {
    "en": "RNA length-bias and measurement-model audit",
    "fr": "Audit des biais de longueur et de la mesure de l’ARN",
    "es": "Auditoría de sesgo de longitud y medición de ARN",
    "eu": "RNA-luzeraren alborapenaren eta neurketa-ereduen auditoria"
  },
  "未剪接RNA的长度相关捕获是否改变动力学和噪音候选？": {
    "en": "Does length-dependent unspliced capture alter kinetic and noise candidates?",
    "fr": "La capture non épissée dépendante de la longueur modifie-t-elle les candidats cinétiques et de bruit ?",
    "es": "¿La captura no empalmada dependiente de longitud altera candidatos cinéticos y de ruido?",
    "eu": "Luzeraren araberako splicing gabeko harrapaketak hautagai zinetikoak eta zaratakoak aldatzen al ditu?"
  },
  "固定S/U层、细胞与基因集合，比较长度相关性、use_lengths及支持的采样模型，保留拟合失败和参数不确定性。": {
    "en": "Freeze S/U layers, cells and genes, compare length dependence, use_lengths and supported sampling models, retaining failed fits and parameter uncertainty.",
    "fr": "Figer couches S/U, cellules et gènes, comparer dépendance à la longueur, use_lengths et modèles d’échantillonnage, en conservant échecs et incertitude.",
    "es": "Fijar capas S/U, células y genes; comparar dependencia de longitud, use_lengths y modelos de muestreo, conservando fallos e incertidumbre.",
    "eu": "Finkatu S/U geruzak, zelulak eta geneak; alderatu luzerarekiko mendekotasuna, use_lengths eta laginketa-ereduak, hutsak eta ziurgabetasuna gordeta."
  },
  "分层长度关联与计数模型对照": {
    "en": "Stratified length associations and count-model contrasts",
    "fr": "Associations stratifiées de longueur et comparaison des modèles",
    "es": "Asociaciones de longitud estratificadas y comparación de modelos",
    "eu": "Luzera-lotura estratifikatuak eta kontaketa-ereduen konparazioa"
  },
  "长度关联是技术与生物机制的审计信号，不能仅凭相关性直接删除基因或宣称已消除偏差。": {
    "en": "Length association is an audit signal for technical and biological mechanisms; correlation alone does not justify removing genes or claiming bias elimination.",
    "fr": "L’association à la longueur signale des mécanismes techniques ou biologiques ; une corrélation seule ne justifie ni exclusion des gènes ni élimination déclarée du biais.",
    "es": "La asociación con longitud señala mecanismos técnicos o biológicos; la correlación sola no justifica eliminar genes ni afirmar que se eliminó el sesgo.",
    "eu": "Luzerarekiko lotura mekanismo teknikoen edo biologikoen adierazlea da; korrelazioak bakarrik ez du geneak kentzea edo alborapena ezabatutzat jotzea justifikatzen."
  },
  "固定原始矩阵、细胞/feature顺序和比较单位；分别记录算法差异与版本差异。": {
    "en": "Freeze raw counts, cell/feature order and comparison units; record algorithm and version differences separately.",
    "fr": "Figer comptes bruts, ordre des cellules/gènes et unités ; distinguer différences d’algorithmes et de versions.",
    "es": "Fijar conteos originales, orden celular/génico y unidades; distinguir diferencias de algoritmos y versiones.",
    "eu": "Finkatu kontaketa gordinak, zelula/gene ordena eta unitateak; erregistratu bereiz algoritmoen eta bertsioen aldeak."
  },
  "比较固定标签与重新注释两条分支；噪音推断使用同一原始计数模型，不用整合表达替换计数。": {
    "en": "Compare fixed-label and reannotation branches; keep one original-count noise model and do not replace counts with integrated expression.",
    "fr": "Comparer étiquettes fixes et réannotation ; conserver un modèle de bruit sur comptes bruts sans remplacer ceux-ci par l’expression intégrée.",
    "es": "Comparar etiquetas fijas y reanotación; mantener un modelo de ruido con conteos originales sin sustituirlos por expresión integrada.",
    "eu": "Alderatu etiketa finkoak eta berranotazioa; mantendu kontaketa gordineko zarata-eredu bera eta ez ordeztu kontaketak adierazpen integratuarekin."
  },
  "Seurat与Scanpy的跨实现稳健性": {
    "en": "Cross-implementation robustness of Seurat and Scanpy",
    "fr": "Robustesse entre implémentations Seurat et Scanpy",
    "es": "Robustez entre implementaciones Seurat y Scanpy",
    "eu": "Seurat eta Scanpy inplementazioen arteko sendotasuna"
  },
  "在相同数据与比较单位下，软件实现和版本是否改变注释、marker及噪音结论？": {
    "en": "Do software implementations and versions change annotation, marker or noise conclusions on matched data and comparison units?",
    "fr": "Les implémentations et versions modifient-elles annotations, marqueurs ou conclusions de bruit à données et unités identiques ?",
    "es": "¿Las implementaciones y versiones cambian anotación, marcadores o conclusiones de ruido con datos y unidades coincidentes?",
    "eu": "Softwarearen inplementazioek eta bertsioek anotazio-, markatzaile- edo zarata-ondorioak aldatzen al dituzte datu eta unitate beretan?"
  },
  "从冻结矩阵分别运行Seurat与Scanpy，比较特征、邻域和聚类，再在固定标签及重新注释分支中复核marker与噪音效应。": {
    "en": "Run Seurat and Scanpy from a frozen matrix, compare features, neighbors and clusters, then reassess markers and noise under fixed labels and reannotation.",
    "fr": "Exécuter Seurat et Scanpy depuis une matrice figée, comparer caractéristiques, voisinages et groupes, puis réévaluer marqueurs et bruit avec étiquettes fixes ou réannotées.",
    "es": "Ejecutar Seurat y Scanpy desde una matriz fijada, comparar características, vecinos y grupos, y reevaluar marcadores y ruido con etiquetas fijas y reanotadas.",
    "eu": "Exekutatu Seurat eta Scanpy matrize finko batetik; alderatu ezaugarriak, auzokideak eta klusterrak, eta berrikusi markatzaileak eta zarata etiketa finkoekin eta berranotazioarekin."
  },
  "特征、邻域与聚类的一致性报告": {
    "en": "Feature, neighborhood and clustering agreement report",
    "fr": "Rapport de concordance des caractéristiques, voisinages et groupes",
    "es": "Informe de concordancia de características, vecinos y grupos",
    "eu": "Ezaugarri, auzotasun eta klusterren adostasun-txostena"
  },
  "注释、marker与噪音的分支敏感性": {
    "en": "Branch sensitivity of annotation, markers and noise",
    "fr": "Sensibilité des annotations, marqueurs et bruit selon les branches",
    "es": "Sensibilidad de anotación, marcadores y ruido por ramas",
    "eu": "Anotazioaren, markatzaileen eta zarataren adarrekiko sentikortasuna"
  },
  "匹配实际算法、参数含义和随机数设置；不可把不同默认配置当作同一算法的重复。": {
    "en": "Match actual algorithms, parameter meanings and random settings; different defaults are not repeated runs of one algorithm.",
    "fr": "Aligner algorithmes, sens des paramètres et aléatoire ; des réglages par défaut différents ne sont pas des répétitions du même algorithme.",
    "es": "Alinear algoritmos, significado de parámetros y aleatoriedad; valores predeterminados distintos no son repeticiones de un algoritmo.",
    "eu": "Parekatu algoritmoak, parametroen esanahiak eta ausazko ezarpenak; lehenespen desberdinak ez dira algoritmo beraren errepikapenak."
  },
  "一致性不是正确性的证明；保留差异及其对结论的影响，不强制不同方法生成相同聚类。": {
    "en": "Agreement does not establish correctness; retain differences and their effects on conclusions without forcing identical clusters.",
    "fr": "La concordance ne prouve pas la justesse ; conserver les différences et leurs effets sans imposer des groupes identiques.",
    "es": "La concordancia no demuestra corrección; conservar diferencias y sus efectos sin forzar grupos idénticos.",
    "eu": "Adostasunak ez du zuzentasuna frogatzen; gorde aldeak eta ondorioetan duten eragina, kluster berdinak behartu gabe."
  },
  "噪音假设家族与分阶段检验": {
    "en": "Noise-hypothesis families and stage-wise testing",
    "fr": "Familles d’hypothèses de bruit et tests par étapes",
    "es": "Familias de hipótesis de ruido y pruebas por etapas",
    "eu": "Zarata-hipotesien familiak eta etapazko testak"
  },
  "同时比较多个状态与对比时，报告的噪音基因及具体结论控制了哪一层错误？": {
    "en": "When testing multiple states and contrasts, which error level is controlled for reported noise genes and specific claims?",
    "fr": "En comparant plusieurs états et contrastes, quel niveau d’erreur est contrôlé pour les gènes de bruit et les conclusions précises ?",
    "es": "Al comparar varios estados y contrastes, ¿qué nivel de error se controla para genes de ruido y afirmaciones concretas?",
    "eu": "Egoera eta kontraste anitz aztertzean, zer errore-maila kontrolatzen da zarata-gene eta baieztapen zehatzetarako?"
  },
  "冻结检验家族与估计对象，将已校准的基因级筛选和对比级p值交给stageR，并用设计匹配模拟复核分阶段错误率。": {
    "en": "Freeze testing families and estimands, pass calibrated gene-screening and contrast p-values to stageR, and assess stage-wise error rates with design-matched simulations.",
    "fr": "Figer familles et objets estimés, fournir à stageR des valeurs p calibrées de criblage et de contrastes, puis vérifier les erreurs dans des simulations adaptées.",
    "es": "Fijar familias y estimandos, pasar a stageR valores p calibrados de cribado génico y contrastes y revisar errores con simulaciones acordes al diseño.",
    "eu": "Finkatu test-familiak eta estimandoak, eman stageRri gene-baheketako eta kontrasteetako p-balio kalibratuak, eta egiaztatu erroreak diseinuaren araberako simulazioetan."
  },
  "完整检验家族、估计对象与失败状态表": {
    "en": "Complete testing families, estimands and failure-status table",
    "fr": "Tableau complet des familles, objets estimés et états d’échec",
    "es": "Tabla completa de familias, estimandos y estados de fallo",
    "eu": "Test-familien, estimandoen eta hutsegite-egoeren taula osoa"
  },
  "基因级与对比级的校正和模拟校准报告": {
    "en": "Gene-level and contrast-level adjustment and simulation-calibration report",
    "fr": "Rapport de correction par gène/contraste et calibration simulée",
    "es": "Informe de ajuste por gen/contraste y calibración simulada",
    "eu": "Gene/kontraste doikuntzaren eta simulazio-kalibrazioaren txostena"
  },
  "方法文献，不直接导入基因为状态marker。": {
    "en": "Method paper; does not directly supply state-marker genes.",
    "fr": "Article méthodologique ; ne fournit pas directement des marqueurs d’état.",
    "es": "Artículo metodológico; no aporta directamente genes marcadores de estado.",
    "eu": "Metodo-artikulua; ez ditu zuzenean egoera-markatzaile geneak ematen."
  },
  "这是基于一般单细胞RNA数据的机制方法；酵母内含子少，须先通过S/U信息量、测量模型和参数可辨识性检查。 无独立时间校准时，速率以模型参照单位解释；拟合参数不自动构成绝对转录速率或纯内在噪音。": {
    "en": "This mechanistic method uses general single-cell RNA data; sparse yeast introns require prior checks of S/U information, measurement models and parameter identifiability. Without independent time calibration, interpret rates in model reference units; fitted parameters do not automatically establish absolute transcription rates or purely intrinsic noise.",
    "fr": "Cette méthode mécaniste utilise des données d’ARN unicellulaire générales ; la rareté des introns de levure exige des contrôles préalables de l’information S/U, de la mesure et de l’identifiabilité. Sans étalonnage temporel indépendant, interpréter les vitesses dans les unités de référence du modèle ; les paramètres ajustés ne démontrent pas automatiquement des vitesses absolues ni un bruit purement intrinsèque.",
    "es": "Este método mecanístico usa datos generales de ARN unicelular; la escasez de intrones en levadura exige revisar información S/U, medición e identificabilidad. Sin calibración temporal independiente, interpretar las tasas en unidades de referencia del modelo; los parámetros ajustados no establecen automáticamente tasas absolutas ni ruido puramente intrínseco.",
    "eu": "Metodo mekanistiko honek zelula bakarreko RNA datu orokorrak erabiltzen ditu; legamiaren intron eskasek S/U informazioa, neurketa-ereduak eta identifikagarritasuna aurrez egiaztatzea eskatzen dute. Denbora-kalibrazio independenterik gabe, interpretatu tasak ereduaren erreferentzia-unitateetan; doitutako parametroek ez dituzte berez transkripzio-tasa absolutuak edo barne-zarata hutsa ezartzen."
  }
};window.YV_TEXT=window.YV_TEXT||{};Object.assign(window.YV_TEXT,text);const content={
  "tools": {
    "monod": {
      "en": {
        "task": "Jointly fit stochastic transcription and RNA sampling models"
      },
      "fr": {
        "task": "Ajuster conjointement transcription stochastique et échantillonnage de l’ARN"
      },
      "es": {
        "task": "Ajustar conjuntamente transcripción estocástica y muestreo de ARN"
      },
      "eu": {
        "task": "Doitu batera transkripzio estokastikoa eta RNA-laginketaren ereduak"
      }
    },
    "stager": {
      "en": {
        "task": "Gene-level screening and stage-wise adjustment of valid upstream tests"
      },
      "fr": {
        "task": "Criblage génique et correction par étapes de tests amont valides"
      },
      "es": {
        "task": "Cribado génico y ajuste por etapas de pruebas previas válidas"
      },
      "eu": {
        "task": "Baliozko aurreko testen gene-mailako baheketa eta etapazko doikuntza"
      }
    }
  },
  "metrics": {
    "monod_joint_fit": {
      "en": {
        "name": "Joint mature/unspliced RNA fit",
        "definition": "Retain joint and marginal count fits, likelihoods, effective cell counts, model versions and failed genes; compare biological and sampling assumptions on matched genes and cells.",
        "purpose": "Retain joint and marginal count fits, likelihoods, effective cell counts, model versions and failed genes; compare biological and sampling assumptions on matched genes and cells."
      },
      "fr": {
        "name": "Ajustement conjoint des ARN matures et non épissés",
        "definition": "Conserver ajustements conjoints et marginaux, vraisemblances, effectifs cellulaires, versions et gènes en échec ; comparer les hypothèses sur les mêmes gènes et cellules.",
        "purpose": "Conserver ajustements conjoints et marginaux, vraisemblances, effectifs cellulaires, versions et gènes en échec ; comparer les hypothèses sur les mêmes gènes et cellules."
      },
      "es": {
        "name": "Ajuste conjunto de ARN maduro y no empalmado",
        "definition": "Conservar ajustes conjuntos y marginales, verosimilitudes, células efectivas, versiones y genes fallidos; comparar supuestos en los mismos genes y células.",
        "purpose": "Conservar ajustes conjuntos y marginales, verosimilitudes, células efectivas, versiones y genes fallidos; comparar supuestos en los mismos genes y células."
      },
      "eu": {
        "name": "RNA helduaren eta splicing gabekoaren baterako doikuntza",
        "definition": "Gorde baterako eta bazterreko doikuntzak, egiantzekotasunak, zelula kopuruak, bertsioak eta huts egindako geneak; alderatu hipotesiak gene eta zelula beretan.",
        "purpose": "Gorde baterako eta bazterreko doikuntzak, egiantzekotasunak, zelula kopuruak, bertsioak eta huts egindako geneak; alderatu hipotesiak gene eta zelula beretan."
      }
    },
    "monod_parameter_support": {
      "en": {
        "name": "Mechanistic parameter uncertainty and boundary support",
        "definition": "Record standard errors, search bounds, sampling optima and resampling stability; use common models and genes across groups and report mean changes separately from parameter changes.",
        "purpose": "Record standard errors, search bounds, sampling optima and resampling stability; use common models and genes across groups and report mean changes separately from parameter changes."
      },
      "fr": {
        "name": "Incertitude des paramètres mécanistes et solutions aux bornes",
        "definition": "Consigner erreurs standards, bornes, optimums d’échantillonnage et stabilité ; utiliser modèles et gènes communs et séparer changements de moyenne et de paramètres.",
        "purpose": "Consigner erreurs standards, bornes, optimums d’échantillonnage et stabilité ; utiliser modèles et gènes communs et séparer changements de moyenne et de paramètres."
      },
      "es": {
        "name": "Incertidumbre de parámetros mecanísticos y soporte en límites",
        "definition": "Registrar errores estándar, límites, óptimos de muestreo y estabilidad; usar modelos y genes comunes y separar cambios de media y parámetros.",
        "purpose": "Registrar errores estándar, límites, óptimos de muestreo y estabilidad; usar modelos y genes comunes y separar cambios de media y parámetros."
      },
      "eu": {
        "name": "Parametro mekanistikoen ziurgabetasuna eta mugako euskarria",
        "definition": "Erregistratu errore estandarrak, mugak, laginketa-optimoak eta egonkortasuna; erabili eredu eta gene berak eta eman bereiz batezbestekoen eta parametroen aldaketak.",
        "purpose": "Erregistratu errore estandarrak, mugak, laginketa-optimoak eta egonkortasuna; erabili eredu eta gene berak eta eman bereiz batezbestekoen eta parametroen aldaketak."
      }
    },
    "unspliced_length_sensitivity": {
      "en": {
        "name": "Unspliced length dependence and parameter sensitivity",
        "definition": "Compare S/U means and parameter estimates against gene length; retain the length definition, measurable gene range and effect/rank changes under use_lengths.",
        "purpose": "Compare S/U means and parameter estimates against gene length; retain the length definition, measurable gene range and effect/rank changes under use_lengths."
      },
      "fr": {
        "name": "Dépendance à la longueur de la couche non épissée",
        "definition": "Comparer moyennes S/U et paramètres selon la longueur ; consigner définition, plage mesurable et changements d’effets ou de rangs avec use_lengths.",
        "purpose": "Comparer moyennes S/U et paramètres selon la longueur ; consigner définition, plage mesurable et changements d’effets ou de rangs avec use_lengths."
      },
      "es": {
        "name": "Dependencia de longitud de la capa no empalmada",
        "definition": "Comparar medias S/U y parámetros frente a longitud; registrar definición, rango medible y cambios de efectos o rangos con use_lengths.",
        "purpose": "Comparar medias S/U y parámetros frente a longitud; registrar definición, rango medible y cambios de efectos o rangos con use_lengths."
      },
      "eu": {
        "name": "Splicing gabeko geruzaren luzeraren mendekotasuna",
        "definition": "Alderatu S/U batezbestekoak eta parametroak gene-luzeraren arabera; gorde definizioa, tarte neurgarria eta use_lengths aldatzean efektu eta sailkapen aldaketak.",
        "purpose": "Alderatu S/U batezbestekoak eta parametroak gene-luzeraren arabera; gorde definizioa, tarte neurgarria eta use_lengths aldatzean efektu eta sailkapen aldaketak."
      }
    },
    "sequencing_model_sensitivity": {
      "en": {
        "name": "Sensitivity to RNA measurement models",
        "definition": "Compare supported sampling models and search bounds on identical counts and genes; retain fit diagnostics, parameter intervals and noise-candidate stability, beyond optimum likelihood alone.",
        "purpose": "Compare supported sampling models and search bounds on identical counts and genes; retain fit diagnostics, parameter intervals and noise-candidate stability, beyond optimum likelihood alone."
      },
      "fr": {
        "name": "Sensibilité aux modèles de mesure de l’ARN",
        "definition": "Comparer modèles d’échantillonnage et bornes sur les mêmes comptes et gènes ; conserver diagnostics, intervalles et stabilité des candidats, au-delà de la seule vraisemblance optimale.",
        "purpose": "Comparer modèles d’échantillonnage et bornes sur les mêmes comptes et gènes ; conserver diagnostics, intervalles et stabilité des candidats, au-delà de la seule vraisemblance optimale."
      },
      "es": {
        "name": "Sensibilidad a modelos de medición de ARN",
        "definition": "Comparar modelos de muestreo y límites en los mismos conteos y genes; guardar diagnósticos, intervalos y estabilidad de candidatos, además de la verosimilitud óptima.",
        "purpose": "Comparar modelos de muestreo y límites en los mismos conteos y genes; guardar diagnósticos, intervalos y estabilidad de candidatos, además de la verosimilitud óptima."
      },
      "eu": {
        "name": "RNAren neurketa-ereduekiko sentikortasuna",
        "definition": "Alderatu laginketa-ereduak eta mugak kontaketa eta gene beretan; gorde diagnostikoak, parametro-tarteak eta zarata-hautagaien egonkortasuna, optimoaz gain.",
        "purpose": "Alderatu laginketa-ereduak eta mugak kontaketa eta gene beretan; gorde diagnostikoak, parametro-tarteak eta zarata-hautagaien egonkortasuna, optimoaz gain."
      }
    },
    "implementation_representation_concordance": {
      "en": {
        "name": "Representation agreement across implementations",
        "definition": "Freeze raw counts and cell/feature order, record Seurat/Scanpy versions and HVG/PCA/neighbor/clustering settings, then compare HVG overlap, neighborhoods and clustering agreement.",
        "purpose": "Freeze raw counts and cell/feature order, record Seurat/Scanpy versions and HVG/PCA/neighbor/clustering settings, then compare HVG overlap, neighborhoods and clustering agreement."
      },
      "fr": {
        "name": "Concordance des représentations entre implémentations",
        "definition": "Figer comptes et ordre des cellules/gènes, consigner versions et paramètres HVG/PCA/voisinage/clustering, puis comparer recouvrements et concordance des groupes.",
        "purpose": "Figer comptes et ordre des cellules/gènes, consigner versions et paramètres HVG/PCA/voisinage/clustering, puis comparer recouvrements et concordance des groupes."
      },
      "es": {
        "name": "Concordancia de representaciones entre implementaciones",
        "definition": "Fijar conteos y orden celular/génico, registrar versiones y parámetros HVG/PCA/vecinos/agrupamiento, y comparar solapamientos y concordancia de grupos.",
        "purpose": "Fijar conteos y orden celular/génico, registrar versiones y parámetros HVG/PCA/vecinos/agrupamiento, y comparar solapamientos y concordancia de grupos."
      },
      "eu": {
        "name": "Inplementazioen arteko errepresentazio-adostasuna",
        "definition": "Finkatu kontaketak eta zelula/gene ordena, gorde bertsioak eta HVG/PCA/auzotasun/kluster parametroak, eta alderatu gainjartzeak eta klusterren adostasuna.",
        "purpose": "Finkatu kontaketak eta zelula/gene ordena, gorde bertsioak eta HVG/PCA/auzotasun/kluster parametroak, eta alderatu gainjartzeak eta klusterren adostasuna."
      }
    },
    "implementation_inference_stability": {
      "en": {
        "name": "Marker and noise-candidate stability across implementations",
        "definition": "With fixed comparison units and an original-count noise model, distinguish grouping/annotation changes from test-implementation changes; compare marker signs/ranks, label coverage and noise-effect stability.",
        "purpose": "With fixed comparison units and an original-count noise model, distinguish grouping/annotation changes from test-implementation changes; compare marker signs/ranks, label coverage and noise-effect stability."
      },
      "fr": {
        "name": "Stabilité des marqueurs et candidats de bruit entre implémentations",
        "definition": "À unités et modèle de bruit fixes, distinguer changements de groupes/anotations et différences de tests ; comparer signes/rangs, couverture des étiquettes et effets de bruit.",
        "purpose": "À unités et modèle de bruit fixes, distinguer changements de groupes/anotations et différences de tests ; comparer signes/rangs, couverture des étiquettes et effets de bruit."
      },
      "es": {
        "name": "Estabilidad de marcadores y candidatos de ruido entre implementaciones",
        "definition": "Con unidades y modelo de ruido fijos, distinguir cambios de grupos/anotación de diferencias en pruebas; comparar signos/rangos, cobertura de etiquetas y efectos de ruido.",
        "purpose": "Con unidades y modelo de ruido fijos, distinguir cambios de grupos/anotación de diferencias en pruebas; comparar signos/rangos, cobertura de etiquetas y efectos de ruido."
      },
      "eu": {
        "name": "Markatzaile eta zarata-hautagaien egonkortasuna inplementazioen artean",
        "definition": "Konparazio-unitateak eta zarata-eredua finkatuta, bereizi talde/anotazio aldaketak eta testen arteko aldeak; alderatu zeinuak, sailkapenak, etiketen estaldura eta zarata-efektuak.",
        "purpose": "Konparazio-unitateak eta zarata-eredua finkatuta, bereizi talde/anotazio aldaketak eta testen arteko aldeak; alderatu zeinuak, sailkapenak, etiketen estaldura eta zarata-efektuak."
      }
    },
    "noise_testing_family_registry": {
      "en": {
        "name": "Noise-testing families and unassessed-status ledger",
        "definition": "Register genes, states, contrasts, estimands, eligibility rules, raw p-values and failure states; identify the complete family and reporting level for each adjustment.",
        "purpose": "Register genes, states, contrasts, estimands, eligibility rules, raw p-values and failure states; identify the complete family and reporting level for each adjustment."
      },
      "fr": {
        "name": "Familles de tests de bruit et registre des états non évalués",
        "definition": "Enregistrer gènes, états, contrastes, objets estimés, admissibilité, valeurs p brutes et échecs ; identifier la famille complète et le niveau de chaque correction.",
        "purpose": "Enregistrer gènes, états, contrastes, objets estimés, admissibilité, valeurs p brutes et échecs ; identifier la famille complète et le niveau de chaque correction."
      },
      "es": {
        "name": "Familias de pruebas de ruido y registro de estados no evaluados",
        "definition": "Registrar genes, estados, contrastes, estimandos, elegibilidad, valores p originales y fallos; identificar la familia completa y el nivel de cada ajuste.",
        "purpose": "Registrar genes, estados, contrastes, estimandos, elegibilidad, valores p originales y fallos; identificar la familia completa y el nivel de cada ajuste."
      },
      "eu": {
        "name": "Zarata-testen familiak eta ebaluatu gabeko egoeren erregistroa",
        "definition": "Erregistratu geneak, egoerak, kontrasteak, estimandoak, onargarritasuna, p-balio gordinak eta hutsak; identifikatu doikuntza bakoitzaren familia osoa eta txosten-maila.",
        "purpose": "Erregistratu geneak, egoerak, kontrasteak, estimandoak, onargarritasuna, p-balio gordinak eta hutsak; identifikatu doikuntza bakoitzaren familia osoa eta txosten-maila."
      }
    },
    "noise_stagewise_error_calibration": {
      "en": {
        "name": "Error-rate calibration of stage-wise noise testing",
        "definition": "Retain gene screening and contrast confirmation, target OFDR, hypothesis relationships and NA reasons; use design-matched truth simulations to assess gene-level and individual-test errors and power separately.",
        "purpose": "Retain gene screening and contrast confirmation, target OFDR, hypothesis relationships and NA reasons; use design-matched truth simulations to assess gene-level and individual-test errors and power separately."
      },
      "fr": {
        "name": "Calibration des erreurs des tests de bruit par étapes",
        "definition": "Conserver criblage, confirmation, OFDR cible, relations d’hypothèses et causes des NA ; évaluer séparément erreurs et puissance par gène et par test dans des simulations adaptées.",
        "purpose": "Conserver criblage, confirmation, OFDR cible, relations d’hypothèses et causes des NA ; évaluer séparément erreurs et puissance par gène et par test dans des simulations adaptées."
      },
      "es": {
        "name": "Calibración de errores de pruebas de ruido por etapas",
        "definition": "Conservar cribado, confirmación, OFDR objetivo, relaciones de hipótesis y motivos de NA; evaluar errores y potencia por gen y prueba en simulaciones acordes al diseño.",
        "purpose": "Conservar cribado, confirmación, OFDR objetivo, relaciones de hipótesis y motivos de NA; evaluar errores y potencia por gen y prueba en simulaciones acordes al diseño."
      },
      "eu": {
        "name": "Etapazko zarata-testen errore-tasen kalibrazioa",
        "definition": "Gorde baheketa, berrespena, OFDR helburua, hipotesien loturak eta NA arrazoiak; ebaluatu bereiz gene- eta test-mailako erroreak eta potentzia diseinuaren araberako simulazioetan.",
        "purpose": "Gorde baheketa, berrespena, OFDR helburua, hipotesien loturak eta NA arrazoiak; ebaluatu bereiz gene- eta test-mailako erroreak eta potentzia diseinuaren araberako simulazioetan."
      }
    }
  },
  "projects": {
    "mechanistic_joint_rna_noise": {
      "en": {
        "title": "Mechanistic noise comparison from mature/unspliced RNA",
        "question": "Can transcriptional parameters differ identifiably when mean expression is similar?",
        "goal": "Can transcriptional parameters differ identifiably when mean expression is similar?",
        "method": "For yeast genes with sufficient S/U evidence, jointly fit biological and sampling models with Monod and compare means, mechanistic parameters and their uncertainty.",
        "statisticalUnit": "Cells estimate within-group distributions; strains and independent cultures define comparison and validation units.",
        "interpretationBoundary": "Without independent time calibration, interpret rates in model reference units; fitted parameters do not automatically establish absolute transcription rates or purely intrinsic noise."
      },
      "fr": {
        "title": "Comparaison mécaniste du bruit à partir des ARN matures/non épissés",
        "question": "Les paramètres de transcription diffèrent-ils de façon identifiable à expression moyenne comparable ?",
        "goal": "Les paramètres de transcription diffèrent-ils de façon identifiable à expression moyenne comparable ?",
        "method": "Pour les gènes de levure soutenus en S/U, ajuster conjointement processus biologique et échantillonnage avec Monod puis comparer moyennes, paramètres et incertitude.",
        "statisticalUnit": "Les cellules estiment les distributions internes ; souches et cultures indépendantes définissent comparaison et validation.",
        "interpretationBoundary": "Sans étalonnage temporel indépendant, interpréter les vitesses dans les unités de référence du modèle ; les paramètres ajustés ne démontrent pas automatiquement des vitesses absolues ni un bruit purement intrinsèque."
      },
      "es": {
        "title": "Comparación mecanística de ruido con ARN maduro/no empalmado",
        "question": "¿Pueden diferir de forma identificable los parámetros transcripcionales con expresión media similar?",
        "goal": "¿Pueden diferir de forma identificable los parámetros transcripcionales con expresión media similar?",
        "method": "En genes de levadura con evidencia S/U suficiente, ajustar procesos biológicos y muestreo con Monod y comparar medias, parámetros e incertidumbre.",
        "statisticalUnit": "Las células estiman distribuciones internas; cepas y cultivos independientes definen comparación y validación.",
        "interpretationBoundary": "Sin calibración temporal independiente, interpretar las tasas en unidades de referencia del modelo; los parámetros ajustados no establecen automáticamente tasas absolutas ni ruido puramente intrínseco."
      },
      "eu": {
        "title": "Zarataren konparazio mekanistikoa RNA helduarekin eta splicing gabekoarekin",
        "question": "Transkripzio-parametroek alde identifikagarriak al dituzte batezbesteko adierazpena antzekoa denean?",
        "goal": "Transkripzio-parametroek alde identifikagarriak al dituzte batezbesteko adierazpena antzekoa denean?",
        "method": "S/U euskarri nahikoa duten legamia-geneetan, doitu batera Monoden eredu biologikoak eta laginketakoak; alderatu batezbestekoak, parametroak eta ziurgabetasuna.",
        "statisticalUnit": "Zelulek talde barruko banaketak estimatzen dituzte; anduiek eta kultura independenteek konparazioa eta baliozkotzea definitzen dituzte.",
        "interpretationBoundary": "Denbora-kalibrazio independenterik gabe, interpretatu tasak ereduaren erreferentzia-unitateetan; doitutako parametroek ez dituzte berez transkripzio-tasa absolutuak edo barne-zarata hutsa ezartzen."
      }
    },
    "rna_measurement_length_audit": {
      "en": {
        "title": "RNA length-bias and measurement-model audit",
        "question": "Does length-dependent unspliced capture alter kinetic and noise candidates?",
        "goal": "Does length-dependent unspliced capture alter kinetic and noise candidates?",
        "method": "Freeze S/U layers, cells and genes, compare length dependence, use_lengths and supported sampling models, retaining failed fits and parameter uncertainty.",
        "statisticalUnit": "Cells estimate within-group distributions; strains and independent cultures define comparison and validation units.",
        "interpretationBoundary": "Length association is an audit signal for technical and biological mechanisms; correlation alone does not justify removing genes or claiming bias elimination."
      },
      "fr": {
        "title": "Audit des biais de longueur et de la mesure de l’ARN",
        "question": "La capture non épissée dépendante de la longueur modifie-t-elle les candidats cinétiques et de bruit ?",
        "goal": "La capture non épissée dépendante de la longueur modifie-t-elle les candidats cinétiques et de bruit ?",
        "method": "Figer couches S/U, cellules et gènes, comparer dépendance à la longueur, use_lengths et modèles d’échantillonnage, en conservant échecs et incertitude.",
        "statisticalUnit": "Les cellules estiment les distributions internes ; souches et cultures indépendantes définissent comparaison et validation.",
        "interpretationBoundary": "L’association à la longueur signale des mécanismes techniques ou biologiques ; une corrélation seule ne justifie ni exclusion des gènes ni élimination déclarée du biais."
      },
      "es": {
        "title": "Auditoría de sesgo de longitud y medición de ARN",
        "question": "¿La captura no empalmada dependiente de longitud altera candidatos cinéticos y de ruido?",
        "goal": "¿La captura no empalmada dependiente de longitud altera candidatos cinéticos y de ruido?",
        "method": "Fijar capas S/U, células y genes; comparar dependencia de longitud, use_lengths y modelos de muestreo, conservando fallos e incertidumbre.",
        "statisticalUnit": "Las células estiman distribuciones internas; cepas y cultivos independientes definen comparación y validación.",
        "interpretationBoundary": "La asociación con longitud señala mecanismos técnicos o biológicos; la correlación sola no justifica eliminar genes ni afirmar que se eliminó el sesgo."
      },
      "eu": {
        "title": "RNA-luzeraren alborapenaren eta neurketa-ereduen auditoria",
        "question": "Luzeraren araberako splicing gabeko harrapaketak hautagai zinetikoak eta zaratakoak aldatzen al ditu?",
        "goal": "Luzeraren araberako splicing gabeko harrapaketak hautagai zinetikoak eta zaratakoak aldatzen al ditu?",
        "method": "Finkatu S/U geruzak, zelulak eta geneak; alderatu luzerarekiko mendekotasuna, use_lengths eta laginketa-ereduak, hutsak eta ziurgabetasuna gordeta.",
        "statisticalUnit": "Zelulek talde barruko banaketak estimatzen dituzte; anduiek eta kultura independenteek konparazioa eta baliozkotzea definitzen dituzte.",
        "interpretationBoundary": "Luzerarekiko lotura mekanismo teknikoen edo biologikoen adierazlea da; korrelazioak bakarrik ez du geneak kentzea edo alborapena ezabatutzat jotzea justifikatzen."
      }
    },
    "cross_implementation_robustness": {
      "en": {
        "title": "Cross-implementation robustness of Seurat and Scanpy",
        "question": "Do software implementations and versions change annotation, marker or noise conclusions on matched data and comparison units?",
        "goal": "Do software implementations and versions change annotation, marker or noise conclusions on matched data and comparison units?",
        "method": "Run Seurat and Scanpy from a frozen matrix, compare features, neighbors and clusters, then reassess markers and noise under fixed labels and reannotation.",
        "statisticalUnit": "Cells estimate within-group distributions; strains and independent cultures define comparison and validation units.",
        "interpretationBoundary": "Agreement does not establish correctness; retain differences and their effects on conclusions without forcing identical clusters."
      },
      "fr": {
        "title": "Robustesse entre implémentations Seurat et Scanpy",
        "question": "Les implémentations et versions modifient-elles annotations, marqueurs ou conclusions de bruit à données et unités identiques ?",
        "goal": "Les implémentations et versions modifient-elles annotations, marqueurs ou conclusions de bruit à données et unités identiques ?",
        "method": "Exécuter Seurat et Scanpy depuis une matrice figée, comparer caractéristiques, voisinages et groupes, puis réévaluer marqueurs et bruit avec étiquettes fixes ou réannotées.",
        "statisticalUnit": "Les cellules estiment les distributions internes ; souches et cultures indépendantes définissent comparaison et validation.",
        "interpretationBoundary": "La concordance ne prouve pas la justesse ; conserver les différences et leurs effets sans imposer des groupes identiques."
      },
      "es": {
        "title": "Robustez entre implementaciones Seurat y Scanpy",
        "question": "¿Las implementaciones y versiones cambian anotación, marcadores o conclusiones de ruido con datos y unidades coincidentes?",
        "goal": "¿Las implementaciones y versiones cambian anotación, marcadores o conclusiones de ruido con datos y unidades coincidentes?",
        "method": "Ejecutar Seurat y Scanpy desde una matriz fijada, comparar características, vecinos y grupos, y reevaluar marcadores y ruido con etiquetas fijas y reanotadas.",
        "statisticalUnit": "Las células estiman distribuciones internas; cepas y cultivos independientes definen comparación y validación.",
        "interpretationBoundary": "La concordancia no demuestra corrección; conservar diferencias y sus efectos sin forzar grupos idénticos."
      },
      "eu": {
        "title": "Seurat eta Scanpy inplementazioen arteko sendotasuna",
        "question": "Softwarearen inplementazioek eta bertsioek anotazio-, markatzaile- edo zarata-ondorioak aldatzen al dituzte datu eta unitate beretan?",
        "goal": "Softwarearen inplementazioek eta bertsioek anotazio-, markatzaile- edo zarata-ondorioak aldatzen al dituzte datu eta unitate beretan?",
        "method": "Exekutatu Seurat eta Scanpy matrize finko batetik; alderatu ezaugarriak, auzokideak eta klusterrak, eta berrikusi markatzaileak eta zarata etiketa finkoekin eta berranotazioarekin.",
        "statisticalUnit": "Zelulek talde barruko banaketak estimatzen dituzte; anduiek eta kultura independenteek konparazioa eta baliozkotzea definitzen dituzte.",
        "interpretationBoundary": "Adostasunak ez du zuzentasuna frogatzen; gorde aldeak eta ondorioetan duten eragina, kluster berdinak behartu gabe."
      }
    },
    "noise_multiplicity_control": {
      "en": {
        "title": "Noise-hypothesis families and stage-wise testing",
        "question": "When testing multiple states and contrasts, which error level is controlled for reported noise genes and specific claims?",
        "goal": "When testing multiple states and contrasts, which error level is controlled for reported noise genes and specific claims?",
        "method": "Freeze testing families and estimands, pass calibrated gene-screening and contrast p-values to stageR, and assess stage-wise error rates with design-matched simulations.",
        "statisticalUnit": "Cells estimate within-group distributions; strains and independent cultures define comparison and validation units.",
        "interpretationBoundary": "stageR post-processes test results and does not estimate expression noise; applying it to noise contrasts requires calibrated upstream p-values and justified screening/confirmation logic."
      },
      "fr": {
        "title": "Familles d’hypothèses de bruit et tests par étapes",
        "question": "En comparant plusieurs états et contrastes, quel niveau d’erreur est contrôlé pour les gènes de bruit et les conclusions précises ?",
        "goal": "En comparant plusieurs états et contrastes, quel niveau d’erreur est contrôlé pour les gènes de bruit et les conclusions précises ?",
        "method": "Figer familles et objets estimés, fournir à stageR des valeurs p calibrées de criblage et de contrastes, puis vérifier les erreurs dans des simulations adaptées.",
        "statisticalUnit": "Les cellules estiment les distributions internes ; souches et cultures indépendantes définissent comparaison et validation.",
        "interpretationBoundary": "stageR traite les résultats de tests sans estimer le bruit d’expression ; son adaptation aux contrastes de bruit exige des valeurs p calibrées et une logique de criblage/confirmation justifiée."
      },
      "es": {
        "title": "Familias de hipótesis de ruido y pruebas por etapas",
        "question": "Al comparar varios estados y contrastes, ¿qué nivel de error se controla para genes de ruido y afirmaciones concretas?",
        "goal": "Al comparar varios estados y contrastes, ¿qué nivel de error se controla para genes de ruido y afirmaciones concretas?",
        "method": "Fijar familias y estimandos, pasar a stageR valores p calibrados de cribado génico y contrastes y revisar errores con simulaciones acordes al diseño.",
        "statisticalUnit": "Las células estiman distribuciones internas; cepas y cultivos independientes definen comparación y validación.",
        "interpretationBoundary": "stageR procesa resultados de pruebas y no estima ruido de expresión; aplicarlo a contrastes de ruido exige valores p calibrados y una lógica de cribado/confirmación justificada."
      },
      "eu": {
        "title": "Zarata-hipotesien familiak eta etapazko testak",
        "question": "Egoera eta kontraste anitz aztertzean, zer errore-maila kontrolatzen da zarata-gene eta baieztapen zehatzetarako?",
        "goal": "Egoera eta kontraste anitz aztertzean, zer errore-maila kontrolatzen da zarata-gene eta baieztapen zehatzetarako?",
        "method": "Finkatu test-familiak eta estimandoak, eman stageRri gene-baheketako eta kontrasteetako p-balio kalibratuak, eta egiaztatu erroreak diseinuaren araberako simulazioetan.",
        "statisticalUnit": "Zelulek talde barruko banaketak estimatzen dituzte; anduiek eta kultura independenteek konparazioa eta baliozkotzea definitzen dituzte.",
        "interpretationBoundary": "stageRk testen emaitzak prozesatzen ditu, ez adierazpen-zarata estimatzen; zarata-kontrasteetan erabiltzeko aurreko p-balio kalibratuak eta baheketa/berrespen logika justifikatua behar dira."
      }
    }
  }
};window.YV_CONTENT=window.YV_CONTENT||{};for(const [type,rows] of Object.entries(content)){window.YV_CONTENT[type]=window.YV_CONTENT[type]||{};for(const [id,langs] of Object.entries(rows)){const target=window.YV_CONTENT[type][id]=window.YV_CONTENT[type][id]||{};for(const [lang,fields] of Object.entries(langs))target[lang]=Object.assign(target[lang]||{},fields);}}})();
