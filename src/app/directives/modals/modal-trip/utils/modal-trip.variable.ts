import { Subscription } from "rxjs";
import { ValidateStructureButton } from "src/app/class/enum/enumEstados";
import { PlaceHolderAutoComplete } from "src/app/class/placeHolderAutocomplete";
import { IdTrip } from "src/app/class/typesKeyword";
import { COMPANY_PARTICULAR_ID } from "src/app/class/varKerword";
import { RouteService, StructService } from "src/app/util/serviceService/serviceStruct";
import { environment } from "src/environments/environment";

export class ModalTripVariable{
    idParticular = COMPANY_PARTICULAR_ID;
    hiddenCoverage: boolean = environment.CONFIGURATION.TRAVEL_MODAL.HIDDEN_COVERAGE;
    hiddenTypeReceipt: boolean = environment.CONFIGURATION.TRAVEL_MODAL.TYPE_RECEIPT;
    hiddenClientInformation: boolean = environment.CONFIGURATION.TRAVEL_MODAL.CLIENT_INFORMATION;
    structServiceCode: any = StructService.CODE;
    structServiceArray: any = StructService.ARRAY;
  
    flagShowRutina: boolean = false;
  
    //#region variables  
    asignarViaje: boolean = true;
          
    //Empresa 
    routeServiceEmpresa = RouteService.maintenanceServiceGet
  
    //Cliente 
    routeServiceCliente = RouteService.distpatchClientSearchGet
          
    // Offers  
    placeHolderCliente: string = PlaceHolderAutoComplete.plh_CellPhoneAutocomplete;
    placeHolderEmpresa: string = PlaceHolderAutoComplete.plh_Empresa;
   
  
    //#region Traduccion
    tittleOrigen: string = 'Origen';
    tittleDestino: string = 'Destino';
    numberTrip: string = 'El viaje ';
    msjOfferSuccess: string = 'Fue ofertado correctamente';

    //#endregion Traduccion
  
    //#region StructuredBotton
    // validateViaje: ValidateStructureButton = ValidateStructureButton.NO_V;
    // validateViajeRetained: ValidateStructureButton = ValidateStructureButton.NO_V;
    routeServicePost: any = RouteService.distpatchServicePost;
    routeServicePut: any = RouteService.distpatchServicePut;
    //#endregion StructuredBotton
  
    //#region StructuredBottonOffer
    routeServiceOffer: any = RouteService.distpatchServiceOfferPost;
    //#endregion StructuredBottonOffer
  
    //#region StructuredCancel
    routeServicevalidateCancel: any = RouteService.distpatchServiceCancelReasonsGet;
    subscriptionCancel?: Subscription;
    //#endregion StructuredCancel
  
    //#region RetirarMovil
    routeServicevalidateRemoveDriver: any = RouteService.distpatchServiceUnassignReasonsGet;
    subscriptionRemoveDriver?: Subscription;
    //#endregion RetirarMovil
    
    //#endregion variables
  
    //#region Client
    routeServiceClientTripSumary: any = RouteService.distpatchClientTripSumaryGet;
    routeServiceClientTripDestination: any = RouteService.distpatchClientTripDestinationGet;
    routeServiceClientAdd: any = RouteService.distpatchCliendAddPost;
    routeServiceClientEdit: any = RouteService.distpatchCliendEditPut;
    //#endregion Client  
    constructor(){}


    routeToUse(IdTrip:IdTrip):RouteService{
        if(IdTrip){
            return this.routeServicePut
        } else {
            return this.routeServicePost
        }
    }
}