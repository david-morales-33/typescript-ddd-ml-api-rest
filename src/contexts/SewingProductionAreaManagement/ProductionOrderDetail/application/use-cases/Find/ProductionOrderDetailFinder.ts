import { ProductionOrderNotFound } from "../../../../ProductionOrder/application/exception/ProductionOrderNotFoundOnService";
import { ProductionOrderId } from "../../../../ProductionOrder/domain/value-objects/ProductionOrderId";
import { ProductionOrderDetailResponseRepository } from "../../../domain/repositories/ProductionOrderDetailResponseRepository";

export class ProductionOrderDetailFinder {
    constructor(private productionOrderDetailResponseRepository: ProductionOrderDetailResponseRepository) { }

    async execute(productionOrderId: ProductionOrderId) {

        const productionOrderDetailList = await this.productionOrderDetailResponseRepository.find(productionOrderId);

        if (productionOrderDetailList === null)
            throw new ProductionOrderNotFound(productionOrderId);

        return productionOrderDetailList;
    }
}