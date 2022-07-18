import { Company } from './company';
import { IdCenterCost, IdClient, IdEmpresa } from './typesKeyword';


export class CenterCost {
    codeName1?: string;
    codeName2?: string;
    codeName3?: string;
    company?: Company;
    description?: string
    id?: IdCenterCost
    name?: string;
}


export class RequestDistpatchCenterCost {
    client_id?: IdClient;
    company_id?: IdEmpresa;
}

