import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpinnerLoadingComponent } from './spinner-loading.component';


const routes: Routes = [
  { path: '' , component: SpinnerLoadingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpinnerLoadingRoutingModule { }
