import { Query } from "../../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/CQRS/QueryHandler";
import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";
import { FindProductionModuleQuery } from "./FindProductionModuleQuery";
import { ProductionModuleFinder } from "./ProductionModuleFinder";
import { ProductionModuleResponse } from "./ProductionModuleResponse";

export class FindProductionModuleQueryHandler implements QueryHandler<FindProductionModuleQuery, ProductionModuleResponse> {
    constructor(private productionModulefinder: ProductionModuleFinder) { }

    subscribedTo(): Query {
        return FindProductionModuleQuery;
    }

    async handle(query: FindProductionModuleQuery): Promise<ProductionModuleResponse> {
        const productionModuleId = new ProductionModuleId(query.productionModuleId)
        return await this.productionModulefinder.execute(productionModuleId);
    }
}