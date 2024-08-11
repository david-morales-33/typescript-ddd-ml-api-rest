import { ProductionOrderId } from "../../../ProductionOrder/domain/value-objects/ProductionOrderId";
import { ProductionOrderDetailInProgress } from "../entities/ProductionOrderDetailInProgress";

export interface ProductionOrderDetailInProgressRepository {
    find(productionOrderId: ProductionOrderId): Promise<ProductionOrderDetailInProgress[] | null | undefined>;
    searchAll(): Promise<ProductionOrderDetailInProgress[]>;
    matching(criteria: any): Promise<ProductionOrderDetailInProgress[]>;
}