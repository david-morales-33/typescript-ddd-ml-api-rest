import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionOrderDetailFinishDate extends ValueObject<Date> {
    constructor(value: Date) {
        super(value)
    }
}