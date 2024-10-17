import { ProductionModuleAnomaly } from "../entities/ProductionModuleAnomaly";
import { ProductionModuleAnomalyId } from "../value-objects/ProductionModuleAnomalyId";

export interface ProductionModuleAnomalyQueryRepository {
    find(productionModuleAnomalyId: ProductionModuleAnomalyId): Promise<ProductionModuleAnomaly | null>
}