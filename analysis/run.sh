#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
action="${1:-help}"
if (($#)); then shift; fi
config_file="${YV_CONFIG:-config.yaml}"
case "$action" in
  init)
    python workflow/scripts/qc.py init
    ;;
  check)
    python workflow/scripts/qc.py validate --config "$config_file" "$@"
    ;;
  test)
    python -m unittest discover -s tests -v
    ;;
  dry-run|local|slurm|envs)
    python workflow/scripts/qc.py validate --config "$config_file"
    args=(--snakefile workflow/Snakefile --configfile "$config_file" --rerun-incomplete --printshellcmds)
    if [[ "$action" == dry-run ]]; then
      exec snakemake "${args[@]}" --dry-run "$@"
    elif [[ "$action" == slurm ]]; then
      python workflow/scripts/qc.py validate-slurm --profile profiles/slurm/config.yaml
      exec snakemake "${args[@]}" --profile profiles/slurm "$@"
    elif [[ "$action" == envs ]]; then
      exec snakemake "${args[@]}" --software-deployment-method conda --conda-create-envs-only --cores 1 "$@"
    else
      exec snakemake "${args[@]}" --software-deployment-method conda "$@"
    fi
    ;;
  *)
    printf '%s\n' 'YeastVar1011 raw FASTQ QC' \
      'bash run.sh init | check | test' \
      'bash run.sh dry-run --cores 8' \
      'bash run.sh envs' \
      'bash run.sh local --cores 8' \
      'bash run.sh slurm --jobs 20' \
      'Use YV_CONFIG=your.yaml for another configuration. All relative paths start here.'
    ;;
esac
