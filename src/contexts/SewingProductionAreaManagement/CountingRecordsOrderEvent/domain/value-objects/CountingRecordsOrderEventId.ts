import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class CountingRecordsOrderEventId extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensurePositiveValue(value);
    }

    private ensurePositiveValue(value: number) {
        if (value < 1)
            throw new Error(`The Event Id <${value}> is negative`)
    }
}