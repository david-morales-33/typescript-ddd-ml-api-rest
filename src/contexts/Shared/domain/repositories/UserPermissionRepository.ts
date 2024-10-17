import { UserId } from "../../../User/domain/value-objects/UserId";
import { UserPermission } from "../entities/UserPermission";

export interface UserPermissionRepository {
    searchAll(userId: UserId): Promise <UserPermission[]>;
}