"""Register source-linked method recipes and their explicit planning dependencies."""
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DIST=ROOT/'dist'
LANGS=['zh','en','fr','es','eu']
def L(*v): return dict(zip(LANGS,v))
COPY={}
def text(v):
    COPY[v['zh']]={k:v[k] for k in LANGS[1:]}
    return v['zh']
def load(p): return json.loads(p.read_text(encoding='utf-8'))
def save(p,d): p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

SCALE=L('检查性状尺度、菌株顺序、重复结构与估计误差；用匹配设计的模拟检查校准。','Check trait scale, strain order, replication and estimation error; assess calibration with design-matched simulations.','Vérifiez l’échelle, l’ordre des souches, les réplicats et l’erreur d’estimation ; calibrez par simulation adaptée.','Revise escala, orden de cepas, réplicas y error de estimación; calibre con simulaciones del diseño.','Egiaztatu eskala, anduien ordena, erreplikazioa eta estimazio-errorea; kalibratu diseinuari egokitutako simulazioekin.')
MODEL=L('模型文件与运行环境','Model files and runtime','Fichiers du modèle et environnement','Archivos del modelo y entorno','Eredu-fitxategiak eta exekuzio-ingurunea')
CHOICE=L('按研究问题选择模型、参数与种子；保存软件版本和完整调用。','Choose the model, parameters and seed for the question; retain software versions and the complete call.','Choisissez modèle, paramètres et graine selon la question ; conservez versions et appel complet.','Elija modelo, parámetros y semilla según la pregunta; guarde versiones y llamada completa.','Aukeratu eredua, parametroak eta hazia galderaren arabera; gorde bertsioak eta dei osoa.')
NATIVE=L('配套模型、比对或模拟脚本须另行准备；此处保存规划配方。','Prepare the matching model, alignment or simulation script; this record stores a planning recipe.','Préparez le modèle, l’alignement ou le script adapté ; cette fiche conserve la recette de planification.','Prepare el modelo, alineamiento o script correspondiente; esta ficha guarda la receta de planificación.','Prestatu dagokion eredu, lerrokatze edo simulazio-scripta; erregistro honek plangintzako errezeta gordetzen du.')
TREE=L('菌株树及分支单位','Strain tree and branch units','Arbre des souches et unités des branches','Árbol de cepas y unidades de ramas','Andui-zuhaitza eta adar-unitateak')
TREECHECK=L('核对根、末端匹配、分支单位及重组／杂交敏感性；细胞状态轨迹单独分析。','Check rooting, tip matching, branch units and recombination/hybridization sensitivity; analyse cell-state trajectories separately.','Vérifiez racine, correspondances, unités et sensibilité à la recombinaison/hybridation ; analysez séparément les trajectoires cellulaires.','Revise raíz, correspondencias, unidades y sensibilidad a recombinación/hibridación; analice aparte trayectorias celulares.','Egiaztatu erroa, muturren parekatzea, unitateak eta birkonbinazio/hibridazioarekiko sentikortasuna; aztertu zelula-ibilbideak bereiz.')

# Every entrypoint is an official-interface template with study-defined arguments.
TOOLS=[
 ('stan','Stan / CmdStanR / posterior',L('自定义噪音模型的后验抽样与诊断','Posterior sampling and diagnostics for custom noise models','Échantillonnage postérieur et diagnostics des modèles de bruit','Muestreo posterior y diagnóstico de modelos de ruido','Zarata-ereduen laginketa posteriorra eta diagnostikoa'),['validation'],['truth_or_simulation','sample_metadata'],'https://mc-stan.org/cmdstanr/reference/model-method-sample.html','10.18637/jss.v076.i01',
  'model <- cmdstanr::cmdstan_model(stan_file)\nfit <- model$sample(data=model_data, chains=n_chains, parallel_chains=n_parallel, iter_warmup=n_warmup, iter_sampling=n_sampling, seed=recorded_seed)\nfit$summary()\nfit$diagnostic_summary()\nposterior::summarise_draws(fit$draws())',
  'stan_file / model_data / chains / iter_warmup / iter_sampling / seed','CmdStan, cmdstanr, posterior'),
 ('sbc','SBC',L('贝叶斯计算的模拟校准','Simulation calibration of Bayesian computation','Calibration simulée du calcul bayésien','Calibración simulada del cálculo bayesiano','Kalkulu bayestarraren simulazio-kalibrazioa'),['validation'],['truth_or_simulation'],'https://hyunjimoon.github.io/SBC/articles/SBC.html','10.1214/23-BA1404',
  'results <- SBC::compute_SBC(sbc_datasets, fitted_model_backend)\nSBC::plot_rank_hist(results)',
  'SBC_datasets / backend / test quantities / simulation design','R, SBC, model backend'),
 ('mcmcglmm','MCMCglmm',L('含亲缘与测量方差的贝叶斯混合模型','Bayesian mixed models with relatedness and measurement variance','Modèles mixtes bayésiens avec parenté et variance de mesure','Modelos mixtos bayesianos con parentesco y varianza de medida','Ahaidetasun eta neurketa-bariantza dituzten eredu misto bayestarrak'),['genetics'],['qtl_traits','sample_metadata','kinship'],'https://cran.r-project.org/web/packages/MCMCglmm/MCMCglmm.pdf','10.18637/jss.v033.i02',
  'fit <- MCMCglmm::MCMCglmm(fixed=estimate ~ mean_covariate + batch, random=~strain_id, family="gaussian", data=traits, ginverse=list(strain_id=A_inverse), mev=traits$sampling_se^2, prior=reviewed_prior, nitt=n_iterations, burnin=n_burnin, thin=n_thin)',
  'fixed / random / ginverse / mev / prior / nitt / burnin / thin','R, MCMCglmm'),
 ('mvmorph','mvMORPH',L('连续噪音性状的多变量演变模型','Multivariate evolution of continuous noise traits','Évolution multivariée des caractères de bruit','Evolución multivariada de rasgos de ruido','Zarata-ezaugarri jarraituen eboluzio aldagai anitzekoa'),['genetics'],['qtl_traits','sample_metadata','phylogeny'],'https://cran.r-project.org/web/packages/mvMORPH/mvMORPH.pdf','10.1111/2041-210X.12420',
  'bm <- mvMORPH::mvBM(tree, trait_matrix, error=sampling_variance_matrix, model="BM1")\nou <- mvMORPH::mvOU(tree, trait_matrix, error=sampling_variance_matrix, model="OU1")\nmvMORPH::aicw(list(bm,ou), aicc=TRUE)',
  'tree / data / error (sampling variance) / model / optimization','R, mvMORPH'),
 ('iqtree3','IQ-TREE 3',L('基因组序列的最大似然菌株树','Maximum-likelihood strain trees from genomic sequences','Arbres de souches par maximum de vraisemblance','Árboles de cepas por máxima verosimilitud','Andui-zuhaitzak egiantzekotasun handienaz'),['genetics'],['genotypes','sample_metadata'],'https://iqtree.github.io/doc/Command-Reference','10.1093/molbev/msag117',
  'iqtree3 -s <AUDITED_DNA_ALIGNMENT> -m <MODEL_OR_MFP> -B <BOOTSTRAP_REPLICATES> -T <THREADS> -seed <SEED> -pre <OUTPUT_PREFIX>',
  '-s / -m / -B / -T / -seed / -pre','IQ-TREE 3'),
 ('raxmlng','RAxML-NG',L('菌株树的替代最大似然实现','Alternative maximum-likelihood strain-tree inference','Inférence alternative des arbres par maximum de vraisemblance','Inferencia alternativa de árboles por máxima verosimilitud','Andui-zuhaitzen egiantzekotasun bidezko ordezko inferentzia'),['genetics'],['genotypes','sample_metadata'],'https://github.com/amkozlov/raxml-ng/wiki/Tutorial','10.1093/bioinformatics/btz305',
  'raxml-ng --all --msa <AUDITED_DNA_ALIGNMENT> --model <SUBSTITUTION_MODEL> --bs-trees <BOOTSTRAP_REPLICATES> --threads <THREADS> --seed <SEED> --prefix <OUTPUT_PREFIX>',
  '--msa / --model / --bs-trees / --seed / --threads','RAxML-NG'),
 ('beast2','BEAST 2',L('有明确校准的贝叶斯菌株历史模型','Calibrated Bayesian strain-history models','Modèles bayésiens calibrés de l’histoire des souches','Modelos bayesianos calibrados de historia de cepas','Anduien historiaren eredu bayestar kalibratuak'),['genetics'],['genotypes','sample_metadata'],'https://www.beast2.org/tutorials/','10.1371/journal.pcbi.1006650',
  'beast -threads <THREADS> -seed <SEED> <REVIEWED_MODEL_XML>',
  'XML / substitution model / clock / tree prior / calibration / MCMC','BEAST 2, model-specific packages'),
 ('revbayes','RevBayes',L('贝叶斯树与连续性状演变模型','Bayesian trees and continuous-trait evolution','Arbres bayésiens et évolution des caractères continus','Árboles bayesianos y evolución de rasgos continuos','Zuhaitz bayestarrak eta ezaugarri jarraituen eboluzioa'),['genetics'],['qtl_traits','phylogeny','sample_metadata'],'https://revbayes.github.io/tutorials/cont_traits/cont_trait_intro.html','10.1093/sysbio/syw021',
  'rb <REVIEWED_REV_MODEL_SCRIPT>',
  'Rev model / likelihood / priors / monitors / moves / seed','RevBayes'),
 ('ggtree','ggtree',L('菌株树与噪音注释的联合展示','Joint display of strain trees and noise annotations','Affichage conjoint des arbres et annotations de bruit','Visualización conjunta de árboles y anotaciones de ruido','Andui-zuhaitzen eta zarata-oharren bistaratze bateratua'),['genetics'],['phylogeny','sample_metadata','qtl_traits'],'https://yulab-smu.top/treedata-book/','10.1111/2041-210X.12628',
  'library(ggtree)\np <- ggtree(tree) %<+% tip_metadata\np + geom_tippoint(aes(colour=noise_trait))',
  'tree / tip_metadata / trait scale / uncertainty / layout','R, ggtree, ggplot2'),
 ('ete4','ETE 4',L('菌株树的交互检查与注释','Interactive strain-tree inspection and annotation','Inspection interactive et annotation des arbres','Inspección interactiva y anotación de árboles','Andui-zuhaitzen ikuskapen eta ohar interaktiboak'),['genetics'],['phylogeny','sample_metadata'],'https://etetoolkit.github.io/ete/','10.1093/molbev/msw046',
  'from ete4 import Tree\ntree = Tree(open(tree_path).read())\nprint(tree.write())',
  'Newick / parser / node labels / annotation / display backend','Python, ete4; display dependencies by output mode'),
 ('slim5','SLiM 5',L('给定生活史与选择设定的正向演化模拟','Forward evolution under specified life history and selection','Évolution prospective sous cycle de vie et sélection définis','Evolución hacia adelante con ciclo vital y selección definidos','Aurreranzko eboluzioa bizi-ziklo eta hautespen zehaztuekin'),['genetics','validation'],['truth_or_simulation','sample_metadata'],'https://messerlab.org/slim/','10.1093/molbev/msaf313',
  'slim -s <SEED> <REVIEWED_LIFE_HISTORY_MODEL.slim>',
  'life cycle / mutation / recombination / selection / sampling / observation','SLiM 5'),
 ('msprime','msprime',L('中性群体历史、祖先重组与抽样模拟','Neutral demography, ancestral recombination and sampling','Démographie neutre, recombinaison ancestrale et échantillonnage','Demografía neutral, recombinación ancestral y muestreo','Demografia neutroa, arbasoen birkonbinazioa eta laginketa'),['genetics','validation'],['truth_or_simulation','sample_metadata'],'https://tskit.dev/msprime/docs/stable/intro.html','10.1093/genetics/iyab229',
  'import msprime\nancestry = msprime.sim_ancestry(samples=sample_specification, demography=demography, ploidy=declared_ploidy, sequence_length=sequence_length, recombination_rate=recombination_rate, random_seed=recorded_seed)\nmutated = msprime.sim_mutations(ancestry, rate=mutation_rate, random_seed=mutation_seed)',
  'samples / demography / ploidy / recombination_rate / sequence_length / mutation rate','Python, msprime, tskit'),
 ('gcta','GCTA',L('多亲缘矩阵的遗传方差与敏感性对照','Genetic variance and sensitivity across relationship matrices','Variance génétique et sensibilité aux matrices de parenté','Varianza genética y sensibilidad a matrices de parentesco','Bariantza genetikoa eta ahaidetasun-matrizeekiko sentikortasuna'),['genetics'],['qtl_traits','kinship','sample_metadata'],'https://yanglab.westlake.edu.cn/software/gcta/','10.1016/j.ajhg.2010.11.011',
  'gcta64 --grm <AUDITED_GRM_PREFIX> --pheno <STRAIN_TRAITS> --covar <CATEGORICAL_COVARIATES> --qcovar <CONTINUOUS_COVARIATES> --reml --out <OUTPUT_PREFIX>\n# Multiple components: replace --grm with --mgrm <GRM_PREFIX_LIST>\n# Genetic correlation: use --reml-bivar <TRAIT_COLUMN_1> <TRAIT_COLUMN_2>',
  '--grm / --mgrm / --pheno / --covar / --qcovar / --reml / --reml-bivar','GCTA; externally audited yeast GRM')
]

METRICS=[
 ('h2_architecture_sensitivity',L('遗传力对亲缘构建的敏感性','Heritability sensitivity to relationship construction','Sensibilité de l’héritabilité à la parenté','Sensibilidad de heredabilidad a la matriz de parentesco','Heredagarritasunaren sentikortasuna ahaidetasunarekiko'),['gcta','brms'],['qtl_traits','kinship','genotypes','sample_metadata'],['h2_by_kernel','maf_ld_definition','kernel_correlation','component_interval','leave_clade_out_calibration']),
 ('dominance_variance_components',L('加性、显性与非加性方差','Additive, dominance and non-additive variance','Variances additive, de dominance et non additive','Varianzas aditiva, de dominancia y no aditiva','Bariantza gehigarria, dominantziakoa eta ez-gehigarria'),['gcta','brms'],['qtl_traits','kinship','genotypes','sample_metadata'],['additive_variance','dominance_variance','kernel_identifiability','diploid_genotype_support','uncertainty_interval']),
 ('structural_dosage_effects',L('结构变异与剂量的噪音效应','Structural-variant and dosage effects on noise','Effets des variants structuraux et du dosage sur le bruit','Efectos de variantes estructurales y dosis sobre ruido','Egitura-aldaeren eta dosiaren eraginak zaratan'),['brms'],['qtl_traits','kinship','genotypes','sample_metadata'],['sv_cnv_pav_effect','copy_number_ploidy','carrier_count','mapping_observability','snp_conditioned_effect']),
 ('cis_trans_noise_contrasts',L('亲本—杂交体调控对比','Parent–hybrid regulatory contrasts','Contrastes régulateurs parents–hybrides','Contrastes reguladores padres–híbridos','Guraso–hibrido erregulazio-kontrasteak'),['edger','scdali'],['count_matrix','variant_counts','genotypes','sample_metadata','culture_replicates'],['parent_expression_contrast','hybrid_allelic_contrast','cis_trans_mean_contrast','noise_parallel_contrast','allelic_depth_bias']),
 ('noise_neutral_divergence',L('中性校准下的噪音分化','Neutral-calibrated noise divergence','Divergence du bruit calibrée sous neutralité','Divergencia de ruido calibrada bajo neutralidad','Neutraltasunez kalibratutako zarata-dibergentzia'),['msprime','brms'],['qtl_traits','genotypes','kinship','sample_metadata','truth_or_simulation'],['population_noise_contrast','neutral_null_distribution','demography_sensitivity','observation_model_calibration','pst_qst_estimand']),
 ('evolution_tree_support',L('菌株树的支持与不一致性','Strain-tree support and discordance','Support et discordance des arbres','Soporte y discordancia de árboles','Andui-zuhaitzen sostengua eta desadostasuna'),['iqtree3','raxmlng','beast2','revbayes'],['genotypes','sample_metadata'],['alignment_provenance','site_model','branch_support','topology_discordance','recombination_sensitivity']),
 ('evolution_trait_model_comparison',L('噪音性状演变模型比较','Noise-trait evolutionary model comparison','Comparaison des modèles d’évolution du bruit','Comparación de modelos evolutivos de ruido','Zarata-ezaugarrien eboluzio-ereduen konparazioa'),['mvmorph','revbayes'],['qtl_traits','phylogeny','sample_metadata'],['bm_ou_parameters','sampling_error_units','model_weights_or_bayes_factor','prior_sensitivity','tree_sensitivity']),
 ('evolution_ancestral_uncertainty',L('祖先噪音状态与区间','Ancestral noise states and intervals','États ancestraux du bruit et intervalles','Estados ancestrales del ruido e intervalos','Arbasoen zarata-egoerak eta tarteak'),['phytools2','revbayes'],['qtl_traits','phylogeny','sample_metadata'],['ancestral_estimate','conditional_interval','model_assumption','tree_posterior_sensitivity']),
 ('evolution_prediction_validation',L('演化情景与预测校准','Evolution scenarios and predictive calibration','Scénarios évolutifs et calibration prédictive','Escenarios evolutivos y calibración predictiva','Eboluzio-eszenarioak eta iragarpen-kalibrazioa'),['slim5','msprime'],['truth_or_simulation','sample_metadata'],['life_history_parameters','recombination_model','posterior_or_scenario','held_out_unit','predictive_coverage'])
]

def main():
    w=load(DIST/'data/workflow.json'); p=load(DIST/'data/projects.json'); cats=load(DIST/'data/research-categories.json')
    inputmap={x['id']:x for x in cats['dataRequirements']}
    out=L('模型结果、区间与可复核的诊断','Model results, intervals and reproducible diagnostics','Résultats, intervalles et diagnostics reproductibles','Resultados, intervalos y diagnósticos reproducibles','Eredu-emaitzak, tarteak eta diagnostiko erreproduzigarriak')
    for tid,name,task,steps,inputs,url,doi,entry,params,runtime in TOOLS:
        record={'id':tid,'name':name,'task':text(task),'taskEn':task['en'],'steps':steps,'url':url,'paperUrl':'https://doi.org/'+doi,
            'input':[inputmap[x]['title'] for x in inputs]+[text(NATIVE)],'output':[text(out)],'entrypoint':entry,
            'parameters':[{'name':params,'meaning':text(MODEL),'selection':text(CHOICE),'required':True},
                {'name':'runtime / package dependencies','meaning':runtime,'selection':text(NATIVE),'required':True}],
            'limitations':[text(SCALE),text(NATIVE)],'yeastStatus':'条件性','role':'对照',
            'sourceUrls':[url,'https://doi.org/'+doi],'categoryIds':['evolution','genetics','validation'],
            'methodTags':['evolution','noise','planning-recipe'],'applicability':{'level':'conditional','reason':text(SCALE),'reasonEn':SCALE['en'],'requiredData':inputs,'optionalData':[]},
            'sourceKind':'documentation','paperStatus':'verified','documentationStatus':'documentation-linked',
            'sourceLinks':[{'url':url,'kind':'documentation','label':text(L('官方方法文档','Official method documentation','Documentation officielle','Documentación oficial','Metodoaren dokumentazio ofiziala'))},{'url':'https://doi.org/'+doi,'kind':'research_article','label':text(L('方法论文','Method paper','Publication méthodologique','Artículo metodológico','Metodo-artikulua'))}],
            'executionStatus':'recipe_only','addedIn':'v30','versionEvidence':{'version':'official interface documentation','checkedOn':'2026-10-18','source':url,'apiSignatureVerified':True,'biologicalExecution':False,'runtimeInstalled':False}}
        if tid in ['mvmorph','revbayes','ggtree','ete4']: record['limitations'].append(text(TREECHECK))
        if tid=='mvmorph': record['parameters'].append({'name':'error','meaning':'sampling_variance_matrix = sampling_SE^2','selection':text(L('error 输入抽样方差，按树末端与性状列对齐；OU 拟合本身不确定历史选择。','error takes sampling variances aligned to tips and traits; an OU fit alone does not establish historical selection.','error reçoit des variances alignées aux feuilles et caractères ; OU seul ne démontre pas une sélection historique.','error recibe varianzas alineadas con puntas y rasgos; ajustar OU no demuestra selección histórica.','error-ek mutur eta ezaugarriekin lerrokatutako laginketa-bariantzak hartzen ditu; OU doikuntzak ez du hautespen historikoa frogatzen.')),'required':True})
        if tid=='mcmcglmm': record['parameters'].append({'name':'ginverse / mev','meaning':'inverse relationship covariance / sampling variance','selection':text(L('ginverse 使用亲缘协方差的逆；mev 使用同尺度抽样方差。后验 SD 需另行校准。','ginverse takes inverse relationship covariance; mev takes sampling variance on the response scale. Posterior SD requires separate calibration.','ginverse reçoit l’inverse de la covariance ; mev la variance d’échantillonnage sur l’échelle de réponse. Calibrez séparément l’écart-type postérieur.','ginverse recibe la covarianza inversa; mev la varianza de muestreo en la escala de respuesta. Calibre aparte la DE posterior.','ginverse-k ahaidetasun-kobariantzaren alderantzizkoa hartzen du; mev-k erantzun-eskalako laginketa-bariantza. Kalibratu desbideratze posteriorra bereiz.')),'required':True})
        if tid=='mcmcglmm':
            record['entrypoint']='args <- list(fixed=estimate ~ mean_covariate + batch, family="gaussian", data=traits, mev=traits$sampling_se^2, prior=reviewed_prior, nitt=n_iterations, burnin=n_burnin, thin=n_thin)\nif (covariance_mode != "independent") { args$random <- ~strain_id; args$ginverse <- list(strain_id=A_inverse) }\nfit <- do.call(MCMCglmm::MCMCglmm, args)'
            record['applicability']['requiredData']=['qtl_traits','sample_metadata']
            record['input']=[inputmap[x]['title'] for x in ['qtl_traits','sample_metadata']]+[text(NATIVE)]
            record['parameters'].append({'name':'covariance_mode','meaning':text(MODEL),'selection':text(CHOICE),'required':True})
            record['inputContract']={'version':1,'branchRequired':True,'branches':[
                {'id':bid,'title':label,'requiredDataMode':'replace','requiredData':['qtl_traits','sample_metadata']+extra,'parameters':{'covariance_mode':bid},'executionStatus':'recipe_only','enforcement':'declaration_completeness_only',
                 'evidenceRequirements':[{'inputId':'qtl_traits','field':'sampling_se_source','label':L('性状尺度与抽样 SE 来源','Trait scale and sampling-SE source','Échelle et source de l’erreur-type','Escala y fuente del error estándar','Ezaugarri-eskala eta laginketa-SEaren jatorria')}]}
                for bid,label,extra in [('independent',L('独立观测的测量误差回归','Measurement-error regression for independent observations','Régression avec erreur de mesure et observations indépendantes','Regresión con error de medida y observaciones independientes','Behaketa independenteen neurketa-erroreko erregresioa'),[]),('kinship',L('基因组亲缘 K','Genomic kinship K','Parenté génomique K','Parentesco genómico K','K ahaidetasun genomikoa'),['kinship']),('phylogeny',L('菌株树协方差 C','Strain-tree covariance C','Covariance C de l’arbre','Covarianza C del árbol','Andui-zuhaitzaren C kobariantza'),['phylogeny'])]]}
        if tid=='ete4':record['entrypoint']='from ete4 import Tree\ntree = Tree(open(tree_path).read())\nfor leaf in tree:\n    leaf.add_props(**tip_annotations.get(leaf.name, {}))\nprint(tree.write(props=None))\n# Interactive output requires the ETE display environment:\ntree.explore()'
        if tid=='revbayes':
            record['applicability']['requiredData']=['sample_metadata']
            record['parameters'].append({'name':'model_class','meaning':text(MODEL),'selection':text(CHOICE),'required':True})
            record['inputContract']={'version':1,'branchRequired':True,'branches':[
                {'id':bid,'title':label,'requiredDataMode':'replace','requiredData':inputs,'parameters':{'model_class':bid},'evidenceRequirements':[],'executionStatus':'recipe_only','enforcement':'declaration_completeness_only'}
                for bid,label,inputs in [('sequence_tree',L('序列与贝叶斯菌株树','Sequences and Bayesian strain trees','Séquences et arbres bayésiens','Secuencias y árboles bayesianos','Sekuentziak eta andui-zuhaitz bayestarrak'),['genotypes','sample_metadata']),('trait_evolution',L('已有树上的连续性状','Continuous traits on a supplied tree','Caractères continus sur un arbre fourni','Rasgos continuos en un árbol aportado','Emandako zuhaitzeko ezaugarri jarraituak'),['qtl_traits','phylogeny','sample_metadata'])]]}
        if tid=='gcta': record['limitations'].append(text(L('预先审计酵母倍性、MAF/LD 权重和 GRM 尺度；标准 GREML 不直接传播噪音性状的异方差测量误差，须与误差模型或匹配模拟并列。','Audit yeast ploidy, MAF/LD weights and GRM scale first. Standard GREML does not directly propagate heteroskedastic noise-trait measurement error; compare with an error-aware model or matched simulation.','Auditez ploïdie, poids MAF/LD et échelle GRM. GREML standard ne propage pas directement l’erreur hétéroscédastique du bruit ; comparez à un modèle adapté ou une simulation.','Audite ploidía, pesos MAF/LD y escala GRM. GREML estándar no propaga directamente error heterocedástico del ruido; compare con un modelo de error o simulación.','Auditatu ploidia, MAF/LD pisuak eta GRM eskala. GREML estandarrak ez du zarata-ezaugarriaren neurketa-errore heterozedastikoa zuzenean hedatzen; alderatu errore-eredu edo simulazio egoki batekin.')))
        old=next((i for i,x in enumerate(w['tools']) if x['id']==tid),None)
        if old is None:w['tools'].append(record)
        else:w['tools'][old]=record
    scdali=next(t for t in w['tools'] if t['id']=='scdali')
    scdali['inputContract']={'version':1,'branchRequired':True,'branches':[
        {'id':bid,'title':label,'requiredDataMode':'replace','requiredData':inputs,'parameters':{},'executionStatus':'recipe_only','enforcement':'declaration_completeness_only','evidenceRequirements':[{'inputId':'variant_counts','field':'allelic_count_phase_baseline','label':L('等位计数、相位、拷贝基线与偏倚审计来源','Allelic-count, phase, dosage-baseline and bias-audit source','Source des comptages, phase, dosage et audit des biais','Fuente de recuentos, fase, dosis y auditoría de sesgos','Alelo-zenbaketa, fase, dosi-oinarri eta alborapen-auditoriaren jatorria')}]}
        for bid,label,inputs in [('audited_allelic_counts',L('已审计等位计数：同质失衡','Audited allelic counts: homogeneous imbalance','Comptages alléliques audités : déséquilibre homogène','Recuentos alélicos auditados: desequilibrio homogéneo','Alelo-zenbaketa auditatuak: desoreka homogeneoa'),['variant_counts','genotypes','sample_metadata']),('state_allelic_counts',L('已审计等位计数：状态依赖','Audited allelic counts: state dependence','Comptages alléliques audités : dépendance à l’état','Recuentos alélicos auditados: dependencia del estado','Alelo-zenbaketa auditatuak: egoerarekiko mendekotasuna'),['variant_counts','genotypes','sample_metadata','cell_states'])]]}
    sources=['https://doi.org/10.18637/jss.v080.i01','https://yanglab.westlake.edu.cn/software/gcta/']
    for mid,title,tools,inputs,fields in METRICS:
        definition=L('按所选模型保存各字段、估计区间与设计匹配的敏感性结果。','Save model-specific fields, estimation intervals and design-matched sensitivity results.','Conservez champs, intervalles et sensibilités adaptés au modèle et au plan.','Guarde campos, intervalos y sensibilidad adaptados al modelo y diseño.','Gorde ereduari dagozkion eremuak, tarteak eta diseinuari egokitutako sentikortasunak.')
        metric={'id':mid,'stepId':'genetics','name':text(title),'nameEn':title['en'],'definition':text(definition),'definitionEn':definition['en'],
            'unit':text(L('模型定义的单位与区间','Model-defined units and intervals','Unités et intervalles du modèle','Unidades e intervalos del modelo','Ereduak definitutako unitateak eta tarteak')),
            'denominator':text(L('匹配菌株、性状或模拟重复','Matched strains, traits or simulation replicates','Souches, caractères ou simulations appariés','Cepas, rasgos o simulaciones emparejados','Parekatutako andui, ezaugarri edo simulazio-erreplikak')),
            'level':'strain/model','purpose':text(title),'tools':tools,'inputIds':inputs,'fields':fields,'cautions':[text(SCALE)],'sourceUrls':sources,'addedIn':'v30'}
        idx=next((i for i,x in enumerate(w['metrics']) if x['id']==mid),None)
        if idx is None:w['metrics'].append(metric)
        else:w['metrics'][idx]=metric
    # Metric references follow the actual estimator, rather than a generic genetics citation.
    toolmap={x['id']:x for x in w['tools']}
    for metric in w['metrics']:
        if metric.get('addedIn')=='v30':metric['sourceUrls']=list(dict.fromkeys(u for tid in metric['tools'] for u in toolmap[tid].get('sourceUrls',[])))
    # Formula source URLs identify the model identities; their application to a noise trait is explicit.
    formula={'id':'noise_genetic_correlation','name':text(L('均值与噪音性状的遗传相关','Genetic correlation of mean and noise traits','Corrélation génétique entre moyenne et bruit','Correlación genética entre media y ruido','Batezbestekoaren eta zarataren korrelazio genetikoa')),
        'expression':'r_g = G_12 / sqrt(G_11 * G_22)',
        'variables':[{'symbol':'G','meaning':text(L('G 为明确尺度与亲缘模型下的遗传协方差矩阵；方差接近零时，相关估计可能不稳定。','G is the genetic covariance matrix for the declared scale and relationship model; correlations can be unstable when variances approach zero.','G est la covariance génétique sur l’échelle et sous le modèle déclarés ; près de zéro, les corrélations peuvent être instables.','G es la covarianza genética de la escala y modelo declarados; las correlaciones pueden ser inestables cerca de varianzas cero.','G eskala eta ahaidetasun-eredu zehaztuko kobariantza genetikoa da; bariantzak zerotik hurbil direnean korrelazioak ezegonkorrak izan daitezke.'))}],
        'assumptions':[text(SCALE)],
        'purpose':text(L('比较共享遗传变化，并传播两个性状的估计误差。','Compare shared genetic variation while propagating both traits’ estimation error.','Comparez la variation génétique partagée en propageant l’erreur des deux caractères.','Compare variación genética compartida propagando error de ambos rasgos.','Alderatu partekatutako aldakortasun genetikoa bi ezaugarrien errorea hedatuz.')),
        'sourceUrl':'https://www.xzlab.org/software/GEMMAmanual.pdf','sourceUrls':['https://www.xzlab.org/software/GEMMAmanual.pdf','https://yanglab.westlake.edu.cn/software/gcta/'],'addedIn':'v30','definitionStatus':'standard genetic covariance identity; noise-trait application requires calibrated measurement error'}
    if not any(x['id']==formula['id'] for x in w['formulas']):w['formulas'].append(formula)
    else:w['formulas'][next(i for i,x in enumerate(w['formulas']) if x['id']==formula['id'])]=formula
    # Existing records remain untouched, apart from adding compatible new diagnostic tools.
    save(DIST/'data/workflow.json',w)
    (DIST/'evolution-catalogue-locales-v30.js').write_text('window.YV_TEXT=Object.assign(window.YV_TEXT||{},'+json.dumps(COPY,ensure_ascii=False,separators=(',',':'))+');\n',encoding='utf-8')
    print(json.dumps({'tools':len(w['tools']),'metrics':len(w['metrics']),'formulas':len(w['formulas']),'localizedStrings':len(COPY)}))

if __name__=='__main__': main()
