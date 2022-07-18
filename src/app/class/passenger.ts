import { IdPassenger, Telefono, IdClient } from './typesKeyword';
import { TipoPasajero } from './enum/enumTipoPasajero';
import { Client } from './cliente';

export class Passenger {
  firstLastName?: string;
  firstName?: string;
  id?: IdPassenger; //idDel pasajero en el servicio
  secondLastName?: string;
  countryCode?: string;
  cellPhone?: Telefono;
  // passengerId?: IdPassenger; // Id del cliente Cuando es de empresa
  clientId?: IdClient; // Id del cliente Cuando es de empresa
  //front

  // frontPosicionPasenger?: string;
  // frontIdPasajero?: string;
  // frontPosicionPasengerSubida?: string;
  // frontIdPasajeroSubida?: string;
  // frontIdPasajeroBajada?: string;
}

export class PassengerFront {
  id?: IdPassenger; //idDel pasajero en el servicio
  firstName?: string;
  firstLastName?: string;
  secondLastName?: string;
  cellPhone?: Telefono;
  clientId?: IdClient;
  countryCode?: Telefono;// Id del cliente Cuando es de empresa

  //front
  frontTipoPasajeroSubida?: string;
  frontTipoPasajeroBajada?: string;
  frontTipoPassenger?: TipoPasajero;

  frontPasajeroEmpresaInit?: Client
}