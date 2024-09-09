import { GarmentSizeId } from "../../domain/value-objects/GarmentSizeId";
import { GarmentSizeViewDTO } from "../../domain/data-transfer-objects/GarmentSizeViewDTO";

export interface GarmentSizeResponseRepository {
    find(garmentSizeId: GarmentSizeId): Promise<GarmentSizeViewDTO | null>;
}