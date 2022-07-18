import { week } from "../client/client.class";
import { Credit } from "../user/user.class";

export class Company {
    id?: any;
    businessName?: string;
    companyClientCreditType ?: companyClientCreditType = new companyClientCreditType();
    // costCenter?: CostCenter = new CostCenter();
    credit ?: Credit = new Credit();
    editableCC?: boolean;
    enable?: boolean;
    ruc?: string;
    tradeName?: string;
    uuid?: string;
    jobTitle?: string;
    profile ?: string;

}

export class companyClientCreditType {
    days ?: week = new week();
    creditLine?: number;
    creditType ?: creditType = new creditType();
    enable?: boolean;
    payment_date_type?:string;

}

export class creditType {
    code ? : string;
    enable? : boolean;
    name? : string;
}

export class ResultCompany {
    results?: Company[];
    totalRecords?: number;
}

export class CostCenter {
    id ?: number;
    description ?: string;
    codeName3?: string;
    codeName2?: string;
    codeName1?: string;
    company ?: Company;
    areaId ?:number;
    oldCenterCostId?:number;
    enable?:boolean;
    credit ?: Credit = new Credit();
    editableCC?: boolean
}

export class ResultCostCenter {
    CostCenter ?: CostCenter[];
}
export class DynamicField {
    id?: number;
    companyClient?: number;
    description?: string;
    isRequired?: boolean;
    name?: string;
    type?: string;
    order?: number;
    values?: Elements[];
    dynamicFieldType?: DynamicFieldType;
}

export class Elements {
    code?: string;
    value?: string;
}

export class DynamicFieldType {
    id?: number;
    code?: string;
    name?: string;
}

export enum TypeControl{
    OPEN = 58,
    CLOSED = 59
}