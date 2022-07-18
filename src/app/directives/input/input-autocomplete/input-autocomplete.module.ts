import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputAutocompleteRoutingModule } from './input-autocomplete-routing.module';
import { InputAutocompleteComponent } from './input-autocomplete.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';

@NgModule({
  declarations: [InputAutocompleteComponent],
  imports: [
    AutoCompleteModule,
    CommonModule,
    InputAutocompleteRoutingModule, 
    FormsModule,  
    ReactiveFormsModule,
    NgSelectModule,
    SharedTranslateModule
  ],
  exports: [InputAutocompleteComponent],
})
export class InputAutocompleteModule { }
