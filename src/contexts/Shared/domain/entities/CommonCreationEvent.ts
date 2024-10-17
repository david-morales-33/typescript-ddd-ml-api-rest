import { AdministrativeEventRoot } from "../interfaces/AdministrativeEventRoot";
import { EventCreateBy } from "../value-object/EventCreateBy";
import { EventCreateDate } from "../value-object/EventCreateDate";
import { EventDescription } from "../value-object/EventDescription";
import { EventId } from "../value-object/EventId";
import { CommonCreationEventDTO } from '../../data-transfer-object/CommonCreationEventDTO';
import { Uuid } from '../value-object/Uuid'

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
            new EventId(Uuid.random().value),
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