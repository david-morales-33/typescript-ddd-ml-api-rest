import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ColorId extends ValueObject<string> {
    constructor(value: string) {
        super(value)
        this.ensureLengthIsEqualTo4Characters(value)
    }

    private ensureLengthIsEqualTo4Characters(value: string): void {
        if (value.length !== 4) {
            throw new Error(`The color Id <${value}> is different to 4 characters`);
        }
    }
}