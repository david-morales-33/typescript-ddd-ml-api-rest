import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { User } from "../entities/User";

export interface UserRepository {
    find(userId: UserId): Promise<User | null>;
}