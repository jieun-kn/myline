import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Platform } from '@ionic/angular';

@Directive({
  selector: '[formMaxlength]'
})
export class FormMaxlengthDirective {

  @Input('formMaxlength') formMaxlength: any;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();
  constructor(public platform: Platform, private ngControl: NgControl) { }

  @HostListener('keyup', ['$event']) onKeyup(event) {
    this.handleInput(event);
  }

  @HostListener('focusout', ['$event']) onBlur(event: any) {
    this.handleInput(event);
  }

  handleInput(event: any) {
    const element = event.target as HTMLInputElement;
    const limit = +this.formMaxlength;
    const value = element.value;
    const count = [...new Intl.Segmenter().segment(value)].map(x => x.segment);
    if (count.length <= limit) {
      element.value = value;
    } else {
      element.value = count.slice(0, limit).join('');
    }
    this.updateFormControl(element.value);
  }

  updateFormControl(value: any) {
    setTimeout(() => {
      if (this.ngControl && this.ngControl.control) {
        this.ngControl.control.setValue(value);
      }
      this.ngModelChange.emit(value);
    });
  }
}
