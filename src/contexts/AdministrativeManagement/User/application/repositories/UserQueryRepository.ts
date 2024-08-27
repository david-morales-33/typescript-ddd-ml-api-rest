import { UserId } from "../../domain/value-objects/UserId";
import { UserViewDTO } from "../data-transfer-objects/UserViewDTO";

export interface UserQueryRepository {
    find(userId: UserId): Promise<UserViewDTO | null>;
}