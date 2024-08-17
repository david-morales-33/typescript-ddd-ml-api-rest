import { ProductionOrderRepository } from "../../../domain/repositories/ProductionOrderRepository";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { ProductionOrderNotFoundOnDataBase } from "../../exception/ProductionOrderNotFoundOnDataBase";
import { ProduccionOrderQueryRepository } from "../../repositories/ProduccionOrdenQueryRepository";


export class ProductionOrderFInder {
    constructor(
        private productionOrderRepository: ProduccionOrderQueryRepository
    ) { }

    async execute(productionOrderId: ProductionOrderId) {
        
        const productionOrder = await this.productionOrderRepository.find(productionOrderId);

        if (productionOrder === null)
            throw new ProductionOrderNotFoundOnDataBase(productionOrderId);

        return productionOrder;
    }
}