import { AuthUser } from "../entities/AuthUser";
import { UserId } from "../value-objects/UserId";

export interface AuthUserRepository {
    save(user: AuthUser): Promise<void>;
    find(userId: UserId): Promise<AuthUser| null | undefined>;
}