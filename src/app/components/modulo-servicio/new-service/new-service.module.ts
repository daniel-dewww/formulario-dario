import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinosViajeCorporateComponent } from './destinos-viaje-corporate/destinos-viaje-corporate.component';
import { PlusMinusCounterInputModule } from 'src/app/directives/estructurales/plus-minus-counter-input/plus-minus-counter-input.module';
import { SelectCountryCodeModule } from 'src/app/directives/input/select-country-code/select-country-code.module';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';
import { SharedOutsideClickModule } from 'src/app/core/shared/shared-outside-click/shared-outside-click.module';
import { SpinnerLoadingModule } from 'src/app/directives/estructurales/spinner-loading/spinner-loading.module';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { InformacionMapaModule } from 'src/app/directives/informacion/informacion-mapa/informacion-mapa.module';
import { MultiDatePickerModule } from 'src/app/directives/estructurales/multi-date-picker/multi-date-picker.module';
import { InputAutocompleteModule } from 'src/app/directives/input/input-autocomplete/input-autocomplete.module';
import { InputGeoAutocompleteModule } from 'src/app/directives/input/input-geo-autocomplete/input-geo-autocomplete.module';
import { StructuredButtonModule } from 'src/app/directives/estructurales/structured-button/structured-button.module';
// import { TableViajesModule } from '../../modulo-operaciones/table-viajes/table-viajes.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NewServiceComponent } from './new-service.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule,BsModalService } from 'ngx-bootstrap/modal';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { CarouselModule  } from 'primeng/carousel';
import {TreeSelectModule} from 'primeng/treeselect';
import {DropdownModule} from 'primeng/dropdown';
import {GMapModule} from 'primeng/gmap';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {SelectButtonModule} from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule } from 'primeng/progressbar';
import {CheckboxModule } from 'primeng/checkbox';
import {RadioButtonModule } from 'primeng/radiobutton';
import {DialogModule } from 'primeng/dialog';
const NgxBootstrap = [
  DialogModule,
  RadioButtonModule,
  CheckboxModule,
  ProgressBarModule,
  ModalModule,
  TabsModule,
  ButtonsModule,
  BsDatepickerModule.forRoot(),
  NgSelectModule,
  InformacionMapaModule,
  MultiDatePickerModule,
  InputAutocompleteModule,
  InputGeoAutocompleteModule,
  // TableViajesModule,
  AccordionModule.forRoot(),
  ButtonModule,
  ToastModule,
  CarouselModule
]

@NgModule({
  declarations: [
    DestinosViajeCorporateComponent,
    NewServiceComponent
  ],
  imports: [
    InputTextModule,
    CalendarModule,
    SelectButtonModule,
    AutoCompleteModule,
    GMapModule,
    DropdownModule,
    CommonModule,
    // NewServiceRoutingModule,
    FormsModule,  
    ReactiveFormsModule,   
    NgbModalModule,
     NgbModule,
    SharedTranslateModule,
    NgxBootstrap,
    SpinnerLoadingModule,
    KeyboardShortcutsModule.forRoot(),
    SharedOutsideClickModule,
    SelectCountryCodeModule,
    PlusMinusCounterInputModule,
    StructuredButtonModule,
    TreeSelectModule
  ],
  exports:[NewServiceComponent],
  // providers: [BsModalService]

})
export class NewServiceModule { }
