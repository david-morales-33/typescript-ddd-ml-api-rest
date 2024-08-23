import { Criteria } from "../../../../Shared/domain/design-patterns/Criteria/Criteria";
import { CommonUserViewDTO } from "../../application/data-transfer-objects/CommonUserViewDTO";
import { CommonUser } from "../entities/CommonUser";
import { UserId } from "../value-objects/UserId";

export interface CommonUserRepository {
    save(user:CommonUser): Promise<void>
    find(userId: UserId): Promise<CommonUser | null | undefined>
    searchAll(): Promise<CommonUser[]>
    match(criteria: Criteria): Promise<CommonUserViewDTO[]>
}

