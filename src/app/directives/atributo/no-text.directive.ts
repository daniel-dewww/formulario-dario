import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[nexusNoText]'
})
export class NoTextDirective {
  // Allow decimal numbers. The \. is only allowed once to occur
  private regex: RegExp = new RegExp(/^$/g);

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];
  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: any){
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    // Do not use event.keycode this is deprecated.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    let current: string = this.el.nativeElement.value;
    // We need this because the current value on the DOM element
    // is not yet updated with the value from this event
    var key = event.which || event.keyCode; // keyCode detection
    var ctrl = event.ctrlKey ? event.ctrlKey : ((key === 17) ? true : false); // ctrl detection

    let next: string = current.concat(event.key);
    // if (key == 86 && ctrl) {
    //     // if (event.originalEvent.clipboardData.getData('text').match(/[^\d]/))
    //     // event.preventDefault();
    // } else if (key == 67 && ctrl) {
    //     console.log("Ctrl + C Pressed !");
    // } else 
    if (next && !String(next).match(this.regex)) {
        event.preventDefault();
    }
  }

}
