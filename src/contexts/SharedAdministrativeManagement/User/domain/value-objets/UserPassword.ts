import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";


export class UserPassword extends ValueObject<string> {
    constructor(value: string){
        super(value);
    }

    setValue(value: string): UserPassword {
        return new UserPassword(value);
    }
 }