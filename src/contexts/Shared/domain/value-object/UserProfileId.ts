import { ValueObject } from "./ValueObject";


export class UserProfileId extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensurePositiveValue(value)
    }

    setValue(value: number): UserProfileId {
        return new UserProfileId(value);
    }

    private ensurePositiveValue(value: number): void {
        if (value < 1) {
            throw new Error(`The Profile Id <${value}> is not allowed`);
        }
    }
}