import { ProductionModuleEventSearcher } from '../../../../contexts/PlatformsManagement/ProductionModuleEvent/application/SearchAll/ProductionModuleEventSearcher';
import { SearchAllProductionModuleEventQueryHandler } from '../../../../contexts/PlatformsManagement/ProductionModuleEvent/application/SearchAll/SearchAllProductionModuleEventQueryHandler';
import { SQLServerProductionModuleEvent } from '../../../../contexts/PlatformsManagement/ProductionModuleEvent/infrastructure/Persistence/SQLServer/SQLServerProductionModuleEvent'
import { container } from '../application'

container.
    register('PlatformManagement.infrastructure.productionModule.SQLServerProductionModuleEvent', SQLServerProductionModuleEvent).
    addArgument(container.get('PlatformManagement.infrastructure.shared.ConnectionManager'));

container.
    register('PlatformManagement.productionModule.application.ProductionModuleEventSearcher', ProductionModuleEventSearcher).
    addArgument(container.get('PlatformManagement.infrastructure.productionModule.SQLServerProductionModuleEvent'));

container.
    register('PlatformManagement.productionModule.application.SearchAllProductionModuleEventQueryHandler', SearchAllProductionModuleEventQueryHandler).
    addArgument(container.get('PlatformManagement.productionModule.application.ProductionModuleEventSearcher'))