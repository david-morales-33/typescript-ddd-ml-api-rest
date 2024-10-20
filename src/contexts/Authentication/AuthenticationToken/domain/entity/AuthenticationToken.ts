import { AuthenticationTokenDTO } from "../data-transfer-objects/AuthenticationTokenDTO";
import { TokenCreationDate } from "../value-objects/TokenCreationDate";
import { TokenExpirationDate } from "../value-objects/TokenExpirationDate";
import { TokenId } from "../value-objects/TokenId";
import { TokenState } from "../value-objects/TokenState";

export class AuthenticationToken {

    readonly state: TokenState;
    constructor(
        readonly tokenId: TokenId,
        readonly expirationDate: TokenExpirationDate,
        readonly creationDate: TokenCreationDate,
    ) {
        this.state = new TokenState(this.isValid())
    }

    static craete(
        tokenId: TokenId,
        expirationDate: TokenExpirationDate,
        creationDate: TokenCreationDate,
    ): AuthenticationToken {
        return new AuthenticationToken(
            tokenId,
            expirationDate,
            creationDate,
        );
    }

    public isValid(): boolean {
        return new Date() < this.expirationDate.value;
    }

    static fromPrimitives(data: AuthenticationTokenDTO): AuthenticationToken {
        return new AuthenticationToken(
            new TokenId(data.tokenId),
            new TokenExpirationDate(data.expirationDate),
            new TokenCreationDate(data.creationDate),
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