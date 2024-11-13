import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayComponent } from '../../layouts/overlay/overlay.component';

@Component({
  selector: 'app-menu-button',
  standalone: true,
  imports: [CommonModule, OverlayComponent],
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss',
})
export class MenuButtonComponent {
  @Input() isOpened = false;
  @Output() isOpenedChange = new EventEmitter<boolean>();

  toggleButton() {
    this.isOpened = !this.isOpened;
    this.isOpenedChange.emit(this.isOpened);
  }


}
