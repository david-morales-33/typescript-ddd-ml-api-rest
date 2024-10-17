import { ColorId } from "../../../../Shared/domain/value-object/ColorId";
import { ColorViewDTO } from "../data-transfer-objects/ColorViewDTO";

export interface ColorResponseRepository {
    find(colorId: ColorId): Promise<ColorViewDTO | null>;
    searchAll(): Promise<ColorViewDTO[]>
}