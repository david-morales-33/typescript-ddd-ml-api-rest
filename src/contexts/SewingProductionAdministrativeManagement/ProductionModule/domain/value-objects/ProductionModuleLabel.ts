import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionModuleLabel extends ValueObject<string> {
    constructor(value: string) {
        super(value)
        this.ensureLengthLess9characters(value);
    }
    private ensureLengthLess9characters(value: string) {
        if (value.length > 9)
            throw new Error(`<${this.value}> has more than 9 characteres`)
    }
}