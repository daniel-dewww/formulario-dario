import { CargoInfo, Viaje } from 'src/app/class/viajes';
import { environment } from 'src/environments/environment';
import { PassengerFront, Passenger } from 'src/app/class/passenger';
import { GenericObject, fnModeReserveDefault } from 'src/app/class/genericObject';
import { CloneArray } from 'src/app/util/utilCopyWithoutReference';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { fnUnionDate_TimeString_WhitoutUTC, fnFormatTimeString, fnDateforPlatform, fnServiceDateSendString, fnServiceDateSend, fnDateToStringPlataform, date1MayorToDate2, fnServiceDateSendStringv2 } from 'src/app/util/utilDate';
import { ToastService } from 'src/app/service/toast.service';
import { Destinations, Destination, PassengerDestination } from 'src/app/class/destinations';
import { Driver } from 'src/app/class/driver';
import { Vehicle, Model, Attribute, TypeAtribute } from 'src/app/class/vehicle';
import { Client, DocumentType } from 'src/app/class/cliente';
import { CurrencyType } from 'src/app/class/currencyType';
import { CenterCost } from 'src/app/class/centerCost';
import { RoutinePrograms } from 'src/app/class/routinePrograms';
import { TipoPasajero } from 'src/app/class/enum/enumTipoPasajero';
import { TypeMarkers, PersonalisationMarker } from 'src/app/class/enum/enumMapa';
import { AttributesMaster, Masterdowload } from 'src/app/class/masterdowload';
import { Offers, GeneralObj, PaymentAvailable } from 'src/app/class/operaciones/offer';
import { ResponseGeoAutocomplete, Coordinate } from 'src/app/class/class-directive/serviceGeo';
import { Favorite } from 'src/app/class/favorite';
import { Coverage } from 'src/app/class/coverages';
import { COMPANY_PARTICULAR_ID } from 'src/app/class/varKerword';
import { EstadosViaje } from 'src/app/class/enum/enumEstados';
import { Company } from 'src/app/class/company';
import { cloneDeep } from 'lodash';
import { ServiceType } from 'src/app/class/enum/enumServiceType';

// incializacion valores; al crear o leer
export function fnInitViaje(viaje: Viaje): Viaje {
    viaje = (viaje) ? viaje : new Viaje()

    viaje.passenger = (viaje.passenger) ? viaje.passenger : [];
    viaje.modeReserve = (viaje.modeReserve) ? viaje.modeReserve : fnModeReserveDefault();

    viaje.serviceType = (viaje.serviceType) ? viaje.serviceType : new GenericObject();
    viaje.serviceType.id = (viaje.serviceType.id) ? viaje.serviceType.id : -1;

    viaje.statusType = (viaje.statusType) ? viaje.statusType : new GenericObject();
    viaje.statusType.id = (viaje.statusType.id) ? viaje.statusType.id : -1;

    viaje.currencyType = (viaje.currencyType) ? viaje.currencyType : new CurrencyType();
    viaje.currencyType.id = (viaje.currencyType.id) ? viaje.currencyType.id : -1;

    viaje.paymentType = (viaje.paymentType) ? viaje.paymentType : new GenericObject();
    viaje.paymentType.id = (viaje.paymentType.id) ? viaje.paymentType.id : -1;

    viaje.typeReceipt = (viaje.typeReceipt) ? viaje.typeReceipt : new GenericObject();
    viaje.typeReceipt.id = (viaje.typeReceipt.id) ? viaje.typeReceipt.id : -1;

    viaje.coverage = (viaje.coverage) ? viaje.coverage : new Coverage();
    viaje.coverage.id = (viaje.coverage.id) ? viaje.coverage.id : -1;
    if (viaje.client && viaje.client.countryCode && viaje.client.countryCode == '51') {
        viaje.coverage.id = 1;
    }

    viaje.passenger = (viaje.passenger) ? viaje.passenger : [];

    viaje.destinations = (viaje.destinations) ? viaje.destinations : [new Destinations()];
    viaje.destinations.forEach(destinos => {
        destinos.origin = (destinos.origin) ? destinos.origin : new Destination();
        destinos.destination = (destinos.destination) ? destinos.destination : new Destination();
        destinos.passenger = (destinos.passenger) ? destinos.passenger : [];

        destinos.dateAssignment = (destinos.dateAssignment) ? fnDateforPlatform(viaje.dateAssignment as Date) : undefined;
        destinos.dateContact = (destinos.dateContact) ? fnDateforPlatform(viaje.dateContact as Date) : undefined;
        destinos.dateEnd = (destinos.dateEnd) ? fnDateforPlatform(viaje.dateEnd as Date) : undefined;
        destinos.dateReading = (destinos.dateReading) ? fnDateforPlatform(viaje.dateReading as Date) : undefined;
        destinos.dateStart = (destinos.dateStart) ? fnDateforPlatform(viaje.dateStart as Date) : undefined;

        destinos.frontDateAssignment = (destinos.dateAssignment) ? fnDateToStringPlataform(destinos.dateAssignment) : undefined;
        destinos.frontDateContact = (destinos.dateContact) ? fnDateToStringPlataform(destinos.dateContact) : undefined;
        destinos.frontDateEnd = (destinos.dateEnd) ? fnDateToStringPlataform(destinos.dateEnd) : undefined;
        destinos.frontDateReading = (destinos.dateReading) ? fnDateToStringPlataform(destinos.dateReading) : undefined;
        destinos.frontDateStart = (destinos.dateStart) ? fnDateToStringPlataform(destinos.dateStart) : undefined;
        destinos.totalParking = destinos.totalParking ? destinos.totalParking : 0;
        destinos.totalToll = destinos.totalToll ? destinos.totalToll : 0;

        // destinos.timeWait = (destinos.timeWait) ? destinos.timeWait : 0;
        // destinos.totalWait = (destinos.totalWait) ? destinos.totalWait : 0;

        // destinos.costDestination = (destinos.costDestination) ? destinos.costDestination : 0;

        destinos.frontTotalViaje = (destinos.costDestination) ? destinos.costDestination : 0
            + (destinos.totalWait!) ? destinos.totalWait : 0;
    });

    viaje.driver = (viaje.driver) ? viaje.driver : new Driver();
    viaje.vehicle = (viaje.vehicle) ? viaje.vehicle : new Vehicle();
    viaje.vehicle.model = (viaje.vehicle.model) ? viaje.vehicle.model : new Model();
    viaje.vehicle.model.brand = (viaje.vehicle.model.brand) ? viaje.vehicle.model.brand : new GenericObject();
    // viaje.client = (viaje.client) ? viaje.client : new Client(); 
    // viaje.company = (viaje.company) ? viaje.company : new Company(); 

    viaje.frontDateTime = (viaje.serviceDateTime) ? fnDateforPlatform(viaje.serviceDateTime) : new Date();
    var s : any = fnDateforPlatform(viaje.serviceDateTime)
    var ss = s.toISOString()
    viaje.dateTime = (viaje.serviceDateTime) ? fnDateforPlatform(viaje.serviceDateTime) : new Date();
    viaje.frontServiceDateTime = (viaje.serviceDateTime) ? fnDateToStringPlataform(viaje.serviceDateTime as Date) : fnFormatTimeString(new Date(), 0);

    viaje.dateAssignment = (viaje.dateAssignment) ? fnDateforPlatform(viaje.dateAssignment) : undefined;
    viaje.frontDateAssignment = (viaje.dateAssignment) ? fnDateToStringPlataform(viaje.dateAssignment) : undefined;

    viaje.dateContact = (viaje.dateContact) ? fnDateforPlatform(viaje.dateContact) : undefined;
    viaje.frontDateContact = (viaje.dateContact) ? fnDateToStringPlataform(viaje.dateContact) : undefined;

    viaje.dateEnd = (viaje.dateEnd) ? fnDateforPlatform(viaje.dateEnd) : undefined;
    viaje.frontDateEnd = (viaje.dateEnd) ? fnDateToStringPlataform(viaje.dateEnd) : undefined;

    viaje.dateReading = (viaje.dateReading) ? fnDateforPlatform(viaje.dateReading) : undefined;
    viaje.frontDateReading = (viaje.dateReading) ? fnDateToStringPlataform(viaje.dateReading) : undefined;

    viaje.dateStart = (viaje.dateStart) ? fnDateforPlatform(viaje.dateStart) : undefined;
    viaje.frontDateStart = (viaje.dateStart) ? fnDateToStringPlataform(viaje.dateStart) : undefined;

    viaje.costCenter = (viaje.costCenter) ? viaje.costCenter : new CenterCost();
    viaje.costCenter.id = (viaje.costCenter.id) ? viaje.costCenter.id : -1;

    viaje.serviceVehicleAttribute = (viaje.serviceVehicleAttribute) ? viaje.serviceVehicleAttribute : [];

    viaje.frontFullName = (viaje.client && viaje.client.firstName && viaje.client.firstLastName && viaje.client.secondLastName) ? viaje.client.firstName + ' ' + viaje.client.firstLastName + ' ' + viaje.client.secondLastName : viaje.frontFullName;
    viaje.frontEmail = (viaje.client && viaje.client.email) ? viaje.client.email : '';

    viaje.isImmediate = viaje.isImmediate
    viaje.phoneNumberReceived = (viaje.phoneNumberReceived) ? viaje.phoneNumberReceived : undefined;
    viaje.frontCompanyId = (viaje.frontCompanyId) ? viaje.frontCompanyId : -1;
    viaje.cargoInfo = viaje.cargoInfo ? viaje.cargoInfo : new CargoInfo()
    viaje.cargoInfo.noHelpers = viaje.cargoInfo.noHelpers ? viaje.cargoInfo.noHelpers : 0;
    viaje.cargoInfo.noLevelOrigin = viaje.cargoInfo.noLevelOrigin ? viaje.cargoInfo.noLevelOrigin : 0;
    viaje.cargoInfo.noLevelDestination = viaje.cargoInfo.noLevelDestination ? viaje.cargoInfo.noLevelDestination : 0;
    viaje.cargoInfo.description = viaje.cargoInfo.description ? viaje.cargoInfo.description : '';
    viaje.dynamicFields = viaje.dynamicFields ? viaje.dynamicFields : [];
    return viaje
}

// inicializacion de cliente
export function fnInitClient(client: Client, cellPhone?: string): Client {
    // let viaje: Viaje = new Viaje();
    // viaje.client = (viaje.client) ? viaje.client : new Client();
    client.id = (client.id) ? client.id : undefined;
    client.uuid = (client.uuid) ? client.uuid : undefined;
    client.countryCode = (client.countryCode) ? client.countryCode : undefined;
    client.cellPhone = (client.cellPhone) ? client.cellPhone : cellPhone;
    client.firstName = (client.firstName) ? client.firstName : undefined;
    client.firstLastName = (client.firstLastName) ? client.firstLastName : undefined;
    client.secondLastName = (client.secondLastName) ? client.secondLastName : undefined;
    client.email = (client.email) ? client.email : '';
    // frontFullName = (client.firstName && client.firstLastName && client.secondLastName) ? client.firstName + '' + client.firstLastName + '' + client.secondLastName : client.firstName;
    client.jobTitle = (client.jobTitle) ? client.jobTitle : undefined;
    client.exigent = (client.exigent) ? client.exigent : false;
    client.vip = (client.vip) ? client.vip : false;
    client.observation = (client.observation) ? client.observation : undefined;
    client.document = (client.document) ? client.document : undefined;
    client.documentType = (client.documentType) ? client.documentType : new DocumentType();
    client.company = (client.company) ? client.company : new Company();
    client.costCenter = (client.costCenter) ? client.costCenter : new GenericObject();
    // company = (client.company) ? client.company : new Company();
    return client;
}

export function fnInitDestination(destinations: Destinations[]): Destinations[] {
    destinations = (destinations) ? destinations : [new Destinations()];
    destinations.forEach(destinos => {
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
        destinos.totalParking = destinos.totalParking ? destinos.totalParking : 0;
        destinos.totalToll = destinos.totalToll ? destinos.totalToll : 0;

        // destinos.timeWait = (destinos.timeWait) ? destinos.timeWait : 0;
        // destinos.totalWait = (destinos.totalWait) ? destinos.totalWait : 0;

        // destinos.costDestination = (destinos.costDestination) ? destinos.costDestination : 0;

        destinos.frontTotalViaje = (destinos.costDestination) ? destinos.costDestination : 0
            + (destinos.totalWait!) ? destinos.totalWait : 0;
    });

    return destinations
}

// listAttributes All
export function getLstAttributes(atributesAll: AttributesMaster[]): Attribute[] {
    let lstAttributeAll: Attribute[] = [];
    atributesAll.forEach(attributes => {
        attributes.companyAttributes?.forEach(companyAttribute => {
            let objAtributte = cloneDeep(companyAttribute)
            objAtributte.fontTypeAtributte = TypeAtribute.COMPANY;

            lstAttributeAll.push(objAtributte);
        })
        attributes.serviceAttributes?.forEach(serviceAttribute => {
            let objAtributte = cloneDeep(serviceAttribute)
            objAtributte.fontTypeAtributte = TypeAtribute.SERVICE;

            lstAttributeAll.push(objAtributte);
        })
        attributes.vehicleAttributes?.forEach(vehicleAttribute => {
            let objAtributte = cloneDeep(vehicleAttribute)
            objAtributte.fontTypeAtributte = TypeAtribute.VEHICLE;

            lstAttributeAll.push(objAtributte);
        })
    });
    return lstAttributeAll;
}

// inicializar lstPasajeros
export function fnInitLstPassenger(viaje: Viaje): PassengerFront[] {
    let lstPasajeros: PassengerFront[] = []

    let index: number = 0;

    if (viaje.id && viaje.id > 1) {

        lstPasajeros = CloneArray(viaje.passenger as PassengerFront[]);

        viaje.destinations?.forEach(destino => {
            destino.passenger = (destino.passenger) ? destino.passenger : [];
            if (destino.passenger.length) {
                destino.passenger.forEach(pasajeroD => {
                    let indexPass = lstPasajeros.findIndex(pasajero => pasajero.id == pasajeroD.id)
                    if (indexPass >= 0) {
                        if(fnGetServiceTypeCourier(viaje.serviceType?.id!)){
                            lstPasajeros[indexPass].frontTipoPasajeroSubida = 'D' + index
                        } else 
                        if (pasajeroD.isDropOff) {
                            lstPasajeros[indexPass].frontTipoPasajeroBajada = 'D' + (index + 1)
                        } else {
                            lstPasajeros[indexPass].frontTipoPasajeroSubida = 'D' + index
                        }

                        if (lstPasajeros[indexPass].clientId) {
                            lstPasajeros[indexPass].frontTipoPassenger = TipoPasajero.EMPRESA
                            let cliente = new Client();
                            cliente.id = lstPasajeros[indexPass].clientId;
                            cliente.firstName = lstPasajeros[indexPass].firstName;
                            cliente.firstLastName = lstPasajeros[indexPass].firstLastName;
                            cliente.secondLastName = lstPasajeros[indexPass].secondLastName;
                            // cliente.countryCode = lstPasajeros[indexPass].countryCode;

                            lstPasajeros[indexPass].frontPasajeroEmpresaInit = cliente;
                        } else {
                            lstPasajeros[indexPass].frontTipoPassenger = TipoPasajero.VISITA
                        }
                    }
                });
            }
            index++;
        });
    }

    return lstPasajeros;
}

// Adaptar a una estructura Datetime
export function fnAgregarHoraALista(lstNgbDateSatruct: NgbDateStruct[], horaLst: string): Date[] {

    let lstDateReturn: Date[] = []

    if (horaLst && lstNgbDateSatruct) {
        lstNgbDateSatruct.forEach(element => {
            lstDateReturn.push(fnUnionDate_TimeString_WhitoutUTC(new Date(element.year, element.month - 1, element.day), horaLst));
        });

    }
    return lstDateReturn;
}

//estructurar el objeto Viaje para enviar al servicio save o edit
export function fnGuardarViaje(viaje: Viaje, lstRutina: Date[], lstRetorno: Date[], lstPasajero: PassengerFront[], destinationsPrice: number[],flagSinDireccion: boolean, txtCantidadMoviles: number, isImmediate: boolean): Viaje {
    let objViaje: Viaje = viaje;

    let indexDestino: number = 0;
    objViaje.destinations?.forEach(destino => {
        destino.passenger = []
        if (objViaje.destinations && indexDestino > 0) {
            destino.origin = objViaje.destinations[indexDestino - 1].destination
        }
        if(destinationsPrice && destinationsPrice.length > indexDestino){            
            destino.costDestination = destinationsPrice[indexDestino];
        }

        indexDestino++;
    });

    viaje.passenger = [];

    if(fnGetServiceTypeCourier(viaje.serviceType?.id!) && lstPasajero.length == 1){
        let passenger: PassengerFront = new PassengerFront()
        passenger.firstName = viaje.client?.firstName;
        passenger.firstLastName = viaje.client?.firstLastName;
        passenger.id = lstPasajero.length + 1;
        passenger.secondLastName = viaje.client?.secondLastName;
        passenger.cellPhone = viaje.client?.cellPhone;
        passenger.clientId = viaje.client?.id;
        passenger.countryCode = viaje.client?.countryCode;
        lstPasajero.push(passenger);
        lstPasajero[0].id = 2;
        lstPasajero[1].id = 1;

        lstPasajero.sort(function (a, b) {
            if (a.id! > b.id!) {
              return 1;
            }
            if (a.id! < b.id!) {
              return -1;
            }
            // a must be equal to b
            return 0;
        });
    }

    if (lstPasajero && lstPasajero.length > 0) {
        lstPasajero.forEach(pasajero => {
            pasajero.frontTipoPasajeroBajada = (!pasajero.frontTipoPasajeroBajada) ? ('D' + objViaje.destinations?.length) : pasajero.frontTipoPasajeroBajada

            let passenger: Passenger = new Passenger()
            passenger.firstName = pasajero.firstName;
            passenger.firstLastName = pasajero.firstLastName;
            passenger.id = pasajero.id;
            passenger.secondLastName = pasajero.secondLastName;
            passenger.cellPhone = pasajero.cellPhone?.trim();
            passenger.clientId = pasajero.clientId;
            passenger.countryCode = ((pasajero.cellPhone && pasajero.cellPhone.trim().length > 0) ? pasajero.countryCode : undefined);
            viaje.passenger?.push(passenger);

            let passengerDestinoSubida: PassengerDestination = new PassengerDestination()
            passengerDestinoSubida.id = pasajero.id;
            passengerDestinoSubida.isDropOff = false;

            if (pasajero.frontTipoPasajeroSubida && pasajero.frontTipoPasajeroSubida.split('D')[1] == '0') {
                if (viaje.destinations && viaje.destinations.length > parseInt(pasajero.frontTipoPasajeroSubida.split('D')[1])) {
                    viaje.destinations[parseInt(pasajero.frontTipoPasajeroSubida.split('D')[1])].passenger?.push(passengerDestinoSubida);
                }
            } else {
                if (viaje.destinations && pasajero.frontTipoPasajeroSubida && viaje.destinations.length > parseInt(pasajero.frontTipoPasajeroSubida.split('D')[1]) - 1) {
                    viaje.destinations[(parseInt(pasajero.frontTipoPasajeroSubida.split('D')[1]) - 1)].passenger?.push(passengerDestinoSubida);
                }
            }

            let passengerDestinoBajada: PassengerDestination = new PassengerDestination()
            passengerDestinoBajada.id = pasajero.id;
            passengerDestinoBajada.isDropOff = true;
            if (pasajero.frontTipoPasajeroBajada && pasajero.frontTipoPasajeroBajada.split('D')[1] == '0') {
                if (viaje.destinations && viaje.destinations.length! > parseInt(pasajero.frontTipoPasajeroBajada.split('D')[1])) {
                    viaje.destinations[parseInt(pasajero.frontTipoPasajeroBajada.split('D')[1])].passenger?.push(passengerDestinoBajada);
                }
            } else {
                if (viaje.destinations && viaje.destinations.length! > parseInt(pasajero.frontTipoPasajeroBajada.split('D')[1]) - 1) {
                    viaje.destinations[(parseInt(pasajero.frontTipoPasajeroBajada.split('D')[1]) - 1)].passenger?.push(passengerDestinoBajada);
                }
            }

        });

        if(fnGetServiceTypeCourier(viaje.serviceType?.id!)){
            viaje.destinations?.forEach(destination => {
                if(destination.passenger?.length == 4){
                    destination.passenger?.splice(1,2);
                } else if (destination.passenger?.length == 3){
                    destination.passenger[0].isDropOff = false;
                    destination.passenger?.splice(1,1);
                }
            });
        }

    } else {
        let passenger: PassengerFront = new PassengerFront()
        passenger.firstName = viaje.client?.firstName;
        passenger.firstLastName = viaje.client?.firstLastName;
        passenger.id = lstPasajero.length + 1;
        passenger.secondLastName = viaje.client?.secondLastName;
        passenger.cellPhone = viaje.client?.cellPhone;
        passenger.clientId = viaje.client?.id;
        passenger.countryCode = viaje.client?.countryCode;
        viaje.passenger.push(passenger);

        passenger.frontTipoPasajeroSubida = 'D0';

        if (flagSinDireccion) {
            passenger.frontTipoPasajeroBajada = ('D' + (objViaje.destinations?.length));
        }

        let passengerDestinoSubida: PassengerDestination = new PassengerDestination()
        passengerDestinoSubida.id = passenger.id;
        passengerDestinoSubida.isDropOff = false;
        if(viaje.destinations){                
            viaje.destinations[0].passenger?.push(passengerDestinoSubida);
        }

        if (flagSinDireccion) {
            let passengerDestinoBajada: PassengerDestination = new PassengerDestination()
            passengerDestinoBajada.id = passenger.id;
            passengerDestinoBajada.isDropOff = true;
            if(viaje.destinations){                
                viaje.destinations[(objViaje.destinations?.length! - 1)].passenger?.push(passengerDestinoBajada);
            }
        }

        lstPasajero.push(passenger);
    }

    viaje.routinePrograms = [];

    if (lstRutina && lstRutina.length > 0) {
        lstRutina.forEach(rutina => {
            let routinePrograms: RoutinePrograms = new RoutinePrograms();
            routinePrograms.serviceDateTime = fnServiceDateSend(rutina)
            routinePrograms.quantityVehicle = parseInt(txtCantidadMoviles + '');

            viaje.routinePrograms?.push(routinePrograms)
        });
    }

    if (lstRetorno && lstRetorno.length > 0) {
        lstRetorno.forEach(retorno => {
            let routinePrograms: RoutinePrograms = new RoutinePrograms();
            routinePrograms.returnDateTime = fnServiceDateSend(retorno)
            routinePrograms.quantityVehicle = parseInt(txtCantidadMoviles + '');

            viaje.routinePrograms?.push(routinePrograms)
        });
    }

    viaje.typeReceipt = (viaje.serviceType && viaje.typeReceipt?.id && viaje.typeReceipt?.id > -1) ? viaje.typeReceipt : null!;
    viaje.costCenter = (viaje.costCenter && viaje.costCenter.id && viaje.costCenter.id > -1) ? viaje.costCenter : null!;

    
    console.log("viaje.dateTime")
    console.log(viaje.dateTime)
     if (viaje.id && viaje.id > 0) {
        viaje.serviceDateTime = fnServiceDateSendString(viaje.frontDateTime!, viaje.frontServiceDateTime!);
        viaje.dateTime = fnServiceDateSendString(viaje.frontDateTime!, viaje.frontServiceDateTime!);  
    } else {
        let dateFront = fnDateforPlatform(fnServiceDateSendString(viaje.frontDateTime!, viaje.frontServiceDateTime!));
        let newDateFront = fnDateforPlatform(fnServiceDateSendString(new Date(), new Date().getHours() + ':' + new Date().getMinutes()));

        if (date1MayorToDate2(dateFront, newDateFront)) {
            viaje.serviceDateTime = fnServiceDateSendString(viaje.frontDateTime!, viaje.frontServiceDateTime!);
            viaje.dateTime = fnServiceDateSendString(viaje.frontDateTime!, viaje.frontServiceDateTime!);  

        } else {
            viaje.serviceDateTime = fnServiceDateSendString(newDateFront, newDateFront.getHours() + ':' + newDateFront.getMinutes());
            viaje.dateTime = fnServiceDateSendString(newDateFront, newDateFront.getHours() + ':' + newDateFront.getMinutes());  

        }

        if (txtCantidadMoviles - 1 > 0) {

            let routinePrograms: RoutinePrograms = new RoutinePrograms();
            routinePrograms.serviceDateTime = viaje.serviceDateTime;
            routinePrograms.quantityVehicle = txtCantidadMoviles - 1;

            viaje.routinePrograms.push(routinePrograms)
        }

        // let serviceDateTime: string;
        // if (date1MayorToDate2(dateFront, newDateFront)) {
        //     serviceDateTime = fnServiceDateSendString(viaje.frontDateTime, viaje.frontServiceDateTime);
        // } else {
        //     serviceDateTime = fnServiceDateSendString(newDateFront, newDateFront.getHours() + ':' + newDateFront.getMinutes());
        // }

        // let routinePrograms: RoutinePrograms = new RoutinePrograms();
        // routinePrograms.serviceDateTime = serviceDateTime;
        // routinePrograms.quantityVehicle = parseInt(txtCantidadMoviles + '');

        // viaje.routinePrograms.push(routinePrograms)
    }
    
    viaje.isImmediate = (isImmediate == false) ? false : getTimeDispatch(viaje.serviceDateTime);
    viaje.phoneNumberReceived = (viaje.phoneNumberReceived) ? viaje.phoneNumberReceived : null!;

    // viaje.serviceDateTime = fnServiceDateSendString(viaje.frontDateTime, viaje.frontServiceDateTime)
    return objViaje;
}

// validacion de viaje true; si es correcto / false incorrecto
export function fnObjValidacionViaje(viaje: Viaje, txtCantidadMoviles: number, lstPasajero: PassengerFront[], flagSinDireccion: boolean, _serviceToast: ToastService, centroCostoEdit: CenterCost, nroDestination: number): boolean {
    let response: boolean = true
    // console.log((viaje.company && viaje.company.id != COMPANY_PARTICULAR_ID) && (!viaje.costCenter || !viaje.costCenter.id || viaje.costCenter.id == -1))
    if (!viaje.clientId) {
        _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_CLIENTE);
        response = false;
    } else if (!viaje.companyId) {
        _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_EMPRESA);
        response = false;
    } else if ( (!viaje.costCenter || !viaje.costCenter.id || viaje.costCenter.id == -1)) {
        _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_CENTRO_COSTO);
        response = false;
    }
    // else if (!viaje.frontDateTime) {
    //     _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_FECHA);
    //     response = false;
    // } else if (!viaje.frontServiceDateTime) {
    //     _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_HORA);
    //     response = false;
    // }
    // else if (!viaje.coverage) {
    //     _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_COBERTURA);
    //     response = false;
    // } 
    else if (parseInt(txtCantidadMoviles + '', 10) < 1) {
        _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_CANT_AUTOS + '  ' + parseInt(txtCantidadMoviles + '', 10));
        response = false;
    } else if (!viaje.serviceType || !viaje.serviceType.id || viaje.serviceType.id == -1) {
        _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_TIPO_SERVICIO);
        response = false;
    } else if (!viaje.paymentType || !viaje.paymentType.id || viaje.paymentType.id == -1) {
        _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_TIPO_PAGO);
        response = false;
    } else if (!viaje.coverage || !viaje.coverage.id || viaje.coverage.id == -1) {
        _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_COBERTURA);
        response = false;
    } else if (fnValidateCantDestination(viaje.serviceType.id, viaje.destinations!)){
        _serviceToast.showError("El tipo de servicio seleccionado tiene un máximo en destinos de: " + nroDestination);
        response = false;
    } else if (viaje.serviceType.id == ServiceType.COURIER && lstPasajero?.length! < 1){
        _serviceToast.showError("Es obligatorio solo 2 pasajeros en el servicio seleccionado.");
        response = false;
    }

    // if (lstPasajero && lstPasajero.length > 0) {
    //     lstPasajero.forEach(pasajero => {
    //         if (!pasajero.cellPhone) {
    //             _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_PASAJERO_TELEFONO);
    //             response = false;
    //             return;
    //         } else if (pasajero.cellPhone.length < 6) {
    //             _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_PASAJERO_TELEFONO);
    //             response = false;
    //             return;
    //         }
    //     });
    // }

    // if (viaje.destinations && viaje.destinations.length > 0) {
    //     let index: number = 1;
    //     viaje.destinations.forEach(destino => {
    //         if (index == 1 && (!destino.origin || destino.origin.addressMainText == undefined || destino.origin.addressMainText.length <= 0)) {
    //             _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_ORIGEN);
    //             response = false;
    //             return;
    //         } else if (!flagSinDireccion && (!destino.destination || destino.destination.addressMainText == undefined || destino.destination.addressMainText.length <= 0)) {
    //             _serviceToast.showError(environment.MSJE_CLIENTE.MODAL_VIAJE.ERROR.NO_ENCONTRO_DESTINO + ' ' + index);
    //             response = false;
    //             return;
    //         }
    //         index++;
    //     });
    // }

    return response
}

export function fnDetalleViaje(latLng: google.maps.LatLng, showTittle: boolean, tittle: string, tipoMarker: TypeMarkers, isDragable: boolean, index?: number): PersonalisationMarker {
    let detalle: PersonalisationMarker = new PersonalisationMarker();

    detalle.posicion = latLng;
    detalle.showTittle = showTittle;
    // detalle.tittle = tittle;
    detalle.idDestino = (index) ? index : undefined!;
    detalle.tipoMarker = tipoMarker;
    detalle.isDragable = isDragable;
    detalle.showInfowindow = true;
    detalle.tittle = tittle;
    detalle.infoWindow = new google.maps.InfoWindow({
        content: '<b> ' + tittle + ' </b> '
    });


    return detalle
}

export function fnValidatePositionMarker(latitud: number, longitude: number) {
    let validate: boolean = false;
    if (latitud && longitude) {
        validate = true;
    }

    return validate;
}

export function fnServiceTypeInitEdit(viaje: Viaje): Offers {
    let serviceTypeInit = new Offers();
    serviceTypeInit.serviceType = new GeneralObj();
    serviceTypeInit.currencyType = new CurrencyType();
    serviceTypeInit.priceAvailableOnOnlyServiceFinish = (viaje.totalService) ? false : true;
    serviceTypeInit.priceEstimate = viaje.totalService;
    serviceTypeInit.serviceType.id = viaje.serviceType?.id! + 0;
    serviceTypeInit.serviceType.description = viaje.serviceType?.description + '';
    serviceTypeInit.serviceType.name = viaje.serviceType?.name + '';
    serviceTypeInit.currencyType.id = viaje.currencyType?.id! + 0;
    serviceTypeInit.currencyType.name = viaje.currencyType?.name + '';
    serviceTypeInit.currencyType.symbol = viaje.currencyType?.symbol + '';

    return serviceTypeInit;
}

export function fnServicePaymentInitEdit(viaje: Viaje): PaymentAvailable {
    let servicePaymentInit = new PaymentAvailable();
    servicePaymentInit.id = viaje.paymentType?.id! + 0;
    servicePaymentInit.name = viaje.paymentType?.name + '';

    return servicePaymentInit;
}

export function fnCostCenterInitEdit(findCenterCost: CenterCost): CenterCost {
    let centroCostoEdit = new CenterCost();
    centroCostoEdit.id = findCenterCost.id! + 0;
    centroCostoEdit.description = findCenterCost.description + '';
    centroCostoEdit.description = findCenterCost.name + '';

    return centroCostoEdit;
}

export async function fnObtenerCantidadAsientosInitEdit(idTiposervicio: number, dataMaestra: Masterdowload) {
    let cantAsientos: number = 1;

    if (dataMaestra.serviceTypes && dataMaestra.vehicleTypes) {
        let serviceType = dataMaestra.serviceTypes.find(serviceType => serviceType.id == idTiposervicio);
        if (serviceType) {
            let vehicleType = dataMaestra.vehicleTypes.find(vehicleType => vehicleType.id == serviceType?.vehicleTypeId);
            if (vehicleType) {
                cantAsientos = vehicleType.numberPassenger!;
            }
        }
    }

    return cantAsientos;
}

export function fnConvertFavoritesToGeoAutocomplete(lstFavorites: Favorite[]): ResponseGeoAutocomplete[] {
    let lstGeoAutocomplete: ResponseGeoAutocomplete[] = []
    lstFavorites.forEach(favorito => {
        let geoAutocomplete: ResponseGeoAutocomplete = new ResponseGeoAutocomplete();
        geoAutocomplete.favorito = true;
        geoAutocomplete.favoritoJson = favorito
        geoAutocomplete.containsCoordinate = true;
        geoAutocomplete.coordinate = new Coordinate();
        geoAutocomplete.coordinate.latitude = favorito.latitude;
        geoAutocomplete.coordinate.longitude = favorito.longitude;
        geoAutocomplete.mainText = favorito.mainText;
        geoAutocomplete.secondaryText = favorito.secondaryText;
        geoAutocomplete.zone = new GenericObject;
        geoAutocomplete.zone.id = favorito.zone?.id;
        geoAutocomplete.zone.description = favorito.zone?.description;
        lstGeoAutocomplete.push(geoAutocomplete);
    });
    return lstGeoAutocomplete;
}

export function fnShowOffer(idStatusType: number) {
    return (idStatusType == EstadosViaje.APROBADO) ? true : false;
}

export function fnShowRemoveDriver(idStatusType: number) {
    switch (idStatusType) {
        case EstadosViaje.CANCELADO_USUARIO:
        case EstadosViaje.CANCELADO_CONDUCTOR:
        case EstadosViaje.CANCELADO_BASE:
        case EstadosViaje.TERMINO:
        case EstadosViaje.APROBADO:
        case EstadosViaje.NO_APROBADO:
        case EstadosViaje.PENDIENTE_APROBACION:
        case EstadosViaje.SIN_ATENCION:
        case EstadosViaje.BUSCANDO_CONDUCTOR:
        case EstadosViaje.PREGUNTANDO_CONDUCTOR:
        case EstadosViaje.BUSCANDO_VEHICULO:
        case EstadosViaje.BUSCANDO_VEHICULO_SCLEDULE:
        case EstadosViaje.ANULADO_BASE:
        case EstadosViaje.CANCELADO_USUARIO_BUSQUEDA:
        case EstadosViaje.CONDUCTOR_RETIRADO:
            return false;

        default:
            return true;
    }
}

export function fnShowCancel(idStatusType: number) {
    switch (idStatusType) {
        case EstadosViaje.TERMINO:
            return false;

        default:
            return true;
    }
}

export function fnShowRetained(idStatusType: number) {
    switch (idStatusType) {
        case EstadosViaje.APROBADO:
            return true;

        case EstadosViaje.TERMINO:
            return false;

        default:
            return false;
    }
}

export function fnSplitMainSecundaryText(textSplit: any): string {
    let returnText: string = textSplit;
    if(textSplit && textSplit.split(',')){
        
        let mainText = textSplit.split(',')
        returnText = mainText[0];
    }

    return returnText    
}

export function getTimeDispatch(serviceDateTime: string): boolean {
    let timeDispatch;
    let isInmediate: boolean = true;
    timeDispatch = Math.floor(+fnDateforPlatform(serviceDateTime) - +new Date(fnDateforPlatform(new Date()))) / 1000;
    timeDispatch = parseFloat( (timeDispatch / 60).toFixed(0));
    if (timeDispatch >= 3) {
        isInmediate = false;
    }

    return isInmediate;
}

export function fnGetServiceTypeCarga(idServiceType : number) : boolean{
    switch (idServiceType) {
        case ServiceType.CARGA:
            return true;
        default:
            return false;
    }
}

export function fnGetServiceTypeCourier(idServiceType : number): boolean {
    switch (idServiceType) {
        case ServiceType.COURIER:
            return true;
        default:
            return false;
    }
}

export function fnValidateCantDestination(idServiceType : number, lstDestination: Destinations[]): boolean{
    if((fnGetServiceTypeCourier(idServiceType) || fnGetServiceTypeCarga(idServiceType)) && lstDestination.length > 1){
        return true;
    } else {
        return false;
    }
}