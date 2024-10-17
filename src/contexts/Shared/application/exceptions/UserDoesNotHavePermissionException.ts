import { UserId } from "../../domain/value-object/UserId";

export class UserDoesNotHavePermissionException extends Error {
    constructor(value: UserId) {
        super(`Unauthorized user <${value.value}>`)
    }
}