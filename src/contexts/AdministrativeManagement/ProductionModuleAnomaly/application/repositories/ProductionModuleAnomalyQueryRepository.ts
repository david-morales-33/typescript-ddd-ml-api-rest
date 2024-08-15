import { ProductionModuleAnomalyId } from "../../domain/value-objects/ProductionModuleAnomalyId";
import { ProductionModuleAnomalyViewDTO } from "../data-transfer-objects/ProductionModuleAnomalyViewDTO";

export interface ProductionModuleAnomalyQueryRepository {
    find(productionModuleAnomalyId: ProductionModuleAnomalyId): Promise<ProductionModuleAnomalyViewDTO>
}