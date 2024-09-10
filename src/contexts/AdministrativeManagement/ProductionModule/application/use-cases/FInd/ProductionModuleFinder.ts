import { ProductionModuleResponseRepository } from "../../../domain/repositories/ProductionModuleResponseRepository";
import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";
import { ProductionModuleNotFoundException } from "../../exceptions/ProductionModuleNotFoundException";

export class ProductionModuleFinder {
    constructor(private productionModuleRepository: ProductionModuleResponseRepository) { }

    async execute(productionModuleId: ProductionModuleId){
        const productionModule = await this.productionModuleRepository.find(productionModuleId);

        if(productionModule===null){
            throw new ProductionModuleNotFoundException(productionModuleId)
        }

        return productionModule;
    }
}