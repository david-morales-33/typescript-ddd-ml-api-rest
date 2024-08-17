import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionModuleEventName extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureLengthLessThan50Characteres(value);
    }
    private ensureLengthLessThan50Characteres(value: string) {
        if (value.length > 50)
            throw new Error(`The Production Module Event Name <${value}> has more than 50 characteres`)
    }
}