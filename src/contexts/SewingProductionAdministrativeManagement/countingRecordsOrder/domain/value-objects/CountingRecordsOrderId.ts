import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class CountingRecordsOrderId extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureLengthIsLessThan50Characteres(value)
    }
    private ensureLengthIsLessThan50Characteres(value: string): void {
        if (value.length >50) {
            throw new Error(`The Id <${value}> has more than 50 characteres`);
        }
    }
}