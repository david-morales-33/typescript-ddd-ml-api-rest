import { ValueObject } from "./ValueObject";


export class ProductionOrderPlannedAmount extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensurePositiveValueAndRange(value);

    }
    private ensurePositiveValueAndRange(value: number) {
        if (value < 1) {
            throw Error(`The Production order planned Amount <${value}> is not valid`)
        }
    }
}