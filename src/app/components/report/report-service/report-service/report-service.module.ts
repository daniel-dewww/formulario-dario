import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from "primeng/dropdown";
import { InputAutocompleteModule } from 'src/app/directives/input/input-autocomplete/input-autocomplete.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportServiceComponent } from './report-service.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [ReportServiceComponent],
  imports: [
    DropdownModule,
    CommonModule,
    InputAutocompleteModule,
    FormsModule,  
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    CalendarModule
  ]
})
export class ReportServiceModule { }
