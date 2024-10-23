import { ProductionModuleId } from "../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ProductionSchedule } from "../entities/ProductionSchedule";

export interface ProductionScheduleRepository {
    searchAll(productionModuleId: ProductionModuleId): Promise<ProductionSchedule[]>;
}