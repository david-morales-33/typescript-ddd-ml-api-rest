import { Query } from "../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../Shared/domain/CQRS/QueryHandler";
import { Filters } from "../../../../Shared/domain/Criteria/Filters";
import { Order } from "../../../../Shared/domain/Criteria/Order";
import { OperationsResponse } from "./OperationResponse";
import { OperationSearcher } from "./OperationSearcher";
import { SearchOperationQuery } from "./SearchOperationQuery";

export class SearchOperationQueryHandler implements QueryHandler<SearchOperationQuery, OperationsResponse> {
    constructor(private searcher: OperationSearcher) { }
    subscribedTo(): Query {
        return SearchOperationQuery;
    }
    async handle(query: SearchOperationQuery): Promise<OperationsResponse> {
        const filters = Filters.fromValues(query.filters);
        const order = Order.fromValues(query.orderBy, query.orderType);
        return this.searcher.execute(filters, order)
    }
}