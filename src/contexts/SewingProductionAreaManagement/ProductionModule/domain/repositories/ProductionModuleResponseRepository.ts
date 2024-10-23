import { ProductionModuleId } from "../value-objects/ProductionModuleId";
import { ProductionModuleViewDTO } from '../data-transfer-object/ProductionModuleViewDTO'
import { Criteria } from "../../../../Shared/domain/Criteria/Criteria";

export interface ProductionModuleResponseRepository {
    find(productionModuleId: ProductionModuleId): Promise<ProductionModuleViewDTO | null>;
    searchAll(): Promise<ProductionModuleViewDTO[]>;
    matching(criteria: Criteria): Promise<ProductionModuleViewDTO[]>;
}