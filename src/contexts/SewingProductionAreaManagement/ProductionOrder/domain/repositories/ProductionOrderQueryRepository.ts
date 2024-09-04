import { ProductionOrderId } from "../value-objects/ProductionOrderId";
import { ProductionOrderRoot } from '../interfaces/ProductionOrderRoot'

export interface ProductionOrderQueryRepository {
    find(productionOrderId: ProductionOrderId): Promise<ProductionOrderRoot | null>
    searchAll(): Promise<ProductionOrderRoot[]>;
}