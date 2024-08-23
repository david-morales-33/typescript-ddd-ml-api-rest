import { ProductionOrderId } from "../../../shared/domain/value-objects/ProductionOrderId";
import { ProductionOrderDetailViewDTO } from "../data-transfer-objects/ProductionOrderDetailViewDTO";

export interface ProductionOrderDetailQueryRepository {
    findByProductionOrder(productionOrderId: ProductionOrderId): Promise<ProductionOrderDetailViewDTO[] | null>;
}