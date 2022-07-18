import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalShortcutComponent } from './modal-shortcut.component';
import { ModalShortcutRoutingModule } from './modal-shortcut-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';
import { SpinnerLoadingModule } from '../../estructurales/spinner-loading/spinner-loading.module';
import { SharedInputDirectiveModule } from 'src/app/core/shared/shared-input-directive/shared-input-directive.module'
import { SearchTripModule } from 'src/app/directives/estructurales/search-trip/search-trip.module';

@NgModule({
  declarations: [ModalShortcutComponent],
  imports: [
    CommonModule,
    ModalShortcutRoutingModule,
    
    FormsModule,  
    ReactiveFormsModule,
    
    NgbModalModule,
    
    SharedTranslateModule,
    SpinnerLoadingModule,
    SharedInputDirectiveModule,
    SearchTripModule
  ],
  exports: [ModalShortcutComponent],
})
export class ModalShortcutModule { }
