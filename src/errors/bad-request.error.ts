import { BaseError } from "../models/bases";

/**
 * The server could not understand the request due to invalid syntax.
 */
export class BadRequestError extends BaseError {
    constructor(data?: any | any[]) {
        super(data);
        this.name = 'Bad Request';
        this.code = 400;
    }
}