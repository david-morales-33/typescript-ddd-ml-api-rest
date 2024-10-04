import { Filters } from "../../../../../Shared/domain/design-patterns/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/design-patterns/Criteria/Order";
import { Query } from "../../../../../Shared/domain/Query";
import { QueryHandler } from "../../../../../Shared/domain/QueryHandler";
import { CountingRecordsOrderByCriteriaSearcher } from "./CountingRecordsOrderByCriteriaSearcher";
import { CountingRecordsOrderResponse } from "./CountingRecordsOrderResponse";
import { SearchCountingRecordsOrderByCriteriaQuery } from "./SearchCountingRecordsOrderByCriteriaQuery";

export class SearchCountingRecordsOrderByCriteriaQueryHandler implements QueryHandler<SearchCountingRecordsOrderByCriteriaQuery, CountingRecordsOrderResponse[]> {
    constructor(private searcher: CountingRecordsOrderByCriteriaSearcher) { }

    subscribedTo(): Query {
        return SearchCountingRecordsOrderByCriteriaQuery;
    }

    async handle(query: SearchCountingRecordsOrderByCriteriaQuery): Promise<CountingRecordsOrderResponse[]> {
        const filters = Filters.fromValues(query.filters);
        const order = Order.fromValues(query.orderBy, query.orderType);
        return this.searcher.execute(filters, order)
    }
}