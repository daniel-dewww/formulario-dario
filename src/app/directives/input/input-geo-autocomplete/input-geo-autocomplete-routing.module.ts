import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputGeoAutocompleteComponent } from './input-geo-autocomplete.component';


const routes: Routes = [
  { path: '', component: InputGeoAutocompleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputGeoAutocompleteRoutingModule { }
