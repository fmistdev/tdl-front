#!/bin/bash

# need inkscape for svg -> png
# sudo apt install onkscape
# need imagemagick (convert) pngs -> ico
# sudo apt install imagemagick

# Vérifier si un fichier SVG a été spécifié
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <SVG_FILE>"
  exit 1
fi

# Fichier SVG source
SVG_FILE="$1"

# Vérifier si le fichier existe
if [ ! -f "$SVG_FILE" ]; then
  echo "Error: File '$SVG_FILE' not found!"
  exit 1
fi

# Dossier de sortie
OUTPUT_DIR="icons"
mkdir -p "$OUTPUT_DIR"

# Liste des tailles d'icônes à générer

SIZES=(48 72 96 128 144 152 192 384 512)

# Boucle pour générer chaque taille
for SIZE in "${SIZES[@]}"; do
  OUTPUT_FILE="${OUTPUT_DIR}/icon-${SIZE}x${SIZE}.png"
  echo "Generating $OUTPUT_FILE..."
  inkscape --export-png="$OUTPUT_FILE" --export-width="$SIZE" --export-height="$SIZE" "$SVG_FILE"
done

echo "All icons have been generated in the '$OUTPUT_DIR' folder."



# favicon ------------------------------

# Dossier de sortie
OUTPUT_DIR="favicon"
mkdir -p "$OUTPUT_DIR"

SIZES=(16 32 48 64 128 256)

# Boucle pour générer chaque taille
for SIZE in "${SIZES[@]}"; do
  OUTPUT_FILE="${OUTPUT_DIR}/icon-${SIZE}x${SIZE}.png"
  echo "Generating $OUTPUT_FILE..."
  inkscape --export-png="$OUTPUT_FILE" --export-width="$SIZE" --export-height="$SIZE" "$SVG_FILE"
done

echo "All icons have been generated in the '$OUTPUT_DIR' folder."

cd $OUTPUT_DIR

convert icon-16x16.png icon-32x32.png icon-48x48.png icon-64x64.png icon-128x128.png icon-256x256.png favicon.ico



