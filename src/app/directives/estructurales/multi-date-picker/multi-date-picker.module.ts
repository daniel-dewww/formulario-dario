import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MultiDatePickerRoutingModule } from './multi-date-picker-routing.module';
import { MultiDatePicker } from './multi-date-picker';

//Ngb Bootstrap
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [MultiDatePicker],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiDatePickerRoutingModule,
    NgbModule,
  ],
  exports: [MultiDatePicker]
})
export class MultiDatePickerModule { }
