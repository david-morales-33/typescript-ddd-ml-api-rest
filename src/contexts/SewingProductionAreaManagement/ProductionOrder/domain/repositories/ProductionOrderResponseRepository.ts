import { ProductionOrderViewDTO } from "../data-transfer-objects/ProductionOrderViewDTO";
import { Criteria } from "../../../../Shared/domain/Criteria/Criteria";
import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";

export interface ProductionOrderResponseRepository {
    find(productionOrderId: ProductionOrderId): Promise<ProductionOrderViewDTO | null>
    searchAll(): Promise<ProductionOrderViewDTO[]>;
    match(criteria: Criteria): Promise<ProductionOrderViewDTO[]>
}