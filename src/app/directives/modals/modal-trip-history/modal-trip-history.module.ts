import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ModalTripHistoryRoutingModule } from './modal-trip-history-routing.module';
import { ModalTripHistoryComponent } from './modal-trip-history.component';


@NgModule({
  declarations: [ModalTripHistoryComponent],
  imports: [
    CommonModule,
    ModalTripHistoryRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ModalTripHistoryComponent]
})
export class ModalTripHistoryModule { }
