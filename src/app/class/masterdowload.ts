import { Coverage } from './coverages';
import { CreditTypes, CurrencyType } from './currencyType';
import { DocumentType } from './documentType';
import { Parameter } from './parameter';
import { PaymentType } from './paymentType';
import { ServiceType } from './serviceType';
import { StatusType, SuspendType } from './statusType';
import { Turn } from './turn';
import { TypeReceipts } from './typeReceipt';
import { TypeZones } from './typeZone';
import { User } from './user';
import { ModeReserve } from './modeReserve';
import { Attribute, Vehicle } from './vehicle';
import { Gender } from './gender';
import { Menu } from 'primeng/menu';
// import { Menu } from '../core/menu/menu.service';

export class CourrentUser{
    user?:string;
    user_uuid?: string;
    companyId?: string;
    anexo?: string;
    phone?: string;
}

export class CurrentDriver {
    user?: string;
    user_uuid?: string;
    verifyIf?: string;
    id?: number;
    isEmail?: boolean;
    cellphone?: string;
}

export class RequestMasterdowload {
    activo?: number;
    user_uuid?: string;
    anexo?: string;
    companyId? : string
}

export class Masterdowload {
    // code?: string;
    // secondLastName?: string
    companyClient?:any
    coverages?: Coverage[];
    currencyTypes?: CurrencyType[];
    documentTypes?: DocumentType[];
    creditTypes ?: CreditTypes [];
    genders?: Gender[];
    parameters?: Parameter[];
    paymentTypes?: PaymentType[];
    serviceTypes?: ServiceType[];
    statusTypeService?: StatusType[];
    statusTypeDriver?: StatusType[];
    turns?: Turn[];
    typeReceipts?: TypeReceipts[];
    typeZones?: TypeZones[];
    modeReserves?: ModeReserve[];
    vehicleTypes?: Vehicle[];
    user?: User;
     menus?: Menu[];
    permissions?: any[];
    templates?: any[]
    attributes?: AttributesMaster[];
    templates_corporative?: any[]
    templates_backoffice ?: any[]
    frontMasterdowload?: FrontMasterdowload;
    fronAttributes?: Attribute[]
    userStates?: SuspendType[];
}

export class AttributesMaster {
    companyAttributes?: Attribute[];
    serviceAttributes?: Attribute[];
    vehicleAttributes?: Attribute[];
}

export class FrontMasterdowload {
    anexo?: string
}