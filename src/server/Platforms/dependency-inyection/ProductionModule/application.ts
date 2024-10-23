import { ProductionModuleSearcher } from '../../../../contexts/PlatformsManagement/ProductionModule/application/SearchAll/productionModuleSearcher';
import { SearchAllProductionModulesQueryHandler } from '../../../../contexts/PlatformsManagement/ProductionModule/application/SearchAll/SearchAllProductionModulesQueryHandler';
import { SQLServerProductionModuleRepository } from '../../../../contexts/PlatformsManagement/ProductionModule/infrastructure/Persistence/SQLServer/SQLServerProductionModuleRepository'
import { container } from '../application'

container.
    register('PlatformManagement.infrastructure.productionModule.SqlServerProductionModuleRepository', SQLServerProductionModuleRepository).
    addArgument(container.get('PlatformManagement.infrastructure.shared.ConnectionManager'));


container.
    register('PlatformManagement.application.productionModule.ProductionModuleSearcher', ProductionModuleSearcher).
    addArgument(container.get('PlatformManagement.infrastructure.productionModule.SqlServerProductionModuleRepository'));

container.
    register('PlatformManagement.application.productionModule.SearchAllProductionModulesQueryHandler', SearchAllProductionModulesQueryHandler).
    addArgument(container.get('PlatformManagement.application.productionModule.ProductionModuleSearcher'))