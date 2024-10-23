import { v4 as uuid } from 'uuid';
import { container } from '../server/Platforms/dependency-inyection/application'
import { SearchCountingRecordsOrderByCriteriaQuery } from '../contexts/SewingProductionAreaManagement/CountingRecordsOrder/aplication/use-cases/SearchByCriteria/SearchCountingRecordsOrderByCriteriaQuery';
import { SearchProductionOrderByCriteriaQueryHandler } from '../contexts/SewingProductionAreaManagement/ProductionOrder/application/use-cases/SearchByCriteria/SearchProductionOrderByCriteriaQueryHandler';
import { SearchAllProductionModulesQueryHandler } from '../contexts/PlatformsManagement/ProductionModule/application/SearchAll/SearchAllProductionModulesQueryHandler';
import { SearchAllProductionModulesQuery } from '../contexts/PlatformsManagement/ProductionModule/application/SearchAll/SearchAllProductionModulesQuery';

async function query() {
    try {
        const handler = container.get<SearchAllProductionModulesQueryHandler>('PlatformManagement.application.productionModule.SearchAllProductionModulesQueryHandler');
        // const query = new SearchAllProductionModulesQuery();
        const response = await handler.handle()
        console.log(response)

    } catch (error) { console.log(error) }
}
query();