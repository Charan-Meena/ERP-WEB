import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[NumberOnly]',
  standalone: true
})

export class NumberOnlyDirective {
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];
  @Input() maxValue!: number;
  @Input() minValue!: number;
  constructor(private _el: ElementRef) { }
  
  validateInput(event:any){
    let initalValue = parseInt(this._el.nativeElement.value || '0');     
    if(initalValue > this.maxValue){
      this._el.nativeElement.value = this.maxValue;
      initalValue = this.maxValue;
    }    
    if(initalValue < this.minValue){      
      this._el.nativeElement.value = this.minValue;
    }
  }//EOF validateInput

  @HostListener('input', ['$event']) onInputChange(event:any) {   
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }     
    let initalValue = this._el.nativeElement.value; 
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');   
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }   
    
  }
  @HostListener('blur', ['$event']) onBlur(event:any) { 
    this.validateInput(event);
  }
  @HostListener('focus', ['$event']) onFocus(event:any) { 
    this.validateInput(event);
  }
  

}
