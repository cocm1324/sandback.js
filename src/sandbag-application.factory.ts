export class SandbagApplication {
    public start() {

    }
}

export function sandbagApplicationFactory(application: any): SandbagApplication {
    return;
}

// const _router = express.Router();
// const properties = Object.keys(constructor.prototype);

// properties.filter(element => element.slice(-1 * META_SUFFIX.length) === META_SUFFIX).forEach(element => {
//     const propertyMeta = <EndpointMeta>constructor.prototype[element];
//     const [ propertyKey ] = element.split(META_SUFFIX);
//     const property = constructor.prototype[propertyKey];

//     const { context, method, argument } = propertyMeta;

//     const functionArgumentMeta = [];
//     argument.forEach(({ argumentIndex, argumentType }) => functionArgumentMeta[argumentIndex] = argumentType);
    
//     const endpointFunction = (req: Request, res: Response, next: NextFunction) => {
//         const functionArgument = functionArgumentMeta.map((element: EndpointArgumentType) => {
//             if (element === EndpointArgumentType.REQ) {
//                 return req;
//             } else {
//                 return req[element];
//             }
//         });

//         let functionReturn;
//         try {
//             functionReturn = property(...functionArgument);
//         } catch(error) {
//             next(error);
//             return;
//         }

//         if (functionReturn.hasOwnProperty('then')) {
//             functionReturn.then(result => {
//                 res.send(result);
//             }).catch(error => {
//                 next(error)
//             });
//             return;
//         }
//         res.send(functionReturn);
//         return;
//     }
//     _router[method](context, endpointFunction, errorHandler);       
// });


// function errorLogHandler(error, req: Request, res: Response, next: NextFunction) {
//     console.error(error);
//     next(error);
// }

// function errorHandler(error, req: Request, res: Response, next: NextFunction) {
//     let _error: BaseError;
//     if (error instanceof BaseError) {
//         _error = error;
//     } else {
//         _error = new InternalServerError(error);
//     }
//     const { code, name, data } = _error.getObject();
//     res.statusCode = code;
//     res.statusMessage = name;
//     res.send(data);
//     return;
// }