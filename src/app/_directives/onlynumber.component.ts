
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumber {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;

    this._el.nativeElement.value = initalValue.replace(/[^1-9]*/, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}


