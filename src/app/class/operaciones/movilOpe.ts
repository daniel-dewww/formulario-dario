import { IdVehicle, IdDriver } from '../typesKeyword';
import { MovilesxVehiculo } from '../class-directive/movilesxvehiculo';

export class C_OpeBusquedaPanel {
    turn_id?: string;
    statustype_id?: string;
    keyword?: string;
}

export class PanelOpe {
    driverId?: IdDriver;
    driverCode?: string;
    lastTimeService?: Date; 
    lastUpdate?: Date; // hora de la movil
    location?: string; //nombre zona
    position?: number; //posicion
    statusDriverId?: number;
    turnId?: string;
    vehicleTypeId?: number;
}

export class C_CantidadMovil {
    cantidadMLibre?: number;
    cantidadMEnServicio?: number;
    cantidadMOcupado?: number;
    cantidadMFinJornada?: number;
    movilesxVehiculo?: MovilesxVehiculo[];
}

