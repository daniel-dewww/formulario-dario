import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileDragAndDropDirective } from 'src/app/directives/atributo/upload-file-drag-and-drop.directive';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UploadFileDragAndDropDirective, 
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UploadFileDragAndDropDirective,
  ]
})
export class SharedUploadFileModule { }
