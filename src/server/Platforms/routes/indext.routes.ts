import { Router } from 'express';

export class PlatfortmsRoutes {
    public router = Router();

    constructor() {
        this.register();
    }

    private register() {
        this.router.use('/movil-app/', () => { console.log('success')});
        this.router.use('/web-app/', () => { });
        this.router.use('/shared/', () => { });
    }
}