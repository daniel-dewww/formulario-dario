import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form.component';

const routes: Routes = [
  {
    path: 'general-info',
    loadChildren: () => import('./general-info/general-info.module').then(m => m.GeneralInfoModule),
  },
  {
    path: 'new-home',
    loadChildren: () => import('./new-home/new-home.module').then(m => m.NewHomeModule),
  },
  {
    path: 'company-form',
    loadChildren: () => import('./company-form/company-form.module').then(m => m.CompanyFormModule),
  },
  {
    path: 'pricing',
    loadChildren: () => import('./financia-precio/financia-precio.module').then(m => m.FinanciaPrecioModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
