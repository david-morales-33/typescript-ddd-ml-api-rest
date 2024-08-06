import { ProductionOrderDetailInProgress } from "../entities/ProductionOrderDetailInProgress";
import { ProductionOrderDetailNotStarted } from "../entities/ProductionOrderDetailNotStarted";

export interface ProductionOrderDetailInProgressRepository {
    searchByProductionOrder(): Promise<(ProductionOrderDetailInProgress | ProductionOrderDetailNotStarted)[]>;
    searchAll(): Promise<ProductionOrderDetailInProgress[]>;
    matching(): Promise<ProductionOrderDetailInProgress[]>;
}