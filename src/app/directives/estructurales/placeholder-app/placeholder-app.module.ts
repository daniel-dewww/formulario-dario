import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceholderAppRoutingModule } from './placeholder-app-routing.module';
import { PlaceholderAppComponent } from './placeholder-app.component';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';


@NgModule({
  declarations: [PlaceholderAppComponent],
  imports: [
    CommonModule,
    PlaceholderAppRoutingModule,
    SharedTranslateModule
  ],
  exports: [PlaceholderAppComponent],
})
export class PlaceholderAppModule { }
