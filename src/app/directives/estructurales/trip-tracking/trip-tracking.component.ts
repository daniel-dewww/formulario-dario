import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestGeoAutocomplete } from 'src/app/class/class-directive/serviceGeo';
import { changePositionMarker } from 'src/app/class/operaciones/viajeOpe';
import { PersonalisationMarker, TypeMarkers, PersonalisationPolyline } from 'src/app/class/enum/enumMapa';
import { ServiceStructService } from 'src/app/util/serviceService/service-struct.service';
import { StructService, RouteService } from 'src/app/util/serviceService/serviceStruct';
import * as UtilDate from 'src/app/util/utilDate';
import { TrackingViaje, Events, Coordinate, Detail } from 'src/app/class/class-directive/trackingTrip';
import { ToastService } from 'src/app/core/service/toast.service';
import { UtilTranslate } from 'src/app/util/utilTranslate';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ID_Screen, ValueKey } from 'src/app/class/class-directive/enunShortCutService';
import { ShortCutInternal } from 'src/app/core/admin-layout/admin-layout-util';
import { ShortCutService } from 'src/app/core/service/short-cut.service';
import { ActivedSuscription, NG_ShortCut, SC_ShortCut_Json, ShortCut } from 'src/app/class/class-directive/shortCutService';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'nexus-trip-tracking',
  templateUrl: './trip-tracking.component.html',
  styleUrls: ['./trip-tracking.component.scss']
})
export class TripTrackingComponent implements OnInit, OnDestroy, NG_ShortCut {

  coberturePosition: RequestGeoAutocomplete = {
    longitude: -76.9928316,
    latitude: -12.1251109
  };

  @Input() uuidService?: string;
  @Input() nroViaje?: string;

  objTrackingViaje: TrackingViaje = new TrackingViaje();
  lstPosiciones: PersonalisationMarker[] = [];
  lstCoordinateEncoded: PersonalisationPolyline[] = [];

  //#region Translate Tittle
  translateSuscription: Subscription;
  markerStart: string = 'Inicio';
  markerPreClose: string = 'Pre Cierre';
  markerClose: string = 'Cierre';
  markerCheckPoint: string = 'Punto Llegada';
  markerReading: string = 'Leído';
  markerContact: string = 'Contacto';
  markerStartDestination: string = 'Inicio Destino';
  markerEndDestination: string = 'Fin Destino';
  markerEnd: string = 'Fin';

  velocidad: string = 'Velocidad';
  fecha: string = 'Fecha';
  //#endregion Translate Tittle

  @Input() keysInternalId: ID_Screen = ID_Screen.MODAL_AUDIT_TRIP;
  lstshortCut: ShortCut[] = cloneDeep(ShortCutInternal(environment.SHORT_CUT as SC_ShortCut_Json, ID_Screen.MODAL_AUDIT_TRIP));
  private suscripcionShortCut?: ActivedSuscription;

  constructor(    
    public activeModal: NgbActiveModal,
    private serviceComponent: ServiceStructService,
    private _serviceToast: ToastService,
    public translate: TranslateService,
    private modalService: NgbModal,
    private shortCutService: ShortCutService,
  ) {
    this.markerStart = UtilTranslate(['MODAL_TRACKING','tittle_Start'], translate.translations[translate.currentLang]);
    this.markerPreClose = UtilTranslate(['MODAL_TRACKING','tittle_PreClose'], translate.translations[translate.currentLang]);
    this.markerClose = UtilTranslate(['MODAL_TRACKING','tittle_Close'], translate.translations[translate.currentLang]);
    this.markerCheckPoint = UtilTranslate(['MODAL_TRACKING','tittle_CheckPoint'], translate.translations[translate.currentLang]);
    this.markerReading = UtilTranslate(['MODAL_TRACKING','tittle_Reading'], translate.translations[translate.currentLang]);
    this.markerContact = UtilTranslate(['MODAL_TRACKING','tittle_Contact'], translate.translations[translate.currentLang]);
    this.markerStartDestination = UtilTranslate(['MODAL_TRACKING','tittle_StartDestination'], translate.translations[translate.currentLang]);
    this.markerEndDestination = UtilTranslate(['MODAL_TRACKING','tittle_EndDestination'], translate.translations[translate.currentLang]);
    this.markerEnd = UtilTranslate(['MODAL_TRACKING','tittle_End'], translate.translations[translate.currentLang]);
    this.velocidad = UtilTranslate(['MODAL_TRACKING','lbl_velocidad'], translate.translations[translate.currentLang]);
    this.fecha = UtilTranslate(['MODAL_TRACKING','lbl_fecha'], translate.translations[translate.currentLang]);
  
    this.translateSuscription = this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.markerStart = UtilTranslate(['MODAL_TRACKING','tittle_Start'], event.translations);
      this.markerPreClose = UtilTranslate(['MODAL_TRACKING','tittle_PreClose'], event.translations);
      this.markerClose = UtilTranslate(['MODAL_TRACKING','tittle_Close'], event.translations);
      this.markerCheckPoint = UtilTranslate(['MODAL_TRACKING','tittle_CheckPoint'], event.translations);
      this.markerReading = UtilTranslate(['MODAL_TRACKING','tittle_Reading'], event.translations);
      this.markerContact = UtilTranslate(['MODAL_TRACKING','tittle_Contact'], event.translations);
      this.markerStartDestination = UtilTranslate(['MODAL_TRACKING','tittle_StartDestination'], event.translations);
      this.markerEndDestination = UtilTranslate(['MODAL_TRACKING','tittle_EndDestination'], event.translations);
      this.markerEnd = UtilTranslate(['MODAL_TRACKING','tittle_End'], event.translations);
      this.velocidad = UtilTranslate(['MODAL_TRACKING','lbl_velocidad'], event.translations);
      this.fecha = UtilTranslate(['MODAL_TRACKING','lbl_fecha'], event.translations);
    })
  }

  ngOnInit(): void {
    this.suscription();
    if(this.uuidService){
      this.getTracking(this.uuidService);
    }
  }

  ngOnDestroy(){
    if (this.shortCutService) {
      this.shortCutService.ususcribeShortCut(this.suscripcionShortCut?.id!);
    }
  }

  async onChangeMapMarkers($event: changePositionMarker){
    console.log('$event', $event);
  }

  async getTracking(uuidService: string){
    let tracking: TrackingViaje = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchTrackingGet, uuidService);
    tracking = this.validateTracking(tracking);

    if(tracking && tracking.coordinatesEncoded){
      let lstPosiciones: PersonalisationMarker[] = [];
      let coordinateEncoded: PersonalisationPolyline[] = [];
      let detail: PersonalisationMarker;
      let typeMarker: any;

      for(let i = 0; i <= tracking.events!.length -1; i++){
        if(i == 0) {
          let DateString = UtilDate.dateTimeString(tracking.events![i].detail!.datetime!);
          typeMarker = this.getTypeMarker(tracking.events![i].type!);
          detail = {
            posicion: new google.maps.LatLng(tracking.events![i].coordinate!.latitude!, tracking.events![i].coordinate!.longitude!),
            showTittle: true,
            idDestino: undefined!,
            tipoMarker: typeMarker.marker,
            isDragable: false,
            showInfowindow: true,
            tittle: typeMarker.tittle,
            infoWindow: new google.maps.InfoWindow({
              content:
                '<b> ' + this.fecha + DateString + '</b><br>' +
                '<b> ' + this.velocidad + tracking.events![i].detail!.speed!.toFixed(2) + ' Km/h' + ' </b><br>'
            })
          }
        }else {          
          typeMarker = this.getTypeMarker(tracking.events![i].type!);
          let DateString = UtilDate.dateTimeString(tracking.events![i].detail!.datetime!);
          if(tracking.events![i].type == 'RIDE_CHECKPOINT'){
            detail = {
              posicion: new google.maps.LatLng(tracking.events![i].coordinate!.latitude!, tracking.events![i].coordinate!.longitude!),
              showTittle: true,
              idDestino: undefined!,
              tipoMarker: typeMarker.marker,
              isDragable: false,
              showInfowindow: false,
              tittle: this.fecha + DateString + ' - ' + this.velocidad + tracking.events![i].detail!.speed!.toFixed(2) + ' Km/h',
              infoWindow: undefined!
            }
          }else{
            detail = {
              posicion: new google.maps.LatLng(tracking.events![i].coordinate!.latitude!, tracking.events![i].coordinate!.longitude!),
              showTittle: true,
              idDestino: undefined!,
              tipoMarker: typeMarker.marker,
              isDragable: false,
              showInfowindow: true,
              tittle: typeMarker.tittle,
              infoWindow: new google.maps.InfoWindow({
                content:
                '<b> ' + this.fecha + DateString + '</b><br>' +
                '<b> ' + this.velocidad + tracking.events![i].detail!.speed!.toFixed(2) + ' Km/h' + ' </b>'
              })
            }

          }
        }
        lstPosiciones.push(detail);
      }

      for(let i = 0; i <= tracking.coordinatesEncoded.length-1; i++){
        coordinateEncoded.push({coordinateEncoded: tracking.coordinatesEncoded[i].coordinateEncoded!, color: tracking.coordinatesEncoded[i].color})
      }

      this.lstCoordinateEncoded = coordinateEncoded;
      this.lstPosiciones = lstPosiciones;
    }else{
      this.activeModal.close('Cross click');
      this._serviceToast.showInfo('El viaje no tiene Tracking.');
    }
  }

  getTypeMarker(type: string){
    let objType: Object = new Object();
    let marker: TypeMarkers;
    let tittle: string;

    switch (type) {
      case 'RIDE_START':
        marker = TypeMarkers.ORIGEN;
        tittle = this.markerStart;
        break;
      case 'RIDE_PRECLOSE':
        marker = TypeMarkers.PRECLOSE;
        tittle = this.markerPreClose;
        break;
      case 'RIDE_CLOSE':
        marker = TypeMarkers.DESTINO;
        tittle = this.markerClose;
        break;
      case 'RIDE_CHECKPOINT':
        marker = TypeMarkers.CHECKPOINT;
        tittle = this.markerCheckPoint;
        break;
      case 'RIDE_READING':
        marker = TypeMarkers.READING;
        tittle = this.markerReading;
        break;
      case 'RIDE_CONTACT':
        marker = TypeMarkers.CONTACT;
        tittle = this.markerContact;
        break;
      case 'RIDE_START_DESTINATION':
        marker = TypeMarkers.START_DESTINATION;
        tittle = this.markerStartDestination;
        break;
      case 'RIDE_END_DESTINATION':
        marker = TypeMarkers.END_DESTINATION;
        tittle = this.markerEndDestination;
        break;
      case 'RIDE_END':
        marker = TypeMarkers.RIDE_END;
        tittle = this.markerEnd;
        break;
    }

    return objType = {
      marker: marker!,
      tittle: tittle!
    };
  }

  validateTracking(tracking: TrackingViaje) {
    let validate: TrackingViaje = new TrackingViaje();
    let events: Events[] = [];
    let coordinatesEncoded: PersonalisationPolyline[] = [];

    if(tracking.coordinatesEncoded && tracking.coordinatesEncoded.length >= 0){
      for(let i = 0; i <= tracking.coordinatesEncoded.length -1; i++){
        let coordinateEncoded = (tracking.coordinatesEncoded[i].coordinateEncoded) ? tracking.coordinatesEncoded[i].coordinateEncoded : '';
        let color = (tracking.coordinatesEncoded[i].color) ? tracking.coordinatesEncoded[i].color : '';
        coordinatesEncoded.push({coordinateEncoded: coordinateEncoded!, color: color})
      }
    }

    if(tracking.events && tracking.events.length >= 0){
      for(let i = 0; i <= tracking.events.length -1; i++){
        let event: Events = new Events();        
        let detail: Detail = new Detail();
        let coordinate: Coordinate = new Coordinate();

        let bearing = (tracking.events[i].detail!.bearing) ? tracking.events[i].detail!.bearing : 0;
        let datetime = (tracking.events[i].detail!.datetime) ? tracking.events[i].detail!.datetime : '';
        let destinationUuid = (tracking.events![i].detail!.destinationUuid) ? tracking.events[i].detail!.destinationUuid : '';
        let signal = (tracking.events[i].detail!.signal) ? tracking.events[i].detail!.signal : 0;
        let speed = (tracking.events[i].detail!.speed) ? tracking.events[i].detail!.speed : 0;

        let latitude = (tracking.events[i].coordinate!.latitude) ? tracking.events[i].coordinate!.latitude : 0;
        let longitude = (tracking.events[i].coordinate!.longitude) ? tracking.events[i].coordinate!.longitude : 0;

        let type = (tracking.events[i].type) ? tracking.events[i].type : 'RIDE_START';

        detail = {
          bearing: bearing,
          datetime: datetime,
          destinationUuid: destinationUuid,
          signal: signal,
          speed: speed
        }

        coordinate = {
          latitude: latitude,
          longitude: longitude
        }

        event = {
          coordinate: coordinate,
          detail: detail,
          type: type
        }
        events.push(event);
      }
    }
    
    validate = {
      coordinatesEncoded: coordinatesEncoded,
      events: events
    }
    return validate;
  }

  private suscription() {
    this.shortCutService.suscribeShortCut(this).then((suscription) => {
      this.suscripcionShortCut = suscription;
    }).catch((error) => {
      console.log(error);
      throw error;
    })
  }

  keyCode(key: ShortCut) {
    if (key && key.value) {
      switch (key.value) {
        case ValueKey.CLOSE_MODAL:
          if (this.modalService.hasOpenModals()) {
            this.activeModal.close('Close click')
          }
          break
      }
    }
  }

}
