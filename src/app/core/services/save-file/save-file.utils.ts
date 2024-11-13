import { Observable, from, map, throwError } from 'rxjs';

const mimeTypeMap: Record<string, string> = {
  json: 'application/json',
  md: 'text/markdown',
};

export function saveAsFile(
  fileContent: string,
  fileName: string,
  extension: string
) {
  if (!(extension in mimeTypeMap)) {
    console.error(`Unsupported file extension: ${extension}`);
    return;
  }

  const mimeType = mimeTypeMap[extension];

  // Créer un blob avec les données JSON
  const blob = new Blob([fileContent], { type: mimeType });

  // Créer une URL pour le blob
  const url = URL.createObjectURL(blob);

  // Créer un élément <a> pour déclencher le téléchargement
  const a = document.createElement('a');
  a.href = url;

  a.download = `${addFileDate(fileName)}.${extension}`; // Nom du fichier à sauvegarder

  // Ajouter l'élément <a> au DOM et simuler un clic
  document.body.appendChild(a);
  a.click();

  // Retirer l'élément <a> du DOM
  document.body.removeChild(a);

  // Libérer l'URL du blob
  URL.revokeObjectURL(url);
}

export function saveAsMarkdownFile(fileContent: string, fileName: string) {
  saveAsFile(fileContent, fileName, 'md');
}

export function saveAsJsonFile(object: object, fileName: string) {
  // Convertir le tableau d'objets en chaîne JSON
  const jsonDataString = JSON.stringify(object, null, 2);

  saveAsFile(jsonDataString, fileName, 'json');
}

export function addFileDate(title: string) {
  return `${fileDate()}_${title}`;
}

function fileDate(): string {
  // Obtenir la date dans le format local
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Utilise le format 24 heures
  };

  // Convertir en chaîne locale
  const parts = new Date().toLocaleString('fr-FR', options).split(' ');

  // Les parties de la date et de l'heure
  const datePart = parts[0]; // "DD/MM/YYYY"
  const timePart = parts[1]; // "HH:mm"

  // Convertir la date au format "YYYY-MM-DD"
  const [day, month, year] = datePart.split('/'); // Récupérer le jour, le mois, l'année
  const formattedDate = `${year}-${month}-${day}`; // Formater au format "YYYY-MM-DD"

  // Remplacer ":" par "h"
  const formattedTime = timePart.replace(':', 'h');

  // Construire la chaîne finale
  return `${formattedDate}-${formattedTime}`;
}

export function extractTitle(fileName: string) {
  const match = fileName.match(/_(.*)\.json$/);
  return match ? match[1] : fileName;
}

export function loadFile(file: File): Observable<string> {
  return from(
    new Promise<string>((resolve, reject) => {
      if (!file) {
        reject('Cannot file, no file selected');
      }

      const lecteur = new FileReader();
      lecteur.onload = function (event: ProgressEvent<FileReader>) {
        const fileLoadResult = event.target?.result;
        const fileString = fileLoadResult ? String(fileLoadResult) : '';
        resolve(fileString);
      };
      console.log(`load file "${file.name}"`);
      // Lire le fichier comme une chaîne
      lecteur.readAsText(file);
    })
  );
}

export function loadJson(file: File): Observable<object> {
  if (file.type !== 'application/json') {
    return throwError(
      () => new Error('Cannot load json file, wrong Mime type')
    );
  }

  return loadFile(file).pipe(
    map((fileString) => {
      const jsonObject = JSON.parse(fileString);
      return jsonObject;
    })
  );
}
