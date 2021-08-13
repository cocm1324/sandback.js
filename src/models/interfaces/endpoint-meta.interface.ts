import { EndpointArgumentType, EndpointMethodType } from "../enums";

/**
 * @description each endpoint function of router class will add this object to metaProperty. When router function is initialized, each endpointMeta info will be retrieved, and will be used to create express endpoint functions
 */
export interface EndpointMeta {
    context: string;
    method: EndpointMethodType;
    argument: { 
        argumentType: EndpointArgumentType;
        argumentIndex: number;
    }[];
    middleware: Array<any>;
    errorHandler: Array<any>
}