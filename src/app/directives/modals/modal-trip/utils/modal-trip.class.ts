import { IdGeneric, IdTrip } from "src/app/class/typesKeyword";

export interface ModalTrip{
    idModal: string

    id?: IdTrip;
    uuid?: string;

    statusType?:MT_StatusType;
}


export class MT_StatusType {
    id?: IdGeneric;
    name?: string;
    description?: string;
}
