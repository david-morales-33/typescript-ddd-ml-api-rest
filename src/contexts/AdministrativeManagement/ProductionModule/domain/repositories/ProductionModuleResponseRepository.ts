import { ProductionModuleViewDTO } from "../data-transfer-objects/ProductionModuleViewDTO";
import { ProductionModuleId } from "../value-objects/ProductionModuleId";

export interface ProductionModuleResponseRepository {
    find(productionModuleId: ProductionModuleId): Promise<ProductionModuleViewDTO | null>;
}