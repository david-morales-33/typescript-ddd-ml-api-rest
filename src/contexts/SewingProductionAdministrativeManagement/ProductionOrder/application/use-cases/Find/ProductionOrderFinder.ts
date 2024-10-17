import { ProductionOrderId } from "../../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderResponseRepository } from "../../../domain/repositories/ProductionOrderResponseRepository";
import { ProductionOrderNotFoundException } from "../../exceptions/ProductionOrderNotFoundException";

export class ProductionOrderFinder {
    constructor(private productionOrderResponseRepository: ProductionOrderResponseRepository) { }

    async execute(productionOrderId: ProductionOrderId) {

        const productionOrder = await this.productionOrderResponseRepository.find(productionOrderId);

        if(productionOrder=== null)
            throw new ProductionOrderNotFoundException(productionOrderId);

        return productionOrder;
    }
}