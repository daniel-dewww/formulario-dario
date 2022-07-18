import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemAutocompleteComponent } from './add-item-autocomplete.component';

const routes: Routes = [
  {path: '', component: AddItemAutocompleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddItemAutocompleteRoutingModule { }
