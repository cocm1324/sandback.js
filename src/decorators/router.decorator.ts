import { RouterMeta, RouterOptions } from '../models/interfaces';
import { CLASS_META_PROPERTY_KEY } from '../models/constants';


/**
 * @description Router decorator provides NestJS style router definition. Class that decorated by this function can use Get, Post, Put, Delete decorator to its member function. Also, each parameters of those decorated memeber function can use Param, Query, Body, Req.
 */
export function Router(options?: RouterOptions) {
    return function<T extends { new (...args: any[]): {} }>(constructor: T) {

        if (constructor.prototype.hasOwnProperty(CLASS_META_PROPERTY_KEY)) {
            constructor.prototype[CLASS_META_PROPERTY_KEY].options = options;
        } else {
            const value: RouterMeta = { options, middleware: [], errorHandler: [] };
            Object.defineProperty(constructor.prototype, CLASS_META_PROPERTY_KEY, { value, enumerable: true, configurable: true });
        }

        // const checkContext = (context: string) => {
        //     if (context in contextUsage) {
        //         throw `Express app cannot have duplicate context: '${context}'`;
        //     }
        //     contextUsage[context] = true;
        // }

        return class extends constructor { }
    }
}