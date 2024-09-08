import { ProductionOrderId } from "../../../shared/domain/value-objects/ProductionOrderId";
import { ProductionOrderViewDTO } from "../../application/data-transfer-objects/ProductionOrderViewDTO";

export interface ProductionOrderResponseRepository{
    find(ProductionOrderId: ProductionOrderId): Promise<ProductionOrderViewDTO | null>
}