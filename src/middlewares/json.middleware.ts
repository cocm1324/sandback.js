import { Middleware } from '@src/models/types';
import { OptionsJson } from 'body-parser';
import { json } from 'express';

export function useJson(options?: OptionsJson): Middleware {
    if (options) {
        return json(options);
    } else {
        return json();
    }
}