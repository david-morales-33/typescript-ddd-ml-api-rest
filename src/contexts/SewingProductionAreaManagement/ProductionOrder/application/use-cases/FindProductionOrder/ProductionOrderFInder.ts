import { ProductionOrderRepository } from "../../../domain/repositories/ProductionOrderRepository";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { ProductionOrderNotFoundOnDataBase } from "../../exception/ProductionOrderNotFoundOnDataBase";


export class ProductionOrderFInder {
    constructor(
        private productionOrderRepository: ProductionOrderRepository
    ) { }

    async execute(productionOrderId: ProductionOrderId) {
        const productionOrder = await this.productionOrderRepository.find(productionOrderId);

        if (productionOrder === null || productionOrder === undefined)
            throw new ProductionOrderNotFoundOnDataBase(productionOrderId);

        return productionOrder;
    }
}