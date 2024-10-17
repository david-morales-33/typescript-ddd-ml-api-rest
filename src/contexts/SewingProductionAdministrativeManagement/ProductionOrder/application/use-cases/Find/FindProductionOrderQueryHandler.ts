import { Query } from "../../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/CQRS/QueryHandler";
import { ProductionOrderId } from "../../../../../Shared/domain/value-object/ProductionOrderId";
import { FindProductionOrderQuery } from "./FindProductionOrderQuery";
import { ProductionOrderFinder } from "./ProductionOrderFinder";
import { ProductionOrderResponse } from "./ProductionOrderResponse";

export class FindProductionOrderQueryHandler implements QueryHandler<FindProductionOrderQuery, ProductionOrderResponse> {
    constructor(private productionOrderFinder: ProductionOrderFinder ){}

    subscribedTo(): Query {
        return FindProductionOrderQuery;
    }

    async handle(query: FindProductionOrderQuery): Promise<ProductionOrderResponse> {
        const productionOrderId = new ProductionOrderId(query.productionOrderId);

        return await this.productionOrderFinder.execute(productionOrderId);
    }
}