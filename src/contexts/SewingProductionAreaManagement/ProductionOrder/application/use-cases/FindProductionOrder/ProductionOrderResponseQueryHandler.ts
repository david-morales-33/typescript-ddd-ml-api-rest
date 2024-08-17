import { CommandHandler } from "../../../../../Shared/domain/CommandHandler";
import { Query } from "../../../../Shared/domain/design-patterns/CQRS/Query";
import { QueryHandler } from "../../../../Shared/domain/design-patterns/CQRS/QueryHandler";
import { FindProductionOrderQuery } from "./FindProductionOrderQuery";
import { ProductionOrderFInder } from "./ProductionOrderFInder";
import { ProductionOrderResponse } from "./ProductionOrderResponse";

export class ProductionOrderResponseQueryHandler implements QueryHandler<FindProductionOrderQuery, ProductionOrderResponse> {

    constructor(private productionOrderFinder: ProductionOrderFInder) { }

    subscribedTo(): Query {
        return FindProductionOrderQuery;
    }

    async handle(query: FindProductionOrderQuery): Promise<ProductionOrderResponse> {
        return await this.productionOrderFinder.execute(query.productionOrderId)
    }
}