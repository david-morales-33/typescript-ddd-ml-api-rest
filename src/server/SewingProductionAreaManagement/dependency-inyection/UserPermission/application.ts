import { container } from '../application';
import {InMemoryUserPermissionRepository } from '../../../../contexts/SewingProductionAreaManagement/UserPermission/infrastructure/InMemory/InMemoryUserPermissionRepository';
import { UserPermissionValidator } from '../../../../contexts/SewingProductionAreaManagement/UserPermission/application/Validate/UserPermissionValidator'

const inMemoryUserPermissionRepository = container.register('SewingProductionAreaManagement.infrastructure.UserPermission.InMemoryUserPermissionRepository', InMemoryUserPermissionRepository);

container.register('SewingProductionAreaManagement.application.UserPermission.UserPermissionValidator', UserPermissionValidator).addArgument(inMemoryUserPermissionRepository)
