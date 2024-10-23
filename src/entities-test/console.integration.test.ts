import { v4 as uuid } from 'uuid';
import { container } from '../server/Platforms/dependency-inyection/application'
import { SearchAllProductionModuleEventQueryHandler } from '../contexts/PlatformsManagement/ProductionModuleEvent/application/SearchAll/SearchAllProductionModuleEventQueryHandler';

async function query() {
    try {
        const handler = container.get<SearchAllProductionModuleEventQueryHandler>('PlatformManagement.productionModule.application.SearchAllProductionModuleEventQueryHandler');
        const response = await handler.handle()
        console.log(response)

    } catch (error) { console.log(error) }
}
query();