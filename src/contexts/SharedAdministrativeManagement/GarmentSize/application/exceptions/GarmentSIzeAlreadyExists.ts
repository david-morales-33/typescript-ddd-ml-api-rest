import { GarmentSizeId } from "../../../../Shared/domain/value-object/GarmentSizeId";

export class GarmentSIzeAlreadyExists extends Error {
    constructor(garmentSizeId: GarmentSizeId){
        super(`The Garment Size <${garmentSizeId.value}> already exists`)
    }
}