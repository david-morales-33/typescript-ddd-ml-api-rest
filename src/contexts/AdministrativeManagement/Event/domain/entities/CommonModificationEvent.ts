import { EventRoot } from "../interfaces/EventRoot";
import { EventCreateBy } from "../value-objects/EventCreateBy";
import { EventCreateDate } from "../value-objects/EventCreateDate";
import { EventDescription } from "../value-objects/EventDescription";
import { EventId } from "../value-objects/EventId";
import { EventModifiedField } from "../value-objects/EventModifiedField";
import { EventNewValue } from "../value-objects/EventNewValue";
import { EventPreviusValue } from "../value-objects/EventPreviusValue";
import { CommonModificationEventDTO } from '../data-transfer-object/CommonModificationEventDTO'

export class CommonModificationEvent implements EventRoot {

    constructor(
        readonly id: EventId,
        readonly createBy: EventCreateBy,
        readonly createDate: EventCreateDate,
        readonly description: EventDescription,
        readonly modifiedField: EventModifiedField,
        readonly previusValue: EventPreviusValue,
        readonly newValue: EventNewValue
    ) { }

    static create(
        id: EventId,
        createBy: EventCreateBy,
        createDate: EventCreateDate,
        description: EventDescription,
        modifiedField: EventModifiedField,
        previusValue: EventPreviusValue,
        newValue: EventNewValue
    ): CommonModificationEvent {
        return new CommonModificationEvent(
            id,
            createBy,
            createDate,
            description,
            modifiedField,
            previusValue,
            newValue
        )
    }

    static fromPrimitives(data: CommonModificationEventDTO): CommonModificationEvent {
        return new CommonModificationEvent(
            new EventId(data.id),
            new EventCreateBy(data.createBy),
            new EventCreateDate(data.createDate),
            new EventDescription(data.description),
            new EventModifiedField(data.modifiedField),
            new EventPreviusValue(data.previusValue),
            new EventNewValue(data.newValue)
        );
    }

    
    toPrimitives(): CommonModificationEventDTO {
        return new CommonModificationEventDTO(
            this.id.value,
            this.createBy.value,
            this.createDate.value,
            this.description.value,
            this.modifiedField.value,
            this.previusValue.value,
            this.newValue.value
        )
    }
}