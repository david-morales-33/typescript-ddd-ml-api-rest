import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";


export class BarcodeEan extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureLengthIsLessThan14Characters(value);
    }
    private ensureLengthIsLessThan14Characters(value: string) {
        if (value.length > 13)
            throw Error(`The EAN <${value}> has more than 13 characters`);
    }
}

