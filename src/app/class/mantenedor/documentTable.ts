import { GenericObject } from '../genericObject';

export class DocumentMaintainer {
    id?: number
    typeDocument?: GenericObject;
    expirationDate?: Date;
    state?: GenericObject;
    edit?:boolean;
    delete?:boolean;
}