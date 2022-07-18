import { environment } from 'src/environments/environment';
import { ServiceTypeEnum } from './enum/enumServiceType';
import { IdGeneric } from './typesKeyword';

export class ServiceType{
    id?: IdGeneric;
    name?: string;
    description?: string;
    color?: string;
    enable?: number;

    calculationTypeId?: number;
    categoryTypeId?: number;
    vehicleTypeId?: number;
}
export function statusTypeService(enumState: ServiceTypeEnum) {
    switch (enumState) {
        case ServiceTypeEnum.ELITE:
            return  environment.IMAGES_AUTO.ELITE
        case ServiceTypeEnum.COURIER:
            return  environment.IMAGES_AUTO.COURIER
        case ServiceTypeEnum.ESTANDAR:
            return  environment.IMAGES_AUTO.ESTANDAR
        case ServiceTypeEnum.VAN:
            return  environment.IMAGES_AUTO.VAN
        case ServiceTypeEnum.CARGA:
            return  environment.IMAGES_AUTO.CARGA
        default:
            return  environment.IMAGES_AUTO.ESTANDAR
    }
}