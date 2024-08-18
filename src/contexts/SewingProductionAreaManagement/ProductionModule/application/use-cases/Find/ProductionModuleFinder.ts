import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";
import { ProductionModuleNotFound } from "../../exceptions/ProductionModuleNotFound";
import { ProductionModuleQueryRepository } from "../../repositories/ProductionModuleQueryRepository";


export class ProductionModuleFinder {
    constructor( private productionModuleQueryRepository : ProductionModuleQueryRepository){}

    async execute(productionModuleId: ProductionModuleId){

        const productionModule = await this.productionModuleQueryRepository.find(productionModuleId);

        if(productionModule===null)
            throw new ProductionModuleNotFound(productionModuleId);

        return productionModule;
    }
}