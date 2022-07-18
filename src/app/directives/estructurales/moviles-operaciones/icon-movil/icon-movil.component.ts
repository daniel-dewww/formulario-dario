import { Component, OnInit, forwardRef, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColorHexEstadoConductor, TipoVehiculos } from 'src/app/class/enum/enumEstados';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IconMovilComponent),
  multi: true
};

@Component({
  selector: 'nexus-icon-movil',
  templateUrl: './icon-movil.component.html',
  styleUrls: ['./icon-movil.component.scss']
})
export class IconMovilComponent implements OnInit {

  @Input() placeholderMovil: string = '';
  @Input() colorHex: string = ColorHexEstadoConductor.LIBRE;
  @Input() tipoVehiculo!: TipoVehiculos;
  
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  @Input()  cantidad: number = 0;
  @Output() cantidadChange = new EventEmitter<number>();

  // //#region cantidad
  // //Placeholders for the callbacks which are later providesd
  // //by the Control Value Accessor
  // private onTouchedCallback: () => void = noop;
  // private onChangeCallback: (_: any) => void = noop;

  // //get accessor
  // @Input()
  // get cantidad(): number {
  //   return this.cantMovil;
  // };

  // //set accessor including call the onchange callback
  // set cantidad(v: number) {
  //   if (v !== this.cantMovil) {
  //     this.cantMovil = v;
  //     this.onChangeCallback(v);
  //   }
  // }

  // //Set touched on blur
  // onBlur() {
  //   this.onTouchedCallback();
  // }

  // //From ControlValueAccessor interface
  // writeValue(colapsed: any) {
  //   if (colapsed !== this.cantMovil) {
  //     this.cantMovil = colapsed;
  //   }
  // }

  // //From ControlValueAccessor interface
  // registerOnChange(fn: any) {
  //   this.onChangeCallback = fn;
  // }

  // //From ControlValueAccessor interface
  // registerOnTouched(fn: any) {
  //   this.onTouchedCallback = fn;
  // }

  // //#endregion cantidad
  
  tipoVan: TipoVehiculos = TipoVehiculos.VAN;
  tipoSedan: TipoVehiculos = TipoVehiculos.SEDAN;
  tipoMoto: TipoVehiculos = TipoVehiculos.MOTO;

  constructor(
    private modalService: NgbModal,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  modalMensaje() {
    this.onClick.emit();
  }
}
