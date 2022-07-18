import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StructuredButtonComponent } from './structured-button.component';


const routes: Routes = [
  {path: '', component: StructuredButtonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructuredButtonRoutingModule { }
