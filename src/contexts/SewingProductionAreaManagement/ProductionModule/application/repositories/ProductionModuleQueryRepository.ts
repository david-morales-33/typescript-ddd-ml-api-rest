import { ProductionModuleId } from "../../domain/value-objects/ProductionModuleId";
import { ProductionModuleViewDTO } from "../data-transfer-objects/ProductionModuleViewDTO";

export interface ProductionModuleQueryRepository {
    find(productionModuleId: ProductionModuleId): Promise<ProductionModuleViewDTO | null>;
    searchAll(): Promise<ProductionModuleViewDTO[]>;
}