import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare var NDEFReader: any; // ✅ Éviter l'erreur TypeScript

@Injectable({
  providedIn: 'root'
})
export class NfcService {

  constructor() {}

  startNfcScan(): Observable<string> {
    return new Observable<string>((observer) => {
      if (!('NDEFReader' in window)) {
        observer.error("⚠️ Web NFC non supporté sur ce navigateur.");
        return;
      }

      const ndef = new NDEFReader();
      ndef.scan().then(() => {
        console.log("🔹 Scan NFC lancé !");
        
        ndef.onreading = (event: any) => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            const data = decoder.decode(record.data);
            observer.next(data); // ✅ Émettre les données NFC
          }
        };
      }).catch((error: any) => observer.error(`❌ Erreur NFC : ${error}`));

      // Gestion de l'annulation du scan si `unsubscribe()` est appelé
      return () => {
        console.log("🛑 Scan NFC arrêté.");
        ndef.onreading = null;
      };
    });
  }
}
