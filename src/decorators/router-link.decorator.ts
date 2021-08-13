import { ROUTER_LINK_META_PROPERTY_KEY_PREFIX } from '../models/constants';
import { RouterLinkMeta } from '../models/interfaces';

export function RouterLink(context: string, router: any) {
    return (target: any, propertyKey: string) => {
        const metaPropertyKey = ROUTER_LINK_META_PROPERTY_KEY_PREFIX + propertyKey;
        if (target.hasOwnProperty(metaPropertyKey)) {
            target[metaPropertyKey].context = context;
            target[metaPropertyKey].router = router;
        } else {
            const value: RouterLinkMeta = { context, router };
            Object.defineProperty(target, metaPropertyKey, { value, enumerable: true, configurable: true });
        }
    }
}