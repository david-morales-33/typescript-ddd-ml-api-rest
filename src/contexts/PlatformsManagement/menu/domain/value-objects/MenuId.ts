import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class MenuId extends ValueObject<number>{
    constructor(value: number) {
        super(value);
        this.ensurePositiveValue(value);
    }
    private ensurePositiveValue(value: number) {
        if (value < 0)
            throw new Error(`The Menu Id <${value}> is negative`)
    }
}