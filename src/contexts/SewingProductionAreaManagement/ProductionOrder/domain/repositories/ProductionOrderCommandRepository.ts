import { ProductionOrderInProgress } from "../entities/ProductionOrderInProgress";
import { ProductionOrderNotStarted } from "../entities/ProductionOrderNotStarted";

export interface ProductionOrderCommandRepository {
    save(productionOrderNotStarted: ProductionOrderNotStarted | ProductionOrderInProgress): Promise<void>;
}