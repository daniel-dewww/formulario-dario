import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectCountryCodeComponent } from './select-country-code.component';

const routes: Routes = [
  {
    path: '', component: SelectCountryCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectCountryCodeRoutingModule { }
