import { GarmentSize as GarmentSizeId } from "../../../../Shared/domain/value-object/GarmentSize";
import { GarmentSizeViewDTO } from "../../domain/data-transfer-objects/GarmentSizeViewDTO";
import { GarmentSizeResponseRepository } from "../../domain/repositories/GarmentSizeResponseRepository";

export class InMemoryGarmentSizeResponseRepository implements GarmentSizeResponseRepository {
    private garmentSizeList: GarmentSizeViewDTO[];

    constructor() {
        this.garmentSizeList = [
            new GarmentSizeViewDTO('XL', 'XL', 'Panty', 0, true),
            new GarmentSizeViewDTO('X', 'X', 'Panty', 0, true),
            new GarmentSizeViewDTO('2XL', '2XL', 'Panty', 0, true),
        ]
    }

    async find(garmentSizeId: GarmentSizeId): Promise<GarmentSizeViewDTO | null> {
        // const response = new InMemoryGarmentSizeResponseRepository();
        // const finder = new GarmentSizeFinder(response);

        // const query = new FindGarmentSizeQuery(1);

        // const queryHandler = new FindGarmentSizeQueryHandler(finder);

        // queryHandler.handle(query).then(res=> console.log(res))
        const garmentSize = this.garmentSizeList.find(entry => entry.tallaId === garmentSizeId.value);

        if (garmentSize === undefined)
            return null;

        return garmentSize;
    }
}