import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class UserId extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureDocumentIdLength(value);
    }

    private ensureDocumentIdLength(value: string) {
        if (!(value.length > 5 && value.length < 20))
            throw Error('Object value length not valid');
    }
}