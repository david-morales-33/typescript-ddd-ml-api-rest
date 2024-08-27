import { ProductionModuleAnomalyRepository } from "../../../domain/repositories/ProductionModuleAnomalyRepository";
import { ProductionModuleAnomalyId } from "../../../domain/value-objects/ProductionModuleAnomalyId";
import { ProductionModuleAnomalyQueryRepository } from "../../repositories/ProductionModuleAnomalyQueryRepository";


export class ProductionModuleAnomalyFinder {
    constructor( private productionModuleAnomalyRepository: ProductionModuleAnomalyQueryRepository){}

    async execute(productionModuleAnomalyId: ProductionModuleAnomalyId){

        const ProductionModuleAnomaly = await this.productionModuleAnomalyRepository.find(productionModuleAnomalyId);
        
        if(ProductionModuleAnomaly === null)
            throw new Error(`Production Module Anomaly <${productionModuleAnomalyId.value}> not found`);

        return ProductionModuleAnomaly;

    }
}