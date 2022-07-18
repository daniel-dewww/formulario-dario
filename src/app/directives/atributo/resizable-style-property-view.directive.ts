import { AfterContentInit, AfterViewInit, ContentChildren, Directive, ElementRef, HostListener, QueryList } from '@angular/core';
import { Console } from 'console';

@Directive({
  selector: '[nexusChildResizableBarX]'
})
export class ChildResizableStyleBarXDirective {
  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[nexusChildResizableStyleX]'
})
export class ChildResizableStylePropertyViewXDirective {
  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: "[nexusParentResizableStyleX]"
})
export class ResizableStylePropertyViewXDirective implements AfterViewInit, AfterContentInit {

  grabber = false;
  widthChildren: number[] = []

  @ContentChildren(ChildResizableStylePropertyViewXDirective, { descendants: true }) propertyChildren!: QueryList<ChildResizableStylePropertyViewXDirective>;
  @ContentChildren(ChildResizableStyleBarXDirective, { descendants: true }) propertyBar!: QueryList<ChildResizableStyleBarXDirective>;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    // this.width = parseInt(this.el.nativeElement.offsetWidth, 10);
  }

  ngAfterContentInit() {
    this.propertyChildren.forEach(e => {
      this.widthChildren.push(parseInt(e.elementRef.nativeElement.offsetWidth, 10));
    });
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.grabber = false;
  }

  @HostListener('mousedown', ['$event'])
  onResize(event: MouseEvent, resizerCallback?: Function) {
    if (this.propertyBar.length > 0) {
      this.propertyBar.forEach(e => {
        // console.log( e.elementRef.nativeElement as HTMLInputElement)
        if (event.srcElement == e.elementRef.nativeElement as HTMLInputElement) {
          this.grabber = true;
          event.preventDefault();
        }
      });
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.grabber) {
      return;
    }
    this.resizer(event.clientX);
  }

  @HostListener('window:resize', ['$event'])
  onResizeEvent(event: MouseEvent) {  
    let offsetX: number;  
    this.resizer(event.clientX);
  }

  resizer(offsetX: number): void {
    let widthFather = parseInt(this.el.nativeElement.offsetWidth, 10);
    if (this.propertyChildren.length > 0) {
      let index= 0;
      this.propertyChildren.forEach(e => {
        if (e.elementRef.nativeElement as HTMLInputElement && index == 0) {          
          offsetX = (offsetX) ? offsetX : this.getOffset(e.elementRef.nativeElement.style.width);
          e.elementRef.nativeElement.style.width =  (offsetX-3)+ 'px';
        } else{
          e.elementRef.nativeElement.style.width =  (widthFather - offsetX - 3)+ 'px';
        }
        index++;
      });
    }
  }

  getOffset(styleWithInit:string):number{
    let styleWSplit:string[] = styleWithInit.split('px');
    if(styleWSplit.length >=0){
      return parseInt(styleWSplit[0])
    }
    return 0
  }
}

@Directive({
  selector: "[nexusParentResizableStyleY]"
})
export class ResizableStylePropertyViewYDirective {

  // @ContentChildren(ChildResizableStylePropertyViewDirective,{descendants: true}) abcChildren : QueryList<ChildResizableStylePropertyViewDirective>;

  ngAfterContentInit() {

    // this.abcChildren.forEach(e => {
    //   const input: HTMLInputElement =  e.elementRef.nativeElement as HTMLInputElement;
    //   input.focus();
    // });
    // console.log(this.abcChildren.toArray())

  }
}