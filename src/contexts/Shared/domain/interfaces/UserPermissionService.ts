import { UserId } from "../../../User/domain/value-objects/UserId";
import { UserPermission } from "../entities/UserPermission";

export interface UserPermissionService {
    validateUserPermissions(data: { userId: UserId, useCasePermission: UserPermission }): Promise<void>
}