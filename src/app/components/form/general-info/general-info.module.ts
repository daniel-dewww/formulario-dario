import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInfoRoutingModule } from './general-info-routing.module';
import { GeneralInfoComponent } from './general-info.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GeneralInfoComponent],
  imports: [
    CommonModule,
    GeneralInfoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    /**primeng */
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    CheckboxModule,
    InputNumberModule
  ],
  exports : [GeneralInfoComponent]
})
export class GeneralInfoModule { }
