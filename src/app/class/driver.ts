import { Telefono, IdDriver } from './typesKeyword';
import { GeneralObj } from './operaciones/offer';
import { DocumentType } from './documentType';
import { Turn } from './turn';
import { Coverage } from './coverages';
import { Vehicle } from './vehicle';
import { Gender } from './gender';
import { SuspendType } from './statusType';
import { Coordinate } from './class-directive/trackingTrip';

export class Driver {
   code?:string;
   countryCode?:string;
   firstLastName?:string;
   firstName?:string;
   id?: IdDriver;
   uuid?:string;
   phoneNumber?: Telefono;
   secondLastName?:string;   
   status?: GeneralObj;
   urlPhoto?: string;
   rating?: number;
   statusType?: SuspendType;
  }

  export class DriverAvailable {
  cellPhone?: Telefono;
  distance?: number;
  modelDescription?: string;
  modelId?: number;
  serviceId?: number;
  statusTypeId?: number;
  statusTypeName?: number;
  timeApproximate?: number;
  turnDescription?: string;
  turnId?: number
  }
  
  export class DriverMaintenance {
   id?: IdDriver;
   // address?: string;
   homeAddress?: DriverDirection;
   addressReference?: string;
   cellphone?: string;
   code?: string;
   city?: string;
   countryCodeTelephoneHome?: string;
   telephoneHome?: string;
   countryCodeCellphone?: string;
   countryTelephoneHome?: string;
   dateOfAdmission?: Date;
   dateOfUnemployment?: Date;
   document?: Document;
   enable?: boolean;
   firstLastName?: string;
   secondLastName?: string;
   firstName?: string;
   gender?: Gender;
   paymentInfo?: PaymentInfo;
   balance?: number;
   rating?: number;
   civilStatus?: GeneralObj;
   birthDate?: Date;
   children?: number;
   account?: Account;
   user?: string;
   facebookId?: string;
   googleId?: string;
   activationCode?: string;
   imei?: string;
   lstVehicles?: Vehicle[];
   lstVehicleId?: number[];
   turn?: Turn;
   modality?: GeneralObj;
   paymentType?: number[];
   coverage?: Coverage;
   businessUnit?: GeneralObj;
   commission?: number;
   observation?: string;   
   licenceDriving?: string;
   licenceDriving1?: DriverLicense;
   attributes?: GenericObject[];
   configuration?: GenericObject[];
   urlPhoto?: string;
   urlPhotoAnimated?: string;

   nameTurnFront?: string;
  }

  export class DriverLicense {
     licenseNumber?: string;
     admisionDate?: Date;
     expirationDate?: Date;
     category?: string;
  }

  export class DriverDirection {
   id?: number;
   mainText?: string;
   secondaryText?: string;
   latitude?: number;
   longitude?: number;
   // number?: number;
   // zoneDescription?: string;
   // zoneId?: number;
   // reference?: string;
  }

  export class Document {
     documentType?: DocumentType;
     expireIn?: Date;
     documentNumber?: string;
  }

  export class PaymentInfo {
     bank?: GeneralObj;
     dayPay?: number;
     document?: DocumentDriver;
     firstName?: string;
     lastName?: string;
     numberAccount?: string;
     period?: GeneralObj;
     typeAccount?: GeneralObj;
  }

  export class DocumentDriver {
      documentNumber?: string;
      documentType?: DocumentType;
  }

  export class GenericObject {
     id?: number;
     name?: string;
     description?: string;
     enable?: boolean;
  }

  export class Account {
     email?: string;
     password?: string;
  }

  export class ResponseLstDrive {
     results?: Vehicle[];
     totalRecords?: number;
  }

  export class DriverSanction{
     sanction?: string;
     observation?: string;
     time?: number;
  }

export class AutoCompleteDriver {
   isCoincidence?: boolean;
   listMatch?: ListMatchDriver[];
}

export class ListMatchDriver {
   id?: number;
   code?: string;
   email?: string;
   enable?: true;
}

export class MatchDocumentType {
   isCoincidence?: boolean;
   listMatch?: ListMatchDocument[];
}

export class ListMatchDocument {
   id?: number;
   enable?: true;
   documentNumber?: string;
   documentTypeId?: string;
}

export class RegisterBasicDriver {
   id?: number;
   uuid?: string;
   verifyId?: string;
   firstName?: string;
   firstLastName?: string;
   document?: Document;
   account?: Account;
   countryCodeCellphone?: string;
   cellphone?: string;
   homeAddress?: DriverDirection;

   isDriverFront?: boolean;
   isEmail?: boolean;
}


export class ModelDriverOrigin{
   coordinate ?: Coordinate;
   distance ?: number;
   driver ?: Driver;
   timeApproximate ?: number;
   vehicle ?: Vehicle;

}