import { Component, OnInit, forwardRef, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fnValidateViewExist } from 'src/app/util/utilValidate';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ServiceStructService } from 'src/app/util/serviceService/service-struct.service';
import { StructService, RouteService } from 'src/app/util/serviceService/serviceStruct';
import { CancelReasons, RequestCancelService, RequestCancelServiceReason } from 'src/app/class/request';
import { IdTrip} from 'src/app/class/typesKeyword';
import { ToastService } from 'src/app/core/service/toast.service';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { UtilTranslate } from 'src/app/util/utilTranslate';
import { ModalViajeComponent } from 'src/app/directives/modals/modal-viaje/modal-viaje.component';
import { environment } from 'src/environments/environment';
import { C_OpeBusqueda, C_OpeBusqueda_Form } from 'src/app/class/operaciones/busquedaOpe';
import { ViajeOpe } from 'src/app/class/operaciones/viajeOpe';
import { ObservablesService } from 'src/app/core/service/observables.service';
import * as Cookies from 'src/app/util/cookies/cookies';
import { validatePath } from 'src/app/util/utilPath';
import { Router } from '@angular/router';
import { Masterdowload } from 'src/app/class/masterdowload';
import { CoreObservableService } from 'src/app/core/service/core-observable.service';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ModalShortcutComponent),
  multi: true
};

@Component({
  selector: 'nexus-modal-shortcut',
  templateUrl: './modal-shortcut.component.html',
  styleUrls: ['./modal-shortcut.component.scss']
})
export class ModalShortcutComponent implements OnInit {

  @Input() routeService?: RouteService //= RouteService.distpatchServiceCancelReasonsGet;
  @Input() headerModal: string = '';
  @Input() lbl_Options: string = '';
  @Input() btn_Options: string = '';
  @Input() showButton: boolean = true;
  @Input() typeForm: TypeForm = new TypeForm();

  //Search Inputs
  @Input() rowSelect: boolean = false;
  @Input() typeSearch: boolean = false;
  @Input() statusTrip: boolean = false;
  @Input() dateSearch: boolean = false;

  // NO USADOS HASTA AHORA
  @Input() nroViaje: IdTrip= 0;
  @Input() uuidNroViaje: string = '';
  @Input() withNroViaje: boolean = false;
  @Input() lstOptions: CancelReasons[] = []
  @Output() closeModal = new EventEmitter<string>();   

  commentEnabled:boolean = false;
  showSpinner:boolean = false;

  //formulario
  reasonsOptionsForm: FormGroup;
  submitted: boolean = true;

  //Search Option
  lstViajes: ViajeOpe[] = [];
  indexArrow?: number = undefined;
  path: string = '';

  //#region Traduccion
  translateSubscription: Subscription;

  numberTrip: string = 'El viaje ';
  msjCancel: string = 'Fue ofertado correctamente';

  //#endregion Traduccion
    //#region Subscription Maestro
    coreObservableSubscription: Subscription
    dataMaestra: Masterdowload = new Masterdowload();
  urlBgSigIn: string = 'assets/images/search.jpg'; 
  constructor(
    public activeModal: NgbActiveModal,
    private serviceComponent: ServiceStructService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private _serviceToast: ToastService,
    public translate: TranslateService,
    private modalService: NgbModal,
    private _serviceObservable: ObservablesService,
    private router: Router,
    private _coreObservable: CoreObservableService,
    ) {

      this.reasonsOptionsForm = this.formBuilder.group({
        'idReason': ['', Validators.required],
        'commentReason': [''],
        'typeSearch': [-1],
        'criteriaSearch': ['']
      });

      this.numberTrip = UtilTranslate(['NUMBER_TRIP'],translate.translations[translate.currentLang]);
      this.msjCancel = UtilTranslate(['TOAST_MENSAJES','msj_CancelSuccess'],translate.translations[translate.currentLang]);

      this.translateSubscription = this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
        this.numberTrip = UtilTranslate(['NUMBER_TRIP'],event.translations);
        this.msjCancel = UtilTranslate(['TOAST_MENSAJES','msj_CancelSuccess'],event.translations);
      });
      this.coreObservableSubscription = this._coreObservable.masterdownload$
      .subscribe((dataMaster: Masterdowload) => {
       this.dataMaestra = dataMaster;
      });
  }

  ngOnInit() {
    this.path = window.location.pathname;
  }

  ngOnDestroy() {
  }

  selectOption(data:CancelReasons){
    if(RouteService.distpatchServiceCancelReasonsGet){
      if(data.isCommentEnabled){
        this.commentEnabled = true;
      } else{
        this.reasonsOptionsForm.get("commentReason")?.setValue("");
        this.commentEnabled = false
      }
    }
  }

  jsonRequest(): any{
    let request: any;
    switch (this.routeService) {
      case RouteService.distpatchServicePut:
        let idService: number;
        idService = parseInt(this.reasonsOptionsForm.get('idReason')?.value);
        request = idService;
        break; 
      case RouteService.distpatchServiceCancelPost:
        let cancelJson: RequestCancelService = new RequestCancelService();
        cancelJson.reason = new RequestCancelServiceReason();
        cancelJson.reason.id = parseInt(this.reasonsOptionsForm.get('idReason')?.value);
        cancelJson.reason.observation = (this.commentEnabled)? this.reasonsOptionsForm.get('commentReason')?.value : '';
        cancelJson.serviceUuid = this.uuidNroViaje;
        cancelJson.service_id = this.uuidNroViaje
        cancelJson.client_id =this.dataMaestra.user?.uuid
        request = cancelJson;
        break;
      case RouteService.distpatchSearchGet:
        let searchJson;
        searchJson = {
          typeSearch: parseInt(this.reasonsOptionsForm.get('typeSearch')?.value),
          criteriaSearch: this.reasonsOptionsForm.get('criteriaSearch')?.value
        }
        request = searchJson;
        break;
      default:
        break;
    }
    return request
  }

  async requestService(filtros?: C_OpeBusqueda){
    switch (this.routeService) {  
      case RouteService.distpatchServicePut:
        const modalRef = this.modalService.open(ModalViajeComponent, { size: 'xl', keyboard: false });
        modalRef.componentInstance.idTrip= this.jsonRequest();
        break;
      case RouteService.distpatchServiceCancelPost:
        let response = await this.serviceComponent.requestService(StructService.CODE,  this.routeService,this.jsonRequest());
        if(!response){
          this._serviceToast.showSuccess(this.numberTrip + this.nroViaje+ ' ' + this.msjCancel);
        }
        break;
      case RouteService.distpatchSearchGet:
        console.log('Filtros: ', filtros);
        console.log("Realizar Búsqueda");
        break;
      default:
        break;
    }
    this.closeModal.emit('close')
    this.activeModal.close('Close click')
  }

  busquedaViajes(filtros: C_OpeBusqueda_Form){
    if(validatePath(this.path)) {
      this._serviceObservable.setFiltersSearch(filtros);
    }else {
      Cookies.removeCookie(Cookies.searchCookieName);
      Cookies.setCookie(Cookies.searchCookieName, JSON.stringify(filtros));

      if(environment.CONFIGURATION.SCREEN.NEW_SCREEM){
        window.open('../core/operaciones','','');
        // window.open('../core/operaciones','','',true);
      }else{
        this.router.navigate(['../core/operaciones']);
      }
    }
    this.closeModal.emit('close')
    this.activeModal.close('Close click')
  }

  orderArray() {
    this.lstViajes.sort(function (a, b) {
      if (a.idService! > b.idService!) {
        return 1;
      }
      if (a.idService! < b.idService!) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  onSubmit() {   
    this.submitted = true;
  }

  get f() {
    return this.reasonsOptionsForm.controls;
  }

  actualizarVista() {
    if (fnValidateViewExist(this.ref)) {
      this.ref.detectChanges();
    }
  }
}

export class TypeForm {
  editForm?: boolean;
  searchForm?: boolean;
}