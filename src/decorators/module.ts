import { Application } from 'express';
import * as express from 'express';

import { Middleware } from '../models/types';
import { RouterInfo } from '../models/interfaces';

const DEFAULT_PORT = 3000;

export type SandbagOptions = {
    /**
     * 
     */
    port?: number | string;

    /**
     * @description specify router modules here.
     */
    useRouter: RouterInfo[];

    /**
     * 
     */
    provider?: Array<any>

    /**
     * 
     */
    useMiddleware?: Array<Middleware>

    /**
     * 
     */
    useStatic?: Array<{
        context: string;
        path: string;
    }>
}


export function Module(options: SandbagOptions) {
    const _app: Application = express();

    const contextUsage = { };
    const checkContext = (context: string) => {
        if (context in contextUsage) {
            throw `Express app cannot have duplicate context: '${context}'`;
        }
        contextUsage[context] = true;
    }


    /**
     * prepare port
     */
    let _port = DEFAULT_PORT;
    if (options && options.port) {
        let portNum;
        if (typeof options.port == 'number') {
            portNum = options.port;
        } else {
            portNum = parseInt(options.port);
        }
        if (!isNaN(portNum) && portNum > 0 && portNum <= 65535) {
            _port = portNum
        }
    }

    /**
     * register middleware
     */
    if (options && options.useMiddleware && options.useMiddleware.length) {
        const middlewares: Array<Middleware> = options.useMiddleware;

        middlewares.forEach(element => {
            _app.use(element);
        });
    }

    /**
     * register routers
     */
    if (options && options.useRouter && options.useRouter.length) {
        const routers = options.useRouter;

        

        routers.forEach(element => {
            const { context, router: Router } = element;
            checkContext(context);
            const router = new Router();
            _app.use(context, router.router);
        })
    }

    /**
     * register static files path
     */
    if (options && options.useStatic && options.useStatic.length) {
        const staticPaths = options.useStatic;

        staticPaths.forEach(element => {
            const { context, path } = element;
            checkContext(context);
            _app.use(context, express.static(path));
        });
    }
    

    /**
     * add constructor
     */
    return <T extends { new (...args: any[]): { } }>(constructor: T) => {
        return class extends constructor {
            app = _app;
            port = _port;
            start = (): Promise<any> => {
                return new Promise((resolve, _) => {
                    this.app.listen(this.port, () => {
                        const timestamp = new Date();
                        const info = `[INFO][${timestamp.toISOString()}] Application is running on port ${ this.port }`;
                        resolve(info);
                    });
                });
            }
        }
    }
}