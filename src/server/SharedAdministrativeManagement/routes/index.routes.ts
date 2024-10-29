import { Router } from 'express';

export class SharedAdministrativeRoutes {
    public router = Router();
    constructor() {
        this.inizialicer();
    }
    private inizialicer() {
        this.router.use('/orden-produccion-detalles/', () => { });
        this.router.use('/orden-produccion-maestra/', () => { });
        this.router.use('/referencia/', () => { });
        this.router.use('/color/', () => { });
        this.router.use('/usuario/', () => { });
    }
}