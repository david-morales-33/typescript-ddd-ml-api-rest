import { ProductionOrderInProgress } from "../entities/ProductionOrderInProgress";
import { ProductionOrderNotStarted } from "../entities/ProductionOrderNotStarted";

export interface ProductionOrderCommandRepository {
    save(productionOrder: ProductionOrderNotStarted | ProductionOrderInProgress): Promise<void>;
}