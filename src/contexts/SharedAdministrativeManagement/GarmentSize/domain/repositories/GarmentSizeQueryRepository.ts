import { GarmentSize } from "../entities/GarmentSize";
import { GarmentSize as GarmentSizeId } from '../../../../Shared/domain/value-object/GarmentSize'

export interface GarmentSizeQueryRepository {
    find(garmentSizeId: GarmentSizeId): Promise<GarmentSize | null>;
}