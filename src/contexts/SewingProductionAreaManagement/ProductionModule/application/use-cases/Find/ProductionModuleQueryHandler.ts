import { Query } from "../../../../Shared/domain/design-patterns/CQRS/Query";
import { QueryHandler } from "../../../../Shared/domain/design-patterns/CQRS/QueryHandler";
import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";
import { ProductionModuleFinder } from "./ProductionModuleFinder";
import { ProductionModuleQuery } from "./ProductionModuleQuery";
import { ProductionModuleResponse } from "./ProductionModuleResponse";


export class ProductionModuleQueryHandler implements QueryHandler<ProductionModuleQuery, ProductionModuleResponse> {

    constructor(private productionModuleFinder: ProductionModuleFinder) { }

    subscribedTo(): Query {
        return ProductionModuleQuery;
    }
    async handle(query: ProductionModuleQuery): Promise<ProductionModuleResponse> {
        return await this.productionModuleFinder.execute(new ProductionModuleId(query.productionModuleId));
    }
}