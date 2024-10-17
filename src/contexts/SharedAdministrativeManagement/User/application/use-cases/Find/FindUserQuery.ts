import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";

export class FindUserQuery implements Query {
    constructor(readonly userId: UserId) { }
}