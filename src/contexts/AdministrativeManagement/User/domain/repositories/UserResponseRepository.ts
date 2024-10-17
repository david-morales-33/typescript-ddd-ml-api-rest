import { AuthUserViewDTO } from "../../../../SharedAdministrativeManagement/User/domain/data-transfer-objects/AuthUserViewDTO";
import { CommonUserViewDTO } from "../data-transfer-objects/CommonUserViewDTO";
import { UserId } from "../value-objects/UserId";

export interface UserResponseRepository {
    find(userId: UserId): Promise<AuthUserViewDTO | null>;
    searchAll(): Promise<CommonUserViewDTO[]>;
    match(criteria: any): Promise<CommonUserViewDTO[]>
}