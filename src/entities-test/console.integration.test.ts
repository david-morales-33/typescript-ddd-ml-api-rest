import { v4 as uuid } from 'uuid';
import validate from 'uuid-validate'
import { containerPromise } from '../server/SewingProductionAreaManagement/dependency-inyection'
import { ProductionOrderCreator } from '../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateProductionOrder/ProductionOrderCreator';
import { CreateProductionOrderCommandHandler } from '../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/CreateProductionOrder/CreateProductionOrderCommandHandler';
import { CreateProductionOrderCommand } from '../contexts/SewingProductionAreaManagement/ProductionOrder/domain/data-transfer-objects/CreateProductionOrderCommand';

async function request() {
    try {
        const container = await containerPromise;
        const service = container.get<CreateProductionOrderCommandHandler>('SewingProductionAreaManagement.application.ProductionOrder.SearchProductionOrderByCriteriaQueryHandler');

    } catch (error) { console.log(error) }
}

request();