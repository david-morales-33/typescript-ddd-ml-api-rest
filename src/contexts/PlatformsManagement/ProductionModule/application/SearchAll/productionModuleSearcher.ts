import { ProductionModuleRepository } from "../../domain/repositories/ProductionModuleRepository";
import { ProductionModuleResponse } from "./ProductionModuleResponse";


export class productionModuleSearcher{
    constructor(private productionModuleRepository: ProductionModuleRepository){}

    async execute(){
        const productionModules = await this.productionModuleRepository.search();
        return new ProductionModuleResponse(productionModules);
    }
}