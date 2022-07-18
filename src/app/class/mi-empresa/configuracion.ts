import { StatusType } from 'src/app/class/statusType';

export class Configuracion {
    zonaHoraria?: string;
    zonaHorariaActual?: string;
    formatoFecha?: string;
    formatoHora?: string;
    moneda?: string;
    distancia?: string;
}

export class saveColor{
    id?: number;
    statusTypeService?: StatusType[];
    statusTypeDriver?: StatusType[];
}