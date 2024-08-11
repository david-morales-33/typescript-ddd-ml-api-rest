import { ProductionOrderDetailInProgress } from "../entities/ProductionOrderDetailInProgress";
import { ProductionOrderDetailNotStarted } from "../entities/ProductionOrderDetailNotStarted";

export interface ProductionOrderDetailWebService {
    getByProductionOrder(): Promise<ProductionOrderDetailNotStarted[]>
    getAll(): Promise<(ProductionOrderDetailNotStarted | ProductionOrderDetailInProgress)[]>
}