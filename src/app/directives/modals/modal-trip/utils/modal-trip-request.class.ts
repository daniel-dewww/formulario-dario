import { IdClient, IdDriver, IdEmpresa, IdGeneric, IdPassenger, IdTrip, IdVehicle, Telefono } from "src/app/class/typesKeyword";

export interface ResponseCreateTrip {
    routineId?: number;
    services?: any[]
}

export class RequestTrip {
    client?: MT_RequestClient;
    company?: MT_RequestCompany;
    costCenter?: MT_RequestCostCenter;
    coverage?: MT_RequestCoverage;
    currencyType?: MT_RequestCurrencyType;

    dateAssignment?: Date;
    dateContact?: Date;
    dateEnd?: Date;
    dateReading?: Date;
    dateStart?: Date;

    destinations?: MT_RequestDestinations[];
    distance?: number;
    driver?: MT_RequestDriver;
    exigent?: boolean;
    fixedRate?: boolean;
    id?: IdTrip;
    isImmediate?: boolean;
    modeReserve?: MT_RequestModeReserve;
    observationClient?: string;
    observationInternal?: string;
    observationService?: string;
    passenger?: MT_RequestPassenger[];
    paymentAbono?: number;
    paymentCard?: number;
    paymentCash?: number;
    paymentCredit?: number;
    paymentType?: MT_RequestPaymentType;
    phoneNumberReceived?: string;
    placePickUpEntranceId?: IdGeneric;
    receiptNumber?: string;
    requireAirConditioning?: boolean;
    requireAmpleTrunk?: boolean;
    routineId?: IdTrip;
    routinePrograms?: MT_RequestRoutinePrograms[];
    serviceDateTime?: string | Date;
    serviceType?: MT_RequestServiceType;
    serviceVehicleAttribute?: number[];
    statusType?: MT_RequestStatusType;

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
    typeReceipt?: MT_RequestTypeReceipt;
    uuid?: string;

    vehicle?: MT_RequestVehicle;
    vip?: boolean;

    isRetained?: boolean;
}

export class MT_RequestClient {
    cellPhone?: string;
    costCenter?: MT_RequestCostCenter;
    document?: string;
    countryCode?: string;
    documentType?: MT_RequestDocumentType;
    email?: string;
    exigent?: boolean;
    firstLastName?: string;
    firstName?: string;
    id?: IdClient;
    jobTitle?: string;
    secondLastName?: string;
    vip?: boolean;
    uuid?: string;
    observation?: string;
}

export class MT_RequestCompany {
    businessName?: string;
    id?: IdEmpresa;
    tradeName?: string
    uuid?: string;
}

export class MT_RequestCostCenter {
    id?: IdGeneric;
    name?: string;
}

export class MT_RequestDocumentType {
    id?: IdGeneric;
    name?: string;
}

export class MT_RequestCoverage {
    id?: number;
}

export class MT_RequestCurrencyType {
    code?: string;
    id?: IdGeneric;
    name?: string;
    symbol?: string
    enable?: boolean
}

export class MT_RequestDestinations {
    costDestination?: number;
    dateContact?: Date;
    dateEnd?: Date;
    dateStart?: Date;
    destination?: MT_RequestDestination;
    id?: number;
    origin?: MT_RequestDestination;
    passenger?: MT_RequestPassengerDestination[];
    uuid?: string;
    timeWait?: number;
    totalWait?: number;
    kilometres?: number;
}

export class MT_RequestDestination {
    // address?: string;
    addressMainText?: string;
    addressSecondaryText?: string;
    latitude?: number;
    longitude?: number;
    number?: number;
    reference?: string;
    zoneDescription?: string;
    zoneId?: number;
};

export class MT_RequestPassengerDestination {
    id?: IdPassenger; //idDel pasajero en el servicio
    isDropOff?: boolean; // true bajar - false subir
}

export class MT_RequestDriver {
    code?: string;
    countryCode?: string;
    firstLastName?: string;
    firstName?: string;
    id?: IdDriver;
    uuid?: string;
    phoneNumber?: Telefono;
    secondLastName?: string;
}

export class MT_RequestModeReserve {
    id?: IdGeneric;
    name?: string;
}

export class MT_RequestPassenger {
    firstLastName?: string;
    firstName?: string;
    id?: IdPassenger;
    secondLastName?: string;
    countryCode?: string;
    cellPhone?: Telefono;
    clientId?: IdClient;
}

export class MT_RequestPaymentType {
    id?: IdGeneric;
    name?: string;
    description?: string;
}

export class MT_RequestRoutinePrograms {
    quantityVehicle?: number;
    returnDateTime?: string | Date;
    serviceDateTime?: string | Date;
}

export class MT_RequestServiceType {
    id?: IdGeneric;
    name?: string;
    description?: string;
}

export class MT_RequestStatusType {
    id?: IdGeneric;
    name?: string;
    description?: string;
}

export class MT_RequestTypeReceipt {
    id?: IdGeneric;
    name?: string;
    description?: string;
}

export class MT_RequestVehicle {
    code?: string;
    colorHex?: string;
    id?: IdVehicle;
    uuid?: string;
    licensePlate?: string;
    model?: MT_RequestModelVehicle
}

export class MT_RequestModelVehicle {
    brand?: MT_RequestBrand;
    id?: number;
    name?: string;
}

export class MT_RequestBrand {
    id?: IdGeneric;
    name?: string;
    description?: string;
}