import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";


export class UserProfileId extends ValueObject<number>{
    constructor(value: number){
        super(value);
        this.ensurePositiveValue(value)
    }
    private ensurePositiveValue(value: number): void {
        if (value < 1) {
            throw new Error(`The Profile Id <${value}> is not allowed`);
        }
    }

}