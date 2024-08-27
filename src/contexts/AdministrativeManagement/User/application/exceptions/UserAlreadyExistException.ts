
export class UserAlreadyExistException extends Error {
    constructor(value: string){
        super(`El usuario <${value}> ya existe en la base de datos`)
    }
}