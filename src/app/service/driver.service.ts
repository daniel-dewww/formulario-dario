import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Coordinate, RequestDriverTracking } from '../class/class-directive/serviceGeo';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private _http: HttpClient) { }

  getDriversAvailablePoint(jsonGeo :any) {

    let firstPath = 'dispatch/drivers/available/point?' +
    'latitude=' + jsonGeo.latitude +
    '&longitude=' + jsonGeo.longitude +
    '&service_type_id=' +jsonGeo.service_type_id +
    '&payment_type_id='+ jsonGeo.payment_type_id;

    let lastPath :string ='';

    for(let id of jsonGeo.vehicle_attribute_id){
      lastPath += '&vehicle_attribute_id='+ id
    }
    return this._http.get(environment.SERVICES_URL + firstPath +lastPath
    );
  }

  getDriversAvailableService(jsonService: any) {
    return this._http.get(environment.SERVICES_URL +
      'dispatch/drivers/available/service/' +jsonService.service_id
    );
  }

  getDriversTracking(jsonService: RequestDriverTracking) {
    return this._http.get(environment.SERVICES_URL +
      'dispatch/drivers/tracking/' +jsonService.driver_uuid +
      '?date_start=' + jsonService.date_start +
      '&date_finish=' + jsonService.date_finish
    );
  }
}
