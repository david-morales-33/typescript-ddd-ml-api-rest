import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class CountingRecordsOrderEventIdOnProductionModule extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureLengthIsLessThan2Characters(value)
    }
    private ensureLengthIsLessThan2Characters(value: string): void {
        if (value.length !== 2) {
            throw new Error(`The event process Id <${value}> has more than 2 characters`);
        }
    }
}