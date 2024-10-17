import { UserPermission } from "../entities/UserPermission";
import { UserId } from "../value-object/UserId";

export interface UserPermissionRepository {
    searchAll(userId: UserId): Promise <UserPermission[]>;
}