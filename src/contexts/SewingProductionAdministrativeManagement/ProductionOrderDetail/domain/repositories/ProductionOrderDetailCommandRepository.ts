import { ProductionOrderDetail } from "../entities/ProductionOrderDetaill";

export interface ProductionOrderDetailCommandRepository {
    save(productionOrderDetail: ProductionOrderDetail): Promise<void>;
}