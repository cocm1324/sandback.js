export class BaseError {
    
    protected name: string;
    protected code: number;

    constructor(protected data?: any | any[]) {
        this.name = 'Base Error';
        this.code = 999;
    }

    public getObject() {
        const { name, code, data } = this;
        return { name, code, data };
    }
}