import { UserId } from "../../../User/domain/value-objects/UserId";


export class UnauthorizedUserAccessException extends Error{
    constructor(value: UserId) {
        super(`The user <${value.value}> does not have permissions`)
    }
}