import { UserPermissionValidator } from '../../../../contexts/Shared/application/Validate/UserPermissionValidator';
import { InMemoryUserPermissionRepository } from '../../../../contexts/Shared/infrastructure/inMemory/InMemoryUserPermissionRepository';
import { SQLServerUserPermission } from '../../../../contexts/Shared/infrastructure/persistence/SQLServere/SQLServerUserPermission';
import { container } from '../application';

container.
    register('SewingProductionAreaManagement.infrastructure.UserPermission.InMemoryUserPermissionRepository', InMemoryUserPermissionRepository);

container.
    register('SewingProductionAreaManagement.infrastructure.UserPermission.SQLServerUserPermission', SQLServerUserPermission).
    addArgument(container.get('SewingProductionAreaManagement.infrastructure.shared.ConnectionManager'))

container.
    register('SewingProductionAreaManagement.application.UserPermission.UserPermissionValidator', UserPermissionValidator).addArgument(container.get('SewingProductionAreaManagement.infrastructure.UserPermission.InMemoryUserPermissionRepository'));