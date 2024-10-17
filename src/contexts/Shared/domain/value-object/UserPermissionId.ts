import { ValueObject } from "./ValueObject";


export class UserPermissionId extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensurePositiveValue(value)
    }
    private ensurePositiveValue(value: number) {
        if (value < 0)
            throw new Error(`The value <${value}> is negative`);
    }
}