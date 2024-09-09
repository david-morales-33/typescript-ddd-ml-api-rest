import { ProductionModuleAnomalyViewDTO } from "../data-transfer-objects/ProductionModuleAnomalyViewDTO";
import { ProductionModuleAnomalyId } from "../value-objects/ProductionModuleAnomalyId";

export interface ProductionModuleAnomalyResponseRepository {
    find(productionModuleAnomalyId: ProductionModuleAnomalyId): Promise<ProductionModuleAnomalyViewDTO | null>
}