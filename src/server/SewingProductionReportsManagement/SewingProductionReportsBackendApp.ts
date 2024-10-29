import { Router } from "express";
import { SewingProductionReportsRoutes } from "./routes/index.routes";

export class SewingProductionReportsBackendApp {
    public router = Router()
    private sewingProductionReportsRoutes = new SewingProductionReportsRoutes()

    constructor() {
        this.register();
        this.configureEventBus();
    }

    private register() {
        this.router.use('/api/ml/reportes-confeccion/', this.sewingProductionReportsRoutes.router);
    }
    private async configureEventBus() {

    }
}