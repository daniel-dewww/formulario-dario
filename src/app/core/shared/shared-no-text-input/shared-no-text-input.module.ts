import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoTextDirective } from 'src/app/directives/atributo/no-text.directive';



@NgModule({
  declarations: [NoTextDirective],
  imports: [
    CommonModule
  ],
  exports: [NoTextDirective]
})
export class SharedNoTextInputModule { }
