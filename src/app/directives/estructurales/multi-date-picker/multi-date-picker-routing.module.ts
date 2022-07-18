import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MultiDatePicker } from './multi-date-picker';


const routes: Routes = [
  { path: '', component: MultiDatePicker}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultiDatePickerRoutingModule { }
