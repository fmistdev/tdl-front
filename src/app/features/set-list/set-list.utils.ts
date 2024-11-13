import { from, Observable } from 'rxjs';

export function loadJson(file: File): Observable<object> {
  return from(
    new Promise<object>((resolve, reject) => {
      if (!file) {
        reject('Cannot load song pool, no file selected');
      }

      if (file.type !== 'application/json') {
        reject('Cannot load song pool from file, should be a json file');
      }

      console.log(`load file "${file.name}"`);

      const lecteur = new FileReader();
      lecteur.onload = function (event: ProgressEvent<FileReader>) {
        const fileLoadResult = event.target?.result as string;
        try {
          const jsonObject = JSON.parse(fileLoadResult);
          resolve(jsonObject);
        } catch (error) {
          reject(error);
        }
      };
      // Lire le fichier comme une chaîne
      lecteur.readAsText(file);
    })
  );
}
