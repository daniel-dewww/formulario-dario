
export enum Type_Shortcut{
    KEY_GLOBAL='KEY_GLOBAL',
    KEY_INTERNAL='KEY_INTERNAL'
}

export enum ValueKeysGlobal {
    NEW_TRIP = 'space',
    EDIT_TRIP = 'shift + e',
    FIND_SCREEN = 'shift + b',
    FIND_MONITORING = 'shift + l',
    TYPE_CAR = 'shift + z',
    SEARCH_ID = 'shift + s',
    LIST_SERVICE_SERVED = 'shift + a',
    SMS_INFORMATION_DRIVER = 'shift + d',

    DRIVER_DETAILS_1 = '1',
    DRIVER_DETAILS_2 = '2',
    DRIVER_DETAILS_3 = '3',
    DRIVER_DETAILS_4 = '4',
    DRIVER_DETAILS_5 = '5',
    DRIVER_DETAILS_6 = '6',
    DRIVER_DETAILS_7 = '7',
    DRIVER_DETAILS_8 = '8',
    DRIVER_DETAILS_9 = '9',
    DRIVER_DETAILS_0 = '0',

    DISABLED_USER = 'shift + x',
}

export enum ValueKey{
    ARROW_UP = 'ArrowUp',
    ARROW_DOWN = 'ArrowDown',
    O_C = 'a',
    SAVE = 'b',
    
    SELECT = 'Enter', // Editar Viaje
    TAB = 'Tab', // Ver Tracking
    ASSIGN_TRIP = 'shift + p', // Asignar Viaje
    CANCEL_TRIP = 'shift + c', // Cancelar Viaje
    REMOVE_DRIVER = 'shift + r', // Retirar Conductor
    DETAINED_TRIP = 'shift + s', // Retener Servicio
    DUPLICATE_TRIP = 'shift + f', // Duplicar Servicio
    CLOSE_MODAL = 'Escape', // Cerrar Modal

    ARROW_LEFT = 'ArrowLeft',
    SHIFT_L = 'shift + l',
    SHIFT_B = 'shift + b',
    SHIFT_V = 'shift + v',
    SHIFT_T = 'shift + c',
    SHIFT_M = 'shift + t',

    SHIFT_U = 'shift + u',
    SHIFT_P = 'shift + p',
    SHIFT_A = 'shift + a',
    SHIFT_R = 'shift + r',
    SHIFT_S = 'shift + s',
    SHIFT_X = 'shift + x',
    ESC = 'escape',

    SHIFT_F = 'shift + f', // Finalizar Jornada
    SHIFT_G = 'shift + g', // Iniciar Jornada
    SHIFT_H = 'shift + h', // Conductor Ocupado
    SHIFT_D = 'shift + d', // Conductor Cerrado
}

export enum ID_Screen{
    PROFILE = "PROFILE",    
    OPERATION = "OPERATION",
    MONITORING = "MONITORING",
    MAINTAINER_DRIVER  = "MAINTAINER_DRIVER",
    MAINTAINER_COMPANY  = "MAINTAINER_COMPANY",
    MAINTAINER_ZONE  = "MAINTAINER_ZONE",
    MAINTAINER_USER = "MAINTAINER_USER",
    MAINTAINER_CLIENT = "MAINTAINER_CLIENT_COMPANY",
    MAINTAINER_VEHICLE = "MAINTAINER_VEHICLE",
    MAINTAINER_COSTCENTER = "MAINTAINER_COSTCENTER",
    MAINTAINER_AREA = "MAINTAINER_AREA",
    MODAL_TRAVEL = "MODAL_TRAVEL",
    SHORT_CUT = "SHORT_CUT",
    MAINTAINER_MESSAGE = "MAINTAINER_MESSAGE",
    MAINTAINER_PERMISSION = "PERMISSION",
    REPORTS = "REPORTS",

    MODAL_DRIVER_DETAILS = 'MODAL_DRIVER_DETAILS',
    MODAL_MESSAGE = 'MODAL_MESSAGE',
    MODAL_DRIVER_STATUS = 'MODAL_DRIVER_STATUS',
    MODAL_VALIDATE_BALANCE = 'MODAL_VALIDATE_BALANCE',
    MODAL_EXIT_CONFIRMATION = 'MODAL_EXIT_CONFIRMATION',
    MODAL_AUDIT_TRIP = 'MODAL_AUDIT_TRIP',
    MODAL_DYNAMIC_FIELDS = 'MODAL_DYNAMIC_FIELDS'
}

export enum Components_Operation{
    FIND_RESERVE = "FIND_RESERVE",    
    LST_MOVILE = "LST_MOVILE",
    TABLE_TRAVEL = "TABLE_TRAVEL",
}

export enum Components_Monitoring{
    SEARCH_TABLE_DRIVER = "SEARCH_TABLE_DRIVER",    
    TABLE_DRIVER = "TABLE_DRIVER",
}

export enum Component_ModalTravel {
    DESTINATION = "DESTINATION"
}

export enum Component_ExitConfirmation {
    EXIT_CONFIRMATION = "EXIT_CONFIRMATION"
}

export enum Component_ModalDriverDetails {
    DRIVER_DETAILS = "DRIVER_DETAILS",
    LST_TRAVELS = "LST_TRAVELS",
    TRACKING_DRIVER = "TRACKING_DRIVER",
    DATA_LOG = "DATA_LOG",
    DRIVER_STATUS = 'DRIVER_STATUS'
}
