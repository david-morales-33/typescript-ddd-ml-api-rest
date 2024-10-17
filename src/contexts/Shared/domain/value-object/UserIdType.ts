import { ValueObject } from "./ValueObject";


export class UserIdType extends ValueObject<number> {
    constructor(value: number){
        super(value);
        this.ensurePositiveValue(value)
    }

    setValue(value: number): UserIdType {
        return new UserIdType(value); 
    }

    private ensurePositiveValue(value: number): void {
        if (value < 1) {
            throw new Error(`The Profile Id <${value}> is not allowed`);
        }
    }
}