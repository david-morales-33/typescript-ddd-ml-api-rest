import { ProductionScheduleDTO } from "../domain/data-transfer-objects/ProductionScheduleDTO";
import { ProductionSchedule } from "../domain/entities/ProductionSchedule";

export class ProductionScheduleResponse {
    public readonly ProductionScheduleList: ProductionScheduleDTO[]

    constructor(productionScheduleList: ProductionSchedule[]) {
        this.ProductionScheduleList = productionScheduleList.map(entry => entry.toPrimitives());
    }
}