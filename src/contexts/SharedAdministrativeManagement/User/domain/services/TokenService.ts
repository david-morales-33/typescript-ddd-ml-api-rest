import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { UserProfileId } from "../../../../Shared/domain/value-object/UserProfileId";
import { UserToken } from "../value-objets/UserToken";

export interface TokenService {
    generate(userId: UserId, userProfileId: UserProfileId): Promise<UserToken>
}