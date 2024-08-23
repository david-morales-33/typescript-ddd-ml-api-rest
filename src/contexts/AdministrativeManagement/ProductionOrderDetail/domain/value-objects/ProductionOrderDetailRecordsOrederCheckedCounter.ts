import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";


export class ProductionOrderDetailRecordsOrederCheckedCounter extends ValueObject<number>{
    constructor(value: number) {
        super(value)
        this.ensurePositiveValueAndRange(value)
    }

    private ensurePositiveValueAndRange(value: number) {
        if (value < 0) {
            throw Error(`The Production Order Counter Records Checked <${value}> is not valid`)
        }
    }
}