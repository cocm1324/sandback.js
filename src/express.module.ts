import { ExpressModule } from "@src/decorators";

import { AppRouter } from './app.router';
import { useCors, useJson } from "@src/middlewares";

import { join } from 'path';

@ExpressModule({
    provider: [ ],
    useRouter: [ 
        { context: '/', router: AppRouter } 
    ],
    useMiddleware: [ 
        useCors(),
        useJson()
    ],
    useStatic: [ 
        { context: '/assets', path: join(__dirname, '..', 'assets') } 
    ]
})
export class ExpressApp { }