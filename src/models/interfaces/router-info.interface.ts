/**
 * @name RouterInfo
 * @description to specify which router module should be associated to which context in ExpressAppModule
 */
export interface RouterInfo {
    /**
     * base context of router
     */
    context: string;
    /**
     * router module to associate
     */
    router: any;
}