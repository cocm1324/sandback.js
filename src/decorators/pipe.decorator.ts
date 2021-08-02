export function UsePipe() {
    

    return function<T extends { new (...args: any[]): {} }>(constructor: T) {

        return class extends constructor {
            
        }
    }
}