import { GeneralObj } from "./operaciones/offer";

export class DocumentType {
    id?: number;
    enable?: boolean;
    name?: string;
    description?: string;
    emittedAt?: Date;
    expireAt?: Date;
    value?: string;
}

export class DocumentUpload{
    id?: number;
    captures?: string[];
    typeDocument?: DocumentType;
    name?: string;
    description?: string;
    emittedAt?: Date;
    expireAt?: Date;
    isOptional?: boolean;
    result?: ResultDocument;
    value?: string;
    limitSendingAt?: Date;
    
    useVehicle?: GeneralObj;
    idVehicleFront?: number;
}

export class ResultDocument {
    code?: string;
    comment?: string;
    description?: string;
    name?: string;
}

export class ListDocument {
    idDriver?: number;
    listDocumentDriver?: RegisterDocument[];
    listDocumentVehicle?: RegisterDocument[];
}

export class RegisterDocument {
    id?: number;
    type?: string;
    status?: string;
    name?: string;
}


export enum DocumentTypeEnum {
    DNI = 12,
    PTP = 13,
    Carnet_de_Extranjeria = 14,
    Pasaporte = 15
}

