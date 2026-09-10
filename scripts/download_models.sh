#!/usr/bin/env bash
# download_models.sh — Pull models into the Ollama container volume
set -euo pipefail

MODELS=("llama3" "mistral")

echo "Waiting for Ollama model server to be ready…"
until curl -sf http://localhost:11434/ > /dev/null; do
  sleep 2
done

for MODEL in "${MODELS[@]}"; do
  echo "Pulling model: $MODEL"
  docker exec max-model ollama pull "$MODEL"
done

echo "All models downloaded successfully."
