import { ProductionOrder } from "../entities/ProductionOrder";
import { ProductionOrderId } from "../value-objects/ProductionOrderId";

export interface ProductionOrderRepository {
    find(productionOrderId: ProductionOrderId): Promise<ProductionOrder | null>;
    save(productionOrder: ProductionOrder): Promise<void>;
}