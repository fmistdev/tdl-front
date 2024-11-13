import { ElementRef } from '@angular/core';
import { FocusDirective } from './focus.directive';

describe('FocusDirective', () => {
  it('should create an instance', () => {
    const directive = new FocusDirective({} as ElementRef);
    expect(directive).toBeTruthy();
  });
});
