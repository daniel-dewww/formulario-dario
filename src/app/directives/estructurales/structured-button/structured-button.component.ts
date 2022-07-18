import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ServiceStructService } from 'src/app/util/serviceService/service-struct.service'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { fnValidateViewExist } from 'src/app/util/utilValidate';
import { ValidateStructureButton } from 'src/app/class/enum/enumEstados';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StructuredButtonComponent),
  multi: true
};

@Component({
  selector: 'nexus-structured-button',
  templateUrl: './structured-button.component.html',
  styleUrls: ['./structured-button.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class StructuredButtonComponent implements OnChanges, OnDestroy {

  // //#region Two-Way Data Binding ngModel

  // innerValue: any;
  // //Placeholders for the callbacks which are later providesd
  // //by the Control Value Accessor
  // private onTouchedCallback: () => void = noop;
  // private onChangeCallback: (_: any) => void = noop;

  // //get accessor
  // @Input()
  // get value(): any {
  //   return this.innerValue;
  // };

  // //set accessor including call the onchange callback
  // set value(v: any) {
  //   if (v != this.innerValue) {
  //     this.innerValue = v;
  //     this.onChangeCallback(v);
  //   }
  // }

  // //Set touched on blur
  // onBlur() {
  //   this.onTouchedCallback();
  // }

  // //From ControlValueAccessor interface
  // writeValue(value: any) {
  //   if (value !== this.innerValue) {
  //     this.innerValue = value;
  //   }
  // }

  // //From ControlValueAccessor interface
  // registerOnChange(fn: any) {
  //   this.onChangeCallback = fn;
  // }

  // //From ControlValueAccessor interface
  // registerOnTouched(fn: any) {
  //   this.onTouchedCallback = fn;
  // }

  // //#endregion Two-Way Data Binding ngModel

  @Input()  value!: any;
  @Output() valueChange = new EventEmitter<any>();

  showSpinner?: boolean;
  @Input() label?: string;
  @Input() tittle?: string;
  @Input() disabled?: boolean;
  // @Input() validate: boolean = true;
  @Input() validate: ValidateStructureButton = ValidateStructureButton.OK;
  @Input() lblShorcut?: string;

  @Input() structService: any;
  @Input() routeService: any;
  @Input() Style: any;
  @Input() Class?: string;
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onValidate: EventEmitter<string> = new EventEmitter<string>();

  timerValidate: any;
  constructor(
    private serviceComponent: ServiceStructService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.validate) {
      // this.timerValidate = setTimeout(() => {
        // if(!this.validate){
          this.onchange();
        // }    
      // }, 2000);
    }
  }

  ngOnDestroy() {
    if (this.timerValidate) {
      clearTimeout(this.timerValidate);
    }
  }

  async clickOnChange($event: any){
    console.log('clickOnChange')

    this.disabled = true
    await this.onchange($event);
    this.timerValidate = setTimeout(() => {
        this.disabled = false;  
    }, 3000);
  }

  async onchange($event?: any) {
    // debugger
    await this.disabledOptions();
    if (this.validate == undefined) this.validate = ValidateStructureButton.NO_V;

    console.log('this.validate    ', this.validate)
    switch (this.validate) {
      case ValidateStructureButton.NO_V:
        if ($event) {
          this.onValidate.emit('validate');
        } else {
          this.activateOptions();
        }
        break;

      case ValidateStructureButton.VALIDATION:
      case ValidateStructureButton.ERROR:
        if ($event) {
          this.onValidate.emit('VALIDATION');
        } else {
          this.activateOptions();
        }
        break;

      case ValidateStructureButton.OK:
        if (this.value && this.structService && this.routeService) {
          let response: any = await this.serviceComponent.requestService(this.structService, this.routeService, this.value)
          this.activateOptions();
          this.disabled = false;  
          this.onChange.emit(response);
        }
        break;

      default:
        this.activateOptions();
        break;
    }
    // if (this.value && this.validate && this.structService && this.routeService) {
    //   console.log('consulta al servidor    validate ', this.validate, '       disabled ', this.disabled)
    //   // let response: any = await this.serviceComponent.requestService(this.structService, this.routeService, this.value)
    //   this.activateOptions();
    //   this.onChange.emit('response');
    //   // } else if (this.value && !this.validate) {
    //   //   this.onValidate.emit('validate');
    //   //   this.activateOptions();
    // } else {
    // await this.activateOptions();
    // }
  }

  activateOptions() {
    this.showSpinner = false;
    this.disabled = false;
    this.updateView();
  }

  async disabledOptions() {
    this.disabled = true;
    this.showSpinner = true;
    this.updateView();
  }

  updateView() {
    if (fnValidateViewExist(this.ref)) {
      this.ref.detectChanges();
    }
  }

}
