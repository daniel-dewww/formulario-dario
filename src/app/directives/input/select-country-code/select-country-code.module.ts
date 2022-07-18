import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectCountryCodeRoutingModule } from './select-country-code-routing.module';
import { SelectCountryCodeComponent } from './select-country-code.component';


@NgModule({
  declarations: [SelectCountryCodeComponent],
  imports: [
    CommonModule,
    SelectCountryCodeRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SelectCountryCodeComponent]
})
export class SelectCountryCodeModule { }
