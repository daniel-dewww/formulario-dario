import { Destinations, Destination } from 'src/app/class/destinations';
import { Passenger, PassengerFront } from 'src/app/class/passenger';
import { CloneArray } from 'src/app/util/utilCopyWithoutReference';
import { ChangeDetectorRef } from '@angular/core';

export function fnInitObjDestinos(): Destinations {
  let destino: Destinations = new Destinations();
  destino.destination = new Destination();
  destino.origin = new Destination();
  destino.passenger = [];

  // destino.serviceType = (destino.serviceType) ? viaje.serviceType : new GenericObject();
  // viaje.serviceType.id = (viaje.serviceType.id) ? viaje.serviceType.id : -1;

  return destino;


}

export function fnAsientosUsados(passenger: PassengerFront[], tipoPasajero: string): number {
  // asientosUsados
  let asientosUsados: number = 0
  if (tipoPasajero) {
    passenger.forEach(pasajero => {
      if ((pasajero.frontTipoPasajeroSubida &&
        parseInt(pasajero.frontTipoPasajeroSubida.split('D')[1]) <= parseInt(tipoPasajero.split('D')[1])) && 
        (pasajero.frontTipoPasajeroBajada && parseInt(pasajero.frontTipoPasajeroBajada.split('D')[1]) > parseInt(tipoPasajero.split('D')[1]))) {
        asientosUsados++;
      } else if (pasajero.frontTipoPasajeroBajada == undefined) {
        asientosUsados++;
      }
    });
  }

  // console.log(tipoPasajero, '   -   ', asientosUsados);

  // console.log('asientosUsados   ' + asientosUsados)
  return asientosUsados
}

export function fnAsientosUsadoss(passenger: PassengerFront[], tipoPasajero: string): number {
  // asientosUsados
  let asientosUsados: number = 0
  if (tipoPasajero) {
    passenger.forEach(pasajero => {
      if ((pasajero.frontTipoPasajeroSubida &&
        parseInt(pasajero.frontTipoPasajeroSubida.split('D')[1]) <= parseInt(tipoPasajero.split('D')[1])) && 
        (pasajero.frontTipoPasajeroBajada && parseInt(pasajero.frontTipoPasajeroBajada.split('D')[1]) > parseInt(tipoPasajero.split('D')[1]))) {
        asientosUsados++;
      } else if (pasajero.frontTipoPasajeroBajada == undefined) {
        asientosUsados++;
      }
    });
  }

  // console.log(asientosUsados)
  // console.log(tipoPasajero, '   -   ', asientosUsados);

  return asientosUsados
}

export function fnLstPasajeroSubida(passenger: PassengerFront[], tipoPasajero: string): PassengerFront[] {
  // asientosUsados
  let pasajerosSubidos: PassengerFront[] = []

  if (tipoPasajero) {
    passenger.forEach(pasajero => {
      if (pasajero.frontTipoPasajeroSubida && pasajero.frontTipoPasajeroSubida.split('D')) {
        if (pasajero.frontTipoPasajeroSubida.split('D')[1] <= tipoPasajero.split('D')[1] &&
          (pasajero.frontTipoPasajeroBajada == undefined || pasajero.frontTipoPasajeroBajada.split('D')[1] == tipoPasajero.split('D')[1])) {
          pasajerosSubidos.push(pasajero);
        }
      }
    });
  }

  return CloneArray(pasajerosSubidos)
}

export function fnPasajeroBajada(passenger: PassengerFront[], tipoPasajero: string): PassengerFront[] {
  let pasajerosBajada: PassengerFront[] = []


  if (tipoPasajero) {
    passenger.forEach(pasajero => {
      if (pasajero.frontTipoPasajeroBajada &&
        pasajero.frontTipoPasajeroBajada.split('D')[1] == tipoPasajero.split('D')[1]) {
        pasajerosBajada.push(pasajero);
      }
    });
  }

  return CloneArray(pasajerosBajada)
}

export function fnDetectCambioDestinos(destinations: Destinations[], lstDestinos: Destinations[],  ref: ChangeDetectorRef): boolean {
  
  let detectCambio:boolean = false;

  for (let i = 0; i < destinations.length; i++) {
    if (destinations[i].origin && lstDestinos[i] && lstDestinos[i].origin) {
      if (destinations[i].origin?.addressMainText != lstDestinos[i].origin?.addressMainText) {
        detectCambio = true;
      } else if (destinations[i].origin?.latitude != lstDestinos[i].origin?.latitude) {
        detectCambio = true;
      } else if (destinations[i].origin?.longitude != lstDestinos[i].origin?.longitude) {
        detectCambio = true;
      } else if (destinations[i].origin?.number != lstDestinos[i].origin?.number) {
        detectCambio = true;
      } else if (destinations[i].origin?.zoneDescription != lstDestinos[i].origin?.zoneDescription) {
        detectCambio = true;
      } else if (destinations[i].origin?.zoneId != lstDestinos[i].origin?.zoneId) {
        detectCambio = true;
      }
    } else {
      detectCambio = true;
    }

    if (destinations[i].destination && lstDestinos[i] && lstDestinos[i].destination) {
      if (destinations[i].destination?.addressMainText != lstDestinos[i].destination?.addressMainText) {
        detectCambio = true;
      } else if (destinations[i].destination?.latitude != lstDestinos[i].destination?.latitude) {
        detectCambio = true;
      } else if (destinations[i].destination?.longitude != lstDestinos[i].destination?.longitude) {
        detectCambio = true;
      } else if (destinations[i].destination?.number != lstDestinos[i].destination?.number) {
        detectCambio = true;
      } else if (destinations[i].destination?.zoneDescription != lstDestinos[i].destination?.zoneDescription) {
        detectCambio = true;
      } else if (destinations[i].destination?.zoneId != lstDestinos[i].destination?.zoneId) {
        detectCambio = true;
      }
    } else {
      detectCambio = true;
    }
  }
  
  ref.detectChanges();
  return detectCambio;
}