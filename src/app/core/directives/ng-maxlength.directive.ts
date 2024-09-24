import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Platform } from '@ionic/angular';
// import stringLength from 'string-length';

@Directive({
  selector: '[ngMaxlength]'
})
export class NgMaxlengthDirective {

  @Input('ngMaxlength') ngMaxlength: any;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  constructor(public platform: Platform) { }

  @HostListener('keyup', ['$event']) onKeyup(event) {
    const element = event.target as HTMLInputElement;
    const limit = +this.ngMaxlength;
    const value = element.value;
    console.log(value, this.ngMaxlength);

    const count = [...new Intl.Segmenter().segment(value)].map(x => x.segment)
    if (count?.length < limit) {
      element.value = value;
    } else {
      element.value = count.slice(0, limit).join('');
    }
    this.ngModelChange.emit(element.value);
  }

  @HostListener('focusout', ['$event']) onBlur(event: any) {
    const element = event.target as HTMLInputElement;
    const limit = +this.ngMaxlength;
    const value = element.value;
    const count = [...new Intl.Segmenter().segment(value)].map(x => x.segment)
    if (count?.length < limit) {
      element.value = value;
    } else {
      element.value = count.slice(0, limit).join('');
    }
    this.ngModelChange.emit(element.value);
  }


}