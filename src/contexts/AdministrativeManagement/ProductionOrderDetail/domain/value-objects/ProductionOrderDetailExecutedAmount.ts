import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

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
}