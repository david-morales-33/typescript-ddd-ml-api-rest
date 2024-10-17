import { ProductionModuleAnomaly } from "../entities/ProductionModuleAnomaly";

export interface ProductionModuleAnomalyCommandRepository {
    save(productionModuleAnomaly: ProductionModuleAnomaly): Promise<void>;
}