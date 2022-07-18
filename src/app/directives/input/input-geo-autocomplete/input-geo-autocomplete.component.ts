import { Component, OnInit, forwardRef, Input, EventEmitter, SimpleChanges, OnChanges, Output, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { StructService, RouteService } from 'src/app/util/serviceService/serviceStruct';
import { CoordenadasLatLng, IdClient, IdEmpresa, IdFavorite } from 'src/app/class/typesKeyword';
import { ResponseGeoAutocomplete, Coordinate, RequestGeoAutocomplete, RequestGeoReferenceId } from 'src/app/class/class-directive/serviceGeo';
import { ServiceStructService } from 'src/app/util/serviceService/service-struct.service';
import { Destination } from 'src/app/class/destinations';
import { ToastService } from 'src/app/service/toast.service';
import { environment } from 'src/environments/environment';
import { PlaceHolderAutoComplete } from 'src/app/class/placeHolderAutocomplete'
import { fnValidateViewExist } from 'src/app/util/utilValidate';
import { Favorite, RequestGetFavorite } from 'src/app/class/favorite';
import { GenericObject } from 'src/app/class/genericObject';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputGeoAutocompleteComponent),
  multi: true
};

@Component({
  selector: 'nexus-input-geo-autocomplete',
  templateUrl: './input-geo-autocomplete.component.html',
  styleUrls: ['./input-geo-autocomplete.component.scss']
})
export class InputGeoAutocompleteComponent implements OnInit, OnChanges {

//deshabilitar inputs
  @Input() disablePoint:boolean = true;

  @Input() bindLabel: string[] = ['mainText', 'secondaryText '];
  @Input() bindValue: string[] = ['mainText', 'secondaryText'];

  // busqueda de un valor inicial al cargar la informacion
  @Input() findInit: string = '';
  @Input() latInit?: CoordenadasLatLng;
  @Input() lngInit?: CoordenadasLatLng;


  @Input() placeHolder: string = PlaceHolderAutoComplete.plh_Default;

  // formato de estructura y servicio a consultar
  @Input() structService: any = StructService.ARRAY;
  @Input() routeService: any = RouteService.geoAutocompleteGet;

  // estructura de json con valores adicionales
  @Input() searchJson: RequestGeoAutocomplete = new RequestGeoAutocomplete();

  @Output() onChange: EventEmitter<Destination> = new EventEmitter<Destination>();

  // favoritos
  @Input() favoritos: boolean = false;

  @Input() clientId?: IdClient;
  @Input() companyId?: IdEmpresa;

  @Input() lstFavoritos: ResponseGeoAutocomplete[] = [];
  @Output() onChangeFavoritos: EventEmitter<any> = new EventEmitter<any>();

  //#region selectedValue
  valorSeleccionado: any;
  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  @Input()
  get selectedValue(): ResponseGeoAutocomplete {
    return this.valorSeleccionado;
  };

  //set accessor including call the onchange callback
  set selectedValue(v: ResponseGeoAutocomplete) {
    if (v !== this.valorSeleccionado) {
      this.valorSeleccionado = v;
      this.onChangeCallback(v);

    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(selectedValue: ResponseGeoAutocomplete) {
    if (selectedValue !== this.valorSeleccionado) {
      this.valorSeleccionado = selectedValue;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  //#endregion 

   fnSplitMainSecundaryText(textSplit: any): string {
    let returnText: string = textSplit;
    if(textSplit && textSplit.split(',')){
        
        let mainText = textSplit.split(',')
        returnText = mainText[0];
    }

    return returnText    
}
  eliminarFavorito: boolean = false;
  seleccionoValor: boolean = false;
  jsonEventResponse: ResponseGeoAutocomplete = new ResponseGeoAutocomplete();
  constructor(
    private toastService: ToastService,
    private serviceComponent: ServiceStructService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.findInit && !changes.findInit.previousValue && changes.findInit.currentValue) {
      this.initValueAutocomplete()
    } else if (changes.findInit && this.selectedValue) {
      this.selectedValue.mainText = (changes.findInit) ? changes.findInit.currentValue : undefined;
    }

    if (changes.latInit && !changes.latInit.firstChange && changes.latInit.currentValue) {
      this.initValueAutocomplete()
    } else if (changes.latInit && this.selectedValue) {
      this.selectedValue.mainText = (this.findInit) ? this.findInit : undefined;
    }

    if (changes.lngInit && !changes.lngInit.firstChange && changes.lngInit.currentValue) {
      this.initValueAutocomplete()
    } else if (changes.lngInit && this.selectedValue) {
      this.selectedValue.mainText = (this.findInit) ? this.findInit : undefined;
    }

    if (changes.clientId && !changes.clientId.firstChange) {
      this.actualizarFavoritoSeleccionado()
    }

    if (changes.companyId && !changes.companyId.firstChange) {
      this.actualizarFavoritoSeleccionado()
    }

    if (changes.lstFavoritos && !changes.lstFavoritos.firstChange) {
      this.actualizarFavoritoSeleccionado()
    }
  }
//   async onData($event : ResponseGeoAutocomplete){

// if ($event.containsCoordinate) {
//   var cordinateResponse: Destination = new Destination();
//   cordinateResponse.addressMainText =  this.fnSplitMainSecundaryText($event.mainText);
//   cordinateResponse.addressSecondaryText =  this.fnSplitMainSecundaryText($event.secondaryText);
//   cordinateResponse.latitude = $event.coordinate?.latitude;
//   cordinateResponse.longitude = $event.coordinate?.longitude;
//   cordinateResponse.zoneId = $event.zone?.id;
//   cordinateResponse.zoneDescription = $event.zone?.description;
//   this.onChange.emit(cordinateResponse);
// }
//   }
    async onchange($event: ResponseGeoAutocomplete) {
    // debugger
    if ($event) {
      if ($event.containsCoordinate) {
        var cordinateResponse: Destination = new Destination();
        cordinateResponse.addressMainText =  this.fnSplitMainSecundaryText($event.mainText);
        cordinateResponse.addressSecondaryText =  this.fnSplitMainSecundaryText($event.secondaryText);
        cordinateResponse.latitude = $event.coordinate?.latitude;
        cordinateResponse.longitude = $event.coordinate?.longitude;
        cordinateResponse.zoneId = $event.zone?.id;
        cordinateResponse.zoneDescription = $event.zone?.description;
        this.favoritosEliminarAgregar($event);

        this.onChange.emit(cordinateResponse);
      } else {
        var search: RequestGeoReferenceId = {
          referenceId: $event.referenceId,
          provider: $event.provider
        }

        await this.serviceReferenceId(search, $event);

        this.favoritosEliminarAgregar(this.jsonEventResponse);
      }

    } else {

      this.favoritosEliminarAgregar();

      this.onChange.emit(new Destination());
    }
  }

  async serviceReferenceId(search: RequestGeoReferenceId, responseGeo: ResponseGeoAutocomplete) {
    var valorAutocomplete: ResponseGeoAutocomplete = await this.serviceComponent.requestService(StructService.CODE, RouteService.geoCodingReferenceIdGet, search)

    var cordinateResponse: Destination = new Destination();
    cordinateResponse.addressMainText = this.fnSplitMainSecundaryText(responseGeo.mainText);
    cordinateResponse.addressSecondaryText = this.fnSplitMainSecundaryText(responseGeo.secondaryText);

    if (valorAutocomplete && valorAutocomplete.containsCoordinate) {
      cordinateResponse.latitude = valorAutocomplete.coordinate?.latitude;
      cordinateResponse.longitude = valorAutocomplete.coordinate?.longitude;
      cordinateResponse.zoneId = valorAutocomplete.zone?.id;
      cordinateResponse.zoneDescription = valorAutocomplete.zone?.description;

      this.jsonEventResponse = responseGeo;
      this.jsonEventResponse.containsCoordinate = true;
      this.jsonEventResponse.coordinate = (this.jsonEventResponse.coordinate) ? this.jsonEventResponse.coordinate : new Coordinate();
      this.jsonEventResponse.coordinate.latitude = valorAutocomplete.coordinate?.latitude! + 0;
      this.jsonEventResponse.coordinate.longitude = valorAutocomplete.coordinate?.longitude! + 0;
      this.jsonEventResponse.zone = (this.jsonEventResponse.zone) ? this.jsonEventResponse.zone : new GenericObject();
      this.jsonEventResponse.zone.id = valorAutocomplete.zone?.id! + 0;
      this.jsonEventResponse.zone.description = valorAutocomplete.zone?.description + '';

    } else {
      // this.toastService.showInfo(environment.MSJE_CLIENTE.ERRROR.OCURRIO_UN_PROBLEMA)
      cordinateResponse.latitude = undefined;
      cordinateResponse.longitude = undefined;
      cordinateResponse.zoneId = undefined;
      cordinateResponse.zoneDescription = undefined;
      this.jsonEventResponse = new ResponseGeoAutocomplete();
    }
    this.onChange.emit(cordinateResponse);
  }

  initValueAutocomplete() {
    this.selectedValue = (this.selectedValue) ? this.selectedValue : new ResponseGeoAutocomplete()
    let valueSelect = new ResponseGeoAutocomplete()
    valueSelect.coordinate = (this.selectedValue.coordinate) ? this.selectedValue.coordinate : new Coordinate()
    valueSelect.mainText = this.findInit;
    valueSelect.secondaryText = '';
    valueSelect.coordinate.latitude = this.latInit;
    valueSelect.coordinate.longitude = this.lngInit;
    this.selectedValue = valueSelect;
    this.actualizarVista()
    // this.ref.detectChanges();
  }

  actualizarVista() {
    if (fnValidateViewExist(this.ref)) {
      this.ref.detectChanges();
    }
  }

  favoritosEliminarAgregar(response?: ResponseGeoAutocomplete) {
    if (response) {
      let findFavorito = this.lstFavoritos.find(favorito => favorito.mainText == response.mainText
        && favorito.secondaryText == response.secondaryText && response.favoritoJson
        && favorito.favoritoJson?.id == response.favoritoJson.id)
      if (findFavorito) {
        this.eliminarFavorito = true;
      } else {
        this.eliminarFavorito = false;
      }
      this.seleccionoValor = (this.clientId && this.clientId > 0 && this.companyId && this.companyId > 0 && response && response.mainText) ? true : false;
    } else {
      this.seleccionoValor = false;
    }
    this.jsonEventResponse = response!;
    this.actualizarVista();
    if (!this.clientId && this.clientId! <= 0 && !this.companyId && this.companyId! <= 0) {
      this.initValueAutocomplete()
      this.findInit = '';
    }
  }

  async serviceEliminarAgregarFavorito(eliminar: boolean) {
    if (eliminar) {
      var responseFavorite: any = await this.serviceComponent.requestService(StructService.CODE, RouteService.maintenanceClientFavoritesDelete, this.jsonEventResponse.favoritoJson?.id)
      if (!responseFavorite) {
        this.toastService.showSuccess(environment.MSJE_CLIENTE.GEO_AUTOCOMPLETE.MENSAJE.ELIMINO_FAVORITO);
        this.favoritosEliminarAgregar(this.jsonEventResponse)
        this.onChangeFavoritos.emit();
      }
    } else {
      let favorito: Favorite = new Favorite();
      favorito.alias = this.jsonEventResponse.mainText + ' ' + this.jsonEventResponse.secondaryText;
      favorito.clientId = this.clientId!;
      favorito.companyClientId = this.companyId!;
      favorito.latitude = this.jsonEventResponse.coordinate?.latitude!;
      favorito.longitude = this.jsonEventResponse.coordinate?.longitude!;
      favorito.mainText = this.jsonEventResponse.mainText!;
      favorito.secondaryText = this.jsonEventResponse.secondaryText!;

      var responseFavorite: any = await this.serviceComponent.requestService(StructService.CODE, RouteService.maintenanceClientFavoritesPost, favorito)
      if (responseFavorite && !responseFavorite.statusCode) {
        this.toastService.showSuccess(environment.MSJE_CLIENTE.GEO_AUTOCOMPLETE.MENSAJE.AGREGO_FAVORITO);
        this.favoritosEliminarAgregar(this.jsonEventResponse);
        this.onChangeFavoritos.emit();
      }
    }
  }

  actualizarFavoritoSeleccionado() {

    // let findFavorito = this.lstFavoritos.find(favorito => favorito.mainText == this.jsonEventResponse.mainText
    //   && favorito.secondaryText == this.jsonEventResponse.secondaryText && this.jsonEventResponse.favoritoJson
    //   && favorito.favoritoJson.id == this.jsonEventResponse.favoritoJson.id)

    // if (!this.clientId || this.clientId <= 0 || !this.companyId || this.companyId <= 0 ||
    //   (!findFavorito && this.jsonEventResponse && this.jsonEventResponse.favoritoJson && this.jsonEventResponse.favoritoJson.id > 0)) {
    //   var cordinateResponse: Destination = new Destination();
    //   cordinateResponse.addressMainText = '';
    //   cordinateResponse.addressSecondaryText = '';
    //   cordinateResponse.latitude = null;
    //   cordinateResponse.longitude = null;

    //   this.onChange.emit(cordinateResponse);

    //   this.jsonEventResponse = new ResponseGeoAutocomplete();
    //   this.selectedValue = undefined;
    //   // console.log('Inicializar caja de valores')
    // }

    // this.favoritosEliminarAgregar(this.jsonEventResponse);
  }


}
