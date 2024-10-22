import { v4 as uuid } from 'uuid';
import { container } from '../server/SewingProductionAreaManagement/dependency-inyection/application';
import { SearchCountingRecordsOrderByCriteriaQuery } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/aplication/use-cases/SearchByCriteria/SearchCountingRecordsOrderByCriteriaQuery';
import { SearchProductionOrderByCriteriaQueryHandler } from '../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/SearchByCriteria/SearchProductionOrderByCriteriaQueryHandler';

async function query() {
    try {
        const handler = container.get<SearchProductionOrderByCriteriaQueryHandler>('SewingProductionAreaManagement.application.ProductionOrder.SearchProductionOrderByCriteriaQueryHandler');

        const query = new SearchCountingRecordsOrderByCriteriaQuery(
            [
                new Map([
                    ['field', 'tipo_op_id'],
                    ['operator', '='],
                    ['value', 'MOB']
                ])
            ]
        )
        const response = await handler.handle(query)
        console.log(response)

    } catch (error) { console.log(error) }
}
query();