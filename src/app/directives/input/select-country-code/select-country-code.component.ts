import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { CountryCode } from 'src/app/util/utilCountryCode';
import { NG_VALUE_ACCESSOR } from '@angular/forms'

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectCountryCodeComponent),
  multi: true
};

@Component({
  selector: 'nexus-select-country-code',
  templateUrl: './select-country-code.component.html',
  styleUrls: ['./select-country-code.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SelectCountryCodeComponent implements OnInit {

  codeCountry: any[] = [];
  codeCountryCurrent: any = "51";

  //#region Two-Way Data Binding ngModel
  
  innerValue: any;
  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  @Input()
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
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
  
  //#endregion Two-Way Data Binding ngModel

  constructor() { }

  ngOnInit(): void {
    this.codeCountry = CountryCode.COUNTRYCODE;
    if(this.value == "-1" || !this.value){
      this.value = this.codeCountryCurrent;
    }
  }

  setPrefijo(country: any) {
    this.value = country.dial_code;
    // console.log(this.value);
  }

}
