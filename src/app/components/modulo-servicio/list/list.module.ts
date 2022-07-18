import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { InformacionMapaModule } from 'src/app/directives/informacion/informacion-mapa/informacion-mapa.module';
import {TabsModule  } from 'ngx-bootstrap/tabs';
import {TooltipModule  } from 'ngx-bootstrap/tooltip';
import { StructuredButtonModule } from 'src/app/directives/estructurales/structured-button/structured-button.module';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ListboxModule } from 'primeng/listbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [ListComponent],
  imports: [
    ListboxModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    ToastModule,
    AccordionModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InformacionMapaModule,
    TabsModule,
    StructuredButtonModule,
    SharedTranslateModule
  ],  
  providers: [BsModalService,NgbActiveModal ]
})
export class ListModule { }
