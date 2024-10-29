import { Router } from 'express';
import { SewingProductionAreaManagementRoutes } from './routes/index.routes';

export class SewingProductionAreaBackendApp {
    public router = Router();
    private sewingProductionAreaManagementRoutes = new SewingProductionAreaManagementRoutes();

    constructor() {
        this.register();
        this.configureEventBus();
    }

    private register() {
        this.router.use('/api/ml/proceso-confeccion/', this.sewingProductionAreaManagementRoutes.router);
    }

    private async configureEventBus() {

    }
}