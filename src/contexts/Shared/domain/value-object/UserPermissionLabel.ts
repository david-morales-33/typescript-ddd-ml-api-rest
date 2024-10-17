import { ValueObject } from "./ValueObject";


export class UserPermissionLabel extends ValueObject <string> {
    constructor(value: string ){
        super(value);
        this.ensureLengthIsLessThan50Characters(value)
    }
    private ensureLengthIsLessThan50Characters(value: string): void {
        if (value.length > 50) {
            throw new Error(`The User Permission <${value}> has more than 15 characters`);
        }
    }
}