import { Component, OnDestroy } from '@angular/core';
import { MenuButtonComponent } from '../../shared/menu-button/menu-button.component';
import { InputFileComponent } from '../../shared/input-file/input-file.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {
  loadFile,
  saveAsMarkdownFile,
} from '../../core/services/save-file/save-file.utils';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Note, NoteService } from '../../core/services/note/note.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bloc-note',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    MenuButtonComponent,
    InputFileComponent,
  ],
  templateUrl: './bloc-note.component.html',
  styleUrl: './bloc-note.component.scss',
})
export class BlocNoteComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  note: Note = {
    content: '',
    isSync: true,
  };
  displayMenu = false;

  constructor(private noteService: NoteService) {
    this.noteService
      .getNote()
      .pipe(takeUntil(this.destroy$))
      .subscribe((note) => {
        this.note = note;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  load(files: File[]) {
    this.displayMenu = false;
    const firstFile = files?.[0];
    loadFile(firstFile).subscribe((fileString) => {
      // store note from file
      this.noteService.setNote({
        content: fileString,
        isSync: true,
      });
    });
  }

  save() {
    this.displayMenu = false;
    saveAsMarkdownFile(this.note.content, 'bloc-note');
    this.noteService.setNote({ ...this.note, isSync: true });
  }

  noteChange(content: string) {
    this.noteService.setNote({
      content,
      isSync: false,
    });
  }
}
