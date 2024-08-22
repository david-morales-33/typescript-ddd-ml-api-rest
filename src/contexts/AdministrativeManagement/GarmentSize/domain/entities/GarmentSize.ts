import { CommonCreationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonModificationEventDTO";
import { CommonCreationEvent } from "../../../AdministrativeEvent/domain/entities/CommonCreationEvent";
import { CommonModificationEvent } from "../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { GarmentSizeDTO } from "../data-transfer-objects/GarmentSizeDTO";
import { GarmentSizeRoot } from "../interfaces/GarmentSizeRoot";
import { GarmentSizeId } from "../value-objects/GarmentSizeId";
import { GarmentSizeLabel } from "../value-objects/GarmentSizeLabel";
import { GarmentSizeOrder } from "../value-objects/GarmentSizeOrder";
import { GarmentSizeState } from "../value-objects/GarmentSizeState";
import { GarmentSizeType } from "../value-objects/GarmentSizeType";

export class GarmentSize implements GarmentSizeRoot {
    constructor(
        readonly id: GarmentSizeId,
        readonly label: GarmentSizeLabel,
        readonly garmentType: GarmentSizeType,
        readonly order: GarmentSizeOrder,
        readonly state: GarmentSizeState,
        readonly administrativeEventList: (CommonModificationEvent | CommonCreationEvent)[]
    ) { }

    static create(
        id: GarmentSizeId,
        label: GarmentSizeLabel,
        garmentType: GarmentSizeType,
        order: GarmentSizeOrder,
        state: GarmentSizeState,
        administrativeEventList: (CommonModificationEvent | CommonCreationEvent)[]
    ): GarmentSize {
        return new GarmentSize(id, label, garmentType, order, state, administrativeEventList)
    }

    static fromPrimitives(data: GarmentSizeDTO): GarmentSize {
        return new GarmentSize(
            new GarmentSizeId(data.id),
            new GarmentSizeLabel(data.label),
            new GarmentSizeType(data.garmentType),
            new GarmentSizeOrder(data.order),
            new GarmentSizeState(data.state),
            data.administrativeEventList.map(entry => {
                if (entry.className === 'CreationEvent.commonDTO')
                    return CommonCreationEvent.fromPrimitives(entry as CommonCreationEventDTO)
                return CommonModificationEvent.fromPrimitives(entry as CommonModificationEventDTO)
            })
        )
    }

    toPrimitives(): GarmentSizeDTO {
        return new GarmentSizeDTO(
            this.id.value,
            this.label.value,
            this.garmentType.value,
            this.order.value,
            this.state.value,
            this.administrativeEventList.map(entry => { return entry.toPrimitives() })
        )
    }
}