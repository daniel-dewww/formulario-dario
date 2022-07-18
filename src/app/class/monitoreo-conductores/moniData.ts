import { Coordinate } from '../class-directive/serviceGeo';
import { Driver } from '../driver';
import { PaymentType } from '../paymentType';
import { ServiceType } from '../serviceType';
import { StatusType } from '../statusType';
import { IdTrip} from '../typesKeyword';
import { Attribute, Vehicle } from '../vehicle';

// export class C_MoniData {
//     latitud? : number;
//     longitud? : number;
//     idConductor? : string;
//     conductor? : string;
//     idVehiculo? : string;
//     idEstado? : number; // statusDriverId
//     colorHex?: string;
//     idEmpresa?: number; --no necesario
//     checkData?: boolean;
//     vehicleTypeId?: number
// }

export class C_MoniData{
    driver?: Driver;
    location?: Coordinate;
    vehicle?: Vehicle;
    service?: Viaje_MoniData;

    frontCheckData?:boolean;
    companyAttributes?: Attribute[];
    serviceAttributes?: Attribute[];
    vehicleAttributes?: Attribute[];
}

export class Viaje_MoniData{
    id?: IdTrip;
    statusType?: StatusType;
    serviceType?: ServiceType;
    paymentType?: PaymentType;
    serviceDateTime?: Date | string;
    timeMinute?: number;
    
    frontServiceDateTime?: Date;
}

export enum ColorStatusLablelMarker{
    STATUS_DRIVER = 'STATUS_DRIVER',
    STATUS_TRAVEL = 'STATUS_TRAVEL',
    STATUS_GROUP_TRAVEL = 'STATUS_GROUP_TRAVEL'
}

// export enum LabelDefault{
//     STATUS_DRIVER = 'STATUS-DRIVER',
//     STATUS_TRAVEL = 'STATUS-TRAVEL'
// }