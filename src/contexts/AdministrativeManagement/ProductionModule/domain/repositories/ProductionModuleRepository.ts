import { ProductionModule } from "../entities/productionModule";
import { ProductionModuleId } from "../value-objects/ProductionModuleId";


export interface ProductionModuleRepository {
    save(productionModule: ProductionModule): Promise<void>;
    find(productionModuleId: ProductionModuleId): Promise<ProductionModule | null>
}