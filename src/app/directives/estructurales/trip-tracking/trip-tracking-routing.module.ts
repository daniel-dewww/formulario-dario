import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripTrackingComponent } from './trip-tracking.component';


const routes: Routes = [
  {
    path: '',
    component: TripTrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripTrackingRoutingModule { }
