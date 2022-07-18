import { Coverage } from './coverages';
import { DocumentUpload } from './documentType';
import { GenericObject } from './genericObject';
import { GeneralObj } from './operaciones/offer';
import { IdGeneric, IdVehicle } from './typesKeyword';

export class Vehicle {
    code?: string;
    colorHex?: string;
    id?: IdVehicle;
    uuid?: string;
    make ?: string;
    licensePlate?: string;

    attribute?: Attribute[];

    model?: ModelVehicle

    enable?: boolean;
    numberPassenger?: number;
    name?: string;

    vehicleType?: VehicleType;
    observation?: String;
    yearProduction?: string;

    fuelType?: GenericObject;
    insurance?: Insurance;
    ownerShipType?: GenericObject;
    proprietor?: GenericObject;
    setaca?: GenericDocument;
    setame?: GenericDocument;
    technicalRevision?: GenericDocument;
    urlPhoto?: string;    
    coverage?: Coverage;
    businessUnit?: GeneralObj;
    serviceTypesSupport?: number[];

    brandFront?: string;
    modelFront?: string;
}

export class Model extends GenericObject {
    brand?: GenericObject;

    constructor() {
        super();
    }
}

export class ModelVehicle {
    id?: number;
    vehicleBrandId?: number;
    name?: string;
    enable?: boolean;
    
    brand?: GenericObject;
 }

export class VehicleType {
    id?: number;
    name?: string;
    numberPassenger?: number;
}

export class RequestLstVehicle {
    page?: number;
    page_size?: number;
}

export class ResponseLstVehicle {
    results?: Vehicle[];
    totalRecords?: number;
}

export class Attribute{
    id?: IdGeneric;
    name?: string;
    shortcut?: string;
    enable?: boolean;
        
    tipo?: string;
    value?: string;

    fontTypeAtributte?: TypeAtribute
}

export enum TypeAtribute{
    VEHICLE = "VEHICLE",
    SERVICE = "SERVICE",
    COMPANY = "COMPANY"
}

export class Insurance {
    insuranceDateEnd?: Date;
    insuranceDateStart?: Date;
    insuranceNumber?: string;
    insuranceType?: GenericObject;
}

export class GenericDocument {
    dateStart?: Date;
    dateEnd?: Date;
}

export class AutocompleteVehicle2 {
    id?: number;
    brand?: string;
    code?: string;
    fuelType?: string;
    licencePlate?: string;
    model?: string;
    numberPassenger?: number;
    ownerShipType?: string;
    vehicleType?: string;
    yearProduction?: string;
}

export class AutocompleteVehicle {
    isCoincidence?: boolean;
    listMatch?: ListMatchVehicle[];
}

export class ListMatchVehicle {
    id?: number;
    code?: string;
    enable?: true;
    licensePlate?: string;
}

export class BasicVehicle {
    idDriver?: number;
    brandId?: number;
    modelId?: number;
    licensePlate?: string;
    colorHex?: string;
    yearProduction?: string;
}

export class VehicleDocument {
    idDriver?: number;
    vehicle?: Vehicle;
    documents?: DocumentUpload[];
}