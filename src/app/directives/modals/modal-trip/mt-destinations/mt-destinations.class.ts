import { TipoPasajero } from "src/app/class/enum/enumTipoPasajero";
import { CoordenadasLatLng, IdClient, IdEmpresa, IdFavorite, IdGeneric, 
    IdPassenger, Telefono } from "src/app/class/typesKeyword";

export class MT_DateStatus{    
    dateAssignment?: Date;
    dateContact?: Date;
    dateEnd?: Date;
    dateReading?: Date;
    dateStart?: Date;    

    frontDateAssignment?: string;
    frontDateContact?: string;
    frontDateEnd?: string;
    frontDateReading?: string;
    frontDateStart?: string;
}

export class MT_Destinations extends MT_DateStatus{
    costDestination?: number;
    destination?: MT_Destination;
    id?: number;
    uuid?: string;
    origin?: MT_Destination;
    passenger?: MT_PassengerDestination[];
    timeWait?: number;
    totalWait?: number;

    frontTotalViaje?:number;
    frontShowInfoDestino?: boolean;
    kilometres?: number;
    constructor(){
        super();
    }
}

export class MT_Destination {
    addressMainText?: string;
    addressSecondaryText?: string;
    latitude?: number;
    longitude?: number;
    number?: number;
    zoneDescription?: string;
    zoneId?: number;
    reference?: string;
}

export class MT_ResponseGeoAutocomplete {
    containsCoordinate?: boolean;
    coordinate?: MT_Coordinate;
    mainText?: string;
    provider?: string;
    referenceId?: string;
    secondaryText?: string;
    zone?: MT_GenericObject; // id + description    
    
    favorito?: boolean; 
    favoritoJson?: MT_Favorite; 
  }

export class MT_Coordinate {
    latitude?: CoordenadasLatLng;
    longitude?: CoordenadasLatLng
}

export class MT_Favorite{
    alias?: string; //post
    clientId?: IdClient; //post
    companyClientId?: IdEmpresa; //post
    createdDate?: Date;
    createdUser?: string;
    enable?: true;
    id?: IdFavorite;
    latitude?: number; //post
    longitude?: number; //post
    mainText?: string; //post
    modificatedDate?: Date;
    modificatedUser?: string;
    secondaryText?: string; //post
    zone?: MT_GenericObject;
}

export class MT_PassengerDestination{    
    id?: IdPassenger; //idDel pasajero en el servicio
    isDropOff?: boolean; // true bajar - false subir
}

export class MT_RequestGeoAutocomplete {
    key_word?: string;
    longitude?: CoordenadasLatLng;
    latitude?: CoordenadasLatLng
}

export class MT_ChangePosition{    
    index?: number; 
    lstDestination?: MT_Destination[];
}

export class MT_Passenger {
    firstLastName?: string;
    firstName?: string;
    id?: IdPassenger; //idDel pasajero en el servicio
    secondLastName?: string;
    countryCode?: string;
    cellPhone?: Telefono;
    clientId?: IdClient; // Id del cliente Cuando es de empresa
}

export class MT_PassengerFront {
    id?: IdPassenger; //idDel pasajero en el servicio
    firstName?: string;
    firstLastName?: string;
    secondLastName?: string;
    cellPhone?: Telefono;
    clientId?: IdClient;
    countryCode?: Telefono;// Id del cliente Cuando es de empresa
  
    //front
    frontTipoPasajeroSubida?: string;
    frontTipoPasajeroBajada?: string;
    frontTipoPassenger?: TipoPasajero;  
    frontPasajeroEmpresaInit?: MT_Client
}

export class MT_Client {
    costCenter?: MT_GenericObject;
    document?: string;
    documentType?: DocumentType;
    exigent?: boolean;
    firstLastName?: string;
    firstName?: string;
    id?: IdClient;
    jobTitle?: string;
    secondLastName?: string;
    vip?: boolean;
    email?: string;
    cellPhone?: string;
    uuid?: string;
    observation?: string;
    
    company?: MT_Company;
    fontTradeName?: string;
    countryCode?:string;
    isClient?: boolean;
}

export class MT_DocumentType{
    id?: IdGeneric;
    name?: string;
    document?: string;
}

export class MT_Company{
    businessName?: string;
    id?: IdEmpresa;
    tradeName?: string
    uuid?: string;
}

export class MT_GenericObject{
    id?: IdGeneric;
    name?: string;
    description?: string;
    color?: string;
    shortCut?: string;
}