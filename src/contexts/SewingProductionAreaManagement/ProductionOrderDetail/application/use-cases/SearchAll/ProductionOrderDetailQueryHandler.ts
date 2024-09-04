import { Query } from "../../../../../Shared/domain/Query";
import { QueryHandler } from "../../../../../Shared/domain/QueryHandler";
import { ProductionOrderDetailResponse } from "./ProductionOrderDetailResponse";
import { ProductionOrderDetailSearcher } from "./ProductionOrderDetailSearcher";
import { SearchProductionOrderDetailQuery } from "./SearchProductionOrderDetailQuery";


export class ProductionOrderDetailQueryHandler implements QueryHandler<SearchProductionOrderDetailQuery, ProductionOrderDetailResponse[]> {
    constructor(private productionOrderDetailSearcher: ProductionOrderDetailSearcher) { }

    subscribedTo(): Query {
        return SearchProductionOrderDetailQuery;
    }

    async handle(): Promise<ProductionOrderDetailResponse[]> {
        return await this.productionOrderDetailSearcher.execute()
    }
}