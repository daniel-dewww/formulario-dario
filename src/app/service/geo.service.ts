import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestGeoAutocomplete, RequestGeoReferenceId } from '../class/class-directive/serviceGeo';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor(private _http: HttpClient) { }

  getGeoAutocomplete(jsonGeo: RequestGeoAutocomplete) {
    return this._http.get(environment.SERVICES_URL +
      'geo/autocomplete?' +
      'query=' + jsonGeo.key_word +
      '&latitude=' + jsonGeo.latitude +
      '&longitude=' + jsonGeo.longitude 
    );
  }

  getGeoCodingReferenceId(jsonGeo: RequestGeoReferenceId) {
    return this._http.get(environment.SERVICES_URL +
      'geo/coding/referenceid?' +
      'provider=' + jsonGeo.provider +
      '&referenceId=' + jsonGeo.referenceId
    );
  }

  getGeoCodingCoordinate(jsonGeo: RequestGeoAutocomplete) {
    return this._http.get(environment.SERVICES_URL +
      'geo/coding/coordinate?' +
      'latitude=' + jsonGeo.latitude+
      '&longitude=' + jsonGeo.longitude
    );
  }
}
