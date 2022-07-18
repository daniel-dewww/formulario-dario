import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IconMovilComponent } from './icon-movil.component';


const routes: Routes = [
  {path: '', component: IconMovilComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconMovilRoutingModule { }
