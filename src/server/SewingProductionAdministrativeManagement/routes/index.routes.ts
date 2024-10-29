import { Router } from "express";


export class SewingProductionAdministrativeRoutes {
    public router = Router();

    constructor() {
        this.inizialicer();
    }
    private inizialicer() {
        this.router.use('/orden-produccion/', () => { });
        this.router.use('/modulo-produccion/', () => { });
        this.router.use('/evento-modulo-produccion/', () => { });
    }
}