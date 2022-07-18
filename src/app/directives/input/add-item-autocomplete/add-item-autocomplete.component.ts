import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AutoCompleteDriver, MatchDocumentType } from 'src/app/class/driver';
import { PlaceHolderAutoComplete } from 'src/app/class/placeHolderAutocomplete';
import { AutocompleteVehicle } from 'src/app/class/vehicle';
import { ServiceStructService } from 'src/app/util/serviceService/service-struct.service';
import { RouteService, StructService } from 'src/app/util/serviceService/serviceStruct';
import { fnValidateViewExist } from 'src/app/util/utilValidate';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AddItemAutocompleteComponent),
  multi: true
};

@Component({
  selector: 'nexus-add-item-autocomplete',
  templateUrl: './add-item-autocomplete.component.html',
  styleUrls: ['./add-item-autocomplete.component.scss']
})
export class AddItemAutocompleteComponent implements OnInit, AfterViewInit {

  @Input() listMatch: any[] = [];
  @Input() selectMatch?: any;
  @Output() selectMatchChange: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  list: any[] = [];

  /*
  * Represents the label that will be shown what you want to search for
  */
  @Input() bindLabel?: string;

  /*
  * Represents the value to recive when to select one option
  */
  @Input() bindValue?: string;
  /*
  * Response events, then you change results
  */
  @Output() onChange: EventEmitter<any> = new EventEmitter();
   /*
  * Structure for service
  */
  @Input() structService?: StructService;
  /*
  * type route for service
  */
  @Input() routeService?: RouteService;
  /*
  * Placeholder of the input
  */
  @Input() placeHolder: string = PlaceHolderAutoComplete.plh_Default;
  /*
  * Represents the number of letters needed to query the server
  */
  @Input() mainTextOptionLength: number = 1;
  /*
  * Json to request for service
  */
  @Input() searchJson: any = new Object();
  /*
   * Type search 
   */
  @Input() typeSearch?: string;
  /*
   * Type Document 
   */
  @Input() documentId?: number;

  @ViewChild('select') select?: NgSelectComponent;
  @Input() flagFocus: boolean = false;
  
  constructor(
    private ref: ChangeDetectorRef,
    private serviceComponent: ServiceStructService,
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    if(this.flagFocus){
      this.setFocus();
    }
  }

  setFocus(){
    this.select?.focus();
  }

  async onSearch($event: any){
    if($event && $event.term.length >= 1){
      this.loading = true;
      let lstMatch: any;
      if(this.routeService == RouteService.maintenanceVehicleMatchLicensePlateGet) {
        lstMatch = await this.serviceComponent.requestService(this.structService!, this.routeService!, $event.term) as AutocompleteVehicle;
      }else if (this.routeService == RouteService.maintenanceVehicleMatchCodeGet) {
        lstMatch = await this.serviceComponent.requestService(this.structService!, this.routeService!, $event.term) as AutocompleteVehicle;
      } else if (this.routeService == RouteService.maintenanceDriverMatchCodeGet) {
        lstMatch = await this.serviceComponent.requestService(this.structService!, this.routeService!, $event.term) as AutoCompleteDriver;
      } else if (this.routeService == RouteService.maintenanceDriverMatchEmailGet) {        
        lstMatch = await this.serviceComponent.requestService(this.structService!, this.routeService!, $event.term) as AutoCompleteDriver;
      } else if (this.routeService == RouteService.maintenanceDriverMatchDocumentGet) {
        let jsonSeacrh = {
          document_type_id: (this.documentId) ? this.documentId : -1,
          document_number: $event.term
        }
        lstMatch = await this.serviceComponent.requestService(this.structService!, this.routeService!, jsonSeacrh) as MatchDocumentType;
      }

      if(lstMatch && lstMatch.isCoincidence){
        this.listMatch = lstMatch.listMatch!;
        this.onChange.emit($event.term);
      } else {
        this.selectMatch = $event.term;
        this.onChange.emit($event.term);
      }
      this.loading = false;
    }
  }

  onchange($event: any){
    if($event){
      this.onChange.emit(this.selectMatch);
    }else {
      this.onChange.emit(null);
    }
  }

  actualizarVista() {
    if (fnValidateViewExist(this.ref)) {
      this.ref.detectChanges();
    }
  }

}
