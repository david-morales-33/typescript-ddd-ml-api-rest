import { Query } from "../../../../../Shared/domain/CQRS/Query";

export class CountingRecordsOrderReportsQuery implements Query {
    constructor(
        readonly reference: string,
        readonly productionOrderType: string
    ) { }
}