import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class GarmentSizeType extends ValueObject<string> {
    constructor(value: string) {
        super(value)
    }

    setValue(value: any){
        return new GarmentSizeType(value);
    }
}