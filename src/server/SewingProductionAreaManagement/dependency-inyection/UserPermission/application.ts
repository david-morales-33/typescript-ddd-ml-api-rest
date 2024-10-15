import { container } from '../application';
import { InMemoryUserPermissionRepository } from '../../../../contexts/SewingProductionAreaManagement/UserPermission/infrastructure/InMemory/InMemoryUserPermissionRepository';
import { UserPermissionValidator } from '../../../../contexts/SewingProductionAreaManagement/UserPermission/application/Validate/UserPermissionValidator'
import { SQLServerUserPermission } from '../../../../contexts/SewingProductionAreaManagement/UserPermission/infrastructure/Persistence/SQLServer/SQLServerUserPermission';

container.
    register('SewingProductionAreaManagement.infrastructure.UserPermission.InMemoryUserPermissionRepository', InMemoryUserPermissionRepository);

container.
    register('SewingProductionAreaManagement.infrastructure.UserPermission.SQLServerUserPermission', SQLServerUserPermission).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'))

container.
    register('SewingProductionAreaManagement.application.UserPermission.UserPermissionValidator', UserPermissionValidator).addArgument(container.get('SewingProductionAreaManagement.infrastructure.UserPermission.InMemoryUserPermissionRepository'));