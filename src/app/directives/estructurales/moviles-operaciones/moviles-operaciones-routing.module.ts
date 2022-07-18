import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovilesOperacionesComponent } from './moviles-operaciones.component';


const routes: Routes = [
  {path: '', component: MovilesOperacionesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovilesOperacionesRoutingModule { }
