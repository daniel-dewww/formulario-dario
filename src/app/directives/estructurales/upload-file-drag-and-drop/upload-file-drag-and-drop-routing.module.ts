import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFileDragAndDropComponent } from './upload-file-drag-and-drop.component';


const routes: Routes = [
  {
    path: '',
    component: UploadFileDragAndDropComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadFileDragAndDropRoutingModule { }
