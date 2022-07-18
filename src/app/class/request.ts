
export class RequestCancelService {
    reason?: RequestCancelServiceReason;
    serviceUuid?: string;
    service_id ?: string;
    client_id ?: string;
}

export class RequestCancelServiceReason {
    id?: number;
    observation?: string;
}

export class RequestOffer {
    serviceUuid?: string;
}



export class RequestCancelReasons {
    service_id?: number;
}

export class CancelReasons {
    description? : number;
    id? : string;
    isCommentEnabled? : boolean;
}
