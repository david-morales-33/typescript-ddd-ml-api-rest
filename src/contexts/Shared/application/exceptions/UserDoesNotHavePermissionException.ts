import { UserId } from "../../../User/domain/value-objects/UserId";


export class UserDoesNotHavePermissionException extends Error {
    constructor(value: UserId) {
        super(`Unauthorized user <${value.value}>`)
    }
}