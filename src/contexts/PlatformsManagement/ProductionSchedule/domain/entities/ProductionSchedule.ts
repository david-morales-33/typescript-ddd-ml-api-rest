import { ProductionScheduleDTO } from "../data-transfer-objects/ProductionScheduleDTO";
import { ProductionScheduleRoot } from "../interfaces/ProductionScheduleRoot";
import { ProductionScheduleId } from "../value-objects/ProductionScheduleId";
import { ProductionScheduleLabel } from "../value-objects/ProductionScheduleLabel";
import { ProductionScheduleState } from "../value-objects/ProductionScheduleState";

export class ProductionSchedule implements ProductionScheduleRoot {

    constructor(
        readonly id: ProductionScheduleId,
        readonly label: ProductionScheduleLabel,
        readonly state: ProductionScheduleState
    ) { }

    static create(
        id: ProductionScheduleId,
        label: ProductionScheduleLabel,
        state: ProductionScheduleState
    ): ProductionSchedule {
        return new ProductionSchedule(id, label, state)
    }

    static fromPrimitives(data: ProductionScheduleDTO): ProductionSchedule {
        return new ProductionSchedule(
            new ProductionScheduleId(data.id),
            new ProductionScheduleLabel(data.label),
            new ProductionScheduleState(data.state)
        )
    }

    toPrimitives(): ProductionScheduleDTO {
        return new ProductionScheduleDTO(
            this.id.value,
            this.label.value,
            this.state.value
        )
    }
} 