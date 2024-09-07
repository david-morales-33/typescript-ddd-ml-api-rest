import { ProductionModuleResponseRepository } from "../../../domain/repositories/ProductionModuleResponseRepository";

export class ProductionModuleFinder {
    constructor(private productionModuleResponseRepository : ProductionModuleResponseRepository){}

    async execute(){
        return await this.productionModuleResponseRepository.searchAll();
    }
}