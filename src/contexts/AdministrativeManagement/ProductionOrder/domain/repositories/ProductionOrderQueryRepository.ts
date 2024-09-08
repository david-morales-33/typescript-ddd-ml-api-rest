import { ProductionOrderId } from "../../../shared/domain/value-objects/ProductionOrderId";
import { ProductionOrder } from "../entities/ProductionOrder";

export interface ProductionOrderQueryRepository {
    find(ProductionOrderId: ProductionOrderId): Promise<ProductionOrder | null>
}