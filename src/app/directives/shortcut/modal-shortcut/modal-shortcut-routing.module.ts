import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalShortcutComponent } from './modal-shortcut.component';


const routes: Routes = [
  {path: '', component: ModalShortcutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalShortcutRoutingModule { }
