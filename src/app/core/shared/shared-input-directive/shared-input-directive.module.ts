import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoloNumerosEnterosDirective } from 'src/app/directives/atributo/solo-numeros-enteros.directive';



@NgModule({
  declarations: [SoloNumerosEnterosDirective],
  imports: [
    CommonModule
  ],
  exports:[SoloNumerosEnterosDirective]
})
export class SharedInputDirectiveModule { }
