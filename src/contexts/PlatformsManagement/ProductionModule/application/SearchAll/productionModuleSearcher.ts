import { ProductionModuleRepository } from "../../domain/repositories/ProductionModuleRepository";
import { ProductionModuleResponse } from "./ProductionModuleResponse";

export class ProductionModuleSearcher{
    constructor(private productionModuleRepository: ProductionModuleRepository){}

    async execute(){
        const productionModules = await this.productionModuleRepository.search();
        return new ProductionModuleResponse(productionModules);
    }
}