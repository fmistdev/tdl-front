import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UniqueIdService {
  private idCounter = 0;

  generateUniqueId(): string {
    return `${this.idCounter++}`;
  }
}
