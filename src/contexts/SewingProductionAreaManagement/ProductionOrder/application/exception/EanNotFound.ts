
export class EanNotFound extends Error {
    constructor(){
        super(`El código de barras no fue encontrado`)
    }
}