

export class UserPermissionNotValidException extends Error {
    constructor(){
        super(`User permission not valid`)
    }
}