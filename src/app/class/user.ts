export class AccessUser{
    name?: string;
    password?: string;
    deviceId?:string;
    isEncrypted?:boolean;
    email?:string;  
}

export class AccessDriver {
    cellPhone?: string;
    email?: string;
    password?: string;
    countryCode?: string;
}

export class User{
    enable?: boolean;
    id?: number;
    name?: string;
    uuid?: string;
    firstName?: string;
    firstLastName?: string;
    secondLastName?: string;
    genderId?: number;
    email?: string;
    urlPhoto?: string;
}

export class UserDriver{
    enable?: boolean;
    id?: number;
    name?: string;
    uuid?: string;
    firstName?: string;
    firstLastName?: string;
    secondLastName?: string;
    genderId?: number;
    email?: string;
    cellPhone?: string;
    countryCode?: string;
    verifyId?: string;
    urlPhoto?: string;
}
