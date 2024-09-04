import { ProductionOrder } from "../entities/ProductionOrder";

export interface ProductionOrderCommandRepository {
    save(productionOrder: ProductionOrder): Promise<void>;
}