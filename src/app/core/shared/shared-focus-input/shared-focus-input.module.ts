import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusInput } from 'src/app/directives/atributo/focus-input.directive';



@NgModule({
  declarations: [FocusInput],
  imports: [
    CommonModule
  ],
  exports:[FocusInput]
})
export class SharedFocusInputModule { }
