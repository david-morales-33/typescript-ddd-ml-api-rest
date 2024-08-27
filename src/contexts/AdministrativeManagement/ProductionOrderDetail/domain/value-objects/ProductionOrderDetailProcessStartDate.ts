import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionOrderDetailProcessStartDate extends ValueObject<Date>{
    constructor(value: Date){
        super(value)
    }
}