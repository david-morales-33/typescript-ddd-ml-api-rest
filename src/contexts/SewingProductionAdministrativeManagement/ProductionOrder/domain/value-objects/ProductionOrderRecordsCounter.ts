import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionOrderRecordsCounter extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensurePositiveValueAndRange(value);

    }
    private ensurePositiveValueAndRange(value: number) {
        if (value < 0) {
            throw Error(`The Production order planned  <${value}> is not valid`)
        }
    }

    increment(): ProductionOrderRecordsCounter {
        return new ProductionOrderRecordsCounter(this.value + 1)
    }

    static initialize(): ProductionOrderRecordsCounter {
        return new ProductionOrderRecordsCounter(0);
    }
}