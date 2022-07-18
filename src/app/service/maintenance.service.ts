import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IdDriver, IdFavorite, IdVehicle, IdZone } from '../class/typesKeyword';
import { RequestGetFavorite } from '../class/favorite';
// import { ZoneFront } from '../components/mantenedor/zone/zone.class';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private _http: HttpClient) { }

  getZoneForByIdCoverage(searchJson: any) {
    return this._http.get(environment.SERVICES_URL + 'maintenance/coverages/' + searchJson.coverage_id  + "/zones?page=" + searchJson.page  + "&page_size=" + searchJson.page_size)
  }
  getCompanySearch(searchJson: any) {
    return this._http.get(environment.SERVICES_URL + 'maintenance/company/search' + '?key_word=' + searchJson.key_word)
  }

  //#region CLIENT
  getClientFavorites(favoriteJson: RequestGetFavorite) {
    return this._http.get(environment.SERVICES_URL + 'maintenance/client/favorites' + '?client_id='  + favoriteJson.client_id + '&company_id=' + favoriteJson.company_id)
  }

  postClientEditFavorites(favoritesJson:any) {
    return this._http.post(environment.SERVICES_URL + '/maintenance/client/favorites', favoritesJson)
  }

  deleteClientEditFavorites(idFavorite: IdFavorite ) {
    return this._http.delete(environment.SERVICES_URL + '/maintenance/client/favorites' + '?favorite_id=' + idFavorite)
  }

  postClientAdd(jsonPost:any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/client', jsonPost)
  }

  putClientEdit(jsonPut:any){
    return this._http.put(environment.SERVICES_URL + 'maintenance/client', jsonPut)
  }

  //#endregion CLIENT

  //#region VEHICLE
  getVehicleList(searchJson: any) {
    return this._http.get(environment.SERVICES_URL + 'maintenance/vehicles' + '?page=' + searchJson.page + '&page_size=' + searchJson.page_size)
  }

  getSearchVehicleList(searchJson: any){    
    return this._http.get(environment.SERVICES_URL + 'maintenance/vehicles' + '?page=' + searchJson.page + '&page_size=' + searchJson.page_size + '&key_word=' + searchJson.key_word)
  }

  postVehicleSave(jsonPost:any) {
    // console.log('POST:  ', jsonPost);
    // return null;
    return this._http.post(environment.SERVICES_URL + 'maintenance/vehicles', jsonPost);
  }

  putVehicleSave(vehicle: any) {
    // console.log('PUT:  ', vehicle);
    // return null;
    return this._http.put(environment.SERVICES_URL + 'maintenance/vehicles/' + vehicle.id, vehicle)
  }

  getVehicle(vehicle_id: IdVehicle){
    return this._http.get(environment.SERVICES_URL + 'maintenance/vehicles/' + vehicle_id)
  }

  getVehicleDocument(vehicle_id: IdVehicle){
    return this._http.get(environment.SERVICES_URL + 'maintenance/vehicles/' + vehicle_id + '/documents')
  }

  putVehicleDocument(json: any){
    return this._http.put(environment.SERVICES_URL + 'maintenance/vehicles/' + json.vehicle_id + '/documents', json.documentos)
  }

  putVehicleDocumentLimitSend(json : any){
    return this._http.put(environment.SERVICES_URL + 'maintenance/vehicles/' + json.driver_id + '/documents', json.documentos)
  }

  postVehicleDocument(json : any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/vehicles/' + json.vehicle_id  + '/documents/' + json.document_id + '/captures', json.files)
  }

  deleteVehicleDocument(json : any){
    return this._http.delete(environment.SERVICES_URL + 'maintenance/vehicles/' + json.vehicle_id + '/documents/' + json.document_id)
  }

  postVehicleStatusDocument(json : any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/vehicles/' + json.vehicle_id + '/documents/' + json.document_id + '/evaluate', json.documentos)
  }

  getAttributes(vehicle_id: IdVehicle){
    return this._http.get(environment.SERVICES_URL + 'maintenance/vehicles/' + vehicle_id + '/attributes')
  }

  postAttributes(json : any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/vehicles/' + json.vehicle_id  + '/attributes' , json.attribute)
  }

  deleteAttributes(json : any){
    return this._http.delete(environment.SERVICES_URL + 'maintenance/vehicles/' + json.vehicle_id + '/attributes/' + json.attribute_id)
  }

  getListBrands(json : any){
    return this._http.get(environment.SERVICES_URL + 'maintenance/vehicles/brands')
  }

  getListModels(brand_id : any){
    return this._http.get(environment.SERVICES_URL + 'maintenance/vehicles/brands/' + brand_id + '/models')
  }

  getListMatchVehicle(searchJson: any){
    return this._http.get(environment.SERVICES_URL + 'maintenance/autocomplete/vehicles' 
      + '?search_type=' + searchJson.search_type 
      + '&key_word=' + searchJson.key_word)
  }

  getListMatcgLicensePlate(licensePlate: string){
    return this._http.get(environment.SERVICES_URL + 'dispatch/autocomplete/licenseplate' 
      + '?key_word=' + licensePlate)
  }

  getListMatchCode(code: string){
    return this._http.get(environment.SERVICES_URL + 'dispatch/autocomplete/codevehicle' 
      + '?key_word=' + code)
  }

  getVehicleOwner(searchJson : any){
    //solo para probar
    return this._http.get(environment.SERVICES_URL + 'maintenance/vehicles/' + searchJson)
  }

  //#endregion VEHICLE

  //#region  DRIVER
  getAutocompleteDrivers(searchJson : any){
    return this._http.get(environment.SERVICES_URL + '/maintenance/autocomplete/drivers' + '?key_word=' + searchJson.key_word)
  }

  getDriverList(searchJson : any){
    return this._http.get(environment.SERVICES_URL + 'maintenance/drivers' + '?page=' + searchJson.page + '&page_size=' + searchJson.page_size)
  }
  
  getSearchDriverList(searchJson : any){    
    return this._http.get(environment.SERVICES_URL + 'maintenance/drivers' + '?page=' + searchJson.page + '&page_size=' + searchJson.page_size + '&key_word=' + searchJson.key_word)
  }

  postDriverSave(jsonPost : any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/drivers', jsonPost)
  }

  putDriverSave(driver : any) {
    return this._http.put(environment.SERVICES_URL + 'maintenance/drivers/' + driver.id, driver)
  }

  getDriverProfile(driver_id: IdDriver){
    return this._http.get(environment.SERVICES_URL + 'maintenance/drivers/'  + driver_id)
  }
  getByIdZone(zone: any){
    return this._http.get(environment.SERVICES_URL + 'maintenance/coverages/'  + zone.coverage?.id + '/zones/' + zone.idZone)
  }
  // postAddZone(postAddZoneJson:ZoneFront) {
  //   return this._http.post(environment.SERVICES_URL + 'maintenance/coverages/'  + postAddZoneJson.coverage?.id + '/zones' , postAddZoneJson)
  // }
  // listAddZone(postAddZoneJson:ZoneFront) {
  //   return this._http.post(environment.SERVICES_URL + 'maintenance/coverages/'  + postAddZoneJson.coverage?.id + '/zones' , postAddZoneJson)
  // }
  postPutZone(postAddZoneJson:any) {
    return this._http.patch(environment.SERVICES_URL + 'maintenance/coverages/'  + postAddZoneJson.coverage?.id  + '/zones/' + postAddZoneJson.id , postAddZoneJson)
  }
  getDriverDocument(driver_id: IdDriver){
    return this._http.get(environment.SERVICES_URL + 'maintenance/drivers/' + driver_id + '/documents')
  }

  putDriverDocument(json : any){
    return this._http.put(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/documents', json.documentos)
  }

  putDriverDocumentLimitSend(json : any){
    return this._http.put(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/documents', json.documentos)
  }

  postDriverDocument(json : any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id  + '/documents/' + json.document_id + '/captures', json.files)
  }

  deleteDriverDocument(json : any){
    return this._http.delete(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/documents/' + json.document_id)
  }

  postDriverStatusDocument(json : any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/documents/' + json.document_id + '/evaluate', json.documentos)
  }

  getDriverListVehicle(driver_id : any){
    return this._http.get(environment.SERVICES_URL + 'maintenance/drivers/' + driver_id + '/vehicles')
  }

  postDriverAddVehicle(json : any){    
    return this._http.post(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/vehicles', json.vehicle)
  }

  deleteDriverVehicle(json : any){
    return this._http.delete(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/vehicles/' + json.vehicle_id)
  }

  getAutocompleteVehicle(searchJson : any){
    return this._http.get(environment.SERVICES_URL + 'maintenance/autocomplete/vehicles' + '?key_word='+ searchJson.key_word)
  }

  postDriverSanction(json : any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/sanctions', json.sanction)
  }

  getDriverStates(driver_id : any){
    return this._http.get(environment.SERVICES_URL + 'maintenance/drivers/' + driver_id + '/state')
  }

  postDriverUnlock(json : any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/unlock', {})
  }
  
  postDriverOrder(json : any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/order', json.body)
  }
  
  getDriverActivities(json : any){
    return this._http.get(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/activities' 
      + '?page=' + json.page 
      + '&page_size=' + json.page_size 
      + '&date_start=' + json.date_start 
      + '&date_finish=' + json.date_finish)
  }

  putDriverChangePassword(json : any){
    return this._http.put(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/password', json.password)
  }

  postDriverImage(json : any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/picture/static', json.files)
  }

  postDriverGif(json : any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/picture/animated', json.files)
  }  

  postDriverEndDay(driver_id: IdDriver){
    return this._http.post(environment.SERVICES_URL + 'maintenance/drivers/' + driver_id + '/state/endofday', '')
  }

  postDriverStartTheDay(driver_id: IdDriver){
    return this._http.post(environment.SERVICES_URL + 'maintenance/drivers/' + driver_id + '/state/startoftheday', '')
  }

  postDriverOccupied(driver_id: IdDriver){
    return this._http.post(environment.SERVICES_URL + 'maintenance/drivers/' + driver_id + '/state/occupied', '')
  }

  postDriverClose(json : any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/drivers/' + json.driver_id + '/state/closeservice', json.service_id)    
  }

  getListMatchDriver(searchJson: any){
    return this._http.get(environment.SERVICES_URL + 'maintenance/autocomplete/drivers' 
      + '?search_type=' + searchJson.search_type 
      + '&key_word=' + searchJson.key_word)
  }

  getListMatchCodeDriver(code: string){
    return this._http.get(environment.SERVICES_URL + 'dispatch/autocomplete/codedriver' 
      + '?key_word=' + code)
  }

  getListMatchEmail(email: string){
    return this._http.get(environment.SERVICES_URL + 'dispatch/autocomplete/email' 
      + '?key_word=' + email)
  }

  getListMatchDocument(searchJson: any){
    return this._http.get(environment.SERVICES_URL + 'dispatch/autocomplete/documenttypedriver' 
    + '?document_type_id=' + searchJson.document_type_id
    + '&key_word=' + searchJson.document_number)
  }
  //#endregion DRIVER

  //#region COMPANY
  getCompanyList(searchJson: any){
    searchJson.key_word = ( searchJson.key_word) ?  searchJson.key_word : '';
    return this._http.get(environment.SERVICES_URL + 'maintenance/companies' +
      '?page=' + searchJson.page +
      '&page_size=' + searchJson.page_size +
      ((searchJson.key_word) ? ('&key_word=' + searchJson.key_word) : '')
    )

  }

  getCompanyById(companyId: number) {
    return this._http.get(environment.SERVICES_URL + 'maintenance/company' + '?id=' + companyId);
  }
  getCompanyByIdCliente(clientId: any ) {
    return this._http.get(environment.SERVICES_URL_CLIENT + 'profile/' + clientId  +  '/companies' );
  }

  getCompanyTypeControls(companyId: number){
    return this._http.get(environment.SERVICES_URL + 'maintenance/companies/' + companyId + '/dynamicfields_types');
  }

  getCompanyDynamicFields(companyId: number){
    return this._http.get(environment.SERVICES_URL + 'maintenance/companies/' + companyId + '/dynamicfields');
  }

  postCompanySaveDynamicField(jsonPost: any){
    return this._http.post(environment.SERVICES_URL + 'maintenance/companies/' + jsonPost.company_id + '/dynamicfields', jsonPost.dynamic);
  }

  deleteCompanyDynamicField(json: any){
    return this._http.delete(environment.SERVICES_URL + 'maintenance/companies/' + json.company_id + '/dynamicfields/' + json.dynamicfield_id);
  }

  getCompanyTypeControlsDynamic(json: any){
    return this._http.get(environment.SERVICES_URL_CLIENT + 'profile/' + json.client_id  + '/companies/' + json.company_id   + '/dynamicfields');
  }

  postcompanySave(jsonPost: any){
    console.log("DATA EMPRESA:", jsonPost)
    return this._http.post(environment.SERVICES_URL + 'maintenance/companies', jsonPost);
  }
  
  
  patchcompanyUpdate(jsonPost: any){
    return this._http.patch(environment.SERVICES_URL + 'maintenance/companies/'+ jsonPost.company_id, jsonPost.company_body);
  }
  //#endregion COMPANY

    //#region cost center
    getListCostCenterxCompany(searchJson: any){
      return this._http.get(environment.SERVICES_URL + 'maintenance/costcenter?company_id=' + searchJson.company_id)
    }
  
    postcostCenterSave(jsonPost: any){
      return this._http.post(environment.SERVICES_URL + 'maintenance/costcenter', jsonPost);
    }
  
    putcostCenterUpdate(jsonPost: any){
      return this._http.put(environment.SERVICES_URL + 'maintenance/costcenter/'+ jsonPost.costcenter_id, jsonPost.costcenter_body);
    }
  
    // getCostCenterById(searchJson: any){
    //   return null ;// this._http.get(environment.SERVICES_URL + 'maintenance/costcenter?company_id=' + searchJson.company_id)
    // }
  
    //#endregion

      //#region Area

    getListAreaxCostCenter(searchJson: any){
      return this._http.get(environment.SERVICES_URL + 'maintenance/costcenter/'+ searchJson +'/area' )
    }

    getListAreaxCompany(searchJson: any){
      return this._http.get(environment.SERVICES_URL + 'maintenance/companies/' + searchJson.company_id + '/area')
    }

    patchAreaUpdate(jsonPost: any){
      console.log("Area:", jsonPost)
      return this._http.patch(environment.SERVICES_URL + 'maintenance/companies/' + jsonPost.company_id + '/area/' + jsonPost.area_id, jsonPost.area_body);

    }

    postAreaSave(jsonPost: any){
      console.log("Area:", jsonPost)
      return this._http.post(environment.SERVICES_URL + 'maintenance/companies/' + jsonPost.company_id + '/area', jsonPost.area_body);
    }

    //#endregion

    //#region  SERVICIO_CORPORATIVO
    getAutocompletePersonalServicio(searchJson : any){

      return this._http.get(
        environment.SERVICES_URL_CLIENT 
        + '/profile/' + searchJson.client_id 
        + '/companies/'+ searchJson.company_id 
        + '/contacts?query='
        +  searchJson.key_word 
        + '&page=' 
        + searchJson.page + '&page_size=' + searchJson.page_size , 
        )
      //#endregion  
  }
}
