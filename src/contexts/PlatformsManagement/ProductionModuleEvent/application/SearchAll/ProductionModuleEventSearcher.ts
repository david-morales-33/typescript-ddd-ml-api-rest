import { ProductionModuleEventRepository } from "../../domain/repositories/ProductionModuleEventRepository";
import { ProductionModuleEventResponse } from "./ProductionModuleEventResponse";

export class ProductionModuleEventSearcher {
    constructor(private productionModuleEventRepository: ProductionModuleEventRepository) { }

    async execute() {
        const productionModuleEventList = await this.productionModuleEventRepository.search();
        return new ProductionModuleEventResponse(productionModuleEventList);
    }
}