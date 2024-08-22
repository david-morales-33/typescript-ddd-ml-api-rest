import { GarmentSize } from "../entities/GarmentSize";
import { GarmentSizeId } from "../value-objects/GarmentSizeId";

export interface GarmentSizeRepository {
    find(garmentSizeId: GarmentSizeId): Promise<GarmentSize | null>;
    save(GarmentSize: GarmentSize): Promise<void>;
}