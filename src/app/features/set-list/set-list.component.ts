import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayComponent } from '../../layouts/overlay/overlay.component';
import { loadJson } from './set-list.utils';
import {
  addFileDate,
  extractTitle,
  saveAsJsonFile,
} from '../../core/services/save-file/save-file.utils';
import { InputFileComponent } from '../../shared/input-file/input-file.component';
import { MenuButtonComponent } from '../../shared/menu-button/menu-button.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FocusDirective } from '../../shared/focus-directive/focus.directive';
import { Song, isSongList } from '../../core/model/song.model';
import { htmlToPdf } from './pdf.utils';

@Component({
  selector: 'app-set-list',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    FocusDirective,
    OverlayComponent,
    InputFileComponent,
    MenuButtonComponent,
    ModalComponent,
  ],
  templateUrl: './set-list.component.html',
  styleUrl: './set-list.component.scss',
})
export class SetListComponent {
  isVisibleRenderView = false;
  displayMenu = false;

  setListTitle = '';

  @ViewChild('setlist') setListElmt!: ElementRef<HTMLButtonElement>;

  private dndSongIndexKey = 'song';
  dropZoneId: number | null = null;
  draggedId: number | null = null;
  dragLeaveInitial = false;
  dragFromPool = false;

  songList: Song[] = [];
  fullSongPool: Song[] = [];
  displayedSongPool: Song[] = this.fullSongPool;
  isFilteredSongPool = false;

  // html2CanvasOverflowFix = false;

  emptySong: Song = {
    name: '',
  };
  editedSongId = '';
  editedSong: Song = this.emptySong;
  isVisibleSongDetails = false;
  isUpdate = false;

  sendAllToListButton() {
    this.songList = [...this.fullSongPool];
    this.updateDisplayedSongPool();
  }

  deleteSonButton() {
    const currentSongIndex = this.fullSongPool.findIndex(
      (song) => song.name === this.editedSongId
    );

    if (currentSongIndex === -1) {
      console.error(
        'cannot deleteSonButton cannot find edited song in full song pool'
      );
      return;
    }

    if (
      !confirm(
        `You are about to delete the song:\n"${this.editedSongId}".\n\nPlease confirm.`
      )
    ) {
      return;
    }

    this.fullSongPool.splice(currentSongIndex, 1);
    this.updateDisplayedSongPool();
    this.closeSongDetails();
  }

  createSongButton() {
    const currentSongIndex = this.fullSongPool.findIndex(
      (song) => song.name === this.editedSong.name
    );

    // if song does not already exist
    if (currentSongIndex === -1) {
      this.fullSongPool.push(this.editedSong);
      this.updateDisplayedSongPool();
      this.closeSongDetails();
    } else {
      console.error('cannot createSongButton, song already exists');
    }
  }

  updateSongButton() {
    const currentSongIndex = this.fullSongPool.findIndex(
      (song) => song.name === this.editedSongId
    );

    if (currentSongIndex >= 0) {
      this.fullSongPool.splice(currentSongIndex, 1, this.editedSong);
      this.updateDisplayedSongPool();
    } else {
      console.error(
        'cannot updateSongButton cannot find edited song in full song pool'
      );
    }
    this.closeSongDetails();
  }

  addSongButton() {
    this.editedSong = { ...this.emptySong };
    this.isUpdate = false;
    this.isVisibleSongDetails = true;
  }

  editSongButton(song: Song) {
    this.editedSong = song;
    this.editedSongId = song.name;
    this.isUpdate = true;
    this.isVisibleSongDetails = true;
  }

  closeSongDetails() {
    this.isVisibleSongDetails = false;
  }

  updateDisplayedSongPool() {
    this.sortSongPool();
    if (this.isFilteredSongPool) {
      this.displayedSongPool = this.fullSongPool.filter(
        (song) => !this.songList.some((s) => s.name === song.name)
      );
    } else {
      this.displayedSongPool = this.fullSongPool;
    }
  }

  unfilterSongPool() {
    this.isFilteredSongPool = false;
    this.updateDisplayedSongPool();
  }

  filterSongPool() {
    this.isFilteredSongPool = true;
    this.updateDisplayedSongPool();
  }

  sortSongPool() {
    const sortSongByName = (a: Song, b: Song) =>
      a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' });
    this.fullSongPool.sort(sortSongByName);
  }

  deleteSongPool() {
    this.displayMenu = false;
    this.fullSongPool.length = 0;
    this.updateDisplayedSongPool();
  }

  saveSongPool() {
    this.displayMenu = false;
    saveAsJsonFile(this.fullSongPool, 'song-pool');
  }

  loadSongPool(files: File[]) {
    this.displayMenu = false;
    const firstFile = files?.[0];
    loadJson(firstFile).subscribe((jsonObject) => {
      if (isSongList(jsonObject)) {
        this.fullSongPool = jsonObject;

        // let the user remove possible duplicates manually to avoid losing data

        this.updateDisplayedSongPool();
      } else {
        console.error(
          'Erreur lors de la lecture du fichier JSON, données invalides',
          jsonObject
        );
      }
    });
  }

  deleteSetList() {
    this.displayMenu = false;
    this.songList.length = 0;
    this.updateDisplayedSongPool();
  }

  saveSetList() {
    this.displayMenu = false;
    saveAsJsonFile(this.songList, this.setListTitle);
  }

  loadSetList(files: File[]) {
    this.displayMenu = false;
    console.log('loadSetList');

    const firstFile = files?.[0];
    const fileName = firstFile.name;
    const title = extractTitle(fileName);

    loadJson(firstFile).subscribe((jsonObject) => {
      if (isSongList(jsonObject)) {
        this.setListTitle = title;
        this.songList = jsonObject;
        this.updateDisplayedSongPool();
      } else {
        console.error(
          'Erreur lors de la lecture du fichier JSON, données invalides',
          jsonObject
        );
      }
    });
  }

  openRenderView() {
    this.displayMenu = false;
    this.isVisibleRenderView = true;
  }

  closeRenderView() {
    this.isVisibleRenderView = false;
  }

  public generatePDF(): void {
    // hack to bypass overflow issue: cloe
    const clone = this.setListElmt.nativeElement.cloneNode(true) as HTMLElement;
    clone.style.height = 'auto';
    clone.style.overflowY = 'visible';
    clone.style.maxHeight = 'none';
    clone.style.position = 'absolute'; // Positionnement pour éviter de perturber la mise en page

    const secondChild = clone.children[1] as HTMLElement;
    if (secondChild) {
      secondChild.style.overflowY = 'visible';
    }

    // Ajout du clone au DOM, en dehors de la zone visible
    document.body.appendChild(clone);
    htmlToPdf(clone, addFileDate(this.setListTitle));
    document.body.removeChild(clone);
  }

  log(): string {
    return `dragFromPool:${this.dragFromPool} draggedId:${this.draggedId} dropZoneId:${this.dropZoneId}`;
  }

  onDragStartPool(event: DragEvent, index: number) {
    this.draggedId = index;
    this.dragFromPool = true;
    console.debug(`onDragStartPool - ${this.log()}`);
    // event.dataTransfer?.setData('text', 'Données à transférer');
    event.dataTransfer?.setData(this.dndSongIndexKey, index.toString());
    // event.dataTransfer!.effectAllowed = 'copy'; // Définir le type d'opération
    event.dataTransfer!.effectAllowed = 'move'; // Définir le type d'opération
    // event.dataTransfer!.effectAllowed = 'link'; // Définir le type d'opération
    // event.dataTransfer!.effectAllowed = 'none'; // Définir le type d'opération
  }

  onDragStart(event: DragEvent, index: number) {
    this.draggedId = index;
    console.debug(`onDragStart - ${this.log()}`);
    // event.dataTransfer?.setData('text', 'Données à transférer');
    event.dataTransfer?.setData(this.dndSongIndexKey, index.toString());
    // event.dataTransfer!.effectAllowed = 'copy'; // Définir le type d'opération
    event.dataTransfer!.effectAllowed = 'move'; // Définir le type d'opération
    // event.dataTransfer!.effectAllowed = 'link'; // Définir le type d'opération
    // event.dataTransfer!.effectAllowed = 'none'; // Définir le type d'opération
  }

  onDragOver(event: DragEvent, id: number) {
    console.debug(`onDragOver - ${this.log()}`);
    event.preventDefault(); // Nécessaire pour autoriser le drop
    // event.dataTransfer!.dropEffect = 'copy'; // Indiquer visuellement que le drop est autorisé
    event.dataTransfer!.dropEffect = 'move'; // Indiquer visuellement que le drop est autorisé
    // event.dataTransfer!.dropEffect = 'link'; // Indiquer visuellement que le drop est autorisé
    // event.dataTransfer!.dropEffect = 'none'; // Indiquer visuellement que le drop est autorisé
    this.dropZoneId = id;
  }

  onDragOverPool(event: DragEvent) {
    console.debug(`onDragOverPool - ${this.log()}`);
    event.preventDefault(); // Nécessaire pour autoriser le drop
    event.dataTransfer!.dropEffect = 'move'; // Indiquer visuellement que le drop est autorisé
  }

  onDragLeave(event: DragEvent, id: number) {
    console.debug('onDragLeave', event, id);
    this.dragLeaveInitial = true;
  }

  onDrop(event: DragEvent, dropIndex: number) {
    console.debug(`onDrop - ${this.log()}`);
    event.preventDefault(); // Annuler le comportement par défaut (ouvrir un lien, etc.)

    const draggedIndexString = event.dataTransfer?.getData(
      this.dndSongIndexKey
    );
    if (!draggedIndexString) {
      console.error(`Cannot drop, wrong song index: ${draggedIndexString}`);
      return;
    }
    const draggedIndex = Number(draggedIndexString);

    if (this.dragFromPool) {
      const draggedItem = this.displayedSongPool[draggedIndex];
      // this.displayedSongPool.splice(draggedIndex, 1); // Retirer l'élément de son ancienne position
      this.songList.splice(dropIndex, 0, draggedItem); // Insérer l'élément à sa nouvelle position
      this.updateDisplayedSongPool();
    } else {
      if (draggedIndex !== dropIndex) {
        // Réorganisation des éléments dans le tableau
        const draggedItem = this.songList[draggedIndex];
        this.songList.splice(draggedIndex, 1); // Retirer l'élément de son ancienne position
        this.songList.splice(dropIndex, 0, draggedItem); // Insérer l'élément à sa nouvelle position
      } else {
        console.log('item dropped at the same place');
      }
    }
  }

  onDropPool(event: DragEvent) {
    console.debug(`onDropPool - ${this.log()}`);
    event.preventDefault(); // Annuler le comportement par défaut (ouvrir un lien, etc.)

    const draggedIndexString = event.dataTransfer?.getData(
      this.dndSongIndexKey
    );
    if (!draggedIndexString) {
      return;
    }
    if (this.dragFromPool) {
      console.log('drag from pool into pool forbidden');
      return;
    } else {
      const draggedIndex = Number(draggedIndexString);

      // Réorganisation des éléments dans le tableau
      const draggedItem = this.songList[draggedIndex];
      this.songList.splice(draggedIndex, 1); // Retirer l'élément de son ancienne position
      // should already be in song pool

      if (!this.fullSongPool.some((song) => song.name === draggedItem.name)) {
        this.fullSongPool.push(draggedItem); // Insérer l'élément à sa nouvelle position
      }
      this.updateDisplayedSongPool();
    }
  }

  onDragEnd(event: DragEvent) {
    console.debug(`onDragEnd - ${this.log()}`);
    event.preventDefault();
    this.dropZoneId = null;
    this.draggedId = null;
    this.dragLeaveInitial = false;
    this.dragFromPool = false;
  }
}
