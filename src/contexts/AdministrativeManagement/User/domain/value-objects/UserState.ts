import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class UserState extends ValueObject<boolean> {
    constructor(value: boolean) {
        super(value);
    }

    setInTrue(): UserState {
        return new UserState(true)
    }

    setInFalse(): UserState {
        return new UserState(false)
    }
}