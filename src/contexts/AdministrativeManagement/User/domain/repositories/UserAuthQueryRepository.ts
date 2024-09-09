import { AuthUser } from "../entities/AuthUser";
import { UserId } from "../value-objects/UserId";

export interface UserAuthQueryRepository {
    find(userId: UserId): Promise<AuthUser | null>;
}