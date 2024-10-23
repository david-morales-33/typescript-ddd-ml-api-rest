import { v4 as uuid } from 'uuid';
import { container } from '../server/Platforms/dependency-inyection/application'
import { SearchAllProductionModuleEventQueryHandler } from '../contexts/PlatformsManagement/ProductionModuleEvent/application/SearchAll/SearchAllProductionModuleEventQueryHandler';
import { SearchOperationQueryHandler } from '../contexts/PlatformsManagement/Operation/application/Search/SearchOperationQueryHandler';

async function query() {
    try {
        const handler = container.get<SearchOperationQueryHandler>('PlatformManagement.productionModule.application.SearchOperationQueryHandler');
        const response = await handler.handle({
            filters:[
                new Map([['field', 'ptf_id'], ['operator', '='], ['value', '1']]),
                new Map([['field', 'prf_id'], ['operator', '='], ['value', '1']]),
            ]
        })
        console.log(response)

    } catch (error) { console.log(error) }
}
query();