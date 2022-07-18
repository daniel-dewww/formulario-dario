import { Component, OnInit, Output,EventEmitter, ViewChild, TemplateRef, OnChanges, SimpleChanges, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EstadosViajeGroup } from 'src/app/class/enum/enumEstados';
import { Masterdowload } from 'src/app/class/masterdowload';
import { IdGeneric, IdTrip } from 'src/app/class/typesKeyword';
import { Viaje } from 'src/app/class/viajes';
import { CoreObservableService } from 'src/app/service/core-observable.service';
import { ServiceStructService } from 'src/app/util/serviceService/service-struct.service';
import { RouteService, StructService } from 'src/app/util/serviceService/serviceStruct';
import { returnObjGroup, statusTravelGroup, statusTravelGroupColor } from 'src/app/class/statusType';
import { PersonalisationMarker, TypeMarkers, ValorComparativo } from '../../../class/enum/enumMapa';
import { CancelReasons, RequestCancelService, RequestCancelServiceReason } from '../../../class/request';
import { ModalCancelReasonsComponent } from '../../../directives/modals/modal-cancel-reasons/modal-cancel-reasons.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/service/toast.service';
import { ActivedSuscription, EnunTopicSuscription, SuscriptionWebSocket } from 'src/app/class/class-directive/interfaceWebSocket';
import { WebSocketMqttService } from 'src/app/service/web-socket-mqtt.service';
import { ViajeOpe } from 'src/app/class/operaciones/viajeOpe';
import { Push } from 'src/app/class/class-directive/push';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fnInitObjViajeOpe, validateTypeService, valueFilterSearchType } from './util-operaciones';
import { fnValidateViewExist } from 'src/app/util/utilValidate';
import { fnDateforPlatform, fnFormatTimeTimePlus } from 'src/app/util/utilDate';
import { C_OpeBusqueda } from 'src/app/class/operaciones/busquedaOpe';
import { cloneDeep } from 'lodash';
import { Destinations } from 'src/app/class/destinations';
import { TranslateService } from '@ngx-translate/core';
import { UtilTranslate } from 'src/app/util/utilTranslate';
import { environment } from 'src/environments/environment';
import { ColorStatusLablelMarker } from 'src/app/class/monitoreo-conductores/moniData';
import {MessageService} from 'primeng/api';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
@Component({
  selector: 'nexus-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [MessageService]

})
export class ListComponent implements OnInit,OnDestroy,OnChanges {
  showSinEnvios: boolean = false;
  nroViaje: IdTrip = 0;
  hiddenMap: boolean = false;
  estadoCheck : boolean = true;
  //suscription
  structServiceArray: any = StructService.ARRAY;
  coreObservableSuscription: Subscription;
  dataMaestra: Masterdowload = new Masterdowload();
  viaje: Viaje[] = [];
  viaje2: Viaje[] = [];
  idServicioCurrent: any = null;
  activeService:boolean = true;
  previousService:boolean = false;
  routeServicevalidateCancel: any = RouteService.distpatchServiceCancelClientReasonsGet
  routerCancelar : any = RouteService.distpatchServiceCancelPost
 //#region StructuredCancel
 valueReasonCancel: any = {};
 subscriptionCancel?: Subscription;
 display: boolean;
 subscriptionNroViajeCancel?: Subscription
 @Output() idViajeCancel: EventEmitter<number> = new EventEmitter();
 lstPosiciones: PersonalisationMarker[] = [];
 lstPosiciones2: PersonalisationMarker[] = [];
 titleOrigen: string = 'Origen';
 titleDestino: string = 'Destino';
 servicioListarEnviosActivos : any
 servicioListarEnviosAnteriores : any
 lstOptions: CancelReasons[] = []
  //formulario
  reasonsOptionsForm: FormGroup 
  submitted: boolean = true;
   //#region push
   suscriptions: SuscriptionWebSocket = {
    name: "",
    topic: [EnunTopicSuscription.CLIENT_LIST_CORPORATIVE]
  }

  suscripcionTopic?: ActivedSuscription;
  idClient? : string
  flagAccordion : boolean = false 
  // modal solicitar
  modalSolicitarServicio: BsModalRef = new  BsModalRef();
  @ViewChild('templateSolicitar', { static: true }) templateSolicitar: any;
  commentEnabled: boolean = false;
  
  numberTrip: string = 'El viaje ';
  msjCancel: string = 'Fue ofertado correctamente';
  msjRetirarMovil: string = '';
  modalRef?: BsModalRef;
  tittleOrigen?: string
  tittleDestino?:string
  iconoOrigen?: string
  iconoDestino?: string
  activeState: boolean[] = [true, false, false];
  constructor(
    private router: Router,
    private _coreObservable: CoreObservableService,
    private serviceComponent: ServiceStructService,
    private modalService: NgbModal,
    private _serviceToast: ToastService,
    private webSocketMqtt: WebSocketMqttService,
    private modalServiceNodal: BsModalService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    public translate: TranslateService,
    private messageService: MessageService,
    private breadcrumbService: BreadcrumbService,

  ) {
    // this.tittleOrigen = UtilTranslate(['INFORMACION_MAPA', 'tittle_Origen'], translate.translations[translate.currentLang]);
    // this.tittleDestino = UtilTranslate(['INFORMACION_MAPA', 'tittle_Destino'], translate.translations[translate.currentLang]);
    this.reasonsOptionsForm = this.formBuilder.group({
      'idReason': ['', Validators.required],
      'commentReason': [''],
    });

    this._coreObservable.masterdownload$.subscribe(
      (dataMaster: Masterdowload) => {
        this.dataMaestra = dataMaster;
      }
    );
    this.breadcrumbService.setItems([
      { label: 'Pages' },
      { label: 'Lista Servicios', routerLink: ['/core/list-service'] }
  ]);

   }
   async ngOnInit() {
    this.iconoOrigen = environment.ORIGEN
    this.iconoDestino = environment.DESTINO
    this.idClient = this.dataMaestra.user?.uuid  
    this.suscriptionWebSocket()
    await this.serviceList();
    console.log(this.viaje)
  }
  ngOnDestroy(): void {
    this.limpiarIntervalos();
    this.limpiarIntervalosAnterior()
    if (this.suscripcionTopic) {
      this.webSocketMqtt.ususcribeSuscription(this.suscripcionTopic.id!);
   }
   if (this.coreObservableSuscription) {
    this.coreObservableSuscription.unsubscribe();
  } 
  
  if (this.intervalAvailablePoints) {
    clearTimeout(this.intervalAvailablePoints);
  }
  }
// tabs State
  async tabServiciosActivos() {
    this.activeService = true;
    // this.limpiarIntervalosAnterior()
    this.serviceList()
    console.log('Valor Tab Serv Activos: '+ this.activeService)
  }
  async tabServiciosAnteriores() {
    // this.limpiarIntervalos()
    this.serviceListAnteriores()
    console.log('Valor Tab Serv Anteriores: '+ this.activeService)
  }
  selectOption(data: CancelReasons) {
    if (RouteService.distpatchServiceCancelReasonsGet) {
      if (data.isCommentEnabled) {
        this.commentEnabled = true;
      } else {
        this.reasonsOptionsForm!.get("commentReason")?.setValue("");
        this.commentEnabled = false
      }
    }
  }
  onTabClose(event) {
    this.messageService.add({severity:'info', summary:'Tab Closed', detail: 'Index: ' + event.index})
}

onTabOpen(event) {
    this.messageService.add({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
} 
  private async serviceList() {
    this.viaje = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchMonitorGet, this.dataMaestra.user?.uuid);
    if (this.viaje.length > 0 ) {
      this.actualizarLstPosiciones();
      this.getLstMarkers( this.viaje[0])
           
    }

    // this.servicioListarEnviosActivos =  setInterval(async () => {
    //   this.viaje = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchMonitorGet, this.dataMaestra.user?.uuid);
    // }, 5000);
  }
  private async serviceListAnteriores() {
    let requestSearh = {
      client_id : this.dataMaestra.user?.uuid,
      page : 1 ,
      page_size: -1
    }
    this.activeService = false;
    let data : any
    data = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchMonitorGetBo,requestSearh  )
    this.viaje = data.results
    //  this.servicioListarEnviosAnteriores =  setInterval(async () => {
    //   data = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchMonitorGetBo,requestSearh  )
    //   this.viaje = data.results
    //     }, 5000);
  }



  limpiarIntervalos() {
    clearInterval(this.servicioListarEnviosActivos);
  }
  limpiarIntervalosAnterior() {
    clearInterval(this.servicioListarEnviosAnteriores)
  }
 //#region  push
 suscriptionWebSocket() {
  this.webSocketMqtt.suscribeSuscription(this).then((data) => {
    this.suscripcionTopic = data;
  }).catch((error) => {
    console.log(error);
  })
}
ngOnChanges(changes: SimpleChanges) {
  if (changes.destinos && changes.destinos.currentValue) {
    this.actualizarLstPosiciones();

  }
}

onMessageClientCorporative(dataPush: any) {
  debugger
  var valueObj: any = (dataPush) as any;
  let indexObjViaje = this.viaje.findIndex(viaje => viaje.id == valueObj.serviceId);
  if(indexObjViaje> -1 ){
    //llamar a servicio por id
    this.getService(valueObj)
    if(this.viajeOpen != undefined){
      this.viajeOpen.statusType!.id! = (valueObj.statusTypeId) 
      this.updateLstViajes(indexObjViaje, this.viajeOpen!);
    }


  }
};
viajeOpen : Viaje | undefined
async getService(valueObj : any){
  let viaje  = this.viaje.find(viaje => viaje.id === valueObj.serviceId)
  let json = { service_id : valueObj.serviceId,client_id :this.dataMaestra.user?.uuid}
  this.viajeOpen = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchServiceGetService,json )
  return this.viajeOpen  

}
getTimeDispatch(serviceDateTime: Date, statusTypeId: number) {
  let timeDispatch: number|string;
  if (validateTypeService(statusTypeId)) {
    timeDispatch = Math.floor(+fnDateforPlatform(new Date()) - +new Date(fnDateforPlatform(serviceDateTime))) / 1000;
    timeDispatch = parseFloat((timeDispatch / 60).toFixed(0));
    if (timeDispatch > 30) {
      timeDispatch = '+' + 30;
    }
  } else {
    timeDispatch = 0;
  }

  return timeDispatch;
}
searchAutomatic: boolean = true;

updateLstViajes(indexObjViaje: number, element: any) {
  // debugger
  element = fnInitObjViajeOpe(element);
  if (indexObjViaje > -1) {
    if (this.searchAutomatic) {
      // if(validateStatusSpliceTravel(element.statusType.id)){  
      if (this.viaje[indexObjViaje] && this.viaje[indexObjViaje].id  == element.id) {
        this.updateElementViaje(indexObjViaje, element);
        if(this.viaje[indexObjViaje].statusType?.id == 8){
          delete this.viaje[indexObjViaje]
          this.serviceList()
        }
      } else {
        element.serviceDateTime = fnDateforPlatform(element.serviceDateTime!);
        // element.timeDispatch = this.getTimeDispatch(element.serviceDateTime, element.statusType?.id!);
        this.viaje.push(element);
      }
      // }else{
      //   this.lstViajes.splice(indexObjViaje,1);
      // }
    } else {
      if (this.viaje[indexObjViaje]) {
        this.updateElementViaje(indexObjViaje, element);
        // element.timeDispatch = this.getTimeDispatch(element.serviceDateTime!, element.statusType?.id!);
        // this.lstViajes.push(element)
      }
    }
  } else {
    if (this.validateFiltrosElement(element)) {
      if (this.searchAutomatic) {
        // if(validateStatusSpliceTravel(element.statusType.id) && this.searchAutomatic){
        // element.timeDispatch = this.getTimeDispatch(element.serviceDateTime!, element.statusType?.id!);
        this.viaje.push(element)
        // }
      } else {
        // element.timeDispatch = this.getTimeDispatch(element.serviceDateTime!, element.statusType?.id!);
        this.viaje.push(element)
      }
    }
  }

  this.orderArray()
  this.actualizarVista();
}
orderArray() {
  this.viaje.sort(function (a, b) {
    if (a.serviceDateTime! > b.serviceDateTime!) {
      return 1;
    }
    if (a.serviceDateTime! < b.serviceDateTime!) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }
  );
}
 validateValueInArray(status_id: number[], compareStatusRow: number): boolean {
  if (status_id && status_id.length > 0) {
    let index: number = status_id.findIndex(status => status == compareStatusRow)
    if (index > -1) {
      return true;
    }
  }
  return false
}

validateFiltrosElement(element: Viaje): boolean {
  var responseValidate: boolean = false;
  if 
  (
      (
        fnDateforPlatform(this.filtrosInit?.date_start!) <= fnDateforPlatform(element.serviceDateTime!) &&
        fnDateforPlatform(this.filtrosInit?.date_finish!) >= fnDateforPlatform(element.serviceDateTime!)
      ) 
  ||
      (
        this.filtrosInit?.nofilterByDate &&
        (
        (fnFormatTimeTimePlus(fnDateforPlatform(new Date), -40) <= fnDateforPlatform(element.serviceDateTime!) &&
        fnFormatTimeTimePlus(fnDateforPlatform(new Date), +40) >= fnDateforPlatform(element.serviceDateTime!))
        ||
        (fnDateforPlatform(new Date) >= fnDateforPlatform(element.serviceDateTime!) &&
        EstadosViajeGroup.PENDING == statusTravelGroup(element.statusType?.id!)
        )
      )
    )
    ) 
    {
    // if (
    //   (parseInt(this.filtrosInit.status_type_id) == -1 && 
    //   element.statusType.id != EstadosViaje.TERMINO && 
    //   element.statusType.id != EstadosViaje.CANCELADO_USUARIO)
    //   || 
    //   (parseInt(this.filtrosInit.status_type_id) == element.statusType.id)) {
    if (
      (this.filtrosInit?.lstStatus_type_id?.length == 0 ? true : this.validateValueInArray(this.filtrosInit?.lstStatus_type_id!, element.statusType?.id!)) &&
      (this.filtrosInit?.lstPaymentType?.length == 0 ? true : this.validateValueInArray(this.filtrosInit?.lstPaymentType!, element.paymentType?.id!)) &&
      // (this.filtrosInit?.lstAttributes?.length == 0 ? true : validateArrayInArray(this.filtrosInit?.lstAttributes!, element.companyAttribute!, element.serviceAttribute!, element.vehicleAttribute!)) &&
      valueFilterSearchType(this.filtrosInit!, element)
    ) {
      switch (parseInt(this.filtrosInit!.search_type!)) {
        case 1:
          responseValidate = this.busquedaPorType(element, parseInt(this.filtrosInit?.search_type!));
          break;
        case 2:
          responseValidate = this.busquedaPorType(element, parseInt(this.filtrosInit?.search_type!));
          break;
        case 3:
          responseValidate = this.busquedaPorType(element, parseInt(this.filtrosInit?.search_type!));
          break;
        case 4:
          responseValidate = this.busquedaPorType(element, parseInt(this.filtrosInit?.search_type!));
          break;
        case 5:
          responseValidate = this.busquedaPorType(element, parseInt(this.filtrosInit?.search_type!));
          break;
        default: //valor -1         
          responseValidate = true;
          break;
      }
    }

  } else if (parseInt(this.filtrosInit?.search_type!) == 1) {
    responseValidate = this.busquedaPorType(element, 1);
  }
  return responseValidate
}
filtrosInit?: C_OpeBusqueda;

busquedaPorType(element: Viaje, type: number): boolean {
  var responseValidate: boolean = false;

  switch (type) {
    case 1:
      if ((element.uuid + '') == this.filtrosInit?.key_word) {
        responseValidate = true;
      }
      break;
    case 2:
      if (element.vehicle && element.vehicle.code == this.filtrosInit?.key_word) {
        responseValidate = true;
      }
      break;
    case 3:
      if (element.driver && element.driver.code == this.filtrosInit?.key_word) {
        responseValidate = true;
      }
      break;
    case 4:
      if (element.client) {
        let nameComplete = (element.client.firstName ? element.client.firstName.toLowerCase() : '') + " " + (element.client.firstLastName ? element.client.firstLastName.toLowerCase() : '') + " " + (element.client.secondLastName ? element.client.secondLastName.toLowerCase() : '');
        if (nameComplete.includes(this.filtrosInit?.key_word?.toLowerCase()!)) {
          responseValidate = true;
        }
      }
      break;
    // case 5:
    //   let companyName = element.companyName?.toLowerCase();
    //   if (companyName?.includes(this.filtrosInit?.key_word?.toLowerCase()!)) {
    //     responseValidate = true;
    //   }
    //   break;
  }

  return responseValidate;
}
updateElementViaje(indexObjViaje: number, element: Viaje) {
  this.viaje[indexObjViaje].client = element.client;
  // this.viaje[indexObjViaje].companyName = element.companyName;
  this.viaje[indexObjViaje].driver = element.driver;
  this.viaje[indexObjViaje].exigent = element.exigent;
  this.viaje[indexObjViaje].fixedRate = element.fixedRate;
  this.viaje[indexObjViaje].passenger = element.passenger;
  // this.viaje[indexObjViaje].serviceDateTime = fnDateforPlatform(element.serviceDateTime!);
  this.viaje[indexObjViaje].statusType = element.statusType;
  this.viaje[indexObjViaje].serviceType = element.serviceType;
  this.viaje[indexObjViaje].paymentType = element.paymentType;
  this.viaje[indexObjViaje].currencyType = element.currencyType;
  this.viaje[indexObjViaje].vehicle = element.vehicle;
  this.viaje[indexObjViaje].vip = element.vip;
  this.viaje[indexObjViaje].totalService = element.totalService;
  // this.viaje[indexObjViaje].destinationZone = element.destinationZone;
  // this.viaje[indexObjViaje].originZone = element.originZone;
  this.viaje[indexObjViaje].destinations = element.destinations;
  this.viaje[indexObjViaje].isRetained = element.isRetained;
  // this.viaje[indexObjViaje].timeDispatch = this.getTimeDispatch(element.serviceDateTime!, element.statusType?.id!);

  this.actualizarVista();
}
actualizarVista() {
  if (fnValidateViewExist(this.ref)) {
    this.ref.detectChanges();
  }
}
  loge(state: boolean, envio: Viaje) {
  this.idServicioCurrent = envio.shortId;
    if (state) {
      // this.verMapa(envio); ver mapa
    } else {
      // this.idServicioCurrent = null;
      // this.limpiarMapa(); limpiar mapa
    }
  }
  statusTravelGroup(idTypeService : any ): EstadosViajeGroup{
    return statusTravelGroup(idTypeService)
  }

  statusTravelGroupColor(idTypeService : any): string{

    return statusTravelGroupColor(this.statusTravelGroup(idTypeService));
  }

  goRequestService() {
    // this.limpiarIntervalos();
    // let options = document.getElementsByClassName("nav-link");
    // for (let index = 0; index < options.length; index++) {
    //   const element = options[index];
    //   element.classList.remove("active");
    // }
    // const marcado = document.getElementsByClassName("option-" + environment.MENU.SOLICITAR_SERVICIO);
    // if (marcado != undefined) {
    //   for (let index = 0; index < marcado.length; index++) {
    //     const element = marcado[index];
    //     element.classList.add("active");
    //   }
    // }
    this.router.navigate(['core/servicio/new'])
  }
  valueReasonCancelServiceOption?: any;
  viajeCancelar : Viaje = new Viaje()
  async btnCancelViaje(envio: Viaje) {
    this.display = true
    this.lstOptions = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchServiceCancelReasonsGet,envio.id  )  
    this.viajeCancelar = envio 
    // this.modalSolicitarServicio = this.modalServiceNodal.show(this.templateSolicitar, { class: 'modal-confirm' });

  }
  async CancelService(){

    let request
    let searchJson: RequestCancelService = new RequestCancelService();
    searchJson.reason = new RequestCancelServiceReason();
    searchJson.reason.id = parseInt(this.valueReasonCancelServiceOption.id);
    searchJson.reason.observation = this.valueReasonCancelServiceOption.description;
    searchJson.serviceUuid =  this.viajeCancelar.id.toString();
    searchJson.service_id = this.viajeCancelar.id.toString()
    searchJson.client_id =this.dataMaestra.user?.uuid
    request = searchJson;
    let response = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchServiceCancelPost,request)  
    if(response == null){
      this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
      this.display = false
      await this.serviceList();
    }

  }
  jsonRequest(): any {
    let request: any;
        let searchJson: RequestCancelService = new RequestCancelService();
        searchJson.reason = new RequestCancelServiceReason();
        searchJson.reason.id = parseInt(this.reasonsOptionsForm.get('idReason')?.value);
        searchJson.reason.observation = (this.commentEnabled) ? this.reasonsOptionsForm.get('commentReason')?.value : '';
        searchJson.serviceUuid = this.viajeCancelar.id?.toString();
        searchJson.service_id = this.viajeCancelar.id?.toString()
        searchJson.client_id =this.dataMaestra.user?.uuid
        request = searchJson;
    return request
  }
  fnLstPosicionesByDriver(destinos: Destinations[], viaje: Viaje, tittleOrigen?: string, tittleDestino?: string): PersonalisationMarker[] {
    let lstPosiciones: PersonalisationMarker[] = []
  
  
    var index: number = 0;
    if (destinos) {
      destinos.forEach(destinos => {
        // if (index == 0) {
        //   lstPosiciones.push(this.fnDetalleViajeV2(new google.maps.LatLng(destinos.origin?.latitude!, destinos.origin?.longitude!), true, tittleOrigen!, TypeMarkers.ORIGEN, false))
        // }
        // lstPosiciones.push(this.fnDetalleViajeV2(new google.maps.LatLng(destinos.destination?.latitude!, destinos.destination?.longitude!), true, tittleDestino + ' ' + (index + 1), TypeMarkers.DESTINO, false, (index + 1)))
  
        // index++
      });
    }
  
    if (viaje) {
  
        let tittle = viaje.driver?.firstName + ' ' + viaje.driver?.firstLastName + ' ' + viaje.driver?.secondLastName
  
        if (viaje.location) {
          lstPosiciones.push(this.fnDetalleViajeLabelListServiceWeb(new google.maps.LatLng(viaje.location?.latitude!, viaje.location.longitude!), tittle, -1, viaje.driver?.id + ""))
        }
   
    }
  
    return lstPosiciones
  }
  fnDetalleViajeLabelListServiceWeb(latLng: google.maps.LatLng, tittle: string, isEstado: number, labelSelector: string): PersonalisationMarker {
    let detalle: PersonalisationMarker = new PersonalisationMarker();
  
    detalle.posicion = latLng;
    detalle.showTittle = true;
    detalle.tittle = tittle;
    detalle.tipoMarker = TypeMarkers.CONDUCTOR_LABEL;
    detalle.isDragable = false;
  
    detalle.selector =  ColorStatusLablelMarker.STATUS_DRIVER + isEstado;
    // detalle.labelSelector = labelSelector + '';
    detalle.idEstado = isEstado;
    detalle.estado = ValorComparativo.ESTADO_CONDUCTOR;
    detalle.showInfowindow = true;
    detalle.infoWindow = new google.maps.InfoWindow({
      content: '<b> ' + '   ' + tittle + '</b> '
    });;
  
    return detalle
  }
  
  async requestService(){
    let response = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchServiceCancelPost, this.jsonRequest());
        if (!response) {
          this._serviceToast.showSuccess(this.numberTrip + this.viajeCancelar.shortId + ' ' + this.msjCancel);
          this.idViajeCancel.emit(this.viajeCancelar.shortId)
          // this.closeModal.emit('close')
          this.modalSolicitarServicio.hide()
          this.serviceList()
        }
    
  }  
  enviosServicio : any 
  actualizarLstPosiciones() {

    this.lstPosiciones = cloneDeep(this.fnLstPosicionesByDriver(this.lstDestinos, this.enviosServicio, this.tittleOrigen, this.titleDestino)) 
  }
  lstAvailablePoints : any[]=[]
  intervalAvailablePoints: any;
  selectIndex: number = -1;
  lstDestinos : Destinations[] = []

  async changeService(envio : any, flagAccordion : boolean ){
    this.enviosServicio = envio
    this.flagAccordion = !flagAccordion
    let jsonService = {
      service_id: envio.shortId
    }
    let list : Destinations[] =[]
      var destino = new Destinations
      destino.destination = this.enviosServicio.destinations
      destino.origin = this.enviosServicio.pickup
      list.push(destino)
    // let responseAvailablePoints = await this.serviceComponent.requestService(StructService.ARRAY, RouteService.driversAvailableServicetGet, jsonService) as any[]
    // this.lstAvailablePoints = cloneDeep(responseAvailablePoints);
    // this.lstDestinos = cloneDeep(list);
    this.actualizarLstPosiciones();
    this.getLstMarkers(envio)
    // this.intervalAvailablePoints = setTimeout(() => {
    //   // debugger
    //   this.getLstMarkers(envio)
    //   this.changeService(envio,true);
    // }, 6000);

    this.actualizarVista();
  }

  getLstMarkers(envio : any) {
    let index = 0;
    // this.lstPosiciones = [];
    this.lstPosiciones.push(this.fnDetalleViaje(new google.maps.LatLng(envio.pickup.latitude ,envio.pickup.longitude), TypeMarkers.ORIGEN))
    envio.destinations!.forEach((element: any ) => {
          this.lstPosiciones.push(this.fnDetalleViaje(new google.maps.LatLng(element.latitude, element.longitude), TypeMarkers.DESTINO, (index + 1)))
          index++
      });
      
  }
  fnDetalleViaje(latLng: google.maps.LatLng, tipoMarker: TypeMarkers, index?: number): PersonalisationMarker {
    let detalle: PersonalisationMarker = new PersonalisationMarker();

    detalle.posicion = latLng;
    detalle.showTittle = true;
    detalle.idDestino = (index) ? index : undefined!;
    detalle.tipoMarker = tipoMarker;
    detalle.isDragable = false;
    detalle.showInfowindow = true;

    if (tipoMarker == TypeMarkers.ORIGEN) {
      detalle.tittle = this.titleOrigen;
      detalle.infoWindow = new google.maps.InfoWindow({
        content: '<b> ' + this.titleOrigen + ' </b> '
      });
    } else if (tipoMarker == TypeMarkers.DESTINO) {
      detalle.tittle = this.titleDestino + ' ' + detalle.idDestino;
      detalle.infoWindow = new google.maps.InfoWindow({
        content: '<b> ' + this.titleDestino + ' ' + detalle.idDestino + ' </b> '
      });
    }

    return detalle;
  }

  fnDetalleViajeV2(latLng: google.maps.LatLng, tittle: string, idEstado: number, labelSelector: string, contentInfoWindow: string, detalleEstado: ValorComparativo): PersonalisationMarker {
    let detalle: PersonalisationMarker = new PersonalisationMarker();
  
    if (idEstado) {
      detalle.estado = detalleEstado;
      detalle.selector = "labels-mapa" + " " + detalle.estado + idEstado;
    }
  
  
    detalle.posicion = latLng;
    detalle.showTittle = true;
    detalle.tittle = tittle;
    detalle.tipoMarker = TypeMarkers.CONDUCTOR_LABEL;
    detalle.isDragable = false;
    detalle.showInfowindow = true;
    detalle.labelSelector = labelSelector;
    detalle.idEstado = idEstado;
    detalle.showInfowindow = true;
    detalle.infoWindow = new google.maps.InfoWindow({
      content: contentInfoWindow
    });
  
    return detalle
  }
  async changeService2(envio : any, boolean?: boolean ){
    this.enviosServicio = envio
    let jsonService = {
      service_id: envio.shortId
    }
    let responseAvailablePoints = await this.serviceComponent.requestService(StructService.ARRAY, RouteService.driversAvailableServicetGet, jsonService) as any[]
    this.lstAvailablePoints = cloneDeep(responseAvailablePoints);
    this.actualizarLstPosiciones();
    this.getLstMarkers2(envio)
    // this.intervalAvailablePoints = setTimeout(() => {
    //   this.changeService2(envio,true);
    //   this.getLstMarkers2(envio)
    // }, 6000);

    this.actualizarVista();

  }
  getLstMarkers2(envio : any) {
    let index = 0;
    // this.lstPosiciones2 = [];
    this.lstPosiciones2.push(this.fnDetalleViaje2(new google.maps.LatLng(envio.pickup?.latitude ,envio.pickup?.longitude), TypeMarkers.ORIGEN))
    envio?.destinations?.forEach((element: any ) => {
          this.lstPosiciones2.push(this.fnDetalleViaje2(new google.maps.LatLng(element.latitude, element.longitude), TypeMarkers.DESTINO, (index + 1)))
          index++
      });
  }
  fnDetalleViaje2(latLng: google.maps.LatLng, tipoMarker: TypeMarkers, index?: number): PersonalisationMarker {
    let detalle: PersonalisationMarker = new PersonalisationMarker();

    detalle.posicion = latLng;
    detalle.showTittle = true;
    detalle.idDestino = (index) ? index : undefined!;
    detalle.tipoMarker = tipoMarker;
    detalle.isDragable = false;
    detalle.showInfowindow = true;

    if (tipoMarker == TypeMarkers.ORIGEN) {
      detalle.tittle = this.titleOrigen;
      detalle.infoWindow = new google.maps.InfoWindow({
        content: '<b> ' + this.titleOrigen + ' </b> '
      });
    } else if (tipoMarker == TypeMarkers.DESTINO) {
      detalle.tittle = this.titleDestino + ' ' + detalle.idDestino;
      detalle.infoWindow = new google.maps.InfoWindow({
        content: '<b> ' + this.titleDestino + ' ' + detalle.idDestino + ' </b> '
      });
    }

    return detalle;
  }
  get f() {
    return this.reasonsOptionsForm!.controls;
  }
  onSubmit() {
    this.submitted = true;
  }

}
