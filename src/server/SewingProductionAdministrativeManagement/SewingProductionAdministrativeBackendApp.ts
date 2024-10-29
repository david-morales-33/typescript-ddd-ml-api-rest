import { Router } from 'express';

export class SewingProductionAdministrativeBackendApp {
    public router = Router();
    private sewingProductionAdministrativeRoutes = new SewingProductionAdministrativeBackendApp();
    constructor() {
        this.register();
        this.configureEventBus();
    }

    private register() {
        this.router.use('/api/ml/administracion-confeccion/', this.sewingProductionAdministrativeRoutes.router);
    }

    private async configureEventBus() {

    }
}