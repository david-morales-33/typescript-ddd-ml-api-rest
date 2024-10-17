import { GarmentSizeId } from "../../domain/value-objects/GarmentSizeId";

export class GarmentSizeNotFoundException extends Error {
    constructor(garmentSizeId: GarmentSizeId) {
        super(`The Garment Size <${garmentSizeId.value}> nopt found`)
    }
}