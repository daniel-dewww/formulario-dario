import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanciaPrecioComponent } from './financia-precio.component';

const routes: Routes = [{
  path : '',
  component : FinanciaPrecioComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanciaPrecioRoutingModule { }
