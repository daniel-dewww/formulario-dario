

export class Push {
  category?: enumCategory;
  action?: enumAction;
  format?: enumFormat;
  notify?: boolean;
  serviceId?: string; //uuid
  expireAt?: string; //hay q parsear a formato fecha
  statusTypeId?: any;
  value?: any;
  driverId?: string
  vehicleId?: string
  
  conversationId?:number
  messageId?:number
}

export enum enumCategory {
  RIDE = 'RIDE',
  MESSAGE = 'MESSAGE',
  DISPATCH = 'DISPATCH'
}

export enum enumAction {
  NEW = 'NEW',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  NEW_SERVICE_CALL = 'NEW_SERVICE_CALL',
  READED_MESSAGE = 'READED_MESSAGE'
}

export enum enumFormat {
  NOT_SHOW = 'NOT_SHOW',
  SHOW_NOTIFY = 'SHOW_NOTIFY'
}

export class IvrPushStructure {
  countryCode?: string;
  numberInbound?: string
}

export class  PostOperatorOperatorIdAlertCallNotify {
  // enviar el numero entrante, ejemplo: 51991234567 = 991234567
  numberInbound?: string;
  // enviar el codigo del pais al cual pertenece, ejemplo: Peru = 51
  countryCode?: string;
  // indica la referencia del servicio
  serviceId?: number;
  // indica si es un nuevo servicio o es la edicion del servicio
  isNewService?: boolean;
}