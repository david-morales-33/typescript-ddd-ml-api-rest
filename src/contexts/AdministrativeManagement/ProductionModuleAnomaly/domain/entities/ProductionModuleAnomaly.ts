import { CommonCreationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonModificationEventDTO";
import { CommonCreationEvent } from "../../../AdministrativeEvent/domain/entities/CommonCreationEvent";
import { CommonModificationEvent } from "../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { ProductionModuleAnomalyDTO } from "../data-transfer-objects/ProductionModuleAnomalyDTO";
import { ProductionModuleAnomalyRoot } from "../interfaces/ProductionModuleAnomalyRoot";
import { ProductionModuleAnomalyId } from "../value-objects/ProductionModuleAnomalyId";
import { ProductionModuleAnomalyName } from "../value-objects/ProductionModuleAnomalyName";
import { ProductionModuleAnomalyState } from "../value-objects/ProductionModuleAnomalyState";

export class ProductionModuleAnomaly implements ProductionModuleAnomalyRoot {
    constructor(
        readonly id: ProductionModuleAnomalyId,
        readonly name: ProductionModuleAnomalyName,
        readonly eventList: (CommonCreationEvent | CommonModificationEvent)[],
        readonly state?: ProductionModuleAnomalyState,
    ) { this.state = new ProductionModuleAnomalyState(true) }

    static create(
        id: ProductionModuleAnomalyId,
        name: ProductionModuleAnomalyName,
        eventList: (CommonCreationEvent | CommonModificationEvent)[],
        state?: ProductionModuleAnomalyState,
    ): ProductionModuleAnomaly {
        return new ProductionModuleAnomaly(
            id,
            name,
            eventList,
            state ?? new ProductionModuleAnomalyState(true),
        )
    }

    static fromPrimitives(data: ProductionModuleAnomalyDTO): ProductionModuleAnomaly {
        return new ProductionModuleAnomaly(
            new ProductionModuleAnomalyId(data.id),
            new ProductionModuleAnomalyName(data.name),
            data.eventList.map(entry => {
                if (entry.className === 'CreationEvent.commonDTO')
                    return CommonCreationEvent.fromPrimitives(entry as CommonCreationEventDTO)
                return CommonModificationEvent.fromPrimitives(entry as CommonModificationEventDTO)
            }),
            data.state ? new ProductionModuleAnomalyState(data.state) : new ProductionModuleAnomalyState(true)

        )
    }

    toPrimitives(): ProductionModuleAnomalyDTO {
        return new ProductionModuleAnomalyDTO(
            this.id.value,
            this.name.value,
            this.state ? this.state.value : true,
            this.eventList.map(entry => {
                return entry.toPrimitives()
            })
        )
    }
}