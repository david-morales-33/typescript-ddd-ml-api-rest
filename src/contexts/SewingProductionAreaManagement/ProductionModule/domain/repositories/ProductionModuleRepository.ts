import { ProductionModuleRoot } from "../interfaces/productionModuleRoot";
import { ProductionModuleId } from "../value-objects/ProductionModuleId";

export interface ProductionModuleRepository {
    save(): Promise<void>;
    find(productionModuleId: ProductionModuleId): Promise<ProductionModuleRoot | null | undefined>;
    searchAll(): Promise<ProductionModuleRoot[]>;
    matching(critery: any): Promise<ProductionModuleRoot[]>;
}