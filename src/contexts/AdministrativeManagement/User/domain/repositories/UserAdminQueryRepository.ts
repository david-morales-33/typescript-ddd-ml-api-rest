import { AdminUser } from "../entities/AdminUser";
import { UserId } from "../value-objects/UserId";

export interface UserAdminQueryRepository{
    find(userId: UserId):Promise<AdminUser | null>
}