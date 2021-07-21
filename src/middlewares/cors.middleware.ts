import { Middleware } from '@src/models/types';
import * as cors from 'cors';
import { CorsOptions, CorsOptionsDelegate } from 'cors';

export function useCors(options?: CorsOptions | CorsOptionsDelegate): Middleware {
    if (options) {
        return cors(options);
    } else {
        return cors();
    }
}