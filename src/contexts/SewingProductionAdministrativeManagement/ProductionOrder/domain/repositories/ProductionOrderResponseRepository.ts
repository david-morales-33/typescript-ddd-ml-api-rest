import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";
import { ProductionOrderViewDTO } from "../data-transfer-objects/ProductionOrderViewDTO";

export interface ProductionOrderResponseRepository{
    find(ProductionOrderId: ProductionOrderId): Promise<ProductionOrderViewDTO | null>
}