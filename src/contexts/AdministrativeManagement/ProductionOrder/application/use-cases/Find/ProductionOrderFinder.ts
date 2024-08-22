import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { ProductionOrderNotFoundException } from "../../exceptions/ProductionOrderNotFoundException";
import { ProductionOrderQueryRepository } from "../../repositories/ProductionOrderQueryRepository";


export class ProductionOrderFinder {
    constructor(private productionOrderQueryRepository: ProductionOrderQueryRepository) { }

    async execute(productionOrderId: ProductionOrderId) {

        const productionOrder = await this.productionOrderQueryRepository.find(productionOrderId);

        if(productionOrder=== null)
            throw new ProductionOrderNotFoundException(productionOrderId);

        return productionOrder;
    }
}