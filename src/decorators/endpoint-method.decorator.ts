import { BaseErrorHandler, BaseMiddleware } from "src/models/bases";
import { DEFAULT_CONTEXT, ENDPOINT_META_PROPERTY_KEY_PREFIX } from "src/models/constants";
import { EndpointMethodType } from "src/models/enums";
import { EndpointMeta } from "src/models/interfaces";

/**
 * @description router class can use Get decorator to its memeber function. Get function will serve as get endpoint of this router. Parameter of this function can use Param, Query, Body, Req decorator to retrieve params, query, body and request object
 * @param context where this endpoint to be served
 */
export function Get(context?: string) {
    return function (target: any, propertyKey: string, _: PropertyDescriptor) {
        const _context = context || DEFAULT_CONTEXT;
        const method = EndpointMethodType.GET;
        const metaPropertyKey = ENDPOINT_META_PROPERTY_KEY_PREFIX + propertyKey;
        registerMethodMetaProperty(target, metaPropertyKey, _context, method);
    };
}

export function Post(context?: string) {
    return function (target: any, propertyKey: string, _: PropertyDescriptor) {
        const _context = context || DEFAULT_CONTEXT;
        const method = EndpointMethodType.POST;
        const metaPropertyKey = ENDPOINT_META_PROPERTY_KEY_PREFIX + propertyKey;
        registerMethodMetaProperty(target, metaPropertyKey, _context, method);
    };
}

export function Put(context?: string) {
    return function (target: any, propertyKey: string, _: PropertyDescriptor) {
        const _context = context || DEFAULT_CONTEXT;
        const method = EndpointMethodType.PUT;
        const metaPropertyKey = ENDPOINT_META_PROPERTY_KEY_PREFIX + propertyKey;
        registerMethodMetaProperty(target, metaPropertyKey, _context, method);
    };
}

export function Delete(context?: string) {
    return function (target: any, propertyKey: string, _: PropertyDescriptor) {
        const _context = context || DEFAULT_CONTEXT;
        const method = EndpointMethodType.DELETE;
        const metaPropertyKey = ENDPOINT_META_PROPERTY_KEY_PREFIX + propertyKey;
        registerMethodMetaProperty(target, metaPropertyKey, _context, method);
    };
}

export function UseMiddleware(middleware: BaseMiddleware) {

}

export function UseErrorHander(errorHandler: BaseErrorHandler) {

}


/**
 * 
 * @param target is the prototype object of the router class
 * @param metaPropertyKey is property that holds meta information of router class
 * @param context is the router endpoint context
 * @param method is endpoint type: get, post, put, delete is valid input
 * @description this function will add or initiate meta property of endpoint to router class after this function is called router class will have property holding array of endpoint meta property such as context or method
 */
function registerMethodMetaProperty(target: any, metaPropertyKey: string, context: string, method: EndpointMethodType) {
    /**
     * whenever coder write endpoint in router class, this 'registerMethodMetaProperty' will be called
     * That means metaProperty can be defined multiple times, if metaproperty already exist,
     * it should not definde property. Instead, it add child property to meta property
     */
    if (target.hasOwnProperty(metaPropertyKey)) {
        target[metaPropertyKey].context = context;
        target[metaPropertyKey].method = method;
    } else {
        const value: EndpointMeta = {
            context,
            method,
            argument: [ ],
            middleware: [ ],
            errorHandler: [ ]
        }

        Object.defineProperty(target, metaPropertyKey, {
            value,
            enumerable: true,
            configurable: true
        });
    }
}