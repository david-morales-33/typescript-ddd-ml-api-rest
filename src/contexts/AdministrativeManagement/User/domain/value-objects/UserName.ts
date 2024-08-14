import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class UserName extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureLengthIsLessThan50Characters(value)
    }

    setValue(value: string): UserName {
        return new UserName(value);
    }

    private ensureLengthIsLessThan50Characters(value: string): void {
        if (value.length > 50) {
            throw new Error(`The Reference <${value}> has more than 15 characters`);
        }
    }
}