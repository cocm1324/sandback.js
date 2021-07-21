import { Body, Get, Param, Post, Req, RouterModule } from "@src/decorators";


@RouterModule()
export class AppRouter {

    @Get()
    select(@Req() req) {
        throw 'any Error';
    }

    @Post()
    create(@Body() data, dummy, @Param() param) {
        console.log(data, dummy, param)
        return 'created'
    }  
}