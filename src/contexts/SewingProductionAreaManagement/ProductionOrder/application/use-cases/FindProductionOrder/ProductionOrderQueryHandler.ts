import { Query } from "../../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/CQRS/QueryHandler";
import { ProductionOrderId } from "../../../../../Shared/domain/value-object/ProductionOrderId";
import { FindProductionOrderQuery } from "./FindProductionOrderQuery";
import { ProductionOrderFInder } from "./ProductionOrderFInder";
import { ProductionOrderResponse } from "./ProductionOrderResponse";

export class ProductionOrderQueryHandler implements QueryHandler<FindProductionOrderQuery, ProductionOrderResponse> {

    constructor(private productionOrderFinder: ProductionOrderFInder) { }

    subscribedTo(): Query {
        return FindProductionOrderQuery;
    }

    async handle(query: FindProductionOrderQuery): Promise<ProductionOrderResponse> {
        return await this.productionOrderFinder.execute(new ProductionOrderId(query.productionOrderId))
    }
}