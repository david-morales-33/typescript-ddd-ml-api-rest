import { GarmentSize } from "../entities/GarmentSize";

export interface GarmentSizeCommandRepository {
    save(GarmentSize: GarmentSize): Promise<void>;
}