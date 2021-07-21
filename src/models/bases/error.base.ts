export class BaseError {
    protected name: string;
    protected code: number;
    protected message: string;

    constructor(protected data?: any | any[]) {
        this.name = 'Base Error';
        this.code = 999;
        this.message = 'This Error is Base Error';
    }

    public getObject() {
        const { name, code, message, data } = this;
        return { name, code, message, data };
    }
}