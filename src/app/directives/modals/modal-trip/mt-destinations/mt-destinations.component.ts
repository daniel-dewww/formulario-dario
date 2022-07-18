import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LabelPasajero, PlaceHolderAutoComplete } from 'src/app/class/placeHolderAutocomplete';
import { IdClient, IdEmpresa } from 'src/app/class/typesKeyword';
import { MT_ChangePosition, MT_Destination, MT_Destinations, MT_PassengerFront, MT_RequestGeoAutocomplete, MT_ResponseGeoAutocomplete } from './mt-destinations.class';
import { Subscription } from 'rxjs';
import { UserPermissionService } from 'src/app/core/service/user-permission.service';
import { ObservablesService } from 'src/app/core/service/observables.service';
import { fnValidateViewExist } from 'src/app/util/utilValidate';
import { ID_Permission } from 'src/app/class/class-directive/permission';
import { ID_Screen } from 'src/app/class/class-directive/enunShortCutService';
import { MtDestinationsService } from './mt-destinations.service';

@Component({
  selector: 'nexus-mt-destinations',
  templateUrl: './mt-destinations.component.html',
  styleUrls: ['./mt-destinations.component.scss']
})
export class MtDestinationsComponent implements OnInit {

  @Input() placeHolderDirOrigen: string = PlaceHolderAutoComplete.plh_DirOrigen;
  @Input() placeHolderDirDestino: string = PlaceHolderAutoComplete.plh_DirDestino;
  @Input() companyId: IdEmpresa = -1;
  @Input() flagSinDireccion: boolean = false;
  @Input() nroViaje?: number;

  lstPassenger: MT_PassengerFront[] = [];
  @Input() cantPasajeros: number = 0;
  @Input() cantAutos: number = 0;
  @Input() coberturePosition: MT_RequestGeoAutocomplete = new MT_RequestGeoAutocomplete();
  @Output() changePosition: EventEmitter<MT_ChangePosition> = new EventEmitter<MT_ChangePosition>();

  @Input() destinations: MT_Destinations[] = [];
  @Output() destinationsChange = new EventEmitter<MT_Destinations[]>();

  @Input() lstFavoritos: MT_ResponseGeoAutocomplete[] = [];
  @Input() clientId?: IdClient;
  @Output() onChangeFavoritos: EventEmitter<any> = new EventEmitter<any>();

  cantidadAsientosViaje: number = 0;
  inputOriginEdit: boolean = false;
  inputDestinationEdit: boolean = false;
  
  //Subscription Solicitar
  dataSubscriptionLstPasajeros: Subscription;
  
  constructor(    
    private ref: ChangeDetectorRef,
    private _serviceObservable: ObservablesService,
    private userPermissionService: UserPermissionService,
    private destinationsService: MtDestinationsService
  ) {
    this.dataSubscriptionLstPasajeros = this._serviceObservable.pasajerosFront$
      .subscribe(requestPasajeros => {
        this.lstPassenger = requestPasajeros as MT_PassengerFront[];
      });
  }

  ngOnInit(): void {}

  ngDoCheck() {
    if ((this.cantPasajeros * this.cantAutos) != this.cantidadAsientosViaje) {
      this.cantidadAsientosViaje = (this.cantPasajeros * this.cantAutos);      
      this.actualizarVista();
    }
  }

  actualizarVista(){
    if(fnValidateViewExist(this.ref)){
      this.ref.detectChanges();
    }
  }

  agregarDestino() {
    this.destinations?.push(this.destinationsService.fnInitObjDestinos());
  }
  
  quitarDestino(indexDestinos: number, tipoDestino: string) {
    this.destinations?.splice(indexDestinos, 1);
    this.lstPassenger.forEach(pasajero => {
      pasajero.frontTipoPasajeroBajada = (pasajero.frontTipoPasajeroBajada == tipoDestino) ? undefined : pasajero.frontTipoPasajeroBajada;
    });
    let lstSubidaTipo: MT_PassengerFront[] = this.lstPassenger.filter(pasajero => pasajero.frontTipoPasajeroSubida == tipoDestino);
    if (lstSubidaTipo) {
      lstSubidaTipo.forEach(element => {
        let indexPass = this.lstPassenger.findIndex(pasajero => pasajero.id == element.id);
        if (indexPass >= 0) {
          this.lstPassenger.splice(indexPass, 1);
        }
      });
    }

    this._serviceObservable.updatePasajerosFront(this.lstPassenger);
    this.actualizarDestination();
  }

  actualizarDestination(index?: number) {
    let indexForech: number = 0;
    var lstDestination: MT_Destination[] = [];
    this.destinations?.forEach(destinos => {
      if (indexForech == 0) {
        lstDestination.push(destinos.origin!);
      }
      lstDestination.push(destinos.destination!);
      indexForech++;
    });

    var changePosition: MT_ChangePosition = {
      index: (index) ? index : undefined,
      lstDestination: lstDestination
    };

    this.changePosition.emit(changePosition);
  }

  onchangeGeo($event: any, index: number, origen?: boolean) {    
    if(this.destinations){
      if (origen) {
        this.destinations[index].origin = (!$event) ? new MT_Destinations() : $event;
      } else {
        this.destinations[index].destination = (!$event) ? new MT_Destinations() : $event;
      }
    }
    this.actualizarDestination(index);
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

  // lstDestinos: MT_Destinations[] = [];
  // @Input() lblPsjOrigen: string = LabelPasajero.lbl_Origen;
  // @Input() lblPsjDestino: string = LabelPasajero.lbl_Destino;
  // @Input() labelConcat: number = 1;

  // btnAddPasajeroBajada(event: MT_PassengerFront, indexD: number) {
  //   let index = this.lstPassenger.findIndex(pasajero => pasajero.id == event.id);
  //   this.lstPassenger[index].frontTipoPasajeroBajada = event.frontTipoPasajeroBajada
  //   this._serviceObservable.updatePasajerosFront(this.lstPassenger)
  // }

  // btnRemovePasajeroBajada(event: MT_PassengerFront, indexD: number) {
  //   let index = this.lstPassenger.findIndex(pasajero => pasajero.id == event.id);
  //   this.lstPassenger[index].frontTipoPasajeroBajada = undefined;
  //   this._serviceObservable.updatePasajerosFront(this.lstPassenger)
  // }

  // btnDeleteAllPasajeroBajada(tipoPasajeroBajada: string) {
  //   this.lstPassenger.forEach(pasajero => {
  //     pasajero.frontTipoPasajeroBajada = (pasajero.frontTipoPasajeroBajada == tipoPasajeroBajada) ? undefined : pasajero.frontTipoPasajeroBajada
  //   });
  //   this._serviceObservable.updatePasajerosFront(this.lstPassenger)
  // }

  // btnAddPasajeroSubida($event: MT_PassengerFront, indexD: number) {
  //   this.lstPassenger.push($event);
  //   this._serviceObservable.updatePasajerosFront(this.lstPassenger)
  // }

  // btnRemovePasajeroSubida($event: MT_PassengerFront, indexD: number) {
  //   let indexPass = this.lstPassenger.findIndex(pasajero => pasajero.id == $event.id)
  //   this.lstPassenger.splice(indexPass, 1)
  //   this._serviceObservable.updatePasajerosFront(this.lstPassenger)
  // }  

  // actualizarDestinationOnChange(lstDestinos: MT_Destinations[]) {
    
  //   for (let i = 0; i < this.destinations?.length!; i++) {
  //     if(this.destinations && this.destinations[i].origin && this.destinations[i].destination && lstDestinos[i] && lstDestinos[i].origin && lstDestinos[i].destination){
  //       this.destinations[i].origin!.addressMainText = lstDestinos[i].origin?.addressMainText;
  //       this.destinations[i].origin!.addressSecondaryText = lstDestinos[i].origin?.addressSecondaryText;
  //       this.destinations[i].origin!.latitude = lstDestinos[i].origin?.latitude;
  //       this.destinations[i].origin!.longitude = lstDestinos[i].origin?.longitude;
  //       this.destinations[i].origin!.number = lstDestinos[i].origin?.number;
  //       this.destinations[i].origin!.zoneDescription = lstDestinos[i].origin?.zoneDescription
  //       this.destinations[i].origin!.zoneId = lstDestinos[i].origin?.zoneId
  //       this.destinations[i].origin!.addressMainText = lstDestinos[i].origin?.addressMainText
  //       this.destinations[i].origin!.addressSecondaryText = lstDestinos[i].origin?.addressSecondaryText
  //       this.destinations[i].destination!.latitude = lstDestinos[i].destination?.latitude
  //       this.destinations[i].destination!.longitude = lstDestinos[i].destination?.longitude
  //       this.destinations[i].destination!.number = lstDestinos[i].destination?.number
  //       this.destinations[i].destination!.zoneDescription = lstDestinos[i].destination?.zoneDescription
  //       this.destinations[i].destination!.zoneId = lstDestinos[i].destination?.zoneId      
  //     }
  //   }
  // }

}
