import { UserPermission } from "../entities/UserPermission";
import { UserId } from "../value-object/UserId";

export interface UserPermissionService {
    validateUserPermissions(data: { userId: UserId, useCasePermission: UserPermission }): Promise<void>
}