import { Criteria } from "../../../../../Shared/domain/Criteria/Criteria";
import { Filters } from "../../../../../Shared/domain/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/Criteria/Order";
import { ProductionOrderViewDTO } from "../../../domain/data-transfer-objects/ProductionOrderViewDTO";
import { ProductionOrderResponseRepository } from "../../../domain/repositories/ProductionOrderResponseRepository";

export class ProductionOrderByCriteriaSearcher {
    constructor(private productionOrderResponseRepository: ProductionOrderResponseRepository) { }

    async execute(filters: Filters, order: Order, limit?: number, offset?: number): Promise<ProductionOrderViewDTO[]> {
        const criteria = new Criteria(filters, order, limit, offset)
        return this.productionOrderResponseRepository.match(criteria)
    }
}