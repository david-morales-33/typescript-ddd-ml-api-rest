import { AuthUser } from "../entities/AuthUser";

export interface UserCommandRepository {
    save(user: AuthUser): Promise<void>
}