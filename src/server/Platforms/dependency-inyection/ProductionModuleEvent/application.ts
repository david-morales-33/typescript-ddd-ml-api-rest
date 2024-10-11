import { SQLServerProductionModuleEvent } from '../../../../contexts/PlatformsManagement/ProductionModuleEvent/infrastructure/Persistence/SQLServer/SQLServerProductionModuleEvent'
import { container } from '../application'

container.register('PlatformManagement.infrastructure.productionModule.SQLServerProductionModuleEvent', SQLServerProductionModuleEvent).
    addArgument(container.get('PlatformManagement.infrastructure.shared.ConnectionManager'))