import { CommonCreationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonCreationEventDTO";
import { CommonModificationEventDTO } from "../../../AdministrativeEvent/domain/data-transfer-object/CommonModificationEventDTO";
import { CommonCreationEvent } from "../../../AdministrativeEvent/domain/entities/CommonCreationEvent";
import { CommonModificationEvent } from "../../../AdministrativeEvent/domain/entities/CommonModificationEvent";
import { ColorId } from "../../../shared/domain/value-objects/ColorId";
import { ColorDTO } from "../data-transfer-objects/ColorDTO";
import { ColorRoot } from "../interfaces/ColorRoot";
import { ColorLabel } from "../value-objects/ColorLabel";
import { ColorState } from "../value-objects/ColorState";

export class Color implements ColorRoot {
    
    constructor(
        readonly id: ColorId,
        readonly label: ColorLabel,
        readonly state: ColorState,
        readonly administrativeEventList: (CommonModificationEvent | CommonCreationEvent)[]
    ) { }

    static create(
        id: ColorId,
        label: ColorLabel,
        state: ColorState,
        eventList: (CommonModificationEvent | CommonCreationEvent)[]
    ) {
        return new Color(id, label, state, eventList)
    }

    static fromPrimitives(data: ColorDTO) {
        return new Color(
            new ColorId(data.id),
            new ColorLabel(data.label),
            new ColorState(data.state),
            data.administrativeEventList.map(entry => {
                if (entry.className === 'CreationEvent.commonDTO')
                    return CommonCreationEvent.fromPrimitives(entry as CommonCreationEventDTO)
                return CommonModificationEvent.fromPrimitives(entry as CommonModificationEventDTO)
            })
        )
    }

    toPrimitives(): ColorDTO {
        return new ColorDTO(
            this.id.value,
            this.label.value,
            this.state.value,
            this.administrativeEventList.map(entry => entry.toPrimitives())
        )
    }
}