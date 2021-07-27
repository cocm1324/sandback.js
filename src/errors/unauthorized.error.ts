import { BaseError } from "../models/bases";

/**
 * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.
 */
export class UnauthorizedError extends BaseError {
    constructor(data?: any | any[]) {
        super(data);
        this.name = 'Unauthorized';
        this.code = 401;
    }
}