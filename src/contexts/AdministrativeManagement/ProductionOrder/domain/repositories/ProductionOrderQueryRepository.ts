import { ProductionOrderViewDTO } from "../../application/data-transfer-objects/ProductionOrderViewDTO";
import { ProductionOrderId } from "../../domain/value-objects/ProductionOrderId";
import { ProductionOrder } from "../entities/ProductionOrder";

export interface ProductionOrderQueryRepository {
    find(ProductionOrderId: ProductionOrderId): Promise<ProductionOrder | null>
}