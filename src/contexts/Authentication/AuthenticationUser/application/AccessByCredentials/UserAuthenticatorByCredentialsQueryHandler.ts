import { Query } from "../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../Shared/domain/CQRS/QueryHandler";
import { UserId } from "../../../../Shared/domain/value-object/UserId";
import { UserPassword } from "../../../../Shared/domain/value-object/UserPassword";
import { AuthenticationResponse } from "../AuthenticationResponse";
import { UserAuthenticatorByCredentials } from "./UserAuthenticatorByCredentials";
import { UserAuthenticatorByCredentialsQuery } from "./UserAuthenticatorByCredentialsQuery";

export class UserAuthenticatorByCredentialsQueryHandler implements QueryHandler<UserAuthenticatorByCredentialsQuery, AuthenticationResponse> {
    constructor(private authenticator: UserAuthenticatorByCredentials) { }
    subscribedTo(): Query {
        return UserAuthenticatorByCredentialsQuery;
    }
    async handle(query: UserAuthenticatorByCredentialsQuery): Promise<AuthenticationResponse> {
        const documentId = new UserId(query.documentId);
        const password = new UserPassword(query.password);
        return await this.authenticator.execute(documentId, password)
    }
}