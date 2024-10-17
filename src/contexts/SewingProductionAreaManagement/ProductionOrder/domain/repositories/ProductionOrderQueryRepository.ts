import { ProductionOrderNotStarted } from "../entities/ProductionOrderNotStarted";
import { ProductionOrderInProgress } from "../entities/ProductionOrderInProgress";
import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";

export interface ProductionOrderQueryRepository {
    find(productionOrderId: ProductionOrderId): Promise<ProductionOrderNotStarted | ProductionOrderInProgress | null>
}