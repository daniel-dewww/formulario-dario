import { Driver } from "../driver";
import { GenericObject } from "../genericObject";
import { ConversationMessage } from "../operaciones/mensajeConductorOpe";
import { GeneralObj } from "../operaciones/offer";
import { Id_DataLog, IdTrip} from "../typesKeyword";
import { User } from "../user";
import { Attribute, Vehicle } from "../vehicle";
import { Coordinate } from "./trackingTrip"


export class ResponseDriverCurrenseState {
  driver?: Driver;
  vehicle?: Vehicle;
  statusType?:GeneralObj;
  vehicleAttributes?:Attribute[];
  lastSessionTime?:Date;
  mobile?: Mobile_Information;
  conversation?: ConversationMessage

  frontLastSessionTime?:Date; 

  serviceInProgress?: ServiceProgress;
}


export class ServiceProgress {
  id?: IdTrip
  statusType?: GenericObject;
  uuid?: string;
}

export class Mobile_Information {
  model?: MobileModelInformation;
  brand?: string;
}

export class MobileModelInformation 
{
  code?: string;
  commercial?: string;
}

export class ResponseDriverLastLocation {
  coordinate?: LastServiceCoordinate;
  zone?: GeneralObj
  order?: number
}

export class LastServiceCoordinate extends Coordinate{
  updatedAt?: Date;
  frontUpdatedAt?: Date;
}

export class ResponseDriverLastService {
  idService?: IdTrip
}

export class DataLogPagination {
  results?: DataLog[];
  totalRecords?:number;
}


export class DataLog {
  date?: string;
  description?: string;
  id?: Id_DataLog;
  type?: string;
  user?: User // uuid, id, name
}
