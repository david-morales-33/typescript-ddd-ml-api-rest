import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderDetailViewDTO } from "../data-transfer-objects/ProductionOrderDetailViewDTO";

export interface ProductionOrderDetailResponseRepository {
    findByProductionOrder(ProductionOrderId: ProductionOrderId): Promise<ProductionOrderDetailViewDTO[] | null>;
    searchAll(): Promise<ProductionOrderDetailViewDTO[]>
}