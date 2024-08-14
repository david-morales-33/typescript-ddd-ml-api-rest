import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class EventId extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensurePositiveValues(value);
    }
    private ensurePositiveValues(value: number) {
        if (value < 1)
            throw new Error(`The Modification Event Id <${value}> is negative`)
    }
}