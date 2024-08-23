import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class GarmentSizeOrder extends ValueObject<number> {
    constructor(value: number) {
        super(value)
    }
    setValue(value: number) {
        return new GarmentSizeOrder(value);
    }
}