import { BaseErrorHandler } from "../bases/error-handler.base";
import { BaseMiddleware } from "../bases/middleware.base";
import { ClassType } from "../enums";
import { RouterOptions } from "./router-option.interface";

export interface ClassMeta {
    type: ClassType;
    options: any;
    middleware: BaseMiddleware[];
    errorHandler: BaseErrorHandler[];
}

export interface RouterMeta extends ClassMeta {
    options: RouterOptions;
}