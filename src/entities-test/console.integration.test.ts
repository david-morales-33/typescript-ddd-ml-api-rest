import { v4 as uuid } from 'uuid';
import validate from 'uuid-validate'
import { containerPromise } from '../server/SewingProductionAreaManagement/dependency-inyection'
import { ProductionOrderDetailQueryHandler } from '../contexts/SewingProductionAreaManagement/ProductionOrderDetail/application/use-cases/Find/ProductionOrderDetailQueryHandler';
import { FindProductionOrderDetailQuery } from '../contexts/SewingProductionAreaManagement/ProductionOrderDetail/application/use-cases/Find/FindProductionOrderDetailQuery';

async function request() {
    try {
        const container = await containerPromise;
        const service = container.get<ProductionOrderDetailQueryHandler>('SewingProductionAreaManagement.application.ProductionOrderDetail.ProductionOrderDetailQueryHandler');
        const response = await service.handle(
            new FindProductionOrderDetailQuery('MOB4399')
        )
        console.log(response)
    } catch (error) { console.log(error) }
}

request();