import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceholderAppComponent } from './placeholder-app.component';


const routes: Routes = [
  {
    path: '', component: PlaceholderAppComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaceholderAppRoutingModule { }
