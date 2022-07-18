import { Component, Input, OnInit, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavPhills } from 'src/app/directives/estructurales/nav-directive/utils/interfaces';
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { fnValidateViewExist } from 'src/app/util/utilValidate';
import { ConditionalExpr } from '@angular/compiler';
import { TYPE_VIEW } from './utils/enums';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NavDirectiveComponent),
  multi: true
};

@Component({
  selector: 'nexus-nav-directive',
  templateUrl: './nav-directive.component.html',
  styleUrls: ['./nav-directive.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class NavDirectiveComponent implements OnInit {
  
  @Input() listaTabs: NavPhills[] = [];
  @Input() typeView: TYPE_VIEW = TYPE_VIEW.nav

  constructor(
    public route: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  updateView(){
    if(fnValidateViewExist(this.ref)){
      this.ref.detectChanges();
    }
  }

  getTypeViewStepEnunValue():TYPE_VIEW{
    return TYPE_VIEW.step
  }

  getTypeViewNavEnunValue():TYPE_VIEW{
    return TYPE_VIEW.nav
  }
}
