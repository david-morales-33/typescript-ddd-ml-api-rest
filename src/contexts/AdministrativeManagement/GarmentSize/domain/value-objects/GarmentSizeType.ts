import { EnumValueObject } from "../../../shared/domain/value-objects/EnumValueObject";

enum garmentType { PANTY = 'Panty', BRASIER = 'Brasier' }

export class GarmentSizeType extends EnumValueObject<garmentType> {
    constructor(values: garmentType) {
        super(values, Object.values(garmentType));
    }
    protected throwErrorForInvalidValue(value: garmentType): void {
        throw new Error(`The order type ${value} is invalid`);
    }
}