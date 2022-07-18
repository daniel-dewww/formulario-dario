import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RequestMasterdowload, Masterdowload } from '../class/masterdowload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterdownloadService {

  constructor(private _http: HttpClient) { }
    
  getMasterdownloadObservable(searchJson: RequestMasterdowload):Observable<Masterdowload> {
    return this._http.get(environment.SERVICES_URL + 
      '/dispatch/masterdownload' + 
      '?activo=' + searchJson.activo +
      '&user_id=' + searchJson.user_uuid )
  }

  getMasterdownload(searchJson: RequestMasterdowload) {
    if(environment.LOGIN == 'NEXUS_BO'){
      return this._http.get(environment.SERVICES_URL + 
        '/dispatch/masterdownload' +       
        '?activo=' + searchJson.activo +
        '&user_id=' + searchJson.user_uuid )
    } else {
      return this._http.get(environment.SERVICES_URL + 
        'maintenance/companies/' + searchJson.companyId + '/clients/' + searchJson.user_uuid +  
        '/masterdownload?activo=' + searchJson.activo  
        
        )
    }
 
  }

  getMasterdownloadZone(searchJson: any) {
    return this._http.get(environment.SERVICES_URL + 
      '/dispatch/masterdownload/zone')
  }

}
