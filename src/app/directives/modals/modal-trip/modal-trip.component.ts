import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostOperatorOperatorIdAlertCallNotify } from 'src/app/class/class-directive/push';
import { IdTrip } from 'src/app/class/typesKeyword';
import { ServiceStructService } from 'src/app/util/serviceService/service-struct.service';
import { RouteService, StructService } from 'src/app/util/serviceService/serviceStruct';
import { RequestTrip } from './utils/modal-trip-request.class';
import { ModalTrip } from './utils/modal-trip.class';
import * as UtilTrip from './utils/modal-trip.util';
import { ModalTripVariable } from './utils/modal-trip.variable';

@Component({
  selector: 'nexus-modal-trip',
  templateUrl: './modal-trip.component.html',
  styleUrls: ['./modal-trip.component.scss']
})
export class ModalTripComponent implements OnInit {

  //#region variables
  @Input() idTrip: IdTrip= 0;
  @Input() dataIvr: PostOperatorOperatorIdAlertCallNotify = new PostOperatorOperatorIdAlertCallNotify();
  @Input() flagDuplicateData?: boolean;
  
  trip:ModalTrip = UtilTrip.initModalTrip(new RequestTrip());
  modalTripContans: ModalTripVariable = new  ModalTripVariable();
  constructor(
    public activeModal: NgbActiveModal,
    private ref: ChangeDetectorRef,
    private serviceComponent: ServiceStructService,
    ) { }

  async ngOnInit() {
    if (this.idTrip) {
      await this.serviceBusquedaViaje(this.idTrip)
    } 
  }

  async serviceBusquedaViaje(nroViaje: number) {
    let trip = await this.serviceComponent.requestService(StructService.CODE, RouteService.distpatchServiceGet, nroViaje) as RequestTrip;

    if (trip && trip.uuid) {
      this.trip = UtilTrip.initModalTrip(trip)
    } else {
      this.activeModal.close('Close click');
    }
  }

  
}
