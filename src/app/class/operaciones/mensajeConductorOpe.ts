import { Client } from "../cliente";
import { Driver } from "../driver";
import { IdClient } from "../typesKeyword";
import { User } from "../user";
import { Vehicle } from "../vehicle";

export enum TypeConversationMessage {
    SERVICE = 'SERVICE',
    OPERATIONS = 'OPERATIONS',
    CLIENT = "CLIENT",
    DRIVERS_OPERATIONS = "DRIVERS_OPERATIONS"
}

export enum TypeFromMessage {
    DRIVER = "DRIVER",
    CLIENT = "CLIENT",
    OPERATOR = "OPERATOR"
}

export enum PriorityMessageMessage {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

export class ResponseSendMessage {
    id?: number;
    uuid?: string;
  }

export class UserPostInformation {
    userUuid?: string;
    conversation_uuid?: string;
    message? : messageRequest;
}

export class UserPostReadMessage {
    userUuid?: string;
    conversation_uuid?: string;
    message_uuid? : string;
}

export class messageRequest{
        body?: string;
        priority?: PriorityMessageMessage
        isSpeak?: boolean;
}

export class UserGetConversation {
    userUuid?: string;
    query?:string;
    type_result?:string;
}

export class UserGetInformation {
    userUuid?: string;
    conversation_uuid?: string;
    contains_in_body?:string;
    date_start?:string;
    date_end?:string;
}

export class UserPost {
    userUuid?: string;
    request?: any;
}

export class MessageUserReciver {
    id?: string;
    uuid?: string;
    type?: TypeConversationMessage;
    receiver?: ReciverMessage;
    lastMessage?:LastMessage;
}

export class ReciverMessage {
    client?: Client;//Only id and uuid
    driver?: Driver;//Only id, code and uuid
    vehicle?: Vehicle;//Only id, code and uuid
    operator?: User;//Only id and uuid
    fullName?: string;
    type?: TypeFromMessage;
}

export class LastMessage {
    id?: string;    
    uuid?: string
    body?: string;
    priority?: PriorityMessageMessage;
    readedDate?: Date;
    createdDate?: Date;
}



export class MessageUserSender {
    id?: string;
    uuid?: string;
    body?: string;
    createdDate?: Date;
    readedDate?: Date;
    priority?: string;
    sender?: SenderMessage;


    frontCreatedDate?: Date;
    frontReadedate?: Date;    
}

export class SenderMessage {
    client?: Client;//Only id and uuid
    driver?: Driver;//Only id, code and uuid
    vehicle?: Vehicle;//Only id, code and uuid
    operator?: User;//Only id and uuid
    fullName?: string;
    type?: TypeFromMessage;
    urlPicture?: string
}

export class MessageMovil {
    conversation?: ConversationMessage;
    message?: MessageMessage;
    from?: FromMessage;
}

export class ConversationMessage {
    id?: number |string
    type?: TypeConversationMessage;
    uuid?: string;
}

export class MessageMessage {
    id?: number |string
    uuid?: string;
    body?: string;
    priority?: PriorityMessageMessage;
    createdDate?: Date;
    readedDate?: Date;
    frontCreateDate?: Date;
    frontRaedDate?: Date;
}

export class FromMessage {
    fullName?: string;
    urlPicture?: string;
    driver?: Driver;
    vehicle?: Vehicle;
    operator?: User;
    client?: Client;
    type?: TypeFromMessage;
    clientId?: IdClient;
    operatorId?: number;
}

export class FindConversationMessage {
    id?: number;
    uuid?: number;
    type?: TypeFromMessage;
    priority?: PriorityMessageMessage;
    body?: string;
    fullName?: string;
    createdDate?: Date;
    readedDate?: Date;

    client?: Client;//Only id and uuid
    driver?: Driver;//Only id, code and uuid
    vehicle?: Vehicle;//Only id, code and uuid
    operator?: User;//Only id and uuid
}


export function arrayMessage(): MessageMovil[] {
    let menssgeOpe: MessageMovil[] = [];
    menssgeOpe.push(initMessageDriver(10));
    menssgeOpe.push(initMessageDriver(11));
    menssgeOpe.push(initMessageDriver(12));
    menssgeOpe.push(initMessageDriver(13));
    menssgeOpe.push(initMessageDriver(14));
    menssgeOpe.push(initMessageDriver(15));
    menssgeOpe.push(initMessageDriver(16));
    menssgeOpe.push(initMessageDriver(17));
    menssgeOpe.push(initMessageDriver(18));
    menssgeOpe.push(initMessageDriver(19));
    menssgeOpe.push(initMessageDriver(20));
    menssgeOpe.push(initMessageDriver(21));
    menssgeOpe.push(initMessageDriver(22));
    menssgeOpe.push(initMessageDriver(23));
    menssgeOpe.push(initMessageDriver(24));
    menssgeOpe.push(initMessageDriver(25));
    menssgeOpe.push(initMessageDriver(26));
    menssgeOpe.push(initMessageDriver(27));
    menssgeOpe.push(initMessageDriver(28));
    menssgeOpe.push(initMessageDriver(29));
    menssgeOpe.push(initMessageDriver(30));
    menssgeOpe.push(initMessageMine());
    menssgeOpe.push(initMessageMine());
    menssgeOpe.push(initMessageMine());
    menssgeOpe.push(initMessageCliente());
    menssgeOpe.push(initMessageUsuario());
    menssgeOpe.push(initMessageCliente());
    menssgeOpe.push(initMessageUsuario());
    menssgeOpe.push(initMessageUsuario());
    menssgeOpe.push(initMessageUsuario());
    menssgeOpe.push(initMessageMine());
    menssgeOpe.push(initMessageMine());
    menssgeOpe.push(initMessageMine());
    menssgeOpe.push(initMessageCliente());
    menssgeOpe.push(initMessageUsuario());
    menssgeOpe.push(initMessageCliente());
    menssgeOpe.push(initMessageUsuario());
    menssgeOpe.push(initMessageMine());
    menssgeOpe.push(initMessageMine());
    menssgeOpe.push(initMessageMine());
    menssgeOpe.push(initMessageCliente());
    menssgeOpe.push(initMessageUsuario());
    menssgeOpe.push(initMessageMine());

    return menssgeOpe
}

export function initMessageDriver(id?: string | number): MessageMovil {
    return {
        conversation: {
            id: 1,
            uuid: '10',
            type: TypeConversationMessage.SERVICE
        },
        message: {
            id: id,
            body: 'DRIVER Prueba Messange hkijhnjh lkkjgl,hjklghkf hukgfhufulfu lkkjgl,hjklghkf hukgfhufulfu hjkjnhngi',
            priority: PriorityMessageMessage.LOW,
            createdDate: new Date(),
            readedDate: new Date()
        },
        from: {
            fullName: "Valentin Huamani",
            // urlPicture:
            driver: {
                id: 10,
                uuid:id+'10',
                code: "9696"
            },
            vehicle: {
                id: 10,
                uuid:id+'10',
                code: "95696"
            },
            // operatorId int
            // clientId int,
            type: TypeFromMessage.DRIVER
        }
    }
}

export function initMessageCliente(): MessageMovil {
    return {
        conversation: {
            id: 1,
            type: TypeConversationMessage.OPERATIONS,
            uuid: '1042',
        },
        message: {
            id: 2,
            body: 'CLIENT Prueba Messange hkijhnjnhngi',
            priority: PriorityMessageMessage.HIGH,
            createdDate: new Date(),
            readedDate: new Date()
        },
        from: {
            fullName: "Valentin Huamani Cliente",
            // urlPicture:
            driver: {
                id: 100,
                code: "9696"
            },
            vehicle: {
                id: 12,
                code: "95696"
            },
            operator: {
                id: 100,
            },
            client: {
                id: 50,
            },
            type: TypeFromMessage.CLIENT
        }
    }
}

export function initMessageMine(): MessageMovil {
    return {
        conversation: {
            id: 1,
            type: TypeConversationMessage.OPERATIONS,
            uuid: '10475',
        },
        message: {
            id: 2,
            body: 'OPERATOR Prueba Messange bhuioli uoljljk..ghjtdrgj hkngdfjh fgdjhfghj bfdjh hkijhnjnhngi',
            priority: PriorityMessageMessage.HIGH,
            createdDate: new Date(),
            readedDate: new Date()
        },
        from: {
            fullName: "Valentin Huamani Cliente",
            // urlPicture:
            driver: {
                id: 100,
                code: "9696"
            },
            vehicle: {
                id: 12,
                code: "95696"
            },
            operator: {
                id: 7,
            },
            client: {
                id: 50,
            },
            type: TypeFromMessage.OPERATOR
        }
    }
}

export function initMessageUsuario(): MessageMovil {
    return {
        conversation: {
            id: 1,
            type: TypeConversationMessage.SERVICE,
            uuid: '1840475',
        },
        message: {
            id: 2,
            body: 'OPERATOR  Prueba Messange hkijhnjnhngi',
            priority: PriorityMessageMessage.MEDIUM,
            createdDate: new Date(),
            readedDate: new Date()
        },
        from: {
            fullName: "Valentin Huamani Operador",
            // urlPicture:
            driver: {
                id: 100,
                code: "9696"
            },
            vehicle: {
                id: 12,
                code: "95696"
            },

            operator: {
                id: 50,
            },
            client: {
                id: 20,
            },
            type: TypeFromMessage.OPERATOR
        }
    }
}

export function arrayMessages2(): MessageUserSender[] {
    let menssgeOpe: MessageUserSender[] = [];
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageDriverSender());
    menssgeOpe.push(initMessageMineSender());
    menssgeOpe.push(initMessageMineSender());

    return menssgeOpe
}

export function initMessageMineSender(): MessageUserSender {
    return {
        "body": "yhuguyjgjghfhgjtfhgtfvhjgvhg",
        "createdDate":  new Date(),
        "id": "str545ing",
        "priority": PriorityMessageMessage.HIGH,
        "readedDate": new Date(),
        "sender": {
            "client": {
                "id": 10,
                "uuid": "string"
            },
            "driver": {
                "code": "50",
                "id": 20,
                "uuid": "string"
            },
            "operator": {
                "id": 7,
                "uuid": "15650445-b860-40d8-ad39-c214e3f69b91"
            },
            "type": TypeFromMessage.OPERATOR,
            "fullName": "strin55g"
        },
        "uuid": "strin55g"
    }
}

export function initMessageDriverSender(): MessageUserSender {
    return {
        "body": "yhuguyjgjghfhgjtfhgtfvhjgvhg",
        "createdDate":  new Date(),
        "id": "str545ing",
        "priority": PriorityMessageMessage.HIGH,
        "readedDate": new Date(),
        "sender": {
            "client": {
                "id": 10,
                "uuid": "string"
            },
            "driver": {
                "code": "50",
                "id": 20,
                "uuid": "string"
            },
            "operator": {
                "id": 5,
                "uuid": "string"
            },
            "type": TypeFromMessage.DRIVER,
            "fullName": "strin55g"
        },
        "uuid": "strin55g"
    }
}