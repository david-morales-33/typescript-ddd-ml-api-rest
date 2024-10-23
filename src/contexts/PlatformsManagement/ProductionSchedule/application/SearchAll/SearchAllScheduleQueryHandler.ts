import { ProductionScheduleResponse } from "./ProductionScheduleResponse";
import { QueryHandler } from "../../../../Shared/domain/CQRS/QueryHandler";
import { Query } from "../../../../Shared/domain/CQRS/Query";
import { SearchAllScheduleQuery } from "./SearchAllScheduleQuery";
import { ProductionScheduleSearcher } from "./ProductionScheduleSearcher";
import { ProductionModuleId } from "../../../ProductionModule/domain/value-objects/ProductionModuleId";

export class SearchAllScheduleQueryHandler implements QueryHandler<SearchAllScheduleQuery, ProductionScheduleResponse> {
    constructor(private searcher: ProductionScheduleSearcher) { }
    subscribedTo(): Query {
        return SearchAllScheduleQuery;
    }
    async handle(query: SearchAllScheduleQuery): Promise<ProductionScheduleResponse> {
        const productionModuleId = new ProductionModuleId(query.productionModuleId)
        return await this.searcher.execute(productionModuleId);
    }
}