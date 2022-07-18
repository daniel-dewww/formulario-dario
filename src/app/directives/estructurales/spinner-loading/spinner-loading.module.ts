import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerLoadingRoutingModule } from './spinner-loading-routing.module';
import { SpinnerLoadingComponent } from './spinner-loading.component';


@NgModule({
  declarations: [SpinnerLoadingComponent],
  imports: [
    CommonModule,
    SpinnerLoadingRoutingModule
  ],
  exports: [SpinnerLoadingComponent],
})
export class SpinnerLoadingModule { }
