import { Query } from "../../../../../Shared/domain/CQRS/Query";

export class FindColorQuery implements Query {
    constructor(public readonly colorId: string) { }
}