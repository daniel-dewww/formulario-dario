import { AfterViewInit, ContentChildren, Directive, ElementRef, HostListener, QueryList } from '@angular/core';

@Directive({
  selector: '[nexusChildResizableStylePropertyY]'
})
export class ChildResizableStylePropertyYDirective {
  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[nexusResizableStylePropertyY]'
})
export class ResizableStylePropertyYDirective implements AfterViewInit {

  height: number = 100;
  oldY: number = 0;
  grabber = false;

  @ContentChildren(ChildResizableStylePropertyYDirective, { descendants: true }) propertyChildren!: QueryList<ChildResizableStylePropertyYDirective>;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.height = parseInt(this.el.nativeElement.offsetHeight, 10);
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.grabber = false;
  }

  @HostListener('mousedown', ['$event'])
  onResize(event: MouseEvent, resizerCallback?: Function) {
    if(this.propertyChildren.length > 0){
      this.propertyChildren.forEach(e => {
        // console.log( e.elementRef.nativeElement as HTMLInputElement)
        if (event.srcElement == e.elementRef.nativeElement as HTMLInputElement) {
          this.grabber = true;
          this.oldY = event.clientY;
          event.preventDefault();
        }
      });
    } else{
      this.grabber = true;
      this.oldY = event.clientY;
      event.preventDefault();
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.grabber) {
      return;
    }
    // console.log(event.srcElement)
    this.resizer(event.clientY - this.oldY);
    this.oldY = event.clientY;
  }

  resizer(offsetY: number): void {
    this.height += offsetY;
    this.el.nativeElement.style.height = this.height + 'px';
  }

}


@Directive({
  selector: '[nexusResizableStylePropertyX]'
})
export class ChildResizableStylePropertyXDirective {
  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[nexusResizableStylePropertyX]'
})
export class ResizableStylePropertyXDirective implements AfterViewInit {

  width: number = 100;
  oldX: number = 0;
  grabber = false;

  @ContentChildren(ChildResizableStylePropertyXDirective, { descendants: true }) propertyChildren!: QueryList<ChildResizableStylePropertyXDirective>;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.width = parseInt(this.el.nativeElement.offsetWidth, 10);
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.grabber = false;
  }

  @HostListener('mousedown', ['$event'])
  onResize(event: MouseEvent, resizerCallback?: Function) {
      if(this.propertyChildren.length > 0){
        this.propertyChildren.forEach(e => {
          // console.log( e.elementRef.nativeElement as HTMLInputElement)
          if (event.srcElement == e.elementRef.nativeElement as HTMLInputElement) {
            this.grabber = true;
            this.oldX = event.clientX;
            event.preventDefault();
          }
        });
      } else{
        this.grabber = true;
        this.oldX = event.clientX;
        event.preventDefault();
      }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.grabber) {
      return;
    }
    this.resizer(event.clientX - this.oldX);
    this.oldX = event.clientX;
  }

  resizer(offsetY: number): void {
    this.width += offsetY;
    this.el.nativeElement.style.width = this.width + 'px';
  }

}


// export class ResizableStylePropertyDirective implements AfterViewInit  {

//   height:number = 100;
//   oldY:number = 0;
//   grabber = false;
//   maxHeight: number;

//   constructor(private el: ElementRef) { }

//   ngAfterViewInit() {
//       // this.width= parseInt(this.el.nativeElement.parentNode.offsetWidth, 10);    
//       if(this.el.nativeElement.style.maxHeight){

//       }
//       this.height= parseInt(this.el.nativeElement.style.maxHeight , 10);
//       this.maxHeight= parseInt(this.el.nativeElement.offsetHeight, 10);
//   }



//   // @HostListener('document:mousemove', ['$event'])
//   // onMouseMove(event: MouseEvent) {
//   //   if (!this.grabber) {
//   //       return;
//   //   }
//   //   this.resizer(event.clientY - this.oldY);
//   //   this.oldY = event.clientY;
//   // }

//   // @HostListener('document:mouseup', ['$event'])
//   // onMouseUp(event: MouseEvent) {
//   //   this.grabber = false;
//   // }

//   // resizer(offsetY: number) {
//   //   this.height += offsetY;
//   // }


//   // @HostListener('document:mousedown', ['$event'])
//   // onMouseDown(event: MouseEvent) {
//   //   this.grabber = true;
//   //   this.oldY = event.clientY;
//   // }


//   /////////////////////////////////

//   @HostListener('document:mouseup', ['$event'])
//   onMouseUp(event: MouseEvent): void {
//       this.grabber = false;
//   }

//   @HostListener('mousedown', ['$event']) 
//   onResize(event: MouseEvent, resizerCallback?: Function) {
//       this.grabber = true;
//       this.oldY = event.clientY;
//       event.preventDefault();
//   }

//   @HostListener('document:mousemove', ['$event'])
//   onMouseMove(event: MouseEvent) {
//     if (!this.grabber) {
//         return;
//     }
//     this.resizer(event.clientY - this.oldY);
//     this.oldY = event.clientY;
//   }

//   // onMouseDown(event: MouseEvent) {
//   //   this.grabber = true;
//   //   this.oldY = event.clientY;
//   // }

//   resizer(offsetY: number): void {
//       this.height += offsetY;
//       this.el.nativeElement.style.height= this.height+ 'px';
//   }

//   // addMouseMoveListener(): void {
//   //     fromEvent(document, 'mousemove')
//   //         .pipe(takeUntil(this.destroy$))
//   //         .subscribe(this.mouseMoveCallback.bind(this));
//   // }

//   // mouseMoveCallback(event: MouseEvent): void {
//   //     if (!this.grabber) {
//   //         return;
//   //     }
//   //     this.resizer(event.clientX- this.oldY);
//   //     this.oldY = event.clientX;
//   // }


// }