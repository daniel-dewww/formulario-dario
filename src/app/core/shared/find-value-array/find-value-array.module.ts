import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindValueArrayPipe } from 'src/app/pipe/find-value-array.pipe';



@NgModule({
  declarations: [FindValueArrayPipe],
  imports: [
    CommonModule
  ],
  exports:[
    FindValueArrayPipe
  ]
})
export class FindValueArrayModule { }
