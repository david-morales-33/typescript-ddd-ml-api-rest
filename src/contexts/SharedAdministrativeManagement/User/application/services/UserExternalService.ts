import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { UserExternalServiceDTO } from "../../domain/data-transfer-objects/UserExternalServiceDTO";

export interface UserExternalService {
    find(userId: UserId): Promise<UserExternalServiceDTO | null>;
}