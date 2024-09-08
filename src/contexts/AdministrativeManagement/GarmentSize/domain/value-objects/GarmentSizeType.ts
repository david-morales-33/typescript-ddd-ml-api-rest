import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";
import { EnumValueObject } from "../../../shared/domain/value-objects/EnumValueObject";

enum garmentType { PANTY = 'Panty', BRASIER = 'Brasier' }

export class GarmentSizeType extends ValueObject<string> {
    constructor(value: string) {
        super(value)
    }

    setValue(value: any){
        return new GarmentSizeType(value);
    }
}