import { ProductionModuleEventDTO } from "../data-transfer-objects/ProductionModuleEventDTO";
import { ProductionModuleEventRoot } from "../interfaces/ProductionModuleEventRoot";
import { ProductionModuleEventId } from "../value-objects/ProductionModuleEventId";
import { ProductionModuleEventName } from "../value-objects/ProductionModuleEventName";
import { ProductionModuleEventState } from "../value-objects/ProductionModuleEventState";

export class ProductionModuleEvent implements ProductionModuleEventRoot {
    constructor(
        readonly id: ProductionModuleEventId,
        readonly name: ProductionModuleEventName,
        readonly state: ProductionModuleEventState,
    ) { }

    static create(id: ProductionModuleEventId, name: ProductionModuleEventName, state: ProductionModuleEventState): ProductionModuleEvent {
        return new ProductionModuleEvent(id, name, state)
    }

    static fromPrimitives(data: ProductionModuleEventDTO): ProductionModuleEvent {
        return new ProductionModuleEvent(
            new ProductionModuleEventId(data.id),
            new ProductionModuleEventName(data.name),
            new ProductionModuleEventState(data.state),
        )
    }

    toPrimitives(): ProductionModuleEventDTO {
        return new ProductionModuleEventDTO(this.id.value, this.name.value, this.state.value)
    }
}