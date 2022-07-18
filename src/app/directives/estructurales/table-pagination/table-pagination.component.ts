import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { copyFile } from 'fs';
import { ClickTable, TableEdition, TableHeader, TypePersonalizationTableEdition } from 'src/app/class/class-directive/table-pagination';
import { fnColorBasedBrightnessBlackOrWhite } from 'src/app/util/utilStyles';
import { fnValidateViewExist } from 'src/app/util/utilValidate';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TablePaginationComponent),
  multi: true
};

@Component({
  selector: 'nexus-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class TablePaginationComponent implements OnChanges {

  @Input() hedears: TableHeader[] = [];

  @Input()  body?: any[];
  @Output() bodyChange = new EventEmitter<any[]>();
  // //#region Two-Way Data Binding body

  // innerValue: any[] = [];
  // //Placeholders for the callbacks which are later providesd
  // //by the Control Value Accessor
  // private onTouchedCallback: () => void = noop;
  // private onChangeCallback: (_: any) => void = noop;

  // //get accessor
  // @Input()
  // get body(): any[] {
  //   return this.innerValue;
  // };

  // //set accessor including call the onchange callback
  // set body(v: any[]) {
  //   if (v !== this.innerValue) {
  //     this.innerValue = v;
  //     this.onChangeCallback(v);
  //   }
  // }

  // //Set touched on blur
  // onBlur() {
  //   this.onTouchedCallback();
  // }

  // //From ControlValueAccessor interface
  // writeValue(body: any[]) {
  //   if (body != this.innerValue) {
  //     this.innerValue = body;
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

  // //#endregion Two-Way Data Binding body

  @Input() idTablePagination: string = 'table-pagination';

  @Input() flagSpinner: boolean = false;
  @Input() flagPagination: boolean = true;
  @Input() flagPaginationFront: boolean = false;
  @Input() flagIndex: boolean = false;
  @Input() flagHeader: boolean = true;
  @Input() flagHover: boolean = true;
  @Input() flagResponsive: boolean = true;
  @Input() flagHeaderStatic: boolean = true;
  @Input() flagHeaderCorporativo: boolean = true;
  @Input() paginationCollectionSize: number = 1;
  @Input() paginationPageSize: number = 10;
  @Input() flagBoundaryLinks: boolean = true;

  @Output() changePage: EventEmitter<number> = new EventEmitter();
  @Output() changeFlagSpinner: EventEmitter<boolean> = new EventEmitter();
  @Output() clickTable: EventEmitter<ClickTable> = new EventEmitter();

  page: number = 4;
  constructor(
    private ref: ChangeDetectorRef,) { }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes)
    if (changes.hedears) {
      this.actualizarVista();
    }

  }

  pageChange($event: number) {
    this.changePage.emit($event);
    // this.body[1].viaje = 'modificadooooooo';
    // this.flagSpinner = true;
    // this.changeFlagSpinner.emit(this.flagSpinner);
    // this.flagShowSpinner = true;
  }

  styleForColum(type: TypePersonalizationTableEdition,personalization: TableEdition) {
    personalization = (personalization)? personalization : new TableEdition()
    return {
      'color':fnColorBasedBrightnessBlackOrWhite((type == TypePersonalizationTableEdition.BOX_COLOR ? personalization.color! : '#ffffff')),
      'background': (type == TypePersonalizationTableEdition.BOX_COLOR ? personalization.color : 'none')
    };
  }

  classForColum(
    type?: TypePersonalizationTableEdition, personalization?: TableEdition):string[] {
    personalization = (personalization)? personalization : new TableEdition()
    let classAdd: string[] = (personalization.classPersonalization) ? personalization.classPersonalization : [];
    if(type == TypePersonalizationTableEdition.BOX_COLOR){
      classAdd.push('box-statusType');
    }
    return classAdd;
  }

  clickColum(header:TableHeader, dataBody: any){

    if(header.personalization && header.personalization.flagClick){
      this.clickTable.emit({        
        valueHeader: header.id,
        valueBody: dataBody,
      });
    }
  }
  
  actualizarVista(){
    if(fnValidateViewExist(this.ref)){
      this.ref.detectChanges();
    }
  }
}
