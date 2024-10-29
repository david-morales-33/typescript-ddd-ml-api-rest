import { Router } from 'express';
import { PlatfortmsRoutes } from "./routes/indext.routes";

export class PlatformsBackendApp {
    public router = Router();
    private platfortmsRoutes = new PlatfortmsRoutes();

    constructor() {
        this.register();
        this.configureEventBus();
    }

    private register() {
        this.router.use('/api/ml/plataformas/', this.platfortmsRoutes.router);
    }

    private async configureEventBus() {

    }
}