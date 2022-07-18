import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { NewHomeComponent } from './new-home/new-home.component';
import { FinanciaPrecioComponent } from './financia-precio/financia-precio.component';


@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FormRoutingModule
  ],
  exports :[FormComponent]
})
export class FormModule { }
