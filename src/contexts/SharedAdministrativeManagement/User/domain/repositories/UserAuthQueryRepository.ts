import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { AuthUser } from "../entities/AuthUser";

export interface UserAuthQueryRepository {
    find(userId: UserId): Promise<AuthUser | null>;
}