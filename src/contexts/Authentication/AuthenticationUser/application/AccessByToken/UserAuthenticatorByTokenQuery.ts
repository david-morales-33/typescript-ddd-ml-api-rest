import { Query } from "../../../../Shared/domain/CQRS/Query";

export class UserAuthenticatorByTokenQuery implements Query {
    constructor(public readonly token: string) { }
}