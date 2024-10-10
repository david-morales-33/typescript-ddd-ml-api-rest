import { SQLServerProductionModuleRepository } from '../../../../contexts/PlatformsManagement/productionModule/infrastructure/Persistence/SQLServer/SQLServerProductionModuleRepository'
import { container } from '../application'

container.register('PlatformManagement.infrastructure.productionModule.SqlServerProductionModuleRepository', SQLServerProductionModuleRepository).addArgument(container.get('PlatformManagement.infrastructure.shared.ConnectionManager'))