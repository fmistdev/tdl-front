import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OverlayComponent } from '../../layouts/overlay/overlay.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, OverlayComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() isVisible = false;
  @Output() closeOverlay: EventEmitter<void> = new EventEmitter<void>();

  close() {
    this.closeOverlay.emit();
  }
}
