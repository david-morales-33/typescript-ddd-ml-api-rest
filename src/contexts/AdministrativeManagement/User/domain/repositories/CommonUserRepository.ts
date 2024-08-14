import { CommonUser } from "../entities/CommonUser";
import { UserId } from "../value-objects/UserId";

export interface CommonUserRepository {
    save(user:CommonUser): Promise<void>
    find(userId: UserId): Promise<CommonUser | null | undefined>
    searchAll(): Promise<CommonUser[]>
    match(criteria: any): Promise<CommonUser[]>
}

