"""Write analysis variants from verified guide IDs and the registered catalogue."""
import json,subprocess
from pathlib import Path
from importlib.util import spec_from_file_location,module_from_spec
ROOT=Path(__file__).resolve().parents[1]
spec=spec_from_file_location('ev30',ROOT/'research/add-evolution-catalogue-v30.py');m=module_from_spec(spec);spec.loader.exec_module(m)
L=m.L
def req(id,label,url):return {'id':id,'label':label,'sourceUrl':url}
def main():
    js="const fs=require('fs'),vm=require('vm');const c={window:{},document:{addEventListener(){}}};for(const f of ['dist/evolution-population-v30-data.js','dist/evolution-catalogue-v29.js'])vm.runInNewContext(fs.readFileSync(f,'utf8'),c);process.stdout.write(JSON.stringify(c.window.YV_EVOLUTION_CATALOGUE.records()));"
    guides=json.loads(subprocess.check_output(['node','-e',js],cwd=ROOT,text=True,encoding='utf-8'))
    projects=m.load(ROOT/'dist/data/projects.json');w=m.load(ROOT/'dist/data/workflow.json');tm={x['id']:x for x in w['tools']}
    model=req('model_specification',L('模型文件、先验、生成器与拟合程序的版本／路径','Version/path of model files, priors, generator and fitting program','Version/chemin du modèle, des a priori, du générateur et du programme','Versión/ruta de modelo, priors, generador y programa de ajuste','Eredu, aurretiko, sortzaile eta doikuntza-programaren bertsioa/bidea'),'https://mc-stan.org/docs/stan-users-guide/simulation-based-calibration.html')
    align=req('audited_dna_alignment',L('DNA 比对路径、位点筛选、倍性与参考版本','DNA alignment path, site filters, ploidy and reference version','Alignement ADN, filtres de sites, ploïdie et référence','Alineamiento ADN, filtros de sitios, ploidía y referencia','DNA lerrokatze-bidea, gune-iragazkiak, ploidia eta erreferentzia'),'https://iqtree.github.io/doc/Command-Reference')
    dates=req('time_calibration',L('独立时间／速率校准、时钟模型与先验记录','Independent time/rate calibration, clock model and prior record','Calibration temps/taux indépendante, horloge et a priori','Calibración independiente de tiempo/tasa, reloj y priors','Denbora/tasa kalibrazio independentea, erlojua eta aurretikoak'),'https://www.beast2.org/tutorials/')
    scenario=req('evolution_observation_model',L('群体历史、生活史、重组与 RNA 观测模型脚本','Demography, life history, recombination and RNA-observation model script','Script de démographie, cycle de vie, recombinaison et observation ARN','Script de demografía, ciclo vital, recombinación y observación ARN','Demografia, bizi-ziklo, birkonbinazio eta RNA behaketa-ereduaren scripta'),'https://tskit.dev/msprime/docs/stable/intro.html')
    env=req('matched_environments',L('同菌株跨环境与培养重复的配对设计表','Paired design of the same strains across environments and cultures','Plan apparié des mêmes souches, environnements et cultures','Diseño pareado de cepas, ambientes y cultivos','Andui berberak ingurune eta kultiboetan parekatzeko diseinua'),'https://paulbuerkner.com/brms/articles/brms_phylogenetics.html')
    kernels=req('maf_ld_kernel_audit',L('各 GRM 的 MAF／LD 权重、变异集合、尺度与相关性审计','MAF/LD weights, variants, scale and correlations of each GRM','Poids MAF/LD, variants, échelle et corrélations des GRM','Pesos MAF/LD, variantes, escala y correlaciones de cada GRM','GRM bakoitzaren MAF/LD pisuen, aldaeren, eskalaren eta korrelazioen auditoria'),'https://yanglab.westlake.edu.cn/software/gcta/')
    diploid=req('diploid_additive_dominance_design',L('二倍体及杂合支持；K_A／K_D 的定义、尺度与可辨识性','Diploid/heterozygote support; K_A/K_D definitions, scale and identifiability','Support diploïde/hétérozygote ; définitions, échelle et identifiabilité de K_A/K_D','Soporte diploide/heterocigoto; definición, escala e identificabilidad de K_A/K_D','Diploide/heterozigotoen sostengua; K_A/K_D definizioak, eskala eta identifikagarritasuna'),'https://yanglab.westlake.edu.cn/software/gcta/')
    sv=req('sv_cnv_pav_dosage',L('实测 SV／CNV／PAV、拷贝数／倍性和基因可比对性记录','Observed SV/CNV/PAV, copy number/ploidy and gene mappability records','SV/CNV/PAV mesurés, copies/ploïdie et alignabilité des gènes','SV/CNV/PAV observados, copias/ploidía y mapeabilidad génica','Behatutako SV/CNV/PAV, kopia/ploidia eta gene-mapagarritasunaren erregistroak'),'https://doi.org/10.1038/s41586-025-09637-0')
    trios=req('matched_parent_hybrid_trios',L('亲本—F1 配对、等位相位、共同环境与状态支持记录','Matched parent–F1 pairs, allelic phase, common environment and state support','Parents–F1 appariés, phase allélique, environnement commun et états','Pares padres–F1, fase alélica, ambiente común y estados','Guraso–F1 parekatuak, alelo-fasea, ingurune komuna eta egoeren sostengua'),'https://doi.org/10.1016/j.xgen.2023.100459')
    neutral=req('neutral_demography_design',L('独立群体分组、中性人口史参数与过滤／抽样匹配方案','Independent population groups, neutral demography and matched filtering/sampling','Groupes indépendants, démographie neutre et filtrage/échantillonnage apparié','Grupos independientes, demografía neutral y filtrado/muestreo equivalente','Populazio-talde independenteak, demografia neutroa eta iragazte/laginketa parekatua'),'https://tskit.dev/msprime/docs/stable/intro.html')
    # card -> variants: id, label, tool IDs, metric IDs, required inputs, branch choices, extra requirements
    defs={
      'bayes_noise':[('basics','BASiCS',['basics'],['noise_dispersion','noise_interval'],['count_matrix','sample_metadata'],{},[])],
      'measurement_error':[('independent','MCMCglmm',['mcmcglmm'],['posterior_sampling_diagnostics'],['qtl_traits','sample_metadata'],{'mcmcglmm':'independent'},[]),('genomic','brms · K',['brms'],['posterior_sampling_diagnostics'],['qtl_traits','sample_metadata','kinship'],{'brms':'kinship'},[])],
      'posterior_checks':[('stan_sbc','Stan + SBC',['stan','sbc'],['posterior_sampling_diagnostics'],['truth_or_simulation','sample_metadata'],{},[model])],
      'genomic_variance':[('genomic','brms · K',['brms'],['noise_heritability','posterior_sampling_diagnostics'],['qtl_traits','sample_metadata','kinship'],{'brms':'kinship'},[])],
      'tree_variance':[('tree','brms · C',['brms'],['posterior_sampling_diagnostics'],['qtl_traits','sample_metadata','phylogeny'],{'brms':'phylogeny'},[])],
      'ml_tree':[('iqtree','IQ-TREE 3',['iqtree3'],['evolution_tree_support'],['genotypes','sample_metadata'],{},[align]),('raxml','RAxML-NG',['raxmlng'],['evolution_tree_support'],['genotypes','sample_metadata'],{},[align])],
      'bayesian_tree':[('beast','BEAST 2',['beast2'],['evolution_tree_support','posterior_sampling_diagnostics'],['genotypes','sample_metadata'],{},[align,dates]),('revbayes','RevBayes',['revbayes'],['evolution_tree_support','posterior_sampling_diagnostics'],['genotypes','sample_metadata'],{'revbayes':'sequence_tree'},[align,dates,model])],
      'tree_atlas':[('ggtree','ggtree',['ggtree'],[],['phylogeny','sample_metadata','qtl_traits'],{},[]),('ete','ETE 4',['ete4'],[],['phylogeny','sample_metadata','qtl_traits'],{},[])],
      'phylogenetic_signal':[('phytools','phytools 2',['phytools2'],['noise_phylogenetic_signal'],['qtl_traits','phylogeny','sample_metadata'],{},[])],
      'ancestral_states':[('phytools','phytools 2',['phytools2'],['evolution_ancestral_uncertainty'],['qtl_traits','phylogeny','sample_metadata'],{},[]),('revbayes','RevBayes',['revbayes'],['evolution_ancestral_uncertainty','posterior_sampling_diagnostics'],['qtl_traits','phylogeny','sample_metadata'],{'revbayes':'trait_evolution'},[model])],
      'bm_ou':[('mvmorph','mvMORPH',['mvmorph'],['evolution_trait_model_comparison'],['qtl_traits','phylogeny','sample_metadata'],{},[]),('revbayes','RevBayes',['revbayes'],['evolution_trait_model_comparison','posterior_sampling_diagnostics'],['qtl_traits','phylogeny','sample_metadata'],{'revbayes':'trait_evolution'},[model])],
      'mean_noise_traits':[('genomic','brms · K',['brms'],['qtl_effect_uncertainty'],['qtl_traits','kinship','sample_metadata'],{'brms':'kinship'},[]),('tree','brms · C',['brms'],['qtl_effect_uncertainty'],['qtl_traits','phylogeny','sample_metadata'],{'brms':'phylogeny'},[])],
      'plasticity_convergence':[('reaction_norm','brms · K',['brms'],['noise_reaction_norm'],['qtl_traits','kinship','sample_metadata','culture_replicates'],{'brms':'kinship'},[env]),('phylogenetic','brms · C',['brms'],['noise_reaction_norm'],['qtl_traits','phylogeny','sample_metadata','culture_replicates'],{'brms':'phylogeny'},[env])],
      'population_scenarios':[('forward','SLiM 5',['slim5'],['evolution_prediction_validation'],['truth_or_simulation','sample_metadata'],{},[scenario]),('ancestry','msprime',['msprime'],['evolution_prediction_validation'],['truth_or_simulation','sample_metadata'],{},[scenario])],
      'h2_architecture_sensitivity':[('comparison','GCTA + brms',['gcta','brms'],['h2_architecture_sensitivity','posterior_sampling_diagnostics'],['qtl_traits','genotypes','kinship','sample_metadata'],{'brms':'kinship'},[kernels])],
      'dominance_noise_partition':[('additive_dominance','GCTA + brms',['gcta','brms'],['dominance_variance_components'],['qtl_traits','genotypes','kinship','sample_metadata'],{'brms':'kinship'},[diploid])],
      'structural_dosage_noise':[('dosage','brms · K',['brms'],['structural_dosage_effects'],['qtl_traits','genotypes','kinship','sample_metadata'],{'brms':'kinship'},[sv])],
      'cis_trans_noise_trios':[('trios','edgeR + scDALI + memento',['edger','scdali','memento'],['cis_trans_noise_contrasts'],['count_matrix','variant_counts','genotypes','sample_metadata','culture_replicates'],{'scdali':'audited_allelic_counts'},[trios])],
      'drift_calibrated_noise_divergence':[('neutral','msprime + brms',['msprime','brms'],['noise_neutral_divergence'],['qtl_traits','genotypes','kinship','sample_metadata','truth_or_simulation'],{'brms':'kinship'},[scenario,neutral])]
    }
    assert set(defs)=={r['id'] for r in guides}, (set(defs)-{r['id'] for r in guides},{r['id'] for r in guides}-set(defs))
    entries=[]
    for guide in guides:
        variants=[]
        for vid,label,tools,metrics,inputs,branches,extra in defs[guide['id']]:
            for tid in tools:assert tid in tm,tid
            title={k:label for k in m.LANGS}
            recipe={'id':'evolution:'+guide['id'],'version':1,'title':guide['title'],'variantId':vid,'projectIds':[],
                'contextProjectIds':guide['routeIds'],'toolIds':tools,'metricIds':metrics,'methodOptionIds':[],
                'toolBranches':branches,'requiredData':inputs,'additionalRequirements':extra,
                'sourceUrls':list(dict.fromkeys(guide['sourceUrls']+[u for tid in tools for u in tm[tid]['sourceUrls']])),
                'executionStatus':'planning_only'}
            notes=L('此配置指定分析模型；输入需按所列设计和误差尺度核对，运行后保存诊断。','This specification defines the analysis model; check inputs against its design and error scale and retain runtime diagnostics.','Cette configuration définit le modèle ; vérifiez plan et échelle d’erreur, puis conservez les diagnostics.','Esta configuración define el modelo; revise diseño y escala de error y guarde diagnósticos.','Zehaztapen honek analisi-eredua definitzen du; egiaztatu diseinua eta errore-eskala eta gorde diagnostikoak.')
            entrypoint=None; expression=None
            if guide['id']=='ancestral_states' and vid=='phytools':
                expression='Ancestral trait under BM, conditional on tree and trait scale'
                entrypoint='ancestral <- phytools::fastAnc(tree, named_noise_trait, vars=TRUE, CI=TRUE)'
                notes=L('fastAnc 使用 BM 假设；区间条件于输入树与性状，性状误差和替代树另做敏感性分析。','fastAnc assumes BM; intervals condition on the supplied tree and trait, with separate sensitivity analyses for trait error and alternative trees.','fastAnc suppose BM ; les intervalles dépendent de l’arbre et du caractère, avec sensibilité séparée aux erreurs et autres arbres.','fastAnc asume BM; los intervalos dependen del árbol y rasgo, con sensibilidad aparte a errores y árboles alternativos.','fastAnc-ek BM suposatzen du; tarteak emandako zuhaitz eta ezaugarriaren baldintzakoak dira, errore eta ordezko zuhaitzen sentikortasuna bereiz aztertuta.')
            if guide['id']=='mean_noise_traits':
                expression='Cov(u_mean, u_noise) = G_12 A; r_g = G_12 / sqrt(G_11 G_22)'
                entrypoint='f_mean <- brms::bf(mean_trait | se(mean_se, sigma=TRUE) ~ batch + (1 | shared | gr(strain_id, cov=A)))\nf_noise <- brms::bf(noise_trait | se(noise_se, sigma=TRUE) ~ batch + (1 | shared | gr(strain_id, cov=A)))\nfit <- brms::brm(f_mean + f_noise + brms::set_rescor(FALSE), data=traits, data2=list(A=A_checked), prior=reviewed_multivariate_priors)'
                notes=L('共享分组标识估计两个性状的遗传协方差；同源均值与噪音的相关抽样误差需联合观测模型或经校准的近似。','The shared grouping ID estimates genetic covariance between traits; correlated sampling error of mean and noise requires a joint observation model or a calibrated approximation.','Le groupe partagé estime la covariance génétique ; l’erreur corrélée de moyenne et bruit exige un modèle conjoint ou une approximation calibrée.','El grupo compartido estima covarianza genética; el error correlacionado de media y ruido requiere modelo conjunto o aproximación calibrada.','Partekatutako talde-IDak ezaugarrien kobariantza genetikoa estimatzen du; batezbesteko eta zarataren errore korrelatuak behaketa-eredu bateratua edo hurbilketa kalibratua behar du.')
            if guide['id']=='dominance_noise_partition':
                expression='V = sigma_A^2 Z K_A Z^T + sigma_D^2 Z K_D Z^T + sigma_e^2 I + S'
                entrypoint='traits$strain_A <- traits$strain_id\ntraits$strain_D <- traits$strain_id\nfit <- brms::brm(estimate | se(sampling_se,sigma=TRUE) ~ mean_covariate + batch + (1|gr(strain_A,cov=KA)) + (1|gr(strain_D,cov=KD)), data=traits, data2=list(KA=additive_K,KD=dominance_K), prior=reviewed_AD_priors)\n# Comparator: gcta64 --mgrm <KA_KD_PREFIX_LIST> --pheno <TRAITS> --reml --out <PREFIX>'
            if guide['id']=='structural_dosage_noise':
                expression='noise ~ DNA_feature + ploidy + mean + batch + genomic random effect'
                entrypoint='fit <- brms::brm(estimate | se(sampling_se,sigma=TRUE) ~ dna_feature + ploidy + mean_covariate + batch + (1|gr(strain_id,cov=K)), data=traits, data2=list(K=kinship_K), prior=reviewed_priors)\n# Fit a matched conditional model with the predefined local-SNP terms.'
            if guide['id']=='plasticity_convergence':
                expression='noise ~ environment + mean + batch + correlated strain intercept/environment slope'
                entrypoint='fit <- brms::brm(estimate | se(sampling_se,sigma=TRUE) ~ environment + mean_covariate + batch + (1+environment|gr(strain_id,cov=A)), data=paired_traits, data2=list(A=A_checked), prior=reviewed_reaction_norm_priors)'
            if guide['id']=='h2_architecture_sensitivity':
                expression='Compare h2, intervals and prediction across prespecified MAF/LD kernels'
                entrypoint='fits <- lapply(audited_kernel_set, function(A) brms::brm(estimate | se(sampling_se,sigma=TRUE) ~ mean_covariate + batch + (1|gr(strain_id,cov=A)), data=traits, data2=list(A=A), prior=reviewed_priors))\n# GCTA comparator: rerun --grm for each audited kernel; --mgrm only for identifiable partitions.'
            if guide['id']=='cis_trans_noise_trios':
                expression='P = parental log2(A/B); H = F1 allelic log2(A/B); cis = H; trans = P-H'
                entrypoint='parent_fit <- edgeR::glmQLFit(parent_dge, parent_design, robust=TRUE)\nhybrid_fit <- edgeR::glmQLFit(hybrid_dge, hybrid_design, robust=TRUE)\nparent_test <- edgeR::glmQLFTest(parent_fit, contrast=parent_contrast)\nhybrid_test <- edgeR::glmQLFTest(hybrid_fit, contrast=hybrid_allelic_contrast)\n# Allelic Hom test: use the selected scDALI tool in its Python environment.\n# Estimate matched mean/variance contrasts with the selected memento workflow; preserve sampling uncertainty.'
                notes=L('P、H 与 P−H 分类均值调控；噪音由独立的分布／矩估计并列比较。等位方差相减不能识别 cis/trans 噪音，scDALI-Hom 检验平均等位失衡。','P, H and P−H classify mean regulation; noise is compared separately using distribution/moment estimates. Subtracting allelic variances does not identify cis/trans noise, and scDALI-Hom tests mean allelic imbalance.','P, H et P−H classent la régulation moyenne ; comparez séparément le bruit par distributions/moments. Soustraire les variances n’identifie pas le bruit cis/trans ; scDALI-Hom teste le déséquilibre moyen.','P, H y P−H clasifican regulación media; compare ruido aparte mediante distribuciones/momentos. Restar varianzas no identifica ruido cis/trans; scDALI-Hom prueba desequilibrio medio.','P, H eta P−H-k batezbesteko erregulazioa sailkatzen dute; alderatu zarata banaketa/momentuen bidez bereiz. Alelo-bariantzak kentzeak ez du cis/trans zarata identifikatzen; scDALI-Hom-ek batezbesteko desoreka probatzen du.')
            if guide['id']=='drift_calibrated_noise_divergence':
                expression='Observed noise-divergence statistic compared with a demography + genetic-trait + RNA-observation null'
                entrypoint='neutral_statistics <- vapply(neutral_replicates, noise_divergence_statistic, numeric(1))\nobserved_statistic <- noise_divergence_statistic(observed_traits)\n# Implement and audit the genetic-trait and RNA-observation generators: msprime alone supplies ancestry/mutations, not RNA noise.'
            if entrypoint:
                recipe['modelSpecification']={'expression':expression,'entrypoint':entrypoint,'notes':notes,'sourceUrls':recipe['sourceUrls']}
            variants.append({'id':vid,'title':title,'recipe':recipe})
        entries.append({'id':guide['id'],'defaultVariant':variants[0]['id'],'variants':variants})
    projects['evolutionRecipes']=entries
    projects['evolutionRecipesVersion']=1
    m.save(ROOT/'dist/data/projects.json',projects)
    print(json.dumps({'analyses':len(entries),'variants':sum(len(x['variants']) for x in entries)}))

if __name__=='__main__':main()
