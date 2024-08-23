import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";

export class FindGarmentSizeQuery implements Query {
    constructor(readonly garmentSizeId: number) { }
}