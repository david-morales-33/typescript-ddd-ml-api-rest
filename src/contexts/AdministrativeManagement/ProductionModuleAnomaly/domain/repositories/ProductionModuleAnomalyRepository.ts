import { ProductionModuleAnomaly } from "../entities/ProductionModuleAnomaly";
import { ProductionModuleAnomalyId } from "../value-objects/ProductionModuleAnomalyId";

export interface ProductionModuleAnomalyRepository {
    save(productionModuleAnomaly: ProductionModuleAnomaly): Promise<void>;
    find(productionModuleAnomalyId: ProductionModuleAnomalyId): Promise<ProductionModuleAnomaly>
}