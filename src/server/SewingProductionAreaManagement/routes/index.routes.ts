import { Router } from 'express';
import { ProductionOrderDetailRoutes } from './ProductionOrderDetail.routes';
import { CountingRecordsOrderRoutes } from './CountingRecordsOrder.routes';
import { ProductionModuleRoutes } from './ProductionModule.routes';
import { ProductionOrderRoutes } from './ProductionOrder.routes';

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
        this.router.use('/orden-conteo-registros/', this.countingRecordsOrderRoutes.router);
    }
}