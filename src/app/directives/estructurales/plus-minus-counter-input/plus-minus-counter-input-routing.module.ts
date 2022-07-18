import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlusMinusCounterInputComponent } from './plus-minus-counter-input.component';


const routes: Routes = [
  { path: '', component: PlusMinusCounterInputComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlusMinusCounterInputRoutingModule { }
