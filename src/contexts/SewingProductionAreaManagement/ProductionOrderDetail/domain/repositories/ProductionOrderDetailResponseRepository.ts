import { ProductionOrderId } from "../../../ProductionOrder/domain/value-objects/ProductionOrderId";
import { ProductionOrderDetailViewDTO } from "../data-transfer-objects/ProductionOrderDetailViewDTO";

export interface ProductionOrderDetailResponseRepository {
    find(productionOrderId: ProductionOrderId): Promise<ProductionOrderDetailViewDTO[] | null>
    searchAll(): Promise<ProductionOrderDetailViewDTO[]>
}