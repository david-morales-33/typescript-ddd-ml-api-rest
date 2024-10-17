import { ProductionOrderId } from "../value-objects/ProductionOrderId";
import { ProductionOrderNotStarted } from "../entities/ProductionOrderNotStarted";
import { ProductionOrderInProgress } from "../entities/ProductionOrderInProgress";

export interface ProductionOrderQueryRepository {
    find(productionOrderId: ProductionOrderId): Promise<ProductionOrderNotStarted | ProductionOrderInProgress | null>
}