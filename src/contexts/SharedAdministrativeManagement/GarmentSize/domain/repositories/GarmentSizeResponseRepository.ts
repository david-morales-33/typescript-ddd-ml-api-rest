import { GarmentSizeId } from "../../../../Shared/domain/value-object/GarmentSizeId";
import { GarmentSizeViewDTO } from "../data-transfer-objects/GarmentSizeViewDTO";

export interface GarmentSizeResponseRepository {
    find(garmentSizeId: GarmentSizeId): Promise<GarmentSizeViewDTO | null>;
}