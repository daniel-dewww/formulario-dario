import { StompSubscription } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { Push } from './push';

/** Structure components to suscription in a estructure*/
export class ActivedSuscription {
    id?: number;
    addSuscripption?: string;
    suscriptionWebSocket?: Web_Socket;
}


/** Details for component to suscribe*/
export interface SuscriptionWebSocket {
    name: string;
    topic: EnunTopicSuscription[];
}

/** Estructure for list topics, is activate true, this topic to suscribe  */
export class Topic {
    topic?: EnunTopicSuscription;
    description?: string;
    active?: boolean;
    subscription?: StompSubscription | Subscription;
    aditionalToTopic?:string;
}

/** Topics to suscription in this proyect */
export enum EnunTopicSuscription {
    
    // RIDE_UPDATE = '/topic/test-stomp',
    // DRIVER_LOCATION = '/topic/test-stomp',
    RIDE_UPDATE = '/topic/monitoring-ride-update',
    DRIVER_LOCATION = '/topic/monitoring-driver-location',
    USER_LOGGER = '/topic/',
    DRIVER_OPERATION = '/topic/message-driver-operation',
    USER_ANEXO = '/topic/anexo-',
    CLIENT_LIST_CORPORATIVE = '/topic/clients/',// /topic/clients/',
    OPERATION_TOPIC = '/topic/operations',
    NEW_LAST_SERVICE_CALL_ANEXO = '/topic/NEW_LAST_SERVICE_CALL'
}


/** Estructure, for service to use Websockets*/
export interface Web_SocketS {

/** List of all suscriptions activate */
    suscriptions: ActivedSuscription[];
    
/** Lst topic, all inclusive activate and inactivate*/
    topicSuscriptions: Topic[]

    /** you can unsuscribe topic*/
    unsuscribeTopic(topic: EnunTopicSuscription): void;

    /** you can disconect the client*/
    disconectClient(): void;

    /** You can generate the suscription*/
    suscribeSuscription(suscription: Web_Socket): Promise<ActivedSuscription>

    /** you can unsuscribe if send id of actived suscription*/
    ususcribeSuscription(idSuscription: number): void;
}

/** Estructure for component to need suscribe in a web socket*/
export interface Web_Socket {
    suscriptions: SuscriptionWebSocket
    idUser?: number;
    nroAnexo?: string;
    idClient?:string;
    // onMessage()
    onMessageDriverLocation?(dataPush: Push): void ;
    onMessageRideUpdate?(dataPush: Push): void;
    onMessageUserLogger?(dataPush: Push): void;
    onMessageDriverOperation?(dataPush: Push): void;
    onMessageUserAnexo?(dataPush: Push): void;
    onMessageClientCorporative?(dataPush: Push): void;
    onMessageOperationTopic?(dataPush: Push): void;
    onMessageNewLastServiceCallAnexo?(dataPush: Push): void;
}

export function getAllTopics(): Topic[] {
    let topics: Topic[] = [
        { topic: EnunTopicSuscription.DRIVER_LOCATION, description: 'Update position for Driver', active: true },
        { topic: EnunTopicSuscription.RIDE_UPDATE, description: 'Update to travells(New, update, etc)', active: true },
        { topic: EnunTopicSuscription.USER_LOGGER, description: 'sUSCRIPTION ONLY FOR USER IS lOGGER', active: true },
        { topic: EnunTopicSuscription.DRIVER_OPERATION, description: 'Message and information of driver', active: true },
        { topic: EnunTopicSuscription.USER_ANEXO, description: 'New travel for IVR', active: true },
        { topic: EnunTopicSuscription.CLIENT_LIST_CORPORATIVE, description: 'List service Corporative', active: true },
        { topic: EnunTopicSuscription.OPERATION_TOPIC, description: 'topic to operations notifications', active: true },
        { topic: EnunTopicSuscription.OPERATION_TOPIC, description: 'topic to operations notifications', active: true },
        { topic: EnunTopicSuscription.NEW_LAST_SERVICE_CALL_ANEXO, description: 'topic to edit service to call again IVR', active: true },
        
        // { topic: EnunTopicSuscription.DRIVER_LOCATION_ESPECIFIC, description: 'Update Position for one Driver', active: true }
    ];

    return topics;
}
