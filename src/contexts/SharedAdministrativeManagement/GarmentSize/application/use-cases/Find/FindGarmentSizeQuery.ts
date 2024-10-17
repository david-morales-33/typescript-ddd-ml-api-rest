import { Query } from "../../../../../Shared/domain/CQRS/Query";

export class FindGarmentSizeQuery implements Query {
    constructor(readonly garmentSizeId: string) { }
}