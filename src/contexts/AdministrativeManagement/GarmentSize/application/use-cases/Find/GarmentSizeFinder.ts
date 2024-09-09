import { GarmentSizeResponseRepository } from "../../../domain/repositories/GarmentSizeResponseRepository";
import { GarmentSizeId } from "../../../domain/value-objects/GarmentSizeId";
import { GarmentSizeNotFoundException } from "../../exceptions/GarmentSizeNotFoundException";

export class GarmentSizeFinder {
    constructor(
        private garmentSizeQueryRepository: GarmentSizeResponseRepository
    ) { }

    async execute(garmentSizeId: GarmentSizeId) {
        const garmentSize = await this.garmentSizeQueryRepository.find(garmentSizeId);

        if (garmentSize === null)
            throw new GarmentSizeNotFoundException(garmentSizeId);

        return garmentSize;
    }
}