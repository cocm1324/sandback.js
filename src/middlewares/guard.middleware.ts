import * as cors from 'cors';
import { CorsOptions, CorsOptionsDelegate } from 'cors';
import { Middleware } from '../models/types';

export function useGuard(options?: CorsOptions | CorsOptionsDelegate): Middleware {
    if (options) {
        return cors(options);
    } else {
        return cors();
    }
}