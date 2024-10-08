import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionModuleId extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensurePositiveValue(value)
    }
    private ensurePositiveValue(value: number): void {
        if (value < 0) {
            throw new Error(`The Production Module Id <${value}> is negative`);
        }
    }
}