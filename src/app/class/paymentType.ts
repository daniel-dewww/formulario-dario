import { environment } from 'src/environments/environment';
import { PaymentTypeEnum } from './enum/enumPaymentType';
import { IdGeneric } from './typesKeyword';

export class PaymentType{
    id?: IdGeneric;
    name?: string;
    description?: string;
    color?: string;
    enable?: number;
    visible?: boolean;
}

export function statusTypePayment(enumState: PaymentTypeEnum) {
    switch (enumState) {
        case PaymentTypeEnum.CORPORATIVO:
            return  environment.PAYMENT.CORPORATIVO
        case PaymentTypeEnum.EFECTIVO:
            return  environment.PAYMENT.EFECTIVO
        case PaymentTypeEnum.HOTEL:
            return  environment.PAYMENT.HOTEL
        case PaymentTypeEnum.PLIN:
            return  environment.PAYMENT.PLIN
        case PaymentTypeEnum.POS:
            return  environment.PAYMENT.POS
        case PaymentTypeEnum.TARJETA:
            return  environment.PAYMENT.TARJETA
        case PaymentTypeEnum.YAPE:
            return  environment.PAYMENT.YAPE
        default:
            return  environment.PAYMENT.CORPORATIVO
    }
}