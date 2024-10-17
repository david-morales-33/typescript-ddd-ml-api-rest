import { GarmentSizeId } from "../../../../Shared/domain/value-object/GarmentSizeId";
import { GarmentSize } from "../entities/GarmentSize";

export interface GarmentSizeQueryRepository {
    find(garmentSizeId: GarmentSizeId): Promise<GarmentSize | null>;
}