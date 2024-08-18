import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";
import { ProductionModuleQueryRepository } from "../../repositories/ProductionModuleQueryRepository";

export class ProductionModuleFinder {
    constructor(private productionModuleQueryRepository : ProductionModuleQueryRepository){}

    async execute(){
        return await this.productionModuleQueryRepository.searchAll();
    }
}