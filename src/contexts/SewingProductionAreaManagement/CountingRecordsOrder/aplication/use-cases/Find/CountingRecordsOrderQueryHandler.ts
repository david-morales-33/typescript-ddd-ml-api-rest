import { Query } from "../../../../Shared/domain/design-patterns/CQRS/Query";
import { QueryHandler } from "../../../../Shared/domain/design-patterns/CQRS/QueryHandler";
import { CountingRecordsOrderFinder } from "./CountingRecordsOrderFinder";
import { CountingRecordsOrderQuery } from "./CountingRecordsOrderQuery";
import { CountingRecordsOrderResponse } from "./CountingRecordsOrderResponse";


export class CountingRecordsOrderQueryHandler implements QueryHandler<CountingRecordsOrderQuery, CountingRecordsOrderResponse> {

    constructor(private countingRecordsOrderFinder: CountingRecordsOrderFinder) { }

    subscribedTo(): Query {
        return CountingRecordsOrderQuery;
    }

    async handle(query: CountingRecordsOrderQuery): Promise<CountingRecordsOrderResponse> {
        return await this.countingRecordsOrderFinder.execute(query.countingRecordsOrderId);
    }
}