import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class GarmentSizeState extends ValueObject<boolean> {
    constructor(value: boolean) {
        super(value)
    }

    setValue(value: boolean) {
        return new GarmentSizeState(value);
    }
}