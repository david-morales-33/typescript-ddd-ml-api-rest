import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";


export class CountingRecordsOrderProductionScheduleId extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensurePositiveValue(value)
        this.ensureExistingSchedule(value)
    }
    private ensurePositiveValue(value: number): void {
        if (value < 1) {
            throw new Error(`The schedule Id <${value}> is negavite`);
        }
    }
    private ensureExistingSchedule(value: number) {
        if (value < 0 || value > 15) {
            throw new Error(`The schedule Id <${value}> is not allowed`);
        }
    }
}