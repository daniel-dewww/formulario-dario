export enum EstadosConductor {
  FIN_JORNADA = 15,
  LIBRE = 16,
  OCUPADO = 17,
  DESCONECTADO = 18,
  SUSPENDIDO = 19,
  BLOQUEADO = 20,
  CERRADO = 21,
  ENSERVICIO = 22,
}

export enum TipoVehiculos {
  VAN = 1,
  SEDAN = 2,
  MOTO = 3,
}

export enum ColorHexEstadoConductor {
  // LIBRE = '#27AE60',
  // ENSERVICIO = '#3D5AFE',
  // OCUPADO = '#4C535A',
  // DESCONECTADO = '#da5858',
  
  LIBRE = '#27AE60',
  ENSERVICIO = '#3D5AFE',
  OCUPADO = '#3D5AFE',
  DESCONECTADO = '#da5858',

  
  FINISHED = '#4999a5',
  BOARD = '#7a49a5',  
  ASSIGNED = '#a57a49',
  
}

export enum Languaje {
  ES = 'es',
  EN = 'en',
}


export enum EstadosViajeGroup {
  All = -1,
  PENDING = 1,
  ASSIGNED = 2,
  BOARD = 3,
  CANCEL = 4,
  OTHERS = 5,
  FINISHED = 6
}

export enum EstadosViaje {
  All = -1,
  APROBADO = 1,
  ASIGNADO = 2,
  LEIDO = 3,
  UBICADO = 4,
  CONTACTO = 5,
  INICIO = 6,
  LLEGO_DESTINO = 7,
  TERMINO = 8,
  CANCELADO_USUARIO = 9,
  CANCELADO_CONDUCTOR = 10,
  CANCELADO_BASE = 11,
  ANULADO_BASE = 12,
  PREASIGNADO = 13,
  DESPLAZAMIENTO = 14,
  NO_APROBADO = 23,
  PENDIENTE_APROBACION = 24,
  BUSCANDO_VEHICULO = 25,
  BUSCANDO_VEHICULO_SCLEDULE = 26,
  RECHAZADO = 27,
  CANCELADO_USUARIO_BUSQUEDA = 28,
  PRECIERRE = 29,
  CONDUCTOR_RETIRADO = 30,
  SIN_ATENCION = 31,
  BUSCANDO_CONDUCTOR = 32,
  PREGUNTANDO_CONDUCTOR = 33,
  RECHAZO_NO_SE_ENCONTRO_CONDUCTOR = 35,
  RETENIDO = 36
}

export enum StatusTypeDriver {
  APPROVED = 'APPROVED',
  SUSPEND = "SUSPEND",
  SUSPEND_TIME = 'SUSPEND_TIME',
  BLOCKED = 'BLOCKED',
  CLOSED = 'CLOSED',
}

export enum StatusTypeDocument {
  APPROVED = 'DOCUMENT_RESULT_APPROVED',
  REJECTED = 'DOCUMENT_RESULT_REJECTED',
  IN_REVIEW = 'DOCUMENT_RESULT_IN_REVIEW',
  START = 'START'
}

export enum ValidateStructureButton {
  NO_V = 0,
  VALIDATION = 1,
  OK = 2,
  ERROR = 3,
}

export enum PaymentTypes {
  EFECTIVO = 100,
  TARJETA = 101,
  POS = 104,
  YAPE = 105,
  VALE = 106,
  PLIN = 107
}