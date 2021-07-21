import * as express from 'express';
import { Request, Response, NextFunction } from 'express';

import { InternalServerError } from '../errors';
import { BaseError } from '../models/bases';
import { Middleware } from '../models/types';
import { RouterInfo } from '../models/interfaces';
import { EndpointArgumentType, EndpointMethodType } from '../models/enums';

const META_SUFFIX = ':meta';
const DEFAULT_CONTEXT = '/';

export type RouterOptions = { 
    /**
     * 
     */
    useMiddleware?: Array<Middleware>

    /**
     * @description specify router modules here.
     */
    useRouter: RouterInfo[];
}

/**
 * @description RouterModule decorator provides NestJS style router definition. Class that decorated by this function can use Get, Post, Put, Delete decorator to its member function. Also, each parameters of those decorated memeber function can use Param, Query, Body, Req.
 */
export function RouterModule() {
    return function<T extends { new (...args: any[]): {} }>(constructor: T) {
        const _router = express.Router();
        const properties = Object.keys(constructor.prototype);

        properties.filter(element => element.slice(-1 * META_SUFFIX.length) === META_SUFFIX).forEach(element => {
            const propertyMeta = <EndpointMeta>constructor.prototype[element];
            const [ propertyKey ] = element.split(META_SUFFIX);
            const property = constructor.prototype[propertyKey];

            const { context, method, argument } = propertyMeta;

            const functionArgumentMeta = [];
            argument.forEach(({ argumentIndex, argumentType }) => functionArgumentMeta[argumentIndex] = argumentType);
            
            const endpointFunction = (req: Request, res: Response, next: NextFunction) => {
                const functionArgument = functionArgumentMeta.map((element: EndpointArgumentType) => {
                    if (element === EndpointArgumentType.REQ) {
                        return req;
                    } else {

                        

                        return req[element];
                    }
                });

                let functionReturn;
                try {
                    functionReturn = property(...functionArgument);
                } catch(error) {
                    next(error);
                    return;
                }

                if (functionReturn.hasOwnProperty('then')) {
                    functionReturn.then(result => {
                        res.send(result);
                    }).catch(error => {
                        next(error)
                    });
                    return;
                }
                res.send(functionReturn);
                return;
            }
            _router[method](context, endpointFunction, errorHandler);       
        });

        return class extends constructor {
            router = _router;
        }
    }
}

/**
 * @description each endpoint function of router class will add this object to metaProperty. When router function is initialized, each endpointMeta info will be retrieved, and will be used to create express endpoint functions
 */
interface EndpointMeta {
    context: string;
    method: EndpointMethodType;
    argument: { 
        argumentType: EndpointArgumentType; 
        argumentIndex: number;
    }[];
}

/**
 * @description router class can use Get decorator to its memeber function. Get function will serve as get endpoint of this router. Parameter of this function can use Param, Query, Body, Req decorator to retrieve params, query, body and request object
 * @param context where this endpoint to be served
 */
export function Get(context?: string) {
    return function (target: any, propertyKey: string, _: PropertyDescriptor) {
        const _context = context || DEFAULT_CONTEXT;
        const method = EndpointMethodType.GET;
        const metaPropertyKey = `${propertyKey}${META_SUFFIX}`;
        registerMethodMetaProperty(target, metaPropertyKey, _context, method);
    };
}

export function Post(context?: string) {
    return function (target: any, propertyKey: string, _: PropertyDescriptor) {
        const _context = context || DEFAULT_CONTEXT;
        const method = EndpointMethodType.POST;
        const metaPropertyKey = `${propertyKey}${META_SUFFIX}`;
        registerMethodMetaProperty(target, metaPropertyKey, _context, method);
    };
}

export function Put(context?: string) {
    return function (target: any, propertyKey: string, _: PropertyDescriptor) {
        const _context = context || DEFAULT_CONTEXT;
        const method = EndpointMethodType.PUT;
        const metaPropertyKey = `${propertyKey}${META_SUFFIX}`;
        registerMethodMetaProperty(target, metaPropertyKey, _context, method);
    };
}

export function Delete(context?: string) {
    return function (target: any, propertyKey: string, _: PropertyDescriptor) {
        const _context = context || DEFAULT_CONTEXT;
        const method = EndpointMethodType.DELETE;
        const metaPropertyKey = `${propertyKey}${META_SUFFIX}`;
        registerMethodMetaProperty(target, metaPropertyKey, _context, method);
    };
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
            argument: [ ]
        }

        Object.defineProperty(target, metaPropertyKey, {
            value,
            enumerable: true,
            configurable: true
        });
    }
}

/**
 * @param target 
 * @param metaPropertyKey 
 * @param argumentType 
 * @param argumentIndex 
 */

export function Param() {
    return function (target: any, propertyKey: string, argumentIndex: number) {
        const argumentType = EndpointArgumentType.PARAM;
        const metaPropertyKey = `${propertyKey}${META_SUFFIX}`;
        registerArgumentMetaPropertiy(target, metaPropertyKey, argumentType, argumentIndex);
    }
}

export function Query() {
    return function (target: any, propertyKey: string, argumentIndex: number) {
        const argumentType = EndpointArgumentType.QUERY;
        const metaPropertyKey = `${propertyKey}${META_SUFFIX}`;
        registerArgumentMetaPropertiy(target, metaPropertyKey, argumentType, argumentIndex);
    }
}

export function Body() {
    return function (target: any, propertyKey: string, argumentIndex: number) {
        const argumentType = EndpointArgumentType.BODY;
        const metaPropertyKey = `${propertyKey}${META_SUFFIX}`;
        registerArgumentMetaPropertiy(target, metaPropertyKey, argumentType, argumentIndex);
    }
}

export function Req() {
    return function (target: any, propertyKey: string, argumentIndex: number) {
        const argumentType = EndpointArgumentType.REQ;
        const metaPropertyKey = `${propertyKey}${META_SUFFIX}`;
        registerArgumentMetaPropertiy(target, metaPropertyKey, argumentType, argumentIndex);
    }
}

function registerArgumentMetaPropertiy(target: any, metaPropertyKey: string, argumentType: EndpointArgumentType, argumentIndex: number) {
    if (target.hasOwnProperty(metaPropertyKey)) {
        const argument = { argumentType, argumentIndex };
        target[metaPropertyKey].argument.push(argument);
    } else {
        const value: EndpointMeta = {
            context: null,
            method: null,
            argument: [ { argumentType, argumentIndex } ]
        }

        Object.defineProperty(target, metaPropertyKey, {
            value,
            enumerable: true,
            configurable: true
        });
    }
}

function errorLogHandler(error, req: Request, res: Response, next: NextFunction) {
    console.error(error);
    next(error);
}

function errorHandler(error, req: Request, res: Response, next: NextFunction) {
    let _error: BaseError;
    if (error instanceof BaseError) {
        _error = error;
    } else {
        _error = new InternalServerError(error);
    }
    const { code, message, data } = _error.getObject();
    res.statusCode = code;
    res.statusMessage = message;
    res.send(data);
    return;
}