import { v4 as uuid } from 'uuid';
import { container } from '../server/Platforms/dependency-inyection/application'
import { SearchAllProductionModulesQueryHandler } from '../contexts/PlatformsManagement/ProductionModule/application/SearchAll/SearchAllProductionModulesQueryHandler';
import { SQLServerProductionScheduleRepository } from '../contexts/PlatformsManagement/ProductionSchedule/infrastructure/Persistence/SQLServer/SQLServerProductionScheduleRepository';
import { ProductionModuleId } from '../contexts/PlatformsManagement/ProductionModule/domain/value-objects/ProductionModuleId';
import { SearchAllScheduleQueryHandler } from '../contexts/PlatformsManagement/ProductionSchedule/application/SearchAll/SearchAllScheduleQueryHandler';

async function query() {
    try {
        const handler = container.get<SearchAllScheduleQueryHandler>('PlatformManagement.productionSchedule.application.SearchAllScheduleQueryHandler');
        const response = await handler.handle({productionModuleId: 3})
        console.log(response)
        // const response = await repo.searchAll(new ProductionModuleId(2));

    } catch (error) { console.log(error) }
}
query();