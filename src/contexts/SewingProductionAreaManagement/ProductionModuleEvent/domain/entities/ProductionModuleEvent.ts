import { ProductionModuleEventDTO } from "../data-transfer-objects/ProductionModuleEventDTO";
import { ProductionModuleEventRoot } from "../interfaces/ProductionModuleEventRoot";
import { ProductionModuleEventCreationDate } from "../value-objects/ProductionModuleEventCreationDate";
import { ProductionModuleEventDescription } from "../value-objects/ProductionModuleEventDescription";
import { ProductionModuleEventId } from "../value-objects/ProductionModuleEventId";
import { ProductionModuleEventName } from "../value-objects/ProductionModuleEventName";
import { ProductionModuleEventValue } from "../value-objects/ProductionModuleEventValue";

export class ProductionModuleEvent implements ProductionModuleEventRoot {

    constructor(
        readonly id: ProductionModuleEventId,
        readonly name: ProductionModuleEventName,
        readonly description: ProductionModuleEventDescription,
        readonly value: ProductionModuleEventValue,
        readonly creationDate: ProductionModuleEventCreationDate
    ) { }

    static create(
        id: ProductionModuleEventId,
        name: ProductionModuleEventName,
        description: ProductionModuleEventDescription,
        value: ProductionModuleEventValue,
        creationDate: ProductionModuleEventCreationDate
    ): ProductionModuleEvent {
        return new ProductionModuleEvent(
            id,
            name,
            description,
            value,
            creationDate
        )
    }

    static fromPrimitives(data: ProductionModuleEventDTO): ProductionModuleEvent {
        return new ProductionModuleEvent(
            new ProductionModuleEventId(data.id),
            new ProductionModuleEventName(data.name),
            new ProductionModuleEventDescription(data.description),
            new ProductionModuleEventValue(data.value),
            new ProductionModuleEventCreationDate(data.creationDate)
        )
    }

    toPrimitives(): ProductionModuleEventDTO {
        return new ProductionModuleEventDTO(
            this.id.value,
            this.name.value,
            this.description.value,
            this.value.value,
            this.creationDate.value
        )
    }
}