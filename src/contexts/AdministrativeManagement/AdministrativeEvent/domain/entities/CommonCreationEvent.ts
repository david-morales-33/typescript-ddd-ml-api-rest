import { AdministrativeEventRoot } from "../interfaces/AdministrativeEventRoot";
import { EventCreateBy } from "../value-objects/EventCreateBy";
import { EventCreateDate } from "../value-objects/EventCreateDate";
import { EventDescription } from "../value-objects/EventDescription";
import { EventId } from "../value-objects/EventId";
import { CommonCreationEventDTO } from '../data-transfer-object/CommonCreationEventDTO'

export class CommonCreationEvent implements AdministrativeEventRoot {

    constructor(
        readonly id: EventId,
        readonly createBy: EventCreateBy,
        readonly createDate: EventCreateDate,
        readonly description: EventDescription
    ) { }

    static create(
        id: EventId,
        createBy: EventCreateBy,
        createDate: EventCreateDate,
        description: EventDescription
    ): CommonCreationEvent {
        return new CommonCreationEvent(
            id,
            createBy,
            createDate,
            description,
        )
    }

    static fromPrimitives(data: CommonCreationEventDTO): CommonCreationEvent {
        return new CommonCreationEvent(
            new EventId(data.id),
            new EventCreateBy(data.createBy),
            new EventCreateDate(data.createDate),
            new EventDescription(data.description)
        );
    }


    toPrimitives(): CommonCreationEventDTO {
        return new CommonCreationEventDTO(
            this.id.value,
            this.createBy.value,
            this.createDate.value,
            this.description.value
        )
    }
}