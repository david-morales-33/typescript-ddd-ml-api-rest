import { Query } from "../../../../Shared/domain/CQRS/Query";

export class UserAuthenticatorByCredentialsQuery implements Query {
    constructor(
        public readonly documentId: string,
        public readonly password: string
    ) { }
}