import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputGeoAutocompleteRoutingModule } from './input-geo-autocomplete-routing.module';
import { InputGeoAutocompleteComponent } from './input-geo-autocomplete.component';
import { InputAutocompleteModule } from '../input-autocomplete/input-autocomplete.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';

@NgModule({
  declarations: [InputGeoAutocompleteComponent],
  imports: [
    CommonModule,
    InputGeoAutocompleteRoutingModule,  
    FormsModule,  
    ReactiveFormsModule,
    InputAutocompleteModule,
    SharedTranslateModule
  ],
  exports: [InputGeoAutocompleteComponent]
})
export class InputGeoAutocompleteModule { }
