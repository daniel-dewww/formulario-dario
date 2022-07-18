import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterListPipe } from 'src/app/pipe/filter-list.pipe';



@NgModule({
  declarations: [FilterListPipe],
  imports: [
    CommonModule
  ],
  exports:[
    FilterListPipe
  ]
})
export class SharedFilterListModule { }
