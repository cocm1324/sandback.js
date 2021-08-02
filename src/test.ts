import { Body, Post, Router, Module, startServer, useCors, useJson, Headers } from '.';

@Router()
class MainRouter {
    @Post()
    sayHello(@Body() data, @Headers() header) {
        console.log(header);
        return 'hello' + JSON.stringify(data);
    }
}

@Module({
    port: 4000,
    useRouter: [ { context: '/', router: MainRouter } ],
    useMiddleware: [
        useCors(),
        useJson()
    ]
})
class App { }

startServer(App).then(result => {
    console.log(result);
});