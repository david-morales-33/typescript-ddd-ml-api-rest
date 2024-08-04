import { CountingRecordsOrderAmount } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";
import { CreationDate } from "../../../Shared/domain/value-object/CreationDate";
import { CountingRecordsOrderEventDTO } from "../data-transfer-object/CountingRecordsOrderEventDTO";
import { CountingRecordsOrderEventId } from "../value-objects/CountingRecordsOrderEventId";
import { CountingRecordsOrderEventName } from "../value-objects/CountingRecordsOrderEventName";

export class CountingRecordsOrderEvent {

    readonly id: CountingRecordsOrderEventId;
    readonly name: CountingRecordsOrderEventName;
    readonly previusValue: CountingRecordsOrderAmount;
    readonly currentValue: CountingRecordsOrderAmount;
    readonly eventDate: CreationDate;

    constructor(
        id: CountingRecordsOrderEventId,
        name: CountingRecordsOrderEventName,
        previusValue: CountingRecordsOrderAmount,
        currentValue: CountingRecordsOrderAmount,
        eventDate: CreationDate
    ) {
        this.id = id;
        this.name = name;
        this.previusValue = previusValue;
        this.currentValue = currentValue;
        this.eventDate = eventDate;
    }

    static create(
        id: CountingRecordsOrderEventId,
        name: CountingRecordsOrderEventName,
        previusValue: CountingRecordsOrderAmount,
        currentValue: CountingRecordsOrderAmount,
        eventDate: CreationDate
    ) {
        return new CountingRecordsOrderEvent(
            id,
            name,
            previusValue,
            currentValue,
            eventDate
        )
    }

    static fromPrimitives(data: CountingRecordsOrderEventDTO): CountingRecordsOrderEvent {
        return new CountingRecordsOrderEvent(
            new CountingRecordsOrderEventId(data.id),
            new CountingRecordsOrderEventName(data.name),
            new CountingRecordsOrderAmount(data.previusValue),
            new CountingRecordsOrderAmount(data.currentValue),
            new CreationDate(data.eventDate)
        );
    }

    toPrimitive(): CountingRecordsOrderEventDTO {
        return new CountingRecordsOrderEventDTO(
            this.id.value,
            this.name.value,
            this.previusValue.value,
            this.currentValue.value,
            this.eventDate.value
        )
    }
}