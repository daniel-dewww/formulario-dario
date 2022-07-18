import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablePaginationRoutingModule } from './table-pagination-routing.module';
import { TablePaginationComponent } from './table-pagination.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerLoadingModule } from '../spinner-loading/spinner-loading.module';
import { FindValueArrayModule } from 'src/app/core/shared/find-value-array/find-value-array.module';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';

@NgModule({
  declarations: [TablePaginationComponent],
  imports: [
    CommonModule,
    TablePaginationRoutingModule,

    SpinnerLoadingModule,
    NgbPaginationModule,
    FindValueArrayModule,
    SharedTranslateModule,
  ],
  exports: [TablePaginationComponent],
})
export class TablePaginationModule { }
