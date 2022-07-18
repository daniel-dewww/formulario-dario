
import { Injectable } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ALERT_MESSAGE } from '../constantes/txtAlert';
import { Observable } from 'rxjs';

export enum StructService {
    CODE = 'CODE',
    ARRAY = 'ARRAY',
    GENERIC_OK = 'GENERIC_OK'
}

export enum StatusCODE {
    CODE_200 = 'CODE_200',
    CODE_400 = 'CODE_400',
    CODE_401 = 'CODE_401'
}

export enum RouteService {
    distpatchMonitorGet = 'serviceDistpatchMonitorGet',
    distpatchMonitorGetBo = 'serviceDistpatchMonitorGetBo',
    distpatchSearchGet = 'serviceDistpatchSearchGet',
    distpatchServiceGet = 'serviceDistpatchServiceGet',
    distpatchServicePost = 'serviceDistpatchServicePost',
    distpatchServicePut = 'serviceDistpatchServicePut',
    distpatchServiceCancelPost = 'serviceDistpatchServiceCancelPost',
    distpatchServiceCancelReasonsGet = 'serviceDistpatchServiceCancelReasonsGet',
    distpatchServiceGetService = 'serviceDistpatchServiceGetService',
    distpatchServiceCancelClientReasonsGet = 'serviceDistpatchServiceCancelClientReasonsGet',
    distpatchServiceUnassignPost = 'serviceDistpatchServiceUnassignPost',
    distpatchServiceUnassignReasonsGet = 'serviceDistpatchServiceUnassignReasonsGet',
    distpatchServiceOfferPost = 'serviceDistpatchServiceOfferPost',
    
    distpatchOfferGet = 'serviceDistpatchOfferGet',
    distpatchPanelStateDriverGet= 'serviceDistpatchPanelStateDriverGet',
    distpatchPanelMonitorGet= 'serviceDistpatchPanelMonitorGet',
    distpatchPanelOverviewGet= 'serviceDistpatchPanelOverviewGet',
    distpatchClientSearchGet= 'serviceDistpatchClientSearchGet',
    distpatchCentercostGet = 'serviceDistpatchCentercostGet',
    distpatchTrackingGet = 'serviceDistpatchTrackingGet',
    distpatchServicesAssignPost = 'serviceDistpatchServicesAssignPost',
    distpatchClientTripSumaryGet = 'serviceDistpatchClientTripSumaryGet',
    distpatchClientTripDestinationGet = 'serviceDistpatchClientTripDestinationGet',
    distpatchCompanyVerifyPost = 'serviceDistpatchCompanyVerifyPost',
    dispatchCompanyListGet = 'serviceDispatchCompanyListGet',
    distpatchCliendAddPost = 'serviceDistpatchCliendAddPost',
    distpatchCliendEditPut = 'serviceDistpatchCliendEditPut',
    distpatchServiceRetainedPost = 'serviceDistpatchServiceRetainedPost',
    distpatchServiceRetainedDelete = 'serviceDistpatchServiceRetainedDelete',
    dispatchServiceBlockClientPut = 'serviceDispatchBlockClientPut',
    dispatchServiceUnlockClientPut = 'serviceDispatchClientUnlockPut',
    dispatchServiceActivitiesGet = 'serviceDispatchActivitiesGet',
    dispatchCompanyDynamicFieldGet = 'serviceDispatchCompanyDinamicFieldGet',

    integrationServiceValidateBalancePost = 'serviceIntegrationValidateBalancePost',

    ongoingSharedTravelServiceGet = 'serviceOngoingSharedGet',
    ongoingTravelServiceGet = 'serviceOngoingGet',

    geoAutocompleteGet= 'serviceGeoAutocompleteGet',
    geoCodingReferenceIdGet= 'serviceGeoCodingReferenceIdGet',
    geoCodingCoordinateGet= 'servicegeoCodingCoordinateGet',

    // maintenanceListServiceZoneGet = 'maintenanceListServiceZoneGet',
    maintenanceServiceZoneGet = 'maintenanceServiceZoneGet',
    maintenanceServiceGet = 'serviceMaintenanceGet',
    maintenanceClientFavoritesGet = 'serviceClientFavoritesMaintenanceGet',
    maintenanceClientFavoritesPost = 'serviceClientFavoritesMaintenancePost',
    maintenanceClientFavoritesDelete = 'serviceClientFavoritesMaintenanceDelete',
    maintenanceClientAddPost = 'serviceClientAddMaintenancePost',
    maintenanceClientEditPut = 'serviceClientEditMaintenancePut',

    maintenanceVehicleListGet = 'serviceVehicleListMaintenanceGet',
    maintenanceVehicleSearchListGet = 'serviceVehicleSearchListMaintenanceGet',
    maintenanceVehicleSavePost = 'serviceVehicleSaveMaintenancePost',
    maintenanceVehicleSavePut = 'serviceVehicleSaveMaintenancePut',
    maintenanceVehicleGet = 'serviceVehicleMaintenanceGet',
    maintenanceDocumentVehicleGet = 'serviceDocumentVehicleMaintenanceGet',
    maintenanceDocumentVehiclePut = 'serviceDocumentVehicleMaintenancePut',
    maintenanceDocumentVehiclePost = 'serviceDocumentVehicleMaintenancePost',
    maintenanceDocumentVehiclePutLimitSend = 'serviceDocumentLimitSendVehicleMaintenancePut',
    maintenanceOwnerVehicleSearchGet = 'serviceOwnerVehicleMaintenanceGet',
    maintenanceDocumentVehicleDelete = 'serviceOwnerVehicleMaintenanceDelete',
    maintenanceStatusDocumentVehiclePost = 'serviceStatusDocumentVehicleMaintenancePost',
    maintenanceVehicleAttributesGet = 'serviceAttributesVehicleMaintenanceGet',
    maintenanceVehicleAddAttributePost = 'serviceAddAttributesMaintenancePost',
    maintenanceVehicleDeleteAttributesDelete = 'serviceDeleteAttributesMaintenanceDelete',
    maintenanceVehicleListBrandsGet = 'serviceListBrandsMaintenanceGet',
    maintenanceVehicleListModelsGet = 'serviceListModelsMaintenanceGet',
    maintenanceVehicleMatchGet = 'serviceVehicleListMatchMaintenanceGet',
    maintenanceVehicleMatchCodeGet = 'serviceVehicleMatchCodeGet',
    maintenanceVehicleMatchLicensePlateGet = 'serviceVehicleMatchLicensePlateGet',

    maintenanceAutocompleteDriversGet = 'serviceAutocompleteDriversMaintenanceGet',
    maintenanceDriverListGet = 'serviceDriverListMaintenanceGet',
    maintenanceDriverSearchListGet = 'serviceDriverSearchListMaintenanceGet',
    maintenanceDriverSavePost = 'serviceDriverSaveMaintenancePost',
    maintenanceDriverSavePut = 'serviceDriverSaveMaintenancePut',
    maintenanceDriverGet = 'serviceDriverMaintenanceGet',
    maintenanceDocumentDriverGet = 'serviceDocumentDriverMaintenanceGet',
    maintenanceDocumentDriverPut = 'serviceDocumentDriverMaintenancePut',
    maintenanceDocumentDriverPutLimitSend = 'serviceDocumentLimitSendDriverMaintenancePut',
    maintenanceDocumentDriverPost = 'serviceDocumentDriverMaintenancePost',
    maintenanceDocumentDriverDelete = 'serviceOwnerDriverMaintenanceDelete',
    maintenanceStatusDocumentDriverPost = 'serviceStatusDocumentDriverMaintenancePost',
    maintenanceDriverSaveVehiclePost = 'serviceDriverSaveVehicleMaintenancePost',
    maintenanceDriverListVehicleGet = 'serviceDriverListVehicleMaintenanceGet',
    maintenanceDriverVehicleDelete = 'serviceDriverVehicleMaintenanceDelete',
    maintenanceDriverGetAutocompleteVehicle = 'serviceDriverAutocompleteVehicleMaintenanceGet',
    maintenanceDriverPostSanction = 'serviceDriverSanctionPost',
    maintenanceDriverGetState = 'serviceDriverStateGet',
    maintenanceDriverPostUnlock = 'serviceDriverUnlockPost',
    maintenanceDriverPostOrder = 'serviceDriverOrderPost',
    maintenanceDriverGetActivities = 'serviceDriverActivitiesGet',
    maintenanceDriverChangePasswordPut = 'serviceDriverChangePasswordPut',
    maintenanceDriverSaveImagePost = 'serviceDriverSaveImagePost',
    maintenanceDriverSaveGifPost = 'serviceDriverSaveGifPost',
    maintenanceDriverEndDayPost = 'serviceDriverEndDayPost',
    maintenanceDriverStartTheDayPost = 'serviceDriverStartTheDayPost',
    maintenanceDriverOccupiedPost = 'serviceDriverOccupiedPost',
    maintenanceDriverClosePost = 'serviceDriverClosePost',
    maintenanceDriversMatchGet = 'serviceDriverListMatchMaintenanceGet',
    maintenanceDriverMatchCodeGet = 'serviceDriverMatchCodeGet',
    maintenanceDriverMatchEmailGet = 'serviceDriverMatchEmailGet',
    maintenanceDriverMatchDocumentGet = 'serviceDriverMatchDocumentGet',

    maintenanceCompanyGet = 'serviceCompanyGet',
    maintenanceCompanyIdclientGet = 'maintenanceCompanyIdclientGet',
    maintananceCompanyListGet = 'serviceCompanyListGet',
    maintananceCompanyTypeControlGet = 'serviceCompanyTypeControlGet',
    maintananceCompanyTypeControlDynamicGet = 'serviceCompanyTypeControDynamiclGet',
    maintenanceCompanyDynamicFieldsGet = 'serviceCompanyDynamicFieldsGet',
    maintenanceCompanySaveDynamicFieldPost = 'serviceCompanySaveDynamicFieldPost',
    maintananceCompanyDynamicFieldDelete = 'serviceCompanyDynamicFieldDelete',
    maintenanceCompanySavePost = 'serviceCompanySavePost',
    maintenanceCompanyUpdatePatch = 'serviceCompanyUpdatePatch',

    maintenancecostCenterGet = 'serviceCostCenterGet',
    maintenanceCostCenterxIdGet = 'serviceCostCenterxIdGet',
    maintenanceCostCenterSavePost = 'serviceCostCenterSavePost',
    maintenanceCostCenterUpdatePut = 'serviceCostCenterUpdatePut',


    maintenanceAreaListModelsGet = 'serviceAreaGet',


    maintenanceAreaGet = 'serviceListAreaGet',
    maintenanceAreaSavePost = 'serviceAreaSavePost',
    maintenanceAreaUpdatePatch = 'serviceAreaUpdatePatch',

    masterdownloadGet = 'serviceMasterdownload',
    masterdownloadZoneGet = 'serviceMasterdownloadZone',

    userLoginPost = 'serviceUserLoginPost',
    userLoginPostCorporative = 'serviceUserLoginPostCorporative',
    userProfilePatch = 'serviceUserProfilePatch',
    userProfileGet = 'serviceUserProfileGet',
    userProfilePassword = 'serviceUserPasswordPatch',
    userNotificationsMessageDriversGet = 'serviceUserNotificationsMessageDriversGet',
    userConversationsGet = 'serviceUserConversationsGet',
    userConversationMessagesGet = 'serviceUserConversationMessagesGet',
    userConversationMessagesParametersGet = 'serviceUserConversationMessagesParametersGet',
    userConversationMessagesPost = 'serviceUserConversationMessagesPost',
    userNotificationsMessageDriversPost = 'serviceNotificationsMessageDriversPost',
    userNotificationsMessageZonePost = 'serviceNotificationsMessageZonePost',
    userConversationMessagesReadPost = 'serviceNotificationsMessageDriversReadPost',
    userAllGet = 'serviceUserAllGet',
    userIdGet = 'serviceUserIdGet',
    userIdPost = 'serviceUserIdPost',
    userIdPut = 'serviceUserIdPut',
    userIdPermissionsGet = 'serviceUserIdPermissionsGet',
    userIdPermissionsPut = 'serviceUserIdPermissionsPut',

    clientAllGet= 'serviceClientAllGet',
    clientChangePassword= 'serviceClientChangePassword',
    clientIdGet = 'serviceClientIdGet',
    clientIdPost = 'serviceClientIdPost',
    clientIdPut = 'serviceClientIdPut',
    clientIdPermissionsGet = 'serviceClientIdPermissionsGet',
    clientIdPermissionsPut = 'serviceClientIdPermissionsPut',

    driversAvailablePointGet = 'serviceDriversAvailablePointGet',
    driversAvailableServicetGet = 'serviceDriversAvailableServiceGet',
    driversTrackingGet = 'serviceDriversTrackingGet',

    currenstatesDriverGet = 'serviceCurrenstatesDriverGet',
    currenstatesDriverLastLocationGet = 'serviceCurrenstatesDriverLastLocationGet',
    currenstatesDriverLastserviceGet = 'serviceCurrenstatesDriverLastserviceGet',
    
    PermissionsGet = 'servicePermissionsGet',
    PermissionsTemplateGet = 'servicePermissionsTemplateGet',
    
    driverLoginCellphonePost = 'serviceDriverLoginCellphonePost',
    driverLoginEmailPost = 'serviceDriverLoginEmailPost',
    driverRegisterPost = 'serviceDriverRegisterPost',
    driverVerifyPost = 'serviceVerifyPost',
    driverResendPinPost = 'serviceResendPinPost',
    driverProfileGet = 'serviceDriverProfileGet',
    driverRegisterVehiclePost = 'serviceDriverRegisterVehiclePost',
    driverGetDocumentsGet = 'serviceDriverGetDocumentsGet',
    driverSaveDocumentPut = 'serviceDriverSaveDocumentPost',    
    driverVehicleGet = 'serviceDriverVehicleGet',
    driverVehicleGetDocumentsGet = 'serviceVehicleDriverGetDocumentsGet',
    driverVehicleSaveDocumentPut = 'serviceVehicleSaveDocumentGet',

    reportServiceGet = 'serviceReportServiceGet',
    reportExportXlXSGet = 'serviceReportExportXlsxGet',
    reportClientByCompanyGet = 'serviceReportClientByCompanyGet',

    myCompany = '',
    logoCompany = '',
    statesColor = '',
    /*MaintenanceZone */   
    maintenanceZoneSavePost = 'maintenanceZoneSavePost', // se cambiará el valor
    maintenanceZoneSavePut = 'maintenanceZoneSavePut', // se cambiará el valor
    maintenanceZoneGet = 'maintenanceZoneGet',


    // mantenedor solicitar servicio corporativo 
    maintenanceAutocompletePersonalGet = 'maintenanceAutocompletePersonalGet',

}

export interface ServiceInterface {
    // structService: StructService
    // statusCODE: StatusCODE
    requestService(structService: StructService, routeService: RouteService, json?: any): any
    resultOfResponse(structService: StructService, routeService: Observable<any>): Promise<any>
}
