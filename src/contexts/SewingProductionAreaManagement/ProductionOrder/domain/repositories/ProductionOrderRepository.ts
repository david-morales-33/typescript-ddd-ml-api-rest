import { ProductionOrderInProgress } from "../entities/ProductionOrderInProgress";
import { ProductionOrderNotStarted } from "../entities/ProductionOrderNotStarted";
import { ProductionOrderRoot } from "../interfaces/ProductionOrderRoot";
import { ProductionOrderId } from "../value-objects/ProductionOrderId";

export interface ProductionOrderRepository {
    save(productionOrderNotStarted: ProductionOrderRoot): Promise<void>;
    find(productionOrderId: ProductionOrderId): Promise<ProductionOrderRoot>;
    searchAll(): Promise<ProductionOrderRoot[]>;
    matching(criteria: any): Promise<ProductionOrderRoot[]>;
}