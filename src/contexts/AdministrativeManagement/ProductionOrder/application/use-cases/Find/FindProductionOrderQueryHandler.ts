import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/design-patterns/CQRS/QueryHandler";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
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