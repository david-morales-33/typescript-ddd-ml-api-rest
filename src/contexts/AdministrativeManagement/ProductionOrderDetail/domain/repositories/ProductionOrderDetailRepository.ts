import { ProductionOrderDetail } from "../entities/ProductionOrderDetaill";
import { ProductionOrderDetailId } from "../value-objects/ProductionOrderDetailId";


export interface ProductionOrderDetailRepository {
    find(productionOrderDetailId: ProductionOrderDetailId): Promise<ProductionOrderDetail | null>;
    save(productionOrderDetail: ProductionOrderDetail): Promise<void>
}