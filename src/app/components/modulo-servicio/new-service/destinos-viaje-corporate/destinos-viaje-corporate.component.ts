import { Component, OnInit, forwardRef, Input, ChangeDetectionStrategy, DoCheck, ChangeDetectorRef, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Destinations, Destination, ChangePosition } from 'src/app/class/destinations';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as UtilDestinos from './util-destinos';
import { PassengerFront } from 'src/app/class/passenger';
import { Subscription } from 'rxjs';
import { RequestGeoAutocomplete, ResponseGeoAutocomplete } from 'src/app/class/class-directive/serviceGeo';
import { CloneArray } from 'src/app/util/utilCopyWithoutReference';
import { PlaceHolderAutoComplete, LabelPasajero } from 'src/app/class/placeHolderAutocomplete';
import { IdEmpresa, IdClient } from 'src/app/class/typesKeyword';
import { fnValidateViewExist } from 'src/app/util/utilValidate';
import { ObservablesService } from 'src/app/service/observables.service';
import { COMPANY_PARTICULAR_ID } from 'src/app/class/varKerword';
import { ID_Permission } from 'src/app/class/class-directive/permission';
import { ID_Screen } from 'src/app/class/class-directive/enunShortCutService';
import { UserPermissionService } from 'src/app/service/user-permission.service';
import { environment } from 'src/environments/environment';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DestinosViajeCorporateComponent),
  multi: true
};

@Component({
  selector: 'nexus-destinos-viaje-corporate',
  templateUrl: './destinos-viaje-corporate.component.html',
  styleUrls: ['./destinos-viaje-corporate.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class DestinosViajeCorporateComponent implements OnInit, DoCheck, OnChanges {

  
  @Input() placeHolderDirOrigen: string = "Escriba un origen"
  @Input() placeHolderDirDestino: string = "Escriba un destino"

  @Input() lblPsjOrigen: string = "Origen"
  @Input() lblPsjDestino: string = "Pasajero"
  @Input() labelConcat: number = 1;
  @Input() companyId: IdEmpresa = -1;
  @Input() flagSinDireccion: boolean = false;
  @Input() nroViaje?: number;
  @Input() disablePoint:boolean = true;
  

  //Subscription Solicitar
  dataSubscriptionLstPasajeros: Subscription

  lstDestinos: Destinations[] = [];
  @Input() destinations?: Destinations[] = [];
  @Output() destinationsChange = new EventEmitter<Destinations[]>();
  iconoOrigen : string = ""
  iconoDestino : string = ""
  lstPassenger: PassengerFront[] = []

  @Input() cantPasajeros: number = 0;
  @Input() cantAutos: number = 0;
  @Input() estadoViaje?: number = 0;
  @Input() coberturePosition: RequestGeoAutocomplete = new RequestGeoAutocomplete();
  @Output() changePosition: EventEmitter<ChangePosition> = new EventEmitter<ChangePosition>();
  
  @Input() lstFavoritos: ResponseGeoAutocomplete[] = [];
  @Input() clientId?: IdClient;

  cantidadAsientosViaje: number = 0;
  inputOriginEdit: boolean = false;
  inputDestinationEdit: boolean = false;
  
  @Output() onChangeFavoritos: EventEmitter<any> = new EventEmitter<any>();
  
  @Input() cantDestination: number = 8;
  addDestination: boolean = true;
  validateWebCorporative : string = environment.LOGIN

  constructor(
    private ref: ChangeDetectorRef,
    private _seviceObservable: ObservablesService ,    
    private userPermissionService: UserPermissionService,
  ) {
    this.dataSubscriptionLstPasajeros = this._seviceObservable.pasajerosFront$
      .subscribe(requestPasajeros => {
        this.lstPassenger = requestPasajeros as PassengerFront[]
      });
  }

  ngOnInit() {
    this.iconoOrigen = environment.ORIGEN
    this.iconoDestino = environment.DESTINO

  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes)
    if (changes.findInit) {
      console.log('findInit  ', changes.findInit.currentValue)
    }
  }

  ngDoCheck() {
    if ((this.cantPasajeros * this.cantAutos) != this.cantidadAsientosViaje) {
      this.cantidadAsientosViaje = (this.cantPasajeros * this.cantAutos);
      
      this.actualizarVista();
      // this.ref.detectChanges();
    }


  }

  actualizarVista(){
    if(fnValidateViewExist(this.ref)){
      this.ref.detectChanges();
    }
  }

  showAddDestination(): boolean{
    if(this.destinations && this.destinations.length +1 <= this.cantDestination){
      return true;
    } else {
      return false;
    }
  }

  agregarDestino() {
    this.destinations?.push(UtilDestinos.fnInitObjDestinos());
  }

  quitarDestino(indexDestinos: number, tipoDestino: string) {
    this.destinations?.splice(indexDestinos, 1)


    this.lstPassenger.forEach(pasajero => {
      pasajero.frontTipoPasajeroBajada = (pasajero.frontTipoPasajeroBajada == tipoDestino) ? undefined : pasajero.frontTipoPasajeroBajada;
    });
    let lstSubidaTipo: PassengerFront[] = this.lstPassenger.filter(pasajero => pasajero.frontTipoPasajeroSubida == tipoDestino);
    if (lstSubidaTipo) {
      lstSubidaTipo.forEach(element => {
        let indexPass = this.lstPassenger.findIndex(pasajero => pasajero.id == element.id);
        if (indexPass >= 0) {
          this.lstPassenger.splice(indexPass, 1);
        }
      });
    }

    this._seviceObservable.updatePasajerosFront(this.lstPassenger)

    this.actualizarDestination();
  }

  btnAddPasajeroBajada(event: PassengerFront, indexD: number) {
    let index = this.lstPassenger.findIndex(pasajero => pasajero.id == event.id);
    this.lstPassenger[index].frontTipoPasajeroBajada = event.frontTipoPasajeroBajada
    this._seviceObservable.updatePasajerosFront(this.lstPassenger)
  }

  btnRemovePasajeroBajada(event: PassengerFront, indexD: number) {
    let index = this.lstPassenger.findIndex(pasajero => pasajero.id == event.id);
    this.lstPassenger[index].frontTipoPasajeroBajada = undefined;
    this._seviceObservable.updatePasajerosFront(this.lstPassenger)
  }

  btnDeleteAllPasajeroBajada(tipoPasajeroBajada: string) {
    this.lstPassenger.forEach(pasajero => {
      pasajero.frontTipoPasajeroBajada = (pasajero.frontTipoPasajeroBajada == tipoPasajeroBajada) ? undefined : pasajero.frontTipoPasajeroBajada
    });
    this._seviceObservable.updatePasajerosFront(this.lstPassenger)
  }

  btnAddPasajeroSubida($event: PassengerFront, indexD: number) {
    this.lstPassenger.push($event);
    this._seviceObservable.updatePasajerosFront(this.lstPassenger)
  }

  btnRemovePasajeroSubida($event: PassengerFront, indexD: number) {
    let indexPass = this.lstPassenger.findIndex(pasajero => pasajero.id == $event.id)
    this.lstPassenger.splice(indexPass, 1)
    this._seviceObservable.updatePasajerosFront(this.lstPassenger)
  }

  onchangeGeo($event: any, index: number, origen?: boolean) {
    // debugger
    if(this.destinations){
      if (origen) {
        this.destinations[index].origin = (!$event) ? new Destinations() : $event;
      } else {
        this.destinations[index].destination = (!$event) ? new Destinations() : $event;
      }
    }
    this.actualizarDestination(index);
  }

  actualizarDestination(index?: number) {
    let indexForech: number = 0;
    var lstDestination: Destination[] = [];
    this.destinations?.forEach(destinos => {
      if (indexForech == 0) {
        lstDestination.push(destinos.origin!);
      }
      lstDestination.push(destinos.destination!);
      indexForech++;
    });

    var changePosition: ChangePosition = {
      index: (index) ? index : undefined,
      lstDestination: lstDestination
    }

   this.changePosition.emit(changePosition)
  }
  text : any 
  @Input() searchJson: any = new Object();
  serverSideFilterItems: any[] = [];
  emitSearch: boolean = false;
  // onSearch(txtFind: any) {
  //   // this.emitSearch = (!emitSearch) ? true : false;
  //   // txtFind = ((!emitSearch) ? false : true) ? txtFind : txtFind.term;
  //   // if (emitSearch && txtFind && txtFind.length >= this.mainTextOptionLength && !this.findNotAutomatic) {
  //     this.searchJson.key_word = this.text
  //     this.serviceBusquedaAutocomplete(this.text);
  //   // }

  // }
  // actualizarListaItems(serverSideFilterItems: any[]) {
  //   this.serverSideFilterItems = [];
  //   let errorServer: ErrorServer|undefined = (serverSideFilterItems) ? serverSideFilterItems as ErrorServer : undefined;
  //   if (!(errorServer && errorServer.id) && serverSideFilterItems) {
  //     serverSideFilterItems?.forEach(items => {
  //       items.adicional = false;
  //       this.serverSideFilterItems.push(items)
  //     })
  //   }
  //   this.actualizarVista()
  // }
  // async serviceBusquedaAutocomplete(search: any, select?: any) {
  //   this.searchJson.key_word = search;
  //   this.loaded = true;
  //   let serverSideFilterItems: any = this.structureJson(await this.serviceComponent.requestService(this.structService!, this.routeService!, this.searchJson))
  //     if (this.routeService == RouteService.maintenanceAutocompletePersonalGet) {
  //       this.actualizarListaItems(serverSideFilterItems.results);
  //     } else {
  //       this.actualizarListaItems(serverSideFilterItems);
  //     }

  //   if(this.emitSearchValue){
  //     this.searchValue.emit(search);
  //   }
  //   this.loaded = false;
  //   // if (select) {
  //   //   this.closeSelect(select)
  //   //   // this.setFilter(select,search);
  //   //   this.openSelect(select)
  //   // }

  //   this.actualizarVista()
  // }
  
  // structureJson(result: any[]): any[] {

  //   if (this.routeService == RouteService.distpatchClientSearchGet) {
  //     result.forEach(element => {
  //       element.fontTradeName = element.company.tradeName
  //     });
  //   }

  //   return result;
  // }


  actualizarDestinationOnChange(lstDestinos: Destinations[]) {
    
    for (let i = 0; i < this.destinations?.length!; i++) {
      if(this.destinations && this.destinations[i].origin && this.destinations[i].destination && lstDestinos[i] && lstDestinos[i].origin && lstDestinos[i].destination){
        this.destinations[i].origin!.addressMainText = lstDestinos[i].origin?.addressMainText;
        this.destinations[i].origin!.addressSecondaryText = lstDestinos[i].origin?.addressSecondaryText;
        this.destinations[i].origin!.latitude = lstDestinos[i].origin?.latitude;
        this.destinations[i].origin!.longitude = lstDestinos[i].origin?.longitude;
        this.destinations[i].origin!.number = lstDestinos[i].origin?.number;
        this.destinations[i].origin!.zoneDescription = lstDestinos[i].origin?.zoneDescription
        this.destinations[i].origin!.zoneId = lstDestinos[i].origin?.zoneId
        this.destinations[i].origin!.addressMainText = lstDestinos[i].origin?.addressMainText
        this.destinations[i].origin!.addressSecondaryText = lstDestinos[i].origin?.addressSecondaryText
        this.destinations[i].destination!.latitude = lstDestinos[i].destination?.latitude
        this.destinations[i].destination!.longitude = lstDestinos[i].destination?.longitude
        this.destinations[i].destination!.number = lstDestinos[i].destination?.number
        this.destinations[i].destination!.zoneDescription = lstDestinos[i].destination?.zoneDescription
        this.destinations[i].destination!.zoneId = lstDestinos[i].destination?.zoneId      
      }
    }
  }

  onChangeFavoritosEmit(){    
    this.onChangeFavoritos.emit();
  }

  btnEditOrigin(origin: boolean) {
    if(origin){
      this.inputOriginEdit = (this.inputOriginEdit) ? false : true;
    }else{
      this.inputDestinationEdit = (this.inputDestinationEdit) ? false: true;
    }
  }

  //#region Permission
  flagHavePermission(permission: string): boolean{
    return this.userPermissionService.getPermission(permission as ID_Permission , ID_Screen.MODAL_TRAVEL);
  }
  //#endregion Permission
}
