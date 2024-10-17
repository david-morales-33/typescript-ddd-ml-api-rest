import { ProductionModule } from "../entities/productionModule";

export interface ProductionModuleCommandRepository {
    save(ProductionModule: ProductionModule): Promise<void>
}