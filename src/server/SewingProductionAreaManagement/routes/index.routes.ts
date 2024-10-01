import { CountingRecordsOrderRouter } from '../routes/CountingRecordsOrder.routes'
import { ProductionModuleRouter } from '../routes/ProductionModule.routes'
import { ProductionOrderRouter } from '../routes/ProductionOrder.routes'
import { ProductionOrderDetailRouter } from '../routes/ProductionOrderDetail.routes'

export class SewingProductionAreaManagementRouter {
    private countingRecordsOrderRouter = new CountingRecordsOrderRouter();
    private productionModuleRouter = new ProductionModuleRouter();
    private productionOrderRouter = new ProductionOrderRouter();
    private productionOrderDetailRouter = new ProductionOrderDetailRouter();
    public sewingProductionAreaManagementRouter = Router();

    constructor() {
        this.inizialicer();
    }

    inizialicer() {
    }
}