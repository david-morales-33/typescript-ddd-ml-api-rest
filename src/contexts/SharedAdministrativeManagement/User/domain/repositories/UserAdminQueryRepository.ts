import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { AdminUser } from "../entities/AdminUser";

export interface UserAdminQueryRepository{
    find(userId: UserId):Promise<AdminUser | null>
}