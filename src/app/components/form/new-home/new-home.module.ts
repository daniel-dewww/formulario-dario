import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewHomeRoutingModule } from './new-home-routing.module';
import { NewHomeComponent } from './new-home.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewHomeComponent],
  imports: [
        CommonModule,
        NewHomeRoutingModule,
        FormsModule,
        /**primeng */
        ButtonModule,
        InputTextModule,
        InputTextareaModule,
        InputMaskModule,
        CheckboxModule,
        InputNumberModule,
        InputTextareaModule
  ],
  exports : [NewHomeComponent]
})
export class NewHomeModule { }
