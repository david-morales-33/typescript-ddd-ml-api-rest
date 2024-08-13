import { CommonUser } from "../entities/CommonUser";
import { UserId } from "../value-objects/UserId";

export interface CommonUserRepository {
    save(): Promise<void>;
    find(userId: UserId): Promise<CommonUser>
    searchAll(): Promise<CommonUser[]>
    match(criteria: any): Promise<CommonUser[]>
}

