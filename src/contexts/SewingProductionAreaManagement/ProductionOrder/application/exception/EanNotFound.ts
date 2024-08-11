import { BarcodeEan } from "../../../Shared/domain/value-object/BarcodeEan";


export class EanNotFound extends Error {
    constructor(){
        super(`El código de barras no fue encontrado`)
    }
}