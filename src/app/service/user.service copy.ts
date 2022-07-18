import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserGetConversation, UserGetInformation, UserPost, UserPostInformation, UserPostReadMessage } from '../class/operaciones/mensajeConductorOpe';
import { IdDriver, IdUser, IdVehicle } from '../class/typesKeyword';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  postUserLogin(userAccesssJson: any) {
    return this._http.post(environment.SERVICES_URL + 
      'authentication/validate', userAccesssJson )
  }
  postUserLoginCorporate(userAccesssJson: any) {
    return this._http.post(environment.SERVICES_URL_ACCESS + 
      'client/customize/login', userAccesssJson )
  }

  patchUserProfile(jsonProfile: any) {
    return this._http.patch(environment.SERVICES_URL + 
      'user/' + jsonProfile.uuid + '/profile', jsonProfile )
  }

  getUserProfile(uuid: string){
    return this._http.get(environment.SERVICES_URL + 
      'user/' + uuid + '/profile')
  }

  patchUserPassword(jsonProfile: any){
    return this._http.patch(environment.SERVICES_URL + 
      'user/' + jsonProfile.userUuid + '/profile/password', jsonProfile )
  }

  getUserNotificationsMessageDrivers(user: any){
    return this._http.get(environment.SERVICES_URL + 
      'user/' + user.uuid + '/notifications/messages/drivers?state_type='+ 'UNREAD' ); //state_type = UNREAD/READ (SINLEER/LEIDO))
  }

  getUserConversations(json: UserGetConversation){
    return this._http.get(environment.SERVICES_URL + 
      'user/' + json.userUuid + '/conversations?'+
      ((json.query) ? ('type_result=' + json.type_result) : '' ) +
      ((json.query) ? ('&query=' + json.query) : '' ) );
  }

  getUserConversationMessages(json: UserGetInformation){
    return this._http.get(environment.SERVICES_URL + 
      'user/' + json.userUuid + '/conversations/' + json.conversation_uuid + '/messages'
      );
  }

  getUserConversationMessagesParameters(json: UserGetInformation){
    return this._http.get(environment.SERVICES_URL + 
      'user/' + json.userUuid + '/conversations/' + json.conversation_uuid + '/messages?' +
      'date_start=' + json.date_start +
      ((json.contains_in_body) ? ('&contains_in_body=' + json.contains_in_body) : '' ) +
      ((json.date_end) ? ('&date_end=' + json.date_end) : '' ));
  }

  postUserConversationMessages(json: UserPostInformation){
    return this._http.post(environment.SERVICES_URL + 
      'user/' + json.userUuid + '/conversations/' + json.conversation_uuid + '/messages', json.message);
  }

  postUserNotificationsMessageDrivers(json: UserPost){
    return this._http.post(environment.SERVICES_URL + 
      'user/' + json.userUuid + '/notifications/messages/drivers',json.request);
  }

  postUserNotificationsMessageZone(json: UserPost){
    return this._http.post(environment.SERVICES_URL + 
      'user/' + json.userUuid + '/notifications/messages/drivers/zone',json.request);
  }
  
  postUserConversationMessagesRead(json: UserPostReadMessage){
    return this._http.post(environment.SERVICES_URL + 
      'user/' + json.userUuid + '/conversations/' + json.conversation_uuid + '/messages/'+json.message_uuid
      +'/read',{});
  }
  
  getUsersAll(jsonRequest: any){


      return this._http.get(environment.SERVICES_URL + 
        '/maintenance/users' + '?page=' + jsonRequest.page + '&page_size=' + jsonRequest.page_size);
    


  
  }

  postUserID(jsonRequest: any){

      return this._http.post(environment.SERVICES_URL + 
        '/maintenance/users', jsonRequest );
    


  }

  getUserID(userId: IdUser){
    return this._http.get(environment.SERVICES_URL + 
      '/maintenance/users/'+userId );
  }

  putUserID(userPutRequest: any){

      return this._http.put(environment.SERVICES_URL + 
        '/maintenance/users/'+userPutRequest.id,userPutRequest);
    

 
  }

  getUserIdPermissions(userId: IdUser){
    return this._http.get(environment.SERVICES_URL + 
      '/maintenance/users/'+userId+'/permissions');
  }

  putUserIdPermissions(jsonRequest: any){
    return this._http.put(environment.SERVICES_URL + 
      '/maintenance/users/'+jsonRequest.id+'/permissions',jsonRequest.body);
  }

  postDriverLoginCellphone(userAccesssJson: any){
    return this._http.post(environment.SERVICES_URL + 
      'recruitment/login/cellphone', userAccesssJson )
  }

  postDriverLoginEmail(userAccesssJson: any){
    return this._http.post(environment.SERVICES_URL + 
      'recruitment/login/email', userAccesssJson )
  }

  postDriverRegister(jsonDriver: any){
    return this._http.post(environment.SERVICES_URL + 
      'recruitment/register', jsonDriver )
  }

  postDriverVerify(jsonRequest: any){
    return this._http.post(environment.SERVICES_URL + 
      'recruitment/login/sms/verify', jsonRequest )
  }

  postDriverResendSms(jsonRequest: any){
    return this._http.post(environment.SERVICES_URL + 
      'recruitment/login/sms/resend', jsonRequest )
  }

  getDriverProfile(driver_id: IdDriver){
    return this._http.get(environment.SERVICES_URL + 
      'recruitment/driver/'+driver_id );
  }

  getDriverDocuments(driver_id: IdDriver){
    return this._http.get(environment.SERVICES_URL + 
      'recruitment/driver/'+driver_id+'/documents');
  }

  getDriverVehicleDocuments(vehicle_id: IdVehicle){
    return this._http.get(environment.SERVICES_URL + 
      'recruitment/vehicle/'+vehicle_id+'/documents');
  }

  putDriverVehicleDocument(jsonDocument: any){
    return this._http.put(environment.SERVICES_URL + 
      'recruitment/vehicle/'+jsonDocument.id+'/documents/'+jsonDocument.document_id,jsonDocument.files);
  }

  getDriverVehicles(driver_id: IdDriver){
    return this._http.get(environment.SERVICES_URL + 
      'recruitment/driver/'+driver_id+'/vehicle');
  }

  postDriverVehicleRegister(jsonVehicle: any){
    return this._http.post(environment.SERVICES_URL + 
      'recruitment/driver/'+jsonVehicle.driver_id+'/vehicle', jsonVehicle.vehicle )
  }

  putDriverDocument(jsonDocument: any){
    return this._http.put(environment.SERVICES_URL + 
      'recruitment/driver/'+jsonDocument.id+'/documents/'+jsonDocument.document_id,jsonDocument.files);
  }

}
