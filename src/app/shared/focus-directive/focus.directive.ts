import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appFocus]',
  standalone: true,
})
export class FocusDirective implements OnChanges {
  @Input() appFocus = false;

  constructor(private element: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appFocus'] && this.appFocus) {
      // setTimeout(..., 0) ne signifie pas "attendre 0 millisecondes" ;
      // cela signifie "ajoute cette tâche après toutes les tâches actuelles".
      // Il est utile ici pour garantir que le focus est appliqué seulement une fois que la modale est visible dans le DOM.
      setTimeout(() => {
        this.element.nativeElement.focus();
      }, 0);
    }
  }
}
