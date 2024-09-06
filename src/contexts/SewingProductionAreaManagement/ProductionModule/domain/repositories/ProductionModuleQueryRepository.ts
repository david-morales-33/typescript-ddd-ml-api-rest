import { ProductionModuleRoot } from "../interfaces/productionModuleRoot";
import { ProductionModuleId } from "../value-objects/ProductionModuleId";

export interface ProductionModuleQueryRepository {
    find(productionModuleId: ProductionModuleId): Promise<ProductionModuleRoot | null>;
}