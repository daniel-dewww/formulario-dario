import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildAbcDirective, ParentDirective } from 'src/app/directives/atributo/outside-click.directive';
import { EventsTableDirective } from 'src/app/directives/atributo/events-table.directive';

@NgModule({
  declarations: [ChildAbcDirective,ParentDirective, EventsTableDirective],
  imports: [
    CommonModule
  ],
  exports: [ChildAbcDirective,ParentDirective, EventsTableDirective,]
})
export class SharedOutsideClickModule { }
