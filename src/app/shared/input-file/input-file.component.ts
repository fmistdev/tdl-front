import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
})
export class InputFileComponent {
  uniqueId: string;

  @Input() accept = '';
  @Output() inputFileChange = new EventEmitter<File[]>();

  constructor() {
    // in case there are multiple file input component on the same page
    this.uniqueId = 'file-upload-' + Math.random().toString(36).substring(2, 9);
  }

  inputChange(event: Event): void {
    // it could be slow to access the file, it is common to chrome and firefox, so might be a windows issue
    // console.log('inputChange');
    const inputFileElmt = event.target as HTMLInputElement;
    const files = Array.from(inputFileElmt.files || []);
    this.inputFileChange.emit(files);
  }
}
