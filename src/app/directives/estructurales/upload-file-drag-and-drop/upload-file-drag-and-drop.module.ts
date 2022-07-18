import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadFileDragAndDropRoutingModule } from './upload-file-drag-and-drop-routing.module';
import { UploadFileDragAndDropComponent } from './upload-file-drag-and-drop.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedUploadFileModule } from 'src/app/core/shared/shared-upload-file/shared-upload-file.module';
import { SharedTranslateModule } from 'src/app/core/shared/shared-translate.module';


@NgModule({
  declarations: [
    UploadFileDragAndDropComponent,
    ProgressComponent,
  ],
  imports: [
    CommonModule,
    UploadFileDragAndDropRoutingModule,
    SharedUploadFileModule,
    SharedTranslateModule,
  ],
  exports: [UploadFileDragAndDropComponent]
})
export class UploadFileDragAndDropModule { }
