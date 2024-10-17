import { Query } from "../../../../../Shared/domain/CQRS/Query";

export class CountingRecordsOrderQuery implements Query {
    constructor(readonly countingRecordsOrderId: string) { }
}