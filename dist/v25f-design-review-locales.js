'use strict';
// Public-method design-review translations.
(()=>{const text={
  "矩阵层与噪音目标": {
    "en": "Matrix layers and noise estimands",
    "fr": "Couches de matrice et estimandes du bruit",
    "es": "Capas de matriz y estimandos del ruido",
    "eu": "Matrize-geruzak eta zarataren estimandoak"
  },
  "固定原始计数副本；并列比较计数模型offset与归一化描述结果。SCT需记录assay/layer、v1/v2、裁剪和拟合样本，不能仅记录软件名。": {
    "en": "Freeze raw counts; compare count-model offsets with normalized descriptive summaries. Record the SCT assay/layer, v1/v2, clipping and fitting samples.",
    "fr": "Figer les comptages bruts ; comparer offsets des modèles de comptage et résumés normalisés. Consigner couche SCT, v1/v2, écrêtage et échantillons d’ajustement.",
    "es": "Fijar los conteos originales; comparar offsets del modelo con resúmenes normalizados. Registrar ensayo/capa SCT, v1/v2, recorte y muestras de ajuste.",
    "eu": "Finkatu zenbaketa gordinak; konparatu zenbaketa-ereduko offsetak eta laburpen normalizatuak. Erregistratu SCT saiakuntza/geruza, v1/v2, mozketa eta doikuntzako laginak."
  },
  "逐结果保存矩阵来源、取值尺度、版本、裁剪规则与模型/趋势的训练范围。": {
    "en": "Store matrix provenance, value scale, version, clipping and model/trend training scope for each result.",
    "fr": "Conserver pour chaque résultat provenance, échelle, version, écrêtage et périmètre d’apprentissage.",
    "es": "Guardar procedencia, escala, versión, recorte y ámbito de ajuste para cada resultado.",
    "eu": "Gorde emaitza bakoitzaren matrize-jatorria, eskala, bertsioa, mozketa eta ereduaren edo joeraren entrenamendu-esparrua."
  },
  "方法间排序稳定性反映敏感性，不证明已去除技术噪音；SCT校正计数和Pearson残差不是原始分子计数。": {
    "en": "Agreement of rankings measures sensitivity, not removal of technical noise; SCT-corrected counts and Pearson residuals are not raw molecule counts.",
    "fr": "L’accord des classements mesure la sensibilité, pas l’élimination du bruit technique ; les comptages corrigés SCT et résidus de Pearson ne sont pas des comptages moléculaires bruts.",
    "es": "La concordancia de rangos mide sensibilidad, no eliminación del ruido técnico; los conteos corregidos SCT y residuos de Pearson no son conteos moleculares originales.",
    "eu": "Sailkapenen adostasunak sentikortasuna neurtzen du, ez zarata teknikoaren ezabaketa; SCT zenbaketa zuzenduak eta Pearson hondarrak ez dira molekula-zenbaketa gordinak."
  },
  "计算的是原始UMI变异、相对丰度，还是变换后的残差？": {
    "en": "Are we estimating variation in raw UMIs, relative abundance, or transformed residuals?",
    "fr": "Estime-t-on la variation des UMI bruts, de l’abondance relative ou des résidus transformés ?",
    "es": "¿Estimamos variación de UMI originales, abundancia relativa o residuos transformados?",
    "eu": "UMI gordinen, ugaritasun erlatiboaren edo eraldatutako hondarren aldakortasuna estimatzen dugu?"
  },
  "需要现有分析对象、脚本或工具日志来恢复层来源；无需额外组学。": {
    "en": "Existing analysis objects, scripts or logs identify layer provenance; no additional omics assay is needed.",
    "fr": "Les objets, scripts ou journaux existants établissent la provenance ; aucun autre essai omique n’est requis.",
    "es": "Los objetos, scripts o registros existentes identifican la procedencia; no se necesita otra ómica.",
    "eu": "Dauden analisi-objektuek, scriptek edo erregistroek geruzaren jatorria zehazten dute; ez da beste omikarik behar."
  },
  "有限细胞精度与收缩": {
    "en": "Finite-cell precision and shrinkage",
    "fr": "Précision avec peu de cellules et régularisation",
    "es": "Precisión con células limitadas y contracción",
    "eu": "Zelula kopuru mugatuaren zehaztasuna eta uzkurdura"
  },
  "同时保存未收缩与正则化估计、SE/后验区间及失败状态。用保留菌株/培养层级的重抽样评估精度；BASiCS仅在其技术输入分支满足时使用。": {
    "en": "Retain unshrunk and regularized estimates, SE/posterior intervals and failures. Resample at the actual strain/culture hierarchy; use BASiCS only with its required technical inputs.",
    "fr": "Conserver estimations brutes et régularisées, erreurs-types/intervalles et échecs. Rééchantillonner selon la hiérarchie souche/culture ; utiliser BASiCS avec ses entrées techniques requises.",
    "es": "Conservar estimaciones sin contracción y regularizadas, errores estándar/intervalos y fallos. Remuestrear por cepa/cultivo; usar BASiCS solo con sus entradas técnicas requeridas.",
    "eu": "Gorde uzkurtu gabeko eta erregularizatutako estimazioak, errore estandarrak edo tarteak eta hutsegiteak. Birlagindu andui/kultura hierarkia errespetatuz; erabili BASiCS beharrezko sarrera teknikoekin soilik."
  },
  "区分估计精度、正则化影响、拟合边界与真正的重复支持；不把未估计填成零。": {
    "en": "Separate precision, regularization, boundary fits and genuine replication; never encode unestimated traits as zero.",
    "fr": "Distinguer précision, régularisation, limites d’ajustement et répétition réelle ; ne pas coder les traits non estimés par zéro.",
    "es": "Separar precisión, regularización, ajustes límite y replicación real; no convertir rasgos no estimados en cero.",
    "eu": "Bereizi zehaztasuna, erregularizazioa, mugako doikuntzak eta benetako errepikapena; ez kodetu estimatu gabeko ezaugarriak zero gisa."
  },
  "细胞内重抽样量化给定培养的抽样误差；它不产生培养重复。候选入选频率不是生物学真实性概率。": {
    "en": "Within-culture cell resampling quantifies sampling error; it creates no culture replicates. Selection frequency is not the probability of biological truth.",
    "fr": "Le rééchantillonnage cellulaire mesure l’erreur conditionnelle à la culture ; il ne crée pas de répétitions. La fréquence de sélection n’est pas une probabilité de vérité biologique.",
    "es": "El remuestreo celular mide error dentro del cultivo; no crea réplicas. La frecuencia de selección no es la probabilidad de verdad biológica.",
    "eu": "Kultura barruko zelulen birlaginketak laginketa-errorea neurtzen du; ez du kultura-erreplikarik sortzen. Hautaketa-maiztasuna ez da egia biologikoaren probabilitatea."
  },
  "某个菌株的高噪音候选是稳定效应，还是低支持下的极端估计？": {
    "en": "Is a strain-specific high-noise candidate stable, or an extreme estimate with weak support?",
    "fr": "Un candidat à bruit élevé est-il stable ou extrême faute de support suffisant ?",
    "es": "¿Un candidato de ruido alto es estable o una estimación extrema con poco soporte?",
    "eu": "Andui bateko zarata handiko hautagaia egonkorra da, ala ebidentzia urriko muturreko estimazioa?"
  },
  "需要真实计数和来源映射；收缩需保留先验/拟合对象。培养间稳定性另外需要可区分的独立培养。": {
    "en": "Counts and source mapping are required; retain priors/fits for shrinkage. Between-culture stability additionally requires distinguishable independent cultures.",
    "fr": "Comptages et provenance sont requis ; conserver a priori et ajustements. La stabilité inter-cultures exige des cultures indépendantes identifiables.",
    "es": "Se requieren conteos y procedencia; conservar priors y ajustes. La estabilidad entre cultivos exige cultivos independientes identificables.",
    "eu": "Zenbaketak eta jatorri-mapa behar dira; gorde aurretikoak eta doikuntzak. Kulturen arteko egonkortasunak bereiz daitezkeen kultura independenteak behar ditu."
  },
  "重复身份与设计可估计性": {
    "en": "Replicate identity and design estimability",
    "fr": "Identité des répétitions et estimabilité",
    "es": "Identidad de réplicas y estimabilidad",
    "eu": "Errepliken identitatea eta diseinuaren estimagarritasuna"
  },
  "恢复培养到混池/文库的对应；检查实际对比的秩、别名关系及跨批次桥接支持。共同对照只在其覆盖范围内评估批次。": {
    "en": "Recover culture-to-pool/library mapping; inspect contrast rank, aliasing and cross-batch bridges. Shared controls assess batch effects within their actual support.",
    "fr": "Reconstituer culture–pool/bibliothèque ; examiner rang, alias et ponts entre lots. Les témoins communs évaluent les lots dans leur domaine observé.",
    "es": "Recuperar la relación cultivo–pool/biblioteca; revisar rango, alias y conexiones entre lotes. Los controles comunes evalúan lotes dentro de su soporte observado.",
    "eu": "Berreskuratu kultura–pool/liburutegi mapa; aztertu kontrastearen heina, aliasak eta sorten arteko loturak. Kontrol partekatuek behatutako esparruan ebaluatzen dituzte sorta-efektuak."
  },
  "同时记录实验设计中的重复与测序后可识别的重复，给出可估计对比和外推范围。": {
    "en": "Record both designed and identifiable replicates, estimable contrasts and extrapolation scope.",
    "fr": "Consigner répétitions prévues et identifiables, contrastes estimables et domaine d’extrapolation.",
    "es": "Registrar réplicas diseñadas e identificables, contrastes estimables y alcance de extrapolación.",
    "eu": "Erregistratu diseinatutako eta identifika daitezkeen erreplikak, kontraste estimagarriak eta estrapolazio-esparrua."
  },
  "满秩不等于无混杂；混池后不可识别的同基因型培养不能由随机拆细胞恢复。": {
    "en": "Full rank does not imply no confounding; unidentified same-genotype cultures cannot be recovered by random cell splitting.",
    "fr": "Un rang complet n’exclut pas la confusion ; séparer aléatoirement les cellules ne restitue pas les cultures non identifiables d’un même génotype.",
    "es": "El rango completo no excluye confusión; dividir células al azar no recupera cultivos indistinguibles del mismo genotipo.",
    "eu": "Hein osoak ez du nahastea baztertzen; zelulak ausaz zatitzeak ez ditu genotipo bereko kultura identifikaezinak berreskuratzen."
  },
  "测序后能否区分培养、菌株与批次效应？": {
    "en": "Can culture, strain and batch effects be distinguished after sequencing?",
    "fr": "Peut-on distinguer effets de culture, de souche et de lot après séquençage ?",
    "es": "¿Pueden distinguirse efectos de cultivo, cepa y lote tras la secuenciación?",
    "eu": "Sekuentziazioaren ondoren kultura-, andui- eta sorta-efektuak bereiz daitezke?"
  },
  "需要培养/孔位/混池清单及现存标签；缺失身份记录为不可识别，不生成虚构重复。": {
    "en": "Requires culture/well/pool manifests and existing labels; missing identities remain unidentifiable, not fabricated replicates.",
    "fr": "Nécessite manifestes culture/puits/pool et étiquettes existantes ; les identités absentes restent non identifiables.",
    "es": "Requiere listas de cultivo/pozo/pool y etiquetas existentes; las identidades ausentes quedan sin identificar.",
    "eu": "Kultura/putzu/pool zerrendak eta dauden etiketak behar dira; falta diren identitateak identifikatu gabe geratzen dira."
  },
  "空模型、FDR与匹配富集": {
    "en": "Null models, FDR and matched enrichment",
    "fr": "Modèles nuls, FDR et enrichissement apparié",
    "es": "Modelos nulos, FDR y enriquecimiento emparejado",
    "eu": "Eredu nuluak, FDR eta parekatutako aberastea"
  },
  "区分描述性分数与有效p值；用保留设计的空模型重跑筛选和检验，再做多重校正。富集同时使用实际可评估背景与均值/检出率匹配敏感性。": {
    "en": "Separate descriptive scores from valid p-values. Re-run selection and testing under design-preserving nulls before multiplicity correction. Assess enrichment with eligible and mean/detection-matched backgrounds.",
    "fr": "Distinguer scores descriptifs et valeurs p valides. Répéter sélection et tests sous modèles nuls conservant le plan avant correction multiple. Évaluer l’enrichissement avec fonds admissibles et appariés sur moyenne/détection.",
    "es": "Distinguir puntuaciones descriptivas y valores p válidos. Repetir selección y pruebas bajo nulos que preserven el diseño antes de corregir multiplicidad. Evaluar fondos elegibles y emparejados por media/detección.",
    "eu": "Bereizi puntuazio deskribatzaileak eta baliozko p-balioak. Errepikatu hautaketa eta probak diseinua gordetzen duten eredu nuluetan, zuzenketa anizkoitzaren aurretik. Ebaluatu batezbestekoaren/detekzioaren arabera parekatutako atzeko gene-multzoak."
  },
  "保存统计量类型、零假设/选择过程、检验家族、错误与覆盖率，以及可评估分母和匹配富集背景。": {
    "en": "Record statistic type, null/selection process, testing family, error/coverage rates, eligible denominator and matched enrichment background.",
    "fr": "Consigner type de statistique, hypothèse nulle/sélection, famille de tests, erreurs/couverture, dénominateur admissible et fond apparié.",
    "es": "Registrar tipo de estadístico, nulo/selección, familia de pruebas, errores/cobertura, denominador elegible y fondo emparejado.",
    "eu": "Erregistratu estatistiko mota, hipotesi nulua/hautaketa, proba-familia, errorea/estaldura, izendatzaile ebaluagarria eta parekatutako atzeko multzoa."
  },
  "离群带不是已校准显著性；多重校正不能修复无效p值。跨菌株共享度以可评估菌株为分母，富集并不证明因果机制。": {
    "en": "An outlier band is not calibrated significance; multiplicity correction cannot repair invalid p-values. Cross-strain sharing uses eligible strains as denominator, and enrichment is not causal evidence.",
    "fr": "Une bande de valeurs atypiques n’est pas une significativité calibrée ; la correction multiple ne répare pas des valeurs p invalides. Le partage utilise les souches admissibles comme dénominateur ; l’enrichissement n’est pas causal.",
    "es": "Una banda de valores atípicos no equivale a significación calibrada; la corrección múltiple no repara valores p inválidos. La compartición usa cepas elegibles como denominador; el enriquecimiento no es causal.",
    "eu": "Muturreko balioen banda ez da esangura kalibratua; zuzenketa anizkoitzak ez ditu p-balio baliogabeak konpontzen. Anduien arteko partekatzeak ebaluagarriak ditu izendatzaile; aberastea ez da kausalitate-froga."
  },
  "候选由真实变异产生，还是筛选、均值/深度和可评估背景造成？": {
    "en": "Do candidates reflect variability, or selection, mean/depth and eligibility effects?",
    "fr": "Les candidats reflètent-ils la variabilité ou les effets de sélection, moyenne/profondeur et admissibilité ?",
    "es": "¿Los candidatos reflejan variabilidad o efectos de selección, media/profundidad y elegibilidad?",
    "eu": "Hautagaiek aldakortasuna adierazten dute, ala hautaketaren, batezbestekoaren/sakoneraren eta ebaluagarritasunaren eragina?"
  },
  "校准需原始计数和明确模拟真值；富集需版本化基因集与可评估背景。现有统计汇总可先审查来源，未具备模拟时不显示为已校准。": {
    "en": "Calibration needs counts and explicit simulation truth; enrichment needs versioned gene sets and eligible backgrounds. Audit existing statistics first; absent simulations do not count as calibration.",
    "fr": "Le calibrage exige comptages et vérité simulée explicite ; l’enrichissement exige jeux de gènes versionnés et fonds admissibles. Sans simulation, ne pas indiquer un calibrage accompli.",
    "es": "La calibración requiere conteos y verdad simulada explícita; el enriquecimiento requiere conjuntos versionados y fondos elegibles. Sin simulación no se indica calibración completada.",
    "eu": "Kalibrazioak zenbaketak eta simulazioaren egia esplizitua behar ditu; aberasteak bertsiodun gene-multzoak eta atzeko multzo ebaluagarriak. Simulaziorik gabe ez adierazi kalibrazioa burututa dagoenik."
  },
  "状态复用与不确定性传播": {
    "en": "State reuse and uncertainty propagation",
    "fr": "Réutilisation des états et propagation d’incertitude",
    "es": "Reutilización de estados y propagación de incertidumbre",
    "eu": "Egoeren berrerabilera eta ziurgabetasunaren hedapena"
  },
  "记录评分面板/对照集合中的目标基因；比较固定与重学标签、按菌株/培养留出和面板消融。保留unknown与相位共同支持。": {
    "en": "Track targets in scoring panels/control sets; compare fixed versus relearned labels, strain/culture holdouts and panel ablation. Preserve unknown labels and common phase support.",
    "fr": "Repérer les cibles dans les panels/témoins ; comparer étiquettes fixes/réapprises, validation par souche/culture et ablation. Préserver états inconnus et support commun de phase.",
    "es": "Localizar genes objetivo en paneles/controles; comparar etiquetas fijas y reaprendidas, validación por cepa/cultivo y ablación. Conservar desconocidos y soporte común de fase.",
    "eu": "Jarraitu helburuko geneak puntuazio-paneletan/kontroletan; konparatu etiketa finkoak eta berrikasiak, andui/kultura bidezko baliozkotzea eta panelen ablazioa. Mantendu etiketa ezezagunak eta faseko euskarri komuna."
  },
  "记录目标与评分的重叠、训练独立性、方差分母以及标签变化/面板消融对噪音效应的影响。": {
    "en": "Record target–score overlap, training independence, variance denominator and effects of relabeling/panel ablation on noise estimates.",
    "fr": "Consigner chevauchement cible–score, indépendance, dénominateur de variance et effets du réétiquetage/de l’ablation.",
    "es": "Registrar solapamiento gen–puntuación, independencia, denominador de varianza y efectos del reetiquetado/ablación.",
    "eu": "Erregistratu gene–puntuazio gainjartzea, entrenamenduaren independentzia, bariantzaren izendatzailea eta berrietiketatzearen/ablazioaren eraginak."
  },
  "一致性是内部稳定性，不是独立准确度；未校准模块分数不是后验概率。回归残差方差不自动等于内在噪音。": {
    "en": "Agreement is internal stability, not independent accuracy; uncalibrated module scores are not posterior probabilities. Residual variance is not automatically intrinsic noise.",
    "fr": "L’accord indique la stabilité interne, pas une exactitude indépendante ; les scores non calibrés ne sont pas des probabilités a posteriori. La variance résiduelle n’est pas automatiquement intrinsèque.",
    "es": "La concordancia indica estabilidad interna, no exactitud independiente; puntuaciones no calibradas no son probabilidades posteriores. La varianza residual no es automáticamente ruido intrínseco.",
    "eu": "Adostasunak barne-egonkortasuna adierazten du, ez zehaztasun independentea; kalibratu gabeko moduluko puntuazioak ez dira posterior probabilitateak. Hondar-bariantza ez da automatikoki berezko zarata."
  },
  "目标基因是否参与定义状态，并因此改变自己的噪音估计？": {
    "en": "Does the target gene help define state and thereby alter its own noise estimate?",
    "fr": "Le gène cible définit-il l’état et modifie-t-il ainsi sa propre estimation du bruit ?",
    "es": "¿El gen objetivo define el estado y altera así su propia estimación de ruido?",
    "eu": "Helburuko geneak egoera definitzen laguntzen du eta bere zarata-estimazioa aldatzen du?"
  },
  "需要实际评分面板、对照基因、分数变换和训练划分；细胞计数拆分只在相应概率模型假设成立时用于辅助验证。": {
    "en": "Requires actual panels, control genes, score transforms and training splits. Count splitting is an auxiliary check only under its probability-model assumptions.",
    "fr": "Exige panels, gènes témoins, transformations et partitions d’apprentissage réels. Le partage des comptages reste auxiliaire et soumis aux hypothèses probabilistes.",
    "es": "Requiere paneles, genes control, transformaciones y particiones reales. La división de conteos es auxiliar y depende de sus supuestos probabilísticos.",
    "eu": "Benetako panelak, kontrol-geneak, puntuazio-eraldaketak eta entrenamendu-zatiketak behar dira. Zenbaketen zatiketa egiaztapen osagarria da, bere probabilitate-ereduaren baldintzetan."
  },
  "噪音遗传力的分母与估计误差": {
    "en": "Noise heritability: denominator and estimation error",
    "fr": "Héritabilité du bruit : dénominateur et erreur",
    "es": "Heredabilidad del ruido: denominador y error",
    "eu": "Zarataren heredagarritasuna: izendatzailea eta errorea"
  },
  "将噪音性状及SE/抽样协方差连接到亲缘模型；并列均值、离散与状态效应，声明可辨识方差组分和遗传力分母。标准GEMMA/limix不自动传播第一阶段SE。": {
    "en": "Join noise traits and SE/sampling covariance to a kinship model. Compare mean, dispersion and state effects; declare identifiable variance components and the heritability denominator. Standard GEMMA/limix does not automatically propagate first-stage SE.",
    "fr": "Relier traits de bruit et erreurs-types/covariance au modèle de parenté. Comparer effets moyens, dispersion et états ; préciser composantes identifiables et dénominateur. GEMMA/limix standard ne propage pas automatiquement ces erreurs.",
    "es": "Conectar rasgos de ruido y errores estándar/covarianza al modelo de parentesco. Comparar media, dispersión y estado; declarar componentes identificables y denominador. GEMMA/limix estándar no propaga automáticamente esos errores.",
    "eu": "Lotu zarata-ezaugarriak eta errore estandarrak/laginketa-kobariantza ahaidetasun-ereduari. Konparatu batezbesteko, dispertsio eta egoera-efektuak; zehaztu osagai identifikagarriak eta izendatzailea. GEMMA/limix arruntak ez ditu lehen urratseko erroreak automatikoki hedatzen."
  },
  "区分潜在性状与观测性状的遗传力，保存误差处理、亲缘尺度、有效菌株支持及均值/批次校准方案。": {
    "en": "Distinguish latent-trait and observed-trait heritability; record error handling, kinship scale, strain support and mean/batch calibration.",
    "fr": "Distinguer héritabilité latente et observée ; consigner traitement des erreurs, échelle de parenté, souches et calibrage moyenne/lot.",
    "es": "Distinguir heredabilidad latente y observada; registrar errores, escala de parentesco, soporte de cepas y calibración de media/lote.",
    "eu": "Bereizi ezaugarri latentearen eta behatutakoaren heredagarritasuna; erregistratu erroreen tratamendua, ahaidetasun-eskala, anduien euskarria eta batezbesteko/sorta kalibrazioa."
  },
  "遗传样本量按菌株计；标记捕获的加性遗传比例、稳定菌株差异和培养差异分别解释。均值关联不自动成为噪音QTL。": {
    "en": "Genetic sample size counts strains. Interpret marker-captured additive variation, stable strain differences and culture variation separately. Mean association is not automatically a noise QTL.",
    "fr": "La taille génétique compte les souches. Distinguer variation additive captée, différences stables de souche et culture. Une association moyenne n’est pas automatiquement un QTL de bruit.",
    "es": "El tamaño genético cuenta cepas. Distinguir variación aditiva capturada, diferencias estables de cepa y cultivo. Una asociación de media no es automáticamente un QTL de ruido.",
    "eu": "Lagin genetikoaren tamainak anduiak zenbatzen ditu. Bereizi markatzaileek jasotako aldakortasun gehigarria, andui-alde egonkorrak eta kultura-aldakortasuna. Batezbestekoaren asoziazioa ez da automatikoki zarata-QTLa."
  },
  "遗传方差来自可靠噪音性状，还是有限细胞、均值或批次差异？": {
    "en": "Does genetic variance reflect a reliable noise trait, or finite cells, mean effects or batch differences?",
    "fr": "La variance génétique reflète-t-elle un trait de bruit fiable ou des cellules limitées, effets moyens ou lots ?",
    "es": "¿La varianza genética refleja un rasgo de ruido fiable o células limitadas, efectos de media o lotes?",
    "eu": "Bariantza genetikoak zarata-ezaugarri fidagarria adierazten du, ala zelula mugatuak, batezbestekoaren efektuak edo sorten aldeak?"
  },
  "必须有性状估计误差、匹配DNA/亲缘和倍性编码；培养组分另需可区分重复。共享趋势诱导的误差相关性需记录，不能默认独立。": {
    "en": "Requires trait uncertainty, matched DNA/kinship and ploidy encoding; culture components additionally need identifiable replicates. Record shared-fit error correlation rather than assuming independence.",
    "fr": "Exige incertitude des traits, ADN/parenté concordants et codage de ploïdie ; les composantes culture exigent des répétitions identifiables. Consigner les corrélations d’erreur des ajustements partagés.",
    "es": "Requiere incertidumbre del rasgo, ADN/parentesco concordantes y codificación de ploidía; los componentes de cultivo necesitan réplicas identificables. Registrar correlación de errores de ajustes compartidos.",
    "eu": "Ezaugarriaren ziurgabetasuna, DNA/ahaidetasun bateragarriak eta ploidia-kodeketa behar dira; kultura-osagaiek erreplika identifikagarriak behar dituzte. Erregistratu doikuntza partekatuen errore-korrelazioa."
  },
  "保留原始分期与展示映射": {
    "en": "Preserve source phases and display mappings",
    "fr": "Conserver les phases sources et leur correspondance",
    "es": "Conservar fases originales y su correspondencia",
    "eu": "Gorde jatorrizko faseak eta bistaratze-mapak"
  },
  "并列保存作者原阶段、培养与测量条件以及界面的阶段映射；区分分期粒度差异、条件依赖峰位和真正未解冲突。": {
    "en": "Store author-defined phases, culture and assay conditions alongside display mappings; distinguish phase granularity, condition-dependent peaks and unresolved conflicts.",
    "fr": "Conserver phases définies par les auteurs, conditions et mesures avec la correspondance affichée ; distinguer granularité, pics dépendant des conditions et conflits non résolus.",
    "es": "Guardar fases de los autores, condiciones de cultivo y medición junto a la correspondencia visual; separar granularidad, picos dependientes de la condición y conflictos sin resolver.",
    "eu": "Gorde egileek definitutako faseak, hazkuntza eta neurketa-baldintzak bistaratze-mapekin batera; bereizi bereizmen-maila, baldintzen araberako gailurrak eta argitu gabeko gatazkak."
  },
  "原作者分期、培养与测量条件": {
    "en": "Author phase, culture and assay conditions",
    "fr": "Phase de l’auteur, culture et mesure",
    "es": "Fase del autor, cultivo y medición",
    "eu": "Egilearen fasea, hazkuntza eta neurketa-baldintzak"
  },
  "显示分期、映射版本与差异原因；不覆盖原值": {
    "en": "Display phase, mapping version and reason for difference; retain originals",
    "fr": "Phase affichée, version et raison de divergence ; garder les originaux",
    "es": "Fase visual, versión y motivo de diferencia; conservar originales",
    "eu": "Bistaratutako fasea, bertsioa eta diferentziaren arrazoia; gorde jatorrizkoak"
  },
  "阶段映射不覆盖原始标签；同步培养RNA参考不自动成为单细胞阶段真值。": {
    "en": "Mappings do not overwrite source labels; synchronized-population RNA is not automatically single-cell phase ground truth.",
    "fr": "La correspondance ne remplace pas les étiquettes sources ; un ARN de population synchronisée ne constitue pas automatiquement une vérité de phase unicellulaire.",
    "es": "La correspondencia no sustituye etiquetas originales; el ARN de poblaciones sincronizadas no es automáticamente una referencia verdadera de fase unicelular.",
    "eu": "Mapek ez dituzte jatorrizko etiketak ordezkatzen; populazio sinkronizatuaren RNA ez da automatikoki zelula bakarreko fasearen egia-erreferentzia."
  },
  "面板规模、表达与检出配平": {
    "en": "Balance panel size, abundance and detection",
    "fr": "Équilibrer taille, abondance et détection des panels",
    "es": "Equilibrar tamaño, abundancia y detección de paneles",
    "eu": "Orekatu panelaren tamaina, ugaritasuna eta detekzioa"
  },
  "为每个阶段记录逐层可用分母，并比较规模、平均表达和检出率匹配的面板；保存评分背景、控制基因与随机种子，评价留出菌株的稳定性。": {
    "en": "Record eligibility denominators for each phase and compare panels matched for size, mean expression and detection; retain scoring backgrounds, control genes and seeds, then assess held-out strains.",
    "fr": "Documenter les dénominateurs par phase et comparer des panels appariés sur taille, expression moyenne et détection ; garder fonds de score, témoins et graines, puis évaluer les souches réservées.",
    "es": "Registrar denominadores por fase y comparar paneles emparejados por tamaño, expresión media y detección; conservar fondo, genes de control y semillas y evaluar cepas reservadas.",
    "eu": "Erregistratu fase bakoitzeko erabilgarritasun-izendatzaileak eta alderatu tamainaren, batez besteko adierazpenaren eta detekzioaren arabera parekatutako panelak; gorde kontrol-geneak eta haziak, eta ebaluatu gordetako anduiak."
  },
  "原始、身份唯一、矩阵存在、已检测和实际评分的逐层基因分母": {
    "en": "Gene denominators: raw, unique identity, matrix present, detected and scored",
    "fr": "Dénominateurs : bruts, identité unique, présents, détectés et notés",
    "es": "Denominadores: originales, identidad única, presentes, detectados y puntuados",
    "eu": "Gene-izendatzaileak: gordinak, bakarrak, daudenak, detektatuak eta puntuatuak"
  },
  "表达检出配平的面板、控制基因、种子及留出单位": {
    "en": "Expression/detection-matched panels, controls, seeds and holdout units",
    "fr": "Panels appariés expression/détection, témoins, graines et unités réservées",
    "es": "Paneles emparejados por expresión/detección, controles, semillas y unidades reservadas",
    "eu": "Adierazpen/detekzio parekatuko panelak, kontrolak, haziak eta gordetako unitateak"
  },
  "小面板的高分不等于高可信度；跨评分算法的分数尺度不能直接互换。": {
    "en": "A high score from a small panel does not establish high confidence; score scales are not interchangeable across algorithms.",
    "fr": "Un score élevé issu d’un petit panel ne garantit pas la confiance ; les échelles des algorithmes ne sont pas interchangeables.",
    "es": "Una puntuación alta de un panel pequeño no garantiza confianza; las escalas de distintos algoritmos no son intercambiables.",
    "eu": "Panel txiki bateko puntuazio altuak ez du konfiantza handia bermatzen; algoritmoen eskalak ezin dira zuzenean trukatu."
  },
  "周期与交配程序并行标注": {
    "en": "Annotate cycle and mating programs in parallel",
    "fr": "Annoter en parallèle cycle et programmes d’accouplement",
    "es": "Anotar ciclo y programas de apareamiento en paralelo",
    "eu": "Anotatu zikloa eta estaltze-programak paraleloan"
  },
  "将周期相位、a型样RNA、α型样RNA及信息素响应作为并行状态轴；用联合状态和菌株分层检查表达变异，另存MAT基因型与倍性证据。": {
    "en": "Treat cycle phase, a-like RNA, alpha-like RNA and pheromone response as parallel state axes; examine variation by joint state and strain, storing MAT genotype and ploidy separately.",
    "fr": "Traiter phase, ARN de type a, ARN de type alpha et réponse aux phéromones comme axes parallèles ; analyser la variation par état conjoint et souche, avec génotype MAT et ploïdie séparés.",
    "es": "Tratar fase, ARN de tipo a, ARN de tipo alfa y respuesta a feromonas como ejes paralelos; analizar variación por estado conjunto y cepa, guardando genotipo MAT y ploidía por separado.",
    "eu": "Tratatu fasea, a motako RNA, alfa motako RNA eta feromonen erantzuna egoera-ardatz paralelo gisa; aztertu aldakortasuna egoera bateratuaren eta anduiaren arabera, MAT genotipoa eta ploidia aparte gordez."
  },
  "独立保存周期、a型样、α型样和信息素响应的RNA状态与不确定性": {
    "en": "Separate cycle, a-like, alpha-like and pheromone-response RNA states and uncertainty",
    "fr": "États ARN et incertitude séparés : cycle, type a, type alpha et réponse aux phéromones",
    "es": "Estados de ARN e incertidumbre separados: ciclo, tipo a, tipo alfa y respuesta a feromonas",
    "eu": "RNA egoera eta ziurgabetasun bereiziak: zikloa, a eta alfa motak, feromonen erantzuna"
  },
  "MAT与倍性来自独立证据；联合状态保留观测支持": {
    "en": "MAT and ploidy require separate evidence; retain observed support for joint states",
    "fr": "MAT et ploïdie ont des preuves distinctes ; garder le support des états conjoints",
    "es": "MAT y ploidía requieren evidencia separada; conservar apoyo de estados conjuntos",
    "eu": "MATek eta ploidiak ebidentzia bereizia behar dute; gorde egoera bateratuen euskarria"
  },
  "交配程序不作为额外周期阶段；RNA未检出不能单独确定交配型转换或基因型。": {
    "en": "A mating program is not an additional cycle phase; RNA non-detection alone cannot determine mating-type switching or genotype.",
    "fr": "Un programme d’accouplement n’est pas une phase supplémentaire ; une absence de détection d’ARN ne détermine pas seule le changement de type sexuel ou le génotype.",
    "es": "Un programa de apareamiento no es una fase adicional; la falta de ARN detectado no determina por sí sola un cambio de tipo sexual o genotipo.",
    "eu": "Estaltze-programa ez da zikloaren beste fase bat; RNA ez detektatzeak bakarrik ezin du estaltze-motaren aldaketa edo genotipoa zehaztu."
  },
  "区分同面板一致性与独立验证": {
    "en": "Separate within-panel agreement from independent validation",
    "fr": "Distinguer accord interne au panel et validation indépendante",
    "es": "Separar concordancia del mismo panel y validación independiente",
    "eu": "Bereizi panel bereko adostasuna eta baliozkotze independentea"
  },
  "明确哪些基因和培养用于状态学习、哪些用于噪音检验；比较独立参考、完整留出培养或模型匹配的计数分拆，记录候选效应与不确定性。": {
    "en": "Specify genes and cultures used for state learning versus noise testing; compare independent references, held-out cultures or model-matched count splitting, retaining effects and uncertainty.",
    "fr": "Préciser gènes et cultures servant à apprendre les états ou tester le bruit ; comparer références indépendantes, cultures réservées ou division des comptages adaptée au modèle, avec effets et incertitude.",
    "es": "Especificar genes y cultivos usados para aprender estados y probar ruido; comparar referencias independientes, cultivos reservados o división de conteos acorde al modelo, conservando efectos e incertidumbre.",
    "eu": "Zehaztu egoerak ikasteko eta zarata probatzeko geneak eta kultiboak; alderatu erreferentzia independenteak, gordetako kultiboak edo ereduari egokitutako zenbaketa-zatiketa, efektuak eta ziurgabetasuna gordez."
  },
  "学习和检验的培养、菌株与基因，注明重叠": {
    "en": "Cultures, strains and genes used for learning/testing, with overlap",
    "fr": "Cultures, souches et gènes d’apprentissage/test, avec chevauchement",
    "es": "Cultivos, cepas y genes de aprendizaje/prueba, con solapamiento",
    "eu": "Ikaskuntza/probako kultiboak, anduiak eta geneak, gainjartzearekin"
  },
  "分拆模型、参数来源、独立真值状态及留出效应区间": {
    "en": "Split model, parameter provenance, independent-truth status and held-out effect interval",
    "fr": "Modèle de division, provenance des paramètres, vérité indépendante et intervalle réservé",
    "es": "Modelo de división, origen de parámetros, verdad independiente e intervalo reservado",
    "eu": "Zatiketa-eredua, parametroen jatorria, egia independentea eta gordetako efektu-tartea"
  },
  "同一面板产生的标签一致率不是真值准确率；Poisson分拆仅在相应模型下独立，不能替代真实培养重复。": {
    "en": "Agreement between labels from the same panel is not ground-truth accuracy; Poisson splitting is independent only under its model and does not replace culture replication.",
    "fr": "L’accord entre étiquettes du même panel n’est pas une exactitude face à une vérité ; la division de Poisson n’est indépendante que sous son modèle et ne remplace pas les répétitions de culture.",
    "es": "La concordancia de etiquetas del mismo panel no es exactitud frente a una verdad; la división Poisson solo es independiente bajo su modelo y no sustituye réplicas de cultivo.",
    "eu": "Panel bereko etiketen adostasuna ez da egia-erreferentziaren araberako zehaztasuna; Poisson zatiketa bere eredupean baino ez da independentea eta ez ditu kultibo-errepikak ordezkatzen."
  },
  "分开RNA染色体信号与DNA剂量证据": {
    "en": "Separate chromosome RNA signals from DNA dosage evidence",
    "fr": "Séparer signal ARN chromosomique et dosage ADN",
    "es": "Separar señales de ARN cromosómico y dosis de ADN",
    "eu": "Bereizi kromosomako RNA seinaleak eta DNA dosiaren ebidentzia"
  },
  "RNA数据先描述染色体表达偏移和跨染色体程序一致性，并检查参考与多重比对；只有匹配菌株的DNA拷贝数、倍性及坐标证据可用于剂量关联。": {
    "en": "Use RNA to describe chromosome expression shifts and cross-chromosome program support, checking references and ambiguous mappings; dosage associations require matched-strain DNA copy number, ploidy and coordinates.",
    "fr": "Décrire par l’ARN les décalages chromosomiques et la cohérence des programmes entre chromosomes, en contrôlant référence et alignements ambigus ; les associations de dosage nécessitent copies ADN, ploïdie et coordonnées de la souche correspondante.",
    "es": "Describir con ARN cambios cromosómicos y apoyo de programas entre cromosomas, revisando referencia y alineamientos ambiguos; las asociaciones de dosis requieren número de copias de ADN, ploidía y coordenadas de la cepa correspondiente.",
    "eu": "Erabili RNA kromosomako adierazpen-aldaketak eta kromosomen arteko programak deskribatzeko, erreferentziak eta lerrokatze anbiguoak aztertuz; dosi-elkarteek andui bereko DNA kopia-kopurua, ploidia eta koordenatuak behar dituzte."
  },
  "RNA染色体偏移、比对歧义和跨染色体程序支持": {
    "en": "Chromosome RNA shift, mapping ambiguity and cross-chromosome program support",
    "fr": "Décalage ARN chromosomique, ambiguïté et support du programme interchromosomique",
    "es": "Cambio cromosómico de ARN, ambigüedad y apoyo del programa entre cromosomas",
    "eu": "Kromosomako RNA aldaketa, anbiguotasuna eta kromosomen arteko programaren euskarria"
  },
  "匹配菌株DNA剂量、倍性及证据；缺失时仅保留RNA假说": {
    "en": "Matched-strain DNA dosage, ploidy and evidence; retain RNA hypothesis when absent",
    "fr": "Dosage ADN, ploïdie et preuve de la souche correspondante ; sinon hypothèse ARN",
    "es": "Dosis de ADN, ploidía y evidencia de cepa coincidente; si faltan, hipótesis de ARN",
    "eu": "Andui bereko DNA dosia, ploidia eta ebidentzia; falta badira, RNA hipotesia"
  },
  "RNA偏移可提出剂量假说，不能单独验证非整倍体；缺少DNA时保留RNA关联结果。": {
    "en": "RNA shifts can motivate a dosage hypothesis but cannot alone validate aneuploidy; without DNA, retain an RNA association.",
    "fr": "Un décalage d’ARN peut motiver une hypothèse de dosage, sans valider seul une aneuploïdie ; sans ADN, conserver une association ARN.",
    "es": "Un cambio de ARN puede motivar una hipótesis de dosis, pero no validar por sí solo aneuploidía; sin ADN, conservar la asociación de ARN.",
    "eu": "RNA aldaketek dosi-hipotesia iradoki dezakete, baina ezin dute aneuploidia bakarrik baliozkotu; DNArik gabe, gorde RNA elkartea."
  },
  "按可检验菌株计算噪音复现": {
    "en": "Calculate noise recurrence among testable strains",
    "fr": "Calculer la récurrence du bruit parmi les souches testables",
    "es": "Calcular recurrencia del ruido entre cepas evaluables",
    "eu": "Kalkulatu zarataren errepikapena ebaluagarri diren anduietan"
  },
  "将高变、低变、已评估不显著、不可评估和拟合失败分开，按每基因实际可检验菌株计算复现；并列保留连续效应和区间，检查各群体可测性与菌株数。": {
    "en": "Separate high variation, low variation, evaluated non-significance, ineligibility and fit failure; calculate per-gene recurrence among testable strains, retaining continuous effects and intervals and checking group coverage.",
    "fr": "Séparer forte/faible variation, non-significativité évaluée, inéligibilité et échec ; calculer la récurrence par gène parmi les souches testables, avec effets continus, intervalles et couverture des groupes.",
    "es": "Separar variación alta/baja, no significación evaluada, inelegibilidad y fallo de ajuste; calcular recurrencia por gen entre cepas evaluables y conservar efectos, intervalos y cobertura por grupo.",
    "eu": "Bereizi aldakortasun handia/txikia, ebaluatutako ez-esanguratsutasuna, ebaluatu ezina eta doikuntza-hutsegitea; kalkulatu gene bakoitzeko errepikapena andui ebaluagarrietan eta gorde efektuak, tarteak eta talde-estaldura."
  },
  "可评估与拟合状态、连续方向效应和区间": {
    "en": "Eligibility and fit status, continuous directional effect and interval",
    "fr": "Éligibilité, ajustement, effet continu directionnel et intervalle",
    "es": "Elegibilidad, ajuste, efecto continuo direccional e intervalo",
    "eu": "Ebaluagarritasuna, doikuntza-egoera, norabidedun efektua eta tartea"
  },
  "满足预定条件的菌株数、可评估菌株分母和群体配平敏感性": {
    "en": "Strains meeting criteria, evaluable-strain denominator and group-balance sensitivity",
    "fr": "Souches retenues, dénominateur évaluable et sensibilité à l’équilibrage des groupes",
    "es": "Cepas que cumplen criterios, denominador evaluable y sensibilidad al equilibrio de grupos",
    "eu": "Irizpideak betetzen dituzten anduiak, izendatzaile ebaluagarria eta talde-orekatze sentikortasuna"
  },
  "未检验不等于低噪音；不同菌株数或检出能力下的阳性次数不能直接作为群体差异。": {
    "en": "Untested does not mean low noise; positive counts cannot directly measure group differences when strain numbers or detectability differ.",
    "fr": "Non testé ne signifie pas faible bruit ; des comptes positifs ne mesurent pas directement une différence de groupe si effectifs ou détectabilité diffèrent.",
    "es": "No evaluado no significa ruido bajo; los recuentos positivos no miden directamente diferencias de grupo si difieren número de cepas o detectabilidad.",
    "eu": "Probatu gabeak ez du zarata txikia esan nahi; positiboen kopuruek ez dituzte talde-diferentziak zuzenean neurtzen andui-kopurua edo detektagarritasuna desberdinak direnean."
  },
  "为必需性富集保留实验背景": {
    "en": "Retain experimental context for essentiality enrichment",
    "fr": "Conserver le contexte expérimental de l’enrichissement en essentialité",
    "es": "Conservar contexto experimental del enriquecimiento de esencialidad",
    "eu": "Gorde esentzialtasun-aberastearen testuinguru esperimentala"
  },
  "保存必需性证据的菌株、等位类型、条件和来源；在每个实际检验基因背景内报告富集方向、列联计数、效应区间及校正范围。": {
    "en": "Retain strain, allele type, conditions and source of essentiality evidence; report enrichment direction, contingency counts, effect intervals and correction scope within each tested gene universe.",
    "fr": "Conserver souche, type d’allèle, conditions et source de l’essentialité ; rapporter direction, effectifs de contingence, intervalles et périmètre de correction dans chaque univers testé.",
    "es": "Conservar cepa, tipo de alelo, condiciones y fuente de esencialidad; informar dirección, conteos de contingencia, intervalos y ámbito de corrección en cada universo de genes probado.",
    "eu": "Gorde esentzialtasun-ebidentziaren anduia, alelo mota, baldintzak eta iturria; eman aberastearen norabidea, kontingentzia-kopuruak, tarteak eta zuzenketa-eremua probatutako gene-multzo bakoitzean."
  },
  "必需性原实验的菌株、等位类型、条件和来源": {
    "en": "Strain, allele type, conditions and source of the essentiality experiment",
    "fr": "Souche, type d’allèle, conditions et source de l’expérience d’essentialité",
    "es": "Cepa, tipo de alelo, condiciones y fuente del experimento de esencialidad",
    "eu": "Esentzialtasun-esperimentuko anduia, alelo mota, baldintzak eta iturria"
  },
  "实际检验背景、列联表计数、优势比区间和方向": {
    "en": "Tested universe, contingency counts, odds-ratio interval and direction",
    "fr": "Univers testé, contingence, intervalle du rapport de cotes et direction",
    "es": "Universo probado, contingencia, intervalo de razón de momios y dirección",
    "eu": "Probatutako multzoa, kontingentzia, odds ratio tartea eta norabidea"
  },
  "参考菌株的缺失致死表型不自动推广到全部自然菌株；功能富集也不等于表达程序激活。": {
    "en": "Deletion lethality in a reference strain does not automatically generalize to every natural strain; functional enrichment is not program activation.",
    "fr": "La létalité d’une délétion dans une souche de référence ne se généralise pas automatiquement aux souches naturelles ; enrichissement fonctionnel ne signifie pas activation.",
    "es": "La letalidad por deleción en una cepa de referencia no se generaliza automáticamente a todas las naturales; enriquecimiento funcional no equivale a activación.",
    "eu": "Erreferentzia-anduiko ezabapen hilgarria ez da automatikoki andui natural guztietara hedatzen; aberaste funtzionalak ez du programaren aktibazioa esan nahi."
  },
  "混池身份与培养追踪": {
    "en": "Pool identity and culture tracking",
    "fr": "Identité des pools et suivi des cultures",
    "es": "Identidad de mezclas y seguimiento de cultivos",
    "eu": "Poolen identitatea eta kulturen jarraipena"
  },
  "对齐实际混入、参考基因型与观测菌株；记录培养、捕获、建库及测序关系，输出可追踪的样本清单和可估计对比。": {
    "en": "Reconcile loaded strains, reference genotypes and observed identities. Track culture, capture, library and sequencing relationships; report the sample manifest and estimable contrasts.",
    "fr": "Réconcilier les souches chargées, les génotypes de référence et les identités observées. Relier cultures, captures, bibliothèques et séquençage; produire le manifeste et les contrastes estimables.",
    "es": "Conciliar cepas cargadas, genotipos de referencia e identidades observadas. Relacionar cultivos, capturas, bibliotecas y secuenciación; documentar el manifiesto y los contrastes estimables.",
    "eu": "Sartutako anduiak, erreferentziako genotipoak eta behatutako identitateak bateratu. Kulturak, harrapaketak, liburutegiak eta sekuentziazioa lotu; lagin-zerrenda eta kontraste estimagarriak eman."
  },
  "培养至lane的身份字段用于连接真实样本，不把分装或lane算为培养重复。": {
    "en": "Identity fields connect cultures to sequencing lanes; aliquots and lanes do not define culture replication.",
    "fr": "Les identifiants relient cultures et lanes; aliquotes et lanes ne définissent pas la réplication des cultures.",
    "es": "Los identificadores conectan cultivos y carriles; alícuotas y carriles no definen réplicas de cultivo.",
    "eu": "Identifikatzaileek kulturak eta erreiak lotzen dituzte; alikuotek eta erreiek ez dute kultura-errepikapena definitzen."
  },
  "清单比较预期、观测和参考身份；设计秩与不可估计对比记录分析能支持的比较。": {
    "en": "Lists compare expected, observed and reference identities; design rank and non-estimable contrasts delimit supported comparisons.",
    "fr": "Les listes comparent identités attendues, observées et de référence; le rang et les contrastes non estimables délimitent les comparaisons possibles.",
    "es": "Las listas comparan identidades esperadas, observadas y de referencia; rango y contrastes no estimables delimitan comparaciones posibles.",
    "eu": "Zerrendek espero diren, behatutako eta erreferentziako identitateak alderatzen dituzte; matrizearen heina eta kontraste ez-estimagarriak mugak dira."
  },
  "细胞和lane不等于独立培养；同基因型培养物混合且无额外标签后，其来源不能靠SNP恢复。": {
    "en": "Cells and lanes are not independent cultures. SNPs cannot recover separately cultured samples with the same genotype after unlabelled pooling.",
    "fr": "Les cellules et les lanes ne sont pas des cultures indépendantes. Les SNP ne séparent pas des cultures de même génotype mélangées sans étiquette supplémentaire.",
    "es": "Las células y los carriles no son cultivos independientes. Los SNP no separan cultivos del mismo genotipo mezclados sin etiquetas adicionales.",
    "eu": "Zelulak eta sekuentziazio-erreiak ez dira kultura independenteak. SNPek ezin dituzte etiketa gehigarririk gabe nahastutako genotipo bereko kulturak bereizi."
  },
  "实际覆盖的身份判别信息": {
    "en": "Observed information for identity discrimination",
    "fr": "Information observée pour distinguer les identités",
    "es": "Información observada para distinguir identidades",
    "eu": "Identitateak bereizteko behatutako informazioa"
  },
  "按条形码和候选菌株配对统计实际覆盖、质量合格且可区分两者的SNP与UMI支持；保存逐级过滤的信息损失。": {
    "en": "For each barcode and candidate donor pair, count observed quality-qualified SNPs and UMI support that distinguish the pair; record information lost at each filter.",
    "fr": "Pour chaque code-barres et paire de donneurs, compter les SNP observés de qualité suffisante et les UMI permettant de les distinguer; suivre les pertes à chaque filtre.",
    "es": "Para cada código de barras y pareja de donantes, contar SNP observados de calidad suficiente y UMI que los distinguen; registrar las pérdidas de cada filtro.",
    "eu": "Barra-kode eta emaile-bikote bakoitzerako, kalitate nahikoz behatutako SNP bereizgarriak eta UMI euskarria zenbatu; iragazki bakoitzeko informazio-galera gorde."
  },
  "每个条形码和候选配对分别记录可判别位点、UMI支持和冲突；不以全库位点数代替。": {
    "en": "For each barcode and candidate pair, record discriminating sites, UMI support and conflicts rather than whole-panel site counts.",
    "fr": "Pour chaque code-barres et paire, noter sites discriminants, UMI et conflits plutôt que le nombre total de sites.",
    "es": "Por código de barras y pareja, registrar sitios discriminantes, UMI y conflictos, no el total del panel.",
    "eu": "Barra-kode eta bikote bakoitzean gune bereizgarriak, UMI euskarria eta gatazkak gorde, panel osoaren kopurua ordezkatu gabe."
  },
  "hash与过滤顺序确定使用哪个位点面板；MAF的群体和跨位点UMI计数单位必须可追踪。": {
    "en": "Hashes and filter order identify the panel; retain the MAF population and cross-site UMI counting unit.",
    "fr": "Les empreintes et l’ordre des filtres identifient le panel; conserver la population de MAF et l’unité UMI entre sites.",
    "es": "Huellas y orden de filtros identifican el panel; conservar la población de MAF y la unidad UMI entre sitios.",
    "eu": "Hash-ek eta iragazkien ordenak panela identifikatzen dute; MAF populazioa eta gune arteko UMI unitatea gorde."
  },
  "全VCF距离不能替代实际RNA可判别信息；无可判别位点的候选保留等价身份组。跨SNP累计UMI需声明分子是否重复。": {
    "en": "Whole-VCF distance does not replace observed RNA discrimination. Retain equivalent identity groups when no distinguishing sites exist; declare whether UMIs are counted repeatedly across SNPs.",
    "fr": "La distance sur le VCF entier ne remplace pas le pouvoir discriminant de l’ARN observé. Conserver les groupes indiscernables et préciser le recomptage éventuel des UMI entre SNP.",
    "es": "La distancia del VCF completo no sustituye la discriminación del ARN observado. Conservar grupos indistinguibles y declarar si los UMI se cuentan de nuevo entre SNP.",
    "eu": "VCF osoaren distantziak ez du behatutako RNAren bereizmen-informazioa ordezkatzen. Bereizi ezin diren identitate-taldeak gorde, eta adierazi UMIak SNP artean berriz zenbatzen diren."
  },
  "菌株解混校准与敏感性": {
    "en": "Demultiplexing calibration and sensitivity",
    "fr": "Calibration et sensibilité du démultiplexage",
    "es": "Calibración y sensibilidad de la desmultiplexación",
    "eu": "Desmultiplexazioaren kalibrazioa eta sentikortasuna"
  },
  "固定候选样本、计数单位及过滤条件，比较SNP子集、深度、混合比例和工具版本；有真值时评估错误率，无真值时报告一致性。": {
    "en": "Fix donor candidates, counting units and filters, then compare SNP subsets, depth, mixture proportions and tool versions. Estimate errors with truth; otherwise report agreement.",
    "fr": "Fixer les donneurs candidats, les unités de comptage et les filtres; comparer sous-ensembles de SNP, profondeur, proportions et versions. Avec une vérité de référence, estimer les erreurs; sinon, rapporter la concordance.",
    "es": "Fijar donantes candidatos, unidades y filtros; comparar subconjuntos de SNP, profundidad, proporciones y versiones. Estimar errores con una referencia conocida; en su ausencia, informar concordancia.",
    "eu": "Emaile hautagaiak, zenbaketa-unitateak eta iragazkiak finkatu; SNP azpimultzoak, sakonera, nahaste-proportzioak eta bertsioak alderatu. Erreferentzia ezagunarekin erroreak neurtu; bestela, adostasuna eman."
  },
  "记录实际命令对应的版本、候选、基因型字段、质量条件、先验和分数尺度。": {
    "en": "Record version, candidates, genotype fields, quality filters, priors and score scale for the actual command.",
    "fr": "Noter version, candidats, champs génotypiques, filtres, a priori et échelle des scores de la commande réelle.",
    "es": "Registrar versión, candidatos, campos genotípicos, filtros, priors y escala de puntuación de la orden real.",
    "eu": "Benetako komandoaren bertsioa, hautagaiak, genotipo-eremuak, iragazkiak, aurreko probabilitateak eta puntuazio-eskala gorde."
  },
  "验证字段说明是否有独立真值、如何留出SNP、错误或一致性如何分层；资源开销另列。": {
    "en": "Validation fields identify independent truth, held-out SNPs and stratified error or agreement; record resource costs separately.",
    "fr": "Les champs de validation précisent vérité indépendante, SNP réservés et erreurs ou concordance stratifiées; séparer les coûts informatiques.",
    "es": "Los campos de validación indican verdad independiente, SNP reservados y error o concordancia estratificados; separar costes informáticos.",
    "eu": "Baliozkotze-eremuek egia independentea, gordetako SNPak eta errore edo adostasun geruzatua zehazten dituzte; baliabide-kostuak aparte gorde."
  },
  "未分配率降低不等于准确率提高；真实细胞拼接的伪双细胞不是独立身份真值。对数似然差与概率比不可混用。": {
    "en": "Fewer unassigned cells do not establish higher accuracy. Synthetic doublets built from inferred cells are not independent identity truth. Distinguish log-likelihood differences from likelihood ratios.",
    "fr": "Moins de cellules non assignées ne prouve pas une meilleure exactitude. Les doublets synthétiques issus d’identités inférées ne sont pas une vérité indépendante. Distinguer différence de log-vraisemblance et rapport de vraisemblance.",
    "es": "Menos células sin asignar no demuestra mayor exactitud. Los dobletes sintéticos de identidades inferidas no son una verdad independiente. Distinguir diferencias de log-verosimilitud y cocientes de verosimilitud.",
    "eu": "Esleitu gabeko zelula gutxiagok ez dute zehaztasun handiagoa frogatzen. Inferitutako zelulez sortutako bikoteak ez dira egia independentea. Log-egiantzekotasunen diferentzia eta egiantzekotasunen ratioa bereizi."
  },
  "按菌株丰度校正双细胞伙伴": {
    "en": "Abundance-adjusted doublet partners",
    "fr": "Partenaires de doublets corrigés de l’abondance",
    "es": "Parejas de dobletes ajustadas por abundancia",
    "eu": "Ugaritasunaren arabera doitutako zelula-bikoteak"
  },
  "按可信菌株丰度建立随机装载的伙伴期望，对照实际配对、表达分数与等位混合；保留每滴和每菌株参与次数的分母。": {
    "en": "Use estimated donor abundance to define random-loading pair expectations; compare observed pairs, expression scores and allelic mixtures. Keep droplet and donor-participation denominators distinct.",
    "fr": "Définir les paires attendues sous chargement aléatoire à partir de l’abondance estimée; comparer observations, scores d’expression et mélanges alléliques. Séparer les dénominateurs par goutte et par participation.",
    "es": "Definir parejas esperadas bajo carga aleatoria a partir de la abundancia estimada; comparar observaciones, puntuaciones de expresión y mezclas alélicas. Separar denominadores de gotas y de participación.",
    "eu": "Emaileen ugaritasunetik ausazko kargaren bikote-itxaropenak kalkulatu; behatutako bikoteak, adierazpen-puntuazioak eta alelo-nahasteak alderatu. Tantaren eta emaile-partaidetzaren izendatzaileak bereizi."
  },
  "丰度估计需记录所用细胞集合和不确定性；观测、期望与残差采用同一个配对分母。": {
    "en": "Abundance estimates retain the cell set and uncertainty; observed counts, expectations and residuals share the same pair denominator.",
    "fr": "Les abondances conservent ensemble cellulaire et incertitude; observations, attentes et résidus partagent le même dénominateur de paires.",
    "es": "Las abundancias conservan conjunto celular e incertidumbre; observaciones, expectativas y residuos comparten denominador de parejas.",
    "eu": "Ugaritasunak zelula-multzoa eta ziurgabetasuna jasotzen ditu; behaketek, itxaropenek eta hondarrek bikote-izendatzaile bera dute."
  },
  "表达与基因型分数并列，保存混合比例及原始/复核标签；单列同基因型多细胞未解决范围。": {
    "en": "Keep expression and genotype scores, mixture fractions and original/reviewed labels side by side; record unresolved same-genotype multiplets.",
    "fr": "Juxtaposer scores d’expression et génotypiques, proportions et étiquettes originales/révisées; signaler les multiplets de même génotype non résolus.",
    "es": "Mostrar puntuaciones de expresión y genotipo, proporciones y etiquetas originales/revisadas; registrar multipletes del mismo genotipo no resueltos.",
    "eu": "Adierazpen- eta genotipo-puntuazioak, proportzioak eta jatorrizko/berrikusitako etiketak batera gorde; ebatzi gabeko genotipo bereko multzoak adierazi."
  },
  "高丰度来源更常成为伙伴；偏斜本身不证明假双细胞。同基因型多细胞不能仅靠SNP排除。": {
    "en": "Abundant donors are expected to appear more often as partners; skew alone does not prove false doublets. SNPs alone do not exclude same-genotype multiplets.",
    "fr": "Les donneurs abondants sont plus souvent partenaires; une asymétrie seule ne prouve pas de faux doublets. Les SNP seuls n’excluent pas les multiplets de même génotype.",
    "es": "Los donantes abundantes aparecen más como pareja; la asimetría no demuestra dobletes falsos. Los SNP por sí solos no excluyen multipletes del mismo genotipo.",
    "eu": "Emaile ugariak maizago agertuko dira bikotekide; desorekak bakarrik ez du bikote faltsurik frogatzen. SNPek bakarrik ez dituzte genotipo bereko zelula anitzeko tantak baztertzen."
  },
  "背景RNA的表达层与等位层": {
    "en": "Expression and allele layers of ambient RNA",
    "fr": "Couches d’expression et alléliques de l’ARN ambiant",
    "es": "Capas de expresión y alelos del ARN ambiental",
    "eu": "Inguruneko RNAren adierazpen- eta alelo-geruzak"
  },
  "分别记录表达矩阵去背景和等位证据模型。比较空滴背景、身份分配与校正前后的表达分布，明确哪一层真正改变。": {
    "en": "Record expression-matrix correction separately from allelic contamination models. Compare empty-droplet profiles, identity assignments and expression distributions; specify which layer changed.",
    "fr": "Séparer la correction de matrice et les modèles de contamination allélique. Comparer profils des gouttes vides, identités et distributions; préciser la couche réellement modifiée.",
    "es": "Separar la corrección de matrices y los modelos de contaminación alélica. Comparar gotas vacías, identidades y distribuciones; precisar qué capa cambió.",
    "eu": "Matrize-zuzenketa eta alelo-kutsaduraren ereduak bereizita gorde. Tanta hutsak, identitateak eta banaketak alderatu; zein geruza aldatu den zehaztu."
  },
  "输入/输出层、背景barcode、表达/等位背景谱及估计证据决定污染模型可解释范围。": {
    "en": "Input/output layers, background barcodes, expression/allele profiles and estimation evidence define the contamination model scope.",
    "fr": "Couches d’entrée/sortie, codes-barres ambiants, profils d’expression/allèles et preuves d’estimation définissent la portée du modèle.",
    "es": "Capas de entrada/salida, códigos ambientales, perfiles de expresión/alelos y evidencia de estimación delimitan el modelo.",
    "eu": "Sarrera/irteera-geruzek, inguruneko barra-kodeek, adierazpen/alelo-profilek eta estimazio-ebidentziak eredua mugatzen dute."
  },
  "明确身份是否重新估计及BAM是否改变；方差与尾部变化必须注明原始和校正层。": {
    "en": "State whether identities were re-estimated and BAM changed; variance and tail differences must name raw and corrected layers.",
    "fr": "Préciser si les identités ont été réestimées et le BAM modifié; les différences de variance et de queue doivent nommer les couches brutes et corrigées.",
    "es": "Indicar si se reestimaron identidades y cambió el BAM; diferencias de varianza y colas deben identificar capas originales y corregidas.",
    "eu": "Identitateak berriro estimatu eta BAM aldatu diren zehaztu; bariantza eta isats-diferentzietan jatorrizko eta zuzendutako geruzak izendatu."
  },
  "SoupX的计数矩阵输出不会修改原BAM中的SNP证据；跨方法结果是敏感性分析，不应无条件串联校正。": {
    "en": "SoupX count output does not modify SNP evidence in the original BAM. Treat alternatives as sensitivity branches rather than unconditional sequential correction.",
    "fr": "La matrice SoupX ne modifie pas les SNP du BAM original. Comparer les méthodes comme branches de sensibilité, sans corrections successives systématiques.",
    "es": "La matriz de SoupX no modifica los SNP del BAM original. Comparar métodos como ramas de sensibilidad, sin encadenar correcciones automáticamente.",
    "eu": "SoupX-en matrizeak ez du jatorrizko BAMeko SNP ebidentzia aldatzen. Metodoak sentikortasun-adar gisa alderatu, zuzenketak automatikoki kateatu gabe."
  },
  "筛选保留率与分布选择偏倚": {
    "en": "Filter retention and distributional selection",
    "fr": "Rétention après filtrage et sélection des distributions",
    "es": "Retención del filtrado y selección de distribuciones",
    "eu": "Iragazki-atxikipena eta banaketa-hautapena"
  },
  "保留逐条形码过滤轨迹，按菌株、状态及深度比较保留率、均值、零值和尾部；在真实重复结构下评估噪音估计精度。": {
    "en": "Keep a barcode-level filter history. Compare retention, means, zeros and tails by strain, state and depth; evaluate noise precision using the actual replication structure.",
    "fr": "Conserver l’historique des filtres par code-barres. Comparer rétention, moyennes, zéros et queues selon souche, état et profondeur; évaluer la précision avec la réplication réelle.",
    "es": "Conservar el historial por código de barras. Comparar retención, medias, ceros y colas por cepa, estado y profundidad; evaluar precisión con la replicación real.",
    "eu": "Barra-kode bakoitzaren iragazketa-historia gorde. Atxikipena, batezbestekoak, zeroak eta isatsak andui, egoera eta sakoneraren arabera alderatu; doitasuna benetako errepikapenarekin ebaluatu."
  },
  "逐barcode记录每一步的合格分母、保留标记和全部排除原因；身份未知保持独立类别。": {
    "en": "Per barcode and stage, retain eligibility denominators, kept flags and all rejection reasons; unknown identity stays a separate category.",
    "fr": "Par code-barres et étape, conserver dénominateur admissible, rétention et tous les motifs de rejet; l’identité inconnue reste distincte.",
    "es": "Por código y etapa, conservar denominador elegible, retención y todos los motivos de exclusión; identidad desconocida queda separada.",
    "eu": "Barra-kode eta urrats bakoitzean izendatzaile egokia, atxikipena eta baztertze-arrazoi guztiak gorde; identitate ezezaguna bereizi."
  },
  "记录菌株/状态/深度分层、参数版本、分布变化和抽样设计；区间对应明确目标细胞群。": {
    "en": "Record strain/state/depth strata, parameter version, distribution changes and subsampling design; intervals refer to a defined target population.",
    "fr": "Noter strates souche/état/profondeur, paramètres, changements de distribution et sous-échantillonnage; les intervalles concernent une population définie.",
    "es": "Registrar estratos cepa/estado/profundidad, parámetros, cambios de distribución y submuestreo; los intervalos corresponden a una población definida.",
    "eu": "Andui/egoera/sakonera geruzak, parametroak, banaketa-aldaketak eta azpilaginketa gorde; tarteak definitutako populazioari dagozkio."
  },
  "统一阈值不保证群体可比；低信息条形码不可强制归属。细胞下采样不创造独立培养重复。": {
    "en": "A common threshold does not ensure comparable populations. Do not force low-information identities; cell subsampling does not create independent cultures.",
    "fr": "Un seuil commun ne garantit pas des populations comparables. Ne pas forcer les identités peu informatives; le sous-échantillonnage ne crée pas de cultures indépendantes.",
    "es": "Un umbral común no garantiza poblaciones comparables. No forzar identidades poco informativas; el submuestreo no crea cultivos independientes.",
    "eu": "Atalase komun batek ez du populazioen alderagarritasuna bermatzen. Ez behartu informazio gutxiko identitateak; azpilaginketak ez du kultura independenterik sortzen."
  },
  "Fastdemux候选接口与适配检查": {
    "en": "Fastdemux candidate interface and compatibility",
    "fr": "Interface et compatibilité du candidat Fastdemux",
    "es": "Interfaz y compatibilidad del candidato Fastdemux",
    "eu": "Fastdemux hautagaiaren interfazea eta bateragarritasuna"
  },
  "将Fastdemux保留为研究候选：固定源码和构建环境，核对输入标签、倍性与初轮/第二轮筛选，并与既有解混结果比较。": {
    "en": "Keep Fastdemux as a research candidate: pin source and build environment, check tags, ploidy and first/second-pass filtering, and compare against existing assignments.",
    "fr": "Conserver Fastdemux comme candidat: fixer source et environnement, vérifier étiquettes, ploïdie et filtres des deux passes, puis comparer les assignations.",
    "es": "Mantener Fastdemux como candidato: fijar código y entorno, verificar etiquetas, ploidía y filtros de ambas pasadas, y comparar asignaciones.",
    "eu": "Fastdemux ikerketa-hautagai gisa mantendu: kodea eta ingurunea finkatu, etiketak, ploidia eta bi pasaldietako iragazkiak egiaztatu, eta esleipenak alderatu."
  },
  "固定commit、自报版本、依赖、路径与候选清单；核对倍性编码以及实际CB/UB标签。": {
    "en": "Pin commit, reported version, dependencies, paths and candidates; check ploidy encoding and actual CB/UB tags.",
    "fr": "Fixer commit, version déclarée, dépendances, chemins et candidats; vérifier codage de ploïdie et étiquettes CB/UB réelles.",
    "es": "Fijar commit, versión declarada, dependencias, rutas y candidatos; comprobar ploidía y etiquetas CB/UB reales.",
    "eu": "Commit-a, aitortutako bertsioa, mendekotasunak, bideak eta hautagaiak finkatu; ploidia eta benetako CB/UB etiketak egiaztatu."
  },
  "保留两轮输出并对账身份、覆盖及稀有来源；门槛仅记录源码常数，性能由独立运行验证。": {
    "en": "Keep both passes and reconcile identities, coverage and rare donors; thresholds document source constants, while performance requires independent runs.",
    "fr": "Conserver les deux passes et rapprocher identités, couverture et donneurs rares; les seuils décrivent le code, les performances nécessitent des essais indépendants.",
    "es": "Conservar ambas pasadas y conciliar identidades, cobertura y donantes raros; los umbrales describen constantes del código, el rendimiento requiere ejecuciones independientes.",
    "eu": "Bi pasaldiak gorde eta identitateak, estaldura eta emaile urriak bateratu; atalaseak kode-konstanteak dira, errendimendua exekuzio independentez egiaztatzen da."
  },
  "源码核验不等于酵母性能验证。当前读取路径含二倍体假设、CB/UB要求及固定第二轮门槛；低丰度菌株必须单独审计。": {
    "en": "Source inspection is not yeast performance validation. Current code includes diploid assumptions, CB/UB requirements and fixed second-pass gates; audit low-abundance donors separately.",
    "fr": "L’inspection du code ne valide pas les performances chez la levure. Le code actuel comporte hypothèses diploïdes, exigences CB/UB et seuils fixes en seconde passe; examiner les donneurs rares.",
    "es": "La inspección del código no valida rendimiento en levadura. El código actual incluye supuestos diploides, requisitos CB/UB y filtros fijos de segunda pasada; auditar donantes raros.",
    "eu": "Kodearen ikuskapenak ez du legamiako errendimendua baliozkotzen. Egungo kodeak diploidia, CB/UB eta bigarren pasaldiko atalase finkoak erabiltzen ditu; emaile urrienak bereiz aztertu."
  }
};Object.assign(window.YV_TEXT||(window.YV_TEXT={}),text);})();
