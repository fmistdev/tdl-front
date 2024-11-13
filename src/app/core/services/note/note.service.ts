import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Note {
  content: string;
  isSync: boolean;
}

// le local storage assure une memorisation de la note en cas de fermeture du navigateur
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private noteStoreKey = 'note';

  note$ = new BehaviorSubject<Note>({
    content: '',
    isSync: true,
  });

  constructor() {
    this.loadNote();
  }

  private loadNote() {
    const storedNote = localStorage.getItem(this.noteStoreKey);
    const content = storedNote ? storedNote : '';

    const storedNoteSync = localStorage.getItem('noteSync');
    const isSync = storedNoteSync === 'true' ? true : false;

    this.note$.next({
      content,
      isSync,
    });
  }

  getNote(): Observable<Note> {
    return this.note$;
  }

  setNote(note: Note): void {
    localStorage.setItem(this.noteStoreKey, note.content);
    localStorage.setItem('noteSync', String(note.isSync));
    this.loadNote();
  }
}
