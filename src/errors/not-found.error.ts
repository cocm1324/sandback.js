import { BaseError } from "../models/bases";

/**
 * The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurrence on the web.
 */
export class NotFoundError extends BaseError {
    constructor(data?: any | any[]) {
        super(data);
        this.name = 'Not Found';
        this.code = 404;
    }
}
