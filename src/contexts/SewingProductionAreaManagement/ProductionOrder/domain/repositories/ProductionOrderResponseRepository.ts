import { ProductionOrderId } from "../value-objects/ProductionOrderId";
import { ProductionOrderViewDTO } from "../data-transfer-objects/ProductionOrderViewDTO";

export interface ProductionOrderResponseRepository {
    find(productionOrderId: ProductionOrderId): Promise<ProductionOrderViewDTO | null>
    searchAll(): Promise<ProductionOrderViewDTO[]>;
    matching(criteria: any): Promise<ProductionOrderViewDTO[]>
}