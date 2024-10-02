import { Router } from 'express';
import { SewingProductionAreaManagementRoutes } from './SewingProductionAreaManagement.routes'
import { AdministrativeManagementRoutes } from './AdministrativeManagement.routes'

export class ContextRoutes {
    public router = Router();
    private administrativeManagementRoutes = new AdministrativeManagementRoutes();
    private sewingProductionAreaManagementRoutes = new SewingProductionAreaManagementRoutes();

    constructor() {
        this.inizialicer();
    }

    private inizialicer() {
        this.router.use('/mujer-latina/proceso-administrativo/', this.administrativeManagementRoutes.router);
        this.router.use('/mujer-latina/proceso-confeccion/', this.sewingProductionAreaManagementRoutes.router);
    }
}