export class ErrorResponse {
    code: number;
    id: string;
    detail: string;
    location: string
    statusCode: number;
    status: string;
    constructor(objectc:any){
        this.code = objectc.code;
        this.id = objectc.id;
        this.detail = objectc.detail;
        this.location = objectc.location;
        this.statusCode = objectc.statusCode;
        this.status = objectc.status;
    }
}


