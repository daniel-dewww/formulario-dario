import { environment } from 'src/environments/environment';
import { EstadosViaje, EstadosViajeGroup } from './enum/enumEstados';
import { IdGeneric } from './typesKeyword';

export class StatusType {
    id?: number;
    colorHex?: string;
    description?: string;
    enable?: number | boolean;
    name?: string;
}

export class SuspendType {
    id?: number;
    description?: string;
    name?: string;
    code?: string;
    enable?: boolean;
}

/**
 *  lst de estados de tipoGrupo
 */
export function lstStatusTravelGroup(): StatusType[] {
    let lstStatus: StatusType[] = [
        {
            id: EstadosViajeGroup.PENDING,
            description: 'PENDIENTE',
            colorHex: environment.CONFIGURATION.GROUP_COLOR.PENDING,
            enable: true,
            name: 'PENDIENTE',
        },
        {
            id: EstadosViajeGroup.ASSIGNED,
            description: 'ASIGNADO',
            colorHex: environment.CONFIGURATION.GROUP_COLOR.ASSIGNED,
            enable: true,
            name: 'ASIGNADO'
        },
        {
            id: EstadosViajeGroup.BOARD,
            description: 'ABORDO',
            colorHex: environment.CONFIGURATION.GROUP_COLOR.BOARD,
            enable: true,
            name: 'ABORDO'
        },
        {
            id: EstadosViajeGroup.CANCEL,
            description: 'Cancelado',
            colorHex: environment.CONFIGURATION.GROUP_COLOR.CANCEL,
            enable: true,
            name: 'Cancelado'
        },
        {
            id: EstadosViajeGroup.FINISHED,
            description: 'TERMINADO',
            colorHex: environment.CONFIGURATION.GROUP_COLOR.FINISHED,
            enable: true,
            name: 'TERMINADO'
        },
        {
            id: EstadosViajeGroup.OTHERS,
            description: 'OTROS',
            colorHex: environment.CONFIGURATION.GROUP_COLOR.OTHERS,
            enable: true,
            name: 'OTROS'
        }
    ];
    return lstStatus;
}

/**
 * Get de estados de tipoGrupo
 */
export function GetStatusTravelGroup(statusGroup: EstadosViajeGroup): StatusType|undefined {
    let lstStatus: StatusType[] = lstStatusTravelGroup();

    let elementReturn:any = undefined
    lstStatus.forEach(status => {
        if (status.id == statusGroup) {
            elementReturn = statusGroup;
        }
    });

    return elementReturn;
}

/**
 *  lst de estados de tipoGrupo
 */
export function GetselStatusTravelGroup(statusGroup: EstadosViajeGroup[]): StatusType[] {
    let lstStatus: StatusType[] = lstStatusTravelGroup();
    let lstSelTravelGroup: StatusType[] = [];

    statusGroup.forEach(selStatus => {
        lstStatus.forEach(statusGroup => {
            if (selStatus == statusGroup.id) {
                lstSelTravelGroup.push(statusGroup);
            }
        });
    });

    return lstSelTravelGroup;
}
/**
 *   identifica en q estadoGrupo, pertenece el estado
 */
export function statusTravelGroup(enumState: EstadosViaje): EstadosViajeGroup {
    switch (enumState) {
        case EstadosViaje.All:
            return EstadosViajeGroup.All

        case EstadosViaje.APROBADO:
        case EstadosViaje.BUSCANDO_VEHICULO:
        case EstadosViaje.BUSCANDO_VEHICULO_SCLEDULE:
        case EstadosViaje.CONDUCTOR_RETIRADO:
        case EstadosViaje.BUSCANDO_CONDUCTOR:
        case EstadosViaje.PREGUNTANDO_CONDUCTOR:
        case EstadosViaje.RETENIDO:
            return EstadosViajeGroup.PENDING

        case EstadosViaje.PREASIGNADO:
        case EstadosViaje.ASIGNADO:
        case EstadosViaje.LEIDO:
        case EstadosViaje.UBICADO:
            return EstadosViajeGroup.ASSIGNED

        case EstadosViaje.CONTACTO:
        case EstadosViaje.INICIO:
        case EstadosViaje.LLEGO_DESTINO:
        case EstadosViaje.DESPLAZAMIENTO:
        case EstadosViaje.PRECIERRE:
            return EstadosViajeGroup.BOARD

        case EstadosViaje.TERMINO:
        case EstadosViaje.DESPLAZAMIENTO:
            return EstadosViajeGroup.FINISHED

        case EstadosViaje.CANCELADO_USUARIO:
        case EstadosViaje.CANCELADO_CONDUCTOR:
        case EstadosViaje.CANCELADO_BASE:
        case EstadosViaje.ANULADO_BASE:
        case EstadosViaje.RECHAZADO:
        case EstadosViaje.CANCELADO_USUARIO_BUSQUEDA:
        case EstadosViaje.SIN_ATENCION:
        case EstadosViaje.RECHAZO_NO_SE_ENCONTRO_CONDUCTOR:
            return EstadosViajeGroup.CANCEL

        case EstadosViaje.NO_APROBADO:
        case EstadosViaje.PENDIENTE_APROBACION:
        default:
            return EstadosViajeGroup.OTHERS
    }
}

/**
 * Se identifica el color del grupo mediante el groupId
 * @param enumState statusId: number
 * @returns 
 */
export function statusTravelGroupColor(enumState: EstadosViajeGroup): string {
    switch (enumState) {
        case EstadosViajeGroup.All:
            return environment.CONFIGURATION.GROUP_COLOR.ALL
        case EstadosViajeGroup.PENDING:
            return environment.CONFIGURATION.GROUP_COLOR.PENDING
        case EstadosViajeGroup.ASSIGNED:
            return environment.CONFIGURATION.GROUP_COLOR.ASSIGNED
        case EstadosViajeGroup.BOARD:
            return environment.CONFIGURATION.GROUP_COLOR.BOARD
        case EstadosViajeGroup.CANCEL:
            return environment.CONFIGURATION.GROUP_COLOR.CANCEL
        case EstadosViajeGroup.FINISHED:
            return environment.CONFIGURATION.GROUP_COLOR.FINISHED
        case EstadosViajeGroup.OTHERS:
            return environment.CONFIGURATION.GROUP_COLOR.OTHERS
    }
}

/**
 *  identificas la lista de estados viaje si se escoge un estadoGrupo
 */
export function statusTravelGroupInverse(enumState: EstadosViajeGroup): EstadosViaje[] {
    switch (enumState) {
        case EstadosViajeGroup.PENDING:
            return [EstadosViaje.APROBADO,
            EstadosViaje.BUSCANDO_VEHICULO,
            EstadosViaje.BUSCANDO_VEHICULO_SCLEDULE,
            EstadosViaje.CONDUCTOR_RETIRADO,
            EstadosViaje.BUSCANDO_CONDUCTOR,
            EstadosViaje.PREGUNTANDO_CONDUCTOR,
            EstadosViaje.RETENIDO]

        case EstadosViajeGroup.ASSIGNED:
            return [EstadosViaje.PREASIGNADO,
            EstadosViaje.ASIGNADO,
            EstadosViaje.LEIDO,
            EstadosViaje.UBICADO]

        case EstadosViajeGroup.BOARD:
            return [EstadosViaje.CONTACTO,
            EstadosViaje.INICIO,
            EstadosViaje.LLEGO_DESTINO,
            EstadosViaje.DESPLAZAMIENTO,
            EstadosViaje.PRECIERRE]

        case EstadosViajeGroup.FINISHED:
            return [
                EstadosViaje.TERMINO,
                EstadosViaje.DESPLAZAMIENTO]

        case EstadosViajeGroup.CANCEL:
            return [EstadosViaje.CANCELADO_USUARIO,
            EstadosViaje.CANCELADO_CONDUCTOR,
            EstadosViaje.CANCELADO_BASE,
            EstadosViaje.ANULADO_BASE,
            EstadosViaje.RECHAZADO,
            EstadosViaje.CANCELADO_USUARIO_BUSQUEDA,
            EstadosViaje.SIN_ATENCION,
            EstadosViaje.RECHAZO_NO_SE_ENCONTRO_CONDUCTOR]

        case EstadosViajeGroup.OTHERS:
            return [EstadosViaje.NO_APROBADO,
            EstadosViaje.PENDIENTE_APROBACION]

        case EstadosViajeGroup.All:
            return [EstadosViaje.All]
    }
}

/**
 * Send groupObjct
 */
export function returnObjGroup(enumState: EstadosViajeGroup): StatusType {
    let lstGroup: StatusType[] = lstStatusTravelGroup();
    let elementReturn = new StatusType()
    lstGroup.forEach(element => {
        if (enumState == element.id) {
            elementReturn = element
        }
    });

    return elementReturn;
}

/**
 * identificas la lista total de estados de viajes si escoges varios grupos
 * 
 */
export function statusTravelArrayGroupInverse(enumState: EstadosViajeGroup[]): EstadosViaje[] {
    let lstStatus_type_id: number[] = [];
    if (enumState && enumState.length >= 1) {
        enumState.forEach(lstId => {
            let arrayId = statusTravelGroupInverse(lstId);
            arrayId.forEach(id => {
                lstStatus_type_id.push(id);
            });
        });
    }

    return lstStatus_type_id;
}