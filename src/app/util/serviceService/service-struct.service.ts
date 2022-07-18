import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MasterdownloadService } from 'src/app/service/masterdownload.service';
// import { PruebaService, GeoService } from 'src/app/service';
import { StructService, RouteService, ServiceInterface } from './serviceStruct';
// import { DispatchService } from 'src/app/service/dispatch.service';
// import { MaintenanceService } from 'src/app/service/maintenance.service';
// import { MasterdownloadService } from 'src/app/service/masterdownload.service';
import { UserService } from 'src/app/service/user.service';
import { MaintenanceService } from 'src/app/service/maintenance.service';
import { DispatchService } from 'src/app/service/dispatch.service';
import { GeoService } from 'src/app/service/geo.service';
import { DriverService } from 'src/app/service/driver.service';
// import { MiEmpresaService } from 'src/app/service/mi-empresa.service'
// import { DriverService } from 'src/app/service/driver.service';
// import { CurrentStatesService } from 'src/app/service/current-states.service';
// import { TravelInforService } from 'src/app/service/travel-infor.service';
// import { PermissionsService } from 'src/app/service/permissions.service';
// import { ReportsService } from 'src/app/service/reports.service';
// import { ClientService } from 'src/app/service/client.service';

@Injectable({
  providedIn: 'root'
})
// 
export class ServiceStructService implements ServiceInterface  {

  constructor(
    // private toastService: ToastService,
    private serviceDispatch: DispatchService,
    private geoService: GeoService,
     private maintenanceService: MaintenanceService,
    private masterdownloadService: MasterdownloadService,
    // private travelInforService: TravelInforService,
    private userService: UserService,
    // private clientService: ClientService,
    // private miEmpresaService: MiEmpresaService,
    private driverService: DriverService,
    // private currentStatesService: CurrentStatesService,
    // private permissionsService: PermissionsService,
    // private reportService: ReportsService
  ) { }

  async requestService(structService: StructService, routeService: RouteService, json?: any): Promise<any> {
    // var serviceConect: Observable<any>
    switch (routeService) {

      // //#region Distpatch
      case RouteService.distpatchMonitorGet:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchMonitor(json));
        break
      // case RouteService.distpatchMonitorGetBo:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchMonitorBo(json));
      //   break  
      case RouteService.distpatchSearchGet:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchSearch(json));
        break
      case RouteService.distpatchServiceGet:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchService(json));
        break
      case RouteService.distpatchServicePost:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.postDistpatchService(json));
        break
      case RouteService.distpatchServicePut:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.putDistpatchService(json));
        break
      case RouteService.distpatchServiceCancelPost:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.postDistpatchServiceCancel(json));
        break
      case RouteService.distpatchServiceCancelReasonsGet:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchServiceCancelReasons(json));
        break
      case RouteService.distpatchServiceUnassignPost:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.postDistpatchServiceUnassign(json));
        break
      case RouteService.distpatchServiceUnassignReasonsGet:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchServiceUnassignReasons(json));
        break
      case RouteService.distpatchServiceOfferPost:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.postDistpatchServiceOffer(json));
        break
      case RouteService.distpatchPanelStateDriverGet:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchPanelStateDriver(json));
        break
      case RouteService.distpatchOfferGet:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchOffer(json));
        break
         case RouteService.distpatchClientSearchGet:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchClientSearch(json));
        break
      case RouteService.distpatchCentercostGet:
        var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchCentercost(json));
        break
      // case RouteService.distpatchPanelMonitorGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchPanelMonitor(json));
      //   break
      // case RouteService.distpatchPanelOverviewGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchPanelOverview(json));
      //   break
      // case RouteService.distpatchTrackingGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchServiceTracking(json));
      //   break
      // case RouteService.distpatchServicesAssignPost:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.postDistpatchServicesAssign(json));
      //   break
      // case RouteService.distpatchClientTripSumaryGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchClientTripSumary(json));
      //   break
      // case RouteService.distpatchClientTripDestinationGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchClientTripDestination(json));
      //   break
      // case RouteService.distpatchCompanyVerifyPost:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.postCompanyVerify(json));
      //   break
      // case RouteService.dispatchCompanyListGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getListCompany());
      //   break
      // case RouteService.distpatchCliendAddPost:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.postAddClient(json));
      //   break
      // case RouteService.distpatchCliendEditPut:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.putEditClient(json));
      //   break
      // case RouteService.distpatchServiceRetainedPost:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.postRetainedService(json));
      //   break
      // case RouteService.distpatchServiceRetainedDelete:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.deleteRetainedService(json));
      //   break
      // case RouteService.dispatchServiceBlockClientPut:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.putBlockClient(json));
      //   break
      // case RouteService.dispatchServiceUnlockClientPut:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.putUnlockClient(json));
      //   break
      // case RouteService.integrationServiceValidateBalancePost:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.postValidateBalance(json));
      //   break
      // case RouteService.dispatchServiceActivitiesGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getActivitiesService(json));
      //   break
      // case RouteService.dispatchCompanyDynamicFieldGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDynamicFields(json));
      //   break
      // //#endregion

      //#region Geo
      case RouteService.geoAutocompleteGet:
        var promeseResult = await this.resultOfResponse(structService, this.geoService.getGeoAutocomplete(json));
        break

      case RouteService.geoCodingReferenceIdGet:
        var promeseResult = await this.resultOfResponse(structService, this.geoService.getGeoCodingReferenceId(json));
        break

      case RouteService.geoCodingCoordinateGet:
        var promeseResult = await this.resultOfResponse(structService, this.geoService.getGeoCodingCoordinate(json));
        break
      //#endregion

      // //#region Maintenance
      // case RouteService.maintenanceZoneSavePut:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postPutZone(json));
      //   break
      // case RouteService.maintenanceZoneSavePost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postAddZone(json));
      //   break
      // case RouteService.maintenanceZoneGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getByIdZone(json));
      //   break
      // case RouteService.maintenanceServiceZoneGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getZoneForByIdCoverage(json));
      //   break
      //   // //listar zonas
      //   // case RouteService.maintenanceServiceZoneGet:
      //   //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getZoneForByIdCoverage(json));
      //   //   break
      // case RouteService.maintenanceServiceGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getCompanySearch(json));
      //   break
      // case RouteService.maintenanceClientFavoritesGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getClientFavorites(json));
      //   break
      // case RouteService.maintenanceClientFavoritesPost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postClientEditFavorites(json));
      //   break
      // case RouteService.maintenanceClientFavoritesDelete:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.deleteClientEditFavorites(json));
      //   break
      // case RouteService.maintenanceClientAddPost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postClientAdd(json));
      //   break
      // case RouteService.maintenanceClientEditPut:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.putClientEdit(json));
      //   break
      // case RouteService.maintenanceVehicleListGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getVehicleList(json));
      //   break
      // case RouteService.maintenanceVehicleSearchListGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getSearchVehicleList(json));
      //   break
      // case RouteService.maintenanceVehicleSavePost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postVehicleSave(json));
      //   break
      // case RouteService.maintenanceVehicleSavePut:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.putVehicleSave(json));
      //   break
      // case RouteService.maintenanceVehicleGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getVehicle(json));
      //   break
      // case RouteService.maintenanceDocumentVehicleGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getVehicleDocument(json));
      //   break
      // case RouteService.maintenanceDocumentVehiclePut:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.putVehicleDocument(json));
      //   break
      // case RouteService.maintenanceDocumentVehiclePutLimitSend:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.putVehicleDocumentLimitSend(json));
      //   break
      // case RouteService.maintenanceDocumentVehiclePost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postVehicleDocument(json));
      //   break
      // case RouteService.maintenanceDocumentVehicleDelete:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.deleteVehicleDocument(json));
      //   break
      // case RouteService.maintenanceStatusDocumentVehiclePost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postVehicleStatusDocument(json));
      //   break
      // case RouteService.maintenanceOwnerVehicleSearchGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getVehicleOwner(json));
      //   break
      // case RouteService.maintenanceAutocompleteDriversGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getAutocompleteDrivers(json));
      //   break
      // case RouteService.maintenanceVehicleAttributesGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getAttributes(json));
      //   break
      // case RouteService.maintenanceVehicleAddAttributePost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postAttributes(json));
      //   break
      // case RouteService.maintenanceVehicleDeleteAttributesDelete:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.deleteAttributes(json));
      //   break
      // case RouteService.maintenanceVehicleListBrandsGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getListBrands(json));
      //   break
      // case RouteService.maintenanceVehicleListModelsGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getListModels(json));
      //   break
      // case RouteService.maintenanceVehicleMatchGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getListMatchVehicle(json));
      //   break
      // case RouteService.maintenanceVehicleMatchLicensePlateGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getListMatcgLicensePlate(json));
      //   break
      // case RouteService.maintenanceVehicleMatchCodeGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getListMatchCode(json));
      //   break
      // case RouteService.maintenanceDriverListGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getDriverList(json));
      //   break
      // case RouteService.maintenanceDriverSearchListGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getSearchDriverList(json));
      //   break
      // case RouteService.maintenanceDriverSavePost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postDriverSave(json));
      //   break
      // case RouteService.maintenanceDriverSavePut:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.putDriverSave(json));
      //   break
      // case RouteService.maintenanceDriverGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getDriverProfile(json));
      //   break
      // case RouteService.maintenanceDocumentDriverGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getDriverDocument(json));
      //   break
      // case RouteService.maintenanceDocumentDriverPut:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.putDriverDocument(json));
      //   break
      // case RouteService.maintenanceDocumentDriverPutLimitSend:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.putDriverDocumentLimitSend(json));
      //   break
      // case RouteService.maintenanceDocumentDriverPost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postDriverDocument(json));
      //   break
      // case RouteService.maintenanceDocumentDriverDelete:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.deleteDriverDocument(json));
      //   break
      // case RouteService.maintenanceStatusDocumentDriverPost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postDriverStatusDocument(json));
      //   break
      // case RouteService.maintenanceDriverListVehicleGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getDriverListVehicle(json));
      //   break
      // case RouteService.maintenanceDriverSaveVehiclePost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postDriverAddVehicle(json));
      //   break
      // case RouteService.maintenanceDriverVehicleDelete:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.deleteDriverVehicle(json));
      //   break
      // case RouteService.maintenanceDriverGetAutocompleteVehicle:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getAutocompleteVehicle(json));
      //   break
      // case RouteService.maintenanceDriverPostSanction:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postDriverSanction(json));
      //   break
      // case RouteService.maintenanceDriverGetState:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getDriverStates(json));
      //   break
      // case RouteService.maintenanceDriverPostUnlock:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postDriverUnlock(json));
      //   break
      // case RouteService.maintenanceDriverPostOrder:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postDriverOrder(json));
      //   break
      // case RouteService.maintenanceDriverGetActivities:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getDriverActivities(json));
      //   break
      // case RouteService.maintenanceDriverChangePasswordPut:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.putDriverChangePassword(json));
      //   break
      // case RouteService.maintenanceDriverSaveImagePost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postDriverImage(json));
      //   break
      // case RouteService.maintenanceDriverSaveGifPost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postDriverGif(json));
      //   break
      // case RouteService.maintenanceDriverEndDayPost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postDriverEndDay(json));
      //   break
      // case RouteService.maintenanceDriverStartTheDayPost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postDriverStartTheDay(json));
      //   break
      // case RouteService.maintenanceDriverOccupiedPost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postDriverOccupied(json));
      //   break
      // case RouteService.maintenanceDriverClosePost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postDriverClose(json));
      //   break
      // case RouteService.maintenanceDriversMatchGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getListMatchDriver(json));
      //   break
      // case RouteService.maintenanceDriverMatchCodeGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getListMatchCodeDriver(json));
      //   break
      // case RouteService.maintenanceDriverMatchEmailGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getListMatchEmail(json));
      //   break
      // case RouteService.maintenanceDriverMatchDocumentGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getListMatchDocument(json));
      //   break
      // case RouteService.maintenancecostCenterGet:
      //    var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getListCostCenterxCompany(json));
      //   break
      // case RouteService.maintenanceCostCenterSavePost:
      //    var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postcostCenterSave(json));
      //   break 
      // case RouteService.maintenanceCostCenterUpdatePut:
      //    var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.putcostCenterUpdate(json));
      //   break 
      // case RouteService.maintenanceAreaListModelsGet:
      //    var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getListAreaxCostCenter(json));
      //   break
      // //#endregion


      // //#region Area

      // case RouteService.maintenanceAreaGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getListAreaxCompany(json));
      //  break

      //  case RouteService.maintenanceAreaSavePost:
      //    var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postAreaSave(json));
      //   break 
      // case RouteService.maintenanceAreaUpdatePatch:
      //    var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.patchAreaUpdate(json));
      //  break       

      // //#endregion
      
      // //#region Company
      // case RouteService.maintananceCompanyListGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getCompanyList(json));
      //   break
      // case RouteService.maintenanceCompanyGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getCompanyById(json));
      //   break
      // case RouteService.maintenanceCompanyIdclientGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getCompanyByIdCliente(json));
      //   break
        
      // case RouteService.maintananceCompanyTypeControlGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getCompanyTypeControls(json));
      //   break
      case RouteService.maintananceCompanyTypeControlDynamicGet:
        var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getCompanyTypeControlsDynamic(json));
          break
      // case RouteService.maintenanceCompanyDynamicFieldsGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getCompanyDynamicFields(json));
      //   break
      // case RouteService.maintenanceCompanySaveDynamicFieldPost:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postCompanySaveDynamicField(json));
      //   break
      // case RouteService.maintananceCompanyDynamicFieldDelete:
      //   var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.deleteCompanyDynamicField(json));
      //   break
      // case RouteService.maintenanceCompanySavePost:
      //    var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.postcompanySave(json));
      //   break 
      // case RouteService.maintenanceCompanyUpdatePatch:
      //    var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.patchcompanyUpdate(json));
      //  break        
      // //#endregion

      // //#region Service-Travel
      // case RouteService.ongoingTravelServiceGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.travelInforService.getOngoing(json));
      //   break

      // case RouteService.ongoingSharedTravelServiceGet:
      //   var promeseResult = await this.resultOfResponse(structService, this.travelInforService.getOngoingShared(json));
      //   break

      // //#endregion

      //#region Masterdownload
      case RouteService.masterdownloadGet:
        var promeseResult = await this.resultOfResponse(structService, this.masterdownloadService.getMasterdownload(json));
        break

      case RouteService.masterdownloadZoneGet:
        var promeseResult = await this.resultOfResponse(structService, this.masterdownloadService.getMasterdownloadZone(json));
        break
      //#endregion

    //   //#region User
      case RouteService.userLoginPost:
        var promeseResult = await this.resultOfResponse(structService, this.userService.postUserLogin(json));
        break

    //   case RouteService.userProfilePatch:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.patchUserProfile(json));
    //     break

    //   case RouteService.userProfileGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.getUserProfile(json));
    //     break

    //   case RouteService.userProfilePassword:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.patchUserPassword(json));
    //     break

    //   case RouteService.userNotificationsMessageDriversGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.getUserNotificationsMessageDrivers(json));
    //     break

    //   case RouteService.userConversationsGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.getUserConversations(json));
    //     break

    //   case RouteService.userConversationMessagesGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.getUserConversationMessages(json));
    //     break

    //   case RouteService.userConversationMessagesParametersGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.getUserConversationMessagesParameters(json));
    //     break

    //   case RouteService.userConversationMessagesPost:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.postUserConversationMessages(json));
    //     break

    //   case RouteService.userNotificationsMessageDriversPost:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.postUserNotificationsMessageDrivers(json));
    //     break

    //   case RouteService.userNotificationsMessageZonePost:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.postUserNotificationsMessageZone(json));
    //     break

    //   case RouteService.userConversationMessagesReadPost:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.postUserConversationMessagesRead(json));
    //     break

    //   case RouteService.userAllGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.getUsersAll(json));
    //     break

    //   case RouteService.userIdGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.getUserID(json));
    //     break

    //   case RouteService.userIdPut:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.putUserID(json));
    //     break

    //   case RouteService.userIdPost:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.postUserID(json));
    //     break

    //   case RouteService.userIdPermissionsGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.getUserIdPermissions(json));
    //     break

    //   case RouteService.userIdPermissionsPut:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.putUserIdPermissions(json));
    //     break
    //   //#endregion

    //   //#region Client
    //   case RouteService.clientAllGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.clientService.getClientsAll(json));
    //     break

    //   case RouteService.clientChangePassword:
    //     var promeseResult = await this.resultOfResponse(structService, this.clientService.getClientChangePassword(json));
    //     break
    //   case RouteService.clientIdGet:
    //      var promeseResult = await this.resultOfResponse(structService, this.clientService.getClientID(json));
    //     break
  
    //   case RouteService.clientIdPut:
    //      var promeseResult = await this.resultOfResponse(structService, this.clientService.putClientID(json));
    //     break
  
    //   case RouteService.clientIdPost:
    //      var promeseResult = await this.resultOfResponse(structService, this.clientService.postClientID(json));
    //     break

    //   //#endregion client

    //   //#region CurrectState
    //   case RouteService.currenstatesDriverGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.currentStatesService.getCurrenstatesDriver(json));
    //     break

    //   case RouteService.currenstatesDriverLastLocationGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.currentStatesService.getCurrenstatesDriverLastLocation(json));
    //     break

    //   case RouteService.currenstatesDriverLastserviceGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.currentStatesService.getCurrenstatesDriverLastservice(json));
    //     break
    //   //#endregion

      //#region Driver
      case RouteService.driversAvailablePointGet:
        var promeseResult = await this.resultOfResponse(structService, this.driverService.getDriversAvailablePoint(json));
        break

    //   case RouteService.driversAvailableServicetGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.driverService.getDriversAvailableService(json));
    //     break

    //   case RouteService.driversTrackingGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.driverService.getDriversTracking(json));
    //     break
    //   //#endregion

    //   //#region miEmpresa
    //   case RouteService.myCompany:
    //     var promeseResult = await this.resultOfResponse(structService, this.miEmpresaService.postDatosGenerales(json));
    //     break

    //   case RouteService.logoCompany:
    //     var promeseResult = await this.resultOfResponse(structService, this.miEmpresaService.postLogoEmpresa(json));
    //     break

    //   case RouteService.statesColor:
    //     var promeseResult = await this.resultOfResponse(structService, this.miEmpresaService.postColoresEstados(json));
    //     break
    //   //#endregion miEmpresa

    //   //#region Permissions
    //   case RouteService.PermissionsGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.permissionsService.getPermissions());
    //     break

    //   case RouteService.PermissionsTemplateGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.permissionsService.getPermissionsTemplate());
    //     break
    //   //#endregion Permissions

    //   //#region Driver-Register
    //   case RouteService.driverLoginCellphonePost:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.postDriverLoginCellphone(json));
    //     break
    //   case RouteService.driverLoginEmailPost:
    //   var promeseResult = await this.resultOfResponse(structService, this.userService.postDriverLoginEmail(json));
    //   break
    //   case RouteService.driverRegisterPost:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.postDriverRegister(json));
    //     break
    //   case RouteService.driverVerifyPost:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.postDriverVerify(json));
    //     break
    //   case RouteService.driverResendPinPost:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.postDriverResendSms(json));
    //     break
    //   case RouteService.driverRegisterVehiclePost:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.postDriverVehicleRegister(json));
    //     break
    //   case RouteService.driverProfileGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.getDriverProfile(json));
    //     break
    //   case RouteService.driverGetDocumentsGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.getDriverDocuments(json));
    //     break
    //   case RouteService.driverVehicleGetDocumentsGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.getDriverVehicleDocuments(json));
    //     break
    //   case RouteService.driverVehicleGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.getDriverVehicles(json));
    //     break
    //   case RouteService.driverSaveDocumentPut:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.putDriverDocument(json));
    //     break
    //   case RouteService.driverVehicleSaveDocumentPut:
    //     var promeseResult = await this.resultOfResponse(structService, this.userService.putDriverVehicleDocument(json));
    //     break
    //   //#endregion Driver-Register

    //   //#region Reports
    //   case RouteService.reportServiceGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.reportService.getReportService(json));
    //     break
    //   case RouteService.reportClientByCompanyGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.reportService.getClientBycompany(json));
    //     break
    //   case RouteService.reportExportXlXSGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.reportService.getXlsxService(json));
    //     break
    //   //#endregion Reports
    //   //#region Login Corporate
        case RouteService.userLoginPostCorporative:
          var promeseResult = await this.resultOfResponse(structService, this.userService.postUserLoginCorporate(json));
        break
    //   //#endregion Login Corporate
      case RouteService.maintenanceAutocompletePersonalGet:
        var promeseResult = await this.resultOfResponse(structService, this.maintenanceService.getAutocompletePersonalServicio(json));
      break 
    //   default:
    //    // cancelar servicio cliente 
    //   case RouteService.distpatchServiceCancelReasonsGet:
    //     var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getDistpatchServiceClientCancelReasons(json));
    //     break
    //   // obtener servicio cliente 
    //   case RouteService.distpatchServiceGetService:
    //     var promeseResult = await this.resultOfResponse(structService, this.serviceDispatch.getCorporativoServiceXId(json));
    //     break
    //   // this.toastService.showError(routeService, environment.MSJE_CLIENTE.ERRROR.SERVICIO_NO_EXISTE )
     }

    return promeseResult
  }

  async resultOfResponse(structService: StructService, routeService: Observable<any>): Promise<any> {
    switch (structService) {
      case StructService.ARRAY:
        try {
          return await this.responseArray(routeService)
        }
        catch (error) {
          // this.toastService.showError(this.translate.instant(environment.MSJE_CLIENTE.ERRROR.SERVICIO_NO_EXISTE));
          return [];
        }
      case StructService.CODE:
        try {
          return await this.responseCode(routeService)
        }
        catch (error) {
          // this.toastService.s12howError(this.translate.instant(environment.MSJE_CLIENTE.ERRROR.SERVICIO_NO_EXISTE));
          return error;
        }

      case StructService.GENERIC_OK:
        return this.responseGenericOk(routeService);

      // default:
      //   return this.responseCode(routeService);
    }
  }

  responseCode(serviceSuscrible: Observable<any>): any {
    return new Promise(function (resolve, reject) {
      serviceSuscrible.subscribe((response: any) => {
        resolve(response);
      }, error => {
        reject(error);
      });
    })
  }

  responseArray(serviceSuscrible: Observable<any>): Promise<any> {
    return new Promise(function (resolve, reject) {
      serviceSuscrible.subscribe((response: any[]) => {
        resolve(response);
      }, error => {
        reject(error);
      });
    })
  }

  responseGenericOk(serviceSuscrible: Observable<any>): any {
    var response: any;
    return response
  }

}
