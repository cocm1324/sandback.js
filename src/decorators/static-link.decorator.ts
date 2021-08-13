import { StaticLinkMeta } from '../models/interfaces';
import { STATIC_LINK_META_PROPERTY_KEY_PREFIX } from '../models/constants';

export function StaticLink(context: string, path: string) {
    return (target: any, propertyKey: string) => {
        const metaPropertyKey = STATIC_LINK_META_PROPERTY_KEY_PREFIX + propertyKey;
        if (target.hasOwnProperty(metaPropertyKey)) {
            target[metaPropertyKey].context = context;
            target[metaPropertyKey].path = path;
        } else {
            const value: StaticLinkMeta = { context, path };
            Object.defineProperty(target, metaPropertyKey, { value, enumerable: true, configurable: true });
        }
    }
}