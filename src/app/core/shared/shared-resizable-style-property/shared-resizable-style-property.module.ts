import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildResizableStylePropertyXDirective, ChildResizableStylePropertyYDirective, ResizableStylePropertyXDirective, ResizableStylePropertyYDirective } from 'src/app/directives/atributo/resizable-style-property-Y.directive';
import { ChildResizableStyleBarXDirective, ChildResizableStylePropertyViewXDirective, ResizableStylePropertyViewYDirective, ResizableStylePropertyViewXDirective } from 'src/app/directives/atributo/resizable-style-property-view.directive';



@NgModule({
  declarations: [
    ResizableStylePropertyYDirective,
    ChildResizableStylePropertyYDirective,
    ResizableStylePropertyXDirective,
    ChildResizableStylePropertyXDirective,

    ChildResizableStyleBarXDirective,
    ChildResizableStylePropertyViewXDirective,
    ResizableStylePropertyViewXDirective,
    
    ResizableStylePropertyViewYDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ResizableStylePropertyYDirective,
    ChildResizableStylePropertyYDirective,
    ResizableStylePropertyXDirective,
    ChildResizableStylePropertyXDirective,

    ChildResizableStyleBarXDirective,
    ChildResizableStylePropertyViewXDirective,
    ResizableStylePropertyViewXDirective,

    ResizableStylePropertyViewYDirective
  ]
})
export class SharedResizableStylePropertyModule { }
