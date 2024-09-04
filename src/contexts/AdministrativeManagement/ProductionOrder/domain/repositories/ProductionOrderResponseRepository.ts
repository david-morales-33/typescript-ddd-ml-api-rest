import { ProductionOrderViewDTO } from "../../application/data-transfer-objects/ProductionOrderViewDTO";
import { ProductionOrderId } from "../value-objects/ProductionOrderId";

export interface ProductionOrderResponseRepository{
    find(ProductionOrderId: ProductionOrderId): Promise<ProductionOrderViewDTO | null>
}