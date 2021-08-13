import { Body, Post, Router, ApplicationModule, startServer, Headers, RouterLink } from '.';

@Router()
class SubRouter {

    @Post()
    sayHello(@Body() data, @Headers() header) {
        console.log(header);
        return 'hello' + JSON.stringify(data);
    }
}

@Router()
class MainRouter {
    @RouterLink('/sub', SubRouter)
    subRouter;

    @Post()
    sayHello(@Body() data, @Headers() header) {
        console.log(header);
        return 'hello' + JSON.stringify(data);
    }
}

@ApplicationModule({})
class App { 
    @RouterLink('/', MainRouter)
    main;
}

startServer(App).then(result => {
    console.log(result);
});

class A {
    constructor(private a: App) {}

    memeberA (k: string, j: number): string {
        return k + j;
    }
}
const app = new App()
const a = new A(app);

console.log(a.constructor.toString());