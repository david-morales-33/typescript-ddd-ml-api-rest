import { ProductionOrderNotStarted } from "../entities/ProductionOrderNotStarted";

export interface ProductionOrderCommandRepository {
    save(productionOrder: ProductionOrderNotStarted): Promise<void>;
}