import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PlusMinusCounterInputComponent),
  multi: true
};

@Component({
  selector: 'nexus-plus-minus-counter-input',
  templateUrl: './plus-minus-counter-input.component.html',
  styleUrls: ['./plus-minus-counter-input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],

})
export class PlusMinusCounterInputComponent implements OnInit {

  //#region ngModel
  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  inputNumberValue: number = 0;

  //get accessor
  get value(): number {
    return this.inputNumberValue;
  };

  //set accessor including call the onchange callback
  set value(v: number) {
    if (v !== this.inputNumberValue) {
      this.inputNumberValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: number) {
    if (value !== this.inputNumberValue) {
      this.inputNumberValue = value;
    }
  }
  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  //#endregion ngModel

  @Input() max!: number;
  @Input() min!: number;
  @Input() step: number = 1;
  @Input() enable: boolean = false;
  @Output() onchange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  minusValue() {
    if(!this.enable){
      if ((this.min || this.min == 0) && (this.value - this.step) >= this.min) {
        this.value = this.value - this.step;
        this.onchange.emit();
      } else if (this.min == undefined && this.min == null && this.min == NaN) {
        this.value = this.value - this.step;
        this.onchange.emit();
      }
    }
  }

  plusValue() {
    if(!this.enable){
      if ((this.max || this.max == 0)  && (this.value + this.step) <= this.max) {
        this.value = this.value + this.step;
        this.onchange.emit();
      } else if (this.max == undefined && this.max == null && this.max == NaN) {
        this.value = this.value + this.step;
        this.onchange.emit();
      }
    }
  }
}
