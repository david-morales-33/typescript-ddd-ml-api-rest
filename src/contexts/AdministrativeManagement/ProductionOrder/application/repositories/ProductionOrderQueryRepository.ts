import { ProductionOrderId } from "../../domain/value-objects/ProductionOrderId";
import { ProductionOrderViewDTO } from "../data-transfer-objects/ProductionOrderViewDTO";

export interface ProductionOrderQueryRepository {
    find(ProductionOrderId: ProductionOrderId): Promise<ProductionOrderViewDTO | null>
}