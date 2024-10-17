import { GarmentSize } from "../../domain/entities/GarmentSize";
import { GarmentSize as GarmentSizeId } from '../../../../Shared/domain/value-object/GarmentSize'
import { GarmentSizeQueryRepository } from "../../domain/repositories/GarmentSizeQueryRepository";
import { GarmentSizeLabel } from "../../domain/value-objects/GarmentSizeLabel";
import { GarmentSizeOrder } from "../../domain/value-objects/GarmentSizeOrder";
import { GarmentSizeState } from "../../domain/value-objects/GarmentSizeState";
import { GarmentSizeType } from "../../domain/value-objects/GarmentSizeType";

export class InMemoryGarmentSizeQueryRepository implements GarmentSizeQueryRepository {
    private garmentSizeList: GarmentSize[]

    constructor() {
        this.garmentSizeList = [
            new GarmentSize(
                new GarmentSizeId('XL'),
                new GarmentSizeLabel('XL'),
                new GarmentSizeType('Panty'),
                new GarmentSizeOrder(0),
                new GarmentSizeState(true),
                []
            ),
            new GarmentSize(
                new GarmentSizeId('XL'),
                new GarmentSizeLabel('XL'),
                new GarmentSizeType('Panty'),
                new GarmentSizeOrder(0),
                new GarmentSizeState(true),
                []
            ),
        ]
    }

    async find(garmentSizeId: GarmentSizeId): Promise<GarmentSize | null> {
        const garmentSize = this.garmentSizeList.find(entry => entry.id.value === garmentSizeId.value);
        if (garmentSize === undefined)
            return null;
        return garmentSize;
    }
}