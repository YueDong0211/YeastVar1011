// Curated tool-detail translations; command names and technical symbols are retained.
window.YV_TEXT = Object.assign(window.YV_TEXT || {},
// DATA_START
{
  "记录数/长度": {
    "en": "Record counts / lengths",
    "fr": "Nombre / longueur des reads",
    "es": "Número / longitud de reads",
    "eu": "Read kopuruak / luzerak"
  },
  "ID与配对检查": {
    "en": "ID and pairing checks",
    "fr": "Contrôle des identifiants et des paires",
    "es": "Comprobación de identificadores y pares",
    "eu": "IDen eta parekatzeen egiaztapena"
  },
  "调用入口是版本化方法入口或占位模板，不是可直接用于未确认建库结构的数据执行脚本。": {
    "en": "Entrypoints are version-specific method references or placeholder templates, not scripts ready to run on an unconfirmed library structure.",
    "fr": "Les points d’entrée sont des références de méthodes versionnées ou des modèles à compléter, pas des scripts prêts pour une structure de bibliothèque non confirmée.",
    "es": "Las entradas son referencias a métodos versionados o plantillas por completar, no scripts listos para bibliotecas de estructura desconocida.",
    "eu": "Sarrerak bertsio jakineko metodo-erreferentziak edo osatzeko txantiloiak dira; ez dira egitura baieztatu gabeko liburutegietan zuzenean exekutatzeko scriptak."
  },
  "输入FASTQ集合": {
    "en": "Input FASTQ collection",
    "fr": "Ensemble des FASTQ d’entrée",
    "es": "Conjunto de FASTQ de entrada",
    "eu": "Sarrerako FASTQ multzoa"
  },
  "按文库与read类型完整列出": {
    "en": "List all files by library and read type",
    "fr": "Lister tous les fichiers par bibliothèque et type de read",
    "es": "Enumerar todos los archivos por biblioteca y tipo de read",
    "eu": "Zerrendatu fitxategi guztiak liburutegiaren eta read motaren arabera"
  },
  "逐位置质量": {
    "en": "Per-position quality",
    "fr": "Qualité par position",
    "es": "Calidad por posición",
    "eu": "Posizio bakoitzeko kalitatea"
  },
  "组成/接头/重复线索": {
    "en": "Composition / adapter / duplication signals",
    "fr": "Indices de composition, adaptateurs et duplication",
    "es": "Indicios de composición, adaptadores y duplicación",
    "eu": "Konposizioaren, egokitzaileen eta bikoizketaren zantzuak"
  },
  "barcode区特定组成和3′建库重复可为预期，不按红色警告自动过滤。": {
    "en": "Barcode composition and duplication in 3′ libraries may be expected; do not filter automatically on red warnings.",
    "fr": "La composition des barcodes et la duplication en bibliothèques 3′ peuvent être attendues ; ne pas filtrer automatiquement sur les alertes rouges.",
    "es": "La composición de barcodes y la duplicación en bibliotecas 3′ pueden ser esperables; no filtrar automáticamente por alertas rojas.",
    "eu": "Barcode-konposizioa eta 3′ liburutegietako bikoizketa espero izatekoak izan daitezke; ez iragazi automatikoki abisu gorriengatik."
  },
  "已知read结构": {
    "en": "Known read structure",
    "fr": "Structure des reads connue",
    "es": "Estructura de reads conocida",
    "eu": "Read-egitura ezaguna"
  },
  "处理前后QC": {
    "en": "QC before and after processing",
    "fr": "QC avant et après traitement",
    "es": "QC antes y después del procesamiento",
    "eu": "QC prozesamenduaren aurretik eta ondoren"
  },
  "处理后FASTQ": {
    "en": "Processed FASTQ",
    "fr": "FASTQ traités",
    "es": "FASTQ procesados",
    "eu": "Prozesatutako FASTQ"
  },
  "先确认CB/UMI位置，再配置剪切；不默认把barcode read当cDNA。": {
    "en": "Confirm CB/UMI positions before configuring trimming; a barcode read is not automatically cDNA.",
    "fr": "Confirmer les positions CB/UMI avant le rognage ; un read de barcode n’est pas automatiquement de l’ADNc.",
    "es": "Confirmar las posiciones CB/UMI antes del recorte; un read de barcode no es automáticamente ADNc.",
    "eu": "Baieztatu CB/UMI posizioak mozketa konfiguratu aurretik; barcode-read bat ez da automatikoki cDNA."
  },
  "关闭自动接头剪切": {
    "en": "Disable automatic adapter trimming",
    "fr": "Désactiver le rognage automatique des adaptateurs",
    "es": "Desactivar el recorte automático de adaptadores",
    "eu": "Desaktibatu egokitzaileen mozketa automatikoa"
  },
  "原始诊断可关闭；正式处理按建库结构选择": {
    "en": "May be disabled for initial diagnostics; choose processing settings from the library structure",
    "fr": "Désactivable pour le diagnostic initial ; choisir les réglages selon la structure de bibliothèque",
    "es": "Puede desactivarse en el diagnóstico inicial; elegir ajustes según la estructura de biblioteca",
    "eu": "Hasierako diagnostikoan desaktiba daiteke; hautatu ezarpenak liburutegi-egituraren arabera"
  },
  "UMI处理": {
    "en": "UMI handling",
    "fr": "Traitement des UMI",
    "es": "Tratamiento de UMI",
    "eu": "UMIen tratamendua"
  },
  "仅在明确UMI位置和下游tag转换时启用": {
    "en": "Enable only after confirming UMI positions and downstream tag conversion",
    "fr": "Activer seulement après confirmation des positions UMI et de la conversion des tags en aval",
    "es": "Activar solo tras confirmar las posiciones UMI y la conversión posterior de tags",
    "eu": "Gaitu UMI posizioak eta ondorengo tag-bihurketa baieztatu ondoren soilik"
  },
  "已知接头/锚定结构": {
    "en": "Known adapters / anchor structure",
    "fr": "Adaptateurs et structure d’ancrage connus",
    "es": "Adaptadores y estructura de anclaje conocidos",
    "eu": "Egokitzaile eta ainguratze-egitura ezagunak"
  },
  "剪切结果": {
    "en": "Trimming results",
    "fr": "Résultats du rognage",
    "es": "Resultados del recorte",
    "eu": "Mozketaren emaitzak"
  },
  "命中/长度报告": {
    "en": "Match / length reports",
    "fr": "Rapports de correspondance et de longueur",
    "es": "Informes de coincidencias y longitudes",
    "eu": "Bat-etortzeen eta luzeren txostenak"
  },
  "剪切可能不可逆损失CB/UMI；保留原FASTQ。": {
    "en": "Trimming can irreversibly remove CB/UMI information; keep original FASTQ.",
    "fr": "Le rognage peut supprimer irréversiblement CB/UMI ; conserver les FASTQ originaux.",
    "es": "El recorte puede eliminar información CB/UMI irreversiblemente; conservar los FASTQ originales.",
    "eu": "Mozketak CB/UMI informazioa behin betiko gal dezake; gorde jatorrizko FASTQ."
  },
  "接头与锚定位置": {
    "en": "Adapters and anchor positions",
    "fr": "Adaptateurs et positions d’ancrage",
    "es": "Adaptadores y posiciones de anclaje",
    "eu": "Egokitzaileak eta ainguratze-posizioak"
  },
  "来自实际建库结构，不猜测序列": {
    "en": "Use the actual library design; do not guess sequences",
    "fr": "Utiliser la structure réelle de bibliothèque, sans deviner les séquences",
    "es": "Usar el diseño real de biblioteca, sin adivinar secuencias",
    "eu": "Erabili benetako liburutegi-diseinua; ez asmatu sekuentziak"
  },
  "工具日志/报告": {
    "en": "Tool logs / reports",
    "fr": "Journaux et rapports des outils",
    "es": "Registros e informes de herramientas",
    "eu": "Tresnen erregistroak / txostenak"
  },
  "统一QC概览": {
    "en": "Unified QC overview",
    "fr": "Vue QC unifiée",
    "es": "Resumen de QC unificado",
    "eu": "QC ikuspegi bateratua"
  },
  "机器可读汇总": {
    "en": "Machine-readable summary",
    "fr": "Synthèse lisible par machine",
    "es": "Resumen legible por máquina",
    "eu": "Makinak irakurtzeko laburpena"
  },
  "报告汇总器，不是独立细胞质量算法。": {
    "en": "A report aggregator, not an independent cell-quality algorithm.",
    "fr": "Agrégateur de rapports, pas un algorithme indépendant de qualité cellulaire.",
    "es": "Agregador de informes, no un algoritmo independiente de calidad celular.",
    "eu": "Txosten-biltzailea da, ez zelula-kalitaterako algoritmo independentea."
  },
  "明确的候选参考库": {
    "en": "Explicit candidate reference database",
    "fr": "Base de références candidates explicitée",
    "es": "Base de referencias candidatas definida",
    "eu": "Zehaztutako erreferentzia-hautagaien datu-basea"
  },
  "各参考匹配/多重匹配比例": {
    "en": "Per-reference match / multimatch fractions",
    "fr": "Proportions de correspondances uniques ou multiples par référence",
    "es": "Fracciones de coincidencias únicas o múltiples por referencia",
    "eu": "Erreferentzia bakoitzeko bat-etortze bakar/anizkoitzen frakzioak"
  },
  "近缘种同源序列不等于污染；不能仅据基因来源推断细胞物种。": {
    "en": "Homology between related species does not establish contamination; gene origin alone cannot identify the cell’s species.",
    "fr": "L’homologie entre espèces proches ne prouve pas une contamination ; l’origine d’un gène seule n’identifie pas l’espèce de la cellule.",
    "es": "La homología entre especies cercanas no demuestra contaminación; el origen de un gen no basta para identificar la especie celular.",
    "eu": "Hurbileko espezieen homologiak ez du kutsadura frogatzen; genearen jatorriak bakarrik ez du zelularen espeziea identifikatzen."
  },
  "候选参考集合": {
    "en": "Candidate reference set",
    "fr": "Ensemble de références candidates",
    "es": "Conjunto de referencias candidatas",
    "eu": "Erreferentzia-hautagaien multzoa"
  },
  "只含研究相关且版本明确的参考": {
    "en": "Include only relevant references with recorded versions",
    "fr": "Inclure uniquement des références pertinentes et versionnées",
    "es": "Incluir solo referencias pertinentes con versión registrada",
    "eu": "Sartu erreferentzia egokiak soilik, bertsioa jasota"
  },
  "已确认read结构": {
    "en": "Confirmed read structure",
    "fr": "Structure des reads confirmée",
    "es": "Estructura de reads confirmada",
    "eu": "Baieztatutako read-egitura"
  },
  "适用whitelist": {
    "en": "Applicable whitelist",
    "fr": "Whitelist adaptée",
    "es": "Whitelist aplicable",
    "eu": "Whitelist egokia"
  },
  "Solo.out各feature raw矩阵；filtered在后续细胞识别后生成": {
    "en": "Raw matrices for each Solo.out feature; filtered matrices follow cell calling",
    "fr": "Matrices brutes par feature dans Solo.out ; matrices filtrées après identification des cellules",
    "es": "Matrices raw por feature en Solo.out; las filtradas se generan tras identificar células",
    "eu": "Solo.out feature bakoitzeko raw matrizeak; iragazitakoak zelulak identifikatu ondoren sortzen dira"
  },
  "Summary.csv及适用feature的逐CB读段统计": {
    "en": "Summary.csv and per-CB read statistics for supported features",
    "fr": "Summary.csv et statistiques de reads par CB pour les features prises en charge",
    "es": "Summary.csv y estadísticas de reads por CB para features compatibles",
    "eu": "Summary.csv eta onartutako featureetarako CB bakoitzeko read-estatistikak"
  },
  "可选UniqueAndMult-*.mtx": {
    "en": "Optional UniqueAndMult-*.mtx",
    "fr": "UniqueAndMult-*.mtx facultatifs",
    "es": "UniqueAndMult-*.mtx opcionales",
    "eu": "Aukerako UniqueAndMult-*.mtx"
  },
  "模板只适用于独立barcode read的CB_UMI_Simple结构；复杂或同mate文库需另写对应入口，不能只替换soloType。": {
    "en": "This template is only for CB_UMI_Simple with a separate barcode read. Complex or same-mate libraries need their own entrypoint; changing soloType alone is insufficient.",
    "fr": "Ce modèle exige CB_UMI_Simple avec un read barcode séparé. Les bibliothèques complexes ou avec barcode sur le même mate nécessitent une entrée adaptée ; changer seulement soloType ne suffit pas.",
    "es": "Esta plantilla requiere CB_UMI_Simple con un read de barcode separado. Las bibliotecas complejas o con barcode en el mismo mate necesitan otra entrada; cambiar solo soloType no basta.",
    "eu": "Txantiloiak CB_UMI_Simple eta barcode-read bereizia eskatzen ditu. Egitura konplexuek edo mate bereko barcodeek sarrera propioa behar dute; soloType aldatzea ez da nahikoa."
  },
  "GeneFull−Gene不能生成严格intronic UMI；Velocyto层规则须固定版本。": {
    "en": "GeneFull−Gene cannot produce strictly intronic UMIs; fix the version of Velocyto counting rules.",
    "fr": "GeneFull−Gene ne fournit pas des UMI strictement introniques ; fixer la version des règles Velocyto.",
    "es": "GeneFull−Gene no produce UMI estrictamente intrónicos; fijar la versión de las reglas Velocyto.",
    "eu": "GeneFull−Gene ez da UMI introniko zehatzen matrizea; finkatu Velocyto zenbaketa-arauen bertsioa."
  },
  "当前源码按首个适用feature确定BAM纠错分子信息；本模板首项Gene。不能仅按CB×GX×UB精确重建GeneFull或全部剪接层；复算需保留CR/UR/CY/UY、原始FASTQ、参考和计数规则。": {
    "en": "Current code uses the first eligible feature for corrected molecule information in BAM; this template starts with Gene. CB×GX×UB alone cannot exactly reconstruct GeneFull or all splicing layers. Keep CR/UR/CY/UY, raw FASTQ, references and counting rules for recounting.",
    "fr": "Le code actuel utilise la première feature admissible pour les informations moléculaires corrigées du BAM ; ici Gene. CB×GX×UB seul ne reconstruit pas exactement GeneFull ni toutes les couches d’épissage. Conserver CR/UR/CY/UY, FASTQ bruts, références et règles de comptage.",
    "es": "El código actual usa la primera feature válida para la información molecular corregida del BAM; aquí Gene. CB×GX×UB no reconstruye exactamente GeneFull ni todas las capas de splicing. Conservar CR/UR/CY/UY, FASTQ originales, referencias y reglas de conteo.",
    "eu": "Uneko kodeak lehen feature egokia erabiltzen du BAMeko molekula-informazio zuzenduan; hemen Gene da. CB×GX×UB bakarrik ez da nahikoa GeneFull edo splicing-geruza guztiak zehazki berreraikitzeko. Gorde CR/UR/CY/UY, raw FASTQ, erreferentziak eta zenbaketa-arauak."
  },
  "gx/gn、sF等以实际版本支持为准；不是每条read都具有有效CB/UB/GX。": {
    "en": "Support for gx/gn, sF and related tags depends on version; not every read has valid CB/UB/GX.",
    "fr": "La prise en charge de gx/gn, sF et autres tags dépend de la version ; tous les reads n’ont pas des CB/UB/GX valides.",
    "es": "El soporte de gx/gn, sF y otros tags depende de la versión; no todos los reads tienen CB/UB/GX válidos.",
    "eu": "gx/gn, sF eta beste tag batzuk bertsioaren araberakoak dira; read guztiek ez dituzte CB/UB/GX baliozkoak."
  },
  "SJ.out.tab为聚合剪接位点信息，不能自动视为每细胞独立UMI支持。": {
    "en": "SJ.out.tab aggregates splice-junction evidence; it does not automatically represent independent per-cell UMI support.",
    "fr": "SJ.out.tab agrège les jonctions ; ce n’est pas automatiquement un support UMI indépendant par cellule.",
    "es": "SJ.out.tab agrega evidencia de uniones; no representa automáticamente UMI independientes por célula.",
    "eu": "SJ.out.tab fitxategiak splice-junction ebidentzia agregatzen du; ez da automatikoki zelulako UMI independenteen sostengua."
  },
  "soloCellReadStats Standard的逐CB报告并非每个feature都有独立输出；当前源码排除SJ与Velocyto。": {
    "en": "soloCellReadStats Standard does not provide an independent per-CB report for every feature; current code excludes SJ and Velocyto.",
    "fr": "soloCellReadStats Standard ne produit pas de rapport indépendant par CB pour chaque feature ; le code actuel exclut SJ et Velocyto.",
    "es": "soloCellReadStats Standard no genera un informe independiente por CB para cada feature; el código actual excluye SJ y Velocyto.",
    "eu": "soloCellReadStats Standard-ek ez du feature bakoitzerako CB txosten independentea sortzen; uneko kodeak SJ eta Velocyto baztertzen ditu."
  },
  "cDNA与barcode read输入顺序": {
    "en": "cDNA and barcode read input order",
    "fr": "Ordre d’entrée des reads ADNc et barcode",
    "es": "Orden de entrada de reads de ADNc y barcode",
    "eu": "cDNA eta barcode readen sarrera-ordena"
  },
  "独立barcode read模式是cDNA先、barcode最后；同mate模式按对应文库结构": {
    "en": "Separate-barcode mode: cDNA first, barcode last; same-mate mode follows the actual library structure",
    "fr": "Mode barcode séparé : ADNc en premier, barcode en dernier ; mode même mate selon la bibliothèque",
    "es": "Modo barcode separado: ADNc primero, barcode al final; modo mismo mate según la biblioteca",
    "eu": "Barcode bereiziarekin: cDNA lehenik, barcode azkenik; mate bereko modua benetako egituraren arabera"
  },
  "单细胞结构": {
    "en": "Single-cell read structure",
    "fr": "Structure des reads unicellulaires",
    "es": "Estructura de reads unicelulares",
    "eu": "Zelula bakarreko read-egitura"
  },
  "CB_UMI_Simple或CB_UMI_Complex等按真实结构；不能默认10x": {
    "en": "Choose CB_UMI_Simple, CB_UMI_Complex or another supported mode from the actual design; do not assume 10x",
    "fr": "Choisir CB_UMI_Simple, CB_UMI_Complex ou un mode compatible selon le protocole réel ; ne pas supposer 10x",
    "es": "Elegir CB_UMI_Simple, CB_UMI_Complex u otro modo compatible según el diseño real; no asumir 10x",
    "eu": "Hautatu CB_UMI_Simple, CB_UMI_Complex edo beste modu bateragarri bat benetako diseinuaren arabera; ez suposatu 10x"
  },
  "CB起点与长度": {
    "en": "CB start and length",
    "fr": "Début et longueur du CB",
    "es": "Inicio y longitud del CB",
    "eu": "CBren hasiera eta luzera"
  },
  "由建库协议/序列诊断确认；简单结构位置为1-based": {
    "en": "Confirm from the protocol and sequence diagnostics; Simple positions are 1-based",
    "fr": "Confirmer par le protocole et les séquences ; positions Simple indexées à partir de 1",
    "es": "Confirmar mediante protocolo y secuencias; las posiciones Simple comienzan en 1",
    "eu": "Baieztatu protokoloarekin eta sekuentzien diagnostikoarekin; Simple posizioak 1etik hasten dira"
  },
  "UMI起点与长度": {
    "en": "UMI start and length",
    "fr": "Début et longueur de l’UMI",
    "es": "Inicio y longitud de UMI",
    "eu": "UMIaren hasiera eta luzera"
  },
  "由实际read结构确认，不在本计划填数值": {
    "en": "Determine from the actual read structure; no values are assumed here",
    "fr": "Déterminer selon les reads réels ; aucune valeur présumée ici",
    "es": "Determinar según la estructura real de reads; aquí no se presuponen valores",
    "eu": "Zehaztu benetako read-egituratik; hemen ez da baliorik suposatzen"
  },
  "barcode read长度检查": {
    "en": "Barcode read length check",
    "fr": "Vérification de longueur du read barcode",
    "es": "Control de longitud del read barcode",
    "eu": "Barcode-readaren luzera-egiaztapena"
  },
  "按真实结构设置；模式值1要求read长度等于CB+UMI长度，0关闭该长度检查；不能因原始read含额外周期而误套默认": {
    "en": "Set from the actual structure: mode 1 requires read length = CB+UMI length; 0 disables this check. Extra raw sequencing cycles must not trigger an inappropriate default.",
    "fr": "Selon la structure réelle : le mode 1 exige longueur du read = CB+UMI ; 0 désactive ce contrôle. Ne pas appliquer ce défaut à des reads contenant des cycles supplémentaires.",
    "es": "Según la estructura real: el modo 1 exige longitud del read = CB+UMI; 0 desactiva el control. No aplicar ese valor por defecto a reads con ciclos adicionales.",
    "eu": "Benetako egituraren arabera: 1 moduak read-luzera = CB+UMI eskatzen du; 0k egiaztapena desgaitzen du. Ziklo gehigarriak dituzten raw readetan ez aplikatu lehenetsia oker."
  },
  "barcode白名单": {
    "en": "Barcode whitelist",
    "fr": "Whitelist de barcodes",
    "es": "Whitelist de barcodes",
    "eu": "Barcode-whitelist"
  },
  "必须匹配化学版本；无白名单需单独定义识别策略": {
    "en": "Match the chemistry version; define a separate calling strategy if no whitelist exists",
    "fr": "Adapter à la version de chimie ; sans whitelist, définir une stratégie distincte",
    "es": "Ajustar a la versión de química; sin whitelist, definir otra estrategia",
    "eu": "Egokitu kimika-bertsiora; whitelistik ez badago, definitu beste identifikazio-estrategia"
  },
  "CB是否与cDNA在同一mate": {
    "en": "Whether CB and cDNA share one mate",
    "fr": "CB et ADNc sur le même mate ou non",
    "es": "Si CB y ADNc comparten el mismo mate",
    "eu": "CB eta cDNA mate berean dauden"
  },
  "仅在对应结构启用，配套核对clip参数": {
    "en": "Enable only for the matching structure and verify clipping parameters",
    "fr": "Activer pour la structure correspondante et vérifier les paramètres de rognage",
    "es": "Activar para la estructura correspondiente y verificar los parámetros de recorte",
    "eu": "Gaitu egitura egokian soilik eta egiaztatu mozketa-parametroak"
  },
  "复杂barcode锚点": {
    "en": "Complex-barcode anchors",
    "fr": "Ancrages de barcodes complexes",
    "es": "Anclajes de barcodes complejos",
    "eu": "Barcode konplexuen aingurak"
  },
  "CB_UMI_Complex时使用；位置规则与Simple不同": {
    "en": "For CB_UMI_Complex; position conventions differ from Simple",
    "fr": "Pour CB_UMI_Complex ; conventions de position différentes de Simple",
    "es": "Para CB_UMI_Complex; las posiciones siguen reglas distintas de Simple",
    "eu": "CB_UMI_Complex-erako; posizio-arauak Simple-renak ez bezalakoak dira"
  },
  "RNA链特异性": {
    "en": "RNA strandedness",
    "fr": "Spécificité de brin de l’ARN",
    "es": "Especificidad de hebra del ARN",
    "eu": "RNAren kate-espezifikotasuna"
  },
  "Forward/Reverse/Unstranded由实验结构和比对诊断确定": {
    "en": "Choose Forward/Reverse/Unstranded from the library design and alignment diagnostics",
    "fr": "Choisir Forward/Reverse/Unstranded selon le protocole et le diagnostic d’alignement",
    "es": "Elegir Forward/Reverse/Unstranded según el diseño y el diagnóstico de alineamiento",
    "eu": "Hautatu Forward/Reverse/Unstranded diseinuaren eta lerrokatze-diagnostikoaren arabera"
  },
  "CB纠错策略": {
    "en": "CB correction strategy",
    "fr": "Stratégie de correction CB",
    "es": "Estrategia de corrección CB",
    "eu": "CB zuzenketa-estrategia"
  },
  "保留精确/纠错/未决统计；按协议与版本选定": {
    "en": "Retain exact/corrected/unresolved statistics; choose by protocol and version",
    "fr": "Conserver les statistiques exactes/corrigées/non résolues ; choisir selon protocole et version",
    "es": "Conservar estadísticas exactas/corregidas/no resueltas; elegir según protocolo y versión",
    "eu": "Gorde zehatz/zuzendu/ebatzi gabeko estatistikak; hautatu protokoloaren eta bertsioaren arabera"
  },
  "UMI合并算法": {
    "en": "UMI collapsing algorithm",
    "fr": "Algorithme de regroupement UMI",
    "es": "Algoritmo de agrupación de UMI",
    "eu": "UMIak batzeko algoritmoa"
  },
  "合法值包括Exact、1MM_Directional、1MM_Directional_UMItools和1MM_CR；两个directional选项的合并规则不同，按版本与目标选择": {
    "en": "Valid values include Exact, 1MM_Directional, 1MM_Directional_UMItools and 1MM_CR. The directional variants use different rules; choose by version and purpose.",
    "fr": "Valeurs valides : Exact, 1MM_Directional, 1MM_Directional_UMItools et 1MM_CR. Les variantes directional ont des règles distinctes ; choisir selon version et objectif.",
    "es": "Valores válidos: Exact, 1MM_Directional, 1MM_Directional_UMItools y 1MM_CR. Las variantes directional usan reglas diferentes; elegir según versión y objetivo.",
    "eu": "Balio onartuak: Exact, 1MM_Directional, 1MM_Directional_UMItools eta 1MM_CR. Directional aukerek arau desberdinak dituzte; hautatu bertsioaren eta helburuaren arabera."
  },
  "跨基因UMI过滤": {
    "en": "Cross-gene UMI filtering",
    "fr": "Filtrage des UMI multigéniques",
    "es": "Filtrado de UMI entre genes",
    "eu": "Gene arteko UMI iragazketa"
  },
  "MultiGeneUMI_CR仅配1MM_CR；勿将所有同UMI跨基因分子强行合并": {
    "en": "MultiGeneUMI_CR requires 1MM_CR; do not merge every cross-gene occurrence of the same UMI",
    "fr": "MultiGeneUMI_CR exige 1MM_CR ; ne pas fusionner toutes les occurrences d’un même UMI entre gènes",
    "es": "MultiGeneUMI_CR requiere 1MM_CR; no fusionar todas las apariciones del mismo UMI entre genes",
    "eu": "MultiGeneUMI_CR-ek 1MM_CR behar du; ez batu UMI bera duten gene desberdinetako molekula guztiak"
  },
  "计数feature层": {
    "en": "Counting feature layers",
    "fr": "Couches de features comptées",
    "es": "Capas de features contadas",
    "eu": "Zenbaketarako feature-geruzak"
  },
  "Gene GeneFull SJ Velocyto；Velocyto要求Gene；其他GeneFull优先规则需版本核对": {
    "en": "Gene GeneFull SJ Velocyto; Velocyto requires Gene. Check version support for other GeneFull priority rules.",
    "fr": "Gene GeneFull SJ Velocyto ; Velocyto exige Gene. Vérifier la version pour les autres priorités GeneFull.",
    "es": "Gene GeneFull SJ Velocyto; Velocyto requiere Gene. Verificar la versión para otras prioridades GeneFull.",
    "eu": "Gene GeneFull SJ Velocyto; Velocyto-k Gene behar du. Egiaztatu beste GeneFull lehentasunen bertsio-euskarria."
  },
  "多基因分配": {
    "en": "Multi-gene allocation",
    "fr": "Allocation multigénique",
    "es": "Asignación multigénica",
    "eu": "Gene anitzeko esleipena"
  },
  "主层保留unique；EM/Uniform等另存敏感性矩阵": {
    "en": "Retain unique counts as the main layer; save EM/Uniform alternatives for sensitivity analysis",
    "fr": "Conserver unique comme couche principale ; sauvegarder EM/Uniform pour l’analyse de sensibilité",
    "es": "Conservar unique como capa principal; guardar EM/Uniform para análisis de sensibilidad",
    "eu": "Gorde unique geruza nagusi gisa; gorde EM/Uniform aukerak sentikortasun-analisirako"
  },
  "逐CB读段统计": {
    "en": "Per-CB read statistics",
    "fr": "Statistiques de reads par CB",
    "es": "Estadísticas de reads por CB",
    "eu": "CB bakoitzeko read-estatistikak"
  },
  "Standard用于保留每CB的读段QC": {
    "en": "Standard retains read QC for each CB",
    "fr": "Standard conserve le QC des reads par CB",
    "es": "Standard conserva el QC de reads por CB",
    "eu": "Standard-ek CB bakoitzeko read-QC gordetzen du"
  },
  "细胞识别": {
    "en": "Cell calling",
    "fr": "Identification des cellules",
    "es": "Identificación de células",
    "eu": "Zelulen identifikazioa"
  },
  "首轮模板显式None保存raw并禁用默认细胞筛选；随后独立运行适配的细胞识别，不隐含使用CellRanger2.2默认数值": {
    "en": "The first-pass template explicitly uses None to retain raw matrices and disable default cell filtering; perform a separate, adapted cell-calling step without implicit CellRanger2.2 defaults.",
    "fr": "Le premier passage utilise explicitement None pour conserver les matrices brutes sans filtrage par défaut ; identifier ensuite les cellules séparément, sans valeurs implicites CellRanger2.2.",
    "es": "La primera pasada usa None explícitamente para conservar matrices raw sin filtrado por defecto; identificar después las células sin valores implícitos de CellRanger2.2.",
    "eu": "Lehen urratsak None erabiltzen du espresuki raw matrizeak gordetzeko eta iragazketa lehenetsia desgaitzeko; gero egin zelula-identifikazio egokitua, CellRanger2.2 balio lehenetsi inpliziturik gabe."
  },
  "BAM输出": {
    "en": "BAM output",
    "fr": "Sortie BAM",
    "es": "Salida BAM",
    "eu": "BAM irteera"
  },
  "BAM SortedByCoordinate；CB/UB标签要求坐标排序": {
    "en": "BAM SortedByCoordinate; CB/UB tags require coordinate sorting",
    "fr": "BAM SortedByCoordinate ; CB/UB exigent le tri par coordonnées",
    "es": "BAM SortedByCoordinate; CB/UB requieren ordenación por coordenadas",
    "eu": "BAM SortedByCoordinate; CB/UB tagek koordenatuen araberako ordena behar dute"
  },
  "BAM证据标签": {
    "en": "BAM evidence tags",
    "fr": "Tags de preuve dans le BAM",
    "es": "Tags de evidencia del BAM",
    "eu": "BAMeko ebidentzia-tagak"
  },
  "NH HI AS nM NM MD CR CY UR UY CB UB GX GN；按需gx gn sS sQ sM sF jM jI cN，逐版本验证": {
    "en": "NH HI AS nM NM MD CR CY UR UY CB UB GX GN; optionally gx gn sS sQ sM sF jM jI cN, verified for the installed version",
    "fr": "NH HI AS nM NM MD CR CY UR UY CB UB GX GN ; éventuellement gx gn sS sQ sM sF jM jI cN, vérifiés pour la version installée",
    "es": "NH HI AS nM NM MD CR CY UR UY CB UB GX GN; opcionalmente gx gn sS sQ sM sF jM jI cN, verificados por versión",
    "eu": "NH HI AS nM NM MD CR CY UR UY CB UB GX GN; aukeran gx gn sS sQ sM sF jM jI cN, instalatutako bertsioan egiaztatuta"
  },
  "保留未比对reads": {
    "en": "Retain unmapped reads",
    "fr": "Conserver les reads non alignés",
    "es": "Conservar reads no alineados",
    "eu": "Gorde lerrokatu gabeko readak"
  },
  "Within可保留在主BAM；同时原FASTQ不可变保存": {
    "en": "Within retains them in the main BAM; also keep immutable original FASTQ",
    "fr": "Within les conserve dans le BAM principal ; garder aussi les FASTQ originaux immuables",
    "es": "Within los conserva en el BAM principal; guardar también los FASTQ originales inmutables",
    "eu": "Within-ek BAM nagusian gordetzen ditu; gorde jatorrizko FASTQ aldaezinak ere"
  },
  "文库/lane来源": {
    "en": "Library / lane provenance",
    "fr": "Provenance bibliothèque / piste",
    "es": "Procedencia de biblioteca / carril",
    "eu": "Liburutegiaren / erreiaren jatorria"
  },
  "RG记录ID/LB/SM等与样本清单一致": {
    "en": "RG fields such as ID/LB/SM must agree with the sample manifest",
    "fr": "Les champs RG ID/LB/SM doivent correspondre au registre des échantillons",
    "es": "Los campos RG ID/LB/SM deben coincidir con el registro de muestras",
    "eu": "RGko ID/LB/SM eremuek lagin-zerrendarekin bat etorri behar dute"
  },
  "建索引参考": {
    "en": "Index reference",
    "fr": "Référence d’indexation",
    "es": "Referencia de indexación",
    "eu": "Indizearen erreferentzia"
  },
  "FASTA/GTF版本与contig一致；酵母线粒体、rDNA、accessory区域显式记录": {
    "en": "Match FASTA/GTF versions and contigs; explicitly record yeast mitochondrial, rDNA and accessory regions",
    "fr": "Faire correspondre versions FASTA/GTF et contigs ; documenter mitochondries, ADNr et régions accessoires de levure",
    "es": "Hacer coincidir versiones FASTA/GTF y contigs; documentar regiones mitocondriales, ADNr y accesorias de levadura",
    "eu": "Bat etorrarazi FASTA/GTF bertsioak eta contigak; dokumentatu legamiaren mitokondrio-, rDNA- eta eskualde osagarriak"
  },
  "小基因组索引参数": {
    "en": "Small-genome index parameter",
    "fr": "Paramètre d’index pour petit génome",
    "es": "Parámetro de índice para genoma pequeño",
    "eu": "Genoma txikietarako indize-parametroa"
  },
  "依据参考总大小和官方small-genome说明计算；不套用人类默认": {
    "en": "Calculate from reference size and official small-genome guidance; do not copy human defaults",
    "fr": "Calculer selon la taille de référence et le guide officiel petits génomes ; ne pas copier les valeurs humaines",
    "es": "Calcular según el tamaño de referencia y la guía oficial para genomas pequeños; no copiar valores humanos",
    "eu": "Kalkulatu erreferentzia-tamainaren eta genoma txikietarako gida ofizialaren arabera; ez kopiatu giza lehenetsiak"
  },
  "注释剪接位点索引侧翼": {
    "en": "Indexed flanks of annotated splice junctions",
    "fr": "Flancs indexés des jonctions annotées",
    "es": "Flancos indexados de uniones anotadas",
    "eu": "Splice-junction anotatuen indizeko alboak"
  },
  "依据实际cDNA read长度与现用版本确定，记录索引配置": {
    "en": "Use actual cDNA read length and software version; record the index configuration",
    "fr": "Utiliser la longueur réelle des reads ADNc et la version ; consigner la configuration de l’index",
    "es": "Usar la longitud real de reads de ADNc y la versión; registrar la configuración del índice",
    "eu": "Erabili benetako cDNA read-luzera eta bertsioa; jaso indize-konfigurazioa"
  },
  "允许内含子长度": {
    "en": "Allowed intron length",
    "fr": "Longueur d’intron autorisée",
    "es": "Longitud de intrón permitida",
    "eu": "Onartutako introi-luzera"
  },
  "从酵母注释与研究目的确定并验证；不照搬哺乳动物设置": {
    "en": "Determine and validate from yeast annotation and the research question; do not copy mammalian settings",
    "fr": "Déterminer et valider avec l’annotation de levure et la question étudiée ; ne pas copier les réglages mammifères",
    "es": "Determinar y validar con anotaciones de levadura y la pregunta científica; no copiar ajustes de mamíferos",
    "eu": "Zehaztu eta baliozkotu legamiaren anotazioarekin eta ikerketa-galderarekin; ez kopiatu ugaztunen ezarpenak"
  },
  "多重比对接受与输出范围": {
    "en": "Accepted and exported multimapping range",
    "fr": "Étendue des alignements multiples acceptés et exportés",
    "es": "Rango de multialineamientos aceptados y exportados",
    "eu": "Onartutako eta esportatutako lerrokatze anizkoitzen tartea"
  },
  "区分参与计数的允许落点和BAM实际保留落点；截断会丢失后续歧义证据": {
    "en": "Distinguish mapping locations used for counting from those retained in BAM; truncation loses ambiguity evidence",
    "fr": "Distinguer positions utilisées au comptage et positions conservées dans le BAM ; la troncature perd l’information d’ambiguïté",
    "es": "Distinguir posiciones usadas para contar y retenidas en BAM; truncar elimina evidencia de ambigüedad",
    "eu": "Bereizi zenbaketarako posizioak eta BAMean gordetakoak; mozteak anbiguotasun-ebidentzia galtzen du"
  },
  "新/已注释剪接锚定支持": {
    "en": "Anchor support for novel / annotated splice junctions",
    "fr": "Support d’ancrage des jonctions nouvelles / annotées",
    "es": "Soporte de anclaje de uniones nuevas / anotadas",
    "eu": "Splice-junction berri/anotatuen aingura-sostengua"
  },
  "依据实际短读长和酵母注释检查，不把低支持新位点当真值": {
    "en": "Check actual short-read lengths and yeast annotation; weakly supported new junctions are not ground truth",
    "fr": "Vérifier longueurs des reads courts et annotation de levure ; les nouvelles jonctions faiblement soutenues ne sont pas une vérité de référence",
    "es": "Verificar longitudes de reads cortos y anotación de levadura; las uniones nuevas con poco soporte no son verdad de referencia",
    "eu": "Egiaztatu read laburren luzerak eta legamiaren anotazioa; sostengu ahuleko juntura berriak ez dira egia erreferentziala"
  },
  "比对错配与得分规则": {
    "en": "Alignment mismatch and score rules",
    "fr": "Règles de discordance et de score d’alignement",
    "es": "Reglas de discrepancias y puntuación del alineamiento",
    "eu": "Lerrokatze-desadostasunen eta puntuazioen arauak"
  },
  "检验高多态菌株是否出现系统性损失；记录版本与敏感性": {
    "en": "Test for systematic losses in highly polymorphic strains; record version and sensitivity",
    "fr": "Tester les pertes systématiques des souches très polymorphes ; consigner version et sensibilité",
    "es": "Comprobar pérdidas sistemáticas en cepas muy polimórficas; registrar versión y sensibilidad",
    "eu": "Aztertu andui oso polimorfikoen galera sistematikoak; jaso bertsioa eta sentikortasuna"
  },
  "特定接头剪切模型": {
    "en": "Protocol-specific adapter clipping model",
    "fr": "Modèle de rognage d’adaptateurs propre au protocole",
    "es": "Modelo de recorte de adaptadores específico del protocolo",
    "eu": "Protokoloaren araberako egokitzaile-mozketa eredua"
  },
  "CellRanger4仅用于相符结构；不作为通用酵母开关": {
    "en": "CellRanger4 is only for compatible library structures, not a universal yeast switch",
    "fr": "CellRanger4 exige une structure compatible ; ce n’est pas une option universelle pour la levure",
    "es": "CellRanger4 requiere una estructura compatible; no es una opción universal para levadura",
    "eu": "CellRanger4 egitura bateragarrietarako da; ez da legamiarako aukera unibertsala"
  },
  "转录本坐标BAM": {
    "en": "Transcript-coordinate BAM",
    "fr": "BAM en coordonnées de transcrits",
    "es": "BAM en coordenadas de transcritos",
    "eu": "Transkripto-koordenatuetako BAM"
  },
  "仅下游确需转录本比对时附加；不能替代基因组BAM": {
    "en": "Add only when downstream analysis requires transcript alignments; it cannot replace genomic BAM",
    "fr": "Ajouter seulement si l’analyse en aval exige des alignements de transcrits ; ne remplace pas le BAM génomique",
    "es": "Añadir solo si el análisis posterior requiere alineamientos de transcritos; no sustituye al BAM genómico",
    "eu": "Gehitu ondorengo analisiak transkripto-lerrokatzeak behar dituenean soilik; ez du BAM genomikoa ordezkatzen"
  },
  "UMI/CB结构": {
    "en": "UMI/CB structure",
    "fr": "Structure UMI/CB",
    "es": "Estructura UMI/CB",
    "eu": "UMI/CB egitura"
  },
  "UMI分组/纠错诊断": {
    "en": "UMI grouping / correction diagnostics",
    "fr": "Diagnostic de regroupement et correction UMI",
    "es": "Diagnóstico de agrupación y corrección UMI",
    "eu": "UMI taldekatze/zuzenketa diagnostikoa"
  },
  "不得在STARsolo已计数矩阵上再次去重。": {
    "en": "Do not deduplicate a matrix already counted by STARsolo again.",
    "fr": "Ne pas dédupliquer à nouveau une matrice déjà comptée par STARsolo.",
    "es": "No volver a deduplicar una matriz ya contada por STARsolo.",
    "eu": "Ez kendu bikoiztuak berriro STARsolo-k zenbatutako matrize batean."
  },
  "标签结构": {
    "en": "Tag structure",
    "fr": "Structure des tags",
    "es": "Estructura de tags",
    "eu": "Tagen egitura"
  },
  "基于协议使用string或regex；不假定长度": {
    "en": "Use string or regex according to the protocol; do not assume lengths",
    "fr": "Utiliser string ou regex selon le protocole ; ne pas présumer les longueurs",
    "es": "Usar string o regex según el protocolo; no presuponer longitudes",
    "eu": "Erabili string edo regex protokoloaren arabera; ez suposatu luzerak"
  },
  "分组范围": {
    "en": "Grouping scope",
    "fr": "Périmètre de regroupement",
    "es": "Ámbito de agrupación",
    "eu": "Taldekatzearen esparrua"
  },
  "基因表达数据需与gene/cell tags对应": {
    "en": "Gene-expression grouping must match the gene/cell tags",
    "fr": "Le regroupement d’expression doit correspondre aux tags de gène et de cellule",
    "es": "La agrupación de expresión debe corresponder a los tags de gen y célula",
    "eu": "Gene-adierazpenaren taldekatzeak gene/zelula tagekin bat etorri behar du"
  },
  "受支持10x FASTQ": {
    "en": "Supported 10x FASTQ",
    "fr": "FASTQ 10x compatibles",
    "es": "FASTQ 10x compatibles",
    "eu": "Onartutako 10x FASTQ"
  },
  "定制酵母参考": {
    "en": "Custom yeast reference",
    "fr": "Référence personnalisée de levure",
    "es": "Referencia personalizada de levadura",
    "eu": "Legamiaren erreferentzia pertsonalizatua"
  },
  "raw/filtered矩阵": {
    "en": "Raw / filtered matrices",
    "fr": "Matrices brutes / filtrées",
    "es": "Matrices raw / filtradas",
    "eu": "Raw / iragazitako matrizeak"
  },
  "当前数据平台未确认；不默认10x。": {
    "en": "The platform is unconfirmed; do not assume 10x.",
    "fr": "La plateforme n’est pas confirmée ; ne pas supposer 10x.",
    "es": "La plataforma no está confirmada; no asumir 10x.",
    "eu": "Plataforma ez dago baieztatuta; ez suposatu 10x."
  },
  "建库类型": {
    "en": "Library chemistry",
    "fr": "Chimie de bibliothèque",
    "es": "Química de biblioteca",
    "eu": "Liburutegi-kimika"
  },
  "仅在真实平台为支持的10x chemistry时使用": {
    "en": "Use only when the actual library uses a supported 10x chemistry",
    "fr": "Utiliser seulement pour une chimie 10x réellement utilisée et prise en charge",
    "es": "Usar solo si la biblioteca real utiliza una química 10x compatible",
    "eu": "Erabili benetako liburutegiak onartutako 10x kimika erabiltzen badu soilik"
  },
  "技术结构": {
    "en": "Protocol structure",
    "fr": "Structure du protocole",
    "es": "Estructura del protocolo",
    "eu": "Protokoloaren egitura"
  },
  "转录组/内含子参考": {
    "en": "Transcriptome / intron reference",
    "fr": "Référence transcriptome / introns",
    "es": "Referencia de transcriptoma / intrones",
    "eu": "Transkriptoma / introien erreferentzia"
  },
  "BUS/分子计数": {
    "en": "BUS / molecule counts",
    "fr": "BUS / comptages moléculaires",
    "es": "BUS / conteos moleculares",
    "eu": "BUS / molekula-zenbaketak"
  },
  "按workflow的剪接层": {
    "en": "Splicing layers defined by the workflow",
    "fr": "Couches d’épissage définies par le workflow",
    "es": "Capas de splicing definidas por el flujo",
    "eu": "Workflowak definitutako splicing-geruzak"
  },
  "不是完整基因组BAM证据链的替代。": {
    "en": "Not a replacement for the complete genomic-BAM evidence chain.",
    "fr": "Ne remplace pas la chaîne complète de preuves du BAM génomique.",
    "es": "No sustituye la cadena completa de evidencia del BAM genómico.",
    "eu": "Ez du BAM genomikoaren ebidentzia-kate osoa ordezkatzen."
  },
  "改变参考和分配规则会改变计数。": {
    "en": "Changing references or allocation rules changes counts.",
    "fr": "Changer les références ou les règles d’allocation modifie les comptages.",
    "es": "Cambiar referencias o reglas de asignación modifica los conteos.",
    "eu": "Erreferentziak edo esleipen-arauak aldatzeak zenbaketak aldatzen ditu."
  },
  "明确匹配实际CB/UMI结构": {
    "en": "Explicitly match the actual CB/UMI structure",
    "fr": "Correspondre explicitement à la structure CB/UMI réelle",
    "es": "Ajustar explícitamente a la estructura CB/UMI real",
    "eu": "Egokitu espresuki benetako CB/UMI egiturara"
  },
  "计数模式": {
    "en": "Counting mode",
    "fr": "Mode de comptage",
    "es": "Modo de conteo",
    "eu": "Zenbaketa-modua"
  },
  "按版本选择标准/剪接适配模式": {
    "en": "Select standard or splicing-aware mode for the installed version",
    "fr": "Choisir le mode standard ou adapté à l’épissage selon la version",
    "es": "Elegir modo estándar o adaptado a splicing según la versión",
    "eu": "Hautatu modu estandarra edo splicing-era egokitua bertsioaren arabera"
  },
  "上游mapping RAD数据": {
    "en": "Upstream mapping RAD data",
    "fr": "Données RAD de l’alignement en amont",
    "es": "Datos RAD del mapeo previo",
    "eu": "Aurreko mapaketaren RAD datuak"
  },
  "转录本到基因/剪接映射": {
    "en": "Transcript-to-gene / splicing map",
    "fr": "Correspondance transcrit–gène / épissage",
    "es": "Mapa transcrito–gen / splicing",
    "eu": "Transkripto–gene / splicing mapa"
  },
  "spliced/unspliced/ambiguous计数": {
    "en": "Spliced / unspliced / ambiguous counts",
    "fr": "Comptages épissés / non épissés / ambigus",
    "es": "Conteos spliced / unspliced / ambiguos",
    "eu": "Spliced / unspliced / anbiguo zenbaketak"
  },
  "量化日志": {
    "en": "Quantification logs",
    "fr": "Journaux de quantification",
    "es": "Registros de cuantificación",
    "eu": "Kuantifikazio-erregistroak"
  },
  "不同USA分配规则与STARsolo层不自动一一等价。": {
    "en": "USA allocation rules do not automatically correspond one-to-one to STARsolo layers.",
    "fr": "Les règles d’allocation USA ne correspondent pas automatiquement aux couches STARsolo.",
    "es": "Las reglas de asignación USA no equivalen automáticamente a las capas STARsolo.",
    "eu": "USA esleipen-arauak ez dira automatikoki STARsolo geruzen baliokideak."
  },
  "UMI解析策略": {
    "en": "UMI resolution strategy",
    "fr": "Stratégie de résolution UMI",
    "es": "Estrategia de resolución UMI",
    "eu": "UMI ebazpen-estrategia"
  },
  "按现用版本与计数目标选择并记录": {
    "en": "Choose and record the strategy for the installed version and counting objective",
    "fr": "Choisir et consigner selon la version et l’objectif de comptage",
    "es": "Elegir y registrar según la versión y el objetivo de conteo",
    "eu": "Hautatu eta jaso instalatutako bertsioaren eta zenbaketa-helburuaren arabera"
  },
  "剪接状态参考": {
    "en": "Splicing-status reference",
    "fr": "Référence d’état d’épissage",
    "es": "Referencia de estado de splicing",
    "eu": "Splicing-egoeraren erreferentzia"
  },
  "保证转录本/内含子/基因映射一致": {
    "en": "Keep transcript, intron and gene mappings consistent",
    "fr": "Maintenir la cohérence des correspondances transcrits, introns et gènes",
    "es": "Mantener coherencia entre mapas de transcritos, intrones y genes",
    "eu": "Mantendu transkripto, introi eta gene mapen koherentzia"
  },
  "FASTQ/带标签比对": {
    "en": "FASTQ / tagged alignments",
    "fr": "FASTQ / alignements avec tags",
    "es": "FASTQ / alineamientos etiquetados",
    "eu": "FASTQ / tagdun lerrokatzeak"
  },
  "结构配置": {
    "en": "Structure configuration",
    "fr": "Configuration de structure",
    "es": "Configuración de estructura",
    "eu": "Egituraren konfigurazioa"
  },
  "分子矩阵": {
    "en": "Molecule matrix",
    "fr": "Matrice moléculaire",
    "es": "Matriz molecular",
    "eu": "Molekula-matrizea"
  },
  "纠错与复杂度诊断": {
    "en": "Correction and complexity diagnostics",
    "fr": "Diagnostic de correction et complexité",
    "es": "Diagnóstico de corrección y complejidad",
    "eu": "Zuzenketa- eta konplexutasun-diagnostikoa"
  },
  "作为平行计数对照，不连续叠加另一套去重。": {
    "en": "Use as a parallel counting comparison, not as a second consecutive deduplication.",
    "fr": "Comparer en parallèle les comptages, sans appliquer une seconde déduplication en série.",
    "es": "Comparar conteos en paralelo, sin aplicar una segunda deduplicación consecutiva.",
    "eu": "Erabili zenbaketa-konparazio paralelo gisa, ez bigarren deduplikazio jarraitu gisa."
  },
  "read结构和纠错设置": {
    "en": "Read structure and correction settings",
    "fr": "Structure des reads et réglages de correction",
    "es": "Estructura de reads y ajustes de corrección",
    "eu": "Read-egitura eta zuzenketa-ezarpenak"
  },
  "按真实文库建立": {
    "en": "Configure from the actual library",
    "fr": "Configurer selon la bibliothèque réelle",
    "es": "Configurar según la biblioteca real",
    "eu": "Konfiguratu benetako liburutegiaren arabera"
  },
  "结构和注释": {
    "en": "Structure and annotation",
    "fr": "Structure et annotation",
    "es": "Estructura y anotación",
    "eu": "Egitura eta anotazioa"
  },
  "计数矩阵": {
    "en": "Count matrix",
    "fr": "Matrice de comptages",
    "es": "Matriz de conteos",
    "eu": "Zenbaketa-matrizea"
  },
  "barcode匹配": {
    "en": "Barcode matching",
    "fr": "Correspondance des barcodes",
    "es": "Coincidencia de barcodes",
    "eu": "Barcodeen bat-etortzea"
  },
  "UMI重复与比对类别": {
    "en": "UMI duplication and alignment categories",
    "fr": "Duplication UMI et catégories d’alignement",
    "es": "Duplicación UMI y categorías de alineamiento",
    "eu": "UMI bikoizketa eta lerrokatze-kategoriak"
  },
  "read片段结构": {
    "en": "Read segment structure",
    "fr": "Structure des segments de reads",
    "es": "Estructura de segmentos de reads",
    "eu": "Read-segmentuen egitura"
  },
  "按建库输入": {
    "en": "Specify from the library design",
    "fr": "Spécifier selon la bibliothèque",
    "es": "Especificar según el diseño de biblioteca",
    "eu": "Zehaztu liburutegi-diseinuaren arabera"
  },
  "BAM及参考/索引": {
    "en": "BAM and reference / index",
    "fr": "BAM et référence / index",
    "es": "BAM y referencia / índice",
    "eu": "BAM eta erreferentzia / indizea"
  },
  "BAM索引": {
    "en": "BAM index",
    "fr": "Index BAM",
    "es": "Índice BAM",
    "eu": "BAM indizea"
  },
  "可追溯子集": {
    "en": "Traceable subsets",
    "fr": "Sous-ensembles traçables",
    "es": "Subconjuntos trazables",
    "eu": "Jarraigarriak diren azpimultzoak"
  },
  "idxstats是比对记录统计，逐CB与UMI统计需另外实现。": {
    "en": "idxstats summarizes alignment records; per-CB and UMI statistics require additional processing.",
    "fr": "idxstats résume les enregistrements d’alignement ; les statistiques par CB et UMI nécessitent un traitement supplémentaire.",
    "es": "idxstats resume registros de alineamiento; las estadísticas por CB y UMI requieren procesamiento adicional.",
    "eu": "idxstats-ek lerrokatze-erregistroak laburtzen ditu; CB eta UMI estatistikek prozesamendu osagarria behar dute."
  },
  "保留primary/secondary/supplementary定义，避免重复计数。": {
    "en": "Retain primary/secondary/supplementary definitions to avoid double counting.",
    "fr": "Conserver les définitions primary/secondary/supplementary pour éviter le double comptage.",
    "es": "Conservar las definiciones primary/secondary/supplementary para evitar conteos duplicados.",
    "eu": "Mantendu primary/secondary/supplementary definizioak zenbaketa bikoitza saihesteko."
  },
  "适配refFlat与rRNA intervals": {
    "en": "Adapted refFlat and rRNA intervals",
    "fr": "refFlat et intervalles ARNr adaptés",
    "es": "refFlat e intervalos ARNr adaptados",
    "eu": "Egokitutako refFlat eta rRNA tarteak"
  },
  "RNA类别/覆盖指标": {
    "en": "RNA category / coverage metrics",
    "fr": "Indicateurs de catégories d’ARN et de couverture",
    "es": "Métricas de categorías de ARN y cobertura",
    "eu": "RNA kategorien / estalduraren adierazleak"
  },
  "部分比例按比对碱基计算，不是reads或UMI。": {
    "en": "Some fractions use aligned bases, not reads or UMIs.",
    "fr": "Certaines proportions utilisent les bases alignées, pas les reads ni les UMI.",
    "es": "Algunas fracciones usan bases alineadas, no reads ni UMI.",
    "eu": "Frakzio batzuek lerrokatutako baseak erabiltzen dituzte, ez readak edo UMIak."
  },
  "rRNA intervals和注释需适配酵母。": {
    "en": "Adapt rRNA intervals and annotation to yeast.",
    "fr": "Adapter les intervalles ARNr et l’annotation à la levure.",
    "es": "Adaptar intervalos ARNr y anotación a levadura.",
    "eu": "Egokitu rRNA tarteak eta anotazioa legamiara."
  },
  "链特异性": {
    "en": "Strandedness",
    "fr": "Spécificité de brin",
    "es": "Especificidad de hebra",
    "eu": "Kate-espezifikotasuna"
  },
  "按实验结构": {
    "en": "Follow the experimental design",
    "fr": "Suivre la structure expérimentale",
    "es": "Seguir el diseño experimental",
    "eu": "Jarraitu diseinu esperimentalari"
  },
  "匹配BED注释": {
    "en": "Matching BED annotation",
    "fr": "Annotation BED correspondante",
    "es": "Anotación BED correspondiente",
    "eu": "Bat datorren BED anotazioa"
  },
  "3′文库覆盖预期与全长文库不同。": {
    "en": "Expected coverage differs between 3′ and full-length libraries.",
    "fr": "La couverture attendue diffère entre bibliothèques 3′ et pleine longueur.",
    "es": "La cobertura esperada difiere entre bibliotecas 3′ y de longitud completa.",
    "eu": "Espero den estaldura desberdina da 3′ eta luzera osoko liburutegietan."
  },
  "区域/基因模型": {
    "en": "Region / gene models",
    "fr": "Modèles de régions / gènes",
    "es": "Modelos de regiones / genes",
    "eu": "Eskualde / gene ereduak"
  },
  "与比对参考及目标注释一致": {
    "en": "Match the alignment reference and target annotation",
    "fr": "Correspondre à la référence d’alignement et à l’annotation ciblée",
    "es": "Coincidir con la referencia de alineamiento y la anotación objetivo",
    "eu": "Bat etorri lerrokatze-erreferentziarekin eta helburu-anotazioarekin"
  },
  "兼容collapsed GTF": {
    "en": "Compatible collapsed GTF",
    "fr": "GTF collapsed compatible",
    "es": "GTF collapsed compatible",
    "eu": "Collapsed GTF bateragarria"
  },
  "需要时FASTA": {
    "en": "FASTA when required",
    "fr": "FASTA si nécessaire",
    "es": "FASTA cuando sea necesario",
    "eu": "FASTA behar denean"
  },
  "覆盖/比对/表达组成指标": {
    "en": "Coverage / alignment / expression-composition metrics",
    "fr": "Indicateurs de couverture, alignement et composition d’expression",
    "es": "Métricas de cobertura, alineamiento y composición de expresión",
    "eu": "Estaldura, lerrokatze eta adierazpen-konposizioko adierazleak"
  },
  "以文库/样本RNA-seq统计为主，不自动给每细胞UMI指标。": {
    "en": "Primarily library/sample RNA-seq statistics; per-cell UMI metrics are not produced automatically.",
    "fr": "Statistiques RNA-seq surtout par bibliothèque/échantillon ; pas d’indicateurs UMI par cellule automatiques.",
    "es": "Estadísticas RNA-seq principalmente por biblioteca/muestra; no genera automáticamente métricas UMI por célula.",
    "eu": "Batez ere liburutegi/lagin mailako RNA-seq estatistikak; ez ditu zelulako UMI adierazleak automatikoki sortzen."
  },
  "互斥或有优先级的区域注释": {
    "en": "Mutually exclusive or prioritized region annotations",
    "fr": "Annotations régionales exclusives ou hiérarchisées",
    "es": "Anotaciones regionales excluyentes o priorizadas",
    "eu": "Elkar baztertzen duten edo lehenetsitako eskualde-anotazioak"
  },
  "区域重叠": {
    "en": "Region overlaps",
    "fr": "Chevauchements régionaux",
    "es": "Solapamientos regionales",
    "eu": "Eskualdeen gainjartzeak"
  },
  "覆盖计数": {
    "en": "Coverage counts",
    "fr": "Comptages de couverture",
    "es": "Conteos de cobertura",
    "eu": "Estaldura-zenbaketak"
  },
  "按CB/UMI聚合需额外逻辑，记录分母。": {
    "en": "CB/UMI aggregation needs additional logic; record denominators.",
    "fr": "L’agrégation CB/UMI exige une logique supplémentaire ; consigner les dénominateurs.",
    "es": "La agregación CB/UMI requiere lógica adicional; registrar denominadores.",
    "eu": "CB/UMI agregazioak logika osagarria behar du; jaso izendatzaileak."
  },
  "链方向约束": {
    "en": "Strand constraints",
    "fr": "Contraintes de brin",
    "es": "Restricciones de hebra",
    "eu": "Kate-murrizketak"
  },
  "依协议和问题选择": {
    "en": "Choose according to protocol and question",
    "fr": "Choisir selon le protocole et la question",
    "es": "Elegir según protocolo y pregunta",
    "eu": "Hautatu protokoloaren eta galderaren arabera"
  },
  "多区域重叠优先级": {
    "en": "Priority for overlaps across regions",
    "fr": "Priorité des chevauchements entre régions",
    "es": "Prioridad de solapamientos entre regiones",
    "eu": "Eskualde arteko gainjartzeen lehentasuna"
  },
  "分析前定义避免重复计数": {
    "en": "Define before analysis to prevent double counting",
    "fr": "Définir avant l’analyse pour éviter le double comptage",
    "es": "Definir antes del análisis para evitar doble conteo",
    "eu": "Definitu analisia baino lehen zenbaketa bikoitza saihesteko"
  },
  "完全匹配的参考和注释": {
    "en": "Exactly matching reference and annotation",
    "fr": "Référence et annotation exactement correspondantes",
    "es": "Referencia y anotación exactamente coincidentes",
    "eu": "Zehazki bat datozen erreferentzia eta anotazioa"
  },
  "落点/错配/软剪切/剪接证据记录": {
    "en": "Records of mapping positions, mismatches, soft clips and splice evidence",
    "fr": "Preuves de positions, discordances, soft clips et épissage",
    "es": "Evidencia de posiciones, discrepancias, soft clips y splicing",
    "eu": "Posizioen, desadostasunen, soft clipen eta splicing-aren ebidentzia"
  },
  "可视化支持不能替代全体细胞定量。": {
    "en": "Visual inspection cannot replace quantification across all cells.",
    "fr": "L’examen visuel ne remplace pas la quantification de toutes les cellules.",
    "es": "La inspección visual no sustituye la cuantificación de todas las células.",
    "eu": "Ikusizko azterketak ez du zelula guztien kuantifikazioa ordezkatzen."
  },
  "已知变异": {
    "en": "Known variants",
    "fr": "Variants connus",
    "es": "Variantes conocidas",
    "eu": "Aldaera ezagunak"
  },
  "匹配参考": {
    "en": "Matching reference",
    "fr": "Référence correspondante",
    "es": "Referencia correspondiente",
    "eu": "Bat datorren erreferentzia"
  },
  "通过等位重比对筛查reads": {
    "en": "Reads passing allele-remapping checks",
    "fr": "Reads passant le contrôle de réalignement allélique",
    "es": "Reads que superan controles de realineamiento alélico",
    "eu": "Aleloen birmapaketaren kontrola gainditzen duten readak"
  },
  "偏倚诊断": {
    "en": "Bias diagnostics",
    "fr": "Diagnostic des biais",
    "es": "Diagnóstico de sesgos",
    "eu": "Alborapenen diagnostikoa"
  },
  "个体参考不保证无等位偏倚；WASP不解决所有SV/PAV/同源歧义。": {
    "en": "A personalized reference does not guarantee no allelic bias; WASP does not resolve all SV/PAV/homology ambiguities.",
    "fr": "Une référence personnalisée ne garantit pas l’absence de biais allélique ; WASP ne résout pas toutes les ambiguïtés SV/PAV/homologie.",
    "es": "Una referencia personalizada no garantiza ausencia de sesgo alélico; WASP no resuelve todas las ambigüedades SV/PAV/homología.",
    "eu": "Erreferentzia pertsonalizatuak ez du alborapen alelikorik eza bermatzen; WASP-ek ez ditu SV/PAV/homologia anbiguotasun guztiak ebazten."
  },
  "待检验变异": {
    "en": "Variants to assess",
    "fr": "Variants à évaluer",
    "es": "Variantes a evaluar",
    "eu": "Ebaluatzeko aldaerak"
  },
  "与实际菌株和参考坐标一致": {
    "en": "Match actual strains and reference coordinates",
    "fr": "Correspondre aux souches réelles et aux coordonnées de référence",
    "es": "Coincidir con cepas reales y coordenadas de referencia",
    "eu": "Bat etorri benetako anduiekin eta erreferentzia-koordenatuekin"
  },
  "raw矩阵；分子串扰功能需molecule info": {
    "en": "Raw matrix; molecule cross-talk analysis requires molecule information",
    "fr": "Matrice brute ; l’analyse du transfert moléculaire exige les informations moléculaires",
    "es": "Matriz raw; el análisis de transferencia molecular requiere información de moléculas",
    "eu": "Raw matrizea; molekulen arteko transferentziaren analisiak molekula-informazioa behar du"
  },
  "EmptyDrops检验": {
    "en": "EmptyDrops tests",
    "fr": "Tests EmptyDrops",
    "es": "Pruebas EmptyDrops",
    "eu": "EmptyDrops probak"
  },
  "swapped/chimeric诊断": {
    "en": "Swapped / chimeric molecule diagnostics",
    "fr": "Diagnostic des molécules transférées / chimériques",
    "es": "Diagnóstico de moléculas intercambiadas / quiméricas",
    "eu": "Trukatutako / molekula kimerikoen diagnostikoa"
  },
  "下采样矩阵": {
    "en": "Downsampled matrices",
    "fr": "Matrices sous-échantillonnées",
    "es": "Matrices submuestreadas",
    "eu": "Azpilagindutako matrizeak"
  },
  "方法随任务所需输入不同；最终filtered矩阵不够做空滴/分子串扰。": {
    "en": "Inputs vary by task; a final filtered matrix is insufficient for empty-droplet or molecule cross-talk analyses.",
    "fr": "Les entrées varient selon la tâche ; une matrice finale filtrée ne suffit pas pour les gouttelettes vides ou les transferts moléculaires.",
    "es": "Las entradas varían según la tarea; una matriz final filtrada no basta para gotas vacías o transferencias moleculares.",
    "eu": "Sarrerak zereginaren arabera aldatzen dira; azken matrize iragazia ez da nahikoa tanta hutsak edo molekula-transferentziak aztertzeko."
  },
  "背景及保留规则": {
    "en": "Background and retention rules",
    "fr": "Règles de fond et de rétention",
    "es": "Reglas de fondo y retención",
    "eu": "Hondoko eta atxikipen-arauak"
  },
  "按每文库的barcode分布与生物学设定，不照搬": {
    "en": "Use each library’s barcode distribution and biological context, not copied defaults",
    "fr": "Utiliser la distribution des barcodes et la biologie de chaque bibliothèque, pas des défauts copiés",
    "es": "Usar la distribución de barcodes y el contexto de cada biblioteca, no valores copiados",
    "eu": "Erabili liburutegi bakoitzeko barcode-banaketa eta testuinguru biologikoa, ez kopiatutako lehenetsiak"
  },
  "跨文库共享分子输入": {
    "en": "Shared-molecule inputs across libraries",
    "fr": "Données de molécules partagées entre bibliothèques",
    "es": "Datos de moléculas compartidas entre bibliotecas",
    "eu": "Liburutegien artean partekatutako molekulen datuak"
  },
  "包含CB、UMI、gene、reads及同测序池其他文库": {
    "en": "Include CB, UMI, gene, reads and other libraries from the same sequencing pool",
    "fr": "Inclure CB, UMI, gène, reads et autres bibliothèques du même pool",
    "es": "Incluir CB, UMI, gen, reads y otras bibliotecas del mismo pool",
    "eu": "Sartu CB, UMI, genea, readak eta sekuentziazio-pool bereko beste liburutegiak"
  },
  "未过滤计数AnnData": {
    "en": "AnnData with unfiltered counts",
    "fr": "AnnData avec comptages non filtrés",
    "es": "AnnData con conteos sin filtrar",
    "eu": "Iragazi gabeko zenbaketak dituen AnnData"
  },
  "细胞分数/标签": {
    "en": "Cell scores / labels",
    "fr": "Scores / étiquettes cellulaires",
    "es": "Puntuaciones / etiquetas celulares",
    "eu": "Zelula-puntuazioak / etiketak"
  },
  "背景基因系数": {
    "en": "Background-gene coefficients",
    "fr": "Coefficients des gènes de fond",
    "es": "Coeficientes de genes de fondo",
    "eu": "Hondoko geneen koefizienteak"
  },
  "训练标签从本数据推导，边界低RNA细胞需要复核。": {
    "en": "Training labels are derived from the data; review borderline low-RNA cells.",
    "fr": "Les étiquettes d’entraînement proviennent des données ; réexaminer les cellules limites à faible ARN.",
    "es": "Las etiquetas de entrenamiento derivan de los datos; revisar células limítrofes con poco ARN.",
    "eu": "Entrenamendu-etiketak datuetatik eratortzen dira; berrikusi RNA gutxiko mugako zelulak."
  },
  "未过滤cell×gene计数": {
    "en": "Unfiltered cell×gene counts",
    "fr": "Comptages cellule×gène non filtrés",
    "es": "Conteos célula×gen sin filtrar",
    "eu": "Iragazi gabeko zelula×gene zenbaketak"
  },
  "保留标签": {
    "en": "Retention labels",
    "fr": "Étiquettes de rétention",
    "es": "Etiquetas de retención",
    "eu": "Atxikipen-etiketak"
  },
  "barcode概率": {
    "en": "Barcode probabilities",
    "fr": "Probabilités des barcodes",
    "es": "Probabilidades de barcodes",
    "eu": "Barcode-probabilitateak"
  },
  "初始化空滴参考的计数条件": {
    "en": "Count criterion for initializing the empty-droplet reference",
    "fr": "Critère de comptage pour initialiser la référence des gouttelettes vides",
    "es": "Criterio de conteo para inicializar la referencia de gotas vacías",
    "eu": "Tanta hutsen erreferentzia hasieratzeko zenbaketa-irizpidea"
  },
  "从实际文库估计；不是通用酵母阈值": {
    "en": "Estimate from the actual library; not a universal yeast threshold",
    "fr": "Estimer avec la bibliothèque réelle ; pas un seuil universel de levure",
    "es": "Estimar con la biblioteca real; no es un umbral universal de levadura",
    "eu": "Estimatu benetako liburutegitik; ez da legamiarako atalase unibertsala"
  },
  "未过滤矩阵": {
    "en": "Unfiltered matrix",
    "fr": "Matrice non filtrée",
    "es": "Matriz sin filtrar",
    "eu": "Iragazi gabeko matrizea"
  },
  "原文重点snRNA；教程MALAT1/人鼠MT示例不能照搬酵母。": {
    "en": "The original study focuses on snRNA; tutorial MALAT1 and human/mouse mitochondrial examples cannot be copied to yeast.",
    "fr": "L’étude initiale concerne surtout le snRNA ; les exemples MALAT1 et mitochondriaux humain/souris ne s’appliquent pas directement à la levure.",
    "es": "El estudio original se centra en snRNA; los ejemplos MALAT1 y mitocondriales de humano/ratón no se trasladan directamente a levadura.",
    "eu": "Jatorrizko lana snRNA-n zentratzen da; MALAT1 eta giza/sagu mitokondrioen adibideak ezin dira zuzenean legamian erabili."
  },
  "未过滤gene×barcode矩阵": {
    "en": "Unfiltered gene×barcode matrix",
    "fr": "Matrice gène×barcode non filtrée",
    "es": "Matriz gen×barcode sin filtrar",
    "eu": "Iragazi gabeko gene×barcode matrizea"
  },
  "cell-calling结果": {
    "en": "Cell-calling results",
    "fr": "Résultats d’identification des cellules",
    "es": "Resultados de identificación celular",
    "eu": "Zelula-identifikazioaren emaitzak"
  },
  "细胞矩阵": {
    "en": "Cell matrix",
    "fr": "Matrice cellulaire",
    "es": "Matriz celular",
    "eu": "Zelula-matrizea"
  },
  "同质低计数群体相关，但需在实际酵母数据验证。": {
    "en": "Relevant to homogeneous low-count populations, but requires validation on the actual yeast data.",
    "fr": "Pertinent pour les populations homogènes à faibles comptages, mais à valider sur les données réelles de levure.",
    "es": "Pertinente para poblaciones homogéneas con pocos conteos, pero requiere validación en los datos reales de levadura.",
    "eu": "Zenbaketa baxuko populazio homogeneoetarako egokia izan daiteke, baina benetako legamia-datuetan baliozkotu behar da."
  },
  "包含空滴的raw矩阵": {
    "en": "Raw matrix including empty droplets",
    "fr": "Matrice brute incluant les gouttelettes vides",
    "es": "Matriz raw que incluya gotas vacías",
    "eu": "Tanta hutsak barne dituen raw matrizea"
  },
  "细胞概率": {
    "en": "Cell probabilities",
    "fr": "Probabilités cellulaires",
    "es": "Probabilidades celulares",
    "eu": "Zelula-probabilitateak"
  },
  "背景估计": {
    "en": "Background estimates",
    "fr": "Estimations du fond",
    "es": "Estimaciones del fondo",
    "eu": "Hondoaren estimazioak"
  },
  "校正计数": {
    "en": "Corrected counts",
    "fr": "Comptages corrigés",
    "es": "Conteos corregidos",
    "eu": "Zuzendutako zenbaketak"
  },
  "训练诊断": {
    "en": "Training diagnostics",
    "fr": "Diagnostic d’entraînement",
    "es": "Diagnóstico de entrenamiento",
    "eu": "Entrenamenduaren diagnostikoa"
  },
  "模型需检查训练/拟合；结果不等于健康细胞真值。": {
    "en": "Check training and model fit; results are not ground truth for healthy cells.",
    "fr": "Vérifier entraînement et ajustement ; les résultats ne sont pas une vérité de référence sur les cellules saines.",
    "es": "Verificar entrenamiento y ajuste; los resultados no son verdad de referencia sobre células sanas.",
    "eu": "Egiaztatu entrenamendua eta doikuntza; emaitzak ez dira zelula osasuntsuen egia erreferentziala."
  },
  "预期细胞数": {
    "en": "Expected cell count",
    "fr": "Nombre de cellules attendu",
    "es": "Número esperado de células",
    "eu": "Espero den zelula-kopurua"
  },
  "依据捕获记录与barcode诊断，不预设": {
    "en": "Use capture records and barcode diagnostics; do not assume a value",
    "fr": "Utiliser les relevés de capture et le diagnostic des barcodes ; ne pas présumer de valeur",
    "es": "Usar registros de captura y diagnóstico de barcodes; no presuponer un valor",
    "eu": "Erabili harrapaketa-erregistroak eta barcode-diagnostikoa; ez suposatu baliorik"
  },
  "纳入背景的barcode范围": {
    "en": "Barcode range included as background",
    "fr": "Plage de barcodes incluse dans le fond",
    "es": "Rango de barcodes incluido como fondo",
    "eu": "Hondo gisa sartutako barcode-tartea"
  },
  "保证真实细胞与代表性空滴均纳入": {
    "en": "Include both real cells and representative empty droplets",
    "fr": "Inclure cellules réelles et gouttelettes vides représentatives",
    "es": "Incluir células reales y gotas vacías representativas",
    "eu": "Sartu benetako zelulak eta tanta huts adierazgarriak"
  },
  "raw+cell矩阵": {
    "en": "Raw and cell matrices",
    "fr": "Matrices brutes et cellulaires",
    "es": "Matrices raw y celulares",
    "eu": "Raw eta zelula-matrizeak"
  },
  "聚类；必要时已知阴性marker": {
    "en": "Clustering; known negative markers when needed",
    "fr": "Clustering ; marqueurs négatifs connus si nécessaire",
    "es": "Clustering; marcadores negativos conocidos cuando proceda",
    "eu": "Clustering-a; behar denean marker negatibo ezagunak"
  },
  "高度均一酵母群体可能缺乏自动估计所需区分程序。": {
    "en": "Highly homogeneous yeast populations may lack distinct programs needed for automatic estimation.",
    "fr": "Les populations de levure très homogènes peuvent manquer de programmes distinctifs nécessaires à l’estimation automatique.",
    "es": "Las poblaciones de levadura muy homogéneas pueden carecer de programas distintivos necesarios para estimar automáticamente.",
    "eu": "Legamia-populazio oso homogeneoek estimazio automatikorako behar diren programa bereizgarriak falta ditzakete."
  },
  "分群信息": {
    "en": "Clustering information",
    "fr": "Informations de clustering",
    "es": "Información de clustering",
    "eu": "Clustering-informazioa"
  },
  "初步分群并做敏感性分析": {
    "en": "Use initial clustering and perform sensitivity analysis",
    "fr": "Utiliser un clustering initial et analyser la sensibilité",
    "es": "Usar clustering inicial y analizar sensibilidad",
    "eu": "Erabili hasierako clustering-a eta egin sentikortasun-analisia"
  },
  "阴性表达证据": {
    "en": "Evidence of absent expression",
    "fr": "Preuves d’absence d’expression",
    "es": "Evidencia de ausencia de expresión",
    "eu": "Adierazpenik ezaren ebidentzia"
  },
  "需酵母和情境适配，不使用人类marker": {
    "en": "Adapt to yeast and context; do not use human markers",
    "fr": "Adapter à la levure et au contexte ; ne pas utiliser de marqueurs humains",
    "es": "Adaptar a levadura y contexto; no usar marcadores humanos",
    "eu": "Egokitu legamiara eta testuingurura; ez erabili giza markerrak"
  },
  "细胞计数": {
    "en": "Cell counts",
    "fr": "Comptages cellulaires",
    "es": "Conteos celulares",
    "eu": "Zelula-zenbaketak"
  },
  "可选空滴背景/cluster": {
    "en": "Optional empty-droplet background / clusters",
    "fr": "Fond de gouttelettes vides / clusters facultatifs",
    "es": "Fondo de gotas vacías / clusters opcionales",
    "eu": "Aukerako tanta-hutsen hondoa / clusterrak"
  },
  "群体均一或连续状态时检查native/contamination可分性。": {
    "en": "In homogeneous populations or continuous states, check that native and contaminating expression can be separated.",
    "fr": "Dans les populations homogènes ou états continus, vérifier la séparabilité des expressions native et contaminante.",
    "es": "En poblaciones homogéneas o estados continuos, comprobar que se separen expresión nativa y contaminante.",
    "eu": "Populazio homogeneoetan edo egoera jarraituetan, egiaztatu bertako eta kutsadurako adierazpena bereiz daitezkeela."
  },
  "额外背景矩阵": {
    "en": "Additional background matrix",
    "fr": "Matrice de fond supplémentaire",
    "es": "Matriz de fondo adicional",
    "eu": "Hondoko matrize osagarria"
  },
  "有可靠空滴时保留并提供": {
    "en": "Retain and supply reliable empty-droplet data when available",
    "fr": "Conserver et fournir les gouttelettes vides fiables si disponibles",
    "es": "Conservar y aportar datos fiables de gotas vacías cuando existan",
    "eu": "Gorde eta eman tanta hutsen datu fidagarriak eskuragarri daudenean"
  },
  "细胞分群": {
    "en": "Cell clustering",
    "fr": "Clustering cellulaire",
    "es": "Clustering celular",
    "eu": "Zelulen clustering-a"
  },
  "可提供适配的初始标签并复核": {
    "en": "Supply suitable initial labels and review them",
    "fr": "Fournir des étiquettes initiales adaptées et les réexaminer",
    "es": "Proporcionar etiquetas iniciales apropiadas y revisarlas",
    "eu": "Eman hasierako etiketa egokiak eta berrikusi"
  },
  "原始计数与cluster": {
    "en": "Raw counts and clusters",
    "fr": "Comptages bruts et clusters",
    "es": "Conteos raw y clusters",
    "eu": "Raw zenbaketak eta clusterrak"
  },
  "GCG列表": {
    "en": "GCG list",
    "fr": "Liste GCG",
    "es": "Lista GCG",
    "eu": "GCG zerrenda"
  },
  "校正矩阵": {
    "en": "Corrected matrix",
    "fr": "Matrice corrigée",
    "es": "Matriz corregida",
    "eu": "Zuzendutako matrizea"
  },
  "依赖熵–均值和cluster假设；真实低变异也是本项目目标，须独立污染证据。": {
    "en": "Depends on entropy–mean and cluster assumptions. Genuine low variability is also a target here, so independent contamination evidence is required.",
    "fr": "Dépend d’hypothèses entropie–moyenne et de clusters. La faible variabilité réelle étant aussi une cible, il faut des preuves indépendantes de contamination.",
    "es": "Depende de supuestos entropía–media y de clusters. La baja variabilidad real también es un objetivo; se requiere evidencia independiente de contaminación.",
    "eu": "Entropia–batezbesteko eta cluster-suposizioen mende dago. Benetako aldakortasun baxua ere helburua denez, kutsaduraren ebidentzia independentea behar da."
  },
  "预先分群": {
    "en": "Initial clustering",
    "fr": "Clustering préalable",
    "es": "Clustering previo",
    "eu": "Aurretiko clustering-a"
  },
  "每文库应用并评估分群依赖性": {
    "en": "Apply per library and assess dependence on clustering",
    "fr": "Appliquer par bibliothèque et évaluer la dépendance au clustering",
    "es": "Aplicar por biblioteca y evaluar dependencia del clustering",
    "eu": "Aplikatu liburutegika eta ebaluatu clustering-arekiko mendekotasuna"
  },
  "全barcode与cell矩阵": {
    "en": "All-barcode and cell matrices",
    "fr": "Matrices de tous les barcodes et des cellules",
    "es": "Matrices de todos los barcodes y de células",
    "eu": "Barcode guztien eta zelulen matrizeak"
  },
  "背景profile": {
    "en": "Background profile",
    "fr": "Profil du fond",
    "es": "Perfil del fondo",
    "eu": "Hondoaren profila"
  },
  "原方法强调差异表达；不能推定已验证精细噪音分布。": {
    "en": "The original method emphasizes differential expression; validation for fine-scale noise distributions cannot be assumed.",
    "fr": "La méthode initiale privilégie l’expression différentielle ; sa validation pour les distributions fines de bruit n’est pas acquise.",
    "es": "El método original enfatiza expresión diferencial; no se puede asumir validación para distribuciones finas de ruido.",
    "eu": "Jatorrizko metodoak adierazpen diferentziala lehenesten du; ezin da suposatu zarataren banaketa xeheetarako baliozkotuta dagoenik."
  },
  "背景barcode定义": {
    "en": "Background-barcode definition",
    "fr": "Définition des barcodes de fond",
    "es": "Definición de barcodes de fondo",
    "eu": "Hondoko barcodeen definizioa"
  },
  "依据当前文库；不预填": {
    "en": "Derive from the current library; do not prefill values",
    "fr": "Définir selon la bibliothèque actuelle ; ne pas préremplir de valeurs",
    "es": "Derivar de la biblioteca actual; no rellenar valores por adelantado",
    "eu": "Ondorioztatu uneko liburutegitik; ez bete balioak aurrez"
  },
  "污染概率规则": {
    "en": "Contamination-probability rule",
    "fr": "Règle de probabilité de contamination",
    "es": "Regla de probabilidad de contaminación",
    "eu": "Kutsadura-probabilitatearen araua"
  },
  "记录选择并检验敏感性": {
    "en": "Record the choice and test sensitivity",
    "fr": "Consigner le choix et tester la sensibilité",
    "es": "Registrar la elección y probar sensibilidad",
    "eu": "Jaso hautaketa eta aztertu sentikortasuna"
  },
  "建议空滴ambient profile": {
    "en": "Empty-droplet ambient profile recommended",
    "fr": "Profil ambiant des gouttelettes vides recommandé",
    "es": "Se recomienda perfil ambiental de gotas vacías",
    "eu": "Tanta hutsen ingurune-profila gomendatzen da"
  },
  "官方主要方法引用仍为2022预印本；软件可用不等于在酵母得到验证。": {
    "en": "The official method reference remains a 2022 preprint; available software does not establish yeast validation.",
    "fr": "La référence officielle reste une prépublication de 2022 ; la disponibilité du logiciel ne prouve pas sa validation chez la levure.",
    "es": "La referencia oficial sigue siendo una prepublicación de 2022; disponer del software no demuestra validación en levadura.",
    "eu": "Metodoaren erreferentzia ofiziala 2022ko aurreargitalpena da oraindik; softwarea eskuragarri egoteak ez du legamian baliozkotzea frogatzen."
  },
  "审计原零值变非零与计数增加。": {
    "en": "Audit zero-to-nonzero changes and increases in counts.",
    "fr": "Auditer les passages de zéro à non-zéro et les augmentations de comptage.",
    "es": "Auditar cambios de cero a no cero y aumentos de conteos.",
    "eu": "Ikuskatu zerotik ez-zerorako aldaketak eta zenbaketen igoerak."
  },
  "背景转录本分布": {
    "en": "Background transcript distribution",
    "fr": "Distribution des transcrits de fond",
    "es": "Distribución de transcritos de fondo",
    "eu": "Hondoko transkriptoen banaketa"
  },
  "与gene顺序一致且归一化": {
    "en": "Normalize and match the gene order",
    "fr": "Normaliser et respecter l’ordre des gènes",
    "es": "Normalizar y respetar el orden de genes",
    "eu": "Normalizatu eta errespetatu geneen ordena"
  },
  "限制预测计数不超过观察": {
    "en": "Restrict predicted counts to observed counts or lower",
    "fr": "Limiter les comptages prédits aux valeurs observées ou inférieures",
    "es": "Limitar conteos predichos a los observados o inferiores",
    "eu": "Mugatu aurreikusitako zenbaketak behatutakora edo beherago"
  },
  "按版本审计；改变噪音估计，不能无记录启用": {
    "en": "Audit by version; this affects noise estimation and must not be enabled without documentation",
    "fr": "Auditer selon la version ; cela modifie l’estimation du bruit et doit être documenté",
    "es": "Auditar según versión; cambia la estimación del ruido y debe documentarse",
    "eu": "Ikuskatu bertsioaren arabera; zarata-estimazioa aldatzen du eta dokumentatu behar da"
  },
  "foreground+background矩阵": {
    "en": "Foreground and background matrices",
    "fr": "Matrices de signal et de fond",
    "es": "Matrices de señal y fondo",
    "eu": "Seinalearen eta hondoaren matrizeak"
  },
  "污染水平": {
    "en": "Contamination level",
    "fr": "Niveau de contamination",
    "es": "Nivel de contaminación",
    "eu": "Kutsadura-maila"
  },
  "对应方法本轮核实为预印本；校正引起的方差下降须审计。": {
    "en": "The method was verified as a preprint in this audit; inspect variance reductions caused by correction.",
    "fr": "La méthode a été vérifiée comme prépublication lors de cet audit ; examiner les baisses de variance dues à la correction.",
    "es": "El método se verificó como prepublicación en esta auditoría; revisar reducciones de varianza causadas por la corrección.",
    "eu": "Ikuskapen honetan metodoa aurreargitalpen gisa egiaztatu da; aztertu zuzenketak eragindako bariantza-jaitsierak."
  },
  "每捕获文库原始计数": {
    "en": "Raw counts per capture library",
    "fr": "Comptages bruts par bibliothèque de capture",
    "es": "Conteos raw por biblioteca de captura",
    "eu": "Harrapaketa-liburutegi bakoitzeko raw zenbaketak"
  },
  "同型双细胞难识别；倍性/大细胞不等于双细胞。": {
    "en": "Homotypic doublets are difficult to detect; ploidy and large cell size do not establish doublets.",
    "fr": "Les doublets homotypiques sont difficiles à détecter ; ploïdie ou grande taille ne prouvent pas un doublet.",
    "es": "Los dobletes homotípicos son difíciles de detectar; ploidía o gran tamaño no demuestran un doblete.",
    "eu": "Doublet homotipikoak zailak dira detektatzen; ploidiak edo zelula-tamaina handiak ez dute doubleta frogatzen."
  },
  "独立捕获文库": {
    "en": "Independent capture libraries",
    "fr": "Bibliothèques de capture indépendantes",
    "es": "Bibliotecas de captura independientes",
    "eu": "Harrapaketa-liburutegi independenteak"
  },
  "同文库lane不作为独立捕获": {
    "en": "Lanes from the same library are not independent captures",
    "fr": "Les pistes d’une même bibliothèque ne sont pas des captures indépendantes",
    "es": "Los carriles de una misma biblioteca no son capturas independientes",
    "eu": "Liburutegi bereko erreiak ez dira harrapaketa independenteak"
  },
  "预期双细胞率": {
    "en": "Expected doublet rate",
    "fr": "Taux de doublets attendu",
    "es": "Tasa esperada de dobletes",
    "eu": "Espero den doublet-tasa"
  },
  "有可靠平台信息时适配；不按1011菌株数推定": {
    "en": "Adapt using reliable platform information; do not infer it from the 1011 strain count",
    "fr": "Adapter avec des informations fiables de plateforme ; ne pas déduire du nombre de 1011 souches",
    "es": "Adaptar con información fiable de plataforma; no inferir del número de 1011 cepas",
    "eu": "Egokitu plataforma-informazio fidagarriarekin; ez ondorioztatu 1011 anduien kopurutik"
  },
  "每捕获文库原始cell×gene计数": {
    "en": "Raw cell×gene counts per capture library",
    "fr": "Comptages cellule×gène bruts par bibliothèque de capture",
    "es": "Conteos célula×gen raw por biblioteca de captura",
    "eu": "Harrapaketa-liburutegi bakoitzeko raw zelula×gene zenbaketak"
  },
  "模拟分数分布": {
    "en": "Simulated score distribution",
    "fr": "Distribution simulée des scores",
    "es": "Distribución simulada de puntuaciones",
    "eu": "Simulatutako puntuazioen banaketa"
  },
  "不能识别所有同状态混合细胞。": {
    "en": "Cannot identify every mixed cell sharing the same state.",
    "fr": "Ne détecte pas tous les mélanges de cellules du même état.",
    "es": "No identifica todas las mezclas de células del mismo estado.",
    "eu": "Ez ditu egoera bereko zelula-nahasketa guztiak identifikatzen."
  },
  "双细胞率先验": {
    "en": "Doublet-rate prior",
    "fr": "A priori du taux de doublets",
    "es": "Prior de la tasa de dobletes",
    "eu": "Doublet-tasaren aurretiko banaketa"
  },
  "根据捕获设计或合理敏感性范围": {
    "en": "Use the capture design or a defensible sensitivity range",
    "fr": "Utiliser le plan de capture ou une plage de sensibilité justifiable",
    "es": "Usar el diseño de captura o un rango de sensibilidad justificable",
    "eu": "Erabili harrapaketa-diseinua edo sentikortasun-tarte justifikagarria"
  },
  "分类score界限": {
    "en": "Classification-score boundary",
    "fr": "Seuil du score de classification",
    "es": "Límite de puntuación de clasificación",
    "eu": "Sailkapen-puntuazioaren muga"
  },
  "检查实测和模拟score分布，不机械使用": {
    "en": "Inspect observed and simulated score distributions; do not apply mechanically",
    "fr": "Examiner scores observés et simulés ; ne pas appliquer mécaniquement",
    "es": "Revisar puntuaciones observadas y simuladas; no aplicar mecánicamente",
    "eu": "Aztertu behatutako eta simulatutako puntuazioak; ez aplikatu mekanikoki"
  },
  "Seurat表达对象": {
    "en": "Seurat expression object",
    "fr": "Objet d’expression Seurat",
    "es": "Objeto de expresión Seurat",
    "eu": "Seurat adierazpen-objektua"
  },
  "捕获文库信息": {
    "en": "Capture-library information",
    "fr": "Informations de bibliothèque de capture",
    "es": "Información de biblioteca de captura",
    "eu": "Harrapaketa-liburutegiaren informazioa"
  },
  "分类结果": {
    "en": "Classification results",
    "fr": "Résultats de classification",
    "es": "Resultados de clasificación",
    "eu": "Sailkapen-emaitzak"
  },
  "参数扫描": {
    "en": "Parameter sweep",
    "fr": "Balayage de paramètres",
    "es": "Exploración de parámetros",
    "eu": "Parametroen miaketa"
  },
  "同型修正依分群；周期连续状态不应强行解释为混合。": {
    "en": "Homotypic adjustment depends on clusters; continuous cell-cycle states should not automatically be called mixtures.",
    "fr": "L’ajustement homotypique dépend des clusters ; les états continus du cycle ne sont pas automatiquement des mélanges.",
    "es": "El ajuste homotípico depende de clusters; los estados continuos del ciclo no deben clasificarse automáticamente como mezclas.",
    "eu": "Doikuntza homotipikoa clusterren araberakoa da; zikloko egoera jarraituak ez dira automatikoki nahasketak."
  },
  "邻域大小": {
    "en": "Neighborhood size",
    "fr": "Taille du voisinage",
    "es": "Tamaño del vecindario",
    "eu": "Auzotasun-tamaina"
  },
  "通过当前数据参数扫描并检查稳定性": {
    "en": "Sweep parameters on the current data and check stability",
    "fr": "Explorer les paramètres sur les données actuelles et vérifier la stabilité",
    "es": "Explorar parámetros en los datos actuales y comprobar estabilidad",
    "eu": "Miatu parametroak uneko datuetan eta egiaztatu egonkortasuna"
  },
  "预期双细胞数": {
    "en": "Expected doublet count",
    "fr": "Nombre de doublets attendu",
    "es": "Número esperado de dobletes",
    "eu": "Espero den doublet-kopurua"
  },
  "捕获设计与同型估计需适配": {
    "en": "Adapt the capture design and homotypic estimate",
    "fr": "Adapter le plan de capture et l’estimation homotypique",
    "es": "Adaptar el diseño de captura y la estimación homotípica",
    "eu": "Egokitu harrapaketa-diseinua eta estimazio homotipikoa"
  },
  "已拟合scVI与原始计数": {
    "en": "Fitted scVI model and raw counts",
    "fr": "Modèle scVI ajusté et comptages bruts",
    "es": "Modelo scVI ajustado y conteos raw",
    "eu": "Doitutako scVI eredua eta raw zenbaketak"
  },
  "scVI表示及模拟假设影响结果；记录训练与种子。": {
    "en": "scVI representation and simulation assumptions affect results; record training settings and seeds.",
    "fr": "La représentation scVI et les hypothèses de simulation influencent les résultats ; consigner entraînement et graines.",
    "es": "La representación scVI y los supuestos de simulación influyen en resultados; registrar entrenamiento y semillas.",
    "eu": "scVI irudikapenak eta simulazio-suposizioek emaitzak baldintzatzen dituzte; jaso entrenamendua eta ausazko haziak."
  },
  "训练批次范围": {
    "en": "Training-batch scope",
    "fr": "Périmètre des lots d’entraînement",
    "es": "Ámbito de lotes de entrenamiento",
    "eu": "Entrenamendu-batchen esparrua"
  },
  "按独立捕获文库设计": {
    "en": "Design by independent capture library",
    "fr": "Concevoir par bibliothèque de capture indépendante",
    "es": "Diseñar por biblioteca de captura independiente",
    "eu": "Diseinatu harrapaketa-liburutegi independenteen arabera"
  },
  "SingleCellExperiment原始计数": {
    "en": "SingleCellExperiment raw counts",
    "fr": "Comptages bruts SingleCellExperiment",
    "es": "Conteos raw de SingleCellExperiment",
    "eu": "SingleCellExperiment raw zenbaketak"
  },
  "hybrid不是独立于其组成评分的额外真值。": {
    "en": "The hybrid score is not additional ground truth independent of its component scores.",
    "fr": "Le score hybrid n’est pas une vérité supplémentaire indépendante de ses scores constitutifs.",
    "es": "La puntuación hybrid no es una verdad adicional independiente de sus componentes.",
    "eu": "Hybrid puntuazioa ez da osagaien puntuazioetatik independentea den egia osagarria."
  },
  "cell×gene原始计数": {
    "en": "Raw cell×gene counts",
    "fr": "Comptages cellule×gène bruts",
    "es": "Conteos célula×gen raw",
    "eu": "Raw zelula×gene zenbaketak"
  },
  "score尺度与其他双细胞方法不一致。": {
    "en": "Score scales differ from those of other doublet methods.",
    "fr": "L’échelle des scores diffère des autres méthodes de doublets.",
    "es": "La escala de puntuaciones difiere de otros métodos de dobletes.",
    "eu": "Puntuazio-eskalak beste doublet metodoenak ez bezalakoak dira."
  },
  "模拟复算次数": {
    "en": "Number of simulation repetitions",
    "fr": "Nombre de répétitions de simulation",
    "es": "Número de repeticiones de simulación",
    "eu": "Simulazio-errepikapenen kopurua"
  },
  "根据稳定性与计算资源": {
    "en": "Choose based on stability and computing resources",
    "fr": "Choisir selon stabilité et ressources de calcul",
    "es": "Elegir según estabilidad y recursos de cálculo",
    "eu": "Hautatu egonkortasunaren eta konputazio-baliabideen arabera"
  },
  "分群算法": {
    "en": "Clustering algorithm",
    "fr": "Algorithme de clustering",
    "es": "Algoritmo de clustering",
    "eu": "Clustering-algoritmoa"
  },
  "固定版本与随机性并复核": {
    "en": "Fix version and randomness settings, then review results",
    "fr": "Fixer version et réglages aléatoires, puis examiner les résultats",
    "es": "Fijar versión y ajustes aleatorios, y revisar resultados",
    "eu": "Finkatu bertsioa eta ausazkotasun-ezarpenak, eta berrikusi emaitzak"
  },
  "表达、cluster、marker": {
    "en": "Expression, clusters and markers",
    "fr": "Expression, clusters et marqueurs",
    "es": "Expresión, clusters y marcadores",
    "eu": "Adierazpena, clusterrak eta markerrak"
  },
  "双细胞候选": {
    "en": "Doublet candidates",
    "fr": "Doublets candidats",
    "es": "Dobletes candidatos",
    "eu": "Doublet-hautagaiak"
  },
  "rescue状态": {
    "en": "Rescue status",
    "fr": "Statut de récupération",
    "es": "Estado de rescate",
    "eu": "Berreskuratze-egoera"
  },
  "依赖分群及reference programs；不能保证所有过渡酵母状态都被保护。": {
    "en": "Depends on clustering and reference programs; cannot guarantee preservation of every transitional yeast state.",
    "fr": "Dépend du clustering et des programmes de référence ; ne garantit pas la préservation de tous les états transitoires de levure.",
    "es": "Depende de clusters y programas de referencia; no garantiza conservar todos los estados transitorios de levadura.",
    "eu": "Clustering-aren eta erreferentzia-programen mende dago; ez du legamiaren trantsizio-egoera guztien babesa bermatzen."
  },
  "带CB/UMI的BAM": {
    "en": "BAM with CB/UMI tags",
    "fr": "BAM avec tags CB/UMI",
    "es": "BAM con tags CB/UMI",
    "eu": "CB/UMI tagdun BAM"
  },
  "SNP位点；Demuxlet还需候选基因型": {
    "en": "SNP sites; Demuxlet additionally requires candidate genotypes",
    "fr": "Sites SNP ; Demuxlet exige aussi des génotypes candidats",
    "es": "Sitios SNP; Demuxlet requiere además genotipos candidatos",
    "eu": "SNP guneak; Demuxlet-ek genotipo-hautagaiak ere behar ditu"
  },
  "菌株/基因型簇": {
    "en": "Strains / genotype clusters",
    "fr": "Souches / clusters génotypiques",
    "es": "Cepas / clusters genotípicos",
    "eu": "Anduiak / genotipo-clusterrak"
  },
  "混合归属证据": {
    "en": "Mixed-assignment evidence",
    "fr": "Preuves d’attribution mixte",
    "es": "Evidencia de asignación mixta",
    "eu": "Esleipen mistoaren ebidentzia"
  },
  "并非为任意酵母倍性自动验证；同菌株双细胞盲区。": {
    "en": "Not automatically validated for arbitrary yeast ploidies; same-strain doublets remain a blind spot.",
    "fr": "Non validé automatiquement pour toute ploïdie de levure ; angle mort pour les doublets de même souche.",
    "es": "No está validado automáticamente para cualquier ploidía de levadura; los dobletes de la misma cepa siguen siendo un punto ciego.",
    "eu": "Ez dago automatikoki legamiaren edozein ploidiarako baliozkotuta; andui bereko doubletak puntu itsua dira."
  },
  "变异与倍性适配": {
    "en": "Variant and ploidy adaptation",
    "fr": "Adaptation des variants et de la ploïdie",
    "es": "Adaptación de variantes y ploidía",
    "eu": "Aldaeren eta ploidiaren egokitzapena"
  },
  "匹配真实样本、参考及模型假设": {
    "en": "Match the actual samples, reference and model assumptions",
    "fr": "Correspondre aux échantillons réels, à la référence et aux hypothèses du modèle",
    "es": "Coincidir con muestras reales, referencia y supuestos del modelo",
    "eu": "Bat etorri benetako laginekin, erreferentziarekin eta ereduaren suposizioekin"
  },
  "CB列表": {
    "en": "CB list",
    "fr": "Liste de CB",
    "es": "Lista de CB",
    "eu": "CB zerrenda"
  },
  "候选SNP/参考": {
    "en": "Candidate SNPs / reference",
    "fr": "SNP candidats / référence",
    "es": "SNP candidatos / referencia",
    "eu": "SNP-hautagaiak / erreferentzia"
  },
  "AD/DP等位计数": {
    "en": "AD/DP allele counts",
    "fr": "Comptages alléliques AD/DP",
    "es": "Conteos alélicos AD/DP",
    "eu": "AD/DP alelo-zenbaketak"
  },
  "位点支持": {
    "en": "Site support",
    "fr": "Support par site",
    "es": "Soporte por sitio",
    "eu": "Gunearen sostengua"
  },
  "RNA覆盖、ASE和映射偏倚影响基因型推断。": {
    "en": "RNA coverage, ASE and mapping bias affect genotype inference.",
    "fr": "La couverture ARN, l’ASE et les biais d’alignement influencent l’inférence génotypique.",
    "es": "La cobertura de ARN, ASE y sesgos de mapeo afectan la inferencia de genotipos.",
    "eu": "RNA estaldurak, ASEk eta mapaketa-alborapenek genotipo-inferentzia baldintzatzen dute."
  },
  "分子标签": {
    "en": "Molecule tags",
    "fr": "Tags moléculaires",
    "es": "Tags moleculares",
    "eu": "Molekula-tagak"
  },
  "与BAM实际字段一致": {
    "en": "Match the actual BAM fields",
    "fr": "Correspondre aux champs BAM réels",
    "es": "Coincidir con los campos reales del BAM",
    "eu": "Bat etorri BAMeko benetako eremuekin"
  },
  "逐细胞等位计数": {
    "en": "Per-cell allele counts",
    "fr": "Comptages alléliques par cellule",
    "es": "Conteos alélicos por célula",
    "eu": "Zelulako alelo-zenbaketak"
  },
  "可选匹配VCF": {
    "en": "Optional matching VCF",
    "fr": "VCF correspondant facultatif",
    "es": "VCF correspondiente opcional",
    "eu": "Aukerako VCF bateragarria"
  },
  "身份概率": {
    "en": "Identity probabilities",
    "fr": "Probabilités d’identité",
    "es": "Probabilidades de identidad",
    "eu": "Identitate-probabilitateak"
  },
  "doublet概率": {
    "en": "Doublet probabilities",
    "fr": "Probabilités de doublet",
    "es": "Probabilidades de doblete",
    "eu": "Doublet-probabilitateak"
  },
  "候选菌株过近、低覆盖、倍性不符时应保留未定。": {
    "en": "Retain unassigned status when candidate strains are too similar, coverage is low or ploidy assumptions fail.",
    "fr": "Conserver le statut indéterminé si les souches sont trop proches, la couverture faible ou la ploïdie incompatible.",
    "es": "Conservar estado sin asignar si las cepas son demasiado próximas, hay poca cobertura o falla el supuesto de ploidía.",
    "eu": "Mantendu esleitu gabeko egoera anduiak hurbilegiak badira, estaldura baxua bada edo ploidia-suposizioak betetzen ez badira."
  },
  "候选身份": {
    "en": "Candidate identities",
    "fr": "Identités candidates",
    "es": "Identidades candidatas",
    "eu": "Identitate-hautagaiak"
  },
  "根据实际混样菌株，不是默认全部1011": {
    "en": "Use strains actually pooled; do not default to all 1011",
    "fr": "Utiliser les souches réellement mélangées, pas les 1011 par défaut",
    "es": "Usar las cepas realmente mezcladas, no las 1011 por defecto",
    "eu": "Erabili benetan nahastutako anduiak; ez erabili 1011 guztiak lehenetsita"
  },
  "参考": {
    "en": "Reference",
    "fr": "Référence",
    "es": "Referencia",
    "eu": "Erreferentzia"
  },
  "候选群体数量": {
    "en": "Number of candidate populations",
    "fr": "Nombre de populations candidates",
    "es": "Número de poblaciones candidatas",
    "eu": "Populazio-hautagaien kopurua"
  },
  "基因型簇": {
    "en": "Genotype clusters",
    "fr": "Clusters génotypiques",
    "es": "Clusters genotípicos",
    "eu": "Genotipo-clusterrak"
  },
  "簇不是自动匹配到标准菌株；酵母倍性需核查。": {
    "en": "Clusters are not automatically matched to named strains; verify yeast ploidy assumptions.",
    "fr": "Les clusters ne correspondent pas automatiquement à des souches nommées ; vérifier les hypothèses de ploïdie de levure.",
    "es": "Los clusters no se corresponden automáticamente con cepas identificadas; verificar supuestos de ploidía de levadura.",
    "eu": "Clusterrak ez dira automatikoki izendatutako anduiekin parekatzen; egiaztatu legamiaren ploidia-suposizioak."
  },
  "基因型簇数量": {
    "en": "Number of genotype clusters",
    "fr": "Nombre de clusters génotypiques",
    "es": "Número de clusters genotípicos",
    "eu": "Genotipo-clusterren kopurua"
  },
  "实际混样设计或可解释候选范围": {
    "en": "Use the actual pooling design or an interpretable candidate range",
    "fr": "Utiliser le mélange réel ou une plage de candidats interprétable",
    "es": "Usar el diseño real de mezcla o un rango interpretable de candidatos",
    "eu": "Erabili benetako nahasketa-diseinua edo hautagai-tarte interpretagarria"
  },
  "元数据": {
    "en": "Metadata",
    "fr": "Métadonnées",
    "es": "Metadatos",
    "eu": "Metadatuak"
  },
  "基因集/参考": {
    "en": "Gene sets / references",
    "fr": "Ensembles de gènes / références",
    "es": "Conjuntos de genes / referencias",
    "eu": "Gene multzoak / erreferentziak"
  },
  "标准化层": {
    "en": "Normalized layers",
    "fr": "Couches normalisées",
    "es": "Capas normalizadas",
    "eu": "Geruza normalizatuak"
  },
  "PCA/邻域/聚类": {
    "en": "PCA / neighborhoods / clustering",
    "fr": "ACP / voisinages / clustering",
    "es": "PCA / vecindarios / clustering",
    "eu": "PCA / auzotasunak / clustering-a"
  },
  "映射标签": {
    "en": "Transferred labels",
    "fr": "Étiquettes transférées",
    "es": "Etiquetas transferidas",
    "eu": "Transferitutako etiketak"
  },
  "默认周期参考主要为哺乳动物；需替换。": {
    "en": "Default cell-cycle references are mainly mammalian and must be replaced.",
    "fr": "Les références de cycle par défaut sont surtout mammifères et doivent être remplacées.",
    "es": "Las referencias de ciclo por defecto son principalmente de mamíferos y deben sustituirse.",
    "eu": "Zelula-zikloaren erreferentzia lehenetsiak batez ere ugaztunenak dira eta ordeztu behar dira."
  },
  "聚类marker检验与正式跨样本推断分开。": {
    "en": "Separate cluster-marker testing from formal inference across samples.",
    "fr": "Séparer les tests de marqueurs de clusters de l’inférence formelle entre échantillons.",
    "es": "Separar pruebas de marcadores de clusters de la inferencia formal entre muestras.",
    "eu": "Bereizi cluster-markerren probak eta laginen arteko inferentzia formala."
  },
  "分析数据层": {
    "en": "Analysis data layer",
    "fr": "Couche de données analysée",
    "es": "Capa de datos analizada",
    "eu": "Analisirako datu-geruza"
  },
  "每步骤明确counts/data/模型层": {
    "en": "State counts/data/model layer explicitly at each step",
    "fr": "Préciser la couche counts/data/modèle à chaque étape",
    "es": "Especificar la capa counts/data/modelo en cada paso",
    "eu": "Zehaztu counts/data/eredu geruza urrats bakoitzean"
  },
  "基因集": {
    "en": "Gene sets",
    "fr": "Ensembles de gènes",
    "es": "Conjuntos de genes",
    "eu": "Gene multzoak"
  },
  "酵母注释构建；不套人鼠默认": {
    "en": "Build from yeast annotation; do not use human/mouse defaults",
    "fr": "Construire avec l’annotation de levure, sans défauts humain/souris",
    "es": "Construir con anotación de levadura, sin valores humanos/de ratón",
    "eu": "Eraiki legamiaren anotaziotik; ez erabili giza/sagu lehenetsiak"
  },
  "聚类分辨率": {
    "en": "Clustering resolution",
    "fr": "Résolution du clustering",
    "es": "Resolución del clustering",
    "eu": "Clustering-bereizmena"
  },
  "稳定性与生物证据选择": {
    "en": "Choose using stability and biological evidence",
    "fr": "Choisir selon stabilité et preuves biologiques",
    "es": "Elegir según estabilidad y evidencia biológica",
    "eu": "Hautatu egonkortasunaren eta ebidentzia biologikoaren arabera"
  },
  "AnnData计数与元数据": {
    "en": "AnnData counts and metadata",
    "fr": "Comptages et métadonnées AnnData",
    "es": "Conteos y metadatos AnnData",
    "eu": "AnnData zenbaketak eta metadatuak"
  },
  "QC/标准化": {
    "en": "QC / normalization",
    "fr": "QC / normalisation",
    "es": "QC / normalización",
    "eu": "QC / normalizazioa"
  },
  "HVG/PCA/邻域": {
    "en": "HVG / PCA / neighborhoods",
    "fr": "HVG / ACP / voisinages",
    "es": "HVG / PCA / vecindarios",
    "eu": "HVG / PCA / auzotasunak"
  },
  "聚类/marker/状态": {
    "en": "Clusters / markers / states",
    "fr": "Clusters / marqueurs / états",
    "es": "Clusters / marcadores / estados",
    "eu": "Clusterrak / markerrak / egoerak"
  },
  "接口封装不等于独立统计证据。": {
    "en": "An interface wrapper is not independent statistical evidence.",
    "fr": "Une interface d’encapsulation n’est pas une preuve statistique indépendante.",
    "es": "Una interfaz envolvente no es evidencia estadística independiente.",
    "eu": "Interfaze-bilgarri bat ez da ebidentzia estatistiko independentea."
  },
  "矩阵层": {
    "en": "Matrix layer",
    "fr": "Couche matricielle",
    "es": "Capa matricial",
    "eu": "Matrize-geruza"
  },
  "QC从原始counts；HVG按flavor要求": {
    "en": "Use raw counts for QC; meet the chosen HVG flavor’s requirements",
    "fr": "Utiliser les comptages bruts pour le QC ; respecter les exigences du flavor HVG choisi",
    "es": "Usar conteos raw para QC; cumplir los requisitos del flavor HVG elegido",
    "eu": "Erabili raw zenbaketak QCrako; bete hautatutako HVG flavor-aren baldintzak"
  },
  "酵母基因集合": {
    "en": "Yeast gene sets",
    "fr": "Ensembles de gènes de levure",
    "es": "Conjuntos de genes de levadura",
    "eu": "Legamiaren gene multzoak"
  },
  "按参考注释设置": {
    "en": "Define from reference annotation",
    "fr": "Définir selon l’annotation de référence",
    "es": "Definir según la anotación de referencia",
    "eu": "Definitu erreferentzia-anotazioaren arabera"
  },
  "技术批次": {
    "en": "Technical batch",
    "fr": "Lot technique",
    "es": "Lote técnico",
    "eu": "Batch teknikoa"
  },
  "不能默认以菌株身份代替": {
    "en": "Do not automatically substitute strain identity",
    "fr": "Ne pas remplacer automatiquement par l’identité de souche",
    "es": "No sustituir automáticamente por la identidad de cepa",
    "eu": "Ez ordezkatu automatikoki andui-identitatearekin"
  },
  "SingleCellExperiment计数": {
    "en": "SingleCellExperiment counts",
    "fr": "Comptages SingleCellExperiment",
    "es": "Conteos SingleCellExperiment",
    "eu": "SingleCellExperiment zenbaketak"
  },
  "基因集合": {
    "en": "Gene collections",
    "fr": "Collections de gènes",
    "es": "Colecciones de genes",
    "eu": "Gene-bildumak"
  },
  "per-cell/per-feature指标": {
    "en": "Per-cell / per-feature metrics",
    "fr": "Indicateurs par cellule / feature",
    "es": "Métricas por célula / feature",
    "eu": "Zelula / feature bakoitzeko adierazleak"
  },
  "异常标记": {
    "en": "Outlier flags",
    "fr": "Indicateurs de valeurs aberrantes",
    "es": "Marcas de valores atípicos",
    "eu": "Balio atipikoen markak"
  },
  "稳健异常不是技术错误的确定证明。": {
    "en": "A robust outlier flag does not definitively establish technical error.",
    "fr": "Un indicateur robuste d’anomalie ne prouve pas définitivement une erreur technique.",
    "es": "Una marca robusta de valor atípico no demuestra definitivamente un error técnico.",
    "eu": "Balio atipikoaren marka sendoak ez du errore teknikoa behin betiko frogatzen."
  },
  "指定RNA类别": {
    "en": "Specified RNA categories",
    "fr": "Catégories d’ARN spécifiées",
    "es": "Categorías de ARN especificadas",
    "eu": "Zehaztutako RNA kategoriak"
  },
  "mt、RP、rRNA分别建集": {
    "en": "Build separate mt, RP and rRNA sets",
    "fr": "Construire des ensembles mt, RP et ARNr séparés",
    "es": "Construir conjuntos mt, RP y ARNr separados",
    "eu": "Eraiki mt, RP eta rRNA multzo bereiziak"
  },
  "分层群体": {
    "en": "Stratified populations",
    "fr": "Populations stratifiées",
    "es": "Poblaciones estratificadas",
    "eu": "Populazio estratifikatuak"
  },
  "按技术文库及可解释生物分层": {
    "en": "Stratify by technical library and interpretable biological groups",
    "fr": "Stratifier par bibliothèque technique et groupes biologiques interprétables",
    "es": "Estratificar por biblioteca técnica y grupos biológicos interpretables",
    "eu": "Estratifikatu liburutegi teknikoaren eta talde biologiko interpretagarrien arabera"
  },
  "SCE计数和QC": {
    "en": "SCE counts and QC",
    "fr": "Comptages SCE et QC",
    "es": "Conteos SCE y QC",
    "eu": "SCE zenbaketak eta QC"
  },
  "联合分布图": {
    "en": "Joint-distribution plots",
    "fr": "Graphiques de distributions conjointes",
    "es": "Gráficos de distribuciones conjuntas",
    "eu": "Baterako banaketen grafikoak"
  },
  "降维QC图": {
    "en": "Dimension-reduction QC plots",
    "fr": "Graphiques QC de réduction dimensionnelle",
    "es": "Gráficos QC de reducción dimensional",
    "eu": "Dimentsio-murrizketako QC grafikoak"
  },
  "当前基础QC计算多由scuttle提供；不重复算作独立方法。": {
    "en": "Most basic QC calculations now come from scuttle; do not count them again as independent methods.",
    "fr": "Les calculs QC de base proviennent surtout de scuttle ; ne pas les recompter comme méthodes indépendantes.",
    "es": "Los cálculos QC básicos proceden principalmente de scuttle; no volver a contarlos como métodos independientes.",
    "eu": "Oinarrizko QC kalkulu gehienak scuttle-tik datoz; ez zenbatu berriro metodo independente gisa."
  },
  "每细胞QC指标": {
    "en": "Per-cell QC metrics",
    "fr": "Indicateurs QC par cellule",
    "es": "Métricas QC por célula",
    "eu": "Zelulako QC adierazleak"
  },
  "混合模型": {
    "en": "Mixture models",
    "fr": "Modèles de mélange",
    "es": "Modelos de mezcla",
    "eu": "Nahasketa-ereduak"
  },
  "样本QC诊断": {
    "en": "Sample-QC diagnostics",
    "fr": "Diagnostic QC des échantillons",
    "es": "Diagnóstico QC de muestras",
    "eu": "Laginen QC diagnostikoa"
  },
  "模型群体解释和拟合需要审核；不自动区分技术/生物。": {
    "en": "Review population interpretation and model fit; the model does not automatically separate technical and biological effects.",
    "fr": "Examiner interprétation des populations et ajustement ; le modèle ne sépare pas automatiquement effets techniques et biologiques.",
    "es": "Revisar interpretación poblacional y ajuste; el modelo no separa automáticamente efectos técnicos y biológicos.",
    "eu": "Berrikusi populazioen interpretazioa eta doikuntza; ereduak ez ditu automatikoki efektu teknikoak eta biologikoak bereizten."
  },
  "输入质量变量": {
    "en": "Input quality variables",
    "fr": "Variables de qualité en entrée",
    "es": "Variables de calidad de entrada",
    "eu": "Sarrerako kalitate-aldagaiak"
  },
  "选择有明确含义并适当变换的指标": {
    "en": "Choose interpretable metrics with appropriate transformations",
    "fr": "Choisir des indicateurs interprétables et correctement transformés",
    "es": "Elegir métricas interpretables con transformaciones apropiadas",
    "eu": "Hautatu adierazle interpretagarriak, eraldaketa egokiekin"
  },
  "群体模型": {
    "en": "Population model",
    "fr": "Modèle de population",
    "es": "Modelo poblacional",
    "eu": "Populazio-eredua"
  },
  "根据分布诊断选择": {
    "en": "Choose based on distribution diagnostics",
    "fr": "Choisir selon le diagnostic des distributions",
    "es": "Elegir según el diagnóstico de distribuciones",
    "eu": "Hautatu banaketen diagnostikoaren arabera"
  },
  "检测基因数": {
    "en": "Detected-gene count",
    "fr": "Nombre de gènes détectés",
    "es": "Número de genes detectados",
    "eu": "Detektatutako gene-kopurua"
  },
  "线粒体比例": {
    "en": "Mitochondrial fraction",
    "fr": "Proportion mitochondriale",
    "es": "Fracción mitocondrial",
    "eu": "Frakzio mitokondriala"
  },
  "拟合曲线": {
    "en": "Fitted curves",
    "fr": "Courbes ajustées",
    "es": "Curvas ajustadas",
    "eu": "Doitutako kurbak"
  },
  "酵母呼吸状态与捕获组成可能违背模型分离假设。": {
    "en": "Yeast respiratory state and capture composition may violate the model’s separation assumptions.",
    "fr": "L’état respiratoire de levure et la composition capturée peuvent violer les hypothèses de séparation du modèle.",
    "es": "El estado respiratorio de levadura y la composición capturada pueden incumplir supuestos de separación del modelo.",
    "eu": "Legamiaren arnasketa-egoerak eta harrapatutako konposizioak ereduaren bereizketa-suposizioak urratu ditzakete."
  },
  "带feature信息BAM或区域注释": {
    "en": "BAM with feature information or region annotation",
    "fr": "BAM avec informations de features ou annotation régionale",
    "es": "BAM con información de features o anotación regional",
    "eu": "Feature-informaziodun BAM edo eskualde-anotazioa"
  },
  "empty/damaged候选": {
    "en": "Empty / damaged candidates",
    "fr": "Candidats vides / endommagés",
    "es": "Candidatos vacíos / dañados",
    "eu": "Huts / kaltetutako hautagaiak"
  },
  "酵母内含子少；先验证核RNA代理是否有信息量。": {
    "en": "Yeast has few introns; first verify whether the nuclear-RNA proxy is informative.",
    "fr": "La levure possède peu d’introns ; vérifier d’abord si le proxy d’ARN nucléaire est informatif.",
    "es": "La levadura tiene pocos intrones; verificar primero si el indicador de ARN nuclear aporta información.",
    "eu": "Legamiak introi gutxi ditu; egiaztatu lehenik RNA nuklearraren proxyak informazioa ematen duen."
  },
  "计数和基础QC": {
    "en": "Counts and basic QC",
    "fr": "Comptages et QC de base",
    "es": "Conteos y QC básico",
    "eu": "Zenbaketak eta oinarrizko QC"
  },
  "保留/失败统计": {
    "en": "Retention / failure statistics",
    "fr": "Statistiques de rétention / exclusion",
    "es": "Estadísticas de retención / exclusión",
    "eu": "Atxikipen / bazterketa estatistikak"
  },
  "聚类依赖与QC选择可能改变目标噪音尾部。": {
    "en": "Cluster dependence and QC selection can change the tails of the target noise distribution.",
    "fr": "La dépendance aux clusters et la sélection QC peuvent modifier les queues de la distribution de bruit ciblée.",
    "es": "La dependencia de clusters y la selección QC pueden modificar las colas de la distribución de ruido objetivo.",
    "eu": "Clusterren mendekotasunak eta QC hautaketak helburuko zarata-banaketaren muturrak alda ditzakete."
  },
  "初筛规则": {
    "en": "Initial screening rules",
    "fr": "Règles de filtrage initial",
    "es": "Reglas de filtrado inicial",
    "eu": "Hasierako baheketa-arauak"
  },
  "替换哺乳动物默认设置；无通用酵母阈值": {
    "en": "Replace mammalian defaults; no universal yeast threshold exists",
    "fr": "Remplacer les défauts mammifères ; aucun seuil universel de levure",
    "es": "Sustituir valores de mamíferos; no existe un umbral universal de levadura",
    "eu": "Ordezkatu ugaztunen lehenetsiak; ez dago legamiarako atalase unibertsalik"
  },
  "分层状态": {
    "en": "Stratified states",
    "fr": "États stratifiés",
    "es": "Estados estratificados",
    "eu": "Egoera estratifikatuak"
  },
  "检查周期连续性与菌株组成": {
    "en": "Check cell-cycle continuity and strain composition",
    "fr": "Vérifier continuité du cycle et composition en souches",
    "es": "Verificar continuidad del ciclo y composición de cepas",
    "eu": "Egiaztatu zikloaren jarraitutasuna eta andui-konposizioa"
  },
  "校正低维表示": {
    "en": "Corrected low-dimensional representation",
    "fr": "Représentation de faible dimension corrigée",
    "es": "Representación de baja dimensión corregida",
    "eu": "Zuzendutako dimentsio baxuko irudikapena"
  },
  "不输出可当原始UMI使用的无噪音表达。": {
    "en": "Does not produce noise-free expression that can be treated as raw UMIs.",
    "fr": "Ne produit pas d’expression sans bruit assimilable à des UMI bruts.",
    "es": "No produce expresión sin ruido que pueda tratarse como UMI raw.",
    "eu": "Ez du raw UMI gisa har daitekeen zaratarik gabeko adierazpenik sortzen."
  },
  "校正变量": {
    "en": "Correction variables",
    "fr": "Variables de correction",
    "es": "Variables de corrección",
    "eu": "Zuzenketa-aldagaiak"
  },
  "明确技术来源；保护菌株/条件效应": {
    "en": "Identify technical origins and protect strain/condition effects",
    "fr": "Identifier l’origine technique et préserver les effets souche/condition",
    "es": "Identificar el origen técnico y preservar efectos de cepa/condición",
    "eu": "Identifikatu jatorri teknikoa eta babestu andui/baldintza efektuak"
  },
  "分批次标准化表达": {
    "en": "Normalized expression by batch",
    "fr": "Expression normalisée par lot",
    "es": "Expresión normalizada por lote",
    "eu": "Batchka normalizatutako adierazpena"
  },
  "需有可比共享状态；批次缺失状态不能强行对应。": {
    "en": "Requires comparable shared states; do not force matches to states missing from a batch.",
    "fr": "Exige des états partagés comparables ; ne pas imposer de correspondance aux états absents d’un lot.",
    "es": "Requiere estados compartidos comparables; no forzar correspondencias con estados ausentes de un lote.",
    "eu": "Egoera partekatu konparagarriak behar ditu; ez behartu batch batean falta diren egoeren parekatzea."
  },
  "整合特征": {
    "en": "Integration features",
    "fr": "Features d’intégration",
    "es": "Features de integración",
    "eu": "Integrazio-featureak"
  },
  "评估技术与状态混合": {
    "en": "Assess mixing of technical and state effects",
    "fr": "Évaluer le mélange des effets techniques et d’état",
    "es": "Evaluar mezcla de efectos técnicos y de estado",
    "eu": "Ebaluatu efektu teknikoen eta egoera-efektuen nahasketa"
  },
  "近邻范围": {
    "en": "Neighborhood range",
    "fr": "Étendue du voisinage",
    "es": "Rango del vecindario",
    "eu": "Auzotasun-tartea"
  },
  "按数据结构进行稳定性检查": {
    "en": "Check stability against the data structure",
    "fr": "Vérifier la stabilité selon la structure des données",
    "es": "Comprobar estabilidad según la estructura de datos",
    "eu": "Egiaztatu egonkortasuna datu-egituraren arabera"
  },
  "原始计数": {
    "en": "Raw counts",
    "fr": "Comptages bruts",
    "es": "Conteos raw",
    "eu": "Raw zenbaketak"
  },
  "批次/协变量": {
    "en": "Batches / covariates",
    "fr": "Lots / covariables",
    "es": "Lotes / covariables",
    "eu": "Batchak / kobariableak"
  },
  "模型表达输出": {
    "en": "Model-derived expression output",
    "fr": "Expression produite par le modèle",
    "es": "Expresión producida por el modelo",
    "eu": "Ereduak sortutako adierazpena"
  },
  "模型降噪表达不能直接作为无测量误差分子样本。": {
    "en": "Model-denoised expression is not a molecule sample free of measurement error.",
    "fr": "L’expression débruitée par modèle n’est pas un échantillon moléculaire sans erreur de mesure.",
    "es": "La expresión sin ruido estimada por un modelo no es una muestra molecular libre de error de medida.",
    "eu": "Ereduak zarata kendutako adierazpena ez da neurketa-errorerik gabeko molekula-lagina."
  },
  "计数输入": {
    "en": "Count input",
    "fr": "Comptages en entrée",
    "es": "Conteos de entrada",
    "eu": "Sarrerako zenbaketak"
  },
  "原始非负计数": {
    "en": "Raw nonnegative counts",
    "fr": "Comptages bruts non négatifs",
    "es": "Conteos raw no negativos",
    "eu": "Raw zenbaketa ez-negatiboak"
  },
  "不自动把strain作为batch": {
    "en": "Do not automatically treat strain as batch",
    "fr": "Ne pas traiter automatiquement la souche comme un lot",
    "es": "No tratar automáticamente la cepa como lote",
    "eu": "Ez hartu anduia batch gisa automatikoki"
  },
  "附加协变量": {
    "en": "Additional covariates",
    "fr": "Covariables supplémentaires",
    "es": "Covariables adicionales",
    "eu": "Kobariable osagarriak"
  },
  "按科学目标与混杂结构选择": {
    "en": "Choose from the scientific objective and confounding structure",
    "fr": "Choisir selon l’objectif scientifique et les facteurs de confusion",
    "es": "Elegir según objetivo científico y estructura de confusión",
    "eu": "Hautatu helburu zientifikoaren eta nahaste-egituraren arabera"
  },
  "邻接图": {
    "en": "Adjacency graph",
    "fr": "Graphe d’adjacence",
    "es": "Grafo de adyacencia",
    "eu": "Auzotasun-grafoa"
  },
  "改变邻域图，不是校正原始计数；强行平衡可掩盖独有状态。": {
    "en": "Changes the neighborhood graph, not raw counts; forced balancing can hide unique states.",
    "fr": "Modifie le graphe de voisinage, pas les comptages bruts ; un équilibrage forcé peut masquer des états spécifiques.",
    "es": "Modifica el grafo de vecinos, no conteos raw; el equilibrio forzado puede ocultar estados únicos.",
    "eu": "Auzotasun-grafoa aldatzen du, ez raw zenbaketak; oreka behartuak egoera bereziak ezkuta ditzake."
  },
  "仅适用需要对齐的技术因素": {
    "en": "Use only for technical factors that need alignment",
    "fr": "Utiliser seulement pour les facteurs techniques à aligner",
    "es": "Usar solo para factores técnicos que requieren alineación",
    "eu": "Erabili lerrokatu beharreko faktore teknikoetarako soilik"
  },
  "多个表达矩阵及基因ID": {
    "en": "Multiple expression matrices and gene IDs",
    "fr": "Plusieurs matrices d’expression et identifiants de gènes",
    "es": "Varias matrices de expresión e identificadores génicos",
    "eu": "Hainbat adierazpen-matrize eta gene-ID"
  },
  "整合表示": {
    "en": "Integrated representations",
    "fr": "Représentations intégrées",
    "es": "Representaciones integradas",
    "eu": "Irudikapen integratuak"
  },
  "表达矩阵": {
    "en": "Expression matrix",
    "fr": "Matrice d’expression",
    "es": "Matriz de expresión",
    "eu": "Adierazpen-matrizea"
  },
  "细胞状态": {
    "en": "Cell states",
    "fr": "États cellulaires",
    "es": "Estados celulares",
    "eu": "Zelula-egoerak"
  },
  "独立样本与设计矩阵": {
    "en": "Independent samples and design matrix",
    "fr": "Échantillons indépendants et matrice de plan",
    "es": "Muestras independientes y matriz de diseño",
    "eu": "Lagin independenteak eta diseinu-matrizea"
  },
  "分布差异检验": {
    "en": "Differential distribution tests",
    "fr": "Tests de différence de distribution",
    "es": "Pruebas de diferencias de distribución",
    "eu": "Banaketa-diferentzien probak"
  },
  "基因×状态结果": {
    "en": "Gene × state results",
    "fr": "Résultats gène × état",
    "es": "Resultados gen × estado",
    "eu": "Gene × egoera emaitzak"
  },
  "效应方向辅助统计": {
    "en": "Auxiliary statistics for effect direction",
    "fr": "Statistiques complémentaires sur le sens de l’effet",
    "es": "Estadísticas auxiliares de la dirección del efecto",
    "eu": "Efektuaren norabidearen estatistika osagarriak"
  },
  "检测的是整体分布变化，不能把显著结果自动命名为纯方差变化或内在噪音。": {
    "en": "Tests overall distribution changes; significance does not automatically imply a pure variance change or intrinsic noise.",
    "fr": "Teste les changements globaux de distribution ; un résultat significatif ne démontre pas à lui seul un changement de variance pure ou du bruit intrinsèque.",
    "es": "Evalúa cambios globales de distribución; la significación no implica automáticamente un cambio puro de varianza ni ruido intrínseco.",
    "eu": "Banaketa osoaren aldaketak probatzen ditu; esanguratsu izateak ez du berez bariantza-aldaketa hutsa edo zarata intrintsekoa frogatzen."
  },
  "不同遗传背景不得直接混池后把菌株均值差称为状态条件化的表达噪音。": {
    "en": "Do not pool distinct genetic backgrounds and label strain mean differences as state-conditioned expression noise.",
    "fr": "Ne pas regrouper directement des fonds génétiques différents puis qualifier leurs écarts de moyenne de bruit d’expression conditionné par l’état.",
    "es": "No mezclar fondos genéticos distintos y denominar sus diferencias de medias ruido de expresión condicionado al estado.",
    "eu": "Ez nahasi jatorri genetiko desberdinak, anduien batezbestekoen aldeei egoeraren araberako adierazpen-zarata deitzeko."
  },
  "入口为经来源核对的方法入口或参数模板；固定版本后按真实设计填写，未在本项目数据上执行。": {
    "en": "Source-checked entrypoints or parameter templates; pin the version and fill in the actual design. Not run on this project’s data.",
    "fr": "Points d’entrée ou modèles de paramètres vérifiés dans les sources ; fixer la version et renseigner le plan réel. Non exécutés sur les données du projet.",
    "es": "Entradas o plantillas de parámetros verificadas; fijar la versión y completar el diseño real. No se han ejecutado con los datos del proyecto.",
    "eu": "Iturriekin egiaztatutako sarrera-puntuak edo parametro-txantiloiak; finkatu bertsioa eta bete benetako diseinua. Ez dira proiektuko datuekin exekutatu."
  },
  "生物学样本标签": {
    "en": "Biological sample labels",
    "fr": "Étiquettes des échantillons biologiques",
    "es": "Etiquetas de muestras biológicas",
    "eu": "Lagin biologikoen etiketak"
  },
  "使用独立培养/设计单位，不把单个细胞当独立重复": {
    "en": "Use independent cultures or design units; individual cells are not independent replicates.",
    "fr": "Utiliser des cultures indépendantes ou les unités du plan ; les cellules ne sont pas des répétitions indépendantes.",
    "es": "Usar cultivos independientes o unidades del diseño; las células individuales no son réplicas independientes.",
    "eu": "Erabili kultura independenteak edo diseinu-unitateak; banakako zelulak ez dira erreplika independenteak."
  },
  "协变量与目标效应": {
    "en": "Covariates and target effect",
    "fr": "Covariables et effet cible",
    "es": "Covariables y efecto de interés",
    "eu": "Kobariatuak eta xede-efektua"
  },
  "确认设计可辨识，保留批次和配对结构": {
    "en": "Check identifiability and preserve batch and pairing structure.",
    "fr": "Vérifier l’identifiabilité et conserver la structure des lots et des appariements.",
    "es": "Comprobar la identificabilidad y conservar la estructura de lotes y emparejamientos.",
    "eu": "Egiaztatu identifikagarritasuna eta mantendu loteen eta parekatzeen egitura."
  },
  "表达层": {
    "en": "Expression layer",
    "fr": "Couche d’expression",
    "es": "Capa de expresión",
    "eu": "Adierazpen-geruza"
  },
  "依文档准备并审计归一化对分布的影响": {
    "en": "Prepare as documented and audit normalization effects on the distribution.",
    "fr": "Préparer selon la documentation et évaluer l’effet de la normalisation sur la distribution.",
    "es": "Preparar según la documentación y revisar el efecto de la normalización sobre la distribución.",
    "eu": "Prestatu dokumentazioaren arabera eta aztertu normalizazioak banaketan duen eragina."
  },
  "两个条件的基因×细胞计数": {
    "en": "Gene × cell counts in two conditions",
    "fr": "Comptages gène × cellule dans deux conditions",
    "es": "Recuentos gen × célula en dos condiciones",
    "eu": "Gene × zelula zenbaketak bi baldintzatan"
  },
  "匹配细胞状态": {
    "en": "Matched cell states",
    "fr": "États cellulaires comparables",
    "es": "Estados celulares comparables",
    "eu": "Zelula-egoera parekatuak"
  },
  "差异变异基因排序": {
    "en": "Ranking of differentially variable genes",
    "fr": "Classement des gènes à variabilité différentielle",
    "es": "Clasificación de genes con variabilidad diferencial",
    "eu": "Aldakortasun diferentziala duten geneen sailkapena"
  },
  "拟合与候选诊断": {
    "en": "Fit and candidate diagnostics",
    "fr": "Diagnostic de l’ajustement et des candidats",
    "es": "Diagnóstico del ajuste y los candidatos",
    "eu": "Doikuntzaren eta hautagaien diagnostikoak"
  },
  "先按菌株、状态、条件分层；文档中的细胞级对比不能自动解决培养重复、亲缘和参考偏差。": {
    "en": "Stratify by strain, state and condition first; documented cell-level comparisons do not automatically address culture replicates, relatedness or reference bias.",
    "fr": "Stratifier d’abord par souche, état et condition ; les comparaisons cellulaires documentées ne corrigent pas automatiquement les répétitions de culture, la parenté ou le biais de référence.",
    "es": "Estratificar primero por cepa, estado y condición; las comparaciones celulares documentadas no resuelven automáticamente las réplicas de cultivo, el parentesco ni el sesgo de referencia.",
    "eu": "Lehenik estratifikatu anduiaren, egoeraren eta baldintzaren arabera; dokumentatutako zelula-mailako konparazioek ez dituzte berez kultura-erreplikak, ahaidetasuna edo erreferentzia-alborapena ebazten."
  },
  "与memento/BASiCS及抽样基线作敏感性比较，不据单一排序定义真噪音。": {
    "en": "Compare sensitivity with memento/BASiCS and sampling baselines; a single ranking does not establish true noise.",
    "fr": "Comparer la sensibilité avec memento/BASiCS et des références d’échantillonnage ; un classement unique ne démontre pas un bruit réel.",
    "es": "Comparar la sensibilidad con memento/BASiCS y referencias de muestreo; una sola clasificación no demuestra ruido real.",
    "eu": "Konparatu sentikortasuna memento/BASiCS eta laginketa-erreferentziekin; sailkapen bakarrak ez du benetako zarata frogatzen."
  },
  "测试与对照计数": {
    "en": "Test and control counts",
    "fr": "Comptages du test et du témoin",
    "es": "Recuentos de prueba y control",
    "eu": "Proba- eta kontrol-zenbaketak"
  },
  "固定基因顺序和比较方向": {
    "en": "Fix gene order and comparison direction.",
    "fr": "Fixer l’ordre des gènes et le sens de la comparaison.",
    "es": "Fijar el orden de los genes y la dirección de comparación.",
    "eu": "Finkatu geneen ordena eta konparazioaren norabidea."
  },
  "可选HVG模式": {
    "en": "Optional HVG mode",
    "fr": "Mode HVG facultatif",
    "es": "Modo HVG opcional",
    "eu": "Aukerako HVG modua"
  },
  "仅用于特征筛选，不代替正式样本层噪音检验": {
    "en": "For feature selection only; not a replacement for formal sample-level noise testing.",
    "fr": "Pour la sélection des variables seulement ; ne remplace pas un test formel du bruit au niveau des échantillons.",
    "es": "Solo para seleccionar características; no sustituye la prueba formal de ruido a nivel de muestra.",
    "eu": "Ezaugarriak hautatzeko soilik; ez du lagin-mailako zarata-proba formala ordezkatzen."
  },
  "计数或方法要求的表达层": {
    "en": "Counts or the expression layer required by the method",
    "fr": "Comptages ou couche d’expression requise par la méthode",
    "es": "Recuentos o capa de expresión requerida por el método",
    "eu": "Zenbaketak edo metodoak eskatutako adierazpen-geruza"
  },
  "比较分层标签": {
    "en": "Comparison strata labels",
    "fr": "Étiquettes des strates de comparaison",
    "es": "Etiquetas de estratos de comparación",
    "eu": "Konparazio-estratuen etiketak"
  },
  "多指标变异值": {
    "en": "Variation values from multiple metrics",
    "fr": "Valeurs de variabilité selon plusieurs métriques",
    "es": "Valores de variabilidad según varias métricas",
    "eu": "Hainbat metrikaren aldakortasun-balioak"
  },
  "排名一致性": {
    "en": "Ranking agreement",
    "fr": "Concordance des classements",
    "es": "Concordancia de clasificaciones",
    "eu": "Sailkapenen adostasuna"
  },
  "此包不是同名的人类变异注释工具SC-VAR。": {
    "en": "This package is distinct from the similarly named human variant-annotation tool SC-VAR.",
    "fr": "Ce paquet est distinct de l’outil d’annotation des variants humains SC-VAR portant un nom similaire.",
    "es": "Este paquete es distinto de la herramienta de anotación de variantes humanas SC-VAR de nombre similar.",
    "eu": "Pakete hau ez da antzeko izena duen giza aldaerak anotatzeko SC-VAR tresna."
  },
  "指标量纲与均值/深度依赖不同，不能把所有指标混成无定义的综合噪音分数。": {
    "en": "Metrics differ in units and dependence on mean/depth; do not combine them into an undefined overall noise score.",
    "fr": "Les unités et la dépendance à la moyenne ou à la profondeur diffèrent ; ne pas les fusionner en un score global de bruit non défini.",
    "es": "Las unidades y la dependencia de la media o profundidad difieren; no combinarlas en una puntuación global de ruido sin definir.",
    "eu": "Metrikek unitate eta batezbesteko/sakonerarekiko mendekotasun desberdinak dituzte; ez batu definitu gabeko zarata-puntuazio orokor batean."
  },
  "变异指标": {
    "en": "Variation metric",
    "fr": "Métrique de variabilité",
    "es": "Métrica de variabilidad",
    "eu": "Aldakortasun-metrika"
  },
  "例如CV、scran；每种指标输入层和估计对象单独记录": {
    "en": "For example CV or scran; record the input layer and estimand separately for each metric.",
    "fr": "Par exemple CV ou scran ; documenter séparément la couche d’entrée et la quantité estimée de chaque métrique.",
    "es": "Por ejemplo CV o scran; registrar por separado la capa de entrada y el objeto estimado de cada métrica.",
    "eu": "Adibidez CV edo scran; erregistratu bereizita metrika bakoitzaren sarrera-geruza eta estimatu nahi den magnitudea."
  },
  "是否内部归一化": {
    "en": "Whether to normalize internally",
    "fr": "Normalisation interne éventuelle",
    "es": "Si se normaliza internamente",
    "eu": "Barne-normalizazioa egin ala ez"
  },
  "防止对已归一化数据再次归一化": {
    "en": "Avoid normalizing already normalized data again.",
    "fr": "Éviter de normaliser à nouveau des données déjà normalisées.",
    "es": "Evitar normalizar de nuevo datos ya normalizados.",
    "eu": "Saihestu dagoeneko normalizatutako datuak berriro normalizatzea."
  },
  "两组表达特征": {
    "en": "Expression features in two groups",
    "fr": "Variables d’expression de deux groupes",
    "es": "Características de expresión de dos grupos",
    "eu": "Bi taldetako adierazpen-ezaugarriak"
  },
  "样本与状态标签": {
    "en": "Sample and state labels",
    "fr": "Étiquettes d’échantillon et d’état",
    "es": "Etiquetas de muestra y estado",
    "eu": "Lagin- eta egoera-etiketak"
  },
  "MMD/kFDA差异统计": {
    "en": "MMD/kFDA differential statistics",
    "fr": "Statistiques différentielles MMD/kFDA",
    "es": "Estadísticas diferenciales MMD/kFDA",
    "eu": "MMD/kFDA estatistika diferentzialak"
  },
  "分布区分与候选特征": {
    "en": "Distribution discrimination and candidate features",
    "fr": "Distinction des distributions et variables candidates",
    "es": "Discriminación de distribuciones y características candidatas",
    "eu": "Banaketen bereizketa eta ezaugarri hautagaiak"
  },
  "分布区分能力不说明改变来自均值、方差、尾部还是状态混合，需分解解释。": {
    "en": "Distribution discrimination does not identify whether changes arise from means, variance, tails or state mixtures; decompose the explanation.",
    "fr": "La distinction des distributions ne précise pas si le changement vient des moyennes, variances, queues ou mélanges d’états ; décomposer l’interprétation.",
    "es": "Distinguir distribuciones no identifica si cambian las medias, la varianza, las colas o las mezclas de estados; descomponer la interpretación.",
    "eu": "Banaketak bereizteak ez du argitzen aldaketak batezbestekoetatik, bariantzatik, muturretatik edo egoera-nahasketetatik datozen; bereizi azalpenak."
  },
  "原始细胞级检验不自动适用于有亲缘的1011样本设计。": {
    "en": "The original cell-level test does not automatically apply to related samples in the 1011 design.",
    "fr": "Le test cellulaire d’origine ne s’applique pas automatiquement aux échantillons apparentés du plan 1011.",
    "es": "La prueba celular original no se aplica automáticamente a las muestras emparentadas del diseño 1011.",
    "eu": "Jatorrizko zelula-mailako proba ez da automatikoki aplikagarria 1011 diseinuko lagin ahaideei."
  },
  "核函数及尺度": {
    "en": "Kernel function and scale",
    "fr": "Fonction noyau et échelle",
    "es": "Función kernel y escala",
    "eu": "Kernel funtzioa eta eskala"
  },
  "在留出数据与多个尺度上审计结果": {
    "en": "Audit results on held-out data and across multiple scales.",
    "fr": "Vérifier les résultats sur des données réservées et à plusieurs échelles.",
    "es": "Revisar los resultados en datos reservados y varias escalas.",
    "eu": "Aztertu emaitzak gordetako datuetan eta hainbat eskalatan."
  },
  "截断与正则化": {
    "en": "Truncation and regularization",
    "fr": "Troncature et régularisation",
    "es": "Truncamiento y regularización",
    "eu": "Trunkatzea eta erregularizazioa"
  },
  "依据版本教程和校准结果选择": {
    "en": "Choose using the version-specific tutorial and calibration results.",
    "fr": "Choisir selon le tutoriel de la version et les résultats de calibration.",
    "es": "Elegir según el tutorial de la versión y los resultados de calibración.",
    "eu": "Hautatu bertsioaren tutorialaren eta kalibrazio-emaitzen arabera."
  },
  "交换单位": {
    "en": "Exchangeability unit",
    "fr": "Unité d’échangeabilité",
    "es": "Unidad de intercambiabilidad",
    "eu": "Trukagarritasun-unitatea"
  },
  "多样本设计在样本层进行合法置换，不能直接交换相关细胞": {
    "en": "For multiple samples, use valid sample-level permutations; do not directly permute correlated cells.",
    "fr": "Avec plusieurs échantillons, permuter au niveau des échantillons selon le plan ; ne pas permuter directement des cellules corrélées.",
    "es": "Con varias muestras, realizar permutaciones válidas a nivel de muestra; no permutar directamente células correlacionadas.",
    "eu": "Lagin anitzetan, egin lagin-mailako permutazio baliodunak; ez permutatu zuzenean korrelazionatutako zelulak."
  },
  "计数": {
    "en": "Counts",
    "fr": "Comptages",
    "es": "Recuentos",
    "eu": "Zenbaketak"
  },
  "独立样本与状态": {
    "en": "Independent samples and states",
    "fr": "Échantillons indépendants et états",
    "es": "Muestras independientes y estados",
    "eu": "Lagin independenteak eta egoerak"
  },
  "配对/批次协变量": {
    "en": "Pairing / batch covariates",
    "fr": "Covariables d’appariement / de lot",
    "es": "Covariables de emparejamiento / lote",
    "eu": "Parekatze- / lote-kobariatuak"
  },
  "样本层差异表达": {
    "en": "Sample-level differential expression",
    "fr": "Expression différentielle au niveau des échantillons",
    "es": "Expresión diferencial a nivel de muestra",
    "eu": "Lagin-mailako adierazpen diferentziala"
  },
  "方差组分": {
    "en": "Variance components",
    "fr": "Composantes de variance",
    "es": "Componentes de varianza",
    "eu": "Bariantza-osagaiak"
  },
  "模型精度诊断": {
    "en": "Model precision diagnostics",
    "fr": "Diagnostic de précision du modèle",
    "es": "Diagnóstico de precisión del modelo",
    "eu": "Ereduaren zehaztasun-diagnostikoak"
  },
  "伪bulk均值的样本间方差不是菌株内单细胞表达噪音。": {
    "en": "Between-sample variance of pseudobulk means is not within-strain single-cell expression noise.",
    "fr": "La variance entre échantillons des moyennes pseudobulk n’est pas le bruit d’expression unicellulaire au sein d’une souche.",
    "es": "La varianza entre muestras de medias pseudobulk no es ruido de expresión unicelular dentro de una cepa.",
    "eu": "Pseudobulk batezbestekoen lagin arteko bariantza ez da andui barruko zelula bakarren adierazpen-zarata."
  },
  "用于均值效应、样本异质性与混杂审计；保留单细胞噪音主分支。": {
    "en": "Use for mean effects, sample heterogeneity and confounding audits; retain the main single-cell noise branch.",
    "fr": "Utiliser pour les effets moyens, l’hétérogénéité des échantillons et les facteurs de confusion ; conserver l’analyse principale du bruit unicellulaire.",
    "es": "Usar para efectos medios, heterogeneidad de muestras y confusión; conservar la rama principal de ruido unicelular.",
    "eu": "Erabili batezbesteko-efektuak, laginen heterogeneotasuna eta nahaste-faktoreak aztertzeko; mantendu zelula bakarreko zarataren adar nagusia."
  },
  "固定/随机效应公式": {
    "en": "Fixed / random effects formula",
    "fr": "Formule des effets fixes / aléatoires",
    "es": "Fórmula de efectos fijos / aleatorios",
    "eu": "Efektu finko / ausazkoen formula"
  },
  "依培养、菌株、重复和技术批次关系建立": {
    "en": "Build from relationships among cultures, strains, replicates and technical batches.",
    "fr": "Construire selon les relations entre cultures, souches, répétitions et lots techniques.",
    "es": "Construir según las relaciones entre cultivos, cepas, réplicas y lotes técnicos.",
    "eu": "Eraiki kulturen, anduien, errepliken eta lote teknikoen arteko erlazioen arabera."
  },
  "状态或cluster层": {
    "en": "State or cluster layer",
    "fr": "Niveau des états ou clusters",
    "es": "Nivel de estados o clústeres",
    "eu": "Egoera- edo cluster-maila"
  },
  "确认每样本内的细胞支持": {
    "en": "Confirm cellular support within each sample.",
    "fr": "Vérifier le support cellulaire dans chaque échantillon.",
    "es": "Comprobar el respaldo celular dentro de cada muestra.",
    "eu": "Egiaztatu lagin bakoitzaren barruko zelula-euskarria."
  },
  "目标比较": {
    "en": "Target contrast",
    "fr": "Contraste cible",
    "es": "Contraste de interés",
    "eu": "Xede-kontrastea"
  },
  "与预先定义研究问题一致": {
    "en": "Align with the predefined research question.",
    "fr": "Rester cohérent avec la question de recherche prédéfinie.",
    "es": "Mantener la coherencia con la pregunta de investigación predefinida.",
    "eu": "Lerrokatu aurrez definitutako ikerketa-galderarekin."
  },
  "条件和样本设计": {
    "en": "Condition and sample design",
    "fr": "Plan des conditions et des échantillons",
    "es": "Diseño de condiciones y muestras",
    "eu": "Baldintzen eta laginen diseinua"
  },
  "条件化嵌入": {
    "en": "Condition-dependent embedding",
    "fr": "Représentation conditionnée",
    "es": "Representación condicionada",
    "eu": "Baldintzaren araberako irudikapena"
  },
  "预测表达差": {
    "en": "Predicted expression differences",
    "fr": "Différences d’expression prédites",
    "es": "Diferencias de expresión predichas",
    "eu": "Aurreikusitako adierazpen-aldeak"
  },
  "留出验证的差异邻域": {
    "en": "Differential neighborhoods validated on held-out data",
    "fr": "Voisinages différentiels validés sur données réservées",
    "es": "Vecindarios diferenciales validados con datos reservados",
    "eu": "Gordetako datuekin baliozkotutako auzotasun diferentzialak"
  },
  "预测的表达变化不是同一细胞被真实追踪的变化，也不是分子噪音计数。": {
    "en": "Predicted expression changes are not longitudinal measurements of the same cell or molecular-noise counts.",
    "fr": "Les changements prédits ne sont ni des mesures longitudinales d’une même cellule ni des comptages du bruit moléculaire.",
    "es": "Los cambios predichos no son mediciones longitudinales de la misma célula ni recuentos de ruido molecular.",
    "eu": "Aurreikusitako adierazpen-aldaketak ez dira zelula beraren jarraipen-neurketak, ezta zarata molekularraren zenbaketak ere."
  },
  "跨菌株分析需留出菌株，避免模型用遗传背景完成条件分类。": {
    "en": "Hold out strains for cross-strain analysis so genetic background cannot substitute for condition classification.",
    "fr": "Réserver des souches pour l’analyse intersouche afin que le fond génétique ne remplace pas la classification des conditions.",
    "es": "Reservar cepas para el análisis entre cepas y evitar que el fondo genético sustituya la clasificación de condiciones.",
    "eu": "Utzi anduiak kanpoan anduien arteko analisian, jatorri genetikoak baldintzen sailkapena ordezka ez dezan."
  },
  "实验设计": {
    "en": "Experimental design",
    "fr": "Plan expérimental",
    "es": "Diseño experimental",
    "eu": "Diseinu esperimentala"
  },
  "包含真实样本与条件，避免完全混杂": {
    "en": "Include actual samples and conditions; avoid complete confounding.",
    "fr": "Inclure les échantillons et conditions réels ; éviter la confusion complète.",
    "es": "Incluir muestras y condiciones reales; evitar la confusión completa.",
    "eu": "Sartu benetako laginak eta baldintzak; saihestu erabateko nahasketa."
  },
  "留出检验数据": {
    "en": "Held-out test data",
    "fr": "Données de test réservées",
    "es": "Datos de prueba reservados",
    "eu": "Probarako gordetako datuak"
  },
  "保留验证数据并按样本设计审计信息泄漏": {
    "en": "Retain validation data and audit information leakage according to the sample design.",
    "fr": "Conserver des données de validation et vérifier les fuites d’information selon le plan d’échantillonnage.",
    "es": "Conservar datos de validación y revisar fugas de información según el diseño muestral.",
    "eu": "Mantendu baliozkotzeko datuak eta aztertu informazio-ihesak lagin-diseinuaren arabera."
  },
  "潜在维数": {
    "en": "Latent dimensionality",
    "fr": "Dimension latente",
    "es": "Dimensionalidad latente",
    "eu": "Dimentsionaltasun latentea"
  },
  "依据状态保留与拟合敏感性选择": {
    "en": "Choose based on state preservation and fit sensitivity.",
    "fr": "Choisir selon la conservation des états et la sensibilité de l’ajustement.",
    "es": "Elegir según la conservación de estados y la sensibilidad del ajuste.",
    "eu": "Hautatu egoeren mantentzearen eta doikuntzaren sentikortasunaren arabera."
  },
  "样本/条件/状态标签": {
    "en": "Sample / condition / state labels",
    "fr": "Étiquettes échantillon / condition / état",
    "es": "Etiquetas de muestra / condición / estado",
    "eu": "Lagin- / baldintza- / egoera-etiketak"
  },
  "状态内差异表达": {
    "en": "Within-state differential expression",
    "fr": "Expression différentielle au sein d’un état",
    "es": "Expresión diferencial dentro de un estado",
    "eu": "Egoera barruko adierazpen diferentziala"
  },
  "伪bulk与混合模型对照": {
    "en": "Pseudobulk and mixed-model comparisons",
    "fr": "Comparaison pseudobulk et modèles mixtes",
    "es": "Comparación pseudobulk y modelos mixtos",
    "eu": "Pseudobulk eta eredu mistoen konparazioak"
  },
  "保留为时间窗外经典支撑；不称为近五年新方法。": {
    "en": "Retained as a classical reference outside the date window, not a new method from the last five years.",
    "fr": "Conservé comme référence classique hors de la fenêtre temporelle, sans le présenter comme une nouveauté des cinq dernières années.",
    "es": "Se conserva como referencia clásica fuera de la ventana temporal, no como método nuevo de los últimos cinco años.",
    "eu": "Denbora-tartetik kanpoko erreferentzia klasiko gisa mantentzen da, ez azken bost urteetako metodo berri gisa."
  },
  "独立样本缺失不能通过随机拆分细胞补齐。": {
    "en": "Missing independent samples cannot be replaced by randomly splitting cells.",
    "fr": "Le manque d’échantillons indépendants ne se compense pas par une division aléatoire des cellules.",
    "es": "La falta de muestras independientes no se compensa dividiendo células al azar.",
    "eu": "Ezin da lagin independenteen falta zelulak ausaz zatituz ordeztu."
  },
  "聚合维度": {
    "en": "Aggregation dimensions",
    "fr": "Dimensions d’agrégation",
    "es": "Dimensiones de agregación",
    "eu": "Agregazio-dimentsioak"
  },
  "独立培养样本×细胞状态": {
    "en": "Independent culture sample × cell state",
    "fr": "Échantillon de culture indépendante × état cellulaire",
    "es": "Muestra de cultivo independiente × estado celular",
    "eu": "Kultura independenteko lagina × zelula-egoera"
  },
  "比较设计": {
    "en": "Comparison design",
    "fr": "Plan de comparaison",
    "es": "Diseño de comparación",
    "eu": "Konparazio-diseinua"
  },
  "检查不平衡与缺失状态组合": {
    "en": "Check imbalance and missing state combinations.",
    "fr": "Vérifier les déséquilibres et les combinaisons d’états absentes.",
    "es": "Comprobar desequilibrios y combinaciones de estados ausentes.",
    "eu": "Egiaztatu desorekak eta falta diren egoera-konbinazioak."
  },
  "每样本各状态细胞数": {
    "en": "Cell counts per state in each sample",
    "fr": "Nombre de cellules par état dans chaque échantillon",
    "es": "Número de células por estado en cada muestra",
    "eu": "Egoera bakoitzeko zelula kopurua lagin bakoitzean"
  },
  "样本协变量": {
    "en": "Sample covariates",
    "fr": "Covariables des échantillons",
    "es": "Covariables de muestras",
    "eu": "Lagin-kobariatuak"
  },
  "相对组成效应": {
    "en": "Relative composition effects",
    "fr": "Effets sur la composition relative",
    "es": "Efectos sobre la composición relativa",
    "eu": "Osaera erlatiboaren efektuak"
  },
  "后验可信效应与诊断": {
    "en": "Posterior credible effects and diagnostics",
    "fr": "Effets crédibles a posteriori et diagnostics",
    "es": "Efectos creíbles posteriores y diagnósticos",
    "eu": "A posterioriko efektu sinesgarriak eta diagnostikoak"
  },
  "输入是状态细胞计数，不是基因UMI。": {
    "en": "Input consists of cell counts by state, not gene UMI counts.",
    "fr": "L’entrée contient des nombres de cellules par état, pas des UMI par gène.",
    "es": "La entrada contiene recuentos de células por estado, no UMI por gen.",
    "eu": "Sarrerak egoeraren araberako zelula-zenbaketak ditu, ez geneen UMI zenbaketak."
  },
  "相对比例改变不能直接解释为绝对细胞数量增加或生长速度改变。": {
    "en": "Relative proportions do not directly establish changes in absolute cell numbers or growth rates.",
    "fr": "Les proportions relatives ne démontrent pas directement des changements de nombre absolu de cellules ou de vitesse de croissance.",
    "es": "Las proporciones relativas no demuestran directamente cambios en el número absoluto de células ni en la velocidad de crecimiento.",
    "eu": "Proportzio erlatiboek ez dituzte zuzenean frogatzen zelula kopuru absolutuaren edo hazkunde-abiaduraren aldaketak."
  },
  "可辨识的条件、批次及设计": {
    "en": "Identifiable conditions, batches and design",
    "fr": "Conditions, lots et plan identifiables",
    "es": "Condiciones, lotes y diseño identificables",
    "eu": "Baldintza, lote eta diseinu identifikagarriak"
  },
  "相对组成参照": {
    "en": "Reference for relative composition",
    "fr": "Référence de composition relative",
    "es": "Referencia de composición relativa",
    "eu": "Osaera erlatiborako erreferentzia"
  },
  "使用稳定状态或检查多个参照的敏感性": {
    "en": "Use stable states or check sensitivity to multiple references.",
    "fr": "Utiliser des états stables ou vérifier la sensibilité à plusieurs références.",
    "es": "Usar estados estables o comprobar la sensibilidad a varias referencias.",
    "eu": "Erabili egoera egonkorrak edo aztertu erreferentzia anitzekiko sentikortasuna."
  },
  "样本单位": {
    "en": "Sample unit",
    "fr": "Unité d’échantillonnage",
    "es": "Unidad muestral",
    "eu": "Lagin-unitatea"
  },
  "独立培养而非细胞barcode": {
    "en": "Independent cultures, not cell barcodes",
    "fr": "Cultures indépendantes, et non codes-barres cellulaires",
    "es": "Cultivos independientes, no códigos de barras celulares",
    "eu": "Kultura independenteak, ez zelulen barcodeak"
  },
  "样本×状态细胞计数": {
    "en": "Sample × state cell counts",
    "fr": "Comptages de cellules échantillon × état",
    "es": "Recuentos de células muestra × estado",
    "eu": "Lagin × egoera zelula-zenbaketak"
  },
  "设计协变量": {
    "en": "Design covariates",
    "fr": "Covariables du plan",
    "es": "Covariables del diseño",
    "eu": "Diseinu-kobariatuak"
  },
  "组成差异": {
    "en": "Differential composition",
    "fr": "Composition différentielle",
    "es": "Composición diferencial",
    "eu": "Osaera diferentziala"
  },
  "组成变异差异": {
    "en": "Differential compositional variability",
    "fr": "Variabilité différentielle de composition",
    "es": "Variabilidad diferencial de composición",
    "eu": "Osaeraren aldakortasun diferentziala"
  },
  "异常样本诊断": {
    "en": "Outlier sample diagnostics",
    "fr": "Diagnostic des échantillons atypiques",
    "es": "Diagnóstico de muestras atípicas",
    "eu": "Lagin atipikoen diagnostikoak"
  },
  "这里的variability指样本间细胞组成变异，不是单基因表达噪音。": {
    "en": "Here variability refers to between-sample variation in cell composition, not single-gene expression noise.",
    "fr": "Ici, la variabilité désigne les différences de composition cellulaire entre échantillons, pas le bruit d’expression d’un gène.",
    "es": "Aquí la variabilidad se refiere a la composición celular entre muestras, no al ruido de expresión de un gen.",
    "eu": "Hemen aldakortasunak laginen arteko zelula-osaeraren aldakortasuna adierazten du, ez gene bakarraren adierazpen-zarata."
  },
  "异常样本诊断不自动授权删除真实稀有菌株状态。": {
    "en": "Outlier diagnostics do not automatically justify removing genuine rare strain states.",
    "fr": "Un diagnostic d’atypie ne justifie pas automatiquement la suppression d’états rares réels de souches.",
    "es": "El diagnóstico de valores atípicos no justifica eliminar automáticamente estados raros reales de cepas.",
    "eu": "Lagin atipikoen diagnostikoak ez du berez justifikatzen anduien benetako egoera arraroak kentzea."
  },
  "组成均值模型": {
    "en": "Mean composition model",
    "fr": "Modèle de composition moyenne",
    "es": "Modelo de composición media",
    "eu": "Batez besteko osaeraren eredua"
  },
  "根据真实样本设计": {
    "en": "Follow the actual sample design.",
    "fr": "Suivre le plan réel des échantillons.",
    "es": "Seguir el diseño real de las muestras.",
    "eu": "Jarraitu laginen benetako diseinuari."
  },
  "组成变异模型": {
    "en": "Compositional variability model",
    "fr": "Modèle de variabilité de composition",
    "es": "Modelo de variabilidad de composición",
    "eu": "Osaeraren aldakortasun-eredua"
  },
  "估计样本间状态比例变异，单独检查可辨识性": {
    "en": "Estimate between-sample variation in state proportions; check identifiability separately.",
    "fr": "Estimer la variabilité des proportions d’états entre échantillons ; vérifier séparément l’identifiabilité.",
    "es": "Estimar la variación de proporciones de estados entre muestras; comprobar por separado la identificabilidad.",
    "eu": "Estimatu egoera-proportzioen laginen arteko aldakortasuna; egiaztatu identifikagarritasuna bereizita."
  },
  "计数表字段": {
    "en": "Count-table fields",
    "fr": "Champs de la table de comptages",
    "es": "Campos de la tabla de recuentos",
    "eu": "Zenbaketa-taularen eremuak"
  },
  "按独立培养及状态计数": {
    "en": "Count by independent culture and state.",
    "fr": "Compter par culture indépendante et par état.",
    "es": "Contar por cultivo independiente y estado.",
    "eu": "Zenbatu kultura independentearen eta egoeraren arabera."
  },
  "细胞邻域图": {
    "en": "Cell neighborhood graph",
    "fr": "Graphe des voisinages cellulaires",
    "es": "Grafo de vecindarios celulares",
    "eu": "Zelulen auzotasun-grafoa"
  },
  "样本/条件": {
    "en": "Samples / conditions",
    "fr": "Échantillons / conditions",
    "es": "Muestras / condiciones",
    "eu": "Laginak / baldintzak"
  },
  "邻域计数": {
    "en": "Neighborhood counts",
    "fr": "Comptages par voisinage",
    "es": "Recuentos por vecindario",
    "eu": "Auzotasun-zenbaketak"
  },
  "差异丰度效应": {
    "en": "Differential abundance effects",
    "fr": "Effets d’abondance différentielle",
    "es": "Efectos de abundancia diferencial",
    "eu": "Ugaritasun diferentzialaren efektuak"
  },
  "图结构多重检验": {
    "en": "Graph-aware multiple testing",
    "fr": "Tests multiples tenant compte du graphe",
    "es": "Pruebas múltiples que consideran el grafo",
    "eu": "Grafoaren egitura kontuan duten proba anizkoitzak"
  },
  "发表日期在当前五年窗口外，作为经典方法保留。": {
    "en": "Published outside the current five-year window; retained as a classical method.",
    "fr": "Publié hors de la fenêtre actuelle de cinq ans ; conservé comme méthode classique.",
    "es": "Publicado fuera de la ventana actual de cinco años; se conserva como método clásico.",
    "eu": "Egungo bost urteko tartetik kanpo argitaratua; metodo klasiko gisa mantentzen da."
  },
  "结果受捕获和QC保留率影响；不能把丰度差异直接称为适合度差异。": {
    "en": "Results depend on capture and QC retention rates; abundance differences do not directly establish fitness differences.",
    "fr": "Les résultats dépendent de la capture et de la rétention après QC ; les différences d’abondance ne démontrent pas directement des différences de valeur sélective.",
    "es": "Los resultados dependen de la captura y la retención tras QC; las diferencias de abundancia no demuestran directamente diferencias de aptitud biológica.",
    "eu": "Emaitzak harrapaketaren eta QC ondoko atxikipen-tasen mende daude; ugaritasun-aldeek ez dute zuzenean fitness-alderik frogatzen."
  },
  "邻域规模与维数": {
    "en": "Neighborhood size and dimensions",
    "fr": "Taille des voisinages et dimensions",
    "es": "Tamaño de vecindarios y dimensiones",
    "eu": "Auzotasunaren tamaina eta dimentsioak"
  },
  "检查图和稀有状态的稳定性": {
    "en": "Check graph and rare-state stability.",
    "fr": "Vérifier la stabilité du graphe et des états rares.",
    "es": "Comprobar la estabilidad del grafo y de los estados raros.",
    "eu": "Egiaztatu grafoaren eta egoera arraroen egonkortasuna."
  },
  "样本层比较": {
    "en": "Sample-level comparisons",
    "fr": "Comparaisons au niveau des échantillons",
    "es": "Comparaciones a nivel de muestra",
    "eu": "Lagin-mailako konparazioak"
  },
  "样本计数与设计表严格匹配": {
    "en": "Match sample counts exactly to the design table.",
    "fr": "Faire correspondre exactement les comptages des échantillons à la table du plan.",
    "es": "Hacer coincidir exactamente los recuentos de muestras con la tabla del diseño.",
    "eu": "Parekatu zehazki lagin-zenbaketak diseinu-taularekin."
  },
  "酵母TF—靶基因/通路网络": {
    "en": "Yeast TF–target / pathway networks",
    "fr": "Réseaux TF–cibles / voies de levure",
    "es": "Redes TF–dianas / rutas de levadura",
    "eu": "Legamiaren TF–itu / bide-sareak"
  },
  "程序活性分数": {
    "en": "Program activity scores",
    "fr": "Scores d’activité des programmes",
    "es": "Puntuaciones de actividad de programas",
    "eu": "Programen jarduera-puntuazioak"
  },
  "方法一致性": {
    "en": "Agreement across methods",
    "fr": "Concordance entre méthodes",
    "es": "Concordancia entre métodos",
    "eu": "Metodoen arteko adostasuna"
  },
  "TF活性估计不同于TF自身RNA量；靶网络不完整会影响分数。": {
    "en": "Estimated TF activity differs from the TF’s own RNA abundance; incomplete target networks affect scores.",
    "fr": "L’activité estimée d’un TF diffère de l’abondance de son propre ARN ; un réseau de cibles incomplet influence le score.",
    "es": "La actividad estimada de un TF difiere de la abundancia de su propio ARN; las redes de dianas incompletas afectan la puntuación.",
    "eu": "TF baten jarduera-estimazioa ez da TF horren RNA ugaritasuna; itu-sare osatugabeek puntuazioetan eragiten dute."
  },
  "人类DoRothEA/PROGENy网络不能不经验证直接用于酵母。": {
    "en": "Do not directly use human DoRothEA/PROGENy networks in yeast without validation.",
    "fr": "Ne pas utiliser directement les réseaux humains DoRothEA/PROGENy chez la levure sans validation.",
    "es": "No usar directamente redes humanas DoRothEA/PROGENy en levadura sin validación.",
    "eu": "Ez erabili zuzenean giza DoRothEA/PROGENy sareak legamian baliozkotu gabe."
  },
  "物种匹配的有向/带符号网络": {
    "en": "Species-matched directed / signed networks",
    "fr": "Réseaux orientés / signés adaptés à l’espèce",
    "es": "Redes dirigidas / con signo adaptadas a la especie",
    "eu": "Espeziearekin bat datozen sare zuzenduak / zeinudunak"
  },
  "使用SGD/YEASTRACT等来源并保留作用方向与条件": {
    "en": "Use sources such as SGD/YEASTRACT and retain effect direction and conditions.",
    "fr": "Utiliser notamment SGD/YEASTRACT et conserver le sens des effets et les conditions.",
    "es": "Usar fuentes como SGD/YEASTRACT y conservar la dirección del efecto y las condiciones.",
    "eu": "Erabili SGD/YEASTRACT bezalako iturriak, eta mantendu efektuen norabidea eta baldintzak."
  },
  "最少可用靶基因规则": {
    "en": "Minimum available-target rule",
    "fr": "Règle du nombre minimal de cibles disponibles",
    "es": "Regla del mínimo de dianas disponibles",
    "eu": "Eskuragarri dauden gutxieneko ituen araua"
  },
  "按当前版本和靶集合覆盖审计，不照搬默认物种": {
    "en": "Audit the current version and target-set coverage; do not copy settings from the default species.",
    "fr": "Vérifier la version actuelle et la couverture des cibles ; ne pas reprendre les réglages de l’espèce par défaut.",
    "es": "Revisar la versión y la cobertura de dianas; no copiar ajustes de la especie predeterminada.",
    "eu": "Aztertu egungo bertsioa eta itu-multzoen estaldura; ez kopiatu espezie lehenetsiaren ezarpenak."
  },
  "输入表达层": {
    "en": "Input expression layer",
    "fr": "Couche d’expression d’entrée",
    "es": "Capa de expresión de entrada",
    "eu": "Sarrerako adierazpen-geruza"
  },
  "选择与方法模型一致的层": {
    "en": "Choose a layer consistent with the method’s model.",
    "fr": "Choisir une couche cohérente avec le modèle de la méthode.",
    "es": "Elegir una capa coherente con el modelo del método.",
    "eu": "Hautatu metodoaren ereduarekin bat datorren geruza."
  },
  "表达计数": {
    "en": "Expression counts",
    "fr": "Comptages d’expression",
    "es": "Recuentos de expresión",
    "eu": "Adierazpen-zenbaketak"
  },
  "文库与菌株标签": {
    "en": "Library and strain labels",
    "fr": "Étiquettes des bibliothèques et des souches",
    "es": "Etiquetas de bibliotecas y cepas",
    "eu": "Liburutegi- eta andui-etiketak"
  },
  "程序基因权重": {
    "en": "Program gene weights",
    "fr": "Poids des gènes dans les programmes",
    "es": "Pesos génicos de programas",
    "eu": "Programen gene-pisuak"
  },
  "细胞程序使用率": {
    "en": "Program usage per cell",
    "fr": "Utilisation des programmes par cellule",
    "es": "Uso de programas por célula",
    "eu": "Programa-erabilera zelula bakoitzeko"
  },
  "稳定性与重构误差": {
    "en": "Stability and reconstruction error",
    "fr": "Stabilité et erreur de reconstruction",
    "es": "Estabilidad y error de reconstrucción",
    "eu": "Egonkortasuna eta berreraikuntza-errorea"
  },
  "程序可能由测序深度、rRNA、应激或菌株参考偏差驱动，需先审计。": {
    "en": "Programs may be driven by sequencing depth, rRNA, stress or strain-reference bias; audit these first.",
    "fr": "Les programmes peuvent être dominés par la profondeur de séquençage, les ARNr, le stress ou le biais de référence des souches ; les examiner d’abord.",
    "es": "Los programas pueden estar dominados por profundidad de secuenciación, ARNr, estrés o sesgo de referencia de cepas; revisar estos factores primero.",
    "eu": "Programak sekuentziazio-sakonerak, rRNAk, estresak edo andui-erreferentziaren alborapenak eragin ditzakete; aztertu horiek lehenik."
  },
  "共表达程序不自动是TF调控因果网络；程序重构值不作为噪音原始计数。": {
    "en": "Coexpression programs are not automatically causal TF networks; reconstructed values are not raw counts for noise analysis.",
    "fr": "Les programmes de coexpression ne sont pas automatiquement des réseaux causaux de TF ; leurs valeurs reconstruites ne sont pas des comptages bruts pour analyser le bruit.",
    "es": "Los programas de coexpresión no son automáticamente redes causales de TF; sus valores reconstruidos no son recuentos brutos para analizar ruido.",
    "eu": "Koadierazpen-programak ez dira automatikoki TF sare kausalak; berreraikitako balioak ez dira zarata-analisirako zenbaketa gordinak."
  },
  "候选程序数与最终程序数": {
    "en": "Candidate and final program numbers",
    "fr": "Nombres candidats et final de programmes",
    "es": "Números candidatos y final de programas",
    "eu": "Programen kopuru hautagaiak eta azken kopurua"
  },
  "用稳定性、重构误差和跨菌株重复选择": {
    "en": "Select using stability, reconstruction error and replication across strains.",
    "fr": "Choisir selon la stabilité, l’erreur de reconstruction et la reproductibilité entre souches.",
    "es": "Elegir según estabilidad, error de reconstrucción y replicación entre cepas.",
    "eu": "Hautatu egonkortasunaren, berreraikuntza-errorearen eta anduien arteko erreplikazioaren arabera."
  },
  "重复初始化与随机种子": {
    "en": "Repeated initializations and random seed",
    "fr": "Initialisations répétées et graine aléatoire",
    "es": "Inicializaciones repetidas y semilla aleatoria",
    "eu": "Hasieratze errepikatuak eta ausazko hazia"
  },
  "保存稳定性和可复现配置": {
    "en": "Save stability results and reproducible settings.",
    "fr": "Conserver les résultats de stabilité et les réglages reproductibles.",
    "es": "Guardar resultados de estabilidad y ajustes reproducibles.",
    "eu": "Gorde egonkortasun-emaitzak eta ezarpen erreproduzigarriak."
  },
  "共识过滤规则": {
    "en": "Consensus filtering rule",
    "fr": "Règle de filtrage du consensus",
    "es": "Regla de filtrado del consenso",
    "eu": "Adostasun-iragazketaren araua"
  },
  "依版本与实际分解诊断选择": {
    "en": "Select using the version and diagnostics of the actual decomposition.",
    "fr": "Choisir selon la version et les diagnostics de la décomposition réelle.",
    "es": "Elegir según la versión y los diagnósticos de la descomposición real.",
    "eu": "Hautatu bertsioaren eta benetako deskonposizioaren diagnostikoen arabera."
  },
  "酵母TF清单": {
    "en": "Yeast TF list",
    "fr": "Liste des TF de levure",
    "es": "Lista de TF de levadura",
    "eu": "Legamiaren TF zerrenda"
  },
  "物种匹配的motif排名与注释库": {
    "en": "Species-matched motif rankings and annotation databases",
    "fr": "Classements de motifs et bases d’annotation adaptés à l’espèce",
    "es": "Clasificaciones de motivos y bases de anotación adaptadas a la especie",
    "eu": "Espeziearekin bat datozen motif-sailkapenak eta anotazio-datu-baseak"
  },
  "候选regulon": {
    "en": "Candidate regulons",
    "fr": "Régulons candidats",
    "es": "Regulones candidatos",
    "eu": "Erregulon hautagaiak"
  },
  "motif富集": {
    "en": "Motif enrichment",
    "fr": "Enrichissement en motifs",
    "es": "Enriquecimiento de motivos",
    "eu": "Motif-aberastea"
  },
  "AUCell分数": {
    "en": "AUCell scores",
    "fr": "Scores AUCell",
    "es": "Puntuaciones AUCell",
    "eu": "AUCell puntuazioak"
  },
  "没有适用酵母motif库时不能套人鼠cisTarget数据库。": {
    "en": "Without a suitable yeast motif database, do not substitute human or mouse cisTarget databases.",
    "fr": "Sans base de motifs adaptée à la levure, ne pas utiliser les bases cisTarget humaines ou murines.",
    "es": "Sin una base de motivos adecuada para levadura, no sustituirla por bases cisTarget humanas o murinas.",
    "eu": "Legamiarako motif-datu-base egokirik gabe, ez erabili horren ordez giza edo saguaren cisTarget datu-baseak."
  },
  "motif支持提高候选可信度，但不证明条件特异性结合或因果调控。": {
    "en": "Motif support strengthens candidates but does not prove condition-specific binding or causal regulation.",
    "fr": "Le support par motifs renforce les candidats sans prouver une liaison propre à la condition ni une régulation causale.",
    "es": "El respaldo de motivos refuerza candidatos, pero no demuestra unión específica de condición ni regulación causal.",
    "eu": "Motif-euskarriak hautagaiak indartzen ditu, baina ez du baldintza jakineko lotura edo erregulazio kausala frogatzen."
  },
  "酵母TF集合": {
    "en": "Yeast TF set",
    "fr": "Ensemble de TF de levure",
    "es": "Conjunto de TF de levadura",
    "eu": "Legamiaren TF multzoa"
  },
  "统一当前系统ID": {
    "en": "Harmonize current systematic IDs.",
    "fr": "Harmoniser les identifiants systématiques actuels.",
    "es": "Armonizar los identificadores sistemáticos actuales.",
    "eu": "Bateratu egungo identifikatzaile sistematikoak."
  },
  "酵母motif排名与对应注释": {
    "en": "Yeast motif rankings and matching annotations",
    "fr": "Classements des motifs de levure et annotations associées",
    "es": "Clasificaciones de motivos de levadura y anotaciones correspondientes",
    "eu": "Legamiaren motif-sailkapenak eta dagozkien anotazioak"
  },
  "需准备物种和启动子定义一致的数据库": {
    "en": "Prepare databases with consistent species and promoter definitions.",
    "fr": "Préparer des bases cohérentes pour l’espèce et la définition des promoteurs.",
    "es": "Preparar bases coherentes en especie y definición de promotores.",
    "eu": "Prestatu espezie eta sustatzaile-definizio koherenteak dituzten datu-baseak."
  },
  "随机性与并行": {
    "en": "Randomness and parallelism",
    "fr": "Aléatoire et parallélisme",
    "es": "Aleatoriedad y paralelismo",
    "eu": "Ausazkotasuna eta paralelismoa"
  },
  "固定版本并审计稳定性": {
    "en": "Pin the version and audit stability.",
    "fr": "Fixer la version et vérifier la stabilité.",
    "es": "Fijar la versión y comprobar la estabilidad.",
    "eu": "Finkatu bertsioa eta aztertu egonkortasuna."
  },
  "轨迹与拟时序": {
    "en": "Trajectories and pseudotime",
    "fr": "Trajectoires et pseudotemps",
    "es": "Trayectorias y pseudotiempo",
    "eu": "Ibilbideak eta sasidenbora"
  },
  "条件标签": {
    "en": "Condition labels",
    "fr": "Étiquettes de condition",
    "es": "Etiquetas de condición",
    "eu": "Baldintza-etiketak"
  },
  "拓扑差异": {
    "en": "Topological differences",
    "fr": "Différences topologiques",
    "es": "Diferencias topológicas",
    "eu": "Topologia-aldeak"
  },
  "进程/分支占据差异": {
    "en": "Differences in progression / branch occupancy",
    "fr": "Différences de progression / d’occupation des branches",
    "es": "Diferencias de progresión / ocupación de ramas",
    "eu": "Progresioaren / adarren okupazioaren aldeak"
  },
  "沿程条件效应": {
    "en": "Condition effects along trajectories",
    "fr": "Effets des conditions le long des trajectoires",
    "es": "Efectos de condición a lo largo de trayectorias",
    "eu": "Baldintzen efektuak ibilbideetan zehar"
  },
  "细胞沿拟时序分布变化不是直接测得的运动速度。": {
    "en": "Changes in cell distributions along pseudotime are not directly measured movement speeds.",
    "fr": "Les changements de distribution le long du pseudotemps ne sont pas des vitesses de déplacement mesurées directement.",
    "es": "Los cambios de distribución celular a lo largo del pseudotiempo no son velocidades de movimiento medidas directamente.",
    "eu": "Zelulen banaketaren aldaketak sasidenboran zehar ez dira zuzenean neurtutako mugimendu-abiadurak."
  },
  "论文讨论了估计拟时序的依赖性与不确定性；统计量用于探索时不得夸大因果或精确频率解释。": {
    "en": "The paper discusses dependence and uncertainty in estimated pseudotime; exploratory statistics must not be overstated as causal or exact frequentist evidence.",
    "fr": "L’article discute la dépendance et l’incertitude du pseudotemps estimé ; les statistiques exploratoires ne doivent pas être présentées comme preuves causales ou fréquentistes exactes.",
    "es": "El artículo aborda dependencia e incertidumbre del pseudotiempo estimado; las estadísticas exploratorias no deben exagerarse como evidencia causal o frecuentista exacta.",
    "eu": "Artikuluak estimatutako sasidenboraren mendekotasuna eta ziurgabetasuna aztertzen ditu; esplorazioko estatistikak ez dira ebidentzia kausal edo maiztasunzale zehatz gisa gehiegiz azaldu behar."
  },
  "酵母周期应尊重环状结构，不强制套用发育分叉。": {
    "en": "Respect the circular yeast cycle; do not force it into a branching developmental model.",
    "fr": "Respecter le cycle circulaire de la levure ; ne pas imposer un modèle de développement ramifié.",
    "es": "Respetar el ciclo circular de levadura; no imponer un modelo de desarrollo ramificado.",
    "eu": "Errespetatu legamiaren ziklo zirkularra; ez behartu garapen adarkatuko eredu batera."
  },
  "批次与条件不可完全混杂": {
    "en": "Batch and condition must not be completely confounded.",
    "fr": "Le lot et la condition ne doivent pas être totalement confondus.",
    "es": "El lote y la condición no deben estar completamente confundidos.",
    "eu": "Lotea eta baldintza ez dira erabat nahastuta egon behar."
  },
  "轨迹与分支权重": {
    "en": "Trajectories and branch weights",
    "fr": "Trajectoires et poids des branches",
    "es": "Trayectorias y pesos de ramas",
    "eu": "Ibilbideak eta adarren pisuak"
  },
  "先验证共用或可匹配拓扑": {
    "en": "First validate a shared or matchable topology.",
    "fr": "Valider d’abord une topologie commune ou comparable.",
    "es": "Validar primero una topología compartida o comparable.",
    "eu": "Lehenik baliozkotu topologia partekatua edo parekagarria."
  },
  "拟时序": {
    "en": "Pseudotime",
    "fr": "Pseudotemps",
    "es": "Pseudotiempo",
    "eu": "Sasidenbora"
  },
  "分支权重": {
    "en": "Branch weights",
    "fr": "Poids des branches",
    "es": "Pesos de ramas",
    "eu": "Adarren pisuak"
  },
  "沿程表达关联": {
    "en": "Expression associations along trajectories",
    "fr": "Associations d’expression le long des trajectoires",
    "es": "Asociaciones de expresión a lo largo de trayectorias",
    "eu": "Adierazpen-elkarketak ibilbideetan zehar"
  },
  "分支差异": {
    "en": "Branch differences",
    "fr": "Différences entre branches",
    "es": "Diferencias entre ramas",
    "eu": "Adarren arteko aldeak"
  },
  "时间窗外经典方法；连续环状周期需专门检查周期边界，普通GAM不自动闭合。": {
    "en": "A classical method outside the time window; circular cycles require boundary checks, since ordinary GAMs do not close automatically.",
    "fr": "Méthode classique hors fenêtre ; un cycle circulaire exige de vérifier ses frontières, car un GAM ordinaire ne se ferme pas automatiquement.",
    "es": "Método clásico fuera de la ventana; los ciclos circulares requieren comprobar sus límites, pues un GAM ordinario no se cierra automáticamente.",
    "eu": "Denbora-tartetik kanpoko metodo klasikoa; ziklo zirkularretan mugak egiaztatu behar dira, GAM arruntak ez baitira automatikoki ixten."
  },
  "同一数据选轨迹又检验存在选择偏差；保留独立样本验证。": {
    "en": "Selecting and testing trajectories on the same data introduces selection bias; retain independent samples for validation.",
    "fr": "Choisir puis tester une trajectoire sur les mêmes données crée un biais de sélection ; garder des échantillons indépendants pour validation.",
    "es": "Seleccionar y probar trayectorias con los mismos datos introduce sesgo de selección; reservar muestras independientes para validar.",
    "eu": "Datu beretan ibilbideak hautatu eta probatzeak hautapen-alborapena sortzen du; gorde lagin independenteak baliozkotzeko."
  },
  "平滑复杂度": {
    "en": "Smoothing complexity",
    "fr": "Complexité du lissage",
    "es": "Complejidad del suavizado",
    "eu": "Leuntzearen konplexutasuna"
  },
  "通过拟合诊断与敏感性选择": {
    "en": "Choose using fit diagnostics and sensitivity analyses.",
    "fr": "Choisir selon les diagnostics d’ajustement et les analyses de sensibilité.",
    "es": "Elegir mediante diagnósticos del ajuste y análisis de sensibilidad.",
    "eu": "Hautatu doikuntzaren diagnostikoen eta sentikortasun-analisien bidez."
  },
  "额外协变量设计": {
    "en": "Additional covariate design",
    "fr": "Plan des covariables supplémentaires",
    "es": "Diseño de covariables adicionales",
    "eu": "Kobariatu osagarrien diseinua"
  },
  "按文档加入可辨识技术协变量": {
    "en": "Add identifiable technical covariates as documented.",
    "fr": "Ajouter les covariables techniques identifiables selon la documentation.",
    "es": "Añadir covariables técnicas identificables según la documentación.",
    "eu": "Gehitu kobariatu tekniko identifikagarriak dokumentazioaren arabera."
  },
  "轨迹输入": {
    "en": "Trajectory inputs",
    "fr": "Entrées de trajectoire",
    "es": "Entradas de trayectoria",
    "eu": "Ibilbide-sarrerak"
  },
  "沿程检验不替代上游轨迹验证": {
    "en": "Tests along trajectories do not replace upstream trajectory validation.",
    "fr": "Les tests le long des trajectoires ne remplacent pas leur validation préalable.",
    "es": "Las pruebas a lo largo de trayectorias no sustituyen su validación previa.",
    "eu": "Ibilbidean zeharreko probek ez dute aurretiko ibilbide-baliozkotzea ordezkatzen."
  },
  "表达邻域": {
    "en": "Expression neighborhoods",
    "fr": "Voisinages d’expression",
    "es": "Vecindarios de expresión",
    "eu": "Adierazpen-auzotasunak"
  },
  "可靠velocity、拟时序或真实时间信息之一": {
    "en": "Reliable velocity, pseudotime or actual time information",
    "fr": "Vélocité fiable, pseudotemps ou information temporelle réelle",
    "es": "Velocidad fiable, pseudotiempo o información temporal real",
    "eu": "Abiadura fidagarria, sasidenbora edo benetako denbora-informazioa"
  },
  "转移矩阵": {
    "en": "Transition matrix",
    "fr": "Matrice de transition",
    "es": "Matriz de transición",
    "eu": "Trantsizio-matrizea"
  },
  "宏观状态": {
    "en": "Macrostates",
    "fr": "Macro-états",
    "es": "Macroestados",
    "eu": "Makroegoerak"
  },
  "终态概率": {
    "en": "Terminal-state probabilities",
    "fr": "Probabilités des états terminaux",
    "es": "Probabilidades de estados terminales",
    "eu": "Amaierako egoeren probabilitateak"
  },
  "候选驱动基因": {
    "en": "Candidate driver genes",
    "fr": "Gènes moteurs candidats",
    "es": "Genes impulsores candidatos",
    "eu": "Gene eragile hautagaiak"
  },
  "循环中的酵母未必有吸收终态；不能强行把周期阶段命名为终末命运。": {
    "en": "Cycling yeast may have no absorbing terminal states; do not force cycle phases into terminal-fate labels.",
    "fr": "Une levure en cycle peut ne pas avoir d’états terminaux absorbants ; ne pas imposer des destins terminaux aux phases du cycle.",
    "es": "La levadura en ciclo puede carecer de estados terminales absorbentes; no forzar etiquetas de destino terminal en las fases del ciclo.",
    "eu": "Zikloan dagoen legamiak baliteke amaierako egoera xurgatzailerik ez izatea; ez behartu ziklo-faseak azken patu gisa etiketatzera."
  },
  "转移概率是模型推断，不是谱系追踪或群体进化关系。": {
    "en": "Transition probabilities are model inferences, not lineage tracing or population evolutionary relationships.",
    "fr": "Les probabilités de transition sont des inférences du modèle, pas un traçage de lignées ni des relations évolutives de population.",
    "es": "Las probabilidades de transición son inferencias del modelo, no trazado de linajes ni relaciones evolutivas poblacionales.",
    "eu": "Trantsizio-probabilitateak ereduaren inferentziak dira, ez leinuen jarraipena edo populazioaren eboluzio-erlazioak."
  },
  "方向信息来源": {
    "en": "Source of directional information",
    "fr": "Source de l’information directionnelle",
    "es": "Fuente de información direccional",
    "eu": "Norabide-informazioaren iturria"
  },
  "选择与数据一致的kernel；不能把不同输入模式混同": {
    "en": "Choose a kernel consistent with the data; do not conflate distinct input modes.",
    "fr": "Choisir un noyau cohérent avec les données ; ne pas confondre les modes d’entrée distincts.",
    "es": "Elegir un kernel coherente con los datos; no confundir distintos modos de entrada.",
    "eu": "Hautatu datuekin bat datorren kernel bat; ez nahasi sarrera-modu desberdinak."
  },
  "终态设定": {
    "en": "Terminal-state specification",
    "fr": "Définition des états terminaux",
    "es": "Definición de estados terminales",
    "eu": "Amaierako egoeren zehaztapena"
  },
  "需要生物学和稳定性证据": {
    "en": "Requires biological and stability evidence.",
    "fr": "Nécessite des preuves biologiques et de stabilité.",
    "es": "Requiere evidencia biológica y de estabilidad.",
    "eu": "Ebidentzia biologikoa eta egonkortasun-ebidentzia behar ditu."
  },
  "核组合权重": {
    "en": "Kernel combination weights",
    "fr": "Poids de combinaison des noyaux",
    "es": "Pesos de combinación de kernels",
    "eu": "Kernelen konbinazio-pisuak"
  },
  "做输入和权重敏感性分析": {
    "en": "Analyze sensitivity to inputs and weights.",
    "fr": "Analyser la sensibilité aux entrées et aux poids.",
    "es": "Analizar la sensibilidad a entradas y pesos.",
    "eu": "Aztertu sarrerekiko eta pisuekiko sentikortasuna."
  },
  "符合模式的RNA层": {
    "en": "RNA layers compatible with the mode",
    "fr": "Couches d’ARN compatibles avec le mode",
    "es": "Capas de ARN compatibles con el modo",
    "eu": "Moduarekin bateragarriak diren RNA geruzak"
  },
  "可选代谢标记与真实时间": {
    "en": "Optional metabolic labeling and actual time",
    "fr": "Marquage métabolique et temps réel facultatifs",
    "es": "Marcaje metabólico y tiempo real opcionales",
    "eu": "Aukerako markatze metabolikoa eta benetako denbora"
  },
  "动力学参数": {
    "en": "Kinetic parameters",
    "fr": "Paramètres cinétiques",
    "es": "Parámetros cinéticos",
    "eu": "Parametro zinetikoak"
  },
  "向量场": {
    "en": "Vector field",
    "fr": "Champ vectoriel",
    "es": "Campo vectorial",
    "eu": "Bektore-eremua"
  },
  "局部调控假说": {
    "en": "Local regulatory hypotheses",
    "fr": "Hypothèses de régulation locale",
    "es": "Hipótesis de regulación local",
    "eu": "Tokiko erregulazio-hipotesiak"
  },
  "普通Illumina scRNA FASTQ不能补造代谢标记new/total层或绝对合成降解率。": {
    "en": "Ordinary Illumina scRNA FASTQ cannot supply missing metabolically labeled new/total layers or absolute synthesis/degradation rates.",
    "fr": "Des FASTQ scRNA Illumina ordinaires ne permettent pas de créer des couches new/total marquées métaboliquement ni des taux absolus de synthèse/dégradation.",
    "es": "Los FASTQ scRNA Illumina ordinarios no permiten crear capas new/total con marcaje metabólico ni tasas absolutas de síntesis/degradación.",
    "eu": "Illumina scRNA FASTQ arruntek ezin dituzte falta diren markatze metabolikoko new/total geruzak edo sintesi/degradazio-tasa absolutuak sortu."
  },
  "局部Jacobian/向量场方向是模型结果，不等于经干预证实的GRN。": {
    "en": "Local Jacobians and vector-field directions are model outputs, not intervention-validated GRNs.",
    "fr": "Les Jacobiens locaux et directions du champ vectoriel sont des sorties du modèle, pas des GRN validés par intervention.",
    "es": "Los jacobianos locales y las direcciones del campo vectorial son resultados del modelo, no GRN validadas mediante intervención.",
    "eu": "Tokiko Jacobiarrak eta bektore-eremuaren norabideak ereduaren emaitzak dira, ez esku-hartze bidez baliozkotutako GRNak."
  },
  "实验与动力学模式": {
    "en": "Experimental and kinetic modes",
    "fr": "Modes expérimentaux et cinétiques",
    "es": "Modos experimentales y cinéticos",
    "eu": "Modu esperimentalak eta zinetikoak"
  },
  "依据剪接或代谢标记真实设计确定": {
    "en": "Use the actual splicing or metabolic-labeling design.",
    "fr": "Se fonder sur le plan réel d’épissage ou de marquage métabolique.",
    "es": "Usar el diseño real de empalme o marcaje metabólico.",
    "eu": "Erabili benetako splicing- edo markatze metabolikoko diseinua."
  },
  "真实标记时间字段": {
    "en": "Actual labeling-time field",
    "fr": "Champ du temps réel de marquage",
    "es": "Campo del tiempo real de marcaje",
    "eu": "Benetako markatze-denboraren eremua"
  },
  "仅有实际时间信息时使用": {
    "en": "Use only when actual time information exists.",
    "fr": "Utiliser uniquement si le temps réel est connu.",
    "es": "Usar solo si existe información temporal real.",
    "eu": "Erabili benetako denbora-informazioa dagoenean soilik."
  },
  "向量场坐标": {
    "en": "Vector-field coordinates",
    "fr": "Coordonnées du champ vectoriel",
    "es": "Coordenadas del campo vectorial",
    "eu": "Bektore-eremuaren koordenatuak"
  },
  "检验降维和状态覆盖稳定性": {
    "en": "Check dimensionality-reduction and state-coverage stability.",
    "fr": "Vérifier la stabilité de la réduction dimensionnelle et de la couverture des états.",
    "es": "Comprobar la estabilidad de reducción dimensional y cobertura de estados.",
    "eu": "Egiaztatu dimentsio-murrizketaren eta egoera-estalduraren egonkortasuna."
  },
  "一致计数规则的spliced/unspliced层": {
    "en": "Spliced/unspliced layers with consistent counting rules",
    "fr": "Couches spliced/unspliced avec règles de comptage cohérentes",
    "es": "Capas spliced/unspliced con reglas de recuento coherentes",
    "eu": "Zenbaketa-arau koherenteak dituzten spliced/unspliced geruzak"
  },
  "velocity后验": {
    "en": "Velocity posterior",
    "fr": "Distribution a posteriori de la vélocité",
    "es": "Distribución posterior de velocidad",
    "eu": "Abiaduraren a posterioriko banaketa"
  },
  "潜在时间": {
    "en": "Latent time",
    "fr": "Temps latent",
    "es": "Tiempo latente",
    "eu": "Denbora latentea"
  },
  "动力学与不确定性": {
    "en": "Kinetics and uncertainty",
    "fr": "Cinétique et incertitude",
    "es": "Cinética e incertidumbre",
    "eu": "Zinetika eta ziurgabetasuna"
  },
  "酵母内含子基因较少；数据不足时后验模型也不能创造动力学可辨识性。": {
    "en": "Yeast has relatively few intron-containing genes; a posterior model cannot create kinetic identifiability when data are insufficient.",
    "fr": "La levure possède relativement peu de gènes à introns ; un modèle a posteriori ne crée pas l’identifiabilité cinétique si les données sont insuffisantes.",
    "es": "La levadura tiene relativamente pocos genes con intrones; un modelo posterior no crea identificabilidad cinética cuando los datos son insuficientes.",
    "eu": "Legamiak intronak dituzten gene nahiko gutxi ditu; a posterioriko ereduak ezin du identifikagarritasun zinetikoa sortu datuak eskasak direnean."
  },
  "潜在时间不等于绝对时间；基因和菌株共享速率假设需核查。": {
    "en": "Latent time is not absolute time; assumptions of shared rates across genes and strains require checking.",
    "fr": "Le temps latent n’est pas un temps absolu ; vérifier les hypothèses de taux partagés entre gènes et souches.",
    "es": "El tiempo latente no es tiempo absoluto; comprobar los supuestos de tasas compartidas entre genes y cepas.",
    "eu": "Denbora latentea ez da denbora absolutua; geneen eta anduien arteko tasa partekatuen suposizioak egiaztatu behar dira."
  },
  "真实剪接层": {
    "en": "Actual splicing layers",
    "fr": "Couches d’épissage réelles",
    "es": "Capas de empalme reales",
    "eu": "Benetako splicing-geruzak"
  },
  "不可由GeneFull−Gene伪造": {
    "en": "Do not fabricate from GeneFull−Gene.",
    "fr": "Ne pas fabriquer à partir de GeneFull−Gene.",
    "es": "No fabricarlas a partir de GeneFull−Gene.",
    "eu": "Ez sortu artifizialki GeneFull−Gene erabiliz."
  },
  "后验采样": {
    "en": "Posterior sampling",
    "fr": "Échantillonnage a posteriori",
    "es": "Muestreo posterior",
    "eu": "A posterioriko laginketa"
  },
  "按稳定性审计而非固定推荐数字": {
    "en": "Assess stability rather than using a fixed recommended number.",
    "fr": "Évaluer la stabilité plutôt qu’utiliser un nombre recommandé fixe.",
    "es": "Evaluar la estabilidad en lugar de usar un número recomendado fijo.",
    "eu": "Ebaluatu egonkortasuna gomendatutako zenbaki finko bat erabili ordez."
  },
  "模型训练": {
    "en": "Model training",
    "fr": "Entraînement du modèle",
    "es": "Entrenamiento del modelo",
    "eu": "Ereduaren entrenamendua"
  },
  "保留收敛与重复训练诊断": {
    "en": "Retain convergence and repeated-training diagnostics.",
    "fr": "Conserver les diagnostics de convergence et d’entraînements répétés.",
    "es": "Conservar diagnósticos de convergencia y entrenamientos repetidos.",
    "eu": "Gorde konbergentziaren eta entrenamendu errepikatuen diagnostikoak."
  },
  "可信周期基因/相位参考": {
    "en": "Reliable cycle genes / phase reference",
    "fr": "Gènes du cycle / référence de phase fiables",
    "es": "Genes del ciclo / referencia de fase fiables",
    "eu": "Ziklo-gene / fase-erreferentzia fidagarriak"
  },
  "spliced/unspliced层": {
    "en": "Spliced/unspliced layers",
    "fr": "Couches spliced/unspliced",
    "es": "Capas spliced/unspliced",
    "eu": "Spliced/unspliced geruzak"
  },
  "周期相位": {
    "en": "Cycle phase",
    "fr": "Phase du cycle",
    "es": "Fase del ciclo",
    "eu": "Zikloaren fasea"
  },
  "相位相关速度": {
    "en": "Phase-dependent speed",
    "fr": "Vitesse dépendante de la phase",
    "es": "Velocidad dependiente de la fase",
    "eu": "Fasearen araberako abiadura"
  },
  "参数后验": {
    "en": "Parameter posteriors",
    "fr": "Distributions a posteriori des paramètres",
    "es": "Distribuciones posteriores de parámetros",
    "eu": "Parametroen a posterioriko banaketak"
  },
  "原文方法需酵母适配；不能预先保证能估计酵母分裂速度。": {
    "en": "The original method requires yeast adaptation; estimating yeast division speed cannot be guaranteed in advance.",
    "fr": "La méthode originale nécessite une adaptation à la levure ; l’estimation de sa vitesse de division n’est pas garantie à l’avance.",
    "es": "El método original requiere adaptación a levadura; no se puede garantizar de antemano estimar su velocidad de división.",
    "eu": "Jatorrizko metodoak legamiarako egokitzapena behar du; ezin da aldez aurretik bermatu legamiaren zatiketa-abiadura estimatzea."
  },
  "没有时间标定时应报告模型相对速度及不确定性，不能直接称代时。": {
    "en": "Without time calibration, report model-relative speeds and uncertainty; do not call them generation times.",
    "fr": "Sans étalonnage temporel, rapporter des vitesses relatives du modèle et leur incertitude, pas des temps de génération.",
    "es": "Sin calibración temporal, informar velocidades relativas del modelo e incertidumbre, no tiempos de generación.",
    "eu": "Denbora-kalibraziorik gabe, eman ereduaren abiadura erlatiboak eta ziurgabetasuna; ez deitu belaunaldi-denbora."
  },
  "周期先验": {
    "en": "Cycle prior",
    "fr": "A priori du cycle",
    "es": "Prior del ciclo",
    "eu": "Zikloaren a priori banaketa"
  },
  "使用酵母RNA周期证据重建，不能用哺乳动物默认": {
    "en": "Rebuild from yeast RNA-cycle evidence; do not use mammalian defaults.",
    "fr": "Reconstruire avec des données du cycle ARN de levure ; ne pas utiliser les valeurs par défaut de mammifères.",
    "es": "Reconstruir con evidencia del ciclo de ARN de levadura; no usar valores predeterminados de mamíferos.",
    "eu": "Berreraiki legamiaren RNA zikloaren ebidentziarekin; ez erabili ugaztunen lehenespenak."
  },
  "周期拟合与动力学先验": {
    "en": "Cycle fitting and kinetic priors",
    "fr": "Ajustement du cycle et a priori cinétiques",
    "es": "Ajuste del ciclo y priors cinéticos",
    "eu": "Ziklo-doikuntza eta a priori banaketa zinetikoak"
  },
  "按教程配置并做先验敏感性分析": {
    "en": "Configure as documented and analyze sensitivity to priors.",
    "fr": "Configurer selon le tutoriel et analyser la sensibilité aux a priori.",
    "es": "Configurar según el tutorial y analizar sensibilidad a los priors.",
    "eu": "Konfiguratu tutorialaren arabera eta aztertu a priori banaketekiko sentikortasuna."
  },
  "剪接数据支持": {
    "en": "Splicing-data support",
    "fr": "Support des données d’épissage",
    "es": "Respaldo de datos de empalme",
    "eu": "Splicing-datuen euskarria"
  },
  "检查基因覆盖及参考偏差": {
    "en": "Check gene coverage and reference bias.",
    "fr": "Vérifier la couverture des gènes et le biais de référence.",
    "es": "Comprobar cobertura génica y sesgo de referencia.",
    "eu": "Egiaztatu gene-estaldura eta erreferentzia-alborapena."
  },
  "独立酵母周期参考投影": {
    "en": "Independent yeast cycle reference projection",
    "fr": "Projection de référence indépendante du cycle de levure",
    "es": "Proyección de referencia independiente del ciclo de levadura",
    "eu": "Legamiaren zikloaren erreferentzia-proiekzio independentea"
  },
  "连续相位": {
    "en": "Continuous phase",
    "fr": "Phase continue",
    "es": "Fase continua",
    "eu": "Fase jarraitua"
  },
  "环状一致性诊断": {
    "en": "Circular consistency diagnostics",
    "fr": "Diagnostics de cohérence circulaire",
    "es": "Diagnósticos de coherencia circular",
    "eu": "Koherentzia zirkularraren diagnostikoak"
  },
  "不能直接套用默认小鼠神经球参考或其相位—阶段边界。": {
    "en": "Do not directly use the default mouse neurosphere reference or its phase-to-stage boundaries.",
    "fr": "Ne pas appliquer directement la référence par défaut des neurosphères murines ni ses limites phase–stade.",
    "es": "No aplicar directamente la referencia predeterminada de neuroesferas de ratón ni sus límites fase–etapa.",
    "eu": "Ez erabili zuzenean saguaren neurosferen erreferentzia lehenetsia edo haren fase–etapa mugak."
  },
  "圆周坐标必须用环状统计；相位角不是绝对时间。": {
    "en": "Circular coordinates require circular statistics; phase angles are not absolute time.",
    "fr": "Les coordonnées circulaires exigent des statistiques circulaires ; l’angle de phase n’est pas un temps absolu.",
    "es": "Las coordenadas circulares requieren estadística circular; el ángulo de fase no es tiempo absoluto.",
    "eu": "Koordenatu zirkularrek estatistika zirkularra behar dute; fase-angelua ez da denbora absolutua."
  },
  "自定义参考投影矩阵": {
    "en": "Custom reference projection matrix",
    "fr": "Matrice de projection de référence personnalisée",
    "es": "Matriz de proyección de referencia personalizada",
    "eu": "Erreferentzia-proiekzio matrize pertsonalizatua"
  },
  "需建立和验证酵母参考；默认参考为小鼠": {
    "en": "Build and validate a yeast reference; the default is mouse.",
    "fr": "Construire et valider une référence de levure ; celle par défaut est murine.",
    "es": "Construir y validar una referencia de levadura; la predeterminada es de ratón.",
    "eu": "Eraiki eta baliozkotu legamiaren erreferentzia; lehenetsia saguarena da."
  },
  "输出相位空间": {
    "en": "Output phase space",
    "fr": "Espace de phase de sortie",
    "es": "Espacio de fase de salida",
    "eu": "Irteerako fase-espazioa"
  },
  "保留原空间和参考版本": {
    "en": "Retain the original space and reference version.",
    "fr": "Conserver l’espace original et la version de référence.",
    "es": "Conservar el espacio original y la versión de referencia.",
    "eu": "Mantendu jatorrizko espazioa eta erreferentziaren bertsioa."
  },
  "特征对应": {
    "en": "Feature correspondence",
    "fr": "Correspondance des variables",
    "es": "Correspondencia de características",
    "eu": "Ezaugarrien korrespondentzia"
  },
  "统一系统ID并量化参考覆盖": {
    "en": "Harmonize systematic IDs and quantify reference coverage.",
    "fr": "Harmoniser les identifiants systématiques et quantifier la couverture de référence.",
    "es": "Armonizar identificadores sistemáticos y cuantificar cobertura de referencia.",
    "eu": "Bateratu identifikatzaile sistematikoak eta kuantifikatu erreferentzia-estaldura."
  },
  "高维/预嵌入空间": {
    "en": "High-dimensional / pre-embedding space",
    "fr": "Espace de grande dimension / avant projection",
    "es": "Espacio de alta dimensión / previo a la representación",
    "eu": "Dimentsio handiko / irudikapen aurreko espazioa"
  },
  "候选t-SNE/UMAP配置": {
    "en": "Candidate t-SNE/UMAP configurations",
    "fr": "Configurations candidates t-SNE/UMAP",
    "es": "Configuraciones candidatas t-SNE/UMAP",
    "eu": "t-SNE/UMAP konfigurazio hautagaiak"
  },
  "逐细胞可靠性": {
    "en": "Per-cell reliability",
    "fr": "Fiabilité par cellule",
    "es": "Fiabilidad por célula",
    "eu": "Zelula bakoitzeko fidagarritasuna"
  },
  "可疑展示比例": {
    "en": "Fraction of suspect visualizations",
    "fr": "Proportion de placements visuels suspects",
    "es": "Proporción de posiciones visuales sospechosas",
    "eu": "Irudikapen susmagarrien proportzioa"
  },
  "展示不可靠不能直接等同细胞质量差，不据此删除细胞。": {
    "en": "An unreliable visualization does not imply poor cell quality; do not remove cells on that basis.",
    "fr": "Une représentation peu fiable n’implique pas une mauvaise qualité cellulaire ; ne pas supprimer les cellules sur cette base.",
    "es": "Una representación poco fiable no implica mala calidad celular; no eliminar células por ese motivo.",
    "eu": "Irudikapen fidagaitzak ez du zelula-kalitate txarra esan nahi; ez ezabatu zelulak arrazoi horregatik."
  },
  "二维近邻可靠性不验证生物学标签，也不使二维距离成为分子噪音度量。": {
    "en": "Reliable 2D neighborhoods do not validate biological labels or make 2D distance a molecular-noise metric.",
    "fr": "La fiabilité des voisinages 2D ne valide pas les étiquettes biologiques ni ne transforme la distance 2D en mesure du bruit moléculaire.",
    "es": "La fiabilidad de vecindarios 2D no valida etiquetas biológicas ni convierte la distancia 2D en una métrica de ruido molecular.",
    "eu": "2D auzotasun fidagarriek ez dituzte etiketa biologikoak baliozkotzen, ezta 2D distantzia zarata molekularraren metrika bihurtzen ere."
  },
  "比较用预嵌入空间": {
    "en": "Pre-embedding space for comparison",
    "fr": "Espace avant projection pour comparaison",
    "es": "Espacio previo a la representación para comparar",
    "eu": "Konparaziorako irudikapen aurreko espazioa"
  },
  "明确PCA维数或输入表达空间": {
    "en": "Specify the PCA dimensions or input expression space.",
    "fr": "Préciser les dimensions PCA ou l’espace d’expression d’entrée.",
    "es": "Especificar dimensiones PCA o el espacio de expresión de entrada.",
    "eu": "Zehaztu PCA dimentsioak edo sarrerako adierazpen-espazioa."
  },
  "展示算法和参数": {
    "en": "Visualization algorithm and parameters",
    "fr": "Algorithme et paramètres de visualisation",
    "es": "Algoritmo y parámetros de visualización",
    "eu": "Bistaratzeko algoritmoa eta parametroak"
  },
  "扫描有依据候选并记录稳定性": {
    "en": "Scan justified candidates and record stability.",
    "fr": "Explorer des candidats justifiés et consigner leur stabilité.",
    "es": "Explorar candidatos justificados y registrar estabilidad.",
    "eu": "Aztertu hautagai justifikatuak eta erregistratu egonkortasuna."
  },
  "置换或重复结果": {
    "en": "Permutation or repeated-run results",
    "fr": "Résultats des permutations ou répétitions",
    "es": "Resultados de permutaciones o ejecuciones repetidas",
    "eu": "Permutazioen edo exekuzio errepikatuen emaitzak"
  },
  "依版本入口保存可重用结果": {
    "en": "Save reusable results using the version-specific entrypoint.",
    "fr": "Conserver des résultats réutilisables avec le point d’entrée de la version.",
    "es": "Guardar resultados reutilizables mediante la entrada de la versión.",
    "eu": "Gorde emaitza berrerabilgarriak bertsioaren sarrera-puntuarekin."
  },
  "单细胞表达": {
    "en": "Single-cell expression",
    "fr": "Expression unicellulaire",
    "es": "Expresión unicelular",
    "eu": "Zelula bakarreko adierazpena"
  },
  "可解释的低维空间": {
    "en": "Interpretable low-dimensional space",
    "fr": "Espace de faible dimension interprétable",
    "es": "Espacio de baja dimensión interpretable",
    "eu": "Dimentsio txikiko espazio interpretagarria"
  },
  "metacell分配": {
    "en": "Metacell assignments",
    "fr": "Attributions aux métacellules",
    "es": "Asignaciones de metacélulas",
    "eu": "Metazelula-esleipenak"
  },
  "聚合表达": {
    "en": "Aggregated expression",
    "fr": "Expression agrégée",
    "es": "Expresión agregada",
    "eu": "Adierazpen agregatua"
  },
  "纯度和紧致度": {
    "en": "Purity and compactness",
    "fr": "Pureté et compacité",
    "es": "Pureza y compacidad",
    "eu": "Purutasuna eta trinkotasuna"
  },
  "聚合会压低原始细胞间变异；不能用metacell方差作为主要表达噪音。": {
    "en": "Aggregation reduces original between-cell variation; metacell variance must not be the primary expression-noise measure.",
    "fr": "L’agrégation réduit la variabilité initiale entre cellules ; la variance des métacellules ne doit pas servir de mesure principale du bruit d’expression.",
    "es": "La agregación reduce la variación original entre células; la varianza de metacélulas no debe ser la medida principal de ruido de expresión.",
    "eu": "Agregazioak jatorrizko zelulen arteko aldakortasuna murrizten du; metazelulen bariantza ez da adierazpen-zarataren neurri nagusia izan behar."
  },
  "可辅助网络/状态描述，原始单细胞计数和归属必须保留。": {
    "en": "Can support network/state descriptions; retain original single-cell counts and assignments.",
    "fr": "Peut aider à décrire les réseaux ou états ; conserver les comptages unicellulaires originaux et les attributions.",
    "es": "Puede apoyar la descripción de redes o estados; conservar los recuentos unicelulares originales y sus asignaciones.",
    "eu": "Sareen edo egoeren deskribapenean lagun dezake; mantendu jatorrizko zelula bakarreko zenbaketak eta esleipenak."
  },
  "聚合状态数": {
    "en": "Number of aggregate states",
    "fr": "Nombre d’états agrégés",
    "es": "Número de estados agregados",
    "eu": "Agregatutako egoeren kopurua"
  },
  "依据细胞数、状态分辨率及纯度诊断选择": {
    "en": "Choose using cell numbers, state resolution and purity diagnostics.",
    "fr": "Choisir selon le nombre de cellules, la résolution des états et les diagnostics de pureté.",
    "es": "Elegir según el número de células, la resolución de estados y los diagnósticos de pureza.",
    "eu": "Hautatu zelula kopuruaren, egoera-bereizmenaren eta purutasun-diagnostikoen arabera."
  },
  "构图表示": {
    "en": "Representation for graph construction",
    "fr": "Représentation pour construire le graphe",
    "es": "Representación para construir el grafo",
    "eu": "Grafoa eraikitzeko irudikapena"
  },
  "避免技术批次主导": {
    "en": "Avoid domination by technical batches.",
    "fr": "Éviter la domination des lots techniques.",
    "es": "Evitar el predominio de lotes técnicos.",
    "eu": "Saihestu lote teknikoen nagusitasuna."
  },
  "聚合范围": {
    "en": "Aggregation scope",
    "fr": "Périmètre d’agrégation",
    "es": "Ámbito de agregación",
    "eu": "Agregazio-eremua"
  },
  "保留菌株/培养标签，避免跨独立样本混合": {
    "en": "Retain strain/culture labels and avoid mixing independent samples.",
    "fr": "Conserver les étiquettes souche/culture et éviter de mélanger des échantillons indépendants.",
    "es": "Conservar etiquetas de cepa/cultivo y evitar mezclar muestras independientes.",
    "eu": "Mantendu andui/kultura etiketak eta saihestu lagin independenteak nahastea."
  },
  "按已列输入、酵母限制和实际样本设计判断；不是数据已齐全或流程已运行的声明。": {
    "en": "Judge from the listed inputs, yeast limitations and actual sample design; this does not claim data completeness or workflow execution.",
    "fr": "Évaluer selon les entrées listées, les limites chez la levure et le plan réel ; cela ne signifie pas que les données sont complètes ou le workflow exécuté.",
    "es": "Evaluar según las entradas indicadas, las limitaciones en levadura y el diseño real; no implica que los datos estén completos ni el flujo ejecutado.",
    "eu": "Ebaluatu zerrendatutako sarreren, legamiaren mugen eta benetako lagin-diseinuaren arabera; horrek ez du esan nahi datuak osorik daudenik edo lan-fluxua exekutatu denik."
  },
  "需在酵母基因ID、样本设计和留出数据上适配与验证。": {
    "en": "Adapt yeast gene IDs and sample design, then validate on held-out data.",
    "fr": "Adapter les identifiants des gènes de levure et le plan d’échantillonnage, puis valider sur des données réservées.",
    "es": "Adaptar identificadores génicos de levadura y diseño muestral, y validar con datos reservados.",
    "eu": "Egokitu legamiaren gene-identifikatzaileak eta lagin-diseinua, eta baliozkotu gordetako datuetan."
  },
  "原始人类词表/权重未验证支持1011酵母直接推理。": {
    "en": "Original human vocabularies and weights are not validated for direct inference on 1011 yeast.",
    "fr": "Les vocabulaires et poids humains d’origine ne sont pas validés pour une inférence directe sur les levures 1011.",
    "es": "Los vocabularios y pesos humanos originales no están validados para inferencia directa en levaduras 1011.",
    "eu": "Jatorrizko giza hiztegiak eta pisuak ez daude baliozkotuta 1011 legamietan inferentzia zuzena egiteko."
  },
  "原始人类词表及训练分布不支持直接转用酵母。": {
    "en": "The original human vocabulary and training distribution do not support direct transfer to yeast.",
    "fr": "Le vocabulaire humain original et la distribution d’entraînement ne permettent pas un transfert direct à la levure.",
    "es": "El vocabulario humano original y la distribución de entrenamiento no permiten una transferencia directa a levadura.",
    "eu": "Jatorrizko giza hiztegiak eta entrenamendu-banaketak ez dute legamiara zuzenean transferitzea ahalbidetzen."
  },
  "此处常规cis/trans回归入口不直接拟合亲缘随机效应；可选kinship用于结构审计，不能宣称已像LMM一样控制亲缘。": {
    "en": "The standard cis/trans regression entrypoint here does not directly fit a kinship random effect. Optional kinship supports structure auditing; it does not establish LMM-style relatedness control.",
    "fr": "Le point d’entrée de régression cis/trans standard ne modélise pas directement un effet aléatoire de parenté. La parenté facultative sert à examiner la structure, sans établir un contrôle équivalent à un LMM.",
    "es": "La entrada estándar de regresión cis/trans no ajusta directamente un efecto aleatorio de parentesco. El parentesco opcional permite revisar la estructura, pero no demuestra un control equivalente a un LMM.",
    "eu": "Hemengo cis/trans erregresio estandarraren sarrerak ez du zuzenean ahaidetasunaren ausazko efekturik doitzen. Aukerako ahaidetasunak egitura aztertzen laguntzen du; ez du LMM baten moduko ahaidetasun-kontrola bermatzen."
  },
  "RSS分支：协调的关联统计量及变异×变异LD": {
    "en": "RSS branch: harmonized association statistics and variant × variant LD",
    "fr": "Branche RSS : statistiques d’association harmonisées et LD variant × variant",
    "es": "Rama RSS: estadísticas de asociación armonizadas y LD variante × variante",
    "eu": "RSS adarra: elkarketa-estatistika bateratuak eta aldaera × aldaera LD"
  },
  "个体水平替代分支：匹配的基因型、性状和协变量处理": {
    "en": "Alternative individual-level branch: matched genotypes, traits and covariate handling",
    "fr": "Branche alternative au niveau individuel : génotypes et caractères appariés, avec traitement des covariables",
    "es": "Rama alternativa a nivel individual: genotipos y rasgos emparejados, con tratamiento de covariables",
    "eu": "Banako-mailako adar alternatiboa: genotipo eta ezaugarri parekatuak, eta kobariatuen tratamendua"
  },
  "RSS分支需变异LD，个体水平分支使用基因型/性状；不得以样本亲缘矩阵代替LD。": {
    "en": "RSS requires variant LD, whereas the individual-level branch uses genotypes/traits; a sample kinship matrix cannot replace LD.",
    "fr": "RSS exige le LD entre variants, tandis que la branche individuelle utilise génotypes/caractères ; une matrice de parenté des échantillons ne remplace pas le LD.",
    "es": "RSS requiere LD entre variantes, mientras que la rama individual usa genotipos/rasgos; una matriz de parentesco de muestras no sustituye el LD.",
    "eu": "RSSk aldaeren LD behar du; banako-mailako adarrak genotipoak/ezaugarriak erabiltzen ditu. Laginen ahaidetasun-matrizeak ezin du LD ordezkatu."
  },
  "变异×变异相关矩阵": {
    "en": "Variant × variant correlation matrix",
    "fr": "Matrice de corrélation variant × variant",
    "es": "Matriz de correlación variante × variante",
    "eu": "Aldaera × aldaera korrelazio-matrizea"
  },
  "RSS分支按实际分析群体、变异顺序和等位方向匹配；样本×样本亲缘矩阵不能替代": {
    "en": "For RSS, match the analyzed population, variant order and allele orientation; a sample × sample kinship matrix is not a substitute.",
    "fr": "Pour RSS, faire correspondre la population analysée, l’ordre des variants et l’orientation des allèles ; une matrice de parenté échantillon × échantillon ne convient pas.",
    "es": "Para RSS, hacer coincidir población analizada, orden de variantes y orientación alélica; una matriz de parentesco muestra × muestra no es un sustituto.",
    "eu": "RSSrako, parekatu aztertutako populazioa, aldaeren ordena eta aleloen orientazioa; lagin × lagin ahaidetasun-matrizea ez da ordezko egokia."
  },
  "关联统计量与样本量": {
    "en": "Association statistics and sample size",
    "fr": "Statistiques d’association et taille d’échantillon",
    "es": "Estadísticas de asociación y tamaño muestral",
    "eu": "Elkarketa-estatistikak eta lagin-tamaina"
  },
  "使用同一关联分析的效应、标准误或z值；记录样本量与协变量处理": {
    "en": "Use effects, standard errors or z scores from the same association analysis; record sample size and covariate handling.",
    "fr": "Utiliser les effets, erreurs standards ou scores z de la même analyse d’association ; documenter la taille d’échantillon et le traitement des covariables.",
    "es": "Usar efectos, errores estándar o valores z del mismo análisis de asociación; registrar tamaño muestral y tratamiento de covariables.",
    "eu": "Erabili elkarketa-analisi bereko efektuak, errore estandarrak edo z balioak; erregistratu lagin-tamaina eta kobariatuen tratamendua."
  },
  "这里预检默认summary/RSS分支；个体水平susie(X,y)使用另一组输入。LD是变异间相关，亲缘是样本间相关，两者不可互换。": {
    "en": "Preflight here defaults to the summary/RSS branch; individual-level susie(X,y) uses different inputs. LD describes correlation among variants; kinship describes relatedness among samples. They are not interchangeable.",
    "fr": "La vérification préalable utilise ici la branche summary/RSS ; susie(X,y) au niveau individuel utilise d’autres entrées. Le LD décrit les corrélations entre variants, la parenté les relations entre échantillons ; ils ne sont pas interchangeables.",
    "es": "La revisión previa usa por defecto la rama summary/RSS; susie(X,y) a nivel individual usa otras entradas. El LD describe correlación entre variantes y el parentesco relaciones entre muestras; no son intercambiables.",
    "eu": "Aurretiko egiaztapenak summary/RSS adarra erabiltzen du hemen; banako-mailako susie(X,y) funtzioak beste sarrera batzuk ditu. LD aldaeren arteko korrelazioa da, eta ahaidetasuna laginen arteko erlazioa; ezin dira trukatu."
  },
  "coloc.abf的单因果假设分支不强制LD；coloc.susie分支须为每个性状提供匹配的变异LD。": {
    "en": "The coloc.abf branch assuming one causal variant does not require LD; coloc.susie requires matched variant LD for each trait.",
    "fr": "La branche coloc.abf supposant un seul variant causal n’exige pas de LD ; coloc.susie requiert un LD adapté entre variants pour chaque caractère.",
    "es": "La rama coloc.abf que asume una sola variante causal no exige LD; coloc.susie requiere LD entre variantes adecuado para cada rasgo.",
    "eu": "Aldaera kausal bakarra suposatzen duen coloc.abf adarrak ez du LD behar; coloc.susie adarrak ezaugarri bakoitzerako aldaeren LD parekatua behar du."
  },
  "关联输入必须包含可协调的暴露和结局效应、标准误与工具变量选择依据；需要LD处理时使用匹配酵母参考，不能用样本亲缘矩阵或默认人类面板替代。": {
    "en": "Association inputs must include harmonizable exposure and outcome effects, standard errors and the rationale for instrument selection. When LD handling is needed, use a matched yeast reference, not sample kinship or a default human panel.",
    "fr": "Les entrées doivent inclure des effets exposition/résultat harmonisables, leurs erreurs standards et la justification du choix des instruments. Si le LD est nécessaire, utiliser une référence de levure adaptée, pas une matrice de parenté ni un panel humain par défaut.",
    "es": "Las entradas deben incluir efectos de exposición y resultado armonizables, errores estándar y la justificación de selección de instrumentos. Si se necesita LD, usar una referencia de levadura adecuada, no parentesco entre muestras ni un panel humano predeterminado.",
    "eu": "Sarrerek esposizioaren eta emaitzaren efektu bateragarriak, errore estandarrak eta tresna-aldagaiak hautatzeko oinarria izan behar dituzte. LD tratatu behar bada, erabili legamiaren erreferentzia parekatua, ez laginen ahaidetasuna edo giza panel lehenetsia."
  }
}
// DATA_END
);
