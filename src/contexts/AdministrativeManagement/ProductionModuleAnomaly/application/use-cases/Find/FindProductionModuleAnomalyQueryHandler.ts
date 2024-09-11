import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/design-patterns/CQRS/QueryHandler";
import { ProductionModuleAnomalyId } from "../../../domain/value-objects/ProductionModuleAnomalyId";
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
        const productionModuleAnomalyId = new ProductionModuleAnomalyId(query.productionModuleAnomalyId)
        return this.productionModuleAnomalyFinder.execute(productionModuleAnomalyId)
    }
}