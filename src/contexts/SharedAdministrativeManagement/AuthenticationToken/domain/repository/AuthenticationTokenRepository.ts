import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { UserProfileId } from "../../../../Shared/domain/value-object/UserProfileId";
import { AuthenticationToken } from "../entity/AuthenticationToken";

export interface AuthenticationTokenRepository {
    generate(userId: UserId, profileId: UserProfileId): Promise<AuthenticationToken>
}