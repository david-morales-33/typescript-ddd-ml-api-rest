import { GarmentSizeId } from "../../domain/value-objects/GarmentSizeId";
import { GarmentSizeViewDTO } from "../data-transfer-objects/GarmentSizeViewDTO";

export interface GarmentSizeQueryRepository {
    find(garmentSizeId: GarmentSizeId): Promise<GarmentSizeViewDTO | null>;
}