import { ProductionModuleId } from "../value-objects/ProductionModuleId";
import { ProductionModuleViewDTO } from '../data-transfer-object/ProductionModuleViewDTO'

export interface ProductionModuleResponseRepository {
    find(productionModuleId: ProductionModuleId): Promise<ProductionModuleViewDTO | null>;
    searchAll(): Promise<ProductionModuleViewDTO[]>;
    matching(critery: any): Promise<ProductionModuleViewDTO[]>;
}