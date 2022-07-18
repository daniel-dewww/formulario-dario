import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilisecondsTimePipe } from 'src/app/pipe/miliseconds-time.pipe';



@NgModule({
  declarations: [ 
    MilisecondsTimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MilisecondsTimePipe
  ]
})
export class SharedMilisecondsTimeModule { }
