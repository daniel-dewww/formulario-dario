import { Component, OnInit, forwardRef, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fnValidateViewExist } from 'src/app/util/utilValidate';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ServiceStructService } from 'src/app/util/serviceService/service-struct.service';
import { StructService, RouteService } from 'src/app/util/serviceService/serviceStruct';
import { CancelReasons, RequestCancelService, RequestCancelServiceReason } from 'src/app/class/request';
import { IdClient, IdTrip} from 'src/app/class/typesKeyword';
import { ToastService } from 'src/app/service/toast.service';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { UtilTranslate } from 'src/app/util/utilTranslate';
import { environment } from 'src/environments/environment';
import { CoreObservableService } from 'src/app/core/service/core-observable.service';
import { Masterdowload } from 'src/app/class/masterdowload';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ModalCancelReasonsComponent),
  multi: true
};

@Component({
  selector: 'nexus-modal-cancel-reasons',
  templateUrl: './modal-cancel-reasons.component.html',
  styleUrls: ['./modal-cancel-reasons.component.scss']
})
export class ModalCancelReasonsComponent implements OnInit {


  @Input() IdTrip: IdTrip= 0;
  @Input() uuidIdTrip: string = '';
  @Input() withIdTrip: boolean = false;
  @Input() routeService?: RouteService //= RouteService.distpatchServiceCancelReasonsGet;
  @Input() headerModal: string = '';
  @Input() btn_Options: string = '';
  @Input() lstOptions: CancelReasons[] = []
  @Output() closeModal = new EventEmitter<string>();
  @Output() idViajeCancel: EventEmitter<number> = new EventEmitter();
  @Output() response: EventEmitter<number> = new EventEmitter();
  @Input() client_id: IdClient = 0;
  @Input() ud_flagDisabledIVR: boolean = false;

  commentEnabled: boolean = false;
  showSpinner: boolean = false;

  //formulario
  reasonsOptionsForm: FormGroup;
  submitted: boolean = true;

  //#region Traduccion
  translateSuscription: Subscription;

  numberTrip: string = 'El viaje ';
  msjCancel: string = 'Fue cancelado correctamente';
  msjRetirarMovil: string = '';

  //#endregion Traduccion
    //#region Subscription Maestro
    coreObservableSubscription: Subscription
    dataMaestra: Masterdowload = new Masterdowload();
  constructor(
    public activeModal: NgbActiveModal,
    private serviceComponent: ServiceStructService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private _serviceToast: ToastService,
    public translate: TranslateService,
    private _coreObservable: CoreObservableService
    ) {

    this.reasonsOptionsForm = this.formBuilder.group({
      'idReason': ['', Validators.required],
      'commentReason': [''],
    });

    this.numberTrip = UtilTranslate(['NUMBER_TRIP'], translate.translations[translate.currentLang]);
    this.msjCancel = UtilTranslate(['TOAST_MENSAJES', 'msj_CancelSuccess'], translate.translations[translate.currentLang]);
    this.msjRetirarMovil = UtilTranslate(['TOAST_MENSAJES', 'msj_UnAssingSuccess'], translate.translations[translate.currentLang]);

    this.translateSuscription = this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.numberTrip = UtilTranslate(['NUMBER_TRIP'], event.translations);
      this.msjCancel = UtilTranslate(['TOAST_MENSAJES', 'msj_CancelSuccess'], event.translations);
      this.msjRetirarMovil = UtilTranslate(['TOAST_MENSAJES', 'msj_UnAssingSuccess'], translate.translations[translate.currentLang]);
    });
    this.coreObservableSubscription = this._coreObservable.masterdownload$
    .subscribe((dataMaster: Masterdowload) => {
     this.dataMaestra = dataMaster;
    });
  }

  ngOnInit() {
    console.log(this.msjCancel);
  }

  ngOnDestroy() {
  }

  selectOption(data: CancelReasons) {
    if (RouteService.distpatchServiceCancelReasonsGet) {
      if (data.isCommentEnabled) {
        this.commentEnabled = true;
      } else {
        this.reasonsOptionsForm.get("commentReason")?.setValue("");
        this.commentEnabled = false
      }
    }
  }

  jsonRequest(): any {
    let request: any;
    switch (this.routeService) {
      case RouteService.distpatchServiceCancelPost:
      case RouteService.distpatchServiceUnassignPost:
          let searchJson: RequestCancelService = new RequestCancelService();
          searchJson.reason = new RequestCancelServiceReason();
          searchJson.reason.id = parseInt(this.reasonsOptionsForm.get('idReason')?.value);
          searchJson.reason.observation = (this.commentEnabled) ? this.reasonsOptionsForm.get('commentReason')?.value : '';
          searchJson.serviceUuid = this.uuidIdTrip;
          searchJson.service_id = this.uuidIdTrip
          searchJson.client_id =this.dataMaestra.user?.uuid
          request = searchJson;
        break;
      case RouteService.dispatchServiceBlockClientPut:
        let ud_jsonRequest = {
          id: this.client_id,
          blockedIvr: this.ud_flagDisabledIVR,
          cellPhone: '',
          reason: {
            id: parseInt(this.reasonsOptionsForm.get('idReason')?.value),
            observation: (this.commentEnabled) ? this.reasonsOptionsForm.get('commentReason')?.value : ''
          }
        };
        request = ud_jsonRequest;
        break;
      default:
        break;
    }
    return request
  }

  async requestService() {
    let response = await this.serviceComponent.requestService(StructService.CODE, this.routeService!, this.jsonRequest());
    switch (this.routeService) {
      case RouteService.distpatchServiceCancelPost:
        if (!response) {
          this._serviceToast.showSuccess(this.numberTrip + this.IdTrip+ ' ' + this.msjCancel);
          this.idViajeCancel.emit(this.IdTrip)
          this.closeModal.emit('close')
          this.activeModal.close('Close click')
        }
        break;
      case RouteService.distpatchServiceUnassignPost:
        if (!response) {
          this.response.emit(response)
          this._serviceToast.showSuccess(this.numberTrip+ ' '  + this.IdTrip+ ' ' + this.msjRetirarMovil);
          this.closeModal.emit('close')
          this.activeModal.close('Close click')
        }
        break;
      case RouteService.dispatchServiceBlockClientPut:
        if(!response){
          this._serviceToast.showSuccess(environment.MSJE_CLIENTE.CLIENT.CLIENT_BLOCKED);
          this.closeModal.emit('close')
          this.activeModal.close('Close click')
        }
        break;
      default:
        break;
    }
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
