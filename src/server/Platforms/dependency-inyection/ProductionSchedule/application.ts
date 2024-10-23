import { ProductionScheduleSearcher } from '../../../../contexts/PlatformsManagement/ProductionSchedule/application/SearchAll/ProductionScheduleSearcher';
import { SearchAllScheduleQueryHandler } from '../../../../contexts/PlatformsManagement/ProductionSchedule/application/SearchAll/SearchAllScheduleQueryHandler';
import { SQLServerProductionScheduleRepository } from '../../../../contexts/PlatformsManagement/ProductionSchedule/infrastructure/Persistence/SQLServer/SQLServerProductionScheduleRepository';
import { container } from '../application';

container.
    register('PlatformManagement.productionSchedule.infrastructure.SQLServerProductionScheduleRepository', SQLServerProductionScheduleRepository).
    addArgument(container.get('PlatformManagement.infrastructure.shared.ConnectionManager'));

container.
    register('PlatformManagement.productionSchedule.application.ProductionScheduleSearcher', ProductionScheduleSearcher).
    addArgument(container.get('PlatformManagement.productionSchedule.infrastructure.SQLServerProductionScheduleRepository'));

container.
    register('PlatformManagement.productionSchedule.application.SearchAllScheduleQueryHandler', SearchAllScheduleQueryHandler).
    addArgument(container.get('PlatformManagement.productionSchedule.application.ProductionScheduleSearcher'))