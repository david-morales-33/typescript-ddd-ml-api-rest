import { ProductionModuleRoot } from "../interfaces/productionModuleRoot";

export interface ProductionModuleCommandRepository {
    save(productionModule: ProductionModuleRoot): Promise<void>;
}