import { ValueObject } from "./ValueObject";

export class EventPreviusValue extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureLengthLess50Characteres(value);
    }
    private ensureLengthLess50Characteres(value: string) {
        if (value.length > 50)
            throw new Error(`The Modification Event Description <${value}> has more than 50 characteres`)
    }
}