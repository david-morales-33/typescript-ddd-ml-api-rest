import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";


export class ProductionOrderProcessEndDate extends ValueObject<Date> {
    constructor(value: Date) {
        super(value)
    }
    setValue(): ProductionOrderProcessEndDate {
        return new ProductionOrderProcessEndDate(new Date);
    }
}