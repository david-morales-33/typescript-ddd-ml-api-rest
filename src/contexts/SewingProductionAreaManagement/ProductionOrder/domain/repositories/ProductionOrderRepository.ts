import { ProductionOrderRoot } from "../interfaces/ProductionOrderRoot";
import { ProductionOrderId } from "../value-objects/ProductionOrderId";

export interface ProductionOrderRepository {
    save(productionOrderNotStarted: ProductionOrderRoot): Promise<void>;
    find(productionOrderId: ProductionOrderId): Promise<ProductionOrderRoot | null | undefined>;
    searchAll(): Promise<ProductionOrderRoot[]>;
    matching(criteria: any): Promise<ProductionOrderRoot[]>;
}