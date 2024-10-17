import { ValueObject } from "./ValueObject";

export class UserDescription extends ValueObject<string> {
    constructor(vale: string) {
        super(vale);
        this.ensureLengthIsLessThan50Characters(vale);
    }

    setValue(value: string): UserDescription {
        return new UserDescription(value)
    }

    private ensureLengthIsLessThan50Characters(value: string): void {
        if (value.length > 50) {
            throw new Error(`The User Description <${value}> has more than 50 characters`);
        }
    }
}