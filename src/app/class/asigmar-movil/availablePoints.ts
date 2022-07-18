import { Coordinate } from '../class-directive/serviceGeo';
import { Driver } from '../driver';
import { IdStatusTypeTrip, IdTrip} from '../typesKeyword';
import { Vehicle } from '../vehicle';

export class AvailablePoints {
  driver?: Driver;
  vehicle?: Vehicle;
  coordinate?: Coordinate;

  distance?: number;
  timeApproximate?: number;
  frontSelectVehicle?: boolean;

}

export class ShortTrip {
  id?: IdTrip
  idState?: IdStatusTypeTrip
  timeApproximate?: number;
}

export function fnLstAvailablePoints(): AvailablePoints[] {
  return [
    {
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
        }
      },
      "vehicle": {
        "id": 121,
        "code": "9669",
        "licensePlate": "ADB-193",
        "vehicleType": {
          "id": 2,
          "name": "SEDAN",
          "numberPassenger": 4
        },
        "model": {
          "id": 1,
          "name": "SERATO",
          "brand": {
            "id": 1,
            "name": "HYUNDAI"
          }
        },
        "attribute": [
          { "id": 16, "name": "Maletera Amplia", "tipo": "boolean", "value": "true" },
          { "id": 17, "name": "Aire Acondicionado", "tipo": "boolean", "value": "true" }
        ]
      },
      "coordinate": {
        "latitude": -12.1371133,
        "longitude": -76.995555
      },
      "distance": 300,
      "timeApproximate": 300000,
    },
    {
      "driver": {
        "id": 54,
        "uuid": "341c03a3-b0d7-4445-aa0b-62ee926585d9",
        "code": "9999",
        "firstName": "Jesús",
        "firstLastName": "Montenegro",
        "secondLastName": "Salazar",
        "status": {
          "id": 15,
          "name": "FIN JORNADA",
        }
      },
      "vehicle": {
        "id": 102,
        "code": "1001",
        "licensePlate": "A100-450",
        "vehicleType": {
          "id": 2,
          "name": "SEDAN",
          "numberPassenger": 4
        }
      },
      "coordinate": {
        "latitude": -12.1468648,
        "longitude": -76.9750367
      },
      "distance": 500,
      "timeApproximate": 6000,
    }
  ]
}

