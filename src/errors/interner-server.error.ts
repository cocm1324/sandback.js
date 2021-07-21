import { BaseError } from "../models/bases";

export class InternalServerError extends BaseError {
    constructor(data?: any | any[]) {
        super(data);
        this.name = 'Internal Server Error';
        this.code = 500;
        this.message = 'Internal Server Error';
    }
}