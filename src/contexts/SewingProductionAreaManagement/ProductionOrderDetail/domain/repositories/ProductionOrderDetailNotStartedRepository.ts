import { ProductionOrderId } from "../../../ProductionOrder/domain/value-objects/ProductionOrderId";
import { ProductionOrderDetailNotStarted } from "../entities/ProductionOrderDetailNotStarted";

export interface ProductionOrderDetailNotStartedRepository {
    find(productionOrderId: ProductionOrderId): Promise<ProductionOrderDetailNotStarted[] | null | undefined>;
    searchAll(): Promise<ProductionOrderDetailNotStarted[]>;
    matching(criteria: any): Promise<ProductionOrderDetailNotStarted[]>;
}