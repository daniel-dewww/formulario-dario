import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoveScrollDownDirective } from 'src/app/directives/atributo/move-scroll-down.directive';



@NgModule({
  declarations: [MoveScrollDownDirective],
  imports: [
    CommonModule
  ],
  exports: [MoveScrollDownDirective]
})
export class SharedMoveScrollDownModule { }
