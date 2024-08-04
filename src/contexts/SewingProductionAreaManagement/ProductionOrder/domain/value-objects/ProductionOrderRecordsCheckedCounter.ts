import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionOrderRecordsCheckedCounter extends ValueObject<number> {
    constructor(value: number) {
        super(value)
        this.ensurePositiveValueAndRange(value)
    }

    private ensurePositiveValueAndRange(value: number) {
        if (value < 0) {
            throw Error(`The Production Order Records Checked counter <${value}> is not valid`)
        }
    }

    increment(): ProductionOrderRecordsCheckedCounter {
        return new ProductionOrderRecordsCheckedCounter(this.value + 1);
    }

    static initialize(): ProductionOrderRecordsCheckedCounter {
        return new ProductionOrderRecordsCheckedCounter(0);
    }
}