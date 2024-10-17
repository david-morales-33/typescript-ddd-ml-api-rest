import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderDetail } from "../entities/ProductionOrderDetaill";
import { ProductionOrderDetailId } from "../value-objects/ProductionOrderDetailId";

export interface ProductionOrderDetailQueryRepository {
    find(productionOrderDetailId: ProductionOrderDetailId): Promise<ProductionOrderDetail | null>
    findByProductionOrder(productionOrderId: ProductionOrderId): Promise<ProductionOrderDetail[] | null>
}