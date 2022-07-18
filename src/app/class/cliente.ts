import { GenericObject } from './genericObject';
import { IdClient, IdGeneric } from './typesKeyword';
import { Company } from './company';

export class Client {
    costCenter?: GenericObject;
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
    
    company?: Company;
    fontTradeName?: string;
    countryCode?:string;
    isClient?: boolean;
}

export class DocumentType{
    id?: IdGeneric;
    name?: string;
    document?: string;
}