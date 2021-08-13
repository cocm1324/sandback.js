import { RouterMeta, RouterOptions } from '../models/interfaces';
import { ClassType } from '../models/enums';
import { CLASS_META_PROPERTY_KEY } from '../models/constants';


/**
 * @description Router decorator provides NestJS style router definition. Class that decorated by this function can use Get, Post, Put, Delete decorator to its member function. Also, each parameters of those decorated memeber function can use Param, Query, Body, Req.
 */
export function Router(options?: RouterOptions) {
    return function<T extends { new (...args: any[]): {} }>(constructor: T) {
        const type = ClassType.ROUTER;

        if (constructor.prototype.hasOwnProperty(CLASS_META_PROPERTY_KEY)) {
            constructor.prototype[CLASS_META_PROPERTY_KEY].type = type;
            constructor.prototype[CLASS_META_PROPERTY_KEY].options = options;
        } else {
            const value: RouterMeta = { type, options, middleware: [], errorHandler: [] };
            Object.defineProperty(constructor.prototype, CLASS_META_PROPERTY_KEY, { value, enumerable: true, configurable: true });
        }

        return class extends constructor { }
    }
}