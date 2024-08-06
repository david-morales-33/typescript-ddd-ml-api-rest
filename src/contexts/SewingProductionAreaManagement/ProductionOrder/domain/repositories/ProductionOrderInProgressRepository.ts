import { ProductionOrderInProgress } from "../entities/ProductionOrderInProgress";

export interface ProductionOrderInProgressRepository {
    searchAll(): Promise<ProductionOrderInProgress[]>;
    matching(criteria: any): Promise<ProductionOrderInProgress[]>;
}