import { OptionsJson } from 'body-parser';
import { json } from 'express';
import { Middleware } from '../models/types';

export function useJson(options?: OptionsJson): Middleware {
    if (options) {
        return json(options);
    } else {
        return json();
    }
}