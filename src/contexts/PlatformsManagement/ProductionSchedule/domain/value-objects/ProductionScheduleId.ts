import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionScheduleId extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensurePositiveValue(value)
    }
    private ensurePositiveValue(value: number) {
        if (value < 0)
            throw Error(`The Production Schedule Id <${value}> is negative`);
    }
}