import { ValueObject } from "./ValueObject";


export class UserProfileName extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureLengthIsLessThan50Characters(value)
    }
    private ensureLengthIsLessThan50Characters(value: string): void {
        if (value.length > 50) {
            throw new Error(`The Reference <${value}> has more than 15 characters`);
        }
    }
}