import { ProductionModuleResponseRepository } from "../../../domain/repositories/ProductionModuleResponseRepository";
import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";
import { ProductionModuleNotFound } from "../../exceptions/ProductionModuleNotFound";

export class ProductionModuleFinder {
    constructor( private productionModuleResponseRepository : ProductionModuleResponseRepository){}

    async execute(productionModuleId: ProductionModuleId){

        const productionModule = await this.productionModuleResponseRepository.find(productionModuleId);

        if(productionModule===null)
            throw new ProductionModuleNotFound(productionModuleId);

        return productionModule;
    }
}