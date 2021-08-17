import { RouterMeta } from "src/models/interfaces";
import { CLASS_META_PROPERTY_KEY } from "../models/constants";

export function Middleware(middleware: any) {
    return function<T extends { new (...args: any[]): {} }>(constructor: T) {
        if (constructor.prototype.hasOwnProperty(CLASS_META_PROPERTY_KEY)) {
            constructor.prototype[CLASS_META_PROPERTY_KEY].middleware.push(middleware);
        } else {
            const value: RouterMeta = { options: null, middleware: [ middleware ], errorHandler: [] };
            Object.defineProperty(constructor.prototype, CLASS_META_PROPERTY_KEY, { value, enumerable: true, configurable: true });
        }
        return class extends constructor { }
    }
}