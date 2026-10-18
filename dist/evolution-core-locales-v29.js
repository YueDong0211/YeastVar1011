'use strict';
// Evolution core: all visible explanatory text in five languages.
(()=>{const text={
  "菌株噪音的贝叶斯协方差模型": {
    "en": "Bayesian covariance models of strain noise",
    "fr": "Modèles bayésiens de covariance du bruit entre souches",
    "es": "Modelos bayesianos de covarianza del ruido entre cepas",
    "eu": "Anduien zarataren kobariantza eredu bayestarrak"
  },
  "菌株层面的连续噪音性状、明确尺度及抽样标准误；培养、状态、均值和批次协变量。": {
    "en": "Continuous strain-level noise traits, a defined scale and sampling standard errors; culture, state, mean and batch covariates.",
    "fr": "Traits continus de bruit par souche, échelle définie et erreurs types d’échantillonnage ; covariables de culture, état, moyenne et lot.",
    "es": "Rasgos continuos de ruido por cepa, escala definida y errores estándar de muestreo; covariables de cultivo, estado, media y lote.",
    "eu": "Andui-mailako zarata-ezaugarri jarraituak, eskala zehaztua eta laginketa-errore estandarrak; kultura, egoera, batezbesteko eta sortaren kobariableak."
  },
  "se()使用抽样标准误。第一阶段后验标准差需经校准或联合建模；直接把后验当似然会重复计入先验。相关估计误差需显式抽样协方差或联合模型。": {
    "en": "se() takes sampling standard errors. First-stage posterior standard deviations require calibration or joint modelling; treating a posterior as a likelihood counts its prior again. Correlated estimation errors require an explicit sampling covariance or joint model.",
    "fr": "se() utilise des erreurs types d’échantillonnage. Les écarts types a posteriori du premier stade exigent une calibration ou un modèle conjoint ; traiter un posterior comme une vraisemblance réutilise son a priori. Les erreurs corrélées exigent une covariance explicite ou un modèle conjoint.",
    "es": "se() utiliza errores estándar de muestreo. Las desviaciones posteriores de la primera etapa requieren calibración o un modelo conjunto; tratar el posterior como verosimilitud reutiliza su prior. Los errores correlacionados requieren covarianza explícita o modelado conjunto.",
    "eu": "se() funtzioak laginketa-errore estandarrak hartzen ditu. Lehen etapako posteriorren desbideratzeek kalibrazioa edo baterako eredua behar dute; posteriorra egiantzekotasuntzat hartzeak aurretiko banaketa berriz zenbatzen du. Errore korrelatuek laginketa-kobariantza esplizitua edo baterako eredua behar dute."
  },
  "按问题选择基因组亲缘K或树协方差C，核对尺度、菌株顺序和正定性。两者高度相关时，分别拟合并比较敏感性；联合模型需额外可辨识性依据。": {
    "en": "Choose genomic kinship K or tree covariance C for the question, checking scale, strain order and positive definiteness. When strongly correlated, fit separate models and compare sensitivity; a joint model needs additional identifiability evidence.",
    "fr": "Choisir l’apparentement génomique K ou la covariance de l’arbre C ; vérifier échelle, ordre des souches et définition positive. Si elles sont fortement corrélées, comparer des modèles séparés ; leur combinaison exige une justification d’identifiabilité.",
    "es": "Elegir parentesco genómico K o covarianza del árbol C; comprobar escala, orden de cepas y definición positiva. Si están muy correlacionadas, comparar modelos separados; combinarlas exige justificar su identificabilidad.",
    "eu": "Aukeratu K ahaidetasun genomikoa edo C zuhaitz-kobariantza; egiaztatu eskala, anduien ordena eta definitutasun positiboa. Oso korrelatuta badaude, doitu eredu bereiziak; baterako ereduak identifikagarritasun-ebidentzia behar du."
  },
  "菌株是遗传比较单位，培养用于重复性，细胞用于估计菌株内分布。树方差占比和Pagel λ描述系统发育结构；SNP遗传力另需基因组K及明确方差分母。": {
    "en": "Strains are genetic comparison units, cultures assess reproducibility, and cells estimate within-strain distributions. Tree variance fractions and Pagel λ describe phylogenetic structure; SNP heritability requires genomic K and an explicit variance denominator.",
    "fr": "Les souches sont les unités de comparaison génétique, les cultures évaluent la reproductibilité et les cellules les distributions intra-souche. Fraction de variance phylogénétique et λ de Pagel décrivent la structure de l’arbre ; l’héritabilité SNP exige K génomique et un dénominateur explicite.",
    "es": "Las cepas son las unidades genéticas, los cultivos evalúan reproducibilidad y las células estiman distribuciones dentro de cada cepa. La fracción de varianza del árbol y λ de Pagel describen estructura filogenética; la heredabilidad SNP requiere K genómico y denominador explícito.",
    "eu": "Anduiak dira konparazio genetikoaren unitateak, kulturek erreproduzigarritasuna aztertzen dute eta zelulek andui barruko banaketak estimatzen dituzte. Zuhaitz-bariantzak eta Pagelen λ-k egitura filogenetikoa deskribatzen dute; SNP heredagarritasunak K genomikoa eta izendatzaile esplizitua behar ditu."
  },
  "该配方组合官方API进行项目适配。检查高斯性状近似、先验敏感性、设计秩及预测校准；MCMC用于给定模型的后验抽样，未来进化预测另需机制与时间信息。": {
    "en": "This recipe combines official APIs for project adaptation. Check the Gaussian trait approximation, prior sensitivity, design rank and predictive calibration. MCMC samples a specified model posterior; forecasting evolution requires additional mechanisms and temporal information.",
    "fr": "Cette recette combine des API officielles pour le projet. Vérifier approximation gaussienne, sensibilité aux a priori, rang du plan et calibration prédictive. MCMC échantillonne le posterior d’un modèle ; prédire l’évolution exige mécanismes et données temporelles supplémentaires.",
    "es": "Esta receta combina API oficiales para adaptar el proyecto. Comprobar aproximación gaussiana, sensibilidad al prior, rango del diseño y calibración predictiva. MCMC muestrea el posterior de un modelo; predecir evolución requiere mecanismos e información temporal adicionales.",
    "eu": "Errezeta honek API ofizialak uztartzen ditu proiektura egokitzeko. Egiaztatu hurbilketa gaussiarra, aurretiko sentikortasuna, diseinuaren heina eta iragarpen-kalibrazioa. MCMCk eredu baten posteriorra lagintzen du; eboluzioa iragartzeko mekanismoak eta denbora-informazioa ere behar dira."
  },
  "已有菌株树及分支长度、根与来源；每个末端对应一个可比较的噪音性状和抽样标准误。": {
    "en": "An existing strain tree with branch lengths, root and provenance; one comparable noise trait and sampling standard error per tip.",
    "fr": "Arbre de souches existant avec longueurs de branches, racine et provenance ; un trait de bruit comparable et son erreur type par extrémité.",
    "es": "Árbol de cepas existente con longitudes de ramas, raíz y procedencia; un rasgo de ruido comparable y error estándar por terminal.",
    "eu": "Lehendik dagoen andui-zuhaitza, adar-luzerak, erroa eta jatorriarekin; mutur bakoitzeko zarata-ezaugarri konparagarri bat eta laginketa-errore estandarra."
  },
  "菌株树需来自明确的历史重建依据，记录重组、杂交与拓扑敏感性。RNA状态轨迹和RNA velocity描述细胞状态过程，不能替代菌株历史树。": {
    "en": "A strain tree needs an explicit historical reconstruction basis, with recombination, hybridization and topology sensitivity recorded. RNA trajectories and RNA velocity describe cell-state processes rather than strain ancestry.",
    "fr": "L’arbre de souches exige une reconstruction historique explicite, avec recombinaison, hybridation et sensibilité topologique documentées. Trajectoires ARN et RNA velocity décrivent les états cellulaires plutôt que l’ascendance des souches.",
    "es": "El árbol de cepas exige una reconstrucción histórica explícita y registrar recombinación, hibridación y sensibilidad topológica. Las trayectorias de ARN y RNA velocity describen estados celulares, no ascendencia de cepas.",
    "eu": "Andui-zuhaitzak historia berreraikitzeko oinarri esplizitua behar du, birkonbinazio, hibridazio eta topologiaren sentikortasuna dokumentatuta. RNA ibilbideek eta RNA velocity-k zelula-egoerak deskribatzen dituzte, ez anduien arbasotasuna."
  },
  "λ由似然优化估计，检验相对λ=0的系统发育信号；可行上限由树决定，可能超过1。λ不是遗传力、选择强度或适应性证据。": {
    "en": "λ is estimated by likelihood optimization, testing phylogenetic signal relative to λ=0. Its feasible upper bound depends on the tree and may exceed 1. λ is not heritability, selection strength or evidence of adaptation.",
    "fr": "λ est estimé par optimisation de la vraisemblance, avec test du signal par rapport à λ=0. Sa borne supérieure dépend de l’arbre et peut dépasser 1. λ ne mesure ni héritabilité, ni force de sélection, ni adaptation.",
    "es": "λ se estima optimizando la verosimilitud y contrasta señal frente a λ=0. Su límite superior depende del árbol y puede superar 1. λ no es heredabilidad, intensidad de selección ni evidencia de adaptación.",
    "eu": "λ egiantzekotasuna optimizatuz estimatzen da, λ=0-rekiko seinalea probatuz. Goiko muga zuhaitzaren araberakoa da eta 1 baino handiagoa izan daiteke. λ ez da heredagarritasuna, hautespen-indarra edo egokitzapen-ebidentzia."
  },
  "保存独立链、rank-normalized R-hat、bulk/tail ESS、MCSE与发散；并列先验敏感性、后验预测和留出菌株/支系校准。": {
    "en": "Retain independent chains, rank-normalized R-hat, bulk/tail ESS, MCSE and divergences; report prior sensitivity, posterior predictive checks and held-out strain/clade calibration.",
    "fr": "Conserver chaînes indépendantes, R-hat normalisé par rang, ESS central/extrême, MCSE et divergences ; rapporter sensibilité aux a priori, vérifications prédictives et calibration sur souches/clades réservés.",
    "es": "Conservar cadenas independientes, R-hat normalizado por rangos, ESS central/colas, MCSE y divergencias; informar sensibilidad al prior, comprobaciones predictivas y calibración con cepas/clados reservados.",
    "eu": "Gorde kate independenteak, rank-normalized R-hat, bulk/tail ESS, MCSE eta dibergentziak; aurkeztu aurretiko sentikortasuna, posteriorren iragarpen-egiaztapenak eta gordetako andui/kladoen kalibrazioa."
  },
  "规划器检查输入与来源字段是否完整；矩阵、树和采样诊断由实际数据分析核验。": {
    "en": "The planner checks completeness of inputs and provenance fields; actual analyses validate matrices, trees and sampler diagnostics.",
    "fr": "Le planificateur vérifie les champs d’entrée et de provenance ; l’analyse effective valide matrices, arbres et diagnostics d’échantillonnage.",
    "es": "El planificador comprueba entradas y procedencia; el análisis real valida matrices, árboles y diagnósticos de muestreo.",
    "eu": "Planifikatzaileak sarreren eta jatorri-eremuen osotasuna egiaztatzen du; benetako analisiak baliozkotzen ditu matrizeak, zuhaitzak eta laginketa-diagnostikoak."
  },
  "性状尺度、估计目标与抽样SE来源": {
    "en": "Trait scale, estimand and sampling-SE source",
    "fr": "Échelle, cible estimée et source des erreurs types",
    "es": "Escala, objetivo estimado y fuente del error estándar",
    "eu": "Ezaugarri-eskala, estimazio-helburua eta SEaren jatorria"
  },
  "第一阶段似然、先验与两阶段误差校准记录": {
    "en": "First-stage likelihood, prior and two-stage error-calibration record",
    "fr": "Vraisemblance, a priori du premier stade et calibration en deux étapes",
    "es": "Verosimilitud, prior inicial y calibración del error en dos etapas",
    "eu": "Lehen etapako egiantzekotasun, aurretiko eta bi etapako errore-kalibrazioaren erregistroa"
  },
  "菌株、培养、状态与批次设计列及独立单位": {
    "en": "Strain, culture, state and batch design columns and independent units",
    "fr": "Colonnes souche, culture, état, lot et unités indépendantes",
    "es": "Columnas de cepa, cultivo, estado, lote y unidades independientes",
    "eu": "Andui, kultura, egoera, sorta diseinu-zutabeak eta unitate independenteak"
  },
  "基因组K来源、尺度、菌株顺序与正定性检查": {
    "en": "Genomic K source, scale, strain order and positive-definiteness check",
    "fr": "Source de K génomique, échelle, ordre et définition positive",
    "es": "Fuente de K genómico, escala, orden y definición positiva",
    "eu": "K genomikoaren jatorria, eskala, ordena eta definitutasun positiboa"
  },
  "树来源、重建方法、根与分支长度单位": {
    "en": "Tree source, reconstruction method, root and branch-length units",
    "fr": "Source de l’arbre, reconstruction, racine et unités des branches",
    "es": "Fuente del árbol, reconstrucción, raíz y unidades de las ramas",
    "eu": "Zuhaitzaren jatorria, berreraikuntza, erroa eta adar-unitateak"
  },
  "树末端到菌株性状的匹配与聚合规则": {
    "en": "Tree-tip to strain-trait matching and aggregation rules",
    "fr": "Correspondance extrémités–traits et règles d’agrégation",
    "es": "Correspondencia terminales–rasgos y reglas de agregación",
    "eu": "Zuhaitz-mutur eta andui-ezaugarrien parekatzea eta agregazioa"
  },
  "重组、杂交与备选拓扑的敏感性方案": {
    "en": "Sensitivity plan for recombination, hybridization and alternative topologies",
    "fr": "Sensibilité à la recombinaison, hybridation et topologies alternatives",
    "es": "Sensibilidad a recombinación, hibridación y topologías alternativas",
    "eu": "Birkonbinazio, hibridazio eta topologia alternatiboen sentikortasun-plana"
  },
  "树协方差C的构建、尺度与正定性检查": {
    "en": "Tree-covariance C construction, scale and positive-definiteness check",
    "fr": "Construction, échelle et définition positive de C",
    "es": "Construcción, escala y definición positiva de C",
    "eu": "C zuhaitz-kobariantza eraikitzea, eskala eta definitutasun positiboa"
  },
  "官方API与版本依据": {
    "en": "Official API and version evidence",
    "fr": "API officielle et version",
    "es": "API oficial y versión",
    "eu": "API ofiziala eta bertsioaren ebidentzia"
  },
  "原始方法论文": {
    "en": "Original methods paper",
    "fr": "Article méthodologique original",
    "es": "Artículo metodológico original",
    "eu": "Jatorrizko metodo-artikulua"
  },
  "性状效应、协方差组分及后验区间": {
    "en": "Trait effects, covariance components and posterior intervals",
    "fr": "Effets, composantes de covariance et intervalles postérieurs",
    "es": "Efectos, componentes de covarianza e intervalos posteriores",
    "eu": "Efektuak, kobariantza-osagaiak eta posterior-tarteak"
  },
  "抽样误差与额外残差": {
    "en": "Sampling error and additional residual variance",
    "fr": "Erreur d’échantillonnage et variance résiduelle",
    "es": "Error de muestreo y varianza residual",
    "eu": "Laginketa-errorea eta hondar-bariantza"
  },
  "选择K或C协方差": {
    "en": "Select K or C covariance",
    "fr": "Choisir la covariance K ou C",
    "es": "Elegir covarianza K o C",
    "eu": "Aukeratu K edo C kobariantza"
  },
  "先验与后验抽样方案": {
    "en": "Prior and posterior-sampling design",
    "fr": "Plan des a priori et de l’échantillonnage",
    "es": "Diseño del prior y del muestreo posterior",
    "eu": "Aurretiko eta posterior-laginketaren diseinua"
  },
  "模型、尺度与可估计性": {
    "en": "Model, scale and estimability",
    "fr": "Modèle, échelle et estimabilité",
    "es": "Modelo, escala y estimabilidad",
    "eu": "Eredua, eskala eta estimagarritasuna"
  },
  "基因组亲缘K模型": {
    "en": "Genomic kinship K model",
    "fr": "Modèle d’apparentement génomique K",
    "es": "Modelo de parentesco genómico K",
    "eu": "K ahaidetasun genomikoaren eredua"
  },
  "菌株树协方差C模型": {
    "en": "Strain-tree covariance C model",
    "fr": "Modèle de covariance C de l’arbre des souches",
    "es": "Modelo de covarianza C del árbol de cepas",
    "eu": "Andui-zuhaitzaren C kobariantza eredua"
  },
  "以brms 2.23.2官方接口为依据；执行时记录安装版本、Stan后端和posterior版本。": {
    "en": "Based on the official brms 2.23.2 interface; record installed versions of brms, the Stan backend and posterior.",
    "fr": "Fondé sur l’interface officielle brms 2.23.2 ; consigner les versions installées de brms, du moteur Stan et de posterior.",
    "es": "Basado en la interfaz oficial de brms 2.23.2; registrar versiones instaladas de brms, backend Stan y posterior.",
    "eu": "brms 2.23.2 interfaze ofizialean oinarritua; gorde instalatutako brms, Stan backend eta posterior bertsioak."
  },
  "含性状抽样误差的系统发育信号": {
    "en": "Phylogenetic signal with trait sampling error",
    "fr": "Signal phylogénétique avec erreur d’échantillonnage des traits",
    "es": "Señal filogenética con error de muestreo del rasgo",
    "eu": "Seinale filogenetikoa ezaugarriaren laginketa-errorearekin"
  },
  "phytools::phylosig的se参数提供与x同尺度、同菌株名称的性状抽样标准误。第一阶段后验标准差需先校准；相关性状估计误差需使用可表示抽样协方差的模型。": {
    "en": "The se argument of phytools::phylosig supplies trait sampling standard errors on the same scale as x and with matching strain names. Calibrate first-stage posterior standard deviations; correlated trait-estimation errors require a model that represents sampling covariance.",
    "fr": "L’argument se de phytools::phylosig fournit les erreurs types d’échantillonnage du trait, sur la même échelle que x et avec les mêmes noms de souches. Calibrer les écarts types postérieurs du premier stade ; les erreurs corrélées nécessitent un modèle représentant leur covariance.",
    "es": "El argumento se de phytools::phylosig proporciona errores estándar de muestreo del rasgo en la misma escala que x y con nombres de cepa coincidentes. Calibrar las desviaciones posteriores iniciales; los errores correlacionados requieren un modelo que represente su covarianza de muestreo.",
    "eu": "phytools::phylosig-en se argumentuak ezaugarriaren laginketa-errore estandarrak ematen ditu, x-ren eskala eta andui-izen berekin. Kalibratu lehen etapako posterior-desbideratzeak; estimazio-errore korrelatuek laginketa-kobariantza adierazten duen eredua behar dute."
  },
  "Pagel λ、对数似然、相对λ=0的检验及树/误差敏感性": {
    "en": "Pagel λ, log likelihood, test against λ=0 and tree/error sensitivity",
    "fr": "λ de Pagel, log-vraisemblance, test contre λ=0 et sensibilité arbre/erreur",
    "es": "λ de Pagel, log-verosimilitud, contraste frente a λ=0 y sensibilidad a árbol/error",
    "eu": "Pagelen λ, log-egiantzekotasuna, λ=0-ren aurkako proba eta zuhaitz/errore sentikortasuna"
  },
  "似然信号检验": {
    "en": "Likelihood-based signal test",
    "fr": "Test du signal par vraisemblance",
    "es": "Prueba de señal por verosimilitud",
    "eu": "Egiantzekotasun bidezko seinale-proba"
  },
  "核验phylosig.Rd提交5c185533dbb3c3076200c1e0aa45de36701e1116；执行时记录安装版本与数值敏感性。": {
    "en": "Verified phylosig.Rd at commit 5c185533dbb3c3076200c1e0aa45de36701e1116; record installed version and numerical sensitivity.",
    "fr": "phylosig.Rd vérifié au commit 5c185533dbb3c3076200c1e0aa45de36701e1116 ; noter version installée et sensibilité numérique.",
    "es": "phylosig.Rd verificado en commit 5c185533dbb3c3076200c1e0aa45de36701e1116; registrar versión instalada y sensibilidad numérica.",
    "eu": "phylosig.Rd egiaztatua 5c185533dbb3c3076200c1e0aa45de36701e1116 commit-ean; gorde instalatutako bertsioa eta zenbakizko sentikortasuna."
  },
  "Pagel λ与抽样标准误": {
    "en": "Pagel λ with sampling standard errors",
    "fr": "λ de Pagel avec erreurs types d’échantillonnage",
    "es": "λ de Pagel con errores estándar de muestreo",
    "eu": "Pagelen λ laginketa-errore estandarrekin"
  },
  "后验抽样与预测校准": {
    "en": "Posterior sampling and predictive calibration",
    "fr": "Échantillonnage postérieur et calibration prédictive",
    "es": "Muestreo posterior y calibración predictiva",
    "eu": "Posterior-laginketa eta iragarpen-kalibrazioa"
  },
  "诊断量与预测误差": {
    "en": "Diagnostic quantities and prediction errors",
    "fr": "Quantités diagnostiques et erreurs prédictives",
    "es": "Cantidades diagnósticas y errores predictivos",
    "eu": "Diagnostiko-neurriak eta iragarpen-erroreak"
  },
  "逐参数、逐链及预定义留出单位": {
    "en": "Per parameter, chain and predefined hold-out unit",
    "fr": "Par paramètre, chaîne et unité réservée",
    "es": "Por parámetro, cadena y unidad reservada",
    "eu": "Parametro, kate eta gordetako unitate bakoitzeko"
  },
  "模型/链/菌株": {
    "en": "Model/chain/strain",
    "fr": "Modèle/chaîne/souche",
    "es": "Modelo/cadena/cepa",
    "eu": "Eredua/katea/anduia"
  },
  "区分采样精度、模型拟合和外推校准": {
    "en": "Separate sampling precision, model fit and transfer calibration",
    "fr": "Distinguer précision, ajustement et calibration du transfert",
    "es": "Distinguir precisión, ajuste y calibración de transferencia",
    "eu": "Bereizi laginketa-zehaztasuna, doikuntza eta transferentzia-kalibrazioa"
  },
  "R-hat与链ESS用于真实MCMC链；变分推断样本需另行校准。收敛诊断通过后仍需检验模型与估计目标。": {
    "en": "R-hat and chain ESS apply to actual MCMC chains; variational draws need separate calibration. Convergence diagnostics are followed by model and estimand checks.",
    "fr": "R-hat et ESS des chaînes concernent les chaînes MCMC ; les tirages variationnels exigent une calibration distincte. Compléter la convergence par une vérification du modèle et de la cible.",
    "es": "R-hat y ESS de cadenas se aplican a cadenas MCMC; las muestras variacionales requieren calibración separada. Completar convergencia con comprobación del modelo y objetivo.",
    "eu": "R-hat eta kate-ESS benetako MCMC kateei dagozkie; lagin bariazionalek kalibrazio bereizia behar dute. Konbergentziaren ondoren eredua eta estimazio-helburua egiaztatu."
  },
  "噪音性状的系统发育信号": {
    "en": "Phylogenetic signal in noise traits",
    "fr": "Signal phylogénétique des traits de bruit",
    "es": "Señal filogenética de rasgos de ruido",
    "eu": "Zarata-ezaugarrien seinale filogenetikoa"
  },
  "λ、对数似然及检验结果": {
    "en": "λ, log likelihood and test results",
    "fr": "λ, log-vraisemblance et tests",
    "es": "λ, log-verosimilitud y pruebas",
    "eu": "λ, log-egiantzekotasuna eta proben emaitzak"
  },
  "已定义树及每菌株性状尺度": {
    "en": "Defined tree and per-strain trait scale",
    "fr": "Arbre défini et échelle du trait par souche",
    "es": "Árbol definido y escala del rasgo por cepa",
    "eu": "Zuhaitz zehaztua eta andui bakoitzeko ezaugarri-eskala"
  },
  "基因/菌株树": {
    "en": "Gene/strain tree",
    "fr": "Gène/arbre de souches",
    "es": "Gen/árbol de cepas",
    "eu": "Genea/andui-zuhaitza"
  },
  "检验相近菌株是否具有相似噪音性状": {
    "en": "Test whether related strains have similar noise traits",
    "fr": "Tester la similarité du bruit entre souches apparentées",
    "es": "Evaluar similitud del ruido entre cepas emparentadas",
    "eu": "Andui ahaideek zarata-ezaugarri antzekoak dituzten probatu"
  },
  "噪音模型的贝叶斯后验": {
    "en": "Bayesian posterior for a noise model",
    "fr": "Posterior bayésien d’un modèle de bruit",
    "es": "Posterior bayesiano de un modelo de ruido",
    "eu": "Zarata-ereduaren posterior bayestarra"
  },
  "模型参数及可辨识潜变量": {
    "en": "Model parameters and identifiable latent variables",
    "fr": "Paramètres et variables latentes identifiables",
    "es": "Parámetros y variables latentes identificables",
    "eu": "Eredu-parametroak eta aldagai latente identifikagarriak"
  },
  "明确的观测模型、设计和先验": {
    "en": "Specified observation model, design and prior",
    "fr": "Modèle d’observation, plan et a priori définis",
    "es": "Modelo de observación, diseño y prior definidos",
    "eu": "Behaketa-eredu, diseinu eta aurretiko zehaztuak"
  },
  "噪音性状抽样误差与K或C": {
    "en": "Noise-trait sampling error with K or C",
    "fr": "Erreur d’échantillonnage du bruit avec K ou C",
    "es": "Error de muestreo del ruido con K o C",
    "eu": "Zarata-ezaugarriaren laginketa-errorea K edo C-rekin"
  },
  "观测到菌株的设计矩阵；每菌株仅一行观测且顺序一致时Z=I。": {
    "en": "Observation-to-strain design matrix; Z=I for one observation per strain in matching order.",
    "fr": "Matrice de plan reliant observations et souches ; Z=I pour une observation par souche dans le même ordre.",
    "es": "Matriz de diseño que vincula observaciones y cepas; Z=I con una observación por cepa en el mismo orden.",
    "eu": "Behaketak anduiekin lotzen dituen diseinu-matrizea; Z=I andui bakoitzeko behaketa bakarra eta ordena bera direnean."
  },
  "第一阶段抽样协方差；独立误差时为diag(sampling_se²)": {
    "en": "First-stage sampling covariance; diag(sampling_se²) for independent errors",
    "fr": "Covariance du premier stade ; diag(sampling_se²) si erreurs indépendantes",
    "es": "Covarianza de muestreo inicial; diag(sampling_se²) para errores independientes",
    "eu": "Lehen etapako laginketa-kobariantza; errore independenteentzat diag(sampling_se²)"
  },
  "把有限细胞估计误差与菌株相关方差分开": {
    "en": "Separate finite-cell estimation error from correlated strain variance",
    "fr": "Séparer l’erreur due au nombre fini de cellules de la variance corrélée des souches",
    "es": "Separar error por número finito de células y varianza correlacionada de cepas",
    "eu": "Bereizi zelula kopuru mugatuaren estimazio-errorea eta anduien bariantza korrelatua"
  },
  "菌株噪音的贝叶斯协方差模型；含性状抽样误差的系统发育信号": {
    "en": "Bayesian covariance models of strain noise; Phylogenetic signal with trait sampling error",
    "fr": "Modèles bayésiens de covariance du bruit entre souches ; Signal phylogénétique avec erreur d’échantillonnage des traits",
    "es": "Modelos bayesianos de covarianza del ruido entre cepas; Señal filogenética con error de muestreo del rasgo",
    "eu": "Anduien zarataren kobariantza eredu bayestarrak; Seinale filogenetikoa ezaugarriaren laginketa-errorearekin"
  },
  "菌株层面的连续噪音性状、明确尺度及抽样标准误；培养、状态、均值和批次协变量。 se()使用抽样标准误。第一阶段后验标准差需经校准或联合建模；直接把后验当似然会重复计入先验。相关估计误差需显式抽样协方差或联合模型。": {
    "en": "Continuous strain-level noise traits, a defined scale and sampling standard errors; culture, state, mean and batch covariates. se() takes sampling standard errors. First-stage posterior standard deviations require calibration or joint modelling; treating a posterior as a likelihood counts its prior again. Correlated estimation errors require an explicit sampling covariance or joint model.",
    "fr": "Traits continus de bruit par souche, échelle définie et erreurs types d’échantillonnage ; covariables de culture, état, moyenne et lot. se() utilise des erreurs types d’échantillonnage. Les écarts types a posteriori du premier stade exigent une calibration ou un modèle conjoint ; traiter un posterior comme une vraisemblance réutilise son a priori. Les erreurs corrélées exigent une covariance explicite ou un modèle conjoint.",
    "es": "Rasgos continuos de ruido por cepa, escala definida y errores estándar de muestreo; covariables de cultivo, estado, media y lote. se() utiliza errores estándar de muestreo. Las desviaciones posteriores de la primera etapa requieren calibración o un modelo conjunto; tratar el posterior como verosimilitud reutiliza su prior. Los errores correlacionados requieren covarianza explícita o modelado conjunto.",
    "eu": "Andui-mailako zarata-ezaugarri jarraituak, eskala zehaztua eta laginketa-errore estandarrak; kultura, egoera, batezbesteko eta sortaren kobariableak. se() funtzioak laginketa-errore estandarrak hartzen ditu. Lehen etapako posteriorren desbideratzeek kalibrazioa edo baterako eredua behar dute; posteriorra egiantzekotasuntzat hartzeak aurretiko banaketa berriz zenbatzen du. Errore korrelatuek laginketa-kobariantza esplizitua edo baterako eredua behar dute."
  }
};window.YV_TEXT=Object.assign(window.YV_TEXT||{},text);})();
