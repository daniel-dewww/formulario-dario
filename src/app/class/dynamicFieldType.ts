export class Company {
    id?: number;
    businessName?: string;
    companyClientCreditType ?: companyClientCreditType;
    enable?: boolean;
    ruc?: string;
    tradeName?: string;
    uuid?: string;
    jobTitle?: string;
}

export class companyClientCreditType {
    creditLine?: number;
    creditType ?: creditType;
    enable?: boolean;
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
    type?:string;
    values?:Elements[];
    value?:string;
}

export enum TypeControl{
    OPEN = 58,
    CLOSED = 59
}