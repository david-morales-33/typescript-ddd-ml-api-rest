import { GarmentSize } from "../entities/GarmentSize";
import { GarmentSizeId } from "../value-objects/GarmentSizeId";

export interface GarmentSizeQueryRepository {
    find(garmentSizeId: GarmentSizeId): Promise<GarmentSize | null>;
}