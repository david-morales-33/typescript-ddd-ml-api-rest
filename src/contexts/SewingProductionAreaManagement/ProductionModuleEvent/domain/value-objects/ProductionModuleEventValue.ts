import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionModuleEventValue extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureLengthLessThan20Characteres(value)
    }
    private ensureLengthLessThan20Characteres(value: string) {
        if (value.length > 20)
            throw new Error(`The Production Module Event Value <${value}> has more than 20 characteres`)
    }
}