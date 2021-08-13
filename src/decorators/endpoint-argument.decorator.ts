import { ENDPOINT_META_PROPERTY_KEY_PREFIX } from "src/models/constants";
import { EndpointArgumentType } from "src/models/enums";
import { EndpointMeta } from "src/models/interfaces";

/**
 * @param target 
 * @param metaPropertyKey 
 * @param argumentType 
 * @param argumentIndex 
 */
export function Param() {
    return function (target: any, propertyKey: string, argumentIndex: number) {
        const argumentType = EndpointArgumentType.PARAM;
        const metaPropertyKey = ENDPOINT_META_PROPERTY_KEY_PREFIX + propertyKey;
        registerArgumentMetaPropertiy(target, metaPropertyKey, argumentType, argumentIndex);
    }
}

export function Headers() {
    return function (target: any, propertyKey: string, argumentIndex: number) {
        const argumentType = EndpointArgumentType.HEADERS;
        const metaPropertyKey = ENDPOINT_META_PROPERTY_KEY_PREFIX + propertyKey;
        registerArgumentMetaPropertiy(target, metaPropertyKey, argumentType, argumentIndex);
    }
}

export function Query() {
    return function (target: any, propertyKey: string, argumentIndex: number) {
        const argumentType = EndpointArgumentType.QUERY;
        const metaPropertyKey = ENDPOINT_META_PROPERTY_KEY_PREFIX + propertyKey;
        registerArgumentMetaPropertiy(target, metaPropertyKey, argumentType, argumentIndex);
    }
}

export function Body() {
    return function (target: any, propertyKey: string, argumentIndex: number) {
        const argumentType = EndpointArgumentType.BODY;
        const metaPropertyKey = ENDPOINT_META_PROPERTY_KEY_PREFIX + propertyKey;
        registerArgumentMetaPropertiy(target, metaPropertyKey, argumentType, argumentIndex);
    }
}

export function Req() {
    return function (target: any, propertyKey: string, argumentIndex: number) {
        const argumentType = EndpointArgumentType.REQ;
        const metaPropertyKey = ENDPOINT_META_PROPERTY_KEY_PREFIX + propertyKey;
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
            argument: [ { argumentType, argumentIndex } ],
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