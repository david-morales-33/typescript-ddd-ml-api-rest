import { UserId } from "../value-object/UserId";

export class UserAlreadyExistException extends Error {
    constructor(value: UserId){
        super(`El usuario <${value.value}> ya existe en la base de datos`)
    }
}