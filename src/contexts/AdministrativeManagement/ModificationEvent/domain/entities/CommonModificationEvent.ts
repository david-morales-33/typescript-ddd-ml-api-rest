import { ModificationEventRoot } from "../interfaces/ModificationEventRoot";
import { ModificationEventModifiedField } from "../value-objects/ModificationEventModifiedField";
import { ModificationEventCreateBy } from "../value-objects/ModificationEventCreateBy";
import { ModificationEventCreateDate } from "../value-objects/ModificationEventCreateDate";
import { ModificationEventDescription } from "../value-objects/ModificationEventDescription";
import { ModificationEventId } from "../value-objects/ModificationEventId";
import { ModificationEventPreviusValue } from "../value-objects/ModificationEventPreviusValue";
import { ModificationEventNewValue } from "../value-objects/ModificationEventNewValue";
import { CommonModificationEventDTO } from "../data-transfer-objects/CommonModificationEventDTO";

export class CommonModificationEvent implements ModificationEventRoot {

    constructor(
        readonly id: ModificationEventId,
        readonly createBy: ModificationEventCreateBy,
        readonly createDate: ModificationEventCreateDate,
        readonly description: ModificationEventDescription,
        readonly modifiedField: ModificationEventModifiedField,
        readonly previusValue: ModificationEventPreviusValue,
        readonly newValue: ModificationEventNewValue
    ) { }

    static create(
        id: ModificationEventId,
        createBy: ModificationEventCreateBy,
        createDate: ModificationEventCreateDate,
        description: ModificationEventDescription,
        modifiedField: ModificationEventModifiedField,
        previusValue: ModificationEventPreviusValue,
        newValue: ModificationEventNewValue
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
            new ModificationEventId(data.id),
            new ModificationEventCreateBy(data.createBy),
            new ModificationEventCreateDate(data.createDate),
            new ModificationEventDescription(data.description),
            new ModificationEventModifiedField(data.modifiedField),
            new ModificationEventPreviusValue(data.previusValue),
            new ModificationEventNewValue(data.newValue)
        );
    }

    toPrimitive(): CommonModificationEventDTO {
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