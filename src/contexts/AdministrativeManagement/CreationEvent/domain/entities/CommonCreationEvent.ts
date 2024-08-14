import { CreationEventRoot } from "../interfaces/CreationEventRoot";
import { CreationEventCreateBy } from "../value-objects/CreationEventCreateBy";
import { CreationEventCreateDate } from "../value-objects/CreationEventCreateDate";
import { CreationEventDescription } from "../value-objects/CreationEventDescription";
import { CreationEventId } from "../value-objects/CreationEventId";
import { CommonCreationEventDTO } from "../data-transfer-objects/CommonCreationEventDTO";

export class CommonCreationEvent implements CreationEventRoot {

    constructor(
        readonly id: CreationEventId,
        readonly createBy: CreationEventCreateBy,
        readonly createDate: CreationEventCreateDate,
        readonly description: CreationEventDescription
    ) { }

    static create(
        id: CreationEventId,
        createBy: CreationEventCreateBy,
        createDate: CreationEventCreateDate,
        description: CreationEventDescription
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
            new CreationEventId(data.id),
            new CreationEventCreateBy(data.createBy),
            new CreationEventCreateDate(data.createDate),
            new CreationEventDescription(data.description)
        );
    }

    toPrimitive(): CommonCreationEventDTO {
        return new CommonCreationEventDTO(
            this.id.value,
            this.createBy.value,
            this.createDate.value,
            this.description.value
        )
    }
}