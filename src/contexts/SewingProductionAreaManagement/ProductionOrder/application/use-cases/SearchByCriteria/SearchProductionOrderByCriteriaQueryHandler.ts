import { Query } from "../../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/CQRS/QueryHandler";
import { Filters } from "../../../../../Shared/domain/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/Criteria/Order";
import { ProductionOrderByCriteriaSearcher } from "./ProductionOrderByCriteriaSearcher";
import { ProductionOrderResponse } from "./ProductionOrderResponse";
import { SearchProductionOrderByCriteriaQuery } from "./SearchProductionOrderByCriteriaQuery";

export class SearchProductionOrderByCriteriaQueryHandler implements QueryHandler<SearchProductionOrderByCriteriaQuery, ProductionOrderResponse[]> {
    constructor(private searcher: ProductionOrderByCriteriaSearcher) { }

    subscribedTo(): Query {
        return SearchProductionOrderByCriteriaQuery;
    }

    async handle(query: SearchProductionOrderByCriteriaQuery): Promise<ProductionOrderResponse[]> {
        const filters = Filters.fromValues(query.filters);
        const order = Order.fromValues(query.orderBy, query.orderType);
        return await this.searcher.execute(filters, order)
    }
}