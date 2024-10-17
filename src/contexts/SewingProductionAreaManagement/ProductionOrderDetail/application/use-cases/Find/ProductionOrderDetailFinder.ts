import { ProductionOrderId } from "../../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderNotFound } from "../../../../ProductionOrder/application/exception/ProductionOrderNotFoundOnService";
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