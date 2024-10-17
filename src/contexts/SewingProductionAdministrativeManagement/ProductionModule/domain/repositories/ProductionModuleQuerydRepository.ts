import { ProductionModule } from "../entities/productionModule";
import { ProductionModuleId } from "../value-objects/ProductionModuleId";

export interface ProductionModuleQueryRepository {
    find(productionModuleId: ProductionModuleId): Promise<ProductionModule | null>
}