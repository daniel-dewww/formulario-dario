import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputAutocompleteComponent } from './input-autocomplete.component';


const routes: Routes = [  
  {path: '', component: InputAutocompleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputAutocompleteRoutingModule { }
