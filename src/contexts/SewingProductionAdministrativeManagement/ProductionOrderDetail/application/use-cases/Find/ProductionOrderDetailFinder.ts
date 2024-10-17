import { ProductionOrderId } from "../../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderDetailResponseRepository } from "../../../domain/repositories/ProductionOrderDetailResponseRepository";
import { ProductionOrderNotFoundException } from "../../exceptions/ProductionOrderNotFoundException";

export class ProductionOrderDetailFinder {
    constructor(private productionOrderDetailQueryRepository: ProductionOrderDetailResponseRepository) { }

    async execute(productionOrderId: ProductionOrderId) {

        const productionOrderDetailList = await this.productionOrderDetailQueryRepository.findByProductionOrder(productionOrderId);

        if (productionOrderDetailList === null)
            throw new ProductionOrderNotFoundException(productionOrderId);

        return productionOrderDetailList;
    }
}