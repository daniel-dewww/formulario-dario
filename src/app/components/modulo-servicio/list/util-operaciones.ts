
import { filter } from 'rxjs/operators';
import { Client } from 'src/app/class/cliente';
import { CurrencyType } from 'src/app/class/currencyType';
import { Destination, Destinations } from 'src/app/class/destinations';
import { Driver } from 'src/app/class/driver';
import { EstadosViaje } from 'src/app/class/enum/enumEstados';
import { GenericObject } from 'src/app/class/genericObject';
import { C_OpeBusqueda, C_OpeBusqueda_Form } from 'src/app/class/operaciones/busquedaOpe';
import { ViajeOpe } from 'src/app/class/operaciones/viajeOpe';
import { Passenger } from 'src/app/class/passenger';
import { Attribute, TypeAtribute, Vehicle } from 'src/app/class/vehicle';
import { Viaje } from 'src/app/class/viajes';
import { fnDateforPlatform, fnDateToStringPlataform } from 'src/app/util/utilDate';

export function validationForm(filters: C_OpeBusqueda_Form): C_OpeBusqueda_Form {
    filters = (filters) ? filters : new C_OpeBusqueda_Form();

    filters.search_type = (filters.search_type) ? filters.search_type : -1;
    filters.key_word = (filters.key_word) ? filters.key_word : '';
    filters.status_type_id = (filters.status_type_id) ? filters.status_type_id : -1;
    filters.lstAttributes = (filters.lstAttributes) ? filters.lstAttributes : [];
    filters.date_start = (filters.date_start) ? fnDateforPlatform(filters.date_start) : new Date();
    filters.finish_date = (filters.finish_date) ? fnDateforPlatform(filters.finish_date) : new Date();
    filters.time_start = (filters.time_start) ? filters.time_start : '00:00';
    filters.finish_time = (filters.finish_time) ? filters.finish_time : '23:59:59';

    return filters;
}

export function onresize() {
    // var element1 = document.getElementById("element1");
    // var element2 = document.getElementById("element2");
    var element3 = document.getElementById("element3");
    var ResizerY = document.getElementById("resizerY");
    var topElements = document.getElementById("topElements");
    if (element3 && ResizerY && topElements) {
        ResizerY.style.top = element3?.offsetTop! - 15 + "px";
        topElements.style.height = ResizerY?.offsetTop! - 20 + "px";
    }
    // var height = topElements.clientHeight - 32;
    // if (height < 0)
    //     height = 0;
    // height += 'px';
    // element1.style.height = height;
    // element2.style.height = height;
}

// export function resizeX(x) {
//     //consoleLog("mousemove(X = " + e.pageX + ")");
//     var element2 = document.getElementById("element2");
//     element2.style.width =
//         element2.parentElement.clientWidth
//         + document.getElementById('rezizeArea').offsetLeft
//         - x
//         + 'px';
// }

export function resizeY(y: any) {
    //consoleLog("mousemove(Y = " + e.pageY + ")");
    var element3 = document.getElementById("element3");
    if (element3) {
        var height =
            element3.parentElement?.clientHeight!
            + document.getElementById('rezizeArea')?.offsetTop!
            - y
            ;
        //consoleLog("mousemove(Y = " + e.pageY + ") height = " + height + " element3.parentElement.clientHeight = " + element3.parentElement.clientHeight);
        if ((height + 100) > element3.parentElement?.clientHeight!)
            return;//Limit of the height of the elemtnt 3
        element3.style.height = height + 'px';
    }
    onresize();
}
// var emailSubject = "Resizer example error";


export function validateTypeService(idStatusService: number) {
    switch (idStatusService) {
        case EstadosViaje.APROBADO:
        case EstadosViaje.ASIGNADO:
        case EstadosViaje.LEIDO:
        case EstadosViaje.UBICADO:
        case EstadosViaje.CONTACTO:
        case EstadosViaje.CONDUCTOR_RETIRADO:
        case EstadosViaje.BUSCANDO_CONDUCTOR:
            return true;
        default:
            return false;
    }
}
export function validateStatusSpliceTravel(estadoViaje: EstadosViaje): boolean {
    switch (estadoViaje) {
        case EstadosViaje.APROBADO:
        case EstadosViaje.ASIGNADO:
        case EstadosViaje.LEIDO:
        case EstadosViaje.UBICADO:
        case EstadosViaje.CONTACTO:
            return true;
        default:
            return false
    }
}

export function fnInitObjViajeOpe(viajeOpe?: Viaje): Viaje {
    viajeOpe = (viajeOpe) ? viajeOpe : new Viaje();

    viajeOpe.client = (viajeOpe.client) ? viajeOpe.client : new Client();
    viajeOpe.client.id = (viajeOpe.client.id) ? viajeOpe.client.id : undefined;
    // viajeOpe.companyName = (viajeOpe.companyName) ? viajeOpe.companyName : undefined;
    viajeOpe.driver = (viajeOpe.driver) ? viajeOpe.driver : new Driver();
    viajeOpe.driver.id = (viajeOpe.driver.id) ? viajeOpe.driver.id : undefined;
    viajeOpe.vip = (viajeOpe.vip) ? viajeOpe.vip : false;
    viajeOpe.exigent = (viajeOpe.exigent) ? viajeOpe.exigent : false;
    viajeOpe.fixedRate = (viajeOpe.fixedRate) ? viajeOpe.fixedRate : false;
    viajeOpe.passenger = (viajeOpe.passenger) ? viajeOpe.passenger : [];
    viajeOpe.serviceDateTime = (viajeOpe.serviceDateTime) ? viajeOpe.serviceDateTime : new Date();
    viajeOpe.statusType = (viajeOpe.statusType) ? viajeOpe.statusType : new GenericObject();
    viajeOpe.statusType.id = (viajeOpe.statusType.id) ? viajeOpe.statusType.id : undefined;
    viajeOpe.currencyType = (viajeOpe.currencyType) ? viajeOpe.currencyType : new CurrencyType();
    viajeOpe.currencyType.id = (viajeOpe.currencyType.id) ? viajeOpe.currencyType.id : undefined;
    viajeOpe.vehicle = (viajeOpe.vehicle) ? viajeOpe.vehicle : new Vehicle();
    viajeOpe.vehicle.id = (viajeOpe.vehicle.id) ? viajeOpe.vehicle.id : undefined;
    viajeOpe.totalService = (viajeOpe.totalService) ? viajeOpe.totalService : undefined;
    // viajeOpe.destinationZone = (viajeOpe.destinationZone) ? viajeOpe.destinationZone : undefined;
    // viajeOpe.originZone = (viajeOpe.originZone) ? viajeOpe.originZone : undefined;
    viajeOpe.destinations = (viajeOpe.destinations) ? viajeOpe.destinations : [new Destinations()];
    viajeOpe.isRetained = (viajeOpe.isRetained) ? viajeOpe.isRetained : false;
    if(viajeOpe.destinations){
        viajeOpe.destinations.forEach(destinos => {
            destinos.origin = (destinos.origin) ? destinos.origin : new Destination();
            destinos.destination = (destinos.destination) ? destinos.destination : new Destination();
            destinos.passenger = (destinos.passenger) ? destinos.passenger : [];
    
            destinos.dateAssignment = (destinos.dateAssignment) ? fnDateforPlatform(destinos.dateAssignment as Date) : undefined;
            destinos.dateContact = (destinos.dateContact) ? fnDateforPlatform(destinos.dateContact as Date) : undefined;
            destinos.dateEnd = (destinos.dateEnd) ? fnDateforPlatform(destinos.dateEnd as Date) : undefined;
            destinos.dateReading = (destinos.dateReading) ? fnDateforPlatform(destinos.dateReading as Date) : undefined;
            destinos.dateStart = (destinos.dateStart) ? fnDateforPlatform(destinos.dateStart as Date) : undefined;
    
            destinos.frontDateAssignment = (destinos.dateAssignment) ? fnDateToStringPlataform(destinos.dateAssignment) : undefined;
            destinos.frontDateContact = (destinos.dateContact) ? fnDateToStringPlataform(destinos.dateContact) : undefined;
            destinos.frontDateEnd = (destinos.dateEnd) ? fnDateToStringPlataform(destinos.dateEnd) : undefined;
            destinos.frontDateReading = (destinos.dateReading) ? fnDateToStringPlataform(destinos.dateReading) : undefined;
            destinos.frontDateStart = (destinos.dateStart) ? fnDateToStringPlataform(destinos.dateStart) : undefined;
    
            destinos.frontTotalViaje = (destinos.costDestination) ? destinos.costDestination : 0
                + (destinos.totalWait!) ? destinos.totalWait : 0;
        });
    }

    return viajeOpe;
}

export function valueFilterSearchType(filterOpe: C_OpeBusqueda, viajeOpe: Viaje): boolean {

    switch (filterOpe.search_type) {
        case '1':
            if (viajeOpe.uuid?.toString().includes(filterOpe.key_word!)) {
                return true;
            }
            break;

        case '2':
            if (viajeOpe.vehicle?.code?.toString().includes(filterOpe.key_word!) ||
                viajeOpe.vehicle?.code?.includes(filterOpe.key_word!)) {
                return true;
            }
            break;

        case '3':
            if (viajeOpe.driver?.code?.toString().includes(filterOpe.key_word!) ||
                viajeOpe.driver?.code?.includes(filterOpe.key_word!)) {
                return true;
            }
            break;

        case '4':
            if (viajeOpe.client?.email?.toString().includes(filterOpe.key_word!) ||
                (viajeOpe.client?.firstName! + viajeOpe.client?.firstLastName! + viajeOpe.client?.secondLastName!).toString().includes(filterOpe.key_word!)) {
                return true;
            }

            if(viajeOpe.passenger){
                viajeOpe.passenger.forEach(pasajero => {
                    if ((pasajero.firstName! + pasajero.firstLastName + pasajero.secondLastName).toString().includes(filterOpe.key_word!)) {
                        return true;
                    }else {
                        return false
                    }
                });
            }
            break;

        // case '5':
        //     // COMPANY_PARTICULAR_ID
        //     if (viajeOpe.companyName != 'PARTICULAR' && viajeOpe.companyName?.includes(filterOpe.key_word!)) {
        //         return true;
        //     }

        //     break;
        default:
            if (viajeOpe.uuid?.toString().includes(filterOpe.key_word!)) {
                return true;
            }


            if (viajeOpe.vehicle?.code?.toString().includes(filterOpe.key_word!) ||
                viajeOpe.vehicle?.code?.includes(filterOpe.key_word!)) {
                return true;
            }


            if (viajeOpe.driver?.code?.toString().includes(filterOpe.key_word!) ||
                viajeOpe.driver?.code?.includes(filterOpe.key_word!)) {
                return true;
            }


            if (viajeOpe.client?.email?.toString().includes(filterOpe.key_word!) ||
                (viajeOpe.client?.firstName! + viajeOpe.client?.firstLastName! + viajeOpe.client?.secondLastName!).toString().includes(filterOpe.key_word!)) {
                return true;
            }

            if(viajeOpe.passenger){
                viajeOpe.passenger.forEach(pasajero => {
                    if ((pasajero.firstName + pasajero.firstLastName! + pasajero.secondLastName).toString().includes(filterOpe.key_word!)) {
                        return true;
                    }else {
                        return false
                    }
                });    
            }

            // COMPANY_PARTICULAR_ID
            // if (viajeOpe.companyName != 'PARTICULAR' && viajeOpe.companyName?.includes(filterOpe.key_word!)) {
            //     return true;
            // }
            // break;
    }

    return false;
}


export function getLstAtributeClasificate(typeAtribute: TypeAtribute, lstAtributosAll: Attribute[], lstSelAtribute: number[]): number[] {
    let lstTypeAtributte: number[] = [];
    if (lstAtributosAll && lstSelAtribute) {
        lstSelAtribute.forEach(atri => {
            let indexAtri = lstAtributosAll.findIndex(atributte => atributte.id == atri && atributte.fontTypeAtributte == typeAtribute);
            if (indexAtri > -1) lstTypeAtributte.push(atri);
        });
    }

    return lstTypeAtributte;
}
