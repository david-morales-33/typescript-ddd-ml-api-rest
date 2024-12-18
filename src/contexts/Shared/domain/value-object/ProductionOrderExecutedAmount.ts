import { ValueObject } from "./ValueObject";
import { CountingRecordsOrderAmount } from "./CountingRecordsOrderAmount";

export class ProductionOrderExecutedAmount extends ValueObject<number>{
    constructor(value: number) {
        super(value);
        this.ensurePositiveValueAndRange(value);

    }
    private ensurePositiveValueAndRange(value: number) {
        if (value < 0) {
            throw Error(`The Production Order Executed Amount <${value}> is not valid`)
        }
    }

    increment( amount : CountingRecordsOrderAmount): ProductionOrderExecutedAmount {
        return new ProductionOrderExecutedAmount(this.value + amount.value)
    }
}