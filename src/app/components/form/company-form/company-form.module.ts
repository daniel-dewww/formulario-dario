import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyFormRoutingModule } from './company-form-routing.module';
import { CompanyFormComponent } from './company-form.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  declarations: [CompanyFormComponent],
  imports: [
    CommonModule,
    CompanyFormRoutingModule,
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
  exports:[CompanyFormComponent]
})
export class CompanyFormModule { }
