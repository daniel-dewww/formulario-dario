import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetresDistancePipe } from 'src/app/pipe/metres-distance.pipe';



@NgModule({
  declarations: [MetresDistancePipe],
  imports: [
    CommonModule
  ],
  exports:[
    MetresDistancePipe
  ]
})
export class SharedMetresDistanceModule { }
