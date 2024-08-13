import { UserId } from "../../domain/value-objects/UserId";
import { UserExternalServiceDTO } from "../data-transfer-objects/UserExternalServiceDTO";

export interface UserExternalService {
    find(userId: UserId): UserExternalServiceDTO;
}