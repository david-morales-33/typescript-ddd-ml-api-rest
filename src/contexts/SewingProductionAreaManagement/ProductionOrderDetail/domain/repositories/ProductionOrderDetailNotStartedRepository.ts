import { ProductionOrderDetailNotStarted } from "../entities/ProductionOrderDetailNotStarted";

export interface ProductionOrderDetailNotStartedRepository {
    save(productionOrderDetailNotStarted: ProductionOrderDetailNotStarted): Promise<void>
    searchByProductionOrder(): Promise<ProductionOrderDetailNotStarted[]>;
    searchAll(): Promise<ProductionOrderDetailNotStarted[]>;
    matching(): Promise<ProductionOrderDetailNotStarted[]>;
}