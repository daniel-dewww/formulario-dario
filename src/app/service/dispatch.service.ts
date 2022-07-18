import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { C_OpeBusqueda, C_SearchTravel } from '../class/operaciones/busquedaOpe';
import { Viaje } from '../class/viajes';
import { C_OpeBusquedaPanel } from '../class/operaciones/movilOpe';
import { RequestDistpatchCenterCost } from '../class/centerCost';
import { Request_Offer } from '../class/operaciones/offer';
import { RequestOffer, RequestCancelService } from '../class/request';

@Injectable({
  providedIn: 'root'
})
export class DispatchService {

  constructor(private _http: HttpClient) { }

  getDistpatchService(nroViaje: number) {
    return this._http.get(environment.SERVICES_URL + 'dispatch/service' + '?service_id=' + nroViaje)
  }

  postDistpatchService(viaje: Viaje) {
    if(environment.LOGIN == "NEXUS_BO"){
      return this._http.post(environment.SERVICES_URL + 'dispatch/service', viaje)
    }else{
      return this._http.post(environment.SERVICES_URL_CLIENT + 'booking', viaje)

    }
  }

  putDistpatchService(viaje: Viaje) {
    return this._http.put(environment.SERVICES_URL + 'dispatch/service', viaje)
  }

  getDistpatchMonitor(requestSearh: C_OpeBusqueda) {
    let statusType: string = '';
    if(requestSearh.lstStatus_type_id && requestSearh.lstStatus_type_id.length >= 1) {
      for(let i = 0; i <= requestSearh.lstStatus_type_id.length -1; i++){
        statusType = statusType + '&status_type_id=' + requestSearh.lstStatus_type_id[i];
      }
    }
    let paymentType: string = '';
    if(requestSearh.lstPaymentType && requestSearh.lstPaymentType.length >= 1) {
      for(let i = 0; i <= requestSearh.lstPaymentType.length -1; i++){
        statusType = statusType + '&payment_type_id=' + requestSearh.lstPaymentType[i];
      }
    }

    let atributeCompany: string = '';
    if(requestSearh.lstAttributesCompany && requestSearh.lstAttributesCompany.length >= 1) {
      for(let i = 0; i <= requestSearh.lstAttributesCompany.length -1; i++){
        statusType = statusType + '&company_attribute_id=' + requestSearh.lstAttributesCompany[i];
      }
    }

    let atributeService: string = '';
    if(requestSearh.lstAttributesService && requestSearh.lstAttributesService.length >= 1) {
      for(let i = 0; i <= requestSearh.lstAttributesService.length -1; i++){
        statusType = statusType + '&service_attribute_id=' + requestSearh.lstAttributesService[i];
      }
    }

    let atributeVehicle: string = '';
    if(requestSearh.lstAttributesVehicle && requestSearh.lstAttributesVehicle.length >= 1) {
      for(let i = 0; i <= requestSearh.lstAttributesVehicle.length -1; i++){
        statusType = statusType + '&vehicle_attribute_id=' + requestSearh.lstAttributesVehicle[i];
      }
    }

    let dateParameter: string = '';
    if(!requestSearh.nofilterByDate){
      dateParameter =  '&date_start=' + requestSearh.date_start +
      '&date_finish=' + requestSearh.date_finish
    }
    if(environment.LOGIN == 'NEXUS_BO'){
      return this._http.get(environment.SERVICES_URL +
        'dispatch/monitor' +
        '?key_word=' + requestSearh.key_word?.trim() +
        (( requestSearh.search_type == '-1') ? '' :  ('&search_type=' + requestSearh.search_type)) +
        statusType + paymentType + atributeCompany + atributeService + atributeVehicle + dateParameter
       );
    }else{
      return this._http.get(environment.SERVICES_URL_CLIENT +
        'history/assigned' +
        '?client_id=' + requestSearh
       );
    }
    
  }

  getDistpatchMonitorBo(requestSearh: C_OpeBusqueda) {
    return this._http.get(environment.SERVICES_URL_CLIENT +
      'history/completed' +
      '?client_id=' + requestSearh.client_id +
      '&page=' + requestSearh.page +
      '&page_size=' + requestSearh.page_size
     );
  }

  getDistpatchSearch(request: C_SearchTravel) {
    let statusType: string = '';
    if(request.status_type_id && request.status_type_id.length >= 1) {
      for(let i = 0; i <= request.status_type_id.length -1; i++){
        statusType = statusType + '&status_type_id=' + request.status_type_id[i];
      }
    }
    return this._http.get(environment.SERVICES_URL +
      'dispatch/search?' +
      ((request.search_type) ? ('search_type=' + request.search_type) : '') +
      '&page=' + request.page + '&page_size=' + request.page_size +
      ((request.key_word) ? ('&key_word=' + request.key_word) : '') +
      ((request.client_id) ? ('&client_id=' + request.client_id) : '') +
      ((request.company_id) ? ('&company_id=' + request.company_id) : '') +
      ((request.driver_id) ? ('&driver_id=' + request.driver_id) : '') +
      ((request.vehicle_id) ? ('&vehicle_id=' + request.vehicle_id) : '') +
      ((request.date_start) ? ('&date_start=' + request.date_start) : '') +
      ((request.date_finish) ? ('&date_finish=' + request.date_finish) : '' ) +
      statusType
      )
  }

  getDistpatchPanelStateDriver(requestSearh: C_OpeBusquedaPanel) {
    requestSearh.turn_id = ( requestSearh.turn_id) ?  requestSearh.turn_id : '-1'
    requestSearh.statustype_id = ( requestSearh.statustype_id) ?  requestSearh.statustype_id : '-1'
    requestSearh.keyword = ( requestSearh.keyword) ?  requestSearh.keyword : ''
    return this._http.get(environment.SERVICES_URL +
      'dispatch/panel/state/driver' +
      '?turn_id=' + requestSearh.turn_id +
      '&status_driver_id=' + requestSearh.statustype_id +
      '&keyword=' + requestSearh.keyword )
  }
  
  getDistpatchClientSearch(searchJson : any) {
    return this._http.get(environment.SERVICES_URL + 
      'dispatch/clients' + 
      '?key_word=' + searchJson.key_word +
      '&company_id=' + searchJson.company_id)
  }

  getDistpatchCentercost(searchJson: RequestDistpatchCenterCost) {
    return this._http.get(environment.SERVICES_URL + 
      '/dispatch/centercost' + 
      '?client_id=' + searchJson.client_id +
      '&company_id=' + searchJson.company_id )
  }

  getDistpatchOffer(searchJson: Request_Offer) {
    if(environment.LOGIN == 'NEXUS_BO'){
      return this._http.get(environment.SERVICES_URL + 
        '/dispatch/offer' + 
        '?clientId=' + searchJson.clientId +
        '&companyId=' + searchJson.companyId +
        ((searchJson.paymentTypeId && searchJson.paymentTypeId != -1) ? ('&paymentTypeId=' + searchJson.paymentTypeId) : '' ) +
        '&origin=' + searchJson.origin +
        ((searchJson.destinations) ? ('&destinations=' + searchJson.destinations) : '' ))
    }else{
      return this._http.get(environment.SERVICES_URL_CLIENT + 
        '/offer' + 
        '?client_id=' + searchJson.clientId +
        '&company_id=' + searchJson.companyId +
        ((searchJson.paymentTypeId && searchJson.paymentTypeId != -1) ? ('&paymentTypeId=' + searchJson.paymentTypeId) : '' ) +
        '&origin=' + searchJson.origin +
        ((searchJson.destinations) ? ('&destinations=' + searchJson.destinations) : '' ))
    }

  }

  getDistpatchPanelMonitor(searchJson : any) {
    return this._http.get(environment.SERVICES_URL + 
      '/dispatch/panel/monitor')
  }

  getDistpatchPanelOverview(searchJson : any) {
    return this._http.get(environment.SERVICES_URL + 
      '/dispatch/panel/overview')
  }

  postDistpatchServiceOffer(searchJson: RequestOffer) {
    return this._http.post(environment.SERVICES_URL + 
      '/dispatch/services/offer', searchJson)
  }

  postDistpatchServiceCancel(searchJson: RequestCancelService) {
    if(environment.LOGIN == "NEXUS_BO"){
      return this._http.post(environment.SERVICES_URL + 
        '/dispatch/services/cancel', searchJson)
    }else{
      return this._http.post(environment.SERVICES_URL_CLIENT + 
        'booking/' + searchJson.service_id +'/cancel', searchJson)
    }
  
  }

  getDistpatchServiceCancelReasons(searchJson: any) {
    return this._http.get(environment.SERVICES_URL + 
      '/dispatch/services/cancel/reasons' +
      '?service_id=' + searchJson.service_id )
  }
  getDistpatchServiceClientCancelReasons(searchJson: any) {
    return this._http.get(environment.SERVICES_URL_CLIENT + 
      '/ongoing/' + searchJson + '/cancel/reasons'  )
  }
  getCorporativoServiceXId(searchJson: any) {
    return this._http.get(environment.SERVICES_URL_CLIENT + 
      'ongoing/' + searchJson.service_id + '?client_id=' + searchJson.client_id )
  }

  postDistpatchServiceUnassign(searchJson: RequestCancelService) {
    console.log(searchJson)
    return this._http.post(environment.SERVICES_URL + 
      '/dispatch/services/unassign', searchJson)
  }

  getDistpatchServiceUnassignReasons(searchJson: any) {
    return this._http.get(environment.SERVICES_URL + 
      '/dispatch/services/unassign/reasons' +
      '?service_id=' + searchJson.service_id )
  }

  getDistpatchServiceTracking(searchJson : any){
    return this._http.get(environment.SERVICES_URL + 
      '/dispatch/services/tracking' +
      '?service_uuid=' + searchJson )
  }

  
  postDistpatchServicesAssign(searchJson : any){
    return this._http.post(environment.SERVICES_URL + 
      '/dispatch/services/assign', searchJson )
  }  

  getDistpatchClientTripSumary(client_id : any){
    return this._http.get(environment.SERVICES_URL + 
      'dispatch/clients/' + client_id + '/trips/summary')
  }

  getDistpatchClientTripDestination(client_id : any){
    return this._http.get(environment.SERVICES_URL + 
      'dispatch/clients/' + client_id + '/trips/destinations')
  }

  postCompanyVerify(json : any){
    console.log('json:  ', json)
    return this._http.post(environment.SERVICES_URL + 
      'dispatch/companies/'+ json.company_id + '/'+ json.client_id + '/verify', json.code)
  }

  getListCompany(){
    return this._http.get(environment.SERVICES_URL + 
      'dispatch/companies')
  }

  postValidateBalance(json : any){
    return this._http.post('https://apocalipsis.nexusvirtual.net/integration/api/v1/' + 
      'tarifa/validate', json)
  }

  postAddClient(json : any){
    return this._http.post(environment.SERVICES_URL + 
      'dispatch/clients', json)
  }

  putEditClient(json : any){
    return this._http.put(environment.SERVICES_URL + 
      'dispatch/clients', json)
  }

  putBlockClient(json : any){
    return this._http.put(environment.SERVICES_URL + 
      'dispatch/clients/' + json.id + '/blocked', json)
  }

  putUnlockClient(client_id : any){
    return this._http.put(environment.SERVICES_URL + 
      'dispatch/clients/' + client_id + '/unlock','')
  }

  postRetainedService(IdTrip: any){
    return this._http.post(environment.SERVICES_URL + 
      '/dispatch/service/' + IdTrip+ '/retained', '')
  }

  deleteRetainedService(IdTrip: any){
    return this._http.delete(environment.SERVICES_URL + 
      'dispatch/service/' + IdTrip+ '/retained')
  }

  getActivitiesService(json : any){
    return this._http.get(environment.SERVICES_URL + 'dispatch/service/' + json.service_id + '/activities' 
      + '?page=' + json.page 
      + '&page_size=' + json.page_size 
      + '&date_start=' + json.date_start 
      + '&date_finish=' + json.date_finish)
  }

  getDynamicFields(company_uuid: string) {
    return this._http.get(environment.SERVICES_URL + 'dispatch/companies/' + company_uuid + '/dynamicfields')
  }
  
}
