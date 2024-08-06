import { ProductionOrderNotStarted } from "../entities/ProductionOrderNotStarted";

export interface ProductionOrderNotStartedRepository {
    save(): Promise<void>;
    search(): Promise<ProductionOrderNotStarted[]>;
    matching(criteria: any): Promise<ProductionOrderNotStarted[]>;
}