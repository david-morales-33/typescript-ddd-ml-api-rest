import { ProductionSchedule } from "../entities/ProductionSchedule";

export interface ProductionScheduleRepository {
    searchAll(): Promise<ProductionSchedule[]>;
}