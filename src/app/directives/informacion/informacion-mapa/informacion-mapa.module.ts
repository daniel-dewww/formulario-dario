import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformacionMapaRoutingModule } from './informacion-mapa-routing.module';
import { InformacionMapaComponent } from './informacion-mapa.component';

import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';


@NgModule({
  declarations: [InformacionMapaComponent],
  imports: [
    CommonModule,
    InformacionMapaRoutingModule,
    SharedTranslateModule,
  ],
  exports:[InformacionMapaComponent]
})
export class InformacionMapaModule { }
