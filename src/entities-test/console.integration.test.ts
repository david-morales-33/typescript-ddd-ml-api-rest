import { v4 as uuid } from 'uuid';
import { container } from '../server/SewingProductionAreaManagement/dependency-inyection/application'
import { ProductionOrderDetailQueryHandler } from '../contexts/SewingProductionAreaManagement/ProductionOrderDetail/application/use-cases/Find/ProductionOrderDetailQueryHandler';
import { FindProductionOrderDetailQuery } from '../contexts/SewingProductionAreaManagement/ProductionOrderDetail/application/use-cases/Find/FindProductionOrderDetailQuery';


async function query() {
    try {
        const handler = container.get<ProductionOrderDetailQueryHandler>('SewingProductionAreaManagement.application.ProductionOrderDetail.ProductionOrderDetailQueryHandler');

        const query = new FindProductionOrderDetailQuery('MOB4399')
        const response = await handler.handle(query)

        console.log(response)
    } catch (error) { console.log(error) }
}
query();