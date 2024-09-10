import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { Query } from "../../../../../Shared/domain/Query";
import { QueryHandler } from "../../../../../Shared/domain/QueryHandler";
import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";
import { FindProductionModuleQuery } from "./FindProductionModuleQuery";
import { ProductionModuleFinder } from "./ProductionModuleFinder";
import { ProductionModuleResponse } from "./ProductionModuleResponse";


export class FindProductionModuleCommandHandler implements QueryHandler<FindProductionModuleQuery, ProductionModuleResponse> {
    constructor(private productionModulefinder: ProductionModuleFinder) { }

    subscribedTo(): Query {
        return FindProductionModuleQuery;
    }

    async handle(query: FindProductionModuleQuery): Promise<ProductionModuleResponse> {
        const productionModuleId = new ProductionModuleId(query.productionModuleId)
        return await this.productionModulefinder.execute(productionModuleId);
    }
}