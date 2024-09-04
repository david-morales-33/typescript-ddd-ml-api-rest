import { ProductionOrderDetailResponseRepository } from "../../../domain/repositories/ProductionOrderDetailResponseRepository";


export class ProductionOrderDetailSearcher {
    constructor(private productionOrderDetailResponseRepository: ProductionOrderDetailResponseRepository) { }

    async execute() {
        const productionOrderDetailList = await this.productionOrderDetailResponseRepository.searchAll();
        return productionOrderDetailList;
    }
}