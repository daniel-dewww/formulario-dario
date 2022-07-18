import { Masterdowload } from "src/app/class/masterdowload";
import { fnDateforPlatform } from "src/app/util/utilDate";
import { MT_RequestBrand, MT_RequestCostCenter, MT_RequestCoverage, MT_RequestCurrencyType, MT_RequestDestination, MT_RequestDriver, MT_RequestModelVehicle, MT_RequestModeReserve, MT_RequestPaymentType, MT_RequestServiceType, MT_RequestStatusType, MT_RequestTypeReceipt, MT_RequestVehicle, RequestTrip } from "./modal-trip-request.class";
import { ModalTrip, MT_StatusType } from "./modal-trip.class";

export async function fnObtenerCantidadAsientosInitEdit(idTiposervicio: number, dataMaestra: Masterdowload) {
    let cantAsientos: number = 1;

    if (idTiposervicio && dataMaestra.serviceTypes && dataMaestra.vehicleTypes) {
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

export function fnInitRequestTrip(requestTrip: RequestTrip): RequestTrip {

    requestTrip.passenger = (requestTrip.passenger) ? requestTrip.passenger : [];
    requestTrip.modeReserve = (requestTrip.modeReserve) ? requestTrip.modeReserve : new MT_RequestModeReserve();

    requestTrip.serviceType = (requestTrip.serviceType) ? requestTrip.serviceType : new MT_RequestServiceType();
    requestTrip.serviceType.id = (requestTrip.serviceType.id) ? requestTrip.serviceType.id : -1;

    requestTrip.statusType = (requestTrip.statusType) ? requestTrip.statusType : new MT_RequestStatusType();
    requestTrip.statusType.id = (requestTrip.statusType.id) ? requestTrip.statusType.id : -1;

    requestTrip.currencyType = (requestTrip.currencyType) ? requestTrip.currencyType : new MT_RequestCurrencyType();
    requestTrip.currencyType.id = (requestTrip.currencyType.id) ? requestTrip.currencyType.id : -1;

    requestTrip.paymentType = (requestTrip.paymentType) ? requestTrip.paymentType : new MT_RequestPaymentType();
    requestTrip.paymentType.id = (requestTrip.paymentType.id) ? requestTrip.paymentType.id : -1;

    requestTrip.typeReceipt = (requestTrip.typeReceipt) ? requestTrip.typeReceipt : new MT_RequestTypeReceipt();
    requestTrip.typeReceipt.id = (requestTrip.typeReceipt.id) ? requestTrip.typeReceipt.id : -1;

    requestTrip.coverage = (requestTrip.coverage) ? requestTrip.coverage : new MT_RequestCoverage();
    requestTrip.coverage.id = (requestTrip.coverage.id) ? requestTrip.coverage.id : -1;
    if (requestTrip.client && requestTrip.client.countryCode && requestTrip.client.countryCode == '51') {
        requestTrip.coverage.id = 1;
    }

    requestTrip.passenger = (requestTrip.passenger) ? requestTrip.passenger : [];

    requestTrip.destinations = (requestTrip.destinations) ? requestTrip.destinations : [];
    requestTrip.destinations.forEach(destinos => {
        destinos.origin = (destinos.origin) ? destinos.origin : new MT_RequestDestination();
        destinos.destination = (destinos.destination) ? destinos.destination : new MT_RequestDestination();
        destinos.passenger = (destinos.passenger) ? destinos.passenger : [];

        destinos.dateContact = (destinos.dateContact) ? fnDateforPlatform(requestTrip.dateContact as Date) : undefined;
        destinos.dateEnd = (destinos.dateEnd) ? fnDateforPlatform(requestTrip.dateEnd as Date) : undefined;
        destinos.dateStart = (destinos.dateStart) ? fnDateforPlatform(requestTrip.dateStart as Date) : undefined;
        // destinos.timeWait = (destinos.timeWait) ? destinos.timeWait : 0;
        // destinos.totalWait = (destinos.totalWait) ? destinos.totalWait : 0;

        // destinos.costDestination = (destinos.costDestination) ? destinos.costDestination : 0;
    });

    requestTrip.driver = (requestTrip.driver) ? requestTrip.driver : new MT_RequestDriver();
    requestTrip.vehicle = (requestTrip.vehicle) ? requestTrip.vehicle : new MT_RequestVehicle();
    requestTrip.vehicle.model = (requestTrip.vehicle.model) ? requestTrip.vehicle.model : new MT_RequestModelVehicle();
    requestTrip.vehicle.model.brand = (requestTrip.vehicle.model.brand) ? requestTrip.vehicle.model.brand : new MT_RequestBrand();
    // requestTrip.client = (requestTrip.client) ? requestTrip.client : new Client(); 
    // requestTrip.company = (requestTrip.company) ? requestTrip.company : new Company(); 

    requestTrip.dateAssignment = (requestTrip.dateAssignment) ? fnDateforPlatform(requestTrip.dateAssignment) : undefined;

    requestTrip.dateContact = (requestTrip.dateContact) ? fnDateforPlatform(requestTrip.dateContact) : undefined;

    requestTrip.dateEnd = (requestTrip.dateEnd) ? fnDateforPlatform(requestTrip.dateEnd) : undefined;

    requestTrip.dateReading = (requestTrip.dateReading) ? fnDateforPlatform(requestTrip.dateReading) : undefined;

    requestTrip.dateStart = (requestTrip.dateStart) ? fnDateforPlatform(requestTrip.dateStart) : undefined;

    requestTrip.costCenter = (requestTrip.costCenter) ? requestTrip.costCenter : new MT_RequestCostCenter();
    requestTrip.costCenter.id = (requestTrip.costCenter.id) ? requestTrip.costCenter.id : -1;

    requestTrip.serviceVehicleAttribute = (requestTrip.serviceVehicleAttribute) ? requestTrip.serviceVehicleAttribute : [];


    requestTrip.isImmediate = requestTrip.isImmediate
    requestTrip.phoneNumberReceived = (requestTrip.phoneNumberReceived) ? requestTrip.phoneNumberReceived : undefined;
    return requestTrip
}

export function initModalTrip(serviceTrip: RequestTrip): ModalTrip {
    serviceTrip = fnInitRequestTrip(serviceTrip);
    let trip: ModalTrip = {
        idModal: (new Date()).toString(),
        id: serviceTrip.id,
        uuid: serviceTrip.uuid,
        statusType: MT_RequestStatusTypeTOMT_StatusType(serviceTrip?.statusType!)
    };

    return trip
}


function MT_RequestStatusTypeTOMT_StatusType(requestStatusType:MT_RequestStatusType):MT_StatusType {
    return {
        id: requestStatusType?.id,
        name: requestStatusType?.name
    }    
}

