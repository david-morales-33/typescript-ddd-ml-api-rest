import { GarmentSizeRepository } from "../../../domain/repositories/GarmentSizeRepository";
import { GarmentSizeId } from "../../../domain/value-objects/GarmentSizeId";
import { GarmentSizeNotFoundException } from "../../exceptions/GarmentSizeNotFoundException";
import { GarmentSizeQueryRepository } from "../../repositories/GarmentSizeQueryRepository";

export class GarmentSizeFinder {
    constructor(
        private garmentSizeQueryRepository: GarmentSizeQueryRepository
    ) { }

    async execute(garmentSizeId: GarmentSizeId) {
        const garmentSize = await this.garmentSizeQueryRepository.find(garmentSizeId);

        if (garmentSize === null)
            throw new GarmentSizeNotFoundException(garmentSizeId);

        return garmentSize;
    }
}