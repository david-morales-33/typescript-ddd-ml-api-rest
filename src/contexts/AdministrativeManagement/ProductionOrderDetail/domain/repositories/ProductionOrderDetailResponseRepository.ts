import { ProductionOrderId } from "../../../shared/domain/value-objects/ProductionOrderId";
import { ProductionOrderDetailViewDTO } from "../data-transfer-objects/ProductionOrderDetailViewDTO";

export interface ProductionOrderDetailResponseRepository {
    findByProductionOrder(ProductionOrderId: ProductionOrderId): Promise<ProductionOrderDetailViewDTO[] | null>;
    searchAll(): Promise<ProductionOrderDetailViewDTO[]>
}