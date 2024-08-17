import { ProductionOrderId } from "../../domain/value-objects/ProductionOrderId";
import { ProductionOrderViewDTO } from "../data-transfer-objects/ProductionOrderViewDTO";

export interface ProduccionOrderQueryRepository {
    find(productionOrderId: ProductionOrderId): Promise<ProductionOrderViewDTO | null>
    matching(criteria: any): Promise<ProductionOrderViewDTO[]>
}