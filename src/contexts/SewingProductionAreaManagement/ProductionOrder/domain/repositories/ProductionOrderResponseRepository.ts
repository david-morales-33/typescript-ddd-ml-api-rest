import { ProductionOrderId } from "../value-objects/ProductionOrderId";
import { ProductionOrderViewDTO } from "../data-transfer-objects/ProductionOrderViewDTO";
import { Criteria } from "../../../../Shared/domain/Criteria/Criteria";

export interface ProductionOrderResponseRepository {
    find(productionOrderId: ProductionOrderId): Promise<ProductionOrderViewDTO | null>
    searchAll(): Promise<ProductionOrderViewDTO[]>;
    match(criteria: Criteria): Promise<ProductionOrderViewDTO[]>
}