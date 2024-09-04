import { ProductionOrderRoot } from "../interfaces/ProductionOrderRoot";

export interface ProductionOrderCommandRepository {
    save(productionOrderNotStarted: ProductionOrderRoot): Promise<void>;
}