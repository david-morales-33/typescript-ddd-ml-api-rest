import { AuthUser } from "../entities/AuthUser";

export interface AuthUserRepository {
    save(user: AuthUser): Promise<void>
}