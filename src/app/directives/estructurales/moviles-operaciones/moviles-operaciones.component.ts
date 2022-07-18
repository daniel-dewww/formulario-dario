import { Component, OnInit, forwardRef, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EstadosConductor } from 'src/app/class/enum/enumEstados';
import { MovilesxVehiculo, fnInitLstMovilesxVehiculo } from 'src/app/class/class-directive/movilesxvehiculo';
import { Subscription } from 'rxjs';
import { CarritosOpe } from 'src/app/class/operaciones/carritosOpe';
import { fnValidateViewExist } from 'src/app/util/utilValidate';
import { ServiceStructService } from 'src/app/util/serviceService/service-struct.service';
import { StructService, RouteService } from 'src/app/util/serviceService/serviceStruct';
import { ObservablesService } from 'src/app/core/service/observables.service';
import { environment } from 'src/environments/environment';
import { StandarNames } from 'src/app/class/placeHolderAutocomplete';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MovilesOperacionesComponent),
  multi: true
};

@Component({
  selector: 'nexus-moviles-operaciones',
  templateUrl: './moviles-operaciones.component.html',
  styleUrls: ['./moviles-operaciones.component.scss']
})
export class MovilesOperacionesComponent implements OnInit {

  //suscription
  dataSubscriptionLstMoviles!: Subscription;
  lstMovilModal: MovilesxVehiculo[] = fnInitLstMovilesxVehiculo();

  intervalMoviles: any;

  // lstMoviles: CarritosOpe[] = []

  constructor(
    private modalService: NgbModal,
    private _seviceObservable: ObservablesService,
    private serviceComponent: ServiceStructService,
    private ref: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.initContadorMovil();

    this.intervalMoviles = setInterval(() => {
      this.initContadorMovil();
    }, parseInt(environment.CONFIGURATION.TIMER.CONTADOR_VEHICULOS));
  }

  ngAfterViewInit() {
    this.pruebaDemoPush()
  }

  ngOnDestroy() {
    if (this.dataSubscriptionLstMoviles) {
      this.dataSubscriptionLstMoviles.unsubscribe();
    }

    if (this.intervalMoviles) {
      clearInterval(this.intervalMoviles);
    }
  }

  pruebaDemoPush() {
    // setTimeout(() => {
    //   var objDato: CarritosOpe = { "driverId": 1907, "statusDriverId": EstadosConductor.DESCONECTADO, "vehicleId": 12345678, "vehicleTypeId": 2 };
    //   this.validarInsercionDato(objDato);
    // }, 2000);
    // setTimeout(() => {
    //   var objDato: CarritosOpe = { "driverId": 1803, "statusDriverId": EstadosConductor.LIBRE, "vehicleId": 12345678, "vehicleTypeId": 2 };
    //   this.validarInsercionDato(objDato);
    // }, 2000);
    // setTimeout(() => {
    //   var objDato: CarritosOpe = { "driverId": 1905, "statusDriverId": EstadosConductor.SUSPENDIDO, "vehicleId": 12345678, "vehicleTypeId": 2 };
    //   this.validarInsercionDato(objDato);
    // }, 2000);
    // setTimeout(() => {
    //   var objDato: CarritosOpe = { "driverId": 1753, "statusDriverId": EstadosConductor.ENSERVICIO, "vehicleId": 12345678, "vehicleTypeId": 2 };

    //   this.validarInsercionDato(objDato);
    // }, 2000);
    // setTimeout(() => {
    //   var objDato: CarritosOpe = { "driverId": 1753, "statusDriverId": EstadosConductor.ENSERVICIO, "vehicleId": 12345678, "vehicleTypeId": 2 };

    //   this.validarInsercionDato(objDato, true);
    // }, 10000);
  }

  modalMensaje() {
    // this.modalService.open(ModalMovilesEstadoComponent).componentInstance;
  }

  async consumirServicioListMoviles() {

    let responseMoviles = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchPanelOverviewGet);
    // contact: 0
    // free: 5
    // located: 0
    // occupied: 1

    // if (responseMoviles.actives && responseMoviles.inactives) {
    this.lstMovilModal.forEach(estadoModal => {
      switch (estadoModal.estadoConductor) {
        case StandarNames.tittle_Libre:
          estadoModal.cantidad = responseMoviles.free
          break;
        case StandarNames.tittle_EnServicio:
          estadoModal.cantidad = responseMoviles.inService
          break;
        case StandarNames.tittle_Ocupado:
          estadoModal.cantidad = responseMoviles.occupied
          break;
        case StandarNames.tittle_FinJornada: 
          estadoModal.cantidad = responseMoviles.inactives
          break;
        case StandarNames.tittle_Asignado: 
          estadoModal.cantidad = responseMoviles.assigned
          break;
        case StandarNames.tittle_Abordo: 
          estadoModal.cantidad = responseMoviles.contact
          break;

        default:
          estadoModal.cantidad = responseMoviles.actives
          break;
      }
      this.actualizarVista();
    });
    // }

  }

  validarInsercionDato(infoMovil: CarritosOpe, deleteMovil?: boolean) {
    deleteMovil = (deleteMovil) ? deleteMovil : false;

    this.fnCantidadMovilxVehiculo(infoMovil.statusDriverId!, infoMovil.vehicleId!, deleteMovil);

    this.actualizarVista()
  }

  initContadorMovil() {

    // this.lstMovilModal = fnInitLstMovilesxVehiculo();
    this.consumirServicioListMoviles();
    // this.lstMoviles.forEach(movil => {
    //   this.fnCantidadMovilxVehiculo(movil.statusDriverId, movil.vehicleTypeId, true)
    // });
  }

  fnCantidadMovilxVehiculo(statusDriverId: number, vehicleTypeId: number, adicionar: boolean) {
    this.lstMovilModal.forEach(movil => {
      // if (movil.idEstadoConductor == statusDriverId) {
      //   if (movil.idEstadoConductor == statusDriverId) {
      //     if (adicionar) {
      //       movil.cantidad++;
      //     } else {
      //       movil.cantidad--;
      //     }
      //   }

      //   movil.movilesxVehiculo.forEach(vehiculo => {
      //     if (vehiculo.vehicleTypeId == vehicleTypeId) {
      //       if (adicionar) {
      //         vehiculo.cantidad++;
      //       } else {
      //         vehiculo.cantidad--;
      //       }
      //     }
      //   });
      // }
    });
    this._seviceObservable.updateMovilesxVehiculoFront(this.lstMovilModal);
  }

  actualizarVista() {
    if (fnValidateViewExist(this.ref)) {
      this.ref.detectChanges();
    }
  }
}
