import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlusMinusCounterInputRoutingModule } from './plus-minus-counter-input-routing.module';
import { PlusMinusCounterInputComponent } from './plus-minus-counter-input.component';


@NgModule({
  declarations: [PlusMinusCounterInputComponent],
  imports: [
    CommonModule,
    PlusMinusCounterInputRoutingModule
  ],
  exports: [PlusMinusCounterInputComponent],
})
export class PlusMinusCounterInputModule { }
