import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavDirectiveComponent } from './nav-directive.component';


const routes: Routes = [
  {
    path: '', component: NavDirectiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavDirectiveRoutingModule { }
