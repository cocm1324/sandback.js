import { BaseErrorHandler } from "../bases/error-handler.base";
import { BaseMiddleware } from "../bases/middleware.base";
import { RouterOptions } from "./router-option.interface";


export interface RouterMeta {
    options: RouterOptions;
    middleware: BaseMiddleware[];
    errorHandler: BaseErrorHandler[];
}