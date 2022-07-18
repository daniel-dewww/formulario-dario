import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { NavPhills } from '../utils/interfaces';

@Component({
  selector: 'app-ng-step',
  templateUrl: './ng-step.component.html',
  styleUrls: ['./ng-step.component.scss']
})
export class NgStepComponent implements OnInit {
    
  @Input() listaTabs: NavPhills[] = [];  
  @Input() stepIndex: number = 0;
  
  constructor() { }

  ngOnInit(): void {
    this.listaTabs.length
  }

  validateStepWithIndex(index:number):boolean{
    if(this.stepIndex == index) return true
    return false
  }

  validateFinalStepIndex():boolean{
    if(this.stepIndex >= (this.listaTabs.length -1)) return true
    return false
  }
}
