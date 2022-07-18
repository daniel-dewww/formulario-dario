import { Contact } from './contact';
import { Passenger } from './passenger';
import { DateStatus } from './genericObject';
import { IdPassenger } from './typesKeyword';

export class Destinations extends DateStatus{
    // contact?: Contact;
    costDestination?: number;
    destination?: Destination;
    id?: number;
    uuid?: string;
    origin?: Destination;
    passenger?: PassengerDestination[];
    timeWait?: number;
    totalWait?: number;
    totalParking?: number;
    totalToll?: number;
    mainText?: string;
    frontTotalViaje?:number;
    frontShowInfoDestino?: boolean;
    kilometres?: number;
    constructor(){
        super();
    }
}


export class Destination {
    // address?: string;
    addressMainText?: string;
    addressSecondaryText?: string;
    latitude?: number;
    longitude?: number;
    number?: number;
    zoneDescription?: string;
    zoneId?: number;
    reference?: string;
};


export class PassengerDestination{    
    id?: IdPassenger; //idDel pasajero en el servicio
    isDropOff?: boolean; // true bajar - false subir
}

export class ChangePosition{    
    index?: number; 
    lstDestination?: Destination[];
}


// export class Origin {
//     address?: string;
//     latitude?: number;
//     longitude?: number;
//     number?: number;
//     zoneDescription?: string;
//     zoneId?: number
// }


