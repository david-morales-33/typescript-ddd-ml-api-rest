import { GarmentSizeViewDTO } from "../data-transfer-objects/GarmentSizeViewDTO";
import { GarmentSize as GarmentSizeId } from "../../../../Shared/domain/value-object/GarmentSize";

export interface GarmentSizeResponseRepository {
    find(garmentSizeId: GarmentSizeId): Promise<GarmentSizeViewDTO | null>;
}