import { IdGeneric } from './typesKeyword';
import { Var_ModoReservaBase } from './varKerword';

export class GenericObject{
    id?: IdGeneric;
    name?: string;
    description?: string;
    color?: string;
    shortCut?: string;
}

export class GenericObject2{
    name?: string;
    valueArray?: any[];
}

export class DateStatus{    
    dateAssignment?: Date;
    dateContact?: Date;
    dateEnd?: Date;
    dateReading?: Date;
    dateStart?: Date;
    

    frontDateAssignment?: string;
    frontDateContact?: string;
    frontDateEnd?: string;
    frontDateReading?: string;
    frontDateStart?: string;
}


export function fnModeReserveDefault(): GenericObject{
    let modeReserve: GenericObject = new GenericObject();

    modeReserve.id = Var_ModoReservaBase
    modeReserve.name = 'Base'

    return modeReserve
}


export enum TemplateEnum {
    ADMIN_CORPORATIVE ='ADMIN_CORPORATIVE'
}
