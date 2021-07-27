import { BaseError } from "../models/bases";

/**
 * This response is sent when a request conflicts with the current state of the server.
 */
export class ConflictError extends BaseError {
    constructor(data?: any | any[]) {
        super(data);
        this.name = 'Conflict';
        this.code = 409;
    }
}
