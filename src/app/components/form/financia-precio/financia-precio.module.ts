import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanciaPrecioRoutingModule } from './financia-precio-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { FinanciaPrecioComponent } from './financia-precio.component';


@NgModule({
  declarations: [FinanciaPrecioComponent],
  imports: [
    CommonModule,
    FinanciaPrecioRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    /**prime ng */
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    CheckboxModule,
    InputNumberModule,
    InputTextareaModule
  ],
  exports : [FinanciaPrecioComponent]
})
export class FinanciaPrecioModule { }
