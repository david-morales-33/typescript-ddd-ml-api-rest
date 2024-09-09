import { ColorId } from "../../../shared/domain/value-objects/ColorId";
import { ColorViewDTO } from "../data-transfer-objects/ColorViewDTO";

export interface ColorResponseRepository {
    find(colorId: ColorId): Promise<ColorViewDTO | null>;
    searchAll(): Promise<ColorViewDTO[]>
}