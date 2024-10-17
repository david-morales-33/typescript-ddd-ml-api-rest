import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class CountingRecordsOrderInitialTime extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureLengthIsLessThan8Characters(value);
    }

    private ensureLengthIsLessThan8Characters(value: string): void {
        if (value.length > 8) {
            throw new Error(`The start time <${value}> has more than 8 characters`);
        }
    }
}