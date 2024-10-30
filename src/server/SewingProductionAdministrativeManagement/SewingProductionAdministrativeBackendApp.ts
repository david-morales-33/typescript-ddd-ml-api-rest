import { Router } from 'express';
import { SewingProductionAdministrativeRoutes } from './routes/index.routes';

export class SewingProductionAdministrativeBackendApp {
    public router = Router();
    private sewingProductionAdministrativeRoutes = new SewingProductionAdministrativeRoutes();
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