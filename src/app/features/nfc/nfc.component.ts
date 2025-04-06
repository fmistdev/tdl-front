import { Component, OnDestroy } from '@angular/core';
import { NfcService } from '../../core/services/nfc/nfc.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nfc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nfc.component.html',
  styleUrl: './nfc.component.scss'
})
export class NfcComponent implements OnDestroy {

  nfcData: (string | null)[] = [];
  private nfcSubscription?: Subscription;

  constructor(private nfcService: NfcService) {}

  scanNfcTag(): void {
    this.nfcSubscription = this.nfcService.startNfcScan().subscribe({
      next: (data) => {
        console.log("✅ NFC reçu :", data);
        this.nfcData.push(data); // Mise à jour du template
      },
      error: (error) => console.error(error),
    });
  }

  stopNfcScan(): void {
    this.nfcSubscription?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.stopNfcScan(); // Nettoyage pour éviter les fuites mémoire
  }
}
