import { IdTrip} from '../typesKeyword';
import { Client } from '../cliente';
import { Driver } from '../driver';
import { Passenger } from '../passenger';
import { GenericObject } from '../genericObject';
import { Attribute, Vehicle } from '../vehicle';
import { Destinations } from '../destinations';
import { CurrencyType } from '../currencyType';


export class ViajeOpe {
    client?: Client;
    companyName?: string;
    driver?: Driver;
    exigent?: boolean;
    fixedRate?: boolean;
    idService?: IdTrip;
    uuidService?: string;
    passenger?: Passenger[];
    serviceDateTime?: Date;
    statusType?: GenericObject;
    serviceType? : GenericObject;
    paymentType? : GenericObject;
    currencyType?: CurrencyType;
    vehicle?: Vehicle;
    vip?: boolean;
    totalService?: number;
    price?: number;
    destinationZone?: string;
    originZone?: string;
    destinations?: Destinations[];
    isRetained?: boolean;


    //valores q usa solo el front
    idGroup?: number;
    colorGroup?: string;
    frontShowDetails?: boolean;
    timeDispatch?: any;

    serviceAttribute?: Attribute[];
    vehicleAttribute?: Attribute[];
    companyAttribute?: Attribute[];
    id? : string
    shortId? : number
    company?:Company
    pickup?:Pickup
}
export class Pickup {
    id?: string;
    latitude?: number;
    longitude?: string;
    mainText?: string;
    secondaryText?: string; 
}
export class Company {
    tradeName?: string;
    businessName?: string;
    id?: string;
}
export class changePositionMarker {
    index?: number;
    marker?: google.maps.Marker;
    lstMarker?: google.maps.Marker[];
}

export class ResponseLstTravel{
    result?: ViajeOpe[];
    totalRecords?: number;
}
