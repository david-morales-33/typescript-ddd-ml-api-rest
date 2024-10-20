import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { UserProfileId } from "../../../../Shared/domain/value-object/UserProfileId";
import { AuthenticationDataDTO } from "../data-transfer-objects/AuthenticationDataDTO";
import { AuthenticationToken } from "../entity/AuthenticationToken";
import { TokenId } from "../value-objects/TokenId";

export interface AuthenticationTokenService {
    generate(userId: UserId, profileId: UserProfileId): Promise<AuthenticationToken>;
    deserialize(token: TokenId): Promise<AuthenticationDataDTO | null>;
}