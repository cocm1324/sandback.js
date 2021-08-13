import { Application } from 'express';
import * as express from 'express';
import { DEFAULT_PORT } from 'src/models/constants';

export type ApplicationModuleOptions = {
    /**
     * 
     */
    provider?: Array<any>
}


export function ApplicationModule(options: ApplicationModuleOptions) {
    const _app: Application = express();

    const contextUsage = { };
    const checkContext = (context: string) => {
        if (context in contextUsage) {
            throw `Express app cannot have duplicate context: '${context}'`;
        }
        contextUsage[context] = true;
    }

    /**
     * add constructor
     */
    return <T extends { new (...args: any[]): { } }>(constructor: T) => {
        return class extends constructor {
            app = _app;
            // port = _port;
            start = (): Promise<any> => {
                return new Promise((resolve, _) => {
                    // this.app.listen(this.port, () => {
                    //     const timestamp = new Date();
                    //     const info = `[INFO][${timestamp.toISOString()}] Application is running on port ${ this.port }`;
                    //     resolve(info);
                    // });
                });
            }
        }
    }
}