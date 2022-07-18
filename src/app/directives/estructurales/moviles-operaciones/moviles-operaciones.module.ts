import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovilesOperacionesRoutingModule } from './moviles-operaciones-routing.module';
import { MovilesOperacionesComponent } from './moviles-operaciones.component';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module'
import { ModalMovilesEstadoModule } from 'src/app/directives/modals/modal-moviles-estado/modal-moviles-estado.module';
import { IconMovilModule } from './icon-movil/icon-movil.module';

@NgModule({
  declarations: [MovilesOperacionesComponent],
  imports: [
    CommonModule,
    MovilesOperacionesRoutingModule,
    SharedTranslateModule,
    ModalMovilesEstadoModule,
    IconMovilModule
  ],
  exports: [MovilesOperacionesComponent]
})
export class MovilesOperacionesModule { }
