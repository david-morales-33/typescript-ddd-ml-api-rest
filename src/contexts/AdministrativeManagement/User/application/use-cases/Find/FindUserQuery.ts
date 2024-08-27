import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";
import { UserId } from "../../../domain/value-objects/UserId";

export class FindUserQuery implements Query {
    constructor(readonly userId: UserId) { }
}