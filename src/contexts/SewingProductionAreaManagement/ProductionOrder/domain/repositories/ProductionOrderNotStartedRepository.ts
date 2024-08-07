import { ProductionOrderNotStarted } from "../entities/ProductionOrderNotStarted";

export interface ProductionOrderNotStartedRepository {
    save(productionOrderNotStarted:ProductionOrderNotStarted): Promise<void>;
    search(): Promise<ProductionOrderNotStarted[]>;
    matching(criteria: any): Promise<ProductionOrderNotStarted[]>;
}