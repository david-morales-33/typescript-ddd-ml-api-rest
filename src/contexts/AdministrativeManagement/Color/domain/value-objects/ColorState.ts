import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ColorState extends ValueObject<boolean> {
    constructor(value: boolean) {
        super(value)
    }

    setInTrue(): ColorState {
        return new ColorState(true);
    }

    setInFalse(): ColorState {
        return new ColorState(false)
    }
}