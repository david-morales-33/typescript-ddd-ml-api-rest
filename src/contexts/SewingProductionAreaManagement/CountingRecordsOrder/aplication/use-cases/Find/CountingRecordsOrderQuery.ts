import { Query } from "../../../../Shared/domain/design-patterns/CQRS/Query";
import { CountingRecordsOrderId } from "../../../domain/value-objects/CountingRecordsOrderId";

export class CountingRecordsOrderQuery implements Query {
    constructor(readonly countingRecordsOrderId: string) { }
}