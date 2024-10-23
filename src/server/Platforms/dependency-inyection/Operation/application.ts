import { OperationSearcher } from '../../../../contexts/PlatformsManagement/Operation/application/Search/OperationSearcher';
import { SearchOperationQueryHandler } from '../../../../contexts/PlatformsManagement/Operation/application/Search/SearchOperationQueryHandler';
import { SQLServerOperationRepository } from '../../../../contexts/PlatformsManagement/Operation/infrastructure/Persistence/SQLServer/SQLServerOperationRepository'
import { container } from '../application'

container.
    register('PlatformManagement.productionModule.infrastructure.SqlServerOperationRepository', SQLServerOperationRepository).
    addArgument(container.get('PlatformManagement.infrastructure.shared.ConnectionManager'));

container.
    register('PlatformManagement.productionModule.application.OperationSearcher', OperationSearcher).
    addArgument(container.get('PlatformManagement.productionModule.infrastructure.SqlServerOperationRepository'));

container.
    register('PlatformManagement.productionModule.application.SearchOperationQueryHandler', SearchOperationQueryHandler).
    addArgument(container.get('PlatformManagement.productionModule.application.OperationSearcher'))