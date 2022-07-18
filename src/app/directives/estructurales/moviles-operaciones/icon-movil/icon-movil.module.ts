import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconMovilRoutingModule } from './icon-movil-routing.module';
import { IconMovilComponent } from './icon-movil.component';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';


@NgModule({
  declarations: [IconMovilComponent],
  imports: [
    CommonModule,
    SharedTranslateModule,
    IconMovilRoutingModule
  ],
  exports: [IconMovilComponent],
})
export class IconMovilModule { }
