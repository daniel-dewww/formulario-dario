import { SimpleChanges, AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Directive({
  selector: '[nexusFocus]'
})
export class FocusInput implements AfterViewInit, OnChanges {

  /**
  *identify when flag if true, put focus event
  */
  @Input() flagFocus: boolean = false;

  /**
  *If flagFocus if true, this output is activate
  */
  @Output('focus') focus = new EventEmitter<any>();

  viewInit: boolean = false;
  constructor(private el: ElementRef) {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.flagFocus) {
      if (changes.flagFocus) {
        this.generateFocus();
      }
    }
  }

  ngAfterViewInit() {
    this.viewInit = true;
    this.generateFocus();
  }

  generateFocus() {
    if (this.viewInit && this.flagFocus) {
      if (!this.el.nativeElement['focus']) {
        throw new Error('Element does not accept focus.');
      } else {
        const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
        input.focus();
        this.focus.emit(true);
      }
      this.flagFocus = false;
    } else if(this.viewInit){
      if (!this.el.nativeElement['blur']) {
        throw new Error('Element does not accept blur.');
      } else {
        const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
        input.blur();
        this.focus.emit(false);
      }
    }
  }
}
