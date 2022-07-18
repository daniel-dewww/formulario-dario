import { Component, OnInit, EventEmitter, Input, ChangeDetectorRef, Output, OnChanges, SimpleChanges, forwardRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { ServiceStructService } from 'src/app/util/serviceService/service-struct.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { RouteService, StructService } from 'src/app/util/serviceService/serviceStruct';
import { PlaceHolderAutoComplete } from 'src/app/class/placeHolderAutocomplete'
import { isNotPC } from 'src/app/util/utilStyles';
import { fnValidateViewExist } from 'src/app/util/utilValidate';
import { ErrorServer } from 'src/app/class/errorServer';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputAutocompleteComponent),
  multi: true
};

@Component({
  selector: '[nexus-input-autocomplete]',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent implements OnInit, OnChanges, AfterViewInit {

  /*
  * Set autocomplete as read only.
  */
  @Input() readonly: boolean = false;

  /*
  * Represents the label that will be shown what you want to search for
  */
  @Input() bindLabel: string[] = [];

  /*
  * Represents the value to recive when to select one option
  */
  @Input() bindValue: string[] = [];

  /*
  * Represents lable to init value masck
  */
  @Input() findInit: string = 'hola';
  initFinder: boolean = true;

  /*
  * Represents the direct query to the server by execution of change of the text
  */
  @Input() mainTextOption: boolean = false;
  /*
  * Represents the number of letters needed to query the server
  */
  @Input() mainTextOptionLength: number = 1;

  /*
  * Represents the option you can find only with enter
  */
  @Input() findNotAutomatic:boolean = false;



  /*
  * You select one option, if is false, or many options
  */
  @Input() multiple: boolean = false;

  /*
  * Placeholder of the input
  */
  @Input() placeHolder: string = PlaceHolderAutoComplete.plh_Default;

  /*
  * Structure for service
  */
  @Input() structService?: StructService;
  /*
  * type route for service
  */
  @Input() routeService?: RouteService;
  /*
  * Json to request for service
  */
  @Input() searchJson: any = new Object();

  /*
  * Response events, then you change results
  */
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  /*
  * Response events, returns the search value
  */
  @Output() searchValue: EventEmitter<any> = new EventEmitter();

  /*
  * Return search value
  */
  @Input() emitSearchValue?: boolean;

  serverSideFilterItems: any[] = [];
  emitSearch: boolean = false;

  /*
  * Add list, for the service, all time
  */
  @Input() lstValoresAdicionales: any[] = [];

  loaded: boolean = false;

  @Input()  selectedValue!: any;
  @Output() selectedValueChange = new EventEmitter<any>();

  // //#region selectedValue
  // valorSeleccionado: any;
  // //Placeholders for the callbacks which are later providesd
  // //by the Control Value Accessor
  // private onTouchedCallback: () => void = noop;
  // private onChangeCallback: (_: any) => void = noop;

  // //get accessor
  // @Input()
  // get selectedValue(): any {
  //   return this.valorSeleccionado;
  // };

  // //set accessor including call the onchange callback
  // set selectedValue(v: any) {
  //   if (v !== this.valorSeleccionado) {
  //     this.valorSeleccionado = v;
  //     this.onChangeCallback(v);
  //   }
  // }

  // //Set touched on blur
  // onBlur() {
  //   this.onTouchedCallback();
  // }

  // //From ControlValueAccessor interface
  // writeValue(selectedValue: any) {
  //   if (selectedValue !== this.valorSeleccionado) {
  //     this.valorSeleccionado = selectedValue;
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

  // //#endregion 


  //#region  Search when after typing

  /**timer identifier */
  typingTimer?:any;

  /**time in ms, 5 second for example */
  doneTypingInterval = 1000;

  //#endregion  Search when after typing

  isNotPC: boolean = true

  @ViewChild('select') select?: NgSelectComponent;
  @Input() flagFocus: boolean = false;

  constructor(
    private ref: ChangeDetectorRef,
    private serviceComponent: ServiceStructService,
  ) { }

  ngOnInit() {
    this.isNotPC = isNotPC()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isNotPC = isNotPC()
  }

  ngAfterViewInit(){
    if(this.flagFocus){
      this.setFocus();
    }
  }

  setFocus(){
    this.select?.focus();
  }
  text: string;

  results: string[];

  search(event) {
    // this.mylookupservice.getResults(event.query).then(data => {
    //     this.results = data;
    // });
}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.lstValoresAdicionales && changes.lstValoresAdicionales) {
      if (!this.lstValoresAdicionales) {
        this.lstValoresAdicionales = []
      }
      this.actualizarItemsAdicionales()
    }
  }

  actualizarVista() {
    if (fnValidateViewExist(this.ref)) {
      this.ref.detectChanges();
    }
  }

  onSearch(txtFind: any, select: NgSelectComponent, emitSearch?: boolean) {
    // this.emitSearch = (!emitSearch) ? true : false;
    // txtFind = ((!emitSearch) ? false : true) ? txtFind : txtFind.term;
    // if (emitSearch && txtFind && txtFind.length >= this.mainTextOptionLength && !this.findNotAutomatic) {
      this.searchJson.key_word = this.text
      this.serviceBusquedaAutocomplete(this.text, select);
    // }

  }

  
  onSearchEnter(target: any, select: NgSelectComponent, emitSearch?: boolean) {
    // this.emitSearch = (!emitSearch) ? true : false;
    let txtFind: any = target?.value!;
    let textFind: string = ((!emitSearch) ? false : true) ? txtFind : txtFind.term;
    if (emitSearch && textFind && textFind.length >= this.mainTextOptionLength) {
      this.searchJson.key_word = textFind
      this.serviceBusquedaAutocomplete(textFind, select);
    }

  }
  @Output() onData: EventEmitter<any> = new EventEmitter();
  handleDropdown(event) {
    this.onChange.emit(event)
    this.onData.emit(event)
     event
    // window.alert("adada")
    //event.query = current value in input field
}
  onSearchMobile(txtFind: string, select: NgSelectComponent, emitSearch?: boolean) {
    if (this.isNotPC) {
      this.onSearch(txtFind, select, emitSearch);
    }
  }

  async serviceBusquedaAutocomplete(search: any, select?: any) {
    this.searchJson.key_word = search;
    this.loaded = true;
    let serverSideFilterItems: any = this.structureJson(await this.serviceComponent.requestService(this.structService!, this.routeService!, this.searchJson))
      if (this.routeService == RouteService.maintenanceAutocompletePersonalGet) {
        this.actualizarListaItems(serverSideFilterItems.results);
      } else {
        this.actualizarListaItems(serverSideFilterItems);
      }

    if(this.emitSearchValue){
      this.searchValue.emit(search);
    }
    this.loaded = false;
    // if (select) {
    //   this.closeSelect(select)
    //   // this.setFilter(select,search);
    //   this.openSelect(select)
    // }

    this.actualizarVista()
  }

  structureJson(result: any[]): any[] {

    if (this.routeService == RouteService.distpatchClientSearchGet) {
      result.forEach(element => {
        element.fontTradeName = element.company.tradeName
      });
    }

    return result;
  }

  onchange($event: any) {
    this.onChange.emit(this.text);
    this.actualizarItemsAdicionales()
  }

  setFilter(select: NgSelectComponent, searchValue: any) {
    select.filter(searchValue)
  }

  closeSelect(select: NgSelectComponent) {
    select.close();
  }

  openSelect(select: NgSelectComponent) {
    select.open();
  }

  actualizarListaItems(serverSideFilterItems: any[]) {
    this.serverSideFilterItems = [];
    let errorServer: ErrorServer|undefined = (serverSideFilterItems) ? serverSideFilterItems as ErrorServer : undefined;
    if (!(errorServer && errorServer.id) && serverSideFilterItems) {
      serverSideFilterItems?.forEach(items => {
        items.adicional = false;
        this.serverSideFilterItems.push(items)
      })
    }
    this.actualizarVista()
  }

  actualizarItemsAdicionales() {
    if (this.lstValoresAdicionales && this.lstValoresAdicionales.length > 0) {
      this.serverSideFilterItems = [];
      this.lstValoresAdicionales.forEach(adicional => {
        adicional.adicional = true;
        this.serverSideFilterItems.push(adicional);
      });
    }
    this.actualizarVista()
  }


  //#region  Search when after typing

  //setup before functions

  ArrowUp(target: any, select: NgSelectComponent) {    
    let txtFind: string = target?.value! as string;
    if (this.typingTimer) clearTimeout(this.typingTimer);                 // Clear if already set     
    this.typingTimer = setTimeout(() => {this.doneTyping(txtFind, select)}, this.doneTypingInterval);
  }

  ArrowDown($event: KeyboardEvent) {
    clearTimeout(this.typingTimer);
  }

  /**user is "finished typing," do something*/
  doneTyping(txtFind: string, select: NgSelectComponent) {
    this.onSearch(txtFind, select, true);
  }

  //#endregion Search when after typing
}
