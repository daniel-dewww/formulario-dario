import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NavDirectiveRoutingModule } from './nav-directive-routing.module';
import { NavDirectiveComponent } from './nav-directive.component';
import { NgStepComponent } from './ng-step/ng-step.component';
import { NgNavComponent } from './ng-nav/ng-nav.component';

const NgxBootstrap = [
  BsDatepickerModule.forRoot()
]

@NgModule({
  declarations: [NavDirectiveComponent, NgStepComponent, NgNavComponent],
  imports: [
    CommonModule,
    NavDirectiveRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SharedTranslateModule,
    NgxBootstrap

  ],
  exports: [NavDirectiveComponent, NgStepComponent]
})
export class NavDirectiveModule {
  /**
  * forRoot
  * @returns A module with its provider dependencies
  */
  static forRoot(): ModuleWithProviders<NavDirectiveModule> {
    return {
      ngModule: NavDirectiveModule,
      providers: [
        // {
        //   provide: NG_WIZARD_CONFIG_TOKEN,
        //   useValue: ngWizardConfig
        // }
      ]
    }
  }
}
