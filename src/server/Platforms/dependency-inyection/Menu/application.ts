import { SQLServerMenuRepository } from '../../../../contexts/PlatformsManagement/Menu/infrastructure/Persistence/SQLServer/SQLServerMenuRepository';
import { container } from '../application'

container.
    register('PlatformManagement.infrastructure.menu.SqlServerMenuRepository', SQLServerMenuRepository).
    addArgument(container.get('PlatformManagement.infrastructure.shared.ConnectionManager'));