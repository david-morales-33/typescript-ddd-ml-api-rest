import { Query } from "../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../Shared/domain/CQRS/QueryHandler";
import { TokenId } from "../../../AuthenticationToken/domain/value-objects/TokenId";
import { AuthenticationResponse } from "../AuthenticationResponse";
import { UserAuthenticatorByToken } from "./UserAuthenticatorByToken";
import { UserAuthenticatorByTokenQuery } from "./UserAuthenticatorByTokenQuery";

export class UserAuthenticatorByTokenQueryHandler implements QueryHandler<UserAuthenticatorByTokenQuery, AuthenticationResponse> {
    constructor(private authenticator: UserAuthenticatorByToken) { }
    subscribedTo(): Query {
        return UserAuthenticatorByTokenQuery;
    }
    async handle(query: UserAuthenticatorByTokenQuery): Promise<AuthenticationResponse> {
        const token = new TokenId(query.token);
        return await this.authenticator.execute(token)
    }
}