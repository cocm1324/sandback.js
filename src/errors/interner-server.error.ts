import { BaseError } from "../models/bases";

/**
 * The server has encountered a situation it doesn't know how to handle.
 */
export class InternalServerError extends BaseError {
    constructor(data?: any | any[]) {
        super(data);
        this.name = 'Internal Server Error';
        this.code = 500;
    }
}
