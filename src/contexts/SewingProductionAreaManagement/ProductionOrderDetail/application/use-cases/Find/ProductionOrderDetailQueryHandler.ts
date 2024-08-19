import { Query } from "../../../../Shared/domain/design-patterns/CQRS/Query";
import { QueryHandler } from "../../../../Shared/domain/design-patterns/CQRS/QueryHandler";
import { FindProductionOrderDetailQuery } from "./FindProductionOrderDetailQuery";
import { ProductionOrderDetailFinder } from "./ProductionOrderDetailFinder";
import { ProductionOrderDetailResponse } from "./ProductionOrderDetailResponse";


export class ProductionOrderDetailQueryHandler implements QueryHandler<FindProductionOrderDetailQuery, ProductionOrderDetailResponse[]> {

    constructor(private productionOrderDetailFinder: ProductionOrderDetailFinder) { }

    subscribedTo(): Query {
        return FindProductionOrderDetailQuery;
    }

    async handle(query: FindProductionOrderDetailQuery): Promise<ProductionOrderDetailResponse[]> {
        return this.productionOrderDetailFinder.execute(query.productionOderId);
    }
}