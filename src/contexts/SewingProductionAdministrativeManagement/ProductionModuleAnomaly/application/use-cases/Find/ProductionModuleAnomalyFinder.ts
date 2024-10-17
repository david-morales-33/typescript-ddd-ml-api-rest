import { ProductionModuleAnomalyResponseRepository } from "../../../domain/repositories/ProductionModuleAnomalyResponseRepository";
import { ProductionModuleAnomalyId } from "../../../domain/value-objects/ProductionModuleAnomalyId";

export class ProductionModuleAnomalyFinder {
    constructor( private productionModuleAnomalyRepository: ProductionModuleAnomalyResponseRepository){}

    async execute(productionModuleAnomalyId: ProductionModuleAnomalyId){

        const ProductionModuleAnomaly = await this.productionModuleAnomalyRepository.find(productionModuleAnomalyId);
        
        if(ProductionModuleAnomaly === null)
            throw new Error(`Production Module Anomaly <${productionModuleAnomalyId.value}> not found`);

        return ProductionModuleAnomaly;

    }
}