export * from './decorators';
export * from './errors';
export * from './middlewares';

export * from './test';

export function startServer(SandbagApp: any): Promise<any> {
    const app = new SandbagApp();

    if (!app || !app['start']) {
        throw 'Invalid Sandbag App';
    }

    const pending: Promise<string> = app['start']();
    return pending;
}

export class SandbagFactory {
    constructor() {
        
    }
}