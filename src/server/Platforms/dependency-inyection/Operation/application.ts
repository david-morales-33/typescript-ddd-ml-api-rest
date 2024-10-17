import { SQLServerOperationRepository } from '../../../../contexts/PlatformsManagement/Operation/infrastructure/Persistence/SQLServer/SQLServerOperationRepository'
import { container } from '../application'

container.
    register('PlatformManagement.infrastructure.productionModule.SqlServerOperationRepository', SQLServerOperationRepository).
    addArgument(container.get('PlatformManagement.infrastructure.shared.ConnectionManager'));