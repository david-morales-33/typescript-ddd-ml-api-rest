import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionScheduleDetailCurrentAmount extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensurePositiveValue(value);
    }
    private ensurePositiveValue(value: number) {
        if (value < 0) {
            throw new Error(`The Value <${value}> is negative`)
        }
    }
}