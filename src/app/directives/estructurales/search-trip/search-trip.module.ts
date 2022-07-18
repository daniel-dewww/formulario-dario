import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchTripRoutingModule } from './search-trip-routing.module';
import { SearchTripComponent } from './search-trip.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module'

import * as formNgBootstrap from '@ng-bootstrap/ng-bootstrap';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { StructuredButtonModule } from 'src/app/directives/estructurales/structured-button/structured-button.module';

const NgxBootstrap = [
  formNgBootstrap.NgbButtonsModule, 
  formNgBootstrap.NgbAccordionModule,
  formNgBootstrap.NgbModalModule,
  AccordionModule.forRoot(),
  BsDatepickerModule.forRoot(),
  CollapseModule.forRoot(),
]

@NgModule({
  declarations: [SearchTripComponent],
  imports: [
    CommonModule,
    SearchTripRoutingModule,
    
    FormsModule,  
    ReactiveFormsModule,
    SharedTranslateModule,
    StructuredButtonModule,
    NgxBootstrap,
  ],
  exports: [SearchTripComponent]
})
export class SearchTripModule { }
