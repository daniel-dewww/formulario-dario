export class C_OpeBusqueda {
    search_type? : string;
    key_word? : string;
    // status_type_id : string;

    date_start? : string;
    date_finish?: string;

    lstStatus_type_id?: number[];
    lstAttributes?: number[];
    lstAttributesService?: number[];
    lstAttributesCompany?: number[];
    lstAttributesVehicle?: number[];
    lstPaymentType?: number[];

    nofilterByDate?:boolean;

    page?:number;
    page_size ?:number;


    busquedaAutomatica?: boolean
    client_id?: string 
}

export class C_SearchTravel {
    search_type?: string;
    key_word?: string;
    
    client_id?: number;
    company_id?: number;
    driver_id?: number;
    vehicle_id?: number;

    status_type_id?: number[];
    vehicle_attribute_id?: number[];
    service_attribute_id?: number[];
    company_attribute_id?: number[];
    service_type_id?: number[];
    payment_type_id?: number[];
    
    date_start?: string;
    date_finish?: string;

    page?:number;
    page_size?:number;
}

export class C_OpeBusqueda_Form {
    search_type?: number;
    key_word?: string;
    status_type_id?: number;
    lstAttributes?: number[];
    date_start?: Date;
    time_start?: string;
    finish_date?: Date;
    finish_time?: string;
}

export enum TypeSearchLstTravel{
    ALL = '-1',
    TRAVEL = '1',
    VEHICLE = '2',
    DRIVER = '3',
    USER = '4',
    COMPANY = '5',
    EMAIL = '6'
}