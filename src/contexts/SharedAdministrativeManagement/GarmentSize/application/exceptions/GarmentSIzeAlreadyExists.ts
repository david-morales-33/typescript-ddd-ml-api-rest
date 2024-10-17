import { GarmentSize as GarmentSizeId } from "../../../../Shared/domain/value-object/GarmentSize";

export class GarmentSIzeAlreadyExists extends Error {
    constructor(garmentSizeId: GarmentSizeId){
        super(`The Garment Size <${garmentSizeId.value}> already exists`)
    }
}