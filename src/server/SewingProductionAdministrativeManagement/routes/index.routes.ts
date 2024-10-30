import { Router } from "express";


export class SewingProductionAdministrativeRoutes {
    public router = Router();

    constructor() {
        this.register();
    }
    private register() {
        this.router.use('/orden-produccion/', () => { });
        this.router.use('/modulo-produccion/', () => { });
        this.router.use('/evento-modulo-produccion/', () => { });
    }
}