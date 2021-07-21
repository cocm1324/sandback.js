import { ExpressApp } from './express.module';

const app = new ExpressApp();
const pending: Promise<string> = app['start']();
pending.then(result => {
    console.log(result);
});