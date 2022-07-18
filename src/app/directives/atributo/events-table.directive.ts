import { Directive, OnInit, ElementRef, HostListener, Input, EventEmitter, Output } from '@angular/core';


@Directive({
  selector: '[nexusEventsTable]'
})
export class EventsTableDirective implements OnInit {
  table: any;
  lstKeyPress: string[] = [];
 
  @Input() clickInside: boolean = false
  @Output() keyPress: EventEmitter<string> = new EventEmitter();

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this.el.nativeElement.tabIndex = 1;
    // a.equalsIgnoreCase(b)
  }

  @HostListener('window:keydown', ['$event'])
  ArrowUp($event: KeyboardEvent) {
    if($event.key){
      let objKeyPress = this.lstKeyPress.find(key => key.toLowerCase() == ($event.key).toLowerCase())
      if (!objKeyPress) {
        this.lstKeyPress.push($event.key);
        if (this.lstKeyPress.length == 1 && this.clickInside) {
              this.keyPress.emit($event.key + '');
        } else {          
          this.lstKeyPress = [];
        }
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  ArrowDown($event: KeyboardEvent) {
    if($event.key){
      let indexObjKeyPress = this.lstKeyPress.findIndex(key => key.toLowerCase() == ($event.key).toLowerCase())
      if (indexObjKeyPress > -1) {
        this.lstKeyPress.splice(indexObjKeyPress, 1);
      }
    }
  }

  navigateItem(num: any) {
    if (!this.table.selection) { return; }
    const i = this.table.value.indexOf(this.table.selection);
    const len = this.table.value.length;
    if (num > 0) {
      return this.table.value[(i + num) % len];
    }
    return this.table.value[(i + len + num) % len];
  }
}