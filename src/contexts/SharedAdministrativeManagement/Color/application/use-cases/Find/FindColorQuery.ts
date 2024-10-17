import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";

export class FindColorQuery implements Query {
    constructor(public readonly colorId: string) { }
}