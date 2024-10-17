import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrder } from "../entities/ProductionOrder";

export interface ProductionOrderQueryRepository {
    find(ProductionOrderId: ProductionOrderId): Promise<ProductionOrder | null>
}