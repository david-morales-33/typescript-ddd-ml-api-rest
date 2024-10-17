import { Query } from "../../../../../Shared/domain/CQRS/Query";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

export class FindUserQuery implements Query {
    constructor(readonly userId: UserId) { }
}