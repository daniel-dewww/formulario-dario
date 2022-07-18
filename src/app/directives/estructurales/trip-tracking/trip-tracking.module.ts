import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripTrackingRoutingModule } from './trip-tracking-routing.module';
import { TripTrackingComponent } from './trip-tracking.component';
import { InformacionMapaModule } from 'src/app/directives/informacion/informacion-mapa/informacion-mapa.module';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';

@NgModule({
  declarations: [TripTrackingComponent],
  imports: [
    CommonModule,
    TripTrackingRoutingModule,
    InformacionMapaModule,
    SharedTranslateModule
  ],
  exports: [TripTrackingComponent]
})
export class TripTrackingModule { }
