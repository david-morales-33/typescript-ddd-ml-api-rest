import { ProductionOrderId } from "../../../../shared/domain/value-objects/ProductionOrderId";
import { ProductionOrderDetailNotFoundException } from "../../exceptions/ProductionOrderDetailNotFoundException";
import { ProductionOrderNotFoundException } from "../../exceptions/ProductionOrderNotFoundException";
import { ProductionOrderDetailQueryRepository } from "../../repositories/ProductionOrderDetailQueryRepository";

export class ProductionOrderDetailFinder {
    constructor(private productionOrderDetailQueryRepository: ProductionOrderDetailQueryRepository) { }

    async execute(productionOrderId: ProductionOrderId) {

        const productionOrderDetailList = await this.productionOrderDetailQueryRepository.findByProductionOrder(productionOrderId);

        if (productionOrderDetailList === null)
            throw new ProductionOrderNotFoundException(productionOrderId);

        return productionOrderDetailList;
    }
}