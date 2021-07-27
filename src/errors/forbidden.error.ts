import { BaseError } from "../models/bases";

/**
 * The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike 401, the client's identity is known to the server.
 */
export class ForbiddenError extends BaseError {
    constructor(data?: any | any[]) {
        super(data);
        this.name = 'Forbidden';
        this.code = 403;
    }
}
