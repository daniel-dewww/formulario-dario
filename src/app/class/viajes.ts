import * as Types from './typesKeyword';
import { Client } from './cliente';
import { Company } from './company';
import { GenericObject, DateStatus } from './genericObject';
import { Driver } from './driver';
import { Passenger } from './passenger';
import { Vehicle } from './vehicle';
import { Destinations } from './destinations';
import { RoutinePrograms } from './routinePrograms';
import { CurrencyType } from './currencyType';
import { PaymentType } from './paymentType';
import { CenterCost } from './centerCost';
import { Coverage } from './coverages';
import { ServiceType } from './serviceType';
import { IdEmpresa } from './typesKeyword';


export class Viaje extends DateStatus {
    client?: Client;
    company?: Company;
    pickup ?: any;
    price ?: number
    location?: any;
    // contact?: Contact;
    // costCenter?: GenericObject;
    costCenter?: CenterCost;
    coverage?: Coverage;
    currencyType?: CurrencyType;
    destinations?: Destinations[];
    distance?: number;
    driver?: Driver;
    exigent?: boolean;
    fixedRate?: boolean;
    id?: Types.IdTrip;
    modeReserve?: GenericObject;
    observationClient?: string;
    observationInternal?: string;
    observationService?: string;
    passenger?: Passenger[];
    paymentAbono?: number;
    paymentCard?: number;
    paymentCash?: number;
    paymentCredit?: number;
    paymentType?: PaymentType;
    requireAirConditioning?: boolean;
    requireAmpleTrunk?: boolean;
    receiptNumber?: string;
    routineId?: number;
    routinePrograms?: RoutinePrograms[];
    serviceType?: ServiceType;
    statusType?: GenericObject;
    totalAirconditioning?: number;
    totalCarseat?: number;
    totalCharge?: number;
    totalCourier?: number;
    totalDestination?: number;
    totalDeviation?: number;
    totalDiscount?: number;
    totalDisplacement?: number;
    totalOther?: number;
    totalParking?: number;
    totalService?: number;
    totalStop?: number;
    totalToll?: number;
    totalWait?: number;
    typeReceipt?: GenericObject;
    uuid?: string;
    vehicle?: any;
    vip?: boolean;
    phoneNumberReceived?: string;

    serviceDateTime?: string | Date;
    serviceVehicleAttribute? : number[];

    //actualizar con dato del servidor
    rutina?: Date[];
    retorno?: Date[]
    shortId? : number
    frontDateTime?: Date;
    frontServiceDateTime?: string;
    frontFullName?: string;
    frontEmail?: string;
    frontClient?: Client;
    frontCompanyId?: IdEmpresa;
    frontIsClient?: boolean;

    isImmediate?:boolean;
    isRetained?: boolean;
    cargoInfo? : CargoInfo;
    dynamicFields?: ResponseDynamicFields[];

    courierInfo? : CourierInfo
    dateTime?: string | Date;
    clientId?: string;
    companyId?: string;
    forOtherUser? : ForOtherUser
    immediate? : boolean
    placePickUpEntranceId? : number 
    referenceId? : string 
    constructor() {
        super();
    }
}

export class ResponseCreateViaje {
    routineId?: number;
    services?: any[]
}
export class CargoInfo{
    description? : string;
    noHelpers? : number;
    noLevelDestination? : number;
    noLevelOrigin? : number;
}

export class CourierInfo{
    cellphone? : string;
    countryCode? : string;
    firstName? : string;
    isReceiver? : boolean;
}
export class ForOtherUser{
    cellphone? : string;
    countryCode? : string;
    firstLastName? : string;
    firstName? : string;
    secondLastName? : string;
}

export class DynamicFields {
    id?: number;
    name?: string;
    description?: string;
    type?: string;
    values?: Value[];
    isRequired?: boolean;
}

export class ResponseDynamicFields {
    id?: number;
    value?: string;
    isRequired?: boolean;
}

export class Value {
    code?: string;
    value?: string;
}
