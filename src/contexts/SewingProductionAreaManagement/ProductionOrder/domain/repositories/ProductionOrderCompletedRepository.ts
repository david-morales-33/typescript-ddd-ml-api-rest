import { ProductionOrderCompleted } from "../entities/ProductionOrderCompleted";

export interface ProductionOrderCompletedRepository {
    searchAll(): Promise<ProductionOrderCompleted[]>;
    matching(criteria: any): Promise<ProductionOrderCompleted[]>; 
}