import { Directive, ElementRef, Optional, Inject, Output, EventEmitter, OnInit, OnDestroy, HostListener, Input, AfterViewInit, ContentChildren, QueryList } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[appChildAbc]'
})
export class ChildAbcDirective {

  constructor(public elementRef: ElementRef) { }

}

@Directive({
  selector: "[appParent]"
})
export class ParentDirective {

  @ContentChildren(ChildAbcDirective,{descendants: true}) abcChildren! : QueryList<ChildAbcDirective>;

  ngAfterContentInit() {  

      this.abcChildren.forEach(e => {
        const input: HTMLInputElement =  e.elementRef.nativeElement as HTMLInputElement;
        input.focus();
      });
      // console.log(this.abcChildren.toArray())

  }
}



// @Directive({
//   selector: '[nexusOutsideClick]'
// })
// // export class OutsideClickDirective implements OnInit, OnDestroy {
// export class OutsideClickDirective implements AfterViewInit{
//   /**
//   *If lick is outside tha output is true
//   * but if click is inside the return is true
//   */
//   @Output('outsideClick') outsideClick = new EventEmitter<any>();

//   // private subscription: Subscription;

//   // constructor(private element: ElementRef, @Optional() @Inject(DOCUMENT) private document: any) { }
 
//   // ngOnInit() {
//   //   setTimeout(() => {
//   //     this.subscription = fromEvent<MouseEvent>(this.document, 'click')
//   //       .pipe(
//   //         filter(event => {
//   //           const clickTarget = event.target as HTMLElement;
//   //           return !this.isOrContainsClickTarget(this.element.nativeElement, clickTarget);
//   //         }),
//   //       )
//   //       .subscribe(
//   //         // event => this.outsideClick.emit()
//   //       );
//   //   }, 0);
//   // }

//   // private isOrContainsClickTarget(element: HTMLElement, clickTarget: HTMLElement) {
//   //   this.outsideClick.emit(!(element == clickTarget || element.contains(clickTarget)))
//   //   return element == clickTarget || element.contains(clickTarget);
//   // }

//   // ngOnDestroy() {
//   //   if (this.subscription) this.subscription.unsubscribe();
//   // }

 
// }




  // constructor(private el: ElementRef) {
  //   if (!el.nativeElement['focus']) {
  //     throw new Error('Element does not accept focus.');
  //   }
  //   setTimeout(() => {
  //     const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
  //     input.focus();
  //     console.log(this.el.nativeElement)
  //     // this.outsideClick.emit();
  //     // if (!el.nativeElement['select']) {
  //     // input.select();
  //     // }
  //   }, 5000);
  // }
