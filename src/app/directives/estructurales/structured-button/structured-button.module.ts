import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { StructuredButtonRoutingModule } from './structured-button-routing.module';
import { StructuredButtonComponent } from './structured-button.component';
import { SpinnerLoadingModule } from 'src/app/directives/estructurales/spinner-loading/spinner-loading.module'
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [StructuredButtonComponent],
  imports: [
    CommonModule,
    StructuredButtonRoutingModule,
    SpinnerLoadingModule,
    ButtonModule,
    FormsModule
    ,ReactiveFormsModule
  ],
  exports: [StructuredButtonComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA]
})
export class StructuredButtonModule { }
