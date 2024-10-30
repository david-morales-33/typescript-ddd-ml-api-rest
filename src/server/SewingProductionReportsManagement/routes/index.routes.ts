import { Router } from 'express';

export class SewingProductionReportsRoutes {
    public router = Router();
    constructor() {
        this.register();
    }
    private register() {
        this.router.use('/modulo-produccion/', () => { });
        this.router.use('/orden-conteo-registro/', () => { });
        this.router.use('/orden-produccion/', () => { });
        this.router.use('/operario/', () => { });
    }
}