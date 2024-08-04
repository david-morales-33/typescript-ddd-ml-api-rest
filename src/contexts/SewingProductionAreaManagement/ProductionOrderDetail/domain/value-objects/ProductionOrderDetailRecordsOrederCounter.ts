import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";


export class ProductionOrderDetailRecordsOrederCounter extends ValueObject<number>{
    constructor(value: number) {
        super(value);
        this.ensurePositiveValueAndRange(value);

    }
    private ensurePositiveValueAndRange(value: number) {
        if (value < 0) {
            throw Error(`The Production order planned Amount <${value}> is not valid`)
        }
    }

    increment(): ProductionOrderDetailRecordsOrederCounter {
        return new ProductionOrderDetailRecordsOrederCounter(this.value + 1)
    }

    static initialize(): ProductionOrderDetailRecordsOrederCounter {
        return new ProductionOrderDetailRecordsOrederCounter(0);
    }
}