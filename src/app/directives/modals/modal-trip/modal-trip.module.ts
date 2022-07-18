import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalTripRoutingModule } from './modal-trip-routing.module';
import { ModalTripComponent } from './modal-trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MtHeaderComponent } from './mt-header/mt-header.component';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';
import { MtDestinationsComponent } from './mt-destinations/mt-destinations.component'
import { InputGeoAutocompleteModule } from '../../input/input-geo-autocomplete/input-geo-autocomplete.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const Component = [
  MtHeaderComponent,
  MtDestinationsComponent,
]

const ComponentImports = [
  SharedTranslateModule,
  InputGeoAutocompleteModule,
  BsDatepickerModule
]

@NgModule({
  declarations: [
    ModalTripComponent,
    Component
  ],
  imports: [
    CommonModule,
    ModalTripRoutingModule,
    
    FormsModule,  
    ReactiveFormsModule,
    ComponentImports
  ],
  exports: [
    ModalTripComponent
  ],


})
export class ModalTripModule { }


