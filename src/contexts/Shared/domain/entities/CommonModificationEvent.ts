import { AdministrativeEventRoot } from "../interfaces/AdministrativeEventRoot";
import { EventCreateBy } from "../value-object/EventCreateBy";
import { EventCreateDate } from "../value-object/EventCreateDate";
import { EventDescription } from "../value-object/EventDescription";
import { EventId } from "../value-object/EventId";
import { EventModifiedField } from "../value-object/EventModifiedField";
import { EventNewValue } from "../value-object/EventNewValue";
import { EventPreviusValue } from "../value-object/EventPreviusValue";
import { CommonModificationEventDTO } from '../../data-transfer-object/CommonModificationEventDTO';
import { Uuid } from "../value-object/Uuid";

export class CommonModificationEvent implements AdministrativeEventRoot {

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
            new EventId(Uuid.random().value),
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