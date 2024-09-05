import { ProductionModuleResponseRepository } from "../../../domain/repositories/ProductionModuleResponseRepository";
import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";

export class ProductionModuleFinder {
    constructor(private productionModuleResponseRepository : ProductionModuleResponseRepository){}

    async execute(){
        return await this.productionModuleResponseRepository.searchAll();
    }
}