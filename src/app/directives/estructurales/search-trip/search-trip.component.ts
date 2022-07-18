import { Component, OnInit, forwardRef, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { C_OpeBusqueda, C_OpeBusqueda_Form } from 'src/app/class/operaciones/busquedaOpe';
import { Subscription } from 'rxjs';
import { Masterdowload } from 'src/app/class/masterdowload';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { CoreObservableService } from 'src/app/core/service/core-observable.service';
import { ResponseComponentInterface } from 'src/app/interfaces/responseComponent';
import { fnUnionDate_TimeString, fnServiceDateSendString } from 'src/app/util/utilDate';
import { fnValidateViewExist } from 'src/app/util/utilValidate';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchTripComponent),
  multi: true
};

@Component({
  selector: 'nexus-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.scss']
})
export class SearchTripComponent implements OnInit, AfterViewInit, ResponseComponentInterface, OnDestroy {

  //#region  colapsed
  collapsedAcordeon: boolean = false;
  //Placeholders for the callbacks which are later provides
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  @Input()
  get colapsed(): boolean {
    return this.collapsedAcordeon;
  };

  //Set accessor including call the onChange callback
  set colapsed(v: boolean) {
    if (v !== this.collapsedAcordeon) {
      this.collapsedAcordeon = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface writeValue
  writeValue(colapsed: any) {
    if (colapsed !== this.collapsedAcordeon) {
      this.collapsedAcordeon = colapsed;
    }
  }

  //From ControlValueAccessor interface registerOnChange
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface registerOnTouch
  registerOnTouch(fn: any) {
    this.onTouchedCallback = fn;
  }

  //#endregion colapsed

  busquedaViajeForm: FormGroup;
  idioma: any = 'es';

  @Input() rowSelect: boolean = true;
  @Input() typeSearch: boolean = true;
  @Input() statusTrip: boolean = true;
  @Input() dateSearch: boolean = true;

  @Output() btnBuscar: EventEmitter<C_OpeBusqueda_Form> = new EventEmitter();

  //Suscription
  coreObservableSuscription: Subscription;
  dataMaestra: Masterdowload = new Masterdowload();
  translateDatePicker: Subscription;
  
  submitted: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef,
    private localeService: BsLocaleService,
    private _coreObservable: CoreObservableService,
    public translate: TranslateService,
    public activeModal: NgbActiveModal
  ) { 
    this.busquedaViajeForm = this.formBuilder.group({
      'tipoBusqueda': [-1],
      'busqueda': [''],
      'estadoViaje': [-1],
      'fechaInicio': [new Date(), Validators.required],
      'fechaFin': [new Date(), Validators.required],
      'horaInicio': ['00:00', Validators.required],
      'horaFin': ['23:59:59', Validators.required],
    });

    this.translateDatePicker = this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.idioma = event.lang;
      this.localeService.use(this.idioma);
    });

    this.coreObservableSuscription = this._coreObservable.masterdownload$.subscribe((dataMaster: Masterdowload) => {
      this.dataMaestra = dataMaster;
    });

   }

  ngOnInit(): void {
    this.localeService.use(this.idioma);
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.translateDatePicker.unsubscribe();
    this.coreObservableSuscription.unsubscribe();
  }

  onSubmit() {   
    this.submitted = true;
  }

  opendAcordeonBusqueda() {
    console.log('OpenAcordeon')
  }

  btnBuscarFiltros() {
    this.emitFiltrosBusqueda(false);
    this.collapsedAcordeon = false;
    this.actualizarVista();
  }

  emitFiltrosBusqueda(busquedaAutomatica: boolean) {
    var responseBuscar: C_OpeBusqueda_Form = new C_OpeBusqueda_Form();
    responseBuscar.search_type = this.busquedaViajeForm.get('tipoBusqueda')?.value;
    responseBuscar.key_word = this.busquedaViajeForm.get('busqueda')?.value;
    responseBuscar.status_type_id = this.busquedaViajeForm.get('estadoViaje')?.value;
    responseBuscar.date_start = this.busquedaViajeForm.get('fechaInicio')?.value;
    responseBuscar.time_start = this.busquedaViajeForm.get('horaInicio')?.value;
    responseBuscar.finish_date = this.busquedaViajeForm.get('fechaFin')?.value;
    responseBuscar.finish_time = this.busquedaViajeForm.get('horaFin')?.value;
    this.btnBuscar.emit(responseBuscar);
  }

  actualizarVista(){
    if(fnValidateViewExist(this.ref)){
      this.ref.detectChanges();
    }
  }

}
