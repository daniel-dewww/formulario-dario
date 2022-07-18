import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Masterdowload } from 'src/app/class/masterdowload';
import { GetStatusTravelGroup } from 'src/app/class/statusType';
import { CoreObservableService } from 'src/app/core/service/core-observable.service';
import { fnColorBasedBrightnessBlackOrWhite } from 'src/app/util/utilStyles';
import { RequestTrip } from '../utils/modal-trip-request.class';
import { ModalTrip } from '../utils/modal-trip.class';
import { initModalTrip } from '../utils/modal-trip.util';

@Component({
  selector: 'nexus-mt-header',
  templateUrl: './mt-header.component.html',
  styleUrls: ['./mt-header.component.scss']
})
export class MtHeaderComponent implements OnInit {

  //suscription
  coreObservableSuscription: Subscription;
  dataMaestra: Masterdowload = new Masterdowload();
  
  @Input() trip:ModalTrip =  initModalTrip(new RequestTrip());
  @Input() mt_header_showClose:boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private _coreObservable: CoreObservableService,
    ) { 
    this.coreObservableSuscription = this._coreObservable.masterdownload$
      .subscribe((dataMaster: Masterdowload) => {
        this.dataMaestra = dataMaster;
      });
    }

  ngOnInit(): void {
    console.log(this.dataMaestra.statusTypeService)
  }

  colorBasedBrightness(): string {
    return fnColorBasedBrightnessBlackOrWhite(this.searchColorStatusType());
  }

  searchColorStatusType(): string{
    let returnValue = '#FFFFFF'
    this.dataMaestra.statusTypeService!.forEach(statusType => {
      if(statusType.id == this.trip.id && statusType.colorHex){
        // returnValue = (GetStatusTravelGroup(statusType.id!) ? GetStatusTravelGroup(statusType.id!) : '#FFFFFF')
      }
    });
    return returnValue; 
  }

}
