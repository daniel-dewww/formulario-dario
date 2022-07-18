import { AfterViewInit, Attribute, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { cloneDeep } from'lodash';
import { ShortcutInput } from 'ng-keyboard-shortcuts';
import { Subscription } from 'rxjs';
import { CenterCost, RequestDistpatchCenterCost } from 'src/app/class/centerCost';
import { Component_ModalTravel, ID_Screen, ValueKey } from 'src/app/class/class-directive/enunShortCutService';
import { ActivedSuscription, EnunTopicSuscription, SuscriptionWebSocket } from 'src/app/class/class-directive/interfaceWebSocket';
import { ID_Permission, ID_PermissionModal } from 'src/app/class/class-directive/permission';
import { PostOperatorOperatorIdAlertCallNotify, Push } from 'src/app/class/class-directive/push';
import { CoordinateAutocomplete, RequestGeoAutocomplete, ResponseGeoAutocomplete } from 'src/app/class/class-directive/serviceGeo';
import { NG_ShortCut, SC_ShortCut_Json, ShortCut } from 'src/app/class/class-directive/shortCutService';
import { Client } from 'src/app/class/cliente';
import { Company } from 'src/app/class/company';
import { Coverage } from 'src/app/class/coverages';
import { CurrencyType } from 'src/app/class/currencyType';
import { ChangePosition, Destination, Destinations } from 'src/app/class/destinations';
import { Driver, DriverAvailable } from 'src/app/class/driver';
import { EstadosViaje, ValidateStructureButton } from 'src/app/class/enum/enumEstados';
import { PersonalisationMarker, PersonalisationPolyline, TypeMarkers } from 'src/app/class/enum/enumMapa';
import { ErrorServer } from 'src/app/class/errorServer';
import { Favorite, RequestGetFavorite } from 'src/app/class/favorite';
import { GenericObject } from 'src/app/class/genericObject';
import { Masterdowload } from 'src/app/class/masterdowload';
import { ModeReserve } from 'src/app/class/modeReserve';
import { GeneralObj, Offers, PaymentAvailable, Request_Offer, Response_Offer } from 'src/app/class/operaciones/offer';
import { changePositionMarker, ViajeOpe } from 'src/app/class/operaciones/viajeOpe';
import { PassengerFront } from 'src/app/class/passenger';
import { PlaceHolderAutoComplete } from 'src/app/class/placeHolderAutocomplete';
import { CancelReasons, RequestOffer } from 'src/app/class/request';
import { ServiceType, statusTypeService } from 'src/app/class/serviceType';
import { StatusType } from 'src/app/class/statusType';
import { IdClient, IdEmpresa, IdGeneric, IdTrip } from 'src/app/class/typesKeyword';
import { COMPANY_PARTICULAR_ID, Var_ModoReservaBase } from 'src/app/class/varKerword';
import { Vehicle } from 'src/app/class/vehicle';
import { ForOtherUser, ResponseDynamicFields, Viaje } from 'src/app/class/viajes';
// import { CoreObservableService } from 'src/app/core/service/core-observable.service';
// import { ObservablesService } from 'src/app/core/service/observables.service';
// import { ShortCutService } from 'src/app/core/service/short-cut.service';
// import { ToastService } from 'src/app/core/service/toast.service';
// import { UserPermissionService } from 'src/app/core/service/user-permission.service';
// import { TripTrackingComponent } from 'src/app/directives/estructurales/trip-tracking/trip-tracking.component';
// import { ModalCancelReasonsComponent } from 'src/app/directives/modals/modal-cancel-reasons/modal-cancel-reasons.component';
import { ServiceStructService } from 'src/app/util/serviceService/service-struct.service';
import { RouteService, StructService } from 'src/app/util/serviceService/serviceStruct';
import { fnDateforPlatform, fnServiceDateSend, fnServiceDateSendString, fnUnionDate_TimeString } from 'src/app/util/utilDate';
import { UtilTranslate } from 'src/app/util/utilTranslate';
import { fnValidateViewExist } from 'src/app/util/utilValidate';
import { environment } from 'src/environments/environment';
import * as UtilModalViaje from './util-modal-viaje-corporate';
// import * as UtilFilaDetalle from 'src/app/components/modulo-operaciones/table-viajes/fila-detalle-viaje/fila-detalle-viaje.util';
// import { ModalExitConfirmationComponent } from 'src/app/directives/modals/modal-exit-confirmation/modal-exit-confirmation.component';
// import { ModalClientComponent } from 'src/app/directives/modals/modal-client/modal-client.component';
// import { ModalAuditTripComponent } from 'src/app/directives/modals/modal-audit-trip/modal-audit-trip.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { statusTypePayment } from 'src/app/class/paymentType';
import { DynamicField, DynamicFieldType } from 'src/app/class/dynamicFieldType';
import { ToastService } from 'src/app/service/toast.service';
import { WebSocketMqttService } from 'src/app/service/web-socket-mqtt.service';
import { UserPermissionService } from 'src/app/service/user-permission.service';
import { ShortCutService } from 'src/app/service/short-cut.service';
import { ModalCancelReasonsComponent } from 'src/app/directives/modals/modal-cancel-reasons/modal-cancel-reasons.component';
import { ObservablesService } from 'src/app/service/observables.service';
import { ShortCutInternal } from 'src/app/util/admin-layout-util';
import { CoreObservableService } from 'src/app/service/core-observable.service';
import { BreadcrumbService } from 'src/app/breadcrumb.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'nexus-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class NewServiceComponent implements OnInit, OnDestroy{
  idParticular = COMPANY_PARTICULAR_ID;
  showSpinner: boolean = true;
  viewTracking: boolean = false;
  isValidateBalance: boolean = true;
  hiddenCoverage: boolean = environment.CONFIGURATION.TRAVEL_MODAL.HIDDEN_COVERAGE;
  hiddenTypeReceipt: boolean = environment.CONFIGURATION.TRAVEL_MODAL.TYPE_RECEIPT;
  hiddenClientInformation: boolean = environment.CONFIGURATION.TRAVEL_MODAL.CLIENT_INFORMATION;

  structServiceCode: any = StructService.CODE;
  structServiceArray: any = StructService.ARRAY;

  flagShowRutina: boolean = false;
  checked: boolean = false;
  //Subscription Solicitar
  dataSubscriptionLstPasajeros: Subscription
  carouselResponsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];
  //#region variables
  @Input() idTrip: IdTrip = 0;
  @Input() dataIvr: PostOperatorOperatorIdAlertCallNotify = new PostOperatorOperatorIdAlertCallNotify();
  @Input() flagDuplicateData?: boolean;

  viaje: Viaje = new Viaje();
  labelHead: string = 'Nuevo Viaje';
  totalServiceFront?: number;

  asignarViaje: boolean = true;
 selectedItemCampoDinamicoCerrado : any
  // Lst Pasajeros
  lstPassenger: PassengerFront[] = [];

  //readonly validation
  readonlyValidation: boolean = true;
  readonlyConfig() {
    this.readonlyValidation = false;
    // console.log(this.readonlyValidation);
  }


  //Variables a obtener del Servicio
  idVale: IdGeneric = 1;
  cantPasajeros: number = 0;
  lstshortCut: ShortCut[] = cloneDeep(ShortCutInternal(environment.SHORT_CUT as SC_ShortCut_Json, ID_Screen.MODAL_TRAVEL, Component_ModalTravel.DESTINATION));

  //Servicio Rutina
  lstRutinaDate: NgbDateStruct[] = [];

  //Servicio Retorno
  txtTimeServiceReturn?: string;
  lstRetornoDate: NgbDateStruct[] = [];

  //CantidadMoviles
  txtCantidadMoviles: number = 1;

  //Empresa 
  routeServiceEmpresa = RouteService.maintenanceServiceGet
  initEmpresa: string = '';

  //Cliente 
  routeServiceCliente = RouteService.distpatchClientSearchGet
  initCliente: string = '';
  jsonSearchCliente: any = {
    key_word: '',
    company_id: -1,
  }
  clientId?: IdClient;
  searchValueAutocomplete?: string;
  emitSearchValue: boolean = true;

  //Centro Costo
  lstCentroCosto: CenterCost[] = [];
  centroCosto?: CenterCost = new CenterCost();
  flagCentroCostoInitEdit: boolean = false;
  centroCostoEdit: CenterCost = new CenterCost();

  //Cobertura
  idCobertura: number = -1

  //Destinos  
  coberturePosition: RequestGeoAutocomplete = {
    key_word: '',
    longitude: environment.CENTER_MAP_DEFAULT.LNG,
    latitude: environment.CENTER_MAP_DEFAULT.LAT,
  };
  lstPosiciones: PersonalisationMarker[] = [];
  companyId: IdEmpresa = -1;
  destinationPrice?: number[];
  cantDestinations: number = 8;
  //Favoritos
  lstFavoritos: ResponseGeoAutocomplete[] = []

  //Mapa
  idDragable: boolean = true;
  polilyneRuta: PersonalisationPolyline[] = [];
  minutosEstimados?: Date = undefined;
  metrosEstimados?: number = undefined;

  // Offers
  flagSinDireccion: boolean = false;
  offers: Response_Offer = new Response_Offer();
  lstCategorias: GeneralObj[] = [];
  flagInitOffers: boolean = false;
  serviceTypeInit?: Offers;
  servicePaymentInit?: PaymentAvailable;

  showOfferOnlyState: Boolean = false;

  placeHolderCliente: string = PlaceHolderAutoComplete.plh_CellPhoneAutocomplete;
  placeHolderEmpresa: string = PlaceHolderAutoComplete.plh_Empresa;


  //suscription
  coreObservableSuscription: Subscription;
  dataMaestra: Masterdowload = new Masterdowload();

  //Conductores
  infoConductores: any;


  //#region Traduccion
  translateSuscription: Subscription;
  tittleOrigen: string = 'Origen';
  tittleDestino: string = 'Destino';
  numberTrip: string = 'El viaje ';
  msjOfferSuccess: string = 'Fue ofertado correctamente';
  //#endregion Traduccion

  //#region StructuredBotton
  routeService: any;
  value?: Viaje = undefined;
  validateViaje: ValidateStructureButton = ValidateStructureButton.NO_V;
  validateViajeRetained: ValidateStructureButton = ValidateStructureButton.NO_V;
  routeServicePost: any = RouteService.distpatchServicePost;
  routeServicePut: any = RouteService.distpatchServicePut;
  //#endregion StructuredBotton

  //#region StructuredBottonOffer
  valueOffer: any = {
    data: undefined,
  };
  routeServiceOffer: any = RouteService.distpatchServiceOfferPost;
  //#endregion StructuredBottonOffer

  //#region StructuredCancel
  valueReasonCancel: any = {};
  routeServicevalidateCancel: any = RouteService.distpatchServiceCancelReasonsGet;
  subscriptionCancel?: Subscription;
  //#endregion StructuredCancel

  //#region RetirarMovil
  valueReasonRemoveDriver: any = {};
  routeServicevalidateRemoveDriver: any = RouteService.distpatchServiceUnassignReasonsGet;
  subscriptionRemoveDriver?: Subscription;
  //#endregion RetirarMovil

  //#region Conductores Cercanos
  lstConductoresCercanos: DriverAvailable[] = [];
  IntervalConductores: any;
  //#endregion Conductores Cercanos

  //#endregion variables

  //#region Client
  routeServiceClientTripSumary: any = RouteService.distpatchClientTripSumaryGet;
  routeServiceClientTripDestination: any = RouteService.distpatchClientTripDestinationGet;
  routeServiceClientAdd: any = RouteService.distpatchCliendAddPost;
  routeServiceClientEdit: any = RouteService.distpatchCliendEditPut;
  shortcuts: ShortcutInput[] = [];
  countryCode: string = environment.CONFIGURATION.DEFAULT_COUNTRY_CODE;
  validateEmail: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  clientTripSummary: any;
  showButtonHistory: boolean = false;
  isClient: boolean = false;
  cellPhoneClient?: string;
  subscriptionModalClient?: Subscription;
  changeCellPhoneClient: boolean = false;
  newCellPhoneClient?: string;
  //#endregion Client
  flagVisualizarBotonCancelarServicio : Boolean = true
  //#region Attributes
  lstAttributes: any[] = [];
  //#endregion Attributes

  //#region Validate Presupuesto
  subscriptionValidateBalance?: Subscription;
  //#endregion Validate Presupuesto

  //#region Dynamic Fields
  lstDynamicFields: DynamicField[] = [];
  lstResponse: ResponseDynamicFields[] = [];
  subscriptionDynamicFields?: Subscription;
  enableButton: boolean = false;
  //#endregion Dynamic Fields
  flagSolicitudServicioInmediato : boolean = false
  subscriptionCloseModal?: Subscription;
  myInterval : number = 0
  paymentId?: number = 100;
  serviceTypeId?: any = 4;
  centerCosteId?: number = -1;
  nroDestination: number = 8;
  radioModel: boolean = false;
  valRadio?: string;
  @Input() keysInternalId: ID_Screen = ID_Screen.MODAL_TRAVEL;
  // lstshortCut: ShortCut[] = cloneDeep(ShortCutInternal(environment.SHORT_CUT as SC_ShortCut_Json, ID_Screen.MODAL_TRAVEL, Component_ModalTravel.DESTINATION));
  private suscripcionShortCut?: ActivedSuscription;
  validateWebCorporative: string = environment.LOGIN
  sd_routeService = RouteService.maintenanceAutocompletePersonalGet
  sd_jsonSearch: any = {
    query: '',
    company_id: '',
    client_id: '',
    page: 1,
    page_size: 10
  }
  sd_lstDrivers: any = {
 
  };
  flagSendMessage: boolean = false;
  lstDynamicControls: DynamicFieldType[] = [];
  // modal solicitar
  modalSolicitarServicio: BsModalRef = new BsModalRef();
  @ViewChild('templateSolicitar',
    { static: true }) templateSolicitar: any;
  @ViewChild('templateSolicitarInmediato',
    { static: true }) templateSolicitarInmediato: any;
  tipoInmediato: boolean = false
  tipoReserva: boolean = false
  textoInmediato: string = "Inmediato"
  textoReserva: string = "Reserva"
  options: any;
  overlays: any[];
  date7: Date;
  //#region push
  suscriptions: SuscriptionWebSocket = {
    name: "",
    topic: [EnunTopicSuscription.CLIENT_LIST_CORPORATIVE]
  }
  suscripcionTopic?: ActivedSuscription;
  flagRadioPedirTercero : boolean = false
  tittleReservar ?: string
  tittleSolicitar ?: string
  labelBtnSolicitarServicio ?: string
  pedirTercero : any = -1
  stateOptions: any[];
  pedirTerceroJson : any[]= [
    {
      id: -1,
      name : "Para mí"
    },    {
      id: 1,
      name : "Servicio para visita"
    },
    {
      id: 2,
      name : "Servicio para personal"
    }
  ]
  searchPersonal : string = "Buscar personal"
  disabled : boolean = false
  constructor(
    private ref: ChangeDetectorRef,
    private _seviceObservable: ObservablesService,
    private serviceComponent: ServiceStructService,
    private _serviceToast: ToastService,
    private _coreObservable: CoreObservableService,
    public translate: TranslateService,
    private modalService: NgbModal,
    private modalServiceComp: BsModalService,
    private formBuilder: FormBuilder,
    private shortCutService: ShortCutService,
    private userPermissionService: UserPermissionService,
    private router: Router,
    private webSocketMqtt: WebSocketMqttService,
    private breadcrumbService: BreadcrumbService,
    private service: MessageService

  ) {
    this.breadcrumbService.setItems([
      { label: 'Pages' },
      { label: 'Solicitar Servicio', routerLink: ['/core/new'] }
  ]);
    this._coreObservable.masterdownload$.subscribe(
      (dataMaster: Masterdowload) => {
        this.dataMaestra = dataMaster;
      }
    );

    this.dataSubscriptionLstPasajeros = this._seviceObservable.pasajerosFront$
      .subscribe(requestPasajeros => {
        this.lstPassenger = requestPasajeros as PassengerFront[];
      });
      this.stateOptions = [
        { label: 'Inmediato', value: true },
        { label: 'Reserva', value: false },
      ];
  

  
      this.tittleSolicitar ="Solicitar";
      this.tittleReservar = "Reservar";


    this.tittleOrigen = "Origen";
    this.tittleDestino ="Destino";

    this.numberTrip = "Id";
    this.msjOfferSuccess = "Bien";

    this.translateSuscription = this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.tittleOrigen = "Origen";
      this.tittleDestino = "Destino";

      this.numberTrip = "Viaje"
      this.msjOfferSuccess = "Mensaje";

      this.actualizarLstPosiciones()
    });
  }

  nroViaje: IdTrip = 0;
  estadoViaje?: number = 0;
  idClient?: string
  suscriptionWebSocket() {
    this.webSocketMqtt.suscribeSuscription(this).then((data) => {
      this.suscripcionTopic = data;
    }).catch((error) => {
      console.log(error);
    })
  }
  listaCampoDinamicoCerrado : any[] =[]
   async ngOnInit() {
 
    this.dataMaestra
    this.viaje.forOtherUser= new ForOtherUser()
    this.viaje!.forOtherUser!.cellphone! = ""
    this.viaje!.forOtherUser!.firstLastName! = ""
    this.viaje!.forOtherUser!.firstName! = ""
    this.viaje!.forOtherUser!.secondLastName! = ""
    this.labelBtnSolicitarServicio = this.tittleSolicitar 
    this.idClient = this.dataMaestra.user?.uuid
    this.suscriptionWebSocket()
    this.showTimePiker(2)
    this.getAdress()
    this.serviceTypeId = -1
    this.paymentId = -1
    
    var empresa: any = localStorage.getItem('company_id')
    this.viaje.clientId = this.dataMaestra.user?.uuid
    this.viaje.companyId = empresa
    this.sd_jsonSearch.client_id = this.dataMaestra.user?.uuid
    this.sd_jsonSearch.company_id = this.viaje.companyId
    this.nroViaje = this.idTrip;
    this.estadoViaje = this.viaje.serviceType?.id == undefined ? 0 : this.viaje.serviceType?.id
    this.configuracionModal();
    this.suscription();
    this.viaje = UtilModalViaje.fnInitViaje(this.viaje);
    await this.serviceLstCentroCostoCorporate()
    await this.serviceLstCamposDinamicos()

    if (this.dataMaestra.attributes) {
      this.lstAttributes = cloneDeep(this.dataMaestra.attributes[0].vehicleAttributes)!;
    }
    this.dataIvr.numberInbound = '991047220';
    this.routeService = this.routeServicePost;
    this._seviceObservable.updatePasajerosFront([]);
    this.viaje.isImmediate = true;
    let modeReserve: ModeReserve = this.dataMaestra.modeReserves?.find(modoReserva => modoReserva.id == Var_ModoReservaBase)!;
    if (!this.viaje.modeReserve) this.viaje.modeReserve = new GenericObject()
    if (modeReserve) {
      this.viaje.modeReserve.id = modeReserve.id!;
      this.viaje.modeReserve.name = modeReserve.name!;
    }

    if (this.viaje.coverage && this.dataMaestra.coverages && this.dataMaestra.coverages.length > 0) {
      this.idCobertura = this.dataMaestra.coverages[0]?.id! + 0;
      this.viaje.coverage.id = this.idCobertura;
      this.viaje.coverage.name = this.dataMaestra.coverages[0].name + '';

      this.coberturePosition = {
        key_word: this.coberturePosition.key_word,
        latitude: this.dataMaestra.coverages[0].latitude! + 0.0,
        longitude: this.dataMaestra.coverages[0].longitude! + 0.0
      }


      this.cantPasajeros = 0;
      this.showSpinner = false;
    }
  }
  
  ngOnDestroy() {
    // this.coreObservableSuscription.unsubscribe();
    // this.translateSuscription.unsubscribe();

    // if (this.IntervalConductores) {
    //   clearInterval(this.IntervalConductores);
    // }

    // if (this.subscriptionCancel) {
    //   this.subscriptionCancel.unsubscribe
    // }

    // if (this.shortCutService) {
    //   this.shortCutService.ususcribeShortCut(this.suscripcionShortCut?.id!);
    // }

    // if (this.subscriptionValidateBalance) {
    //   this.subscriptionValidateBalance.unsubscribe;
    // }

    // if (this.subscriptionModalClient) {
    //   this.subscriptionModalClient.unsubscribe;
    // }

    // if (this.subscriptionCloseModal) {
    //   this.subscriptionCloseModal.unsubscribe;
    // }

    // if (this.subscriptionDynamicFields) this.subscriptionDynamicFields.unsubscribe();

    // if (this.suscripcionTopic) {
    //   this.webSocketMqtt.ususcribeSuscription(this.suscripcionTopic.id!);
    // }
  }
  cerrarModal() {
    this.flagSolicitudServicioInmediato = false
    this.service.add({ key: 'tst', severity: 'success', summary: "Se canceló correctamente", detail: 'Validation success' });

    // this.modalServiceComp.hide()
  }
  intFlagSearchCondcutor: number = 0
  flagVisualizarBotonCancelar: boolean = false
  flagVisualizarBotonAceptar: boolean = false
  onMessageClientCorporative(dataPush: Push) {
    // debugger
    console.log(dataPush)
    switch (dataPush.statusTypeId) {
      case 2:
        this.router.navigate(['/core/servicio/list-service']);
        break;
      case 3:
        this.router.navigate(['/core/servicio/list-service']);
        break;
      case 33:
        this.labelBtnSolicitarServicio ="Buscando conductores..."
        this.flagVisualizarBotonCancelarServicio = true
        this.flagVisualizarBotonCancelar = false
        break;
      case 35:
        this.labelBtnSolicitarServicio ="Solicitar"
        this.progressServiceInmediate = false
        this.flagVisualizarBotonCancelarServicio = false
        this.flagVisualizarBotonCancelar = true
        break;
      default:
        this.flagVisualizarBotonCancelarServicio = false
        this.flagVisualizarBotonCancelar = true
        break;
    }
    this.intFlagSearchCondcutor = dataPush.statusTypeId

    // let indexObjViaje = this.viaje.findIndex(viaje => viaje.idService == valueObj.idService);
    // this.updateLstViajes(indexObjViaje, valueObj);
  };
  configuracionModal() {
    if (this.idTrip) {
      this.labelHead = 'Viaje N° ';
      UtilModalViaje.fnInitViaje(this.viaje);
    }
  }
  sd_onchange($event: any[]) {
    this.sd_lstDrivers = $event;
    if (this.sd_lstDrivers && this.sd_lstDrivers.length > 0) {
      this.flagSendMessage = false;
    } else {
      this.flagSendMessage = true;
    }
  }

  ngAfterViewInit() {
  }
  getAdress(){
    navigator.geolocation.getCurrentPosition((position) => {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      console.log(latitude)
      console.log(longitude)
      var latlng = new google.maps.LatLng(latitude, longitude);
      var geocoder  = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        alert("Location: " + results[1].formatted_address);
                    }
                }
            });
    })
  }
  routeCancel : any = RouteService.distpatchServiceCancelPost
  async serviceBusquedaViaje(nroViaje: number) {
    this.viaje = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchServiceGet, nroViaje)
    //Agregar toast de resultado

    this.viaje = UtilModalViaje.fnInitViaje(this.viaje);
    if (this.viaje && this.viaje.uuid) {
      if (this.viaje.statusType?.id == 8) { this.viewTracking = true; }
      let findCovertura = this.dataMaestra.coverages?.find(cobertura => cobertura.id == this.viaje.coverage?.id)

      if (findCovertura) {
        this.idCobertura = findCovertura.id!;
        this.coberturePosition = {
          key_word: this.coberturePosition.key_word,
          latitude: findCovertura.latitude! + 0.0,
          longitude: findCovertura.longitude! + 0.0
        };
      } else {
        this.idCobertura = -1;
        if (this.dataMaestra.coverages && this.dataMaestra.coverages.length > 0) {
          this.coberturePosition = {
            key_word: this.coberturePosition.key_word,
            latitude: this.dataMaestra.coverages[0].latitude! + 0.0,
            longitude: this.dataMaestra.coverages[0].longitude! + 0.0
          };
        }
      }

      this.cantPasajeros = await UtilModalViaje.fnObtenerCantidadAsientosInitEdit(this.viaje.serviceType?.id!, this.dataMaestra);

      let requestOffer: RequestOffer = new RequestOffer();
      requestOffer.serviceUuid = this.viaje.uuid;
      this.valueOffer = requestOffer;

      let requestCancelReasons = {
        service_id: this.viaje.id
      };
      this.valueReasonCancel = requestCancelReasons;
      this.valueReasonRemoveDriver = requestCancelReasons;

      this._seviceObservable.updatePasajerosFront(UtilModalViaje.fnInitLstPassenger(this.viaje));
      await this.serviceLstCentroCosto();

      this.flagInitOffers = true;
      this.serviceTypeInit = UtilModalViaje.fnServiceTypeInitEdit(this.viaje);
      this.servicePaymentInit = UtilModalViaje.fnServicePaymentInitEdit(this.viaje);

      let findCenterCost = this.lstCentroCosto.find(centroCosto => centroCosto.id == this.viaje.costCenter?.id)
      if (!findCenterCost) {
        this.flagCentroCostoInitEdit = true;
        this.centroCostoEdit = UtilModalViaje.fnCostCenterInitEdit(this.viaje.costCenter!);
        this.centerCosteId = this.viaje.costCenter?.id;
      }

      this.actualizarLstPosiciones();

      this.initEmpresa = this.viaje.company?.tradeName?.toString()!;
      this.companyId = this.viaje.company?.id!

      this.initCliente = this.viaje.client?.cellPhone!;
      this.viaje.frontFullName = ((this.viaje.client?.firstName && this.viaje.client?.firstLastName && this.viaje.client?.secondLastName) ? this.viaje.client.firstName + '' + this.viaje.client.firstLastName + '' + this.viaje.client.secondLastName : this.viaje.client?.firstName)!;
      this.clientId = this.viaje.client?.id;
      this.viaje.frontCompanyId = this.viaje.company?.id;
      this.viaje.frontIsClient = this.viaje.client?.isClient;

      this.minutosEstimados = this.viaje.dateEnd;
      this.viaje.distance = this.viaje.distance! + 0;

      if (this.viaje.destinations && this.viaje.destinations.length == 1 && this.viaje.destinations[0].origin && (!this.viaje.destinations[0].destination || !this.viaje.destinations[0].destination.addressMainText || this.viaje.destinations[0].destination.addressMainText.length <= 0)) {
        this.flagSinDireccion = true;
      }

      if (this.dataMaestra.serviceTypes && this.dataMaestra.serviceTypes.length > 0) {
        let objTipoServicio: Vehicle = this.dataMaestra.vehicleTypes?.find(servicioTipo => servicioTipo.id == this.viaje.serviceType?.vehicleTypeId)!;
        if (objTipoServicio) {
          this.cantPasajeros = objTipoServicio.numberPassenger!;
        }
      }

      await this.serviceLstFavorite();

      this.showOfferOnlyState = (this.viaje.statusType && this.viaje.statusType.id == EstadosViaje.APROBADO) ? true : false;

      this.showSpinner = false;

      this.actualizarVista();
      this.getClientTripSumary();
      this.changePaymentType();
      if (this.flagDuplicateData) {
        this.serviceOffer();
        this.idTrip = 0;
        this.viaje.id = undefined;
        this.viaje.uuid = undefined;
        this.viaje.statusType = new StatusType()
        this.viaje.driver = new Driver();
        this.viaje.vehicle = new Vehicle();
        this.viaje = UtilModalViaje.fnInitViaje(this.viaje);
        this.routeService = this.routeServicePost;
      }

      let cellPhoneCall = (this.viaje.phoneNumberReceived) ? this.viaje.phoneNumberReceived : this.viaje.client?.cellPhone;
      this.viaje.frontClient = UtilModalViaje.fnInitClient(new Client(), cellPhoneCall);
      this.viaje.phoneNumberReceived = this.viaje.frontClient.cellPhone;
      this.viaje.frontIsClient = true;
      this.centerCosteId = this.viaje.costCenter?.id;
      this.paymentId = this.viaje.paymentType?.id;
      this.serviceTypeId = this.viaje.serviceType?.id;
      await this.getDynamicFields();
    } else {
      // this.activeModal.close('Close click');
    }
  }
  private suscription() {
    this.shortCutService.suscribeShortCut(this).then((suscription) => {
      this.suscripcionShortCut = suscription;
    }).catch((error) => {
      console.log(error);
      throw error;
    })
  }

  actualizarVista() {
    if (fnValidateViewExist(this.ref)) {
      this.ref.detectChanges();
    }
  }

  getTotalPrice(): boolean {
    this.totalServiceFront = this.viaje.totalService! + this.viaje.totalParking! + this.viaje.totalToll! + this.viaje.totalWait!;
    if (this.totalServiceFront >= 0) {
      return true;
    } else {
      return false;
    }
  }



  async btnGuardarViajeValidation($event: any) {
    //  console.log('this.viaje: ', this.viaje)
    if (this.flagHavePermission(ID_PermissionModal.EVENT_SAVE_TRIP)) {
      if (UtilModalViaje.fnObjValidacionViaje(this.viaje, this.txtCantidadMoviles, this.lstPassenger, this.flagSinDireccion, this._serviceToast, this.centroCostoEdit, this.nroDestination)) {
        // this.viaje.immediate = this.radioModel
        this.value = UtilModalViaje.fnGuardarViaje(this.viaje, UtilModalViaje.fnAgregarHoraALista(this.lstRutinaDate, this.viaje.frontServiceDateTime!),
          UtilModalViaje.fnAgregarHoraALista(this.lstRetornoDate, this.txtTimeServiceReturn!), this.lstPassenger, this.destinationPrice!, this.flagSinDireccion, this.txtCantidadMoviles, true);

        this.value.typeReceipt = (this.value.typeReceipt) ? this.value.typeReceipt : new GenericObject();
        this.value.typeReceipt.id = (this.value.serviceType && this.value.typeReceipt.id && this.value.typeReceipt.id > -1) ? this.value.typeReceipt.id : 0;

        this.actualizarVista();

        this.validateViaje = ValidateStructureButton.OK;
        this.actualizarVista();
      } else {
        this.validateViaje = (this.validateViaje == ValidateStructureButton.ERROR) ? ValidateStructureButton.VALIDATION : ValidateStructureButton.ERROR;
        this.value = undefined;
      }
    } else {
      this.userPermissionService.toastInformation();
    }
  }
  async btnGuardarViajeValidationCorporate($event: any) {
    if (UtilModalViaje.fnObjValidacionViaje(this.viaje, this.txtCantidadMoviles, this.lstPassenger, this.flagSinDireccion, this._serviceToast, this.centroCostoEdit, this.nroDestination)) {
      if (environment.LOGIN == 'NEXUS_BO') {
        this.value = UtilModalViaje.fnGuardarViaje(this.viaje, UtilModalViaje.fnAgregarHoraALista(this.lstRutinaDate, this.viaje.frontServiceDateTime!),
          UtilModalViaje.fnAgregarHoraALista(this.lstRetornoDate, this.txtTimeServiceReturn!), this.lstPassenger, this.destinationPrice!, this.flagSinDireccion, this.txtCantidadMoviles, true);
        this.value.typeReceipt = (this.value.typeReceipt) ? this.value.typeReceipt : new GenericObject();
        this.value.typeReceipt.id = (this.value.serviceType && this.value.typeReceipt.id && this.value.typeReceipt.id > -1) ? this.value.typeReceipt.id : 0;
      } else {
        let object: any = {}
        this.lstDynamicControls.forEach((element: any) => {
          var res = new ResponseDynamicFields()
          res.id = element.id
          if(element.type == "COMPANY_DYNAMICFIELD_TYPE_FIELD_OPEN"){
            res.value = element.value
          }else{
            res.value = element.value.value
          }
       
          this.viaje.dynamicFields?.push(res)
        });
        object.dynamicFields = this.dataMaestra.companyClient.id == 1 ? null : this.viaje.dynamicFields
        object.dateTime = !this.viaje.immediate ? fnServiceDateSend(this.date7) : object.dateTime = fnServiceDateSendString(this.viaje.frontDateTime!, this.viaje.frontServiceDateTime!);;
        object.clientId = this.viaje.clientId
        object.companyId = this.viaje.companyId
        object.immediate = this.viaje.immediate
        object.referenceId = this.viaje.referenceId
        // this.viaje.client!.countryCode ? this.viaje.client!.countryCode :
        object.forOtherUser = this.pedirTercero.id == "2"? this.sd_lstDrivers : this.pedirTercero.id == "1" ?  this.sd_lstDrivers  : null
        if ( this.pedirTercero.id != -1 ) 
        {
          object.forOtherUser!.countryCode  = "51" //duro por el momento
        }
        this.value = object
        this.viaje.dynamicFields = []
      }
      //  this.lstDynamicControls = []
      //  this.serviceLstCamposDinamicos()
      this.actualizarVista();
      this.validateViaje = ValidateStructureButton.OK;
      this.actualizarVista();
    } else {
      // this.lstDynamicControls = []
      // this.serviceLstCamposDinamicos()
      this.service.add({ key: 'tst', severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
      this.validateViaje = (this.validateViaje == ValidateStructureButton.ERROR) ? ValidateStructureButton.VALIDATION : ValidateStructureButton.ERROR;
      this.value = undefined;
    }
  }
  servicioCreate : any 
  progressServiceInmediate : boolean = false
  async btnStructGuardarViaje($event: any) {
    // console.log('btnStructGuardarViaje')
    this.flagVisualizarBotonCancelarServicio = true
    this.flagVisualizarBotonCancelar = false
    this.flagVisualizarBotonAceptar = false
    this.intFlagSearchCondcutor = 0
    if ($event && $event.serviceId && $event.serviceId.length > 0) {// nuevo
     this.servicioCreate = $event
      if (this.viaje.immediate) {
        this.flagSolicitudServicioInmediato = true
        this.progressServiceInmediate = true
      } else {
        this.router.navigate(['/core/list-service']);
        // this.modalSolicitarServicio = this.modalServiceComp.show(this.templateSolicitar, { class: 'modal-confirm', backdrop: 'static', keyboard: false });
      }
      // si es servicio inmediato habra un modal de animacion buscando conductor
      // si es servicio reserve habra un modal de servicio exitoso

    }
    else {
      this.service.add({ key: 'tst', severity: 'error', summary: $event.error.detail, detail: 'Validation failed' });
      this.viaje.typeReceipt = (this.viaje.typeReceipt) ? this.viaje.typeReceipt : new GenericObject();
      this.viaje.typeReceipt.id = (this.viaje.typeReceipt.id) ? this.viaje.typeReceipt.id : -1;
      this.validateViaje = (this.validateViaje == ValidateStructureButton.ERROR) ? ValidateStructureButton.VALIDATION : ValidateStructureButton.ERROR;

    }

  }

  async btnGuardarViajeValidationRetained($event: any) {
    // console.log('viaje', this.viaje)
    if (this.flagHavePermission(ID_PermissionModal.EVENT_SAVE_TRIP)) {
      if (UtilModalViaje.fnObjValidacionViaje(this.viaje, this.txtCantidadMoviles, this.lstPassenger, this.flagSinDireccion, this._serviceToast, this.centroCostoEdit, this.nroDestination)) {

        this.value = UtilModalViaje.fnGuardarViaje(this.viaje, UtilModalViaje.fnAgregarHoraALista(this.lstRutinaDate, this.viaje.frontServiceDateTime!),
          UtilModalViaje.fnAgregarHoraALista(this.lstRetornoDate, this.txtTimeServiceReturn!), this.lstPassenger, this.destinationPrice!, this.flagSinDireccion, this.txtCantidadMoviles, false);

        this.value.typeReceipt = (this.value.typeReceipt) ? this.value.typeReceipt : new GenericObject();
        this.value.typeReceipt.id = (this.value.serviceType && this.value.typeReceipt.id && this.value.typeReceipt.id > -1) ? this.value.typeReceipt.id : 0;

        this.actualizarVista();

        this.validateViajeRetained = ValidateStructureButton.OK;
        this.actualizarVista();
      } else {
        this.validateViajeRetained = (this.validateViajeRetained == ValidateStructureButton.ERROR) ? ValidateStructureButton.VALIDATION : ValidateStructureButton.ERROR;
        this.value = undefined;
      }
    } else {
      this.userPermissionService.toastInformation();
    }
  }

  async btnStructGuardarViajeRetained($event: any) {
    if ($event && $event.services && $event.services.length > 0) {// nuevo
    } else if ($event && $event.id && $event.uuid) { // editar
    } else {
      this.viaje.typeReceipt = (this.viaje.typeReceipt) ? this.viaje.typeReceipt : new GenericObject();
      this.viaje.typeReceipt.id = (this.viaje.typeReceipt.id) ? this.viaje.typeReceipt.id : -1;
      this.validateViajeRetained = (this.validateViajeRetained == ValidateStructureButton.ERROR) ? ValidateStructureButton.VALIDATION : ValidateStructureButton.ERROR;

    }

  }
  verServicios() {
    this.flagSolicitudServicioInmediato = false
    this.router.navigate(['/core/list-service']);
  }
  async cancelService() {
    let jsonRequest : any ={
      service_id :     this.servicioCreate.serviceId,
      client_id  : this.dataMaestra.user?.uuid
    }

    let response = await this.serviceComponent.requestService(StructService.CODE, this.routeCancel, jsonRequest);
    this.service.add({ key: 'tst', severity: 'success', summary: "Se canceló correctamente", detail: 'Validation success' });
    this.flagSolicitudServicioInmediato = false


  }
  onChangeCobertura($event: any) {
    let objCobertura = this.dataMaestra.coverages?.find(covertura => covertura.id == this.idCobertura)
    if (this.viaje.coverage) {
      this.viaje.coverage.id = this.idCobertura;
    }
    if (objCobertura) {
      this.coberturePosition = {
        key_word: '',
        latitude: objCobertura.latitude,
        longitude: objCobertura.longitude,
      };
    }
  }

  onChangePosition($event: ChangePosition) {
    this.actualizarLstPosiciones();
    this.serviceOffer()
  }
  async obtenerConductoresOrigen(latitud: any, longitud: any) {

    var listaAtributo = this.viaje.serviceVehicleAttribute;

    this.paymentId = 100;
    this.serviceTypeId = 4;
    var jsonRequest = {
      "latitude": latitud,
      "longitude": longitud,
      "vehicle_attribute_id": listaAtributo,
      "service_type_id": this.serviceTypeId,
      "payment_type_id": this.paymentId
    };
    console.log("jsonRequest")
    console.log(jsonRequest)
    let response = await this.serviceComponent.requestService(StructService.CODE, RouteService.driversAvailablePointGet, jsonRequest);
    return response;
  }

  actualizarLstPosiciones() {
    var index: number = 0;

    var lstPosiciones: PersonalisationMarker[] = [];
    if (!this.flagSinDireccion) {
      this.viaje.destinations?.forEach(destinos => {
        if (index == 0) {



          if (UtilModalViaje.fnValidatePositionMarker(destinos.origin?.latitude!, destinos.origin?.longitude!)) {
            lstPosiciones.push(UtilModalViaje.fnDetalleViaje(new google.maps.LatLng(destinos.origin?.latitude!, destinos.origin?.longitude!), true, this.tittleOrigen, TypeMarkers.ORIGEN, true))


            this.obtenerConductoresOrigen(destinos.origin?.latitude!, destinos.origin?.longitude).then((data) => { this.infoConductores = data; });
            console.log("lista de vehiculos", this.infoConductores)
            if (this.infoConductores) {

              for (let item of this.infoConductores) {
                lstPosiciones.push(UtilModalViaje.fnDetalleViaje(new google.maps.LatLng(item.coordinate?.latitude!, item.coordinate?.longitude!), true, this.tittleOrigen, TypeMarkers.CONDUCTOR, true))
              }

            }

          }

        }

        if (UtilModalViaje.fnValidatePositionMarker(destinos.destination?.latitude!, destinos.destination?.longitude!)) {
          lstPosiciones.push(UtilModalViaje.fnDetalleViaje(new google.maps.LatLng(destinos.destination?.latitude!, destinos.destination?.longitude!), true, this.tittleDestino + ' ' + (index + 1), TypeMarkers.DESTINO, true, (index + 1)))
        }

        index++
      });
    } else {
      if (this.viaje.destinations && this.viaje.destinations.length > 0) {

        if (UtilModalViaje.fnValidatePositionMarker(this.viaje.destinations[0].origin?.latitude!, this.viaje.destinations[0].origin?.longitude!)) {
          lstPosiciones.push(UtilModalViaje.fnDetalleViaje(new google.maps.LatLng(this.viaje.destinations[0].origin?.latitude!, this.viaje.destinations[0].origin?.longitude!), true, this.tittleOrigen, TypeMarkers.ORIGEN, true))
        }

        if (this.viaje.destinations && this.viaje.destinations.length >= 1) {
          this.viaje.destinations[0].destination = new Destination();
          if (this.lstPassenger && this.lstPassenger.length > 1) {
            this.lstPassenger[0].frontTipoPasajeroBajada = undefined;
            this._seviceObservable.updatePasajerosFront(this.lstPassenger);
          }
        }
      }
    }

    if (this.lstConductoresCercanos && this.lstConductoresCercanos.length > 0) {
      this.lstConductoresCercanos.forEach(conductor => {
        // lstPosiciones.push(UtilModalViaje.fnDetalleViaje(new google.maps.LatLng(conductor., destinos.destination.longitude), true, this.tittleDestino + ' ' + (index + 1), TypeMarkers.DESTINO, true, (index + 1)))
      });
    }

    //console.log("lista de posiciones", this.lstPosiciones)

    this.lstPosiciones = lstPosiciones;
  }
  // async
  async  serviceOffer() {
    this.cleanListas();
    this.actualizarLstPosiciones();
 
    if (
      (this.viaje.client && this.viaje.client.uuid && this.viaje.company && this.viaje.company.uuid)
      ||
      (this.viaje.frontIsClient && environment.LOGIN == 'NEXUS_BO')) {
      var requestOffer: Request_Offer = new Request_Offer();
      requestOffer.clientId = this.viaje.client!.uuid;
      requestOffer.companyId = this.viaje.company!.uuid;
      requestOffer.paymentTypeId = -1//this.viaje.client.id;
      //Cambiar a multidestino

      if (this.viaje.destinations && this.viaje.destinations[0].origin?.latitude && this.viaje.destinations[0].origin?.longitude!) {
        if (this.validateWebCorporative == 'NEXUS_BO') {
          requestOffer.origin = this.viaje.destinations[0].origin.latitude + ',' + this.viaje.destinations[0].origin?.longitude;
        } else {
          requestOffer.origin = this.viaje.destinations[0].origin.latitude + ',' + this.viaje.destinations[0].origin?.longitude +
            ',' + this.viaje.destinations[0].origin?.addressMainText + '|' + this.viaje.destinations[0].origin?.addressSecondaryText;
        }
        // console.log('flagSinDireccion   ' , this.flagSinDireccion)
        if (this.flagSinDireccion) {
          requestOffer.destinations = null!;
          this.cleanListas();
        } else {
          let i : number = 0 
          this.viaje.destinations.forEach(destino => { 
            console.log("el gran viaje")
            console.log(this.viaje.destinations)
            if (destino.destination && destino.destination.latitude && destino.destination.longitude) {
                if (i==0) {
                  requestOffer.destinations = destino.destination.latitude +
                    ',' + destino.destination.longitude + ',' +
                    destino.destination.addressMainText! + '|' + destino.destination.addressSecondaryText;
                } else if (i > 0) {
                  requestOffer.destinations += '||' + destino.destination.latitude +
                    ',' + destino.destination.longitude + ',' +
                    destino.destination.addressMainText! + '|' + destino.destination.addressSecondaryText;;
                };
            }
            i++
          });
        }
        //await
        await  this.requestOffer(requestOffer)

      }
    } else
      if (environment.LOGIN != 'NEXUS_BO') {
        var requestOffer: Request_Offer = new Request_Offer();
        requestOffer.clientId = this.viaje.clientId;
        requestOffer.companyId = this.viaje.companyId;
        requestOffer.paymentTypeId = -1//this.viaje.client.id;
        //Cambiar a multidestino
        if (this.viaje.destinations && this.viaje.destinations[0].origin?.latitude && this.viaje.destinations[0].origin?.longitude!) {
          if (this.validateWebCorporative == 'NEXUS_BO') {
            requestOffer.origin = this.viaje.destinations[0].origin.latitude + ',' + this.viaje.destinations[0].origin?.longitude;
          } else {
            requestOffer.origin = this.viaje.destinations[0].origin.latitude + ',' + this.viaje.destinations[0].origin?.longitude +
              ',' + this.viaje.destinations[0].origin?.addressMainText + '|' + this.viaje.destinations[0].origin?.addressSecondaryText;
          }
          // console.log('flagSinDireccion   ' , this.flagSinDireccion)
          if (this.flagSinDireccion) {
            requestOffer.destinations = null!;
            this.cleanListas();
          } else {
            let i = 0
            this.viaje.destinations.forEach(destino => {
              console.log("el gran viaje")
              console.log(this.viaje.destinations)
              if (destino.destination && destino.destination.latitude && destino.destination.longitude) {
                if (this.validateWebCorporative == 'NEXUS_BO') {
                  if (this.viaje.destinations![0].destination!) {
                    requestOffer.destinations = destino.destination.latitude +
                      ',' + destino.destination.longitude;
                  } else if (this.viaje.destinations![0].destination! > 0) {
                    requestOffer.destinations += '|' + destino.destination.latitude +
                      ',' + destino.destination.longitude;
                  };
                }
                else if (this.validateWebCorporative == 'NEXUS_CORPORATIVO') {
                  if (i==0) {
                    requestOffer.destinations = destino.destination.latitude +
                      ',' + destino.destination.longitude + ',' +
                      destino.destination.addressMainText! + '|' + destino.destination.addressSecondaryText;
                  } else if (i> 0) {
                    requestOffer.destinations += '||' + destino.destination.latitude +
                      ',' + destino.destination.longitude + ',' +
                      destino.destination.addressMainText! + '|' + destino.destination.addressSecondaryText;;
                  };
                }


              }
              i++
            });
          }
          //await
          await this.requestOffer(requestOffer)

        }
      }
  }
  async requestOffer(requestOffer: Request_Offer) {
    this.offers = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchOfferGet, requestOffer)
    if (this.offers && this.offers.offers && this.offers.paymentAvailable) {
      this.flagInitOffers = false;
      this.lstCategorias = []
      this.offers.offers.forEach(tipoServicio => {
        // Toast de limitaciones

        // let a : boolean = UtilModalViaje.fnGetServiceTypeCarga(tipoServicio.serviceType?.id!) 
        // let b : boolean = UtilModalViaje.fnGetServiceTypeCourier(tipoServicio.serviceType?.id!)
        // if( (a  || b ) && this.validateWebCorporative == 'NEXUS_BO') {
        //   this.nroDestination = tipoServicio.serviceType?.destinationsMax!;
        //   this._serviceToast.showInfo('El tipo de servicio carga y/o courier tiene un máximo en destinos de: ' + this.nroDestination)
        // }

        let objMovil: GeneralObj = this.lstCategorias.find(categoria => categoria.id == tipoServicio.categoryType?.id)!

        if (!objMovil) {
          this.lstCategorias.push(tipoServicio.categoryType!);
        }
      });

      if (environment.CONFIGURATION.TRAVEL_MODAL.SERVICE_TYPE && this.offers.offers.length > 0) {
        // console.log('this.viaje:  ', this.viaje)
        let indexOffer: number;
        let priceEstimate: Offers;
        if (this.viaje && this.viaje.id) {
          indexOffer = this.offers.offers.findIndex(offer => offer.serviceType?.id == this.viaje.serviceType?.id)!
          priceEstimate = this.offers.offers.find(offer => offer.serviceType?.id == this.viaje.serviceType?.id)!;
          this.viaje.referenceId = this.offers.offers[indexOffer].referenceId;

          if (this.viaje.serviceType && indexOffer && priceEstimate) {
            this.viaje.serviceType.id = ((this.viaje.serviceType?.id) ? this.viaje.serviceType?.id : -1)!;
            this.viaje.totalService = (priceEstimate.priceEstimate) ? priceEstimate.priceEstimate : this.viaje.totalService;
          } else {
            this.serviceTypeId = environment.CONFIGURATION.TRAVEL_MODAL.SERVICE_TYPE;
            this.viaje.serviceType = (this.viaje.serviceType) ? this.viaje.serviceType : new ServiceType();
            this.viaje.serviceType.id = this.serviceTypeId;
          }
          if (this.viaje.paymentType) {
            let indexPayment = this.offers.paymentAvailable.findIndex(payment => payment.id == this.viaje.paymentType?.id)
            if (indexPayment) {
              this.viaje.paymentType.id = (this.viaje.paymentType.id) ? this.viaje.paymentType.id : -1;
            }
          }
        } else {
          if (environment.LOGIN == 'NEXUS_BO') {
            indexOffer = this.offers.offers.findIndex(offer => offer.serviceType?.id == environment.CONFIGURATION.TRAVEL_MODAL.SERVICE_TYPE)

          } else {
            indexOffer = this.offers.offers.findIndex(offer => offer.serviceType?.id == 1)
          }
          if (this.viaje.serviceType && indexOffer > -1) {
            this.serviceTypeId = (this.viaje.serviceType.id != -1) ? this.viaje.serviceType.id : environment.CONFIGURATION.TRAVEL_MODAL.SERVICE_TYPE;
            this.viaje.serviceType.id = this.serviceTypeId;
            this.viaje.referenceId = this.offers.offers[indexOffer].referenceId;
            priceEstimate = this.offers.offers.find(offer => offer.serviceType?.id == this.viaje.serviceType?.id)!;
            if (priceEstimate) {
              this.viaje.totalService = (priceEstimate.priceEstimate) ? priceEstimate.priceEstimate : this.viaje.totalService;
            } else {
              this.serviceTypeId = environment.CONFIGURATION.TRAVEL_MODAL.SERVICE_TYPE;
              this.viaje.serviceType.id = this.serviceTypeId;
            }
          }
          // this.viaje.referenceId = this.offers.offers[indexOffer].referenceId;
          if (this.viaje.paymentType) {
            this.viaje.paymentType.id = (this.viaje.paymentType?.id != -1) ? this.viaje.paymentType?.id : this.offers.offerBasedOnPayment?.id;
          }
        }
      }
    } else {
      this.offers = new Response_Offer();
      this.viaje.totalService = undefined;
      this.viaje.currencyType = new CurrencyType();
      this.viaje.distance = undefined;
      if (this.viaje.serviceType) {
        this.viaje.serviceType.id = -1;
        this.centerCosteId = -1;
      }
      this.minutosEstimados = undefined
    }
    await this.onchangeServiceType();
  }


  // async onChangeClientCompany($event: Viaje){
  //   // console.log($event)
  //   if($event){
  //     this.viaje = UtilModalViaje.fnInitViaje($event);
  //     this.companyId = this.viaje.company?.id!;
  //     this.clientId = this.viaje.client?.id;
  //     this.viaje.observationClient = $event.client?.observation;
  //     this.isClient = $event.client?.isClient!;
  //   } else {
  //     this.viaje.client = undefined;
  //     this.viaje.frontFullName = undefined!;
  //     this.viaje.frontEmail = undefined!;
  //     this.clientId = undefined;
  //     this.isClient = (this.viaje.id) ? true : false;

  //     this.companyId = -1;
  //     this.viaje.company = undefined;
  //     this.clientTripSummary = null;
  //     this.showButtonHistory = false;
  //     this.viaje.destinations = UtilModalViaje.fnInitDestination([new Destinations()]);
  //     this.viaje.coverage = (this.viaje.coverage) ? this.viaje.coverage : new Coverage()
  //     this.viaje.coverage.id = -1;
  //     this.isValidateBalance = true;
  //   }

  //   await this.getClientTripSumary();
  //   await this.serviceLstCentroCosto();
  //   await this.serviceLstFavorite();
  //   await this.serviceOffer();
  //   await this.getClientTripDestination();
  //   await this.getDynamicFields();
  //   this.actualizarLstPosiciones();
  // }
  // async


  async onchangeClient($event: Client) {
    if ($event) {
      this.viaje.client = $event;
      this.viaje.company = $event.company;
      this.companyId = this.viaje.company?.id!;
      this.clientId = this.viaje.client.id;
      this.viaje.observationClient = $event.observation
      this.isClient = $event.isClient!;
      this.viaje.frontIsClient = $event.isClient!;

      this.viaje.vip = (this.viaje.client.vip) ? this.viaje.client.vip : false
      this.viaje.exigent = (this.viaje.client.exigent) ? this.viaje.client.exigent : false
      if (this.viaje.client.documentType) {
        this.viaje.client.documentType.name = (this.viaje.client.documentType) ? $event.documentType?.document : undefined!;
      }

      this.viaje.frontFullName = (($event.firstName && $event.firstLastName && $event.secondLastName) ? $event.firstName + ' ' + $event.firstLastName + ' ' + $event.secondLastName : $event.firstName)!;
      this.viaje.frontEmail = ($event.email) ? $event.email : '';
      if (this.viaje.client.countryCode == '51') {
        this.viaje.coverage = (this.viaje.coverage) ? this.viaje.coverage : new Coverage()
        this.viaje.coverage.id = 1;
      }

      this.viaje.frontClient = (this.viaje.frontClient) ? this.viaje.frontClient : UtilModalViaje.fnInitClient(new Client(), $event.cellPhone);
      this.viaje.phoneNumberReceived = (this.viaje.frontClient && this.viaje.frontClient.cellPhone) ? this.viaje.frontClient.cellPhone : this.viaje.client.cellPhone;
    } else {
      this.viaje.client = undefined;
      this.viaje.frontFullName = undefined!;
      this.viaje.frontEmail = undefined!;
      this.clientId = undefined;
      this.isClient = (this.viaje.id) ? true : false;

      this.companyId = -1;
      this.viaje.company = undefined;
      this.clientTripSummary = null;
      this.showButtonHistory = false;
      this.viaje.destinations = UtilModalViaje.fnInitDestination([new Destinations()]);
      this.viaje.coverage = (this.viaje.coverage) ? this.viaje.coverage : new Coverage()
      this.viaje.coverage.id = -1;
      this.isValidateBalance = true;
    }

    await this.getClientTripSumary();
    await this.serviceLstCentroCosto();
    await this.serviceLstFavorite();
    await this.serviceOffer();
    await this.getClientTripDestination();
    this.actualizarLstPosiciones();
  }

  onChangeSearchValue($event: any) {
    if (!this.viaje.client || this.searchValueAutocomplete != $event) {
      this.searchValueAutocomplete = $event;
      this.viaje.client = undefined;
      this.viaje.frontFullName = undefined!;
      this.viaje.frontEmail = undefined!;
      this.clientId = undefined;
      this.companyId = -1;
      this.viaje.client = UtilModalViaje.fnInitClient(new Client(), this.searchValueAutocomplete);
      this.viaje.frontFullName = ((this.viaje.client.firstName && this.viaje.client.firstLastName && this.viaje.client.secondLastName) ? this.viaje.client.firstName + '' + this.viaje.client.firstLastName + '' + this.viaje.client.secondLastName : this.viaje.client.firstName)!;
      this.viaje.company = new Company()
      this.viaje.phoneNumberReceived = (this.viaje.client && this.viaje.client.cellPhone) ? this.viaje.client.cellPhone : $event;
      this.getClientTripDestination();
    }
  }

  async onchangeClientCall($event: Client) {
    if ($event) {
      this.viaje.frontClient = $event;
      if (this.viaje.frontClient && this.viaje.frontClient.id && this.viaje.frontClient.cellPhone) {
        this.getClientCellPhone($event.cellPhone!);
      }
    } else {
      this.viaje.client = undefined;
      this.viaje.frontFullName = undefined!;
      this.viaje.frontEmail = undefined!;
      this.clientId = undefined;
      this.isClient = (this.viaje.id) ? true : false;

      this.companyId = -1;
      this.viaje.company = undefined;
      this.clientTripSummary = null;
      this.showButtonHistory = false;
      this.viaje.destinations = UtilModalViaje.fnInitDestination([new Destinations()]);
      this.viaje.coverage = (this.viaje.coverage) ? this.viaje.coverage : new Coverage()
      this.viaje.coverage.id = -1;
      this.isValidateBalance = true;
    }

    await this.getClientTripSumary();
    await this.serviceLstCentroCosto();
    await this.serviceLstFavorite();
    await this.serviceOffer();
    await this.getClientTripDestination();
    this.actualizarLstPosiciones();
  }

  onChangeSearchValueCall($event: any) {
    if (!this.viaje.frontClient || this.searchValueAutocomplete != $event) {
      this.searchValueAutocomplete = $event;
      this.viaje.client = undefined;
      this.viaje.frontFullName = undefined!;
      this.viaje.frontEmail = undefined!;
      this.clientId = undefined;
      this.companyId = -1;
      this.viaje.frontClient = UtilModalViaje.fnInitClient(new Client(), this.searchValueAutocomplete);
      this.viaje.frontFullName = ((this.viaje.frontClient.firstName && this.viaje.frontClient.firstLastName && this.viaje.frontClient.secondLastName) ? this.viaje.frontClient.firstName + '' + this.viaje.frontClient.firstLastName + '' + this.viaje.frontClient.secondLastName : this.viaje.frontClient.firstName)!;
      this.viaje.company = new Company()
      this.viaje.phoneNumberReceived = (this.viaje.frontClient && this.viaje.frontClient.cellPhone) ? this.viaje.frontClient.cellPhone : $event;
      this.getClientTripDestination();
    }
  }

  // openModalClient() {
  //   if (this.cellPhoneClient && this.cellPhoneClient.length == 9) {
  //     const modalRef = this.modalService.open(ModalClientComponent, { backdrop: 'static' });
  //     modalRef.componentInstance.headerModal = 'Clientes';
  //     modalRef.componentInstance.btn_Options = 'Aceptar';
  //     modalRef.componentInstance.cellPhone = this.cellPhoneClient;
  //     modalRef.componentInstance.routeService = RouteService.distpatchClientSearchGet;

  //     if (this.subscriptionModalClient) {
  //       this.subscriptionModalClient.unsubscribe
  //     }

  //     this.subscriptionModalClient = modalRef.componentInstance.client.subscribe(($event: any) => {
  //       if ($event) {
  //         this.viaje.client = UtilModalViaje.fnInitClient($event, this.cellPhoneClient);
  //         this.viaje.frontFullName = (this.viaje.client.firstName && this.viaje.client.firstLastName && this.viaje.client.secondLastName) ? this.viaje.client.firstName + '' + this.viaje.client.firstLastName + '' + this.viaje.client.secondLastName : this.viaje.client.firstName;
  //         this.viaje.company = new Company()
  //         this.viaje = UtilModalViaje.fnInitViaje(this.viaje);
  //         this.viaje.company = this.viaje.client?.company;
  //         this.viaje.frontEmail = (this.viaje.client?.email) ? this.viaje.client.email : '';
  //         this.clientId = this.viaje.client?.id;
  //         this.companyId = this.viaje.company?.id!;
  //         this.isClient = this.viaje.client?.isClient!;

  //         this.getClientTripSumary();
  //         this.getClientTripDestination();
  //         this.serviceLstCentroCosto();
  //         this.serviceLstFavorite();
  //         this.actualizarVista();

  //       } else {
  //         this.viaje.client = UtilModalViaje.fnInitClient(new Client(), this.cellPhoneClient);
  //         this.viaje.frontFullName = (this.viaje.client.firstName && this.viaje.client.firstLastName && this.viaje.client.secondLastName) ? this.viaje.client.firstName + '' + this.viaje.client.firstLastName + '' + this.viaje.client.secondLastName : this.viaje.client.firstName;
  //         this.viaje.company = new Company()
  //         this.isClient = false;
  //         this.viaje = UtilModalViaje.fnInitViaje(this.viaje);
  //       }
  //     })
  //   }
  // }

  async onchangeCompany($event: Company) {
    this.viaje.company = $event;
    if (this.viaje.client && this.viaje.company && this.viaje.client.company?.id == this.viaje.company.id) {
      this.viaje.client = undefined;
      this.companyId = this.viaje.company.id!;
      this.clientId = undefined;
    } else {
      this.companyId = -1;
      this.viaje.client = undefined;
      this.clientId = undefined;
    }
    await this.serviceLstCentroCosto();
    await this.serviceLstFavorite()
    this.serviceOffer()
  }

  async getDynamicFields() {
    if (this.viaje.company && this.viaje.company.uuid && environment.CONFIGURATION.TRAVEL_MODAL.DYNAMIC_FIELDS) {
      this.lstDynamicFields = await this.serviceComponent.requestService(StructService.ARRAY, RouteService.dispatchCompanyDynamicFieldGet, this.viaje.company.uuid) as DynamicField[];
      if (this.lstDynamicFields && this.lstDynamicFields.length > 0) {
        this.enableButton = true;
        let field: ResponseDynamicFields = new ResponseDynamicFields();
        this.lstDynamicFields.forEach(fields => {
          field.id = fields.id;
          field.isRequired = fields.isRequired;
          field.value = null!;
          this.lstResponse.push(cloneDeep(field));
        });
      }
    }
  }
  async serviceLstCentroCosto() {
    if (this.viaje.client && this.viaje.client.id && this.viaje.company && this.viaje.company.id) {
      var requestCenterCost: RequestDistpatchCenterCost = new RequestDistpatchCenterCost();
      requestCenterCost.client_id = this.viaje.client.id;
      requestCenterCost.company_id = this.viaje.company.id;
      let lstCentroCosto = await this.serviceComponent.requestService(StructService.ARRAY, RouteService.distpatchCentercostGet, requestCenterCost)
      if (this.viaje.costCenter && lstCentroCosto && lstCentroCosto.length >= 1) {
        this.lstCentroCosto = lstCentroCosto;
        let costCenter = this.lstCentroCosto.find(coste => coste.id == this.viaje.costCenter?.id);
        if (costCenter) {
          this.viaje.costCenter = costCenter;
        } else {
          this.viaje.costCenter.id = this.lstCentroCosto[0].id;
        }
        this.centerCosteId = this.viaje.costCenter.id;
      } else {
        this.lstCentroCosto = [];
      }
      this.actualizarVista()
    } else {
      if (this.viaje.costCenter) {
        this.viaje.costCenter.id = -1;
      }
      this.lstCentroCosto = [];
    }
  }
  async serviceLstCentroCostoCorporate() {
    var cellPhone: any = localStorage.getItem('celular');
    if (this.dataMaestra.user?.id! > 0) {
      let searchJson = {
        key_word: cellPhone,
        company_id: -1
      }
      let response = await this.serviceComponent.requestService(this.structServiceArray, this.routeServiceCliente, searchJson) as Client[];
      console.log("response")
      console.log(response[0].company?.id)
      var requestCenterCost: RequestDistpatchCenterCost = new RequestDistpatchCenterCost();
      requestCenterCost.client_id = this.dataMaestra.user?.id!;
      requestCenterCost.company_id = response[0].company?.id;
      let lstCentroCosto = await this.serviceComponent.requestService(StructService.ARRAY, RouteService.distpatchCentercostGet, requestCenterCost)
      if (this.viaje.costCenter && lstCentroCosto && lstCentroCosto.length >= 1) {
        this.lstCentroCosto = lstCentroCosto;
        let costCenter = this.lstCentroCosto.find(coste => coste.id == this.viaje.costCenter?.id);
        if (costCenter) {
          this.viaje.costCenter = costCenter;
        } else {
          this.viaje.costCenter.id = this.lstCentroCosto[0].id;
        }
        this.centerCosteId = this.viaje.costCenter.id;
      } else {
        this.lstCentroCosto = [];
      }
      this.actualizarVista()
    } else {
      if (this.viaje.costCenter) {
        this.viaje.costCenter.id = -1;
      }
      this.lstCentroCosto = [];
    }
  }
  async serviceLstCamposDinamicos() {
    let company: any = localStorage.getItem('company_id');
    let searchJson = {
      company_id: company,
      client_id: this.dataMaestra.user?.uuid!
    }

    this.lstDynamicControls = await this.serviceComponent.requestService(StructService.ARRAY, RouteService.maintananceCompanyTypeControlDynamicGet, searchJson);
    this.lstDynamicControls.forEach(element => {
      if (element.type == 'COMPANY_DYNAMICFIELD_TYPE_FIELD_CLOSED') {
        element.values.forEach(itemClosed => {
          let item : any
          item = itemClosed 
          this.listaCampoDinamicoCerrado.push(item) 
        });
   
      }
    });
    this.actualizarVista()
  }
  // openModalAuditTrip() {
  //   if (this.viaje && this.viaje.id && this.flagHavePermission(ID_PermissionModal.EVENT_SHOW_AUDIT)) {
  //     const modalRef = this.modalService.open(ModalAuditTripComponent, { size: 'xl' });
  //     modalRef.componentInstance.dlog_service_id = this.viaje.id;
  //     modalRef.componentInstance.dlog_initDate = fnDateforPlatform(this.viaje.serviceDateTime);
  //   }
  //   this.actualizarVista();
  // }

  async onChangeMapMarkers($event: changePositionMarker) {
    let requestCoordinate: RequestGeoAutocomplete = new RequestGeoAutocomplete();
    requestCoordinate.latitude = $event.marker?.getPosition()?.lat();
    requestCoordinate.longitude = $event.marker?.getPosition()?.lng();

    let responseCoordinate: CoordinateAutocomplete = await this.serviceComponent.requestService(StructService.CODE, RouteService.geoCodingCoordinateGet, requestCoordinate)
    let index: number = 0;

    if (responseCoordinate && responseCoordinate.mainText) {
      this.viaje.destinations?.forEach(destinos => {
        if (destinos.origin && destinos.destination) {
          if ($event.index == 0) {

            destinos.origin.addressMainText = UtilModalViaje.fnSplitMainSecundaryText(responseCoordinate.mainText);
            destinos.origin.addressSecondaryText = UtilModalViaje.fnSplitMainSecundaryText(responseCoordinate.secondaryText);

            destinos.origin.zoneId = (responseCoordinate.zone) ? responseCoordinate.zone.id : undefined;
            destinos.origin.zoneDescription = (responseCoordinate.zone) ? responseCoordinate.zone.description : undefined;

            destinos.origin.latitude = requestCoordinate.latitude;
            destinos.origin.longitude = requestCoordinate.longitude;

            this.actualizarVista()

          } else if (($event.index! - 1) == index) {

            destinos.origin.addressMainText = UtilModalViaje.fnSplitMainSecundaryText(responseCoordinate.mainText);
            destinos.origin.addressSecondaryText = UtilModalViaje.fnSplitMainSecundaryText(responseCoordinate.secondaryText);

            destinos.destination.zoneId = (responseCoordinate.zone) ? responseCoordinate.zone.id : undefined;
            destinos.destination.zoneDescription = (responseCoordinate.zone) ? responseCoordinate.zone.description : undefined;

            destinos.destination.latitude = requestCoordinate.latitude;
            destinos.destination.longitude = requestCoordinate.longitude;
          }
        }
        index++;
      });

      await this.serviceOffer()
    } else {

      this._serviceToast.showWarning(environment.MSJE_CLIENTE.GEO_AUTOCOMPLETE.ERROR.SIN_COBERTURA);
    }

    this.actualizarVista()
  }

  obtenerServiceType(): boolean {
    if (UtilModalViaje.fnGetServiceTypeCarga(this.viaje.serviceType?.id!)) {
      this.cantDestinations = 1;
      return true;
    } else if (UtilModalViaje.fnGetServiceTypeCourier(this.viaje.serviceType?.id!)) {
      this.cantDestinations = 1;
      return false;
    } else {
      this.cantDestinations = 8;
      return false
    }
  }

  cantDestination() {
    if (UtilModalViaje.fnValidateCantDestination(this.viaje.serviceType?.id!, this.viaje.destinations!)) {
      this._serviceToast.showWarning("El tipo de servicio seleccionado tiene un máximo en destinos de: " + this.nroDestination);
    }
  }

  async onchangeServiceType() {
    this.viaje.serviceType = (this.viaje.serviceType) ? this.viaje.serviceType : new ServiceType();
    this.viaje.serviceType.id = this.serviceTypeId;
    //mensaje toast carga y courier
    var destinationMax: any = this.offers.offers!.find(offer => offer.serviceType?.id == this.serviceTypeId)!
    if (this.serviceTypeId == 2 || this.serviceTypeId == 5 || this.serviceTypeId == 8) {
      this.nroDestination = destinationMax.serviceType?.destinationsMax!;
      this._serviceToast.showInfo('El tipo de servicio carga y/o courier tiene un máximo en destinos de: ' + this.nroDestination)
    }
    if (this.viaje.serviceType && this.viaje.serviceType?.id != -1) {
      // var objTipoServicio = this.offers.offers?.find(tipoServicio => (tipoServicio.serviceType?.id == this.viaje.serviceType?.id))
      var objTipoServicio = this.offers.offers[0]
      if (objTipoServicio ) { //&& objTipoServicio.serviceType?.id == this.viaje.serviceType?.id

        //Validar si la cantidad de pasajeros usudos es mayor a la actual;
        this.cantPasajeros = objTipoServicio.vehicleType?.numberPassenger!;
        if (objTipoServicio.priceAvailableOnOnlyServiceFinish) {
          this.viaje.totalService = undefined
          this.viaje.distance = undefined;
          this.minutosEstimados = undefined
          this.polilyneRuta = [];
        } else {
          this.viaje.totalService = objTipoServicio.priceEstimate;
          this.viaje.currencyType = new CurrencyType();
          this.viaje.currencyType.id = objTipoServicio.currencyType?.id;
          this.viaje.currencyType.symbol = objTipoServicio.currencyType?.symbol;
          this.viaje.currencyType.code = objTipoServicio.currencyType?.code;
          this.viaje.currencyType.name = objTipoServicio.currencyType?.name;

          this.viaje.distance = objTipoServicio.distanceTrip;
          this.minutosEstimados = fnUnionDate_TimeString(this.viaje.frontDateTime!, this.viaje.frontServiceDateTime!, objTipoServicio.estimatedTime)
          this.polilyneRuta = [{ coordinateEncoded: objTipoServicio.polylineRoute! }]

          this.actualizarVista()
        }
        this.viaje.currencyType = new CurrencyType();
        this.viaje.currencyType.id = objTipoServicio.currencyType?.id;
        this.viaje.currencyType.symbol = objTipoServicio.currencyType?.symbol;
        this.viaje.currencyType.code = objTipoServicio.currencyType?.code;
        this.viaje.currencyType.name = objTipoServicio.currencyType?.name;

        this.viaje.serviceType.id = objTipoServicio.serviceType?.id;
        this.destinationPrice = objTipoServicio.destinationsPrice;
        this.serviceTypeId = this.viaje.serviceType.id;

        this.cantDestination();
      } else {
        this.viaje.serviceType.id = -1;
        this.serviceTypeId = -1;
      }

    } else {
      this.viaje.totalService = undefined;
      this.viaje.currencyType = new CurrencyType();
      this.viaje.distance = undefined;
      this.minutosEstimados = undefined
      this.polilyneRuta = [];
      this.serviceTypeId = -1;
    }
    this.actualizarVista();
  }

  async changePaymentType($event?: any) {
    let paymentService = this.offers.paymentAvailable?.find(payment => payment.id == this.paymentId);
    if (paymentService) {
      this.viaje.paymentType = paymentService;
      this.paymentId = this.viaje.paymentType.id;
    } else {
      this.paymentId = -1;
    }
  }

  async serviceLstFavorite() {
    if (this.clientId && this.companyId && this.clientId > 0 && this.companyId > 0) {
      let requestGetFavorite: RequestGetFavorite = new RequestGetFavorite()
      requestGetFavorite.client_id = this.clientId;
      requestGetFavorite.company_id = this.companyId;

      let lstFavoritos: Favorite[] = await this.serviceComponent.requestService(StructService.ARRAY, RouteService.maintenanceClientFavoritesGet, requestGetFavorite)
      if (lstFavoritos && lstFavoritos.length >= 0) {
        this.lstFavoritos = UtilModalViaje.fnConvertFavoritesToGeoAutocomplete(lstFavoritos);
      } else {
        this.lstFavoritos = [];
      }
    } else {
      this.lstFavoritos = [];
    }
    this.actualizarVista();
  }

  async onChangeFavoritos() {
    await this.serviceLstFavorite();
    this.actualizarVista();
  }

  cleanListas() {
    this.viaje.distance = undefined;
    this.minutosEstimados = undefined!;
    this.polilyneRuta = [];
    this.offers = new Response_Offer();
    this.actualizarVista();
  }

  createIntervalConductores() {
    if (this.IntervalConductores) {
      clearInterval(this.IntervalConductores);
    }

    if (this.viaje.destinations && this.viaje.destinations[0].origin && this.viaje.destinations[0].origin.latitude && this.viaje.destinations[0].origin.longitude) {
      this.IntervalConductores = setInterval(() => {
        if (this.viaje.destinations) {
          this.intervalConductores(this.viaje.destinations[0].origin?.latitude!, this.viaje.destinations[0].origin?.longitude!);
        }
      }, 30000);
    }
  }

  async intervalConductores(latitude: number, longitude: number) {
    let jsonRequest = {
      latitude: latitude,
      longitude: longitude
    }

    let responseConductoresDisponibles: DriverAvailable[] = await this.serviceComponent.requestService(StructService.ARRAY, RouteService.distpatchServicePost, jsonRequest)

    if (responseConductoresDisponibles && responseConductoresDisponibles.length > 0) {
      this.lstConductoresCercanos = responseConductoresDisponibles;
      this.actualizarLstPosiciones();
    }

  }

  //region offer
  btnOffertarViaje($event: any) {
    let errorServer: ErrorServer = $event as ErrorServer;

    if (!errorServer || (errorServer && errorServer.code && errorServer.id && errorServer.statusCode)) {
      this._serviceToast.showSuccess(this.numberTrip + this.viaje.id + ' ' + this.msjOfferSuccess);
    }
  }

  fnShowOfferOnlyState(): boolean {
    if (this.viaje.statusType && this.flagHavePermission(ID_PermissionModal.EVENT_OFFER_TRIP_MODAL)) {
      return UtilModalViaje.fnShowOffer(this.viaje.statusType.id!);
    } else {
      return false;
    }
  }
  //#endregion offer

  //#region cancel
  btnCancelViaje($event: any) {
    let responceReasonCancel: CancelReasons[] = $event as CancelReasons[];
    if (responceReasonCancel && responceReasonCancel.length && responceReasonCancel.length > 0) {

      const modalRef = this.modalService.open(ModalCancelReasonsComponent, { backdrop: 'static' });
      modalRef.componentInstance.IdTrip = this.viaje.id;
      modalRef.componentInstance.uuidIdTrip = this.viaje.uuid;
      modalRef.componentInstance.withIdTrip = true;
      modalRef.componentInstance.routeService = RouteService.distpatchServiceCancelPost;
      modalRef.componentInstance.headerModal = 'MODAL_CANCEL_SERVICE.lbl_TituloModal';
      modalRef.componentInstance.btn_Options = 'MODAL_CANCEL_SERVICE.btn_Cancelar';
      modalRef.componentInstance.lstOptions = responceReasonCancel;

      if (this.subscriptionCancel) {
        this.subscriptionCancel.unsubscribe
      }

      this.subscriptionCancel = modalRef.componentInstance.closeModal.subscribe(($event: any) => {
        this.closeModalCancel($event)
      })

    } else if (responceReasonCancel.length == 0) {
      this._serviceToast.showWarning(environment.MSJE_CLIENTE.MODAL_VIAJE.WARNING.SIN_RAZONES_DE_CANCELACION);
    }
  }

  async getReasonsCancel() {
    let responceReasonCancel = await this.serviceComponent.requestService(this.structServiceArray, this.routeServicevalidateCancel, { service_id: this.viaje.id }) as CancelReasons[]
    if (responceReasonCancel && responceReasonCancel.length && responceReasonCancel.length > 0) {

      const modalRef = this.modalService.open(ModalCancelReasonsComponent, { backdrop: 'static' });
      modalRef.componentInstance.IdTrip = this.viaje.id;
      modalRef.componentInstance.uuidIdTrip = this.viaje.uuid;
      modalRef.componentInstance.withIdTrip = true;
      modalRef.componentInstance.routeService = RouteService.distpatchServiceCancelPost;
      modalRef.componentInstance.headerModal = 'MODAL_CANCEL_SERVICE.lbl_TituloModal';
      modalRef.componentInstance.btn_Options = 'MODAL_CANCEL_SERVICE.btn_Cancelar';
      modalRef.componentInstance.lstOptions = responceReasonCancel;

      if (this.subscriptionCancel) {
        this.subscriptionCancel.unsubscribe
      }

      this.subscriptionCancel = modalRef.componentInstance.closeModal.subscribe(($event: any) => {
        this.closeModalCancel($event)
      })

    } else if (responceReasonCancel.length == 0) {
      this._serviceToast.showWarning(environment.MSJE_CLIENTE.MODAL_VIAJE.WARNING.SIN_RAZONES_DE_CANCELACION);
    }
  }

  closeModalCancel($event: any) {
    let objStatus = this.dataMaestra.statusTypeService?.find(typeService => typeService.id == EstadosViaje.CANCELADO_USUARIO);
    if (this.viaje.statusType && objStatus) {
      this.viaje.statusType.description = objStatus.name;
      this.viaje.statusType.id = EstadosViaje.CANCELADO_USUARIO;
    }
  }

  fnShowCancelOnlyState(): boolean {
    if (this.viaje.statusType && this.flagHavePermission(ID_PermissionModal.EVENT_CANCEL_TRIP_MODAL)) {
      return UtilModalViaje.fnShowCancel(this.viaje.statusType.id!);
    } else {
      return false;
    }
  }
  //#endregion cancel

  //#region RemoveDriver

  btnRemoveDriverViaje($event: any) {
    let responceReasonRemoveDriver: CancelReasons[] = $event as CancelReasons[];
    if (responceReasonRemoveDriver && responceReasonRemoveDriver.length && responceReasonRemoveDriver.length > 0) {

      const modalRef = this.modalService.open(ModalCancelReasonsComponent, { backdrop: 'static' });
      modalRef.componentInstance.IdTrip = this.viaje.id;
      modalRef.componentInstance.uuidIdTrip = this.viaje.uuid;
      modalRef.componentInstance.withIdTrip = true;
      modalRef.componentInstance.routeService = RouteService.distpatchServiceUnassignPost;
      modalRef.componentInstance.headerModal = 'MODAL_RETIRAR_CONDUCTOR.lbl_TituloModal';
      modalRef.componentInstance.btn_Options = 'MODAL_RETIRAR_CONDUCTOR.btn_RetirarCoductor';
      modalRef.componentInstance.lstOptions = responceReasonRemoveDriver;

      if (this.subscriptionRemoveDriver) { this.subscriptionRemoveDriver.unsubscribe }

      this.subscriptionRemoveDriver = modalRef.componentInstance.closeModal.subscribe(($event: any) => {
        this.closeModalRemoveDriver($event)
      })

    } else if (responceReasonRemoveDriver.length == 0) {
      this._serviceToast.showWarning(environment.MSJE_CLIENTE.MODAL_VIAJE.WARNING.SIN_RAZONES_DE_CANCELACION);
    }
  }

  async getReasonsRemoveDriver() {
    let responceReasonRemoveDriver = await this.serviceComponent.requestService(this.structServiceArray, this.routeServicevalidateRemoveDriver, { service_id: this.viaje.id }) as CancelReasons[]

    if (responceReasonRemoveDriver && responceReasonRemoveDriver.length && responceReasonRemoveDriver.length > 0) {

      const modalRef = this.modalService.open(ModalCancelReasonsComponent, { backdrop: 'static' });
      modalRef.componentInstance.IdTrip = this.viaje.id;
      modalRef.componentInstance.uuidIdTrip = this.viaje.uuid;
      modalRef.componentInstance.withIdTrip = true;
      modalRef.componentInstance.routeService = RouteService.distpatchServiceUnassignPost;
      modalRef.componentInstance.headerModal = 'MODAL_RETIRAR_CONDUCTOR.lbl_TituloModal';
      modalRef.componentInstance.btn_Options = 'MODAL_RETIRAR_CONDUCTOR.btn_RetirarCoductor';
      modalRef.componentInstance.lstOptions = responceReasonRemoveDriver;

      if (this.subscriptionRemoveDriver) { this.subscriptionRemoveDriver.unsubscribe }

      this.subscriptionRemoveDriver = modalRef.componentInstance.closeModal.subscribe(($event: any) => {
        this.closeModalRemoveDriver($event)
      })

    } else if (responceReasonRemoveDriver.length == 0) {
      this._serviceToast.showWarning(environment.MSJE_CLIENTE.MODAL_VIAJE.WARNING.SIN_RAZONES_DE_CANCELACION);
    }
  }

  closeModalRemoveDriver($event: any) {
    let objStatus = this.dataMaestra.statusTypeService?.find(typeService => typeService.id == EstadosViaje.APROBADO);
    if (this.viaje.statusType && objStatus) {
      this.viaje.statusType.description = objStatus.name;
      this.viaje.statusType.id = EstadosViaje.APROBADO;
    }
  }

  fnShowRemoveDriverOnlyState(): boolean {
    if (this.viaje.statusType && this.flagHavePermission(ID_PermissionModal.EVENT_REMOVER_DRIVER_MODAL)) {
      return UtilModalViaje.fnShowRemoveDriver(this.viaje.statusType.id!);
    } else {
      return false;
    }
  }

  //#endregion RemoveDriver  

  //#region Retained
  async btnRetainedTrip() {
    if (this.viaje && this.viaje.id) {
      if (this.viaje.isRetained) {
        let response = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchServiceRetainedDelete, this.viaje.id)

        if (!response) {
          this._serviceToast.showSuccess(environment.MSJE_CLIENTE.MODAL_VIAJE.MENSAJE.TRIP_LIBERATED)
          this.viaje.isRetained = false;
        }
      } else {
        let response = await this.serviceComponent.requestService(this.structServiceCode, RouteService.distpatchServiceRetainedPost, this.viaje.id)

        if (!response) {
          this._serviceToast.showSuccess(environment.MSJE_CLIENTE.MODAL_VIAJE.MENSAJE.TRIP_DETAINED)
          this.viaje.isRetained = true;
        }
      }
    }
  }

  fnShowDetainedOnlyState(): boolean {
    if (this.viaje.statusType && this.flagHavePermission(ID_PermissionModal.EVENT_RETAINED_TRIP_MODAL)) {
      return UtilModalViaje.fnShowOffer(this.viaje.statusType.id!);
    } else {
      return false;
    }
  }

  //#endregion Retained

  //#region Client
  keyCode(key: ShortCut) {
    if (key && key.value) {
      switch (key.value) {
        case ValueKey.SAVE:
          this.AddEditClient();
          break;
        case ValueKey.CANCEL_TRIP:
          if (this.viaje.id && this.viaje.uuid) {
            this.getReasonsCancel();
          }
          break
        case ValueKey.REMOVE_DRIVER:
          if (this.viaje.id && this.viaje.uuid) {
            this.getReasonsRemoveDriver();
          }
          break
        case ValueKey.TAB:
          if (this.viaje.id && this.viaje.uuid) {
            // this.showTracking();
          }
          break
        case ValueKey.CLOSE_MODAL:
          if (this.modalService.hasOpenModals()) {
            // this.openModalExitConfirmation();
            // this.activeModal.close('Close click')
          }
          break
      }
    }
  }

  async AddEditClient() {
    let requestClient: any;

    if (this.changeCellPhoneClient) {

      if (this.clientId && this.newCellPhoneClient && this.newCellPhoneClient.length >= 9) {
        requestClient = {
          cellPhone: this.newCellPhoneClient,
          fullName: this.viaje.frontFullName,
          countryCode: this.countryCode,
          email: (this.viaje.frontEmail && this.viaje.frontEmail.length > 0) ? this.viaje.frontEmail : null,
          id: this.viaje.client?.id
        };
      }

    } else {
      if (this.clientId) {
        requestClient = {
          cellPhone: this.viaje.client?.cellPhone,
          fullName: this.viaje.frontFullName,
          countryCode: this.countryCode,
          email: (this.viaje.frontEmail && this.viaje.frontEmail.length > 0) ? this.viaje.frontEmail : null,
          id: this.viaje.client?.id
        };
      } else {
        requestClient = {
          cellPhone: this.viaje.client?.cellPhone,
          fullName: this.viaje.frontFullName,
          countryCode: this.countryCode,
          email: (this.viaje.frontEmail && this.viaje.frontEmail.length > 0) ? this.viaje.frontEmail : null,
        };
      }
    }

    if (requestClient.id && requestClient.cellPhone && requestClient.fullName) {
      let response: any = await this.serviceComponent.requestService(this.structServiceCode, RouteService.distpatchCliendEditPut, requestClient)
      if (response.id && response.id > 0) {
        this._serviceToast.showSuccess(environment.MSJE_CLIENTE.MODAL_VIAJE.MENSAJE.SAVE_NEW_CLIENT);

        this.viaje.client = UtilModalViaje.fnInitClient(response, this.searchValueAutocomplete);
        this.viaje.frontFullName = ((this.viaje.client.firstName && this.viaje.client.firstLastName && this.viaje.client.secondLastName) ? this.viaje.client.firstName + '' + this.viaje.client.firstLastName + '' + this.viaje.client.secondLastName : this.viaje.client.firstName)!;
        this.viaje.company = new Company()
        this.viaje.client = UtilModalViaje.fnInitClient(response);
        this.viaje.frontEmail = (this.viaje.client.email) ? this.viaje.client.email : '';
        this.viaje.company = this.viaje.client.company;
        this.clientId = this.viaje.client.id;
        this.companyId = this.viaje.client.company?.id!;
        this.isClient = true;

        await this.getClientTripSumary();
        await this.getClientTripDestination();
        await this.serviceLstCentroCosto();
        await this.serviceLstFavorite();
        this.actualizarVista();
      }

    } else if (requestClient.cellPhone && requestClient.fullName) {
      let response: any = await this.serviceComponent.requestService(this.structServiceCode, RouteService.distpatchCliendAddPost, requestClient)
      if (response.id && response.id > 0) {
        this._serviceToast.showSuccess(environment.MSJE_CLIENTE.MODAL_VIAJE.MENSAJE.SAVE_NEW_CLIENT);

        this.viaje.client = UtilModalViaje.fnInitClient(response, this.searchValueAutocomplete);
        this.viaje.frontFullName = ((this.viaje.client.firstName && this.viaje.client.firstLastName && this.viaje.client.secondLastName) ? this.viaje.client.firstName + '' + this.viaje.client.firstLastName + '' + this.viaje.client.secondLastName : this.viaje.client.firstName)!;
        this.viaje.company = new Company()
        this.viaje.client = UtilModalViaje.fnInitClient(response);
        this.viaje.frontEmail = (this.viaje.client.email) ? this.viaje.client.email : '';
        this.viaje.company = this.viaje.client.company;
        this.clientId = this.viaje.client.id;
        this.companyId = this.viaje.client.company?.id!;
        this.isClient = true;

        await this.getClientTripSumary();
        await this.getClientTripDestination();
        await this.serviceLstCentroCosto();
        await this.serviceLstFavorite();
        this.actualizarVista();
      }
    } else {
      this._serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.MENSAJE.COMPLETE_INFORMATION_CLIENT);
    }
  }

  async getClientTripSumary() {
    if (this.clientId && this.isClient) {
      let response: any = await this.serviceComponent.requestService(this.structServiceArray, this.routeServiceClientTripSumary, this.clientId)
      if (response) {
        this.clientTripSummary = response;
        if (this.clientTripSummary.totalServicesCompleted && this.clientTripSummary.totalServicesCompleted >= 1) {
          this.showButtonHistory = true;
        } else {
          this.showButtonHistory = false;
        }
      }
    } else {
      this.clientTripSummary = null;
      this.showButtonHistory = false;
    }
  }

  async getClientTripDestination() {
    if (this.viaje.id) {

    } else if (this.clientId && this.viaje.frontIsClient && !this.viaje.id) {
      let response: any = await this.serviceComponent.requestService(this.structServiceArray, this.routeServiceClientTripDestination, this.clientId)
      if (response && response.length >= 1 && this.viaje.destinations) {
        this.viaje.destinations[0].origin = response[0].origin;
        this.viaje.destinations[0].destination = new Destination();
        await this.serviceOffer();
        this.changePaymentType();
      } else {
        this.viaje.destinations = UtilModalViaje.fnInitDestination([new Destinations()]);
      }
    } else {
      this.viaje.destinations = UtilModalViaje.fnInitDestination([new Destinations()]);
    }
  }

  async getClientCellPhone(cellPhone: string) {
    let searchJson = {
      key_word: cellPhone,
      company_id: -1
    }

    let response = await this.serviceComponent.requestService(this.structServiceArray, this.routeServiceCliente, searchJson) as Client[];
    if (response && response.length >= 1) {

      this.viaje.frontClient = UtilModalViaje.fnInitClient(response[0], this.searchValueAutocomplete);
      this.viaje.phoneNumberReceived = this.viaje.frontClient.cellPhone;
      this.viaje.client = UtilModalViaje.fnInitClient(response[0], this.searchValueAutocomplete);
      this.viaje.frontFullName = ((this.viaje.client.firstName && this.viaje.client.firstLastName && this.viaje.client.secondLastName) ? this.viaje.client.firstName + '' + this.viaje.client.firstLastName + '' + this.viaje.client.secondLastName : this.viaje.client.firstName)!;
      this.viaje.company = new Company()
      this.viaje = UtilModalViaje.fnInitViaje(this.viaje);
      this.viaje.company = this.viaje.client?.company;
      this.viaje.frontEmail = (this.viaje.client?.email) ? this.viaje.client?.email : '';
      this.clientId = this.viaje.client?.id;
      this.companyId = this.viaje.company?.id!;
      this.isClient = true;
      this.viaje.frontIsClient = true;
      await this.getClientTripSumary();
      await this.getClientTripDestination();
      await this.serviceLstCentroCosto();
      await this.serviceLstFavorite();
      this.actualizarVista();

    } else {
      let CellPhoneClientCall = (this.dataIvr.numberInbound) ? this.dataIvr.numberInbound : this.searchValueAutocomplete;
      this.viaje.frontClient = UtilModalViaje.fnInitClient(new Client(), CellPhoneClientCall);
      this.viaje.phoneNumberReceived = this.viaje.frontClient.cellPhone;
      this.viaje.frontFullName = null!;
      this.viaje.company = new Company();
      this.companyId = -1;
      this.isClient = false;
      this.viaje = UtilModalViaje.fnInitViaje(this.viaje);
    }
  }

  // showTracking() {
  //   if (this.flagHavePermission(ID_PermissionModal.EVENT_SAVE_TRIP)) {
  //     if (this.viaje.id && this.viaje.uuid && UtilFilaDetalle.fnShowBtnTracking(this.viaje.statusType?.id!)) {
  //       const modalRef = this.modalService.open(TripTrackingComponent, { size: 'xl' });
  //       modalRef.componentInstance.uuidService = this.viaje.uuid;
  //       modalRef.componentInstance.IdTrip = this.viaje.id;
  //     }
  //   } else {
  //     this.userPermissionService.toastInformation();
  //   }
  //   this.actualizarVista();
  // }
  flagHavePermission(permission: string): boolean {
    return this.userPermissionService.getPermission(permission as ID_Permission, ID_Screen.MODAL_TRAVEL);
  }
  // crearServicioInmediatio(data: ResponseServicio, servicio: RequestServicio) {
  //   // if (!servicio.anticipada || (environment.CODCLIENTE== 'NXVCARGUI' && servicio.anticipadoalmomento)) {
  //   //   this.btnCancelarServicio = environment.LABELS_PERSONALIZACION.btnModalCancelarServicio;
  //   //   this.modalBuscandoConductores = this.modalService.show(this.templateBuscandoConductores, { class: 'modal-confirm', backdrop: 'static', keyboard: false });

  //   //   this.flagCancelarServicio = true
  //   //   this.idServicioCurrent = parseInt(data.values.IdServicio);
  //   //   this.timeoutCrear = setTimeout(() => {
  //   //     this.estadoBuscandoConductor();
  //   //     this.buscarConductor(data);
  //   //   }, 5000);
  //   // }

  //   // else if(servicio.anticipada && environment.CODCLIENTE == 'NXVDIRECTO' && servicio.anticipadoalmomento){
  //   //   const clienteContador = parseInt(data.values.CLIENTE_CONTADOR);
  //   //   this.btnCancelarServicio = environment.LABELS_PERSONALIZACION.btnModalCancelarServicio;
  //   //   this.modalBuscandoConductores = this.modalService.show(this.templateBuscandoConductores, { class: 'modal-confirm', backdrop: 'static', keyboard: false });

  //   //   this.flagCancelarServicio = true
  //   //   this.idServicioCurrent = parseInt(data.values.IdServicio);
  //   //   this.timeoutCrear = setTimeout(() => {
  //   //     this.estadoBuscandoConductor();
  //   //     this.buscarConductor(data);
  //   //   }, clienteContador * 1000);  
  //   // }

  //   // else {
  //   //   this.flagCancelarServicio = false


  //   //   if (this.solicitar.I011_TipoServicio == environment.TIPO_SERVICIO.MOTO || this.solicitar.I011_TipoServicio == 100) {
  //   //     this.imgModal = 'assets/moto.png',
  //   //       this.iconModalMoto = 1,
  //   //       this.lblMovilidadAsignada = environment.LABELS_PERSONALIZACION.lblModalMovilidadAsignada;
  //   //   }
  //   //   else if(environment.CODCLIENTE == "NXVLILIGAS"){
  //   //     this.imgModal = 'assets/furgoneta-de-reparto.svg',
  //   //     this.iconModalMoto = 2,
  //   //     this.lblMovilidadAsignada = environment.LABELS_PERSONALIZACION.lblModalMovilidadAsignada;
  //   //   }
  //   //   else {
  //   //     this.imgModal = 'assets/auto.png',
  //   //       this.iconModalMoto = 3,
  //   //       this.lblMovilidadAsignada = environment.LABELS_PERSONALIZACION.lblModalMovilidadAsignada;
  //   //   }

  //   //   this.modalSolicitarServicio = this.modalService.show(this.templateSolicitar, { class: 'modal-confirm', backdrop: 'static', keyboard: false });
  //   //   // this.zonaPeligrosaSms = environment.MENSAJES.ZONA_PELIGROSA;
  //   //   if (environment.CODCLIENTE == 'NXVDIRECTO') {
  //   //     this.MENSAJECINFIRMACION = 'Pedido Completado.';
  //   //   }if(environment.CODCLIENTE == 'NXVLILIGAS'){
  //   //     this.MENSAJECINFIRMACION = 'Su pedido ha sido creado correctamente.'
  //   //   }
  //   //    else {
  //   //     this.MENSAJECINFIRMACION = 'Su pedido ha sido creado correctamente.'
  //   //   }
  //   //   this.limpiarSolicitarServicio();
  //   // }
  // }
  //#region  buscar conductor
  // estadoBuscandoConductor() {
  //   if (this.showProgressBuscar) {
  //     this.intervalProgress = Nexus.mostrarProgressBarIndeterminate('progress-busqueda');
  //   }
  // }

  // buscarConductor(datos: ResponseServicio) {
  //   this.datosRptBusquedaConductor = datos;
  //   const intervaloContador = parseInt(datos.values.INTERVALO_CONTADOR);

  //   let contador = 0;
  //   this.intervalBusqueda = setInterval(() => {
  //     contador++;
  //     if ((contador * intervaloContador) > parseInt(this.datosRptBusquedaConductor.values.CLIENTE_CONTADOR)) {
  //       this.flagCreandoServicio = false
  //       this.datosRptBusquedaConductor.values.ultimaConsulta = 1;
  //       this.asignoConductor = false;
  //     } else {
  //       this.asignoConductor = true;
  //       this.datosRptBusquedaConductor.values.ultimaConsulta = 0;
  //     }
  //     this.datosRptBusquedaConductor.values.idservicio = ""+this.idServicioCurrent;
  //     this.obtenerConductor(this.datosRptBusquedaConductor);
  //   }, (intervaloContador * 1000));
  // }

  // obtenerConductor(datos: ResponseServicio) {
  //   this.alertService.clear();
  //   if(environment.CODCLIENTE == "NXVDIRECTO"){
  //     this._httpSolicitarServicio.requestObtenerConductorDirecto(datos).subscribe(
  //       (data: ResponseServicio) => {
  //         this.datosRptBusquedaConductor = data;
  //         if (data.values.conductoractual != null && data.values.conductoractual.length > 0) {
  //           this.asignoConductor = true;
  //           this.idConductorCurrent = data.values.conductoractual;
  //           this.modalBuscandoConductores.hide();
  //           this.estadoVisualizarConductor();
  //           this.mostrarConductor(data.list[0]);
  //           this.modalServicio();
  //         }

  //         if (!this.asignoConductor) {
  //           this.modalBuscandoConductores.hide();
  //           clearInterval(this.intervalBusqueda)
  //           if (environment.CODCLIENTE == "NXVTAXICORPORATIVO") {
  //             this.alertService.error('', 'Conductores en servicio, te invitamos a comunicarte con la base 983279682 para programarlo');
  //           } else {
  //             this.alertService.error('', environment.SOLICITAR_MULTIPUNTO.MSJ_NO_OBTUVO_CONDUCTOR);
  //           }
  //           this.cancelarServicio()
  //         }
  //         // this.verServicios();
  //       }, (error => {
  //         clearInterval(this.intervalBusqueda)
  //         this.alertService.error('', environment.SOLICITAR_MULTIPUNTO.ERROR.OBTENER_CONDUCTOR);
  //       })
  //     );
  //   }else{
  //     this._httpSolicitarServicio.requestObtenerConductor(datos).subscribe(
  //       (data: ResponseServicio) => {
  //         this.datosRptBusquedaConductor = data;
  //         if (data.values.conductoractual != null && data.values.conductoractual.length > 0) {
  //           this.asignoConductor = true;
  //           this.idConductorCurrent = data.values.conductoractual;
  //           this.modalBuscandoConductores.hide();
  //           this.estadoVisualizarConductor();
  //           this.mostrarConductor(data.list[0]);
  //           this.modalServicio();
  //         }

  //         if (!this.asignoConductor) {
  //           this.modalBuscandoConductores.hide();
  //           clearInterval(this.intervalBusqueda)
  //           if (environment.CODCLIENTE == "NXVTAXICORPORATIVO") {
  //             this.alertService.error('', 'Conductores en servicio, te invitamos a comunicarte con la base 983279682 para programarlo');
  //           } else {
  //             this.alertService.error('', environment.SOLICITAR_MULTIPUNTO.MSJ_NO_OBTUVO_CONDUCTOR);
  //           }
  //           this.cancelarServicio()
  //         }
  //         // this.verServicios();
  //       }, (error => {
  //         clearInterval(this.intervalBusqueda)
  //         this.alertService.error('', environment.SOLICITAR_MULTIPUNTO.ERROR.OBTENER_CONDUCTOR);
  //       })
  //     );
  //   }


  // }

  // estadoVisualizarConductor() {
  //   clearInterval(this.intervalBusqueda);
  //   this.showProgressBuscar = false;
  //   this.estadoCancelarServicio();
  //   this.ref.detectChanges();
  // }

  // mostrarConductor(datos: ConductorAsignado) {
  //   this.conductor = new Conductor();
  //   this.conductor.nombreCompleto = datos.nombreCompleto;
  //   this.conductor.telefonoMovil = datos.telefonoMovil;
  //   this.conductor.placa = datos.placa;
  //   this.conductor.idConductor = datos.idConductor;
  //   this.conductor.idServicio = datos.idServicio;
  // }
  //#endregion
  showTimePiker(anticipada: any) {
    this.labelBtnSolicitarServicio = anticipada == 2 ? this.tittleSolicitar : this.tittleReservar
    this.viaje.immediate = anticipada == 1 ? false : true

    // console.log(this.retorno_reserva_inmediato)
    // if(this.codCliente == 'NXVDIRECTO' || this.codCliente == 'NXVCARGUI'){
    //   if( anticipada==2){
    //     this.solicitar.anticipadoalmomento = true 
    //     this.solicitar.anticipada = false
    //   }else{
    //     this.solicitar.anticipadoalmomento = false 
    //     this.solicitar.anticipada =true
    //   }

    // } else{
    //   this.solicitar.anticipada = (anticipada == 1) ? true : false
    // }
    // this.initReserva(this.solicitar.anticipada)
    // this._datosCompartidos.updateSolicitar(this.solicitar);
  }
  getTypeService(){
  }
  StatusTypeService(idTypeService : any): string{
    return statusTypeService(idTypeService);
  }
  StatusTypePayment(idTypePayment : any): string{
    return statusTypePayment(idTypePayment);
  }
}



