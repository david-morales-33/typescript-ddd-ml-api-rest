import { AdminUser } from "../entities/AdminUser";
import { UserId } from "../value-objects/UserId";

export interface AdminUserRepository {
    find(userId: UserId): Promise<AdminUser>
}