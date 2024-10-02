import { Router } from 'express';
import { CountingRecordsOrderRoutes } from '../SewingProductionAreaManagement/routes/CountingRecordsOrder.routes';
import { ProductionModuleRoutes } from '../SewingProductionAreaManagement/routes/ProductionModule.routes';
import { ProductionOrderRoutes } from '../SewingProductionAreaManagement/routes/ProductionOrder.routes';
import { ProductionOrderDetailRoutes } from '../SewingProductionAreaManagement/routes/ProductionOrderDetail.routes';

export class SewingProductionAreaManagementRoutes {
    public router = Router();
    private productionOrderDetailRoutes = new ProductionOrderDetailRoutes();
    private countingRecordsOrderRoutes = new CountingRecordsOrderRoutes();
    private productionModuleRoutes = new ProductionModuleRoutes();
    private productionOrderRoutes = new ProductionOrderRoutes();

    constructor() {
        this.inizialicer();
    }

    private inizialicer() {
        this.router.use('/orden-produccion-detalles/', this.productionOrderDetailRoutes.router);
        this.router.use('/orden-produccion-maestra/', this.productionOrderRoutes.router);
        this.router.use('/modulo-produccion/', this.productionModuleRoutes.router);
        this.router.use('/registros/', this.countingRecordsOrderRoutes.router);
    }
}