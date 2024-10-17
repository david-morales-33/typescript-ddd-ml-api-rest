import { GarmentSizeId } from "../../../../../Shared/domain/value-object/GarmentSizeId";
import { GarmentSizeResponseRepository } from "../../../domain/repositories/GarmentSizeResponseRepository";
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