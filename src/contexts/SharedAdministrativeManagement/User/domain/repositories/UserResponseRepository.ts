import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { AuthUserViewDTO } from "../data-transfer-objects/AuthUserViewDTO";
import { CommonUserViewDTO } from "../data-transfer-objects/CommonUserViewDTO";

export interface UserResponseRepository {
    find(userId: UserId): Promise<AuthUserViewDTO | null>;
    searchAll(): Promise<CommonUserViewDTO[]>;
    match(criteria: any): Promise<CommonUserViewDTO[]>
}