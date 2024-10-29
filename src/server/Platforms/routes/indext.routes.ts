import { Router } from 'express';

export class PlatfortmsRoutes {
    public router = Router();

    constructor() {
        this.inizialicer();
    }

    private inizialicer() {
        this.router.use('/movil-app/', () => { });
        this.router.use('/web-app/', () => { });
        this.router.use('/shared/', () => { });
    }
}