import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";
import { CountingRecordsOrderAmount } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";

export class ProductionOrderDetailExecutedAmount extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensurePositiveValue(value);

    }
    private ensurePositiveValue(value: number) {
        if (value < 0) {
            throw Error(`The Production Order Executed Amount <${value}> is not valid`)
        }
    }

    increment(amount: CountingRecordsOrderAmount): ProductionOrderDetailExecutedAmount {
        return new ProductionOrderDetailExecutedAmount(this.value + amount.value)
    }

    static initialize(): ProductionOrderDetailExecutedAmount {
        return new ProductionOrderDetailExecutedAmount(0);
    }
}