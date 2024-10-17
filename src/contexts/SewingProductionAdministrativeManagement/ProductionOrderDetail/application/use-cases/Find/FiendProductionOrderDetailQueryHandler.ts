import { Query } from "../../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/CQRS/QueryHandler";
import { ProductionOrderId } from "../../../../../Shared/domain/value-object/ProductionOrderId";
import { FindProductionOrderDetailQuery } from "./FindProductionOrderDetailQuery";
import { ProductionOrderDetailFinder } from "./ProductionOrderDetailFinder";
import { ProductionOrderDetailResponse } from "./ProductionOrderDetailResponse";


export class FiendProductionOrderDetailQueryHandler implements QueryHandler<FindProductionOrderDetailQuery, ProductionOrderDetailResponse[]> {
    constructor(private productionOrderDetailFinder: ProductionOrderDetailFinder) { }

    subscribedTo(): Query {
        return ProductionOrderDetailResponse;
    }

    async handle(query: FindProductionOrderDetailQuery): Promise<ProductionOrderDetailResponse[]> {
        const productionOrderId = new ProductionOrderId(query.productionOrderId);

        return await this.productionOrderDetailFinder.execute(productionOrderId);
    }
}