import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddItemAutocompleteRoutingModule } from './add-item-autocomplete-routing.module';
import { AddItemAutocompleteComponent } from './add-item-autocomplete.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedInputDirectiveModule } from 'src/app/core/shared/shared-input-directive/shared-input-directive.module';

@NgModule({
  declarations: [
    AddItemAutocompleteComponent
  ],
  imports: [
    CommonModule,
    AddItemAutocompleteRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    SharedTranslateModule,
    NgSelectModule,
    SharedInputDirectiveModule
  ],
  exports: [AddItemAutocompleteComponent]
})
export class AddItemAutocompleteModule { }
