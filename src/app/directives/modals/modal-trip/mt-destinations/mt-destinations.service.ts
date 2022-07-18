import { ChangeDetectorRef, Injectable } from '@angular/core';
import { MT_Destination, MT_Destinations, MT_PassengerFront } from './mt-destinations.class';

@Injectable({
  providedIn: 'root'
})
export class MtDestinationsService {

  constructor() { }

  fnInitObjDestinos(): MT_Destinations {
    let destino: MT_Destinations = new MT_Destinations();
    destino.destination = new MT_Destination();
    destino.origin = new MT_Destination();
    destino.passenger = [];

    return destino;  
  }
  
  fnAsientosUsados(passenger: MT_PassengerFront[], tipoPasajero: string): number {
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

    return asientosUsados
  }

  fnAsientosUsadoss(passenger: MT_PassengerFront[], tipoPasajero: string): number {
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

    return asientosUsados
  }

  fnLstPasajeroSubida(passenger: MT_PassengerFront[], tipoPasajero: string): MT_PassengerFront[] {
    // asientosUsados
    let pasajerosSubidos: MT_PassengerFront[] = []

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

    return this.CloneArray(pasajerosSubidos)
  }

  fnPasajeroBajada(passenger: MT_PassengerFront[], tipoPasajero: string): MT_PassengerFront[] {
    let pasajerosBajada: MT_PassengerFront[] = [];

    if (tipoPasajero) {
      passenger.forEach(pasajero => {
        if (pasajero.frontTipoPasajeroBajada &&
          pasajero.frontTipoPasajeroBajada.split('D')[1] == tipoPasajero.split('D')[1]) {
          pasajerosBajada.push(pasajero);
        }
      });
    }

    return this.CloneArray(pasajerosBajada)
  }

  fnDetectCambioDestinos(destinations: MT_Destinations[], lstDestinos: MT_Destinations[],  ref: ChangeDetectorRef): boolean {  
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

  CloneArray( arrayOriginal: any ):any[] {
    return arrayOriginal.slice();
  }
}
