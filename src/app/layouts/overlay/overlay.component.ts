import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss'
})
export class OverlayComponent {
  @Input() isTransparent = false;
  @Output() closeOverlay: EventEmitter<void> = new EventEmitter<void>();

  close() {
    this.closeOverlay.emit();
  }
}
