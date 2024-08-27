import { UserId } from "../../domain/value-objects/UserId";


export class UserNotFoundException extends Error {
    constructor(value: UserId){
        super(`El usuario <${value.value}> no existe en los recursos de la compañia`)
    }
}