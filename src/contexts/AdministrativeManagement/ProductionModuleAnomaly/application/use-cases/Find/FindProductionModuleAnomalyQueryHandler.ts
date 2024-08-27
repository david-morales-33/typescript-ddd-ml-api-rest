import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/design-patterns/CQRS/QueryHandler";
import { FindProductionModuleAnomalyQuery } from "./FindProductionModuleAnomalyQuery";
import { ProductionModuleAnomalyFinder } from "./ProductionModuleAnomalyFinder";
import { ProductionModuleAnomalyResponse } from "./ProductionModuleAnomalyResponse";

export class FindProductionModuleAnomalyQueryHandler implements
    QueryHandler<FindProductionModuleAnomalyQuery, ProductionModuleAnomalyResponse> {
        
    constructor(private productionModuleAnomalyFinder: ProductionModuleAnomalyFinder) { }

    subscribedTo(): Query {
        return FindProductionModuleAnomalyQuery;
    }

    async handle(query: FindProductionModuleAnomalyQuery): Promise<ProductionModuleAnomalyResponse> {
        return this.productionModuleAnomalyFinder.execute(query.productionModuleAnomalyId)
    }
}