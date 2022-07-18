import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[nexusMovScrollDown]'
})
export class MoveScrollDownDirective {

  @Input() id?: string;
  @Output() scrollDown: EventEmitter<string> = new EventEmitter();

  constructor() { }
  @HostListener('scroll', ['$event']) onScroll($event:Event):void {
    if(this.id){
      let rowToScrollTo: HTMLElement | null = document.getElementById(this.id);
      if(rowToScrollTo){
        console.log(rowToScrollTo.scrollTop);
        // console.log(rowToScrollTo.offsetHeight)
      }
    }
  };

 

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll($event) {
  //   console.log("scrolling...");    

  //   // let container: HTMLElement = document.getElementsByClassName(id);
  //   // let rowToScrollTo: HTMLElement = document.getElementById(idRowTable + index);

  //   // let topScroll = (rowToScrollTo.offsetTop - dismissOffset < 0) ? 0 : (rowToScrollTo.offsetTop - 50);

  //   // container.scrollTo({ top: topScroll });
  // }

}
