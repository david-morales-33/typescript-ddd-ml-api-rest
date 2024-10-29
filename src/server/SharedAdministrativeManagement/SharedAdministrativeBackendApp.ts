import { Router } from 'express';
import { SharedAdministrativeRoutes } from "./routes/index.routes";

export class SharedAdministrativeBackendApp {
    public router = Router();
    private sharedAdministrativeRoutes = new SharedAdministrativeRoutes();
    constructor() {
        this.register();
        this.configureEventBus();
    }

    private register() {
        this.router.use('/api/ml/administracion-compartida/', this.sharedAdministrativeRoutes.router);
    }

    private async configureEventBus() {

    }
}