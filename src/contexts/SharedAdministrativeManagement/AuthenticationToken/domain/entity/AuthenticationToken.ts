import { AuthenticationTokenDTO } from "../data-transfer-objects/AuthenticationTokenDTO";
import { TokenCreationDate } from "../value-objects/TokenCreationDate";
import { TokenExpirationDate } from "../value-objects/TokenExpirationDate";
import { TokenId } from "../value-objects/TokenId";
import { TokenState } from "../value-objects/TokenState";

export class AuthenticationToken {
    constructor(
        readonly tokenId: TokenId,
        readonly expirationDate: TokenExpirationDate,
        readonly creationDate: TokenCreationDate,
        readonly state: TokenState
    ) { }

    static craete(
        tokenId: TokenId,
        expirationDate: TokenExpirationDate,
        creationDate: TokenCreationDate,
        state: TokenState
    ): AuthenticationToken {
        return new AuthenticationToken(
            tokenId,
            expirationDate,
            creationDate,
            state
        );
    }

    static fromPrimitives(data: AuthenticationTokenDTO): AuthenticationToken {
        return new AuthenticationToken(
            new TokenId(data.tokenId),
            new TokenExpirationDate(data.expirationDate),
            new TokenCreationDate(data.creationDate),
            new TokenState(data.state)
        )
    }

    toPrimitives(): AuthenticationTokenDTO {
        return new AuthenticationTokenDTO(
            this.tokenId.value,
            this.expirationDate.value,
            this.creationDate.value,
            this.state.value
        )
    }

}