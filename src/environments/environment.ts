// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as CONFIGURACION from '../assets/empresas/satelital/json/configuracion.json'
import * as ALERT from '../assets/empresas/nexus/json/mensajes.json'
import * as  LABEL from '../assets/empresas/satelital/json/label.json'
import * as  SHORT_CUT from '../assets/empresas/nexus/json/shortCut.json'
import * as  PERMISSION from '../assets/empresas/nexus/json/permission.json'


export const environment = {
  production: false,
  NAME_COMPANY: 'satelital',//'<<your name>>',
  LOGIN : "NEXUS_CORPORATIVO",
  NAME_BUSINESS : "Satelital",
  SERVICES_URL: 'https://apocalipsis.nexusvirtual.net/backoffice/api/v1/', //client
  SERVICES_URL_ACCESS : 'https://apocalipsis.nexusvirtual.net/access/api/v1/',
  SERVICES_URL_CLIENT : 'https://apocalipsis.nexusvirtual.net/client/api/v1/',
  CONFIGURATION: CONFIGURACION,
  PERMISSION: PERMISSION,
  SHORT_CUT: SHORT_CUT,
  MSJE_CLIENTE: ALERT,
  LABEL: LABEL,
  ORIGEN : 'assets/satelital/img/markers/marker_origen.png',
  DESTINO : 'assets/satelital/img/markers/marker_destino.png',
  IMAGES_AUTO: {
    ELITE : 'assets/empresas/satelital/img/autos/elite.png',
    ESTANDAR : 'assets/empresas/satelital/img/autos/carro.png',
    VAN : 'assets/empresas/satelital/img/autos/van.png',
    COURIER : 'assets/empresas/satelital/img/autos/courier.png',
    CARGA : 'assets/empresas/satelital/img/autos/carga.png',
  },
  PAYMENT: {
    EFECTIVO : 'assets/empresas/satelital/img/payment/efectivo.png',
    TARJETA : 'assets/empresas/satelital/img/payment/tarjeta.png',
    POS : 'assets/empresas/satelital/img/payment/pos.png',
    YAPE : 'assets/empresas/satelital/img/payment/yape.png',
    CORPORATIVO : 'assets/empresas/satelital/img/payment/corportivo.png',
    PLIN : 'assets/empresas/satelital/img/payment/plin.png',
    HOTEL : 'assets/empresas/satelital/img/payment/corportivo.png',
  },
  LOGO : 'assets/empresas/satelital/logo/logo-dark.png',
  CENTER_MAP_DEFAULT:{
    LAT:-12.1251109,
    LNG:-76.9928316,
    CITY : 'Salamanca',
    COUNTRY: "PE",
    LOC: "-12.0833,-77.0000",
    REGION: "Lima",
  },
  MARKERS: {
    ORIGEN: {
      URL: '/img/markers/marker_origen.png',
      POSICION: 1,
      ICON_SIZE: new google.maps.Size(30, 35)
    },
    DESTINO: {
      URL: '/img/markers/marker_destino.png',
      POSICION: 1,
      ICON_SIZE: new google.maps.Size(30, 35)
    },
    CONDUCTOR_LABEL: {
      URL: '/img/markers/autoGeneric.svg',
      POSICION: 1,
      ICON_SIZE: new google.maps.Size(30, 30)
    },
    CONDUCTOR: {
      URL: '/img/markers/autoGeneric.svg',
      POSICION: 1,
      ICON_SIZE: new google.maps.Size(30, 30)
    },
    PASAJERO:{
      URL: '/img/markers/marker_destino.png',
      POSICION: 1,
      ICON_SIZE: new google.maps.Size(30, 35)
    },
    CHECKPOINT:{
      URL: '/img/markers/pinNegro.svg',
      POSICION: 1,
      ICON_SIZE: new google.maps.Size(25, 30)
    },
    PRECLOSE:{
      URL: '/img/markers/pinRojo.svg',
      POSICION: 1,
      ICON_SIZE: new google.maps.Size(30, 35)
    },
    READING:{
      URL: '/img/markers/pinAmarillo.svg',
      POSICION: 1,
      ICON_SIZE: new google.maps.Size(30, 35)
    },
    CONTACT:{
      URL: '/img/markers/pinVerde.svg',
      POSICION: 1,
      ICON_SIZE: new google.maps.Size(30, 35)
    },
    START_DESTINATION:{
      URL: '/img/markers/pinCeleste.svg',
      POSICION: 1,
      ICON_SIZE: new google.maps.Size(30, 35)
    },
    END_DESTINATION:{
      URL: '/img/markers/pinNaranja.svg',
      POSICION: 1,
      ICON_SIZE: new google.maps.Size(30, 35)
    },
    RIDE_END:{
      URL: '/img/markers/pinMorado.svg',
      POSICION: 1,
      ICON_SIZE: new google.maps.Size(30, 35)
    }
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
