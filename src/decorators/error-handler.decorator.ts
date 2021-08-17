import { RouterMeta } from "src/models/interfaces";
import { CLASS_META_PROPERTY_KEY } from "../models/constants";

export function ErrorHandler(errorHandler: any) {
    return function<T extends { new (...args: any[]): {} }>(constructor: T) {
        if (constructor.prototype.hasOwnProperty(CLASS_META_PROPERTY_KEY)) {
            constructor.prototype[CLASS_META_PROPERTY_KEY].errorHandler.push(errorHandler);
        } else {
            const value: RouterMeta = { options: null, middleware: [], errorHandler: [ errorHandler ] };
            Object.defineProperty(constructor.prototype, CLASS_META_PROPERTY_KEY, { value, enumerable: true, configurable: true });
        }
        return class extends constructor { }
    }
}