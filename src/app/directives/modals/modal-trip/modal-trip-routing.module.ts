import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalTripComponent } from './modal-trip.component';

const routes: Routes = [
  {path:'', component: ModalTripComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalTripRoutingModule { }
