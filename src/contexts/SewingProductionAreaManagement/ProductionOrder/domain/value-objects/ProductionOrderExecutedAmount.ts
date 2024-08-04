import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";
import { CountingRecordsOrderAmount } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderAmount";


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