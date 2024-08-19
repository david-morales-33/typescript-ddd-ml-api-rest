import { ProductionOrderId } from "../../../../ProductionOrder/domain/value-objects/ProductionOrderId";
import { ProductionOrderDetailQueryRepository } from "../../repositories/ProductionOrderDetailQueryRepository";

export class ProductionOrderDetailFinder {
    constructor(private productionOrderDetailQueryRepository: ProductionOrderDetailQueryRepository){}

    async execute( productionOrderId: ProductionOrderId){

        const productionOrderDetailList = await this.productionOrderDetailQueryRepository.find(productionOrderId);

        if(productionOrderDetailList=== null)
            throw new Error(`Production Order Detail List by ID <${productionOrderId.value}> not found`);

        return productionOrderDetailList;
    }
}