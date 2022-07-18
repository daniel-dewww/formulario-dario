import { Subscription } from 'rxjs';


/**
 * Clase que indica la estructura del atajo de teclas
 * 
 *
 * @publicApi
 */
// export class ShortCut {
//   keys: string;
//   name: string;
//   description: string;
//   screen: NameScreen[];
//   status?: boolean;

//   loading?:boolean;
//   suscription?: Subscription;
// }

// export enum NameScreen {
//   OPERACTION = 'Operaciones',
//   MONITORING = 'Monitoreo',
// }

// export enum NameKeys {
//   NEW_TRIP = 'space',
//   EDIT_TRIP = 'shift + e',
//   FIND_TRIP = 'shift + b',
//   TYPE_CAR = 'shift + z',
//   SEARCH_ID = 'shift + s',
//   LIST_SERVICE_SERVED = 'shift + a',
// }

// export function InitShortCut(){
//   let shortCut = [
//     {keys: NameKeys.NEW_TRIP, name:  NameKeys.NEW_TRIP, description: DescriptionKeys.NEW_TRIP,  screen: [NameScreen.MONITORING, NameScreen.OPERACTION] },
//     {keys: NameKeys.EDIT_TRIP, name: NameKeys.EDIT_TRIP, description: DescriptionKeys.EDIT_TRIP,  screen: [NameScreen.OPERACTION]},
//     {keys: NameKeys.TYPE_CAR, name: NameKeys.TYPE_CAR, description: DescriptionKeys.TYPE_CAR,  screen: [NameScreen.MONITORING, NameScreen.OPERACTION]},    
//     {keys: NameKeys.SEARCH_ID, name:  NameKeys.SEARCH_ID, description: DescriptionKeys.SEARCH_ID, screen: [NameScreen.OPERACTION, NameScreen.MONITORING]},
//     {keys: NameKeys.LIST_SERVICE_SERVED, name:  NameKeys.LIST_SERVICE_SERVED, description: DescriptionKeys.LIST_SERVICE_SERVED, screen: [NameScreen.OPERACTION, NameScreen.MONITORING],},
//   ];

//   return shortCut
// }

