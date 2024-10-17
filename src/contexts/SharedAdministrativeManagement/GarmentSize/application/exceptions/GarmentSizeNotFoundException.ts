import { GarmentSize as GarmentSizeId  } from "../../../../Shared/domain/value-object/GarmentSize";

export class GarmentSizeNotFoundException extends Error {
    constructor(garmentSizeId: GarmentSizeId) {
        super(`The Garment Size <${garmentSizeId.value}> nopt found`)
    }
}