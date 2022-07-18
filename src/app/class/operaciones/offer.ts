import { Vehicle } from '../vehicle';
import { CurrencyType } from '../currencyType';


export class Request_Offer {
    clientId?: string;
    companyId?: string;
    paymentTypeId?: number;
    origin ?: string;
    destinations ?: string;
    // destination_latitude?: number;
    // destination_longitude?: number;

}

export class  Response_Offer {
    offerBasedOnPayment?: OfferBasedOnPayment;
    paymentAvailable?: PaymentAvailable[];
    offers?: Offers[];
}


export class OfferBasedOnPayment {
    description?: string;
    id?: number;
    name?: string;
}

export class PaymentAvailable {
    description?: string;
    id?: number;
    name?: string;
}

export class Offers {
    categoryType?: GeneralObj;  //categoria
    currencyType?: CurrencyType;  //currency
    detailsPrice?: DetailsPrice[];    //detalles de precio
    distanceTrip?: number;    //distancia del viaje
    estimatedTime?: number;    //tiempo estimado
    polylineRoute?: string;
    priceAvailableOnOnlyServiceFinish?: boolean;    // precio disponible solo en servicio finalizado
    priceEstimate?: number;    //precio estimado
    referenceId?: string;    // id referencia
    serviceType?: ServiceType;    //tipo de servicio
    vehicleType?: Vehicle;    //tipo de vehiculo
    destinationsPrice?: number[];    // precio 
}

export class DetailsPrice {
    value?: string;
    id?: number;
    name?: string;
}

export class GeneralObj {
    description?: string;
    id?: number;
    name?: string;
}

export class ServiceType {
    cargoPhotoMax?: number;
    cargoPhotoMin?: number;
    description?: string;
    destinationsMax?: number;
    destinationsMin?: number;
    id?: number;
    isCargo?: boolean;
    isCourier?: boolean;
    name?: string;
}
