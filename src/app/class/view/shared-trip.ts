import { Coordinate } from '../class-directive/serviceGeo';
import { Client } from '../cliente';
import { Destination, Destinations } from '../destinations';
import { Driver } from '../driver';
import { GenericObject } from '../genericObject';
import { Passenger } from '../passenger';
import { Milisecond } from '../typesKeyword';
import { Vehicle } from '../vehicle';

export class SharedTrip {
    driver?: Driver;
    vehicle?: Vehicle;
    destinations2?: Destination[];
    destinations?: Destinations[];
    passenger?: Passenger[];
    client?: Client;
    coordinate?: Coordinate;
    polilyne?: string;
    statusTypeService?: GenericObject;

    startService?: string;
    endServiceProximate?: string;

    timeAproximate?: Milisecond;
    
    frontStartService?: Date;
    frontEndServiceProximate?: Date;
}


export function fnObjectSharedTrip(): SharedTrip {
    return {
        "startService": '2020-12-17T10:44:00-05:00',
        "endServiceProximate": '2020-12-17T11:04:00-05:00',
        timeAproximate: 60000,
        "driver": {
            "id": 37,
            "uuid": "f73e9168-80cf-4581-b7b2-a887549beb4d",
            "code": "1930",
            "firstName": "Valentín",
            "firstLastName": "Huamani",
            "secondLastName": "Chaupin",
            "status": {
                "id": 22,
                "name": "ENSERVICIO",
            },
            "urlPhoto": 'https://vignette.wikia.nocookie.neton/latest?cb=20100316206&path-prefix=es',
            "rating": 4.92
        },
        "vehicle": {
            "urlPhoto": 'https://vignette.wikia.nocookie.netages/c/ca/Thrall_Wei-1-.jpg/revision/latest?cb=20100202906&path-prefix=es',
            "id": 121,
            "code": "9669",
            "licensePlate": "ADB-193",
            "model": {
                "id": 1,
                "name": "SERATO",
                "brand": {
                    "id": 1,
                    "name": "HYUNDAI"
                }
            }
        },
        "destinations": [
           
        ],        
        "coordinate": {
            "latitude": -12.1371133,
            "longitude": -76.995555
        },
        "client": {
            "id": 25,
            "firstName": "Sinael",
            "firstLastName": "Alvarez",
            "secondLastName": "Prueba"
        },
        "statusTypeService": {
            "id": 6,
            "name": "INICIO",
        }
    }
}